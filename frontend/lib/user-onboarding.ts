/**
 * Teyro Learner Onboarding — localStorage schema (v2)
 *
 * Single source of truth for reading/writing learner onboarding progress.
 * Storage key: 'teyro_onboarding'
 *
 * v2 changes:
 *  - `answers` is now a typed, named bag (`OnboardingAnswersV2`) instead of a
 *    `{ [stepNumber]: Record<string, unknown> }` blob. Renumbering a step no
 *    longer orphans its answer.
 *  - `schemaVersion` is stored, and a mismatch runs `migrateAnswers` on read.
 *    See `lib/onboarding/migrate.ts` for why v1 answers are discarded rather
 *    than guessed at.
 *
 * NOTE: the creator flow (`lib/onboarding.ts`) used to share this exact key
 * with an incompatible schema, and its 7-day expiry could wipe a learner
 * mid-onboarding. It now writes 'teyro_creator_onboarding'. Do not point
 * anything else at this key.
 */

import { migrateAnswers } from './onboarding/migrate';
import { ONBOARDING_SCHEMA_VERSION, type OnboardingAnswersV2 } from './onboarding/types';
import { TOTAL_ONBOARDING_STEPS } from './onboarding/steps';

export const ONBOARDING_STORAGE_KEY = 'teyro_onboarding';
export const TOTAL_STEPS = TOTAL_ONBOARDING_STEPS;

export type { OnboardingAnswersV2 };
/** @deprecated v1 alias. Kept so older imports still typecheck. */
export type OnboardingAnswers = OnboardingAnswersV2;

export interface OnboardingLocalState {
  schemaVersion: number;
  currentStep: number;
  completedSteps: number[];
  answers: OnboardingAnswersV2;
  lastSeen: string;
  userId: string | null;
  onboardingComplete: boolean;
  completedAt?: string;
}

const DEFAULT_STATE: OnboardingLocalState = {
  schemaVersion: ONBOARDING_SCHEMA_VERSION,
  currentStep: 1,
  completedSteps: [],
  answers: {},
  lastSeen: new Date().toISOString(),
  userId: null,
  onboardingComplete: false,
};

export function getOnboardingState(): OnboardingLocalState {
  if (typeof window === 'undefined') return { ...DEFAULT_STATE };

  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };

    const parsed = JSON.parse(raw) as Partial<OnboardingLocalState>;
    const merged: OnboardingLocalState = { ...DEFAULT_STATE, ...parsed };

    const { answers, reset } = migrateAnswers({
      schemaVersion: parsed.schemaVersion,
      answers: parsed.answers as Record<string, unknown> | undefined,
    });

    if (!reset) {
      return { ...merged, schemaVersion: ONBOARDING_SCHEMA_VERSION, answers };
    }

    // A discarded answer set means the step progress it produced is
    // meaningless too — leaving `completedSteps` behind would let someone
    // skip straight to a later step with nothing behind it.
    const migrated: OnboardingLocalState = {
      ...DEFAULT_STATE,
      schemaVersion: ONBOARDING_SCHEMA_VERSION,
      answers,
      userId: merged.userId,
    };
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  } catch {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    return { ...DEFAULT_STATE };
  }
}

export function saveOnboardingState(patch: Partial<OnboardingLocalState>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getOnboardingState();
    const updated: OnboardingLocalState = {
      ...current,
      ...patch,
      schemaVersion: ONBOARDING_SCHEMA_VERSION,
      lastSeen: new Date().toISOString(),
    };
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    console.warn('[Teyro] Failed to write onboarding state to localStorage');
  }
}

/**
 * Merge a patch into the typed answer bag.
 *
 * Callers pass `invalidateDownstream`'d answers when a branching key changed;
 * this function deliberately does not invalidate on its own, so that the
 * decision is visible at the call site rather than hidden in a setter.
 */
export function saveAnswers(patch: Partial<OnboardingAnswersV2>): OnboardingAnswersV2 {
  const state = getOnboardingState();
  const answers: OnboardingAnswersV2 = { ...state.answers, ...patch };
  saveOnboardingState({ answers });
  return answers;
}

/** Replace the whole bag — used after an invalidating edit drops keys. */
export function replaceAnswers(answers: OnboardingAnswersV2): void {
  saveOnboardingState({ answers });
}

export function getAnswers(): OnboardingAnswersV2 {
  return getOnboardingState().answers;
}

/** Mark a step complete and advance `currentStep`. Idempotent. */
export function markStepComplete(step: number): void {
  const state = getOnboardingState();
  const completedSteps = [...new Set([...state.completedSteps, step])];
  const nextStep = step + 1;
  saveOnboardingState({
    completedSteps,
    currentStep: nextStep <= TOTAL_STEPS ? nextStep : step,
  });
}

export function clearOnboardingState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ONBOARDING_STORAGE_KEY);
}

// ─── Legacy compat shim ──────────────────────────────────────────────────────
// `selectedSkill` was the v1 ten-skill answer. v2 has a category and a list of
// interests instead, so the closest honest answer is the primary interest.
// Kept only so pre-v2 callers still compile; new code should read `getAnswers()`.

export const USER_ONBOARDING_KEY = ONBOARDING_STORAGE_KEY;

export interface UserOnboardingData {
  startedAt?: number;
  lastCompletedStep?: number;
  selectedSkill?: string;
}

export function getUserOnboardingData(): UserOnboardingData {
  const state = getOnboardingState();
  return {
    startedAt: state.lastSeen ? new Date(state.lastSeen).getTime() : undefined,
    lastCompletedStep: state.completedSteps.length ? Math.max(...state.completedSteps) : 0,
    selectedSkill: state.answers.interests?.[0] ?? state.answers.category,
  };
}

export function clearUserOnboardingData(): void {
  clearOnboardingState();
}
