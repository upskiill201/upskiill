'use client';

/**
 * Your level, at the top of the learner rail (home, Explore, My Learning).
 *
 *   - you, inside a ring that fills as the level does, with the level on it
 *   - how far to the next level
 *   - today's XP against your daily goal, and this week at a glance
 *   - what the next level unlocks in the shop, so the number means something
 *
 * Flat on purpose: it sits above the chunky quest cards and shouldn't compete
 * with them. Every number comes from the server (lib/level.ts curve, the
 * streak calendar's per-day XP, the profile's daily goal, the shop catalogue).
 * Tapping it opens the full level page.
 */

import React, { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { Glyph } from '@/components/art/Glyph';
import ShopItemArt from '@/components/shop-engine/ShopItemArt';
import { useHydrated } from '@/components/studio/useHydrated';
import { useGamification } from '@/context/GamificationContext';
import { useMe } from '@/hooks/useMe';
import { monthOf, shiftMonth, useStreakCalendar } from '@/hooks/useStreak';
import { getCachedUser } from '@/lib/user-cache';
import { levelProgress } from '@/lib/level';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { prefetchCatalog } from '@/lib/shop/previewCache';
import type { ShopItem } from '@/lib/shop/types';
import styles from './LevelProgressionBanner.module.css';

const MASCOT_SRC = '/User onbarding Assets/Step_7_tey_verified_state.webp';
const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const RING = { size: 64, stroke: 5 };
const noopSubscribe = () => () => {};

const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function LevelProgressionBanner() {
  const { xp, profileLoaded } = useGamification();
  const { me, avatarUrl: resolvedAvatarUrl } = useMe();
  const hydrated = useHydrated();

  // The cached avatar paints before /api/auth/me lands; the server snapshot
  // is null so hydration stays in step.
  const cachedAvatar = useSyncExternalStore(noopSubscribe, () => getCachedUser()?.avatarUrl ?? null, () => null);
  const avatarUrl = resolvedAvatarUrl !== undefined ? resolvedAvatarUrl : cachedAvatar;
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const showAvatar = Boolean(avatarUrl) && failedUrl !== avatarUrl;
  const firstName = ((me?.fullName as string | undefined) ?? '').split(' ')[0] || 'You';

  const { level, inLevel, target, toNext, percent } = levelProgress(xp);

  // ── Today and this week (Sunday-first, like the level page) ──
  const { data: profile } = useSWR<{ studentProfile?: { dailyGoalXp?: number } }>('/api/profile', fetcher);
  const now = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - now.getDay() + i);
    return d;
  });
  const thisMonth = monthOf(now);
  const startsLastMonth = monthOf(week[0]) !== thisMonth;
  const cal = useStreakCalendar(thisMonth);
  const prevCal = useStreakCalendar(startsLastMonth ? shiftMonth(thisMonth, -1) : thisMonth);
  const xpByDay = new Map<string, number>();
  if (hydrated) {
    for (const d of [...(prevCal.data?.days ?? []), ...(cal.data?.days ?? [])]) xpByDay.set(d.date, d.xpEarned);
  }
  const weekXp = week.map((d) => xpByDay.get(dayKey(d)) ?? 0);
  const todayIndex = now.getDay();
  const todayXp = weekXp[todayIndex];
  const goal = hydrated ? profile?.studentProfile?.dailyGoalXp ?? null : null;
  const goalMet = goal !== null && todayXp >= goal;
  const weekMax = Math.max(goal ?? 0, ...weekXp, 10);
  const haveWeek = hydrated && Boolean(cal.data);

  // ── What the next level unlocks ──
  const [levelItems, setLevelItems] = useState<ShopItem[] | null>(null);
  useEffect(() => {
    let live = true;
    prefetchCatalog()
      .then((c) => {
        if (live) setLevelItems(c.categories.flatMap((cat) => cat.items).filter((it) => it.unlock.label.startsWith('Reach level')));
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, []);
  const nextReward = useMemo(() => {
    const ahead = (levelItems ?? []).filter((it) => it.unlock.target > level).sort((a, b) => a.unlock.target - b.unlock.target);
    return ahead[0] ?? null;
  }, [levelItems, level]);

  if (!profileLoaded) {
    return (
      <div className={`${styles.card} ${styles.loading}`} aria-busy="true" aria-label="Loading your level">
        <div className={styles.head}>
          <span className={`${styles.skel} ${styles.skelRing}`} />
          <span className={styles.skelLines}>
            <span className={styles.skel} style={{ width: '55%' }} />
            <span className={styles.skel} style={{ width: '80%' }} />
          </span>
        </div>
        <span className={styles.skel} style={{ height: 40 }} />
      </div>
    );
  }

  const r = (RING.size - RING.stroke) / 2;
  const circ = 2 * Math.PI * r;
  const almost = toNext <= Math.ceil(target * 0.2);

  return (
    <Link
      href="/dashboard/level"
      className={styles.card}
      aria-label={`Level ${level}: ${toNext} XP to level ${level + 1}. See your progress`}
      onClick={() => playSound('navTap', 4)}
    >
      <div className={styles.head}>
        <span className={styles.ringWrap} style={{ width: RING.size, height: RING.size }}>
          <svg className={styles.ring} width={RING.size} height={RING.size} viewBox={`0 0 ${RING.size} ${RING.size}`} aria-hidden>
            <circle className={styles.ringTrack} cx={RING.size / 2} cy={RING.size / 2} r={r} strokeWidth={RING.stroke} />
            <circle
              className={`${styles.ringFill} ${almost ? styles.ringAlmost : ''}`}
              cx={RING.size / 2}
              cy={RING.size / 2}
              r={r}
              strokeWidth={RING.stroke}
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - Math.max(0.02, percent / 100))}
            />
          </svg>
          <span className={styles.avatar}>
            {showAvatar ? (
              <Image src={avatarUrl!} alt="" width={48} height={48} className={styles.avatarImg} onError={() => setFailedUrl(avatarUrl)} priority />
            ) : (
              <Image src={MASCOT_SRC} alt="" width={42} height={42} className={styles.mascotImg} priority />
            )}
          </span>
          <span className={styles.levelChip}>{level}</span>
        </span>

        <span className={styles.who}>
          <span className={styles.name}>{firstName}</span>
          <span className={styles.toNext}>
            {almost ? (
              <>
                <strong>{toNext} XP</strong> to level {level + 1}. Nearly there
              </>
            ) : (
              <>
                Level {level} · <strong>{toNext} XP</strong> to level {level + 1}
              </>
            )}
          </span>
          <span className={styles.levelBar} aria-hidden>
            <span className={styles.levelBarFill} style={{ width: `${Math.max(3, percent)}%` }} />
          </span>
          <span className={styles.levelNums}>
            {inLevel} / {target} XP
          </span>
        </span>
        <Glyph name="chevron" size={18} className={styles.chev} />
      </div>

      <div className={styles.today}>
        <div className={styles.todayHead}>
          <span className={styles.todayLabel}>
            <Glyph name={goalMet ? 'checkCircle' : 'bolt'} size={14} strokeWidth={2.6} /> Today
          </span>
          <span className={`${styles.todayNum} ${goalMet ? styles.todayMet : ''}`}>
            {todayXp}
            {goal !== null ? ` / ${goal}` : ''} XP
          </span>
        </div>
        <div className={styles.week} aria-label={`This week: ${weekXp.join(', ')} XP`}>
          {weekXp.map((v, i) => {
            const future = i > todayIndex;
            const met = goal !== null && v >= goal;
            return (
              <span key={i} className={styles.dayCol}>
                <span className={styles.dayTrack}>
                  <span
                    className={`${styles.dayBar} ${i === todayIndex ? styles.dayToday : ''} ${met ? styles.dayMet : ''}`}
                    style={{ height: haveWeek && !future ? `${Math.max(v > 0 ? 12 : 0, (v / weekMax) * 100)}%` : 0 }}
                  />
                </span>
                <span className={`${styles.dayLetter} ${i === todayIndex ? styles.dayLetterToday : ''}`}>{DAY_LETTERS[i]}</span>
              </span>
            );
          })}
        </div>
      </div>

      {nextReward && (
        <div className={styles.next}>
          <ShopItemArt art={nextReward.art} category={nextReward.category} rarity={nextReward.rarity} size="sm" locked />
          <span className={styles.nextText}>
            <span className={styles.nextLabel}>Level {nextReward.unlock.target} unlocks</span>
            <span className={styles.nextName}>{nextReward.name}</span>
          </span>
        </div>
      )}
    </Link>
  );
}
