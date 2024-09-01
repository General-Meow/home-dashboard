import NodeCache from "node-cache";
import axios from "axios"
import {AllStatus, LineStatus, StatusDetail} from "./LineStatus";
import {TrainRoute} from "./TravelData";
import TflStatusResponse, {OvergroundArrivalResponse} from "./Tfl";

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
        console.log('filling tube line status cache');
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

    async fillDashboardStatus(lines: Array<TflStatusResponse>) {
        const dashboardStatuses = lines.map((line) => {
            const lineName = line.name;
            const statusOk = line.lineStatuses.filter(lineStatus => {
                return lineStatus.statusSeverity !== 10;
            }).length > 0;
            let nextTimesArr = [];
            const isUnderground = line.modeName === 'tube';
            return new TrainRoute(lineName, statusOk, nextTimesArr, isUnderground);
        })

        for (let dashboardStatus of dashboardStatuses) {
            if (dashboardStatus.name === 'London Overground') {
                console.info('found london underground')
                const newCrossOvergroundArrivalTimesUrl = `https://api.tfl.gov.uk/StopPoint/HUBNWX/Arrivals?app_key=${process.env.TFL_API_KEY}`
                const overgroundTrainTimes = await axios.get(newCrossOvergroundArrivalTimesUrl)
                    .then(response => {
                        const data = response.data as Array<OvergroundArrivalResponse>;

                        return data
                            .map(entry => {
                                entry.expectedArrival = new Date(entry.expectedArrival);
                                return entry;
                            })
                            .filter(entry => {
                                const now = new Date();
                                return entry.expectedArrival > now;
                            })
                            .filter(entry => entry.expectedArrival)
                            .sort(function (a, b) {
                                const aDate: Date = a.expectedArrival;
                                console.log('aDate', aDate);
                                const bDate: Date = b.expectedArrival;
                                return aDate.getTime() - bDate.getTime();
                            })
                            .map(entry => new Date(entry.expectedArrival));
                    })

                dashboardStatus.nextTimesArr = overgroundTrainTimes;
            }
        }

        const result = new AllStatus(dashboardStatuses, new Date);
        this.tubeCache.set('dashboardTubeStatus', result);
    }
}

const ttl15Mins = 900
const checkEvery2Mins = 120

export const tubeService = new TubeService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}))
