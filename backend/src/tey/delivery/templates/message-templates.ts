import type {
  TeyContext,
  TeyReason,
  TeyTone,
} from '../../contracts/tey-context.types';

export interface RenderedMessage {
  title: string;
  body: string;
}

/**
 * Template copy for every reason Tey can act on.
 *
 * Templates come FIRST, always (spec section 26): zero cost, no latency, no
 * hallucination risk, and completely predictable. The AI layer exists for
 * situations where personalization genuinely adds something — not for "your
 * streak is at risk", which says the same true thing every time.
 *
 * Tey's voice (matches tey/ai/tey-personality.ts — templates and AI copy
 * should read as the same character): a mischievous, dramatic owl-like
 * companion, Duolingo-owl energy. Guilt-tripping the STREAK or the
 * UNFINISHED LESSON is the whole bit and is fully in bounds. Guilt-tripping
 * the LEARNER as a person never is.
 *
 * Every line states the actual fact in plain words FIRST — what's happening,
 * and what one action fixes it — before the personality beat. A lock-screen
 * reader who has never seen this app before should still understand what
 * happened and what to do. Simple, globally-readable English; no idioms, no
 * jargon that isn't defined by the sentence it's in.
 *
 * Push constraints: titles stay under ~45 characters and bodies under ~120, or
 * Android and iOS truncate mid-sentence. `truncate()` below is a hard backstop.
 */

type Variants = readonly ((f: TeyContext['facts']) => RenderedMessage)[];

/** "1 day" not "1 days" — every variant that counts streak days must use this. */
const dayWord = (n: number) => (n === 1 ? 'day' : 'days');

const streakAtRisk: Variants = [
  (f) => ({
    title: `Your ${f.streakDays}-${dayWord(f.streakDays)} streak needs today's lesson`,
    body: 'One lesson keeps it alive. That’s the whole ask.',
  }),
  (f) => ({
    title: `${f.streakDays} ${dayWord(f.streakDays)} — still no lesson today`,
    body: 'One lesson closes it out. I’ll be dramatic about it if I have to.',
  }),
  (f) => ({
    title: 'Your lesson is still waiting',
    body: `${f.streakDays}-${dayWord(f.streakDays)} streak on the line. One lesson saves it.`,
  }),
  (f) => ({
    title: `Don’t let ${f.streakDays} ${dayWord(f.streakDays)} slip away`,
    body: 'One lesson, a few minutes. Future you says thanks.',
  }),
];

/** Escalated tone — used only after repeated ignored nudges. Full guilt-trip
 *  energy, aimed at the streak, never at the learner — but still states the
 *  fact first, so the joke lands instead of reading as a random ping. */
const streakAtRiskTeasing: Variants = [
  (f) => ({
    title: 'Still waiting on today’s lesson',
    body: `Your ${f.streakDays}-${dayWord(f.streakDays)} streak is still going — for now. I’m just going to sit here until you do it.`,
  }),
  (f) => ({
    title: 'Oh, we’re ignoring me now?',
    body: `Fine. Your ${f.streakDays}-${dayWord(f.streakDays)} streak is still waiting on one lesson.`,
  }),
  (f) => ({
    title: 'I’m not mad. I’m disappointed.',
    body: `Okay, a little mad. ${f.streakDays} ${dayWord(f.streakDays)}, still no lesson today.`,
  }),
  (f) => ({
    title: `${f.streakDays} ${dayWord(f.streakDays)}, and I’m talking to a wall`,
    body: 'One lesson ends this. I’ll just sit here sulking until then.',
  }),
];

const streakCritical: Variants = [
  (f) => ({
    title: `${f.streakDays} ${dayWord(f.streakDays)} — ${Math.max(1, Math.round(f.hoursUntilLocalMidnight))}h left tonight`,
    body: 'Your streak ends at midnight unless you finish one lesson. I’ll wait right here.',
  }),
  (f) => ({
    title: 'Your streak runs out at midnight',
    body: `${f.streakDays} ${dayWord(f.streakDays)}, about ${Math.max(1, Math.round(f.hoursUntilLocalMidnight))}h left. One lesson keeps it.`,
  }),
  (f) => ({
    title: 'Last call tonight',
    body: `Your ${f.streakDays}-${dayWord(f.streakDays)} streak needs one lesson before midnight. I mean it.`,
  }),
];

const dailyGoal: Variants = [
  (f) => ({
    title: 'Quick reminder from Tey',
    body: f.courseTitle
      ? `You haven’t studied ${f.courseTitle} today yet. One lesson closes it out.`
      : 'You haven’t done today’s lesson yet. One lesson closes it out.',
  }),
  (f) => ({
    title: `${Math.max(0, f.dailyGoalXp - f.todayXp)} XP left for today`,
    body: 'One lesson usually covers it.',
  }),
  (f) => ({
    title: 'Got a minute?',
    body: f.courseTitle
      ? `${f.courseTitle} is right where you left it.`
      : 'Today’s lesson is right where you left it.',
  }),
];

