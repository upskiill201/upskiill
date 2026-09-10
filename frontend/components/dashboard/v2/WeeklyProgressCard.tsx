'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { playHaptic } from '@/lib/haptics';
import { useHerald } from '@/context/HeraldContext';
import { useGamification } from '@/context/GamificationContext';
import { fetcher } from '@/lib/swr';
import styles from './WeeklyProgressCard.module.css';

interface DailyBlock {
  day: string;
  date: string;
  isCompleted: boolean;
  isToday: boolean;
  isFuture: boolean;
  lessonsCompleted: number;
  xpEarned: number;
}

interface WeeklyProgressData {
  weekRange: { start: string; end: string; label: string };
  progress: { daysLearned: number; totalDays: number; completionPercentage: number };
  dailyBlocks: DailyBlock[];
  currentStreak: number;
}

// Generate fallback weekly structure if backend API fails or returns unauthenticated
const getFallbackWeeklyData = (fallbackStreak = 0): WeeklyProgressData => {
  const now = new Date();
  const day = now.getDay();
  const diffToMon = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMon);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayStr = now.toISOString().split('T')[0];

  const dailyBlocks: DailyBlock[] = days.map((dName, idx) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + idx);
    const dateStr = d.toISOString().split('T')[0];
    const isToday = dateStr === todayStr;
    const isFuture = dateStr > todayStr;

    return {
      day: dName,
      date: dateStr,
      isCompleted: false,
      isToday,
      isFuture,
      lessonsCompleted: 0,
      xpEarned: 0,
    };
  });

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const label = `${monday.toLocaleDateString('en-US', opts)} – ${sunday.toLocaleDateString('en-US', opts)}`;

  return {
    weekRange: {
      start: monday.toISOString().split('T')[0],
      end: sunday.toISOString().split('T')[0],
      label,
    },
    progress: {
      daysLearned: 0,
      totalDays: 7,
      completionPercentage: 0,
    },
    dailyBlocks,
    currentStreak: fallbackStreak,
  };
};

export default function WeeklyProgressCard() {
  const router = useRouter();
  const { streakDays } = useGamification();
  const { registerNativeWidget, unregisterNativeWidget } = useHerald();

  // Register this widget as visible — Herald suppresses weekly progress floating banner when this card is on screen
  useEffect(() => {
    registerNativeWidget('weekly-progress');
    return () => unregisterNativeWidget('weekly-progress');
  }, [registerNativeWidget, unregisterNativeWidget]);

  // Shared SWR cache (lib/swr.ts), same key HeraldContext's claimables sweep
  // already polls. Reading it directly via useSWR (instead of the previous
  // setData(await mutate(key, fetcher(key)))) means this card now also
  // benefits from Herald's background updates and paints from cache on a
  // revisit instead of re-flashing its skeleton on every mount.
  const endpoint = `/api/v2/progress/weekly?timezoneOffset=${new Date().getTimezoneOffset()}`;
  const { data, isLoading } = useSWR<WeeklyProgressData>(endpoint, fetcher);
  const loading = isLoading;

  const handleViewMore = () => {
    playHaptic('medium');
    router.push('/dashboard/profile/analytics');
  };

  const handleBlockHover = () => {
    playHaptic('light');
  };

  // Render skeleton strictly during active loading phase only
  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.topRow}>
          <div className={styles.titleGroup}>
            <h3 className={styles.header}>WEEKLY PROGRESS</h3>
            <span className={styles.subHeader} style={{ opacity: 0.5 }}>Loading...</span>
          </div>
          <div className={styles.skeleton} style={{ height: 20, width: 44, borderRadius: 6 }} />
        </div>
        <div className={styles.statRow}>
          <div className={styles.skeleton} style={{ height: 16, width: 140, borderRadius: 4 }} />
        </div>
        <div className={styles.dayLabels}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className={styles.heatmapContainer}>
          <div className={styles.heatmapGrid}>
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className={`${styles.dotCell} ${styles.skeleton}`} />
            ))}
          </div>
        </div>
        <div className={styles.bottomRow}>
          <div className={styles.skeleton} style={{ height: 16, width: 110, borderRadius: 4 }} />
          <div className={styles.skeleton} style={{ height: 16, width: 75, borderRadius: 4 }} />
        </div>
      </div>
    );
  }

  const activeData = data && data.dailyBlocks ? data : getFallbackWeeklyData(streakDays);
  const { weekRange, progress, dailyBlocks } = activeData;
  const displayStreak = activeData.currentStreak || streakDays || 0;

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.titleGroup}>
          <h3 className={styles.header}>WEEKLY PROGRESS</h3>
          <span className={styles.subHeader}>{weekRange.label}</span>
        </div>

        <span className={styles.pctBadge}>{progress.completionPercentage}%</span>
      </div>

      <div className={styles.statRow}>
        <span className={styles.statText}>
          {progress.daysLearned} of {progress.totalDays} learning days
        </span>
      </div>

      <div className={styles.dayLabels}>
        {dailyBlocks.map((block) => (
          <span key={`label-${block.date}`}>
            {block.day.charAt(0)}
          </span>
        ))}
      </div>

      {/* 7-Day Heatmap Grid */}
      <div className={styles.heatmapContainer}>
        <div className={styles.heatmapGrid}>
          {dailyBlocks.map((block) => (
            <div
              key={block.date}
              onMouseEnter={handleBlockHover}
              title={
                block.isCompleted
                  ? `${block.day} (${block.date}): ${block.lessonsCompleted} lesson${block.lessonsCompleted !== 1 ? 's' : ''} completed · +${block.xpEarned} XP`
                  : block.isToday
                  ? `${block.day} (Today): No lesson yet`
                  : block.isFuture
                  ? `${block.day}: Upcoming`
                  : `${block.day}: No activity`
              }
              className={[
                styles.dotCell,
                block.isCompleted ? styles.dotActive : '',
                block.isToday ? styles.dotToday : '',
                !block.isCompleted && !block.isToday ? styles.dotEmpty : '',
              ].filter(Boolean).join(' ')}
            />
          ))}
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.streakWrapper}>
          <Image src="/Icons/burn.png" alt="Streak" width={18} height={18} />
          <span className={styles.streakText}>
            {displayStreak} Day{displayStreak !== 1 ? 's' : ''} Streak
          </span>
        </div>

        <button type="button" className={styles.viewMoreBtn} onClick={handleViewMore} aria-label="View learning analytics">
          <span>Analytics</span>
          <ChevronRight size={15} className={styles.chevronIcon} />
        </button>
      </div>
    </div>
  );
}
