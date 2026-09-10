'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Access-polling primitive.
 *
 * Polls `/api/courses/:id/access` until the entitlement appears — used both
 * by the post-Stripe-return watcher and by the unlock flow's
 * WaitingForApproval panel (a MeSomb PENDING collect that the webhook may
 * confirm while we watch).
 *
 * `enabled` is expected to be stable per mount (callers that need to restart
 * a loop should remount with a changed key). Callbacks are kept in refs so
 * changing them never restarts the loop.
 */
export interface UsePollCourseAccessOptions {
  /** False = do not poll. Flipping to true (re)starts the loop. */
  enabled: boolean;
  /** Invoked once access is granted — refresh page-level access state here. */
  onUnlocked?: () => void;
  /** Invoked when all poll attempts are exhausted without an unlock. */
  onExhausted?: (message: string) => void;
  /** Milliseconds between access checks. */
  pollIntervalMs?: number;
  /** Maximum number of access checks (~25s of patience at the default). */
  maxAttempts?: number;
}

export const UNLOCK_POLL_EXHAUSTED_MESSAGE =
  'Your payment was received — the unlock is still processing. Refresh in a minute.';

export function usePollCourseAccess(
  courseId: string | undefined,
  {
    enabled,
    onUnlocked,
    onExhausted,
    pollIntervalMs = 2500,
    maxAttempts = 10,
  }: UsePollCourseAccessOptions,
): { isPolling: boolean } {
  const [isPolling, setIsPolling] = useState(enabled);

  // Keep callbacks fresh without re-triggering the polling effect.
  const unlockedRef = useRef(onUnlocked);
  const exhaustedRef = useRef(onExhausted);
  useEffect(() => {
    unlockedRef.current = onUnlocked;
    exhaustedRef.current = onExhausted;
  });

  useEffect(() => {
    if (!enabled || !courseId) return;

    const stopped = { current: false };
    let timer: ReturnType<typeof setTimeout> | null = null;
    let attempts = 0;

    const stop = () => {
      stopped.current = true;
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      setIsPolling(false);
    };

    const tick = async () => {
      if (stopped.current) return;
      attempts += 1;
      try {
        const res = await fetch(`/api/courses/${courseId}/access`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          if (data.hasAccess === true) {
            stop();
            unlockedRef.current?.();
            return;
          }
        }
      } catch {
        /* network hiccup — keep polling */
      }
      if (stopped.current) return;
      if (attempts < maxAttempts) {
        timer = setTimeout(tick, pollIntervalMs);
      } else {
        stop();
        exhaustedRef.current?.(UNLOCK_POLL_EXHAUSTED_MESSAGE);
      }
    };

    void tick();

    return () => {
      // Clears the pending timer on unmount, courseId change or disabled flip
      // — the old inline watcher on /learn/[id] leaked this and polled forever.
      stopped.current = true;
      if (timer !== null) clearTimeout(timer);
      setIsPolling(false);
    };
  }, [enabled, courseId, maxAttempts, pollIntervalMs]);

  return { isPolling };
}

type UsePostPaymentUnlockOptions = Omit<UsePollCourseAccessOptions, 'enabled'>;

/**
 * Post-payment unlock watcher.
 *
 * After Stripe checkout the learner lands back on a learn page with
 * `?payment=success`, but the entitlement is created by the STRIPE WEBHOOK,
 * which may still be in flight. This hook polls `/api/courses/:id/access`
 * briefly instead of showing the paywall again to someone who just paid.
 *
 * Shared by /learn/[id] and /learn/[id]/section/[sectionIndex] — previously
 * this logic was duplicated and the overview page's version never cleared
 * its timer on unmount, keeping polling after navigation.
 */
export function usePostPaymentUnlock(
  courseId: string | undefined,
  { onUnlocked, onExhausted, pollIntervalMs, maxAttempts }: UsePostPaymentUnlockOptions = {},
): { isPolling: boolean } {
  // Capture the query param ONCE per mount, during first render (lazy state
  // initializer). Capturing here — rather than inside the effect — survives
  // React StrictMode's double effect invocation in dev: the effect cleans the
  // URL, and a naive re-read there would find nothing on its second run and
  // silently skip polling. State persists across the StrictMode remount
  // simulation, so this value stays correct.
  const [capturedPayment] = useState<string | null>(() =>
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('payment')
      : null,
  );
  const shouldWatch = capturedPayment === 'success';

  // Clean the URL exactly once so refreshing doesn't re-trigger the watcher.
  const urlCleanedRef = useRef(false);
  useEffect(() => {
    if (urlCleanedRef.current || !capturedPayment) return;
    urlCleanedRef.current = true;
    window.history.replaceState({}, '', window.location.pathname);
  }, [capturedPayment]);

  return usePollCourseAccess(courseId, {
    enabled: shouldWatch,
    onUnlocked,
    onExhausted,
    pollIntervalMs,
    maxAttempts,
  });
}
