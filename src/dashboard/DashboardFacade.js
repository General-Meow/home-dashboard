const DashboardData = require('./DashboardData');
const EnergyData = require('../octopus/EnergyData');
const [TravelData, BusRoute, TrainRoute] = require('../travel/TravelData');
const [WeatherData, WeatherDay] = require('../weather/WeatherData');
const [SolarData, SolarEnergyData] = require('../solar/SolarData');
const [HalfHourPrice] = require('../octopus/HalfHourPrice');

class DashboardFacade {

    getDashboardData() {
        const energyData = this.getEnergyData();
        const travel = this.getTravelData();
        const weather = this.getWeatherData();
        const solar = this.getSolarData();
        const dashboardData = new DashboardData(energyData, travel, weather, solar);
        return Promise.resolve(dashboardData);
    }

    getEnergyData() {
        const energyData = new EnergyData();
        energyData.currentElectricPrice = 11.5;
        energyData.todaysGasPrice = 4.2;

        let next3HoursArr = [];
        for (let i = 0; i < 6; i++) {
            var halfHourPrice = new HalfHourPrice(15, new Date(), new Date());
            next3HoursArr.push(halfHourPrice);
        }
        energyData.next3HoursPriceArr = next3HoursArr;
        energyData.timestamp = this.getFormattedTimestamp();
        energyData.cheapestToday = 5;
        energyData.expensiveToday = 18;
        energyData.alertMessage = 'Free Electric today';
        return energyData;
    }

    getTravelData() {
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
        solarEntries.push(new SolarEnergyData('Home', 'House Usage',200, 'w'));
        solarEntries.push(new SolarEnergyData('Battery', 'Battery Charge',100, '%'));
        solarEntries.push(new SolarEnergyData('Predicted', 'Predicted Generation', 6, 'Kwh'));

        solarData.entries = solarEntries;
        return solarData;
    }

    getFormattedTimestamp() {
        const date = new Date().toLocaleDateString('en-UK', {year: 'numeric', month: '2-digit', day: '2-digit'});
        const time = new Date().toLocaleTimeString();

        return `${date} ${time}`;
    }
}

const dashboardFacade = new DashboardFacade();

module.exports = dashboardFacade;