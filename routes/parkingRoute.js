const express = require('express')

const { getParkingZone } = require('../services/parkingServices')
const log = require('../util/loggingUtility')

const router = express.Router()

/* Callback functions for the Routes */
const parkingZoneRequest = async (req, res) => {
  log.info('/zone: Request Received')

  let parkingZonesArray = await getParkingZone(req.body.parkingZone)
  res.send(parkingZonesArray)
}

/*  /parking/zone  */
router.post('/zone', parkingZoneRequest)

module.exports = router
