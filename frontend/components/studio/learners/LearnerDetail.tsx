'use client';

/**
 * /creator/students/:id — one learner, the way the learner profile looks:
 * who they are, their streak and progress, each of your courses they take
 * (where they are, what's next), their habits, where they struggle, their
 * journey, and every note you've sent them. NUDGE and CHEER sit up top.
 */

import Link from 'next/link';
import { useMemo, useState, type CSSProperties } from 'react';
import useSWR from 'swr';
import {
  ArrowLeft,
  BarChart3,
  BookOpenCheck,
  CalendarDays,
  Clock,
  Flame,
  MessageSquareQuote,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { ago, studioFetch, studioKeys, type NudgeRecord } from '@/lib/creator/studio';
import { Columns } from '../Charts';
import { NudgeSheet, type NudgeKind } from '../NudgeSheet';
import {
  Bar,
  ErrorCard,
  PersonAvatar,
  Pill,
  Section,
  Skel,
  StatTile,
  studio as s,
} from '../StudioParts';
import { SEGMENTS, type Segment } from './segments';

interface Detail {
  identity: { id: string; fullName: string; username: string | null; avatarUrl: string | null };
  segment: Segment;
  platformJoinedAt: string;
  firstEnrolledAt: string;
  lastActivityAt: string | null;
  totals: {
    lessonsCompleted: number;
    learningTimeMinutes: number;
    avgSessionMinutes: number;
    currentStreakDays: number;
    longestStreakDays: number;
    xpPlatform: number;
  };
  behavior: {
    lessonsPerWeek: number;
    activeDaysPerWeek: number;
    consistencyPct: number;
    daysSinceLastActivity: number | null;
    paceTrend: 'UP' | 'DOWN' | 'FLAT';
    paceChangePct: number;
    weekdayHeat: { label: string; count: number }[];
  };
  courses: {
    courseId: string;
    title: string;
    enrolledAt: string;
    lastActivityAt: string | null;
    completedLessons: number;
    totalLessons: number;
    progressPct: number;
    timeSpentMinutes: number;
    avgQuizScore: number | null;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'NEAR_DONE' | 'COMPLETED';
    stoppedAtLessonTitle: string | null;
  }[];
  performance: {
    improvementTrendPct: number | null;
    strongLessons: { title: string; courseTitle: string; score: number }[];
    struggledLessons: { title: string; courseTitle: string; attempts: number | null; minutes: number | null }[];
  };
  journey: { events: { at: string; kind: string; label: string; courseTitle?: string; detail?: string }[] };
  feedback: { reviewId: string; courseTitle: string; rating: number; comment: string | null; createdAt: string }[];
}

const STATUS: Record<Detail['courses'][number]['status'], { label: string; tone: string }> = {
  NOT_STARTED: { label: 'Not started', tone: 'var(--text-muted)' },
  IN_PROGRESS: { label: 'Learning', tone: 'var(--color-brand)' },
  NEAR_DONE: { label: 'Almost done', tone: 'var(--brand-purple)' },
  COMPLETED: { label: 'Finished', tone: 'var(--success-green)' },
};

const minutes = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`);
const date = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

export function LearnerDetail({ learnerId }: { learnerId: string }) {
  useStandaloneSound();
  const { data, error, isLoading, mutate } = useSWR<Detail>(`/api/students/${encodeURIComponent(learnerId)}`, studioFetch);
  const history = useSWR<NudgeRecord[]>(studioKeys.nudges(`?learnerId=${encodeURIComponent(learnerId)}`), studioFetch);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [sheet, setSheet] = useState<NudgeKind | null>(null);

  const courses = useMemo(
    () => [...(data?.courses ?? [])].sort((a, b) => (b.lastActivityAt ?? b.enrolledAt).localeCompare(a.lastActivityAt ?? a.enrolledAt)),
    [data?.courses],
  );
  const course = courses.find((c) => c.courseId === courseId) ?? courses[0];

  if (error) {
    return (
      <div className={s.page}>
        <Link href="/creator/students" className={s.back}>
          <ArrowLeft size={16} aria-hidden="true" /> Learners
        </Link>
        <ErrorCard message={error.message || 'This learner didn’t load.'} onRetry={() => void mutate()} />
      </div>
    );
  }
  if (isLoading || !data) {
    return (
      <div className={s.page} aria-busy="true">
        <Skel h={20} w={100} />
        <Skel h={180} />
        <div className={s.stats}>
          {[0, 1, 2, 3].map((i) => (
            <Skel key={i} h={112} r={18} />
          ))}
        </div>
        <Skel h={240} />
      </div>
    );
  }

  const seg = SEGMENTS[data.segment] ?? SEGMENTS.ACTIVE;
  const b = data.behavior;
  const face = { id: data.identity.id, fullName: data.identity.fullName, avatarUrl: data.identity.avatarUrl };

  return (
    <div className={s.page}>
      <Link href="/creator/students" className={s.back}>
        <ArrowLeft size={16} aria-hidden="true" /> Learners
      </Link>

      <div className={s.card} style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <PersonAvatar face={data.identity} size={88} />
        <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <h1 className={s.title} style={{ fontSize: 26 }}>
              {data.identity.fullName}
            </h1>
            <Pill tone={seg.tone}>{seg.label}</Pill>
          </span>
          {data.identity.username && <span className={s.sub}>@{data.identity.username}</span>}
          <span className={s.rowMeta}>
            <span>Learning with you since {date(data.firstEnrolledAt)}</span>
            <span>Active {ago(data.lastActivityAt)}</span>
          </span>
        </div>
        {course && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
            {courses.length > 1 && (
              <label className={s.label}>
                About
                <select className={s.select} value={course.courseId} onChange={(e) => setCourseId(e.target.value)}>
                  {courses.map((c) => (
                    <option key={c.courseId} value={c.courseId}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <span style={{ display: 'flex', gap: 8 }}>
              <button type="button" className={s.btnPrimary} style={{ flex: 1 }} onClick={() => setSheet('NUDGE')}>
                Nudge
              </button>
              <button type="button" className={s.btnGood} style={{ flex: 1 }} onClick={() => setSheet('CHEER')}>
                Cheer
              </button>
            </span>
          </div>
        )}
      </div>

      <div className={s.stats}>
        <StatTile
          icon={<Flame size={18} />}
          tone="var(--warning)"
          label="Day streak"
          value={data.totals.currentStreakDays}
          foot={`Longest ${data.totals.longestStreakDays}`}
        />
        <StatTile
          icon={<BookOpenCheck size={18} />}
          tone="var(--success-green)"
          label="Lessons done"
          value={data.totals.lessonsCompleted}
          foot={`${b.lessonsPerWeek} a week lately`}
        />
        <StatTile
          icon={<Clock size={18} />}
          tone="var(--brand-purple)"
          label="Time learning"
          value={minutes(data.totals.learningTimeMinutes)}
          foot={`About ${data.totals.avgSessionMinutes} min per learning day`}
        />
        <StatTile
          icon={<CalendarDays size={18} />}
          label="Consistency"
          value={`${b.consistencyPct}%`}
          foot={
            b.paceTrend === 'FLAT' ? (
              'Steady pace'
            ) : (
              <span className={b.paceTrend === 'UP' ? s.deltaUp : s.deltaDown}>
                {b.paceTrend === 'UP' ? <TrendingUp size={14} aria-hidden="true" /> : <TrendingDown size={14} aria-hidden="true" />}
                Pace {b.paceChangePct > 0 ? '+' : ''}
                {b.paceChangePct}%
              </span>
            )
          }
        />
      </div>

      <Section title={courses.length === 1 ? 'Your course' : 'Your courses'}>
        <div className={s.grid2}>
          {courses.map((c) => {
            const st = STATUS[c.status];
            return (
              <div key={c.courseId} className={s.card} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 16 }}>{c.title}</strong>
                  <Pill tone={st.tone}>{st.label}</Pill>
                </span>
                <Bar pct={c.progressPct} tone={st.tone} label={`${c.title} progress`} />
                <span className={s.rowMeta}>
                  <span>
                    {c.completedLessons}/{c.totalLessons} lessons
                  </span>
                  <span>{minutes(c.timeSpentMinutes)}</span>
                  {c.avgQuizScore !== null && <span>{Math.round(c.avgQuizScore)}% first-try right</span>}
                  <span>Active {ago(c.lastActivityAt)}</span>
                </span>
                {c.stoppedAtLessonTitle && c.status !== 'COMPLETED' && (
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                    Next up: <strong style={{ color: 'var(--color-ink)' }}>{c.stoppedAtLessonTitle}</strong>
                  </span>
                )}
                <Link href={`/creator/analytics?course=${c.courseId}`} className={`${s.btn} ${s.btnSm}`} style={{ alignSelf: 'flex-start' }}>
                  <BarChart3 size={14} aria-hidden="true" /> Course analytics
                </Link>
              </div>
            );
          })}
        </div>
      </Section>

      <div className={s.grid2}>
        <Section title="When they learn" note="Lessons by weekday, last 60 days.">
          <div className={s.card}>
            <Columns
              points={b.weekdayHeat.map((w) => ({ key: w.label, axis: w.label, label: w.label, value: w.count }))}
              unit={(n) => `${n} ${n === 1 ? 'lesson' : 'lessons'}`}
              caption="Lessons by weekday"
              height={120}
            />
          </div>
        </Section>

        <Section title="Where they struggle">
          {data.performance.struggledLessons.length === 0 && data.performance.strongLessons.length === 0 ? (
            <div className={s.empty}>Nothing stands out yet.</div>
          ) : (
            <div className={s.list}>
              {data.performance.struggledLessons.slice(0, 4).map((l) => (
                <div key={`s-${l.title}`} className={s.row}>
                  <span className={s.statIcon} style={{ '--tone': 'var(--error-red)' } as CSSProperties} aria-hidden="true">
                    <Target size={16} />
                  </span>
                  <span className={s.rowMain}>
                    <span className={s.rowTitle}>{l.title}</span>
                    <span className={s.rowMeta}>
                      {l.attempts !== null && <span>{l.attempts} tries</span>}
                      {l.minutes !== null && <span>{l.minutes} min</span>}
                    </span>
                  </span>
                </div>
              ))}
              {data.performance.strongLessons.slice(0, 3).map((l) => (
                <div key={`g-${l.title}`} className={s.row}>
                  <span className={s.statIcon} style={{ '--tone': 'var(--success-green)' } as CSSProperties} aria-hidden="true">
                    <Star size={16} />
                  </span>
                  <span className={s.rowMain}>
                    <span className={s.rowTitle}>{l.title}</span>
                    <span className={s.rowMeta}>
                      <span>{Math.round(l.score)}% right</span>
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>

      <div className={s.grid2}>
        <Section title="Journey">
          {data.journey.events.length === 0 ? (
            <div className={s.empty}>No activity yet.</div>
          ) : (
            <ol className={s.list} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {data.journey.events.slice(0, 14).map((e, i) => (
                <li key={`${e.at}-${i}`} className={s.row}>
                  <span className={s.rowMain}>
                    <span style={{ fontSize: 14.5, fontWeight: 700 }}>{e.label}</span>
                    <span className={s.rowMeta}>
                      <span>{ago(e.at)}</span>
                      {e.courseTitle && courses.length > 1 && <span>{e.courseTitle}</span>}
                      {e.detail && <span>{e.detail}</span>}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </Section>

        <Section title="Between you">
          <div className={s.list}>
            {(history.data ?? []).length === 0 && data.feedback.length === 0 && (
              <div className={s.row}>
                <span className={s.hint}>No notes or reviews yet. A nudge from you is often all it takes.</span>
              </div>
            )}
            {(history.data ?? []).slice(0, 8).map((n) => (
              <div key={n.id} className={s.row} style={{ alignItems: 'flex-start' }}>
                <Pill tone={n.kind === 'NUDGE' ? 'var(--color-brand)' : 'var(--success-green)'}>
                  {n.kind === 'NUDGE' ? 'Nudge' : 'Cheer'}
                </Pill>
                <span className={s.rowMain}>
                  <span style={{ fontSize: 14, lineHeight: 1.45 }}>{n.message}</span>
                  <span className={s.rowMeta}>
                    <span>{ago(n.createdAt)}</span>
                    {courses.length > 1 && <span>{n.courseTitle}</span>}
                  </span>
                </span>
              </div>
            ))}
            {data.feedback.map((f) => (
              <div key={f.reviewId} className={s.row} style={{ alignItems: 'flex-start' }}>
                <span className={s.statIcon} style={{ '--tone': 'var(--warning)' } as CSSProperties} aria-hidden="true">
                  <MessageSquareQuote size={16} />
                </span>
                <span className={s.rowMain}>
                  <span style={{ fontWeight: 800 }}>
                    {f.rating}★ review{courses.length > 1 ? ` · ${f.courseTitle}` : ''}
                  </span>
                  {f.comment && <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{f.comment}</span>}
                  <span className={s.rowMeta}>
                    <span>{ago(f.createdAt)}</span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {sheet && course && (
        <NudgeSheet
          open
          kind={sheet}
          courseId={course.courseId}
          courseTitle={course.title}
          learnerIds={[data.identity.id]}
          faces={[face]}
          onClose={() => setSheet(null)}
          onSent={() => void history.mutate()}
        />
      )}
    </div>
  );
}
