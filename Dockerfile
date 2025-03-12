FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i -g npm@latest && npm install

COPY * ./

ENTRYPOINT [ "npx", "tsx", "main.ts" ]