'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { mutate } from 'swr';
import { LessonHost, LessonLoading } from '@/components/lesson/LessonHost';
import { prefetchLesson } from '@/lib/path/lessonPrefetch';
import { courseProgressKey, learningPathKey, useLearningPath, type LearningPath } from '@/hooks/useCourse';
import { courseHomeHref } from '@/lib/homeCourse';

/**
 * /learn/[id]/section/[n]?lesson=<id> — the lesson route.
 *
 * Only a lesson lives here; the old section map is gone (home's path is the
 * map). Data comes from the same /courses/:id/path response home already has
 * in its SWR cache — sections, lesson ids, progress and access in one
 * request — instead of the full course, its progress and its access fetched
 * back to back before a lesson could even start loading.
 *
 * No ?lesson= (an old link, a bookmark) goes home to this course's path.
 */
export default function LessonRoute() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = String(params.id);
  const sectionIndex = parseInt(String(params.sectionIndex), 10);
  // Captured once: the lesson this visit is for.
  const [lessonId] = useState(() => searchParams.get('lesson'));

  // Arriving cold (a push, a fresh tab): fetch the lesson NOW, alongside the
  // path, not after it. A no-op when home already prefetched it.
  useEffect(() => {
    if (lessonId) prefetchLesson(courseId, lessonId);
  }, [courseId, lessonId]);

  const { path, error } = useLearningPath(courseId);

  const section = Number.isFinite(sectionIndex) ? path?.sections?.[sectionIndex] : undefined;
  const lessons = useMemo(() => section?.lessons ?? [], [section]);

  // Nothing to open here: no lesson asked for, or the course/section is gone.
  const missing = !lessonId || (path && !section) || (error && !path);
  useEffect(() => {
    if (missing) router.replace(courseHomeHref(courseId));
  }, [missing, router, courseId]);

  const onCompleted = useCallback(
    (id: string) => {
      // LessonPlayer revalidates the path itself; this keeps the cached
      // progress in step for anything still reading the old progress key.
      void mutate(
        learningPathKey(courseId),
        (p?: LearningPath) =>
          p && !p.completedLessons.includes(id) ? { ...p, completedLessons: [...p.completedLessons, id] } : p,
        { revalidate: false },
      );
      void mutate(courseProgressKey(courseId));
    },
    [courseId],
  );

  if (missing || !path || !section) return <LessonLoading />;

  return (
    <LessonHost
      courseId={courseId}
      sectionIndex={sectionIndex}
      lessons={lessons}
      completedLessons={path.completedLessons ?? []}
      onCompleted={onCompleted}
      lessonId={lessonId}
    />
  );
}
