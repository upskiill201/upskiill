'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ChevronRight, ChevronLeft, X, Flame, Heart, Zap, Trophy,
  Clock, Snowflake, BookOpen, CheckCircle2, Circle,
} from 'lucide-react';
import {
  Avatar, BucketChip, AccessChip, ProgressBar, RowsSkeleton, ErrorState,
  EmptyState, timeAgo,
} from './bits';
import styles from './tabs.module.css';

interface StudentRow {
  userId: string;
  fullName: string;
  avatarUrl: string | null;
  username: string | null;
  joinedCourseAt: string;
  completedLessons: number;
  totalLessons: number;
  progressPct: number;
  xp: number;
  streakDays: number;
  longestStreak: number;
  lives: number;
  maxLives: number;
  lastActiveAt: string | null;
  daysSinceActive: number | null;
  bucket: string;
  access: string;
}

interface StudentsData {
  total: number;
  page: number;
  pageSize: number;
  students: StudentRow[];
  summary: Record<string, number>;
}

interface StudentDetail {
  student: {
    userId: string; fullName: string; avatarUrl: string | null;
    username: string | null; platformJoinedAt: string; enrolledAt: string;
  };
  stats: {
    xp: number; coins: number; streakDays: number; longestStreak: number;
    lives: number; maxLives: number; streakFreezes: number; lastActiveAt: string | null;
  };
  courseProgress: { completedLessons: number; totalLessons: number; progressPct: number };
  access: string;
  plan: string | null;
  lessons: {
    id: string; title: string; index: number; sectionTitle: string;
    completed: boolean; completedAt: string | null; timeSpentSeconds: number | null;
  }[];
  activityCalendar: { date: string; lessonsCompleted: number; xpEarned: number; streakExtended: boolean }[];
  recentCompletions: { lessonTitle: string; completedAt: string }[];
}

const BUCKETS = ['ALL', 'AT_RISK', 'SLIPPING', 'NOT_STARTED', 'ON_TRACK', 'CONSISTENT', 'COMPLETED'];
const BUCKET_LABELS: Record<string, string> = {
  ALL: 'All',
  AT_RISK: 'At Risk',
  SLIPPING: 'Slipping',
  NOT_STARTED: 'Not Started',
  ON_TRACK: 'On Track',
  CONSISTENT: 'Consistent',
  COMPLETED: 'Completed',
};

