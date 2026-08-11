'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGamification } from '@/context/GamificationContext';
import { useRewardAnimation, RewardCurrency } from '@/context/RewardAnimationContext';
import { useHerald } from '@/context/HeraldContext';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import styles from './MysteryChestCard.module.css';
import { GamificationIcon } from '@/components/ui/GamificationIcon';

export default function MysteryChestCard() {
  const { refresh } = useGamification();
  const { triggerRewardAnimation } = useRewardAnimation();
  const { enqueueHeraldNotification, registerNativeWidget, unregisterNativeWidget } = useHerald();
  
  const [chestState, setChestState] = useState<{status: string, chestId?: string}>({ status: 'LOCKED' });
  const [claimedReward, setClaimedReward] = useState<any>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  
  const chestRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Register this widget as visible — Herald suppresses its chest banner when this card is on screen
  useEffect(() => {
    registerNativeWidget('mystery-chest');
    return () => unregisterNativeWidget('mystery-chest');
  }, [registerNativeWidget, unregisterNativeWidget]);

  const fetchChestStatus = async () => {
    try {
      const tzOffset = new Date().getTimezoneOffset();
      const res = await fetch(`/api/chest/today`, {
        credentials: 'include',
        headers: {
          'x-timezone-offset': tzOffset.toString()
        }
      });
      if (res.ok) {
        const data = await res.json();
        setChestState({ status: data.status, chestId: data.id });
        if (data.status === 'OPENED') {
           setClaimedReward({
             type: data.rewardSnapshotType,
             amount: data.rewardSnapshotAmount
           });
        }
        // Herald signal: chest just became openable
        if (data.status === 'READY_TO_OPEN' && data.id) {
          const transitionKey = `chest-${data.id}-${Math.floor((data.unlockedAt ? new Date(data.unlockedAt).getTime() : Date.now()) / 60000)}`;
          enqueueHeraldNotification({
            id: `herald-chest-${data.id}-${Date.now()}`,
            type: 'CHEST',
            entityId: data.id,
            transitionKey,
            title: 'Mystery Chest',
            subtitle: 'Your daily loot is ready to open!',
            chestId: data.id,
          });
        }
      }
    } catch (e) {
      console.error('Failed to fetch chest status', e);
    }
  };

  useEffect(() => {
    fetchChestStatus();
    
    const handleFocus = () => fetchChestStatus();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleClaim = async () => {
    if (chestState.status !== 'READY_TO_OPEN' || isRevealing || !chestState.chestId) return;
    
    // Optimistic / tap feedback (squash & stretch)
    if (chestRef.current) {
      gsap.to(chestRef.current, {
        scaleX: 1.1,
        scaleY: 0.9,
        duration: 0.12,
        yoyo: true,
        repeat: 1
      });
    }

    try {
      const tzOffset = new Date().getTimezoneOffset();
      const res = await fetch(`/api/chest/${chestState.chestId}/open`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'x-timezone-offset': tzOffset.toString()
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to open chest');
      }

      const data = await res.json();
      setIsRevealing(true);
      
      // Reveal Animation Sequence
      playRevealAnimation(data);
      
    } catch (error) {
      console.error(error);
      fetchChestStatus(); // Re-sync on failure
    }
  };

  const playRevealAnimation = (data: any) => {
    if (!chestRef.current || !containerRef.current) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        setChestState({ status: 'OPENED' });
        setClaimedReward({ type: data.rewardType, amount: data.rewardAmount });
        setIsRevealing(false);
        const mappedCurrency = data.rewardType === 'GEMS' ? 'COINS' : (data.rewardType as RewardCurrency);
        triggerRewardAnimation({
          originElement: chestRef.current,
          rewards: [{ currency: mappedCurrency, amount: data.rewardAmount }],
        });
        if (refresh) refresh();
      }
    });

    // 1. Shake
    tl.to(chestRef.current, {
      x: () => (Math.random() > 0.5 ? 5 : -5),
      rotation: () => (Math.random() > 0.5 ? 5 : -5),
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: "power1.inOut"
    });

    // 2. Crack / Flash
    tl.add(() => {
      confetti({
        particleCount: data.rarityTier === 'rare' ? 100 : 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: data.rarityTier === 'rare' ? ['#FFD700', '#9333EA'] : ['#FFFFFF']
      });
    });

    // 3. Open (squash and jump slightly, simulating lid open since it's a single image for now)
    tl.to(chestRef.current, {
      scale: 1.2,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
    
    tl.to(chestRef.current, {
      scale: 1,
      duration: 0.2
    });
  };

  const isUnlocked = chestState.status === 'READY_TO_OPEN';
  const isOpened = chestState.status === 'OPENED';

  return (
    <div className={`${styles.card} ${isUnlocked && !isRevealing ? styles.cardReady : ''}`} ref={containerRef}>
      <div className={styles.leftCol}>
        <span className={styles.header}>MYSTERY CHEST</span>

        <p className={styles.description}>
          {isOpened
            ? "You unlocked today's chest reward!"
            : isUnlocked
              ? 'Your Mystery Chest is ready to claim!'
              : 'Complete 1 more lesson to unlock your chest!'}
        </p>

        <div className={styles.progressContainer}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: isUnlocked || isOpened ? '100%' : '0%' }} />
          </div>
          <span className={styles.progressText}>{isUnlocked || isOpened ? '1 / 1 Lesson' : '0 / 1 Lesson'}</span>
        </div>

        {isUnlocked && !isRevealing && (
          <button type="button" onClick={handleClaim} className={styles.claimBtn}>
            CLAIM CHEST 🎉
          </button>
        )}
        
        {isRevealing && (
          <button type="button" disabled className={styles.claimBtnDisabled}>
            OPENING...
          </button>
        )}

        {isOpened && claimedReward && (
          <div className={styles.rewardPill}>
            <span>🎉 You earned +{claimedReward.amount} </span>
            <span style={{ textTransform: 'capitalize' }}>
              {claimedReward.type.toLowerCase().replace('_', ' ')}!
            </span>
          </div>
        )}
      </div>

      <div className={styles.chestContainer} ref={chestRef} style={{ filter: chestState.status === 'LOCKED' ? 'grayscale(80%)' : 'none' }}>
        <motion.div
          animate={isUnlocked && !isRevealing ? { y: [0, -4, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/Tressure box.png"
            alt="Mystery Chest"
            width={90}
            height={80}
            className={styles.chestImage}
          />
        </motion.div>
      </div>
    </div>
  );
}
