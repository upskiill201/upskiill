'use client';

/**
 * Equipped-cosmetics reader, batched and cached.
 *
 * A frame can be rendered many times on one screen — a community feed is a
 * column of avatars. Two things stop that becoming a request storm:
 *
 *  1. Requests for other learners are coalesced: every `useLoadout(id)` that
 *     mounts in the same tick is collected and sent as ONE batched call.
 *  2. Results are cached per user id for the life of the page.
 *
 * The cache is cleared on `teyro:loadout-changed`, which the equip flow
 * dispatches — so equipping something updates every avatar on screen at once.
 */

import { useEffect, useState } from 'react';
import { fetchLoadout, fetchLoadouts } from './api';
import type { Loadout } from './types';

const SELF = '__self__';

const cache = new Map<string, Loadout>();
const inflight = new Map<string, Promise<Loadout>>();

// ─── Batching ────────────────────────────────────────────────────────────────

let pendingIds = new Set<string>();
let pendingFlush: Promise<void> | null = null;
const waiters = new Map<string, ((value: Loadout) => void)[]>();

const EMPTY: Loadout = {
  loadout: { FRAME: null, BACKGROUND: null, CELEBRATION_FX: null, XP_FX: null },
  art: { FRAME: null, BACKGROUND: null, CELEBRATION_FX: null, XP_FX: null },
};

function scheduleFlush() {
  if (pendingFlush) return pendingFlush;

  pendingFlush = Promise.resolve().then(async () => {
    // Take the batch and reset immediately, so anything that mounts during
    // the request lands in the NEXT batch instead of being dropped.
    const ids = [...pendingIds];
    pendingIds = new Set();
    pendingFlush = null;
    if (ids.length === 0) return;

    let result: Record<string, Record<string, string | null>> = {};
    try {
      result = await fetchLoadouts(ids);
    } catch {
      // A failed batch resolves everyone with nothing equipped: an unframed
      // avatar is the correct fallback, and it must not hang the render.
    }

    for (const id of ids) {
      const art = result[id] ?? EMPTY.art;
      const value: Loadout = {
        // The batch endpoint returns art tokens directly; item ids are not
        // needed to render someone else's avatar.
        loadout: EMPTY.loadout,
        art,
      };
      cache.set(id, value);
      waiters.get(id)?.forEach((resolve) => resolve(value));
      waiters.delete(id);
    }
  });

  return pendingFlush;
}

function loadBatched(userId: string): Promise<Loadout> {
  const cached = cache.get(userId);
  if (cached) return Promise.resolve(cached);

  const promise = new Promise<Loadout>((resolve) => {
    const list = waiters.get(userId) ?? [];
    list.push(resolve);
    waiters.set(userId, list);
  });

  pendingIds.add(userId);
  void scheduleFlush();
  return promise;
}

/** The signed-in learner's own loadout — a single un-batched read. */
function loadSelf(): Promise<Loadout> {
  const cached = cache.get(SELF);
  if (cached) return Promise.resolve(cached);

  const existing = inflight.get(SELF);
  if (existing) return existing;

  const promise = fetchLoadout()
    .then((result) => {
      cache.set(SELF, result);
      return result;
    })
    .finally(() => {
      inflight.delete(SELF);
    });

  inflight.set(SELF, promise);
  return promise;
}

/** Drop cached loadouts so the next render re-reads them. */
export function invalidateLoadout() {
  cache.clear();
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('teyro:loadout-changed'));
  }
}

export function useLoadout(
  userId?: string,
  options?: {
    /**
     * Set false to skip the read entirely. App-wide providers use this to
     * avoid firing an authenticated request on marketing pages, where there
     * is no signed-in learner and the call would only ever 401.
     */
    enabled?: boolean;
  },
) {
  const key = userId ?? SELF;
  const enabled = options?.enabled ?? true;
  const [data, setData] = useState<Loadout | null>(() => cache.get(key) ?? null);
  const [loading, setLoading] = useState(!data && enabled);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    let cancelled = false;

    const run = () => {
      setLoading(!cache.has(key));
      (userId ? loadBatched(userId) : loadSelf())
        .then((result) => {
          if (!cancelled) setData(result);
        })
        .catch(() => {
          // A missing loadout is not an error worth surfacing — the avatar
          // simply renders unframed.
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
  }, [key, userId, enabled]);

  return { loadout: data?.loadout ?? null, art: data?.art ?? null, loading };
}
