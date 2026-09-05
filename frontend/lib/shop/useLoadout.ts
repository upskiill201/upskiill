'use client';

/**
 * Equipped-cosmetics reader with a module-level cache.
 *
 * A frame can be rendered many times on one screen (a community feed is a
 * column of avatars), so the fetch is deduped per user id and shared across
 * every caller. Without this, one feed render would be one request per row.
 *
 * The cache is invalidated on `teyro:loadout-changed`, which the equip flow
 * dispatches — so equipping something updates every avatar on screen at once.
 */

import { useEffect, useState } from 'react';
import { fetchLoadout } from './api';
import type { Loadout } from './types';

const SELF = '__self__';

const cache = new Map<string, Loadout>();
const inflight = new Map<string, Promise<Loadout>>();

function load(userId?: string): Promise<Loadout> {
  const key = userId ?? SELF;
  const cached = cache.get(key);
  if (cached) return Promise.resolve(cached);

  const existing = inflight.get(key);
  if (existing) return existing;

  const promise = fetchLoadout(userId)
    .then((result) => {
      cache.set(key, result);
      return result;
    })
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, promise);
  return promise;
}

/** Drop cached loadouts so the next render re-reads them. */
export function invalidateLoadout() {
  cache.clear();
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('teyro:loadout-changed'));
  }
}

export function useLoadout(userId?: string) {
  const [data, setData] = useState<Loadout | null>(() => cache.get(userId ?? SELF) ?? null);
  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      setLoading(!cache.has(userId ?? SELF));
      load(userId)
        .then((result) => {
          if (!cancelled) setData(result);
        })
        .catch(() => {
          // A missing loadout is not an error state worth surfacing — the
          // avatar simply renders unframed.
          if (!cancelled) setData(null);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    run();
    window.addEventListener('teyro:loadout-changed', run);
    return () => {
      cancelled = true;
      window.removeEventListener('teyro:loadout-changed', run);
    };
  }, [userId]);

  return { loadout: data?.loadout ?? null, art: data?.art ?? null, loading };
}
