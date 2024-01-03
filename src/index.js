const app = require('./app')
const weatherService = require('./weather/WeatherService')
const tubeService = require('./travel/TubeService')
const octopusService = require('./octopus/OctopusService')
const solarService = require('./solar/SolarService');
const {response} = require("express");

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("server is up on port", port)
})

app.get('', (req, res) => {
    res.render('index', {})
})

app.get('/todays-weather', (req, res) => {
    weatherService.getTodayWeather()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error(error)
    })
})

app.get('/forecast-weather', (req, res) => {
    weatherService.getForecastWeather()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error(error)
    })

})

app.get('/tube-status', (req, res) => {
    tubeService.getTubeLineStatus()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error(error)
        throw error;
    })
})

app.get('/todays-electric-prices', (req, res) => {
    octopusService.getTodaysAgilePrices()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error(error)
    })
})

app.get('/tomorrows-electric-prices', (req, res) => {
    octopusService.getTomorrowsAgilePrices()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error(error)
    })
})

app.get('/solar-flow', (req, res) => {
    solarService.getEnergyFlows()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error(error)
    });
})
