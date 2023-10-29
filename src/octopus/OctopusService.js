const NodeCache = require("node-cache")
const axios = require("axios")
const HalfHourPrice = require("./HalfHourPrice")
/**
 * NOTE
 * - all calls need to have basic auth applied with username as sk_live_******
 * - also the times given are CET timezone (France etc) so UTC+1 so will need to convert to GMT
 *
 * Get all products: https://api.octopus.energy/v1/products/
 * Get info on a specific product: https://api.octopus.energy/v1/products/AGILE-FLEX-BB-23-02-08/
 * Get GSP on postcode: https://api.octopus.energy/v1/industry/grid-supply-points?postcode=se146jg
 * Get unit prices between periods: https://api.octopus.energy/v1/products/AGILE-FLEX-BB-23-02-08/electricity-tariffs/E-1R-AGILE-FLEX-BB-23-02-08-C/standard-unit-rates?period_from=2023-10-27T00:00Z&period_to=2023-10-28T00:00Z
 * Get standing charge: https://api.octopus.energy/v1/products/AGILE-FLEX-BB-23-02-08/electricity-tariffs/E-1R-AGILE-FLEX-BB-23-02-08-C/standing-charges/
 */
class OctopusService {

  constructor(cache) {
    this.octopusCache = cache
    this.unitPricesUrl = 'https://api.octopus.energy/v1/products/AGILE-FLEX-BB-23-02-08/electricity-tariffs/E-1R-AGILE-FLEX-BB-23-02-08-C/standard-unit-rates'
    this.standingChargePriceUrl = 'https://api.octopus.energy/v1/products/AGILE-FLEX-BB-23-02-08/electricity-tariffs/E-1R-AGILE-FLEX-BB-23-02-08-C/standing-charges/'
  }

  getAgilePrices() {
    const prices = this.octopusCache.get('prices')
    if (prices === undefined) {
      console.log("Cache miss for electric prices, getting data....")
      return this.fillAgilePricesCache()
    }
    return Promise.resolve(prices)
  }

  fillAgilePricesCache() {
    // work out the periods
    const today = new Date();
    today.setUTCHours(0,0,0, 0)

    const periodFrom = `period_from=${today.toISOString()}`
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1)
    tomorrow.setUTCHours(23,59,0, 0)

    const periodTo = `period_to=${tomorrow.toISOString()}`
    const builtPriceUrl = `${this.unitPricesUrl}?${periodFrom}&${periodTo}`;

    console.log('price url', builtPriceUrl)
    return axios.get(builtPriceUrl, {
      auth: {
        username: process.env.OCTOPUS_API_KEY
      }})
    .then(response => {

      const unitPrices = response.data.results;
      const result = unitPrices
      .sort((a, b) => {
        return new Date(a.valid_from) - new Date(b.valid_from)
      })
      .map(unitPrice => {
        return new HalfHourPrice(unitPrice.value_inc_vat,
            new Date(unitPrice.valid_from).toLocaleTimeString(), new Date(unitPrice.valid_to).toLocaleTimeString())
      })

      return result
    })
    .catch(error => {
      console.error(error)
    })
  }
}

const octopusService = new OctopusService(new NodeCache());
module.exports = octopusService