import axios from 'axios'

const getParkingZone = (zone: number) =>
  axios.get(`https://data.calgary.ca/resource/rhkg-vwwp.json?parking_zone=${zone}`)

const getParkingRate = (zone: number) =>
  axios.get(`https://data.calgary.ca/resource/pda2-cfwb.json?parking_zone=${zone}`)

export { getParkingZone, getParkingRate }
