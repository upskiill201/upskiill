'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BookOpen,
  Clock,
  ChevronDown,
  ChevronUp,
  Lock,
  Globe,
  Award,
  HelpCircle,
  Sparkles,
  Layers,
  CheckCircle2,
  GraduationCap,
  MessageSquare,
  Trophy,
  Play,
  FileText,
  ShieldCheck,
  Users
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import styles from './CourseDetail.module.css';

interface Lesson {
  id?: string;
  title: string;
  durationMinutes?: number;
  duration?: string;
  lessonType?: 'video' | 'text' | 'quiz' | string;
  type?: string;
  isFreePreview?: boolean;
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

  const [course, setCourse] = useState<any>(null);
  const [sections, setSections] = useState<CurriculumSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [openSectionIds, setOpenSectionIds] = useState<string[]>([]);

  // Preview Video Modal State
  const [activePreviewLesson, setActivePreviewLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (isPreviewMode) {
          // ─── CREATOR PREVIEW MODE: Load Draft Course & Curriculum ───
          const draftRes = await fetch(`/api/courses/${idOrSlug}/draft`, {
            credentials: 'include',
          });
          if (draftRes.ok) {
            const draftData = await draftRes.json();
            setCourse(draftData);
          }

          const curRes = await fetch(`/api/courses/${idOrSlug}/curriculum`, {
            credentials: 'include',
          });
          if (curRes.ok) {
            const curData = await curRes.json();
            if (Array.isArray(curData)) {
              setSections(curData);
              if (curData.length > 0) {
                setOpenSectionIds([curData[0].id || '0']);
              }
            }
          }
        } else {
          // ─── PUBLIC STUDENT MODE: Load Published Course Data ───
          const courseRes = await fetch(`/api/courses/${idOrSlug}`);
          if (courseRes.ok) {
            const data = await courseRes.json();
            setCourse(data);

            if (Array.isArray(data.sections)) {
              setSections(data.sections);
              if (data.sections.length > 0) {
                setOpenSectionIds([data.sections[0].id || '0']);
              }
            }

            // Check student authentication & enrollment status
            const meRes = await fetch('/api/auth/me', { credentials: 'include' });
            if (meRes.ok) {
              const enrollmentsRes = await fetch('/api/auth/me/enrollments', {
                credentials: 'include',
              });
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
        console.error('Failed to fetch course detail:', err);
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

  // ─── DYNAMIC GAMIFICATION & METADATA CALCULATIONS ───
  const allLessons = sections.flatMap((s) => s.lessons || []);
  const totalLessonsCount = allLessons.length;
  
  const totalMinutes = allLessons.reduce(
    (acc, l) => acc + (l.durationMinutes || 0),
    0
  );
  
  const formattedDuration =
    totalMinutes > 0
      ? `${Math.floor(totalMinutes / 60) > 0 ? `${Math.floor(totalMinutes / 60)}h ` : ''}${totalMinutes % 60}m`
      : course?.duration || 'Flexible Pacing';

  const totalXp = totalLessonsCount * 50;

  const learnersCount =
    course?._count?.enrollments ?? course?.studentsCount ?? 0;

  // Dynamic Course Badges generated from curriculum sections
  const dynamicBadges = [
    ...sections.map((sec, i) => ({
      id: sec.id || `mod-${i}`,
      label: `Ch. ${i + 1}`,
      title: sec.title,
      icon: i % 2 === 0 ? <Trophy size={18} /> : <Award size={18} />,
    })),
    {
      id: 'cert',
      label: 'Cert',
      title: 'Course Completion Certificate',
      icon: <GraduationCap size={18} />,
    },
  ];

  // ─── ENROLLMENT HANDLER ───
  const handleEnrollment = async () => {
    if (isPreviewMode) return;
    if (isEnrolled) {
      router.push('/dashboard/my-learning');
      return;
    }

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

      if (res.ok) {
        setIsEnrolled(true);
        router.push('/dashboard/my-learning');
      } else {
        alert('Could not complete enrollment. Please try again.');
      }
    } catch (err) {
      console.error('Enrollment error:', err);
      alert('Failed to enroll in course.');
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.spinner} />
        <p style={{ fontWeight: 600 }}>Loading course details...</p>
      </div>
    );
  }

  if (!course && !isPreviewMode) {
    return (
      <div className={styles.loadingWrap}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
          Course Not Found
        </h2>
        <p style={{ color: '#64748B' }}>
          The requested course could not be located or has been archived.
        </p>
        <Link href="/courses">
          <Button variant="primary">Browse All Courses</Button>
        </Link>
      </div>
    );
  }

  const courseTitle = course?.title || 'Untitled Course';
  const courseDescription =
    course?.description ||
    course?.shortDescription ||
    'Learn step-by-step with interactive lessons, practical projects, and instant feedback.';
  
  // Safe brand gradient fallback if no thumbnail URL
  const coverImage = course?.thumbnailUrl;
  const priceDisplay =
    course?.price === 0 || !course?.price ? 'FREE' : `$${course.price}`;
  
  const instructorName = course?.instructor?.fullName || 'Teyro Creator';
  const instructorAvatar = course?.instructor?.avatarUrl || undefined;
  const instructorBio =
    course?.instructor?.profile?.bio || 'Teyro Certified Instructor';

  const requirementsList = Array.isArray(course?.requirements)
    ? course.requirements.filter(Boolean)
    : course?.startingPoint
    ? [course.startingPoint]
    : [];

  return (
    <div className={styles.pageWrapper}>
      
      {/* ─── CREATOR PREVIEW NOTICE BANNER ─── */}
      {isPreviewMode && (
        <div className={styles.previewNoticeBanner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={styles.previewBadge}>CREATOR PREVIEW</span>
            <span>
              Live student perspective preview. Enrollment and checkout are disabled.
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.close()}
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
          >
            Close Preview
          </Button>
        </div>
      )}

      {/* ─── ZONE A: HERO HEADER ─── */}
      <section className={styles.hero}>
        {coverImage && (
          <img
            src={coverImage}
            alt={courseTitle}
            className={styles.heroBgImage}
          />
        )}
        <div className={styles.heroOverlay} />

        <div className={styles.heroContainer}>
          <div className={styles.badgeRow}>
            <span className={styles.levelBadge}>
              {course?.level || 'BEGINNER'}
            </span>
            <span className={styles.categoryBadge}>
              {course?.category || 'COURSE'}
            </span>
            {course?.language && (
              <span className={styles.categoryBadge}>{course.language}</span>
            )}
          </div>

          <h1 className={styles.heroTitle}>{courseTitle}</h1>

          <p className={styles.heroSub}>{courseDescription}</p>

          <div className={styles.heroCtaRow}>
            <button
              className={styles.primaryCtaBtn}
              onClick={handleEnrollment}
              disabled={isPreviewMode || isEnrolling}
            >
              {isPreviewMode
                ? 'Preview Mode (Enrollment Disabled)'
                : isEnrolled
                ? 'Continue Learning →'
                : course?.price === 0 || !course?.price
                ? 'Start Learning for Free →'
                : `Enroll for ${priceDisplay} →`}
            </button>
          </div>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <CheckCircle2 size={16} style={{ color: '#60A5FA' }} />
              <span>
                Prerequisites:{' '}
                <strong>
                  {requirementsList.length > 0 ? requirementsList[0] : 'None required'}
                </strong>
              </span>
            </div>

            <div className={styles.metaItem}>
              <Clock size={16} style={{ color: '#60A5FA' }} />
              <span>
                Time to complete: <strong>{formattedDuration}</strong>
              </span>
            </div>

            <div className={styles.metaItem}>
              <Users size={16} style={{ color: '#60A5FA' }} />
              <span>
                Enrolled:{' '}
                <strong>
                  {learnersCount > 0
                    ? `+${learnersCount.toLocaleString()} learners`
                    : 'Be the first to enroll'}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PAGE BODY GRID (ZONES B & C) ─── */}
      <div className={styles.salesBody}>
        
        {/* ─── ZONE B: MAIN CONTENT COLUMN (LEFT ~65%) ─── */}
        <div className={styles.mainCol}>
          <h2 className={styles.sectionHeaderTitle}>
            <BookOpen size={22} style={{ color: '#0172FD' }} /> Course Syllabus &amp; Curriculum
          </h2>

          {/* Numbered Modules Accordion List */}
          {sections.length === 0 ? (
            <div
              style={{
                padding: '36px',
                textAlign: 'center',
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px dashed #CBD5E1',
              }}
            >
              <Layers size={36} style={{ color: '#94A3B8', margin: '0 auto 12px' }} />
              <h4 style={{ margin: 0, fontWeight: 700, color: '#334155', fontSize: '15px' }}>
                Course Curriculum in Progress
              </h4>
              <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '13px' }}>
                This course curriculum is currently being built by the instructor.
              </p>
            </div>
          ) : (
            <div className={styles.modulesContainer}>
              {sections.map((section, idx) => {
                const secId = section.id || String(idx);
                const isOpen = openSectionIds.includes(secId);
                const moduleNum = idx + 1;

                return (
                  <div key={secId} className={styles.moduleCard}>
                    <div
                      className={styles.moduleHeader}
                      onClick={() => toggleSection(secId)}
                    >
                      <div className={styles.moduleHeaderLeft}>
                        <div className={styles.moduleNumCircle}>{moduleNum}</div>
                        <span className={styles.moduleTitleText}>
                          {section.title}
                        </span>
                      </div>

                      <div className={styles.moduleHeaderRight}>
                        <span className={styles.moduleMetaText}>
                          {section.lessons?.length || 0} lessons
                        </span>
                        {isOpen ? (
                          <ChevronUp size={18} color="#64748B" />
                        ) : (
                          <ChevronDown size={18} color="#64748B" />
                        )}
                      </div>
                    </div>

                    {isOpen && (
                      <div className={styles.lessonsList}>
                        {section.lessons && section.lessons.length > 0 ? (
                          section.lessons.map((lesson, lIdx) => {
                            const isUnlocked =
                              isEnrolled || (moduleNum === 1 && lIdx === 0) || lesson.isFreePreview;

                            const typeName = lesson.lessonType || lesson.type || 'video';

                            return (
                              <div
                                key={lesson.id || lIdx}
                                className={styles.lessonRow}
                              >
                                <div className={styles.lessonRowLeft}>
                                  {typeName === 'quiz' ? (
                                    <HelpCircle size={16} className={styles.lessonIcon} />
                                  ) : (
                                    <FileText size={16} className={styles.lessonIcon} />
                                  )}
                                  <span className={styles.lessonTitle}>
                                    {lesson.title}
                                  </span>
                                </div>

                                <div className={styles.lessonRowRight}>
                                  {lesson.durationMinutes ? (
                                    <span className={styles.lessonDuration}>
                                      {lesson.durationMinutes}m
                                    </span>
                                  ) : lesson.duration ? (
                                    <span className={styles.lessonDuration}>
                                      {lesson.duration}
                                    </span>
                                  ) : null}

                                  {isUnlocked ? (
                                    lesson.isFreePreview && !isEnrolled ? (
                                      <button
                                        type="button"
                                        className={styles.previewBtn}
                                        onClick={() => setActivePreviewLesson(lesson)}
                                      >
                                        Preview
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className={styles.startBtn}
                                        onClick={handleEnrollment}
                                      >
                                        Start
                                      </button>
                                    )
                                  ) : (
                                    <span className={styles.lockedBadge}>
                                      <Lock size={12} /> Locked
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div
                            style={{
                              padding: '16px',
                              fontSize: '13px',
                              color: '#94A3B8',
                              fontStyle: 'italic',
                            }}
                          >
                            No lessons in this module.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Community Prompt Card */}
          <div className={styles.communityPromptCard}>
            <div className={styles.promptLeft}>
              <div className={styles.promptMascotCircle}>
                <MessageSquare size={24} />
              </div>
              <div>
                <h4 className={styles.promptTextTitle}>
                  Want to learn more about {courseTitle}?
                </h4>
                <p className={styles.promptTextSub}>
                  Ask questions, connect with classmates, and get help in our community.
                </p>
              </div>
            </div>
            <Link href="/community" className={styles.askCommunityBtn}>
              Go to Community →
            </Link>
          </div>

          {/* Teyro Course Guarantee Card */}
          <div className={styles.logoCloudCard}>
            <p className={styles.logoCloudTitle}>
              Included with your Teyro enrollment
            </p>
            <div className={styles.logoGrid}>
              <span className={styles.logoItem}>Full Lifetime Access</span>
              <span className={styles.logoItem}>Mobile &amp; Desktop</span>
              <span className={styles.logoItem}>Certificate of Completion</span>
              <span className={styles.logoItem}>Gamified XP &amp; Badges</span>
            </div>
          </div>
        </div>

        {/* ─── ZONE C: RIGHT SIDEBAR (RIGHT ~35%) ─── */}
        <div className={styles.sideCol}>
          
          {/* Creator Profile Card */}
          <div className={styles.creatorCard}>
            <div className={styles.creatorHeader}>
              <Avatar
                src={instructorAvatar}
                name={instructorName}
                size="md"
              />
              <div>
                <h3 className={styles.creatorName}>{instructorName}</h3>
                <span className={styles.creatorRole}>{instructorBio}</span>
              </div>
            </div>
          </div>

          {/* Course Progress & XP Stats Preview Card */}
          <div className={styles.statsCard}>
            <h3 className={styles.cardTitle}>Course Stats &amp; Rewards</h3>

            <div className={styles.statRow}>
              <div className={styles.statLabelGroup}>
                <BookOpen size={16} style={{ color: '#0172FD' }} />
                <span>Exercises</span>
              </div>
              <span className={styles.statVal}>0 / {totalLessonsCount}</span>
            </div>

            <div className={styles.statRow}>
              <div className={styles.statLabelGroup}>
                <Layers size={16} style={{ color: '#10B981' }} />
                <span>Modules</span>
              </div>
              <span className={styles.statVal}>0 / {sections.length}</span>
            </div>

            <div className={styles.statRow}>
              <div className={styles.statLabelGroup}>
                <Image
                  src="/Icons/gem.png"
                  alt="XP Gem"
                  width={18}
                  height={18}
                  style={{ objectFit: 'contain' }}
                />
                <span>XP Earned</span>
              </div>
              <span className={styles.statVal}>0 / {totalXp} XP</span>
            </div>
          </div>

          {/* Badges & Achievements Card */}
          <div className={styles.badgesCard}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 className={styles.cardTitle} style={{ margin: 0 }}>
                Course Badges
              </h3>
              <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>
                0 / {dynamicBadges.length}
              </span>
            </div>

            <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 12px 0' }}>
              Complete modules to earn badges — collect &apos;em all!
            </p>

            <div className={styles.badgesGrid}>
              {dynamicBadges.slice(0, 4).map((badge) => (
                <div key={badge.id} className={styles.badgeItem} title={badge.title}>
                  {badge.icon}
                  <span className={styles.badgeLabelText}>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cheat Sheets Card */}
          <div className={styles.resourceCard}>
            <h4 className={styles.resourceTitle}>Cheat Sheets &amp; Guides</h4>
            <p className={styles.resourceSub}>
              Unlock printable cheat sheets and reference guides as you complete chapters.
            </p>
          </div>

          {/* Need Help Card */}
          <div className={styles.resourceCard} style={{ background: '#F8FAFC' }}>
            <h4 className={styles.resourceTitle}>Need Help?</h4>
            <p className={styles.resourceSub} style={{ marginBottom: '12px' }}>
              Ask questions in our community or reach out to tutors.
            </p>
            <Link
              href="/community"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#0172FD',
                textDecoration: 'none',
              }}
            >
              Go to Community →
            </Link>
          </div>
        </div>
      </div>

      {/* FREE PREVIEW LESSON MODAL */}
      {activePreviewLesson && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: '24px',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '640px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                padding: '16px 24px',
                background: '#0F172A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 700 }}>
                Free Preview: {activePreviewLesson.title}
              </span>
              <button
                type="button"
                onClick={() => setActivePreviewLesson(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  fontSize: '18px',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div
                style={{
                  aspectRatio: '16 / 9',
                  background: '#F1F5F9',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Play size={48} style={{ color: '#0172FD' }} />
              </div>
              <p style={{ fontSize: '14px', color: '#475569', marginBottom: '20px' }}>
                You are viewing a free preview of <strong>&ldquo;{activePreviewLesson.title}&rdquo;</strong>.
                Enroll to access all interactive lessons, quizzes, and earn your certificate!
              </p>
              <Button variant="primary" fullWidth onClick={handleEnrollment}>
                Enroll Now to Unlock All Lessons →
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
