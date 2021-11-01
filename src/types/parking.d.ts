declare interface Parking_Zone {
  parking_zone: string
  zone_type: Parking_Zone_Zone_Type
  stall_type: Parking_Zone_Stall_Type
  address_desc: string
  block_side: 'N' | 'E' | 'S' | 'W'
  permit_zone: 'string'
  status: Parking_Zone_Status
  enforceable_time: string
  max_time: string
  parking_restrict_type: 'none' | string
  parking_restrict_time: 'none' | string
  line: MultiLineString
}

export type Parking_Zone_Zone_Type = 'Parking Zone' | 'Loading Zone' | 'VIP Zone' | 'Access Calgay Parking Zone'
export type Parking_Zone_Stall_Type = 'parallel' | 'perpendicular' | 'angle'
export type Parking_Zone_Status = 'Active' | 'Inactive' | 'Removed'
export type MultiLineString = {
  type: 'MultiLineString'
  // Array of array of tuple
  coordinates: [[[string, string]]]
}

export declare interface Parking_Zone_Conditions {
  enforceable_times: Interval[][]
  max_time: string
}

export default Parking_Zone
