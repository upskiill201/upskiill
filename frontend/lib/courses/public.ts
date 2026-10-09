import { normalizeCourseCategory, type CreatorTrack } from '@/lib/creator/categories';

/**
 * Server-side reads for the public course pages (/courses, /courses/<slug>,
 * the homepage). Published courses only — the backend's public endpoints
 * never return drafts — and only the two launch tracks, Coding and AI.
 *
 * Cached for five minutes: a newly published course shows up within that,
 * and the slow backend is hit once per window instead of once per visitor.
 */

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const REVALIDATE = 300;

export interface PublicCourseCard {
  id: string;
  slug: string;
  title: string;
  shortDescription: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  price: number;
  category: string | null;
  level: string | null;
  lessonsCount: number;
  durationMinutes: number;
  studentsCount: number;
  ratingAvg: number | null;
  reviewsCount: number;
  instructor: { id: string; fullName: string | null; avatarUrl: string | null; username: string | null };
  track: CreatorTrack;
}

/** Published Coding and AI courses, newest first. Empty (never throws) when the backend is down. */
export async function fetchPublicCourses(): Promise<PublicCourseCard[]> {
  try {
    const res = await fetch(`${API}/courses?take=100`, { next: { revalidate: REVALIDATE, tags: ['public-courses'] } });
    if (!res.ok) return [];
    const rows: unknown = await res.json();
    if (!Array.isArray(rows)) return [];
    return rows.flatMap((c) => {
      const track = normalizeCourseCategory(c?.category);
      // A course needs at least one published lesson to be worth a click.
      if (!track || !c?.slug || !(Number(c.lessonsCount) > 0)) return [];
      return [
        {
          id: String(c.id),
          slug: String(c.slug),
          title: String(c.title ?? ''),
          shortDescription: c.shortDescription ?? null,
          description: c.description && c.description !== 'New Course Draft' ? c.description : null,
          thumbnailUrl: c.thumbnailUrl || null,
          price: Number(c.price ?? 0),
          category: c.category ?? null,
          level: c.level ?? null,
          lessonsCount: Number(c.lessonsCount ?? 0),
          durationMinutes: Number(c.durationMinutes ?? 0),
          studentsCount: Number(c.studentsCount ?? 0),
          ratingAvg: typeof c.ratingAvg === 'number' ? c.ratingAvg : null,
          reviewsCount: Number(c.reviewsCount ?? 0),
          instructor: {
            id: String(c.instructor?.id ?? ''),
            fullName: c.instructor?.fullName ?? null,
            avatarUrl: c.instructor?.avatarUrl ?? null,
            username: c.instructor?.username ?? null,
          },
          track,
        },
      ];
    });
  } catch {
    return [];
  }
}

/**
 * One published course by slug, old slug or id. `null` when it doesn't exist
 * (or isn't public); throws only when the backend can't be reached, so the
 * page can show "try again" instead of a false 404.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchPublicCourse(idOrSlug: string): Promise<any | null> {
  const res = await fetch(`${API}/courses/${encodeURIComponent(idOrSlug)}`, {
    next: { revalidate: REVALIDATE, tags: ['public-courses'] },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Course fetch failed: ${res.status}`);
  const course = await res.json();
  return course?.published === false ? null : course;
}

export const coursePath = (slug: string) => `/courses/${slug}`;

export function formatMinutes(total: number) {
  if (!total || total <= 0) return null;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`;
}
