'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RotateCcw } from 'lucide-react';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import TeyroBrandedLoader from '@/components/ui/TeyroBrandedLoader';
import { takePrefetchedLesson } from '@/lib/path/lessonPrefetch';
import { buildUnlockHref } from '@/lib/return-to';
import { courseHomeHref } from '@/lib/homeCourse';
import { lessonHref } from '@/hooks/useCourse';
import { playHaptic } from '@/lib/haptics';
import { track } from '@/lib/tey-track';

/**
 * Opens exactly one lesson and nothing else.
 *
 * Home's path is the only map. This used to be the old section map with a
 * lesson player inside it, and any lesson that couldn't open straight away —
 * progress still loading, a lesson not reached yet, a network blip, back
 * from a lesson started anywhere but home — fell through to that map. Now
 * every one of those cases is a loading screen, an error with a retry, or
 * home, and finishing or leaving a lesson always goes home.
 *
 * The server stays the authority on the paywall: the lesson endpoint 403s on
 * its own, and that sends the learner to the unlock page with a return path
 * straight back into this lesson.
 */

export interface LessonHostProps {
  courseId: string;
  sectionIndex: number;
  /** Lesson ids of the section, in order — sequencing is checked against it. */
  lessons: { id: string }[];
  completedLessons: string[];
  onCompleted: (lessonId: string) => void;
  /** The lesson to open (from ?lesson=). */
  lessonId: string | null;
  /** Admin review: open `lessonId` from the admin endpoint, no sequencing, no home. */
  adminReviewMode?: boolean;
  onReviewClose?: () => void;
  onReviewLoadError?: (message: string) => void;
}

type HostState =
  | { kind: 'loading' }
  | { kind: 'open'; lesson: Record<string, unknown> & { id: string } }
  | { kind: 'error'; message: string };

/** Normalise contentBlocks once — every consumer below assumes an object. */
function normalizeLesson(raw: Record<string, unknown>) {
  let blocks = raw?.contentBlocks;
  if (typeof blocks === 'string') {
    try {
      blocks = JSON.parse(blocks);
    } catch {
      blocks = {};
    }
  }
  return { ...raw, contentBlocks: blocks || {} } as unknown as Record<string, unknown> & { id: string };
}

export function LessonHost({
  courseId,
  sectionIndex,
  lessons,
  completedLessons,
  onCompleted,
  lessonId,
  adminReviewMode = false,
  onReviewClose,
  onReviewLoadError,
}: LessonHostProps) {
  const router = useRouter();
  const [state, setState] = useState<HostState>({ kind: 'loading' });
  const startedRef = useRef(false);
  const home = courseHomeHref(courseId);

  const goHome = useCallback(() => {
    if (adminReviewMode) {
      onReviewClose?.();
      return;
    }
    router.replace(home);
  }, [adminReviewMode, onReviewClose, router, home]);

  const open = useCallback(
    async (id: string) => {
      setState({ kind: 'loading' });
      try {
        const endpoint = adminReviewMode
          ? `/api/admin/courses/${courseId}/lessons/${id}`
          : `/api/courses/${courseId}/lessons/${id}`;
        // A lesson prefetched on home (node tap / arrival) is handed over
        // here, so START never waits on a fetch that already happened.
        const pending = adminReviewMode ? null : takePrefetchedLesson(courseId, id);
        const prefetched = pending ? await pending : null;
        const res = prefetched ? null : await fetch(endpoint, { credentials: 'include' });
        const status = prefetched ? prefetched.status : res!.status;

        if (status === 403 && !adminReviewMode) {
          playHaptic('light');
          router.replace(buildUnlockHref(courseId, lessonHref(courseId, sectionIndex, id)));
          return;
        }
        if (status < 200 || status >= 300) {
          const message =
            status === 403 ? 'This lesson could not be loaded (access denied).' : 'This lesson could not be loaded.';
          onReviewLoadError?.(message);
          setState({ kind: 'error', message });
          return;
        }
        const body = prefetched ? prefetched.body : await res!.json();
        setState({ kind: 'open', lesson: normalizeLesson(body as Record<string, unknown>) });
        // Feeds Tey's LESSON_ABANDONED rule. Not for an instructor reading content.
        if (!adminReviewMode) track('lesson_started', { entityType: 'lesson', entityId: id });
      } catch {
        const message = 'Could not reach the lesson — check your connection.';
        onReviewLoadError?.(message);
        setState({ kind: 'error', message });
      }
    },
    [adminReviewMode, courseId, onReviewLoadError, router, sectionIndex],
  );

  // Decide once, when the data needed to decide is here.
  useEffect(() => {
    if (startedRef.current) return;
    if (!lessonId) {
      startedRef.current = true;
      goHome();
      return;
    }
    if (adminReviewMode) {
      startedRef.current = true;
      void open(lessonId);
      return;
    }
    if (lessons.length === 0) return; // still loading
    startedRef.current = true;

    // Sequencing: a link can't skip ahead. First unfinished lesson of the
    // section is the furthest one may open (all of them once it's done).
    const idx = lessons.findIndex((l) => l.id === lessonId);
    const firstOpen = lessons.findIndex((l) => !completedLessons.includes(l.id));
    const furthest = firstOpen === -1 ? lessons.length - 1 : firstOpen;
    if (idx === -1 || idx > furthest) {
      goHome();
      return;
    }
    void open(lessonId);
  }, [lessonId, lessons, completedLessons, adminReviewMode, goHome, open]);

  if (state.kind === 'open') {
    return (
      <LessonPlayer
        key={state.lesson.id}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        lesson={state.lesson as any}
        courseId={courseId}
        isReview={completedLessons.includes(state.lesson.id)}
        adminReviewMode={adminReviewMode}
        onExit={goHome}
        onCompleted={onCompleted}
        onFinished={goHome}
      />
    );
  }

  if (state.kind === 'error') {
    return (
      <div className="fixed inset-0 z-[90000] flex flex-col items-center justify-center gap-4 bg-[var(--bg-page)] px-6 text-center">
        <p className="m-0 text-[17px] font-extrabold text-[var(--text-primary)]">{state.message}</p>
        <div className="flex gap-3">
          {lessonId && (
            <button
              type="button"
              onClick={() => {
                playHaptic('light');
                void open(lessonId);
              }}
              className="inline-flex items-center gap-2 rounded-[10px] bg-[var(--brand-blue)] px-5 py-3 text-[15px] font-extrabold text-white"
            >
              <RotateCcw size={16} strokeWidth={3} aria-hidden="true" /> Try again
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              playHaptic('light');
              goHome();
            }}
            className="rounded-[10px] border border-[var(--border)] px-5 py-3 text-[15px] font-extrabold text-[var(--text-primary)]"
          >
            {adminReviewMode ? 'Back to course' : 'Back home'}
          </button>
        </div>
      </div>
    );
  }

  return <LessonLoading />;
}

/** The lesson's own loading screen — full screen, like the player it becomes. */
export function LessonLoading() {
  return (
    <div
      className="fixed inset-0 z-[90000] flex items-center justify-center bg-[var(--bg-page)]"
      aria-busy="true"
      aria-label="Opening your lesson"
    >
      <TeyroBrandedLoader />
    </div>
  );
}

export default LessonHost;
