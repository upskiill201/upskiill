'use client';

/**
 * useOnboardingSession — the single hook behind the onboarding shell.
 *
 * Responsibilities:
 *  - Restore from localStorage immediately (no flash on first paint)
 *  - Reconcile with the DB when the learner is authenticated
 *  - saveAnswer()  → typed write, with downstream invalidation
 *  - advance()     → localStorage + non-blocking DB sync
 *
 * ── Why every request goes through `/api/*` ──────────────────────────────────
 * The auth cookie is `sameSite: 'lax'`, so it never rides along on a
 * cross-site fetch to the backend's own domain — only same-origin requests
 * (which Next's server-side rewrite then forwards to the backend with the
 * cookie intact) actually authenticate. Hitting NEXT_PUBLIC_API_URL directly
 * here silently 401s, which is why onboarding progress never reached the DB
 * before. `OnboardingShell` had its own copy of the sync that still did
 * exactly that; it now imports `syncToBackend` from here instead.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { invalidateDownstream, pruneInvalidInterests } from '@/lib/onboarding/branching';
import { ONBOARDING_SCHEMA_VERSION, type AnswerKey, type OnboardingAnswersV2 } from '@/lib/onboarding/types';
import {
  TOTAL_STEPS,
  getOnboardingState,
  markStepComplete,
  replaceAnswers,
  saveOnboardingState,
} from '@/lib/user-onboarding';

interface RemoteSession {
  exists: boolean;
  currentStep?: number;
  completedSteps?: number[];
  answers?: OnboardingAnswersV2;
  onboardingComplete?: boolean;
  schemaVersion?: number;
}

async function fetchSessionFromBackend(): Promise<RemoteSession | null> {
  try {
    const res = await fetch('/api/user-onboarding', { credentials: 'include' });
    if (!res.ok) return null;
    return (await res.json()) as RemoteSession;
  } catch {
    return null;
  }
}

export interface SyncPayload {
  currentStep: number;
  completedSteps: number[];
  answers: OnboardingAnswersV2;
  onboardingComplete?: boolean;
}

/**
 * In-flight sync, shared process-wide.
 *
 * Repeated Continue taps and a double-mount under StrictMode would otherwise
 * fire overlapping PUTs whose ordering isn't guaranteed — the older payload
 * can land last and roll progress backwards. Coalescing onto one promise
 * makes the last caller win deterministically.
 */
let inFlight: Promise<boolean> | null = null;
let queued: SyncPayload | null = null;

async function put(payload: SyncPayload): Promise<boolean> {
  try {
    const res = await fetch('/api/user-onboarding', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...payload, schemaVersion: ONBOARDING_SCHEMA_VERSION }),
    });
    return res.ok;
  } catch {
    // Non-blocking for ordinary advances — localStorage holds the progress
    // and the next advance retries. Callers that need the write CONFIRMED
    // before doing something server-gated must check the returned boolean.
    console.warn('[Teyro] Failed to sync onboarding session to backend');
    return false;
  }
}

export async function syncToBackend(payload: SyncPayload): Promise<boolean> {
  if (inFlight) {
    queued = payload;
    return inFlight;
  }

  inFlight = (async () => {
    let result = await put(payload);
    while (queued) {
      const next = queued;
      queued = null;
      result = await put(next);
    }
    inFlight = null;
    return result;
  })();

  return inFlight;
}

/** Test seam — clears the module-level coalescing state. */
export function resetSyncState(): void {
  inFlight = null;
  queued = null;
}

export function useOnboardingSession(options: { currentStep: number; disableGuard?: boolean }) {
  const { currentStep } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<OnboardingAnswersV2>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  /** Shared session fetch — survives the StrictMode mount/unmount/mount cycle. */
  const remoteSessionRef = useRef<Promise<RemoteSession | null> | null>(null);

  useEffect(() => {
    const local = getOnboardingState();
    // localStorage is not readable during render without desyncing the
    // server-rendered HTML from the client's first paint, so an effect is the
    // hydration-safe placement. Runs once per step, not per render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswers(local.answers);
    setCompletedSteps(local.completedSteps);

    let cancelled = false;

    if (!remoteSessionRef.current) {
      remoteSessionRef.current = fetchSessionFromBackend();
    }

    remoteSessionRef.current.then((remote) => {
      if (cancelled) return;

      if (!remote?.exists) {
        setIsLoading(false);
        return;
      }

      // A row written before v2 carries number-keyed answers that mean
      // nothing now. Ignore it rather than merging nonsense into a live bag.
      if (remote.schemaVersion !== ONBOARDING_SCHEMA_VERSION) {
        setIsLoading(false);
        return;
      }

      const remoteCompleted = remote.completedSteps ?? [];
      const remoteAnswers = pruneInvalidInterests(remote.answers ?? {});

      const localFurthest = local.completedSteps.length ? Math.max(...local.completedSteps) : 0;
      const remoteFurthest = remoteCompleted.length ? Math.max(...remoteCompleted) : 0;

      // Remote wins ties: it is the cross-device source of truth, and a tie
      // means the two agree anyway.
      if (remoteFurthest >= localFurthest) {
        saveOnboardingState({
          currentStep: remote.currentStep ?? 1,
          completedSteps: remoteCompleted,
          answers: remoteAnswers,
          onboardingComplete: remote.onboardingComplete ?? false,
        });
        setAnswers(remoteAnswers);
        setCompletedSteps(remoteCompleted);
      }

      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [currentStep]);

  /**
   * Write one answer, dropping anything it invalidates.
   *
   * Invalidation lives here rather than in the step components so that
   * "switch Coding to AI" cannot leave `web-development` behind no matter
   * which screen the edit came from — including an Edit jump from the review
   * screen.
   */
  const saveAnswer = useCallback((key: AnswerKey, value: OnboardingAnswersV2[AnswerKey]) => {
    setAnswers((prev) => {
      const merged = { ...prev, [key]: value } as OnboardingAnswersV2;
      const next = pruneInvalidInterests(invalidateDownstream(merged, key));
      replaceAnswers(next);
      return next;
    });
  }, []);

  const advance = useCallback(
    (fromStep: number): OnboardingAnswersV2 => {
      markStepComplete(fromStep);

      const state = getOnboardingState();
      const newCompleted = [...new Set([...state.completedSteps, fromStep])];
      setCompletedSteps(newCompleted);

      syncToBackend({
        currentStep: Math.min(fromStep + 1, TOTAL_STEPS),
        completedSteps: newCompleted,
        answers: state.answers,
        ...(fromStep === TOTAL_STEPS && { onboardingComplete: true }),
      });

      return state.answers;
    },
    [],
  );

  return { isLoading, answers, completedSteps, saveAnswer, advance, setAnswers };
}
