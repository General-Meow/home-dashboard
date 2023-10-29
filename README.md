# Home Dashboard

A tiny backend service written in JS and node to provide dashboard info for home

### Commands

- docker build -t generalmeow/home-dashboard .
- docker run -d --name home-dashboard -p 3000:3000 -rm generalmeow/home-dashboard

### Dev env

- Node 21
- `node install`
- `node start`

You will need to create an `.env` file with the following: 

```properties
OCTOPUS_API_KEY="sk_live_xxxxx"
```

