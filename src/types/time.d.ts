import { Interval } from 'date-fns'
/**
 * Used when tokenizing enforceable_time fields to make it easier to work with.
 */
export declare interface Time_Frame_Token {
  times: {
    start: string
    end: string
  }
  days: {
    first: string
    last: string
  }
}

export declare interface Time_Constraints {
  enforceable_times: Interval[][]
  restricted_times: Interval[]
  max_time: Date
}
