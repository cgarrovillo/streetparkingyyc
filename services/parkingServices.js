const axios = require('axios').default

const log = require('../util/loggingUtility')
const { getEnforcedDays, isZoneParkable } = require('./timeServices')

const socrataToken = process.env.SOCRATA_TOKEN

async function getParkingZone(zone) {
  let zonesArray = []
  const url = `https://data.calgary.ca/resource/rhkg-vwwp.json?parking_zone=${zone}`
  const config = {
    method: 'GET',
    timeout: 2000,
    headers: {
      'X-App-Token': socrataToken,
    },
  }

  zonesArray = await axios
    .get(url, config)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      //Request was made and server responded with status code != 2xx
      if (error.response) {
        log.error(error.response)
        return error.response
      }
      //Request was made but server did not respond
      else if (error.request) {
        log.error(error.request)
        return error.request
      }
    })
  return processZones(zonesArray)
}

function processZones(array) {
  const zones = array.map((zone) => {
    // Check if the parking status is even 'Active', otherwise who cares
    if (zone.status !== 'Active') {
      return null
    }

    const enforcedDays = getEnforcedDays(zone.enforceable_time)
    const isParkableNow = isZoneParkable(enforcedDays)

    return { zone, enforcedDays, isParkableNow }
  })

  return zones
}

module.exports = {
  getParkingZone,
}
