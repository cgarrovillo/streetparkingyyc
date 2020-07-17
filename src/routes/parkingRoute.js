const express = require('express')
const app = express()

const parkingServices = require('../services/parkingServices')
const checkByParkingZone = parkingServices.checkByParkingZone

const router = express.Router()

app.use(express.json())

/* 
http ... /parking/zone 
*/
router.post('/zone', (req, res) => {
  checkByParkingZone(req.body.parkingZone)
    .then((val) => {
      res.send(val)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})
