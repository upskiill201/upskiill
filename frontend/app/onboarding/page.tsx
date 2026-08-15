'use client';

/**
 * /onboarding (root)
 *
 * Session-resume redirect. Reads localStorage and immediately redirects
 * the user to their correct step. If no session exists, goes to step 1.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOnboardingState } from '@/lib/user-onboarding';

export default function OnboardingRoot() {
  const router = useRouter();

  useEffect(() => {
    const state = getOnboardingState();

    if (state.onboardingComplete) {
      router.replace('/dashboard');
      return;
    }

    const step = state.currentStep && state.currentStep >= 1 && state.currentStep <= 15 ? state.currentStep : 1;
    router.replace(`/onboarding/${step}`);
  }, [router]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#0172FD]/30 border-t-[#0172FD] rounded-full animate-spin" />
    </div>
  );
}
