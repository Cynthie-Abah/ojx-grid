export type TelemetryPacket = {
  cpu: number

  memory: number

  network: number

  requests: number

  anomaly: number

  threat: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

  timestamp: number
}

export type feed = {
  id: number
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  title: string
  node: string
  tone: string
}
