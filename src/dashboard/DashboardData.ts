import EnergyData from "../octopus/EnergyData";
import {TravelData} from "../travel/TravelData";
import {WeatherData} from "../weather/WeatherData";
import {SolarData} from "../solar/SolarData";

export class DashboardData {
    energy: EnergyData;
    travel: TravelData;
    weather: WeatherData;
    solar: SolarData;

    constructor(){}
}
