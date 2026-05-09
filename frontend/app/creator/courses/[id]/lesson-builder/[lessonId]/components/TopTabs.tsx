import React from 'react';
import styles from '../LessonBuilder.module.css';

interface TopTabsProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function TopTabs({ currentTab, onTabChange }: TopTabsProps) {
  const tabs = [
    { id: 'learn', number: '1', title: 'Learn', subtitle: 'Teach the Concept' },
    { id: 'apply', number: '2', title: 'Apply', subtitle: 'Actionable Scenario' },
    { id: 'reflect', number: '3', title: 'Reflect', subtitle: 'Internalize Knowledge' },
    { id: 'deepen', number: '4', title: 'Deepen', subtitle: 'Additional Resources' },
  ];

  return (
    <div className={styles.topTabs}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.tab} ${currentTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <div className={styles.tabNumber}>{tab.number}</div>
          <div className={styles.tabText}>
            <span className={styles.tabTitle}>{tab.title}</span>
            <span className={styles.tabSubtitle}>{tab.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
