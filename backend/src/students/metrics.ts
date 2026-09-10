/**
 * Pure metric functions for the Students feature — no Prisma, no Nest.
 * Everything testable with plain fixtures. All thresholds come from
 * ENGAGEMENT; no magic numbers below.
 */

import { dayAdd, dayDiff, dayKey, pctChange } from '../analytics/analytics.service';
import { ENGAGEMENT, LearnerSegment } from './engagement.config';

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOUR_BUCKET_LABELS = [
  '00–04',
  '04–08',
  '08–12',
  '12–16',
  '16–20',
  '20–24',
];

export interface CourseProgressLike {
  completedCount: number;
  totalPublished: number;
  progressPct: number;
}

/* ─── status ────────────────────────────────────────────────────────────── */

/**
 * One platform-level segment per learner, precedence-ordered. The first
 * matching rule wins; the rules are exhaustive over their inputs.
 *
 * COMPLETED beats everything (finished ≥1 course is the headline fact).
 * NEW only while the learner is still reachable — an enrollee who vanished
 * inside their first window is a problem, not a newcomer, so they fall
 * through to INACTIVE/AT_RISK framing.
 */
export function computeLearnerStatus(input: {
  firstEnrolledAt: Date;
  lastActivityAt: Date | null;
  daysSinceActive: number | null;
  streakDays: number;
  lessonsLast7d: number;
  courses: CourseProgressLike[];
  struggledLessonCount: number;
  avgQuizScore: number | null;
  completedLessonsTotal: number;
}): LearnerSegment {
  const { firstEnrolledAt, daysSinceActive, streakDays, lessonsLast7d, courses } = input;

  if (
    courses.some((c) => c.totalPublished > 0 && c.completedCount >= c.totalPublished)
  ) {
    return 'COMPLETED';
  }

  const enrolledDaysAgo = Math.floor((Date.now() - firstEnrolledAt.getTime()) / (24 * 60 * 60 * 1000));
  const reachable = daysSinceActive !== null && daysSinceActive <= ENGAGEMENT.ACTIVE_DAYS;
  const neverActive = daysSinceActive === null;

  // Finished nothing AND never studied AND enrollment still fresh → welcome framing.
  if (enrolledDaysAgo < ENGAGEMENT.NEW_WITHIN_DAYS && (neverActive || reachable)) {
    return 'NEW';
  }

  if (neverActive || daysSinceActive! >= ENGAGEMENT.INACTIVE_AFTER_DAYS) return 'INACTIVE';
  if (daysSinceActive! >= ENGAGEMENT.AT_RISK_FROM_DAY) return 'AT_RISK';

  if (
    reachable &&
    (streakDays >= ENGAGEMENT.HIGH_ENGAGE_MIN_STREAK ||
      lessonsLast7d >= ENGAGEMENT.HIGH_ENGAGE_MIN_LESSONS_7D)
  ) {
    return 'HIGHLY_ENGAGED';
  }
  if (
    reachable &&
    courses.some(
      (c) =>
        c.totalPublished > 0 &&
        c.completedCount < c.totalPublished &&
        c.progressPct >= ENGAGEMENT.NEAR_COMPLETION_PCT,
    )
  ) {
    return 'NEAR_COMPLETION';
  }
  if (reachable && input.struggledLessonCount > 0) return 'STRUGGLING';
  if (
    reachable &&
    input.avgQuizScore !== null &&
    input.avgQuizScore >= ENGAGEMENT.HIGH_PERFORMER_MIN_AVG &&
    input.completedLessonsTotal >= ENGAGEMENT.HIGH_PERFORMER_MIN_COMPLETED
  ) {
    return 'HIGH_PERFORMER';
  }
  return 'ACTIVE';
}

/* ─── behavior ──────────────────────────────────────────────────────────── */

export interface DailyRowLike {
  date: string; // YYYY-MM-DD
  lessonsCompleted: number;
  timeSpentSeconds: number;
  xpEarned: number;
}

/**
 * Learning rhythm over the trailing BEHAVIOR_WINDOW_DAYS window:
 * pace per week, session-length proxy (per ACTIVE DAY), consistency,
 * and a two-half pace trend.
 */
