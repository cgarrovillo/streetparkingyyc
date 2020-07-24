const express = require('express')
const { body, validationResult } = require('express-validator')

const parkingServices = require('../services/parkingServices')
const checkByParkingZone = parkingServices.checkByParkingZone

const router = express.Router()

// http ... /parking
router.post('/', (req, res) => {
  res.send('Hhelo')
})

/* 
http ... /parking/zone 
*/
router.post(
  '/zone',
  [body('parkingZone').not().isEmpty().isNumeric()],
  (req, res) => {
    const reqErrors = validationResult(req)

    checkByParkingZone(req.body.parkingZone)
      .then((response) => {
        res.send(response.data)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  }
)

//TODO: Move validation and business logic to another function,
//use that one function as a callback

module.exports = router
