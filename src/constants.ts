import type { ChartOptions } from 'chart.js'

export const AREA_CHART_OPTIONS: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 600 },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
      backgroundColor: '#0B1220',
      borderColor: 'rgba(0,209,255,0.2)',
      borderWidth: 1,
      titleColor: '#F8FAFC',
      bodyColor: '#94A3B8',
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { color: 'rgba(148,163,184,0.7)', autoSkip: true },
      border: { color: 'rgba(255,255,255,0.06)' },
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { color: 'rgba(148,163,184,0.7)' },
      border: { display: false },
    },
  },
}

export const CANDLESTICK_CHART_OPTIONS: ChartOptions<'candlestick'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 600 },
  plugins: {
    legend: { display: false },
    tooltip: {
      display: true,
      backgroundColor: '#0B1220',
      borderColor: 'rgba(0,209,255,0.2)',
      borderWidth: 1,
      titleColor: '#F8FAFC',
      bodyColor: '#94A3B8',
    },
  },
  scales: {
    x: {
      type: 'timeseries' as const,
      time: { unit: 'minute' as const, displayFormats: { minute: 'HH:mm' } },
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { color: 'rgba(148,163,184,0.7)', maxRotation: 0, autoSkip: true },
      border: { color: 'rgba(255,255,255,0.06)' },
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { color: 'rgba(148,163,184,0.7)' },
      border: { display: false },
    },
  },
}

export const BAR_CHART_OPTIONS: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 500,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true, // Forces tooltips active
      mode: 'index',
      intersect: true,
      backgroundColor: '#0B1220',
      borderColor: 'rgba(0, 209, 255, 0.2)',
      borderWidth: 1,
      titleColor: '#F8FAFC',
      bodyColor: '#94A3B8',
      padding: 10,
      cornerRadius: 6,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.04)',
        drawOnChartArea: true,
      },
      ticks: {
        color: 'rgba(148, 163, 184, 0.7)',
        maxRotation: 0,
        autoSkip: true, // Prevents text from slamming into each other
      },
      border: {
        color: 'rgba(255, 255, 255, 0.06)',
      },
    },
    y: {
      beginAtZero: true, // Essential for accurate frequency representations
      grid: {
        color: 'rgba(255, 255, 255, 0.04)',
      },
      ticks: {
        color: 'rgba(148, 163, 184, 0.7)',
      },
      border: {
        display: false,
      },
    },
  },
}
