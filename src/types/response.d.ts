import Parking_Zone, { Parking_Zone_Status } from './parking'

declare interface Response_Body {
  zone: string
  status: Parking_Zone_Status
  zone_type: string
  conditions: []
}

export default Response_Body
