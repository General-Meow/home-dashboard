class Weather {
  constructor(day, temperatureNow, description, hourlyWeatherArray, asOfDateTime) {
    this.day = day;
    this.temperatureNow = temperatureNow;
    this.description = description;
    this.hourlyWeatherArray = hourlyWeatherArray;
    this.asOfDateTime = asOfDateTime;
  }

}

module.exports = Weather

