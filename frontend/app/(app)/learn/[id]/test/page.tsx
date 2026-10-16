'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib/swr';
import { enrollmentsKey, learningPathKey, lessonHref, useLearningPath } from '@/hooks/useCourse';
import { courseHomeHref } from '@/lib/homeCourse';
import { LessonLoading } from '@/components/lesson/LessonHost';
import { TestOutPlayer, type TestOutOutcome } from '@/components/test-out/TestOutPlayer';
import {
  jumpTestKey,
  placementTestKey,
  readJumpTest,
  readPlacementTest,
  submitTestOut,
} from '@/lib/path/testOut';

/**
 * /learn/[id]/test?section=<sectionId>   Jump ahead to that chapter
 * /learn/[id]/test?placement=1            placement test (Python)
 *
 * Teyro Originals only; the server refuses anything else. Leaving, failing or
 * an error always goes home to the course path.
 */
export default function TestOutRoute() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = String(params.id);
  const sectionId = searchParams.get('section');
  const placement = searchParams.get('placement') === '1';

  const { path } = useLearningPath(courseId);
  const key = placement ? placementTestKey(courseId) : sectionId ? jumpTestKey(courseId, sectionId) : null;
  const { data, error } = useSWR(key, fetcher, { revalidateOnFocus: false, revalidateIfStale: false });

  const home = courseHomeHref(courseId);
  const goHome = useCallback(() => router.replace(home), [router, home]);

  useEffect(() => {
    if (!key || error) goHome();
  }, [key, error, goHome]);

  const test = useMemo(() => (data ? (placement ? readPlacementTest(data) : readJumpTest(data)) : null), [data, placement]);
  // A test with nothing the player can show (all exercises unreadable): back home.
  const empty = !!test && (test.mode === 'jump' ? test.exercises.length === 0 : test.units.every((u) => u.exercises.length === 0));
  useEffect(() => {
    if (empty) goHome();
  }, [empty, goHome]);

  const onFinish = useCallback(
    async (o: TestOutOutcome) => {
      if (!test) return;
      // Jump ahead below the pass mark, and placement at the start, change nothing.
      if (!o.targetSectionId || (test.mode === 'jump' && !o.passed)) return;
      await submitTestOut(courseId, { mode: test.mode, targetSectionId: o.targetSectionId, correct: o.correct, total: o.total });
      await mutate(learningPathKey(courseId));
      void mutate(enrollmentsKey);
    },
    [courseId, test],
  );

  const onContinue = useCallback(
    (o: TestOutOutcome) => {
      const sectionIndex = o.targetSectionId ? (path?.sections ?? []).findIndex((s) => s.id === o.targetSectionId) : -1;
      const first = sectionIndex >= 0 ? path?.sections[sectionIndex].lessons[0] : null;
      router.replace(first ? lessonHref(courseId, sectionIndex, first.id) : home);
    },
    [courseId, path, router, home],
  );

  if (!test || empty) return <LessonLoading />;

  return (
    <TestOutPlayer
      test={test}
      heading={path?.course.title ?? 'this course'}
      onExit={goHome}
      onFinish={onFinish}
      onContinue={onContinue}
    />
  );
}
