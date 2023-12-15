const NodeCache = require("node-cache")
const axios = require("axios")
const [HalfHourPrice, DayPrices] = require("./HalfHourPrice")
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

  getTodaysAgilePrices() {
    const prices = this.octopusCache.get('todaysPrices')
    if (prices === undefined) {
      console.log("Cache miss for electric prices, getting data....")
      return this.fillTodaysAgilePricesCache()
    }
    return Promise.resolve(prices)
  }

  getTomorrowsAgilePrices() {
    const prices = this.octopusCache.get('tomorrowsPrices')
    if (prices === undefined) {
      console.log("Cache miss for electric prices, getting data....")
      return this.fillTomorrowsAgilePricesCache()
    }
    return Promise.resolve(prices)
  }


  fillTodaysAgilePricesCache() {
    const startOfToday = new Date();
    startOfToday.setUTCHours(0,0,0, 0)

    const endOfToday = new Date();
    endOfToday.setUTCHours(23,59,0, 0)

    const builtPriceUrl = `${this.unitPricesUrl}?period_from=${startOfToday.toISOString()}&period_to=${endOfToday.toISOString()}`;

    console.log('price url', builtPriceUrl)
    return axios.get(builtPriceUrl, {
      auth: {
        username: process.env.OCTOPUS_API_KEY
      }})
    .then(response => {

      const unitPrices = response.data.results;
      const prices = unitPrices
      .sort((a, b) => {
        return new Date(a.valid_from) - new Date(b.valid_from)
      })
      .map(unitPrice => {
        return new HalfHourPrice(unitPrice.value_inc_vat,
            new Date(unitPrice.valid_from), new Date(unitPrice.valid_to))
      })

      const dayPrices = new DayPrices(startOfToday, prices, new Date());

      this.octopusCache.set('todaysPrices', dayPrices);
      return dayPrices;
    })
    .catch(error => {
      console.error(error)
    })
  }

  fillTomorrowsAgilePricesCache() {
    const today = new Date();

    const startOfTomorrow = new Date();
    startOfTomorrow.setDate(today.getDate() + 1);
    startOfTomorrow.setUTCHours(0,0,0, 0)

    const endOfTomorrow = new Date();
    endOfTomorrow.setDate(today.getDate() + 1);
    endOfTomorrow.setUTCHours(23,59,0, 0)

    const builtPriceUrl = `${this.unitPricesUrl}?period_from=${startOfTomorrow.toISOString()}&period_to=${endOfTomorrow.toISOString()}`;

    console.log('price url', builtPriceUrl)
    return axios.get(builtPriceUrl, {
      auth: {
        username: process.env.OCTOPUS_API_KEY
      }})
    .then(response => {

      const unitPrices = response.data.results;
      const prices = unitPrices
      .sort((a, b) => {
        return new Date(a.valid_from) - new Date(b.valid_from)
      })
      .map(unitPrice => {
        return new HalfHourPrice(unitPrice.value_inc_vat,
            new Date(unitPrice.valid_from), new Date(unitPrice.valid_to))
      })

      const tomorrowsPrices = new DayPrices(startOfTomorrow, prices, new Date());
      this.octopusCache.set('tomorrowsPrices', tomorrowsPrices);

      return tomorrowsPrices;
    })
    .catch(error => {
      console.error(error)
    })
  }
}

const ttl15Mins = 900
const checkEvery2Mins = 120

const octopusService = new OctopusService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}));
module.exports = octopusService