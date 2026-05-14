<script setup lang="ts">
import { useTelemetryStore } from '@/stores/telemetry'

const store = useTelemetryStore()
</script>
<template>
  <div
    :class="[
      'rounded-full border px-4 py-2 text-xs tracking-[0.18em] backdrop-blur-xl transition-all duration-300',

      store.isConnected
        ? 'animate-pulse border-success/20 bg-success/10 text-success shadow-success-glow'
        : 'border-warning/20 bg-warning/10 text-warning shadow-[0_0_24px_rgba(245,158,11,0.2)]',
    ]"
  >
    <p>
      {{ store.isConnected ? 'CONNECTED' : 'SIGNAL DEGRADED' }}
    </p>
  </div>
</template>
