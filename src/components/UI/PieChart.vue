<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js'

interface Props {
  chartData: ChartData<'doughnut'>
  chartOptions: ChartOptions<'doughnut'>
  storeLength: number
}

const props = defineProps<Props>()

ChartJS.register(
  {
    id: 'pieGlow',

    beforeDatasetsDraw(chart) {
      const { ctx } = chart

      ctx.save()

      ctx.shadowBlur = 30

      ctx.shadowColor = 'rgba(0,209,255,0.25)'
    },

    afterDatasetsDraw(chart) {
      chart.ctx.restore()
    },
  },
  ArcElement,
  Tooltip,
  Legend,
)
</script>

<template>
  <!-- CHART -->
  <div class="relative mt-8 h-80">
    <!-- RADIAL GLOW -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,209,255,0.08),transparent_70%)]"
    />

    <!-- CHART -->
    <Doughnut :data="chartData" :options="chartOptions" />

    <!-- CENTER LABEL -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-11/12 flex flex-col items-center justify-center text-center"
    >
      <p class="text-xs uppercase tracking-[0.2em] text-text-muted">TOTAL</p>

      <h3 class="mt-2 text-4xl font-black">
        {{ storeLength }}
      </h3>

      <p class="mt-1 text-xs text-text-secondary">events analyzed</p>
    </div>
  </div>
</template>
