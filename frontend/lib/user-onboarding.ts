/**
 * Teyro User Onboarding — localStorage Schema
 *
 * Single source of truth for reading/writing user onboarding progress to localStorage.
 * Storage key: 'teyro_onboarding'
 *
 * Schema:
 * {
 *   currentStep: number,
 *   completedSteps: number[],
 *   answers: { [step: string]: Record<string, unknown> },
 *   lastSeen: ISO string,
 *   userId: string | null,
 *   onboardingComplete: boolean
 * }
 */

export const ONBOARDING_STORAGE_KEY = 'teyro_onboarding';
export const TOTAL_STEPS = 15;

export interface OnboardingAnswers {
  [step: string]: Record<string, unknown>;
}

export interface OnboardingLocalState {
  currentStep: number;
  completedSteps: number[];
  answers: OnboardingAnswers;
  lastSeen: string;
  userId: string | null;
  onboardingComplete: boolean;
}

const DEFAULT_STATE: OnboardingLocalState = {
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
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
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
      lastSeen: new Date().toISOString(),
    };
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    console.warn('[Teyro] Failed to write onboarding state to localStorage');
  }
}

/** Save an answer for a specific step (merges with existing answers) */
export function saveStepAnswer(step: number, answer: Record<string, unknown>): void {
  const state = getOnboardingState();
  saveOnboardingState({
    answers: {
      ...state.answers,
      [String(step)]: answer,
    },
  });
}

/** Mark a step as completed and advance currentStep */
export function markStepComplete(step: number): void {
  const state = getOnboardingState();
  const completedSteps = [...new Set([...state.completedSteps, step])];
  const nextStep = step + 1;
  saveOnboardingState({
    completedSteps,
    currentStep: nextStep <= TOTAL_STEPS ? nextStep : step,
  });
}

/** Get the answer for a specific step */
export function getStepAnswer(step: number): Record<string, unknown> | null {
  const state = getOnboardingState();
  return state.answers[String(step)] ?? null;
}

/** Clear all onboarding state (called after onboarding completes or on logout) */
export function clearOnboardingState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ONBOARDING_STORAGE_KEY);
}

// ─── Legacy compat shim (used by existing pages before this refactor) ──────
// These are kept so no import breaks. They will be removed once all step pages
// are migrated to useOnboardingSession.
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
    lastCompletedStep: Math.max(0, ...state.completedSteps),
    selectedSkill: (state.answers['2']?.skill as string) || undefined,
  };
}

export function saveUserOnboardingData(data: Partial<UserOnboardingData>): void {
  if (data.selectedSkill) saveStepAnswer(2, { skill: data.selectedSkill });
  if (data.lastCompletedStep) markStepComplete(data.lastCompletedStep);
}

export function clearUserOnboardingData(): void {
  clearOnboardingState();
}
