import Parking_Zone, { Parking_Zone_Status } from './parking'

declare interface Response_Body {
  zone: string
  status: Parking_Zone_Status
  zone_type: string
  // TODO: Add time constraints field
  // TODO: turn conditions into Object
  conditions: []
}

export default Response_Body
