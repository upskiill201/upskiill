'use client';

/**
 * /creator/courses — every course, where it stands, and one tap back in.
 * Cards show the cover, status (draft → in review → approved → live),
 * lessons ready, and learners; filters narrow by stage. Duplicate and delete
 * sit on each card.
 */

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Copy, Plus, Trash2, Users } from 'lucide-react';
import { CourseCover } from '@/components/course/CourseCover';
import { courseStage, type CourseStage } from '@/lib/creator/courseStatus';
import { extractErrorMessage } from '@/lib/apiError';
import { playSound } from '@/lib/audio/lessonSounds';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import b from '@/components/lesson-builder/Builder.module.css';
import s from '@/components/course-workspace/Workspace.module.css';

interface ListCourse {
  id: string;
  title: string;
  category: string | null;
  subcategory: string | null;
  thumbnailUrl: string | null;
  published: boolean;
  reviewStatus: string;
  updatedAt: string;
  totalLessons: number;
  sections: { lessons?: { status?: string }[] }[];
  _count?: { enrollments?: number };
}

type Filter = 'all' | 'building' | 'review' | 'live';

const FILTERS: { id: Filter; label: string; stages: CourseStage[] }[] = [
  { id: 'all', label: 'All', stages: [] },
  { id: 'building', label: 'Building', stages: ['draft', 'changes', 'rejected'] },
  { id: 'review', label: 'In review', stages: ['in-review', 'approved'] },
  { id: 'live', label: 'Live', stages: ['live'] },
];

export default function CreatorCoursesPage() {
  useStandaloneSound();
  const router = useRouter();
  const [courses, setCourses] = useState<ListCourse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch('/api/courses/instructor/me', { credentials: 'include', cache: 'no-store' });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch {
      setError('Your courses didn’t load.');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const visible = useMemo(() => {
    if (!courses) return [];
    const f = FILTERS.find((x) => x.id === filter)!;
    return f.stages.length ? courses.filter((c) => f.stages.includes(courseStage(c.reviewStatus, c.published).stage)) : courses;
  }, [courses, filter]);

  const duplicate = async (c: ListCourse) => {
    setBusy(c.id);
    try {
      const res = await fetch(`/api/courses/${c.id}/duplicate`, { method: 'POST', credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
      playSound('post');
      router.push(`/creator/courses/${data.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The course could not be duplicated.');
      setBusy(null);
    }
  };

  const remove = async (c: ListCourse) => {
    if (!window.confirm(`Delete "${c.title}" for good? Its lessons go too. This can’t be undone.`)) return;
    setBusy(c.id);
    try {
      const res = await fetch(`/api/courses/${c.id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
      setCourses((list) => (list ?? []).filter((x) => x.id !== c.id));
      playSound('cardBack');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The course could not be deleted.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className={s.page}>
      <div className={s.listHead}>
        <div>
          <h1 className={s.listTitle}>My courses</h1>
          <p className={s.next}>Build bite-size lessons, submit for review, go live.</p>
        </div>
        <Link href="/creator/create" className={b.btnPrimary} onClick={() => playSound('start')}>
          <Plus size={16} aria-hidden="true" /> New course
        </Link>
      </div>

      {courses && courses.length > 0 && (
        <nav className={s.tabs} aria-label="Filter courses">
          {FILTERS.map((f, i) => (
            <button
              key={f.id}
              type="button"
              className={`${s.tab} ${filter === f.id ? s.tabOn : ''}`}
              onClick={() => {
                setFilter(f.id);
                playSound('navTap', i);
              }}
            >
              {f.label}
            </button>
          ))}
        </nav>
      )}

      {error && (
        <div className={`${b.banner} ${b.bannerBad}`} style={{ margin: 0 }}>
          <span className={b.bannerText}>{error}</span>
          <button type="button" className={b.btn} onClick={() => void load()}>
            Try again
          </button>
        </div>
      )}

      {!courses && !error && (
        <div className={s.grid} aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className={s.skeleton} />
          ))}
        </div>
      )}

      {courses && courses.length === 0 && (
        <div className={b.empty}>
          <strong>Your first course starts here</strong>
          Pick a topic and a level, and Tey sets up an outline you can fill with bite-size lessons.
          <Link href="/creator/create" className={b.btnPrimary}>
            <Plus size={16} aria-hidden="true" /> Create a course
          </Link>
        </div>
      )}

      {courses && courses.length > 0 && (
        <div className={s.grid}>
          {visible.map((c) => {
            const stage = courseStage(c.reviewStatus, c.published);
            const lessons = c.sections.flatMap((x) => x.lessons ?? []);
            const ready = lessons.filter((l) => l.status === 'published').length;
            const total = c.totalLessons || lessons.length;
            const pct = total ? Math.round((ready / total) * 100) : 0;
            return (
              <div key={c.id} style={{ position: 'relative' }}>
                <Link href={`/creator/courses/${c.id}`} className={s.courseCard} onClick={() => playSound('navTap', 2)} aria-busy={busy === c.id}>
                  <CourseCover id={c.id} category={c.category} thumbnailUrl={c.thumbnailUrl} sizes="(max-width: 640px) 100vw, 340px" glyphSize={36} className={s.courseCover} />
                  <div className={s.courseBody}>
                    <span className={s.pill} style={{ '--tone': stage.tone } as React.CSSProperties}>
                      {stage.label}
                    </span>
                    <span className={s.courseTitle}>{c.title}</span>
                    <div className={s.meta}>
                      <span>
                        <BookOpen size={13} aria-hidden="true" /> {ready}/{total} lessons ready
                      </span>
                      <span>
                        <Users size={13} aria-hidden="true" /> {c._count?.enrollments ?? 0}
                      </span>
                    </div>
                    <div className={s.bar} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Lessons ready">
                      <div className={s.barFill} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </Link>
                <span className={b.cardTools} style={{ position: 'absolute', top: 8, right: 8, background: 'var(--bg-card)', borderRadius: 12 }}>
                  <button type="button" className={b.tool} aria-label={`Duplicate ${c.title}`} disabled={busy === c.id} onClick={() => void duplicate(c)}>
                    <Copy size={16} />
                  </button>
                  <button type="button" className={`${b.tool} ${b.toolDanger}`} aria-label={`Delete ${c.title}`} disabled={busy === c.id} onClick={() => void remove(c)}>
                    <Trash2 size={16} />
                  </button>
                </span>
              </div>
            );
          })}
          {filter === 'all' && (
            <Link href="/creator/create" className={s.newCard} onClick={() => playSound('start')}>
              <Plus size={28} aria-hidden="true" /> New course
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
