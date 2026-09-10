import { daysBetween, toLocalHourAndDay } from '../utils/day-bucket.util';
import {
  DailyActivityRow,
  LearningDnaArchetype,
  LearningDnaResult,
  LessonCompletionEvent,
} from '../learner-analytics.types';

/**
 * Learning DNA — classifies a learner's behaviour into one archetype from
 * real signals only:
 *
 *   - time-of-day / day-of-week: from `LearningEvent` timestamps (real,
 *     written on every lesson completion — see gamification.listener.ts)
 *   - pace / consistency: from `UserDailyActivity` (real, per-day rollup)
 *
 * NOT used: session duration/device (the `LearningSession` table exists in
 * schema but nothing writes to it — see plan notes). "Avg session length"
 * below is approximated as time-spent / lessons-completed on active days,
 * which is a coarser but real proxy.
 *
 * Every threshold is named and lives only here.
 */

const MIN_EVENTS_FOR_ARCHETYPE = 8;
const MIN_ACTIVE_DAYS_FOR_ARCHETYPE = 4;

const WEEKEND_WARRIOR_RATIO = 0.55; // >=55% of completions land on Sat/Sun
const NIGHT_LEARNER_RATIO = 0.45; // >=45% of completions land 22:00-04:59 local
const SPRINTER_MIN_SESSION_MINUTES = 45; // long sessions...
const SPRINTER_MAX_CONSISTENCY = 0.35; // ...but infrequent (< 35% of days active)
const FAST_CLIMBER_ACCELERATION = 1.5; // last 14d lessons >= 1.5x the 14d before that
const CONSISTENT_LEARNER_CONSISTENCY = 0.6; // active >=60% of days since they started

const TIME_BLOCKS: Array<{
  block: 'morning' | 'afternoon' | 'evening' | 'night';
  test: (h: number) => boolean;
}> = [
  { block: 'morning', test: (h) => h >= 5 && h <= 11 },
  { block: 'afternoon', test: (h) => h >= 12 && h <= 16 },
  { block: 'evening', test: (h) => h >= 17 && h <= 21 },
  { block: 'night', test: (h) => h >= 22 || h <= 4 },
];

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function computeLearningDna(
  events: LessonCompletionEvent[],
  dailyActivity: DailyActivityRow[],
  todayStr: string,
  timezoneOffsetMinutes: number,
): LearningDnaResult {
  const activeDays = dailyActivity.filter((d) => d.lessonsCompleted > 0);

  if (
    events.length < MIN_EVENTS_FOR_ARCHETYPE ||
    activeDays.length < MIN_ACTIVE_DAYS_FOR_ARCHETYPE
  ) {
    return {
      archetype: 'insufficient_data',
      mostActiveDay: null,
      mostActiveTimeBlock: null,
      avgSessionMinutes: null,
      consistencyPct: null,
    };
  }

  const dayCounts = new Array(7).fill(0);
  const blockCounts: Record<string, number> = {
    morning: 0,
    afternoon: 0,
    evening: 0,
    night: 0,
  };
  let weekendCount = 0;

  for (const ev of events) {
    const { hour, day } = toLocalHourAndDay(
      ev.createdAt,
      timezoneOffsetMinutes,
    );
    dayCounts[day] += 1;
    if (day === 0 || day === 6) weekendCount += 1;
    const block = TIME_BLOCKS.find((b) => b.test(hour))?.block ?? 'evening';
    blockCounts[block] += 1;
  }

  const weekendRatio = weekendCount / events.length;
  const nightRatio = blockCounts.night / events.length;

  const mostActiveDayIndex = dayCounts.indexOf(Math.max(...dayCounts));
  const mostActiveDay = DAY_NAMES[mostActiveDayIndex];
  const mostActiveTimeBlock = Object.entries(blockCounts).sort(
    (a, b) => b[1] - a[1],
  )[0][0] as 'morning' | 'afternoon' | 'evening' | 'night';

  const totalTimeSpent = activeDays.reduce((s, d) => s + d.timeSpentSeconds, 0);
  const totalLessons = activeDays.reduce((s, d) => s + d.lessonsCompleted, 0);
  const avgSessionMinutes =
    totalLessons > 0 ? Math.round(totalTimeSpent / totalLessons / 60) : null;

  const firstActiveDate = [...activeDays].sort((a, b) =>
    a.date.localeCompare(b.date),
  )[0].date;
  const windowDays = Math.min(
    30,
    Math.max(1, daysBetween(todayStr, firstActiveDate) + 1),
  );
  const activeDaysInWindow = activeDays.filter(
    (d) => daysBetween(todayStr, d.date) < windowDays,
  ).length;
  const consistencyPct =
    Math.round((activeDaysInWindow / windowDays) * 100) / 100;

  const last14 = activeDays
    .filter((d) => daysBetween(todayStr, d.date) < 14)
    .reduce((s, d) => s + d.lessonsCompleted, 0);
  const prev14 = activeDays
    .filter((d) => {
      const diff = daysBetween(todayStr, d.date);
      return diff >= 14 && diff < 28;
    })
    .reduce((s, d) => s + d.lessonsCompleted, 0);

  let archetype: LearningDnaArchetype;
  if (weekendRatio >= WEEKEND_WARRIOR_RATIO) {
    archetype = 'weekend_warrior';
  } else if (nightRatio >= NIGHT_LEARNER_RATIO) {
    archetype = 'night_learner';
  } else if (
    (avgSessionMinutes ?? 0) >= SPRINTER_MIN_SESSION_MINUTES &&
    consistencyPct < SPRINTER_MAX_CONSISTENCY
  ) {
    archetype = 'sprinter';
  } else if (prev14 > 0 && last14 >= prev14 * FAST_CLIMBER_ACCELERATION) {
    archetype = 'fast_climber';
  } else if (consistencyPct >= CONSISTENT_LEARNER_CONSISTENCY) {
    archetype = 'consistent_learner';
  } else {
    archetype = 'steady_builder';
  }

  return {
    archetype,
    mostActiveDay,
    mostActiveTimeBlock,
    avgSessionMinutes,
    consistencyPct,
  };
}
