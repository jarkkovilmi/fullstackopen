FROM node:16
  
WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=development
RUN npm install

ENV DEBUG=backend:*

CMD ["npm", "run", "docker:dev"]