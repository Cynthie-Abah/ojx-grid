import { supabase } from '@/lib/supabaseClient'

export const getTelemetryEvents = async () => {
  let { data: telemetry_events, error } = await supabase.from('telemetry_events').select('*')

  if (error) {
    throw error
  }

  return telemetry_events
}
