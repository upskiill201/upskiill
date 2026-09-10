'use client';

/**
 * Hub → Engagement. How hard learners are actually working: activity and
 * XP trends, session averages, streak distribution, weekday habits.
 */

import { Activity, Timer, Zap } from 'lucide-react';
import { TrendChart, DistBars } from '../bits';
import styles from './hubtabs.module.css';interface EngagementPayload {
  isEmpty?: boolean;
  trends?: {
    date: string;
    activeUsers: number;
    minutes: number;
    xp: number;
    lessonsCompleted: number;
  }[];
  weekdayHeat?: { label: string; count: number }[];
  streakDistribution?: { label: string; count: number }[];
  averages?: {
    sessionsLast30: number;
    avgSessionsPerLearner: number;
    avgMinutesPerSession: number;
    minutesLast30: number;
    xpLast30: number;
    avgXpPerLearnerAllTime: number;
  };
}

const STREAK_COLORS = ['#afafaf', '#1cb0f6', '#ff9600', '#58cc02'];

export function EngagementTab({ data }: { data: EngagementPayload }) {
  if (data.isEmpty || !data.trends) {
    return (
      <div className={styles.emptyBox}>
        No learning activity yet. Engagement charts appear once students
        complete their first lessons.
      </div>
    );
  }

  const a = data.averages!;
  const asTrend = (key: 'activeUsers' | 'minutes' | 'xp') =>
    data.trends!.map((t) => ({ date: t.date, count: t[key] }));

  return (
    <div className={styles.hubTabRoot}>
      <h3 className={styles.sectionHeading}>Engagement</h3>
      <p className={styles.sectionSub}>
        Learning effort across all your courses over the last 30 days. An
        active day counts as one session.
      </p>

      <div className={styles.kpiGrid}>
        <div className={styles.mauTile}>
          <Activity size={20} color="#58cc02" />
          <span className={styles.mauValue}>{a.sessionsLast30.toLocaleString()}</span>
          <span className={styles.mauLabel}>Learning Sessions</span>
          <span className={styles.mauCaption}>active days, last 30</span>
        </div>
        <div className={styles.mauTile}>
          <Zap size={20} color="#ff9600" />
          <span className={styles.mauValue}>{a.avgSessionsPerLearner}</span>
          <span className={styles.mauLabel}>Sessions / Learner</span>
          <span className={styles.mauCaption}>last 30 days</span>
        </div>
        <div className={styles.mauTile}>
          <Timer size={20} color="#1cb0f6" />
          <span className={styles.mauValue}>{a.avgMinutesPerSession}m</span>
          <span className={styles.mauLabel}>Avg Session</span>
          <span className={styles.mauCaption}>minutes per active day</span>
        </div>
      </div>

      <div className={styles.chartsRow}>
        <TrendChart data={asTrend('activeUsers')} color="#58cc02" label="Active Learners per Day (30 days)" />
        <TrendChart data={asTrend('minutes')} color="#1cb0f6" label="Minutes Learned per Day (30 days)" />
      </div>
      <div className={styles.chartsRow}>
        <TrendChart data={asTrend('xp')} color="#ffc800" label="XP Earned per Day (30 days)" />
        <div className={styles.panelBox}>
          <span className={styles.panelTitle}>Totals (30 days)</span>
          <DistBars
            items={[
              { label: 'Min', count: a.minutesLast30, color: '#1cb0f6' },
              { label: 'XP', count: a.xpLast30, color: '#ffc800' },
            ]}
          />
          <span className={styles.retNote}>
            Average learner has banked {a.avgXpPerLearnerAllTime.toLocaleString()} XP all-time.
          </span>
        </div>
      </div>

      <div className={styles.twoCol}>
        <div className={styles.panelBox}>
          <span className={styles.panelTitle}>Streaks right now</span>
          <DistBars
            items={(data.streakDistribution ?? []).map((s, i) => ({
              label: s.label,
              count: s.count,
              color: STREAK_COLORS[i % STREAK_COLORS.length],
            }))}
          />
          <span className={styles.retNote}>Current streak length of your enrolled learners.</span>
        </div>
        <div className={styles.panelBox}>
          <span className={styles.panelTitle}>When they learn</span>
          <DistBars
            items={(data.weekdayHeat ?? []).map((w) => ({
              label: w.label,
              count: w.count,
              color: '#ce82ff',
            }))}
          />
          <span className={styles.retNote}>Active days by weekday — schedule pushes on the quiet days.</span>
        </div>
      </div>
    </div>
  );
}
