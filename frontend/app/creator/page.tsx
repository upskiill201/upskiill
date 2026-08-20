'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaArrowRight,
  FaBookOpen,
  FaWandMagicSparkles,
  FaLayerGroup,
  FaPlus,
  FaChartSimple,
  FaWallet,
  FaUsers,
  FaCircleCheck,
  FaPlay,
  FaLightbulb,
  FaGear,
  FaCompass,
  FaGraduationCap
} from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './CreatorDashboard.module.css';

import { getCachedUser, setCachedUser } from '@/lib/user-cache';

export default function CreatorDashboard() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cachedFirstName, setCachedFirstName] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCachedUser();
    if (cached?.fullName) {
      setCachedFirstName(cached.fullName.split(' ')[0]);
    }

    const fetchDashboardData = async () => {
      try {
        const [profileRes, coursesRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/courses/instructor/me', { credentials: 'include' })
        ]);

        if (profileRes.ok) {
          const data = await profileRes.json();
          setProfileData(data);
          if (data?.fullName) setCachedUser(data);
        }

        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          if (Array.isArray(coursesData)) {
            setCourses(coursesData);
          }
        }
      } catch (err) {
        console.error('Failed to load creator dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const firstName = profileData?.fullName?.split(' ')[0] || cachedFirstName;
  const hasCourses = courses.length > 0;
  
  // Sort courses by most recently modified
  const sortedCourses = [...courses].sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());
  const latestCourse = sortedCourses[0];

  const publishedCount = courses.filter(c => c.published).length;
  const draftCount = courses.filter(c => !c.published).length;
  const totalEnrollments = courses.reduce((acc, c) => acc + (c._count?.enrolments || 0), 0);

  if (loading) {
    return (
      <div className={styles.container} style={{ opacity: 0.6 }}>
        <div style={{ height: '36px', width: '280px', background: '#E2E8F0', borderRadius: '12px', marginBottom: '24px' }} />
        <div style={{ height: '220px', width: '100%', background: '#E2E8F0', borderRadius: '24px' }} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      
      {/* ─── TOP HEADER ROW ─── */}
      <div className={styles.topHeaderRow}>
        <div className={styles.welcomeBanner}>
          <h2 className={styles.welcomeTitle}>
            Welcome back{firstName ? `, ${firstName}` : ''}
          </h2>
          <p className={styles.welcomeSubtitle}>
            {!hasCourses 
              ? "You're one of our first founding creators shaping Teyro." 
              : "Here's an overview of your course catalog and student growth."}
          </p>
        </div>

        {/* ─── CREATOR STAT PILLS ─── */}
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <div className={styles.statIconBox}>
              <FaBookOpen size={16} color="#0172FD" />
            </div>
            <div className={styles.statText}>
              <span className={styles.statVal}>{courses.length}</span>
              <span className={styles.statLabel}>Courses</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIconBox}>
              <FaCircleCheck size={16} color="#10B981" />
            </div>
            <div className={styles.statText}>
              <span className={styles.statVal}>{publishedCount}</span>
              <span className={styles.statLabel}>Published</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIconBox}>
              <FaUsers size={16} color="#8B5CF6" />
            </div>
            <div className={styles.statText}>
              <span className={styles.statVal}>{totalEnrollments}</span>
              <span className={styles.statLabel}>Students</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN TWO-COLUMN DASHBOARD GRID ─── */}
      <div className={styles.dashboardGrid}>
        
        {/* LEFT / MAIN COLUMN */}
        <div className={styles.mainColumn}>
          
          {/* 1. DUOLINGO-STYLE FOCUS CARD */}
          {!hasCourses ? (
            <div className={styles.focusCard}>
              <div className={styles.focusCardLeft}>
                <div>
                  <span className={styles.focusBadge}>
                    <FaWandMagicSparkles size={11} />
                    Get Started
                  </span>
                  <h3 className={styles.focusCourseTitle}>Create your first course</h3>
                  <p className={styles.focusCourseDesc}>
                    Share your knowledge and start building your audience with our step-by-step creator studio.
                  </p>
                </div>
                
                <button 
                  onClick={() => router.push('/creator/create')}
                  className={styles.button3dWhite}
                >
                  <span>Launch Creator Wizard</span>
                  <span className={styles.buttonIconCircle}>
                    <FaArrowRight size={13} />
                  </span>
                </button>
              </div>

              {/* Mascot Bubble & Graphic */}
              <div className={styles.focusCardRight}>
                <div className={styles.mascotBubble}>
                  <span>Let&apos;s build your first interactive course!</span>
                  <div className={styles.mascotBubbleTail} />
                </div>
                <div className={styles.focusMascotImageWrapper}>
                  <Image 
                    src="/dashboard tey.png" 
                    alt="Tey Mascot" 
                    width={130} 
                    height={130} 
                    priority
                    className={styles.focusMascotImage}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.focusCard}>
              <div className={styles.focusCardLeft}>
                <div>
                  <span className={styles.focusBadge}>
                    <FaLayerGroup size={11} />
                    {latestCourse.published ? 'Published Course' : 'Current Draft'}
                  </span>
                  <h3 className={styles.focusCourseTitle}>{latestCourse.title}</h3>
                  <p className={styles.focusCourseDesc}>
                    {latestCourse.shortDescription || 'Continue refining your curriculum modules and interactive practice cards.'}
                  </p>
                </div>
                
                <button 
                  onClick={() => router.push(`/creator/builder/${latestCourse.id}`)}
                  className={styles.button3dWhite}
                >
                  <span>{latestCourse.published ? 'Manage Curriculum' : 'Continue Building'}</span>
                  <span className={styles.buttonIconCircle}>
                    <FaArrowRight size={13} />
                  </span>
                </button>
              </div>

              {/* Mascot Bubble & Graphic */}
              <div className={styles.focusCardRight}>
                <div className={styles.mascotBubble}>
                  <span>Keep up the momentum! Finish your draft.</span>
                  <div className={styles.mascotBubbleTail} />
                </div>
                <div className={styles.focusMascotImageWrapper}>
                  <Image 
                    src="/dashboard tey.png" 
                    alt="Tey Mascot" 
                    width={130} 
                    height={130} 
                    priority
                    className={styles.focusMascotImage}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. YOUR COURSES SECTION (CHUNKY DUOLINGO UNIT CARDS) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <FaBookOpen size={16} color="#0172FD" />
                <h3 className={styles.sectionTitle}>Your Courses</h3>
              </div>
              {courses.length > 0 && (
                <button 
                  onClick={() => router.push('/creator/courses')}
                  className={styles.viewAllBtn}
                >
                  View All ({courses.length})
                </button>
              )}
            </div>

            <div className={styles.courseList}>
              {courses.length === 0 ? (
                <div style={{
                  background: '#FFFFFF',
                  border: '2px dashed #CBD5E1',
                  borderRadius: '20px',
                  padding: '36px 24px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '16px',
                    background: '#EFF6FF',
                    border: '2px solid #BFDBFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0172FD'
                  }}>
                    <FaGraduationCap size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                      No courses created yet
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748B', maxWidth: '340px' }}>
                      Publish micro-lessons and interactive quizzes to start growing your student audience.
                    </p>
                  </div>
                  <button 
                    onClick={() => router.push('/creator/create')}
                    className={styles.button3dEdit}
                    style={{ marginTop: '8px' }}
                  >
                    <FaPlus size={13} />
                    <span>Create Your First Course</span>
                  </button>
                </div>
              ) : (
                courses.map((course) => (
                  <div key={course.id} className={styles.courseCard}>
                    <div className={styles.courseCardLeft}>
                      <div className={styles.courseIconBox}>
                        <FaGraduationCap size={20} />
                      </div>
                      <div className={styles.courseInfo}>
                        <h4 className={styles.courseTitle}>{course.title}</h4>
                        <div className={styles.courseMetaRow}>
                          {course.published ? (
                            <span className={styles.statusPillPublished}>
                              <FaCircleCheck size={11} /> Published
                            </span>
                          ) : (
                            <span className={styles.statusPillDraft}>
                              <FaLayerGroup size={11} /> Draft
                            </span>
                          )}
                          <span>•</span>
                          <span>{course._count?.enrolments || 0} Students enrolled</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => router.push(`/creator/builder/${course.id}`)}
                      className={styles.button3dEdit}
                    >
                      <span>Edit Course</span>
                      <FaArrowRight size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* RIGHT / SIDEBAR COLUMN */}
        <div className={styles.sideColumn}>
          
          {/* 1. STUDIO QUICK ACTIONS */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarCardHeader}>
              <h4 className={styles.sidebarCardTitle}>
                <FaWandMagicSparkles size={14} color="#0172FD" />
                Quick Actions
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/creator/create" className={styles.quickActionItem}>
                <div className={styles.quickActionLeft}>
                  <FaPlus size={14} color="#0172FD" />
                  <span>New Course</span>
                </div>
                <FaArrowRight size={12} color="#94A3B8" />
              </Link>

              <Link href="/creator/settings" className={styles.quickActionItem}>
                <div className={styles.quickActionLeft}>
                  <FaGear size={14} color="#64748B" />
                  <span>Creator Profile & Bio</span>
                </div>
                <FaArrowRight size={12} color="#94A3B8" />
              </Link>

              <Link href="/courses" className={styles.quickActionItem}>
                <div className={styles.quickActionLeft}>
                  <FaCompass size={14} color="#10B981" />
                  <span>Explore Catalog</span>
                </div>
                <FaArrowRight size={12} color="#94A3B8" />
              </Link>
            </div>
          </div>

          {/* 2. CREATOR BEST PRACTICES TIP CARD */}
          <div className={styles.tipsCard}>
            <div className={styles.tipsHeader}>
              <FaLightbulb size={16} />
              <span>Creator Tip</span>
            </div>
            <p className={styles.tipsText}>
              Keep lessons under 5 minutes with 2-3 interactive practice cards for the highest completion and retention rates.
            </p>
          </div>

          {/* 3. STUDIO ROADMAP (WHAT'S COMING) */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarCardHeader}>
              <h4 className={styles.sidebarCardTitle}>
                <FaWandMagicSparkles size={14} color="#9333EA" />
                Coming Soon
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapIconBox}>
                  <FaChartSimple size={16} />
                </div>
                <div className={styles.roadmapContent}>
                  <h5 className={styles.roadmapTitle}>Advanced Analytics</h5>
                  <span className={styles.roadmapSub}>Retention & drop-off metrics</span>
                </div>
              </div>

              <div className={styles.roadmapItem}>
                <div className={styles.roadmapIconBox}>
                  <FaWallet size={16} />
                </div>
                <div className={styles.roadmapContent}>
                  <h5 className={styles.roadmapTitle}>Instant Payouts</h5>
                  <span className={styles.roadmapSub}>Direct bank & Stripe transfer</span>
                </div>
              </div>

              <div className={styles.roadmapItem}>
                <div className={styles.roadmapIconBox}>
                  <FaUsers size={16} />
                </div>
                <div className={styles.roadmapContent}>
                  <h5 className={styles.roadmapTitle}>Student Community</h5>
                  <span className={styles.roadmapSub}>Q&A discussion boards</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
