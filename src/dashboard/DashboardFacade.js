const DashboardData = require('./DashboardData');
const EnergyData = require('../octopus/EnergyData');
const [TravelData, BusRoute, TrainRoute] = require('../travel/TravelData');
const [WeatherData, WeatherDay] = require('../weather/WeatherData');
const [SolarData, SolarEnergyData] = require('../solar/SolarData');
const [HalfHourPrice] = require('../octopus/HalfHourPrice');
const octopusService = require('../octopus/OctopusService');

class DashboardFacade {

    async getDashboardData() {
        const energyData = this.getEnergyData();
        const travel = this.getTravelData();
        const weather = this.getWeatherData();
        const solar = this.getSolarData();


        const dashboardData = new DashboardData(await energyData, await travel, weather, solar);
        return dashboardData;
        // return Promise.resolve(dashboardData);
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

        const busRoutes = [];
        busRoutes.push(new BusRoute(321, 'Home', 'Riverston', ['09:02', '09:17', '09:22']))
        busRoutes.push(new BusRoute(321, 'Riverston', 'Home', ['09:02', '09:17', '09:22']))
        busRoutes.push(new BusRoute(255, 'Home', 'Canada Water', ['09:02', '09:17', '09:22']))
        travelData.busRouteArr = busRoutes;

        const trainRoutes = [];
        trainRoutes.push(new TrainRoute('Northern', false, [], true))
        trainRoutes.push(new TrainRoute('Victoria', false, [], true))
        trainRoutes.push(new TrainRoute('Circle', false, [], true))
        trainRoutes.push(new TrainRoute('Overground', true, ['09:02', '09:17', '09:22'], false))
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

    getSolarData() {
        const solarData = new SolarData();
        solarData.timestamp = this.getFormattedTimestamp();

        const solarEntries = [];
        solarEntries.push(new SolarEnergyData('Panel', 'Generating From Solar', 3, 'Kwh'));
        solarEntries.push(new SolarEnergyData('Home', 'House Usage', 200, 'w'));
        solarEntries.push(new SolarEnergyData('Battery', 'Battery Charge', 100, '%'));
        solarEntries.push(new SolarEnergyData('Predicted', 'Predicted Generation', 6, 'Kwh'));

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