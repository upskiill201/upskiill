'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import type { ActivityMetric, ActivityPeriod, ActivityResponse } from '../types';

function tzOffset() {
  return new Date().getTimezoneOffset();
}

/** Keyed by [period, metric] so switching either only refetches what changed — SWR caches every combo the learner has visited this session. */
export function useAnalyticsActivity(period: ActivityPeriod, metric: ActivityMetric) {
  const { data, error, isLoading, mutate } = useSWR<ActivityResponse>(
    `/api/v2/learner-analytics/activity?period=${period}&metric=${metric}&timezoneOffset=${tzOffset()}`,
    fetcher,
  );

  return { data, error: error as (Error & { status?: number }) | undefined, isLoading, mutate };
}
