const axios = require('axios').default
const moment = require('moment')

const log = require('../util/loggingUtility')

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
  return array.map((parking) => {
    if (parking.status !== 'Active') {
      return null
    }

    parseTime(parking.enforceable_time)

    return parking
  })
}

function parseTime(time) {
  let enforcedDays = []
  //ie. '0910-1750 MON-FRI'
  const timeArray = time.split(' ')
  const timeRange = timeArray[0].split('-') //0910-1750
  const daysRange = timeArray[1].split('-') //MON-FRI

  const startTime = timeRange[0] //0910
  const endTime = timeRange[1] //1750
  const startDay = daysRange[0] //MON
  const endDay = daysRange[1] //FRI

  const startTimeHour = startTime.substring(0, 2) //09
  const startTimeMinute = startTime.substring(2, 4) //10
  const endTimeHour = endTime.substring(0, 2) //17
  const endTimeMinute = endTime.substring(2, 4) //50

  // In minutes, Calculate the enforcement's duration for the day,
  // based on the Starting Time and End Time
  const startTimeMoment = moment().hour(startTimeHour).minute(startTimeMinute)
  const endTimeMoment = moment().hour(endTimeHour).minute(endTimeMinute)
  const durationMinutes = endTimeMoment.diff(startTimeMoment, 'minutes')

  //Convert the day into a value (0 being Sunday)
  const startDayMoment = moment().day(startDay)
  const endDayMoment = moment().day(endDay)

  /** More efficient way:
   * Get current date, see if today is in the date range, check times
   */
  for (let i = startDayMoment.day(); i <= endDayMoment.day(); i++) {}
}

module.exports = {
  getParkingZone,
}
