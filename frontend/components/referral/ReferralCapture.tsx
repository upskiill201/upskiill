'use client';

/**
 * Remembers the invite a visitor arrived with (?ref=CODE on any page) until
 * they've signed up and ReferralClaimer can claim it. Mounted in the root
 * layout so a link to the homepage, the blog or /signup all count.
 */

import { useEffect } from 'react';

export const REFERRAL_STORAGE_KEY = 'teyro_ref';
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export function readStoredReferral(): string | null {
  try {
    const raw = window.localStorage.getItem(REFERRAL_STORAGE_KEY);
    if (!raw) return null;
    const { code, at } = JSON.parse(raw) as { code: string; at: number };
    if (Date.now() - at > MAX_AGE_MS) {
      window.localStorage.removeItem(REFERRAL_STORAGE_KEY);
      return null;
    }
    return code;
  } catch {
    return null;
  }
}

export function clearStoredReferral() {
  try {
    window.localStorage.removeItem(REFERRAL_STORAGE_KEY);
  } catch {
    // Storage blocked — nothing to clear.
  }
}

export default function ReferralCapture() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('ref');
    if (!code || !/^[A-Za-z0-9]{6,12}$/.test(code)) return;
    try {
      // First invite wins — a later link shouldn't steal the credit.
      if (!readStoredReferral()) {
        window.localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify({ code: code.toUpperCase(), at: Date.now() }));
      }
    } catch {
      // Private mode — the invite just won't be remembered.
    }
  }, []);
  return null;
}
