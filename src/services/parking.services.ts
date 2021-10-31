import Parking_Zone from '../types/parking'

/**
 * Verifies that parking is Active & is a Parking Zone
 * @param parking_zone
 */
export const validateParking = (parking_zone: Parking_Zone) => {
  return parking_zone.status === 'Active' && parking_zone.zone_type === 'Parking Zone'
}

export const determineParkingConditions = (parking: Parking_Zone[]) => {}
