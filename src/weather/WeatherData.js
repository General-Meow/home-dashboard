class WeatherData {
    constructor(timestamp, todaysWeather, nextFiveDays) {
        this.timestamp = timestamp;
        this.todaysWeather = todaysWeather;
        this.nextFiveDays = nextFiveDays;
    }
}

class WeatherDay {
    constructor(dayName, averageTemp, highTemp, lowTemp, weatherIcon) {
        this.dayName = dayName;
        this.averageTemp = averageTemp;
        this.highTemp = highTemp;
        this.lowTemp = lowTemp;
        this.weatherIcon = weatherIcon;
    }
}

module.exports = [WeatherData, WeatherDay];