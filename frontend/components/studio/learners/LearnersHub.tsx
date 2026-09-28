'use client';

/**
 * /creator/students — the creator's learners, one course at a time.
 *
 *   Needs you   the quiet ones to nudge and the nearly-finished to cheer,
 *               straight from the course pulse, one tap to act on all of them
 *   Roster      every learner as a Duolingo row: segment, streak, progress,
 *               last seen, and a nudge or cheer button (with "nudged 2d ago")
 *
 * Contact details never appear: creators see names, avatars and learning.
 */

import Link from 'next/link';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import useSWR from 'swr';
import { ChevronRight, Flame, Plus, Search } from 'lucide-react';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { playSound } from '@/lib/audio/lessonSounds';
import {
  ago,
  studioFetch,
  studioKeys,
  type Callout,
  type CoursePulse,
  type Face,
  type NudgeRecord,
} from '@/lib/creator/studio';
import { CourseSwitcher, useStudioCourse } from '../CourseSwitcher';
import { NudgeSheet, type NudgeKind } from '../NudgeSheet';
import { Callouts } from '../analytics/Callouts';
import {
  Bar,
  EmptyCard,
  ErrorCard,
  PageHead,
  PersonAvatar,
  Pill,
  Section,
  Skel,
  studio as s,
} from '../StudioParts';
import { SEGMENTS, SEGMENT_ORDER, type RosterPayload, type RosterRow, type Segment } from './segments';

type Sort = 'RISK' | 'RECENT_ACTIVITY' | 'PROGRESS' | 'NAME';
const SORTS: { value: Sort; label: string }[] = [
  { value: 'RISK', label: 'Needs you first' },
  { value: 'RECENT_ACTIVITY', label: 'Recently active' },
  { value: 'PROGRESS', label: 'Most progress' },
  { value: 'NAME', label: 'Name' },
];
const PAGE_SIZE = 30;
const COOLDOWN = { NUDGE: 72 * 3600_000, CHEER: 24 * 3600_000 };

export function LearnersHub() {
  useStandaloneSound();
  // Only live courses have learners (the roster covers published courses).
  const { courses, course, setCourse, loading, error, reload } = useStudioCourse({ publishedOnly: true });
  const [segment, setSegment] = useState<Segment | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim()), 250);
    return () => clearTimeout(t);
  }, [search]);
  const [sort, setSort] = useState<Sort>('RISK');
  const [page, setPage] = useState(1);
  const [nudge, setNudge] = useState<{ kind: NudgeKind; ids: string[]; faces: Face[] } | null>(null);
  // When the page opened: what "nudged recently" is measured from.
  const [now] = useState(() => Date.now());

  const rosterKey = course
    ? `/api/students?courseId=${course.id}&segment=${segment}&sort=${sort}&page=${page}&pageSize=${PAGE_SIZE}&search=${encodeURIComponent(query)}`
    : null;
  const roster = useSWR<RosterPayload>(rosterKey, studioFetch, { keepPreviousData: true });
  const pulse = useSWR<CoursePulse>(course ? studioKeys.pulse(course.id, 30) : null, studioFetch);
  const history = useSWR<NudgeRecord[]>(course ? studioKeys.nudges(`?courseId=${course.id}`) : null, studioFetch);

  const lastNudge = useMemo(() => {
    const m = new Map<string, NudgeRecord>();
    for (const r of history.data ?? []) if (!m.has(r.learnerId)) m.set(r.learnerId, r);
    return m;
  }, [history.data]);

  const needsYou = (pulse.data?.callouts ?? []).filter((c) => c.action?.kind === 'nudge' || c.action?.kind === 'cheer');

  const onCallout = (c: Callout) => {
    if (!c.action?.learnerIds?.length) return;
    setNudge({ kind: c.action.kind === 'cheer' ? 'CHEER' : 'NUDGE', ids: c.action.learnerIds, faces: c.action.faces ?? [] });
  };

  if (error) {
    return (
      <div className={s.page}>
        <PageHead title="Learners" />
        <ErrorCard message="Your courses didn’t load." onRetry={() => void reload()} />
      </div>
    );
  }
  if (loading) {
    return (
      <div className={s.page} aria-busy="true">
        <Skel h={56} w="50%" />
        <Skel h={88} />
        <Skel h={420} />
      </div>
    );
  }
  if (!course) {
    return (
      <div className={s.page}>
        <PageHead title="Learners" />
        <EmptyCard
          pose="waving"
          title="No learners yet"
          action={
            <Link href="/creator/create" className={s.btnPrimary}>
              <Plus size={16} aria-hidden="true" /> Create a course
            </Link>
          }
        >
          Publish a course and your learners show up here, with everything you need to help them finish.
        </EmptyCard>
      </div>
    );
  }

  const summary = roster.data?.summary;
  const total = summary ? Object.values(summary).reduce((a, n) => a + n, 0) : 0;
  const pages = roster.data ? Math.max(1, Math.ceil(roster.data.total / PAGE_SIZE)) : 1;

  return (
    <div className={s.page}>
      <PageHead
        title="Learners"
        sub="Everyone learning your course, and who could use a word from you."
        actions={<CourseSwitcher courses={courses} course={course} onPick={(id) => { setCourse(id); setPage(1); }} />}
      />

      {needsYou.length > 0 && (
        <Section title="Needs you" note="Nudges open each learner’s next lesson. Cheers help the almost-done finish.">
          <Callouts callouts={needsYou} onAction={onCallout} />
        </Section>
      )}

      <Section title="Everyone" note={roster.data ? `${roster.data.total} ${segment === 'ALL' ? '' : `${SEGMENTS[segment].label.toLowerCase()} `}learners` : undefined}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label className={s.search}>
            <Search size={16} aria-hidden="true" />
            <span className={s.srOnly}>Search learners</span>
            <input
              className={s.input}
              placeholder="Search by name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </label>
          <label>
            <span className={s.srOnly}>Sort</span>
            <select
              className={s.select}
              style={{ minHeight: 46 }}
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as Sort);
                setPage(1);
                playSound('select');
              }}
            >
              {SORTS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={s.chips} role="group" aria-label="Filter by segment">
          <button
            type="button"
            className={`${s.chip} ${segment === 'ALL' ? s.chipOn : ''}`}
            onClick={() => {
              setSegment('ALL');
              setPage(1);
              playSound('navTap', 0);
            }}
          >
            All {total > 0 && <span className={s.hint}>{total}</span>}
          </button>
          {SEGMENT_ORDER.filter((k) => (summary?.[k] ?? 0) > 0).map((k, i) => (
            <button
              key={k}
              type="button"
              className={`${s.chip} ${segment === k ? s.chipOn : ''}`}
              onClick={() => {
                setSegment(k);
                setPage(1);
                playSound('navTap', i + 1);
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: 999, background: SEGMENTS[k].tone }} aria-hidden="true" />
              {SEGMENTS[k].label}
              <span className={s.hint}>{summary?.[k]}</span>
            </button>
          ))}
        </div>

        {roster.error && !roster.data ? (
          <ErrorCard message={roster.error.message || 'Learners didn’t load.'} onRetry={() => void roster.mutate()} />
        ) : !roster.data ? (
          <div className={s.list} aria-busy="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={s.row}>
                <Skel h={44} w={44} r={999} />
                <span className={s.rowMain}>
                  <Skel h={16} w="40%" />
                  <Skel h={12} w="60%" />
                </span>
              </div>
            ))}
          </div>
        ) : roster.data.students.length === 0 ? (
          <EmptyCard pose="searching" title={search ? 'Nobody by that name' : 'No learners here'}>
            {search ? 'Try another name.' : total === 0 ? 'Share your course to get your first learners.' : 'Nobody in this group right now.'}
          </EmptyCard>
        ) : (
          <div className={s.list} style={{ opacity: roster.isValidating && roster.data ? 0.7 : 1 }}>
            {roster.data.students.map((r) => (
              <LearnerRow
                key={r.id}
                row={r}
                last={lastNudge.get(r.id)}
                now={now}
                onAct={(kind) => setNudge({ kind, ids: [r.id], faces: [r] })}
              />
            ))}
          </div>
        )}

        {pages > 1 && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
            <button type="button" className={s.btn} disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span className={s.hint}>
              Page {page} of {pages}
            </span>
            <button type="button" className={s.btn} disabled={page >= pages} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        )}
      </Section>

      {nudge && (
        <NudgeSheet
          open
          kind={nudge.kind}
          courseId={course.id}
          courseTitle={course.title}
          learnerIds={nudge.ids}
          faces={nudge.faces}
          onClose={() => setNudge(null)}
          onSent={() => {
            void history.mutate();
            void pulse.mutate();
          }}
        />
      )}
    </div>
  );
}

