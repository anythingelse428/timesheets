<template>
  <div class="universalChart">
    <canvas :id="`universal-${chartConfig.type}`"></canvas>
  </div>
</template>
<script setup lang="ts">

import type { IServerResponse } from '@/stores/data'
import { computed, nextTick, onMounted, ref, toRef, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

let chart:Chart|null = null
const props = defineProps<IServerResponse>()
const config = ref({
  type: props.chartConfig.type,
  data: props.chartData
})
watch(props,(val)=>{
  config.value.type = val.chartConfig.type
  if(chart){
    chart.clear();
    chart.destroy()
  }
  nextTick(()=>{
    chart = new Chart(document.getElementById(`universal-${props.chartConfig.type}`), config.value)
  })
})

onMounted(() => {
  Chart.register(...registerables)
  chart = new Chart(document.getElementById(`universal-${props.chartConfig.type}`), config.value)
  chart.canvas.parentNode.style.height = '600px';
  chart.canvas.parentNode.style.width = '600px';
})
</script>