import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { Suspense } from 'react';
import { fetchPublicCourse, coursePath } from '@/lib/courses/public';
import { breadcrumbSchema, schemas } from '@/lib/seo/schema';
import { buildCanonical, SITE_URL } from '@/lib/blog/site';
import JsonLd from '@/components/features/blog/JsonLd';
import CourseLanding, { type LandingCourse, type LandingSection } from './CourseLanding';
import styles from './CourseLanding.module.css';

/**
 * /courses/<slug> — a course's public page. Server-rendered from the public
 * course endpoint so it ranks and so a visitor sees the whole course without
 * an account. An id or an old slug 301s to the current slug.
 */

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const strings = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0) : [];

/** Markdown-ish description → one plain paragraph for meta tags and the hero. */
function plain(text: string | null | undefined, max = 300) {
  if (!text || text === 'New Course Draft') return null;
  const t = text
    .replace(/[#>*_`]+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return t.length > max ? `${t.slice(0, max - 1).replace(/\s+\S*$/, '')}…` : t || null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toLanding(c: any): LandingCourse {
  const instructor = c.instructor ?? {};
  const profile = instructor.profile ?? {};
  const detail = instructor.instructorProfile ?? {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections: LandingSection[] = (Array.isArray(c.sections) ? c.sections : []).map((s: any) => ({
    id: s.id,
    title: String(s.title ?? ''),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lessons: (Array.isArray(s.lessons) ? s.lessons : []).map((l: any) => ({
      id: l.id,
      title: String(l.title ?? ''),
      durationMinutes: l.durationMinutes ?? undefined,
      lessonType: l.lessonType ?? undefined,
      xpReward: l.xpReward ?? undefined,
    })),
  }));
  const outcomes = [c.outcomes, c.realOutputs, c.skills].map(strings).find((l) => l.length > 0) ?? [];
  return {
    id: String(c.id),
    slug: String(c.slug),
    title: String(c.title ?? 'Untitled course'),
    description: plain(c.shortDescription) ?? plain(c.description),
    thumbnailUrl: c.thumbnailUrl || null,
    price: Number(c.price ?? 0),
    category: c.category ?? null,
    level: c.level ?? null,
    language: c.language ?? null,
    outcomes,
    studentsCount: Number(c.studentsCount ?? c._count?.enrollments ?? 0),
    stats: c.stats ?? {},
    sections,
    creator: {
      name: instructor.fullName || 'Course creator',
      avatar: profile.avatarUrl || detail.avatarUrl || instructor.avatarUrl || null,
      username: profile.username || null,
      headline: profile.headline || detail.professionalHeadline || profile.primaryExpertise || null,
      bio: profile.bio || detail.bio || profile.about || null,
      verified: detail.verificationStatus === 'VERIFIED',
      stats: instructor.stats ?? {},
    },
  };
}

async function load(slug: string) {
  try {
    return { course: await fetchPublicCourse(slug), failed: false };
  } catch {
    return { course: null, failed: true };
  }
}

/** One URL per course: an id, old slug or hashed slug 301s to the current one. */
async function redirectToCanonical(course: { slug?: string }, slug: string, searchParams: Props['searchParams']) {
  if (!course.slug || course.slug === slug) return;
  const query = new URLSearchParams();
  for (const [k, v] of Object.entries(await searchParams)) {
    if (typeof v === 'string') query.set(k, v);
  }
  const qs = query.toString();
  permanentRedirect(`${coursePath(course.slug)}${qs ? `?${qs}` : ''}`);
}

// The 301 and 404 also happen here: the app-wide loading.tsx streams the page,
// so by the time the page body runs the 200 is already sent — but metadata
// is resolved before the response for crawlers, so they get the real status.
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { course, failed } = await load(slug);
  if (failed) return { title: 'Course | Teyro', robots: { index: false } };
  if (!course) notFound();
  await redirectToCanonical(course, slug, searchParams);
  const c = toLanding(course);
  const title = `${c.title}: Learn Online in Minutes a Day | Teyro`;
  const description =
    c.description ??
    `Learn ${c.title} with short daily lessons, streaks and leagues on Teyro.${c.price > 0 ? ' Try the first two lessons free.' : ' Free course.'}`;
  const path = coursePath(c.slug);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      title,
      description,
      ...(c.thumbnailUrl ? { images: [{ url: c.thumbnailUrl }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CoursePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { course, failed } = await load(slug);

  if (failed) {
    return (
      <div className={styles.stateBox} role="alert">
        <h1 className={styles.stateTitle}>We couldn’t load this course</h1>
        <p className={styles.stateText}>Check your connection and try again in a moment.</p>
        <Link href={`/courses/${encodeURIComponent(slug)}`} className={styles.primaryBtn}>
          Try again
        </Link>
      </div>
    );
  }
  if (!course) notFound();

  await redirectToCanonical(course, slug, searchParams);

  const c = toLanding(course);
  const lessons = c.sections.flatMap((s) => s.lessons);

  return (
    <>
      <JsonLd
        data={schemas(
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: c.title,
            description: c.description ?? c.title,
            url: buildCanonical(coursePath(c.slug)),
            ...(c.thumbnailUrl ? { image: c.thumbnailUrl } : {}),
            inLanguage: 'en',
            provider: { '@type': 'Organization', name: 'Teyro', sameAs: SITE_URL },
            ...(c.creator.name ? { creator: { '@type': 'Person', name: c.creator.name } } : {}),
            ...(c.outcomes.length ? { teaches: c.outcomes.slice(0, 10) } : {}),
            ...(c.level ? { educationalLevel: c.level } : {}),
            isAccessibleForFree: c.price <= 0,
            offers: {
              '@type': 'Offer',
              category: c.price > 0 ? 'Paid' : 'Free',
              price: c.price,
              priceCurrency: 'USD',
            },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Online',
              courseWorkload: lessons.length ? `${lessons.length} lessons` : undefined,
            },
          },
          breadcrumbSchema([
            { name: 'Courses', path: '/courses' },
            { name: c.title, path: coursePath(c.slug) },
          ]),
        )}
      />
      {/* useSearchParams inside (coupon codes, ?start=1) */}
      <Suspense fallback={null}>
        <CourseLanding course={c} />
      </Suspense>
    </>
  );
}
