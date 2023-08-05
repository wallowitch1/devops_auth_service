const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "keroro2424."
router.get('/login', (req, res) => {
  // Render login page
  res.render('login');
});

router.post('/login', async (req, res) => {
  console.log('Request body:', req.body);
  // Handle user login
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, password }, attributes: ['id', 'username', 'accounttype','email'], });
    console.log(user);
    if (user) {
      const token = jwt.sign({ username: user.username, user_id: user.id, accounttype:user.accounttype }, SECRET_KEY, { expiresIn: "15m", issuer: "토큰발급자" });
      res.cookie('token', token, { httpOnly: true });
      res.redirect('http://www.devops.com');
    } else {
      res.status(401).json({ message: "Authentication failed" });
      res.redirect('/auth/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token'); // 쿠키에 저장된 토큰 삭제
  res.redirect('/auth/login'); // 로그인 페이지로 리다이렉트
});

// Render the registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle user registration
router.post('/register', async (req, res) => {
  const { username, password, email, accounttype, tel, address} = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      res.status(409).send('User already exists');
    } else {
      // Create a new user
      const newUser = await User.create({
        username,
        password,
        email,
        accounttype,
        tel,
        address
      });

      // Redirect to the login page after successful registration
      res.redirect('/auth/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post("/verifyToken", (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    res.status(200).json({ decoded });
  });
});

module.exports = router;
