FROM node:23-alpine

WORKDIR /app

RUN npm i -g npm@latest

CMD npm install && npx tsx main.ts