export function computeBehavior(args: {
  daily: DailyRowLike[]; // already windowed rows for ONE user
  todayKey?: string; // injectable for tests
  /** When the learner joined (YYYY-MM-DD). Ground truth for eligibility. */
  memberSinceKey?: string;
}): import('./types').BehaviorMetrics {
  const window = ENGAGEMENT.BEHAVIOR_WINDOW_DAYS;
  const todayK = args.todayKey ?? dayKey(new Date());
  const windowStart = dayAdd(todayK, -(window - 1));

  const inWindow = args.daily.filter((d) => d.date >= windowStart && d.date <= todayK);
  const activeDays = inWindow.filter((d) => d.lessonsCompleted > 0 || d.timeSpentSeconds > 0);

  const lessonsInWindow = activeDays.reduce((s, d) => s + d.lessonsCompleted, 0);
  const secondsInWindow = activeDays.reduce((s, d) => s + d.timeSpentSeconds, 0);
  const weeks = window / 7;

  // Eligible days = how many of the trailing-window days this learner has
  // actually existed for (capped at the window), so a learner who joined
  // 5 days ago isn't punished to ~18% consistency forever.
  //
  // Prefer the real membership date. Deriving existence from the OLDEST
  // ACTIVE day is only a fallback: it overstates consistency whenever the
  // learner was inactive on their true first day(s).
  let eligibleDays = window;
  const joined = args.memberSinceKey;
  if (joined && joined > windowStart && joined <= todayK) {
    eligibleDays = Math.min(window, Math.max(1, dayDiff(todayK, joined) + 1));
  } else if (!joined && activeDays.length > 0) {
    const oldest = activeDays.reduce((min, d) => (d.date < min ? d.date : min), activeDays[0].date);
    const span = dayDiff(todayK, oldest) + 1;
    eligibleDays = Math.min(window, Math.max(1, span));
  }

  // Two-half pace comparison over the window.
  const midpoint = dayAdd(todayK, -(window / 2 - 1));
  const recent = activeDays.filter((d) => d.date > midpoint);
  const prior = activeDays.filter((d) => d.date <= midpoint);
  const recentLessons = recent.reduce((s, d) => s + d.lessonsCompleted, 0);
  const priorLessons = prior.reduce((s, d) => s + d.lessonsCompleted, 0);
  const delta = pctChange(recentLessons, priorLessons);

  return {
    lessonsPerWeek: round1(lessonsInWindow / weeks),
    activeDaysPerWeek: round1(activeDays.length / weeks),
    avgSessionMinutes:
      activeDays.length > 0
        ? Math.max(1, Math.round(secondsInWindow / activeDays.length / 60))
        : 0,
    consistencyPct: Math.round((activeDays.length / eligibleDays) * 100),
    daysSinceLastActivity: null, // filled by service (needs profile timestamps)
    paceTrend: delta >= 15 ? 'UP' : delta <= -15 ? 'DOWN' : 'FLAT',
    paceChangePct: delta,
    weekdayHeat: computeWeekdayHeat(activeDays.map((d) => d.date)),
    hourBuckets: [], // filled by service from learningEvent timestamps
  };
}

/** Mon-first counts of activity-day keys. */
export function computeWeekdayHeat(dayKeys: string[]): { label: string; count: number }[] {
  const counts = new Array(7).fill(0) as number[];
  for (const k of dayKeys) {
    const dow = (new Date(`${k}T00:00:00Z`).getUTCDay() + 6) % 7; // Mon=0
    counts[dow] += 1;
  }
  return WEEKDAY_LABELS.map((label, i) => ({ label, count: counts[i] }));
}

/** Six 4-hour buckets over lesson-completion timestamps (approximate/UTC). */
export function computeHourBuckets(timestamps: Date[]): { label: string; count: number }[] {
  const counts = new Array(6).fill(0) as number[];
  for (const ts of timestamps) {
    counts[Math.floor(ts.getUTCHours() / 4)] += 1;
  }
  return HOUR_BUCKET_LABELS.map((label, i) => ({ label, count: counts[i] }));
}

/* ─── struggle detection ───────────────────────────────────────────────── */

export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

export function computeStruggle(
  row: { attemptsCount: number; timeSpentSeconds: number | null },
  learnerMedianSeconds: number | null,
): { struggleSpot: boolean; struggleWhy: ('ATTEMPTS' | 'TIME')[] | null } {
  const why: ('ATTEMPTS' | 'TIME')[] = [];
  if (row.attemptsCount >= ENGAGEMENT.STRUGGLE_ATTEMPTS) why.push('ATTEMPTS');
  if (
    learnerMedianSeconds !== null &&
    row.timeSpentSeconds !== null &&
    row.timeSpentSeconds > 0 &&
    row.timeSpentSeconds >= learnerMedianSeconds * ENGAGEMENT.STRUGGLE_TIME_MULT
  ) {
    why.push('TIME');
  }
  return why.length > 0 ? { struggleSpot: true, struggleWhy: why } : { struggleSpot: false, struggleWhy: null };
}

/* ─── quiz performance ─────────────────────────────────────────────────── */

export interface QuizRowLike {
  completedAt: Date | string;
  lessonTitle: string;
  courseTitle: string;
  score: number;
}

