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

  const enforceableTime: string = zone.enforceable_time
  const time = enforceableTime.split(',')

  let datesArr = []

  // For all possible time frames specified in enforceable time
  time.forEach(tFrame => {
    /*  Get the time and day on the enforceable time
     *   ie: '0001-2359 MON-SUN' becomes
     *   ['0001-2359', 'MON-SUN']
     */
    const dateStr = tFrame.split(' ')

    /*  ie: '0001-2359' becomes
     *   ['0001','2359']
     */
    const timeStr = dateStr[0].split('-')

    /*  ie: 'MON-SUN' becomes
     *   ['MON','SUN']
     */
    const dayStr = dateStr[1].split('-')

    const startTime = DateTime.fromFormat(timeStr[0], 'HHmm')
    const endTime = DateTime.fromFormat(timeStr[1], 'HHmm')

    const duration = endTime.diff(startTime)

    const startDay = DateTime.fromFormat(dayStr[0], 'EEE').weekday
    const endDay = DateTime.fromFormat(dayStr[1], 'EEE').weekday

    const now = DateTime.local()

    for (let i = startDay; i <= endDay; i++) {
      const start = DateTime.fromObject({
        weekNumber: now.weekNumber,
        weekday: i,
        hour: startTime.hour,
        minute: startTime.minute,
      })
      const day = Interval.after(start, duration)

      datesArr.push(day)
    }
  })
  return datesArr
}

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
