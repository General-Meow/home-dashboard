FROM node:20.9.0-alpine3.18
WORKDIR /app
COPY package.json /app
RUN npm install && npm cache clean --force
COPY . /app
CMD node src/index.js
EXPOSE 3000