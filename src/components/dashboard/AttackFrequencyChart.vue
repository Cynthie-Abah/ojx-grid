<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTelemetryStore } from '@/stores/telemetry'
import AreaChart from '../UI/AreaChart.vue'
import { AREA_CHART_OPTIONS, CANDLESTICK_CHART_OPTIONS } from '@/constants'
import { getAreaChartData, getCandlestickChartData } from '@/lib/utils'
import CandleStickChart from '../UI/CandlestickChart.vue'

const store = useTelemetryStore()
const chartType = ref('area')
const timeRange = ref('12h')

const filteredSeries = computed(() => {
  const now = Date.now()
  let cutoff = now - 12 * 60 * 60 * 1000

  if (timeRange.value === '1h') cutoff = now - 1 * 60 * 60 * 1000
  if (timeRange.value === '6h') cutoff = now - 6 * 60 * 60 * 1000

  return store.series.filter((item) => item.timestamp >= cutoff)
})

const areaChartData = computed(() => getAreaChartData(filteredSeries.value))
const candlestickChartData = computed(() => getCandlestickChartData(filteredSeries.value))
</script>

<template>
  <section class="panel relative h-full flex-2 space-y-2 overflow-hidden p-6">
    <div class="pb-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h2 class="text-base uppercase tracking-[0.2em] text-text-muted font-mono">
          Attack Frequency
        </h2>
        <LiveUI />
      </div>

      <div class="flex items-center gap-4">
        <!-- FIXED: Bound value to timeRange ref -->
        <select
          v-model="timeRange"
          class="rounded-sm border border-white/10 bg-slate-950/80 px-3 p-2 text-sm text-text-primary outline-none transition duration-200 ease-in-out focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/20"
        >
          <option value="1h">An Hour Ago</option>
          <option value="6h">6 Hours Ago</option>
          <option value="12h">12 Hours Ago</option>
        </select>
      </div>
    </div>
    <div
      class="w-full my-2 flex justify-between items-center gap-2 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-xl"
    >
      <button
        @click="chartType = 'area'"
        :class="[
          'rounded-full cursor-pointer hover:bg-cyan-500/10 px-4 uppercase py-2 text-xs tracking-[0.18em] transition-all',

          chartType === 'area' ? 'bg-cyan-500/15 text-cyan-400' : 'text-text-muted',
        ]"
      >
        AREA CHART
      </button>

      <button
        @click="chartType = 'candlestick'"
        :class="[
          'rounded-full px-4 cursor-pointer hover:bg-cyan-500/10 py-2 uppercase text-xs tracking-[0.18em] transition-all',

          chartType === 'candlestick' ? 'bg-cyan-500/15 text-cyan-400' : 'text-text-muted',
        ]"
      >
        CANDLEstick CHART
      </button>
    </div>

    <div class="">
      <AreaChart
        v-if="chartType === 'area'"
        :chart-data="areaChartData"
        :chart-options="AREA_CHART_OPTIONS"
      />
      <CandleStickChart
        v-else-if="chartType === 'candlestick'"
        :chart-data="candlestickChartData"
        :chart-options="CANDLESTICK_CHART_OPTIONS"
      />
    </div>
  </section>
</template>
