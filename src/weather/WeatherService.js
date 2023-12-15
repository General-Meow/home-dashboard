const Weather = require('./Weather')
const HourlyWeather = require('./HourlyWeather')
const axios = require('axios')
const NodeCache = require("node-cache");

class WeatherService {

  constructor(weatherCacheParam) {
    const lat = 51.507351
    const lon = -0.127758

    this.weatherCache = weatherCacheParam
    this.todayUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&hourly=temperature_2m,weathercode,precipitation_probability,precipitation,rain,windspeed_10m,winddirection_10m&forecast_days=1`
    this.tenDayForecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,precipitation,rain,weathercode,windspeed_10m,winddirection_10m&daily=weathercode&timezone=GMT`
  }

  getTodayWeather() {
    const todayCache = this.weatherCache.get('todayWeatherCache')
    if (todayCache === undefined) {
      console.log("cache miss for today's weather, getting data....")
      return this.fillTodaysCache()
    }
    return Promise.resolve(todayCache)
  }

  getForecastWeather() {
    const forecastWeatherCache = this.weatherCache.get('forecastWeatherCache');
    if (forecastWeatherCache === undefined) {
      console.log("cache miss for forecast getting data....")
      return this.fillForecastCache()
    }
    return Promise.resolve(forecastWeatherCache)
  }

  fillTodaysCache() {
    console.log(`Filling todays cache with data from url ${this.todayUrl}`)

    return axios.get(this.todayUrl)
    .then((response) => {
      const data = response.data;
      const current = data.current;
      const units = data.current_units;
      const hourly = data.hourly;

      const hourlyWeatherArr = [];
      for (let i = 0; i < hourly.time.length; i++) {
        const hour = hourly.time[i]
        const temp = hourly.temperature_2m[i]
        const rainProbability = hourly.precipitation_probability[i]
        const weatherCode = hourly.weathercode[i]
        const hourlyWeather = new HourlyWeather(hour, temp,
            `${rainProbability}${data.hourly_units.precipitation_probability}`, this.convertWeatherCode(weatherCode));
        hourlyWeatherArr.push(hourlyWeather)
      }

      const todaysWeather = new Weather('Today', current.temperature_2m + units.temperature_2m,
          this.convertWeatherCode(current.weathercode), hourlyWeatherArr, new Date());

      this.weatherCache.set('todayWeatherCache', todaysWeather)
      return todaysWeather
    })
    .catch(function (error) {
      console.error(error)
    })
  }

  fillForecastCache() {
    console.log(`Filling forecast cache with data from url ${this.tenDayForecastUrl}`)

    return axios.get(this.tenDayForecastUrl).then(
        (response) => {
          var data = response.data;
          console.log('data', data)

          var week = []
          var hourly = data.hourly;
          var day = '';
          var hourlyWeather = new Array();
          for (let i = 0; i < hourly.time.length; i++) {
            var time = hourly.time[i];
            var temp = hourly.temperature_2m[i];
            var rainProbability = hourly.precipitation_probability[i];
            var weatherCode = hourly.weathercode[i];
            var splitTime = time.split('T');

            if (day === '') {
              day = splitTime[0]
            }

            if(day != splitTime[0]) {
              //new day create the weather with all the current hours
              week.push(new Weather(day, null, null, hourlyWeather));
              day = splitTime[0]
              hourlyWeather = new Array()
            }

            hourlyWeather.push(new HourlyWeather(time, temp,
                `${rainProbability}${data.hourly_units.precipitation_probability}`,
                this.convertWeatherCode(weatherCode)))
          }

          console.log('derp', week)

          this.weatherCache.set('forecastWeatherCache', week)
          return week
        }).catch((error) => {
      console.error(error)
    })

  }

  convertWeatherCode(weatherCode) {
    switch (weatherCode) {
      case 0:
      case 1:
        return 'Clear sky'
      case 2:
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

const weatherService = new WeatherService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}))

module
    .exports = weatherService