FROM node:slim
MAINTAINER "Paul Hoang 2024"
#set NODE_ENV to production using -e flag in production to decrease the logging
ENV NODE_ENV="development"
ENV OCTOPUS_API_KEY="docker default octopus api key - override"
ENV OCTOPUS_ACCOUNT_NUMBER="docker default octopus account number - override"
ENV TFL_API_KEY="docker default tfl api key - override"

WORKDIR /app

COPY package.json /app
COPY . /app
RUN npm install && npm run build && npm cache clean --force
EXPOSE 3000
ENTRYPOINT ["node", "/app/dist/src/index"]
