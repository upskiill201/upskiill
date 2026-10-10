import { clearSwrCache } from './swr';
import { clearHudSnapshot } from './hud-snapshot';

export interface CachedUserProfile {
  id?: string;
  email?: string;
  fullName?: string;
  avatarUrl?: string | null;
  hasStudentAccess?: boolean;
  hasCreatorAccess?: boolean;
}

const CACHE_KEY = 'teyro_user_cache';

export function getCachedUser(): CachedUserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCachedUser(user: CachedUserProfile) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCachedUser() || {};
    const updated = { ...existing, ...user };
    localStorage.setItem(CACHE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
}

export function clearCachedUser() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Clears every client-side store that holds account-scoped data.
 *
 * Call this — not clearCachedUser() — on logout.
 *
 * There are two such stores and they were drifting apart: this module's
 * `teyro_user_cache`, and SWR's `teyro-swr-cache` (lib/swr.ts), which persists
 * /api/auth/me, coin/XP/heart balances, and mission and chest state. Only the
 * first was ever cleared, and only by two of the four logout paths — so on a
 * shared device the next account to sign in painted the previous account's
 * name, avatar and balances from localStorage before its own data arrived.
 *
 * Keeping both wipes behind one function is the point: a new logout path can
 * no longer clear one store and silently forget the other.
 */
export function clearClientSession() {
  clearCachedUser();
  clearSwrCache();
  clearHudSnapshot();
}
