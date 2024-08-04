import {DashboardData} from "./DashboardData";
import EnergyData from "../octopus/EnergyData";
import {TravelData, BusRoute, TrainRoute} from "../travel/TravelData";
import {WeatherDay} from "../weather/WeatherData";
import {SolarData, SolarEnergyData} from "../solar/SolarData";
import {octopusService} from "../octopus/OctopusService";
import {busService} from "../travel/BusService";
import {tubeService} from "../travel/TubeService";
import {solarService} from "../solar/SolarService";
import {weatherService} from "../weather/WeatherService";

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
        energyData.timestamp = new Date();

        const todaysAgilePrices = octopusService.getTodaysAgilePrices();
        todaysAgilePrices.then(prices => {

            const now = new Date();
            energyData.currentElectricPrice = prices.halfHourPricesArr
                .find(halfHourPrice => (now >= halfHourPrice.fromDateTime) && (now <= halfHourPrice.toDateTime))
                .price;

            energyData.todaysGasPrice = 4.2;

            let cheapest = {price: 100};
            let expensive = {price: -100};

            if(prices.halfHourPricesArr) {
                prices.halfHourPricesArr.forEach(entry => {
                    if (entry.price < cheapest.price) {
                        cheapest = entry;
                    }
                    if (entry.price > expensive.price) {
                        expensive = entry;
                    }
                });
            }
            energyData.cheapestToday = cheapest.price;
            energyData.expensiveToday = expensive.price;
            energyData.next3HoursPriceArr = prices.halfHourPricesArr;

            if (cheapest.price <= 0) {
                energyData.alertMessage = 'Free Electric today';
            } else if (cheapest.price <= 5) {
                energyData.alertMessage = 'Cheap Electric today';
            }

            const todaysGasUnitPricePromise = octopusService.getTodaysGasPrice();
            todaysGasUnitPricePromise.then(price => {
                if (price) {
                    energyData.todaysGasPrice = price;
                }
            })

        }).catch(e => {
            console.error('Error while getting data from octopus cache', e);
        })


        return Promise.resolve(energyData);
    }

    async getTravelData() {
        const travelData = new TravelData();
        travelData.timestamp = new Date();

        const busRoutes = await busService.getAllBusTimes()
        travelData.busRouteArr = busRoutes;

        const trainRoutes = await tubeService.getDashboardTubeLineStatus() as TrainRoute[];
        travelData.trainRouteArr = trainRoutes;
        return travelData;
    }

    async getWeatherData() {

        const weatherData = await weatherService.getDashboardWeather();
        weatherData.timestamp = new Date();

        weatherData.todaysWeather = new WeatherDay('Wednesday', 20, 23, 16, 'Sunny');

        const nextFiveDays = [];
        for (let i = 0; i < 5; i++) {
            nextFiveDays.push(new WeatherDay('Monday', 20, 22, 12, 'Cloudy'));
        }
        weatherData.nextFiveDays = nextFiveDays;
        return weatherData;
    }

    async getSolarData() {
        const solarData = await solarService.getEnergyFlows();
        solarData.timestamp = new Date();
        return solarData;
    }

}

export const dashboardFacade = new DashboardFacade();
