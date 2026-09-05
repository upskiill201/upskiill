/**
 * A tiny shared cache for the coins-popover preview.
 *
 * The popover has to feel instant on hover — nobody waits for a network
 * round trip just to peek at the shop. `StatsBar` prefetches on mount so the
 * catalog is usually already sitting here by the time a learner hovers the
 * coin pill; the popover itself just reads whatever's cached (or joins an
 * in-flight fetch instead of starting a second one).
 */

import { fetchCatalog } from './api';
import type { ShopCatalog } from './types';

const TTL_MS = 30_000;

let cached: { data: ShopCatalog; at: number } | null = null;
let inflight: Promise<ShopCatalog> | null = null;

export function getCachedCatalog(): ShopCatalog | null {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.data;
  return null;
}

/** Fetches once and shares the result — safe to call from many mounts at once. */
export function prefetchCatalog(): Promise<ShopCatalog> {
  const fresh = getCachedCatalog();
  if (fresh) return Promise.resolve(fresh);
  if (inflight) return inflight;

  inflight = fetchCatalog()
    .then((data) => {
      cached = { data, at: Date.now() };
      inflight = null;
      return data;
    })
    .catch((e) => {
      inflight = null;
      throw e;
    });
  return inflight;
}

/** Drop the cache after a purchase/chest-open so the next read is fresh. */
export function invalidateCatalogCache(): void {
  cached = null;
}
