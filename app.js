const express = require('express')
const moment = require('moment')

const parkingRoute = require('./routes/parkingRoute')

// Initialize
const app = express()
// Specify to express that request payloads will be parsed as JSON
app.use(express.json())

// Globally set the UTC Offset of MomentJS to that of Calgary's UTC Offset.
moment().utcOffset(-360)

// Globally set the JSON format to the MomentJS instance's offset
moment.fn.toJSON = function () {
  return this.format()
}

app.use('/parking', parkingRoute)

module.exports = app
