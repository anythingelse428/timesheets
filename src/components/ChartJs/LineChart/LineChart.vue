<template>
  <div class="linechart">
    <canvas id="linechart"></canvas>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import type { IBaseChartData } from '@/components/ChartJs/chart.types'

export interface ILineChartDataProps{
  fill?: boolean
  tension?: number
}

const props = defineProps<IBaseChartData<ILineChartDataProps>>()
const config = ref({
  type: 'line',
  data: props.data,
})
onMounted(() => {
  Chart.register(...registerables)
  new Chart(document.getElementById('linechart'), config.value)
})
</script>