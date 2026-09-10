'use client';

import { useState } from 'react';
import { Bell, Check, Share, SquarePlus, X } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { useTeyPush } from '@/hooks/useTeyPush';
import styles from './PwaPushNudgeCard.module.css';

/**
 * A second chance at push notifications, for iOS learners who skipped or
 * bounced off onboarding Step 15.
 *
 * Gated on having completed at least one lesson (`lastLessonCompletedAt`) —
 * a learner who hasn't experienced the product yet has no reason to care
 * about reminders, and nudging them this early just trains them to dismiss
 * prompts on sight.
 *
 * Two variants, mutually exclusive:
 *   A) Not installed to the Home Screen  -> inline "how to install" steps.
 *      iOS never fires `beforeinstallprompt`, so this has to be manual
 *      instructions rather than a one-tap install button.
 *   B) Installed but not subscribed      -> a single "enable" button.
 *
 * Each variant has its own dismiss flag, so declining the install prompt
 * doesn't also suppress the (unrelated, later) notification prompt once the
 * learner does install — and vice versa.
 */

const DISMISS_KEY_INSTALL = 'teyro:pwa-install-nudge-dismissed';
const DISMISS_KEY_PUSH = 'teyro:pwa-push-nudge-dismissed';

function readDismissed(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function writeDismissed(key: string): void {
  try {
    window.localStorage.setItem(key, '1');
  } catch {
    // Private mode / storage unavailable — the card just reappears next
    // visit, which is a reasonable fallback, not a broken feature.
  }
}

export default function PwaPushNudgeCard() {
  const { lastLessonCompletedAt, profileLoaded } = useGamification();
  const { platform, isStandalone } = usePwaInstall();
  const { needsInstall, subscribed, permission, busy, enable } = useTeyPush();

  // Lazy initializers, not an effect: this component already renders `null`
  // on the server and on the initial client paint (it's gated below on
  // usePwaInstall/useGamification, which both start at their SSR-safe
  // defaults), so there's no hydration mismatch to avoid by deferring the
  // localStorage read — and `readDismissed` is itself SSR-safe (no `window`
  // throws inside the try/catch, returning false).
  const [installDismissed, setInstallDismissed] = useState(() =>
    readDismissed(DISMISS_KEY_INSTALL),
  );
  const [pushDismissed, setPushDismissed] = useState(() =>
    readDismissed(DISMISS_KEY_PUSH),
  );
  const [showSteps, setShowSteps] = useState(false);
  const [enableResult, setEnableResult] = useState<'idle' | 'denied' | 'error'>('idle');

  const hasCompletedALesson = profileLoaded && lastLessonCompletedAt !== null;
  const isIos = platform === 'ios';

  if (!hasCompletedALesson || !isIos) return null;

  // Variant A: not on the Home Screen yet.
  if (!isStandalone && needsInstall && !installDismissed) {
    return (
      <div className={styles.card}>
        <button
          type="button"
          className={styles.dismissBtn}
          onClick={() => {
            writeDismissed(DISMISS_KEY_INSTALL);
            setInstallDismissed(true);
          }}
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>

        <div className={styles.body}>
          <span className={styles.iconWrap}>
            <SquarePlus size={20} />
          </span>
          <div className={styles.details}>
            <span className={styles.title}>Never lose a streak again</span>
            <span className={styles.subtitle}>
              Add Teyro to your Home Screen to get reminders before your streak
              runs out.
            </span>
          </div>
        </div>

        {showSteps && (
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepIcon}>
                <Share size={13} />
              </span>
              Tap Share in Safari&apos;s toolbar
            </div>
            <div className={styles.step}>
              <span className={styles.stepIcon}>
                <SquarePlus size={13} />
              </span>
              Select &ldquo;Add to Home Screen&rdquo;
            </div>
            <div className={styles.step}>
              <span className={styles.stepIcon}>
                <Check size={13} />
              </span>
              Tap Add, then open Teyro from your Home Screen
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.ctaBtn}
            onClick={() => setShowSteps((s) => !s)}
          >
            {showSteps ? 'Got it' : 'Show me how'}
          </button>
        </div>
      </div>
    );
  }

  // Variant B: installed, but no push subscription yet.
  if (
    isStandalone &&
    !needsInstall &&
    !subscribed &&
    permission !== 'denied' &&
    !pushDismissed
  ) {
    const handleEnable = async () => {
      setEnableResult('idle');
      // Must run inside this click handler — a permission request from
      // outside a user gesture is silently ignored by iOS Safari.
      const result = await enable();
      if (result === 'denied') setEnableResult('denied');
      else if (result === 'error') setEnableResult('error');
    };

    return (
      <div className={styles.card}>
        <button
          type="button"
          className={styles.dismissBtn}
          onClick={() => {
            writeDismissed(DISMISS_KEY_PUSH);
            setPushDismissed(true);
          }}
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>

        <div className={styles.body}>
          <span className={styles.iconWrap}>
            <Bell size={20} />
          </span>
          <div className={styles.details}>
            <span className={styles.title}>Turn on streak reminders</span>
            <span className={styles.subtitle}>
              {enableResult === 'denied'
                ? 'Notifications are blocked — enable them for Teyro in iOS Settings to turn this back on.'
                : "No spam, just a nudge on days you haven't studied yet."}
            </span>
          </div>
        </div>

        {enableResult !== 'denied' && (
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.ctaBtn}
              onClick={() => void handleEnable()}
              disabled={busy}
            >
              {busy ? 'Enabling…' : 'Enable notifications'}
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
}
