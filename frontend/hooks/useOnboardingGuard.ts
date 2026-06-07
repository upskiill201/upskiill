'use client';

/**
 * useOnboardingGuard
 *
 * Protects onboarding step pages from being accessed directly via URL.
 * If the creator hasn't completed all prior steps, they are redirected to Step 1.
 *
 * Usage: Call at the very top of every step page component (steps 2–15).
 *
 * @param currentStep - The step number of the current page
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOnboardingData } from '@/lib/onboarding';

export function useOnboardingGuard(currentStep: number): void {
  const router = useRouter();

  useEffect(() => {
    const data = getOnboardingData();
    const lastCompleted = data.lastCompletedStep ?? 0;

    // Allow access only if the previous step was completed
    // e.g. to access step 5, lastCompletedStep must be >= 4
    if (lastCompleted < currentStep - 1) {
      if (lastCompleted === 0) {
        router.replace('/creator/onboarding/1');
      } else {
        router.replace(`/creator/onboarding/${lastCompleted + 1}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, router]);
}
