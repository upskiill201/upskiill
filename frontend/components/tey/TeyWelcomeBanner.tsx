'use client';

/**
 * Tey's heads-up on home — a notice (lib/awareness/notices.ts), only when
 * it's worth saying:
 *
 *   - a streak just broke and can still be repaired → "Repair it"
 *   - the streak needs today's lesson ("at risk"), once per session
 *   - it's evening and it still needs today's lesson → Duolingo's evening
 *     nudge, once per day, with the hours left
 *   - the streak reset and can't be repaired → a gentle "start again"
 *
 * The streak facts come from /api/streak/me (reconciled server-side); the
 * course title for the at-risk line comes from Tey's greeting.
 */

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { notify } from '@/lib/awareness/notices';
import type { StreakStats } from '@/context/StreakContext';

const SESSION_KEY = 'teyro-tey-welcome-shown';
const EVENING_KEY = 'teyro-evening-nudge';
const EVENING_HOUR = 18;

interface TeyGreeting {
  justLost: boolean;
  courseTitle: string | null;
}

function readStore(store: 'session' | 'local', key: string): string | null {
  try {
    return (store === 'session' ? window.sessionStorage : window.localStorage).getItem(key);
  } catch {
    return null;
  }
}

function writeStore(store: 'session' | 'local', key: string, value: string) {
  try {
    (store === 'session' ? window.sessionStorage : window.localStorage).setItem(key, value);
  } catch {
    // Private mode — worst case a nudge shows once more.
  }
}

export default function TeyWelcomeBanner() {
  const pathname = usePathname();
  const onHome = pathname === '/dashboard';

  useEffect(() => {
    if (!onHome) return;
    const now = new Date();
    const today = now.toDateString();
    const sessionShown = readStore('session', SESSION_KEY) === '1';
    const eveningShown = readStore('local', EVENING_KEY) === today;
    const isEvening = now.getHours() >= EVENING_HOUR;
    if (sessionShown && (eveningShown || !isEvening)) return;

    let cancelled = false;
    (async () => {
      try {
        const [streakRes, teyRes] = await Promise.all([
          fetch(`/api/streak/me?timezoneOffset=${now.getTimezoneOffset()}`, { credentials: 'include' }),
          fetch('/api/tey/me/state', { credentials: 'include' }).catch(() => null),
        ]);
        if (!streakRes.ok || cancelled) return;
        const s = (await streakRes.json()) as StreakStats;
        const g = teyRes && teyRes.ok ? ((await teyRes.json())?.greeting as TeyGreeting | undefined) : undefined;
        if (cancelled) return;

        const atRisk = s.currentStreak > 0 && !s.hasCompletedToday;

        // Evening: its own once-a-day nudge, even if the morning one showed.
        if (atRisk && isEvening && !eveningShown) {
          writeStore('local', EVENING_KEY, today);
          writeStore('session', SESSION_KEY, '1');
          const hoursLeft = Math.max(1, 24 - now.getHours());
          notify({
            id: `evening-risk-${today}`,
            tone: 'warn',
            icon: 'streak',
            title: `${hoursLeft} ${hoursLeft === 1 ? 'hour' : 'hours'} left to keep your ${s.currentStreak}-day streak`,
            body: g?.courseTitle ? `One lesson of ${g.courseTitle} does it.` : 'One quick lesson does it.',
          });
          return;
        }

        if (sessionShown) return;
        writeStore('session', SESSION_KEY, '1');

        if (s.repair?.available) {
          notify({
            id: `streak-repair-${s.repair.lostStreak}-${today}`,
            tone: 'warn',
            icon: 'streak',
            title: `Your ${s.repair.lostStreak}-day streak broke`,
            body: 'Repair it now, as if you never missed a day.',
            action: 'Repair',
            href: '/dashboard/streak',
          });
        } else if (atRisk) {
          notify({
            id: `tey-at-risk-${today}`,
            tone: 'warn',
            icon: 'streak',
            title: `Your ${s.currentStreak}-day streak needs today's lesson`,
            body: g?.courseTitle ? `${g.courseTitle} is right where you left it.` : 'One lesson keeps it alive.',
          });
        } else if (g?.justLost) {
          notify({
            id: `tey-streak-reset-${today}`,
            tone: 'info',
            icon: 'tey',
            title: 'Your streak reset',
            body: 'No big deal. One lesson today starts a new one.',
          });
        }
      } catch {
        // Best effort — no notice this time.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [onHome]);

  return null;
}
