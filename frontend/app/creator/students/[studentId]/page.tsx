'use client';

/**
 * Per-student learner intelligence page. One fetch, cached; sub-tabs render
 * from the same payload. Identity is name/avatar/username + a short ID chip
 * — nothing here can be used to contact the learner off-platform.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { Avatar, ErrorState } from '@/components/creator/analytics/bits';
import { StudentDetailSkeleton, StatusChip } from '@/components/creator/students/bits';
import {
  DetailCoursesSection,
  DetailJourneySection,
  DetailOverviewSection,
  DetailPerformanceSection,
} from '@/components/creator/students/DetailSections';
import type { StudentDetailPayload } from '@/components/creator/students/types';
import styles from './detail.module.css';

type SubTab = 'overview' | 'courses' | 'performance' | 'journey';

const SUBTABS: { key: SubTab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'courses', label: 'Courses & Lessons' },
  { key: 'performance', label: 'Performance' },
  { key: 'journey', label: 'Journey & Feedback' },
];

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = String(params.studentId ?? '');

  const [data, setData] = useState<StudentDetailPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subTab, setSubTab] = useState<SubTab>('overview');

  const load = useCallback(
    async (force = false) => {
      if (!studentId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/students/${encodeURIComponent(studentId)}${force ? '?r=1' : ''}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error(`Could not load this learner (${res.status})`);
        setData(await res.json());
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
    [studentId],
  );

  useEffect(() => {
    void load();
  }, [load]);

  const body = useMemo(() => {
    if (error) return <ErrorState message={error} onRetry={() => void load(true)} />;
    if (loading || !data) return <StudentDetailSkeleton />;
    switch (subTab) {
      case 'overview':
        return <DetailOverviewSection data={data} />;
      case 'courses':
        return <DetailCoursesSection data={data} />;
      case 'performance':
        return <DetailPerformanceSection data={data} />;
      case 'journey':
        return <DetailJourneySection data={data} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, data, subTab, load]);

  return (
    <div className={styles.page}>
      <Link href="/creator/students" className={styles.backLink}>
        <ArrowLeft size={15} /> All learners
      </Link>

      {/* IDENTITY HEADER */}
      <div className={styles.header}>
        {data ? (
          <>
            <Avatar src={data.identity.avatarUrl} name={data.identity.fullName} size={64} />
            <div className={styles.headerMeta}>
              <div className={styles.nameRow}>
                <h1 className={styles.title}>{data.identity.fullName}</h1>
                <StatusChip segment={data.segment} />
              </div>
              <span className={styles.usernameLine}>
                {data.identity.username ? `@${data.identity.username}` : 'No username set'} ·
                enrolled {new Date(data.firstEnrolledAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <span className={styles.headerIdChip}>ID · {data.identity.id.slice(0, 10)}</span>
            <button className={styles.refreshBtn} onClick={() => void load(true)} aria-label="Refresh">
              <RefreshCcw size={15} />
            </button>
          </>
        ) : (
          !error && (
            <>
              <div className={styles.avatarSk} />
              <div>
                <div className={styles.lineSk} style={{ width: 200 }} />
                <div className={styles.lineSk} style={{ width: 140 }} />
              </div>
            </>
          )
        )}
      </div>

      {/* SUB-TABS */}
      <div className={styles.subTabs}>
        {SUBTABS.map((t) => (
          <button
            key={t.key}
            className={`${styles.subTabBtn} ${subTab === t.key ? styles.subTabActive : ''}`}
            onClick={() => {
              setSubTab(t.key);
              router.replace(`/creator/students/${studentId}?section=${t.key}`, { scroll: false });
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.div
        key={subTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {body}
      </motion.div>
    </div>
  );
}
