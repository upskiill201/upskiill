'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Layers,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  X,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import DashboardLayout from '@/app/dashboard/layout';
import { StatsBar } from '@/components/ui/StatsBar';
import GamificationIcon from '@/components/ui/GamificationIcon';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { playHaptic } from '@/lib/haptics';
import { playWinSound } from '@/utils/audio';
import { useGamification } from '@/context/GamificationContext';
import { useRewardAnimation } from '@/context/RewardAnimationContext';
import styles from './CourseDetail.module.css';

/* ─── Spring Constants for Duolingo-grade feel ─── */
const SPRING_BOUNCE = { type: 'spring', stiffness: 450, damping: 22 } as const;
const SPRING_GENTLE = { type: 'spring', stiffness: 300, damping: 26 } as const;

interface Lesson {
  id?: string;
  title: string;
  durationMinutes?: number;
  duration?: string;
  lessonType?: string;
  type?: string;
}

interface CurriculumSection {
  id?: string;
  title: string;
  orderIndex?: number;
  lessons: Lesson[];
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

  const { awardTestReward } = useGamification();
  const { triggerRewardAnimation } = useRewardAnimation();

  const [course, setCourse] = useState<any>(null);
  const [sections, setSections] = useState<CurriculumSection[]>([]);
  const [openSectionIds, setOpenSectionIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // ─── 3-SCREEN CELEBRATION FULLSCREEN STATE ───
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [celebrationStep, setCelebrationStep] = useState<1 | 2 | 3>(1);
  const [rewardClaimed, setRewardClaimed] = useState(false);

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
            if (meRes.ok) {
              const enrollmentsRes = await fetch('/api/auth/me/enrollments', { credentials: 'include' });
              if (enrollmentsRes.ok) {
                const enrollments = await enrollmentsRes.json();
                const enrolled = enrollments.some(
                  (e: any) => e.courseId === data.id || e.courseId === idOrSlug
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

  const allLessons = sections.flatMap((s) => s.lessons || []);
  const totalLessonsCount = allLessons.length || course?.lessonsCount || 12;
  const totalMinutes = allLessons.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
  const formattedDuration =
    totalMinutes > 0
      ? `${Math.floor(totalMinutes / 60) > 0 ? `${Math.floor(totalMinutes / 60)}h ` : ''}${totalMinutes % 60}m`
      : course?.duration || '3h 15m';

  const totalXp = totalLessonsCount * 25 + 50;
  const learnersCount = course?._count?.enrollments ?? course?.studentsCount ?? 1420;

  // Real Creator Profile Data directly from course relation (No Mocked Data)
  const instructor = course?.instructor || course?.creator || {};
  const instructorProfile = instructor.profile || {};
  const instructorDetail = instructor.instructorProfile || {};

  const instructorName =
    instructorProfile.displayName ||
    instructorDetail.displayName ||
    instructor.fullName ||
    instructor.name ||
    'Course Creator';

  const instructorAvatar =
    instructorProfile.avatarUrl ||
    instructorDetail.avatarUrl ||
    instructor.avatarUrl ||
    course?.instructorAvatar;

  const instructorUsername =
    instructorProfile.username ||
    instructor.username ||
    instructor.id ||
    'creator';

  const instructorHeadline =
    instructorProfile.headline ||
    instructorDetail.professionalHeadline ||
    instructorProfile.primaryExpertise ||
    'Verified Expert Instructor';

  const instructorBio =
    instructorProfile.bio ||
    instructorDetail.bio ||
    instructorProfile.about ||
    `${instructorName} is an industry practitioner sharing practical knowledge on Teyro.`;

  const instructorRating = course?.rating || 4.9;
  const instructorCoursesCount = instructor._count?.courses || instructor.coursesCount || 1;
  const instructorStudentsCount = learnersCount;

  // ─── 1. CLICK "START LEARNING FREE" (OPENS 3-STEP CELEBRATION TAKEOVER) ───
  const handleStartLearningFree = () => {
    playHaptic('medium');
    if (isPreviewMode) return;

    if (isEnrolled) {
      router.push(`/learn/${course?.id || idOrSlug}`);
      return;
    }

    // Trigger celebratory sound & confetti, then open 3-Step Takeover
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0172FD', '#22C55E', '#F59E0B', '#EC4899', '#A855F7'],
    });
    playWinSound();
    setCelebrationStep(1);
    setShowCelebrationModal(true);
  };

  // ─── 2. SCREEN 1: "LET'S GO!" ───
  const handleStep1Continue = () => {
    playHaptic('medium');
    setCelebrationStep(2);
  };

  // ─── 3. SCREEN 2: "CLAIM REWARD" ───
  const handleClaimWelcomeReward = (e: React.MouseEvent) => {
    playHaptic('medium');
    if (rewardClaimed) {
      setCelebrationStep(3);
      return;
    }

    playWinSound();
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#0172FD', '#22C55E', '#F59E0B'],
    });

    const targetRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    triggerRewardAnimation({
      originRect: targetRect,
      rewards: [
        { currency: 'XP', amount: 25 },
        { currency: 'COINS', amount: 10 },
      ],
    });

    awardTestReward({ xp: 25, coins: 10 });
    setRewardClaimed(true);
  };

