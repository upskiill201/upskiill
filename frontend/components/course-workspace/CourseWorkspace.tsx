'use client';

/**
 * The course workspace — one place for everything about a course:
 *
 *   Curriculum  modules and lessons (each opens in the lesson builder)
 *   Details     what learners read before starting, cover, price
 *   Review      checklist, submit, reviewer notes, publish
 *
 * The hero always says where the course stands and what to do next, with a
 * one-tap "continue" into the next unfinished lesson.
 */

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Layers, ListChecks, Lock, PenLine, Play, Rocket, Settings2 } from 'lucide-react';
import { CourseCover } from '@/components/course/CourseCover';
import { courseStage, isLockedForReview } from '@/lib/creator/courseStatus';
import { normalizeCourseCategory, trackLabel } from '@/lib/creator/categories';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { playSound } from '@/lib/audio/lessonSounds';
import { CurriculumTab, type CurriculumSection } from './CurriculumTab';
import { DetailsTab, type CourseDetails } from './DetailsTab';
import { ReviewTab, readiness, type ReviewState } from './ReviewTab';
import b from '@/components/lesson-builder/Builder.module.css';
import s from './Workspace.module.css';

type Tab = 'curriculum' | 'details' | 'review';

type Load =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'ready'; course: CourseDetails & { published: boolean }; sections: CurriculumSection[]; review: ReviewState | null };

