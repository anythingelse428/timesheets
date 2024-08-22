export interface IBaseChartData<D = any> {
  data: {
    labels: string[],
    datasets: {
      label: string
      data: number[]
      backgroundColor?: string[]
      borderColor?: string[]
      borderWidth?: number
    }[]
    hoverOffset?: number
  }
}
// export type TBaseDataSet<T> = T extends {
//   label: string
//   data: number[]
//   backgroundColor?: string[]
//   borderColor?: string[]
//   borderWidth?: number
// }