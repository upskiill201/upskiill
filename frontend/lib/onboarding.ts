/**
 * Teyro Creator Onboarding — Shared State Utility
 *
 * Single source of truth for reading/writing onboarding progress to localStorage.
 * All 16 onboarding step pages MUST use these helpers exclusively.
 *
 * Storage key: 'teyro_onboarding'
 * Expiry: 7 days from startedAt timestamp
 */

export const ONBOARDING_KEY = 'teyro_onboarding';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface OnboardingData {
  startedAt?: number;
  lastCompletedStep?: number;
  draftId?: string; // Legacy backend CreatorOnboardingDraft ID — no longer minted; kept so old stored payloads parse

  // Step answers (keyed by step number)
  step1?: { started: true };
  step2?: { creatorType: string };
  step3?: { categories: string[] };
  step4?: { audienceSize: string };
  step5?: { platforms: string[] };
  step6?: { existingContent: string[] };
  step7?: { biggestChallenge: string[] };
  step8?: { teachingStyle: string };
  step9?: { viewed: boolean };
  step10?: { feature: string };
  step11?: { viewed: boolean };
  step12?: { courseFormat: string };
  step13?: { communityOption: string };
  step14?: { reviewed: boolean };
}

// ─── SAFE PARSER ─────────────────────────────────────────────────────────────

/**
 * Safely reads and parses onboarding data from localStorage.
 * - Returns {} on missing or corrupted data (instead of crashing)
 * - Wipes expired sessions (> 7 days old)
 */
export function getOnboardingData(): OnboardingData {
  if (typeof window === 'undefined') return {};

  try {
    const raw = localStorage.getItem(ONBOARDING_KEY);
    if (!raw) return {};

    const data: OnboardingData = JSON.parse(raw);

    // Expiry check — wipe stale sessions
    if (data.startedAt && Date.now() - data.startedAt > MAX_AGE_MS) {
      localStorage.removeItem(ONBOARDING_KEY);
      return {};
    }

    return data;
  } catch {
    // Wipe corrupted JSON — don't silently break the flow
    localStorage.removeItem(ONBOARDING_KEY);
    return {};
  }
}

// ─── SAVE STEP ───────────────────────────────────────────────────────────────

/**
 * Saves a step's answers to localStorage and bumps lastCompletedStep.
 * Merges with existing data — never overwrites unrelated steps.
 *
 * @param step - The step number (1–14)
 * @param answers - The answers object for this step
 */
export function saveOnboardingStep(
  step: number,
  answers: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  const existing = getOnboardingData();
  const updated: OnboardingData = {
    ...existing,
    startedAt: existing.startedAt ?? Date.now(),
    lastCompletedStep: Math.max(existing.lastCompletedStep ?? 0, step),
    [`step${step}`]: answers,
  };

  try {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(updated));
  } catch {
    // localStorage quota exceeded — fail silently, flow continues
    console.warn('[Teyro Onboarding] Failed to save to localStorage');
  }
}

// ─── CLEAR ───────────────────────────────────────────────────────────────────

/**
 * Wipes ALL onboarding data from localStorage.
 * MUST only be called AFTER a confirmed successful backend registration response.
 * Never call this before the API returns ok = true.
 */
export function clearOnboardingData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ONBOARDING_KEY);
  // Also clean up the old separate key used by the legacy code
  localStorage.removeItem('teyro_onboarding_draft_id');
  localStorage.removeItem('teyro_onboarding_data');
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/**
 * Returns true if the creator has in-progress onboarding data
 * that was started on a previous session (lastCompletedStep >= 1).
 */
export function hasInProgressOnboarding(): boolean {
  const data = getOnboardingData();
  return (data.lastCompletedStep ?? 0) >= 1;
}

/**
 * Returns the step the creator should be redirected to when resuming.
 * i.e., the step after the last completed one.
 */
export function getResumeStep(): number {
  const data = getOnboardingData();
  const last = data.lastCompletedStep ?? 0;
  // Cap at step 14 (last content step before signup)
  return Math.min(last + 1, 14);
}
