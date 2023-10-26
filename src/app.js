const path = require('path')
const express = require("express")
const weather = require('./weather/WeatherService')

const app = express()

app.use(express.json())

//setup the view engine
app.set('view engine', 'hbs')

//expose a public directory to allow access to basic html pages
app.use(express.static(path.join(__dirname, '../public')))

//configure the directories for partials and view templates
const partialsDir = path.join(__dirname, '../templates/partials')
const viewsDir = path.join(__dirname, '../templates/views')
app.set('views', viewsDir)

module.exports = app