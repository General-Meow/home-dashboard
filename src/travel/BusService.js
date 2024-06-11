
const url = `https://api.tfl.gov.uk/Line/321/Arrivals/490009689T?app_key=${process.env.TFL_API_KEY}`;
class BusService {
    constructor() {
        this.busUrlTemplate = `https://api.tfl.gov.uk/Line/${busNumber}/Arrivals/${stopId}?app_key=${process.env.TFL_API_KEY}`;
    }

    cacheAllBusRoutes = () => {

    }
}

const busService = new BusService();

module.exports = busService;