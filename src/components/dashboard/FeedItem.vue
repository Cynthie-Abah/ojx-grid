<script setup lang="ts">
import type { feed } from '@/types'
import { ref } from 'vue'

interface Props {
  item: feed
}

const parentRef = ref<HTMLElement | null>(null)

defineProps<Props>()

const toneClasses = {
  LOW: 'text-success',

  MEDIUM: 'text-warning',

  HIGH: 'text-orange-400',

  CRITICAL: 'text-threat',
}
</script>

<template>
  <article class="group relative py-5">
    <!-- SEPARATOR -->
    <div
      class="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent"
    />

    <div class="flex items-start gap-4">
      <!-- STATUS -->
      <div class="mt-1 flex flex-col items-center">
        <!-- PULSE -->
        <span :class="['h-2.5 w-2.5 rounded-full bg-[currentColor]', toneClasses[item.level]]" />

        <!-- LINE -->
        <div class="mt-2 h-full w-px bg-white/5" />
      </div>

      <!-- CONTENT -->
      <div class="flex-1">
        <!-- HEADER -->
        <div class="flex items-center justify-between gap-4">
          <div :class="['text-[11px] font-medium tracking-[0.18em]', toneClasses[item.level]]">
            {{ item.level }}
          </div>
        </div>

        <!-- TITLE -->
        <h3
          class="mt-2 text-sm font-semibold leading-relaxed text-text-primary transition-colors duration-300 group-hover:text-white"
        >
          {{ item.title }}
        </h3>

        <!-- FOOTER -->
        <div class="mt-4 flex items-center gap-3 text-xs">
          <!-- NODE -->
          <div class="font-mono tracking-[0.12em] text-text-secondary">
            {{ item.node }}
          </div>

          <!-- DOT -->
          <span class="h-1 w-1 rounded-full bg-white/10" />

          <!-- STATUS -->
          <div class="tracking-[0.12em] text-text-muted">TELEMETRY ACTIVE</div>
        </div>
      </div>
    </div>
  </article>
</template>
