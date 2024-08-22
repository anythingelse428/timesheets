// Псевдохранилище, не придумал ничего кроме псевдовыдачи данных, большая часть графиков универсальна по данным,
// поэтому сделал функцию получения данных с разбивкой по псевдоасинхронным методам

import { defineStore } from 'pinia'
import { instanceAuth } from '@/composables/useAsyncQuery'
import type { IBaseChartData } from '@/components/ChartJs/chart.types'

export interface IServerResponse {
  chartData: IBaseChartData['data']
  chartConfig: {
    type: string
    [key: string]: any
  }
}

export const useDataStore = defineStore('data', () => {
  // моки для псевдоданных
  const barChartLabels = ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль.',]
  const barChartData: IBaseChartData['data'] = {
    labels: barChartLabels,
    datasets: [{
      label: 'Отработанных часов',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(99,109,255, 0.2)',
        'rgba(64,255,242, 0.2)',
        'rgba(255,228,166, 0.2)',
        'rgba(139,75,192, 0.2)',
        'rgba(235,54,223, 0.2)',
        'rgba(255,214,102, 0.2)',
        'rgba(0,255,44, 0.2)'
      ],
      borderColor: [
        'rgb(99,109,255)',
        'rgb(64,255,242)',
        'rgb(255,228,166)',
        'rgb(139,75,192)',
        'rgb(235,54,223)',
        'rgb(255,214,102)',
        'rgb(0,255,44)'
      ],
      borderWidth: 1
    },
      {
        label: 'Сделанных задач часов',
        data: [5, 9, 0, 1, 6, 5, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }
    ]
  }
  function getUniversalResponse(type: string):IServerResponse{
    return {
      chartData: barChartData,
      chartConfig: {
        type,
        width: '700px'
      }
    }
  }

  // имитация запроса к серваку
  async function getBarChart(){

    const { data } = await instanceAuth.get<IServerResponse>('todos/1') // заменить на метод апи
    // return data // распарсить данные как подобает IServerResponse и вернуть их
    return getUniversalResponse('bar')
  }
  async function getDoughnutChart(){
    const { data } = await instanceAuth.get<IServerResponse>('todos/1')
    // return data
    return getUniversalResponse('doughnut')
  }
  async function getPieChart(){
    const { data } = await instanceAuth.get<IServerResponse>('todos/1')
    // return data
    return getUniversalResponse('pie')
  }
  async function getLineChart(){
    const { data } = await instanceAuth.get<IServerResponse>('todos/1')
    // return data
    return getUniversalResponse('line')
  }
  async function getAreaChart(){
    const { data } = await instanceAuth.get<IServerResponse>('todos/1')
    // return data
    return getUniversalResponse('polarArea')
  }
  return { getBarChart,
            getUniversalResponse,
            getDoughnutChart,
            getPieChart,
            getLineChart,
            getAreaChart,
  }
})
