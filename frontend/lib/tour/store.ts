/**
 * The app tour's state — a tiny module store (same pattern as
 * lib/awareness/notices.ts) so the More menu, a watcher or the overlay can
 * start, move or end it without a provider.
 *
 * "Done" is per user, per device (localStorage). A tour is a courtesy, not a
 * gate, so a cleared browser just means it can be offered once more.
 */

import { useSyncExternalStore } from 'react';

interface TourState {
  active: boolean;
  index: number;
}

let state: TourState = { active: false, index: 0 };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const KEY = (userId: string) => `teyro-tour-v1:${userId}`;

export function isTourDone(userId: string): boolean {
  try {
    return window.localStorage.getItem(KEY(userId)) === '1';
  } catch {
    return false;
  }
}

export function markTourDone(userId: string) {
  try {
    window.localStorage.setItem(KEY(userId), '1');
  } catch {
    // Private mode — worst case it is offered once more.
  }
}

export function startTour() {
  state = { active: true, index: 0 };
  emit();
}

export function goToTourStep(index: number) {
  state = { ...state, index: Math.max(0, index) };
  emit();
}

export function endTour() {
  state = { active: false, index: 0 };
  emit();
}

export function useTourState(): TourState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => state,
  );
}
