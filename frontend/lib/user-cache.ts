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
