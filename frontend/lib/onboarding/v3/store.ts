/**
 * Onboarding v3 state on this device. Survives closing the tab, so a learner
 * comes back exactly where they left off ("Welcome back, Ada. Your lesson is
 * waiting."), with the lesson they finished and the rewards waiting for them.
 */

import { STEP_INDEX, type AnswersV3, type StepId } from './flow';

export const V3_STORAGE_KEY = 'teyro_onboarding_v3';

export interface PendingRewards {
  lessonXp: number;
  chestCoins: number;
  streakFreezes: number;
}

export interface OnboardingV3State {
  schemaVersion: 3;
  step: StepId;
  /** The furthest step reached, so resume never goes backwards. */
  furthest: StepId;
  answers: AnswersV3;
  anonymousId: string;
  startedAt: string;
  lastSeen: string;
  rewards: PendingRewards | null;
  signedUp: boolean;
  completedAt: string | null;
}

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function fresh(): OnboardingV3State {
  const now = new Date().toISOString();
  const anonymousId = uuid();
  return {
    schemaVersion: 3,
    step: 'splash',
    furthest: 'splash',
    answers: { anonymousId },
    anonymousId,
    startedAt: now,
    lastSeen: now,
    rewards: null,
    signedUp: false,
    completedAt: null,
  };
}

export function loadV3(): OnboardingV3State {
  if (typeof window === 'undefined') return fresh();
  try {
    const raw = window.localStorage.getItem(V3_STORAGE_KEY);
    if (!raw) return fresh();
    const parsed = JSON.parse(raw) as OnboardingV3State;
    // The "New to it, or know some?" step was folded into the experience
    // question (2026-10-27): a save parked on it resumes at the commit screen;
    // one that never picked a path starts with lesson 1.
    if ((parsed?.step as string) === 'path' || (parsed?.furthest as string) === 'path') {
      const knows = parsed.answers?.experienceLevel === 'some' || parsed.answers?.experienceLevel === 'lots';
      parsed.answers = { ...parsed.answers, path: parsed.answers?.path ?? 'start', knowsSome: parsed.answers?.knowsSome ?? knows };
      if ((parsed.step as string) === 'path') parsed.step = 'commit';
      if ((parsed.furthest as string) === 'path') parsed.furthest = 'commit';
    }
    if (parsed?.schemaVersion !== 3 || !(parsed.step in STEP_INDEX)) return fresh();
    return parsed;
  } catch {
    return fresh();
  }
}

export function saveV3(state: OnboardingV3State): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(V3_STORAGE_KEY, JSON.stringify({ ...state, lastSeen: new Date().toISOString() }));
  } catch {
    /* private mode: the flow still works, it just won't resume */
  }
}

export function clearV3(): void {
  try {
    window.localStorage.removeItem(V3_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** Furthest of two steps. */
export function furthestOf(a: StepId, b: StepId): StepId {
  return STEP_INDEX[a] >= STEP_INDEX[b] ? a : b;
}
