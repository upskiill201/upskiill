/**
 * /onboarding/complete — the unnumbered final screen.
 *
 * Deliberately not a numbered step: it shows no progress bar, because the
 * final numbered step already marked the flow complete before routing here.
 * Making this step N+1 would have shown progress on a screen with no more
 * steps to take — a small dishonesty the flow otherwise avoids.
 */

import OnboardingCompletion from '@/components/onboarding/OnboardingCompletion';

export default function OnboardingCompletePage() {
  return <OnboardingCompletion />;
}
