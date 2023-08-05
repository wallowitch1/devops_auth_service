const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');

const path = require('path')
const db = require('./models');
const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const SECRET_KEY = "keroro2424.";

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.redirect("http://www.devops.com");
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
