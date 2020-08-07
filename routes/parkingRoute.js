const express = require('express')

const { checkByParkingZone } = require('../services/parkingServices')

const { validate, validZoneRules } = require('../services/validatorServices')

const log = require('../services/loggingUtility')

const router = express.Router()

// /parking/zone
router.post('/zone', validZoneRules, validate, (req, res) => {
  checkByParkingZone(req.body.parkingZone)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      res.send('Invalid Request')
    })
})

module.exports = router
