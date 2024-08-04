export default class HourlyWeather{

  hour: Number;
  tempurature: Number;
  chanceOfRain: String;
  description: String;

  constructor(hour, temperature, chanceOfRain, description) {
    this.hour = hour
    this.tempurature = temperature
    this.chanceOfRain = chanceOfRain
    this.description = description
  }
}
