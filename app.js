require('dotenv').config()
const express = require('express')
const http = require('http')
const https = require('https')
const app = express()

const parkingRoute = require('./src/routes/parkingRoute')

const port = process.env.PORT

app.use('/parking', parkingRoute)

//TODO: What is with bin/www ?
//TODO: Proper way to Debug (easily turn off console.logs)
http.createServer(app).listen(process.env.PORT)
