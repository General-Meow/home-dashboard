import axios from "axios";
import NodeCache from "node-cache";
import {BusTime} from "./TravelData";
import {BusRoute} from "./TravelData";

class BusService {

    busCache: NodeCache;
    busUrlTemplate: string;

    busCacheKeys = [
        '321ToRiverston',
        '321ToNewCross',
        '225ToCanadaWater',
        '225ToLewisham'
    ];
    constructor(cache) {
        this.busCache = cache;
        this.busUrlTemplate = `https://api.tfl.gov.uk/Line/BUS_NUMBER/Arrivals/STOP_ID?app_key=${process.env.TFL_API_KEY}`;
    }

    mapToBusTime = (bus) : BusTime => {
        const busAtTime = new Date(bus.expectedArrival);
        const now = new Date();
        const diff = Math.abs(busAtTime.getTime() - now.getTime());
        const minutes = Math.floor((diff/1000)/60);
        return new BusTime(busAtTime, minutes);
    }

    cacheAllBusRoutes = () => {
        console.log('filling bus route cache');
        const route321ToRiverston = this.createBusRouteUrl("321", '490009689T');
        const route321ToNewCross = this.createBusRouteUrl("321", '490014334W');
        const route225ToLewisham = this.createBusRouteUrl("225", '490006451E');
        const route225ToCanadaWater = this.createBusRouteUrl("225", '490009446W');

        const route321ToRiverstonPromise = axios.get(route321ToRiverston)
            .then(response => {
                const bussesArr = response.data;
                const busTimesArr = bussesArr
                    .filter(busRoute => busRoute.lineName === '321')
                    .map(bus => this.mapToBusTime(bus))
                const busRoute = new BusRoute(321, "New Cross", "Riverston", busTimesArr);
                this.busCache.set('321ToRiverston', busRoute);
            })
            .catch(error => {
                console.error("Error while getting data for 321 to Riverston", error);
            });

        const route321ToNewCrossPromise = Promise.resolve();
            axios.get(route321ToNewCross)
            .then(response => {
                const bussesArr = response.data;
                const busTimesArr = bussesArr.map(bus => this.mapToBusTime(bus))
                const busRoute1 = new BusRoute(321, "Riverston", "New Cross", busTimesArr);
                this.busCache.set('321ToNewCross', busRoute1);
            })
            .catch(error => {
                console.error("Error while getting data for 321 to New Cross", error);
            });

        const route225ToLewishamPromise = axios.get(route225ToLewisham)
            .then(response => {
                const bussesArr = response.data;
                const busTimesArr = bussesArr
                    .filter(busRoute => busRoute.lineName === '225')
                    .map(bus => this.mapToBusTime(bus))
                const busRoute = new BusRoute(225, "Home", "Lewisham", busTimesArr);
                this.busCache.set('225ToLewisham', busRoute);
            })
            .catch(error => {
                console.error("Error while getting data for 225 to Lewisham", error);
            });

        const route225ToCanadaWaterPromise = axios.get(route225ToCanadaWater)
            .then(response => {
                const bussesArr = response.data;
                const busTimesArr = bussesArr
                    .filter(busRoute => busRoute.lineName === '225')
                    .map(bus => this.mapToBusTime(bus))
                const busRoute = new BusRoute(225, "Home", "Canada Water", busTimesArr);
                this.busCache.set('225ToCanadaWater', busRoute);
            })
            .catch(error => {
                console.error("Error while getting data for 225 to Canada Water", error);
            });

        const promise = Promise.all([route321ToRiverstonPromise, route321ToNewCrossPromise, route225ToLewishamPromise, route225ToCanadaWaterPromise]);
        promise.then(r => {
            console.log('all promise complete');
        }).catch(e => {
            console.error('not all completed');
        })
    }

    getAllBusTimes = async (): Promise<BusRoute[]> => {
        const allBusTimes: BusRoute[] = this.busCacheKeys.map(cacheKey => {
            return this.busCache.get(cacheKey);
        });
        return allBusTimes;
    }

    createBusRouteUrl = (busNumber: string, stopId: string): string => {
        return this.busUrlTemplate.replace('BUS_NUMBER', busNumber).replace('STOP_ID', stopId);
    }
}
const ttl15Mins = 900
const checkEvery2Mins = 120

export const busService = new BusService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}));