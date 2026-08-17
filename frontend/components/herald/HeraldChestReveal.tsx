'use client';

/**
 * HeraldChestReveal
 *
 * A router-independent portal overlay for the Mystery Chest open sequence.
 * This is the SAME GSAP shake→confetti→scale sequence as MysteryChestCard,
 * but mounted via createPortal so the underlying page is never unmounted
 * or navigated away from (§5 of the Herald spec).
 *
 * Entry point: HeraldContext.activeOverlay === 'CHEST'
 * Exit: overlay unmounts itself after close → student is back where they were.
 */

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { useHerald } from '@/context/HeraldContext';
import { useRewardAnimation, RewardCurrency } from '@/context/RewardAnimationContext';
import { useGamification } from '@/context/GamificationContext';
import { playHaptic } from '@/lib/haptics';
import styles from './HeraldOverlay.module.css';

interface ChestData {
  status: string;
  id?: string;
  rewardType?: string;
  rewardAmount?: number;
  rewardSnapshotType?: string;
  rewardSnapshotAmount?: number;
}

export default function HeraldChestReveal() {
  const { activeOverlay, setActiveOverlay } = useHerald();
  const { triggerRewardAnimation } = useRewardAnimation();
  const { refresh } = useGamification();

  const [mounted, setMounted] = useState(false);
  const [chestData, setChestData] = useState<ChestData | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [claimedReward, setClaimedReward] = useState<{ type: string; amount: number } | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const chestImgRef = useRef<HTMLDivElement>(null);

  const isOpen = activeOverlay === 'CHEST';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch chest state whenever the overlay opens
  useEffect(() => {
    if (!isOpen) return;

    setChestData(null);
    setClaimedReward(null);
    setFetchError(null);
    setIsRevealing(false);

    const tzOffset = new Date().getTimezoneOffset();
    fetch('/api/chest/today', {
      credentials: 'include',
      headers: { 'x-timezone-offset': tzOffset.toString() },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch chest state');
        return res.json();
      })
      .then((data) => {
        setChestData(data);
        if (data.status === 'OPENED') {
          setClaimedReward({
            type: data.rewardSnapshotType || 'COINS',
            amount: data.rewardSnapshotAmount || 15,
          });
        }
      })
      .catch((e) => setFetchError(e.message || 'Could not load chest.'));
  }, [isOpen]);

  const handleClose = () => {
    if (isRevealing) return;
    setActiveOverlay(null);
    // Dispatch so MysteryChestCard on home screen stays in sync
    window.dispatchEvent(new Event('focus'));
  };

  const handleOpen = async () => {
    if (isRevealing) return;

    playHaptic('medium');
    setIsRevealing(true);
    setFetchError(null);

    // Squash & stretch tap feedback
    if (chestImgRef.current) {
      gsap.to(chestImgRef.current, {
        scaleX: 1.15,
        scaleY: 0.85,
        duration: 0.12,
        yoyo: true,
        repeat: 1,
      });
    }

    try {
      const tzOffset = new Date().getTimezoneOffset();

      // If chestData.id is missing, refetch /api/chest/today first
      let targetId = chestData?.id;
      if (!targetId) {
        const checkRes = await fetch('/api/chest/today', {
          credentials: 'include',
          headers: { 'x-timezone-offset': tzOffset.toString() },
        });
        if (checkRes.ok) {
          const freshData = await checkRes.json();
          setChestData(freshData);
          targetId = freshData.id;
        }
      }

      if (!targetId) {
        throw new Error('Chest not found');
      }

      const res = await fetch(`/api/chest/${targetId}/open`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'x-timezone-offset': tzOffset.toString() },
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        if (res.status === 409 || errJson.message?.includes('already')) {
          // Chest was already opened — update UI gracefully
          setChestData((prev) => ({ ...prev!, status: 'OPENED' }));
          setClaimedReward({
            type: errJson.rewardSnapshotType || 'COINS',
            amount: errJson.rewardSnapshotAmount || 15,
          });
          setIsRevealing(false);
          return;
        }
        throw new Error(errJson.message || 'Failed to open chest');
      }

      const data = await res.json();
      playRevealSequence(data);
    } catch (err: any) {
      console.error('Error opening chest via Herald:', err);
      setFetchError(err.message || 'Failed to open chest.');
      setIsRevealing(false);
    }
  };

  const playRevealSequence = (data: any) => {
    const rewardType = data.rewardType || 'COINS';
    const rewardAmount = data.rewardAmount || 20;

    if (!chestImgRef.current) {
      setClaimedReward({ type: rewardType, amount: rewardAmount });
      setChestData((prev) => ({ ...prev!, status: 'OPENED' }));
      setIsRevealing(false);
      if (refresh) refresh();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setClaimedReward({ type: rewardType, amount: rewardAmount });
        setChestData((prev) => ({ ...prev!, status: 'OPENED' }));
        setIsRevealing(false);

        const mappedCurrency =
          rewardType === 'GEMS'
            ? 'COINS'
            : (rewardType as RewardCurrency);

        triggerRewardAnimation({
          originElement: chestImgRef.current!,
          rewards: [{ currency: mappedCurrency, amount: rewardAmount }],
        });

        playHaptic('success');
        if (refresh) refresh();
      },
    });

    // 1. Shake
    tl.to(chestImgRef.current, {
      x: () => (Math.random() > 0.5 ? 10 : -10),
      rotation: () => (Math.random() > 0.5 ? 8 : -8),
      duration: 0.08,
      repeat: 6,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // 2. Confetti burst
    tl.add(() => {
      confetti({
        particleCount: data.rarityTier === 'rare' ? 120 : 60,
        spread: 80,
        origin: { y: 0.5 },
        colors:
          data.rarityTier === 'rare'
            ? ['#FFD700', '#9333EA', '#0172FD']
            : ['#0172FD', '#22c55e', '#F59E0B'],
      });
    });

    // 3. Pop open
    tl.to(chestImgRef.current, {
      scale: 1.3,
      duration: 0.28,
      ease: 'back.out(1.8)',
    });

    tl.to(chestImgRef.current, {
      scale: 1,
      duration: 0.2,
    });
  };

  if (!mounted) return null;

  const isReady = chestData?.status === 'READY_TO_OPEN';
  const isAlreadyOpened = chestData?.status === 'OPENED';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.revealBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            className={styles.revealPanel}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          >
            <button
              id="herald-chest-close"
              type="button"
              className={styles.revealCloseBtn}
              onClick={handleClose}
              disabled={isRevealing}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Duolingo Rarity Tier Header (Image 4 style) */}
            <div style={{ marginBottom: 12 }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: '#D97706',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontFamily: 'var(--font-jakarta), sans-serif',
                }}
              >
                COMMON
              </span>
              <div style={{ color: '#F59E0B', fontSize: 14, marginTop: 2 }}>✨</div>
            </div>

            {/* Chest Image */}
            <div
              ref={chestImgRef}
              onClick={handleOpen}
              style={{
                position: 'relative',
                cursor: isReady && !isRevealing ? 'pointer' : 'default',
                margin: '8px 0',
              }}
            >
              <Image
                src="/Tressure box.png"
                alt="Mystery Chest"
                width={160}
                height={150}
                style={{
                  objectFit: 'contain',
                  filter:
                    fetchError || (!isReady && !isAlreadyOpened && !isRevealing)
                      ? 'grayscale(40%) opacity(0.85)'
                      : 'drop-shadow(0 8px 24px rgba(234, 179, 8, 0.35))',
                }}
                priority
              />
            </div>

            {/* Upgrade Arrows Row (Image 4 style) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                margin: '12px 0 14px',
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  backgroundColor: '#F59E0B',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 18,
                  boxShadow: '0 3px 0 #B45309',
                }}
              >
                ↑
              </div>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  backgroundColor: '#E2E8F0',
                  color: '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 18,
                }}
              >
                ↑
              </div>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  backgroundColor: '#E2E8F0',
                  color: '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 18,
                }}
              >
                ↑
              </div>
            </div>

            {/* Content & Action Buttons */}
            {fetchError ? (
              <>
                <p className={styles.revealTitle}>Unable to Open Chest</p>
                <p className={styles.revealSubtitle}>{fetchError}</p>
                <button
                  type="button"
                  onClick={handleOpen}
                  className={styles.revealOpenBtn}
                  style={{ marginTop: 12 }}
                >
                  Try Again 🔄
                </button>
              </>
            ) : !chestData ? (
              <p className={styles.revealSubtitle}>Checking your chest status...</p>
            ) : isAlreadyOpened || claimedReward ? (
              <>
                <p className={styles.revealTitle}>Chest Unlocked! 🎉</p>
                {claimedReward && (
                  <div className={styles.revealRewardPill}>
                    <Image
                      src={
                        claimedReward.type === 'XP'
                          ? '/Icons/gem.png'
                          : '/Icons/Coin.png'
                      }
                      alt={claimedReward.type}
                      width={24}
                      height={24}
                      style={{ objectFit: 'contain' }}
                    />
                    +{claimedReward.amount}{' '}
                    {claimedReward.type.toLowerCase().replace('_', ' ')}
                  </div>
                )}
                <p className={styles.revealSubtitle}>
                  Awesome work! Come back tomorrow for a new Mystery Chest.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className={styles.revealOpenBtn}
                  style={{ marginTop: 12 }}
                >
                  Awesome! 🚀
                </button>
              </>
            ) : isReady || isRevealing ? (
              <>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: '#1E293B',
                    margin: '0 0 16px',
                  }}
                >
                  {isRevealing ? 'Opening Your Chest...' : 'Tap for a chance to upgrade!'}
                </p>

                <button
                  id="herald-chest-open-btn"
                  type="button"
                  onClick={handleOpen}
                  disabled={isRevealing}
                  className={styles.revealOpenBtn}
                >
                  {isRevealing ? 'Opening...' : 'Open Chest 🎉'}
                </button>
              </>
            ) : (
              <>
                <p className={styles.revealTitle}>Chest is Locked 🔒</p>
                <p className={styles.revealSubtitle}>
                  Complete 1 lesson today to unlock your Mystery Chest!
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className={styles.revealOpenBtn}
                  style={{ marginTop: 12 }}
                >
                  Got It! 🚀
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
