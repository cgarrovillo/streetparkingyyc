const express = require('express')
const app = express()

const parkingServices = require('../services/parkingServices')
const checkByParkingZone = parkingServices.checkByParkingZone

const router = express.Router()

// app.use(express.json())

// http ... /parking
router.post('/', (req, res) => {
  res.send('Hhelo')
})

/* 
http ... /parking/zone 
*/
router.post('/zone', (req, res) => {
  checkByParkingZone(req.body.parkingZone)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

module.exports = router
