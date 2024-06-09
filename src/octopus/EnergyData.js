class EnergyData {
    constructor(currentElectricPrice, todaysGasPrice, next3HoursPriceArr, timestamp,
                cheapestToday, expensiveToday, alertMessage) {
        this.currentElectricPrice = currentElectricPrice;
        this.todaysGasPrice = todaysGasPrice;
        this.next3HoursPriceArr = next3HoursPriceArr;
        this.timestamp = timestamp;
        this.cheapestToday = cheapestToday;
        this.expensiveToday = expensiveToday;
        this.alertMessage = alertMessage;
    }
}

module.exports = EnergyData;