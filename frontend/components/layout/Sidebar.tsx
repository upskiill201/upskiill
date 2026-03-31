'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LogOut, ChevronDown, ChevronUp, PlayCircle, CheckCircle, Lock, X } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';
import styles from './Sidebar.module.css';

export type DashboardLink = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

export type CourseLesson = {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
};

export type CourseSection = {
  id: string;
  title: string;
  lessons: CourseLesson[];
};

export type SidebarProps = {
  mode?: 'dashboard' | 'coursePlayer';
  
  dashboardLinks?: DashboardLink[];
  activeLinkId?: string;
  
  courseTitle?: string;
  courseProgress?: number;
  courseSections?: CourseSection[];
  activeLessonId?: string;
  onLessonClick?: (lessonId: string) => void;
  
  isOpen?: boolean;
  onClose?: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  mode = 'dashboard',
  dashboardLinks = [],
  activeLinkId,
  courseTitle = 'Course Overview',
  courseProgress = 0,
  courseSections = [],
  activeLessonId,
  onLessonClick,
  isOpen = true,
  onClose,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId] // If undefined, it flips from implicitly true to false
    }));
  };

  return (
    <>
      {isOpen && onClose && (
        <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {mode === 'dashboard' ? 'My Dashboard' : 'Course Content'}
          </h2>
          {onClose && (
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close sidebar">
              <X size={20} />
            </button>
          )}
        </div>

        <div className={styles.content}>
          {mode === 'dashboard' ? (
            <nav className={styles.dashboardNav}>
              {dashboardLinks.map(link => (
                <Link 
                  key={link.id} 
                  href={link.href}
                  className={`${styles.navItem} ${activeLinkId === link.id ? styles.active : ''}`}
                >
                  <span className={styles.navIcon}>{link.icon}</span>
                  <span className={styles.navLabel}>{link.label}</span>
                </Link>
              ))}
              <div className={styles.divider} />
              <button className={`${styles.navItem} ${styles.logoutBtn}`}>
                <span className={styles.navIcon}><LogOut size={18} /></span>
                <span className={styles.navLabel}>Logout</span>
              </button>
            </nav>
          ) : (
            <div className={styles.playerNav}>
              <div className={styles.progressContainer}>
                <h3 className={styles.courseTitle}>{courseTitle}</h3>
                <ProgressBar value={courseProgress} color="blue" size="sm" showPercentage />
              </div>

              <div className={styles.accordionContainer}>
                {courseSections.map(section => {
                  const isExpanded = expandedSections[section.id] !== false; 
                  return (
                    <div key={section.id} className={styles.section}>
                      <button 
                        className={styles.sectionHeader}
                        onClick={() => toggleSection(section.id)}
                      >
                        <span className={styles.sectionTitle}>{section.title}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      
                      {isExpanded && (
                        <div className={styles.sectionBody}>
                          {section.lessons.map(lesson => (
                            <button
                              key={lesson.id}
                              className={`
                                ${styles.lessonItem} 
                                ${activeLessonId === lesson.id ? styles.lessonActive : ''}
                                ${lesson.isLocked ? styles.lessonLocked : ''}
                              `}
                              onClick={() => {
                                if (!lesson.isLocked && onLessonClick) {
                                  onLessonClick(lesson.id);
                                }
                              }}
                              disabled={lesson.isLocked}
                            >
                              <div className={styles.lessonIcon}>
                                {lesson.isCompleted ? (
                                  <CheckCircle size={16} className={styles.checkIcon} />
                                ) : lesson.isLocked ? (
                                  <Lock size={14} className={styles.lockIcon} />
                                ) : (
                                  <PlayCircle size={16} className={styles.playIcon} />
                                )}
                              </div>
                              <div className={styles.lessonDetails}>
                                <span className={styles.lessonTitle}>{lesson.title}</span>
                                <span className={styles.lessonTime}>{lesson.duration}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
