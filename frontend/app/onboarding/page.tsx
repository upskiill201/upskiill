'use client';

/**
 * /onboarding (root)
 *
 * Session-resume redirect. Reads localStorage and immediately redirects
 * the user to their correct step. If no session exists, goes to step 1.
 *
 * This page renders nothing — it's a pure redirect gate.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOnboardingState } from '@/lib/user-onboarding';

export default function OnboardingRoot() {
  const router = useRouter();

  useEffect(() => {
    const state = getOnboardingState();

    // If onboarding is already complete, send them to the dashboard
    if (state.onboardingComplete) {
      router.replace('/dashboard');
      return;
    }

    // Resume from where they left off (default to step 0 entry screen)
    const step = state.currentStep ?? 0;
    router.replace(`/onboarding/${step}`);
  }, [router]);

  // Show a minimal spinner while the redirect fires
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#0172FD]/30 border-t-[#0172FD] rounded-full animate-spin" />
    </div>
  );
}
