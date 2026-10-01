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

type Facts = TeyContext['facts'];
type Variants = readonly ((f: Facts) => RenderedMessage)[];

/** "1 day" not "1 days" — every variant that counts days must use this. */
const dayWord = (n: number) => (n === 1 ? 'day' : 'days');
const hoursLeft = (f: Facts) => Math.max(1, Math.round(f.hoursUntilLocalMidnight));
const inCourse = (f: Facts, fallback: string) =>
  f.courseTitle ? `${f.courseTitle}` : fallback;

// ── The day's first rung: the practice reminder at the chosen time ─────────

const dailyGoal: Variants = [
  (f) => ({
    title: 'Time for today’s lesson',
    body: f.courseTitle
      ? `${f.courseTitle} is ready when you are. Five minutes is all it takes.`
      : 'Your lesson is ready when you are. Five minutes is all it takes.',
  }),
  (f) => ({
    title:
      f.streakDays > 0
        ? `Day ${f.streakDays + 1} starts with one lesson`
        : 'Quick lesson? I’ll keep it short.',
    body: `One lesson in ${inCourse(f, 'your course')} and today counts.`,
  }),
  (f) => ({
    title: 'Hi, it’s Tey 👋',
    body: `This is your reminder to learn something today. ${inCourse(f, 'Your lesson')} is waiting.`,
  }),
  (f) => ({
    title: `${Math.max(1, f.dailyGoalXp - f.todayXp)} XP to hit today’s goal`,
    body: 'One lesson usually covers it. You know what to do.',
  }),
];

// ── The evening rung: streak saver ─────────────────────────────────────────

const streakAtRisk: Variants = [
  (f) => ({
    title: `Your ${f.streakDays}-${dayWord(f.streakDays)} streak needs you`,
    body: 'No lesson today yet. One lesson keeps it alive — that’s the whole ask.',
  }),
  (f) => ({
    title: 'Your streak is in danger',
    body: `${f.streakDays} ${dayWord(f.streakDays)} on the line and no lesson today. One lesson saves it.`,
  }),
  (f) => ({
    title: `Don’t let ${f.streakDays} ${dayWord(f.streakDays)} slip away`,
    body: 'A few minutes tonight keeps the streak going. Future you says thanks.',
  }),
  (f) =>
    f.streakDays >= 30
      ? {
          title: `${f.streakDays} days. Don’t you dare.`,
          body: 'That streak is a monument. One lesson tonight keeps it standing.',
        }
      : {
          title: 'Your lesson is still waiting',
          body: `Your ${f.streakDays}-${dayWord(f.streakDays)} streak needs one lesson before midnight.`,
        },
];

/** Escalated tone — used only after repeated ignored nudges. Full guilt-trip
 *  energy, aimed at the streak, never at the learner — but still states the
 *  fact first, so the joke lands instead of reading as a random ping. */
const streakAtRiskTeasing: Variants = [
  (f) => ({
    title: 'Still waiting on today’s lesson',
    body: `Your ${f.streakDays}-${dayWord(f.streakDays)} streak is alive — for now. I’ll just sit here until you do it.`,
  }),
  (f) => ({
    title: 'Oh, we’re ignoring me now?',
    body: `Fine. Your ${f.streakDays}-${dayWord(f.streakDays)} streak is still waiting on one lesson.`,
  }),
  (f) => ({
    title: 'I’m not mad. I’m disappointed.',
    body: `Okay, a little mad. ${f.streakDays} ${dayWord(f.streakDays)}, and no lesson today.`,
  }),
  (f) => ({
    title: `${f.streakDays} ${dayWord(f.streakDays)}, and I’m talking to a wall`,
    body: 'One lesson ends this. I’ll be sulking right here until then.',
  }),
];

// ── Last call ──────────────────────────────────────────────────────────────

