'use client';

/**
 * Makes sure the two pieces of streak news reach the learner once each,
 * whichever request happened to reconcile the streak (lib/streak/news.ts):
 *
 *  - LOST   a repair offer is open and this loss hasn't been shown
 *  - SAVED  a freeze covered yesterday, today isn't done yet, and today's
 *           freeze news hasn't been shown
 *
 * Only on home and the streak screen — calm places for a full-screen beat —
 * and the Celebration Engine still holds it while a lesson is open.
 */

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useCelebration } from '@/context/CelebrationContext';
import { monthOf, shiftMonth, useStreakCalendar, useStreakStats } from '@/hooks/useStreak';
import {
  freezeNewsKey,
  hasSeenStreakNews,
  lossNewsKey,
  lostStreakScene,
  markStreakNewsSeen,
  streakNewsDedupe,
} from '@/lib/streak/news';
import { yesterdayWasFrozen } from '@/lib/streak/week';

const CALM = ['/dashboard', '/dashboard/streak'];

export default function StreakNewsWatcher() {
  const pathname = usePathname();
  const calm = CALM.includes(pathname ?? '');
  const { celebrate } = useCelebration();
  const { data: stats } = useStreakStats();
  const now = new Date();
  const month = monthOf(now);
  const firstOfMonth = now.getDate() === 1;
  const { data: cal } = useStreakCalendar(month);
  const { data: prev } = useStreakCalendar(firstOfMonth ? shiftMonth(month, -1) : month);
  const done = useRef(false);

  useEffect(() => {
    if (done.current || !calm || !stats) return;

    const repair = stats.repair?.available ? stats.repair : null;
    if (repair) {
      const key = lossNewsKey(repair.lostStreak, repair.expiresAt);
      done.current = true;
      if (hasSeenStreakNews(key)) return;
      markStreakNewsSeen(key);
      celebrate(lostStreakScene({ lost: repair.lostStreak, repair, celebrate }));
      return;
    }

    if (!cal || (firstOfMonth && !prev)) return;
    done.current = true;
    if (stats.hasCompletedToday || stats.currentStreak <= 0) return;
    const calendar = firstOfMonth ? [...(prev?.days ?? []), ...cal.days] : cal.days;
    if (!yesterdayWasFrozen(calendar)) return;
    const key = freezeNewsKey();
    if (hasSeenStreakNews(key)) return;
    markStreakNewsSeen(key);
    celebrate({
      kind: 'STREAK',
      mode: 'SAVED',
      days: stats.currentStreak,
      freezesLeft: stats.freezesAvailable,
      dedupeKey: streakNewsDedupe('SAVED', stats.currentStreak, 0),
    });
  }, [calm, stats, cal, prev, firstOfMonth, celebrate]);

  return null;
}
