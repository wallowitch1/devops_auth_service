const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const morgan = require('morgan');

const path = require('path')
const db = require('./models');
const authRouter = require('./routes/auth');
const fs = require('fs');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 로그 파일 스트림 생성
const accessLogStream = fs.createWriteStream(path.join('/var/log/app/access.log'), { flags: 'a' });

// morgan을 사용하여 액세스 로그 설정
app.use(morgan('combined', { stream: accessLogStream }));

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.redirect("http://www.devops.com");
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
