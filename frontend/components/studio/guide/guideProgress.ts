'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Which guide articles this creator has opened, on this device only — a
 * convenience tick, not a record, so it lives in localStorage and the page
 * works the same when storage is blocked.
 */

const KEY = 'teyro:guide:read';
const listeners = new Set<() => void>();

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? '[]';
  } catch {
    return '[]';
  }
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useGuideProgress() {
  const raw = useSyncExternalStore(subscribe, read, () => '[]');
  let list: string[] = [];
  try {
    list = JSON.parse(raw);
  } catch {
    list = [];
  }
  const markRead = useCallback((slug: string) => {
    let current: string[] = [];
    try {
      current = JSON.parse(read());
    } catch {
      current = [];
    }
    if (current.includes(slug)) return;
    try {
      localStorage.setItem(KEY, JSON.stringify([...current, slug]));
    } catch {
      /* storage blocked: the tick lasts this visit only */
    }
    listeners.forEach((l) => l());
  }, []);
  return { read: new Set(list), markRead };
}
