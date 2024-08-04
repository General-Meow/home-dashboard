export class TravelData {

    timestamp: Date;
    busRouteArr: BusRoute[];
    trainRouteArr: TrainRoute[];

    constructor(){
    }
}

export class BusRoute {
    routeNumber: number;
    routeFrom: string;
    routeTo: string;
    nextBusTimesArr: Array<number>;

    constructor(routeNumber: number, routeFrom: string, routeTo: string, nextBusTimesArr: Array<number>) {
        this.routeNumber = routeNumber;
        this.routeFrom = routeFrom;
        this.routeTo = routeTo;
        this.nextBusTimesArr = nextBusTimesArr;
    }
}

export class BusTime {
    busAtTime: Date;
    busAtTimeInMinutes: number;

    constructor(busAtTime: Date, busAtTimeInMinutes: number) {
        this.busAtTime = busAtTime;
        this.busAtTimeInMinutes = busAtTimeInMinutes;
    }
}

export class TrainRoute {
    name: string;
    statusOk: boolean;
    nextTimesArr: Array<Date>;
    isUnderground: boolean;

    constructor(name: string, statusOk: boolean, nextTimesArr: Array<Date>, isUnderground: boolean) {
        this.name = name;
        this.statusOk = statusOk;
        this.nextTimesArr = nextTimesArr;
        this.isUnderground = isUnderground;
    }
}