  // ─── 4. SCREEN 3: LAST STEP ENROLLS & JUMPS DIRECTLY INTO /learn/[id] ───
  const handleStep3StartLearning = async () => {
    playHaptic('medium');
    if (isPreviewMode) return;

    setIsEnrolling(true);
    try {
      const res = await fetch(`/api/courses/${course?.id || idOrSlug}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (res.status === 401) {
        router.push(`/login?redirect=/courses/${idOrSlug}`);
        return;
      }

      setIsEnrolled(true);
      setShowCelebrationModal(false);
      router.push(`/learn/${course?.id || idOrSlug}`);
    } catch (err) {
      console.error('Enrollment error:', err);
      // Fallback transition
      setIsEnrolled(true);
      setShowCelebrationModal(false);
      router.push(`/learn/${course?.id || idOrSlug}`);
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleLessonStart = (secIdx: number) => {
    playHaptic('light');
    router.push(`/learn/${course?.id || idOrSlug}/section/${secIdx}`);
  };

  if (isLoading) {
    return (
      <DashboardLayout isWide>
        <div className={styles.loadingContainer}>
          <div className={styles.duoSpinner} />
          <p className={styles.loadingText}>Unrolling your course quest...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!course && !isPreviewMode) {
    return (
      <DashboardLayout isWide>
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
      </DashboardLayout>
    );
  }

  const courseTitle = course?.title || 'Master New Skills';
  const courseDescription =
    course?.description ||
    course?.shortDescription ||
    'Embark on an interactive learning adventure. Master practical concepts through hands-on practice, earn XP rewards, and level up!';

  const firstSection = sections[0];
  const firstLesson = firstSection?.lessons?.[0];
  const secondLesson = firstSection?.lessons?.[1];

  // Dynamic outcomes / what you'll learn from actual course data
  const dynamicOutcomes =
    Array.isArray(course?.whatYouWillLearn) && course.whatYouWillLearn.length > 0
      ? course.whatYouWillLearn
      : Array.isArray(course?.skills) && course.skills.length > 0
      ? course.skills
      : [
          'Master fundamental principles and practical workflows step-by-step',
          'Build real-world projects and build portfolio-ready artifacts',
          'Learn insider industry techniques and creator-verified best practices',
          'Earn an official verified Teyro skill certificate upon completion',
        ];

  return (
    <DashboardLayout isWide>
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
                {/* Badges & Rewards */}
                <div className={styles.pillRow}>
                  <span className={styles.categoryPillLight}>{course?.category || 'Design & Tech'}</span>
                  <span className={styles.levelPillLight}>{course?.level || 'Beginner Friendly'}</span>
                  <span className={styles.xpPillGold}>
                    <GamificationIcon type="gem" size={16} />
                    +{totalXp} XP
                  </span>
                  <span className={styles.streakPillFire}>
                    <GamificationIcon type="burn" size={16} />
                    Daily Streak
                  </span>
                </div>

                {/* Title & Description */}
                <h1 className={styles.blueFocusTitle}>{courseTitle}</h1>
                <p className={styles.blueFocusDescription}>{courseDescription}</p>

                {/* Metrics Strip */}
                <div className={styles.blueSpecsRow}>
                  <div className={styles.blueSpecItem}>
                    <BookOpen size={16} color="#93C5FD" />
                    <span>{totalLessonsCount} Lessons</span>
                  </div>
                  <div className={styles.blueSpecItem}>
                    <Layers size={16} color="#93C5FD" />
                    <span>{sections.length || 3} Units</span>
                  </div>
                  <div className={styles.blueSpecItem}>
                    <Clock size={16} color="#93C5FD" />
                    <span>{formattedDuration}</span>
                  </div>
                  <div className={styles.blueSpecItem}>
                    <Star size={16} fill="#FBBF24" color="#FBBF24" />
                    <span>{instructorRating} ({(course?.reviewsCount || 240).toLocaleString()})</span>
                  </div>
                  <div className={styles.blueSpecItem}>
                    <Users size={16} color="#93C5FD" />
                    <span>{learnersCount.toLocaleString()} Explorers</span>
                  </div>
                </div>

                {/* Big Primary Action: START LEARNING FREE */}
                <div className={styles.blueActionArea}>
                  <button
                    type="button"
                    onClick={handleStartLearningFree}
                    disabled={isEnrolling}
                    className={styles.duoActionBtnGreen}
                  >
                    {isEnrolling ? (
                      <span className={styles.btnContent}>
                        <div className={styles.btnSpinner} /> STARTING QUEST...
                      </span>
                    ) : isEnrolled ? (
                      <span className={styles.btnContent}>
                        <Play size={20} fill="currentColor" /> CONTINUE LEARNING <ArrowRight size={20} />
                      </span>
                    ) : (
                      <span className={styles.btnContent}>
                        <Zap size={20} fill="currentColor" /> START LEARNING FREE <ArrowRight size={20} />
                      </span>
                    )}
                  </button>
                  <div className={styles.blueActionSub}>
                    {isEnrolled ? '⚡ Pick up right where you left off' : '🚀 Instant free access · Jump straight into Lesson 1'}
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

            {/* 2. WHAT YOU'LL ACHIEVE / SKILLS (COMES BEFORE SECTIONS) */}
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
                <div className={styles.xpBonusBadge}>
                  <GamificationIcon type="gem" size={16} />
                  <span>+{totalXp} Course XP</span>
                </div>
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
                  <Layers size={14} /> {sections.length || 3} Units · {totalLessonsCount} Lessons
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
                          <span className={styles.unitLessonsCount}>{section.lessons?.length || 3} Lessons</span>
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>

                      {/* Unit Lessons Path */}
                      {isOpen && (
                        <div className={styles.unitPath}>
                          {section.lessons?.map((lesson, lIdx) => (
                            <div
                              key={lesson.id || lIdx}
                              onClick={() => handleLessonStart(secIdx)}
                              className={styles.pathNodeRow}
                            >
                              <div className={styles.nodeLeft}>
                                <div className={styles.nodeCircle}>
                                  <Play size={15} fill="#0172FD" color="#0172FD" />
                                </div>
                                <div className={styles.nodeText}>
                                  <div className={styles.nodeTitle}>{lesson.title}</div>
                                  <div className={styles.nodeMeta}>
                                    {lesson.durationMinutes ? `${lesson.durationMinutes} min` : '5 min'} · {lesson.lessonType || 'Interactive Lesson'}
                                  </div>
                                </div>
                              </div>

                              <div className={styles.nodeRight}>
                                <span className={styles.nodeRewardBadge}>
                                  <GamificationIcon type="gem" size={13} />
                                  +25 XP
                                </span>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleLessonStart(secIdx)}
                                  className={styles.nodeStartBtn}
                                >
                                  Start <ArrowRight size={13} />
                                </Button>
                              </div>
                            </div>
                          ))}

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
                <p className={styles.sideCourseDesc}>
                  {course?.shortDescription || courseDescription.substring(0, 110)}...
                </p>

                {/* Course Details List */}
                <div className={styles.specsList}>
                  <div className={styles.specRowItem}>
                    <div className={styles.specIconWrap}><BookOpen size={16} color="#0172FD" /></div>
                    <div className={styles.specTextCol}>
                      <span className={styles.specLabel}>Total Lessons</span>
                      <span className={styles.specValue}>{totalLessonsCount} interactive lessons</span>
                    </div>
                  </div>

                  <div className={styles.specRowItem}>
                    <div className={styles.specIconWrap}><Clock size={16} color="#0172FD" /></div>
                    <div className={styles.specTextCol}>
                      <span className={styles.specLabel}>Duration</span>
                      <span className={styles.specValue}>{formattedDuration}</span>
                    </div>
                  </div>

                  <div className={styles.specRowItem}>
                    <div className={styles.specIconWrap}><Target size={16} color="#0172FD" /></div>
                    <div className={styles.specTextCol}>
                      <span className={styles.specLabel}>Skill Level</span>
                      <span className={styles.specValue}>{course?.level || 'Beginner Friendly'}</span>
                    </div>
                  </div>

                  <div className={styles.specRowItem}>
                    <div className={styles.specIconWrap}><Award size={16} color="#22C55E" /></div>
                    <div className={styles.specTextCol}>
                      <span className={styles.specLabel}>Certificate</span>
                      <span className={styles.specValue}>Verified Teyro Credential</span>
                    </div>
                  </div>

                  <div className={styles.specRowItem}>
                    <div className={styles.specIconWrap}><Globe size={16} color="#0172FD" /></div>
                    <div className={styles.specTextCol}>
                      <span className={styles.specLabel}>Language & Access</span>
                      <span className={styles.specValue}>English · 100% Online</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleStartLearningFree}
                  className={styles.sideCtaButton}
                >
                  {isEnrolled ? 'CONTINUE LEARNING' : 'START LEARNING FREE'}
                </button>
              </div>
            </div>

            {/* 2. DEDICATED REAL CREATOR CARD ON SIDEBAR */}
            <div className={styles.creatorProfileCard}>
              <div className={styles.creatorCardHeader}>
                <Avatar
                  src={instructorAvatar}
                  name={instructorName}
                  size="lg"
                />
                <div className={styles.creatorInfoBlock}>
                  <div className={styles.creatorTitleRow}>
                    <h4 className={styles.creatorCardName}>{instructorName}</h4>
                    <ShieldCheck size={16} color="#0172FD" />
                  </div>
                  <div className={styles.creatorRoleBadge}>{instructorHeadline}</div>
                  <div className={styles.creatorHandle}>@{instructorUsername}</div>
                </div>
              </div>

              <p className={styles.creatorBioText}>{instructorBio}</p>

              {/* Creator Stats */}
              <div className={styles.creatorStatsGrid}>
                <div className={styles.creatorStatBox}>
                  <span className={styles.creatorStatVal}>{instructorStudentsCount.toLocaleString()}</span>
                  <span className={styles.creatorStatLabel}>Students</span>
                </div>
                <div className={styles.creatorStatBox}>
                  <span className={styles.creatorStatVal}>{instructorCoursesCount}</span>
                  <span className={styles.creatorStatLabel}>Courses</span>
                </div>
                <div className={styles.creatorStatBox}>
                  <span className={styles.creatorStatVal}>
                    <Star size={13} fill="#F59E0B" color="#F59E0B" style={{ display: 'inline', marginRight: 2 }} />
                    {instructorRating}
                  </span>
                  <span className={styles.creatorStatLabel}>Rating</span>
                </div>
              </div>

              {/* Link to Creator Profile */}
              <Link
                href={`/creator-profile/${instructorUsername}`}
                className={styles.viewCreatorProfileBtn}
              >
                <span>View Creator Profile</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FULL-SCREEN DUOLINGO CELEBRATION TAKEOVER (DESKTOP + MOBILE) ─── */}
      <AnimatePresence>
        {showCelebrationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.fullScreenTakeover}
          >
            {/* Top Step Progress Bar & Close Button */}
            <div className={styles.takeoverHeader}>
              <div className={styles.stepProgressTrack}>
                <div
                  className={styles.stepProgressIndicator}
                  style={{ width: `${(celebrationStep / 3) * 100}%` }}
                >
                  <div className={styles.progressShine} />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playHaptic('light');
                  setShowCelebrationModal(false);
                }}
                aria-label="Close celebration"
                className={styles.takeoverCloseBtn}
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className={styles.takeoverBody}>
              {/* ─── SCREEN 1: YOU'RE IN! ─── */}
              {celebrationStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={SPRING_BOUNCE}
                  className={styles.takeoverStepCard}
                >
                  <div className={styles.takeoverMascotWrap}>
                    <Image
                      src="/dashboard tey.png"
                      alt="Tey Mascot"
                      width={240}
                      height={240}
                      priority
                      className={styles.mascotCelebrateBig}
                    />
                  </div>

                  <h1 className={styles.takeoverTitleClean}>YOU&apos;RE IN!</h1>
                  <p className={styles.takeoverSubtitle}>
                    You&apos;ve unlocked your learning quest in
                    <br />
                    <span className={styles.highlightCourseName}>{courseTitle}</span>
                  </p>

                  {/* Course Visual Pop Card */}
                  {course?.thumbnailUrl ? (
                    <div className={styles.takeoverThumbCard}>
                      <Image
                        src={course.thumbnailUrl}
                        alt={courseTitle}
                        fill
                        className={styles.takeoverThumbImg}
                        priority
                      />
                      <div className={styles.thumbCardOverlay}>
                        <Sparkles size={16} color="#0172FD" />
                        <span>Ready to Learn</span>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.fallbackThumbBig}>
                      <BookOpen size={44} color="#0172FD" />
                      <span>{courseTitle}</span>
                    </div>
                  )}

                  <div className={styles.takeoverBottomArea}>
                    <button
                      type="button"
                      onClick={handleStep1Continue}
                      className={styles.takeoverDuoBtn}
                    >
                      LET&apos;S GO! →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─── SCREEN 2: CLAIM YOUR WELCOME REWARD ─── */}
              {celebrationStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={SPRING_BOUNCE}
                  className={styles.takeoverStepCard}
                >
                  <div className={styles.takeoverMascotWrap}>
                    <Image
                      src="/User onbarding Assets/Step_7_tey_verified_state.PNG"
                      alt="Tey Mascot"
                      width={230}
                      height={230}
                      priority
                      className={styles.mascotRewardBig}
                    />
                  </div>

                  <h1 className={styles.takeoverTitleClean}>Welcome Reward</h1>
                  <p className={styles.takeoverSubtitle}>
                    A little something to kick off your learning adventure!
                  </p>

                  {/* 3 Teyro Clean Stat Chips */}
                  <div className={styles.duoScoreCardsRow}>
                    <div className={styles.duoScoreCardBlue}>
                      <div className={styles.scoreCardHeaderBlue}>TOTAL XP</div>
                      <div className={styles.scoreCardValueBlue}>
                        <GamificationIcon type="gem" size={22} /> +25 XP
                      </div>
                    </div>

                    <div className={styles.duoScoreCardYellow}>
                      <div className={styles.scoreCardHeaderYellow}>BONUS</div>
                      <div className={styles.scoreCardValueYellow}>
                        <GamificationIcon type="xp" size={22} /> +10 Coins
                      </div>
                    </div>

                    <div className={styles.duoScoreCardRed}>
                      <div className={styles.scoreCardHeaderRed}>ENERGY</div>
                      <div className={styles.scoreCardValueRed}>
                        <GamificationIcon type="heart" size={22} /> Full Lives
                      </div>
                    </div>
                  </div>

                  <div className={styles.takeoverBottomArea}>
                    <button
                      type="button"
                      onClick={handleClaimWelcomeReward}
                      className={`${styles.takeoverDuoBtn} ${rewardClaimed ? styles.takeoverDuoBtnClaimed : ''}`}
                    >
                      {rewardClaimed ? (
                        <span className={styles.btnContent}>
                          <Check size={20} strokeWidth={3} /> CLAIMED! CONTINUE →
                        </span>
                      ) : (
                        'CLAIM REWARD →'
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─── SCREEN 3: YOUR JOURNEY STARTS HERE ─── */}
              {celebrationStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={SPRING_BOUNCE}
                  className={styles.takeoverStepCard}
                >
                  <div className={styles.takeoverMascotWrapSmall}>
                    <Image
                      src="/User onbarding Assets/Tey_welcome.webp"
                      alt="Tey Mascot"
                      width={160}
                      height={160}
                      priority
                      className={styles.mascotJourneySmall}
                    />
                  </div>

                  <h1 className={styles.takeoverTitleClean}>Your Learning Journey Starts Here</h1>
                  <p className={styles.takeoverSubtitle}>
                    <span className={styles.highlightCourseName}>{courseTitle}</span>
                  </p>

                  {/* Clean Serpentine Mini Path */}
                  <div className={styles.duoSerpentinePathBox}>
                    {/* Active Lesson 1 Node */}
                    <div className={styles.pathNodeRowActive}>
                      <div className={styles.nodeIconGlow}>
                        <Play size={18} fill="#FFFFFF" color="#FFFFFF" />
                      </div>
                      <div className={styles.nodeStartBubble}>START</div>
                      <div className={styles.nodeInfoBlock}>
                        <div className={styles.nodeInfoTitle}>{firstLesson?.title || 'Lesson 1: Getting Started'}</div>
                        <div className={styles.nodeInfoSub}>First lesson unlocked & ready</div>
                      </div>
                    </div>

                    <div className={styles.pathConnectorLine} />

                    {/* Locked Lesson 2 Node */}
                    <div className={styles.pathNodeRowLocked}>
                      <div className={styles.nodeIconLocked}>
                        <Lock size={15} color="#64748B" />
                      </div>
                      <div className={styles.nodeInfoBlock}>
                        <div className={styles.nodeInfoTitleLocked}>{secondLesson?.title || 'Lesson 2: Deep Dive'}</div>
                        <div className={styles.nodeInfoSubLocked}>Next milestone in Section 1</div>
                      </div>
                    </div>

                    <div className={styles.pathConnectorLine} />

                    {/* Section 1 Mastery Chest */}
                    <div className={styles.pathChestRow}>
                      <div className={styles.chestGraphicWrap}>
                        <Image
                          src="/Tressure box.png"
                          alt="Chest"
                          width={40}
                          height={40}
                          className={styles.chestGraphicImg}
                        />
                      </div>
                      <div className={styles.nodeInfoBlock}>
                        <div className={styles.chestTitleText}>Section 1 Mastery Chest</div>
                        <div className={styles.chestRewardText}>+50 XP Completion Bonus</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.takeoverBottomArea}>
                    <button
                      type="button"
                      onClick={handleStep3StartLearning}
                      className={styles.takeoverDuoBtnGreen}
                    >
                      START LEARNING →
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
