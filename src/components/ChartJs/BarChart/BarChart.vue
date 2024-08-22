<template>
  <div class="barchart">
    <canvas id="barchart"></canvas>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import type { IBaseChartData } from '@/components/ChartJs/chart.types'

const props = defineProps<IBaseChartData>()
const config = ref({
    type: 'bar',
    data: props.data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
})
onMounted(() => {
  Chart.register(...registerables)
  new Chart(document.getElementById('barchart'), config.value)
})
</script>