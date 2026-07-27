'use client';

import React from 'react';
import Image from 'next/image';
import styles from './FriendsActivityCard.module.css';

export default function FriendsActivityCard() {
  const activities = [
    {
      id: 'a1',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80',
      name: 'Sarah',
      action: 'completed Lesson 8 in Figma UI/UX',
      time: '2h ago',
      icon: '🎨',
    },
    {
      id: 'a2',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80',
      name: 'James',
      action: 'reached Level 4',
      time: '5h ago',
      icon: '💎',
    },
    {
      id: 'a3',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80',
      name: 'Michael',
      action: 'completed today\'s mission',
      time: '7h ago',
      icon: '🔥',
    },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>FRIENDS ACTIVITY</h3>
        <span className={styles.viewAllLink}>View All</span>
      </div>

      <div className={styles.feedList}>
        {activities.map((a) => (
          <div key={a.id} className={styles.feedItem}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.avatar} alt={a.name} className={styles.avatar} />

            <div className={styles.feedContent}>
              <p className={styles.feedText}>
                <span className={styles.feedName}>{a.name}</span> {a.action}
              </p>
              <span className={styles.timestamp}>{a.time}</span>
            </div>

            <div className={styles.feedIcon}>
              <span>{a.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