export function StudentsTab({ courseId }: { courseId: string }) {
  const [data, setData] = useState<StudentsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [detailOpenId, setDetailOpenId] = useState<string | null>(null);

  const fetchRoster = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: '25',
        status,
        ...(search.trim() && { search: search.trim() }),
      });
      const res = await fetch(`/api/analytics/courses/${courseId}/students?${params}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setData(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load students');
    } finally {
      setLoading(false);
    }
  }, [courseId, page, status, search]);

  useEffect(() => {
    void fetchRoster();
  }, [fetchRoster]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div className={styles.studentsRoot}>
      {/* FILTER CHIPS */}
      <div className={styles.filterChips}>
        {BUCKETS.map((b) => {
          const count = b === 'ALL' ? data?.total ?? 0 : data?.summary?.[b] ?? 0;
          return (
            <button
              key={b}
              className={`${styles.filterChip} ${status === b ? styles.filterChipActive : ''}`}
              onClick={() => { setStatus(b); setPage(1); }}
            >
              {BUCKET_LABELS[b]}
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* SEARCH */}
      <form
        className={styles.searchRow}
        onSubmit={(e) => { e.preventDefault(); setSearch(searchInput); setPage(1); }}
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
          title="No students found"
          body={search || status !== 'ALL'
            ? 'No students match this filter. Try clearing the search or picking another status.'
            : 'No one has enrolled yet. Share your course link to get your first learners!'}
        />
      ) : (
        <div className={styles.roster}>
          {data.students.map((s, i) => (
            <motion.button
              key={s.userId}
              className={styles.studentRow}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              onClick={() => setDetailOpenId(s.userId)}
            >
              <Avatar src={s.avatarUrl} name={s.fullName} size={42} />

              <div className={styles.studentIdentity}>
                <span className={styles.studentName}>{s.fullName}</span>
                <span className={styles.studentUsername}>
                  {s.username ? `@${s.username}` : `Joined ${timeAgo(s.joinedCourseAt)}`}
                </span>
              </div>

              <div className={styles.studentStatsCol}>
                <span className={styles.streakStat}>
                  <Flame size={14} color="#ff9600" />
                  {s.streakDays}
                </span>
                <span className={styles.livesStat}>
                  <Heart size={13} color="#ff4b4b" />
                  {s.lives}/{s.maxLives}
                </span>
              </div>

              <div className={styles.studentProgressCol}>
                <ProgressBar
                  pct={s.progressPct}
                  color={s.progressPct >= 100 ? '#ce82ff' : '#58cc02'}
                />
                <span className={styles.progressText}>
                  {s.completedLessons}/{s.totalLessons} lessons · {s.lastActiveAt ? timeAgo(s.lastActiveAt) : 'never active'}
                </span>
              </div>

              <div className={styles.studentChips}>
                <BucketChip bucket={s.bucket} />
                <AccessChip access={s.access} />
              </div>

              <ChevronRight size={16} color="#afafaf" />
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
          <span>Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* DETAIL DRAWER */}
      <AnimatePresence>
        {detailOpenId && (
          <StudentDetailDrawer
            courseId={courseId}
            studentId={detailOpenId}
            onClose={() => setDetailOpenId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── STUDENT DETAIL DRAWER ────────────────────────────────────────── */
function StudentDetailDrawer({
  courseId, studentId, onClose,
}: { courseId: string; studentId: string; onClose: () => void }) {
  const [detail, setDetail] = useState<StudentDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/analytics/courses/${courseId}/students/${studentId}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error(`Could not load this student (${res.status})`);
        const d = await res.json();
        if (!cancelled) setDetail(d);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load');
      }
    })();
    return () => { cancelled = true; };
  }, [courseId, studentId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <>
      <motion.div
        className={styles.drawerBackdrop}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        className={styles.drawer}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      >
        <button className={styles.drawerClose} onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {!detail && !error && <RowsSkeleton count={5} />}
        {error && <ErrorState message={error} onRetry={onClose} />}

        {detail && (
          <div className={styles.drawerBody}>
            {/* Identity */}
            <div className={styles.drawerHeader}>
              <Avatar src={detail.student.avatarUrl} name={detail.student.fullName} size={56} />
              <div>
                <h3 className={styles.drawerName}>{detail.student.fullName}</h3>
                <span className={styles.drawerUsername}>
                  {detail.student.username ? `@${detail.student.username}` : '—'}
                </span>
                <div className={styles.drawerChips}>
                  <AccessChip access={detail.access} />
                  {detail.plan && <span className={`${styles.chip} ${styles.chipBlue}`}>{detail.plan}</span>}
                </div>
              </div>
            </div>

            {/* Stat tiles */}
            <div className={styles.statTiles}>
              <div className={styles.statTile}>
                <Zap size={16} color="#1cb0f6" />
                <strong>{detail.stats.xp.toLocaleString()}</strong>
                <span>XP</span>
              </div>
              <div className={styles.statTile}>
                <Flame size={16} color="#ff9600" />
                <strong>{detail.stats.streakDays}</strong>
                <span>Streak</span>
              </div>
              <div className={styles.statTile}>
                <Trophy size={16} color="#ce82ff" />
                <strong>{detail.stats.longestStreak}</strong>
                <span>Best Streak</span>
              </div>
              <div className={styles.statTile}>
                <Heart size={16} color="#ff4b4b" />
                <strong>{detail.stats.lives}/{detail.stats.maxLives}</strong>
                <span>Lives</span>
              </div>
              <div className={styles.statTile}>
                <Snowflake size={16} color="#1899d6" />
                <strong>{detail.stats.streakFreezes}</strong>
                <span>Freezes</span>
              </div>
            </div>

            {/* Course progress */}
            <h4 className={styles.drawerSectionTitle}>Course Progress</h4>
            <div className={styles.courseProgressBox}>
              <ProgressBar pct={detail.courseProgress.progressPct} />
              <span className={styles.courseProgressText}>
                {detail.courseProgress.completedLessons} of {detail.courseProgress.totalLessons} lessons ·{' '}
                last active {detail.stats.lastActiveAt ? timeAgo(detail.stats.lastActiveAt) : 'never'}
              </span>
            </div>

            {/* Activity calendar */}
            <h4 className={styles.drawerSectionTitle}>Last 35 Days</h4>
            <ActivityCalendar days={detail.activityCalendar} />

            {/* Lesson checklist */}
            <h4 className={styles.drawerSectionTitle}>Lessons ({detail.courseProgress.completedLessons}/{detail.courseProgress.totalLessons})</h4>
            <div className={styles.lessonChecklist}>
              {detail.lessons.map((l) => (
                <div key={l.id} className={`${styles.lessonCheckRow} ${l.completed ? styles.lessonCheckDone : ''}`}>
                  {l.completed ? (
                    <CheckCircle2 size={16} color="#58cc02" />
                  ) : (
                    <Circle size={16} color="#afafaf" />
                  )}
                  <span className={styles.lessonCheckTitle}>{l.index + 1}. {l.title}</span>
                  {l.timeSpentSeconds !== null && l.timeSpentSeconds > 0 && (
                    <span className={styles.lessonCheckTime}>
                      <Clock size={11} />
                      {Math.round(l.timeSpentSeconds / 60)}m
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Recent completions */}
            {detail.recentCompletions.length > 0 && (
              <>
                <h4 className={styles.drawerSectionTitle}>Recent Activity</h4>
                <div className={styles.recentList}>
                  {detail.recentCompletions.map((r, i) => (
                    <div key={i} className={styles.recentRow}>
                      <BookOpen size={14} color="#1cb0f6" />
                      <span>{r.lessonTitle}</span>
                      <span className={styles.recentWhen}>{timeAgo(r.completedAt)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </motion.aside>
    </>
  );
}

/* ─── Activity heatmap (35 days) ───────────────────────────────────── */
function ActivityCalendar({ days }: { days: StudentDetail['activityCalendar'] }) {
  const byDate = new Map(days.map((d) => [d.date, d]));
  const cells: React.ReactNode[] = [];
  const dayMs = 24 * 60 * 60 * 1000;

  for (let i = 34; i >= 0; i--) {
    const d = new Date(Date.now() - i * dayMs);
    const key = d.toISOString().slice(0, 10);
    const entry = byDate.get(key);
    let level = 0;
    if (entry) {
      if (entry.xpEarned > 60) level = 4;
      else if (entry.xpEarned > 30) level = 3;
      else if (entry.xpEarned > 10) level = 2;
      else level = 1;
    }
    cells.push(
      <div
        key={key}
        className={`${styles.heatCell} ${styles[`heat_${level}`]}`}
        title={`${key}${entry ? ` · ${entry.xpEarned} XP · ${entry.lessonsCompleted} lesson${entry.lessonsCompleted === 1 ? '' : 's'}` : ' · no activity'}`}
      />,
    );
  }

  return <div className={styles.heatGrid}>{cells}</div>;
}
