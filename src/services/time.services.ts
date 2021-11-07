import Parking_Zone from '../types/parking'
import { Time_Constraints } from '../types/time'
import { parseEnforceableTime, parseMaxTime, parseParkingRestrictTime } from '../helpers/time.helpers'

export const determineTimeConstraints = (parking_zone: Parking_Zone): Time_Constraints => {
  // parse enforceable_time (determine enforceable time)
  // parse parking_restrict_time & parking_restrict_type (determine restrictions)
  // determine timeLeft time based on variables above AND max_time

  //TODO: Put each fn into WebWorkers
  const enforceable_times = parseEnforceableTime(parking_zone.enforceable_time)
  const restricted_times = parseParkingRestrictTime(
    parking_zone.parking_restrict_time,
    parking_zone.parking_restrict_type
  )
  const max_time = parseMaxTime(parking_zone.max_time)

  return { enforceable_times, restricted_times, max_time }
}
