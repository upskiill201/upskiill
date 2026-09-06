'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Flame, Award, Calendar, CheckCircle2, TrendingUp, Clock, Zap } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import styles from './Analytics.module.css';

interface DailyBlock {
  day: string;
  date: string;
  isCompleted: boolean;
  isToday: boolean;
  isFuture: boolean;
  lessonsCompleted: number;
  xpEarned: number;
  timeSpentSeconds: number;
  streakExtended: boolean;
}

interface WeeklyData {
  weekRange: { start: string; end: string; label: string };
  progress: { daysLearned: number; totalDays: number; completionPercentage: number };
  dailyBlocks: DailyBlock[];
  currentStreak: number;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [weeklyData, setWeeklyData] = useState<WeeklyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const offset = new Date().getTimezoneOffset();
        const res = await fetch(`/api/v2/progress/weekly?timezoneOffset=${offset}`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setWeeklyData(data);
        }
      } catch (err) {
        console.error('Analytics page fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const handleBack = () => {
    playHaptic('light');
    router.push('/dashboard');
  };

  // Generate 12-week heatmap mock blocks with deterministic pattern
  const generateMatrix = () => {
    const cols = [];
    for (let col = 0; col < 12; col++) {
      const cells = [];
      for (let row = 0; row < 7; row++) {
        // Pseudo activity pattern
        const val = (col * 3 + row * 7) % 5;
        let levelClass = '';
        if (val === 1) levelClass = styles.cellLevel1;
        if (val === 2) levelClass = styles.cellLevel2;
        if (val >= 3) levelClass = styles.cellLevel3;
        cells.push({ id: `${col}-${row}`, levelClass });
      }
      cols.push(cells);
    }
    return cols;
  };

  const matrixData = generateMatrix();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Learning Analytics</h1>
          <p className={styles.subtitle}>Track your weekly progress, streaks, and skill velocity</p>
        </div>
        <button type="button" className={styles.backBtn} onClick={handleBack}>
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className={styles.gridTwoCol}>
        {/* Weekly Progress Detail */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>Weekly Progress Detail</span>
            <span className={styles.badge}>{weeklyData?.weekRange?.label || 'Current Week'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A' }}>
                {weeklyData?.progress?.daysLearned ?? 0} / 7 Days
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', fontWeight: 600 }}>
                {weeklyData?.progress?.completionPercentage ?? 0}% completed this week
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#FFF7ED', border: '1.5px solid #FFEDD5', padding: '0.5rem 0.85rem', borderRadius: '0.75rem' }}>
              <Image src="/Icons/burn.png" alt="Streak" width={22} height={22} />
              <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#FF9600' }}>
                {weeklyData?.currentStreak ?? 0} Day Streak
              </span>
            </div>
          </div>

          {/* 7 Days Grid */}
          <div className={styles.weekDaysGrid}>
            {weeklyData?.dailyBlocks.map((block) => (
              <div
                key={block.date}
                className={[
                  styles.dayCard,
                  block.isCompleted ? styles.dayCardActive : '',
                  block.isToday ? styles.dayCardToday : '',
                ].join(' ')}
                title={
                  block.isCompleted
                    ? `${block.day}: ${block.lessonsCompleted} lesson(s) · ${block.xpEarned} XP`
                    : block.isToday
                    ? `${block.day}: Today (Pending)`
                    : `${block.day}: No activity`
                }
                onClick={() => playHaptic('light')}
              >
                <span className={styles.dayName}>{block.day}</span>
                <span className={styles.dayDate}>{block.date.split('-')[2]}</span>
                <span className={styles.dayStatusIcon}>
                  {block.isCompleted ? '🔥' : block.isToday ? '🎯' : '⚪'}
                </span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0.5rem 0 0', fontWeight: 600 }}>
            💡 Completing at least 1 lesson per day lights up your daily block and extends your streak.
          </p>
        </div>

        {/* Quick Stats Summary */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>Skill Velocity</span>
            <Zap size={20} color="#0172FD" />
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <TrendingUp size={20} color="#0172FD" />
              <span className={styles.statValue}>{weeklyData?.progress?.completionPercentage ?? 0}%</span>
              <span className={styles.statLabel}>Weekly Target</span>
            </div>
            <div className={styles.statBox}>
              <Flame size={20} color="#FF9600" />
              <span className={styles.statValue}>{weeklyData?.currentStreak ?? 0} Days</span>
              <span className={styles.statLabel}>Active Streak</span>
            </div>
            <div className={styles.statBox}>
              <Clock size={20} color="#8B5CF6" />
              <span className={styles.statValue}>
                {Math.round(((weeklyData?.progress?.daysLearned ?? 0) * 15))} min
              </span>
              <span className={styles.statLabel}>Time Spent</span>
            </div>
            <div className={styles.statBox}>
              <Award size={20} color="#22C55E" />
              <span className={styles.statValue}>
                {(weeklyData?.progress?.daysLearned ?? 0) * 10} XP
              </span>
              <span className={styles.statLabel}>XP Earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* 12-Week Skill Activity Heatmap */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <span>12-Week Skill Heatmap</span>
          <Calendar size={20} color="#64748B" />
        </div>

        <div className={styles.heatmapContainer}>
          <div className={styles.matrixGrid}>
            {matrixData.map((col, cIdx) => (
              <div key={cIdx} className={styles.matrixCol}>
                {col.map((cell) => (
                  <div
                    key={cell.id}
                    className={`${styles.matrixCell} ${cell.levelClass}`}
                    title="Learning Activity"
                  />
                ))}
              </div>
            ))}
          </div>

          <div className={styles.legend}>
            <span>Less</span>
            <div className={styles.legendBox} style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }} />
            <div className={styles.legendBox} style={{ background: '#93C5FD' }} />
            <div className={styles.legendBox} style={{ background: '#3B82F6' }} />
            <div className={styles.legendBox} style={{ background: '#1D4ED8' }} />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
