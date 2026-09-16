'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Sparkles, Trophy } from 'lucide-react';
import { useHerald, HeraldNotification } from '@/context/HeraldContext';
import { isStudentExperienceRoute } from '@/lib/herald-scope';
import { useRewardAnimation, type RewardCurrency } from '@/context/RewardAnimationContext';
import { useGamification } from '@/context/GamificationContext';
import { useCelebration, isCelebrationActive } from '@/context/CelebrationContext';
import { toCelebrationCurrency } from '@/components/celebration/currency';
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

const ACHIEVEMENT_TITLES = [
  "Achievement unlocked!",
  "New badge earned!",
  "Look at that shine!",
  "You earned a badge!",
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
      : notification.type === 'ACHIEVEMENT'
        ? ACHIEVEMENT_TITLES
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
  if (rewardType === 'FREEZE') return '/Icons/snowflake.svg';
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
  const { openClaimModal } = useRewardAnimation();
  const { celebrate } = useCelebration();
  const { refresh } = useGamification();
  const router = useRouter();
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

  // ── Fullscreen RewardRun claim (MISSION) ─────────────────────────────────

  const handleClaim = () => {
    if (claiming || claimed) return;
    playHaptic('medium');
    if (timerRef.current) clearTimeout(timerRef.current);
    onDismiss();

    // No claim API target (shouldn't happen for MISSION notifications) —
    // never open a payout scene that would celebrate a reward it can't persist.
    if (!notification.missionId) return;

    const claimedCurrency = toCelebrationCurrency(notification.rewardType);
    // Missions only ever pay XP/COINS — narrow defensively for the legacy
    // claim-modal adapter, whose RewardCurrency has no FREEZE variant.
    const rewardCurrency: RewardCurrency =
      claimedCurrency === 'XP' || claimedCurrency === 'COINS' ? claimedCurrency : 'XP';
    const amount = notification.rewardAmount || 20;

    // Full-page Celebration Engine claim scene — executes the mission-claim
    // API server-first, then choreographs the payout. Errors propagate so a
    // failed claim shows the error state instead of celebrating nothing.
    openClaimModal({
      title: `+${amount} ${rewardCurrency === 'COINS' ? 'COINS' : 'XP'}`,
      subtitle: notification.title || 'Reward Ready to Claim!',
      rewards: [{ currency: rewardCurrency, amount }],
      onClaim: async () => {
        const res = await fetch(
          `/api/v2/missions/${notification.missionId}/claim?timezoneOffset=${new Date().getTimezoneOffset()}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          }
        );
        if (!res.ok) {
          const body: { message?: string } = await res.json().catch(() => ({}));
          throw new Error(body?.message || 'Could not claim this mission.');
        }
        window.dispatchEvent(new CustomEvent('mission:refresh'));
        // Sync header balances — the dashboard-card claim path does the same.
        await refresh();
      },
    });
  };

  // ── Launch reveal overlay / celebration scene ─────────────────────────────

  const handleLaunchReveal = () => {
    playHaptic('medium');
    if (timerRef.current) clearTimeout(timerRef.current);
    onDismiss();
    if (notification.type === 'CHEST') {
      // Real chest reveal — the scene fetches today's chest, opens it
      // server-first, and choreographs the physical reward drop.
      // dedupeKey shared with every other Daily Chest entry point (the
      // dashboard card, JourneyPathMap) so a rapid double-tap or two
      // producers both firing can never queue two CHEST scenes for the
      // same chest — that plays out as the reveal scene restarting right
      // after it finishes.
      celebrate({ kind: 'CHEST', dedupeKey: 'daily-chest' });
    } else if (notification.type === 'SPIN') {
      setActiveOverlay('SPIN');
    } else if (notification.type === 'ACHIEVEMENT') {
      // Collect moment — the full-page AchievementScene claims the tier
      // server-first, then reveals the badge with its payout.
      launchAchievementScene(notification);
    }
  };

  /** AchievementScene launcher — the badge payload arrives on the notification.
   *  Achievements are their own reward: nothing is claimed, the scene celebrates
   *  the unlock (marking it seen) and deep-links to the collection. */
  const launchAchievementScene = (n: HeraldNotification) => {
    if (!n.achievement) return;
    const a = n.achievement;
    celebrate({
      kind: 'ACHIEVEMENT',
      badgeId: a.badgeId,
      badgeTitle: a.tierName,
      tier: a.tier,
      maxTier: a.maxTier,
      tierDescription: a.description,
      badgeBg: a.badgeBg,
      ctaText: 'VIEW ACHIEVEMENT',
      onComplete: () => {
        // "View Achievement" → the collection on the profile, where the new
        // medal now permanently lives.
        router.push('/dashboard/profile#achievements');
      },
    });
  };

  const handleBannerClick = (e: React.MouseEvent) => {
    // Buttons handle themselves; a tap anywhere else on a MISSION / ACHIEVEMENT
    // banner runs its primary action (claim / collect), other types just
    // dismiss — unlocks are always claimable later from the dashboard.
    if ((e.target as HTMLElement).closest('button')) return;
    if (notification.type === 'MISSION') {
      handleClaim();
    } else if (notification.type === 'ACHIEVEMENT') {
      handleLaunchReveal();
    } else {
      onDismiss();
    }
  };

  const mascotTitle = getMascotTitle(notification);
  // Only missions have a real claim API — the weekly banner is purely
  // celebratory (its XP was never persisted, so it must not fake a claim).
  const isActionableInline = notification.type === 'MISSION';

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
          src="/dashboard tey.webp"
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
                : notification.type === 'ACHIEVEMENT'
                  ? <Trophy size={12} color="#FBBF24" strokeWidth={2.6} />
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
            onClick={
              notification.type === 'WEEKLY_PROGRESS'
                ? onDismiss
                : handleLaunchReveal
            }
            className={styles.openBtn3D}
          >
            {notification.type === 'SPIN'
              ? 'SPIN NOW 🎡'
              : notification.type === 'CHEST'
                ? 'OPEN CHEST 📦'
                : notification.type === 'ACHIEVEMENT'
                  ? "LET'S GO"
                  : "LET'S GO 🚀"}
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
  // Banners hold off while a full-page celebration scene is playing —
  // the queued banner surfaces the moment the scene closes.
  const [celebrationActive, setCelebrationActive] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sync = () => setCelebrationActive(isCelebrationActive());
    sync();
    window.addEventListener('celebration:visibility', sync);
    return () => window.removeEventListener('celebration:visibility', sync);
  }, []);

  if (!mounted || !isStudentExperienceRoute(pathname) || celebrationActive) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {activeNotification && (
        <motion.div
          key={activeNotification.id}
          className={styles.heraldRoot}
          initial={{ opacity: 0, x: "-50%", y: -60, scale: 0.9, rotateX: 10 }}
          animate={{ opacity: 1, x: "-50%", y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, x: "-50%", y: -40, scale: 0.92 }}
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
