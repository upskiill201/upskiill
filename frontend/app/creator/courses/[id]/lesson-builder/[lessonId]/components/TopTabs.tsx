import React from 'react';
import styles from '../LessonBuilder.module.css';

interface TopTabsProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function TopTabs({ currentTab, onTabChange }: TopTabsProps) {
  const tabs = [
    { id: 'learn', number: '1', title: 'Learn', subtitle: 'Teach the concept' },
    { id: 'apply', number: '2', title: 'Apply', subtitle: 'Engage with practice' },
    { id: 'reflect', number: '3', title: 'Reflect', subtitle: 'Reinforce learning' },
    { id: 'deepen', number: '4', title: 'Deepen', subtitle: 'Provide more resources' },
  ];

  return (
    <div className={styles.topTabs}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <div
            key={tab.id}
            className={`${styles.topTab} ${isActive ? styles.active : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isActive ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {tab.number}
            </div>
            <div className="flex flex-col items-start">
              <span className={`text-sm font-bold ${isActive ? 'text-indigo-900' : 'text-gray-900'}`}>{tab.title}</span>
              <span className="text-xs text-gray-500 font-normal">{tab.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
