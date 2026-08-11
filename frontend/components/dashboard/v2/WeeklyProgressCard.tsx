'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { playHaptic } from '@/lib/haptics';
import { useHerald } from '@/context/HeraldContext';
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
const getFallbackWeeklyData = (): WeeklyProgressData => {
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
    currentStreak: 0,
  };
};

export default function WeeklyProgressCard() {
  const router = useRouter();
  const { registerNativeWidget, unregisterNativeWidget } = useHerald();
  const [data, setData] = useState<WeeklyProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  // Register this widget as visible — Herald suppresses weekly progress banner when this card is on screen
  useEffect(() => {
    registerNativeWidget('weekly-progress');
    return () => unregisterNativeWidget('weekly-progress');
  }, [registerNativeWidget, unregisterNativeWidget]);

  const fetchWeeklyProgress = useCallback(async () => {
    try {
      const offset = new Date().getTimezoneOffset();
      const res = await fetch(`/api/v2/progress/weekly?timezoneOffset=${offset}`, {
        credentials: 'include',
      });
      if (res.ok) {
        const json = await res.json();
        if (json && json.dailyBlocks) {
          setData(json);
          return;
        }
      }
      // If res is not ok or json is invalid, use fallback
      setData(getFallbackWeeklyData());
    } catch (err) {
      console.error('WeeklyProgressCard fetch error:', err);
      setData(getFallbackWeeklyData());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeeklyProgress();
  }, [fetchWeeklyProgress]);

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
            <span className={styles.subHeader} style={{ opacity: 0.4 }}>Loading...</span>
          </div>
          <div className={styles.dayLabels}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i} style={{ width: 18, textAlign: 'center' }}>{d}</span>
            ))}
          </div>
        </div>
        <div className={styles.statRow}>
          <div className={styles.skeleton} style={{ height: 16, width: 130, borderRadius: 4 }} />
          <div className={styles.skeleton} style={{ height: 16, width: 36, borderRadius: 4 }} />
        </div>
        <div className={styles.heatmapContainer}>
          <div className={styles.heatmapGrid}>
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className={`${styles.dotCell} ${styles.skeleton}`} />
            ))}
          </div>
        </div>
        <div className={styles.bottomRow}>
          <div className={styles.skeleton} style={{ height: 14, width: 100, borderRadius: 4 }} />
          <div className={styles.skeleton} style={{ height: 14, width: 70, borderRadius: 4 }} />
        </div>
      </div>
    );
  }

  const activeData = data || getFallbackWeeklyData();
  const { weekRange, progress, dailyBlocks, currentStreak } = activeData;

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.titleGroup}>
          <h3 className={styles.header}>WEEKLY PROGRESS</h3>
          <span className={styles.subHeader}>{weekRange.label}</span>
        </div>

        <div className={styles.dayLabels}>
          {dailyBlocks.map((block) => (
            <span key={block.date} style={{ width: '18px', textAlign: 'center' }}>
              {block.day.charAt(0)}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.statRow}>
        <span className={styles.statText}>
          {progress.daysLearned} of {progress.totalDays} learning days
        </span>
        <span className={styles.pctBadge}>{progress.completionPercentage}%</span>
      </div>

      {/* 7-Day Block Grid */}
      <div className={styles.heatmapContainer}>
        <div className={styles.heatmapGrid}>
          {dailyBlocks.map((block) => (
            <div
              key={block.date}
              onMouseEnter={handleBlockHover}
              title={
                block.isCompleted
                  ? `${block.day}: ${block.lessonsCompleted} lesson${block.lessonsCompleted !== 1 ? 's' : ''} · ${block.xpEarned} XP`
                  : block.isToday
                  ? `${block.day}: No lesson yet today`
                  : block.isFuture
                  ? `${block.day}: Upcoming`
                  : `${block.day}: No lesson`
              }
              className={[
                styles.dotCell,
                block.isCompleted
                  ? styles.dotActive
                  : block.isToday
                  ? styles.dotToday
                  : styles.dotEmpty,
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Image src="/Icons/burn.png" alt="Streak" width={18} height={18} />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FF9600' }}>
            {currentStreak} Day{currentStreak !== 1 ? 's' : ''} Streak
          </span>
        </div>

        <button type="button" className={styles.viewMoreBtn} onClick={handleViewMore}>
          <span>View More</span>
          <ChevronRight size={16} className={styles.chevronIcon} />
        </button>
      </div>
    </div>
  );
}
