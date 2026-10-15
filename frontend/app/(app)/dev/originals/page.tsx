'use client';

/**
 * Dev bench for Teyro Originals: plays course files through the real
 * LessonPlayer before they're loaded anywhere (docs/ORIGINALS_PLAYBOOK.md §10:
 * "played start to finish on a real phone in the preview route").
 *
 *   1. cd backend && npm run originals -- --export
 *   2. open /dev/originals (on a phone: the dev server's LAN address)
 *
 * Two ways to play. "As a learner" (the default) runs everything a learner
 * sees, from the start screen to the chapter map and the next lesson, with a
 * simulated save: nothing is written and no hearts are spent. "Admin read"
 * is the creator review mode: straight through, no chrome. Not linked
 * anywhere; 404 outside development.
 */

import { List, Map as MapIcon, Medal, Play, Trophy } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { LearningPath } from '@/components/home/LearningPath';
import type { LearningPath as LearningPathData } from '@/hooks/useCourse';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import { MILESTONE_LABEL, type LessonMilestone } from '@/lib/originals';

interface PreviewLesson {
  id: string;
  title: string;
  shortDescription: string;
  milestone: LessonMilestone | null;
  durationMinutes: number;
  xpReward: number;
  contentBlocks: Record<string, unknown>;
}

interface PreviewBundle {
  track: { slug: string; title: string };
  course: { id: string; slug: string; title: string; level: number; upcomingUnits?: number };
  units: { key: string; title: string; marker?: string | null; story?: string | null; lessons: PreviewLesson[] }[];
}

