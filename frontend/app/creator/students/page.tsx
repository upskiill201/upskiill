'use client';

/**
 * Creator Studio — Students (learner intelligence center).
 *
 * Answers five questions about a creator's learner base: WHO they are, HOW
 * they learn, WHERE they struggle, WHY they drop off, and WHAT would help.
 *
 * Privacy: this surface only ever shows names, avatars, usernames and
 * learning behavior — never contact details. Tabs:
 *   Overview → Learners → Needs Attention → Insights
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, GraduationCap, Lightbulb, Users, AlarmClock } from 'lucide-react';
import { EmptyState, ErrorState } from '@/components/creator/analytics/bits';
import {
  StudentsOverviewSkeleton,
  StudentsAttentionSkeleton,
} from '@/components/creator/students/bits';
import { RowsSkeleton } from '@/components/creator/analytics/bits';
import type { InsightCardShape } from '@/components/creator/analytics/bits';
import { StudentsOverviewTab } from '@/components/creator/students/OverviewTab';
import { LearnersTab } from '@/components/creator/students/LearnersTab';
import { NeedsAttentionTab } from '@/components/creator/students/NeedsAttentionTab';
import { StudentsInsightsTab } from '@/components/creator/students/StudentsInsightsTab';
import styles from './page.module.css';

type TabKey = 'overview' | 'learners' | 'attention' | 'insights';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'overview', label: 'Overview', icon: <BarChart3 size={15} /> },
  { key: 'learners', label: 'Learners', icon: <Users size={15} /> },
  { key: 'attention', label: 'Needs Attention', icon: <AlarmClock size={15} /> },
  { key: 'insights', label: 'Insights', icon: <Lightbulb size={15} /> },
];

export default function StudentsHubPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [cache, setCache] = useState<Partial<Record<TabKey, unknown>>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTab = useCallback(
    async (tab: TabKey, force = false) => {
      if (tab === 'learners') return; // self-fetching tab
      if (!force && cache[tab]) return;
      setLoading(true);
      setError(null);
      try {
        const path =
          tab === 'attention'
            ? '/api/students/needs-attention'
            : `/api/students/${tab}`;
        const res = await fetch(path, { credentials: 'include' });
        if (!res.ok) throw new Error(`Could not load ${tab} (${res.status})`);
        const data = await res.json();
        setCache((c) => ({ ...c, [tab]: data }));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
    [cache],
  );

  useEffect(() => {
    void fetchTab(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const skeleton = useMemo(() => {
    switch (activeTab) {
      case 'overview':
        return <StudentsOverviewSkeleton />;
      case 'learners':
        return <RowsSkeleton count={6} />;
      case 'attention':
        return <StudentsAttentionSkeleton />;
      case 'insights':
        return <StudentsOverviewSkeleton />;
      default:
        return null;
    }
  }, [activeTab]);

  const body = useMemo(() => {
    if (error) return <ErrorState message={error} onRetry={() => fetchTab(activeTab, true)} />;
    if (activeTab === 'learners') return <LearnersTab />;
    if (loading || !cache[activeTab]) return skeleton;

    if (activeTab === 'overview') {
      const data = cache.overview as { isEmpty?: boolean } | undefined;
      if (data?.isEmpty) {
        return (
          <EmptyState
            icon={<GraduationCap size={30} />}
            title="No learners yet"
            body="Once students enroll in your published courses, this page becomes your window into who they are, how they learn, and where they need help."
          />
        );
      }
      return <StudentsOverviewTab data={data as never} />;
    }

    if (activeTab === 'attention') {
      return <NeedsAttentionTab data={cache.attention as never} />;
    }

    return (
      <StudentsInsightsTab
        insights={(cache.insights as { insights?: InsightCardShape[] })?.insights ?? []}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, cache, activeTab, skeleton, fetchTab]);

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerIconWrap}>
          <Users size={26} />
        </div>
        <div>
          <h1 className={styles.title}>Students</h1>
          <p className={styles.subtitle}>
            Your learner intelligence center — understand who your learners are,
            how they learn, where they struggle, and what they need. Contact
            details stay private on Teyro, always.
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
