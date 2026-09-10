'use client';

/**
 * /onboarding/0 — welcome + sign-in.
 *
 * The screen itself lives in WelcomeAuthScreen so /login can render the exact
 * same UI under its own URL. This route keeps the onboarding template's slide
 * transition into step 1.
 */

import WelcomeAuthScreen from '@/components/auth/WelcomeAuthScreen';

export default function OnboardingStep0() {
  return <WelcomeAuthScreen />;
}
