import {HalfHourPrice} from "./HalfHourPrice";

export default class EnergyData {

    currentElectricPrice: number;
    todaysGasPrice: number;
    next3HoursPriceArr: HalfHourPrice[];
    timestamp: Date;
    cheapestToday: number;
    expensiveToday: number;
    alertMessage: string

    constructor(){}
}

