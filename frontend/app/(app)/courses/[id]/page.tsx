'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Infinity as InfinityIcon,
  Layers,
  Lock,
  Play,
  ShieldCheck,
  Star,
  Target,
  Users,
  Zap
} from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';
import StudentShell from '@/components/layout/StudentShell';
import { StatsBar } from '@/components/ui/StatsBar';
import GamificationIcon from '@/components/ui/GamificationIcon';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import EnrollmentWizard, { type EnrollResponse } from '@/components/course/EnrollmentWizard';
import { playHaptic } from '@/lib/haptics';
import { playWinSound } from '@/utils/audio';
import { useGamification } from '@/context/GamificationContext';
import styles from './CourseDetail.module.css';

/* ─── Spring Constants for Duolingo-grade feel ─── */
const SPRING_GENTLE = { type: 'spring', stiffness: 300, damping: 26 } as const;

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

/** Shape returned by GET /api/v1/courses/:idOrSlug. Every stat comes from
 *  the server computed off real rows — the UI renders values or hides them. */
interface CourseDetail {
  id?: string;
  slug?: string;
  title?: string;
  description?: string;
  shortDescription?: string | null;
  thumbnailUrl?: string | null;
  price?: number;
  originalPrice?: number | null;
  category?: string;
  level?: string;
  language?: string;
  /** JSON columns — arrays of strings when the creator wrote them. */
  outcomes?: unknown;
  realOutputs?: unknown;
  skills?: unknown;
  published?: boolean;
  studentsCount?: number;
  stats?: {
    modulesCount?: number;
    lessonsCount?: number;
    durationMinutes?: number;
    totalXp?: number;
    ratingAvg?: number | null;
    reviewsCount?: number;
  };
  instructor?: CourseInstructor;
}

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const idOrSlug = resolvedParams.id;
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreviewMode = searchParams?.get('preview') === 'true';

  const { refresh } = useGamification();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [sections, setSections] = useState<CurriculumSection[]>([]);
  const [openSectionIds, setOpenSectionIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Session state for the enroll gate — resolved from the /api/auth/me call
  // below. 'unknown' means the check hasn't landed yet.
  const [authState, setAuthState] = useState<'unknown' | 'authed' | 'guest'>('unknown');

  // ─── 4-STEP ENROLLMENT WIZARD STATE (lives in EnrollmentWizard) ───
  const [showEnrollWizard, setShowEnrollWizard] = useState(false);

  // Count a course detail-page view once per browser session. Anonymous
  // aggregate only — powers the creator's "viewed → enrolled" funnel.
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
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (isPreviewMode) {
          const draftRes = await fetch(`/api/courses/${idOrSlug}/draft`, { credentials: 'include' });
          if (draftRes.ok) {
            const draftData = await draftRes.json();
            setCourse(draftData);
          }
          const curRes = await fetch(`/api/courses/${idOrSlug}/curriculum`, { credentials: 'include' });
          if (curRes.ok) {
            const curData = await curRes.json();
            if (Array.isArray(curData)) {
              setSections(curData);
              if (curData.length > 0) setOpenSectionIds([curData[0].id || '0']);
            }
          }
        } else {
          const courseRes = await fetch(`/api/courses/${idOrSlug}`);
          if (courseRes.ok) {
            const data = await courseRes.json();
            setCourse(data);
            if (Array.isArray(data.sections)) {
              setSections(data.sections);
              if (data.sections.length > 0) {
                setOpenSectionIds([data.sections[0].id || '0', data.sections[1]?.id || '1']);
              }
            }

            const meRes = await fetch('/api/auth/me', { credentials: 'include' });
            setAuthState(meRes.ok ? 'authed' : 'guest');
            if (meRes.ok) {
              const enrollmentsRes = await fetch('/api/auth/me/enrollments', { credentials: 'include' });
              if (enrollmentsRes.ok) {
                const enrollments = (await enrollmentsRes.json()) as { courseId: string }[];
                const enrolled = enrollments.some(
                  (e) => e.courseId === data.id || e.courseId === idOrSlug
                );
                setIsEnrolled(enrolled);
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load course details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idOrSlug, isPreviewMode]);

  const toggleSection = (sectionId: string) => {
    setOpenSectionIds((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // ─── REAL-OR-HIDE STATS ────────────────────────────────────────────────
  // Every number below comes from the server (`stats` / `instructor.stats`
  // are computed from real rows by GET /courses/:id). When a value doesn't
  // exist we HIDE the element instead of inventing one — no default 4.9★,
  // no fake learner counts, no boilerplate copy.
  const allLessons = sections.flatMap((s) => s.lessons || []);
  const serverStats = course?.stats;

  const totalLessonsCount = serverStats?.lessonsCount ?? allLessons.length;
  const totalMinutes =
    serverStats?.durationMinutes ??
    allLessons.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
  const formattedDuration =
    totalMinutes > 0
      ? `${Math.floor(totalMinutes / 60) > 0 ? `${Math.floor(totalMinutes / 60)}h ` : ''}${totalMinutes % 60}m`
      : null;

  // XP promise = creator-configured lesson rewards (+50 per unit mastery
  // chest, matching the backend's real section-completion bonus). Hidden
  // entirely when no lesson rewards have been configured yet.
  const chestBonusXp = sections.length * 50;
  const rawLessonXp = serverStats?.totalXp ?? 0;
  const totalXp = rawLessonXp > 0 ? rawLessonXp + chestBonusXp : null;

  const learnersCount = course?.studentsCount ?? 0;
  const ratingAvg = serverStats?.ratingAvg ?? null;
  const reviewsCount = serverStats?.reviewsCount ?? 0;
  const isPaidCourse = Number(course?.price ?? 0) > 0;

  // Global lesson order — mirrors the backend paywall rule: the first two
  // PUBLISHED lessons of the whole course are free preview, everything else
  // on a paid course is locked until enrollment.
  const lessonGlobalIndexById = new Map<string, number>();
  let globalLessonCursor = 0;
  sections.forEach((sec) =>
    (sec.lessons || []).forEach((les) => {
      if (les.id) lessonGlobalIndexById.set(les.id, globalLessonCursor);
      globalLessonCursor += 1;
    }),
  );

  // Real Creator Profile Data directly from course relation (No Mocked Data).
  // Headline/bio/username render only when the creator actually wrote them.
  const instructor: CourseInstructor = course?.instructor ?? {};
  const instructorProfile = instructor.profile || {};
  const instructorDetail = instructor.instructorProfile || {};
  const instructorStats = instructor.stats ?? {};

  const instructorName = instructor.fullName || 'Course Creator';

  const instructorAvatar: string | null =
    instructorProfile.avatarUrl ||
    instructorDetail.avatarUrl ||
    instructor.avatarUrl ||
    null;

  const instructorUsername: string | null = instructorProfile.username || null;

  const instructorHeadline: string | null =
    instructorProfile.headline ||
    instructorDetail.professionalHeadline ||
    instructorProfile.primaryExpertise ||
    null;

  const instructorBio: string | null =
    instructorProfile.bio ||
    instructorDetail.bio ||
    instructorProfile.about ||
    null;

  const isVerifiedInstructor = instructorDetail.verificationStatus === 'VERIFIED';

  const instructorCoursesCount = instructorStats.coursesCount ?? 0;
  const instructorStudentsCount = instructorStats.studentsCount ?? 0;
  const instructorRatingAvg = instructorStats.ratingAvg ?? null;
  const instructorReviewsCount = instructorStats.reviewsCount ?? 0;

  // Honest outcomes: ONLY what the creator wrote (outcomes → realOutputs →
  // skills). If none exist the whole "What You'll Achieve" block hides.
  const toStringList = (value: unknown): string[] =>
    Array.isArray(value)
      ? value.filter(
          (v): v is string => typeof v === 'string' && v.trim().length > 0,
        )
      : [];
  const outcomesList = toStringList(course?.outcomes);
  const realOutputsList = toStringList(course?.realOutputs);
  const skillsList = toStringList(course?.skills);
  const dynamicOutcomes =
    outcomesList.length > 0
      ? outcomesList
      : realOutputsList.length > 0
        ? realOutputsList
        : skillsList;

  // The creation wizard seeds description as 'New Course Draft' — treat that
  // seed (or empty) as "no description written yet".
  const rawDescription: string = course?.description || '';
  const hasRealDescription =
    rawDescription.length > 0 && rawDescription !== 'New Course Draft';
  const heroDescription: string | null =
    course?.shortDescription || (hasRealDescription ? rawDescription : null);

  // ─── ENROLL BUTTON → AUTH GATE → 4-SCREEN WIZARD ───
  const handleStartLearningFree = () => {
    playHaptic('medium');
    if (isPreviewMode) return;

    if (isEnrolled) {
      router.push(`/learn/${course?.id || idOrSlug}`);
      return;
    }

    // Require a session BEFORE the celebration starts — hitting a login wall
    // at the final step would dump the user out of the moment. 'unknown'
    // (check still in flight) opens anyway; enroll() has a 401 fallback.
    if (authState === 'guest') {
      router.push(`/login?redirect=/courses/${idOrSlug}`);
      return;
    }

    // Celebratory entry into the wizard — nothing is enrolled yet.
    fireConfetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0172FD', '#22C55E', '#F59E0B', '#EC4899', '#A855F7'],
    });
    playWinSound();
    setShowEnrollWizard(true);
  };

  // The wizard's ONLY backend call — fired by screen 3's commit button.
  const handleWizardEnroll = async (): Promise<EnrollResponse> => {
    const res = await fetch(`/api/courses/${course?.id || idOrSlug}/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (res.status === 401) {
      // Stale session despite the upfront gate — recover to login.
      router.push(`/login?redirect=/courses/${idOrSlug}`);
      throw new Error('Session expired');
    }
    if (!res.ok) {
      throw new Error(`Enroll failed with status ${res.status}`);
    }

    const data: EnrollResponse = await res.json();
    setIsEnrolled(true);
    void refresh(); // sync StatsBar balances from the server grant
    return data;
  };

  // Only enrolled learners can launch lessons from this page. Guests who
  // want to learn go through the big CTA → enrollment wizard instead —
  // nothing here may deep-link an un-enrolled visitor into /learn.
  const handleLessonStart = (secIdx: number) => {
    if (!isEnrolled) return;
    playHaptic('light');
    router.push(`/learn/${course?.id || idOrSlug}/section/${secIdx}`);
  };

  if (isLoading) {
    return (
      <StudentShell isWide>
        <div className={styles.loadingContainer}>
          <div className={styles.duoSpinner} />
          <p className={styles.loadingText}>Unrolling your quest...</p>
        </div>
      </StudentShell>
    );
  }

  if (!course && !isPreviewMode) {
    return (
      <StudentShell isWide>
        <div className={styles.loadingContainer}>
          <Image
            src="/User onbarding Assets/Tey_welcome.webp"
            alt="Tey"
            width={120}
            height={120}
            className={styles.mascotBounce}
          />
          <h2 className={styles.notFoundHeading}>Course Quest Not Found</h2>
          <p className={styles.notFoundSub}>
            This course might have moved or is still being crafted by the creator.
          </p>
          <Link href="/dashboard/explore" className={styles.duoButtonGreen}>
            Explore Courses
          </Link>
        </div>
      </StudentShell>
    );
  }

  const courseTitle = course?.title || 'Untitled Course';

  const firstSection = sections[0];
  const firstLesson = firstSection?.lessons?.[0];
  const secondLesson = firstSection?.lessons?.[1];

  return (
    <StudentShell isWide>
      <div className={styles.discoveryWrapper}>
        {/* ─── TOP NAV / STATS ROW (DUOLINGO STUDENT HEADER) ─── */}
        <div className={styles.topHeaderRow}>
          <Link href="/dashboard/explore" onClick={() => playHaptic('light')} className={styles.backLink}>
            <ArrowLeft size={18} />
            <span>All Courses</span>
          </Link>
          <StatsBar />
        </div>

        {/* ─── 2-COLUMN MAIN GRID (COURSE INFO & ROADMAP LEFT | SIDEBAR RIGHT) ─── */}
        <div className={styles.duoMainGrid}>
          {/* ─── LEFT COLUMN: COURSE INFO -> WHAT YOU'LL ACHIEVE -> SECTIONS ROADMAP ─── */}
          <div className={styles.leftContentCol}>
            {/* 1. VIBRANT BLUE COURSE INFO FOCUS CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING_GENTLE}
              className={styles.blueFocusHeroCard}
            >
              <div className={styles.blueHeroTop}>
                {/* Badges — only real course attributes; nothing invented */}
                <div className={styles.pillRow}>
                  {course?.category && course.category !== 'Uncategorized' && (
                    <span className={styles.categoryPillLight}>{course.category}</span>
                  )}
                  {course?.level && (
                    <span className={styles.levelPillLight}>{course.level}</span>
                  )}
                  {totalXp !== null && (
                    <span className={styles.xpPillGold}>
                      <GamificationIcon type="gem" size={16} />
                      Earn up to +{totalXp} XP
                    </span>
                  )}
                  {isPaidCourse ? (
                    <span className={styles.pricePillAmber}>
                      <Lock size={12} /> Premium · First 2 Lessons Free
                    </span>
                  ) : (
                    <span className={styles.freeCoursePill}>Free Course</span>
                  )}
                </div>

                {/* Title & Description */}
                <h1 className={styles.blueFocusTitle}>{courseTitle}</h1>
                {heroDescription && (
                  <p className={styles.blueFocusDescription}>{heroDescription}</p>
                )}

                {/* Metrics Strip — real stats only; missing data hides its item */}
                <div className={styles.blueSpecsRow}>
                  {totalLessonsCount > 0 && (
                    <div className={styles.blueSpecItem}>
                      <BookOpen size={16} color="#93C5FD" />
                      <span>{totalLessonsCount} Lesson{totalLessonsCount === 1 ? '' : 's'}</span>
                    </div>
                  )}
                  {sections.length > 0 && (
                    <div className={styles.blueSpecItem}>
                      <Layers size={16} color="#93C5FD" />
                      <span>{sections.length} Unit{sections.length === 1 ? '' : 's'}</span>
                    </div>
                  )}
                  {formattedDuration && (
                    <div className={styles.blueSpecItem}>
                      <Clock size={16} color="#93C5FD" />
                      <span>{formattedDuration}</span>
                    </div>
                  )}
                  {ratingAvg !== null && reviewsCount > 0 && (
                    <div className={styles.blueSpecItem}>
                      <Star size={16} fill="#FBBF24" color="#FBBF24" />
                      <span>{ratingAvg} ({reviewsCount.toLocaleString()})</span>
                    </div>
                  )}
                  {learnersCount > 0 && (
                    <div className={styles.blueSpecItem}>
                      <Users size={16} color="#93C5FD" />
                      <span>{learnersCount.toLocaleString()} Learner{learnersCount === 1 ? '' : 's'}</span>
                    </div>
                  )}
                </div>

                {/* Big Primary Action — every course starts free (paid ones
                    via the first-2-lessons preview); opens the wizard */}
                <div className={styles.blueActionArea}>
                  <button
                    type="button"
                    onClick={handleStartLearningFree}
                    className={styles.duoActionBtnGreen}
                  >
                    {isEnrolled ? (
                      <span className={styles.btnContent}>
                        <Play size={20} fill="currentColor" /> CONTINUE LEARNING <ArrowRight size={20} />
                      </span>
                    ) : isPaidCourse ? (
                      <span className={styles.btnContent}>
                        <Zap size={20} fill="currentColor" /> START LEARNING FOR FREE <ArrowRight size={20} />
                      </span>
                    ) : (
                      <span className={styles.btnContent}>
                        <Zap size={20} fill="currentColor" /> ENROLL FOR FREE <ArrowRight size={20} />
                      </span>
                    )}
                  </button>
                  <div className={styles.blueActionSub}>
                    {isEnrolled
                      ? 'Pick up right where you left off'
                      : isPaidCourse
                        ? 'First 2 lessons free · unlock the rest anytime'
                        : 'Full access instantly · Jump straight into Lesson 1'}
                  </div>
                </div>
              </div>

              {/* Mascot Dialogue Box Inside Blue Card */}
              <div className={styles.blueMascotStrip}>
                <div className={styles.speechBubbleWhite}>
                  <div className={styles.speechBubbleContent}>
                    <strong className={styles.speechBubbleTitle}>Ready to master this skill?</strong>
                    <p className={styles.speechBubbleBody}>
                      {isEnrolled
                        ? "Great work keeping your daily streak alive! Let's conquer the next lesson together."
                        : `I'll guide you step-by-step through ${courseTitle}. Complete interactive quests to earn XP and level up!`}
                    </p>
                  </div>
                  <div className={styles.speechArrowWhite} />
                </div>
                <div className={styles.mascotSmallWrap}>
                  <Image
                    src="/dashboard tey.png"
                    alt="Tey Mascot"
                    width={96}
                    height={96}
                    priority
                    className={styles.mascotImgBounce}
                  />
                </div>
              </div>
            </motion.div>

            {/* 2. WHAT YOU'LL ACHIEVE — hidden entirely when the creator
                hasn't written any outcomes/skills (no boilerplate filler) */}
            {dynamicOutcomes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_GENTLE, delay: 0.1 }}
              className={styles.achievementsBlock}
            >
              <div className={styles.blockHeaderRow}>
                <div>
                  <h3 className={styles.achievementsHeading}>What You&apos;ll Achieve</h3>
                  <p className={styles.achievementsSub}>
                    Core competencies and practical outcomes you will gain in this course.
                  </p>
                </div>
                {totalXp !== null && (
                  <div className={styles.xpBonusBadge}>
                    <GamificationIcon type="gem" size={16} />
                    <span>Up to +{totalXp} Course XP</span>
                  </div>
                )}
              </div>

              <div className={styles.achievementsGrid}>
                {dynamicOutcomes.map((outcome: string, idx: number) => (
                  <div key={idx} className={styles.achieveCard}>
                    <div className={styles.achieveCheckCircle}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <p className={styles.achieveOutcomeText}>{outcome}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            )}

            {/* 3. COURSE JOURNEY / SECTIONS ROADMAP */}
            <div className={styles.roadmapBlock}>
              <div className={styles.blockHeaderRow}>
                <div>
                  <h3 className={styles.roadmapHeading}>Course Adventure Path</h3>
                  <p className={styles.roadmapSub}>
                    Bite-sized interactive lessons, milestone challenges, and verified skill badges.
                  </p>
                </div>
                <span className={styles.unitsCountBadge}>
                  <Layers size={14} /> {sections.length} Unit{sections.length === 1 ? '' : 's'} · {totalLessonsCount} Lesson{totalLessonsCount === 1 ? '' : 's'}
                </span>
              </div>

              <div className={styles.unitsStack}>
                {sections.map((section, secIdx) => {
                  const isOpen = openSectionIds.includes(section.id || String(secIdx));
                  const isFirstUnit = secIdx === 0;

                  return (
                    <div key={section.id || secIdx} className={styles.unitContainer}>
                      {/* Unit Banner Header */}
                      <div className={`${styles.unitBanner} ${isFirstUnit ? styles.unitBannerActive : styles.unitBannerNext}`}>
                        <div className={styles.unitBannerLeft}>
                          <div className={styles.unitNumberTag}>UNIT {secIdx + 1}</div>
                          <h4 className={styles.unitBannerTitle}>{section.title}</h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleSection(section.id || String(secIdx))}
                          className={styles.unitToggleBtn}
                        >
                          <span className={styles.unitLessonsCount}>{section.lessons?.length ?? 0} Lessons</span>
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>

                      {/* Unit Lessons Path */}
                      {isOpen && (
                        <div className={styles.unitPath}>
                          {section.lessons?.map((lesson, lIdx) => {
                            const globalIdx = lesson.id
                              ? lessonGlobalIndexById.get(lesson.id) ?? 0
                              : 0;
                            // Guests get a static curriculum preview: paid
                            // lessons beyond the first two show locked, the
                            // first two carry a real "Free preview" tag.
                            const isLockedForGuest =
                              !isEnrolled && isPaidCourse && globalIdx >= 2;
                            const isFreePreviewLesson =
                              !isEnrolled && isPaidCourse && globalIdx < 2;
                            const canLaunch = isEnrolled;

                            return (
                            <div
                              key={lesson.id || lIdx}
                              onClick={canLaunch ? () => handleLessonStart(secIdx) : undefined}
                              className={`${styles.pathNodeRow} ${canLaunch ? '' : styles.pathNodeRowStatic}`}
                              aria-disabled={!canLaunch}
                            >
                              <div className={styles.nodeLeft}>
                                <div
                                  className={`${styles.nodeCircle} ${isLockedForGuest ? styles.nodeCircleLocked : ''}`}
                                >
                                  {isLockedForGuest ? (
                                    <Lock size={14} color="#64748B" />
                                  ) : (
                                    <Play size={15} fill="#0172FD" color="#0172FD" />
                                  )}
                                </div>
                                <div className={styles.nodeText}>
                                  <div className={styles.nodeTitle}>{lesson.title}</div>
                                  <div className={styles.nodeMeta}>
                                    {[
                                      lesson.durationMinutes ? `${lesson.durationMinutes} min` : null,
                                      lesson.lessonType
                                        ? lesson.lessonType.charAt(0).toUpperCase() +
                                          lesson.lessonType.slice(1)
                                        : null,
                                    ]
                                      .filter(Boolean)
                                      .join(' · ')}
                                  </div>
                                </div>
                              </div>

                              <div className={styles.nodeRight}>
                                {isFreePreviewLesson && (
                                  <span className={styles.freePreviewTag}>Free preview</span>
                                )}
                                {typeof lesson.xpReward === 'number' && lesson.xpReward > 0 && (
                                  <span className={styles.nodeRewardBadge}>
                                    <GamificationIcon type="gem" size={13} />
                                    +{lesson.xpReward} XP
                                  </span>
                                )}
                                {canLaunch ? (
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleLessonStart(secIdx)}
                                    className={styles.nodeStartBtn}
                                  >
                                    Start <ArrowRight size={13} />
                                  </Button>
                                ) : isLockedForGuest ? (
                                  <span className={styles.nodeLockedLabel}>
                                    <Lock size={12} /> Locked
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            );
                          })}

                          {/* Unit Mastery Chest */}
                          <div className={styles.chestNodeRow}>
                            <div className={styles.chestLeft}>
                              <div className={styles.chestImgWrap}>
                                <Image
                                  src="/Tressure box.png"
                                  alt="Chest"
                                  width={40}
                                  height={40}
                                  className={styles.chestImg}
                                />
                              </div>
                              <div>
                                <div className={styles.chestTitle}>Unit {secIdx + 1} Mastery Chest</div>
                                <div className={styles.chestMeta}>Complete all lessons in this unit to claim +50 XP bonus</div>
                              </div>
                            </div>
                            <div className={styles.chestBadge}>
                              <GamificationIcon type="gem" size={13} />
                              +50 XP Bonus
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── RIGHT SIDEBAR: COURSE SPECS & REAL CREATOR PROFILE CARD ─── */}
          <div className={styles.rightSidebarCol}>
            {/* 1. Course Thumbnail & Key Specs Card */}
            <div className={styles.sideQuestCard}>
              {course?.thumbnailUrl ? (
                <div className={styles.sideThumbnailWrap}>
                  <Image
                    src={course.thumbnailUrl}
                    alt={courseTitle}
                    fill
                    className={styles.sideThumbnailImg}
                    priority
                  />
                  <div className={styles.sideThumbOverlay} />
                </div>
              ) : (
                <div className={styles.fallbackThumb}>
                  <BookOpen size={40} color="#0172FD" />
                </div>
              )}

              <div className={styles.sideCardBody}>
                <h3 className={styles.sideCourseTitle}>{courseTitle}</h3>
                {heroDescription && (
                  <p className={styles.sideCourseDesc}>
                    {heroDescription.length > 110
                      ? `${heroDescription.substring(0, 110)}…`
                      : heroDescription}
                  </p>
                )}

                {/* Course Details List — only rows backed by real data */}
                <div className={styles.specsList}>
                  {totalLessonsCount > 0 && (
                    <div className={styles.specRowItem}>
                      <div className={styles.specIconWrap}><BookOpen size={16} color="#0172FD" /></div>
                      <div className={styles.specTextCol}>
                        <span className={styles.specLabel}>Total Lessons</span>
                        <span className={styles.specValue}>
                          {totalLessonsCount} interactive lesson{totalLessonsCount === 1 ? '' : 's'}
                        </span>
                      </div>
                    </div>
                  )}

                  {formattedDuration && (
                    <div className={styles.specRowItem}>
                      <div className={styles.specIconWrap}><Clock size={16} color="#0172FD" /></div>
                      <div className={styles.specTextCol}>
                        <span className={styles.specLabel}>Duration</span>
                        <span className={styles.specValue}>{formattedDuration}</span>
                      </div>
                    </div>
                  )}

                  {course?.level && (
                    <div className={styles.specRowItem}>
                      <div className={styles.specIconWrap}><Target size={16} color="#0172FD" /></div>
                      <div className={styles.specTextCol}>
                        <span className={styles.specLabel}>Skill Level</span>
                        <span className={styles.specValue}>{course.level}</span>
                      </div>
                    </div>
                  )}

                  <div className={styles.specRowItem}>
                    <div className={styles.specIconWrap}><InfinityIcon size={16} color="#22C55E" /></div>
                    <div className={styles.specTextCol}>
                      <span className={styles.specLabel}>Schedule</span>
                      <span className={styles.specValue}>Self-paced · Learn anytime</span>
                    </div>
                  </div>

                  {!!course?.language && (
                    <div className={styles.specRowItem}>
                      <div className={styles.specIconWrap}><Globe size={16} color="#0172FD" /></div>
                      <div className={styles.specTextCol}>
                        <span className={styles.specLabel}>Language & Access</span>
                        <span className={styles.specValue}>{course.language} · 100% online</span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleStartLearningFree}
                  className={styles.sideCtaButton}
                >
                  {isEnrolled
                    ? 'CONTINUE LEARNING'
                    : isPaidCourse
                      ? 'START LEARNING FOR FREE'
                      : 'ENROLL FOR FREE'}
                </button>
              </div>
            </div>

            {/* 2. DEDICATED REAL CREATOR CARD ON SIDEBAR */}
            <div className={styles.creatorProfileCard}>
              <div className={styles.creatorCardHeader}>
                <Avatar
                  src={instructorAvatar ?? undefined}
                  name={instructorName}
                  size="lg"
                />
                <div className={styles.creatorInfoBlock}>
                  <div className={styles.creatorTitleRow}>
                    <h4 className={styles.creatorCardName}>{instructorName}</h4>
                    {isVerifiedInstructor && (
                      <ShieldCheck size={16} color="#0172FD" aria-label="Verified creator" />
                    )}
                  </div>
                  {instructorHeadline && (
                    <div className={styles.creatorRoleBadge}>{instructorHeadline}</div>
                  )}
                  {instructorUsername && (
                    <div className={styles.creatorHandle}>@{instructorUsername}</div>
                  )}
                </div>
              </div>

              {instructorBio && <p className={styles.creatorBioText}>{instructorBio}</p>}

              {/* Creator Stats — real track-record numbers only */}
              {(instructorStudentsCount > 0 || instructorCoursesCount > 0 || (instructorRatingAvg !== null && instructorReviewsCount > 0)) && (
                <div className={styles.creatorStatsGrid}>
                  {instructorStudentsCount > 0 && (
                    <div className={styles.creatorStatBox}>
                      <span className={styles.creatorStatVal}>{instructorStudentsCount.toLocaleString()}</span>
                      <span className={styles.creatorStatLabel}>Students</span>
                    </div>
                  )}
                  {instructorCoursesCount > 0 && (
                    <div className={styles.creatorStatBox}>
                      <span className={styles.creatorStatVal}>{instructorCoursesCount}</span>
                      <span className={styles.creatorStatLabel}>Courses</span>
                    </div>
                  )}
                  {instructorRatingAvg !== null && instructorReviewsCount > 0 && (
                    <div className={styles.creatorStatBox}>
                      <span className={styles.creatorStatVal}>
                        <Star size={13} fill="#F59E0B" color="#F59E0B" style={{ display: 'inline', marginRight: 2 }} />
                        {instructorRatingAvg}
                      </span>
                      <span className={styles.creatorStatLabel}>Rating</span>
                    </div>
                  )}
                </div>
              )}

              {/* Link to Creator Profile (only when the creator has one) */}
              {instructorUsername && (
                <Link
                  href={`/creator-profile/${instructorUsername}`}
                  className={styles.viewCreatorProfileBtn}
                >
                  <span>View Creator Profile</span>
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4-STEP DUOLINGO ENROLLMENT WIZARD (screens 1-2 preview, 3 enrolls, 4 hands off) ─── */}
      <AnimatePresence>
        {showEnrollWizard && (
          <EnrollmentWizard
            courseTitle={courseTitle}
            thumbnailUrl={course?.thumbnailUrl ?? null}
            isPaid={isPaidCourse}
            firstLessonTitle={firstLesson?.title}
            secondLessonTitle={secondLesson?.title}
            stats={{
              totalLessons: totalLessonsCount,
              totalXp: totalXp ?? 0,
              totalMinutes,
            }}
            enroll={handleWizardEnroll}
            onClose={() => setShowEnrollWizard(false)}
            onFinish={() => router.push(`/learn/${course?.id || idOrSlug}`)}
          />
        )}
      </AnimatePresence>
    </StudentShell>
  );
}
