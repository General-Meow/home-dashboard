export class SolarData {
    timestamp: Date;
    entryArr: SolarEnergyData[];

    constructor(timestamp?: Date, entryArr?: SolarEnergyData[]) {
        this.timestamp = timestamp;
        this.entryArr = entryArr;
    }
}

export class SolarEnergyData {
    type: string;
    description: string;
    amount: number;
    unit: string;

    constructor(type: string, description: string, amount: number, unit: string) {
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.unit = unit;
    }

}
