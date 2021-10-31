import axios from 'axios'

import Parking_Zone from '../types/parking'

const getParkingZone = async (zone: number) => {
  return axios.get<Parking_Zone[]>(`https://data.calgary.ca/resource/rhkg-vwwp.json?parking_zone=${zone}`)
}

const getParkingRate = async (zone: number) => {
  return axios.get(`https://data.calgary.ca/resource/pda2-cfwb.json?parking_zone=${zone}`)
}
export { getParkingZone, getParkingRate }
