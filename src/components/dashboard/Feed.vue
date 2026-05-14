<script setup lang="ts">
import { useTelemetryStore } from '@/stores/telemetry'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { ref } from 'vue'
import LiveUI from '../UI/LiveUI.vue'
import FeedItem from './FeedItem.vue'

const store = useTelemetryStore()
const parentRef = ref<HTMLElement | null>(null)

const rowVirtualizer = useVirtualizer({
  get count() {
    return store.feed.length
  },
  getScrollElement: () => parentRef.value,
  estimateSize: () => 120,
  overscan: 5,
})
</script>

<template>
  <!-- FEED -->
  <aside class="panel overflow-y-auto max-h-full p-6">
    <div class="panel-highlight" />

    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-text-muted">REALTIME STREAM</p>
        <h2 class="mt-2 text-3xl font-bold">Neural Feed</h2>
      </div>
      <LiveUI />
    </div>

    <div ref="parentRef" class="mt-8 h-full overflow-y-auto relative">
      <div
        :style="{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }"
      >
        <div
          v-for="virtualRow in rowVirtualizer.getVirtualItems()"
          :key="virtualRow.index"
          :style="{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
          }"
        >
          <FeedItem v-if="store.feed[virtualRow.index]" :item="store.feed[virtualRow.index]!" />
        </div>
      </div>
    </div>
  </aside>
</template>
