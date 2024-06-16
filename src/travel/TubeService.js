const NodeCache = require('node-cache')
const axios = require('axios')
const {LineStatus, StatusDetail, AllStatus} = require("./LineStatus");
const {TrainRoute} = require('./TravelData');

class TubeService {

    constructor(nodeCache) {
        this.tubeCache = nodeCache
        this.tflUrl = `https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground/Status?app_key=${process.env.TFL_API_KEY}`
    }

    getTubeLineStatus() {
        const lineStatusCache = this.tubeCache.get('tubeStatus')
        if (lineStatusCache === undefined) {
            console.log("Cache miss for tube status")
            return Promise.reject("No tube cache");
        }
        return Promise.resolve(lineStatusCache)
    }

    getDashboardTubeLineStatus() {
        const dashboardTubeStatus = this.tubeCache.get('dashboardTubeStatus')
        if (dashboardTubeStatus === undefined) {
            console.log("Cache miss for dashboard tube status")
            return Promise.reject("No dashboard tube cache");
        }
        return Promise.resolve(dashboardTubeStatus)
    }

    fillTubeLineStatusCache() {
        //get the data and cache
        return axios.get(this.tflUrl)
            .then(response => {

                const lines = response.data;
                this.fillAllTubeStatus(lines);
                this.fillDashboardStatus(lines);
            })
            .catch((error) => {
                console.error(error)
                return error;
            })
    }

    fillAllTubeStatus(lines) {
        const allStatuses = lines.map(line => {
            const statuses = line.lineStatuses.map(lineStatus => {
                return new StatusDetail(lineStatus.statusSeverityDescription, lineStatus.reason)
            })
            return new LineStatus(line.id, line.name, statuses)
        })

        const result = new AllStatus(allStatuses, new Date);
        this.tubeCache.set('tubeStatus', result);
    }

    fillDashboardStatus(lines) {
        const dashboardStatus = lines.map(line => {
            const lineName = line.name;
            const statusOk = line.lineStatuses.filter(lineStatus => {
                return lineStatus.statusSeverity !== 10;
            }).length > 0;
            let nextTimesArr = [];
            const isUnderground = line.modeName === 'tube';

            if (lineName === 'London Overground') {
                console.info('found london underground')
                const newCrossOvergroundArrivalTimesUrl = `https://api.tfl.gov.uk/StopPoint/HUBNWX/Arrivals?app_key=${process.env.TFL_API_KEY}`
                const timesPromise = axios.get(newCrossOvergroundArrivalTimesUrl)
                    .then(response => {
                        const data = response.data;
                        return data.filter(entry => {
                            const now = new Date();
                            const expectedArrival = new Date(entry.expectedArrival);
                            return expectedArrival > now;
                        })
                            .filter(entry => entry.expectedArrival)
                            .sort(function (a, b) {
                                const aDate = new Date(a);
                                const bDate = new Date(b);
                                return aDate - bDate;
                            })
                            .map(entry => new Date(entry.expectedArrival));
                    })
                    .catch(error => console.log('Error getting overground times at new cross'));

                Promise.all([timesPromise]).then(times => {

                    const statuses = this.tubeCache.get('dashboardTubeStatus').lineStatuses;
                    const overground = statuses.filter(entry => {
                        return entry.lineName === 'London Overground';
                    })[0];
                    overground.nextTimesArr = times;
                    this.tubeCache.set('dashboardTubeStatus', statuses);

                });
            }
            return new TrainRoute(lineName, statusOk, nextTimesArr, isUnderground);
        })

        const result = new AllStatus(dashboardStatus, new Date);
        this.tubeCache.set('dashboardTubeStatus', result);
    }
}

const ttl15Mins = 900
const checkEvery2Mins = 120

const tubeService = new TubeService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}))

module.exports = tubeService