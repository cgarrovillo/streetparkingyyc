const express = require('express')
const app = express()

const parkingServices = require('../services/parkingServices')
const checkByParkingZone = parkingServices.checkByParkingZone

const router = express.Router()

app.use(express.json())

// http ... /parking
router.post('/', (req, res) => {
  res.send('Hhelo')
})

/* 
http ... /parking/zone 
*/
router.post('/zone', (req, res) => {
  const zone = req.body.parkingZone
  if (zone) {
    checkByParkingZone(req.body.parkingZone)
      .then((val) => {
        res.send(val)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  } else {
    //TODO: Proper Response Code
  }
})

module.exports = router
