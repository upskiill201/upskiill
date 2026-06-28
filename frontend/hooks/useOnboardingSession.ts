'use client';

/**
 * useOnboardingSession
 *
 * The single hook used by every onboarding step page.
 *
 * Responsibilities:
 *  - Restores session from localStorage immediately (no flash)
 *  - Reconciles with the backend DB if the user is authenticated
 *  - Guards against URL-skipping (redirects to correct step)
 *  - saveAnswer()  → writes to localStorage instantly
 *  - advance()     → writes to localStorage + syncs to DB (non-blocking) + navigates
 *
 * Usage:
 *   const { currentAnswer, isLoading, saveAnswer, advance } = useOnboardingSession(2);
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  getOnboardingState,
  saveOnboardingState,
  saveStepAnswer,
  markStepComplete,
  getStepAnswer,
  TOTAL_STEPS,
  type OnboardingAnswers,
} from '@/lib/user-onboarding';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchSessionFromBackend(): Promise<{
  exists: boolean;
  currentStep?: number;
  completedSteps?: number[];
  answers?: OnboardingAnswers;
  onboardingComplete?: boolean;
} | null> {
  try {
    const res = await fetch(`${API_URL}/user-onboarding`, {
      credentials: 'include', // sends the httpOnly JWT cookie
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function syncToBackend(payload: {
  currentStep: number;
  completedSteps: number[];
  answers: OnboardingAnswers;
  onboardingComplete?: boolean;
}): Promise<void> {
  try {
    await fetch(`${API_URL}/user-onboarding`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-blocking — localStorage is the source of truth for now
    console.warn('[Teyro] Failed to sync onboarding session to backend');
  }
}

export function useOnboardingSession(currentStep: number) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const synced = useRef(false);

  // ── Mount: restore from localStorage immediately, then reconcile with DB ──
  useEffect(() => {
    // 1. Read localStorage first — instant, no flash
    const local = getOnboardingState();
    setAnswers(local.answers);
    setCompletedSteps(local.completedSteps);

    // 2. Step guard — prevent URL-skipping
    //    A user can only access a step if the previous step is complete.
    //    Step 1 is always accessible.
    if (currentStep > 1) {
      const furthestAllowed = local.completedSteps.length > 0
        ? Math.max(...local.completedSteps) + 1
        : 1;

      if (currentStep > furthestAllowed) {
        router.replace(`/onboarding/${furthestAllowed}`);
        return;
      }
    }

    // 3. Attempt backend reconciliation (only once per mount)
    if (!synced.current) {
      synced.current = true;
      fetchSessionFromBackend().then(remote => {
        if (!remote || !remote.exists) {
          // Not authenticated or no session — localStorage is the truth
          setIsLoading(false);
          return;
        }

        // Backend is authoritative — if it's ahead of localStorage, merge it in
        const remoteStep = remote.currentStep ?? 1;
        const remoteCompleted = remote.completedSteps ?? [];
        const remoteAnswers = remote.answers ?? {};

        const localFurthest = local.completedSteps.length > 0
          ? Math.max(...local.completedSteps)
          : 0;
        const remoteFurthest = remoteCompleted.length > 0
          ? Math.max(...remoteCompleted)
          : 0;

        if (remoteFurthest >= localFurthest) {
          // Remote is same or further ahead — use remote data
          const merged = {
            currentStep: remoteStep,
            completedSteps: remoteCompleted,
            answers: remoteAnswers,
            onboardingComplete: remote.onboardingComplete ?? false,
          };
          saveOnboardingState(merged);
          setAnswers(remoteAnswers);
          setCompletedSteps(remoteCompleted);
        }

        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  // ── saveAnswer: write to localStorage immediately ─────────────────────────
  const saveAnswer = useCallback((answer: Record<string, unknown>) => {
    saveStepAnswer(currentStep, answer);
    setAnswers(prev => ({
      ...prev,
      [String(currentStep)]: answer,
    }));
  }, [currentStep]);

  // ── advance: mark complete, sync to DB (non-blocking), navigate ───────────
  const advance = useCallback(async () => {
    markStepComplete(currentStep);

    const newCompleted = [...new Set([...completedSteps, currentStep])];
    const nextStep = currentStep + 1;
    setCompletedSteps(newCompleted);

    const state = getOnboardingState();
    const isLastStep = currentStep === TOTAL_STEPS;

    // Sync to backend non-blocking — don't await before navigating
    syncToBackend({
      currentStep: nextStep,
      completedSteps: newCompleted,
      answers: state.answers,
      ...(isLastStep && { onboardingComplete: true }),
    });

    if (isLastStep) {
      saveOnboardingState({ onboardingComplete: true, completedAt: new Date().toISOString() } as never);
      router.push('/dashboard');
    } else {
      router.push(`/onboarding/${nextStep}`);
    }
  }, [currentStep, completedSteps, router]);

  // The pre-populated answer for the current step
  const currentAnswer = answers[String(currentStep)] ?? null;

  return {
    isLoading,
    answers,
    currentAnswer,
    completedSteps,
    saveAnswer,
    advance,
  };
}