export default function OriginalsBench() {
  const [courses, setCourses] = useState<string[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [bundle, setBundle] = useState<PreviewBundle | null>(null);
  const [playing, setPlaying] = useState<PreviewLesson | null>(null);
  const [run, setRun] = useState(0);
  const [view, setView] = useState<'map' | 'list'>('map');
  // Lessons treated as finished on the map (preview only, never saved).
  const [completed, setCompleted] = useState<string[]>([]);
  // Play as a learner (simulated save) or as an admin read.
  const [asLearner, setAsLearner] = useState(true);
  // A paying learner: no paywall after lesson 5.
  const [paid, setPaid] = useState(false);

  // The real home map, fed from the course file: what a learner on the free
  // tier sees (lessons 1–5 free, the paywall from lesson 6).
  const path = useMemo<LearningPathData | null>(() => {
    if (!bundle) return null;
    const ordered = bundle.units.flatMap((u) => u.lessons);
    return {
      course: { id: bundle.course.id, slug: bundle.course.slug, title: bundle.course.title, category: 'AI' },
      sections: bundle.units.map((u) => ({
        id: u.key,
        title: u.title,
        description: u.story ?? null,
        marker: u.marker ?? null,
        lessons: u.lessons.map((l) => ({
          id: l.id,
          title: l.title,
          shortDescription: l.shortDescription,
          lessonType: 'interactive',
          xpReward: l.xpReward,
          durationMinutes: l.durationMinutes,
          isFreePreview: false,
          milestone: l.milestone,
        })),
      })),
      enrolled: true,
      completedLessons: completed,
      access: { hasAccess: paid, freePreviewLessonIds: ordered.slice(0, 5).map((l) => l.id) },
      original: {
        trackId: bundle.track.slug,
        trackSlug: bundle.track.slug,
        trackTitle: bundle.track.title,
        level: bundle.course.level,
        levelLabel: ['Beginner', 'Intermediate', 'Advanced'][bundle.course.level - 1] ?? 'Beginner',
        levelCount: 1,
        upcomingUnits: bundle.course.upcomingUnits ?? 0,
        forgivingHearts: bundle.course.level === 1,
        nextLevel: null,
      },
    };
  }, [bundle, completed, paid]);

  const lessonById = (id: string) => bundle?.units.flatMap((u) => u.lessons).find((l) => l.id === id) ?? null;
  const pretendDone = (n: number) => setCompleted((bundle?.units.flatMap((u) => u.lessons) ?? []).slice(0, n).map((l) => l.id));

  useEffect(() => {
    fetch('/api/dev/originals')
      .then((r) => r.json())
      .then((d) => {
        setCourses(d.courses ?? []);
        setMessage(d.message ?? null);
      })
      .catch(() => setMessage('Could not read the preview folder.'));
  }, []);

  if (process.env.NODE_ENV === 'production') notFound();

  const open = (slug: string) =>
    fetch(`/api/dev/originals?course=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then(setBundle)
      .catch(() => setMessage(`Could not open ${slug}.`));

  if (playing && bundle) {
    return (
      <LessonPlayer
        key={`${playing.id}-${run}`}
        lesson={playing}
        courseId={bundle.course.id}
        isReview={false}
        adminReviewMode={!asLearner}
        simulate={asLearner}
        pathOverride={path}
        onNextLesson={(next) => {
          // The lesson just played counts as done; the next one opens.
          setCompleted((c) => (c.includes(playing.id) ? c : [...c, playing.id]));
          const l = lessonById(next.id);
          setPlaying(l);
          setRun((r) => r + 1);
        }}
        onExit={() => setPlaying(null)}
        onCompleted={() => {}}
        onFinished={() => {
          // Back on the map, the lesson you just played counts as done.
          setCompleted((c) => (c.includes(playing.id) ? c : [...c, playing.id]));
          setPlaying(null);
          setRun((r) => r + 1);
        }}
      />
    );
  }

  return (
    <main className="mx-auto max-w-[640px] px-4 py-8 flex flex-col gap-6" style={{ backgroundColor: 'var(--bg-page)' }}>
      <header>
        <h1 className="text-[24px] font-extrabold text-ink">Originals preview</h1>
        <p className="mt-1 text-[15px] font-semibold text-[var(--text-secondary)]">
          Course files from <code>backend/originals</code>, played as learners see them. Nothing is saved.
        </p>
      </header>

      {message && (
        <p className="rounded-[12px] border-2 border-[var(--border)] p-4 text-[15px] font-semibold text-ink">{message}</p>
      )}

      {courses && courses.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {courses.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => void open(c)}
              className="rounded-full border-2 px-4 py-2 text-[15px] font-extrabold cursor-pointer"
              style={{
                borderColor: bundle?.course.slug === c ? 'var(--color-brand)' : 'var(--border)',
                color: bundle?.course.slug === c ? 'var(--color-brand)' : 'var(--color-ink)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {bundle && (
        <div className="flex flex-wrap items-center gap-2">
          {(['map', 'list'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className="rounded-[10px] border-2 px-3 py-1.5 text-[14px] font-extrabold cursor-pointer flex items-center gap-1.5"
              style={{
                borderColor: view === v ? 'var(--color-brand)' : 'var(--border)',
                color: view === v ? 'var(--color-brand)' : 'var(--color-ink)',
              }}
            >
              {v === 'map' ? <MapIcon className="w-4 h-4" aria-hidden="true" /> : <List className="w-4 h-4" aria-hidden="true" />}
              {v === 'map' ? 'Home map' : 'Lesson list'}
            </button>
          ))}
          <label className="flex items-center gap-1.5 text-[14px] font-bold text-[var(--text-secondary)]">
            <input type="checkbox" checked={asLearner} onChange={(e) => setAsLearner(e.target.checked)} />
            As a learner
          </label>
          <label className="flex items-center gap-1.5 text-[14px] font-bold text-[var(--text-secondary)]">
            <input type="checkbox" checked={paid} onChange={(e) => setPaid(e.target.checked)} />
            Paid
          </label>
          {view === 'map' && (
            <label className="ml-auto flex items-center gap-2 text-[14px] font-bold text-[var(--text-secondary)]">
              Pretend done
              <select
                value={completed.length}
                onChange={(e) => pretendDone(Number(e.target.value))}
                className="rounded-[8px] border-2 border-[var(--border)] px-2 py-1 font-extrabold text-ink"
              >
                {Array.from({ length: bundle.units.flatMap((u) => u.lessons).length + 1 }, (_, n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      )}

      {path && view === 'map' && (
        <div className="-mx-4">
          <LearningPath
            key={path.course.id}
            path={path}
            onOpenLesson={(id) => {
              const l = lessonById(id);
              if (l) setPlaying(l);
            }}
          />
        </div>
      )}

      {bundle &&
        view === 'list' &&
        bundle.units.map((unit) => (
          <section key={unit.key} className="flex flex-col gap-2">
            <h2 className="text-[17px] font-extrabold text-ink">
              {unit.key} · {unit.title}
            </h2>
            <ol className="flex flex-col gap-2">
              {unit.lessons.map((lesson, i) => (
                <li key={lesson.id}>
                  <button
                    type="button"
                    onClick={() => setPlaying(lesson)}
                    className="w-full text-left rounded-[12px] border-2 border-[var(--border)] bg-white px-4 py-3 flex items-center gap-3 cursor-pointer"
                  >
                    <span className="w-8 text-[14px] font-extrabold text-[var(--text-muted)]">{i + 1}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[16px] font-extrabold text-ink truncate">{lesson.title}</span>
                      <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--text-secondary)]">
                        {lesson.milestone === 'UNIT_CHALLENGE' && <Trophy className="w-3.5 h-3.5" aria-hidden="true" />}
                        {lesson.milestone === 'CHECKPOINT' && <Medal className="w-3.5 h-3.5" aria-hidden="true" />}
                        {lesson.milestone ? `${MILESTONE_LABEL[lesson.milestone]} · ` : ''}
                        {lesson.durationMinutes} min · {lesson.xpReward} XP
                      </span>
                    </span>
                    <Play className="w-5 h-5 text-[var(--color-brand)]" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>
          </section>
        ))}
    </main>
  );
}
