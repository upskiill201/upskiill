'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Lock, UserPlus } from 'lucide-react';
import { useStreakModal } from '@/context/StreakContext';
import { playHaptic } from '@/lib/haptics';
import styles from './StreakModal.module.css';

export default function StreakModal() {
  const {
    isModalOpen,
    closeStreakModal,
    activeTab,
    setActiveTab,
    streakData,
    calendarData,
    fetchCalendar,
  } = useStreakModal();

  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen && !selectedMonth) {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      setSelectedMonth(`${yyyy}-${mm}`);
    }
  }, [isModalOpen, selectedMonth]);

  if (!mounted || pathname?.startsWith('/creator')) return null;

  const currentStreak = streakData?.currentStreak ?? 0;
  const longestStreak = streakData?.longestStreak ?? 0;
  const isNewPersonalBest = streakData?.isNewPersonalBest ?? false;
  const streakSocietyUnlocked = streakData?.streakSocietyUnlocked ?? (currentStreak >= 7);

  // Month navigation
  const handlePrevMonth = () => {
    playHaptic('light');
    const [y, m] = selectedMonth.split('-').map(Number);
    const prevDate = new Date(y, m - 2, 1);
    const yyyy = prevDate.getFullYear();
    const mm = String(prevDate.getMonth() + 1).padStart(2, '0');
    const newMonth = `${yyyy}-${mm}`;
    setSelectedMonth(newMonth);
    fetchCalendar(newMonth);
  };

  const handleNextMonth = () => {
    playHaptic('light');
    const [y, m] = selectedMonth.split('-').map(Number);
    const nextDate = new Date(y, m, 1);
    const yyyy = nextDate.getFullYear();
    const mm = String(nextDate.getMonth() + 1).padStart(2, '0');
    const newMonth = `${yyyy}-${mm}`;
    setSelectedMonth(newMonth);
    fetchCalendar(newMonth);
  };

  // Month label e.g. "AUGUST 2026"
  const getMonthLabel = (monthStr: string) => {
    if (!monthStr) return 'AUGUST 2026';
    const [y, m] = monthStr.split('-').map(Number);
    const d = new Date(y, m - 1, 1);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  };

  // Days grid generation for calendar
  const daysInMonth = calendarData?.days || [];
  const firstDayOffset = (() => {
    if (!selectedMonth) return 0;
    const [y, m] = selectedMonth.split('-').map(Number);
    return new Date(y, m - 1, 1).getDay(); // 0 = Sun
  })();

  const weekDayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeStreakModal();
          }}
        >
          <motion.div
            className={styles.modalPanel}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          >
            {/* Header with Close X and Tabs */}
            <div className={styles.header}>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeStreakModal}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <h2 className={styles.headerTitle}>Streak</h2>

              <div className={styles.tabsRow}>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${
                    activeTab === 'PERSONAL' ? styles.tabActive : ''
                  }`}
                  onClick={() => {
                    playHaptic('light');
                    setActiveTab('PERSONAL');
                  }}
                >
                  PERSONAL
                </button>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${
                    activeTab === 'FRIENDS' ? styles.tabActive : ''
                  }`}
                  onClick={() => {
                    playHaptic('light');
                    setActiveTab('FRIENDS');
                  }}
                >
                  FRIENDS
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              {activeTab === 'PERSONAL' ? (
                <>
                  {/* Hero Orange Banner */}
                  <div className={styles.heroOrangeBanner}>
                    <div className={styles.heroLeft}>
                      <h1 className={styles.heroStreakText}>
                        {currentStreak} day streak
                      </h1>
                    </div>

                    <div className={styles.heroRightFlame}>
                      <Image
                        src="/Icons/burn.png"
                        alt="Flame"
                        width={64}
                        height={64}
                        priority
                      />
                    </div>
                  </div>

                  {/* Personal Best Badge Card */}
                  <div className={styles.personalBestCard}>
                    <div className={styles.medalIconWrap}>
                      <span className={styles.medalIcon}>🎖️</span>
                    </div>
                    <span className={styles.personalBestText}>
                      {isNewPersonalBest || (currentStreak > 0 && currentStreak === longestStreak)
                        ? "You've earned your longest streak ever!"
                        : `Longest streak: ${longestStreak} day${
                            longestStreak !== 1 ? 's' : ''
                          }`}
                    </span>
                  </div>

                  {/* Calendar Section */}
                  <div className={styles.calendarSection}>
                    <h3 className={styles.sectionTitle}>Calendar</h3>

                    <div className={styles.calendarCard}>
                      {/* Month Selector Row */}
                      <div className={styles.monthSelectorRow}>
                        <button
                          type="button"
                          className={styles.monthNavBtn}
                          onClick={handlePrevMonth}
                          aria-label="Previous month"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <span className={styles.monthLabel}>
                          {getMonthLabel(selectedMonth)}
                        </span>
                        <button
                          type="button"
                          className={styles.monthNavBtn}
                          onClick={handleNextMonth}
                          aria-label="Next month"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      {/* Day of Week Headers */}
                      <div className={styles.weekHeadersGrid}>
                        {weekDayHeaders.map((day, idx) => (
                          <span key={idx} className={styles.weekHeaderCell}>
                            {day}
                          </span>
                        ))}
                      </div>

                      {/* 31-Day Calendar Grid */}
                      <div className={styles.daysGrid}>
                        {/* Empty padding slots before month start */}
                        {Array.from({ length: firstDayOffset }).map((_, idx) => (
                          <div key={`pad-${idx}`} className={styles.emptyDayCell} />
                        ))}

                        {/* Month days */}
                        {daysInMonth.map((dayObj) => (
                          <div key={dayObj.date} className={styles.dayCell}>
                            <div
                              className={`${styles.dayBubble} ${
                                dayObj.isCompleted
                                  ? styles.dayCompleted
                                  : dayObj.isToday
                                  ? styles.dayToday
                                  : dayObj.isFuture
                                  ? styles.dayFuture
                                  : styles.dayNeutral
                              }`}
                            >
                              <span className={styles.dayNumText}>{dayObj.dayNumber}</span>
                              {dayObj.isCompleted && (
                                <div className={styles.streakFlameOverlay}>
                                  <Image
                                    src="/Icons/burn.png"
                                    alt="Streak Maintained"
                                    width={14}
                                    height={14}
                                    style={{ objectFit: 'contain' }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Streak Society Section */}
                  <div className={styles.societySection}>
                    <h3 className={styles.sectionTitle}>Streak Society</h3>

                    <div
                      className={`${styles.societyCard} ${
                        streakSocietyUnlocked ? styles.societyCardUnlocked : ''
                      }`}
                    >
                      <div className={styles.societyLockWrap}>
                        {streakSocietyUnlocked ? (
                          <span className={styles.societyUnlockedIcon}>👑</span>
                        ) : (
                          <Lock size={22} color="#94A3B8" />
                        )}
                      </div>
                      <div className={styles.societyCardText}>
                        <p className={styles.societyCardDesc}>
                          {streakSocietyUnlocked
                            ? "You've unlocked the exclusive Streak Society! Keep learning daily to maintain your status."
                            : "Reach a 7 day streak to join the Streak Society and earn exclusive rewards."}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* FRIENDS TAB VIEW (Screenshot 3) */
                <div className={styles.friendsTabView}>
                  <div className={styles.friendsHeroGraphics}>
                    <div className={styles.friendsIllustrationWrap}>
                      <Image
                        src="/dashboard tey.png"
                        alt="Tey & Friends"
                        width={120}
                        height={120}
                        className={styles.friendsIllustrationImg}
                        priority
                      />
                      <div className={styles.floatingFlameBadge}>
                        <Image
                          src="/Icons/burn.png"
                          alt="Flame"
                          width={44}
                          height={44}
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className={styles.friendsHeadline}>
                    Start <strong>Friend Streaks</strong> to make daily progress together!
                  </h3>

                  <button
                    type="button"
                    className={styles.addFriendsBtn3D}
                    onClick={() => {
                      playHaptic('medium');
                      closeStreakModal();
                    }}
                  >
                    <UserPlus size={18} />
                    <span>+ ADD FRIENDS</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
