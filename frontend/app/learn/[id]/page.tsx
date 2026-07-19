'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Lock, CheckCircle2, Layers, BarChart2, LayoutGrid, Info, Star, Users, Clock, Check } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import DashboardLayout, { useComingSoon } from '@/app/dashboard/layout';
import { RightSidebar } from '@/components/layout/RightSidebar';
import Skeleton from '@/components/ui/Skeleton';
import { StatPill } from '@/components/ui/StatPill';
import styles from './LearnCourse.module.css';

/* ─── Spring constants ───────────────────────────────────────────── */
const SPRING_BOUNCE = { type: 'spring', stiffness: 400, damping: 22 } as const;
const SPRING_GENTLE = { type: 'spring', stiffness: 280, damping: 28 } as const;

/* ─── Page-entry variants ─────────────────────────────────────────── */
const pageVariants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { ...SPRING_GENTLE, staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: SPRING_BOUNCE },
};

/* ─── Staggered section card variants ────────────────────────────── */
const sectionVariants = {
  hidden: { opacity: 0, x: -24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, x: 0, scale: 1,
    transition: { ...SPRING_BOUNCE, delay: i * 0.07 },
  }),
};

/* ─── Duolingo-style floating popover variants ───────────────────── */
const popoverVariants = {
  hidden: { opacity: 0, scale: 0.85, y: -10 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { ...SPRING_BOUNCE, staggerChildren: 0.06, delayChildren: 0.04 },
  },
  exit: { opacity: 0, scale: 0.92, y: -6, transition: { duration: 0.14, ease: 'easeIn' as const } },
};

const popoverSectionVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SPRING_BOUNCE },
};

const popoverItemVariants = {
  hidden: { opacity: 0, x: -8, scale: 0.85 },
  visible: { opacity: 1, x: 0, scale: 1, transition: SPRING_BOUNCE },
};

interface LearnCourseContentProps {
  course: any;
  completedLessons: string[];
  streakDays: number;
  xpPoints: number;
  livesCount: number;
}

