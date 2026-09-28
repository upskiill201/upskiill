'use client';

/**
 * The learner's streak, as the backend reconciles it (StreakService): the
 * count, freezes, the next streak goal, a repair offer when one just broke,
 * and any month of the calendar. One SWR cache shared by the top-bar
 * popover, the streak page and the at-risk nudge.
 */

import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import type { CalendarData, StreakStats } from '@/context/StreakContext';

const tz = () => (typeof window === 'undefined' ? 0 : new Date().getTimezoneOffset());

export const streakKey = () => `/api/streak/me?timezoneOffset=${tz()}`;
export const calendarKey = (month?: string) =>
  `/api/streak/calendar?timezoneOffset=${tz()}${month ? `&month=${month}` : ''}`;

export function useStreakStats() {
  return useSWR<StreakStats>(streakKey(), fetcher, { revalidateOnFocus: true, dedupingInterval: 15_000 });
}

export function useStreakCalendar(month?: string) {
  return useSWR<CalendarData>(calendarKey(month), fetcher, { dedupingInterval: 15_000 });
}

/** "YYYY-MM" for the month containing `d`, in local time. */
export function monthOf(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function shiftMonth(month: string, by: number): string {
  const [y, m] = month.split('-').map(Number);
  return monthOf(new Date(y, m - 1 + by, 1));
}

/** Local "YYYY-MM-DD". */
export function dayKey(d: Date): string {
  return `${monthOf(d)}-${String(d.getDate()).padStart(2, '0')}`;
}
