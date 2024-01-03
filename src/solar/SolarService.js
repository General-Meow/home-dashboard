const NodeCache = require("node-cache");
const axios = require("axios");
const debug = require("debug");
// for more information, see https://github.com/neilmunday/giv_tcp
class SolarService {


    constructor(nodeCache) {
        this.nodeCache = nodeCache
        this.inverterAddress1 = 'http://192.168.68.50:6345/readData';
        this.inverterAddress2 = 'http://192.168.68.50:6346/readData';
    }

    getEnergyFlows = () => {
        const readInverterPromise1 = axios.get(this.inverterAddress1);
        const readInverterPromise2 = axios.get(this.inverterAddress2);

        return Promise
            .all([readInverterPromise1, readInverterPromise2])
            .then((allPromiseResultsArray) => {
                const response1 = allPromiseResultsArray[0];
                const response2 = allPromiseResultsArray[1];

                const inverterFlows1 = response1.data.Power.Flows;
                const inverterFlows2 = response2.data.Power.Flows;
                debug.log('inverter 1', inverterFlows1);
                debug.log('inverter 2', inverterFlows2);

                // Battery_to_Grid: 0,
                //     Battery_to_House: 423,
                //     Grid_to_Battery: 0,
                //     Grid_to_House: 10,
                //     Solar_to_Battery: 0,
                //     Solar_to_Grid: 0,
                //     Solar_to_House: 0
                return {
                    batteryToGrid: inverterFlows1.Battery_to_Grid + inverterFlows2.Battery_to_Grid,
                    batteryToHouse: inverterFlows1.Battery_to_House + inverterFlows2.Battery_to_House,
                    gridToBattery: inverterFlows1.Grid_to_Battery + inverterFlows2.Grid_to_Battery,
                    gridToHouse: inverterFlows1.Grid_to_House + inverterFlows2.Grid_to_House,
                    solarToBattery: inverterFlows1.Solar_to_Battery + inverterFlows2.Solar_to_Battery,
                    solarToGrid: inverterFlows1.Solar_to_Grid + inverterFlows2.Solar_to_Grid,
                    solarToHouse: inverterFlows1.Solar_to_House + inverterFlows2.Solar_to_House,
                    batteryChargeLevel: 0.0,
                };
            })
    }
};

const ttl15Mins = 900
const checkEvery2Mins = 120

const solarService = new SolarService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}));
module.exports = solarService