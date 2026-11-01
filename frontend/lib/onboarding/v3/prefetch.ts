/**
 * The taste of lesson 1 and the placement test, fetched ahead (founder,
 * 2026-10-27: the wait before the lesson was where people dropped out).
 * Onboarding asks for both as soon as it knows the course, a dozen screens
 * before either opens, so the loader rarely shows at all. One request per
 * course per page load; a failed one is forgotten, so "Try again" refetches.
 */

import type { PlacementTest } from '@/lib/path/testOut';
import type { CatalogCourse } from './catalog';

export type FirstLessonPayload = { lesson: Record<string, unknown> & { id: string } };

const lessons = new Map<string, Promise<FirstLessonPayload>>();
const tests = new Map<string, Promise<{ test: PlacementTest }>>();

function once<T>(cache: Map<string, Promise<T>>, key: string, url: string): Promise<T> {
  let p = cache.get(key);
  if (!p) {
    p = fetch(url).then((r) => (r.ok ? (r.json() as Promise<T>) : Promise.reject(new Error(String(r.status)))));
    p.catch(() => cache.delete(key));
    cache.set(key, p);
  }
  return p;
}

export function firstLessonOf(courseId: string) {
  return once(lessons, courseId, `/api/onboarding-flow/courses/${courseId}/first-lesson`);
}

export function placementOf(courseId: string) {
  return once(tests, courseId, `/api/onboarding-flow/courses/${courseId}/placement`);
}

/** Warm both before the learner has said whether they know some. */
export function prefetchStart(course: Pick<CatalogCourse, 'id' | 'placement'>) {
  firstLessonOf(course.id).catch(() => undefined);
  if (course.placement) placementOf(course.id).catch(() => undefined);
}
