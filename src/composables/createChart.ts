import { Chart, registerables } from 'chart.js'
import { nextTick } from 'vue'

export default async function useCreateChart(config, canvasId:string, chart:Chart|null){
  if(chart){
    chart.clear();
    chart.destroy()
  }
  chart = new Chart(document.getElementById(canvasId), config.value)
  chart.canvas.parentNode.style.height = '600px';
  chart.canvas.parentNode.style.width = '600px';

  return chart
}