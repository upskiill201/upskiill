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
 * Tey's voice: a mischievous, dramatic owl-like companion — the Duolingo owl
 * archetype. Short, simple, instantly readable on a lock screen. Guilt-tripping
 * the STREAK or the UNFINISHED LESSON is the whole bit and is fully in bounds
 * ("I'm just going to sit here"). Guilt-tripping the LEARNER as a person — their
 * character, their worth, their intelligence — never is, and that line doesn't
 * move. See tey-personality.ts for the same rule, spelled out for the AI path.
 *
 * Push constraints: titles stay under ~45 characters and bodies under ~120, or
 * Android and iOS truncate mid-sentence. `truncate()` below is a hard backstop.
 */

type Variants = readonly ((f: TeyContext['facts']) => RenderedMessage)[];

const streakAtRisk: Variants = [
  (f) => ({
    title: `Your ${f.streakDays}-day streak is dying 💀`,
    body: 'One lesson saves it. That is the whole ask.',
  }),
  (f) => ({
    title: `${f.streakDays} days. About to be zero.`,
    body: 'Dramatic? Maybe. Accurate? Also yes.',
  }),
  (f) => ({
    title: "I'm just going to sit here",
    body: `Staring at your unfinished lesson. ${f.streakDays} days on the line.`,
  }),
  (f) => ({
    title: `Don't let ${f.streakDays} days go to waste`,
    body: 'One lesson. A few minutes. Future you says thanks.',
  }),
];

/** Escalated tone — used only after repeated ignored nudges. Full guilt-trip
 *  energy, aimed at the streak, never at the learner. */
const streakAtRiskTeasing: Variants = [
  (f) => ({
    title: 'Oh, we\'re ignoring me now?',
    body: `Cool. Your ${f.streakDays}-day streak is still dying though.`,
  }),
  (f) => ({
    title: "I'm not mad. I'm disappointed.",
    body: `Ok, a little mad. ${f.streakDays} days, still no lesson today.`,
  }),
  () => ({
    title: 'Still here. Still waiting.',
    body: 'I have nowhere else to be, apparently. Just saying.',
  }),
  (f) => ({
    title: `${f.streakDays} days, and I'm talking to a wall`,
    body: "Fine. I'll just sit here. Sulking. It's fine.",
  }),
];

const streakCritical: Variants = [
  (f) => ({
    title: `🚨 ${f.streakDays} days. ${Math.max(1, Math.round(f.hoursUntilLocalMidnight))}h left. GO.`,
    body: 'This is not a drill. One lesson, right now.',
  }),
  (f) => ({
    title: 'Your streak is about to flatline',
    body: `${f.streakDays} days, about ${Math.max(1, Math.round(f.hoursUntilLocalMidnight))}h left. One lesson.`,
  }),
  (f) => ({
    title: 'Last call. Seriously.',
    body: `${f.streakDays}-day streak. Don't make me watch this happen.`,
  }),
];

const dailyGoal: Variants = [
  (f) => ({
    title: 'Got a sec?',
    body: f.courseTitle
      ? `${f.courseTitle} is right where you left it.`
      : 'Quick lesson? Barely takes any time.',
  }),
  (f) => ({
    title: `${f.dailyGoalXp} XP left today`,
    body: 'One lesson usually covers it.',
  }),
  () => ({
    title: 'Tiny nudge 👋',
    body: "Today's goal is still open. No rush, just a reminder.",
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
      ? `${f.courseTitle} is ${f.courseProgressPct}% done. No rush.`
      : 'Everything is exactly where you left it.',
  }),
  (f) => ({
    title: 'Long time no learn',
    body: f.courseTitle
      ? `Even one lesson in ${f.courseTitle} counts.`
      : 'Even one lesson counts. Small steps.',
  }),
];

const milestone: Variants = [
  (f) => ({
    title: `${f.streakDays} days?! Okay, wow.`,
    body: 'That is not luck. That is a habit now.',
  }),
  (f) => ({
    title: 'Look at that streak 🔥',
    body: `${f.streakDays} days. Genuinely impressive.`,
  }),
];

const TEMPLATES: Record<TeyReason, Variants> = {
  STREAK_AT_RISK: streakAtRisk,
  STREAK_CRITICAL: streakCritical,
  DAILY_GOAL_INCOMPLETE: dailyGoal,
  INACTIVE_RETURN: inactiveReturn,
  MILESTONE: milestone,
  // Reasons whose rules ship later still need a safe fallback if one fires.
  STREAK_LOST: inactiveReturn,
  LESSON_ABANDONED: dailyGoal,
  COURSE_NEAR_COMPLETION: dailyGoal,
  PROGRESS_CELEBRATION: milestone,
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