const inactiveReturn: Variants = [
  (f) => ({
    title: 'Well look who it is 👀',
    body: f.courseTitle
      ? `${f.courseTitle} missed you. So did I, honestly.`
      : 'Good to see you again. No lecture, promise.',
  }),
  (f) => ({
    title: 'Still here whenever you are',
    body: f.courseTitle
      ? `${f.courseTitle} is ${f.courseProgressPct}% done. Pick it back up whenever.`
      : 'Everything is exactly where you left it.',
  }),
  (f) => ({
    title: 'Long time no learn',
    body: f.courseTitle
      ? `Even one lesson in ${f.courseTitle} counts.`
      : 'Even one lesson counts. Small steps.',
  }),
];

/** A streak that has already ended — acknowledged once, warmly, with no
 *  guilt trip. There's nothing left to protect, so the tone stays gentle. */
const streakLost: Variants = [
  (f) => ({
    title: 'Your streak reset today',
    body:
      f.longestStreak > 0
        ? `You've hit ${f.longestStreak} ${dayWord(f.longestStreak)} before — let's start building toward that again.`
        : 'No big deal. One lesson starts a new one.',
  }),
  () => ({
    title: 'New streak, who’s this?',
    body: 'The last one ended, so let’s just start another. One lesson today.',
  }),
  (f) => ({
    title: 'Okay, streak’s gone. Moving on.',
    body: f.courseTitle
      ? `${f.courseTitle} is still right there. One lesson gets a new streak going.`
      : 'One lesson today and we’re back in business.',
  }),
];

/** A lesson opened and left mid-way. Names the specific situation rather than
 *  reading as a generic daily nudge. */
const lessonAbandoned: Variants = [
  (f) => ({
    title: 'You left a lesson mid-way',
    body: f.courseTitle
      ? `Pick up where you stopped in ${f.courseTitle}?`
      : 'Pick up where you stopped?',
  }),
  () => ({
    title: 'That lesson is still open',
    body: 'Finish it now while it’s fresh — should only take a minute.',
  }),
];

/** Course is mostly done and today's lesson isn't finished yet. Names the
 *  actual progress rather than a generic "come back". */
const courseNearCompletion: Variants = [
  (f) => ({
    title: f.courseTitle
      ? `${f.courseTitle}: ${f.courseProgressPct}% done`
      : 'Almost done with this course',
    body: 'You’re close to the finish line. One more lesson gets you closer.',
  }),
  (f) => ({
    title: 'The finish line is close',
    body: f.courseTitle
      ? `${f.courseTitle} is ${f.courseProgressPct}% done. Don’t stop now.`
      : 'This course is almost done. Don’t stop now.',
  }),
];

const milestone: Variants = [
  (f) => ({
    title: `${f.streakDays} ${dayWord(f.streakDays)}?! Okay, wow.`,
    body: 'That’s not luck. That’s a habit now.',
  }),
  (f) => ({
    title: 'Look at that streak 🔥',
    body: `${f.streakDays} ${dayWord(f.streakDays)}. Genuinely impressive.`,
  }),
];

/** A strong week — different signal from a streak milestone, so it earns its
 *  own copy rather than reusing the streak-count framing. */
const progressCelebration: Variants = [
  (f) => ({
    title: 'This was a strong week',
    body: `${f.weeklyLessons} lessons done. Keep this pace and next week’s even better.`,
  }),
  (f) => ({
    title: 'You showed up this week',
    body: `${f.weeklyLessons} lessons, real progress. I noticed.`,
  }),
];

const TEMPLATES: Record<TeyReason, Variants> = {
  STREAK_AT_RISK: streakAtRisk,
  STREAK_CRITICAL: streakCritical,
  DAILY_GOAL_INCOMPLETE: dailyGoal,
  INACTIVE_RETURN: inactiveReturn,
  MILESTONE: milestone,
  STREAK_LOST: streakLost,
  LESSON_ABANDONED: lessonAbandoned,
  COURSE_NEAR_COMPLETION: courseNearCompletion,
  PROGRESS_CELEBRATION: progressCelebration,
};

const TEASING_OVERRIDES: Partial<Record<TeyReason, Variants>> = {
  STREAK_AT_RISK: streakAtRiskTeasing,
};

/**
 * Picks a variant deterministically from the learner and the day, so repeat
 * reminders do not read identically two evenings running — but the same
 * learner on the same day always gets the same copy, which keeps a retry
 * idempotent and makes the dry-run ledger reproducible.
 */
function pickIndex(userId: string, localDate: string, count: number): number {
  const key = `${userId}:${localDate}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return Math.abs(h) % count;
}

const isTeasing = (tone: TeyTone) => tone === 'PLAYFUL_PASSIVE_AGGRESSIVE';

export function renderTemplate(
  ctx: TeyContext,
  userId: string,
  localDate: string,
): RenderedMessage {
  const variants =
    (isTeasing(ctx.tone) ? TEASING_OVERRIDES[ctx.reason] : undefined) ??
    TEMPLATES[ctx.reason] ??
    dailyGoal;

  const variant = variants[pickIndex(userId, localDate, variants.length)];
  const message = variant(ctx.facts);

  // Belt-and-braces truncation: a course title long enough to blow the budget
  // would otherwise be cut mid-word by the OS.
  return {
    title: truncate(message.title, 60),
    body: truncate(message.body, 140),
  };
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

/** Notification tag — collapses repeats of the same reason on the device. */
export function tagFor(reason: TeyReason): string {
  return `tey-${reason}`;
}

/** In-app inbox type, prefixed so the bell can group or filter Tey rows. */
export function inboxTypeFor(reason: TeyReason): string {
  return `TEY_${reason}`;
}
