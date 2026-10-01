'use client';

/**
 * /launch — the installed app's front door.
 *
 * The manifest's `start_url` points here, so this runs every time someone taps
 * the Teyro icon on their Home Screen. It answers one question — where does
 * this learner belong right now — and then gets out of the way.
 *
 *   completed onboarding  ->  /dashboard
 *   part-way through      ->  /onboarding/<next step>
 *   brand new             ->  /onboarding/0   (new user / existing user fork)
 *
 * ── Why a route rather than pointing start_url at /dashboard ───────────────
 * The previous `start_url` was `/dashboard`, which meant a learner who
 * installed Teyro and opened it for the first time landed on an authenticated
 * screen they had no account for. Screen 0 is where that fork belongs, and it
 * cannot be the `start_url` directly either, because a returning learner would
 * then be asked to sign in on every single launch.
 *
 * ── Why this does not check authentication ─────────────────────────────────
 * The destinations do. Blocking the first paint of the installed app on an
 * `/auth/me` round trip — over whatever connection the learner has when they
 * tap the icon — to reach a conclusion /dashboard re-checks anyway is the
 * slowest possible way to be no more correct.
 *
 * `router.replace` keeps this route out of the history stack, so the back
 * gesture from onboarding does not land on a blank redirector.
 */

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { TeyMark } from '@/components/brand/TeyMark';
import { resolveAppEntry } from '@/lib/pwa/entry';
import { detectBrowser, detectPlatform, detectStandalone } from '@/lib/pwa/platform';
import { trackInstallEvent } from '@/lib/pwa/analytics';
import { saveInstallFlowState } from '@/lib/pwa/installFlow';
import styles from './Launch.module.css';

/**
 * How long the splash holds when opened from the Home Screen. The OS splash
 * (manifest background + icon on Android, public/splash on iOS) is the same
 * picture, so this reads as one moment: Tey's tile pops, then the app opens.
 * Long enough to land, short enough to never feel like waiting. A normal tab
 * (a shared link, a bookmark) skips it.
 */
const SPLASH_MS = 850;

export default function LaunchPage() {
  const router = useRouter();
  const doneRef = useRef(false);

  useEffect(() => {
    // StrictMode double-invokes effects in development; a second replace() is
    // harmless but a second analytics event is not.
    if (doneRef.current) return;
    doneRef.current = true;

    const standalone = detectStandalone();
    const entry = resolveAppEntry();

    if (standalone) {
      saveInstallFlowState({ stage: 'launched-standalone', everStandalone: true });
    }

    trackInstallEvent('installed_pwa_opened', {
      platform: detectPlatform(),
      browser: detectBrowser(),
      standalone,
      entry_reason: entry.reason,
      // A launch that is NOT standalone means someone reached /launch in a
      // normal tab — a shared link, or a bookmark of the start_url.
      via_home_screen: standalone,
    });

    if (!standalone) {
      router.replace(entry.href);
      return;
    }
    // Warm the destination while the splash plays, so the hand-off is instant.
    router.prefetch(entry.href);
    const t = setTimeout(() => router.replace(entry.href), SPLASH_MS);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className={styles.splash} role="status" aria-live="polite">
      <span className="sr-only">Opening Teyro</span>
      <div className={styles.tile}>
        <TeyMark size={128} priority />
      </div>
      <div className={styles.dots} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
