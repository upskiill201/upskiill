import { daysBetween, toLocalHourAndDay } from '../utils/day-bucket.util';
import {
  CompletedLessonRow,
  CourseProgressRow,
  Insight,
  LessonCompletionEvent,
} from '../learner-analytics.types';

/**
 * "What Tey Notices" — a small set of deterministic rules, each a pure
 * `(ctx) => Insight | null`. The orchestrator runs every rule and keeps only
 * the top `MAX_INSIGHTS` by priority — this file never returns more than a
 * handful, and never returns a rule whose data requirement isn't met.
 *
 * Kept as named functions in one file rather than one-file-per-rule: at ~4
 * rules a folder is unwarranted structure for a solo-operator codebase, and
 * each rule is already an independent pure function, so splitting later (if
 * this grows past ~8-10 rules) is a plain file move, not a rewrite.
 */

const MAX_INSIGHTS = 3;
const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MIN_STREAK_FOR_CONSISTENCY_INSIGHT = 7;
const MIN_EVENTS_FOR_DAY_PREFERENCE = 10;
const DAY_PREFERENCE_DOMINANCE = 1.8; // top day must have >=1.8x the average day's count
const MIN_SCORED_LESSONS_FOR_TREND = 6;
const MEANINGFUL_IMPROVEMENT_POINTS = 8; // percentage points
const SKILL_NEGLECT_MIN_DAYS = 10;

function consistencyInsight(streakDays: number): Insight | null {
  if (streakDays < MIN_STREAK_FOR_CONSISTENCY_INSIGHT) return null;
  return { id: 'consistency', priority: 2, data: { streakDays } };
}

function dayOfWeekPreferenceInsight(
  events: LessonCompletionEvent[],
  timezoneOffsetMinutes: number,
): Insight | null {
  if (events.length < MIN_EVENTS_FOR_DAY_PREFERENCE) return null;

  const counts = new Array(7).fill(0);
  for (const ev of events) {
    const { day } = toLocalHourAndDay(ev.createdAt, timezoneOffsetMinutes);
    counts[day] += 1;
  }
  const max = Math.max(...counts);
  const avg = events.length / 7;
  if (max < avg * DAY_PREFERENCE_DOMINANCE) return null;

  const topDayIndex = counts.indexOf(max);
  return {
    id: 'day_of_week_preference',
    priority: 1,
    data: { day: DAY_NAMES[topDayIndex], count: max },
  };
}

function improvementTrendInsight(
  completedLessons: CompletedLessonRow[],
): Insight | null {
  const scored = completedLessons
    .filter((l) => l.quizScore !== null)
    .sort((a, b) => a.completedAt.getTime() - b.completedAt.getTime());
  if (scored.length < MIN_SCORED_LESSONS_FOR_TREND) return null;

  const mid = Math.floor(scored.length / 2);
  const older = scored.slice(0, mid);
  const recent = scored.slice(mid);
  const avg = (rows: CompletedLessonRow[]) =>
    rows.reduce((s, r) => s + (r.quizScore ?? 0), 0) / rows.length;
  const olderAvg = avg(older);
  const recentAvg = avg(recent);
  const delta = recentAvg - olderAvg;

  if (delta < MEANINGFUL_IMPROVEMENT_POINTS) return null; // only surface genuine, positive improvement here
  return {
    id: 'improvement_trend',
    priority: 3,
    data: { fromPct: Math.round(olderAvg), toPct: Math.round(recentAvg) },
  };
}

function skillNeglectInsight(
  courses: CourseProgressRow[],
  todayStr: string,
): Insight | null {
  const candidates = courses
    .filter((c) => c.status === 'in_progress')
    .map((c) => ({
      c,
      idleDays: c.lastActiveAt
        ? daysBetween(todayStr, c.lastActiveAt.toISOString().split('T')[0])
        : Infinity,
    }))
    .filter((x) => x.idleDays >= SKILL_NEGLECT_MIN_DAYS)
    .sort((a, b) => b.idleDays - a.idleDays);

  if (candidates.length === 0) return null;
  const worst = candidates[0];
  return {
    id: 'skill_neglect',
    priority: 4,
    data: {
      courseId: worst.c.courseId,
      courseTitle: worst.c.courseTitle,
      idleDays:
        worst.idleDays === Infinity ? SKILL_NEGLECT_MIN_DAYS : worst.idleDays,
    },
  };
}

export function computeInsights(ctx: {
  streakDays: number;
  events: LessonCompletionEvent[];
  timezoneOffsetMinutes: number;
  completedLessons: CompletedLessonRow[];
  courses: CourseProgressRow[];
  todayStr: string;
}): Insight[] {
  const candidates = [
    consistencyInsight(ctx.streakDays),
    dayOfWeekPreferenceInsight(ctx.events, ctx.timezoneOffsetMinutes),
    improvementTrendInsight(ctx.completedLessons),
    skillNeglectInsight(ctx.courses, ctx.todayStr),
  ].filter((i): i is Insight => i !== null);

  return candidates
    .sort((a, b) => b.priority - a.priority)
    .slice(0, MAX_INSIGHTS);
}
