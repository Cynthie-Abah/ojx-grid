<script setup lang="ts">
import { useTelemetryStore } from '@/stores/telemetry'
import LiveUI from './UI/LiveUI.vue'

const store = useTelemetryStore()
</script>

<template>
  <!-- HEADER -->
  <header
    class="sticky top-0 z-100 flex w-full flex-wrap items-center justify-between gap-6 border-b border-[rgba(15,23,42,0.08)] dark:border-white/5 bg-(--header-bg) px-8 py-4 backdrop-blur-xl"
  >
    <div class="flex items-end justify-between gap-6">
      <div>
        <h1 class="mt-2 text-3xl font-sans font-black leading-17 tracking-tight md:text-6xl">
          OJXx GRID
        </h1>

        <p class="text-xs uppercase tracking-[0.3em] font-mono text-text-muted">
          Threat Intelligence Network
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <LiveUI />
        <div
          v-if="store.threatCount"
          class="dark:threat dark:glow rounded-full border border-threat/15 dark:border-threat/20 bg-threat/5 dark:bg-threat/10 px-4 py-2 text-xs tracking-[0.18em] text-threat dark:shadow-[0_0_24px_rgba(242,52,27,0.25)] backdrop-blur-xl"
        >
          THREAT DETECTED
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <button
        @click="store.setIsPaused(!store.paused)"
        class="glow-telemetry glow telemetry group relative overflow-hidden rounded-md border cursor-pointer border-telemetry/20 bg-telemetry/10 px-5 py-5 text-xs font-medium tracking-[0.18em] text-telemetry backdrop-blur-xl transition-all duration-300 hover:border-telemetry/40 hover:bg-telemetry/15"
      >
        <i v-if="store.paused" class="pi pi-play" style="font-size: 0.7rem"></i>
        <i v-else class="pi pi-pause" style="font-size: 0.7rem"></i>
        {{ store.paused ? 'RESUME STREAM' : 'PAUSE STREAM' }}
      </button>
    </div>
  </header>
</template>
