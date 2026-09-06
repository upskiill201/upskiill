'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, BookOpen, X, MessagesSquare } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { useTeyroLoader } from '@/components/providers/TeyroLoaderProvider';
import styles from './MyLearning.module.css';

export default function MyLearningPage() {
  const router = useRouter();
  const { showLoader, showLoaderImmediate, hideLoader } = useTeyroLoader();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Trigger loader without overrideText so it polls the 36 motivational text pool!
    showLoader(undefined, false, undefined, true);

    let cancelled = false;
    const fetchEnrollments = async () => {
      try {
        const res = await fetch('/api/auth/me/enrollments', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setEnrollments(data);
        }
      } catch (err) {
        console.error('Failed to load enrolled courses', err);
      } finally {
        if (!cancelled) {
          setLoading(false);
          hideLoader(); // Only hide when backend data is loaded!
        }
      }
    };
    fetchEnrollments();
    return () => {
      cancelled = true;
    };
  }, [showLoader, hideLoader]);

  const handleContinueLearning = (courseId: string) => {
    playHaptic('medium');
    showLoaderImmediate(
      "Tey is preparing your course roadmap...",
      false, // Preserves desktop sidebar (replaces middle column + right sidebar)!
      undefined, // No artificial hold — loader clears as soon as the next page's data resolves
      true,  // Suppress connection check warning unless error
      'reading'
    );
    router.push(`/learn/${courseId}`);
  };

  const getMascotMotivationText = (slug: string) => {
    const s = slug.toLowerCase();
    if (s.includes('figma')) {
      return "Figma variants and auto-layout make designs 10x faster!";
    }
    if (s.includes('web-development') || s.includes('html')) {
      return "CSS variables and event listeners bring layout logic to life!";
    }
    if (s.includes('pitch-deck')) {
      return "A great startup pitch deck bridges functional logic and human emotion!";
    }
    if (s.includes('ai-product') || s.includes('llm')) {
      return "Integrating LLM services correctly multiplies product capabilities!";
    }
    if (s.includes('no-code')) {
      return "Building relational tables visually speeds up market validation!";
    }
    return "You are making excellent progress! Keep up the daily learning momentum!";
  };

  // Data-loading state is surfaced by the shared TeyroLoaderProvider overlay
  // (triggered above) — no second full-page loader here, it used to stack.

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>My Learning</h2>
        <p className={styles.pageSubtitle}>All your active learning paths and progress indicators.</p>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.middleColumn}>
          {enrollments.length > 0 ? (
            <div className={styles.journeysList}>
              {enrollments.map((enrollment, idx) => {
                const course = enrollment.course;
                const schemeClass = [styles.schemeBlue, styles.schemeGreen, styles.schemeOrange, styles.schemePurple][idx % 4];
                return (
                  <div key={enrollment.id} className={`${styles.focusCard} ${schemeClass}`}>
                    {/* Left Card Side */}
                    <div className={styles.focusCardLeft}>
                      <span className={styles.focusHeader}>{course.category} · {course.level}</span>
                      <h3 className={styles.focusCourseTitle}>{course.title}</h3>
                      <p className={styles.focusCourseDesc}>{course.shortDescription || course.subtitle}</p>
                      
                      {/* Progress Container */}
                      <div className={styles.progressContainer}>
                        <div className={styles.progressBarWrapper}>
                          <div className={styles.progressBarFill} style={{ width: `${enrollment.progress}%` }} />
                        </div>
                        <div className={styles.progressLabels}>
                          <span className={styles.progressPct}>{enrollment.progress}% COMPLETE</span>
                          <span className={styles.progressUnit}>
                            LESSON {Math.max(1, Math.round((enrollment.progress / 100) * (course.totalLessons || 0))) || 1}
                            {' '}/ {course.totalLessons || '—'}
                          </span>
                        </div>
                      </div>

                      {/* 3D Action Button */}
                      <button
                        onClick={() => handleContinueLearning(course.id)}
                        className={styles.button3dPrimary}
                      >
                        <span>Continue Learning</span>
                        <span className={styles.buttonIconCircle}>
                          <ArrowRight size={16} />
                        </span>
                      </button>

                      {/* Course community — per-course discussion space */}
                      <button
                        onClick={() => { playHaptic('light'); router.push(`/dashboard/community/${course.id}`); }}
                        className={styles.communityLinkBtn}
                      >
                        <MessagesSquare size={14} />
                        Course community
                      </button>
                    </div>

                    {/* Right Mascot Side */}
                    <div className={styles.focusCardRight}>
                      <div className={styles.mascotBubble}>
                        <span>{getMascotMotivationText(course.slug)}</span>
                        <div className={styles.mascotBubbleTail} />
                      </div>
                      <div className={styles.focusMascotImageWrapper}>
                        <Image 
                          src="/dashboard tey.webp" 
                          alt="Tey Mascot" 
                          width={150} 
                          height={150} 
                          priority
                          className={styles.focusMascotImage}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                <BookOpen size={28} />
              </div>
              <h3 className={styles.emptyStateTitle}>No Journeys Yet</h3>
              <p className={styles.emptyStateDesc}>You haven&apos;t enrolled in any learning paths. Visit the explorer to search for active courses.</p>
              <button 
                onClick={() => {
                  playHaptic('medium');
                  router.push('/dashboard');
                }}
                className={styles.button3dPrimary}
                style={{ marginTop: 8 }}
              >
                <span>Explore Courses</span>
                <span className={styles.buttonIconCircle}>
                  <ArrowRight size={16} />
                </span>
              </button>
            </div>
          )}
        </div>
        <div className={styles.rightColumn}>
          <RightSidebar />
        </div>
      </div>

      {/* ─── MOBILE GAMIFIED SIDEBAR FLOATING ACTION BUTTON ─── */}
      <button
        type="button"
        onClick={() => {
          playHaptic('medium');
          setMobileSidebarOpen(true);
        }}
        className={styles.mobileSidebarFab}
        aria-label="Open Gamified Quests & Sidebar"
      >
        <Image src="/Tressure box.webp" width={26} height={26} alt="Quests" priority />
        <span className={styles.mobileSidebarFabBadge}>Quest HUD</span>
      </button>

      {/* ─── MOBILE SIDEBAR DRAWER OVERLAY ─── */}
      <div className={`${styles.mobileSidebarDrawer} ${mobileSidebarOpen ? styles.mobileSidebarDrawerOpen : ''}`}>
        <div className={styles.mobileSidebarHeader}>
          <div className={styles.drawerTitleRow}>
            <Image src="/Tressure box.webp" width={24} height={24} alt="Quests" />
            <span className={styles.mobileSidebarTitle}>Rewards & Quests</span>
          </div>
          <button 
            type="button" 
            onClick={() => {
              playHaptic('light');
              setMobileSidebarOpen(false);
            }} 
            className={styles.mobileSidebarCloseBtn}
            aria-label="Close drawer"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
        <div className={styles.mobileSidebarBody}>
          <RightSidebar />
        </div>
      </div>

      {/* Backdrop for mobile sidebar */}
      {mobileSidebarOpen && (
        <div 
          className={styles.mobileSidebarBackdrop} 
          onClick={() => {
            playHaptic('light');
            setMobileSidebarOpen(false);
          }} 
        />
      )}
    </div>
  );
}
