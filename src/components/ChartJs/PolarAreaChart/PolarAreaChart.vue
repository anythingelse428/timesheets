<template>
  <div class="polararea">
    <canvas id="polararea"></canvas>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import type { IBaseChartData } from '@/components/ChartJs/chart.types'


const props = defineProps<IBaseChartData>()
const config = ref({
  type: 'polarArea',
  data: props.data,
})
onMounted(() => {
  Chart.register(...registerables)
  new Chart(document.getElementById('polararea'), config.value)
})
</script>