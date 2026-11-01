'use client';

/**
 * /onboarding — onboarding v3 (2026-10-23). One route; the flow keeps its
 * own step in localStorage, so a learner resumes exactly where they left.
 */

import OnboardingV3 from '@/components/onboarding/v3/OnboardingV3';

export default function OnboardingPage() {
  return <OnboardingV3 />;
}
