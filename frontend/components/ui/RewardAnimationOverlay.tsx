'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRewardAnimation, useRewardAnimationVisuals, FlyingParticle } from '@/context/RewardAnimationContext';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';

/**
 * Continuous Temple Run-Style Flying Particle with Realistic Pile Pop & Delay.
 * 1. Pops up into a glorious 3D physical pile at the origin.
 * 2. Lingers in the settled pile for ~300ms so the user admires the reward mound.
 * 3. Launches in an accelerated continuous stream straight into the target stat pill.
 */
function SingleFlyingParticle({ particle }: { particle: FlyingParticle }) {
  const { removeParticle } = useRewardAnimation();
  const hasTriggeredRef = useRef(false);

  const originX = particle.startX - 18;
  const originY = particle.startY - 18;
  const pileX = originX + particle.burstX;
  const pileY = originY + particle.burstY;

  const targetX = particle.endX - 18;
  const targetY = particle.endY - 18;

  // High-arc crest above pile & destination
  const arcCrestY = Math.min(pileY, targetY) - 45 - Math.random() * 25;
  const arcCrestX = (pileX + targetX) / 2 + (Math.random() - 0.5) * 30;

  const trailColor =
    particle.currency === 'COINS'
      ? 'var(--warning)'
      : particle.currency === 'XP'
      ? 'var(--color-brand)'
      : particle.currency === 'HEARTS'
      ? 'var(--error-red)'
      : 'var(--warning)';

  const glowShadow =
    particle.currency === 'COINS'
      ? 'drop-shadow(0 4px 14px rgba(234,179,8,0.8))'
      : particle.currency === 'XP'
      ? 'drop-shadow(0 4px 14px rgba(1,114,253,0.7))'
      : particle.currency === 'HEARTS'
      ? 'drop-shadow(0 4px 14px rgba(239,68,68,0.75))'
      : 'drop-shadow(0 4px 14px rgba(249,115,22,0.75))';

  const handleComplete = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    playSound('collect', particle.particleIndexInSet);
    playHaptic('soft', false);

    removeParticle(
      particle.id,
      particle.targetPillId,
      particle.amountPerParticle,
      particle.isFinalParticle,
      particle.particleIndexInSet,
      particle.endX,
      particle.endY,
      particle.currency
    );
  };

  return (
    <motion.div
      key={particle.id}
      initial={{
        x: originX,
        y: originY,
        scale: 0.2,
        opacity: 0,
        rotateY: 0,
        rotateZ: 0,
      }}
      animate={{
        // Phase 1 (0->0.18): Pop up into pile | Phase 2 (0.18->0.42): Linger in pile | Phase 3 (0.42->1): Launch to target
        x: [originX, pileX, pileX, arcCrestX, targetX],
        y: [originY, pileY, pileY, arcCrestY, targetY],
        scale: [0.2, 1.45, 1.25, 1.05, 0.8],
        opacity: [0, 1, 1, 1, 1],
        rotateY: particle.currency === 'COINS' ? [0, 90, 90, 450, 720] : [0, 0, 0, 0, 0],
        rotateZ: particle.currency === 'COINS' ? [0, -12, -12, 15, 0] : [0, -8, -8, 8, 0],
      }}
      transition={{
        duration: particle.durationMs / 1000,
        delay: particle.delayMs / 1000,
        times: [0, 0.18, 0.42, 0.72, 1],
        ease: ['easeOut', 'easeInOut', 'easeInOut', [0.47, 0, 0.745, 0.715]],
      }}
      onAnimationComplete={handleComplete}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 36,
        height: 36,
        pointerEvents: 'none',
        zIndex: 100050,
        filter: glowShadow,
        willChange: 'transform',
      }}
    >
      {/* Sparkling Stardust Flight Trail */}
      <motion.div
        animate={{
          opacity: [0, 0.9, 0],
          scale: [0.4, 1.2, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.25,
          ease: 'easeOut',
        }}
        style={{
          position: 'absolute',
          bottom: -2,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 9,
          height: 9,
          borderRadius: '50%',
          backgroundColor: trailColor,
          boxShadow: `0 0 12px ${trailColor}, 0 0 4px var(--bg-page)`,
        }}
      />

      <Image
        src={particle.iconSrc}
        alt={particle.currency}
        width={36}
        height={36}
        style={{ objectFit: 'contain' }}
        priority
      />
    </motion.div>
  );
}

export default function RewardAnimationOverlay() {
  // Subscribes to the fast-changing visual context. This is the ONLY component
  // that should — see RewardAnimationVisualsValue for why.
  const { particles, shockwaves, floatingTexts } = useRewardAnimationVisuals();

  return (
    <>
      <div
        id="reward-animation-portal"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 100050,
        }}
      >
        <AnimatePresence>
          {shockwaves.map((sw) => (
            <motion.div
              key={sw.id}
              initial={{
                x: sw.x - 45,
                y: sw.y - 45,
                scale: 0.1,
                opacity: 1,
              }}
              animate={{
                scale: sw.type === 'flash' ? [0.2, 2.4, 0] : [0.1, 3.8],
                opacity: [1, 0.85, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: 90,
                height: 90,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 100049,
                background:
                  sw.type === 'flash'
                    ? `radial-gradient(circle, ${sw.color} 0%, rgba(255,255,255,0.95) 35%, transparent 75%)`
                    : 'transparent',
                border: sw.type === 'ring' ? `4px solid ${sw.color}` : 'none',
                boxShadow:
                  sw.type === 'ring'
                    ? `0 0 35px ${sw.color}, inset 0 0 20px ${sw.color}`
                    : `0 0 50px ${sw.color}`,
              }}
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {floatingTexts.map((ft) => (
            <motion.div
              key={ft.id}
              initial={{ x: ft.x - 14, y: ft.y, opacity: 0, scale: 0.5 }}
              animate={{ y: ft.y - 28, opacity: [0, 1, 1, 0], scale: [0.5, 1.3, 1.1, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                color: ft.color,
                fontSize: 17,
                fontWeight: 900,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                fontFamily: 'var(--font-jakarta), sans-serif',
                pointerEvents: 'none',
                zIndex: 100052,
              }}
            >
              {ft.text}
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {particles.map((p) => (
            <SingleFlyingParticle key={p.id} particle={p} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
