'use client';

import React from 'react';
import Badge from './Badge';
import styles from './Tabs.module.css';

export type Tab = {
  label: string;
  value: string;
  count?: number;
};

export type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
  variant?: 'underline' | 'pill';
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
}) => {
  return (
    <div className={`${styles.container} ${styles[variant + 'Container']}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            className={`${styles.tabBtn} ${styles[variant]} ${isActive ? styles.active : ''}`}
            onClick={() => onChange(tab.value)}
          >
            <span className={styles.label}>{tab.label}</span>
            {tab.count !== undefined && (
              <Badge variant="grey" size="sm">{tab.count}</Badge>
            )}
          </button>
        );
      })}
    </div>
  );
};
