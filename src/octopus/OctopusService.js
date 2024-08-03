const NodeCache = require("node-cache")
const axios = require("axios")
const {HalfHourPrice, DayPrices} = require("./HalfHourPrice")
const schedule = require('node-schedule');
const {response} = require("express");

/**
 * NOTE
 * - all calls need to have basic auth applied with username as sk_live_******
 * - also the times given are CET timezone (France etc) so UTC+1 so will need to convert to GMT
 *
 * Get all products: https://api.octopus.energy/v1/products/
 * Get info on your account https://api.octopus.energy/v1/accounts/<ACCOUNT-NUMBER>
 *
 * Under gass->agreements find the valid gas tariff code within the date. G-1R-SILVER-23-12-06-C
 * The tariff code is made up of the product code usually the word after the 5 char then the date. eg. SILVER-23-12-06
 *
 * Get the daily price of the tracker gas product: https://api.octopus.energy/v1/products/<PRODUCT>/gas-tariffs/<TARIFF>/standard-unit-rates/
 * Add period_from and period_to query params to limit the dates
 * https://api.octopus.energy/v1/products/SILVER-23-12-06/gas-tariffs/G-1R-SILVER-23-12-06-C/standard-unit-rates/?period_from=2024-06-29&period_to=2024-06-30
 *
 * Get info on a specific product: https://api.octopus.energy/v1/products/AGILE-FLEX-BB-23-02-08/
 * Get GSP on postcode: https://api.octopus.energy/v1/industry/grid-supply-points?postcode=se146jg
 * Get unit prices between periods: https://api.octopus.energy/v1/products/AGILE-FLEX-BB-23-02-08/electricity-tariffs/E-1R-AGILE-FLEX-BB-23-02-08-C/standard-unit-rates?period_from=2023-10-27T00:00Z&period_to=2023-10-28T00:00Z
 * Get standing charge: https://api.octopus.energy/v1/products/AGILE-FLEX-BB-23-02-08/electricity-tariffs/E-1R-AGILE-FLEX-BB-23-02-08-C/standing-charges/
 */
class OctopusService {

    constructor(cache) {
        const accountNumber = process.env.OCTOPUS_ACCOUNT_NUMBER

        this.octopusCache = cache
        this.accountUrl = `https://api.octopus.energy/v1/accounts/${accountNumber}`;
        this.unitPricesUrl = 'https://api.octopus.energy/v1/products/AGILE-FLEX-BB-23-02-08/electricity-tariffs/E-1R-AGILE-FLEX-BB-23-02-08-C/standard-unit-rates'
        this.standingChargePriceUrl = 'https://api.octopus.energy/v1/products/AGILE-FLEX-BB-23-02-08/electricity-tariffs/E-1R-AGILE-FLEX-BB-23-02-08-C/standing-charges/'
    }

    getTodaysAgilePrices() {
        const prices = this.octopusCache.get('todaysPrices')
        if (prices === undefined) {
            console.log("Cache miss for electric prices, returning nothing")
            return Promise.reject("No data in cache")
        }
        return Promise.resolve(prices)
    }

    getTomorrowsAgilePrices() {
        const prices = this.octopusCache.get('tomorrowsPrices')
        if (prices === undefined) {
            console.log("Cache miss for electric prices, returning nothing")
            return Promise.reject("No data in cache")
        }
        return Promise.resolve(prices)
    }

    getTodaysGasPrice() {
        const prices = this.octopusCache.get('todaysGasPrice')
        if (prices === undefined) {
            console.log("Cache miss for gas prices, returning nothing")
            return Promise.reject("No data in cache")
        }
        return Promise.resolve(prices)
    }

    getGasTariff() {
        const prices = this.octopusCache.get('gasTariff')
        if (prices === undefined) {
            console.log("Cache miss for gas tariff, returning nothing")
            return Promise.reject("No data in cache")
        }
        return Promise.resolve(prices)
    }

