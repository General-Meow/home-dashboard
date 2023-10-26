const NodeCache = require('node-cache')

class TubeService {

  constructor(nodeCache) {
    this.tubeCache = nodeCache

    this.tflUrl = ''
  }

  getTubeLineStatus() {
    const lineStatusCache = this.tubeCache.get('lineStatus')
    if (lineStatusCache === undefined) {
      console.log("Cache miss for tube status, getting data....")
      return this.fillTubeLineStatusCache()
    }
    return Promise.resolve(lineStatusCache)
  }

  fillTubeLineStatusCache() {
    //get the data and cache
  }

}

const tubeService = new TubeService(new NodeCache())

module.exports = tubeService