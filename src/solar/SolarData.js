class SolarData {
    constructor(timestamp, entryArr) {
        this.timestamp = timestamp;
        this.entryArr = entryArr;
    }
}

class SolarEnergyData {
    constructor(type, description, amount, unit) {
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.unit = unit;
    }

}

module.exports = {SolarData, SolarEnergyData};