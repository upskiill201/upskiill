/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Bell, Check, Lock, ChevronDown, ChevronUp, Clock, AlignLeft, Sparkles
} from 'lucide-react';
import styles from './CoursePlayerLayout.module.css';

export interface CoursePlayerLayoutProps {
  course: Record<string, any>;
  activeLesson: { moduleIndex: number; lessonIndex: number } | null;
  completedLessons: string[];
  onSelectLesson: (moduleIndex: number, lessonIndex: number) => void;
  onMarkComplete: () => void;
}

const PremiumComingSoon = ({ title }: { title: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center', margin: '20px 0' }}>
     <Sparkles size={40} color="#3D5AFE" style={{ marginBottom: '16px' }} />
     <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>{title} (Phase 2)</h3>
     <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '400px', margin: 0, lineHeight: 1.5 }}>
       This premium feature is highly anticipated and will be unlocked for our students in the upcoming release.
     </p>
  </div>
);

export const CoursePlayerLayout = ({
  course,
  activeLesson,
  completedLessons,
  onSelectLesson,
  onMarkComplete,
}: CoursePlayerLayoutProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarTab, setSidebarTab] = useState('curriculum');
  const [expandedModules, setExpandedModules] = useState<string[]>(['m0', 'm1', 'm2']);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const currentModule = activeLesson && course?.curriculum ? course.curriculum[activeLesson.moduleIndex] : null;
  const currentLessonData = currentModule && activeLesson ? currentModule.lessons[activeLesson.lessonIndex] : null;
  
  // Calculate Progress
  let totalLessons = 0;
  course?.curriculum?.forEach((mod: Record<string, any>) => {
    totalLessons += mod.lessons?.length || 0;
  });
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  if (!course || !currentLessonData) {
    return <div style={{color:'white', padding: 40}}>Loading course player...</div>;
  }

  return (
    <div className={styles.container}>
      {/* 1. TOP NAVIGATION BAR */}
      <header className={styles.topBar}>
        <div className={styles.topLeft}>
          <Link href={`/courses/${course.slug || course.id}`} className={styles.backBtn}>
            <ArrowLeft size={18} />
          </Link>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>U</div>
            <span>Upskiill</span>
          </div>
        </div>

        <div className={styles.topCenter}>
          <span className={styles.courseSubtitle}>{course.title}</span>
          <span className={styles.courseTitle}>{currentModule?.title}</span>
        </div>

        <div className={styles.topRight}>
          <div className={styles.bellIcon}>
            <Bell size={20} />
            <div className={styles.notificationDot} />
          </div>
          <div className={styles.userProfile}>
            {/* Using standard img for quick illustration matching the design */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
               src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop" 
               alt="User" 
               style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div className={styles.userInfo}>
              <span className={styles.userName}>Alex Morgan</span>
              <span className={styles.userRole}>Pro Member</span>
            </div>
            <ChevronDown size={14} color="#94A3B8" />
          </div>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* 2. LEFT COLUMN (Video & Tab Info) */}
        <div className={styles.playerColumn}>
          {/* Video Area containing YouTube iframe */}
          <div className={styles.videoContainer}>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&showinfo=0&controls=1&rel=0&modestbranding=1" 
              title="Course Video Placeholder" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>

          {/* Lesson Header Information */}
          <div className={styles.lessonHeader}>
            <div>
              <div className={styles.lessonMetaInfo}>
                <span className={styles.moduleBadge}>MODULE {(activeLesson?.moduleIndex ?? 0) + 1}</span>
                <span className={styles.durationWrap}><Clock size={14} /> {currentLessonData.duration}</span>
              </div>
              <h1 className={styles.lessonMainTitle}>{currentLessonData.title}</h1>
              <p className={styles.lessonDescription}>
                {course.shortDescription || "Welcome to this lesson! Get ready to dive deep into the concepts outlined in the curriculum."}
              </p>
            </div>
            
            <button 
              className={styles.markCompleteBtn} 
              onClick={onMarkComplete}
              disabled={completedLessons.includes(currentLessonData.id || String(currentLessonData.index))}
              style={{ opacity: completedLessons.includes(currentLessonData.id || String(currentLessonData.index)) ? 0.5 : 1 }}
            >
              <Check size={18} /> {completedLessons.includes(currentLessonData.id || String(currentLessonData.index)) ? "Completed" : "Mark Complete"}
            </button>
          </div>

          {/* Tabs Area */}
          <div className={styles.contentTabs}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.active : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'notes' ? styles.active : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'resources' ? styles.active : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources <span className={styles.resourceBadge}>3</span>
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'discussion' ? styles.active : ''}`}
              onClick={() => setActiveTab('discussion')}
            >
              Discussion
            </button>
          </div>

          {/* Tab Content (Overview shown as per design) */}
          {activeTab === 'overview' && (
            <div className={styles.tabContentArea}>
              <p className={styles.overviewText}>
                In this lesson, we dive deep into Figma&apos;s advanced prototyping capabilities. We&apos;ll move beyond simple screen-to-screen transitions and explore how to build interactive components that mimic real code behavior.
              </p>
              
              <h3 className={styles.sectionTitle}>What you&apos;ll learn:</h3>
              <div className={styles.learningList}>
                <div className={styles.learningItem}>
                  <div className={styles.checkCircle}><Check size={14} strokeWidth={3}/></div>
                  <span className={styles.learningText}>Setting up interactive variants for buttons and inputs.</span>
                </div>
                <div className={styles.learningItem}>
                  <div className={styles.checkCircle}><Check size={14} strokeWidth={3}/></div>
                  <span className={styles.learningText}>Mastering the &apos;Smart Animate&apos; feature for fluid transitions.</span>
                </div>
                <div className={styles.learningItem}>
                  <div className={styles.checkCircle}><Check size={14} strokeWidth={3}/></div>
                  <span className={styles.learningText}>Creating scrollable areas within a static frame.</span>
                </div>
              </div>

              {/* Instructor Box */}
              <div className={styles.instructorBox}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={course.instructor?.avatarUrl || "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=150&auto=format&fit=crop"} 
                  alt="Instructor" 
                  className={styles.instAvatar}
                />
                <div className={styles.instInfo}>
                  <span className={styles.instLabel}>INSTRUCTOR</span>
                  <span className={styles.instName}>{course.instructor?.fullName}</span>
                  <span className={styles.instTitle}>Upskiill Certified Expert</span>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'notes' || activeTab === 'resources' || activeTab === 'discussion') && (
            <PremiumComingSoon title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />
          )}
        </div>

        {/* Mobile Sidebar Overlay */}
        <div 
          className={`${styles.mobileSidebarOverlay} ${isMobileSidebarOpen ? styles.show : ''}`} 
          onClick={() => setIsMobileSidebarOpen(false)} 
        />

        {/* Floating Action Button (Mobile Only) */}
        <button 
          className={styles.mobileMenuToggle} 
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          {isMobileSidebarOpen ? <ArrowLeft size={24} /> : <AlignLeft size={24} />}
        </button>

        {/* 3. RIGHT COLUMN (Sidebar) */}
        <div className={`${styles.sidebar} ${isMobileSidebarOpen ? styles.mobileOpen : ''}`}>
          {/* Toggle Buttons */}
          <div className={styles.sidebarToggle}>
            <button 
              className={`${styles.toggleBtn} ${sidebarTab === 'curriculum' ? styles.active : ''}`}
              onClick={() => setSidebarTab('curriculum')}
            >
              <AlignLeft size={16} /> Curriculum
            </button>
            <button 
              className={`${styles.toggleBtn} ${sidebarTab === 'ai' ? styles.active : ''}`}
              onClick={() => setSidebarTab('ai')}
            >
              <Sparkles size={16} /> AI Tutor
            </button>
          </div>

          {sidebarTab === 'curriculum' ? (
            <>
              {/* Progress */}
              <div className={styles.sidebarProgressBlock}>
                <div className={styles.progressHeader}>
                  <span className={styles.progressLabel}>Course Progress</span>
                  <span className={styles.progressValue}>{progressPercent}%</span>
                </div>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              {/* Modules Accordion */}
              <div className={styles.curriculumList}>
                {course.curriculum?.map((moduleItem: Record<string, any>, mIdx: number) => (
                  <div className={styles.moduleBox} key={`mod-${mIdx}`}>
                    <div className={styles.moduleHeader} onClick={() => toggleModule(`m${mIdx}`)}>
                      <span>{mIdx + 1}. {moduleItem.title}</span>
                      {expandedModules.includes(`m${mIdx}`) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    {expandedModules.includes(`m${mIdx}`) && (
                      <div className={styles.moduleContent}>
                        {moduleItem.lessons.map((lesson: Record<string, any>, lIdx: number) => {
                          const isActive = activeLesson?.moduleIndex === mIdx && activeLesson?.lessonIndex === lIdx;
                          const lessonId = lesson.id || String(lesson.index);
                          const isCompleted = completedLessons.includes(lessonId);
                          const isLocked = !isCompleted && !isActive && mIdx > 0 && !completedLessons.length; // Simplified locking logic

                          return (
                            <div 
                               key={`less-${lIdx}`}
                               className={`${styles.lessonItem} ${isActive ? styles.active : ''}`}
                               onClick={() => !isLocked && onSelectLesson(mIdx, lIdx)}
                               style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
                            >
                              <div className={styles.lessonIcon}>
                                {isActive ? (
                                  <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#3D5AFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                     <div style={{ width: 2, height: 6, backgroundColor: 'white', margin: '0 1px' }} />
                                     <div style={{ width: 2, height: 8, backgroundColor: 'white', margin: '0 1px' }} />
                                     <div style={{ width: 2, height: 4, backgroundColor: 'white', margin: '0 1px' }} />
                                  </div>
                                ) : isCompleted ? (
                                  <Check size={16} color="#22C55E" />
                                ) : isLocked ? (
                                  <Lock size={14} color="#64748B" />
                                ) : (
                                  <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #64748B' }} />
                                )}
                              </div>
                              <div className={styles.lessonText}>
                                <span className={styles.lessonTitle} style={{ color: isLocked ? '#64748B' : undefined }}>{lesson.title}</span>
                                <span className={styles.lessonMeta}>{lesson.duration} {isActive && '• Playing'}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ padding: '0 24px' }}>
              <PremiumComingSoon title="24/7 AI Tutor" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
