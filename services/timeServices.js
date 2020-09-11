const moment = require('moment')

function isZoneParkable(enforcedDays) {
  let isParkable = false
  let expires = null
  //Get the date right now
  const now = moment()

  //Check if today is an enforceable day
  enforcedDays.map((range, index) => {
    if (start.isSame(now, 'day')) {
      //If today is an enforceable day, Check if the current time is in between the
      //enforced day's start time & end time.
      let end = enforcedDays.enforcedDaysEndTime[index]
      if (now.isBetween(start, end)) {
        //Return the time left
        isParkable = true
        expires = end
        expiresIn = now.to(end)
      }
    }
  })

  //TODO
  enforcedDays.map((day) => {})
  return isParkable ? { isParkable, expires, expiresIn } : isParkable
}

function getEnforcedDays(time) {
  let enforcedDays = []
  if (time.includes(',')) {
    let timeFrames = time.split(',')
    timeFrames.map((t) => {
      enforcedDays.push(parseEnforcedDays(t))
    })
  } else {
    enforcedDays.push(parseEnforcedDays(time))
  }
  return enforcedDays
}

/**
 * Parses the input time based on The City of Calgary's API syntax on time range (ie. '0910-1750 MON-FRI')
 * Returns an Object containing an array of MomentJS Objects each representing an enforced day, and the range
 * for that array (ie. MON-FRI).
 * @param {string} time The time to parse.
 */
function parseEnforcedDays(time) {
  let enforcedDays = []
  //ie. '0910-1750 MON-FRI'
  const timeArray = time.split(' ')
  const timeRange = timeArray[0].split('-') //0910-1750
  const daysRange = timeArray[1].split('-') //MON-FRI

  const startTime = timeRange[0] //0910
  const endTime = timeRange[1] //1750
  const startDay = daysRange[0] //MON
  const endDay = daysRange[daysRange.length - 1] //FRI

  const startTimeHour = startTime.substring(0, 2) //09
  const startTimeMinute = startTime.substring(2, 4) //10
  const endTimeHour = endTime.substring(0, 2) //17
  const endTimeMinute = endTime.substring(2, 4) //50

  //Convert the day into a value (0 being Sunday)
  const startDayMoment = moment().day(startDay)
  const endDayMoment = moment().day(endDay)

  for (let i = startDayMoment.day(); i <= endDayMoment.day(); i++) {
    const starts = moment()
      .day(i)
      .hour(startTimeHour)
      .minute(startTimeMinute)
      .second(0)
    const ends = moment()
      .day(i)
      .hour(endTimeHour)
      .minute(endTimeMinute)
      .second(0)

    enforcedDays.push({ starts, ends })
  }

  return { range: timeArray[1], days: enforcedDays }
}

module.exports = {
  isZoneParkable,
  getEnforcedDays,
}
