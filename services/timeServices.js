const moment = require('moment')

const log = require('../util/loggingUtility')

function isZoneParkable(enforcedDays) {
  let isParkable = false
  let expires = null
  //Get the date right now
  const now = moment()

  //Check if today is an enforceable day
  enforcedDays.enforcedDaysStartTime.map((start, index) => {
    if (start.isSame(now, 'day')) {
      //If today is an enforceable day, Check if the current time is in between the
      //enforced day's start time & end time.
      let end = enforcedDays.enforcedDaysEndTime[index]
      if (now.isBetween(start, end)) {
        //Return the time left
        isParkable = true
        expires = now.to(end)
      }
    }
  })
  return isParkable ? { isParkable, expires } : isParkable
}

/**
 * Parses the input time based on The City of Calgary's API syntax on time range (ie. '0910-1750 MON-FRI')
 * Returns an Array of MomentJS Objects each representing an enforced day.
 * @param {string} time The time to parse.
 */
function getEnforcedDays(time) {
  let enforcedDaysStartTime = []
  let enforcedDaysEndTime = []
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

  //Convert the day into a value (0 being Sunday)
  const startDayMoment = moment().day(startDay)
  const endDayMoment = moment().day(endDay)

  for (let i = startDayMoment.day(); i <= endDayMoment.day(); i++) {
    const enforcedDayStart = moment()
      .day(i)
      .hour(startTimeHour)
      .minute(startTimeMinute)

    enforcedDaysStartTime.push(enforcedDayStart)

    const enforcedDayEnd = moment()
      .day(i)
      .hour(endTimeHour)
      .minute(endTimeMinute)
    enforcedDaysEndTime.push(enforcedDayEnd)
  }

  return { enforcedDaysStartTime, enforcedDaysEndTime }
}

module.exports = {
  isZoneParkable,
  getEnforcedDays,
}
