'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import type { HeatmapResponse } from '../types';

function tzOffset() {
  return new Date().getTimezoneOffset();
}

/** Independent SWR key from the dashboard call — a slow/failed heatmap never blocks the rest of the page. */
export function useAnalyticsHeatmap(weeks = 12) {
  const { data, error, isLoading } = useSWR<HeatmapResponse>(
    `/api/v2/learner-analytics/heatmap?weeks=${weeks}&timezoneOffset=${tzOffset()}`,
    fetcher,
  );

  return { data, error: error as (Error & { status?: number }) | undefined, isLoading };
}
