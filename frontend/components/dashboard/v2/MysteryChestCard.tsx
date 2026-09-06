'use client';

import React, { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { useCelebration } from '@/context/CelebrationContext';
import { useHerald } from '@/context/HeraldContext';
import { playHaptic } from '@/lib/haptics';
import { fetcher } from '@/lib/swr';
import styles from './MysteryChestCard.module.css';

interface ChestToday {
  status: string;
  id?: string;
}

export default function MysteryChestCard() {
  const { refresh } = useGamification();
  const { celebrate } = useCelebration();
  const { registerNativeWidget, unregisterNativeWidget } = useHerald();

  // Shared '/api/chest/today' key — HeraldContext polls the same endpoint
  // for its claimables sweep, so this dedupes into one request instead of two.
  const { data, mutate: refetchChest } = useSWR<ChestToday>('/api/chest/today', fetcher);
  const [localOverride, setLocalOverride] = useState<{ status: string; chestId?: string } | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const chestRef = useRef<HTMLDivElement>(null);
  // SWR's localStorage-seeded cache (lib/swr.ts) can populate `data` with a
  // stale chest status on the very first client render, before hydration —
  // while the server always renders the LOCKED default. Gating on `mounted`
  // keeps the first client render identical to SSR; real status swaps in a
  // tick later, same as any client-only value.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Mount flag defers client-only cache data past the first (SSR-matching) render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const chestState = localOverride ?? { status: mounted ? data?.status ?? 'LOCKED' : 'LOCKED', chestId: mounted ? data?.id : undefined };

  useEffect(() => {
    registerNativeWidget('mystery-chest');
    return () => unregisterNativeWidget('mystery-chest');
  }, [registerNativeWidget, unregisterNativeWidget]);

  // Full-page Celebration Engine reveal — the scene opens the chest
  // server-first and choreographs shake → beam → reward pile.
  const handleClaim = () => {
    if (chestState.status !== 'READY_TO_OPEN' || isRevealing || !chestState.chestId) return;
    playHaptic('medium');
    setIsRevealing(true);
    celebrate({
      kind: 'CHEST',
      chestId: chestState.chestId,
      onComplete: () => {
        setLocalOverride({ status: 'OPENED' });
        setIsRevealing(false);
        void refresh();
        void refetchChest();
      },
    });
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
            src="/Tressure box.webp"
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
