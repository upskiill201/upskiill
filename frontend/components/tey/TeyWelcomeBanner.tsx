'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import TeyMascot from '../community/TeyMascot';
import styles from './TeyWelcomeBanner.module.css';

const SESSION_KEY = 'teyro-tey-welcome-shown';

interface TeyGreeting {
  streakDays: number;
  atRisk: boolean;
  justLost: boolean;
  daysSinceLastActivity: number | null;
  courseTitle: string | null;
}

function dayWord(n: number) {
  return n === 1 ? 'day' : 'days';
}

function copyFor(g: TeyGreeting): { title: string; subtitle: string; tone: string } {
  if (g.justLost) {
    return {
      title: 'Your streak reset',
      subtitle: 'No big deal — one lesson today starts a new one.',
      tone: 'justLost',
    };
  }
  if (g.atRisk) {
    return {
      title: `Your ${g.streakDays}-${dayWord(g.streakDays)} streak needs today's lesson`,
      subtitle: g.courseTitle
        ? `${g.courseTitle} is right where you left it.`
        : "You haven't done today's lesson yet.",
      tone: 'atRisk',
    };
  }
  if (g.streakDays > 0) {
    return {
      title: `Welcome back — ${g.streakDays}-${dayWord(g.streakDays)} streak going strong`,
      subtitle: 'Keep it going whenever you’re ready.',
      tone: 'safe',
    };
  }
  return {
    title: 'Welcome back',
    subtitle: g.courseTitle ? `${g.courseTitle} is waiting for you.` : 'Ready when you are.',
    tone: 'safe',
  };
}

/**
 * A one-time-per-session welcome banner showing streak context the instant
 * the learner opens the app — deliberately NOT a push notification (a push
 * makes no sense for something shown while they're already looking at the
 * screen) and deliberately bypassing TeyPolicyService: this is a synchronous
 * UI read on page load, not a scheduled interruption, so no quiet hours, no
 * daily cap, no cooldown apply here. Session-gated instead, matching the
 * sessionStorage pattern already used by lib/tey-track.ts.
 */
export default function TeyWelcomeBanner() {
  const [greeting, setGreeting] = useState<TeyGreeting | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      // Private mode / quota — fall through and show it once for this render.
    }
    if (alreadyShown) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/tey/me/state', { credentials: 'include' });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (!data?.greeting || cancelled) return;
        setGreeting(data.greeting as TeyGreeting);
        try {
          window.sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
          // Best effort — worst case it shows again this session.
        }
      } catch {
        // Best effort. A failed fetch just means no banner this load.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!greeting || dismissed) return null;

  const { title, subtitle, tone } = copyFor(greeting);

  return (
    <div className={styles.banner} data-tone={tone}>
      <div className={styles.mascotWrap}>
        <TeyMascot size={40} />
      </div>
      <div className={styles.textGroup}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <button
        type="button"
        className={styles.dismiss}
        aria-label="Dismiss"
        onClick={() => setDismissed(true)}
      >
        <X size={16} />
      </button>
    </div>
  );
}
