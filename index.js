const serverless = require("serverless-http")
const express = require("express")
const moment = require("moment")

const parkingRoutes = require("./routes/parkingRoutes")

// Globally set the UTC Offset of MomentJS to that of Calgary's UTC Offset.
moment().utcOffset(-360)
// Globally set the JSON format to the MomentJS instance's offset
moment.fn.toJSON = function () {
  return this.format()
}

const app = express()
app.use(express.json())

app.use("/parking", parkingRoutes)

module.exports.handler = serverless(app)

// module.exports = app
