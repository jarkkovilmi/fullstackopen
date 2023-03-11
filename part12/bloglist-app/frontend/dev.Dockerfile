FROM node:16 AS base

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "start"]