'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WeeklyLuckySpin.module.css';
import { useGamification } from '@/context/GamificationContext';
import { useCelebration } from '@/context/CelebrationContext';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { currencyDisplayName, toCelebrationCurrency } from '@/components/celebration/currency';
import { useHerald } from '@/context/HeraldContext';
import { playHaptic } from '@/lib/haptics';
import { playTickSound, playWinSound } from '@/utils/audio';
import { pickSpinPrizeMessage } from '@/lib/tey/spinVoice';

// PERF: GSAP (+ the CustomEase plugin) is ~70KB and is used by exactly one
// interaction in this file — the wheel spin. This card is statically imported
// by RightSidebar, which is rendered on BOTH /dashboard and /learn, so a
// top-level import put GSAP in the initial bundle of the two hottest routes in
// the app for every learner, whether or not they ever spun the wheel.
//
// HeraldSpinReveal has the same static import but does not pay this cost,
// because that whole component is loaded via next/dynamic. This card renders
// eagerly, so the split has to happen at the import instead. Loading on click
// keeps the card render byte-identical.
type GsapModule = {
  gsap: typeof import('gsap').default;
  CustomEase: typeof import('gsap/dist/CustomEase').CustomEase;
};

let gsapModulePromise: Promise<GsapModule> | null = null;

function loadGsap(): Promise<GsapModule> {
  if (!gsapModulePromise) {
    gsapModulePromise = Promise.all([
      import('gsap'),
      import('gsap/dist/CustomEase'),
    ]).then(([gsapMod, easeMod]) => {
      const gsap = gsapMod.default;
      gsap.registerPlugin(easeMod.CustomEase);
      return { gsap, CustomEase: easeMod.CustomEase };
    });
  }
  return gsapModulePromise;
}

const DEFAULT_WHEEL_CONFIG = [
  { id: 'seg-0', segmentIndex: 0, rewardType: 'COINS', amountMin: 50, amountMax: 50, rarityTier: 'common', weight: 30, colorKey: '#3B82F6' },
  { id: 'seg-1', segmentIndex: 1, rewardType: 'XP', amountMin: 20, amountMax: 20, rarityTier: 'common', weight: 20, colorKey: '#EC4899' },
  { id: 'seg-2', segmentIndex: 2, rewardType: 'COINS', amountMin: 100, amountMax: 100, rarityTier: 'uncommon', weight: 15, colorKey: '#EAB308' },
  { id: 'seg-3', segmentIndex: 3, rewardType: 'HEARTS', amountMin: 1, amountMax: 1, rarityTier: 'common', weight: 15, colorKey: '#22C55E' },
  { id: 'seg-4', segmentIndex: 4, rewardType: 'XP', amountMin: 50, amountMax: 50, rarityTier: 'uncommon', weight: 10, colorKey: '#A855F7' },
  { id: 'seg-5', segmentIndex: 5, rewardType: 'COINS', amountMin: 200, amountMax: 200, rarityTier: 'rare', weight: 4, colorKey: '#EF4444' },
  { id: 'seg-6', segmentIndex: 6, rewardType: 'XP', amountMin: 100, amountMax: 100, rarityTier: 'rare', weight: 5, colorKey: '#3B82F6' },
  { id: 'seg-7', segmentIndex: 7, rewardType: 'STREAK_FREEZE', amountMin: 1, amountMax: 1, rarityTier: 'rare', weight: 1, colorKey: '#EAB308' },
];

