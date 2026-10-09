'use client';

/**
 * Course page — what a learner sees after tapping a course in Explore.
 *
 * Duolingo-style: one job (start the course), stated once and big.
 *
 *  - Hero: cover, title, creator, and real stats as chunky chips.
 *  - Tey says one honest line: what's free, or what's next.
 *  - What you'll learn (only what the creator wrote).
 *  - The course path: unit banners in path colours, lesson nodes, a chest at
 *    the end of each unit. Free-preview and locked lessons are marked.
 *  - Desktop: a sticky start card with the CTA, what's included, and the
 *    creator. Phones: the same CTA pinned above the bottom nav.
 *
 * START opens the enrolment scene (components/course/EnrollmentWizard), which
 * enrols, celebrates, and drops the learner straight into lesson 1. Enrolled
 * learners get CONTINUE, which goes straight to their next lesson.
 *
 * Every number comes from the server; anything missing is hidden, never made up.
 */

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { pendingCouponCode, rememberCouponCode } from '@/lib/coupons/pendingCode';
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
import StudentShell from '@/components/layout/StudentShell';
import { StatsBar } from '@/components/ui/StatsBar';
import Avatar from '@/components/ui/Avatar';
import { CourseCover } from '@/components/course/CourseCover';
import EnrollmentWizard, { type EnrollResponse } from '@/components/course/EnrollmentWizard';
import { lessonHref, preloadCourse, useEnrollments } from '@/hooks/useCourse';
import { setHomeCourse } from '@/lib/homeCourse';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { useGamification } from '@/context/GamificationContext';
import styles from './CourseDetail.module.css';
import { courseHomeHref } from '@/lib/homeCourse';

interface Lesson {
  id?: string;
  title: string;
  durationMinutes?: number;
  lessonType?: string;
  xpReward?: number;
}

interface CurriculumSection {
  id?: string;
  title: string;
  orderIndex?: number;
  lessons: Lesson[];
}

/** Creator info embedded in the course payload (real rows only). */
interface CourseInstructor {
  id?: string;
  fullName?: string;
  avatarUrl?: string | null;
  profile?: {
    username?: string | null;
    headline?: string | null;
    bio?: string | null;
    about?: string | null;
    primaryExpertise?: string | null;
    avatarUrl?: string | null;
  };
  instructorProfile?: {
    professionalHeadline?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
    verificationStatus?: string | null;
  };
  /** Aggregate over the creator's PUBLISHED courses (backend-computed). */
  stats?: {
    coursesCount?: number;
    studentsCount?: number;
    reviewsCount?: number;
    ratingAvg?: number | null;
  };
}

/** Shape returned by GET /api/v1/courses/:idOrSlug. */
interface CourseDetail {
  id?: string;
  slug?: string;
  title?: string;
  description?: string;
  shortDescription?: string | null;
  thumbnailUrl?: string | null;
  price?: number;
  category?: string;
  level?: string;
  language?: string;
  /** JSON columns — arrays of strings when the creator wrote them. */
  outcomes?: unknown;
  realOutputs?: unknown;
  skills?: unknown;
  studentsCount?: number;
  stats?: {
    modulesCount?: number;
    lessonsCount?: number;
    durationMinutes?: number;
    totalXp?: number;
    ratingAvg?: number | null;
    reviewsCount?: number;
  };
  sections?: CurriculumSection[];
  instructor?: CourseInstructor;
}

/** Mirrors the backend paywall: a paid course's first 2 published lessons are free. */
const FREE_PREVIEW_LESSONS = 2;
/** The backend's real section-completion bonus. */
const UNIT_CHEST_XP = 50;
/** Unit banners cycle the home path's colours. */
const UNIT_TONES = ['toneBlue', 'toneGreen', 'tonePurple', 'toneOrange'] as const;

const toStringList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string' && v.trim().length > 0) : [];

