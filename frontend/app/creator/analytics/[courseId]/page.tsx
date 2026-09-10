'use client';

/**
 * Per-course creator analytics — Overview / Journey / Lessons / Students.
 * Data is fetched per tab and cached for the visit; loading skeletons mirror
 * each tab's real layout.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft, BarChart3, Target, BookOpenCheck, Users,
} from 'lucide-react';
import {
  ErrorState, OverviewSkeleton, JourneySkeleton, LessonsSkeleton, StudentsSkeleton,
} from '@/components/creator/analytics/bits';
import { OverviewTab } from '@/components/creator/analytics/OverviewTab';
import { JourneyTab } from '@/components/creator/analytics/JourneyTab';
import { LessonsTab } from '@/components/creator/analytics/LessonsTab';
import { StudentsTab } from '@/components/creator/analytics/StudentsTab';
import styles from './page.module.css';

type TabKey = 'overview' | 'journey' | 'lessons' | 'students';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'overview', label: 'Overview', icon: <BarChart3 size={15} /> },
  { key: 'journey', label: 'Journey', icon: <Target size={15} /> },
  { key: 'lessons', label: 'Lessons', icon: <BookOpenCheck size={15} /> },
  { key: 'students', label: 'Students', icon: <Users size={15} /> },
];

export default function CourseAnalyticsPage() {
  const params = useParams();
  const courseId = String(params.courseId ?? '');

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [courseTitle, setCourseTitle] = useState('');
  const [cache, setCache] = useState<Partial<Record<TabKey, unknown>>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTab = useCallback(async (tab: TabKey, force = false) => {
    if (!force && cache[tab]) return;
    setLoading(true);
    setError(null);
    try {
      // Students tab fetches its own data internally
      if (tab === 'students') {
        setCache((c) => ({ ...c, students: {} }));
        return;
      }
      const res = await fetch(`/api/analytics/courses/${encodeURIComponent(courseId)}/${tab}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`Could not load ${tab} (${res.status})`);
      const data = await res.json();
      setCache((c) => ({ ...c, [tab]: data }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [courseId, cache]);

  useEffect(() => {
    void fetchTab('overview');
    fetch('/api/courses/instructor/me', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : []))
      .then((list: { id: string; title: string }[]) => {
        const match = Array.isArray(list) ? list.find((c) => c.id === courseId) : null;
        if (match) setCourseTitle(match.title);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  useEffect(() => {
    void fetchTab(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const skeleton = useMemo(() => {
    switch (activeTab) {
      case 'overview': return <OverviewSkeleton />;
      case 'journey': return <JourneySkeleton />;
      case 'lessons': return <LessonsSkeleton />;
      case 'students': return <StudentsSkeleton />;
      default: return null;
    }
  }, [activeTab]);

  const body = useMemo(() => {
    if (error && !(activeTab === 'students')) {
      return <ErrorState message={error} onRetry={() => fetchTab(activeTab, true)} />;
    }
    if (loading || (!cache[activeTab] && activeTab !== 'students')) {
      return skeleton;
    }
    switch (activeTab) {
      case 'overview':
        return <OverviewTab data={cache.overview as never} />;
      case 'journey':
        return <JourneyTab data={cache.journey as never} />;
      case 'lessons':
        return <LessonsTab data={cache.lessons as never} />;
      case 'students':
        return <StudentsTab courseId={courseId} />;
      default:
        return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, cache, activeTab, courseId, fetchTab, skeleton]);

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.headerRow}>
        <Link href="/creator/analytics" className={styles.backLink}>
          <ArrowLeft size={16} />
          All Courses
        </Link>
        {courseTitle && <span className={styles.courseTitle}>{courseTitle}</span>}
        <button
          className={styles.refreshBtn}
          onClick={() => {
            setCache({});
            setTimeout(() => fetchTab(activeTab, true), 0);
          }}
        >
          Refresh
        </button>
      </div>

      {/* TABS */}
      <div className={styles.tabBar}>
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`${styles.tabBtn} ${activeTab === t.key ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* BODY */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {body}
      </motion.div>
    </div>
  );
}
