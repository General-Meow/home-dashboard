# Home Dashboard

A tiny backend service written in node to provide dashboard info for the home dashboard fe project

### Commands

- docker build -t generalmeow/home-dashboard .
- docker run -d --name home-dashboard -p 3000:3000 --restart=always --log-opt max-size=10m generalmeow/home-dashboard

### Dev env

- Node 21
- `node install`
- `node start`

You will need to create an `.env` file with the following: 

```properties
OCTOPUS_API_KEY="sk_live_xxxxx"
```
