import type {
  TeyContext,
  TeyPriority,
  TeyReason,
} from '../../contracts/tey-context.types';
import type { LearnerStateSnapshot } from '../../contracts/tey-state.types';
import type { TeyLocalNow } from '../../state/local-time.util';

/** What a rule asks the scheduler to queue. */
export interface ScheduleIntent {
  ruleId: TeyReason;
  priority: TeyPriority;
  dueAt: Date;
  /** Past this, the action is dropped rather than sent late. */
  expiresAt: Date;
  dedupeKey: string;
  /** A hint only. Always revalidated against fresh state before sending. */
  contextHint: Partial<TeyContext>;
}

/**
 * A rule is pure. It performs no IO, reads no clock of its own, and returns the
 * same answer for the same inputs — which is what makes the whole decision
 * matrix testable as a table rather than a fixture farm.
 */
export interface TeyRule {
  readonly id: TeyReason;
  readonly priority: TeyPriority;
  /** Minimum hours between two deliveries of this rule to one learner. */
  readonly cooldownHours: number;
  /** Rules whose pending actions this one supersedes when both would fire. */
  readonly supersedes: readonly TeyReason[];

  /** Should anything be queued for this learner right now? */
  plan(state: LearnerStateSnapshot, now: TeyLocalNow): ScheduleIntent | null;

  /**
   * Re-run at fire time against a FRESHLY projected state. This is the check
   * that stops Tey nagging someone who already did the work — see spec section
   * 10. Returning false marks the action SKIPPED and sends nothing.
   */
  stillRelevant(state: LearnerStateSnapshot, now: TeyLocalNow): boolean;

  /** Full context for rendering and for the delivery ledger. */
  buildContext(state: LearnerStateSnapshot, now: TeyLocalNow): TeyContext;
}

/** Builds the local-day-scoped dedupe key every rule uses. */
export function dedupeKeyFor(
  ruleId: TeyReason,
  userId: string,
  localDate: string,
): string {
  return `${ruleId}:${userId}:${localDate}`;
}

/**
 * Local wall-clock time today, as a real instant.
 *
 * Derived from the offset TeyLocalNow already resolved, so DST is handled by
 * whatever produced that offset rather than re-guessed here.
 */
export function localTimeToday(
  now: TeyLocalNow,
  hour: number,
  minute = 0,
): Date {
  const [y, m, d] = now.date.split('-').map(Number);
  const utcMs = Date.UTC(y, m - 1, d, hour, minute);
  return new Date(utcMs + now.offsetMinutes * 60 * 1000);
}

/**
 * Deterministic per-user jitter, up to `maxSeconds`.
 *
 * Everyone's "20:30 local" lands in a handful of instants once a timezone has
 * enough learners in it. Spreading each learner by a stable hash of their id
 * flattens that spike without making delivery times drift between reschedules.
 */
export function jitterSeconds(userId: string, maxSeconds = 900): number {
  let h = 0;
  for (let i = 0; i < userId.length; i++) {
    h = (h * 31 + userId.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % maxSeconds;
}

/** Applies jitter to a planned due time. */
export function withJitter(due: Date, userId: string): Date {
  return new Date(due.getTime() + jitterSeconds(userId) * 1000);
}

/** Shared fact block, so every rule reports the same numbers. */
export function factsFrom(
  state: LearnerStateSnapshot,
  now: TeyLocalNow,
  weeklyGoal: number,
): TeyContext['facts'] {
  return {
    streakDays: state.streakDays,
    longestStreak: state.longestStreak,
    freezesAvailable: state.freezesAvailable,
    dailyGoalXp: state.dailyGoalXp,
    todayXp: state.todayXp,
    todayLessons: state.todayLessons,
    weeklyLessons: state.weeklyLessons,
    weeklyGoal,
    courseProgressPct: state.courseProgressPct,
    courseTitle: state.currentCourseTitle,
    hoursUntilLocalMidnight: (1440 - now.minutesOfDay) / 60,
    daysSinceLastActivity: state.daysSinceLastActivity,
  };
}
