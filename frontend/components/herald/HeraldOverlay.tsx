'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Sparkles } from 'lucide-react';
import { useHerald, HeraldNotification } from '@/context/HeraldContext';
import { useRewardAnimation, RewardCurrency } from '@/context/RewardAnimationContext';
import { playHaptic } from '@/lib/haptics';
import styles from './HeraldOverlay.module.css';

// ─── Mascot Copy Engine — Duolingo / Tey Voice ──────────────────────────────

const MISSION_TITLES = [
  "You crushed it! 🎯",
  "Mission done! High five! 👋",
  "Look at you go! 🔥",
  "Nailed it! Legendary! 🚀",
  "BOOM! Goal completed! ⚡",
];

const CHEST_TITLES = [
  "Ooh, your chest is ready! 🎁",
  "Daily loot unlocked! 📦",
  "Look what you unlocked! 👀",
  "Mystery Chest is ready! ✨",
];

const SPIN_TITLES = [
  "Your weekly spin is ready! 🎡",
  "Time to spin for rewards! 🎰",
  "Spin the wheel of fortune! 🌀",
];

const WEEKLY_TITLES = [
  "Weekly Goal Mastered! 🏆",
  "On Fire This Week! 🔥",
  "Weekly Milestone Hit! 🚀",
];

function getMascotTitle(notification: HeraldNotification): string {
  const pool =
    notification.type === 'MISSION'
      ? MISSION_TITLES
      : notification.type === 'CHEST'
        ? CHEST_TITLES
        : notification.type === 'SPIN'
          ? SPIN_TITLES
          : WEEKLY_TITLES;

  const hash = notification.id
    .split('')
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

function getRewardIcon(rewardType?: string): string {
  if (rewardType === 'XP') return '/Icons/gem.png';
  if (rewardType === 'COINS') return '/Icons/Coin.png';
  return '/Icons/gem.png';
}

// ─── Duolingo-Style Mascot Banner ────────────────────────────────────────────

const AUTO_DISMISS_MS = 7000; // 7 seconds for comfortable reading & action

interface HeraldBannerProps {
  notification: HeraldNotification;
  onDismiss: () => void;
}

function HeraldBanner({ notification, onDismiss }: HeraldBannerProps) {
  const { setActiveOverlay } = useHerald();
  const { triggerRewardAnimation, openClaimModal } = useRewardAnimation();
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const claimButtonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Auto-dismiss ─────────────────────────────────────────────────────────

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onDismiss();
    }, AUTO_DISMISS_MS);
  }, [onDismiss]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startTimer]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  const handleMouseLeave = () => startTimer();

  // ── Fullscreen RewardRun claim (MISSION / WEEKLY_PROGRESS / CHEST) ──────────

  const handleClaim = () => {
    if (claiming || claimed) return;
    playHaptic('medium');
    if (timerRef.current) clearTimeout(timerRef.current);
    onDismiss();

    const rewardCurrency: RewardCurrency = notification.rewardType === 'COINS' ? 'COINS' : 'XP';
    const amount = notification.rewardAmount || (notification.type === 'WEEKLY_PROGRESS' ? 50 : 20);

    openClaimModal({
      title: `+${amount} ${rewardCurrency === 'COINS' ? 'COINS' : 'GEMS'}`,
      subtitle: notification.title || 'Reward Ready to Claim!',
      rewards: [{ currency: rewardCurrency, amount }],
      onClaim: async () => {
        if (notification.type === 'WEEKLY_PROGRESS') return;
        if (!notification.missionId) return;
        try {
          await fetch(`/api/v2/missions/${notification.missionId}/claim`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
          window.dispatchEvent(new CustomEvent('mission:refresh'));
        } catch (err) {
          console.error('Failed to claim mission via banner:', err);
        }
      },
    });
  };

  // ── Launch reveal overlay (CHEST / SPIN / MISSIONS / STREAK) ──────────────

  const handleLaunchReveal = () => {
    playHaptic('medium');
    if (timerRef.current) clearTimeout(timerRef.current);
    onDismiss();
    if (notification.type === 'MISSION') {
      setActiveOverlay('MISSIONS');
    } else if (notification.type === 'CHEST') {
      openClaimModal({
        title: '+50 GEMS',
        subtitle: 'Mystery Chest Unlocked!',
        rewards: [
          { currency: 'XP', amount: 50 },
          { currency: 'COINS', amount: 30 },
        ],
      });
    } else if (notification.type === 'SPIN') {
      setActiveOverlay('SPIN');
    } else if (notification.type === 'WEEKLY_PROGRESS') {
      setActiveOverlay('MISSIONS');
    }
  };

  const handleBannerClick = (e: React.MouseEvent) => {
    // If user clicks the banner background rather than specific buttons, open full modal
    if ((e.target as HTMLElement).closest('button')) return;
    handleLaunchReveal();
  };

  const mascotTitle = getMascotTitle(notification);
  const isActionableInline =
    notification.type === 'MISSION' || notification.type === 'WEEKLY_PROGRESS';

  return (
    <div
      className={styles.banner}
      onClick={handleBannerClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
      aria-live="polite"
      style={{ cursor: 'pointer' }}
    >
      {/* Tey Mascot Avatar */}
      <div className={styles.mascotContainer}>
        <Image
          src="/dashboard tey.png"
          alt="Tey Mascot"
          width={58}
          height={58}
          className={styles.mascotAvatar}
          priority
        />
        <span className={styles.mascotBadge}>
          {notification.type === 'MISSION'
            ? '⚡'
            : notification.type === 'CHEST'
              ? '🎁'
              : notification.type === 'SPIN'
                ? '🎡'
                : '🏆'}
        </span>
      </div>

      {/* Speech Bubble / Copy */}
      <div className={styles.bannerCopy}>
        <div className={styles.bannerHeaderRow}>
          <span className={styles.bannerTitle}>{mascotTitle}</span>
          <span className={styles.rewardTag}>
            {notification.rewardType && (
              <Image
                src={getRewardIcon(notification.rewardType)}
                alt={notification.rewardType}
                width={16}
                height={16}
                style={{ objectFit: 'contain' }}
              />
            )}
            {notification.subtitle}
          </span>
        </div>
        <span className={styles.bannerSubtitle}>{notification.title}</span>
      </div>

      {/* Duolingo 3D Action Buttons */}
      <div className={styles.bannerActions}>
        {isActionableInline ? (
          <button
            ref={claimButtonRef}
            id={`herald-claim-${notification.id}`}
            type="button"
            onClick={handleClaim}
            disabled={claiming || claimed}
            className={`${styles.claimBtn3D} ${
              claimed ? styles.claimBtnClaimed : ''
            }`}
          >
            {claimed ? '✓ CLAIMED' : claiming ? 'CLAIMING...' : 'CLAIM 🎉'}
          </button>
        ) : (
          <button
            id={`herald-open-${notification.id}`}
            type="button"
            onClick={handleLaunchReveal}
            className={styles.openBtn3D}
          >
            {notification.type === 'SPIN' ? 'SPIN NOW 🎡' : 'OPEN CHEST 📦'}
          </button>
        )}

        <button
          id={`herald-dismiss-${notification.id}`}
          type="button"
          onClick={onDismiss}
          className={styles.dismissBtn}
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ animationDuration: `${AUTO_DISMISS_MS}ms` }}
        />
      </div>
    </div>
  );
}

// ─── HeraldOverlay — Root Renderer ───────────────────────────────────────────

export default function HeraldOverlay() {
  const pathname = usePathname();
  const { activeNotification, dismissActive } = useHerald();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname?.startsWith('/creator')) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {activeNotification && (
        <motion.div
          key={activeNotification.id}
          className={styles.heraldRoot}
          initial={{ opacity: 0, y: -60, scale: 0.9, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: -40, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 480, damping: 28 }}
        >
          <HeraldBanner
            notification={activeNotification}
            onDismiss={dismissActive}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
