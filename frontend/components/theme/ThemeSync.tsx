'use client';

/**
 * Keeps <html data-theme> in step with the learner's choice and the clock.
 * Mounted once in the (app) layout. Auto re-checks every minute and when the
 * tab comes back to the foreground, so a session that straddles dusk turns
 * dark on its own. Leaving the student app (a light-only page) clears it.
 */

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { applyTheme, getThemePref, resolveTheme, themeApplies, useThemePref } from '@/lib/theme/theme';

export default function ThemeSync() {
  const pathname = usePathname();
  const pref = useThemePref();

  useEffect(() => {
    if (!themeApplies(pathname)) {
      applyTheme(null);
      return;
    }
    const sync = () => applyTheme(resolveTheme(getThemePref()));
    sync();
    const timer = window.setInterval(sync, 60_000);
    const onVisible = () => document.visibilityState === 'visible' && sync();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [pathname, pref]);

  // Leaving the student app entirely (marketing, creator) goes back to light.
  useEffect(() => () => applyTheme(null), []);

  return null;
}
