# OJX GRID

A high-performance real-time cybersecurity analytics dashboard built with Vue, TypeScript, Pinia, Supabase Realtime, and Chart.js.

OJX GRID simulates a production-grade telemetry intelligence platform capable of visualizing live attack activity, anomaly spikes, network volatility, and streaming system metrics in real time.

Inspired by:

- cybersecurity command centers
- SIEM dashboards
- trading terminals
- telemetry monitoring systems
- neural intelligence interfaces

---

## Preview

OJX GRID delivers:

- live telemetry streaming
- animated realtime charts
- candlestick analytics
- live threat feed
- realtime metric cards
- chart-type switching
- pause/resume streaming
- responsive dashboard layouts
- scalable realtime architecture

---

# Tech Stack

## Frontend

- Vue 3
- TypeScript
- Pinia
- TailwindCSS
- Chart.js
- vue-chartjs
- TanStack Virtual

## Backend / Realtime

- Supabase Broadcast Channels
- PostgreSQL

---

# Core Features

## Real-Time Streaming

OJX GRID uses Supabase Realtime Broadcast Channels to simulate live telemetry streams.

The simulator generates:

- network traffic
- CPU usage
- memory utilization
- anomaly spikes
- threat severity
- request volatility

Streaming updates occur every 2 seconds.

---

## Advanced Visualization System

### Attack Frequency Chart

- smooth animated area chart
- glowing telemetry gradients
- realtime updates
- responsive scaling

### Severity Distribution

- animated doughnut chart
- realtime threat breakdown
- live dataset updates

### Live Metric Cards

- active threats
- blocked requests
- network load
- telemetry status

---

# Realtime Activity Feed

The dashboard includes a live telemetry stream featuring:

- severity indicators
- live node activity
- realtime anomaly detection
- streaming threat logs
- animated feed updates

The feed is virtualized using TanStack Virtual to efficiently handle growing datasets without degrading rendering performance.

---

# State Management Strategy

OJX GRID uses Pinia as the centralized state management layer.

The store is responsible for:

- realtime telemetry ingestion
- feed updates
- stream buffering
- derived analytics
- connection state
- chart synchronization

### Store Architecture

```ts
latest
series
feed
buffer
isConnected
paused
```
