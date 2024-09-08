import app from "./app";
import {weatherService} from "./weather/WeatherService";
import {tubeService} from "./travel/TubeService";
import {octopusService} from "./octopus/OctopusService";
import {solarService} from "./solar/SolarService";;
import {dashboardFacade} from "./dashboard/DashboardFacade";
import schedule from "node-schedule";
import {busService} from "./travel/BusService";

const port = process.env.PORT || 3000

app.listen(port, async () => {
    console.log("server is up on port", port);

    await octopusService.fillTodaysGasPriceCache();
    await octopusService.fillTodaysAgilePricesCache();
    await octopusService.fillTomorrowsAgilePricesCache();
    await tubeService.fillTubeLineStatusCache();
    await weatherService.fillTodaysCache();
    await weatherService.fillForecastCache();

    await weatherService.fillDashboardCache();
    await solarService.fillCache();
    await busService.cacheAllBusRoutes();


    console.log('scheduling job')
    //run every 10 minutes
    const scheduleJob = schedule.scheduleJob('*/10 * * * *', async function(){
        try {
            await tubeService.fillTubeLineStatusCache();
            await weatherService.fillTodaysCache();
            await weatherService.fillForecastCache();
            await weatherService.fillDashboardCache();
            await solarService.fillCache();
            await busService.cacheAllBusRoutes();
        } catch (error) {
            console.error('schedule job error in 10 minutes', error);
        }
    });

    const every30MinScheduleJob = schedule.scheduleJob('*/30 * * * *', async function(){
        try {
            await octopusService.fillTodaysAgilePricesCache();
            await octopusService.fillTomorrowsAgilePricesCache();
            await octopusService.fillTodaysGasPriceCache();
        } catch (error) {
            console.error('schedule job error in 30 minutes', error);
        }
    });

    const every6HourScheduleJob = schedule.scheduleJob('0 */6 * * *', function(){
    });

    // const every24HourScheduleJob = schedule.scheduleJob('1 0 * * *', async function(){
    //     try {
    //         await octopusService.fillTodaysGasPriceCache();
    //     } catch (error) {
    //         console.error('schedule job error in 24 hours', error);
    //     }
    // });

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
