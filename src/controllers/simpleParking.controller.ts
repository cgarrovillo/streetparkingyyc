import { Context, Next } from 'koa'

// Services
import { getParkingFromAPI } from '../services/parking.services'
import { parseAdhocEnforceableTime, hasTimeRestrictionsNow } from '../services/time.services'

// Types
import APIResponse from '../types/response'

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
  const park = parking[0]

  let res: APIResponse = {
    zone: park.parking_zone,
    enforceable_time: park.enforceable_time,
    canParkHere: false,
    conditions: [],
  }

  // Check if the zone is even active. If not, return and respond with canParkHere = false
  if (park.status != 'Active') {
    res.canParkHere = false
    return (ctx.body = res)
  }

  // Check if there are any enforced time restrictions at the time of query
  const time = parseAdhocEnforceableTime(park)
  res.canParkHere = true
  return (ctx.body = res)
}

export default simpleParkingController
