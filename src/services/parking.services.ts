import Parking_Zone from '../types/parking'

import { parseEnforceableTime } from '../helpers/time.helpers'

export const determineTimeConstraints = (parking_zone: Parking_Zone) => {
  // parse enforceable_time (determine enforceable time)
  // parse parking_restrict_time & parking_restrict_type (determine restrictions)
  // determine timeLeft time based on variables above AND max_time

  //TODO: Put each fn into WebWorkers
  const enforceableTimes = parseEnforceableTime(parking_zone.enforceable_time)
}
