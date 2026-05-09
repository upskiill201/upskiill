import React from 'react';
import { LessonFlowPreview } from './LessonFlowPreview';
import { RightControlPanel, SystemInfoPanel } from './RightControlPanel';
import styles from '../LessonBuilder.module.css';

export function Sidebar({ lesson }: { lesson: any }) {
  return (
    <div className={styles.rightCol}>
      <div className={styles.sidebarCard}>
        <div>
          <h3 className="font-bold text-gray-900">Lesson Flow Preview</h3>
          <p className="text-xs text-gray-500 mt-1">This is how students will experience this lesson.</p>
        </div>
        <LessonFlowPreview lesson={lesson} />
      </div>

      <div className={styles.sidebarCard}>
        <h3 className="font-bold text-gray-900">Lesson Progress</h3>
        <RightControlPanel lesson={lesson} />
      </div>

      <SystemInfoPanel />
    </div>
  );
}
