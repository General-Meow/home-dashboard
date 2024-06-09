const app = require('./app')
const weatherService = require('./weather/WeatherService')
const tubeService = require('./travel/TubeService')
const octopusService = require('./octopus/OctopusService')
const solarService = require('./solar/SolarService');
const dashboardFacade = require('./dashboard/DashboardFacade');
const {response} = require("express");
const schedule = require("node-schedule");

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("server is up on port", port);

    octopusService.fillTodaysAgilePricesCache();
    octopusService.fillTomorrowsAgilePricesCache();
    tubeService.fillTubeLineStatusCache();
    weatherService.fillTodaysCache();
    weatherService.fillForecastCache();
    solarService.fillCache();

    const scheduleJob = schedule.scheduleJob('* */10 * * * *', function(){
        octopusService.fillTodaysAgilePricesCache();
        octopusService.fillTomorrowsAgilePricesCache();
        tubeService.fillTubeLineStatusCache();
        weatherService.fillTodaysCache();
        weatherService.fillForecastCache();
        solarService.fillCache();
    });
})

app.get('', (req, res) => {
    res.render('index', {})
})

app.get('/todays-weather', (req, res) => {
    weatherService.getTodayWeather()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error('Error thrown by service', error)
        res.sendStatus(500)
    })
})

app.get('/forecast-weather', (req, res) => {
    weatherService.getForecastWeather()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error('Error thrown by service', error)
        res.sendStatus(500)
    })

})

app.get('/tube-status', (req, res) => {
    tubeService.getTubeLineStatus()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error('Error thrown by service', error)
        res.sendStatus(500)
    })
})

app.get('/todays-electric-prices', (req, res) => {
    octopusService.getTodaysAgilePrices()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error('Error thrown by service', error)
        res.sendStatus(500)
    })
})

app.get('/tomorrows-electric-prices', (req, res) => {
    octopusService.getTomorrowsAgilePrices()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error('Error thrown by service', error)
        res.sendStatus(500)
    })
})

app.get('/solar-flow', (req, res) => {
    solarService.getEnergyFlows()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error('Error thrown by service', error)
        res.sendStatus(500)
    });
})
app.get('/dashboard', (req, res) => {
    dashboardFacade.getDashboardData()
        .then(result => {
            res.json(result)
        }).catch((error) => {
        console.error('Error thrown by service', error)
        res.sendStatus(500)
    });
})