export function computeQuizPerformance(points: QuizRowLike[]): {
  timeline: { completedAt: string; lessonTitle: string; score: number }[];
  improvementTrendPct: number | null;
  strong: { title: string; courseTitle: string; score: number }[];
} {
  const asc = [...points].sort((a, b) => toMs(a.completedAt) - toMs(b.completedAt));
  const scores = asc.map((p) => p.score);

  let improvementTrendPct: number | null = null;
  if (scores.length >= 4) {
    const half = Math.floor(scores.length / 2);
    const firstHalf = mean(scores.slice(0, half));
    const secondHalf = mean(scores.slice(half));
    improvementTrendPct = pctChange(secondHalf, firstHalf);
  }

  return {
    timeline: asc.slice(-ENGAGEMENT.QUIZ_TIMELINE_MAX).map((p) => ({
      completedAt: new Date(p.completedAt).toISOString(),
      lessonTitle: p.lessonTitle,
      score: p.score,
    })),
    improvementTrendPct,
    strong: asc
      .filter((p) => p.score >= ENGAGEMENT.QUIZ_PASS_SCORE)
      .slice(-5)
      .reverse()
      .map((p) => ({ title: p.lessonTitle, courseTitle: p.courseTitle, score: p.score })),
  };
}

/* ─── needs attention ──────────────────────────────────────────────────── */

export type AttentionReason =
  | 'GONE_QUIET'
  | 'STUCK_LESSON'
  | 'FAILING_QUIZ'
  | 'ALMOST_THERE';

export function computeNeedsAttentionReasons(args: {
  daysSinceActive: number | null;
  startedLearning: boolean; // ≥1 completed lesson anywhere
  stalledLessonStartedAt: Date | null; // frontier lesson started but never completed
  failingQuizAttempts: number | null; // max attempts on a low-scoring quiz row
  failingQuizScore: number | null;
  nearCompletionPct: number | null; // max non-finished course pct
}): AttentionReason[] {
  const reasons: AttentionReason[] = [];
  const quiet = args.daysSinceActive ?? Infinity;

  if (
    args.startedLearning &&
    quiet >= ENGAGEMENT.ATTENTION_SILENT_DAYS &&
    quiet < ENGAGEMENT.INACTIVE_AFTER_DAYS
  ) {
    reasons.push('GONE_QUIET');
  }
  if (
    args.stalledLessonStartedAt !== null &&
    Date.now() - args.stalledLessonStartedAt.getTime() >
      ENGAGEMENT.STUCK_LESSON_DAYS * 24 * 60 * 60 * 1000
  ) {
    reasons.push('STUCK_LESSON');
  }
  if (
    args.failingQuizAttempts !== null &&
    args.failingQuizAttempts >= ENGAGEMENT.QUIZ_FAIL_ATTEMPTS &&
    (args.failingQuizScore ?? 0) < ENGAGEMENT.QUIZ_PASS_SCORE
  ) {
    reasons.push('FAILING_QUIZ');
  }
  if (args.nearCompletionPct !== null && args.nearCompletionPct >= ENGAGEMENT.NEAR_COMPLETION_PCT) {
    reasons.push('ALMOST_THERE');
  }
  return reasons;
}

/* ─── journey ──────────────────────────────────────────────────────────── */

export interface JourneyInputEvent {
  at: Date;
  kind: 'ENROLLED' | 'STARTED' | 'LESSON_COMPLETED' | 'QUIZ_RESULT' | 'COURSE_COMPLETED';
  label: string;
  courseId?: string;
  courseTitle?: string;
  detail?: string;
}

/**
 * Chronological journey, ascending, capped at JOURNEY_MAX_EVENTS keeping the
 * MOST RECENT tail (the beginning matters less than where they went silent).
 */
export function buildJourney(events: JourneyInputEvent[]): {
  events: import('./types').JourneyEvent[];
  truncated: boolean;
} {
  const sorted = [...events].sort((a, b) => a.at.getTime() - b.at.getTime());
  const kept = sorted.slice(-ENGAGEMENT.JOURNEY_MAX_EVENTS);
  return {
    events: kept.map((e) => ({
      at: e.at.toISOString(),
      kind: e.kind,
      label: e.label,
      ...(e.courseId ? { courseId: e.courseId } : {}),
      ...(e.courseTitle ? { courseTitle: e.courseTitle } : {}),
      ...(e.detail ? { detail: e.detail } : {}),
    })),
    truncated: sorted.length > kept.length,
  };
}

/* ─── small helpers ────────────────────────────────────────────────────── */

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function mean(values: number[]): number {
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function toMs(d: Date | string): number {
  return new Date(d).getTime();
}
