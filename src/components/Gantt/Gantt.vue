<template>
  <div id="chart_div"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
export interface IGanttProps {
  rows: any[][],
  cols: { type: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'timeofday',
          label?: string }[]
}
const props = defineProps<IGanttProps>()
onMounted(()=>{
  drawBasic()
})


google.charts.setOnLoadCallback(drawBasic)
function drawBasic() {
  google.charts.setOnLoadCallback(drawChart)
  function drawChart() {
    const data = new google.visualization.DataTable()
    props.cols.forEach((el)=>data.addColumn(el.type, el.label))
    data.addRows(props.rows)
    const options = { height: 275, width: '100%' }
    const chart = new google.visualization.Gantt(document.getElementById('chart_div'))
    chart.draw(data, options)
  }
}
</script>