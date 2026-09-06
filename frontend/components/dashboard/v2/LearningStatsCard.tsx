'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import {
  FaChartSimple,
  FaBullseye,
  FaClock,
  FaGraduationCap,
  FaTrophy,
  FaChevronRight,
  FaXmark,
  FaArrowRotateRight,
  FaCalendarDays,
  FaMedal,
  FaCoins,
  FaFire,
} from 'react-icons/fa6';
import { playHaptic } from '@/lib/haptics';
import { useGamification } from '@/context/GamificationContext';
import styles from './LearningStatsCard.module.css';

interface DayActivity {
  day: string;
  date: string;
  xp: number;
  lessonsCompleted: number;
  hasStreak: boolean;
  isToday: boolean;
}

interface StatsSummary {
  lessonsCompleted: number;
  hoursLearned: string;
  xpEarned: number;
  totalXp: number;
  weeklyXp: number;
  weeklyTarget: number;
  activeDays: number;
  coursesCompleted: number;
  /** Real Apply-phase quiz average (0–100) or null when no scored quiz yet. */
  accuracyRate: number | null;
  rankPercentile: string;
}

interface CalendarDay {
  date: string;
  dayNumber: number;
  lessonsCompleted: number;
  xpEarned: number;
  isCompleted: boolean;
  isToday: boolean;
  isFuture: boolean;
  isFreezeUsed: boolean;
}

const EMPTY_STATS: StatsSummary = {
  lessonsCompleted: 0,
  hoursLearned: '0m',
  xpEarned: 0,
  totalXp: 0,
  weeklyXp: 0,
  weeklyTarget: 300,
  activeDays: 0,
  coursesCompleted: 0,
  accuracyRate: null,
  rankPercentile: '—',
};

const EMPTY_WEEK: DayActivity[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => ({
  day,
  date: '',
  xp: 0,
  lessonsCompleted: 0,
  hasStreak: false,
  isToday: false,
}));

/** Minimum gap between background refetches triggered by events/focus. */
const REFETCH_THROTTLE_MS = 4000;

