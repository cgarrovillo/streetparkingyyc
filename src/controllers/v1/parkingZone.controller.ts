import { Context, Next } from 'koa'

import { getParkingZone, validateParking } from '../../helpers/parking.helpers'
import { determineTimeConstraints } from '../../services/time.services'
import Parking_Zone from '../../types/parking'
import Response_Body from '../../types/response'

const parkingZoneController = async (ctx: Context, next: Next) => {
  const { zone_number } = ctx.params
  try {
    const { data: parking } = await getParkingZone(Number(zone_number))
    if (parking.length === 0) return (ctx.response.status = 204)

    // We assume Open Data Calgary's data integrity, using the first element as the source of truth.
    // This assumption is made based on their API using single queries for each parking property,
    // even though it returns multiple parking_zones.
    const parking_zone: Parking_Zone = parking[0]

    // don't continue if parking ISN'T active AND a Parking Zone
    const isValidParking = validateParking(parking_zone)
    if (!isValidParking) {
      const response: Response_Body = {
        zone: parking_zone.parking_zone,
        status: parking_zone.status,
        zone_type: parking_zone.zone_type,
        conditions: [],
      }
      ctx.response.body = response
      return
    }

    const timeConstraints = determineTimeConstraints(parking_zone)
    console.dir(timeConstraints)

    // determine if good to park now based on time constraints

    ctx.response.body = parking
  } catch (err) {
    console.error(err)
    ctx.response.status = 500
  }
}

export default parkingZoneController
