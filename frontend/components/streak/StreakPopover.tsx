'use client';

import React from 'react';
import Image from 'next/image';
import { Lock, Crown, Shield } from 'lucide-react';
import { useStreakModal } from '@/context/StreakContext';
import { playHaptic } from '@/lib/haptics';
import styles from './StreakPopover.module.css';

interface StreakPopoverProps {
  onClose?: () => void;
}

export default function StreakPopover({ onClose }: StreakPopoverProps) {
  const { streakData, calendarData, openStreakModal } = useStreakModal();

  const currentStreak = streakData?.currentStreak ?? 0;
  const isNewPersonalBest = streakData?.isNewPersonalBest ?? false;
  const streakSocietyUnlocked = streakData?.streakSocietyUnlocked ?? (currentStreak >= 7);
  const freezesAvailable = streakData?.freezesAvailable ?? 0;

  // Generate 7-day mini row (Sun-Sat) for current week
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Match calendarData days or generate current week days
  const now = new Date();
  const currentDayOfWeek = now.getDay(); // 0 = Sun, 6 = Sat

  // Map calendarData days if matching current date
  const calendarMap = new Map<string, boolean>();
  if (calendarData?.days) {
    calendarData.days.forEach((d) => {
      calendarMap.set(d.date, d.isCompleted);
    });
  }

  const weekDayStatus = daysOfWeek.map((label, idx) => {
    const diff = idx - currentDayOfWeek;
    const targetDate = new Date(now.getTime() + diff * 24 * 60 * 60 * 1000);
    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
    const dd = String(targetDate.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const isToday = idx === currentDayOfWeek;
    let isCompleted = calendarMap.get(dateStr) ?? false;

    if (!isCompleted && currentStreak > 0) {
      if (isToday) {
        isCompleted = streakData?.hasCompletedToday ?? false;
      } else if (diff < 0 && Math.abs(diff) < currentStreak) {
        isCompleted = true;
      }
    }

    return {
      label,
      dateStr,
      isToday,
      isCompleted,
    };
  });

  const handleOpenPersonalModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHaptic('medium');
    if (onClose) onClose();
    openStreakModal('PERSONAL');
  };

  return (
    <div
      className={styles.popoverCard}
      role="dialog"
      aria-label="Streak Popover"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Hero Banner */}
      <div className={styles.heroHeader}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroTextGroup}>
            <h3 className={styles.heroTitle}>
              {currentStreak} day streak
            </h3>
            <p className={styles.heroSubtitle}>
              {isNewPersonalBest || (currentStreak > 0 && currentStreak === streakData?.longestStreak)
                ? "You've earned your longest streak ever!"
                : "Complete a lesson today to extend your streak!"}
            </p>
          </div>

          <div className={styles.flameIconWrap}>
            <Image
              src="/Icons/burn.png"
              alt="Streak Flame"
              width={48}
              height={48}
              className={styles.flameImg}
              priority
            />
          </div>
        </div>

        {/* 7-Day Mini Tracker Row */}
        <div className={styles.miniWeekTracker}>
          {weekDayStatus.map((dayItem, idx) => (
            <div key={idx} className={styles.miniDayCell}>
              <span className={styles.miniDayLabel}>{dayItem.label}</span>
              <div
                className={`${styles.miniDayDot} ${
                  dayItem.isCompleted
                    ? styles.miniDotCompleted
                    : dayItem.isToday
                    ? styles.miniDotToday
                    : styles.miniDotEmpty
                }`}
              >
                {dayItem.isCompleted ? (
                  <Image
                    src="/Icons/burn.png"
                    alt="Maintained Streak"
                    width={14}
                    height={14}
                    style={{ objectFit: 'contain' }}
                  />
                ) : dayItem.isToday ? (
                  <div className={styles.todayInnerPulse} />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popover Content Cards */}
      <div className={styles.cardContent}>
        {/* Card 1: Streak Freeze Status */}
        <div className={styles.friendsTeaserCard}>
          <div className={styles.friendsTeaserLeft}>
            <div className={styles.friendsAvatarGroup} style={{ backgroundColor: '#EFF6FF', border: '1.5px solid #BAE6FD' }}>
              <Shield size={20} className="text-[#0172FD]" />
            </div>
            <div className={styles.friendsText}>
              <h4 className={styles.friendsTitle}>Streak Freeze</h4>
              <p className={styles.friendsSubtitle}>
                {freezesAvailable > 0
                  ? `${freezesAvailable} of 2 freezes active`
                  : 'No active freezes equipped'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className={styles.viewListBtn}
            onClick={handleOpenPersonalModal}
          >
            {freezesAvailable > 0 ? 'VIEW' : 'EQUIP'}
          </button>
        </div>

        {/* Card 2: Streak Society */}
        <div
          className={`${styles.societyTeaserCard} ${
            streakSocietyUnlocked ? styles.societyUnlocked : ''
          }`}
        >
          <div className={styles.societyIconWrap}>
            {streakSocietyUnlocked ? (
              <Crown size={20} className="text-[#EAB308]" />
            ) : (
              <Lock size={20} color="#94A3B8" />
            )}
          </div>
          <div className={styles.societyText}>
            <h4 className={styles.societyTitle}>Streak Society</h4>
            <p className={styles.societySubtitle}>
              {streakSocietyUnlocked
                ? "You've unlocked the exclusive Streak Society!"
                : "Reach a 7 day streak to join the Streak Society and earn exclusive rewards."}
            </p>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <button
          type="button"
          className={styles.viewMoreBtn3D}
          onClick={handleOpenPersonalModal}
        >
          VIEW STREAK CALENDAR
        </button>
      </div>
    </div>
  );
}
