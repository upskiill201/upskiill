'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/swr';

/**
 * Shared SWR keys/hooks for course detail, progress and access.
 *
 * My Learning -> /learn/[id] -> /learn/[id]/section/[n] each re-fetched
 * /api/courses/:id with a raw `fetch` inside their own `useEffect` (3x per
 * trip), and /api/courses/:id/access twice (the section page and its nested
 * SectionViewContent both fetched it independently). Nothing was cached, so
 * even revisiting a course/section already open this session refetched from
 * zero instead of painting immediately.
 *
 * Three granular hooks (not one combined hook) because SWR dedupes by key,
 * not by call site — useCourseAccess('x') called from two different
 * components still collapses to one request. A combined hook would force
 * every consumer to subscribe to data it doesn't need (SectionViewContent
 * already receives `course` as a prop and only wants access).
 *
 * Mirrors hooks/useMe.ts: same fetcher, same SWR defaults from lib/swr.ts
 * (dedupingInterval, keepPreviousData, localStorage-backed cache), so a
 * repeat visit paints instantly from cache while revalidating in the
 * background instead of blocking on the network again.
 */

export const courseKey = (id: string) => `/api/courses/${id}`;
export const courseProgressKey = (id: string) => `/api/courses/${id}/progress`;
export const courseAccessKey = (id: string) => `/api/courses/${id}/access`;
export const enrollmentsKey = '/api/auth/me/enrollments';

export interface CourseAccessResponse {
  hasAccess?: boolean;
  isInstructor?: boolean;
  isExpired?: boolean;
  freePreviewLessonIds?: string[];
  [key: string]: unknown;
}

export interface CourseProgressResponse {
  completedLessons?: string[];
  [key: string]: unknown;
}

export function useCourseDetail(courseId?: string) {
  // Course shape is genuinely dynamic (sections vs. curriculum, optional
  // fields per course type) and every consumer already types it `any` —
  // matching that here avoids a stricter type that would just get cast away.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, isLoading, isValidating, mutate } = useSWR<any>(
    courseId ? courseKey(courseId) : null,
    fetcher,
  );
  return { course: data, error, isLoading, isValidating, mutate };
}

export function useCourseProgress(courseId?: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<CourseProgressResponse>(
    courseId ? courseProgressKey(courseId) : null,
    fetcher,
  );
  return {
    completedLessons: data?.completedLessons ?? [],
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export function useCourseAccess(courseId?: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<CourseAccessResponse>(
    courseId ? courseAccessKey(courseId) : null,
    fetcher,
  );
  return {
    access: data,
    hasAccess: data?.hasAccess === true,
    freePreviewLessonIds: Array.isArray(data?.freePreviewLessonIds) ? data!.freePreviewLessonIds! : [],
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

/** Convenience composer for the one call site that wants all three at once. */
export function useCourse(courseId?: string) {
  const detail = useCourseDetail(courseId);
  const progress = useCourseProgress(courseId);
  const access = useCourseAccess(courseId);
  return {
    course: detail.course,
    completedLessons: progress.completedLessons,
    hasAccess: access.hasAccess,
    freePreviewLessonIds: access.freePreviewLessonIds,
    isLoading: detail.isLoading,
    mutateCourse: detail.mutate,
    mutateProgress: progress.mutate,
    mutateAccess: access.mutate,
  };
}

export function useEnrollments() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error, isLoading, isValidating, mutate } = useSWR<any[]>(enrollmentsKey, fetcher);
  return { enrollments: data, error, isLoading, isValidating, mutate };
}