function formatMinutes(total: number) {
  if (total <= 0) return null;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`;
}

function prettyLevel(level?: string) {
  return level ? level.charAt(0).toUpperCase() + level.slice(1).toLowerCase() : null;
}

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idOrSlug } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreviewMode = searchParams?.get('preview') === 'true';
  const reduce = useReducedMotion() ?? false;

  const { refresh } = useGamification();
  const { enrollments, mutate: mutateEnrollments } = useEnrollments();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [sections, setSections] = useState<CurriculumSection[]>([]);
  const [openUnits, setOpenUnits] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [justEnrolled, setJustEnrolled] = useState(false);
  // Session state for the enrol gate. 'unknown' means the check hasn't landed.
  const [authState, setAuthState] = useState<'unknown' | 'authed' | 'guest'>('unknown');
  const [showWizard, setShowWizard] = useState(false);

  // Count a course-page view once per browser session (anonymous aggregate;
  // powers the creator's "viewed → enrolled" funnel).
  useEffect(() => {
    if (!idOrSlug || isPreviewMode) return;
    const key = `teyro_course_view_${idOrSlug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // storage unavailable (private mode) — still count this visit
    }
    fetch(`/api/courses/${encodeURIComponent(idOrSlug)}/view`, { method: 'POST' }).catch(() => {});
  }, [idOrSlug, isPreviewMode]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setIsLoading(true);
        setLoadFailed(false);
        if (isPreviewMode) {
          const [draftRes, curRes] = await Promise.all([
            fetch(`/api/courses/${idOrSlug}/draft`, { credentials: 'include' }),
            fetch(`/api/courses/${idOrSlug}/curriculum`, { credentials: 'include' }),
          ]);
          if (cancelled) return;
          if (draftRes.ok) setCourse(await draftRes.json());
          if (curRes.ok) {
            const cur = await curRes.json();
            if (Array.isArray(cur)) {
              setSections(cur);
              setOpenUnits(cur.slice(0, 1).map((s: CurriculumSection, i: number) => s.id || String(i)));
            }
          }
          return;
        }

        const [courseRes, meRes] = await Promise.all([
          fetch(`/api/courses/${idOrSlug}`),
          fetch('/api/auth/me', { credentials: 'include' }),
        ]);
        if (cancelled) return;
        setAuthState(meRes.ok ? 'authed' : 'guest');
        if (!courseRes.ok) {
          setLoadFailed(courseRes.status !== 404);
          return;
        }
        const data: CourseDetail = await courseRes.json();
        setCourse(data);
        if (Array.isArray(data.sections)) {
          setSections(data.sections);
          setOpenUnits(data.sections.slice(0, 2).map((s, i) => s.id || String(i)));
        }
      } catch (err) {
        console.error('Failed to load course details:', err);
        if (!cancelled) setLoadFailed(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [idOrSlug, isPreviewMode]);

  const enrollment = useMemo(
    () => (enrollments ?? []).find((e) => e.courseId === course?.id || e.courseId === idOrSlug) ?? null,
    [enrollments, course?.id, idOrSlug],
  );
  const isEnrolled = !!enrollment || justEnrolled;

  // ─── Real-or-hide stats ──────────────────────────────────────────────────
  const allLessons = sections.flatMap((s) => s.lessons || []);
  const serverStats = course?.stats;
  const totalLessons = serverStats?.lessonsCount ?? allLessons.length;
  const totalMinutes = serverStats?.durationMinutes ?? allLessons.reduce((a, l) => a + (l.durationMinutes || 0), 0);
  const duration = formatMinutes(totalMinutes);
  // Lesson rewards + the unit chests. Hidden when no rewards are configured.
  const lessonXp = serverStats?.totalXp ?? 0;
  const totalXp = lessonXp > 0 ? lessonXp + sections.length * UNIT_CHEST_XP : null;
  const learners = course?.studentsCount ?? 0;
  const ratingAvg = serverStats?.ratingAvg ?? null;
  const reviewsCount = serverStats?.reviewsCount ?? 0;
  const isPaid = Number(course?.price ?? 0) > 0;
  const level = prettyLevel(course?.level);

  // Global lesson order, for the free-preview rule.
  const globalIndex = new Map<string, number>();
  let cursor = 0;
  sections.forEach((s) =>
    (s.lessons || []).forEach((l) => {
      if (l.id) globalIndex.set(l.id, cursor);
      cursor += 1;
    }),
  );

  const instructor: CourseInstructor = course?.instructor ?? {};
  const profile = instructor.profile || {};
  const detail = instructor.instructorProfile || {};
  const creatorStats = instructor.stats ?? {};
  const creatorName = instructor.fullName || 'Course creator';
  const creatorAvatar = profile.avatarUrl || detail.avatarUrl || instructor.avatarUrl || null;
  const creatorUsername = profile.username || null;
  const creatorHeadline = profile.headline || detail.professionalHeadline || profile.primaryExpertise || null;
  const creatorBio = profile.bio || detail.bio || profile.about || null;
  const creatorVerified = detail.verificationStatus === 'VERIFIED';

  const outcomes = (() => {
    for (const list of [course?.outcomes, course?.realOutputs, course?.skills]) {
      const l = toStringList(list);
      if (l.length > 0) return l;
    }
    return [];
  })();

  // The creation wizard seeds description with 'New Course Draft'.
  const rawDescription = course?.description || '';
  const description =
    course?.shortDescription || (rawDescription && rawDescription !== 'New Course Draft' ? rawDescription : null);

  const courseId = course?.id || idOrSlug;
  const title = course?.title || 'Untitled course';

  // A coupon link (?code=LAUNCH20): keep the code for the paywall.
  const [savedCode, setSavedCode] = useState<string | null>(null);
  useEffect(() => {
    if (!course?.id) return;
    setSavedCode(rememberCouponCode(course.id, searchParams.get('code')) ?? pendingCouponCode(course.id));
  }, [course?.id, searchParams]);

  // The first lesson, wherever it sits (a unit may be empty).
  const firstSectionIndex = sections.findIndex((s) => (s.lessons?.length ?? 0) > 0);
  const firstLesson = firstSectionIndex >= 0 ? sections[firstSectionIndex].lessons[0] : undefined;
  const secondLesson = allLessons[1];

  const done = Math.min(enrollment?.completedCount ?? 0, enrollment?.course.totalLessons ?? totalLessons);
  const pct = totalLessons > 0 ? Math.round((done / totalLessons) * 100) : 0;

  // ─── Actions ─────────────────────────────────────────────────────────────
  const continueHref = () => {
    const next = enrollment?.nextLesson;
    if (next) return lessonHref(courseId, next.sectionIndex, next.id);
    return courseHomeHref(courseId);
  };

  const handlePrimary = () => {
    if (isPreviewMode) return;
    playHaptic('medium', false);

    if (isEnrolled) {
      playSound('start');
      router.push(continueHref());
      return;
    }

    // Require a session BEFORE the celebration: a login wall mid-scene would
    // dump the learner out of the moment. 'unknown' opens anyway; enroll()
    // has a 401 fallback.
    if (authState === 'guest') {
      playSound('navTap', 1);
      router.push(`/login?next=${encodeURIComponent(`/courses/${idOrSlug}`)}`);
      return;
    }

    playSound('nodeTap');
    setShowWizard(true);
  };

  // The scene's ONLY backend call.
  const handleEnroll = async (): Promise<EnrollResponse> => {
    const res = await fetch(`/api/courses/${courseId}/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (res.status === 401) {
      router.push(`/login?next=${encodeURIComponent(`/courses/${idOrSlug}`)}`);
      throw new Error('Session expired');
    }
    if (!res.ok) throw new Error(`Enroll failed with status ${res.status}`);

    const data: EnrollResponse = await res.json();
    setJustEnrolled(true);
    // The new course becomes the one home's path shows, like Duolingo.
    setHomeCourse(course?.id || idOrSlug);
    void mutateEnrollments();
    void refresh(); // sync the stats bar with the server grant
    preloadCourse(courseId);
    return data;
  };

  // Straight into the lesson the server says is first (falling back to the
  // curriculum's), skipping the course map — enrol → play, like Duolingo.
  const startFirstLesson = (lessonId?: string) => {
    const id = lessonId || firstLesson?.id;
    const secIdx = id ? sections.findIndex((s) => (s.lessons || []).some((l) => l.id === id)) : -1;
    router.push(id && secIdx >= 0 ? lessonHref(courseId, secIdx, id) : courseHomeHref(courseId));
  };

  const openLesson = (secIdx: number, lessonId?: string) => {
    if (!isEnrolled) return;
    playSound('nodeTap');
    playHaptic('light', false);
    router.push(lessonId ? lessonHref(courseId, secIdx, lessonId) : courseHomeHref(courseId));
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
    : 'Start for free';
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

  // ─── States ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <StudentShell isWide>
        <div className={styles.page} aria-busy="true" aria-label="Loading course">
          <div className={styles.skelTop} />
          <div className={styles.grid}>
            <div className={styles.main}>
              <div className={`${styles.skel} ${styles.skelHero}`} />
              <div className={`${styles.skel} ${styles.skelRow}`} />
              <div className={`${styles.skel} ${styles.skelRow}`} />
            </div>
            <div className={`${styles.skel} ${styles.skelRail}`} />
          </div>
        </div>
      </StudentShell>
    );
  }

  if (!course && !isPreviewMode) {
    return (
      <StudentShell isWide>
        <div className={styles.stateBox} role={loadFailed ? 'alert' : undefined}>
          <Image src="/dashboard tey.webp" alt="" width={140} height={140} />
          <h1 className={styles.stateTitle}>{loadFailed ? 'We couldn’t load this course' : 'This course isn’t here'}</h1>
          <p className={styles.stateText}>
            {loadFailed
              ? 'Check your connection and try again.'
              : 'It may have moved, or its creator is still building it.'}
          </p>
          {loadFailed ? (
            <button type="button" className={styles.primaryBtn} onClick={() => router.refresh()}>
              Try again
            </button>
          ) : (
            <Link href="/dashboard/explore" className={styles.primaryBtn} onClick={() => playSound('navTap', 1)}>
              Explore courses
            </Link>
          )}
        </div>
      </StudentShell>
    );
  }

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { type: 'spring' as const, stiffness: 320, damping: 28, delay },
        };

  const cta = (
    <button type="button" className={styles.ctaBtn} onClick={handlePrimary} disabled={isPreviewMode}>
      {ctaLabel}
    </button>
  );

  return (
    <StudentShell isWide>
      <div className={styles.page}>
        <div className={styles.topBar}>
          <Link href="/dashboard/explore" className={styles.backLink} onClick={() => playSound('navTap', 0)}>
            <ArrowLeft size={20} strokeWidth={3} aria-hidden="true" />
            Explore
          </Link>
          {/* Phones already have the shell's HUD. */}
          <div className={styles.desktopStats}>
            <StatsBar compact show={['streak', 'coin', 'gem', 'lives']} />
          </div>
        </div>

        {isPreviewMode && <p className={styles.previewBanner}>Creator preview · this is what learners see</p>}

        <div className={styles.grid}>
          <div className={styles.main}>
            {/* ── Hero ─────────────────────────────────────────────── */}
            <motion.section className={styles.hero} aria-label="Course" {...rise(0)}>
              <CourseCover
                id={course?.id}
                category={course?.category}
                thumbnailUrl={course?.thumbnailUrl}
                sizes="(max-width: 700px) 100vw, 280px"
                glyphSize={56}
                className={styles.heroCover}
                priority
              />
              <div className={styles.heroBody}>
                <span className={styles.eyebrow}>
                  {[course?.category !== 'Uncategorized' ? course?.category : null, level].filter(Boolean).join(' · ') ||
                    'Course'}
                </span>
                <h1 className={styles.title}>{title}</h1>
                {description && <p className={styles.description}>{description}</p>}

                <div className={styles.byline}>
                  <Avatar src={creatorAvatar ?? undefined} name={creatorName} size="xs" />
                  <span>
                    by{' '}
                    {creatorUsername ? (
                      <Link href={`/creator-profile/${creatorUsername}`} className={styles.bylineLink}>
                        {creatorName}
                      </Link>
                    ) : (
                      <strong>{creatorName}</strong>
                    )}
                  </span>
                  {creatorVerified && <ShieldCheck size={16} className={styles.verified} aria-label="Verified creator" />}
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

            {/* ── What you'll learn ─────────────────────────────────── */}
            {outcomes.length > 0 && (
              <motion.section className={styles.card} aria-labelledby="learn-h" {...rise(0.1)}>
                <h2 id="learn-h" className={styles.cardTitle}>
                  What you&apos;ll learn
                </h2>
                <ul className={styles.outcomes}>
                  {outcomes.map((o, i) => (
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

            {/* ── The course path ───────────────────────────────────── */}
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

          {/* ── Rail: start card + creator ──────────────────────────── */}
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
                {course?.language && (
                  <li>
                    <Globe size={18} strokeWidth={2.5} aria-hidden="true" />
                    {course.language}
                  </li>
                )}
              </ul>
            </motion.div>

            <div className={styles.creatorCard}>
              <div className={styles.creatorHead}>
                <Avatar src={creatorAvatar ?? undefined} name={creatorName} size="lg" />
                <div className={styles.creatorInfo}>
                  <span className={styles.creatorLabel}>Your creator</span>
                  <span className={styles.creatorName}>
                    {creatorName}
                    {creatorVerified && <ShieldCheck size={16} className={styles.verified} aria-label="Verified creator" />}
                  </span>
                  {creatorHeadline && <span className={styles.creatorHeadline}>{creatorHeadline}</span>}
                </div>
              </div>
              {creatorBio && <p className={styles.creatorBio}>{creatorBio}</p>}
              {((creatorStats.studentsCount ?? 0) > 0 || (creatorStats.coursesCount ?? 0) > 0) && (
                <div className={styles.creatorStats}>
                  {(creatorStats.studentsCount ?? 0) > 0 && (
                    <span>
                      <strong>{creatorStats.studentsCount!.toLocaleString()}</strong> learners
                    </span>
                  )}
                  {(creatorStats.coursesCount ?? 0) > 0 && (
                    <span>
                      <strong>{creatorStats.coursesCount}</strong> course{creatorStats.coursesCount === 1 ? '' : 's'}
                    </span>
                  )}
                  {creatorStats.ratingAvg != null && (creatorStats.reviewsCount ?? 0) > 0 && (
                    <span>
                      <strong>{creatorStats.ratingAvg}</strong> rating
                    </span>
                  )}
                </div>
              )}
              {creatorUsername && (
                <Link
                  href={`/creator-profile/${creatorUsername}`}
                  className={styles.ghostBtn}
                  onClick={() => playSound('navTap', 3)}
                >
                  View profile
                </Link>
              )}
            </div>
          </aside>
        </div>

        {/* Phones: the CTA stays in reach above the bottom nav. */}
        <div className={styles.stickyCta}>
          {cta}
          <p className={styles.ctaSub}>{ctaSub}</p>
        </div>
      </div>

      <AnimatePresence>
        {showWizard && (
          <EnrollmentWizard
            courseId={course?.id}
            courseTitle={title}
            category={course?.category ?? null}
            thumbnailUrl={course?.thumbnailUrl ?? null}
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
    </StudentShell>
  );
}
