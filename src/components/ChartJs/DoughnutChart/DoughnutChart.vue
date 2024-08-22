<template>
  <div class="doughnut">
    <canvas id="doughnut"></canvas>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import type { IBaseChartData } from '@/components/ChartJs/chart.types'


const props = defineProps<IBaseChartData>()
const config = ref({
  type: 'doughnut',
  data: props.data,
})
onMounted(() => {
  Chart.register(...registerables)
  new Chart(document.getElementById('doughnut'), config.value)
})
</script>