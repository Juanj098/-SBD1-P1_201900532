FROM node:22
WORKDIR /Backend
COPY package.json .
RUN npm install

COPY . .
CMD node app.js