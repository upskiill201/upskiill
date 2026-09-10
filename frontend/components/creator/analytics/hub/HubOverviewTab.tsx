'use client';

/**
 * Hub → Overview. The creator's dashboard: headline KPIs across ALL
 * published courses with period-over-period comparisons, plus the two
 * 30-day trends and a per-course drill-in list.
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users, Flame, Crown, TrendingUp, AlertTriangle, BookOpen,
  BadgeDollarSign, Star, ChevronRight,
} from 'lucide-react';
import { StatCard, TrendChart, DeltaChip } from '../bits';
import styles from './hubtabs.module.css';

interface OverviewPayload {
  hasCourses: boolean;
  kpis: {
    totalStudents: number;
    activeThisWeek: number;
    avgProgress: number;
    avgStreak: number;
    paidStudents: number;
    completedStudents: number;
    atRiskStudents: number;
  };
  trends: {
    enrollments: { date: string; count: number }[];
    completions: { date: string; count: number }[];
  };
  topCourses: { courseId: string; title: string; students: number; avgProgress: number }[];
  extras?: {
    lessonsCompletedLast30: number;
    deltaNewLearnersPct: number;
    deltaLessonsCompletedPct: number;
    deltaActiveWeekPct: number;
    deltaEnrollmentsPct: number;
    revenueAllTime: number;
    avgRating: number | null;
    ratingCount: number;
  };
}

export function HubOverviewTab({ data }: { data: OverviewPayload }) {
  const x = data.extras;
  const money = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  return (
    <div className={styles.hubTabRoot}>
      <h3 className={styles.sectionHeading}>Your teaching practice at a glance</h3>
      <p className={styles.sectionSub}>
        Combined across every published course. Chips compare the last two weeks
        against the two before.
      </p>

      <div className={styles.kpiGrid}>
        <StatCard icon={<Users size={22} />} accent="blue" label="Total Learners" value={data.kpis.totalStudents} sub={x ? <DeltaChip pct={x.deltaNewLearnersPct} /> : undefined} />
        <StatCard icon={<Flame size={22} />} accent="green" label="Active This Week" value={data.kpis.activeThisWeek} sub={x ? <DeltaChip pct={x.deltaActiveWeekPct} /> : undefined} />
        <StatCard icon={<Crown size={22} />} accent="yellow" label="Paid Students" value={data.kpis.paidStudents} />
        <StatCard
          icon={<TrendingUp size={22} />}
          accent="purple"
          label="Avg Completion"
          value={`${data.kpis.avgProgress}%`}
        />
        <StatCard
          icon={<BookOpen size={22} />}
          accent="green"
          label="Lessons Completed"
          value={x?.lessonsCompletedLast30 ?? 0}
          sub="last 30 days"
        />
        {x && (
          <StatCard
            icon={<BookOpen size={22} />}
            accent="blue"
            label="Learning Momentum"
            value=""
            sub={<DeltaChip pct={x.deltaLessonsCompletedPct} caption="lessons completed vs previous period" />}
          />
        )}
        <StatCard
          icon={<BadgeDollarSign size={22} />}
          accent="yellow"
          label="Revenue"
          value={x ? money(x.revenueAllTime) : '$0'}
          sub="gross, all time"
        />
        <StatCard
          icon={<Star size={22} />}
          accent="yellow"
          label="Avg Rating"
          value={x?.avgRating != null ? x.avgRating.toFixed(1) : '—'}
          sub={x && x.ratingCount > 0 ? `${x.ratingCount} ratings` : 'no ratings yet'}
        />
        <StatCard
          icon={<AlertTriangle size={22} />}
          accent="red"
          label="Needs Attention"
          value={data.kpis.atRiskStudents}
          sub="slipping or at risk"
        />
      </div>

      <div className={styles.chartsRow}>
        <TrendChart data={data.trends.enrollments} color="#1cb0f6" label="New Enrollments (30 days)" />
        <TrendChart data={data.trends.completions} color="#58cc02" label="Lessons Completed (30 days)" />
      </div>

      {data.topCourses.length > 0 && (
        <>
          <h3 className={styles.sectionHeading}>Drill into a course</h3>
          <div className={styles.revRankList}>
            {data.topCourses.map((tc, i) => (
              <motion.div
                key={tc.courseId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/creator/analytics/${encodeURIComponent(tc.courseId)}`} style={{ textDecoration: 'none' }}>
                  <div className={styles.revRankRow}>
                    <span className={styles.revRankBubble}>{i + 1}</span>
                    <div className={styles.revRankMid}>
                      <span className={styles.revRankTitle}>{tc.title}</span>
                      <span className={styles.revRankMeta}>View full course analytics</span>
                    </div>
                    <span className={styles.revRankMeta}>
                      {tc.students} students · {tc.avgProgress}% avg progress
                    </span>
                    <ChevronRight size={16} color="#afafaf" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
