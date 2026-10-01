/**
 * Step definitions — the flow, declared as data.
 *
 * This replaces the old `STEP_CONFIG` record plus the step-number `switch` in
 * `OnboardingShell.tsx`. The shell renders whatever this array says, which is
 * what makes the flow reorderable and testable.
 *
 * TOTAL_STEPS is derived from this array's length (currently 14 — the
 * pre-signup shape-matching challenge was removed from the flow: it added a
 * step without adding personalization value, and the reward it granted was
 * pre-signup-only plumbing worth simplifying away). `lib/pwa/entry.ts`'s
 * resume maths reads `TOTAL_STEPS` rather than a hardcoded number, so it
 * tracks this automatically.
 *
 * The completion screen is deliberately NOT a step: it lives at
 * /onboarding/complete, shows no progress bar, and is only reachable once
 * the final step has marked N/N.
 */

import type { StepId } from './dialogue/types';
import type { AnswerKey, OnboardingAnswersV2 } from './types';

export interface StepDefinition {
  id: StepId;
  /** 1-based position. Matches the URL: /onboarding/{number}. */
  number: number;
  answerKey?: AnswerKey;
  /** Optional steps render a Skip control and never block Continue. */
  optional?: boolean;
  /** Continue is disabled until this passes. Omit for steps with no input. */
  validate?: (answers: OnboardingAnswersV2) => boolean;
  /**
   * Answers that become meaningless when THIS step's answer changes.
   * Drives `invalidateDownstream` — switching Coding to AI must not leave
   * `web-development` attached to an AI learner.
   */
  invalidates?: AnswerKey[];
  /**
   * The step owns its full layout (its own header framing, its own CTA) and
   * the shell should render it bare — no shared mascot/dialogue slot. So far
   * only the sign-up screen needs this; path-reveal and review still want
   * Tey visible with his beat.
   */
  customLayout?: boolean;
  /**
   * How Tey is framed. `hero` = a big centred Tey with the speech bubble
   * above him (moments with no question to answer). Default `row` = Tey
   * beside a speech bubble, with the answers directly underneath — the
   * layout that keeps a long option list above the fold on a phone.
   */
  layout?: 'hero' | 'row';
  /** Cropped Tey art for this step. */
  mascot?: string;
}

/**
 * Tey art, pre-cropped to his opaque bounds (see `public/User onbarding
 * Assets/tey/`). The source files carry up to 70% empty canvas around Tey,
 * which `object-contain` faithfully preserved — so a generous mascot box
 * still rendered a small robot, and his apparent size jumped from step to
 * step. Cropped art fills its box, so the box size IS Tey's size.
 */
const TEY = '/User onbarding Assets/tey';

export const STEP_DEFINITIONS: StepDefinition[] = [
  {
    id: 'welcome',
    number: 1,
    layout: 'hero',
    mascot: `${TEY}/welcome.webp`,
  },
  {
    id: 'name',
    number: 2,
    answerKey: 'name',
    validate: (a) => isValidName(a.name),
    mascot: `${TEY}/thinking.webp`,
  },
  {
    id: 'category',
    number: 3,
    answerKey: 'category',
    validate: (a) => Boolean(a.category),
    // The big one: everything category-shaped downstream dies with it.
    invalidates: ['interests'],
    mascot: `${TEY}/pointing.webp`,
  },
  {
    id: 'goals',
    number: 4,
    answerKey: 'goals',
    validate: (a) => (a.goals?.length ?? 0) > 0,
    mascot: `${TEY}/searching.webp`,
  },
  {
    id: 'interests',
    number: 5,
    answerKey: 'interests',
    validate: (a) => (a.interests?.length ?? 0) > 0,
    mascot: `${TEY}/cheering.webp`,
  },
  {
    id: 'experience',
    number: 6,
    answerKey: 'experienceLevel',
    validate: (a) => Boolean(a.experienceLevel),
    // NOT Step_6_mascot.webp: that asset depicts a WhatsApp icon, left over
    // from the old flow's step 6 (WhatsApp verification), which no longer
    // exists in v2. Reusing the thinking pose here instead.
    mascot: `${TEY}/thinking.webp`,
  },
  {
    id: 'prior-attempt',
    number: 7,
    answerKey: 'priorAttempt',
    optional: true,
    mascot: `${TEY}/tablet.webp`,
  },
  {
    id: 'barriers',
    number: 8,
    answerKey: 'barriers',
    optional: true,
    // NOT Step_8_mascot_*: that asset shows a floating "Start" button next to
    // Tey, left over from the removed challenge's intro screen — easily
    // mistaken for a real tappable control here.
    mascot: `${TEY}/searching.webp`,
  },
  {
    id: 'commitment',
    number: 9,
    answerKey: 'dailyCommitment',
    validate: (a) => Boolean(a.dailyCommitment),
    mascot: `${TEY}/flame.webp`,
  },
  {
    id: 'preferred-time',
    number: 10,
    answerKey: 'preferredTime',
    validate: (a) => Boolean(a.preferredTime),
    mascot: `${TEY}/clock.webp`,
  },
  {
    id: 'path-reveal',
    number: 11,
    mascot: `${TEY}/badge.webp`,
  },
  {
    id: 'review',
    number: 12,
    mascot: `${TEY}/pointing.webp`,
  },
  {
    id: 'account',
    number: 13,
    customLayout: true,
    mascot: `${TEY}/waving.webp`,
  },
  {
    id: 'reminders',
    number: 14,
    answerKey: 'notifications',
    optional: true,
    mascot: `${TEY}/bell.webp`,
  },
];

export const TOTAL_ONBOARDING_STEPS = STEP_DEFINITIONS.length;

const BY_NUMBER = new Map(STEP_DEFINITIONS.map((s) => [s.number, s]));
const BY_ID = new Map(STEP_DEFINITIONS.map((s) => [s.id, s]));

export function stepByNumber(n: number): StepDefinition | undefined {
  return BY_NUMBER.get(n);
}

export function stepById(id: StepId): StepDefinition | undefined {
  return BY_ID.get(id);
}

/** Steps requiring an authenticated user; used to keep the account step ahead of them. */
export const AUTH_REQUIRED_FROM_STEP = 14;

// ─── Validation helpers ──────────────────────────────────────────────────────

export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 40;

/**
 * Permissive on purpose: this is a display name, not an identifier. We reject
 * empty/whitespace and absurd lengths, and nothing else — a learner's real
 * name can contain anything.
 */
export function isValidName(name: string | undefined): boolean {
  const trimmed = name?.trim() ?? '';
  return trimmed.length >= NAME_MIN_LENGTH && trimmed.length <= NAME_MAX_LENGTH;
}

/** Can Continue be pressed? Optional steps are always satisfiable. */
export function canAdvance(step: StepDefinition, answers: OnboardingAnswersV2): boolean {
  if (step.optional) return true;
  if (!step.validate) return true;
  return step.validate(answers);
}

/**
 * Every answer the flow requires before it may be called complete.
 * The backend mirrors this list — a client-set `onboardingComplete` flag is
 * not trusted on its own.
 */
export const REQUIRED_ANSWER_KEYS: AnswerKey[] = [
  'name',
  'category',
  'goals',
  'interests',
  'experienceLevel',
  'dailyCommitment',
  'preferredTime',
];

export function isOnboardingComplete(answers: OnboardingAnswersV2): boolean {
  return STEP_DEFINITIONS.every((step) => canAdvance(step, answers));
}
