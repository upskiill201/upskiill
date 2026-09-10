'use client';

import { useSyncExternalStore } from 'react';

/**
 * Reactively tracks prefers-reduced-motion via useSyncExternalStore —
 * SSR-safe (server snapshot false), no effect/setState cascade.
 */
const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener?.('change', onChange);
  return () => mq.removeEventListener?.('change', onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
