import Parking_Zone, { Parking_Zone_Status } from './parking'
import { Time_Constraints } from './time'
declare interface Response_Body {
  zone: string
  status: Parking_Zone_Status
  zone_type: string
  time_constraints?: Time_Constraints
  // TODO: Add time constraints field
  // TODO: turn conditions into Object
  conditions: []
}

export default Response_Body
