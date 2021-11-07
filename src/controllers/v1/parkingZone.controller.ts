import { Request, Response, NextFunction } from 'express'

import { getParkingZone, validateParking } from '../../helpers/parking.helpers'
import { determineTimeConstraints } from '../../services/time.services'
import Parking_Zone from '../../types/parking'
import Response_Body from '../../types/response'

const parkingZoneController = async (req: Request, res: Response, next: NextFunction) => {
  const { zone_number } = req.params
  try {
    const { data: parking } = await getParkingZone(Number(zone_number))
    if (parking.length === 0) return res.sendStatus(204)

    // We assume Open Data Calgary's data integrity, using the first element as the source of truth.
    // This assumption is made based on their API using single queries for each parking property,
    // even though it returns multiple parking_zones.
    const parking_zone: Parking_Zone = parking[0]

    // don't continue if parking IS a parking zone but IS NOT Active
    const isValidParking = validateParking(parking_zone)
    if (!isValidParking) {
      const response: Response_Body = {
        zone: parking_zone.parking_zone,
        status: parking_zone.status,
        zone_type: parking_zone.zone_type,
        conditions: [],
      }
      res.send(response)
      return
    }

    const timeConstraints = determineTimeConstraints(parking_zone)
    console.dir(timeConstraints)

    // determine if good to park now based on time constraints

    res.send(parking)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

export default parkingZoneController
