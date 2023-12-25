FROM node:20.9.0-alpine3.18
WORKDIR /app

COPY package.json /app
COPY . /app
RUN npm install && npm cache clean --force
EXPOSE 3000
CMD node src/index.js