export default function WeeklyLuckySpinCard() {
  const { refresh } = useGamification();
  const { celebrate } = useCelebration();
  const { enqueueHeraldNotification, registerNativeWidget, unregisterNativeWidget } = useHerald();
  const [showModal, setShowModal] = useState(false);
  const [spinState, setSpinState] = useState<'LOADING' | 'AVAILABLE' | 'SPUN'>('AVAILABLE');
  const [wheelConfig, setWheelConfig] = useState<any[]>(DEFAULT_WHEEL_CONFIG);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeMessage, setPrizeMessage] = useState<string | null>(null);

  const wheelRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const currentRotationRef = useRef(0);
  const lastTickAngleRef = useRef(0);

  // Register this widget as visible — Herald suppresses its spin banner when this card is on screen
  useEffect(() => {
    registerNativeWidget('weekly-spin');
    return () => unregisterNativeWidget('weekly-spin');
  }, [registerNativeWidget, unregisterNativeWidget]);

  // Fetch initial state + emit Herald signal if spin is available
  useEffect(() => {
    fetch('/api/v2/spin/current-week', {
      credentials: 'include',
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && data.status) {
          setSpinState(data.status);
          if (data.status === 'SPUN') {
            setPrizeMessage(
              pickSpinPrizeMessage(data.rewardSnapshotAmount, currencyDisplayName(data.rewardSnapshotType))
            );
          }
          // Herald signal: weekly spin is available
          if (data.status === 'AVAILABLE') {
            // Dedup key: week number so it only fires once per week boundary per session
            const now = new Date();
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - now.getDay());
            weekStart.setHours(0, 0, 0, 0);
            const transitionKey = `spin-available-${weekStart.getTime()}`;
            enqueueHeraldNotification({
              id: `herald-spin-${Date.now()}`,
              type: 'SPIN',
              entityId: 'weekly-spin',
              transitionKey,
              title: 'Weekly Lucky Spin',
              subtitle: "Your weekly spin is ready — don't miss it!",
            });
          }
        }
      })
      .catch(() => {
        setSpinState('AVAILABLE'); // Fallback to let them click and see any error if backend is down
      });

    fetch('/api/v2/spin/wheel-config', {
      credentials: 'include',
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setWheelConfig(data);
        }
      })
      .catch(() => {
        // Keep DEFAULT_WHEEL_CONFIG
      });
  }, [enqueueHeraldNotification]);

  const totalSegments = wheelConfig.length || 8;
  const degreesPerSegment = 360 / totalSegments;

  // Build the conic gradient for the wheel
  const wheelGradient = useMemo(() => {
    if (wheelConfig.length === 0) return 'conic-gradient(#3B82F6 0deg 360deg)';
    let gradientStops = '';
    let currentAngle = 0;
    
    wheelConfig.forEach((seg, i) => {
      const nextAngle = currentAngle + degreesPerSegment;
      gradientStops += `${seg.colorKey} ${currentAngle}deg ${nextAngle}deg${i < wheelConfig.length - 1 ? ',' : ''}`;
      currentAngle = nextAngle;
    });

    return `conic-gradient(${gradientStops})`;
  }, [wheelConfig, degreesPerSegment]);

  const handleStartSpin = async () => {
    if (isSpinning || spinState === 'SPUN' || wheelConfig.length === 0) return;
    setIsSpinning(true);

    try {
      // 1. Fetch outcome
       const response = await fetch('/api/v2/spin/spin', {
         method: 'POST',
         credentials: 'include',
       });
       const data = await response.json();
       
       if (!response.ok) {
         throw new Error(data.message || 'Spin failed');
       }

      const { landedSegmentIndex, rewardSnapshotType, rewardSnapshotAmount } = data;
      const landedRarityTier: string | undefined = wheelConfig[landedSegmentIndex]?.rarityTier;

      // 2. Compute Target Angle
      // The segment index starts from 0 at the 12 o'clock position (0 deg) and goes clockwise.
      // We want the wheel to land so that the winning segment is under the pointer (at 0 deg).
      // Since the wheel rotates, if we want segment N to be at top, we rotate by (360 - N*degreesPerSegment).
      
      const segmentCenter = (landedSegmentIndex * degreesPerSegment) + (degreesPerSegment / 2);
      // Random jitter within the segment (avoid exact center)
      const jitter = (Math.random() - 0.5) * (degreesPerSegment * 0.6);
      const targetAngle = 360 - (segmentCenter + jitter);
      
      // Add multiple full rotations
      const fullRotations = 5 * 360; 
      const finalRotation = currentRotationRef.current + fullRotations + targetAngle - (currentRotationRef.current % 360);
      
      // 3. Animate using GSAP
      lastTickAngleRef.current = currentRotationRef.current;

      // Resolved on first spin, then cached by loadGsap() for the session.
      const { gsap, CustomEase } = await loadGsap();
      
      gsap.to(wheelRef.current, {
        rotation: finalRotation,
        duration: 5,
        ease: CustomEase.create("spinEase", "M0,0 C0.15,0 0.2,0.85 1,1"),
        onUpdate: function() {
          if (!wheelRef.current) return;
          const currentAngle = gsap.getProperty(wheelRef.current, "rotation") as number;
          currentRotationRef.current = currentAngle;
          
          // Check for ticks
          const segmentsPassed = Math.floor(currentAngle / degreesPerSegment);
          const lastSegmentsPassed = Math.floor(lastTickAngleRef.current / degreesPerSegment);
          
          if (segmentsPassed > lastSegmentsPassed) {
            playTickSound();
            // Flap animation
            if (pointerRef.current) {
               gsap.fromTo(pointerRef.current, 
                 { rotation: -15 }, 
                 { rotation: 0, duration: 0.1, ease: "back.out(2)" }
               );
            }
          }
          lastTickAngleRef.current = currentAngle;
        },
        onComplete: () => {
          // Overshoot and settle bounce
          gsap.to(wheelRef.current, {
             rotation: finalRotation - 2,
             duration: 0.2,
             yoyo: true,
             repeat: 1,
               onComplete: async () => {
                 setIsSpinning(false);
                 setSpinState('SPUN');
                 const prizeName = currencyDisplayName(rewardSnapshotType);
                 setPrizeMessage(pickSpinPrizeMessage(rewardSnapshotAmount, prizeName, landedRarityTier));
                 playWinSound();
                 playHaptic('success');
                 // The spin was persisted server-first (POST /spin/spin) — the
                 // full-page CLAIM scene now choreographs the payout reveal.
                 const scene: CelebrationScene = {
                   kind: 'CLAIM',
                   title: `+${rewardSnapshotAmount} ${prizeName}`,
                   subtitle: 'Lucky Spin winnings!',
                   rewards: [
                     {
                       currency: toCelebrationCurrency(rewardSnapshotType),
                       amount: rewardSnapshotAmount,
                     },
                   ],
                   onComplete: () => void refresh(),
                 };
                 celebrate(scene);
                 // Let the spin card on home screen know to update
                 window.dispatchEvent(new Event('focus'));
               }
          });
        }
      });

    } catch (err) {
      console.error(err);
      setIsSpinning(false);
      // Reset if network failed
    }
  };

  const isAvailable = spinState === 'AVAILABLE';

  return (
    <>
      <div className={styles.card} onClick={() => {
        if (spinState !== 'LOADING') setShowModal(true);
      }}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>WEEKLY LUCKY SPIN</h3>
          <span className={styles.timer}>Available this week!</span>
        </div>

        <div className={styles.wheelPreviewStage}>
          <div className={styles.wheelPreview} style={{ background: wheelGradient }}>
            <div className={styles.centerPin} />
          </div>
        </div>

        <button
          type="button"
          className={styles.spinBtn}
          disabled={spinState === 'LOADING'}
        >
          {spinState === 'LOADING' ? 'LOADING...' : (isAvailable ? 'SPIN NOW 🎉' : 'ALREADY SPUN')}
        </button>
      </div>

      {/* FULL-SCREEN LUCKY SPIN ROUTE/MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalBackdrop}
          >
            {/* Close Button (Hidden/Disabled while spinning) */}
            {!isSpinning && (
              <button 
                className={styles.closeBtn} 
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            )}

            <h2 className={styles.modalTitle}>Weekly Lucky Spin</h2>
            <p className={styles.modalDesc}>
              {spinState === 'SPUN' ? 'Come back next week for another spin!' : 'Tap the button to reveal your mystery prize.'}
            </p>

            <div className={styles.bigWheelContainer}>
              <div className={styles.wheelStage}>
                <div className={isSpinning ? styles.chaseLightsActive : styles.chaseLights} />
                <div ref={pointerRef} className={styles.wheelPointer} />
                <div
                  ref={wheelRef}
                  className={styles.bigWheel}
                  style={{ background: wheelGradient }}
                >
                  {/* Render segments text inside wheel */}
                  {wheelConfig.map((seg, i) => {
                     const angle = (i * degreesPerSegment) + (degreesPerSegment / 2);
                     return (
                       <div 
                         key={seg.id} 
                         className={styles.segmentLabel}
                         style={{ transform: `rotate(${angle}deg)` }}
                       >
                         <span className={styles.segmentText}>{seg.rewardType === 'STREAK_FREEZE' ? '❄️' : seg.amountMax}</span>
                       </div>
                     )
                  })}
                </div>
                <div className={styles.centerHub} />
              </div>
            </div>

            <div className={styles.prizeContainer}>
              <AnimatePresence>
                {prizeMessage && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={styles.prizeMessage}
                  >
                    {prizeMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={spinState === 'SPUN' ? () => setShowModal(false) : handleStartSpin}
              disabled={isSpinning}
              className={isSpinning ? styles.spinActionBtnDisabled : styles.spinActionBtn}
            >
              {isSpinning ? 'SPINNING...' : (spinState === 'SPUN' ? 'DONE' : 'SPIN')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
