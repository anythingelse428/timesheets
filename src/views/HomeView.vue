<script setup lang="ts">
import Gantt, { type IGanttProps } from '@/components/Gantt/Gantt.vue'
import BarChart from '@/components/ChartJs/BarChart/BarChart.vue'
import { computed, ref } from 'vue'
import BubbleChart, { type IBubbleChartDataProps } from '@/components/ChartJs/BubbleChart/BubbleChart.vue'
import DoughnutChart from '@/components/ChartJs/DoughnutChart/DoughnutChart.vue'
import PieChart from '@/components/ChartJs/PieChart/PieChart.vue'
import LineChart from '@/components/ChartJs/LineChart/LineChart.vue'
import PolarAreaChart from '@/components/ChartJs/PolarAreaChart/PolarAreaChart.vue'
import { useDataStore } from '@/stores/data'
import UniversalChart from '@/components/ChartJs/UniversalChart/UniversalChart.vue'
function daysToMilliseconds(days: number) {
  return days * 24 * 60 * 60 * 1000
}
const ganttData = ref<IGanttProps>({
  rows: [
    ['Research', 'Find sources', new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, null],
    ['Write', 'Write paper', null, new Date(2015, 0, 9), daysToMilliseconds(3), 25, 'Research,Outline'],
    ['Cite', 'Create bibliography', null, new Date(2015, 0, 7), daysToMilliseconds(1), 20, 'Research'],
    ['Complete', 'Hand in paper', null, new Date(2015, 0, 10), daysToMilliseconds(1), 0, 'Cite,Write'],
    ['Outline', 'Outline paper', null, new Date(2015, 0, 6), daysToMilliseconds(1), 100, 'Research']
  ],
  cols: [
    { type: 'string', label: 'Task ID'},
    { type: 'string', label: 'Task Name'},
    { type: 'date', label: 'Start Date'},
    { type: 'date', label: 'End Date'},
    { type: 'number', label: 'Duration'},
    { type: 'number', label: 'Percent Complete'},
    { type: 'string', label: 'Dependencies'},
  ]
})
const bubbleChartData: IBubbleChartDataProps['data'] = {
  datasets:[
    {
    label: 'First Dataset',
    data: [{
      x: 20,
      y: 30,
      r: 15
    },
      {
      x: 40,
      y: 10,
      r: 10
    }],
    backgroundColor: 'rgb(255, 99, 132)'
  },
    {
      label: 'Second Dataset',
      data: [{
        x: 26,
        y: 36,
        r: 15
      },
        {
          x: 46,
          y: 16,
          r: 10
        }],
      backgroundColor: 'rgb(33,230,33)'
    }
  ]
}

const store = useDataStore()
const currentUniversalType = ref('bar')

const universalChartData = computed(()=> {
  return store.getUniversalResponse(currentUniversalType.value)
})

// имитирую запросы к серверу
const barChart = await store.getBarChart()
const doughnutChart = await store.getDoughnutChart()
const pieChart = await store.getPieChart()
const lineChart = await store.getLineChart()
const polarAreaChart = await store.getAreaChart()
</script>

<template>
  <main>
    <div class="pseudo-dynamic">
      <!-- это именно ложная динамика, просто прошу библиотеку ChartJs отрендерить то, что мне нужно
       настоящий динамический компонент работал бы на <component :is=currentUniversalType :data="data"/>
       currentUniversalType - был бы методом, который импортирует необходимый компонент по имени
       -->
      <h1>Псевдо динамический график</h1>
      <div class="pseudo-dynamic__buttons">
        <button @click="currentUniversalType = 'bar'">BarChart</button>
        <button @click="currentUniversalType = 'doughnut'">DoughnutChart</button>
        <button @click="currentUniversalType = 'pie'">PieChart</button>
        <button @click="currentUniversalType = 'line'">LineChart</button>
        <button @click="currentUniversalType = 'polarArea'">PolarAreaChart</button>
      </div>
      <UniversalChart :chart-config="universalChartData.chartConfig" :chart-data="universalChartData.chartData"/>
    </div>
    <Gantt
      :rows="ganttData.rows"
      :cols="ganttData.cols"
    />
    <div class="universals">
      <BarChart :data="barChart.chartData" />
      <DoughnutChart :data="doughnutChart.chartData" />
      <PieChart :data="pieChart.chartData" />
      <LineChart :data="lineChart.chartData" />
      <PolarAreaChart :data="polarAreaChart.chartData" />
    </div>
    <BubbleChart :data="bubbleChartData" />
  </main>
</template>
<style>
.universals {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  margin-inline: auto;
  width: 100%;
  justify-content: center;
}
canvas {
  max-width: 700px;
}
</style>