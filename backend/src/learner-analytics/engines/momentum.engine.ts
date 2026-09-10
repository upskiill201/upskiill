import { addDays, daysBetween } from '../utils/day-bucket.util';
import {
  DailyActivityRow,
  MomentumResult,
  MomentumState,
} from '../learner-analytics.types';

/**
 * Momentum = current learning direction and energy — deliberately NOT the
 * same thing as streak (a learner can hold a streak on minimal effort, or
 * lose momentum without breaking one). It weighs three signals:
 *
 *   1. Recency  — days since the last active day
 *   2. Volume   — active days this week vs the prior week
 *   3. Trend    — lessons completed this week vs the prior week
 *
 * Thresholds below are the only place these numbers live — change them here,
 * not in the frontend.
 */

const STALLED_AFTER_DAYS = 4; // no activity for 4+ days reads as stalled, not just slowing
const SLOWING_AFTER_DAYS = 2; // 2-3 days quiet is a soft warning, not yet "stalled"
const STRONG_MIN_ACTIVE_DAYS = 5; // 5+ active days this week, recently active -> "on a roll"

export function computeMomentum(
  dailyActivity: DailyActivityRow[],
  todayStr: string,
  streakDays: number,
): MomentumResult {
  const byDate = new Map(dailyActivity.map((r) => [r.date, r]));

  const thisWeekDates = Array.from({ length: 7 }, (_, i) =>
    addDays(todayStr, -i),
  );
  const prevWeekDates = Array.from({ length: 7 }, (_, i) =>
    addDays(todayStr, -7 - i),
  );

  const activeDaysThisWeek = thisWeekDates.filter(
    (d) => (byDate.get(d)?.lessonsCompleted ?? 0) > 0,
  ).length;
  const activeDaysPrevWeek = prevWeekDates.filter(
    (d) => (byDate.get(d)?.lessonsCompleted ?? 0) > 0,
  ).length;

  const lessonsThisWeek = thisWeekDates.reduce(
    (sum, d) => sum + (byDate.get(d)?.lessonsCompleted ?? 0),
    0,
  );
  const lessonsPrevWeek = prevWeekDates.reduce(
    (sum, d) => sum + (byDate.get(d)?.lessonsCompleted ?? 0),
    0,
  );

  const lastActiveDate = dailyActivity
    .filter((r) => r.lessonsCompleted > 0)
    .map((r) => r.date)
    .sort()
    .pop();
  const daysSinceLastActive = lastActiveDate
    ? daysBetween(todayStr, lastActiveDate)
    : null;

  let state: MomentumState;
  if (
    daysSinceLastActive === null ||
    daysSinceLastActive >= STALLED_AFTER_DAYS
  ) {
    state = 'stalled';
  } else if (daysSinceLastActive >= SLOWING_AFTER_DAYS) {
    state = 'slowing';
  } else if (
    activeDaysPrevWeek > 0 &&
    lessonsThisWeek < lessonsPrevWeek * 0.6
  ) {
    // Recently active but volume has meaningfully dropped vs last week.
    state = 'slowing';
  } else if (activeDaysThisWeek >= STRONG_MIN_ACTIVE_DAYS) {
    state = 'strong';
  } else if (
    activeDaysThisWeek > activeDaysPrevWeek &&
    lessonsThisWeek > lessonsPrevWeek
  ) {
    state = 'rising';
  } else {
    state = 'steady';
  }

  // Score is a 0-100 blend for the visual indicator only (never shown as a raw
  // number to the learner — the state + Tey copy carries the meaning).
  const recencyScore =
    daysSinceLastActive === null
      ? 0
      : Math.max(0, 100 - daysSinceLastActive * 25);
  const volumeScore = Math.min(100, activeDaysThisWeek * 20);
  const streakScore = Math.min(100, streakDays * 8);
  const score = Math.round(
    recencyScore * 0.5 + volumeScore * 0.35 + streakScore * 0.15,
  );

  return {
    state,
    score,
    daysSinceLastActive,
    activeDaysThisWeek,
    activeDaysPrevWeek,
  };
}
