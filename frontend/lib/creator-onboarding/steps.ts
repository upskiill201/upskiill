/**
 * Creator onboarding — the flow, declared as data (mirrors the learner's
 * lib/onboarding/steps.ts). The shell renders whatever this array says.
 *
 *   1 welcome      6 experience   11 plan (reveal)
 *   2 name         7 audience     12 account (sign up / open studio)
 *   3 type         8 existing     13 profile (username, headline, photo)
 *   4 track        9 goal         14 ready
 *   5 topics      10 time
 *
 * Profile comes after the account on purpose: the username check and the
 * photo upload need a session, so no public endpoints are needed for them.
 */

import type { CreatorAnswers } from './catalog';

export type CreatorStepId =
  | 'welcome'
  | 'name'
  | 'type'
  | 'track'
  | 'topics'
  | 'experience'
  | 'audience'
  | 'existing'
  | 'goal'
  | 'time'
  | 'plan'
  | 'account'
  | 'profile'
  | 'ready';

export interface CreatorStepDefinition {
  id: CreatorStepId;
  /** 1-based; matches /creator/onboarding/{number}. */
  number: number;
  answerKey?: keyof CreatorAnswers;
  validate?: (a: CreatorAnswers) => boolean;
  /** Answers that stop making sense when this one changes. */
  invalidates?: (keyof CreatorAnswers)[];
  layout?: 'hero' | 'row';
  /** The screen owns its CTA and framing (no shared footer). */
  ownsCta?: boolean;
  mascot: string;
}

const TEY = '/User onbarding Assets/tey';

export const NAME_MAX_LENGTH = 40;

export function isValidName(name: string | undefined): boolean {
  const trimmed = (name ?? '').trim();
  return trimmed.length >= 1 && trimmed.length <= NAME_MAX_LENGTH;
}

export const CREATOR_STEPS: CreatorStepDefinition[] = [
  { id: 'welcome', number: 1, layout: 'hero', mascot: `${TEY}/tablet.webp` },
  {
    id: 'name',
    number: 2,
    answerKey: 'name',
    validate: (a) => isValidName(a.name),
    mascot: `${TEY}/waving.webp`,
  },
  {
    id: 'type',
    number: 3,
    answerKey: 'creatorType',
    validate: (a) => Boolean(a.creatorType),
    mascot: `${TEY}/thinking.webp`,
  },
  {
    id: 'track',
    number: 4,
    answerKey: 'track',
    validate: (a) => Boolean(a.track),
    invalidates: ['topics'],
    mascot: `${TEY}/pointing.webp`,
  },
  {
    id: 'topics',
    number: 5,
    answerKey: 'topics',
    validate: (a) => (a.topics?.length ?? 0) > 0,
    mascot: `${TEY}/searching.webp`,
  },
  {
    id: 'experience',
    number: 6,
    answerKey: 'experience',
    validate: (a) => Boolean(a.experience),
    mascot: `${TEY}/thinking.webp`,
  },
  {
    id: 'audience',
    number: 7,
    answerKey: 'audience',
    validate: (a) => Boolean(a.audience),
    mascot: `${TEY}/podium.webp`,
  },
  {
    id: 'existing',
    number: 8,
    answerKey: 'existing',
    validate: (a) => (a.existing?.length ?? 0) > 0,
    mascot: `${TEY}/tablet.webp`,
  },
  {
    id: 'goal',
    number: 9,
    answerKey: 'goal',
    validate: (a) => Boolean(a.goal),
    mascot: `${TEY}/badge.webp`,
  },
  {
    id: 'time',
    number: 10,
    answerKey: 'weeklyHours',
    validate: (a) => Boolean(a.weeklyHours),
    mascot: `${TEY}/clock.webp`,
  },
  { id: 'plan', number: 11, mascot: `${TEY}/cheering.webp` },
  { id: 'account', number: 12, ownsCta: true, mascot: `${TEY}/welcome.webp` },
  { id: 'profile', number: 13, ownsCta: true, mascot: `${TEY}/pointing.webp` },
  { id: 'ready', number: 14, ownsCta: true, mascot: `${TEY}/cheering.webp` },
];

export const TOTAL_CREATOR_STEPS = CREATOR_STEPS.length;
export const ACCOUNT_STEP = 12;
export const PROFILE_STEP = 13;
export const READY_STEP = 14;

export function creatorStepByNumber(n: number): CreatorStepDefinition | undefined {
  return CREATOR_STEPS.find((s) => s.number === n);
}

export function canAdvanceCreator(step: CreatorStepDefinition, answers: CreatorAnswers): boolean {
  return step.validate ? step.validate(answers) : true;
}

/** The first question step still missing an answer, or null when all are in. */
export function firstUnansweredStep(answers: CreatorAnswers): number | null {
  for (const step of CREATOR_STEPS) {
    if (step.number >= ACCOUNT_STEP) break;
    if (step.validate && !step.validate(answers)) return step.number;
  }
  return null;
}

/** Progress for the bar: questions count, the finale screens top it off. */
export function creatorProgress(step: number): number {
  return Math.round(((step - 1) / (TOTAL_CREATOR_STEPS - 1)) * 100);
}