const streakCritical: Variants = [
  (f) => ({
    title: `${hoursLeft(f)}h left to save your streak`,
    body: `Your ${f.streakDays}-${dayWord(f.streakDays)} streak ends at midnight. One lesson. I’ll wait right here.`,
  }),
  (f) => ({
    title: 'Your streak ends at midnight',
    body: `${f.streakDays} ${dayWord(f.streakDays)}, about ${hoursLeft(f)}h left. One lesson keeps it.`,
  }),
  (f) => ({
    title: 'Last call 🔥',
    body: `Your ${f.streakDays}-${dayWord(f.streakDays)} streak needs one lesson before midnight. I mean it.`,
  }),
];

// ── The loss, and the way back ─────────────────────────────────────────────

/** A streak that just ended. With a repair open, that offer IS the message. */
const streakLostRepairable: Variants = [
  (f) => ({
    title: `Your ${f.repairLostStreak}-${dayWord(f.repairLostStreak ?? 0)} streak ended`,
    body: `You can still repair it for ${f.repairCostCoins} Coins — but only for ${f.repairHoursLeft ?? 48} more hours.`,
  }),
  (f) => ({
    title: 'Your streak broke. It’s fixable.',
    body: `Repair your ${f.repairLostStreak}-${dayWord(f.repairLostStreak ?? 0)} streak on the streak screen before the offer runs out.`,
  }),
];

/** Acknowledged once, warmly, with no guilt trip — nothing left to protect. */
const streakLost: Variants = [
  (f) => ({
    title: 'Your streak reset',
    body:
      f.longestStreak > 1
        ? `Your best was ${f.longestStreak} ${dayWord(f.longestStreak)}. Let’s start building toward it again — one lesson today.`
        : 'No big deal. One lesson today starts a new one.',
  }),
  () => ({
    title: 'New streak, who’s this?',
    body: 'The old one ended, so let’s start another. Day one is one lesson away.',
  }),
  (f) => ({
    title: 'Okay, the streak’s gone. Moving on.',
    body: f.courseTitle
      ? `${f.courseTitle} is right there. One lesson gets a new streak going.`
      : 'One lesson today and we’re back in business.',
  }),
];

const streakRepairExpiring: Variants = [
  (f) => ({
    title: 'Last chance to repair your streak',
    body: `Your ${f.repairLostStreak}-${dayWord(f.repairLostStreak ?? 0)} streak can come back for ${f.repairCostCoins} Coins. The offer ends in ${f.repairHoursLeft ?? 1}h.`,
  }),
  (f) => ({
    title: `${f.repairLostStreak} ${dayWord(f.repairLostStreak ?? 0)}, gone forever in ${f.repairHoursLeft ?? 1}h`,
    body: `Unless you repair it for ${f.repairCostCoins} Coins on the streak screen. I’m just saying.`,
  }),
];

// ── Before the first lesson ────────────────────────────────────────────────

const firstLesson: Variants = [
  (f) => ({
    title: 'Your first lesson is waiting',
    body: f.courseTitle
      ? `${f.courseTitle} starts with a 5-minute lesson. Let’s do the first one together.`
      : 'It takes about five minutes. Let’s do the first one together.',
  }),
  () => ({
    title: 'Hi, I’m Tey 👋',
    body: 'I’ll be cheering you on. First step: one short lesson. That’s it.',
  }),
  () => ({
    title: 'Day one is the hardest',
    body: 'So let’s make it tiny. One lesson, five minutes, and you’ve started.',
  }),
];

// ── The win-back ladder, by how long they've been away ─────────────────────

/** Days 1-2: the habit is still warm, so a little drama is allowed. */
const inactiveEarly: Variants = [
  (f) => ({
    title:
      (f.daysSinceLastActivity ?? 1) <= 1
        ? 'You didn’t learn yesterday 👀'
        : `It’s been ${f.daysSinceLastActivity} days 👀`,
    body: `${inCourse(f, 'Your lesson')} is right where you left it. One lesson gets you back on track.`,
  }),
  () => ({
    title: 'These reminders are from Tey',
    body: 'You know, the owl you’ve been ignoring. One lesson today makes it right.',
  }),
  (f) => ({
    title: 'Hey, it’s been a couple of days',
    body: f.courseTitle
      ? `${f.courseTitle} is ${f.courseProgressPct}% done. Let’s nudge that number today.`
      : 'A 5-minute lesson today and you’re back in rhythm.',
  }),
];

