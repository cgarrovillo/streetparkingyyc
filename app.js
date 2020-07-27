const express = require('express')
const compression = require('compression')
const app = express()

const parkingRoute = require('./routes/parkingRoute')

/*
 * Compress all responses;
 * Include a Cache-control header with a response to bypass
 */
// app.use(compression())

app.use(express.urlencoded({ extended: true }))

app.use('/parking', parkingRoute)

module.exports = app
