import express = require('express')

import parkingZoneController from './controllers/v1/parkingZone.controller'

const app = express()
const router = express.Router()

router.get('/ping', (ctx) => (ctx.body = 'pong'))
router.get('/api/v1/:zone_number', parkingZoneController)

app.use(router)

app.on('error', (err) => {
  console.error('server error', err)
})

// Start the server
app.listen(3000)
