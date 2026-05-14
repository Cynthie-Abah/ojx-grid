<script setup lang="ts">
import { computed } from 'vue'
import { useTelemetryStore } from '@/stores/telemetry'
import AreaChart from '../UI/AreaChart.vue'

const store = useTelemetryStore()

const SAFE_NETWORK_THRESHOLD = 500

const chartData = computed(() => {
  const filteredSeries = store.series
  const bandwidthData = filteredSeries.map((item) => {
    const excessTraffic = item.network - SAFE_NETWORK_THRESHOLD
    const anomalyScore = Math.max(excessTraffic, 0)
    return item.threat === 'CRITICAL' ? anomalyScore * 1.5 : anomalyScore
  })

  return {
    labels: filteredSeries.map((item) => {
      const date = new Date(item.timestamp)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }),

    datasets: [
      {
        label: 'Bandwidth Anomaly',
        data: bandwidthData,
        borderColor: '#8B5CF6',
        borderWidth: 2,
        tension: 0.5,
        pointRadius: 0,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart
          const { ctx, chartArea } = chart

          if (!chartArea) {
            return null
          }

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(139,92,246,0.35)')
          gradient.addColorStop(1, 'rgba(139,92,246,0)')
          return gradient
        },
      },

      {
        label: 'Bandwidth Anomaly Blur',
        data: bandwidthData,
        borderColor: 'rgba(139,92,246,0.25)',
        borderWidth: 8,
        tension: 0.5,
        pointRadius: 0,
        fill: false,
      },
    ],
  }
})

const chartOptions = computed(() => ({
  responsive: true,

  maintainAspectRatio: false,

  animation: {
    duration: 800,
  },

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      backgroundColor: '#0B1220',

      borderColor: 'rgba(139,92,246,0.2)',

      borderWidth: 1,

      titleColor: '#F8FAFC',

      bodyColor: '#94A3B8',
    },
  },

  scales: {
    x: {
      grid: {
        color: 'rgba(255,255,255,0.03)',
      },

      ticks: {
        color: 'rgba(148,163,184,0.6)',
      },

      border: {
        color: 'rgba(255,255,255,0.04)',
      },
    },

    y: {
      grid: {
        color: 'rgba(255,255,255,0.03)',
      },

      ticks: {
        color: 'rgba(148,163,184,0.6)',
      },

      border: {
        display: false,
      },
    },
  },
}))
</script>

<template>
  <AreaChart :chart-data="chartData" :chart-options="chartOptions" />
</template>
