'use client';

/**
 * The public course page body — one page for everyone, logged in or not.
 *
 * The server renders it with the course already in hand (title, outcomes, the
 * whole path), so search engines and first-time visitors see everything with
 * no account. Only the "who are you" part happens here, after load:
 *
 *  - Guest: START → create an account (no onboarding: /signup?course=) →
 *    back here with ?start=1 → enrol → lesson 1.
 *  - Signed in, not enrolled: START opens the enrolment scene, then lesson 1.
 *  - Enrolled: CONTINUE goes straight to the next lesson.
 *
 * Every number comes from the server; anything missing is hidden, never made up.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Globe,
  Infinity as InfinityIcon,
  Layers,
  Lock,
  ShieldCheck,
  Star,
  Target,
  Users,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { CourseCover } from '@/components/course/CourseCover';
import EnrollmentWizard, { type EnrollResponse } from '@/components/course/EnrollmentWizard';
import { enrollmentsKey, lessonHref, preloadCourse, type Enrollment } from '@/hooks/useCourse';
import { fetcher } from '@/lib/swr';
import { courseHomeHref, setHomeCourse } from '@/lib/homeCourse';
import { pendingCouponCode, rememberCouponCode } from '@/lib/coupons/pendingCode';
import { LEARNER_ENTRY } from '@/lib/launch';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './CourseLanding.module.css';

export interface LandingLesson {
  id?: string;
  title: string;
  durationMinutes?: number;
  lessonType?: string;
  xpReward?: number;
}

export interface LandingSection {
  id?: string;
  title: string;
  lessons: LandingLesson[];
}

export interface LandingCourse {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  price: number;
  category: string | null;
  level: string | null;
  language: string | null;
  outcomes: string[];
  studentsCount: number;
  stats: { lessonsCount?: number; durationMinutes?: number; totalXp?: number; ratingAvg?: number | null; reviewsCount?: number };
  sections: LandingSection[];
  creator: {
    name: string;
    avatar: string | null;
    username: string | null;
    headline: string | null;
    bio: string | null;
    verified: boolean;
    stats: { coursesCount?: number; studentsCount?: number; reviewsCount?: number; ratingAvg?: number | null };
  };
}

/** Mirrors the backend paywall: a paid course's first 2 published lessons are free. */
const FREE_PREVIEW_LESSONS = 2;
/** The backend's real section-completion bonus. */
const UNIT_CHEST_XP = 50;
/** Unit banners cycle the home path's colours. */
const UNIT_TONES = ['toneBlue', 'toneGreen', 'tonePurple', 'toneOrange'] as const;

