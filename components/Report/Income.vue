<script setup lang="ts">
import {DoughnutChart} from 'vue-chart-3';
import type {PropType} from "vue";

const props = defineProps({
  data: {
    type: Object as PropType<{ name: string, total: string }[]>,
  }
})

const chartData = computed(() => {
  return {
    labels: props.data?.map(d => d.name) ?? [],
    datasets: [
      {
        data: props.data?.map(d => d.total) ?? [],
      },
    ],
  }
})

</script>

<template>
  <div class="p-4 space-y-6 border-2 border-black rounded-xl">
    <h1 class="font-bold text-lg uppercase">Income by categories</h1>
    <DoughnutChart v-if="data" :chartData="chartData"/>
    <div v-else class="text-center py-20 space-y-4 ">
      <UIcon name="lucide:pie-chart" class="h-20 w-20 text-gray-300"/>
      <div class="text-gray-300">
        No transactions found for this month
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>