export function CourseWorkspace({ courseId }: { courseId: string }) {
  useStandaloneSound();
  const [load, setLoad] = useState<Load>({ state: 'loading' });
  const [tab, setTab] = useState<Tab>('curriculum');

  const fetchAll = useCallback(async () => {
    try {
      const [cRes, curRes, rRes] = await Promise.all([
        fetch(`/api/courses/${courseId}/draft`, { credentials: 'include', cache: 'no-store' }),
        fetch(`/api/courses/${courseId}/curriculum`, { credentials: 'include', cache: 'no-store' }),
        fetch(`/api/courses/${courseId}/review`, { credentials: 'include', cache: 'no-store' }),
      ]);
      if (!cRes.ok) {
        setLoad({ state: 'error', message: cRes.status === 404 ? 'This course could not be found.' : cRes.status === 403 ? 'This course belongs to someone else.' : 'The course didn’t load.' });
        return;
      }
      const course = await cRes.json();
      const raw = curRes.ok ? await curRes.json() : [];
      const sections: CurriculumSection[] = (Array.isArray(raw) ? raw : []).map((sec: { id: string; title: string; lessons?: { id: string; title: string; status: string; durationMinutes?: number }[] }) => ({
        id: sec.id,
        title: sec.title,
        lessons: (sec.lessons ?? []).map((l) => ({ id: l.id, title: l.title, status: l.status, durationMinutes: l.durationMinutes })),
      }));
      const review = rRes.ok ? ((await rRes.json()) as ReviewState) : null;
      setLoad({ state: 'ready', course, sections, review });
    } catch {
      setLoad({ state: 'error', message: 'A network error stopped the course from loading.' });
    }
  }, [courseId]);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('tab');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (t === 'details' || t === 'review') setTab(t);
    void fetchAll();
  }, [fetchAll]);

  const pick = (t: Tab, i: number) => {
    setTab(t);
    playSound('navTap', i);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', t);
    window.history.replaceState(null, '', url);
  };

  if (load.state === 'loading') {
    return (
      <div className={s.page} aria-busy="true">
        <div className={s.skeleton} style={{ minHeight: 180 }} />
        <div className={s.skeleton} />
      </div>
    );
  }

  if (load.state === 'error') {
    return (
      <div className={s.page}>
        <div className={b.empty}>
          <strong>{load.message}</strong>
          <div className={b.row} style={{ justifyContent: 'center' }}>
            <button type="button" className={b.btn} onClick={() => void fetchAll()}>
              Try again
            </button>
            <Link href="/creator/courses" className={b.btnGhost}>
              My courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { course, sections, review } = load;
  const stage = courseStage(review?.reviewStatus, course.published);
  const locked = isLockedForReview(review?.reviewStatus);
  const lessons = sections.flatMap((x) => x.lessons);
  const readyCount = lessons.filter((l) => l.status === 'published').length;
  const nextLesson = lessons.find((l) => l.status !== 'published') ?? lessons[0];
  const reviewNeedsYou = stage.stage === 'changes' || stage.stage === 'approved' || (stage.stage === 'draft' && readiness(course, sections).every((c) => c.ok));
  const track = normalizeCourseCategory(course.category);

  return (
    <div className={s.page}>
      <Link href="/creator/courses" className={s.back} onClick={() => playSound('cardBack')}>
        <ArrowLeft size={16} aria-hidden="true" /> My courses
      </Link>

      <section className={s.hero}>
        <CourseCover id={course.id} category={course.category} thumbnailUrl={course.thumbnailUrl} sizes="200px" glyphSize={36} className={s.cover} />
        <div className={s.heroText}>
          <span className={s.pill} style={{ '--tone': stage.tone } as React.CSSProperties}>
            {stage.label}
          </span>
          <h1 className={s.heroTitle}>{course.title}</h1>
          <div className={s.meta}>
            <span>
              <Layers size={14} aria-hidden="true" /> {trackLabel(track) || course.category || 'No track yet'}
              {course.subcategory ? ` · ${course.subcategory}` : ''}
            </span>
            <span>
              <BookOpen size={14} aria-hidden="true" /> {sections.length} module{sections.length === 1 ? '' : 's'} · {lessons.length} lesson{lessons.length === 1 ? '' : 's'}
            </span>
            <span>
              <ListChecks size={14} aria-hidden="true" /> {readyCount}/{lessons.length} ready
            </span>
          </div>
          <p className={s.next}>{stage.next}</p>
          <div className={s.heroActions}>
            {nextLesson && !locked && (
              <Link href={`/creator/courses/${course.id}/lesson-builder/${nextLesson.id}`} className={b.btnPrimary} onClick={() => playSound('start')}>
                <PenLine size={16} aria-hidden="true" /> {readyCount < lessons.length ? `Continue: ${nextLesson.title}` : 'Edit lessons'}
              </Link>
            )}
            {lessons[0] && (
              <a href={`/preview/lesson/${lessons[0].id}`} target="_blank" rel="noopener" className={b.btn}>
                <Play size={16} aria-hidden="true" /> Play as a learner
              </a>
            )}
            {stage.stage === 'approved' && (
              <button type="button" className={b.btn} onClick={() => pick('review', 2)}>
                <Rocket size={16} aria-hidden="true" /> Publish
              </button>
            )}
          </div>
        </div>
      </section>

      {locked && (
        <div className={b.banner} style={{ margin: 0 }}>
          <Lock size={16} aria-hidden="true" />
          <span className={b.bannerText}>This course is in review, so it’s locked for now. You can still play it and read everything.</span>
        </div>
      )}

      <nav className={s.tabs} aria-label="Course sections">
        {(
          [
            { id: 'curriculum', label: 'Curriculum', Icon: BookOpen },
            { id: 'details', label: 'Details', Icon: Settings2 },
            { id: 'review', label: 'Review & publish', Icon: Rocket },
          ] as const
        ).map((t, i) => (
          <button key={t.id} type="button" className={`${s.tab} ${tab === t.id ? s.tabOn : ''}`} aria-current={tab === t.id ? 'page' : undefined} onClick={() => pick(t.id, i)}>
            <t.Icon size={16} aria-hidden="true" /> {t.label}
            {t.id === 'review' && reviewNeedsYou && <span className={s.dot} aria-label="Needs you" />}
          </button>
        ))}
      </nav>

      {tab === 'curriculum' && (
        <CurriculumTab
          courseId={course.id}
          sections={sections}
          locked={locked}
          onChange={(next) => setLoad({ ...load, sections: next })}
          onReload={() => void fetchAll()}
        />
      )}
      {tab === 'details' && <DetailsTab course={course} locked={locked} onSaved={(c) => setLoad({ ...load, course: { ...course, ...c } })} />}
      {tab === 'review' && <ReviewTab course={course} published={course.published} sections={sections} review={review} onChanged={() => void fetchAll()} />}
    </div>
  );
}

export default CourseWorkspace;
