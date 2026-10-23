/**
 * The onboarding course catalog (GET /onboarding-flow/catalog): every course
 * a newcomer can start, with its real first lesson, from the live database.
 * Categories are derived from it, so a category with no course never shows.
 */

import { goalById } from '@/lib/onboarding/goals';

export interface CatalogCourse {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string | null;
  thumbnailUrl: string | null;
  isOriginal: boolean;
  chapterOneLessons: number;
  chapterOneMinutes: number;
  totalLessons: number;
  firstLesson: { id: string; title: string; durationMinutes: number; exercises: number };
}

let cache: Promise<CatalogCourse[]> | null = null;

export function fetchCatalog(): Promise<CatalogCourse[]> {
  if (!cache) {
    cache = fetch('/api/onboarding-flow/catalog')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .catch((err) => {
        cache = null;
        throw err;
      });
  }
  return cache;
}

/** Categories with courses, the goal's best matches first and flagged. */
export function categoriesFor(courses: CatalogCourse[], goalId?: string) {
  const counts = new Map<string, number>();
  for (const c of courses) counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
  const preferred = goalById(goalId)?.categories ?? [];
  const rank = (name: string) => {
    const i = preferred.findIndex((p) => p.toLowerCase() === name.toLowerCase());
    return i === -1 ? 99 : i;
  };
  const sorted = [...counts.entries()]
    .map(([name, count]) => ({ name, count, recommended: false }))
    .sort((a, b) => rank(a.name) - rank(b.name) || b.count - a.count);
  // Only the single best live match for their goal gets the badge.
  if (sorted.length > 0 && rank(sorted[0].name) < 99) sorted[0].recommended = true;
  return sorted;
}

/**
 * Projection: when they finish Chapter 1 at their daily pace. Real numbers
 * from the course (lesson count and minutes), never a promise about skill.
 */
export function chapterOneFinish(course: CatalogCourse, minutesPerDay: number, from = new Date()) {
  const days = Math.max(1, Math.ceil(course.chapterOneMinutes / Math.max(5, minutesPerDay)));
  const date = new Date(from.getTime() + days * 24 * 60 * 60 * 1000);
  return { days, date };
}
