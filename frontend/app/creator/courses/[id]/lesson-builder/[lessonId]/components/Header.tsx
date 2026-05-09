import React from 'react';
import Link from 'next/link';
import { ChevronRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from '../LessonBuilder.module.css';

interface HeaderProps {
  courseId: string;
  courseTitle: string;
  sectionTitle: string;
  lessonTitle: string;
}

export function Header({ courseId, courseTitle, sectionTitle, lessonTitle }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.breadcrumbs}>
          <Link href={`/creator/courses/${courseId}/manage`} className={styles.breadcrumbLink}>
            {courseTitle}
          </Link>
          <ChevronRight size={14} color="var(--text-muted)" />
          <span>{sectionTitle}</span>
          <ChevronRight size={14} color="var(--text-muted)" />
          <span>{lessonTitle}</span>
        </div>

        <div className={styles.stepper}>
          <div className={`${styles.stepItem} ${styles.completed}`}>
            <div className={styles.stepIcon}><Check size={12} /></div>
            Course Setup
          </div>
          <ChevronRight size={14} color="var(--border-strong)" />
          <div className={`${styles.stepItem} ${styles.completed}`}>
            <div className={styles.stepIcon}><Check size={12} /></div>
            Build Curriculum
          </div>
          <ChevronRight size={14} color="var(--border-strong)" />
          <div className={`${styles.stepItem} ${styles.active}`}>
            <div className={styles.stepIcon}>3</div>
            Lesson Builder
          </div>
          <ChevronRight size={14} color="var(--border-strong)" />
          <div className={styles.stepItem}>
            <div className={styles.stepIcon}>4</div>
            Preview & Publish
          </div>
        </div>
      </div>

      <div className={styles.headerTitleRow}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Lesson Builder</h1>
          <p className={styles.pageSubtitle}>
            Create an engaging, step-by-step learning experience.
            <span className={styles.howItWorks}>
              <span className={styles.howItWorksIcon}>i</span>
              How it works
            </span>
          </p>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.autoSave}>
            <Check size={14} /> Auto-saved 2 min ago
          </div>
          <Button variant="outline" size="sm" style={{ backgroundColor: 'white' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              Preview as Student
            </span>
          </Button>
          <Button size="sm" style={{ backgroundColor: 'var(--brand-blue)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Save & Continue
              <ChevronRight size={16} />
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
