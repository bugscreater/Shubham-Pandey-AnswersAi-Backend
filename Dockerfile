FROM node:18.20.0

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY server.js server.js
COPY app.js app.js
COPY ./routes ./routes
COPY ./config ./config
COPY ./controllers ./controllers
COPY ./middleware ./middleware
COPY ./models ./models

RUN npm install

ENTRYPOINT  ["node","app.js"]