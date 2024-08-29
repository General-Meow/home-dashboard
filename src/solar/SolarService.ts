import NodeCache from "node-cache";
import axios from "axios";
import debug from "debug";
import {SolarData, SolarEnergyData} from "../solar/SolarData";

// for more information, see https://github.com/neilmunday/giv_tcp
export class SolarService {
    nodeCache: NodeCache;
    inverterAddress1: string;
    inverterAddress2: string;

    constructor(nodeCache) {
        this.nodeCache = nodeCache
        this.inverterAddress1 = 'http://192.168.68.50:6345/readData';
        this.inverterAddress2 = 'http://192.168.68.50:6346/readData';
    }

    getEnergyFlows = async (): Promise<SolarData> => {
        let solarCache: SolarData = this.nodeCache.get('solarCache')
        if (solarCache === undefined) {
            console.log("Cache miss for solar values, attempting to fill it now...")
            try {
                this.fillCache();
                return this.nodeCache.get("solarCache");
            } catch (exception) {
                console.log("Filling the cache for solar data failed");
            }
            console.log("Cache miss for solar values, returning nothing")
            return Promise.reject("No data in cache")
        }
        return Promise.resolve(solarCache)
    }

    fillCache(): void {
        const readInverterPromise1 = axios.get(this.inverterAddress1);
        const readInverterPromise2 = axios.get(this.inverterAddress2);

        Promise
            .all([readInverterPromise1, readInverterPromise2])
            .then((allPromiseResultsArray) => {
                const response1 = allPromiseResultsArray[0];
                const response2 = allPromiseResultsArray[1];

                // debug.log('inv12',response2.data);
                const inverterFlows1 = response1.data.Power.Flows;
                const inverterPower1 = response1.data.Power.Power;
                const inverterFlows2 = response2.data.Power.Flows;
                const inverterPower2 = response2.data.Power.Power;
                const rawInverter2 = response2.data.raw.invertor;
                // debug.log('inverter 2', inverterPower2);
                // debug.log('inverter 2', inverterFlows2);

                const rows = [];
                const generatingWatts = inverterPower1.PV_Power + inverterPower2.PV_Power;
                const pvgenerating = new SolarEnergyData('Panel', 'Generating from solar', generatingWatts, 'w');

                const houseUsageWatts = inverterPower2.Load_Power;
                const houseUsage = new SolarEnergyData('Home', 'House Usage', houseUsageWatts, 'w');

                const batteryPercentage = rawInverter2.battery_percent;
                const battery = new SolarEnergyData('Battery', 'Battery Charge', batteryPercentage, '%');

                const predicted = 0;
                const predictionCharge = new SolarEnergyData('Predicted', 'Predicted Generation', predicted, 'w');

                const data: SolarData = new SolarData(new Date(), [pvgenerating, houseUsage, battery, predictionCharge]);

                //     = {
                //     asOf: new Date(),
                //     batteryToGrid: `${inverterFlows1.Battery_to_Grid + inverterFlows2.Battery_to_Grid}w`,
                //     batteryToHouse: `${inverterFlows1.Battery_to_House + inverterFlows2.Battery_to_House}w`,
                //     gridToBattery: `${inverterFlows1.Grid_to_Battery + inverterFlows2.Grid_to_Battery}w`,
                //     gridToHouse: `${inverterFlows1.Grid_to_House + inverterFlows2.Grid_to_House}w`,
                //     solarToBattery: `${inverterFlows1.Solar_to_Battery + inverterFlows2.Solar_to_Battery}w`,
                //     solarToGrid: `${inverterFlows1.Solar_to_Grid + inverterFlows2.Solar_to_Grid}w`,
                //     solarToHouse: `${inverterFlows1.Solar_to_House + inverterFlows2.Solar_to_House}w`,
                //     batteryChargeLevel: `${rawInverter2.battery_percent}%`,
                // };
                this.nodeCache.set("solarCache", data);
                // console.log('set solar cache data', data);
            })
            .catch(error => {
                console.error('solar error', error);
                throw error;
            });
    }
}

const ttl15Mins = 900
const checkEvery2Mins = 120

export const solarService = new SolarService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}));
