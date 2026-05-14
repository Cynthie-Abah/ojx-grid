import { supabase } from '@/lib/supabaseClient'
import { randomNumber } from '@/lib/utils'

export const telemetryChannel = supabase.channel('telemetry-stream', {
  config: {
    broadcast: {
      self: true,
    },
  },
})

export const startSimulator = () => {
  let tick = 0
  setInterval(async () => {
    tick += 0.1

    /**
     * Normal traffic wave
     */

    const baseTraffic = Math.sin(tick) * 1200 + 5000

    /**
     * Random attack spikes
     */

    const attackSpike = Math.random() > 0.92 ? randomNumber(4000, 9000) : 0

    /**
     * Traffic
     */

    const requests = Math.floor(baseTraffic + attackSpike + randomNumber(-300, 300))

    /**
     * CPU scales harder
     */

    const cpuBase = 20 + (requests / 10000) * 75

    const cpu = Math.min(
      100,

      Math.max(
        0,

        cpuBase + randomNumber(-8, 8),
      ),
    )

    /**
     * Memory
     */

    const memory = Math.min(
      95,

      35 + cpu * 0.55 + randomNumber(-5, 5),
    )

    /**
     * Network
     */

    const network = Math.floor(requests * 0.5 + randomNumber(-200, 200))

    /**
     * Threat logic
     */

    let anomaly = randomNumber(2, 10)

    let threat = 'LOW'

    if (cpu > 90 || requests > 12000) {
      anomaly = randomNumber(80, 100)

      threat = 'CRITICAL'
    } else if (cpu > 75 || requests > 8500) {
      anomaly = randomNumber(45, 75)

      threat = 'HIGH'
    } else if (cpu > 55) {
      anomaly = randomNumber(20, 40)

      threat = 'MEDIUM'
    }

    const payload = {
      cpu: Number.parseFloat(cpu.toFixed(1)),
      memory: Number.parseFloat(memory.toFixed(1)),
      network,
      requests,
      anomaly,
      threat,
      timestamp: Date.now(),
    }
    await telemetryChannel.send({
      type: 'broadcast',
      event: 'telemetry',
      payload,
    })
  }, 2000)
}

export function receiveUpdate(cb: (payload: any) => void) {
  telemetryChannel.on('broadcast', { event: 'telemetry' }, cb).subscribe((status) => {
    console.log('Subscription status:', status)
  })
}
