require('dotenv').config()
const express = require('express')
const http = require('http')
const https = require('https')
const app = express()

const parkingRoute = require('./src/routes/parkingRoute')

const port = process.env.PORT

app.post('/parking', (req, res) => {
  parkingRoute(req)
})

http.createServer(app).listen(process.env.PORT)
