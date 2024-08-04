import NodeCache from "node-cache";
import axios from "axios"
import {AllStatus, LineStatus, StatusDetail} from "./LineStatus";
import {TrainRoute} from "./TravelData";
import TflStatusResponse, {OvergroundArrivalResponse} from "./Tfl";
import {octopusService} from "../octopus/OctopusService";

class TubeService {

    tubeCache: NodeCache;
    tflUrl: string;

    constructor(nodeCache) {
        this.tubeCache = nodeCache
        this.tflUrl = `https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground/Status?app_key=${process.env.TFL_API_KEY}`
    }

    async getTubeLineStatus(): Promise<void | AllStatus> {
        const lineStatusCache: AllStatus = this.tubeCache.get('tubeStatus')
        if (lineStatusCache === undefined) {
            console.log("Cache miss for tube status")
            return Promise.reject("No tube cache");
        }
        return Promise.resolve(lineStatusCache)
    }

    async getDashboardTubeLineStatus(): Promise<Array<LineStatus | TrainRoute>> {
        const dashboardTubeStatus: Array<LineStatus | TrainRoute> = this.tubeCache.get('dashboardTubeStatus')
        if (dashboardTubeStatus === undefined) {
            console.log("Cache miss for dashboard tube status")
            return Promise.reject("No dashboard tube cache");
        }
        return Promise.resolve(dashboardTubeStatus)
    }

    async fillTubeLineStatusCache() {
        //get the data and cache
        return axios.get(this.tflUrl)
            .then(response => {

                const lines = response.data as Array<TflStatusResponse>;
                this.fillAllTubeStatus(lines);
                this.fillDashboardStatus(lines);
            })
            .catch((error) => {
                console.error(error)
                return error;
            })
    }

    fillAllTubeStatus(lines: Array<TflStatusResponse>) {
        const allStatuses = lines.map(line => {
            const statuses = line.lineStatuses.map(lineStatus => {
                return new StatusDetail(lineStatus.statusSeverityDescription, lineStatus.reason)
            })
            return new LineStatus(line.id, line.name, statuses)
        })

        const result = new AllStatus(allStatuses, new Date);
        this.tubeCache.set('tubeStatus', result);
    }

    fillDashboardStatus(lines: Array<TflStatusResponse>) {
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
                        const data = response.data as Array<OvergroundArrivalResponse>;
                        return data.filter(entry => {
                            const now = new Date();
                            const expectedArrival = new Date(entry.expectedArrival);
                            return expectedArrival > now;
                        })
                        .filter(entry => entry.expectedArrival)
                        .sort(function (a, b) {
                            const aDate: Date = a.expectedArrival;
                            const bDate: Date = b.expectedArrival;
                            return aDate.getTime() - bDate.getTime();
                        })
                        .map(entry => new Date(entry.expectedArrival));
                    })
                    .then(times => {

                    const statuses: Array<LineStatus | TrainRoute> = (this.tubeCache.get('dashboardTubeStatus') as AllStatus).lineStatuses;
                    const overground = statuses.filter(entry  => {
                        return entry.name === 'London Overground';
                    })[0] as TrainRoute;
                    overground.nextTimesArr = Array.from(times);
                    this.tubeCache.set('dashboardTubeStatus', statuses);

                }).catch(error => console.log('Error getting overground times at new cross'));
            }
            return new TrainRoute(lineName, statusOk, nextTimesArr, isUnderground);
        })

        const result = new AllStatus(dashboardStatus, new Date);
        this.tubeCache.set('dashboardTubeStatus', result);
    }
}

const ttl15Mins = 900
const checkEvery2Mins = 120

export const tubeService = new TubeService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}))
