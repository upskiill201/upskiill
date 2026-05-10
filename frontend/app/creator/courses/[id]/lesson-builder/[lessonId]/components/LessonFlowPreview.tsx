import React from 'react';
import { Play, PenTool, Lightbulb, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import styles from '../LessonBuilder.module.css';

export function LessonFlowPreview({ lesson }: { lesson: any }) {
  const steps = [
    {
      id: 'learn',
      title: '1. Learn',
      desc: 'Video & Text',
      icon: <Play size={16} />,
      active: true, // Currently building this step
      status: 'pending', // Would be 'completed' if data exists
    },
    {
      id: 'apply',
      title: '2. Apply',
      desc: 'Action & Task',
      icon: <PenTool size={16} />,
      active: false,
      status: 'pending',
    },
    {
      id: 'reflect',
      title: '3. Reflect',
      desc: 'Internalize',
      icon: <Lightbulb size={16} />,
      active: false,
      status: 'pending',
    },
    {
      id: 'deepen',
      title: '4. Deepen',
      desc: 'Resources',
      icon: <LinkIcon size={16} />,
      active: false,
      status: 'pending',
    },
  ];

  return (
    <div className={styles.flowPreviewList}>
      {steps.map((step) => (
        <div key={step.id} className={`${styles.flowPreviewItem} ${step.active ? styles.active : ''}`}>
          <div className={`${styles.flowPreviewLeft} ${step.active ? styles.active : ''}`}>
            <span className={styles.flowPreviewIcon}>{step.icon}</span>
            {step.title}
          </div>
          {step.active ? (
            <div className={styles.flowPreviewRight}>Current Step</div>
          ) : (
            <div className={styles.flowPreviewDesc}>{step.desc}</div>
          )}
        </div>
      ))}
    </div>
  );
}
