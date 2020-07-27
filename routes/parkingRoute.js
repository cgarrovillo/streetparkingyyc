const express = require('express')

const parkingServices = require('../services/parkingServices')
const {
  zoneValidationRules,
  validate,
} = require('../services/validatorServices')

const log = require('../util/loggingUtility')

const checkByParkingZone = parkingServices.checkByParkingZone
const router = express.Router()

router.post('/zone', zoneValidationRules(), validate, (req, res) => {
  log.info(`${req.method} request made on ${req.originalUrl}`)
  checkByParkingZone(req.body.parkingZone)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      res.send('Invalid Request')
    })
})

module.exports = router
