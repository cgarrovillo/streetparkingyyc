const express = require('express')
const compression = require('compression')
const morgan = require('morgan')

const app = express()

const errors = require('./services/errorServices')
const { validate } = require('./services/validatorServices')
const parkingRoute = require('./routes/parkingRoute')

/*
 * Compress all responses;
 * Include a Cache-control header with a response to bypass
 */
// app.use(compression())

app.use(express.json())
app.use(morgan('dev'))

app.use('/parking', parkingRoute)

app.use(errors)

module.exports = app
