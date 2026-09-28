'use client';

import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/**
 * False during SSR and the hydration render, true after. The app's SWR cache
 * lives in localStorage (SWRProvider), so cached data exists on the client's
 * first render but not on the server's — anything drawn from it (badges,
 * counts, the home itself) must wait for this to avoid a hydration mismatch.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}
