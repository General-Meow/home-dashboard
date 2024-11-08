# Home Dashboard

A backend service written in nodejs to provide dashboard info for the home dashboard fe project.

### Development

To start the service simply use

`npm start`

### Building

- docker build -t generalmeow/home-dashboard .
- docker run -d --name home-dashboard -p 3000:3000 --restart=always --log-opt max-size=10m generalmeow/home-dashboard

### Dev env

- Node 21
- `npm install`
- `npm start`

You will need to create an `.env` file with the following: 

```properties
OCTOPUS_API_KEY="sk_live_xxxxx"
TFL_API_KEY="xxxx"
OCTOPUS_ACCOUNT_NUMBER="xxx"
```
