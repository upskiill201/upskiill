/**
 * The onboarding course catalog (GET /onboarding-flow/catalog): every course
 * a newcomer can start, with its real first lesson, from the live database.
 * Categories are derived from it, so a category with no course never shows.
 */

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
  /** Chapters with at least one published lesson. */
  chapters: number;
  /** Offers the placement test ("I already know some"). */
  placement: boolean;
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

/**
 * Projection: when they finish Chapter 1 at their daily pace. Real numbers
 * from the course (lesson count and minutes), never a promise about skill.
 */
export function chapterOneFinish(course: CatalogCourse, minutesPerDay: number, from = new Date()) {
  const days = Math.max(1, Math.ceil(course.chapterOneMinutes / Math.max(5, minutesPerDay)));
  const date = new Date(from.getTime() + days * 24 * 60 * 60 * 1000);
  return { days, date };
}
