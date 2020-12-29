import axios from 'axios'

const getParkingFromAPI = (zone: number) =>
  axios.get(`https://data.calgary.ca/resource/rhkg-vwwp.json?parking_zone=${zone}`)

export { getParkingFromAPI }
