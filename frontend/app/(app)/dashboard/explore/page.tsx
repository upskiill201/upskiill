'use client';

/**
 * Explore — pick a skill.
 *
 *  - Courses read as topics, not products: a drawn graphic (the same topic
 *    art onboarding uses), the topic's name and level — no cover photos,
 *    no lesson counts. Grouped by category while browsing, one counted list while
 *    searching or filtering.
 *  - Search, category chips (drawn art, never line icons) and a level
 *    switch, all from the real catalog.
 *  - A topic you already have shows your progress and CONTINUES straight into
 *    the next lesson; any other opens its course page (enrolment, auth and
 *    the paywall live there).
 *  - Flat on purpose: hairline rows, no chunky tactile cards.
 *
 * Both requests go through the shared SWR cache (enrolments are the same key
 * home and My Learning read), read after hydration so the server's render and
 * the first client render agree.
 */

import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Art, topicArt, type ArtName } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import { LearnerRail } from '@/components/layout/LearnerRail';
import { useHydrated } from '@/components/studio/useHydrated';
import { fetcher } from '@/lib/swr';
import { lessonHref, preloadCourse, useEnrollments, type Enrollment } from '@/hooks/useCourse';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { courseHomeHref } from '@/lib/homeCourse';
import { topicOf } from '@/lib/onboarding/v3/lines';
import styles from './Explore.module.css';

interface Instructor {
  id: string;
  fullName: string;
  avatarUrl?: string | null;
  username?: string | null;
}

/** Shape returned by GET /api/courses — every stat is computed server-side
 *  from real relations, so the UI never has to invent one. */
interface Course {
  id: string;
  slug: string;
  title: string;
  description?: string;
  shortDescription?: string;
  thumbnailUrl?: string | null;
  price: number;
  category: string;
  level: string;
  lessonsCount?: number;
  durationMinutes?: number;
  studentsCount?: number;
  ratingAvg?: number | null;
  reviewsCount?: number;
  instructor?: Instructor;
  /** Teyro Originals: written by Teyro (docs/ORIGINALS_PLAYBOOK.md §1). */
  isOriginal?: boolean;
  trackLevel?: number | null;
}

const ALL = 'All';
const MAX_CATEGORY_CHIPS = 10;
const OTHER = 'More topics';

/** Tile tints, from tokens only, so each category reads as its own colour. */
const TINTS = ['tintBlue', 'tintGreen', 'tintAmber', 'tintRose', 'tintSky'] as const;

function prettyLevel(level: string) {
  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}

const isFree = (c: Course) => !c.price || c.price === 0;

/** The topic's own art, else its category's (onboarding's rule). */
function artOf(c: Course): ArtName {
  const a = topicArt(c.title);
  return a === 'book' ? topicArt(c.category ?? '') : a;
}

