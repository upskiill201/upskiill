/**
 * Date/time helpers shared across the learner-analytics engines.
 *
 * Mirrors the local-date conversion approach already used in
 * `progress.service.ts` (kept private there), exported here so every engine
 * in this module buckets days the same way instead of each writing its own
 * date math.
 */

/** Converts a Date to a local YYYY-MM-DD string given a timezone offset in minutes. */
export function getLocalDateString(
  date: Date,
  timezoneOffsetMinutes: number,
): string {
  const localMs = date.getTime() - timezoneOffsetMinutes * 60 * 1000;
  return new Date(localMs).toISOString().split('T')[0];
}

/** Adds N days (can be negative) to a YYYY-MM-DD date string. */
export function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().split('T')[0];
}

/** Returns the ISO week's Monday date string for any given date string. */
export function getMondayOfWeek(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z');
  const day = d.getUTCDay(); // 0=Sun..6=Sat
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return d.toISOString().split('T')[0];
}

/** Whole-day difference (day1 - day2), both YYYY-MM-DD. */
export function daysBetween(day1: string, day2: string): number {
  const [y1, m1, d1] = day1.split('-').map(Number);
  const [y2, m2, d2] = day2.split('-').map(Number);
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  return Math.round((utc1 - utc2) / (1000 * 60 * 60 * 24));
}

/** True if a YYYY-MM-DD date string falls on Sat/Sun (UTC day-of-week, matches getMondayOfWeek). */
export function isWeekend(dateStr: string): boolean {
  const day = new Date(dateStr + 'T00:00:00Z').getUTCDay();
  return day === 0 || day === 6;
}

/** Formats a duration for display, e.g. 95 -> "1h 35m", 40 -> "40m". */
export function formatDuration(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return '0m';
  const totalMinutes = Math.round(totalSeconds / 60);
  if (totalMinutes < 60) return `${totalMinutes}m`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
}

/**
 * Converts a UTC lesson-completion timestamp to the learner's local hour
 * (0-23) and day-of-week (0=Sun..6=Sat), used by the Learning DNA engine's
 * time-of-day / day-of-week pattern detection.
 */
export function toLocalHourAndDay(
  date: Date,
  timezoneOffsetMinutes: number,
): { hour: number; day: number } {
  const local = new Date(date.getTime() - timezoneOffsetMinutes * 60 * 1000);
  return { hour: local.getUTCHours(), day: local.getUTCDay() };
}