function LearnerRow({
  row: r,
  last,
  now,
  onAct,
}: {
  row: RosterRow;
  last?: NudgeRecord;
  now: number;
  onAct: (k: NudgeKind) => void;
}) {
  const seg = SEGMENTS[r.segment] ?? SEGMENTS.ACTIVE;
  const kind = seg.action;
  const recent = last && last.kind === kind && now - Date.parse(last.createdAt) < COOLDOWN[kind];
  return (
    <div className={`${s.row} ${s.rowWrap}`}>
      <PersonAvatar face={r} size={46} />
      <Link
        href={`/creator/students/${r.id}`}
        className={s.rowMain}
        style={{ color: 'inherit', textDecoration: 'none' }}
        onClick={() => playSound('navTap', 2)}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <span className={s.rowTitle}>{r.fullName}</span>
          <Pill tone={seg.tone}>{seg.label}</Pill>
        </span>
        <span className={s.rowMeta}>
          {r.streakDays > 0 && (
            <span style={{ color: 'var(--warning)', fontWeight: 800 }}>
              <Flame size={13} aria-hidden="true" /> {r.streakDays}
            </span>
          )}
          <span>
            {r.completedLessons}/{r.totalLessons} lessons
          </span>
          <span>Active {ago(r.lastActivityAt)}</span>
          {r.avgQuizScore !== null && <span>{Math.round(r.avgQuizScore)}% right</span>}
        </span>
        <span style={{ maxWidth: 280 }}>
          <Bar pct={r.progressPct} tone={seg.tone} label={`${r.fullName}'s progress`} />
        </span>
      </Link>
      <span className={s.rowSide}>
        {recent ? (
          <span className={s.hint}>
            {kind === 'NUDGE' ? 'Nudged' : 'Cheered'} {ago(last.createdAt)}
          </span>
        ) : (
          <button
            type="button"
            className={`${kind === 'CHEER' ? s.btnGood : s.btn} ${s.btnSm}`}
            onClick={() => onAct(kind)}
            style={kind === 'CHEER' ? undefined : ({ color: 'var(--color-brand)' } as CSSProperties)}
          >
            {kind === 'NUDGE' ? 'Nudge' : 'Cheer'}
          </button>
        )}
        <Link href={`/creator/students/${r.id}`} className={s.iconBtn} aria-label={`Open ${r.fullName}`}>
          <ChevronRight size={18} />
        </Link>
      </span>
    </div>
  );
}
