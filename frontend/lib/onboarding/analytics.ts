/**
 * Onboarding analytics.
 *
 * Wraps the existing `captureEvent` helper (lazily-loaded PostHog, no-ops when
 * no key is configured) rather than introducing a second pipeline.
 *
 * ── What is deliberately NOT sent ───────────────────────────────────────────
 * The learner's name, their stated learning barriers, and their prior-attempt
 * answer never leave the device. Those are free text and self-reported
 * difficulty; the brief rules them out and `toAnalyticsProperties` enforces it
 * by construction, so no call site has to remember to strip them.
 *
 * ── Duplicate suppression ───────────────────────────────────────────────────
 * `onboarding_step_viewed` fires on mount, and React StrictMode double-mounts
 * in development while a refresh re-mounts in production. A per-session seen
 * set means a step is counted once per browser session no matter how many
 * times its effect runs — otherwise the funnel would show more views than
 * there were learners.
 */

import { captureEvent } from '@/lib/analytics';
import { toAnalyticsProperties } from './preferences';
import type { StepId } from './dialogue/types';
import type { OnboardingAnswersV2 } from './types';

/** Steps already counted this session, so rerenders can't inflate the funnel. */
const viewed = new Set<string>();
let startedFired = false;

/** Test seam. */
export function resetOnboardingAnalytics(): void {
  viewed.clear();
  startedFired = false;
}

function safeCapture(name: string, props?: Record<string, unknown>): void {
  try {
    captureEvent(name, props);
  } catch {
    // Analytics must never break a learner's flow.
  }
}

export function trackOnboardingStarted(): void {
  if (startedFired) return;
  startedFired = true;
  safeCapture('onboarding_started');
}

export function trackStepViewed(step: StepId, stepNumber: number): void {
  if (viewed.has(step)) return;
  viewed.add(step);
  safeCapture('onboarding_step_viewed', { step, step_number: stepNumber });
}

export function trackStepCompleted(step: StepId, stepNumber: number): void {
  safeCapture('onboarding_step_completed', { step, step_number: stepNumber });
}

export function trackStepSkipped(step: StepId, stepNumber: number): void {
  safeCapture('onboarding_step_skipped', { step, step_number: stepNumber });
}

export function trackCategorySelected(category: string): void {
  safeCapture('onboarding_category_selected', { category });
}

export function trackOnboardingCompleted(answers: OnboardingAnswersV2): void {
  // Only the closed-union projection — never the raw answer bag.
  safeCapture('onboarding_completed', toAnalyticsProperties(answers));
}

/**
 * The handoff into real learning. `had_recommendation` is the number worth
 * watching: it says whether the catalog could actually serve the track the
 * learner picked.
 */
export function trackFirstLearningAction(params: {
  destination: 'course' | 'explore' | 'dashboard';
  category?: string;
}): void {
  safeCapture('first_learning_action_started', {
    destination: params.destination,
    category: params.category,
    had_recommendation: params.destination === 'course',
  });
}
