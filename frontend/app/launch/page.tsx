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
 * ── Why it checks the session, alongside the splash ───────────────────────
 * Onboarding progress lives in this device's storage, and only finishing
 * onboarding here sets it. A learner who signed in through the login screen
 * (or whose installed app keeps separate storage from the browser, as iOS
 * does) has none, so every launch sent them to screen 0 — which reads as
 * "sign in again" even though their 7-day session was still valid. The
 * account is created at the END of onboarding, so a live session means
 * onboarding is done: go home. The check runs while the splash plays, so it
 * costs no extra wait; if it's slow or offline, the device's own answer wins.
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
import { hasLiveSession } from '@/lib/pwa/session';
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

    // Warm both possible destinations while the session check runs.
    router.prefetch('/dashboard');
    if (entry.href !== '/dashboard') router.prefetch(entry.href);
    const splash = new Promise((r) => setTimeout(r, standalone ? SPLASH_MS : 0));

    // No cleanup cancel: doneRef already stops StrictMode's second run, so
    // cancelling here would leave development stuck on the splash.
    void Promise.all([hasLiveSession(), splash]).then(([signedIn]) => {
      router.replace(signedIn ? '/dashboard' : entry.href);
    });
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
