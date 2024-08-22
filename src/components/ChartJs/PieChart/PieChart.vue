<template>
  <div class="piechart">
    <canvas id="piechart"></canvas>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import type { IBaseChartData } from '@/components/ChartJs/chart.types'


const props = defineProps<IBaseChartData>()
const config = ref({
  type: 'pie',
  data: props.data,
})
onMounted(() => {
  Chart.register(...registerables)
  new Chart(document.getElementById('piechart'), config.value)
})
</script>