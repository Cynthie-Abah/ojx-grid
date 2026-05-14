/// <reference types="vite/client" />
declare module 'chartjs-chart-financial' {
  import { Plugin, ChartType, ChartDataset } from 'chart.js'

  export const CandlestickController: any
  export const CandlestickElement: any
  export const OhlcController: any
  export const OhlcElement: any

  // This allows the "candlestick" type to be recognized in Chart.js configurations
  module 'chart.js' {
    interface ChartTypeRegistry {
      candlestick: {
        chartOptions: any
        datasetOptions: any
        defaultDataPoint: any
        parsedDataType: any
        scales: keyof TickStepSize
      }
    }
  }
}
