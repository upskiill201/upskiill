import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import styles from '../LessonBuilder.module.css';

export function RightControlPanel({ lesson }: { lesson: any }) {
  // Compute progress based on content existence
  const hasVideoOrText = !!(lesson?.learnVideoUrl || lesson?.learnText);
  const hasTitle = !!lesson?.title;
  
  const checkDone = [hasVideoOrText, hasTitle].filter(Boolean).length;
  const progressPercent = Math.round((checkDone / 2) * 100);

  return (
    <>
      <div className={styles.progressCircleArea}>
        <div className={styles.progressCircle}>
          <span>{progressPercent}%</span>
        </div>
        <div className={styles.progressText}>
          <span className={styles.progressTitle}>Learn Step</span>
          <span className={styles.progressDesc}>{checkDone} / 2 complete</span>
        </div>
      </div>

      <div className={styles.checklist}>
        <div className={`${styles.checkItem} ${hasTitle ? styles.done : ''}`}>
          <Check size={16} className={styles.checkIcon} />
          Add a lesson title
        </div>
        <div className={`${styles.checkItem} ${hasVideoOrText ? styles.done : ''}`}>
          <Check size={16} className={styles.checkIcon} />
          Upload content (Video/Text)
        </div>
      </div>
    </>
  );
}

export function SystemInfoPanel() {
  return (
    <div className={styles.sidebarCard}>
      <h3 className={styles.sidebarTitle}>System Info</h3>
      <p className={styles.systemInfo}>
        XP rewards are automatically calculated based on lesson structure. Completing this entire 4-step lesson will award the student:
      </p>
      <div className={styles.xpBadge}>
        <Sparkles size={16} className={styles.xpIcon} />
        +50 XP
      </div>
    </div>
  );
}
