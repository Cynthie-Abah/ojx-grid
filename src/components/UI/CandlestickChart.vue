<script setup lang="ts">
import 'chartjs-adapter-luxon'
import { Chart as FinancialChart } from 'vue-chartjs'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  TimeScale,
  TimeSeriesScale,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js'

import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial'

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  TimeScale,
  TimeSeriesScale,
  Legend,
  CandlestickController,
  CandlestickElement,
)

interface Props {
  chartData: ChartData<'candlestick'>
  chartOptions: ChartOptions<'candlestick'>
}

const props = defineProps<Props>()
</script>

<template>
  <div class="relative h-80 overflow-hidden rounded-[28px] border border-cyan-500/10 bg-black/20">
    <div
      class="absolute inset-0 opacity-30"
      style="
        background:
          linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);

        background-size: 40px 40px;
      "
    />
    <div class="scanner-line" />

    <div class="relative h-full w-full p-4">
      <FinancialChart type="candlestick" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
