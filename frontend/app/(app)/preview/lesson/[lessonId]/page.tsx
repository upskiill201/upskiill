'use client';

/**
 * /preview/lesson/:lessonId — a creator plays their own lesson exactly as a
 * learner will, start to finish, from the saved copy. Review mode: no
 * hearts, no XP, nothing written. Opened from the lesson builder and the
 * course workspace; GET /lesson/:id only answers the lesson's owner (or an
 * admin), so nobody can preview someone else's draft.
 */

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';

export default function LessonPreviewPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    fetch(`/api/lesson/${lessonId}`, { credentials: 'include', cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) throw new Error(res.status === 404 ? 'This lesson could not be found.' : 'Only the lesson’s creator can preview it.');
        setLesson(await res.json());
      })
      .catch((e: Error) => setError(e.message));
  }, [lessonId]);

  const leave = () => {
    if (window.opener) window.close();
    else router.back();
  };

  if (error) {
    return (
      <div className="min-h-[60dvh] flex flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-[18px] font-extrabold text-ink">{error}</p>
        <button type="button" onClick={leave} className="font-extrabold text-[var(--color-brand)]">
          Go back
        </button>
      </div>
    );
  }
  if (!lesson) return <div className="min-h-[60dvh]" aria-busy="true" />;

  const courseId = (lesson as { section?: { course?: { id?: string } } }).section?.course?.id ?? 'preview';

  return (
    <LessonPlayer
      key={run}
      lesson={lesson}
      courseId={courseId}
      isReview={false}
      adminReviewMode
      onExit={leave}
      onCompleted={() => {}}
      onFinished={() => setRun((r) => r + 1)}
    />
  );
}
