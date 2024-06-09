class DayPrices {
    constructor(day, halfHourPricesArr, asOfDateTime) {
        this.day = day;
        this.halfHourPricesArr = halfHourPricesArr;
        this.asOfDateTime = asOfDateTime;
    }
}

class HalfHourPrice {
    constructor(price, fromDateTime, toDateTime) {
        this.price = price;
        this.fromDateTime = fromDateTime
        this.toDateTime = toDateTime
    }
}

module.exports = [HalfHourPrice, DayPrices]