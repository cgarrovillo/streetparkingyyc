declare interface APIResponse {
  zone: string
  restrictions: {}
  canParkHere: boolean
  timeLeft: string
  conditions: []
}

export default APIResponse
