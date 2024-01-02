FROM node:slim
MAINTAINER "Paul Hoang 2024"
#set NODE_ENV to production using -e flag in production to decrease the logging
ENV NODE_ENV="development"
ENV OCTOPUS_API_KEY="docker default octopus api key - override"

WORKDIR /app

COPY package.json /app
COPY . /app
RUN npm install && npm cache clean --force
EXPOSE 3000
ENTRYPOINT ["node", "src/index.js"]
