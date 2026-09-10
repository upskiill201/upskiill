'use client';

import React from 'react';
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
 */
export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ ...swrConfig, provider: localStorageCacheProvider }}>
      {children}
    </SWRConfig>
  );
}
