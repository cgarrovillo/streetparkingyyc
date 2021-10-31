import axios from 'axios'

import Parking_Zone from '../types/parking'

export const getParkingZone = async (zone: number) => {
  return axios.get<Parking_Zone[]>(`https://data.calgary.ca/resource/rhkg-vwwp.json?parking_zone=${zone}`)
}

export const getParkingRate = async (zone: number) => {
  return axios.get(`https://data.calgary.ca/resource/pda2-cfwb.json?parking_zone=${zone}`)
}

/**
 * Verifies that parking is Active & is a Parking Zone
 * @param parking_zone
 */
export const validateParking = (parking_zone: Parking_Zone) => {
  return parking_zone.status === 'Active' && parking_zone.zone_type === 'Parking Zone'
}
