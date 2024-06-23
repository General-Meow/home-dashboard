class WeatherData {
    constructor(timestamp, todaysWeather, nextFiveDays) {
        this.timestamp = timestamp;
        this.todaysWeather = todaysWeather;
        this.nextFiveDays = nextFiveDays;
    }
}

class WeatherDay {
    constructor(dayName, nowTemp, highTemp, lowTemp, weatherIcon) {
        this.dayName = dayName;
        this.nowTemp = nowTemp;
        this.highTemp = highTemp;
        this.lowTemp = lowTemp;
        this.weatherIcon = weatherIcon;
    }
}

module.exports = {WeatherData, WeatherDay};