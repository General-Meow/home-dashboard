class TravelData {

    constructor(timestamp, busRoutesArr, trainRoutesArr) {
        this.timestamp = timestamp;
        this.busRouteArr = busRoutesArr;
        this.trainRouteArr = trainRoutesArr;
    }
}

class BusRoute {
    constructor(routeNumber, routeFrom, routeTo, nextBusTimesArr) {
        this.routeNumber = routeNumber;
        this.routeFrom = routeFrom;
        this.routeTo = routeTo;
        this.nextBusTimesArr = nextBusTimesArr;
    }
}

class BusTime {
    constructor(busAtTime, busAtTimeInMinutes) {
        this.busAtTime = busAtTime;
        this.busAtTimeInMinutes = busAtTimeInMinutes;
    }
}

class TrainRoute {
    constructor(lineName, statusOk, nextTimesArr, isUnderground) {
        this.lineName = lineName;
        this.statusOk = statusOk;
        this.nextTimesArr = nextTimesArr;
        this.isUnderground = isUnderground;
    }
}




module.exports = {TravelData, BusRoute, TrainRoute, BusTime};