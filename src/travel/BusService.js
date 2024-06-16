const axios = require ("axios");
const NodeCache = require("node-cache");
const {BusTime, BusRoute} = require("./TravelData");

class BusService {

    busCacheKeys = [
        '321ToRiverston',
        '321ToNewCross'
    ];
    constructor(cache) {
        this.busCache = cache;
        this.busUrlTemplate = `https://api.tfl.gov.uk/Line/BUS_NUMBER/Arrivals/STOP_ID?app_key=${process.env.TFL_API_KEY}`;
    }

    cacheAllBusRoutes = () => {
        const route321ToRiverston = this.createBusRouteUrl(321, '490009689T');
        const route321ToNewCross = this.createBusRouteUrl(321, '490014334W');
        // const route225ToLewisham = this.createBusRouteUrl(225, '490006451E');
        // const route225ToCanadaWater = this.createBusRouteUrl(225, '490009446W');

        const route321ToRiverstonPromise = axios.get(route321ToRiverston)
            .then(response => {
                const bussesArr = response.data;
                const busTimesArr = bussesArr
                    .filter(busRoute => busRoute.lineName === '321')
                    .map(bus => {
                        const busAtTime = new Date(bus.expectedArrival);
                        const now = new Date();
                        const diff = Math.abs(busAtTime - now);
                        const minutes = Math.floor((diff/1000)/60);
                        return new BusTime(busAtTime, minutes);
                    })
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
                const busTimesArr = bussesArr.map(bus => {
                    const busAtTime = new Date(bus.expectedArrival);
                    const now = new Date();
                    const diff = Math.abs(busAtTime - now);
                    const minutes = Math.floor((diff/1000)/60);
                    return new BusTime(busAtTime, minutes);
                })

                const busRoute1 = new BusRoute(321, "Riverston", "New Cross", busTimesArr);
                this.busCache.set('321ToNewCross', busRoute1);
            })
            .catch(error => {
                console.error("Error while getting data for 321 to New Cross", error);
            });


        const promise = Promise.all([route321ToRiverstonPromise, route321ToNewCrossPromise]);
        promise.then(r => {
            console.log('all pronsise complete');
        }).catch(e => {
            console.error('not all completed');
        })
    }

    getAllBusTimes = async () => {
        const allBusTimes = this.busCacheKeys.map(cacheKey => {
            return this.busCache.get(cacheKey);
        });
        return allBusTimes;
    }

    createBusRouteUrl = (busNumber, stopId) => {
        return this.busUrlTemplate.replace('BUS_NUMBER', busNumber).replace('STOP_ID', stopId);
    }
}
const ttl15Mins = 900
const checkEvery2Mins = 120

const busService = new BusService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}));

module.exports = busService;