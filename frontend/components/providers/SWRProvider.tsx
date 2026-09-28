'use client';

import React, { useEffect, useState } from 'react';
import { SWRConfig, useSWRConfig } from 'swr';
import { swrConfig, localStorageCacheProvider, readPersistedCache } from '@/lib/swr';

/**
 * Thin client-component wrapper around <SWRConfig>.
 *
 * The root layout (app/layout.tsx) is a Server Component, and swrConfig
 * contains a plain function (`fetcher`) — Server Components cannot pass
 * function props across the RSC boundary to a Client Component, so the
 * config object has to be constructed *inside* client code instead of
 * passed in from the server tree.
 *
 * ── One cache, from the first render ──────────────────────────────────
 *
 * This used to render with SWR's default in-memory cache and swap the
 * persisted cache in after hydration, to avoid a hydration mismatch (the
 * server has no localStorage, so a warm client cache rendered different
 * markup). The swap was the bug behind "data only appears after a hard
 * refresh":
 *
 *   React runs child effects before parent effects, so every useSWR hook on
 *   the page started its request against the default cache. Then this
 *   provider's effect swapped caches. The responses landed in the old cache,
 *   which nothing read any more, and the hooks sat on the new, empty one
 *   forever — the home screen's enrollments never arrived, and it told
 *   learners with three courses they had none.
 *
 * Now the provider is the persisted-cache provider from the very first
 * render, but that cache STARTS EMPTY — on the client too — so the first
 * client render still matches the server exactly. Right after hydration,
 * `PersistedCacheSeeder` copies the previous visit's entries in.
 */
export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ ...swrConfig, provider: localStorageCacheProvider }}>
      {/* First child on purpose: sibling subtrees commit their effects in
          order, so this seeds before any page component's effect runs. */}
      <PersistedCacheSeeder />
      {children}
    </SWRConfig>
  );
}

/**
 * Copies the persisted entries into the live cache, once, after hydration.
 *
 * Written straight into the cache — NOT via `mutate()`. A mutate stamps the
 * key as changed, and SWR then discards any request already in flight for it:
 * the stale persisted value would win over the fresh response. Writing only
 * keys that are still empty means fresh data always wins, and anything that
 * mounts later (the next page) paints from the persisted value instantly.
 */
function PersistedCacheSeeder() {
  const { cache } = useSWRConfig();
  // Read during the first render (it renders nothing, so this cannot cause a
  // mismatch) so a persist fired by an early cache write can't overwrite the
  // stored entries before we've read them.
  const [persisted] = useState(readPersistedCache);

  useEffect(() => {
    for (const [key, state] of persisted) {
      if (state?.data === undefined) continue;
      if (cache.get(key)?.data !== undefined) continue;
      cache.set(key, state as Parameters<typeof cache.set>[1]);
    }
  }, [cache, persisted]);

  return null;
}
