const DashboardData = require('./DashboardData');
const EnergyData = require('../octopus/EnergyData');
const {TravelData, BusRoute, TrainRoute} = require('../travel/TravelData');
const {WeatherData, WeatherDay} = require('../weather/WeatherData');
const {SolarData, SolarEnergyData} = require('../solar/SolarData');
const {HalfHourPrice} = require('../octopus/HalfHourPrice');
const octopusService = require('../octopus/OctopusService');
const busService = require('../travel/BusService');
const tubeService = require('../travel/TubeService');
const solarService = require('../solar/SolarService');

class DashboardFacade {

    async getDashboardData() {
        const energyData = this.getEnergyData();
        const travel = this.getTravelData();
        const weather = this.getWeatherData();
        const solar = this.getSolarData();

        const dashboardData = new DashboardData();

        try {
            dashboardData.energy = await energyData;
        } catch (e) {
            console.error('Error while waiting for energy data', e);
        }

        try {
            dashboardData.travel = await travel;
        } catch (e) {
            console.error('Error while waiting for travel data', e);
        }

        try {
            dashboardData.weather = await weather;
        } catch (e) {
            console.error('Error while waiting for weather data', e);
        }

        try {
            dashboardData.solar = await solar;
        } catch (e) {
            console.error('Error while waiting for solar data', e);
        }
        return dashboardData;
    }

    async getEnergyData() {
        const energyData = new EnergyData();

        const todaysAgilePrices = octopusService.getTodaysAgilePrices();
        todaysAgilePrices.then(prices => {

            const now = new Date();
            energyData.currentElectricPrice = prices.halfHourPricesArr
                .find(halfHourPrice => (now >= halfHourPrice.fromDateTime) && (now <= halfHourPrice.toDateTime))
                .price;

            // energyData.currentElectricPrice = 11.5;
            energyData.todaysGasPrice = 4.2;
            energyData.timestamp = this.getFormattedTimestampForDate(prices.asOfDateTime);

            let cheapest = {price: 100};
            let expensive = {price: -100};

            prices.halfHourPricesArr.forEach(entry => {
                if (entry.price < cheapest.price) {
                    cheapest = entry;
                }
                if (entry.price > expensive.price) {
                    expensive = entry;
                }
            });
            energyData.cheapestToday = cheapest.price;
            energyData.expensiveToday = expensive.price;
            energyData.next3HoursPriceArr = prices.halfHourPricesArr;

            if (cheapest.price <= 0) {
                energyData.alertMessage = 'Free Electric today';
            } else if (cheapest.price <= 5) {
                energyData.alertMessage = 'Cheap Electric today';
            }
        }).catch(e => {
            console.error('Error while getting data from octopus cache', e);
        })


        return Promise.resolve(energyData);
    }

    async getTravelData() {
        const travelData = new TravelData();
        travelData.timestamp = this.getFormattedTimestamp();

        const busRoutes = await busService.getAllBusTimes()
        travelData.busRouteArr = busRoutes;

        const trainRoutes = await tubeService.getDashboardTubeLineStatus();
        travelData.trainRouteArr = trainRoutes;
        return travelData;
    }

    getWeatherData() {
        const weatherData = new WeatherData();
        weatherData.timestamp = this.getFormattedTimestamp();

        weatherData.todaysWeather = new WeatherDay('Wednesday', 20, 23, 16, 'Sunny');

        const nextFiveDays = [];
        for (let i = 0; i < 5; i++) {
            nextFiveDays.push(new WeatherDay('Monday', 20, 22, 12, 'Cloudy'));
        }
        weatherData.nextFiveDays = nextFiveDays;
        return weatherData;
    }

    async getSolarData() {
        const solarData = new SolarData();
        solarData.timestamp = this.getFormattedTimestamp();

        const solarEntries = await solarService.getEnergyFlows();

        solarData.entries = solarEntries;
        return solarData;
    }

    getFormattedTimestamp() {
        const date = new Date().toLocaleDateString('en-UK', {year: 'numeric', month: '2-digit', day: '2-digit'});
        const time = new Date().toLocaleTimeString();

        return `${date} ${time}`;
    }

    getFormattedTimestampForDate(dateToFormat) {
        const date = dateToFormat.toLocaleDateString('en-UK', {year: 'numeric', month: '2-digit', day: '2-digit'});
        const time = dateToFormat.toLocaleTimeString();

        return `${date} ${time}`;
    }
}

const dashboardFacade = new DashboardFacade();

module.exports = dashboardFacade;