<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ChartOptions } from 'chart.js'
import { useTelemetryStore } from '@/stores/telemetry'
import PieChart from '../UI/PieChart.vue'
import BarChart from '../UI/BarChart.vue'
import { BAR_CHART_OPTIONS } from '@/constants'

const store = useTelemetryStore()
const chartType = ref('pie')
const severityCounts = computed(() => {
  const low = store.series.filter((item) => item.threat === 'LOW').length

  const medium = store.series.filter((item) => item.threat === 'MEDIUM').length

  const critical = store.series.filter((item) => item.threat === 'CRITICAL').length

  return {
    low,
    medium,
    critical,
  }
})

const chartData = computed(() => ({
  labels: ['LOW', 'MEDIUM', 'CRITICAL'],

  datasets: [
    {
      data: [severityCounts.value.low, severityCounts.value.medium, severityCounts.value.critical],

      backgroundColor: ['rgba(34,197,94,0.85)', 'rgba(245,158,11,0.85)', 'rgba(255,59,59,0.9)'],

      borderColor: ['#22C55E', '#F59E0B', '#FF3B3B'],

      borderWidth: 2,

      hoverOffset: 12,
    },
  ],
}))

const chartOptions = computed(
  () =>
    ({
      responsive: true,

      maintainAspectRatio: false,

      cutout: '72%',

      animation: {
        animateRotate: true,

        duration: 900,
      },

      plugins: {
        legend: {
          position: 'bottom' as const,

          labels: {
            color: '#94A3B8',

            padding: 20,

            font: {
              family: 'Space Grotesk',

              size: 11,
            },
          },
        },

        tooltip: {
          backgroundColor: '#0B1220',

          borderColor: 'rgba(255,255,255,0.08)',

          borderWidth: 1,

          titleColor: '#F8FAFC',

          bodyColor: '#94A3B8',
        },
      },
    }) as ChartOptions<'doughnut'>,
)
</script>

<template>
  <section class="panel flex-1 flex-col justify-between relative overflow-hidden p-6">
    <div class="panel-highlight" />

    <p class="text-base font-mono pb-3 uppercase tracking-[0.2em] text-text-muted">
      SEVERITY DISTRIBUTION
    </p>

    <PieChart
      v-if="chartType === 'pie'"
      :chart-data="chartData"
      :chart-options="chartOptions"
      :store-length="store.series.length"
    />

    <BarChart
      v-if="chartType === 'bar'"
      :chart-data="chartData"
      :chart-options="BAR_CHART_OPTIONS"
      :store-length="store.series.length"
    />

    <div
      class="w-full my-2 flex justify-between items-center gap-2 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-xl"
    >
      <button
        @click="chartType = 'pie'"
        :class="[
          'rounded-full px-4 cursor-pointer hover:bg-cyan-500/10 uppercase py-2 text-xs tracking-[0.18em] transition-all',

          chartType === 'pie' ? 'bg-cyan-500/15 text-cyan-400' : 'text-text-muted',
        ]"
      >
        pie CHART
      </button>

      <button
        @click="chartType = 'bar'"
        :class="[
          'rounded-full px-4 py-2 cursor-pointer hover:bg-cyan-500/10 uppercase text-xs tracking-[0.18em] transition-all',

          chartType === 'bar' ? 'bg-cyan-500/15 text-cyan-400' : 'text-text-muted',
        ]"
      >
        bar CHART
      </button>
    </div>
  </section>
</template>
