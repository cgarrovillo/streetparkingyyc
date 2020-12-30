import { Context, Next } from 'koa'

// Services
import { getParkingFromAPI } from '../services/parking.services'
import { parseAdhocEnforceableTime, hasTimeRestrictionsNow } from '../services/time.services'

// Types
import { APIResponse } from '../types'

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
  const park = parking[0] // Data we care about is the same across all zones with the same parking_zone

  let res: APIResponse = {
    parking_zone: park.parking_zone,
    status: park.status,
    enforceable_time: park.enforceable_time,
    canParkHere: false,
  }

  // Check if the zone is even active. If not, return and respond with canParkHere = false
  if (park.status != 'Active') {
    res.canParkHere = false
    return (ctx.body = res)
  }

  // Check if there are any enforced time restrictions at the time of query
  const time = parseAdhocEnforceableTime(park)
  const hasTimeRestrictions = hasTimeRestrictionsNow(time)
  if (hasTimeRestrictions) {
    res.hasConditions = {
      maxParkingTime: park.max_time,
    }
  }

  res.canParkHere = true
  return (ctx.body = res)
}

export default simpleParkingController
