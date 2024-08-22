<template>
  <div class="bubblechart">
    <canvas id="bubblechart"></canvas>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'

export interface IBubbleChartDataProps {
  data: {
    datasets: {
      label: string
      data: { x: number, y: number, r: number }[]
      backgroundColor: string
    }[]
  }
}
const props = defineProps<IBubbleChartDataProps>()
const config = ref({
  type: 'bubble',
  data: props.data,
})
onMounted(() => {
  Chart.register(...registerables)
  const chart = new Chart(document.getElementById('bubblechart'), config.value)
  chart.canvas.parentNode.style.height = '600px';
  chart.canvas.parentNode.style.width = '600px';
})
</script>