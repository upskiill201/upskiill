'use client';

/**
 * HeraldSpinReveal
 *
 * A router-independent portal overlay for the Weekly Lucky Spin.
 * Reuses the same wheel GSAP logic and CSS from WeeklyLuckySpinCard,
 * but mounted via createPortal so the underlying page is never routed
 * away from (§5 of the Herald spec).
 *
 * Entry point: HeraldContext.activeOverlay === 'SPIN'
 * Exit: overlay unmounts → student is back exactly where they were.
 */

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';
import { useHerald } from '@/context/HeraldContext';
import { useRewardAnimation, RewardCurrency } from '@/context/RewardAnimationContext';
import { useGamification } from '@/context/GamificationContext';
import { playHaptic } from '@/lib/haptics';
import { playTickSound, playWinSound } from '@/utils/audio';
import styles from '../dashboard/v2/WeeklyLuckySpin.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
}

export default function HeraldSpinReveal() {
  const { activeOverlay, setActiveOverlay } = useHerald();
  const { triggerRewardAnimation } = useRewardAnimation();
  const { refresh } = useGamification();

  const [mounted, setMounted] = useState(false);
  const [spinState, setSpinState] = useState<'LOADING' | 'AVAILABLE' | 'SPUN'>('LOADING');
  const [wheelConfig, setWheelConfig] = useState<any[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeMessage, setPrizeMessage] = useState<string | null>(null);

  const wheelRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const currentRotationRef = useRef(0);
  const lastTickAngleRef = useRef(0);

  const isOpen = activeOverlay === 'SPIN';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch spin state + wheel config when the overlay opens
  useEffect(() => {
    if (!isOpen) return;

    setSpinState('LOADING');
    setPrizeMessage(null);
    setIsSpinning(false);

    Promise.all([
      fetch('/api/v2/spin/current-week', { credentials: 'include' }).then((r) =>
        r.ok ? r.json() : null
      ),
      fetch('/api/v2/spin/wheel-config', { credentials: 'include' }).then((r) =>
        r.ok ? r.json() : null
      ),
    ])
      .then(([statusData, configData]) => {
        if (statusData && statusData.status) {
          setSpinState(statusData.status);
          if (statusData.status === 'SPUN') {
            setPrizeMessage(
              `🎉 YOU WON ${statusData.rewardSnapshotAmount} ${statusData.rewardSnapshotType}!`
            );
          }
        }
        if (Array.isArray(configData) && configData.length > 0) {
          setWheelConfig(configData);
        }
      })
      .catch(() => {
        setSpinState('AVAILABLE'); // Fallback
      });
  }, [isOpen]);

  const totalSegments = wheelConfig.length || 8;
  const degreesPerSegment = 360 / totalSegments;

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
    playHaptic('medium');
    setIsSpinning(true);

    try {
      const response = await fetch('/api/v2/spin/spin', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Spin failed');

      const { landedSegmentIndex, rewardSnapshotType, rewardSnapshotAmount } = data;

      const segmentCenter =
        landedSegmentIndex * degreesPerSegment + degreesPerSegment / 2;
      const jitter = (Math.random() - 0.5) * (degreesPerSegment * 0.6);
      const targetAngle = 360 - (segmentCenter + jitter);

      const fullRotations = 5 * 360;
      const finalRotation =
        currentRotationRef.current +
        fullRotations +
        targetAngle -
        (currentRotationRef.current % 360);

      lastTickAngleRef.current = currentRotationRef.current;

      gsap.to(wheelRef.current, {
        rotation: finalRotation,
        duration: 5,
        ease: CustomEase.create('spinEase', 'M0,0 C0.15,0 0.2,0.85 1,1'),
        onUpdate: function () {
          if (!wheelRef.current) return;
          const currentAngle = gsap.getProperty(
            wheelRef.current,
            'rotation'
          ) as number;
          currentRotationRef.current = currentAngle;

          const segmentsPassed = Math.floor(currentAngle / degreesPerSegment);
          const lastSegmentsPassed = Math.floor(
            lastTickAngleRef.current / degreesPerSegment
          );
          if (segmentsPassed > lastSegmentsPassed) {
            playTickSound();
            if (pointerRef.current) {
              gsap.fromTo(
                pointerRef.current,
                { rotation: -15 },
                { rotation: 0, duration: 0.1, ease: 'back.out(2)' }
              );
            }
          }
          lastTickAngleRef.current = currentAngle;
        },
        onComplete: () => {
          gsap.to(wheelRef.current, {
            rotation: finalRotation - 2,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            onComplete: async () => {
              setIsSpinning(false);
              setSpinState('SPUN');
              setPrizeMessage(
                `🎉 YOU WON ${rewardSnapshotAmount} ${rewardSnapshotType}!`
              );
              playHaptic('success');
              const mappedCurrency =
                rewardSnapshotType === 'GEMS'
                  ? 'COINS'
                  : (rewardSnapshotType as RewardCurrency);
              triggerRewardAnimation({
                originElement: wheelRef.current,
                rewards: [{ currency: mappedCurrency, amount: rewardSnapshotAmount }],
              });
              if (refresh) await refresh();
              // Let the spin card on home screen know to update
              window.dispatchEvent(new Event('focus'));
            },
          });
        },
      });
    } catch (err) {
      console.error(err);
      setIsSpinning(false);
    }
  };

  const handleClose = () => {
    if (isSpinning) return;
    setActiveOverlay(null);
  };

  if (!mounted) return null;

  const isAvailable = spinState === 'AVAILABLE';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalBackdrop}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ zIndex: 99850 }}
        >
          {/* Close button — hidden while spinning */}
          {!isSpinning && (
            <button
              id="herald-spin-close"
              className={styles.closeBtn}
              onClick={handleClose}
              aria-label="Close spin"
            >
              ✕
            </button>
          )}

          <h2 className={styles.modalTitle}>Weekly Lucky Spin</h2>
          <p className={styles.modalDesc}>
            {spinState === 'SPUN'
              ? 'Come back next week for another spin!'
              : spinState === 'LOADING'
                ? 'Loading your wheel...'
                : 'Tap the button to reveal your mystery prize.'}
          </p>

          {/* Wheel */}
          <div className={styles.bigWheelContainer}>
            <div className={styles.wheelStage}>
              <div
                className={isSpinning ? styles.chaseLightsActive : styles.chaseLights}
              />
              <div ref={pointerRef} className={styles.wheelPointer} />
              <div
                ref={wheelRef}
                className={styles.bigWheel}
                style={{ background: wheelGradient }}
              >
                {wheelConfig.map((seg, i) => {
                  const angle =
                    i * degreesPerSegment + degreesPerSegment / 2;
                  return (
                    <div
                      key={seg.id}
                      className={styles.segmentLabel}
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <span className={styles.segmentText}>
                        {seg.rewardType === 'STREAK_FREEZE'
                          ? '❄️'
                          : seg.amountMax}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className={styles.centerHub} />
            </div>
          </div>

          {/* Prize reveal */}
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

          {/* CTA */}
          <button
            id="herald-spin-cta"
            type="button"
            onClick={
              spinState === 'SPUN' ? handleClose : handleStartSpin
            }
            disabled={isSpinning || spinState === 'LOADING'}
            className={
              isSpinning || spinState === 'LOADING'
                ? styles.spinActionBtnDisabled
                : styles.spinActionBtn
            }
          >
            {isSpinning
              ? 'SPINNING...'
              : spinState === 'SPUN'
                ? 'DONE'
                : spinState === 'LOADING'
                  ? 'LOADING...'
                  : 'SPIN'}
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
