import HourlyWeather from "./HourlyWeather";

export default class Weather {

  day: string;
  temperatureNow: number;
  description: string;
  hourlyWeatherArray: Array<HourlyWeather>;
  asOfDateTime: Date;

  constructor(day: string, temperatureNow: number, description: string, hourlyWeatherArray: Array<HourlyWeather>, asOfDateTime: Date) {
    this.day = day;
    this.temperatureNow = temperatureNow;
    this.description = description;
    this.hourlyWeatherArray = hourlyWeatherArray;
    this.asOfDateTime = asOfDateTime;
  }

}

export class Forecast {
  week: Array<Weather>;

  constructor(week: Array<Weather>) {
    this.week = week;
  }
}