/**
 * "Which course should a new learner start?" — one answer, shared by the
 * onboarding completion screen and home, so the two can never disagree.
 *
 *   1. The learner's track (Coding / AI) — from their profile, else from the
 *      onboarding answers on this device.
 *   2. The track's live courses, in `catalog.ts` category priority, keeping
 *      only courses with at least one PUBLISHED lesson (a course with nothing
 *      to take is not a place to send anyone — staging's Next.js test course
 *      has zero).
 *   3. A Teyro warm-up course wins if one is live (slug starts with
 *      `teyro-warm-up`); otherwise the first match.
 *   4. Nothing live → null. The caller shows the track's coming-soon path.
 *      We never invent a course.
 *
 * The warm-up is an ordinary course on purpose: authored and published
 * through the creator studio like any other, so XP, streaks, hearts and
 * chests all work through the one real lesson pipeline with no special cases.
 */

import useSWR from 'swr';
import { courseCategoriesFor } from '@/lib/onboarding/catalog';
import type { LearningCategory } from '@/lib/onboarding/types';
import { buildPathModel } from './model';
import { lessonHref, type LearningPath } from '@/hooks/useCourse';

/** Slug prefix that marks a Teyro-authored warm-up course. */
export const WARMUP_SLUG_PREFIX = 'teyro-warm-up';

export interface TrackCourse {
  id: string;
  slug: string | null;
  title: string;
  shortDescription: string | null;
  category: string | null;
  lessonsCount: number;
  isWarmUp: boolean;
}

export function isLearningTrack(value: unknown): value is LearningCategory {
  return value === 'coding' || value === 'ai';
}

interface ListedCourse {
  id: string;
  slug: string | null;
  title: string;
  shortDescription?: string | null;
  category?: string | null;
  lessonsCount?: number;
}

export async function findTrackCourse(track: LearningCategory): Promise<TrackCourse | null> {
  const categories = courseCategoriesFor(track);
  if (categories.length === 0) return null;

  // All of the track's categories at once — they used to be tried one after
  // another, each a full round trip.
  const lists = await Promise.all(
    categories.map(async (category) => {
      try {
        const res = await fetch(`/api/courses?category=${encodeURIComponent(category)}&take=20`, {
          credentials: 'include',
        });
        if (!res.ok) return [];
        const data = await res.json();
        return (Array.isArray(data) ? data : (data?.courses ?? [])) as ListedCourse[];
      } catch {
        return [];
      }
    }),
  );

  // Category priority order is preserved by flattening in order.
  const takeable = lists.flat().filter((c) => (c.lessonsCount ?? 0) > 0);
  const pick =
    takeable.find((c) => (c.slug ?? '').startsWith(WARMUP_SLUG_PREFIX)) ?? takeable[0];
  if (!pick) return null;

  return {
    id: pick.id,
    slug: pick.slug,
    title: pick.title,
    shortDescription: pick.shortDescription ?? null,
    category: pick.category ?? null,
    lessonsCount: pick.lessonsCount ?? 0,
    isWarmUp: (pick.slug ?? '').startsWith(WARMUP_SLUG_PREFIX),
  };
}

/** SWR-cached `findTrackCourse`, so home and a revisit don't re-query. */
export function useTrackCourse(track: LearningCategory | null) {
  const { data, error, isLoading } = useSWR(
    track ? `track-course:${track}` : null,
    () => findTrackCourse(track as LearningCategory),
  );
  return { course: data ?? null, error, isLoading: isLoading || (track !== null && data === undefined && !error) };
}

/**
 * Starts a course for a learner: enrolls (idempotent server-side; the first
 * ever enrollment also pays the welcome bonus), then returns the link to its
 * first lesson — straight into the lesson, never via the course page or the
 * old map. Falls back to home if the path can't be read.
 */
export async function startCourse(courseId: string): Promise<string> {
  await fetch(`/api/courses/${courseId}/enroll`, { method: 'POST', credentials: 'include' });
  try {
    const res = await fetch(`/api/courses/${courseId}/path`, { credentials: 'include' });
    if (!res.ok) return '/dashboard';
    const path = (await res.json()) as LearningPath;
    const current = buildPathModel(path).current;
    return current
      ? lessonHref(path.course.id, current.sectionIndex, current.lesson.id)
      : '/dashboard';
  } catch {
    return '/dashboard';
  }
}
