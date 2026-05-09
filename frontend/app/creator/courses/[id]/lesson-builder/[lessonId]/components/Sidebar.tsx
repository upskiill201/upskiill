import React from 'react';
import { LessonFlowPreview } from './LessonFlowPreview';
import { RightControlPanel, SystemInfoPanel } from './RightControlPanel';
import styles from '../LessonBuilder.module.css';

export function Sidebar({ lesson }: { lesson: any }) {
  return (
    <div className={styles.rightCol}>
      <div className={styles.sidebarCard}>
        <h3 className={styles.sidebarTitle}>Lesson Flow Preview</h3>
        <p className={styles.sidebarDesc}>This is how students will experience this lesson.</p>
        <LessonFlowPreview lesson={lesson} />
      </div>

      <div className={styles.sidebarCard}>
        <h3 className={styles.sidebarTitle}>Lesson Progress</h3>
        <p className={styles.sidebarDesc} style={{ marginBottom: '16px' }}>Complete all required items.</p>
        <RightControlPanel lesson={lesson} />
      </div>

      <SystemInfoPanel />
    </div>
  );
}
