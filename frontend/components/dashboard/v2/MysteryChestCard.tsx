'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { useRewardAnimation, RewardCurrency } from '@/context/RewardAnimationContext';
import { useHerald } from '@/context/HeraldContext';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import styles from './MysteryChestCard.module.css';

export default function MysteryChestCard() {
  const { refresh } = useGamification();
  const { triggerRewardAnimation } = useRewardAnimation();
  const { registerNativeWidget, unregisterNativeWidget } = useHerald();

  const [chestState, setChestState] = useState<{ status: string; chestId?: string }>({ status: 'LOCKED' });
  const [isRevealing, setIsRevealing] = useState(false);
  const chestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerNativeWidget('mystery-chest');
    return () => unregisterNativeWidget('mystery-chest');
  }, [registerNativeWidget, unregisterNativeWidget]);

  const fetchChestStatus = async () => {
    try {
      const tzOffset = new Date().getTimezoneOffset();
      const res = await fetch(`/api/chest/today`, {
        credentials: 'include',
        headers: { 'x-timezone-offset': tzOffset.toString() },
      });
      if (res.ok) {
        const data = await res.json();
        setChestState({ status: data.status, chestId: data.id });
      }
    } catch (e) {
      console.error('Failed to fetch chest status', e);
    }
  };

  useEffect(() => {
    fetchChestStatus();
  }, []);

  const handleClaim = async () => {
    if (chestState.status !== 'READY_TO_OPEN' || isRevealing || !chestState.chestId) return;

    try {
      const tzOffset = new Date().getTimezoneOffset();
      const res = await fetch(`/api/chest/${chestState.chestId}/open`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'x-timezone-offset': tzOffset.toString() },
      });

      if (!res.ok) throw new Error('Failed to open chest');

      const data = await res.json();
      setIsRevealing(true);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFD700', '#9333EA', '#FFFFFF'],
      });

      setTimeout(() => {
        setChestState({ status: 'OPENED' });
        setIsRevealing(false);
        const mappedCurrency = data.rewardType === 'GEMS' ? 'COINS' : (data.rewardType as RewardCurrency);
        triggerRewardAnimation({
          originElement: chestRef.current,
          rewards: [{ currency: mappedCurrency, amount: data.rewardAmount }],
        });
        if (refresh) refresh();
      }, 600);
    } catch (error) {
      console.error(error);
      fetchChestStatus();
    }
  };

  const isUnlocked = chestState.status === 'READY_TO_OPEN';
  const isOpened = chestState.status === 'OPENED';
  const currentQuests = isOpened ? 10 : isUnlocked ? 10 : 8;
  const totalQuests = 10;
  const filledSegments = Math.min(5, Math.floor((currentQuests / totalQuests) * 5));

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <span className={styles.headerTitle}>MYSTERY CHEST</span>
        <Info size={15} className={styles.infoIcon} />
      </div>

      <div className={styles.chestCenter} ref={chestRef}>
        <motion.div
          animate={isUnlocked ? { y: [0, -5, 0] } : { y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/Tressure box.png"
            alt="Mystery Chest"
            width={110}
            height={90}
            className={styles.chestImage}
            priority
          />
        </motion.div>
      </div>

      <div className={styles.bottomInfo}>
        <div className={styles.statusRow}>
          <span className={styles.largeFraction}>{currentQuests} / {totalQuests}</span>
          <span className={styles.statusText}>
            {isOpened
              ? "Chest unlocked today! Great job!"
              : isUnlocked
              ? "Chest ready! Tap to claim your loot!"
              : `Complete ${totalQuests - currentQuests} more quests to unlock your chest!`}
          </span>
        </div>

        {/* 5-Segment Loot Bar */}
        <div className={styles.segmentsTrack}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className={`${styles.segment} ${idx < filledSegments ? styles.segmentFilled : ''}`}
            />
          ))}
        </div>

        {isUnlocked && !isRevealing && (
          <button type="button" onClick={handleClaim} className={styles.claimBtn}>
            OPEN CHEST 🎁
          </button>
        )}
      </div>
    </div>
  );
}
