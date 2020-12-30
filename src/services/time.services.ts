import { Interval, DateTime } from 'luxon'

/**
 * Parses the ad-hoc format of enforceable_time from the Calgary Parking Authority API.
 * Uses the Luxon library.
 * @param zone
 * @returns An array containing Luxon Interval Objects of the enforceable_time of the parking zone.
 */
const parseAdhocEnforceableTime = (zone: any): Array<Interval> => {
  if (!zone) {
    throw new Error('Invalid Zone')
  }
  const now = DateTime.local()
  let datesArr = []
  const enforceableTime = zone.enforceable_time
  const timeTokenized = enforceableTime.split(',')

  // For all possible time frames specified in enforceable time
  for (const timeToken of timeTokenized) {
    const { startTime, endTime, startDay, endDay } = parseTimeToken(timeToken)

    for (let i = startDay; i <= endDay; i++) {
      const start = DateTime.fromObject({
        weekNumber: now.weekNumber,
        weekday: i,
        hour: startTime.hour,
        minute: startTime.minute,
      })

      const end = DateTime.fromObject({
        weekNumber: now.weekNumber,
        weekday: i,
        hour: endTime.hour,
        minute: endTime.minute,
      })
      const day = Interval.fromDateTimes(start, end)

      datesArr.push(day)
    }
  }
  return datesArr
}

/**
 * Helper Function that parses an enforceable time String and returns the start/end time & day of the week
 * @param timeToken
 */
const parseTimeToken = (timeToken: string) => {
  /*  Get the time and day on the enforceable time
   *   ie: '0001-2359 MON-SUN' becomes
   *   ['0001-2359', 'MON-SUN']
   */
  const dateStr = timeToken.split(' ')

  /*  ie: '0001-2359' becomes
   *   ['0001','2359']
   */
  const timeStr = dateStr[0].split('-')
  const startTime = DateTime.fromFormat(timeStr[0], 'HHmm')
  const endTime = DateTime.fromFormat(timeStr[1], 'HHmm')

  /*  ie: 'MON-SUN' becomes
   *   ['MON','SUN']
   */
  const dayStr = dateStr[1].split('-')
  const startDay = DateTime.fromFormat(dayStr[0], 'EEE').weekday
  const endDay = DateTime.fromFormat(dayStr[1], 'EEE').weekday

  return {
    startTime,
    endTime,
    startDay,
    endDay,
  }
}

/**
 *  At the time of calling this function, checks for any active time restrictions against an array of Interval objects
 * @param time Array of Interval objects with parsed enforceable_time
 */
const hasTimeRestrictionsNow = (time: Array<Interval>): boolean => {
  const now = DateTime.local()

  for (const tFrame of time) {
    if (tFrame.contains(now)) {
      return true
    }
  }

  return false
}

export { parseAdhocEnforceableTime, hasTimeRestrictionsNow }
