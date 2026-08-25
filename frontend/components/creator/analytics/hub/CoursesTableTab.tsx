'use client';

/**
 * Hub → Courses. Cross-course performance table: enrollments, progress,
 * completion, views (from the detail-page view ping), conversion, revenue
 * and ratings — one comparable row per published course.
 */

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users, Flame, Eye, Clock, AlertTriangle, ChevronRight, Star,
} from 'lucide-react';
import { ProgressBar, Stars } from '../bits';
import styles from './hubtabs.module.css';

interface CourseRow {
  courseId: string;
  title: string;
  students: number;
  activeLast7: number;
  avgProgress: number;
  completionPct: number;
  avgLessonsCompleted: number;
  avgDaysToComplete: number | null;
  revenue: number;
  views: number;
  conversionPct: number | null;
  ratingAvg: number | null;
  ratingCount: number;
  worstLeak: { lessonTitle: string; lost: number } | null;
}

type SortKey = 'students' | 'completionPct' | 'revenue';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'students', label: 'Most Students' },
  { key: 'completionPct', label: 'Best Completion' },
  { key: 'revenue', label: 'Top Revenue' },
];

function pctTone(pct: number) {
  return pct >= 70 ? styles.perfChipGood : pct >= 40 ? styles.perfChipMid : styles.perfChipBad;
}

export function CoursesTableTab({
  data,
  hiddenDrafts = 0,
}: {
  data: { isEmpty?: boolean; courses?: CourseRow[] };
  hiddenDrafts?: number;
}) {
  const [sort, setSort] = useState<SortKey>('students');

  const courses = useMemo(() => {
    const rows = [...(data.courses ?? [])];
    rows.sort((a, b) => b[sort] - a[sort]);
    return rows;
  }, [data.courses, sort]);

  if (!data.isEmpty && courses.length === 0) {
    return <div className={styles.emptyBox}>No published courses yet.</div>;
  }
  if (data.isEmpty || courses.length === 0) {
    return (
      <div className={styles.emptyBox}>
        No published courses yet. Publish a course to see its numbers here.
      </div>
    );
  }

  return (
    <div className={styles.hubTabRoot}>
      <h3 className={styles.sectionHeading}>Course Performance</h3>
      <p className={styles.sectionSub}>
        Every published course side by side. Click a course to open its full
        analytics.
      </p>

      <div className={styles.sortChips}>
        {SORTS.map((s) => (
          <button
            key={s.key}
            className={`${styles.sortChip} ${sort === s.key ? styles.sortChipActive : ''}`}
            onClick={() => setSort(s.key)}
          >
            <Star size={11} />
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.perfList}>
        {courses.map((c, i) => (
          <motion.div
            key={c.courseId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
          >
            <Link href={`/creator/analytics/${encodeURIComponent(c.courseId)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={styles.perfRow}>
                <div className={styles.perfMain}>
                  <span className={styles.perfTitleRow}>
                    <span className={styles.perfTitle}>{c.title}</span>
                    <ChevronRight size={15} color="#afafaf" />
                  </span>
                  <div className={styles.perfProgressBar}>
                    <ProgressBar
                      pct={c.avgProgress}
                      color="#1cb0f6"
                    />
                    <span className={styles.perfProgressText}>{c.avgProgress}% avg progress</span>
                  </div>
                </div>

                <div className={styles.perfChips}>
                  <span className={styles.perfChip} title="Enrolled students">
                    <Users size={13} /> {c.students}
                  </span>
                  <span className={styles.perfChip} title="Active in the last 7 days">
                    <Flame size={13} color="#ff9600" /> {c.activeLast7}
                  </span>
                  <span className={`${styles.perfChip} ${pctTone(c.completionPct)}`} title="Share of students who finished every lesson">
                    {c.completionPct}% finish
                  </span>
                  <span className={styles.perfChip} title="Detail-page views since tracking began">
                    <Eye size={13} /> {c.views.toLocaleString()}
                  </span>
                  <span
                    className={`${styles.perfChip} ${c.conversionPct === null ? styles.perfChipMuted : ''}`}
                    title="Enrollments as a share of detail-page views"
                  >
                    {c.conversionPct !== null ? `${c.conversionPct}% convert` : '—'}
                  </span>
                  {c.avgDaysToComplete !== null && (
                    <span className={styles.perfChip} title="Average days from enrollment to completion">
                      <Clock size={13} /> {c.avgDaysToComplete}d to finish
                    </span>
                  )}
                  {c.revenue > 0 && (
                    <span className={`${styles.perfChip} ${styles.perfChipMoney}`}>
                      ${c.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  )}
                  <span
                    className={styles.perfChip}
                    title={c.ratingCount > 0 ? `${c.ratingCount} ratings` : 'No ratings yet'}
                  >
                    <Stars rating={c.ratingAvg} size={12} />
                  </span>
                  {c.worstLeak && (
                    <span className={styles.perfLeak} title={`Most students stop after "${c.worstLeak.lessonTitle}"`}>
                      <AlertTriangle size={11} />
                      loses {c.worstLeak.lost}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {hiddenDrafts > 0 && (
        <p className={styles.draftsNote}>
          {hiddenDrafts} draft course{hiddenDrafts === 1 ? ' is' : 's are'} not included in analytics.
        </p>
      )}
    </div>
  );
}
