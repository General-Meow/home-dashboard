const app = require('./app')
const weatherService = require('./weather/WeatherService')
const tubeService = require('./travel/TubeService')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log("server is up on port", port)
})

app.get('', (req, res) => {
  res.render('index', {})
})

app.get('/todays-weather', (req, res) => {
  weatherService.getTodayWeather()
  .then(result => {
    console.log('result', result)
    res.json(result)

  }).catch((error) => {
    console.error(error)
  })
})

app.get('/forecast-weather', (req, res) => {
  weatherService.getForecastWeather()
  .then(result => {
    console.log('result', result)
    res.json(result)

  }).catch((error) => {
    console.error(error)
  })

})
