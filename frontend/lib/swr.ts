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
/**
 * The live cache map, so logout can empty it in memory and not just on disk.
 *
 * Without this, clearSwrCache() would race the persist listener: we remove the
 * localStorage key, the page then navigates to /login, the unload persist fires
 * and writes the still-populated in-memory map straight back. The next account
 * on the device would read the previous account's data anyway.
 */
let activeCacheMap: Map<string, unknown> | null = null;

/**
 * Wipes the persisted SWR cache — both the localStorage blob and the live map.
 *
 * MUST be called on every logout path. This cache holds /api/auth/me (name,
 * email, avatar), coin/XP/heart balances, mission state and chest state; on a
 * shared device, leaving it behind paints one account's data for the next.
 *
 * Prefer clearClientSession() in lib/user-cache.ts, which clears this and the
 * user cache together, so no logout path can clear one and forget the other.
 */
export function clearSwrCache() {
  if (typeof window === 'undefined') return;
  try {
    activeCacheMap?.clear();
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // storage disabled / privacy mode — the in-memory clear above still ran
  }
}

export function localStorageCacheProvider(): Cache {
  // Always starts EMPTY — on the client too — so the first client render
  // matches the server's exactly. The persisted entries are seeded into it
  // after hydration (see `readPersistedCache` + SWRProvider). Reading them
  // here, synchronously, is what forced the provider to be swapped in after
  // hydration, and that swap stranded every in-flight request.
  const map = new Map<string, unknown>();

  if (typeof window !== 'undefined') {
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

  activeCacheMap = map;
  return map as unknown as Cache;
}

/**
 * The cache entries persisted by a previous visit — SWR state objects keyed
 * by request key. Empty on the server, in privacy mode, or on bad JSON.
 */
export function readPersistedCache(): [string, { data?: unknown } | undefined][] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
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
