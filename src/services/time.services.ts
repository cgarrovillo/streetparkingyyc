import Parking_Zone from '../types/parking'

import { parseEnforceableTime, parseMaxTime, parseParkingRestrictTime } from '../helpers/time.helpers'

export const determineTimeConstraints = (parking_zone: Parking_Zone) => {
  // parse enforceable_time (determine enforceable time)
  // parse parking_restrict_time & parking_restrict_type (determine restrictions)
  // determine timeLeft time based on variables above AND max_time

  //TODO: Put each fn into WebWorkers
  const enforceableTimes = parseEnforceableTime(parking_zone.enforceable_time)
  const restrictedTimes = parseParkingRestrictTime(
    parking_zone.parking_restrict_time,
    parking_zone.parking_restrict_type
  )
  const maxTime = parseMaxTime(parking_zone.max_time)

  return { enforceableTimes, restrictedTimes, maxTime }
}
