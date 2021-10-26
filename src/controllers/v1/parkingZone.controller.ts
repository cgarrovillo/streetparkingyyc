import { Context, Next } from 'koa'

const parkingZoneController = async (ctx: Context, next: Next) => {
  ctx.body = 'Not implemented'

  // USING HELPER
  // fetch parking_zone from API

  // USING SERVICE
  // check for status, if not active send response with zone_type: zone's status
  // check for zone_type,  if not Parking Zone send response with zone_type: zone's type

  // implying zone is active...

  // USING SERVICE
  // parse enforceable_time (determine enforceable time)
  // parse parking_restrict_time & parking_restrict_type (determine restrictions)
  // determine if good to park now based on variables above
  // determine timeLeft time based on variables above AND max_time
}

export default parkingZoneController
