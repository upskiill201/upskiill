'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Users, Flame, TrendingUp, Crown, Trophy, AlertTriangle, Lightbulb,
} from 'lucide-react';
import { StatCard, TrendChart } from './bits';
import styles from './tabs.module.css';

interface OverviewData {
  kpis: {
    totalStudents: number;
    activeThisWeek: number;
    avgProgress: number;
    avgStreak: number;
    paidStudents: number;
    freeRiders: number;
    completedStudents: number;
    atRiskStudents: number;
    totalLessons: number;
  };
  trends: {
    enrollments: { date: string; count: number }[];
    completions: { date: string; count: number }[];
  };
  insight: string;
  worstLesson: { id: string; title: string; lost: number } | null;
}

export function OverviewTab({ data }: { data: OverviewData }) {
  const k = data.kpis;

  return (
    <div className={styles.overviewRoot}>
      {/* KPI GRID */}
      <div className={styles.kpiGrid}>
        <StatCard icon={<Users size={22} />} accent="blue" label="Total Students" value={k.totalStudents} />
        <StatCard icon={<Flame size={22} />} accent="green" label="Active This Week" value={k.activeThisWeek} />
        <StatCard icon={<TrendingUp size={22} />} accent="purple" label="Avg Completion" value={`${k.avgProgress}%`} />
        <StatCard
          icon={<Crown size={22} />}
          accent="yellow"
          label="Paid Students"
          value={k.paidStudents}
          sub={`${k.freeRiders} still preview-only`}
        />
      </div>

      <div className={styles.kpiGrid}>
        <StatCard icon={<Flame size={22} />} accent="yellow" label="Avg Student Streak" value={k.avgStreak} sub="days" />
        <StatCard icon={<Trophy size={22} />} accent="green" label="Finished Course" value={k.completedStudents} />
        <StatCard icon={<AlertTriangle size={22} />} accent="red" label="Needs Attention" value={k.atRiskStudents} sub="slipping or at risk" />
        <StatCard icon={<Users size={22} />} accent="blue" label="Published Lessons" value={k.totalLessons} />
      </div>

      {/* TEY'S INSIGHT BANNER */}
      <motion.div
        className={styles.insightBanner}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className={styles.insightMascotWrap}>
          <Image
            src="/User onbarding Assets/Step_7_tey_verified_state.PNG"
            alt="Tey"
            width={72}
            height={72}
            className={styles.insightMascot}
          />
        </div>
        <div className={styles.insightBubble}>
          <span className={styles.insightTag}>
            <Lightbulb size={13} />
            Tey&apos;s Insight
          </span>
          <p className={styles.insightText}>{data.insight}</p>
          {data.worstLesson && (
            <span className={styles.worstPill}>
              <AlertTriangle size={12} />
              Biggest drop-off: {data.worstLesson.title} ({data.worstLesson.lost} learner{data.worstLesson.lost === 1 ? '' : 's'} stopped)
            </span>
          )}
        </div>
      </motion.div>

      {/* TREND CHARTS */}
      <div className={styles.trendGrid}>
        <div className={styles.trendCard}>
          <TrendChart data={data.trends.enrollments} color="#1cb0f6" label="New Students (30 days)" />
        </div>
        <div className={styles.trendCard}>
          <TrendChart data={data.trends.completions} color="#58cc02" label="Lessons Completed (30 days)" />
        </div>
      </div>
    </div>
  );
}
