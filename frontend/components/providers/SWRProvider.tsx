'use client';

import React, { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';
import { swrConfig, localStorageCacheProvider } from '@/lib/swr';

/**
 * Thin client-component wrapper around <SWRConfig>.
 *
 * The root layout (app/layout.tsx) is a Server Component, and swrConfig
 * contains a plain function (`fetcher`) — Server Components cannot pass
 * function props across the RSC boundary to a Client Component, so the
 * config object has to be constructed *inside* client code instead of
 * passed in from the server tree.
 *
 * ── Why the cache is not attached on the first render ──────────────────
 *
 * `localStorageCacheProvider` reads localStorage synchronously, so on the
 * server it hands back an empty cache while on the client it hands back a
 * populated one. That guarantees a hydration mismatch on any page whose
 * first render depends on cached data: the dashboard rendered its
 * "GET STARTED" empty state on the server (no cache) and the real course
 * ("BUSINESS") on the client (warm cache), and React responded by throwing
 * the whole tree away and re-rendering it.
 *
 * That regeneration is not cosmetic — it remounts every component below,
 * which restarts in-flight requests and is a strong candidate for the
 * "data only appears after a hard refresh" behaviour seen across admin and
 * dashboard pages.
 *
 * So the first client render deliberately uses SWR's default in-memory
 * cache, which matches the server exactly. The persisted cache is attached
 * immediately after hydration. The "paints instantly on a revisit" benefit
 * is kept — it now lands a frame later instead of during hydration, which
 * is a small price for a correct tree.
 */
export function SWRProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <SWRConfig
      value={{
        ...swrConfig,
        // undefined => SWR's own in-memory cache, i.e. the same empty
        // starting point the server rendered from.
        provider: hydrated ? localStorageCacheProvider : undefined,
      }}
    >
      {children}
    </SWRConfig>
  );
}