export default function ExplorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydrated();

  const res = useSWR<Course[]>('/api/courses', fetcher);
  // Guests can browse: a failed enrolments request just means nothing's ADDED.
  const { enrollments: cachedEnrollments } = useEnrollments();
  const data = hydrated ? res.data : undefined;
  const error = hydrated ? res.error : undefined;
  const enrollments = hydrated ? cachedEnrollments : undefined;

  // Search can be seeded via /dashboard/explore?q=...
  const [query, setQuery] = useState(searchParams?.get('q') ?? '');
  const [category, setCategory] = useState(ALL);
  const [level, setLevel] = useState(ALL);

  const courses = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const enrolledById = useMemo(() => {
    const map = new Map<string, Enrollment>();
    (enrollments ?? []).forEach((e) => map.set(e.courseId ?? e.course.id, e));
    return map;
  }, [enrollments]);

  // Filters derived from the real catalog, most-populated categories first.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    courses.forEach((c) => {
      if (c.category && c.category !== 'Uncategorized') counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
    });
    const top = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, MAX_CATEGORY_CHIPS)
      .map(([name]) => name);
    return [ALL, ...top];
  }, [courses]);

  const levels = useMemo(() => {
    const order = ['beginner', 'intermediate', 'advanced'];
    const set = new Set<string>();
    courses.forEach((c) => c.level && set.add(prettyLevel(c.level)));
    const list = Array.from(set).sort((a, b) => {
      const ia = order.indexOf(a.toLowerCase());
      const ib = order.indexOf(b.toLowerCase());
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
    });
    return [ALL, ...list];
  }, [courses]);

  // A filter that no longer exists (after a refetch) quietly falls back.
  const activeCategory = categories.includes(category) ? category : ALL;
  const activeLevel = levels.includes(level) ? level : ALL;

  const q = query.toLowerCase().trim();
  const filtering = !!q || activeCategory !== ALL || activeLevel !== ALL;

  const results = useMemo(
    () =>
      courses.filter((c) => {
        const matchesSearch =
          !q ||
          [c.title, c.shortDescription, c.description, c.category, c.instructor?.fullName].some((s) =>
            (s ?? '').toLowerCase().includes(q),
          );
        const matchesCategory = activeCategory === ALL || c.category?.toLowerCase() === activeCategory.toLowerCase();
        const matchesLevel = activeLevel === ALL || c.level?.toLowerCase() === activeLevel.toLowerCase();
        return matchesSearch && matchesCategory && matchesLevel;
      }),
    [courses, q, activeCategory, activeLevel],
  );

  // Browsing: one group per category, in chip order (Originals first inside
  // each, then by track level). Topic names that would collide keep their
  // full titles, as in onboarding.
  const groups = useMemo(() => {
    const order = new Map(categories.map((c, i) => [c, i]));
    const byCat = new Map<string, Course[]>();
    for (const c of results) {
      const cat = c.category && order.has(c.category) ? c.category : OTHER;
      byCat.set(cat, [...(byCat.get(cat) ?? []), c]);
    }
    return Array.from(byCat.entries())
      .sort((a, b) => (order.get(a[0]) ?? 999) - (order.get(b[0]) ?? 999))
      .map(([cat, list]) => ({
        category: cat,
        courses: list.sort(
          (a, b) => Number(!!b.isOriginal) - Number(!!a.isOriginal) || (a.trackLevel ?? 1) - (b.trackLevel ?? 1),
        ),
      }));
  }, [results, categories]);

  const nameCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of courses) {
      const t = topicOf(c.title) ?? c.title;
      m.set(t, (m.get(t) ?? 0) + 1);
    }
    return m;
  }, [courses]);
  const topicName = (c: Course) => {
    const t = topicOf(c.title) ?? c.title;
    return (nameCounts.get(t) ?? 0) > 1 ? c.title : t;
  };

  const openCourse = (c: Course) => {
    playSound('nodeTap');
    playHaptic('medium', false);
    router.push(`/courses/${c.slug || c.id}`);
  };

  const continueCourse = (e: Enrollment) => {
    playSound('start');
    playHaptic('medium', false);
    router.push(e.nextLesson ? lessonHref(e.course.id, e.nextLesson.sectionIndex, e.nextLesson.id) : courseHomeHref(e.course.id));
  };

  const pickCategory = (cat: string, i: number) => {
    playSound('navTap', i);
    playHaptic('light', false);
    setCategory(cat);
  };

  const pickLevel = (lvl: string, i: number) => {
    playSound('navTap', i + 2);
    playHaptic('light', false);
    setLevel(lvl);
  };

  const resetFilters = () => {
    playSound('toggleOff');
    playHaptic('light', false);
    setQuery('');
    setCategory(ALL);
    setLevel(ALL);
  };

  const row = (c: Course, tint: (typeof TINTS)[number]) => (
    <TopicRow
      key={c.id}
      course={c}
      name={topicName(c)}
      tint={tint}
      enrollment={enrolledById.get(c.id)}
      onOpen={() => openCourse(c)}
      onContinue={continueCourse}
    />
  );

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <header className={styles.head}>
          <h1 className={styles.title}>Explore</h1>
          <p className={styles.sub}>Pick a skill. Every course starts free.</p>
        </header>

        {/* ── Search + filters ─────────────────────────────────────────── */}
        <div className={styles.controls}>
          <label className={styles.search}>
            <Glyph name="search" size={18} strokeWidth={2.75} className={styles.searchIcon} />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search skills, topics or creators"
              aria-label="Search courses"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className={styles.searchClear}
                aria-label="Clear search"
                onClick={() => {
                  playSound('toggleOff');
                  setQuery('');
                }}
              >
                <Glyph name="close" size={14} strokeWidth={3} />
              </button>
            )}
          </label>

          {categories.length > 1 && (
            <div className={styles.chips} role="group" aria-label="Category">
              {categories.map((cat, i) => {
                const on = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                    aria-pressed={on}
                    onClick={() => pickCategory(cat, i)}
                  >
                    <Art name={cat === ALL ? 'compass' : topicArt(cat)} size={22} />
                    {cat === ALL ? 'All skills' : cat}
                  </button>
                );
              })}
            </div>
          )}

          {levels.length > 2 && (
            <div className={styles.levels} role="group" aria-label="Level">
              {levels.map((lvl, i) => {
                const on = activeLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    className={`${styles.level} ${on ? styles.levelOn : ''}`}
                    aria-pressed={on}
                    onClick={() => pickLevel(lvl, i)}
                  >
                    {lvl === ALL ? 'Any level' : lvl}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Topics ───────────────────────────────────────────────────── */}
        {error && !data ? (
          <div className={styles.stateBox} role="alert">
            <Glyph name="alert" size={32} className={styles.stateIconError} />
            <h2 className={styles.stateTitle}>We couldn&apos;t load the courses</h2>
            <p className={styles.stateText}>Check your connection and try again.</p>
            <button
              type="button"
              className={styles.ghostBtn}
              onClick={() => {
                playSound('navTap', 1);
                void res.mutate();
              }}
            >
              Try again
            </button>
          </div>
        ) : !data ? (
          <div aria-busy="true" aria-label="Loading courses" className={styles.list}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skelRow}>
                <span className={styles.skelTile} />
                <span className={styles.skelLines}>
                  <span className={styles.skelLine} style={{ width: '45%' }} />
                  <span className={styles.skelLine} style={{ width: '30%' }} />
                </span>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className={styles.stateBox}>
            <Image src="/dashboard tey.webp" alt="" width={120} height={120} />
            <h2 className={styles.stateTitle}>New courses are on the way</h2>
            <p className={styles.stateText}>Creators are building them right now. Check back soon.</p>
          </div>
        ) : results.length === 0 ? (
          <div className={styles.stateBox}>
            <Image src="/dashboard tey.webp" alt="" width={120} height={120} />
            <h2 className={styles.stateTitle}>Nothing matches that</h2>
            <p className={styles.stateText}>
              {q ? <>Nothing for &ldquo;{query.trim()}&rdquo;. </> : null}Try another word or clear the filters.
            </p>
            <button type="button" className={styles.primaryBtn} onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        ) : filtering ? (
          <section aria-label="Results">
            <div className={styles.groupHead}>
              <h2 className={styles.groupTitle}>
                {results.length} topic{results.length === 1 ? '' : 's'}
              </h2>
              <button type="button" className={styles.textBtn} onClick={resetFilters}>
                Clear
              </button>
            </div>
            <ul className={styles.list}>
              {results.map((c) => row(c, TINTS[Math.max(0, categories.indexOf(c.category)) % TINTS.length]))}
            </ul>
          </section>
        ) : (
          groups.map((g, gi) => {
            const tint = TINTS[gi % TINTS.length];
            return (
              <section key={g.category} aria-label={g.category} className={styles.group}>
                <div className={styles.groupHead}>
                  <h2 className={styles.groupTitle}>
                    <span className={`${styles.groupArt} ${styles[tint]}`}>
                      <Art name={topicArt(g.category)} size={30} />
                    </span>
                    {g.category}
                  </h2>
                  <span className={styles.groupCount}>
                    {g.courses.length} topic{g.courses.length === 1 ? '' : 's'}
                  </span>
                </div>
                <ul className={styles.list}>{g.courses.map((c) => row(c, tint))}</ul>
              </section>
            );
          })
        )}
      </div>

      <LearnerRail label="Your level and quests" />
    </div>
  );
}

// ─── A topic row ─────────────────────────────────────────────────────────────

function TopicRow({
  course,
  name,
  tint,
  enrollment,
  onOpen,
  onContinue,
}: {
  course: Course;
  name: string;
  tint: (typeof TINTS)[number];
  enrollment?: Enrollment;
  onOpen: () => void;
  onContinue: (e: Enrollment) => void;
}) {
  const added = !!enrollment;
  const total = enrollment?.course.totalLessons ?? 0;
  const done = Math.min(enrollment?.completedCount ?? 0, total);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const details = [
    course.level ? prettyLevel(course.level) : null,
    !isFree(course) && !course.isOriginal ? 'Premium' : null,
  ].filter(Boolean);

  return (
    <li className={styles.row}>
      <button
        type="button"
        className={styles.rowHit}
        aria-label={`${name}${added ? `, ${pct}% done` : ''}. Open`}
        onClick={onOpen}
        onMouseEnter={added ? () => preloadCourse(course.id) : undefined}
      />
      <span className={`${styles.tile} ${styles[tint]}`} aria-hidden>
        <Art name={artOf(course)} size={34} />
      </span>
      <span className={styles.rowText}>
        <span className={styles.rowName}>
          {name}
          {course.isOriginal && (
            <span className={styles.original} title="Teyro Original">
              <Glyph name="sparkle" size={12} strokeWidth={3} />
            </span>
          )}
        </span>
        {added ? (
          <span className={styles.rowProgress}>
            <span className={styles.track}>
              <span className={styles.fill} style={{ width: `${Math.max(2, pct)}%` }} />
            </span>
            <span className={styles.rowSub}>{pct}%</span>
          </span>
        ) : (
          <span className={styles.rowSub}>
            {details.join(' · ')}
          </span>
        )}
      </span>
      {added ? (
        <button type="button" className={styles.continueBtn} onClick={() => onContinue(enrollment)}>
          {enrollment.nextLesson ? (done === 0 ? 'Start' : 'Continue') : 'Review'}
        </button>
      ) : (
        <Glyph name="chevron" size={18} className={styles.chev} />
      )}
    </li>
  );
}
