// Services
import { Context, Next } from 'koa'
import { getParkingFromAPI } from '../services/parking.services'
import { parseAdhocEnforceableTime, hasTimeRestrictionsNow } from '../services/time.services'

/**
 * Controller for handling requests to /simple. Responds to requests with the "bare minimum" info on what a user of this API would be concerend about.
 * @param ctx Koa Context object
 * @param next Koa Next object
 */
const simpleParkingController = async (ctx: Context, next: Next) => {
  const query = ctx.query
  const zone = query.zone

  const apiResponse = await getParkingFromAPI(zone)
  const parking = apiResponse.data

  let response = []

  // For each parkingZone in parking, check if parking is currently enforced
  parking.forEach(park => {
    const time = parseAdhocEnforceableTime(park)
    const _hasTimeRestrictionsNow = hasTimeRestrictionsNow(time)

    const res = {
      zone: park.parking_zone,
      enforceable_time: park.enforceable_time,
      hasTimeRestrictions: _hasTimeRestrictionsNow,
    }

    response = [...response, res]
  })

  ctx.body = response
}

export default simpleParkingController
