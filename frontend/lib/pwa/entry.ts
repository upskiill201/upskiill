/**
 * Where a learner belongs when they enter the app.
 *
 * Shared by the install gateway (/start) and the PWA launch router (/launch)
 * so the two can never disagree about what "open Teyro" means. It reads the
 * onboarding progress that lib/user-onboarding.ts already owns rather than
 * inventing a parallel notion of user state.
 *
 * Deliberately does NOT check authentication. The destinations themselves
 * already do — /dashboard and the (app) group guard their own routes, and
 * /onboarding/0 is the sign-in screen — so an auth round trip here would only
 * add a blocking request in front of the first paint of the first screen a
 * learner ever sees, to reach a conclusion the next route re-checks anyway.
 */

import { getOnboardingState, TOTAL_STEPS } from '@/lib/user-onboarding';

export interface AppEntry {
  href: string;
  /** Why this destination was chosen — drives the copy on the handoff screen. */
  reason: 'completed' | 'resume' | 'fresh';
}

export function resolveAppEntry(): AppEntry {
  const state = getOnboardingState();

  if (state.onboardingComplete) {
    return { href: '/dashboard', reason: 'completed' };
  }

  // Resume only on real evidence of progress. `currentStep` alone defaults to
  // 1 for someone who has never started, and sending them to step 1 would skip
  // screen 0 — the new-user / existing-user fork, and the only way a returning
  // learner on a fresh device can reach sign-in.
  const furthest = state.completedSteps.length > 0 ? Math.max(...state.completedSteps) : 0;
  if (furthest > 0) {
    const next = Math.min(furthest + 1, TOTAL_STEPS);
    return { href: `/onboarding/${next}`, reason: 'resume' };
  }

  return { href: '/onboarding/0', reason: 'fresh' };
}
