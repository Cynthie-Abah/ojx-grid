import { generateNodeName, generateThreatTitle } from '@/lib/utils'
import type { feed, TelemetryPacket } from '@/types'
import { defineStore } from 'pinia'

export const useTelemetryStore = defineStore(
  'telemetry',

  {
    state: () => ({
      latest: null as TelemetryPacket | null,
      series: [] as TelemetryPacket[],
      buffer: [] as TelemetryPacket[],
      feed: [] as feed[],
      isConnected: false,
      paused: false,
    }),

    actions: {
      receivePacket({ payload }: { payload: TelemetryPacket }) {
        if (this.paused) {
          return
        }
        this.latest = payload
        this.series.push(payload)
        this.feed.unshift({
          id: payload.timestamp,

          level: payload.threat,

          title: generateThreatTitle(payload),

          node: generateNodeName(),

          tone: payload.threat,
        })
      },
      recieveSeries(payload: TelemetryPacket[]) {
        this.series = payload
      },
      setIsConnected(isConnected: boolean) {
        this.isConnected = isConnected

        if (!this.latest) {
          return false
        }

        return Date.now() - this.latest.timestamp < 5000
      },
      setIsPaused(isPaused: boolean) {
        this.paused = isPaused
      },
    },

    // feed,
    getters: {
      // threatCount
      threatCount: (state) => {
        return state.series.filter((item) => item.threat === 'CRITICAL').length
      },
      // blockedRequests
      blockedRequests: (state) => {
        return state.series.reduce((sum, item) => sum + item.requests, 0)
      },
      // networkLoad
      networkLoad: (state) => {
        if (!state.latest) {
          return 0
        }

        const MAX_NETWORK = 5000

        return Math.round((state.latest.network / MAX_NETWORK) * 100)
      },
    },
  },
)
