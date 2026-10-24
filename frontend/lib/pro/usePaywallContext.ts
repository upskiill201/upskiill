'use client';

import { useMemo } from 'react';
import { useMe } from '@/hooks/useMe';
import { getAnswers } from '@/lib/user-onboarding';
import { goalById } from '@/lib/onboarding/goals';
import type { PaywallContext } from './copy';

/**
 * Who the paywall is talking to: their first name and the goal they chose in
 * onboarding (stored on this device). Missing pieces just make the copy
 * more general; nothing is ever invented.
 */
export function usePaywallContext(courseTitle?: string | null): PaywallContext {
  const { me } = useMe();
  return useMemo(() => {
    let goal: string | null = null;
    let name: string | null = null;
    try {
      const answers = getAnswers() as Record<string, unknown>;
      goal = goalById(answers.goal)?.phrase ?? null;
      name = typeof answers.name === 'string' ? answers.name : null;
    } catch {
      /* no local onboarding state */
    }
    return {
      name: name || (me as { fullName?: string } | undefined)?.fullName || null,
      goal,
      courseTitle: courseTitle ?? null,
    };
  }, [me, courseTitle]);
}