function LearnCourseContent({ course, completedLessons, streakDays, xpPoints, livesCount }: LearnCourseContentProps) {
  const params = useParams();
  const router = useRouter();
  const { triggerComingSoon } = useComingSoon();
  const [showDetails, setShowDetails] = useState(false);
  const sections = course.sections || course.curriculum || [];
  const totalLessons = sections.reduce((acc: number, s: any) => acc + (s.lessons?.length || 0), 0);
  const completedLessonCount = sections.reduce((acc: number, s: any) => {
    const secLessons = s.lessons || [];
    return acc + secLessons.filter((l: any) => completedLessons.includes(l.id || String(l.index))).length;
  }, 0);
  const courseProgress = totalLessons > 0 ? Math.round((completedLessonCount / totalLessons) * 100) : 0;
  const courseIsComplete = courseProgress === 100;

  const activeSectionIndex = sections.findIndex((sec: any) => {
    const secLessons = sec.lessons || [];
    const done = secLessons.filter((l: any) => completedLessons.includes(l.id || String(l.index))).length;
    return secLessons.length > 0 && done < secLessons.length;
  });
  const currentActiveIndex = activeSectionIndex === -1 ? sections.length - 1 : activeSectionIndex;

  // Count completed sections for road line
  const totalCompletedSecs = sections.filter((sec: any) => {
    const secLessons = sec.lessons || [];
    if (secLessons.length === 0) return false;
    return secLessons.every((l: any) => completedLessons.includes(l.id || String(l.index)));
  }).length;

  const handleStartOrContinue = (sIdx?: number) => {
    playHaptic('medium');
    const targetIndex = sIdx !== undefined ? sIdx : currentActiveIndex;
    router.push(`/learn/${params.id}/section/${targetIndex}`);
  };

  const handleJumpToSection = (sIdx: number, isLocked: boolean) => {
    playHaptic('medium');
    if (isLocked) {
      triggerComingSoon('Unlock this section by earning more XP!');
    } else {
      router.push(`/learn/${params.id}/section/${sIdx}`);
    }
  };

  return (
    <motion.div
      className={styles.container}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── TOP HEADER ROW ────────────────────────────────── */}
      <motion.div className={styles.topHeaderRow} variants={itemVariants}>
        <Link href="/dashboard/my-learning" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to My Learning</span>
        </Link>

        <div className={styles.statsRow}>
          <StatPill type="streak" value={streakDays} />
          <StatPill type="gem" value={xpPoints} />
          <StatPill type="lives" value={livesCount} />
        </div>
      </motion.div>

      {/* ── TWO-COLUMN GRID ───────────────────────────────── */}
      <div className={styles.dashboardGrid}>

        {/* LEFT COLUMN: course card + sections */}
        <div className={styles.middleColumn}>

          {/* ── COURSE INFO CARD ───────────────────────── */}
          <motion.div
            className={styles.courseHeaderCard}
            variants={itemVariants}
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
          >
            <div className={styles.mainCardArea}>
              {/* Thumbnail – 16:9 aspect on left */}
              <div className={styles.cardImageWrap}>
                {course.thumbnailUrl ? (
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    sizes="220px"
                    className={styles.thumbnailImage}
                    priority
                  />
                ) : (
                  <div className={styles.thumbnailFallback}>
                    <BookOpen size={40} color="white" />
                  </div>
                )}
              </div>

              {/* Text area */}
              <div className={styles.cardTextPart}>
                <span className={styles.categoryBadge}>{course.category || 'Course'}</span>
                <h2 className={styles.courseTitle}>{course.title}</h2>
                <p className={styles.courseDesc}>
                  {course.shortDescription || course.description?.substring(0, 120) || 'Master the essential skills step-by-step.'}
                </p>

                <div className={styles.metaRow}>
                  <div className={styles.metaItem}>
                    <Layers size={14} strokeWidth={2.5} className={styles.metaIcon} />
                    <span>{sections.length} Sections</span>
                  </div>
                  <div className={styles.metaItem}>
                    <BookOpen size={14} strokeWidth={2.5} className={styles.metaIcon} />
                    <span>{totalLessons} Lessons</span>
                  </div>
                  <div className={styles.metaItem}>
                    <BarChart2 size={14} strokeWidth={2.5} className={styles.metaIcon} />
                    <span>{course.level || 'Beginner'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Duolingo-style info trigger, top-right corner of the card */}
            <button
              type="button"
              className={styles.detailsTrigger}
              onFocus={() => setShowDetails(true)}
              onBlur={() => setShowDetails(false)}
              aria-expanded={showDetails}
            >
              <Info size={13} strokeWidth={2.5} />
              <span>Full Details</span>
            </button>

            {/* Floating popover — reveals every bit of course info, Duolingo-style */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  className={styles.detailsPopover}
                  variants={popoverVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className={styles.popoverArrow} />

                  {/* Quick stats strip */}
                  <motion.div className={styles.popoverStatsRow} variants={popoverSectionVariants}>
                    <div className={styles.popoverStatChip}>
                      <Star size={13} strokeWidth={2.5} fill="#F59E0B" color="#F59E0B" />
                      <span>{course.rating || 4.9}</span>
                      <span className={styles.popoverStatSub}>({(course.reviewsCount || 0).toLocaleString()})</span>
                    </div>
                    <div className={styles.popoverStatChip}>
                      <Users size={13} strokeWidth={2.5} />
                      <span>{(course.studentsCount || 0).toLocaleString()}</span>
                    </div>
                    <div className={styles.popoverStatChip}>
                      <Clock size={13} strokeWidth={2.5} />
                      <span>{course.duration || `${totalLessons * 6}m`}</span>
                    </div>
                    <div className={styles.popoverStatChip}>
                      <BarChart2 size={13} strokeWidth={2.5} />
                      <span>{course.level || 'Beginner'}</span>
                    </div>
                  </motion.div>

                  {/* What you'll learn — full list */}
                  <motion.div variants={popoverSectionVariants}>
                    <h4 className={styles.popoverSectionTitle}>What you&apos;ll learn</h4>
                    <motion.ul className={styles.popoverList} variants={popoverVariants}>
                      {(course.whatYouWillLearn && Array.isArray(course.whatYouWillLearn) && course.whatYouWillLearn.length > 0
                        ? course.whatYouWillLearn
                        : (course.outcomes && Array.isArray(course.outcomes) ? course.outcomes : [
                          'Foundations & core principles',
                          'Real-world application & project execution',
                          'Advanced methodologies and best practices',
                        ])
                      ).map((item: string, idx: number) => (
                        <motion.li key={idx} className={styles.popoverListItem} variants={popoverItemVariants}>
                          <span className={styles.popoverCheckDot}>
                            <Check size={10} strokeWidth={3.5} />
                          </span>
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>

                  {/* Requirements — full list */}
                  <motion.div variants={popoverSectionVariants}>
                    <h4 className={styles.popoverSectionTitle}>Requirements</h4>
                    <motion.ul className={styles.popoverList} variants={popoverVariants}>
                      {(course.requirements && Array.isArray(course.requirements) && course.requirements.length > 0
                        ? course.requirements
                        : [
                          'Basic understanding of the subject',
                          'A laptop and active internet connection',
                        ]
                      ).map((item: string, idx: number) => (
                        <motion.li key={idx} className={styles.popoverListItem} variants={popoverItemVariants}>
                          <span className={styles.popoverDot} />
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>

                  {/* Instructor */}
                  {course.instructor?.fullName && (
                    <motion.div className={styles.popoverInstructor} variants={popoverSectionVariants}>
                      {course.instructor?.avatarUrl ? (
                        <div className={styles.popoverInstructorAvatar}>
                          <Image
                            src={course.instructor.avatarUrl}
                            alt={course.instructor.fullName}
                            fill
                            sizes="32px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ) : (
                        <div className={styles.popoverInstructorAvatarFallback}>
                          {course.instructor.fullName.charAt(0)}
                        </div>
                      )}
                      <span>Created by <strong>{course.instructor.fullName}</strong></span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── COURSE PROGRESS CARD (fun, addictive, playful) ── */}
          {completedLessons.length > 0 && (
            <motion.div
              className={styles.courseProgressCard}
              variants={itemVariants}
              initial="hidden"
              whileInView={{ scale: [0.96, 1.02, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className={styles.cpTopRow}>
                <div className={styles.cpTitleWrap}>
                  <span className={styles.cpKicker}>YOUR COURSE PROGRESS</span>
                  <h3 className={styles.cpHeadline}>
                    {courseIsComplete
                      ? "🏆 You've mastered this course!"
                      : `You're ${courseProgress}% of the way there!`}
                  </h3>
                </div>
                <div className={styles.cpBadge}>
                  <span className={styles.cpPct}>{courseProgress}%</span>
                  <span className={styles.cpPctLabel}>MASTERED</span>
                </div>
              </div>

              <div className={styles.cpTrack}>
                <motion.div
                  className={`${styles.cpFill} ${courseIsComplete ? styles.cpFillDone : ''}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${courseProgress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <span className={styles.cpShine} />
                </motion.div>
              </div>

              <div className={styles.cpFooter}>
                <span className={styles.cpStat}>
                  <strong>{completedLessonCount}</strong> / {totalLessons} lessons done
                </span>
                <span className={styles.cpStat}>
                  <strong>{totalLessons - completedLessonCount}</strong> to go 🔥
                </span>
              </div>
            </motion.div>
          )}

          {/* ── NOT STARTED BANNER ─────────────────────── */}
          <AnimatePresence>
            {completedLessons.length === 0 && (
              <motion.div
                className={styles.welcomeBanner}
                initial={{ opacity: 0, y: -16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: SPRING_BOUNCE }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className={styles.welcomeMascotWrap}>
                  <Image
                    src="/User onbarding Assets/Step_7_tey_verified_state.PNG"
                    alt="Tey Mascot"
                    width={72}
                    height={72}
                    className={styles.mascotImg}
                    priority
                  />
                </div>
                <div className={styles.welcomeText}>
                  <h4 className={styles.welcomeTitle}>Ready to begin your journey? 🚀</h4>
                  <p className={styles.welcomeDesc}>
                    You haven&apos;t started any lessons yet! Click <strong>Start Learning</strong> on Section 1 below to begin your personalised learning path with Tey.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── SECTIONS TIMELINE ──────────────────────── */}
          <div className={styles.timelineContainer}>
            {/* Vertical road line */}
            <div className={styles.roadLine}>
              <div
                className={styles.roadLineFill}
                style={{ height: `${sections.length > 1 ? (totalCompletedSecs / (sections.length - 1)) * 100 : 0}%` }}
              />
            </div>

            {sections.map((section: any, sIdx: number) => {
              const secLessons = section.lessons || [];
              const completedInSec = secLessons.filter((l: any) =>
                completedLessons.includes(l.id || String(l.index))
              ).length;
              const sectionProgress = secLessons.length > 0
                ? Math.round((completedInSec / secLessons.length) * 100)
                : 0;

              const isCompleted = sectionProgress === 100;
              const isActive = sIdx === currentActiveIndex;
              const isLocked = sIdx > currentActiveIndex;

              return (
                <motion.div
                  key={section.id || sIdx}
                  className={styles.timelineRow}
                  variants={sectionVariants}
                  custom={sIdx}
                >
                  {/* Road node */}
                  <motion.div
                    className={`${styles.timelineNode} ${isCompleted ? styles.nodeCompleted : isActive ? styles.nodeActive : isLocked ? styles.nodeLocked : styles.nodeDefault}`}
                    whileHover={!isLocked ? { scale: 1.12 } : {}}
                    whileTap={!isLocked ? { scale: 0.9 } : {}}
                    animate={isActive ? { scale: [1, 1.06, 1], transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' } } : {}}
                  >
                    {isCompleted
                      ? <CheckCircle2 size={20} strokeWidth={2.5} />
                      : isLocked
                        ? <Lock size={15} strokeWidth={2.5} />
                        : <span>{sIdx + 1}</span>
                    }
                  </motion.div>

                  {/* Section card */}
                  <motion.div
                    className={`${styles.sectionCard} ${isActive ? styles.sectionCardActive : ''} ${isCompleted ? styles.sectionCardCompleted : ''} ${isLocked ? styles.sectionCardLocked : ''}`}
                    whileHover={!isLocked ? { y: -2, boxShadow: '0 8px 24px rgba(7,18,51,0.07)' } : {}}
                    transition={SPRING_GENTLE}
                  >
                    <div className={styles.sectionLeft}>
                      <div className={styles.sectionMeta}>
                        <span className={styles.sectionLabel}>Section {sIdx + 1}</span>
                        <span className={styles.sectionLessonsCount}>
                          {isLocked
                            ? <Lock size={12} />
                            : <BookOpen size={12} />
                          }
                          {secLessons.length} Lessons
                        </span>
                      </div>

                      <h3 className={styles.sectionTitle}>{section.title}</h3>
                      <p className={styles.sectionDesc}>
                        {section.goal || `Discover and apply core concepts through ${secLessons.length} structured lessons.`}
                      </p>

                      {/* Progress or unlock condition */}
                      {isLocked ? (
                        <div className={styles.unlockBadge}>
                          <Lock size={11} />
                          <span>{sIdx * 150} XP to unlock</span>
                        </div>
                      ) : (
                        <div className={styles.progressArea}>
                          <div className={styles.progressTrack}>
                            <div
                              className={`${styles.progressFill} ${isCompleted ? styles.progressFillGreen : ''}`}
                              style={{ width: `${sectionProgress}%` }}
                            />
                          </div>
                          <span className={`${styles.progressLabel} ${isCompleted ? styles.progressLabelGreen : styles.progressLabelBlue}`}>
                            {sectionProgress}% COMPLETE
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right: mascot on active, button always */}
                    <div className={styles.sectionRight}>
                      {isActive && (
                        <motion.div
                          className={styles.mascotWrap}
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ ...SPRING_BOUNCE, delay: 0.2 }}
                        >
                          <Image
                            src="/User onbarding Assets/Step_7_tey_verified_state.PNG"
                            alt="Tey"
                            width={84}
                            height={84}
                            className={styles.mascotImg}
                            priority
                          />
                        </motion.div>
                      )}

                      <motion.button
                        className={`${styles.actionBtn} ${
                          isCompleted ? styles.btnOutline
                            : isLocked ? styles.btnGhost
                              : styles.btnPrimary
                        }`}
                        onClick={() => isLocked ? handleJumpToSection(sIdx, true) : handleStartOrContinue(sIdx)}
                        whileHover={!isLocked ? { scale: 1.05 } : {}}
                        whileTap={!isLocked ? { scale: 0.93, y: 3 } : {}}
                        transition={SPRING_BOUNCE}
                      >
                        {isCompleted
                          ? 'Review'
                          : isLocked
                            ? 'Jump to Section'
                            : completedLessons.length === 0 && sIdx === 0
                              ? 'Start Learning'
                              : 'Continue'
                        }
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: sticky sidebar */}
        <div className={styles.rightColumn}>
          <RightSidebar course={course} completedLessons={completedLessons} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */

export default function LearnCoursePage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [streakDays, setStreakDays] = useState(0);
  const [xpPoints, setXpPoints] = useState(0);
  const [livesCount] = useState(5);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`/api/courses/${params.id}`, { headers: { 'Cache-Control': 'no-cache' } });
        if (!res.ok) throw new Error('Course not found');
        const data = await res.json();
        setCourse(data);

        const progRes = await fetch(`/api/courses/${params.id}/progress`, {
          credentials: 'include',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (progRes.ok) {
          const pd = await progRes.json();
          setCompletedLessons(pd.completedLessons || []);
        }

        const profileRes = await fetch('/api/auth/me', { credentials: 'include' });
        if (profileRes.ok) {
          const pf = await profileRes.json();
          if (pf?.studentProfile) {
            setStreakDays(pf.studentProfile.streakDays || 0);
            setXpPoints(pf.studentProfile.xp || 0);
          }
        }
      } catch (e) {
        console.error('Failed to load course:', e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [params.id]);

  /* ── Loading skeleton ─────────────────────────────── */
  if (loading) {
    return (
      <div className={styles.skeletonShell}>
        <div className={styles.skeletonMain}>
          <Skeleton height={48} style={{ background: '#E2E8F0', borderRadius: 12 }} />
          <Skeleton height={180} style={{ background: '#E2E8F0', borderRadius: 20 }} />
          <Skeleton height={120} style={{ background: '#E2E8F0', borderRadius: 20 }} />
          <Skeleton height={120} style={{ background: '#E2E8F0', borderRadius: 20 }} />
        </div>
        <div className={styles.skeletonSide}>
          <Skeleton height={260} style={{ background: '#E2E8F0', borderRadius: 20 }} />
          <Skeleton height={160} style={{ background: '#E2E8F0', borderRadius: 20 }} />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={styles.errorShell}>
        <h2>Course Not Found</h2>
        <button onClick={() => router.push('/dashboard/my-learning')} className={styles.errorBtn}>
          Back to My Learning
        </button>
      </div>
    );
  }



  return (
    <DashboardLayout>
      <LearnCourseContent
        course={course}
        completedLessons={completedLessons}
        streakDays={streakDays}
        xpPoints={xpPoints}
        livesCount={livesCount}
      />
    </DashboardLayout>
  );
}
