import Weather, {Forecast} from "./Weather";
import HourlyWeather from "./HourlyWeather";
import axios from "axios";
import NodeCache from "node-cache";
import {WeatherData, WeatherDay} from "./WeatherData";
import utils from "../common/Utils";

class WeatherService {

    weatherCache: NodeCache;
    todayUrl: string;
    tenDayForecastUrl: string;
    dashboardUrl: string;
    constructor(weatherCacheParam: NodeCache) {
        const lat = 51.507351
        const lon = -0.127758

        this.weatherCache = weatherCacheParam
        this.todayUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&hourly=temperature_2m,weathercode,precipitation_probability,precipitation,rain,windspeed_10m,winddirection_10m&forecast_days=1`
        this.tenDayForecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,precipitation,rain,weathercode,windspeed_10m,winddirection_10m&daily=weathercode&timezone=GMT`
        this.dashboardUrl = 'https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FLondon';
    }

    async getTodayWeather(): Promise<Weather> {
        const todayCache: Weather = this.weatherCache.get('todayWeatherCache')
        if (todayCache === undefined) {
            console.log("cache miss for today's weather, getting data....")
            return Promise.reject("No weather data");
        }
        return Promise.resolve(todayCache)
    }

    async getForecastWeather(): Promise<Forecast> {
        const forecastWeatherCache: Forecast = this.weatherCache.get('forecastWeatherCache');
        if (forecastWeatherCache === undefined) {
            console.log("cache miss for forecast getting data....")
            return Promise.reject("No weather data");
        }
        return Promise.resolve(forecastWeatherCache)
    }


    async getDashboardWeather():Promise<WeatherData> {
        const dashboardWeatherCache: WeatherData = this.weatherCache.get('dashboardWeatherCache');
        if (dashboardWeatherCache === undefined) {
            console.log("cache miss for dashboard weather getting data....")
            return Promise.reject("No weather data");
        }
        return Promise.resolve(dashboardWeatherCache)
    }



    async fillDashboardCache(): Promise<void | WeatherData> {
        return axios.get(this.dashboardUrl)
            .then(response => {
                const responseData = response.data;

                const weatherData = new WeatherData();
                weatherData.timestamp = new Date();

                weatherData.todaysWeather = new WeatherDay(utils.getDateName(new Date()),
                    responseData.current.temperature_2m, responseData.daily.temperature_2m_max[0],
                    responseData.daily.temperature_2m_min[0], this.convertWeatherCode(responseData.daily.weather_code[0]));

                const dailyData = response.data.daily;

                const forecastData = [];
                for (let i = 1; i < 6; i++) {
                    const date = dailyData.time[i];
                    const weatherCode = dailyData.weather_code[i];
                    const maxTemp = dailyData.temperature_2m_max[i];
                    const minTemp = dailyData.temperature_2m_min[i];
                    forecastData.push(new WeatherDay(utils.getDateName(new Date(date)), null, maxTemp, minTemp, this.convertWeatherCode(weatherCode)));
                }
                weatherData.nextFiveDays = forecastData;

                this.weatherCache.set('dashboardWeatherCache', weatherData);
                return weatherData;
            }).catch(error => {
                console.error('dashboard weather error', error);
                this.weatherCache.del('dashboardWeatherCache');
            })
    }

    async fillTodaysCache(): Promise<void | Weather> {
        return axios.get(this.todayUrl)
            .then((response) => {

                const weatherData = new WeatherData();

                const data = response.data;

                const current = data.current;
                const units = data.current_units;
                const hourly = data.hourly;

                const hourlyWeatherArr = new Array<HourlyWeather>();
                for (let i = 0; i < hourly.time.length; i++) {
                    const hour = hourly.time[i]
                    const temp = hourly.temperature_2m[i]
                    const rainProbability = hourly.precipitation_probability[i]
                    const weatherCode = hourly.weathercode[i]
                    const hourlyWeather = new HourlyWeather(hour, temp,
                        `${rainProbability}${data.hourly_units.precipitation_probability}`, this.convertWeatherCode(weatherCode));
                    hourlyWeatherArr.push(hourlyWeather)
                }

                const todaysWeather: Weather = new Weather('Today', current.temperature_2m + units.temperature_2m,
                    this.convertWeatherCode(current.weathercode), hourlyWeatherArr, new Date());

                this.weatherCache.set('todayWeatherCache', todaysWeather);
                return todaysWeather;
            })
            .catch(error => {
                console.error('todays weather error', error);
                this.weatherCache.set('todayWeatherCache', {});
            })
    }

    async fillForecastCache(): Promise<void | Forecast> {
        try {
            const response = await axios.get(this.tenDayForecastUrl);
            const data = response.data;

            const week = new Array<Weather>();


            const hourly = data.hourly;
            let day = '';
            const hourlyWeather = new Array<HourlyWeather>();
            for (let i = 0; i < hourly.time.length; i++) {
                var time = hourly.time[i];
                var temp = hourly.temperature_2m[i];
                var rainProbability = hourly.precipitation_probability[i];
                var weatherCode = hourly.weathercode[i];
                var splitTime = time.split('T');

                if (day === '') {
                    day = splitTime[0];
                }

                if (day != splitTime[0]) {
                    //new day create the weather with all the current hours
                    week.push(new Weather(day, null, null, hourlyWeather, new Date()));
                    day = splitTime[0];
                }

                hourlyWeather.push(new HourlyWeather(time, temp,
                    `${rainProbability}${data.hourly_units.precipitation_probability}`,
                    this.convertWeatherCode(weatherCode)));
            }

            const result_1 = new Forecast(week);
            this.weatherCache.set('forecastWeatherCache', result_1);
            return result_1;
        } catch (error) {
            console.error('forefcast weather error', error);
            this.weatherCache.set('forecastWeatherCache', {});
        }

    }

    convertWeatherCode(weatherCode: number) {
        switch (weatherCode) {
            case 0:
            case 1:
                return 'Clear sky'
            case 2:
                return 'Part Cloudy'
            case 3:
                return 'Cloudy'
            case 45:
            case 48:
                return 'Fog'
            case 51:
            case 53:
            case 55:
                return 'Drizzle'
            case 61:
            case 63:
            case 65:
                return 'Rain'
            case 66:
            case 67:
                return 'Freezing Rain'
            case 71:
            case 73:
            case 75:
            case 77:
                return 'Snow'
            case 80:
            case 81:
            case 82:
                return 'Heavy Rain'
            case 85:
            case 86:
                return 'Heavy Snow'
            case 95:
            case 96:
            case 99:
                return 'Thunderstorm'
            default:
                return `Unknown code ${weatherCode}`
        }
    }
}

const ttl15Mins = 900
const checkEvery2Mins = 120

export const weatherService = new WeatherService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}))
