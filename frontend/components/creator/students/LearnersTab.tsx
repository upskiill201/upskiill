'use client';

/**
 * Students hub → Learners. The full roster with segments, search and
 * paging; each row drills into the learner's intelligence page.
 */

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flame, Search } from 'lucide-react';
import {
  Avatar, EmptyState, ErrorState, ProgressBar, RowsSkeleton, timeAgo,
} from '@/components/creator/analytics/bits';
import { StatusChip, AttentionChip } from './bits';
import type { AttentionReason, LearnerSegment, StudentsRosterPayload } from './types';
import styles from './students.module.css';

const SEGMENTS: (LearnerSegment | 'ALL')[] = [
  'ALL',
  'NEW',
  'ACTIVE',
  'HIGHLY_ENGAGED',
  'NEAR_COMPLETION',
  'STRUGGLING',
  'HIGH_PERFORMER',
  'AT_RISK',
  'INACTIVE',
  'COMPLETED',
];

const SEGMENT_CHIPLABELS: Record<string, string> = {
  ALL: 'All',
  NEW: 'New',
  ACTIVE: 'Active',
  HIGHLY_ENGAGED: 'Engaged',
  NEAR_COMPLETION: 'Near done',
  STRUGGLING: 'Struggling',
  HIGH_PERFORMER: 'Top performers',
  AT_RISK: 'At risk',
  INACTIVE: 'Inactive',
  COMPLETED: 'Completed',
};

export function LearnersTab() {
  const router = useRouter();
  const [data, setData] = useState<StudentsRosterPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [segment, setSegment] = useState<LearnerSegment | 'ALL'>('ALL');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const fetchRoster = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: '25',
        segment,
        ...(search.trim() && { search: search.trim() }),
      });
      const res = await fetch(`/api/students?${params}`, { credentials: 'include' });
      if (!res.ok) throw new Error(`Could not load learners (${res.status})`);
      setData(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load learners');
    } finally {
      setLoading(false);
    }
  }, [page, segment, search]);

  useEffect(() => {
    void fetchRoster();
  }, [fetchRoster]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div className={styles.root}>
      {/* SEGMENT CHIPS */}
      <div className={styles.filterChips}>
        {SEGMENTS.map((s) => {
          const count =
            s === 'ALL'
              ? data?.summary
                ? Object.values(data.summary).reduce((a, b) => a + b, 0)
                : data?.total ?? 0
              : data?.summary?.[s] ?? 0;
          return (
            <button
              key={s}
              className={`${styles.filterChip} ${segment === s ? styles.filterChipActive : ''}`}
              onClick={() => {
                setSegment(s);
                setPage(1);
              }}
            >
              {SEGMENT_CHIPLABELS[s]}
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* SEARCH */}
      <form
        className={styles.searchRow}
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(searchInput);
          setPage(1);
        }}
      >
        <Search size={16} />
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name or username"
          className={styles.searchInput}
        />
      </form>

      {/* ROSTER */}
      {loading ? (
        <RowsSkeleton count={6} />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchRoster} />
      ) : !data || data.students.length === 0 ? (
        <EmptyState
          icon={<Search size={28} />}
          title="No learners found"
          body={
            search || segment !== 'ALL'
              ? 'Nobody matches this filter. Try clearing the search or picking another segment.'
              : 'No one has enrolled in your published courses yet. Share a course link to meet your first learner.'
          }
        />
      ) : (
        <div className={styles.roster}>
          {data.students.map((s, i) => (
            <motion.button
              key={s.id}
              className={styles.studentRow}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              onClick={() => router.push(`/creator/students/${s.id}`)}
            >
              <Avatar src={s.avatarUrl} name={s.fullName} size={42} />

              <div className={styles.identity}>
                <span className={styles.name}>{s.fullName}</span>
                <span className={styles.username}>
                  {s.username ? `@${s.username}` : `ID ${s.id.slice(0, 10)}`}
                </span>
              </div>

              <div className={styles.statCol}>
                <span className={styles.statLine}>
                  <Flame size={13} color="#ff9600" />
                  {s.streakDays}d streak
                </span>
                <span className={styles.statLine}>{s.coursesCount} course{s.coursesCount === 1 ? '' : 's'}</span>
              </div>

              <div className={styles.progressCol}>
                <ProgressBar pct={s.progressPct} color={s.progressPct >= 100 ? '#ce82ff' : '#58cc02'} />
                <span className={styles.progressText}>
                  {s.completedLessons}/{s.totalLessons} lessons ·{' '}
                  {s.lastActivityAt ? timeAgo(s.lastActivityAt) : 'never active'}
                </span>
              </div>

              <div className={styles.chipCol}>
                <StatusChip segment={s.segment} />
                {s.needsAttentionReasons.slice(0, 1).map((r: AttentionReason) => (
                  <AttentionChip key={r} reason={r} />
                ))}
                {s.primaryCourseTitle && <span className={styles.courseRef}>{s.primaryCourseTitle}</span>}
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {data && totalPages > 1 && (
        <div className={styles.pagination}>
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            <ChevronLeft size={15} /> Prev
          </button>
          <span className={styles.pageInfo}>
            Page {page} of {totalPages}
          </span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
