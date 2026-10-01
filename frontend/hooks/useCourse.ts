'use client';

import useSWR, { preload } from 'swr';
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

/** The learner's next lesson, computed server-side in `getMyEnrollments`. */
export interface NextLesson {
  id: string;
  title: string;
  /** Position in the course's section list — what /learn/[id]/section/[n] indexes. */
  sectionIndex: number;
  sectionTitle: string;
  /** 1-based position across the whole course. */
  number: number;
}

export interface Enrollment {
  id: string;
  courseId: string;
  progress: number;
  completedLessons: string[] | null;
  /** null when every published lesson is done, or none are published yet. */
  nextLesson: NextLesson | null;
  /** Published lessons done — same source the map's checkmarks read. */
  completedCount: number;
  course: {
    id: string;
    slug: string | null;
    title: string;
    category: string | null;
    level: string | null;
    shortDescription: string | null;
    subtitle: string | null;
    thumbnailUrl?: string | null;
    /** Published lessons only — what the learner can actually take. */
    totalLessons: number;
  };
}

export function useEnrollments() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Enrollment[]>(
    enrollmentsKey,
    fetcher,
  );
  return { enrollments: data, error, isLoading, isValidating, mutate };
}

/**
 * Warms everything the section map waits on — detail, progress, access — so
 * tapping "Continue" opens the map from cache instead of a 3–5s skeleton.
 * Safe to call repeatedly: SWR dedupes by key, and `preload` is a no-op for a
 * key already in flight.
 */
export function preloadCourse(courseId: string) {
  void preload(courseKey(courseId), fetcher);
  void preload(courseProgressKey(courseId), fetcher);
  void preload(courseAccessKey(courseId), fetcher);
}

// ─── The home path ─────────────────────────────────────────────────────────

export const learningPathKey = (id: string) => `/api/courses/${id}/path`;

export interface PathLesson {
  id: string;
  title: string;
  shortDescription: string | null;
  lessonType: string | null;
  xpReward: number | null;
  durationMinutes: number | null;
  isFreePreview: boolean;
}

export interface PathSection {
  id: string;
  title: string;
  description: string | null;
  lessons: PathLesson[];
}

/** GET /courses/:id/path — everything the home map draws, in one request. */
export interface LearningPath {
  course: { id: string; slug: string | null; title: string; category: string | null };
  sections: PathSection[];
  enrolled: boolean;
  completedLessons: string[];
  access: { hasAccess: boolean; freePreviewLessonIds: string[] };
}

export function useLearningPath(courseId?: string | null) {
  const { data, error, isLoading, mutate } = useSWR<LearningPath>(
    courseId ? learningPathKey(courseId) : null,
    fetcher,
  );
  return { path: data, error, isLoading, mutate };
}

/**
 * Where START sends the learner: the section route with `?lesson=`, which
 * opens that lesson straight away. That route is where the lesson player
 * lives, and its deep-link handler re-checks sequencing and the paywall, so
 * this link can never skip a lesson or bypass payment.
 */
export function lessonHref(courseId: string, sectionIndex: number, lessonId: string): string {
  // `from=home`: leaving the lesson (back / close) returns to home, not to
  // the section map the learner never saw on the way in.
  return `/learn/${courseId}/section/${sectionIndex}?lesson=${encodeURIComponent(lessonId)}&from=home`;
}

/** Where a learner with no course goes to find one. */
export const EXPLORE_HREF = '/dashboard/explore';

/**
 * The course home should put first: the most recently studied course that
 * still has a lesson left, else the most recently studied one. Enrollments
 * already arrive most-recently-studied first (see `getMyEnrollments`), so a
 * finished course never hides one the learner is partway through.
 */
export function pickCurrentEnrollment(enrollments: Enrollment[] | undefined): Enrollment | null {
  if (!enrollments || enrollments.length === 0) return null;
  return enrollments.find((e) => e.nextLesson) ?? enrollments[0];
}

/** The map route for a learner's next lesson (or the course's first section). */
export function nextLessonHref(enrollment: Pick<Enrollment, 'course' | 'nextLesson'>): string {
  return `/learn/${enrollment.course.id}/section/${enrollment.nextLesson?.sectionIndex ?? 0}`;
}
