const moment = require("moment")
const { DateTime, Interval } = require("luxon")

function checkZone(time) {
  const parsedTimes = processTimes(time)
  let result = {
    isEnforcedNow: null,
    enforcedUntil: null,
  }

  parsedTimes.map(parsed => {
    let rightNow = DateTime.local()
    if (parsed.days.contains(rightNow)) {
      let intersect = parsed.days.intersection(parsed.hours)
      let difference = parsed.hours.e
        .diffNow("minutes")
        .toFormat("mm 'minutes' ")

      if (intersect.isAfter(rightNow)) {
        result.isEnforcedNow = true
        result.enforcedUntil = parsed.hours.e
        result.timeRemaining = difference
      } else {
        result.isEnforcedNow = false
        result.enforcedUntil = parsed.hours.e
        result.timeElapsed = difference
      }
    }
  })

  return result
}

function processTimes(time) {
  let _times = []

  if (time.includes(",")) {
    let timeRange = time.split(",")
    timeRange.forEach(range => {
      let _range = parseTime(range)
      _times.push(_range)
    })
    return _times
  }

  _times.push(parseTime(time))
  return _times
}

/**
 * Parses the input time based on The City of Calgary's API syntax on time range (ie. '0910-1750 MON-FRI')
 * Returns an Object containing an array of MomentJS Objects each representing an enforced day, and the range
 * for that array (ie. MON-FRI).
 * @param {string} time The time to parse.
 */
function parseTime(time) {
  const now = new Date()

  time = time.trim()
  //ie. '0910-1750 MON-FRI'
  const timeArray = time.split(" ")
  const timeRange = timeArray[0].split("-") //0910-1750
  const daysRange = timeArray[1].split("-") //MON-FRI

  const startTime = timeRange[0] //0910
  const endTime = timeRange[1] //1750
  const startDay = daysRange[0] //MON
  const endDay = daysRange[daysRange.length - 1] //FRI

  const startTimeHour = startTime.substring(0, 2) //09
  const startTimeMinute = startTime.substring(2, 4) //10
  const endTimeHour = endTime.substring(0, 2) //17
  const endTimeMinute = endTime.substring(2, 4) //50

  const weekRangeStart = moment().day(startDay)
  const weekRangeEnd = moment().day(endDay)
  const dayRangeStart = moment()
    .hour(startTimeHour)
    .minute(startTimeMinute)
    .seconds(0)
    .milliseconds(0)
  const dayRangeEnd = moment()
    .hour(endTimeHour)
    .minute(endTimeMinute)
    .seconds(0)
    .milliseconds(0)

  const weekRangeInterval = Interval.fromDateTimes(
    weekRangeStart.toDate(),
    weekRangeEnd.toDate()
  )

  const dayRangeInterval = Interval.fromDateTimes(
    dayRangeStart.toDate(),
    dayRangeEnd.toDate()
  )

  const count = weekRangeInterval.count("days")

  return {
    days: weekRangeInterval,
    hours: dayRangeInterval,
    count: count,
  }
}

module.exports = {
  checkZone,
  processTimes,
}
