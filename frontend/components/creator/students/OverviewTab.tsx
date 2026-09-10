'use client';

/**
 * Students hub → Overview. The WHO/HOW snapshot of the creator's learner
 * base: size, health, rhythm and where they cluster.
 */

import Link from 'next/link';
import {
  AlertTriangle, CheckCircle2, Clock, Flame, Target, TrendingUp,
  UserPlus, Users, Zap,
} from 'lucide-react';
import { StatCard, TrendChart } from '@/components/creator/analytics/bits';
import type { StudentsOverviewPayload } from './types';
import styles from './students.module.css';

export function StudentsOverviewTab({ data }: { data: StudentsOverviewPayload }) {
  const k = data.kpis;
  return (
    <div className={styles.root}>
      <div className={styles.kpiGrid}>
        <StatCard icon={<Users size={22} />} accent="green" label="Total Learners" value={k.totalLearners} />
        <StatCard icon={<UserPlus size={22} />} accent="blue" label="New" value={k.newLearners} sub="recently enrolled" />
        <StatCard icon={<Flame size={22} />} accent="blue" label="Active (7 days)" value={k.activeLast7d} />
        <StatCard icon={<Zap size={22} />} accent="purple" label="Highly Engaged" value={k.highlyEngaged} />
        <StatCard icon={<AlertTriangle size={22} />} accent="red" label="At Risk" value={k.atRisk} sub={`${k.inactive} inactive beyond that`} />
        <StatCard
          icon={<TrendingUp size={22} />}
          accent="yellow"
          label="Avg Progress"
          value={`${k.avgProgressPct}%`}
          sub={`${k.completionRatePct}% finished at least one course`}
        />
        <StatCard icon={<Clock size={22} />} accent="purple" label="Avg Learning Time" value={`${k.avgLearningMinutesPerLearner} min`} />
        <StatCard
          icon={<Target size={22} />}
          accent="green"
          label="Avg Quiz Score"
          value={k.avgQuizScore !== null ? `${k.avgQuizScore}%` : '—'}
          sub={k.avgQuizScore === null ? 'no quizzes taken yet' : undefined}
        />
        <StatCard icon={<Flame size={22} />} accent="yellow" label="Avg Streak" value={`${k.avgStreakDays}d`} />
        <StatCard
          icon={<CheckCircle2 size={22} />}
          accent="red"
          label="Need Attention"
          value={k.learnersWithAttention}
          sub={
            <Link href="/creator/students?tab=attention" style={{ color: '#1cb0f6', fontWeight: 800 }}>
              view them →
            </Link>
          }
        />
      </div>

      <div className={styles.panelBox}>
        <h3 className={styles.panelTitle}>Enrollments — last 30 days</h3>
        <TrendChart data={data.enrollmentTrend} color="#58cc02" label="New enrollments per day" />
      </div>

      <div className={styles.twoCol}>
        <div className={styles.panelBox}>
          <h3 className={styles.panelTitle}>Courses attracting the most learners</h3>
          {data.topCourses.length === 0 ? (
            <p className={styles.emptyMini}>No enrollment data yet.</p>
          ) : (
            <div className={styles.listRows}>
              {data.topCourses.map((c) => (
                <div key={c.courseId} className={styles.listRow}>
                  <span className={styles.listRowMain}>{c.title}</span>
                  <span className={styles.listRowSide}>
                    {c.learners} learner{c.learners === 1 ? '' : 's'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.panelBox}>
          <h3 className={styles.panelTitle}>Best 7-day stickiness</h3>
          {data.bestRetentionCourses.length === 0 ? (
            <p className={styles.emptyMini}>Needs at least 3 learners in a course to measure.</p>
          ) : (
            <div className={styles.listRows}>
              {data.bestRetentionCourses.map((c) => (
                <div key={c.courseId} className={styles.listRow}>
                  <span className={styles.listRowMain}>{c.title}</span>
                  <span className={styles.listRowSide}>
                    {c.activeRatePct}% active · {c.learners} learners
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className={styles.hourNote}>{data.xpNote}</p>
    </div>
  );
}
