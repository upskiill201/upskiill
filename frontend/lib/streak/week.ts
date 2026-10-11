/**
 * This week, as seven cells — Sunday first, like the top-bar popover — each
 * saying why the day counts: a lesson, a freeze, a repair, or not at all.
 *
 * The server's calendar (/api/streak/calendar) is the truth for past days.
 * When it hasn't loaded, past days inside the running streak are assumed to
 * be lessons, so the row is never emptier than the streak it shows.
 */

import type { CalendarDay } from '@/context/StreakContext';
import { dayKey } from '@/hooks/useStreak';

export type WeekStatus = 'lesson' | 'frozen' | 'repaired' | 'none';

export interface WeekCell {
  date: string;
  letter: string;
  status: WeekStatus;
  isToday: boolean;
  isFuture: boolean;
}

const LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * Seven days around `now`, local time:
 *  - 'calendar' — Sunday → Saturday of this week (the popover, the streak page)
 *  - 'rolling'  — the six days before today, then today last: the streak
 *    celebrations, so the run always reads left to right into today, even
 *    on a Sunday.
 */
export function weekDates(now: Date = new Date(), span: 'calendar' | 'rolling' = 'calendar'): Date[] {
  const start = span === 'rolling' ? 6 : now.getDay();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setHours(12, 0, 0, 0);
    d.setDate(now.getDate() - start + i);
    return d;
  });
}

export function buildWeek({
  now = new Date(),
  calendar,
  streak,
  todayDone,
  span = 'calendar',
}: {
  now?: Date;
  /** Calendar days (any months), or undefined while loading. */
  calendar?: CalendarDay[];
  /** The streak as it stands (counting today when todayDone). */
  streak: number;
  todayDone: boolean;
  span?: 'calendar' | 'rolling';
}): WeekCell[] {
  const today = dayKey(now);
  const byDate = new Map((calendar ?? []).map((d) => [d.date, d]));
  // Past days the running streak covers, counted back from yesterday.
  const pastInStreak = Math.max(0, todayDone ? streak - 1 : streak);

  return weekDates(now, span).map((d) => {
    const date = dayKey(d);
    const isToday = date === today;
    const isFuture = date > today;
    let status: WeekStatus = 'none';
    if (isToday) {
      status = todayDone ? 'lesson' : 'none';
    } else if (!isFuture) {
      const rec = byDate.get(date);
      if (rec) {
        status = rec.status ?? (rec.isFreezeUsed ? 'frozen' : rec.isCompleted ? 'lesson' : 'none');
        if (status === 'none' && rec.isCompleted) status = 'lesson';
      } else if (!calendar) {
        const back = Math.round((new Date(today).getTime() - new Date(date).getTime()) / 86_400_000);
        if (back >= 1 && back <= pastInStreak) status = 'lesson';
      }
    }
    return { date, letter: LETTERS[d.getDay()], status, isToday, isFuture };
  });
}

/**
 * Was yesterday held by a freeze? Then today's lesson "unfreezes" the
 * streak. Pass the calendar for both months when today is the 1st.
 */
export function yesterdayWasFrozen(calendar: CalendarDay[] | undefined, now: Date = new Date()): boolean {
  if (!calendar) return false;
  const y = new Date(now);
  y.setDate(now.getDate() - 1);
  const rec = calendar.find((d) => d.date === dayKey(y));
  return Boolean(rec && (rec.status === 'frozen' || (rec.isFreezeUsed && rec.lessonsCompleted === 0)));
}

export const counts = (s: WeekStatus) => s !== 'none';
