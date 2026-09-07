/**
 * Tey's voice for the Learning Intelligence (analytics) page. Follows the
 * same pattern as `streakVoice.ts`: typed mode per section, pooled lines so
 * the same line never repeats back-to-back (via `pickFromPool`), and every
 * line built from real numbers the backend already computed — never a
 * generic "keep going!". The backend (`learner-analytics` module) only ever
 * returns state + numbers; this file is the only place that turns them into
 * copy, so business logic never leaks into a component.
 */

import { pickFromPool } from './pool';

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export type HeroState = 'new' | 'inactive' | 'improving' | 'active';

export interface HeroContext {
  daysSinceLastActive?: number | null;
  streakDays?: number;
  monthDaysActive?: number;
}

const HERO_NEW = [
  'Your learning story starts here 🚀',
  "We're still getting to know each other 👀",
  "Give me a few lessons and I'll start figuring out your style.",
];

function heroInactive(days: number): string[] {
  return [
    `Well... where did you go? 👀 You haven't learned in ${days} day${days === 1 ? '' : 's'}.`,
    'Your course is starting to wonder if you moved on.',
    `${days} day${days === 1 ? '' : 's'} without learning? Bold strategy.`,
  ];
}

const HERO_IMPROVING = [
  "You're picking up speed 🚀 More consistent than last week.",
  'Okay, okay... you are actually cooking. 🔥',
  "You're improving. I'm impressed. Don't let it get to your head though.",
];

function heroActive(streakDays: number, monthDaysActive: number): string[] {
  return [
    `You're building something impressive 🔥 ${monthDaysActive} days this month, ${streakDays}-day streak going.`,
    `${streakDays} days in a row? Who are you and what did you do with the old you? 😏`,
    "You're on a roll. Keep this energy.",
  ];
}

export function pickHeroLine(state: HeroState, ctx: HeroContext): string {
  if (state === 'new') return pickFromPool(HERO_NEW, 'analytics:hero:new');
  if (state === 'inactive') return pickFromPool(heroInactive(ctx.daysSinceLastActive ?? 3), 'analytics:hero:inactive');
  if (state === 'improving') return pickFromPool(HERO_IMPROVING, 'analytics:hero:improving');
  return pickFromPool(heroActive(ctx.streakDays ?? 0, ctx.monthDaysActive ?? 0), 'analytics:hero:active');
}

// ---------------------------------------------------------------------------
// Momentum
// ---------------------------------------------------------------------------

export type MomentumState = 'rising' | 'strong' | 'steady' | 'slowing' | 'stalled';

const MOMENTUM_LINES: Record<MomentumState, string[]> = {
  rising: ["Your momentum is rising 🚀 You're learning more often than last week."],
  strong: ["You're on a roll 🔥 Consistently active lately."],
  steady: ['Nice and steady ➡️ Keep this pace going.'],
  slowing: ['Your momentum is slipping 👀 Activity has dropped compared to last week.'],
  stalled: ['Your momentum needs CPR. 😐 One lesson is enough to restart it.'],
};

export function pickMomentumLine(state: MomentumState): string {
  return pickFromPool(MOMENTUM_LINES[state], `analytics:momentum:${state}`);
}

// ---------------------------------------------------------------------------
// Learning DNA
// ---------------------------------------------------------------------------

export type LearningDnaArchetype =
  | 'consistent_learner'
  | 'sprinter'
  | 'night_learner'
  | 'weekend_warrior'
  | 'steady_builder'
  | 'fast_climber'
  | 'insufficient_data';

const DNA_LABELS: Record<Exclude<LearningDnaArchetype, 'insufficient_data'>, { label: string; blurb: string }> = {
  consistent_learner: { label: 'The Consistent Learner', blurb: 'You show up regularly, and it shows.' },
  sprinter: { label: 'The Sprinter', blurb: 'Big, intensive sessions when you dive in.' },
  night_learner: { label: 'The Night Learner', blurb: 'Most of your lessons happen after dark.' },
  weekend_warrior: { label: 'The Weekend Warrior', blurb: 'Weekends are when you really lock in.' },
  steady_builder: { label: 'The Steady Builder', blurb: 'Slower pace, but it never really stops.' },
  fast_climber: { label: 'The Fast Climber', blurb: "You're accelerating — recent weeks beat the ones before." },
};

