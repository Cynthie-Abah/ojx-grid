import type { TelemetryPacket } from '@/types'
import type { ChartData } from 'chart.js'

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomItem<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length)
  const item = array[index]
  if (item === undefined) {
    throw new Error('Array must not be empty')
  }
  return item
}

export function generateThreatTitle(payload: TelemetryPacket): string {
  switch (payload.threat) {
    case 'CRITICAL':
      return 'Critical threat detected'
    case 'MEDIUM':
      return 'Medium threat detected'
    case 'LOW':
      return 'Low threat detected'
    default:
      return 'Unknown threat level'
  }
}

export function generateNodeName(): string {
  const nodes = ['AUTH_CLUSTER', 'EDGE_NODE_EU', 'CDN_NETWORK', 'API_GATEWAY', 'CACHE_LAYER']
  return nodes[Math.floor(Math.random() * nodes.length)] || ''
}

export function getAreaChartData(series: TelemetryPacket[]): ChartData<'line'> {
  return {
    labels: series.map((item) => {
      const date = new Date(item.timestamp)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }),
    datasets: [
      {
        label: 'Attack Frequency',
        data: series.map((item) => {
          if (item.threat === 'CRITICAL') return item.anomaly + 10
          if (item.threat === 'HIGH') return item.anomaly + 5
          return item.anomaly
        }),
        borderColor: '#00D1FF',
        borderWidth: 3,
        tension: 0.45,
        pointRadius: 0,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(0,209,255,0.35)')
          gradient.addColorStop(1, 'rgba(0,209,255,0)')
          return gradient
        },
      },
    ],
  }
}

export function getCandlestickChartData(series: TelemetryPacket[]): ChartData<'candlestick'> {
  return {
    datasets: [
      {
        label: 'Attack Volatility',
        type: 'candlestick' as const,
        color: { up: '#00D1FF', down: '#FF3B3B', unchanged: '#8B5CF6' },
        borderColor: { up: '#00D1FF', down: '#FF3B3B', unchanged: '#8B5CF6' },
        data: series.map((item) => {
          const baseline = item.anomaly
          const peak =
            item.anomaly + (item.threat === 'CRITICAL' ? 15 : item.threat === 'HIGH' ? 8 : 4)
          const low = Math.max(0, item.anomaly - 2)
          const stabilized = item.anomaly + (item.threat === 'CRITICAL' ? 5 : 1)

          return {
            x: new Date(item.timestamp).getTime(),
            o: Math.round(baseline),
            h: Math.round(peak),
            l: Math.round(low),
            c: Math.round(stabilized),
          }
        }),
      },
    ],
  }
}
