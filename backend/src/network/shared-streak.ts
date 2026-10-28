/**
 * A buddy streak: consecutive days on which BOTH buddies learned, computed
 * from `user_daily_activity` — no stored counter, so there's nothing to
 * reconcile (StreakService stays the only owner of the personal streak).
 *
 * Like the personal streak, today counts as "still open": if neither has
 * missed yesterday, the streak is alive even before today's lessons.
 */

export function prevDay(day: string): string {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d - 1)).toISOString().slice(0, 10);
}

export function sharedStreak(
  a: ReadonlySet<string>,
  b: ReadonlySet<string>,
  today: string,
  /** The day they became buddies; days before it never count. */
  since: string,
): number {
  let day = a.has(today) && b.has(today) ? today : prevDay(today);
  let count = 0;
  while (day >= since && a.has(day) && b.has(day)) {
    count++;
    day = prevDay(day);
  }
  return count;
}
