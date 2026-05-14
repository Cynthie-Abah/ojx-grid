<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'

import 'primeicons/primeicons.css'

import { useTelemetryStore } from './stores/telemetry'
import { receiveUpdate, startSimulator } from './services/realtime'
import { onMounted } from 'vue'

const store = useTelemetryStore()

onMounted(() => {
  receiveUpdate((payload) => {
    store.receivePacket(payload)
    store.setIsConnected(true)
  })

  startSimulator()
})
</script>

<template>
  <main class="relative h-screen bg-bg text-text-primary">
    <Header />

    <RouterView />
  </main>
</template>
