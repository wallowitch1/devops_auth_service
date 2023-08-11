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
// cache 테스트
// cache 테스트
// cache 테스트
// cache 테스트
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 로그 파일 스트림 생성
const accessLogStream = fs.createWriteStream(path.join('/var/log/app/access.log'), { flags: 'a' });

// 사용자 정의 토큰 생성
morgan.token('client-ip', function(req, res) {
  return req.header('x-forwarded-for') || req.connection.remoteAddress;
});

// morgan을 사용하여 액세스 로그 설정 (새로운 client-ip 토큰 포함)
app.use(morgan(':client-ip - :remote-user :method :url HTTP/:http-version :status :res[content-length] :response-time ms ":referrer" ":user-agent"', { stream: accessLogStream }));

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.redirect("http://www.devops.com");
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
