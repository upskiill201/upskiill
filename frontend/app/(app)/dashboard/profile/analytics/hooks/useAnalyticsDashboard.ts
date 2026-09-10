'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import type { DashboardResponse } from '../types';

/** Client's timezone offset in minutes — same convention as the rest of the progress/analytics endpoints. */
function tzOffset() {
  return new Date().getTimezoneOffset();
}

export function useAnalyticsDashboard() {
  const { data, error, isLoading, mutate } = useSWR<DashboardResponse>(
    `/api/v2/learner-analytics/dashboard?timezoneOffset=${tzOffset()}`,
    fetcher,
  );

  return { data, error: error as (Error & { status?: number }) | undefined, isLoading, mutate };
}
