const axios = require('axios').default

const { getEnforcedDays, isZoneParkable } = require('./timeServices')
const socrataToken = process.env.SOCRATA_TOKEN

/**
 * Gets the Parking Zone from Open Calgary's API.
 * Returns a Promise which contains the API call using axios()
 * @param {*} zone
 */
async function getParkingZone(zone) {
  const url = `https://data.calgary.ca/resource/rhkg-vwwp.json?parking_zone=${zone}`
  let config = {
    method: 'GET',
    timeout: 2000,
  }
  if (socrataToken) {
    config.headers = {
      'X-App-Token': socrataToken,
    }
  }

  /* Make an API Call to OpenData Calgary's API*/
  return await axios
    .get(url, config)
    .then((response) => {
      return processArrayOfZones(response.data)
    })
    .catch((error) => {
      //Request was made and server responded with status code != 2xx
      if (error.response) {
        console.log(error.response.data)
        return error.response.data
      }
      //Request was made but server did not respond
      else if (error.request) {
        console.log(error.response.data)
        return request.data
      }
    })
}

function processArrayOfZones(array) {
  return array.map((zone) => {
    // Check if the parking status is even 'Active', otherwise who cares
    if (zone.status !== 'Active') {
      return zone.status
    }

    const enforcedOn = getEnforcedDays(zone.enforceable_time)
    // const isParkableNow = isZoneParkable(enforcedOn)
    // Craft and return the Response Object
    return {
      parking_zone: zone.parking_zone,
      enforcedOn,
    }
  })
}

module.exports = {
  getParkingZone,
}
