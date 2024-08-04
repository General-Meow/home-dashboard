export class DayPrices {
    day: Date;
    halfHourPricesArr: HalfHourPrice[];
    asOfDateTime: Date;

    constructor(day: Date, halfHourPricesArr: HalfHourPrice[], asOfDateTime: Date) {
        this.day = day;
        this.halfHourPricesArr = halfHourPricesArr;
        this.asOfDateTime = asOfDateTime;
    }
}

export class HalfHourPrice {
    price: number;
    fromDateTime: Date;
    toDateTime: Date;

    constructor(price: number, fromDateTime: Date, toDateTime: Date) {
        this.price = price;
        this.fromDateTime = fromDateTime
        this.toDateTime = toDateTime
    }
}