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
 *   const { currentAnswer, isLoading, saveAnswer, advance } = useOnboardingSession({ currentStep: 2, onAdvance: () => {} });
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

// Routed through the frontend's own same-origin `/api/*` proxy (see
// next.config.ts fallback rewrite), NOT the backend's own domain directly.
// The auth cookie is `sameSite: 'lax'`, so it never rides along on a
// cross-site fetch to the backend's domain — only same-origin requests (which
// Next's server-side rewrite then forwards to the backend with the cookie
// intact) actually authenticate. Hitting the backend URL directly here silently
// 401s and was why onboarding progress never reached the DB post-login.
async function fetchSessionFromBackend(): Promise<{
  exists: boolean;
  currentStep?: number;
  completedSteps?: number[];
  answers?: OnboardingAnswers;
  onboardingComplete?: boolean;
} | null> {
  try {
    const res = await fetch('/api/user-onboarding', {
      credentials: 'include', // sends the httpOnly JWT cookie
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function syncToBackend(payload: {
  currentStep: number;
  completedSteps: number[];
  answers: OnboardingAnswers;
  onboardingComplete?: boolean;
}): Promise<boolean> {
  try {
    const res = await fetch('/api/user-onboarding', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    // Non-blocking for normal step advances — localStorage is the source of
    // truth for now. Callers that need the write CONFIRMED before doing
    // something server-gated (e.g. claiming a badge) must check the
    // returned boolean rather than just awaiting this.
    console.warn('[Teyro] Failed to sync onboarding session to backend');
    return false;
  }
}

export function useOnboardingSession(options: { 
  currentStep: number;
  disableGuard?: boolean;
} | number) {
  // Support legacy API of just passing currentStep
  const currentStep = typeof options === 'number' ? options : options.currentStep;
  const disableGuard = typeof options === 'number' ? false : options.disableGuard;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  /** Shared in-flight (or settled) session fetch — survives StrictMode remounts. */
  const remoteSessionRef = useRef<Promise<{
    exists: boolean;
    currentStep?: number;
    completedSteps?: number[];
    answers?: OnboardingAnswers;
    onboardingComplete?: boolean;
  } | null> | null>(null);

  // ── Mount: restore from localStorage immediately, then reconcile with DB ──
  useEffect(() => {
    // 1. Read localStorage first — instant, no flash
    const local = getOnboardingState();
    setAnswers(local.answers);
    setCompletedSteps(local.completedSteps);

    let cancelled = false;

    // 2. Step guard — prevent URL-skipping.
    //    A user can only access a step if the previous step is complete;
    //    Step 1 is always accessible.
    const applyGuard = (completed: number[]) => {
      if (disableGuard || currentStep <= 1) return;
      const furthestAllowed = completed.length > 0 ? Math.max(...completed) + 1 : 1;
      if (currentStep > furthestAllowed) {
        router.replace(`/onboarding/${furthestAllowed}`);
      }
    };

    // A device with local history guards instantly; an empty one must wait
    // for the server (bounded) so a cross-device resume isn't bounced to
    // Step 1 while the DB still holds the real position (B2).
    const needsRemoteFirst = local.completedSteps.length === 0 && currentStep > 1;
    if (!needsRemoteFirst) {
      applyGuard(local.completedSteps);
    }

    // 3. Backend reconciliation — one shared request per mounted page, but
    // EVERY effect run subscribes to it. React 19 StrictMode runs
    // mount → cleanup → mount with refs intact, so a boolean "already
    // synced" flag would leave the second run waiting forever (and skip the
    // remote-first guard entirely).
    const fetchRemote = () =>
      needsRemoteFirst
        ? Promise.race([
            fetchSessionFromBackend(),
            new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000)),
          ])
        : fetchSessionFromBackend();

    if (!remoteSessionRef.current) {
      remoteSessionRef.current = fetchRemote();
    }

    remoteSessionRef.current.then(remote => {
      if (cancelled) return;

      if (!remote || !remote.exists) {
        // Not authenticated, no session, or timed out — localStorage is
        // the truth. For the waiting case that means guard against empty
        // local progress (the honest pre-reconciliation answer).
        if (needsRemoteFirst) applyGuard(local.completedSteps);
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
        saveOnboardingState({
          currentStep: remoteStep,
          completedSteps: remoteCompleted,
          answers: remoteAnswers,
          onboardingComplete: remote.onboardingComplete ?? false,
        });
        setAnswers(remoteAnswers);
        setCompletedSteps(remoteCompleted);
        if (needsRemoteFirst) applyGuard(remoteCompleted);
      } else if (needsRemoteFirst) {
        applyGuard(local.completedSteps);
      }

      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
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
