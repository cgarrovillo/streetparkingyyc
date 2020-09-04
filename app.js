const express = require('express')

const parkingRoute = require('./routes/parkingRoute')

const app = express()
app.use(express.json())

app.use('/parking', parkingRoute)

module.exports = app
