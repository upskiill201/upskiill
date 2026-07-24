'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { useTeyroLoader } from '@/components/providers/TeyroLoaderProvider';
import TeyroBrandedLoader from '@/components/ui/TeyroBrandedLoader';
import styles from './MyLearning.module.css';

export default function MyLearningPage() {
  const router = useRouter();
  const { showLoader, showLoaderImmediate, hideLoader } = useTeyroLoader();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trigger loader without overrideText so it polls the 36 motivational text pool!
    showLoader(undefined, false, 800, true);

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
        setLoading(false);
        hideLoader(); // Only hide when backend data is loaded!
      }
    };
    fetchEnrollments();
  }, [showLoader, hideLoader]);

  const handleContinueLearning = (courseId: string) => {
    playHaptic('medium');
    showLoaderImmediate(
      "Tey is preparing your course roadmap...",
      false, // Preserves desktop sidebar (replaces middle column + right sidebar)!
      15000, // 15 seconds display duration so user can comfortably read message
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

  if (loading) {
    return <TeyroBrandedLoader isVisible={true} microcopyOverride="Tey is gathering your enrolled learning paths..." />;
  }

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
                            LESSON {Math.round((enrollment.progress / 100) * 25) || 1} / 25
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
                    </div>

                    {/* Right Mascot Side */}
                    <div className={styles.focusCardRight}>
                      <div className={styles.mascotBubble}>
                        <span>{getMascotMotivationText(course.slug)}</span>
                        <div className={styles.mascotBubbleTail} />
                      </div>
                      <div className={styles.focusMascotImageWrapper}>
                        <Image 
                          src="/dashboard tey.png" 
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
        <RightSidebar />
      </div>
    </div>
  );
}
