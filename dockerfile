FROM node:20.9.0-alpine3.18
COPY package.json /app
COPY . /app
WORKDIR /app
RUN npm install && npm cache clean --force
EXPOSE 3000
CMD node src/index.js
