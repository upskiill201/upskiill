/**
 * lib/swr.ts
 *
 * Shared SWR configuration for the student-side app. Centralises the
 * fetcher, dedupe/caching policy, and a localStorage-backed cache provider
 * so returning to a page (e.g. dashboard -> shop -> dashboard) paints
 * instantly from last-known data while revalidating silently in the
 * background, instead of refetching everything from zero.
 *
 * See docs/plan "Teyro Student-Side Performance Overhaul" Phase 1.
 */
import type { Cache, SWRConfiguration } from 'swr';

const LOCAL_STORAGE_KEY = 'teyro-swr-cache';

/** Standard fetcher for same-origin, cookie-authenticated JSON GETs. */
export async function fetcher<T = unknown>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) {
    const error = new Error('Request failed') as Error & { status?: number; info?: unknown };
    error.status = res.status;
    try {
      error.info = await res.json();
    } catch {
      // response had no JSON body — ignore
    }
    throw error;
  }
  return res.json();
}

/**
 * Builds a Map-based cache pre-seeded from localStorage, and persists it back
 * on every mutation (throttled via microtask so bursts of updates only write
 * once). Falls back to an in-memory-only Map if localStorage is unavailable
 * (SSR, privacy mode, etc.) — safe by construction either way.
 */
export function localStorageCacheProvider(): Cache {
  let map: Map<string, unknown>;

  if (typeof window === 'undefined') {
    map = new Map();
  } else {
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      map = raw ? new Map(JSON.parse(raw)) : new Map();
    } catch {
      map = new Map();
    }

    let scheduled = false;
    const persist = () => {
      scheduled = false;
      try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(map.entries())));
      } catch {
        // storage full / disabled — cache still works in-memory for this session
      }
    };

    window.addEventListener('beforeunload', persist);

    const originalSet = map.set.bind(map);
    map.set = (key: string, value: unknown) => {
      const result = originalSet(key, value);
      if (!scheduled) {
        scheduled = true;
        queueMicrotask(persist);
      }
      return result;
    };
  }

  return map as unknown as Cache;
}

/**
 * Shared SWR options. `revalidateOnFocus` is off — the app already has its
 * own bespoke focus-driven refresh logic (Herald claimables sweep, etc.);
 * leaving SWR's on top of that was compounding the refetch-storm problem.
 */
export const swrConfig: SWRConfiguration = {
  fetcher,
  dedupingInterval: 30_000,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  keepPreviousData: true,
  shouldRetryOnError: true,
  errorRetryCount: 2,
};
