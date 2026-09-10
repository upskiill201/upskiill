'use client';

/**
 * Creator Analytics hub — a tabbed command center across ALL published
 * courses. Tabs follow the creator's mental model:
 *   Overview → Learners → Courses → Engagement → Revenue → Feedback → Insights
 *
 * Each tab fetches on demand and caches for the visit; every loading state
 * is a layout-true skeleton of that tab's real content.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Users, BookOpen, Flame, BadgeDollarSign, Star, Lightbulb,
} from 'lucide-react';
import { ErrorState, EmptyState } from '@/components/creator/analytics/bits';
import {
  HubOverviewSkeleton, LearnersSkeleton, EngagementSkeleton,
  CoursesTableSkeleton, RevenueSkeleton, FeedbackSkeleton, InsightsSkeleton,
} from '@/components/creator/analytics/bits';
import { GraduationCap } from 'lucide-react';
import { HubOverviewTab } from '@/components/creator/analytics/hub/HubOverviewTab';
import { LearnersTab } from '@/components/creator/analytics/hub/LearnersTab';
import { EngagementTab } from '@/components/creator/analytics/hub/EngagementTab';
import { CoursesTableTab } from '@/components/creator/analytics/hub/CoursesTableTab';
import { RevenueTab } from '@/components/creator/analytics/hub/RevenueTab';
import { FeedbackTab } from '@/components/creator/analytics/hub/FeedbackTab';
import { InsightsTab } from '@/components/creator/analytics/hub/InsightsTab';
import type { InsightCardShape } from '@/components/creator/analytics/bits';
import styles from './page.module.css';

type TabKey =
  | 'overview' | 'learners' | 'courses' | 'engagement'
  | 'revenue' | 'feedback' | 'insights';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'overview', label: 'Overview', icon: <BarChart3 size={15} /> },
  { key: 'learners', label: 'Learners', icon: <Users size={15} /> },
  { key: 'courses', label: 'Courses', icon: <BookOpen size={15} /> },
  { key: 'engagement', label: 'Engagement', icon: <Flame size={15} /> },
  { key: 'revenue', label: 'Revenue', icon: <BadgeDollarSign size={15} /> },
  { key: 'feedback', label: 'Feedback', icon: <Star size={15} /> },
  { key: 'insights', label: 'Insights', icon: <Lightbulb size={15} /> },
];

export default function AnalyticsHubPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [cache, setCache] = useState<Partial<Record<TabKey, unknown>>>({});
  const [hiddenDrafts, setHiddenDrafts] = useState(0);
  const [hasPublishedCourses, setHasPublishedCourses] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTab = useCallback(async (tab: TabKey, force = false) => {
    if (!force && cache[tab]) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics/instructor/${tab}`, { credentials: 'include' });
      if (!res.ok) throw new Error(`Could not load ${tab} (${res.status})`);
      const data = await res.json();
      setCache((c) => ({ ...c, [tab]: data }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [cache]);

  useEffect(() => {
    void fetchTab('overview');
    // Draft count + "no courses at all" detection come from the course list
    fetch('/api/courses/instructor/me', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : []))
      .then((list: { published: boolean }[]) => {
        if (!Array.isArray(list)) return;
        const published = list.filter((c) => c.published).length;
        setHasPublishedCourses(published > 0);
        setHiddenDrafts(list.length - published);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void fetchTab(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const skeleton = useMemo(() => {
    switch (activeTab) {
      case 'overview': return <HubOverviewSkeleton />;
      case 'learners': return <LearnersSkeleton />;
      case 'courses': return <CoursesTableSkeleton />;
      case 'engagement': return <EngagementSkeleton />;
      case 'revenue': return <RevenueSkeleton />;
      case 'feedback': return <FeedbackSkeleton />;
      case 'insights': return <InsightsSkeleton />;
      default: return null;
    }
  }, [activeTab]);

  const body = useMemo(() => {
    if (error && !(activeTab === 'courses' && hasPublishedCourses === false)) {
      return <ErrorState message={error} onRetry={() => fetchTab(activeTab, true)} />;
    }
    if (loading || !cache[activeTab]) return skeleton;

    if (activeTab !== 'overview' && hasPublishedCourses === false) {
      return (
        <EmptyState
          icon={<GraduationCap size={30} />}
          title="No published courses yet"
          body="Analytics appear once a course is published. Publish one to start tracking learners, revenue and drop-offs."
        />
      );
    }

    switch (activeTab) {
      case 'overview': {
        const data = cache.overview as { hasCourses?: boolean } | undefined;
        if (!data?.hasCourses) {
          return (
            <EmptyState
              icon={<GraduationCap size={30} />}
              title="No learner data yet"
              body="Once students enroll in your published courses, your dashboard comes alive here — growth, engagement, revenue and more."
            />
          );
        }
        return <HubOverviewTab data={data as never} />;
      }
      case 'learners':
        return <LearnersTab data={cache.learners as never} />;
      case 'courses':
        return <CoursesTableTab data={cache.courses as never} hiddenDrafts={hiddenDrafts} />;
      case 'engagement':
        return <EngagementTab data={cache.engagement as never} />;
      case 'revenue':
        return <RevenueTab data={cache.revenue as never} />;
      case 'feedback':
        return <FeedbackTab data={cache.feedback as never} />;
      case 'insights':
        return <InsightsTab insights={((cache.insights as { insights?: InsightCardShape[] })?.insights ?? [])} />;
      default:
        return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, cache, activeTab, skeleton, hasPublishedCourses, hiddenDrafts, fetchTab]);

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerIconWrap}>
          <BarChart3 size={26} />
        </div>
        <div>
          <h1 className={styles.title}>Analytics</h1>
          <p className={styles.subtitle}>
            Are people discovering your courses, starting them, learning from
            them — and finishing? Everything across your catalog lives here.
            {hiddenDrafts > 0 && (
              <> {hiddenDrafts} draft course{hiddenDrafts === 1 ? ' is' : 's are'} excluded.</>
            )}
          </p>
        </div>
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
