export class WeatherData {
    timestamp: Date;
    todaysWeather: WeatherDay;
    nextFiveDays: Array<WeatherDay>;

    constructor(timestamp?: Date, todaysWeather?: WeatherDay, nextFiveDays?: Array<WeatherDay>) {
        this.timestamp = timestamp;
        this.todaysWeather = todaysWeather;
        this.nextFiveDays = nextFiveDays;
    }
}

export class WeatherDay {

    dayName: string;
    nowTemp: number;
    highTemp: number;
    lowTemp: number;
    weatherIcon: string;

    constructor(dayName?: string, nowTemp?: number, highTemp?: number, lowTemp?: number, weatherIcon?: string) {
        this.dayName = dayName;
        this.nowTemp = nowTemp;
        this.highTemp = highTemp;
        this.lowTemp = lowTemp;
        this.weatherIcon = weatherIcon;
    }
}