    fillGasTariffCache() {

        return axios.get(this.accountUrl, {
            auth: {
                username: process.env.OCTOPUS_API_KEY
            }
        }).then(response => {

            const gasTariffs = response.data.properties[0].gas_meter_points[0].agreements;
            let currentGasTariff;
            const now = new Date();
            for (const gasTariff of gasTariffs) {
                const dateFrom = new Date(gasTariff.valid_from);
                const dateTo = new Date(gasTariff.valid_to);

                if (dateFrom < now && dateTo > now) {
                    currentGasTariff = gasTariff;
                    break;
                }
            }
            this.octopusCache.set('gasTariff', currentGasTariff.tariff_code);

            return currentGasTariff.tariff_code;
        })
            .catch(error => {
                console.error(error)
            })
    }

    fillTodaysAgilePricesCache() {
        var now = new Date();
        var currentCachedTodaysPrice = this.octopusCache.get('todaysPrices');

        if(currentCachedTodaysPrice !== undefined) {
            //exit early if the currently stored price is the same as today
            var asOfDateTime = currentCachedTodaysPrice.asOfDateTime;
            if(now.getDay() === asOfDateTime.getDay() && now.getMonth() === asOfDateTime.getMonth()) {
                return;
            }
        }

        const startOfToday = new Date();
        startOfToday.setUTCHours(0, 0, 0, 0)
        const endOfToday = new Date();
        endOfToday.setUTCHours(23, 59, 0, 0)

        const todaysPriceUrl = `${this.unitPricesUrl}?period_from=${startOfToday.toISOString()}&period_to=${endOfToday.toISOString()}`;

        return axios.get(todaysPriceUrl, {
                auth: {
                    username: process.env.OCTOPUS_API_KEY
                }
            }).then(response => {
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
        startOfTomorrow.setUTCHours(0, 0, 0, 0)

        const endOfTomorrow = new Date();
        endOfTomorrow.setDate(today.getDate() + 1);
        endOfTomorrow.setUTCHours(23, 59, 0, 0)

        const builtPriceUrl = `${this.unitPricesUrl}?period_from=${startOfTomorrow.toISOString()}&period_to=${endOfTomorrow.toISOString()}`;

        return axios.get(builtPriceUrl, {
            auth: {
                username: process.env.OCTOPUS_API_KEY
            }
        })
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

    fillTodaysGasPriceCache() {

        this.getGasTariff()
            .then(gasTariff => {
                    this.getGasPrice(tariffCode).then(gasPrice => {
                            this.octopusCache.set('todaysGasPrice', gasPrice);
                        }
                    ).catch(error => console.error);
                }
            ).catch(error => {
                console.error('getting gasTariff error', error);
                return this.fillGasTariffCache();
            }).then(gasTariff => {
            this.getGasPrice(gasTariff)
                .then(gasPrice => {
                    this.octopusCache.set('todaysGasPrice', gasPrice);
                }).catch(error => console.error);
        });
    }

    getGasPrice(gasTariff) {
        const productCode = gasTariff.slice(5, gasTariff.length - 2);
        var today = new Date();
        const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        var todayStr = dateTimeFormatter.format(today).split("/").reverse().join('-');
        var tomorrow = today.setDate(today.getDate() + 1)
        var tomorrowStr = dateTimeFormatter.format(tomorrow).split("/").reverse().join('-');
        const url = `https://api.octopus.energy/v1/products/${productCode}/gas-tariffs/${gasTariff}/standard-unit-rates/?period_from=${todayStr}&period_to=${tomorrowStr}`;
        return axios.get(url, {
            auth: {
                username: process.env.OCTOPUS_API_KEY
            }
        }).then(response => {
            return response.data.results[0].value_inc_vat;
        }).catch(error => {
            console.error('error in getting todays price cache', error);
        });
    }
}

const ttl15Mins = 900
const checkEvery2Mins = 120

const octopusService = new OctopusService(new NodeCache({stdTTL: ttl15Mins, checkperiod: checkEvery2Mins}));
module.exports = octopusService