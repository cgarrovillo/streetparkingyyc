// Services
import { Context, Next } from 'koa'
import { getParkingFromAPI } from '../services/parking.services'
import { parseAdhocEnforceableTime, hasTimeRestrictionsNow } from '../services/time.services'

/**
 * Controller for handling requests to /detailed. Responds to requests with a more detailed look in regards to a parking zone than /simple provides.
 * @param ctx Koa Context object
 * @param next Koa Next object
 */
const detailedParkingController = async (ctx: Context, next: Next) => {
  ctx.body = 'Not implemented'
  // const query = ctx.query
  // const zone = query.zone

  // const apiResponse = await getParkingFromAPI(zone)
  // const parking = apiResponse.data

  // let response = []

  // // For each parkingZone in parking, check if parking is currently enforced
  // parking.forEach(park => {
  //   const time = parseAdhocEnforceableTime(park)
  //   const _hasTimeRestrictionsNow = hasTimeRestrictionsNow(time)

  //   const res = {
  //     parking_zone: park,
  //     hasTimeRestrictionsNow: _hasTimeRestrictionsNow,
  //     timeObjects: time,
  //   }

  //   response = [...response, res]
  // })

  // ctx.body = response
}

export default detailedParkingController
