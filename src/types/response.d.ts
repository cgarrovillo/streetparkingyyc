declare interface APIResponse {
  zone: string
  status: string
  enforceable_time: string
  canParkHere: boolean
  hasConditions?: {
    maxParkingTime?: number
  }
}

export default APIResponse
