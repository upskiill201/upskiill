'use client';

/**
 * Hub → Learners. Growth over time, DAU/WAU/MAU and enrollment-cohort
 * retention — answers "are people discovering the course and coming back?"
 */

import { Users, UserPlus, Repeat, CalendarDays, Flame } from 'lucide-react';
import { StatCard, TrendChart, RetentionRow } from '../bits';
import styles from './hubtabs.module.css';

interface LearnersPayload {
  isEmpty?: boolean;
  totals?: {
    totalLearners: number;
    uniqueLearners: number;
    newThisWeek: number;
    newThisMonth: number;
    returningLearners: number;
    activeToday: number;
  };
  dauWauMau?: { dau: number; wau: number; mau: number };
  growth?: {
    newPerDay: { date: string; count: number }[];
    cumulativeTotal: { date: string; count: number }[];
  };
  retention?: {
    d1: { cohort: number; retainedPct: number } | null;
    d7: { cohort: number; retainedPct: number } | null;
    d30: { cohort: number; retainedPct: number } | null;
  };
}

export function LearnersTab({ data }: { data: LearnersPayload }) {
  if (data.isEmpty || !data.totals) {
    return (
      <div className={styles.emptyBox}>
        No learners yet. Share your course link — growth and retention appear
        with your first enrollment.
      </div>
    );
  }

  const t = data.totals;

  return (
    <div className={styles.hubTabRoot}>
      <h3 className={styles.sectionHeading}>Learner Growth</h3>
      <p className={styles.sectionSub}>
        Who enrolled, how many are unique learners, and who came back.
      </p>

      <div className={styles.kpiGrid}>
        <StatCard icon={<Users size={22} />} accent="blue" label="Total Enrollments" value={t.totalLearners} />
        <StatCard icon={<CalendarDays size={22} />} accent="purple" label="New This Week" value={t.newThisWeek} />
        <StatCard icon={<UserPlus size={22} />} accent="green" label="New This Month" value={t.newThisMonth} />
        <StatCard icon={<Repeat size={22} />} accent="yellow" label="Returning Now" value={t.returningLearners} sub="enrolled 14+ days ago, active this week" />
        <StatCard icon={<Flame size={22} />} accent="red" label="Active Today" value={t.activeToday} />
      </div>

      <div className={styles.mauTiles}>
        <div className={styles.mauTile}>
          <span className={styles.mauValue}>{data.dauWauMau?.dau ?? 0}</span>
          <span className={styles.mauLabel}>Daily Active</span>
          <span className={styles.mauCaption}>learned today</span>
        </div>
        <div className={styles.mauTile}>
          <span className={styles.mauValue}>{data.dauWauMau?.wau ?? 0}</span>
          <span className={styles.mauLabel}>Weekly Active</span>
          <span className={styles.mauCaption}>learned in last 7 days</span>
        </div>
        <div className={styles.mauTile}>
          <span className={styles.mauValue}>{data.dauWauMau?.mau ?? 0}</span>
          <span className={styles.mauLabel}>Monthly Active</span>
          <span className={styles.mauCaption}>learned in last 30 days</span>
        </div>
      </div>

      {data.growth && (
        <div className={styles.chartsRow}>
          <TrendChart data={data.growth.newPerDay} color="#1cb0f6" label="New Enrollments per Day (30 days)" />
          <TrendChart data={data.growth.cumulativeTotal} color="#ce82ff" label="Total Learners Over Time" />
        </div>
      )}

      <h3 className={styles.sectionHeading}>Do They Come Back?</h3>
      <p className={styles.sectionSub}>
        Of each cohort, the share who returned exactly N days after enrolling.
        Cohorts younger than the window aren&apos;t judged yet.
      </p>
      <div className={styles.retList}>
        <RetentionRow label="Day 1" data={data.retention?.d1 ?? null} />
        <RetentionRow label="Day 7" data={data.retention?.d7 ?? null} />
        <RetentionRow label="Day 30" data={data.retention?.d30 ?? null} />
      </div>
    </div>
  );
}
