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
 * situations where personalization genuinely adds something — a conversation,
 * a nuanced case — not for "your streak is at risk", which says the same true
 * thing every time.
 *
 * Tey's voice: playful, observant, encouraging, mischievous, slightly
 * passive-aggressive. Never insulting, shaming, threatening, or humiliating —
 * that boundary is not a style preference, it is the product's character, and
 * a learner who feels bullied by a mascot uninstalls the app.
 *
 * Push constraints: titles stay under ~45 characters and bodies under ~120, or
 * Android and iOS truncate mid-sentence.
 */

type Variants = readonly ((f: TeyContext['facts']) => RenderedMessage)[];

const streakAtRisk: Variants = [
  (f) => ({
    title: `Your ${f.streakDays}-day streak is waiting 👀`,
    body: 'One lesson keeps it alive. That is genuinely all it takes.',
  }),
  (f) => ({
    title: `${f.streakDays} days. Still counting?`,
    body: 'A few minutes now and today is in the bag.',
  }),
  (f) => ({
    title: 'Tey is watching the clock 🕗',
    body: `${f.streakDays} days of work, and the evening is going somewhere.`,
  }),
];

/** Escalated tone — used only after repeated ignored nudges. Teasing, never mean. */
const streakAtRiskTeasing: Variants = [
  (f) => ({
    title: 'Not that I am counting… 👀',
    body: `Okay, I am. It is ${f.streakDays} days, and today is still empty.`,
  }),
  (f) => ({
    title: `${f.streakDays} days, zero lessons today`,
    body: 'No pressure. Just leaving this here. Again.',
  }),
];

const streakCritical: Variants = [
  (f) => ({
    title: `Last call for your ${f.streakDays}-day streak`,
    body: 'The day ends soon. One lesson and it survives.',
  }),
  (f) => ({
    title: 'This is the part where we panic 😬',
    body: `${f.streakDays} days on the line and about ${Math.max(1, Math.round(f.hoursUntilLocalMidnight))}h left.`,
  }),
];

const dailyGoal: Variants = [
  (f) => ({
    title: 'Fancy a quick lesson?',
    body: f.courseTitle
      ? `${f.courseTitle} is right where you left it.`
      : 'Pick up where you left off — it will not take long.',
  }),
  (f) => ({
    title: `${f.dailyGoalXp} XP away from today's goal`,
    body: 'One lesson usually covers it.',
  }),
];

const inactiveReturn: Variants = [
  (f) => ({
    title: 'Still here whenever you are 👋',
    body: f.courseTitle
      ? `${f.courseTitle} is ${f.courseProgressPct}% done. No rush.`
      : 'Your course is exactly where you left it. No rush.',
  }),
  (f) => ({
    title: 'Long time no learn',
    body: f.courseTitle
      ? `Want to pick ${f.courseTitle} back up? Even one lesson counts.`
      : 'Want to pick things back up? Even one lesson counts.',
  }),
];

const milestone: Variants = [
  (f) => ({
    title: `${f.streakDays} days. Look at you 🎉`,
    body: 'That is a real habit now. Genuinely well done.',
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
