const express = require('express')

const { getParkingZone } = require('../services/parkingServices')
const { validateZone, validate } = require('../util/validationMiddlewares')

const router = express.Router()

/* Callback functions for the Routes */
const parkingZoneRequest = async (req, res, next) => {
  getParkingZone(req.body.parkingZone)
    .then((response) => res.send(response))
    .catch((err) => next(err))
}

/*  /parking/zone  */
router.post('/zone', validateZone, validate, parkingZoneRequest)

module.exports = router
