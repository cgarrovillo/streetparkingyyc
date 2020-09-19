const express = require('express')

const { getParkingZone } = require('../services/parkingServices')
const { validateZone, validate } = require('../util/validationMiddlewares')

const router = express.Router()

/* Callback functions for the Routes */
const parkingZoneRequest = (req, res, next) => {
  let zone = req.query.zone != null ? req.query.zone : req.body.zone
  getParkingZone(zone)
    .then((response) => res.send(response))
    .catch((err) => next(err))
}

/*  /parking/zone  */
router.get('/', parkingZoneRequest)
router.post('/zone', validateZone, validate, parkingZoneRequest)

module.exports = router
