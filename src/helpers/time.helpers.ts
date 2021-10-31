import { parse, startOfWeek, eachDayOfInterval, Interval } from 'date-fns'
import { Time_Frame_Token } from '../types/time'

/**
 * Parses the enforceable_time string into usable JS Date objects.
 * It starts by tokenizing the contents of the string, then builds a day range depending on the days specified in the string.
 * Once a range of days are built,  the start & end times are added into each day and an Interval is built.
 * @param enforceable_time
 * @returns An Array of Interval(s). (Object containing a start & end each representing JS Date Objects)
 */
export const parseEnforceableTime = (enforceable_time: string) => {
  const timeframeTokens = tokenizeEnforceableTime(enforceable_time)

  const enforceableTimes: Interval[][] = []
  for (let i = 0; i < timeframeTokens.length; i++) {
    const frame = timeframeTokens[i]

    // Build an Array of dates using a timeframe token's first and last day
    const days = buildTimeframeDays(frame)

    const fullTimeframes: Interval[] = []

    // For each day, build an interval (start and end day+time)
    for (let j = 0; j < days.length; j++) {
      const startTimeAndDay = parse(frame.times.start, 'HHmm', days[j])
      const endTimeAndDay = parse(frame.times.end, 'HHmm', days[j])
      fullTimeframes.push({ start: startTimeAndDay, end: endTimeAndDay })
    }

    enforceableTimes.push(fullTimeframes)
  }
  console.log(enforceableTimes)
  return enforceableTimes
}

/**
 * Builds an Array of Time_Frame objects to make parsing easier to work with
 * @param enforceable_time
 * @returns An Array of Time_Frame objects
 */
const tokenizeEnforceableTime = (enforceable_time: string) => {
  const enforTimeStrings = enforceable_time.split(', ')

  const timeframes: Time_Frame_Token[] = []
  for (let i = 0; i < enforTimeStrings.length; i++) {
    // A frame is something like 0910-1750 MON-FRI
    const frame: Time_Frame_Token = {
      times: {
        start: '',
        end: '',
      },
      days: {
        first: '',
        last: '',
      },
    }

    const timesAndDays = enforTimeStrings[i].split(' ')
    const times = timesAndDays[0]
    const days = timesAndDays[1]

    // time is always in HHmm-HHmm format (ie. 0910-1520)
    const startAndEndTimes = times.split('-')
    frame.times.start = startAndEndTimes[0]
    frame.times.end = startAndEndTimes[1]

    // day(s) are dynamic. (ie. Can be a range MON-FRI or singular SAT)
    // singular days mean that the first & last days are the same.
    const firstAndLastDays = days.split('-')
    frame.days.first = firstAndLastDays[0]
    frame.days.last = firstAndLastDays[1] || firstAndLastDays[0]

    timeframes.push(frame)
  }

  return timeframes
}

/**
 * Builds an Array of days using the start and end strings of a Time_Frame_Token.
 * Note that this is accurate to the day of the week -- Hours and Minutes are NOT taken into account in this stage.
 * @param timeframe A Time_Frame_Token to build a range from
 * @returns
 */
const buildTimeframeDays = (timeframe: Time_Frame_Token) => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }) // Week starts on Monday

  const first = parse(timeframe.days.first, 'eee', weekStart)
  const last = parse(timeframe.days.last, 'eee', weekStart)
  const days = eachDayOfInterval({ start: first, end: last })

  return days
}
