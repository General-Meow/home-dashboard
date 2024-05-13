const NodeCache = require('node-cache')
const axios = require('axios')
const {LineStatus, StatusDetail, AllStatus} = require("./LineStatus");

class TubeService {

  constructor(nodeCache) {
    this.tubeCache = nodeCache
    this.tflUrl = `https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground/Status?app_key=${process.env.TFL_API_KEY}`
  }

  getTubeLineStatus() {
    const lineStatusCache = this.tubeCache.get('tubeStatus')
    if (lineStatusCache === undefined) {
      console.log("Cache miss for tube status, getting data....")
      return Promise.reject("No tube cache");
    }
    return Promise.resolve(lineStatusCache)
  }

  fillTubeLineStatusCache() {
    //get the data and cache
    return axios.get(this.tflUrl)
    .then(response => {

      const lines = response.data;
      const allStatuses = lines.map(line => {
        const statuses = line.lineStatuses.map(lineStatus => {
          return new StatusDetail(lineStatus.statusSeverityDescription, lineStatus.reason)
        })
        return new LineStatus(line.id, line.name, statuses)
      })

      const result = new AllStatus(allStatuses, new Date);
      this.tubeCache.set('tubeStatus', result)
      return result
    })
    .catch((error) => {
      console.error(error)
      return error;

    })
  }

}
const ttl15Mins = 900
const checkEvery2Mins = 120

const tubeService = new TubeService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}))

module.exports = tubeService