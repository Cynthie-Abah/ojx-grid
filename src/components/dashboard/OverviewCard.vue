<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  description: string
  valueColor?: string
  icon: string
}

withDefaults(defineProps<Props>(), {
  valueColor: 'text-text-primary',
})
</script>

<template>
  <div :class="['panel group relative overflow-hidden p-5 flex flex-col gap-2 neural-glow']">
    <div class="panel-highlight" />

    <p class="text-sm uppercase font-mono tracking-[0.2em] text-text-muted">
      {{ label }}
    </p>
    <div class="flex items-center gap-2 mt-5 font-black">
      <i :class="[icon, valueColor]" style="font-size: 1.5rem"></i>
      <h2 :class="['text-4xl']">
        {{ value }}
      </h2>
    </div>

    <p class="mt-4 text-sm text-text-secondary">
      {{ description }}
    </p>
  </div>
</template>
