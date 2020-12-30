import { Interval } from 'luxon'

/**
 *
 */
declare interface APIResponse {
  parking_zone: string
  status: string
  enforceable_time: string
  canParkHere: boolean
  hasConditions?: {
    maxParkingTime?: number
  }
  details?: {
    timeRestrictions: Array<Interval>
    zone: Zone
  }
}

// Mark all fields as optional so to not be tightly coupled with Calgary's API
declare interface Zone {
  parking_zone?: number
  zone_cap?: number
  seg_cap?: number
  zone_type?: string
  stall_type?: string
  address_desc?: string
  block_side?: string
  permit_zone?: string
  stats?: string
  price_zone?: string
  enforceable_time?: string
  max_time?: number
  parking_restrict_type?: string
  parking_restrict_time?: string
  no_parking?: string
  no_stopping?: string
  mod_dt_utc?: string // In Socrata's API (Open Data Calgary) this is a Floating Timestamp
  line?: LineString
}

declare interface LineString {
  type?: string
  coordinates?: Array<Array<number>>
}

export { APIResponse, Zone }