function formatMinutes(total: number) {
  if (total <= 0) return null;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`;
}

const prettyLevel = (level?: string | null) =>
  level ? level.charAt(0).toUpperCase() + level.slice(1).toLowerCase() : null;

export default function CourseLanding({ course }: { course: LandingCourse }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion() ?? false;
  const sections = course.sections;
  const coursePagePath = `/courses/${course.slug}`;

  // ── Who is looking ─────────────────────────────────────────────────────
  const [authState, setAuthState] = useState<'unknown' | 'authed' | 'guest'>('unknown');
  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => !cancelled && setAuthState(r.ok ? 'authed' : 'guest'))
      .catch(() => !cancelled && setAuthState('guest'));
    return () => {
      cancelled = true;
    };
  }, []);
  const { data: enrollments, mutate: mutateEnrollments } = useSWR<Enrollment[]>(
    authState === 'authed' ? enrollmentsKey : null,
    fetcher,
  );

  const [openUnits, setOpenUnits] = useState<string[]>(() => sections.slice(0, 2).map((s, i) => s.id || String(i)));
  const [justEnrolled, setJustEnrolled] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  // Count a course-page view once per browser session (anonymous aggregate;
  // powers the creator's "viewed → enrolled" funnel).
  useEffect(() => {
    const key = `teyro_course_view_${course.id}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // storage unavailable (private mode) — still count this visit
    }
    fetch(`/api/courses/${encodeURIComponent(course.id)}/view`, { method: 'POST' }).catch(() => {});
  }, [course.id]);

  const enrollment = useMemo(
    () => (enrollments ?? []).find((e) => e.courseId === course.id) ?? null,
    [enrollments, course.id],
  );
  const isEnrolled = !!enrollment || justEnrolled;

  // ─── Real-or-hide stats ────────────────────────────────────────────────
  const allLessons = sections.flatMap((s) => s.lessons || []);
  const totalLessons = course.stats.lessonsCount ?? allLessons.length;
  const totalMinutes =
    course.stats.durationMinutes ?? allLessons.reduce((a, l) => a + (l.durationMinutes || 0), 0);
  const duration = formatMinutes(totalMinutes);
  const lessonXp = course.stats.totalXp ?? 0;
  const totalXp = lessonXp > 0 ? lessonXp + sections.length * UNIT_CHEST_XP : null;
  const learners = course.studentsCount;
  const ratingAvg = course.stats.ratingAvg ?? null;
  const reviewsCount = course.stats.reviewsCount ?? 0;
  const isPaid = course.price > 0;
  const level = prettyLevel(course.level);

  // Global lesson order, for the free-preview rule.
  const globalIndex = new Map<string, number>();
  let cursor = 0;
  sections.forEach((s) =>
    (s.lessons || []).forEach((l) => {
      if (l.id) globalIndex.set(l.id, cursor);
      cursor += 1;
    }),
  );

  // A coupon link (?code=LAUNCH20): keep the code for the paywall.
  const [savedCode, setSavedCode] = useState<string | null>(null);
  useEffect(() => {
    setSavedCode(rememberCouponCode(course.id, searchParams.get('code')) ?? pendingCouponCode(course.id));
  }, [course.id, searchParams]);

  // The first lesson, wherever it sits (a unit may be empty).
  const firstSectionIndex = sections.findIndex((s) => (s.lessons?.length ?? 0) > 0);
  const firstLesson = firstSectionIndex >= 0 ? sections[firstSectionIndex].lessons[0] : undefined;
  const secondLesson = allLessons[1];

  const done = Math.min(enrollment?.completedCount ?? 0, enrollment?.course.totalLessons ?? totalLessons);
  const pct = totalLessons > 0 ? Math.round((done / totalLessons) * 100) : 0;

  // ─── Actions ───────────────────────────────────────────────────────────
  const continueHref = () => {
    const next = enrollment?.nextLesson;
    return next ? lessonHref(course.id, next.sectionIndex, next.id) : courseHomeHref(course.id);
  };

  /** A new learner: account first (no onboarding), then straight back here to enrol. */
  const signupHref = LEARNER_ENTRY.gated
    ? LEARNER_ENTRY.href
    : `/signup?course=${encodeURIComponent(course.slug)}`;

  const handlePrimary = () => {
    playHaptic('medium', false);
    if (isEnrolled) {
      playSound('start');
      router.push(continueHref());
      return;
    }
    if (authState === 'guest') {
      playSound('navTap', 1);
      router.push(signupHref);
      return;
    }
    playSound('nodeTap');
    setShowWizard(true);
  };

  // Back from signup (?start=1): pick up the enrolment where it was left.
  const autoStarted = useRef(false);
  useEffect(() => {
    if (autoStarted.current || searchParams.get('start') !== '1') return;
    if (authState === 'unknown' || (authState === 'authed' && enrollments === undefined)) return;
    autoStarted.current = true;
    router.replace(coursePagePath, { scroll: false });
    if (authState !== 'authed') return;
    if (enrollment) router.push(continueHref());
    else setShowWizard(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, enrollments, enrollment, searchParams]);

  // The scene's ONLY backend call.
  const handleEnroll = async (): Promise<EnrollResponse> => {
    const res = await fetch(`/api/courses/${course.id}/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (res.status === 401) {
      router.push(signupHref);
      throw new Error('Session expired');
    }
    if (!res.ok) throw new Error(`Enroll failed with status ${res.status}`);

    const data: EnrollResponse = await res.json();
    setJustEnrolled(true);
    // The new course becomes the one home's path shows, like Duolingo.
    setHomeCourse(course.id);
    void mutateEnrollments();
    // Sync the stats bar with the welcome grant (if the app is open elsewhere).
    window.dispatchEvent(new Event('teyro:gamification-refresh'));
    preloadCourse(course.id);
    return data;
  };

  // Straight into the lesson the server says is first — enrol → play.
  const startFirstLesson = (lessonId?: string) => {
    const id = lessonId || firstLesson?.id;
    const secIdx = id ? sections.findIndex((s) => (s.lessons || []).some((l) => l.id === id)) : -1;
    router.push(id && secIdx >= 0 ? lessonHref(course.id, secIdx, id) : courseHomeHref(course.id));
  };

  const openLesson = (secIdx: number, lessonId?: string) => {
    if (!isEnrolled) return;
    playSound('nodeTap');
    playHaptic('light', false);
    router.push(lessonId ? lessonHref(course.id, secIdx, lessonId) : courseHomeHref(course.id));
  };

  const toggleUnit = (key: string, open: boolean) => {
    playSound(open ? 'menuClose' : 'menuOpen');
    setOpenUnits((prev) => (open ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const ctaLabel = isEnrolled
    ? enrollment && !enrollment.nextLesson && done > 0
      ? 'Review'
      : done > 0
        ? 'Continue'
        : 'Start lesson 1'
    : LEARNER_ENTRY.gated && authState !== 'authed'
      ? 'Get notified at launch'
      : 'Start learning free';
  const ctaSub = isEnrolled
    ? enrollment?.nextLesson
      ? `Up next: Lesson ${enrollment.nextLesson.number} · ${enrollment.nextLesson.title}`
      : 'Pick up right where you left off'
    : isPaid
      ? `First ${FREE_PREVIEW_LESSONS} lessons free · unlock the rest anytime`
      : 'Every lesson is free';

  const teyLine = isEnrolled
    ? enrollment?.nextLesson
      ? `Lesson ${enrollment.nextLesson.number} is waiting for you. A few minutes keeps your streak alive.`
      : "You're in. Tap the button and let's go."
    : isPaid
      ? `The first ${FREE_PREVIEW_LESSONS} lessons are on me. Try them, then decide.`
      : 'This whole course is free. Start now and I’ll count your streak from lesson one.';

  // No entrance animation: the server-rendered page must be visible at first
  // paint (search engines, slow phones), not after hydration fades it in.
  const rise = (_delay: number) => ({});

  const cta = (
    <button type="button" className={styles.ctaBtn} onClick={handlePrimary} aria-busy={authState === 'unknown'}>
      {ctaLabel}
    </button>
  );

  const { creator } = course;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link
          href={authState === 'authed' ? '/dashboard/explore' : '/courses'}
          className={styles.backLink}
          onClick={() => playSound('navTap', 0)}
        >
          <ArrowLeft size={20} strokeWidth={3} aria-hidden="true" />
          {authState === 'authed' ? 'Explore' : 'All courses'}
        </Link>
      </div>

      <div className={styles.grid}>
        <div className={styles.main}>
          {/* ── Hero ───────────────────────────────────────────────── */}
          <motion.section className={styles.hero} aria-label="Course" {...rise(0)}>
            <CourseCover
              id={course.id}
              category={course.category}
              thumbnailUrl={course.thumbnailUrl}
              sizes="(max-width: 700px) 100vw, 280px"
              glyphSize={56}
              className={styles.heroCover}
              priority
            />
            <div className={styles.heroBody}>
              <span className={styles.eyebrow}>
                {[course.category !== 'Uncategorized' ? course.category : null, level].filter(Boolean).join(' · ') ||
                  'Course'}
              </span>
              <h1 className={styles.title}>{course.title}</h1>
              {course.description && <p className={styles.description}>{course.description}</p>}

              <div className={styles.byline}>
                <Avatar src={creator.avatar ?? undefined} name={creator.name} size="xs" />
                <span>
                  by{' '}
                  {creator.username ? (
                    <Link href={`/creator-profile/${creator.username}`} className={styles.bylineLink}>
                      {creator.name}
                    </Link>
                  ) : (
                    <strong>{creator.name}</strong>
                  )}
                </span>
                {creator.verified && <ShieldCheck size={16} className={styles.verified} aria-label="Verified creator" />}
              </div>

              <ul className={styles.chips} aria-label="Course stats">
                {totalLessons > 0 && (
                  <li className={styles.chip}>
                    <BookOpen size={16} strokeWidth={2.75} aria-hidden="true" />
                    {totalLessons} lesson{totalLessons === 1 ? '' : 's'}
                  </li>
                )}
                {sections.length > 0 && (
                  <li className={styles.chip}>
                    <Layers size={16} strokeWidth={2.75} aria-hidden="true" />
                    {sections.length} unit{sections.length === 1 ? '' : 's'}
                  </li>
                )}
                {duration && (
                  <li className={styles.chip}>
                    <Clock size={16} strokeWidth={2.75} aria-hidden="true" />
                    {duration}
                  </li>
                )}
                {learners > 0 && (
                  <li className={styles.chip}>
                    <Users size={16} strokeWidth={2.75} aria-hidden="true" />
                    {learners.toLocaleString()} learner{learners === 1 ? '' : 's'}
                  </li>
                )}
                {ratingAvg !== null && reviewsCount > 0 && (
                  <li className={`${styles.chip} ${styles.chipGold}`}>
                    <Star size={16} strokeWidth={2.5} fill="currentColor" aria-hidden="true" />
                    {ratingAvg} ({reviewsCount.toLocaleString()})
                  </li>
                )}
                {totalXp !== null && (
                  <li className={`${styles.chip} ${styles.chipXp}`}>
                    <Image src="/art/ui/xp-bolt.svg" alt="" width={18} height={18} />
                    Up to {totalXp.toLocaleString()} XP
                  </li>
                )}
              </ul>
            </div>
          </motion.section>

          {/* ── Tey's line ─────────────────────────────────────────── */}
          <motion.div className={styles.tey} {...rise(0.06)}>
            <Image src="/dashboard tey.webp" alt="" width={72} height={72} className={styles.teyImg} />
            <p className={styles.bubble}>
              {teyLine}
              {savedCode && !isEnrolled && (
                <>
                  {' '}
                  Your code <strong>{savedCode}</strong> is saved: it applies when you unlock the full course.
                </>
              )}
            </p>
          </motion.div>

          {/* ── What you'll learn ──────────────────────────────────── */}
          {course.outcomes.length > 0 && (
            <motion.section className={styles.card} aria-labelledby="learn-h" {...rise(0.1)}>
              <h2 id="learn-h" className={styles.cardTitle}>
                What you&apos;ll learn
              </h2>
              <ul className={styles.outcomes}>
                {course.outcomes.map((o, i) => (
                  <li key={i} className={styles.outcome}>
                    <span className={styles.check} aria-hidden="true">
                      <Check size={16} strokeWidth={4} />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* ── The course path ────────────────────────────────────── */}
          {sections.length > 0 && (
            <section aria-labelledby="path-h">
              <div className={styles.sectionHead}>
                <h2 id="path-h" className={styles.sectionTitle}>
                  Course path
                </h2>
                {totalLessons > 0 && (
                  <span className={styles.sectionMeta}>
                    {sections.length} unit{sections.length === 1 ? '' : 's'} · {totalLessons} lesson
                    {totalLessons === 1 ? '' : 's'}
                  </span>
                )}
              </div>

              <div className={styles.units}>
                {sections.map((section, secIdx) => {
                  const key = section.id || String(secIdx);
                  const open = openUnits.includes(key);
                  const tone = UNIT_TONES[secIdx % UNIT_TONES.length];
                  const lessons = section.lessons || [];
                  return (
                    <div key={key} className={`${styles.unit} ${styles[tone]}`}>
                      <button
                        type="button"
                        className={styles.unitBanner}
                        aria-expanded={open}
                        onClick={() => toggleUnit(key, open)}
                      >
                        <span className={styles.unitText}>
                          <span className={styles.unitNumber}>Unit {secIdx + 1}</span>
                          <span className={styles.unitTitle}>{section.title}</span>
                        </span>
                        <span className={styles.unitCount}>
                          {lessons.length} lesson{lessons.length === 1 ? '' : 's'}
                          <ChevronDown
                            size={20}
                            strokeWidth={3}
                            className={`${styles.chev} ${open ? styles.chevOpen : ''}`}
                            aria-hidden="true"
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.ol
                            className={styles.lessons}
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={reduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                          >
                            {lessons.map((lesson, lIdx) => {
                              const g = lesson.id ? globalIndex.get(lesson.id) ?? 0 : 0;
                              const locked = !isEnrolled && isPaid && g >= FREE_PREVIEW_LESSONS;
                              const freePreview = !isEnrolled && isPaid && g < FREE_PREVIEW_LESSONS;
                              const meta = [
                                lesson.durationMinutes ? `${lesson.durationMinutes} min` : null,
                                lesson.lessonType
                                  ? lesson.lessonType.charAt(0).toUpperCase() + lesson.lessonType.slice(1)
                                  : null,
                              ]
                                .filter(Boolean)
                                .join(' · ');
                              const body = (
                                <>
                                  <span className={`${styles.node} ${locked ? styles.nodeLocked : ''}`} aria-hidden="true">
                                    {locked ? (
                                      <Lock size={18} strokeWidth={3} />
                                    ) : (
                                      <Star size={20} strokeWidth={2.5} fill="currentColor" />
                                    )}
                                  </span>
                                  <span className={styles.lessonText}>
                                    <span className={styles.lessonTitle}>{lesson.title}</span>
                                    {meta && <span className={styles.lessonMeta}>{meta}</span>}
                                  </span>
                                  <span className={styles.lessonRight}>
                                    {freePreview && <span className={styles.freeTag}>Free</span>}
                                    {!locked && typeof lesson.xpReward === 'number' && lesson.xpReward > 0 && (
                                      <span className={styles.xpTag}>+{lesson.xpReward} XP</span>
                                    )}
                                  </span>
                                </>
                              );
                              return (
                                <li key={lesson.id || lIdx}>
                                  {isEnrolled ? (
                                    <button
                                      type="button"
                                      className={`${styles.lesson} ${styles.lessonLive}`}
                                      onClick={() => openLesson(secIdx, lesson.id)}
                                    >
                                      {body}
                                    </button>
                                  ) : (
                                    <div className={`${styles.lesson} ${locked ? styles.lessonDim : ''}`}>{body}</div>
                                  )}
                                </li>
                              );
                            })}
                            <li className={styles.chestRow}>
                              <Image src="/art/items/chest-bronze.svg" alt="" width={44} height={44} />
                              <span className={styles.lessonText}>
                                <span className={styles.lessonTitle}>Unit {secIdx + 1} chest</span>
                                <span className={styles.lessonMeta}>Finish every lesson in this unit</span>
                              </span>
                              <span className={styles.xpTag}>+{UNIT_CHEST_XP} XP</span>
                            </li>
                          </motion.ol>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* ── Rail: start card + creator ────────────────────────────── */}
        <aside className={styles.rail} aria-label="Start this course">
          <motion.div className={styles.startCard} {...rise(0.04)}>
            <span className={`${styles.priceTag} ${isPaid ? styles.pricePremium : ''}`}>
              {isPaid ? 'Premium' : 'Free course'}
            </span>
            {isEnrolled && totalLessons > 0 ? (
              <div className={styles.progress}>
                <span className={styles.track}>
                  <span className={styles.fill} style={{ width: `${pct}%` }} />
                </span>
                <span className={styles.progressText}>
                  {done} / {totalLessons}
                </span>
              </div>
            ) : null}
            {cta}
            <p className={styles.ctaSub}>{ctaSub}</p>

            <ul className={styles.includes}>
              {totalLessons > 0 && (
                <li>
                  <BookOpen size={18} strokeWidth={2.5} aria-hidden="true" />
                  {totalLessons} bite-sized lesson{totalLessons === 1 ? '' : 's'}
                </li>
              )}
              {duration && (
                <li>
                  <Clock size={18} strokeWidth={2.5} aria-hidden="true" />
                  {duration} in total
                </li>
              )}
              {level && (
                <li>
                  <Target size={18} strokeWidth={2.5} aria-hidden="true" />
                  {level}
                </li>
              )}
              <li>
                <InfinityIcon size={18} strokeWidth={2.5} aria-hidden="true" />
                Self-paced, learn anytime
              </li>
              {course.language && (
                <li>
                  <Globe size={18} strokeWidth={2.5} aria-hidden="true" />
                  {course.language}
                </li>
              )}
            </ul>
          </motion.div>

          <div className={styles.creatorCard}>
            <div className={styles.creatorHead}>
              <Avatar src={creator.avatar ?? undefined} name={creator.name} size="lg" />
              <div className={styles.creatorInfo}>
                <span className={styles.creatorLabel}>Your creator</span>
                <span className={styles.creatorName}>
                  {creator.name}
                  {creator.verified && <ShieldCheck size={16} className={styles.verified} aria-label="Verified creator" />}
                </span>
                {creator.headline && <span className={styles.creatorHeadline}>{creator.headline}</span>}
              </div>
            </div>
            {creator.bio && <p className={styles.creatorBio}>{creator.bio}</p>}
            {((creator.stats.studentsCount ?? 0) > 0 || (creator.stats.coursesCount ?? 0) > 0) && (
              <div className={styles.creatorStats}>
                {(creator.stats.studentsCount ?? 0) > 0 && (
                  <span>
                    <strong>{creator.stats.studentsCount!.toLocaleString()}</strong> learners
                  </span>
                )}
                {(creator.stats.coursesCount ?? 0) > 0 && (
                  <span>
                    <strong>{creator.stats.coursesCount}</strong> course{creator.stats.coursesCount === 1 ? '' : 's'}
                  </span>
                )}
                {creator.stats.ratingAvg != null && (creator.stats.reviewsCount ?? 0) > 0 && (
                  <span>
                    <strong>{creator.stats.ratingAvg}</strong> rating
                  </span>
                )}
              </div>
            )}
            {creator.username && (
              <Link
                href={`/creator-profile/${creator.username}`}
                className={styles.ghostBtn}
                onClick={() => playSound('navTap', 3)}
              >
                View profile
              </Link>
            )}
          </div>
        </aside>
      </div>

      {/* Phones: the CTA stays in reach at the bottom of the screen. */}
      <div className={styles.stickyCta}>
        {cta}
        <p className={styles.ctaSub}>{ctaSub}</p>
      </div>

      <AnimatePresence>
        {showWizard && (
          <EnrollmentWizard
            courseId={course.id}
            courseTitle={course.title}
            category={course.category ?? null}
            thumbnailUrl={course.thumbnailUrl ?? null}
            isPaid={isPaid}
            firstLessonTitle={firstLesson?.title}
            secondLessonTitle={secondLesson?.title}
            unitTitle={firstSectionIndex >= 0 ? sections[firstSectionIndex].title : undefined}
            stats={{ totalLessons, totalXp: totalXp ?? 0, totalMinutes }}
            enroll={handleEnroll}
            onClose={() => setShowWizard(false)}
            onFinish={(result) => startFirstLesson(result?.firstLesson?.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
