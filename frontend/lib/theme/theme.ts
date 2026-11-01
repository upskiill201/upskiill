/**
 * Theme — light, dark, or Auto.
 *
 * Auto follows the clock, not the OS: light by day, dark at night
 * (DARK_FROM:00 → LIGHT_FROM:00 local time), and it re-checks as the day turns.
 * Light and Dark pin it. The choice lives in localStorage — it is per device,
 * and it has to be readable before React boots (see THEME_BOOT_SCRIPT in ./config).
 *
 * Dark only applies inside the student app and onboarding (THEME_SCOPES; the
 * onboarding joined 2026-10-27): the marketing site and creator studio are
 * light-only and stay that way.
 *
 * The palette itself is app/theme-dark.css, keyed on <html data-theme="dark">.
 */

import { useSyncExternalStore } from 'react';
import { DARK_FROM, LIGHT_FROM, THEME_KEY, THEME_SCOPES } from './config';

export type ThemePref = 'auto' | 'light' | 'dark';
export type Theme = 'light' | 'dark';

const BROWSER_BAR = { light: '#0172FD', dark: '#0B1020' } as const;

export function themeApplies(pathname: string): boolean {
  return THEME_SCOPES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function resolveTheme(pref: ThemePref, now: Date = new Date()): Theme {
  if (pref !== 'auto') return pref;
  const h = now.getHours();
  return h >= DARK_FROM || h < LIGHT_FROM ? 'dark' : 'light';
}

function isPref(v: unknown): v is ThemePref {
  return v === 'auto' || v === 'light' || v === 'dark';
}

export function getThemePref(): ThemePref {
  try {
    const v = window.localStorage.getItem(THEME_KEY);
    return isPref(v) ? v : 'auto';
  } catch {
    return 'auto';
  }
}

const listeners = new Set<() => void>();

export function setThemePref(pref: ThemePref) {
  try {
    window.localStorage.setItem(THEME_KEY, pref);
  } catch {
    // Private mode — it holds for this session only.
  }
  // A short cross-fade for the flip itself; first paint and the clock never fade.
  const root = document.documentElement;
  root.setAttribute('data-theme-fade', '');
  window.setTimeout(() => root.removeAttribute('data-theme-fade'), 400);
  listeners.forEach((l) => l());
}

/** Paint a theme on <html>; `null` removes it (a light-only page). */
export function applyTheme(theme: Theme | null) {
  const root = document.documentElement;
  if (theme === 'dark') root.dataset.theme = 'dark';
  else delete root.dataset.theme;
  root.style.colorScheme = theme === 'dark' ? 'dark' : '';
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute('content', BROWSER_BAR[theme ?? 'light']));
}

export function useThemePref(): ThemePref {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => e.key === THEME_KEY && cb();
      window.addEventListener('storage', onStorage);
      return () => {
        listeners.delete(cb);
        window.removeEventListener('storage', onStorage);
      };
    },
    getThemePref,
    () => 'auto',
  );
}