export function getLearningDnaCopy(archetype: LearningDnaArchetype): { label: string; blurb: string } {
  if (archetype === 'insufficient_data') {
    return {
      label: 'Still figuring you out',
      blurb: "Complete a few more learning sessions and I'll have something interesting to tell you.",
    };
  }
  return DNA_LABELS[archetype];
}

// ---------------------------------------------------------------------------
// Insights ("What Tey Notices")
// ---------------------------------------------------------------------------

export type InsightId = 'consistency' | 'day_of_week_preference' | 'improvement_trend' | 'skill_neglect';

export function formatInsightLine(id: InsightId, data: Record<string, string | number>): string {
  switch (id) {
    case 'consistency':
      return `You learn better when you're consistent — ${data.streakDays} days straight and counting.`;
    case 'day_of_week_preference':
      return `${data.day} is apparently your thing. You've completed more lessons on ${data.day}s than any other day.`;
    case 'improvement_trend':
      return `You're improving fast 🚀 Your average lesson score went from ${data.fromPct}% to ${data.toPct}%.`;
    case 'skill_neglect':
      return `You've been avoiding ${data.courseTitle} for ${data.idleDays} days. I'm not judging. Okay, maybe a little. 😏`;
    default:
      return '';
  }
}

// ---------------------------------------------------------------------------
// Next Best Move
// ---------------------------------------------------------------------------

export type NextBestMoveAction =
  | 'protect_streak'
  | 'resume_after_break'
  | 'finish_course'
  | 'practice_weak_area'
  | 'beat_record'
  | 'keep_momentum'
  | 'start_learning';

export function getNextBestMoveCopy(
  action: NextBestMoveAction,
  data: Record<string, string | number>,
): { headline: string; detail: string; cta: string } {
  switch (action) {
    case 'protect_streak':
      return {
        headline: 'Keep the fire alive 🔥',
        detail: `Complete one lesson today to protect your ${data.streakDays}-day streak.`,
        cta: 'Continue Learning',
      };
    case 'resume_after_break':
      return {
        headline: "Let's restart 👀",
        detail: `${data.daysSinceLastActive} days quiet. One lesson today is enough to get moving again.`,
        cta: 'Start Learning',
      };
    case 'finish_course':
      return {
        headline: "You're almost there 🚀",
        detail: `${data.courseTitle ?? 'This course'} is ${data.progressPercentage}% done. Let's finish it.`,
        cta: 'Finish Course',
      };
    case 'practice_weak_area':
      return {
        headline: 'Give this another shot 🎯',
        detail: `${data.courseTitle ?? 'This skill'} could use some attention.`,
        cta: 'Practice Now',
      };
    case 'beat_record':
      return {
        headline: "You're close to beating yourself 😏",
        detail: 'One more lesson beats your personal best day.',
        cta: 'Keep Going',
      };
    case 'keep_momentum':
      return {
        headline: "Don't stop now 🔥",
        detail: "You're on a roll — one more lesson keeps it going.",
        cta: 'Continue Learning',
      };
    case 'start_learning':
    default:
      return {
        headline: 'Your learning story starts here 🚀',
        detail: "Complete your first lesson and I'll start tracking your progress.",
        cta: 'Start Learning',
      };
  }
}

// ---------------------------------------------------------------------------
// Small empty states specific to this page
// ---------------------------------------------------------------------------

export function pickRecordsEmptyLine(): string {
  return pickFromPool(['Your records are waiting to be broken. 👀', 'No records yet — set the first one today.'], 'analytics:records:empty');
}

export function pickImprovementInsufficientLine(): string {
  return pickFromPool(
    ["Keep learning and I'll start tracking how you're improving.", 'A few more scored lessons and this fills in.'],
    'analytics:improvement:empty',
  );
}

export function pickSkillMapEmptyLine(): string {
  return pickFromPool(['Start a course and your skills will show up here.', 'Nothing to map yet — enroll in something and let\'s go.'], 'analytics:skillmap:empty');
}
