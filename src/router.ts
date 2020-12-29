import Router = require('@koa/router')

// Services
import { getParkingFromAPI } from './services/parking.services'
import { parseAdhocEnforceableTime, hasTimeRestrictionsNow } from './services/time.services'

const router = new Router()

router.get('/simple', async (ctx, next) => {
  const query = ctx.query
  const zone = query.zone

  const apiResponse = await getParkingFromAPI(zone)

  ctx.assert(
    apiResponse.data,
    404,
    'Query could not be found in Calgary Parking Authority Database. Check the zone number again?  '
  )
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
})

export default router
