<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'

interface Props {
  chartData: ChartData<'bar'>
  chartOptions: ChartOptions<'bar'>
}

const props = defineProps<Props>()

ChartJS.register(
  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  Tooltip,

  Filler,
)
</script>

<template>
  <div class="relative h-85 overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black/20">
    <!-- GRID -->
    <div
      class="absolute inset-0 opacity-30"
      style="
        background:
          linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);

        background-size: 40px 40px;
      "
    />

    <!-- SCANNER -->
    <div class="scanner-line" />

    <!-- CHART -->
    <div class="relative h-full w-full p-4">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