export default function LearningStatsCard() {
  const { xp, streakDays, longestStreak } = useGamification();
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [stats, setStats] = useState<StatsSummary>(EMPTY_STATS);
  const [weekActivity, setWeekActivity] = useState<DayActivity[]>(EMPTY_WEEK);
  /** True only until the first payload for the current filter arrives. */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const lastFetchAtRef = useRef(0);
  const filterRef = useRef(timeFilter);
  filterRef.current = timeFilter;

  const fetchStats = useCallback(async (filter: 'week' | 'month' | 'all', opts?: { silent?: boolean }) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (!opts?.silent) {
      setLoading(true);
    }
    try {
      const offset = new Date().getTimezoneOffset();
      const res = await fetch(
        `/api/v2/progress/stats-summary?filter=${filter}&timezoneOffset=${offset}`,
        { credentials: 'include', signal: controller.signal }
      );

      if (!res.ok) {
        throw new Error(`Stats request failed (${res.status})`);
      }

      const data = await res.json();
      setStats({
        lessonsCompleted: data.lessonsCompleted ?? 0,
        hoursLearned: data.hoursLearned ?? '0m',
        xpEarned: data.xpEarned ?? 0,
        totalXp: data.totalXp ?? data.xpEarned ?? 0,
        weeklyXp: data.weeklyXp ?? 0,
        weeklyTarget: data.weeklyTarget ?? 300,
        activeDays: data.activeDays ?? 0,
        coursesCompleted: data.coursesCompleted ?? 0,
        accuracyRate: data.accuracyRate ?? null,
        rankPercentile: data.rankPercentile ?? '—',
      });

      if (Array.isArray(data.weekActivity) && data.weekActivity.length > 0) {
        setWeekActivity(data.weekActivity);
      } else {
        setWeekActivity(EMPTY_WEEK);
      }
      setError(null);
      lastFetchAtRef.current = Date.now();
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      console.error('Failed to fetch learning stats:', err);
      setError('Could not load your stats. Check your connection and try again.');
    } finally {
      if (abortRef.current === controller) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchStats(timeFilter);

    // Background refresh whenever the user finishes a lesson or returns to the tab.
    // Throttled so celebration particle bursts + focus don't hammer the endpoint.
    const handleRefresh = () => {
      if (Date.now() - lastFetchAtRef.current < REFETCH_THROTTLE_MS) return;
      fetchStats(filterRef.current, { silent: true });
    };
    window.addEventListener('rewardrun:particle-land', handleRefresh);
    window.addEventListener('focus', handleRefresh);

    return () => {
      window.removeEventListener('rewardrun:particle-land', handleRefresh);
      window.removeEventListener('focus', handleRefresh);
      abortRef.current?.abort();
    };
  }, [timeFilter, fetchStats]);

  const handleTabClick = (filter: 'week' | 'month' | 'all') => {
    playHaptic('light');
    setTimeFilter(filter);
  };

  const handleRetry = () => {
    playHaptic('light');
    fetchStats(timeFilter);
  };

  const maxXp = Math.max(...weekActivity.map((d) => d.xp), 40);

  const accuracyDisplay =
    stats.accuracyRate !== null && stats.accuracyRate !== undefined ? `${stats.accuracyRate}%` : '—';

  const filterSubLabel =
    timeFilter === 'week' ? 'This week' : timeFilter === 'month' ? 'This month' : 'Lifetime';

  // Dynamic Tey Coach message based on real stats
  const getCoachMessage = () => {
    if (stats.lessonsCompleted === 0) {
      return 'Complete your first lesson today to activate your streak and climb the leaderboard!';
    }
    if (stats.weeklyXp >= stats.weeklyTarget) {
      return 'Incredible work! You crushed your weekly XP goal! Claim your glory!';
    }
    return `You're only ${stats.weeklyTarget - stats.weeklyXp} XP away from this week's Mystery Chest milestone! Keep pushing!`;
  };

  return (
    <div className={styles.card}>
      {/* Header Row */}
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <FaChartSimple className={styles.headerIcon} />
          <h3 className={styles.title}>LEARNING STATS</h3>
        </div>

        {/* 3D Segmented Filter Switch */}
        <div className={styles.segmentedSwitch} role="tablist" aria-label="Stats time range">
          <button
            type="button"
            role="tab"
            aria-selected={timeFilter === 'week'}
            className={`${styles.switchTab} ${timeFilter === 'week' ? styles.switchTabActive : ''}`}
            onClick={() => handleTabClick('week')}
          >
            Week
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={timeFilter === 'month'}
            className={`${styles.switchTab} ${timeFilter === 'month' ? styles.switchTabActive : ''}`}
            onClick={() => handleTabClick('month')}
          >
            Month
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={timeFilter === 'all'}
            className={`${styles.switchTab} ${timeFilter === 'all' ? styles.switchTabActive : ''}`}
            onClick={() => handleTabClick('all')}
          >
            All
          </button>
        </div>
      </div>

      {/* Inline error with retry — keeps the header usable while data is down */}
      {error && !loading && (
        <div className={styles.errorBox} role="alert">
          <span className={styles.errorText}>{error}</span>
          <button type="button" className={styles.retryBtn} onClick={handleRetry}>
            <FaArrowRotateRight size={11} />
            Retry
          </button>
        </div>
      )}

      {/* 7-Day Activity Pillar Histogram */}
      <div className={styles.activitySection}>
        <div className={styles.activityHeader}>
          <span>This Week&apos;s Activity</span>
          <span style={{ color: '#0172FD' }}>{stats.weeklyXp} XP EARNED</span>
        </div>

        <div className={styles.activityDaysGrid}>
          {(loading ? EMPTY_WEEK : weekActivity).map((item, idx) => {
            const fillHeightPct = item.xp > 0 ? Math.max(15, Math.min(100, Math.round((item.xp / maxXp) * 100))) : 8;
            return (
              <div
                key={idx}
                className={styles.dayColumn}
                onMouseEnter={() => setActiveTooltip(idx)}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => {
                  playHaptic('light');
                  setActiveTooltip(activeTooltip === idx ? null : idx);
                }}
              >
                {/* Micro-Tooltip */}
                {activeTooltip === idx && !loading && (
                  <div className={styles.barTooltip}>
                    {item.xp > 0 ? `${item.xp} XP • ${item.lessonsCompleted} ${item.lessonsCompleted === 1 ? 'lesson' : 'lessons'}` : 'No lessons yet'}
                  </div>
                )}

                {/* Streak Burn Icon for active days */}
                {item.hasStreak && !loading && (
                  <div className={styles.dayStreakIcon}>
                    <Image
                      src="/Icons/burn.png"
                      alt="Active Streak"
                      width={16}
                      height={16}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}

                {/* Pillar Track & Fill */}
                <div className={styles.dayBarTrack}>
                  {loading ? (
                    <div className={styles.dayBarSkeleton} />
                  ) : (
                    <div
                      className={`${styles.dayBarFill} ${item.isToday ? styles.dayBarFillToday : ''}`}
                      style={{ height: `${fillHeightPct}%` }}
                    />
                  )}
                </div>

                <span
                  className={`${styles.dayLabel} ${item.isToday && !loading ? styles.dayLabelToday : ''}`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2x2 Metric Tiles */}
      <div className={styles.statsGrid}>
        {/* Tile 1: Accuracy & Mastery */}
        <div className={styles.statTile}>
          <div className={styles.tileIcon} style={{ background: '#ECFDF5', color: '#10B981' }}>
            <FaBullseye />
          </div>
          <div className={styles.tileContent}>
            <span className={styles.tileLabel}>Accuracy</span>
            {loading ? (
              <span className={`${styles.skeletonLine} ${styles.skeletonValue}`} />
            ) : (
              <span className={styles.tileValue}>{accuracyDisplay}</span>
            )}
            <span className={styles.tileSub}>
              {stats.accuracyRate == null && !loading ? 'Take a quiz to measure' : 'Quiz retention'}
            </span>
          </div>
        </div>

        {/* Tile 2: Time Studied */}
        <div className={styles.statTile}>
          <div className={styles.tileIcon} style={{ background: '#F0FDFA', color: '#0D9488' }}>
            <FaClock />
          </div>
          <div className={styles.tileContent}>
            <span className={styles.tileLabel}>Study Time</span>
            {loading ? (
              <span className={`${styles.skeletonLine} ${styles.skeletonValue}`} />
            ) : (
              <span className={styles.tileValue}>{stats.hoursLearned}</span>
            )}
            <span className={styles.tileSub}>{filterSubLabel}</span>
          </div>
        </div>

        {/* Tile 3: Lessons Completed */}
        <div className={styles.statTile}>
          <div className={styles.tileIcon} style={{ background: '#EFF6FF', color: '#0172FD' }}>
            <FaGraduationCap />
          </div>
          <div className={styles.tileContent}>
            <span className={styles.tileLabel}>Lessons</span>
            {loading ? (
              <span className={`${styles.skeletonLine} ${styles.skeletonValue}`} />
            ) : (
              <span className={styles.tileValue}>{stats.lessonsCompleted}</span>
            )}
            <span className={styles.tileSub}>Completed</span>
          </div>
        </div>

        {/* Tile 4: League Standing */}
        <div className={styles.statTile}>
          <div className={styles.tileIcon} style={{ background: '#FEFCE8', color: '#EAB308' }}>
            <FaTrophy />
          </div>
          <div className={styles.tileContent}>
            <span className={styles.tileLabel}>Standing</span>
            {loading ? (
              <span className={`${styles.skeletonLine} ${styles.skeletonValue}`} />
            ) : (
              <span className={styles.tileValue}>{stats.rankPercentile}</span>
            )}
            <span className={styles.tileSub}>Global rank</span>
          </div>
        </div>
      </div>

      {/* Tey Coach Smart AI Insight Callout */}
      <div className={styles.coachBanner}>
        <div className={styles.coachAvatarWrapper}>
          <Image
            src="/dashboard tey.webp"
            alt="Tey Coach"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <p className={styles.coachText}>{loading ? 'Crunching your learning numbers…' : getCoachMessage()}</p>
      </div>

      {/* 3D Deep Analytics Button */}
      <button
        type="button"
        onClick={() => {
          playHaptic('medium');
          setShowDetailModal(true);
        }}
        className={styles.viewMoreBtn}
      >
        <span>View Detailed Insights</span>
        <FaChevronRight size={12} />
      </button>

      {/* Detailed Insights Modal */}
      {showDetailModal && (
        <DetailedInsightsModal
          stats={stats}
          timeFilter={timeFilter}
          xp={xp}
          streakDays={streakDays}
          longestStreak={longestStreak}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
}

// ─── Detailed Insights Modal ─────────────────────────────────────────────────

interface DetailedInsightsModalProps {
  stats: StatsSummary;
  timeFilter: 'week' | 'month' | 'all';
  xp: number;
  streakDays: number;
  longestStreak: number;
  onClose: () => void;
}

const DetailedInsightsModal: React.FC<DetailedInsightsModalProps> = ({
  stats,
  timeFilter,
  xp,
  streakDays,
  longestStreak,
  onClose,
}) => {
  const [calendar, setCalendar] = useState<CalendarDay[] | null>(null);
  const [calendarError, setCalendarError] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Fetch the current-month activity calendar when the modal opens
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const offset = new Date().getTimezoneOffset();
        const res = await fetch(
          `/api/streak/calendar?month=${month}&timezoneOffset=${offset}`,
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error(`Calendar failed (${res.status})`);
        const data = await res.json();
        if (!cancelled) {
          setCalendar(Array.isArray(data.days) ? data.days : []);
          setCalendarError(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch streak calendar:', err);
          setCalendarError(true);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const target = stats.weeklyTarget || 300;
  const goalPct = Math.min(100, Math.round((stats.weeklyXp / target) * 100));

  // Calendar grid layout: pad the 1st to its weekday (Monday-first)
  const firstDow = calendar && calendar.length > 0
    ? (new Date(`${calendar[0].date}T00:00:00Z`).getUTCDay() + 6) % 7
    : 0;
  const monthXp = (calendar ?? []).reduce((acc, d) => acc + (d.xpEarned || 0), 0);
  const monthActiveDays = (calendar ?? []).filter((d) => d.isCompleted).length;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Deep learning insights"
      >
        <button
          type="button"
          className={styles.modalCloseBtn}
          onClick={onClose}
          aria-label="Close insights"
        >
          <FaXmark size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaChartSimple style={{ color: '#0172FD', fontSize: 20 }} />
          <h2 style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', margin: 0 }}>
            DEEP LEARNING INSIGHTS
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Streak Milestone */}
          <div
            style={{
              background: '#FFF7ED',
              border: '1.5px solid #FED7AA',
              borderRadius: 16,
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <Image src="/Icons/burn.png" alt="Streak" width={40} height={40} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#C2410C' }}>
                CURRENT STREAK
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#9A3412' }}>
                {streakDays || 0} {streakDays === 1 ? 'Day' : 'Days'} Active
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#EA580C' }}>
                Personal best record: {longestStreak || streakDays || 0} days
              </div>
            </div>
          </div>

          {/* Weekly XP Goal Bar (dynamic target) */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: 16,
              padding: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
                Weekly Goal: {target} XP
              </span>
              <span style={{ fontSize: 13, fontWeight: 900, color: '#0172FD' }}>
                {stats.weeklyXp} / {target} XP
              </span>
            </div>
            <div
              style={{
                height: 12,
                background: '#E2E8F0',
                borderRadius: 9999,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${goalPct}%`,
                  background: '#0172FD',
                  borderRadius: 9999,
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', margin: '8px 0 0' }}>
              {stats.weeklyXp >= target
                ? 'Goal achieved! You unlocked this week\'s Golden Chest!'
                : `Reach ${target} XP this week to unlock the Golden Mystery Chest!`}
            </p>
          </div>

          {/* This Month Activity Heatmap (live from /streak/calendar) */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: 16,
              padding: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FaCalendarDays style={{ color: '#0172FD' }} />
                This Month
              </span>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#0172FD' }}>
                {calendar ? `${monthXp} XP • ${monthActiveDays} active ${monthActiveDays === 1 ? 'day' : 'days'}` : ''}
              </span>
            </div>

            {calendarError ? (
              <p style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', margin: 0 }}>
                Calendar unavailable right now.
              </p>
            ) : !calendar ? (
              <div className={styles.calSkeletonGrid}>
                {Array.from({ length: 35 }).map((_, i) => (
                  <span key={i} className={styles.calSkeletonDay} />
                ))}
              </div>
            ) : (
              <>
                <div className={styles.calWeekdayRow}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <span key={i} className={styles.calWeekday}>{d}</span>
                  ))}
                </div>
                <div className={styles.calGrid}>
                  {Array.from({ length: firstDow }).map((_, i) => (
                    <span key={`pad-${i}`} />
                  ))}
                  {calendar.map((day) => (
                    <div
                      key={day.date}
                      title={
                        day.xpEarned > 0 || day.lessonsCompleted > 0
                          ? `${day.date}: ${day.xpEarned} XP • ${day.lessonsCompleted} ${day.lessonsCompleted === 1 ? 'lesson' : 'lessons'}`
                          : `${day.date}: no activity`
                      }
                      className={[
                        styles.calDay,
                        day.isCompleted ? styles.calDayActive : '',
                        day.isFreezeUsed ? styles.calDayFreeze : '',
                        day.isFuture ? styles.calDayFuture : '',
                        day.isToday ? styles.calDayToday : '',
                      ].join(' ')}
                    >
                      {day.dayNumber}
                    </div>
                  ))}
                </div>
                <div className={styles.calLegend}>
                  <span className={styles.calLegendItem}>
                    <span className={`${styles.calLegendDot} ${styles.calLegendActive}`} /> Learned
                  </span>
                  <span className={styles.calLegendItem}>
                    <span className={`${styles.calLegendDot} ${styles.calLegendFreeze}`} /> Streak freeze
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Snapshot Rows — period stats + lifetime totals */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: 16,
              padding: 6,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className={styles.insightRow}>
              <span className={styles.insightLabel}>
                <FaGraduationCap style={{ color: '#0172FD' }} /> Lessons completed
              </span>
              <span className={styles.insightValue}>
                {stats.lessonsCompleted}
                <span className={styles.insightSub}> {timeFilter === 'week' ? 'this week' : timeFilter === 'month' ? 'this month' : 'all time'}</span>
              </span>
            </div>
            <div className={styles.insightRow}>
              <span className={styles.insightLabel}>
                <FaClock style={{ color: '#0D9488' }} /> Time studied
              </span>
              <span className={styles.insightValue}>
                {stats.hoursLearned}
                <span className={styles.insightSub}> {timeFilter === 'week' ? 'this week' : timeFilter === 'month' ? 'this month' : 'all time'}</span>
              </span>
            </div>
            <div className={styles.insightRow}>
              <span className={styles.insightLabel}>
                <FaBullseye style={{ color: '#10B981' }} /> Accuracy
              </span>
              <span className={styles.insightValue}>
                {stats.accuracyRate != null ? `${stats.accuracyRate}%` : '—'}
                <span className={styles.insightSub}> {stats.accuracyRate != null ? 'quiz average' : 'no quizzes yet'}</span>
              </span>
            </div>
            <div className={styles.insightRow}>
              <span className={styles.insightLabel}>
                <FaMedal style={{ color: '#EAB308' }} /> Courses finished
              </span>
              <span className={styles.insightValue}>{stats.coursesCompleted}</span>
            </div>
            <div className={styles.insightRow}>
              <span className={styles.insightLabel}>
                <FaFire style={{ color: '#EA580C' }} /> Active days
              </span>
              <span className={styles.insightValue}>
                {stats.activeDays}
                <span className={styles.insightSub}> {timeFilter === 'week' ? 'this week' : timeFilter === 'month' ? 'this month' : 'all time'}</span>
              </span>
            </div>
            <div className={styles.insightRow}>
              <span className={styles.insightLabel}>
                <FaCoins style={{ color: '#0172FD' }} /> Lifetime XP
              </span>
              <span className={styles.insightValue}>{stats.totalXp || xp}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            background: '#0172FD',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: 15,
            padding: '14px',
            borderRadius: 14,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(1, 114, 253, 0.35)',
          }}
        >
          GOT IT!
        </button>
      </div>
    </div>
  );
};
