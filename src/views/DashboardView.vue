<script setup lang="ts">
import AttackFrequencyChart from '@/components/dashboard/AttackFrequencyChart.vue'
import BandwithAnomalyChart from '@/components/dashboard/BandwithAnomalyChart.vue'
import Feed from '@/components/dashboard/Feed.vue'
import OverviewCard from '@/components/dashboard/OverviewCard.vue'
import { useTelemetryStore } from '@/stores/telemetry'
import SeverityDistributionChart from '@/components/dashboard/SeverityDistributionChart.vue'

const store = useTelemetryStore()
</script>

<template>
  <!-- CONTENT -->
  <section
    class="z-10 px-8 py-10 w-full h-full mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_390px]"
  >
    <div class="w-full overflow-y-auto scroll-smooth no-scrollbar h-full">
      <!-- METRIC CARDS -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <!-- CARD -->
        <OverviewCard
          icon="pi pi-exclamation-circle"
          label="ACTIVE THREATS"
          :value="store.threatCount"
          description=""
          valueColor="text-threat"
        />
        <!-- CARD -->
        <OverviewCard
          icon="pi pi-ban"
          label="BLOCKED REQUESTS"
          :value="store.blockedRequests.toLocaleString()"
          description=""
          valueColor="text-threat"
        />

        <!-- CARD -->
        <OverviewCard
          icon="pi pi-wifi"
          label="NETWORK LOAD"
          :value="store.networkLoad + '%'"
          description=""
          valueColor="text-telemetry"
        />
      </div>

      <!-- MAIN GRID -->
      <div class="flex flex-col gap-6 pt-6">
        <div class="flex items-stretch h-full justify-between gap-6">
          <!-- attack frequency chart -->
          <AttackFrequencyChart />

          <SeverityDistributionChart />
        </div>

        <!-- SIGNAL MATRIX AREA ↔ HEATMAP -->
        <section class="panel w-full overflow-hidden p-6">
          <div class="panel-highlight" />

          <p class="text-base pb-3 uppercase tracking-[0.2em] font-mono text-text-muted">
            Bandwidth Anomalies
          </p>

          <BandwithAnomalyChart />
        </section>
      </div>
    </div>

    <Feed />
  </section>
</template>
