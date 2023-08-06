FROM node:18

WORKDIR /usr/src/app

COPY auth/package*.json ./

RUN npm install

RUN npm install mysql cookie-parser body-parser express-session session-file-store method-override jsonwebtoken express ejs morgan

COPY auth/. .

EXPOSE 3001

CMD [ "node", "index.js" ]