/** Days 3-21: warmth, never a guilt trip. */
const inactiveWarm: Variants = [
  (f) => ({
    title: 'Still here whenever you are',
    body: f.courseTitle
      ? `${f.courseTitle} is ${f.courseProgressPct}% done and waiting. Pick it back up anytime.`
      : 'Everything is exactly where you left it.',
  }),
  (f) => ({
    title: 'I saved your spot',
    body: f.courseTitle
      ? `${f.courseTitle} missed you. So did I, honestly.`
      : 'I saved your spot. No lecture, promise.',
  }),
  (f) => ({
    title: 'Long time no learn',
    body: `Even one lesson in ${inCourse(f, 'your course')} counts. Small steps.`,
  }),
];

/** Day 30: Duolingo's most famous line, because it's honest. */
const inactiveFinal: Variants = [
  () => ({
    title: 'These reminders don’t seem to be working',
    body: 'So I’ll stop sending them for now. Your progress is saved whenever you want it.',
  }),
];

// ── Mid-lesson, progress and celebrations ──────────────────────────────────

/** A lesson opened and left mid-way. Names the specific situation rather than
 *  reading as a generic daily nudge. */
const lessonAbandoned: Variants = [
  (f) => ({
    title: 'You left a lesson mid-way',
    body: f.courseTitle
      ? `Pick up where you stopped in ${f.courseTitle}? It’ll only take a minute.`
      : 'Pick up where you stopped? It’ll only take a minute.',
  }),
  () => ({
    title: 'That lesson is still open',
    body: 'Finish it while it’s fresh. You were so close.',
  }),
];

/** Course is mostly done and today's lesson isn't finished yet. */
const courseNearCompletion: Variants = [
  (f) => ({
    title: f.courseTitle
      ? `${f.courseTitle}: ${f.courseProgressPct}% done`
      : 'Almost done with this course',
    body: 'You’re close to the finish line. One more lesson gets you closer.',
  }),
  (f) => ({
    title: 'The finish line is right there',
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
    body: `${f.streakDays} ${dayWord(f.streakDays)} in a row. I’m genuinely impressed.`,
  }),
];

/** A strong week — its own signal, so its own copy. */
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

/**
 * The pool for a reason. Most reasons have one; a few pick by the facts,
 * because "your streak broke" reads differently when it can still be fixed,
 * and day 1 away is a different conversation from day 30.
 */
const POOLS: Record<TeyReason, (f: Facts) => Variants> = {
  DAILY_GOAL_INCOMPLETE: () => dailyGoal,
  STREAK_AT_RISK: () => streakAtRisk,
  STREAK_CRITICAL: () => streakCritical,
  STREAK_LOST: (f) => ((f.repairLostStreak ?? 0) > 0 ? streakLostRepairable : streakLost),
  STREAK_REPAIR_EXPIRING: () => streakRepairExpiring,
  FIRST_LESSON: () => firstLesson,
  INACTIVE_RETURN: (f) => {
    const d = f.daysSinceLastActivity ?? 1;
    if (d >= 30) return inactiveFinal;
    return d <= 2 ? inactiveEarly : inactiveWarm;
  },
  LESSON_ABANDONED: () => lessonAbandoned,
  MILESTONE: () => milestone,
  COURSE_NEAR_COMPLETION: () => courseNearCompletion,
  PROGRESS_CELEBRATION: () => progressCelebration,
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
    POOLS[ctx.reason]?.(ctx.facts) ??
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
  // The streak rungs share one tag, so the 22:00 last call REPLACES the
  // 20:00 saver on the lock screen instead of stacking under it.
  if (reason === 'STREAK_AT_RISK' || reason === 'STREAK_CRITICAL' || reason === 'DAILY_GOAL_INCOMPLETE') {
    return 'tey-today';
  }
  return `tey-${reason}`;
}

/** In-app inbox type, prefixed so the bell can group or filter Tey rows. */
export function inboxTypeFor(reason: TeyReason): string {
  return `TEY_${reason}`;
}
