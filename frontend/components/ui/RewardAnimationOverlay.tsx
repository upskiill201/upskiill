'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRewardAnimation, FlyingParticle } from '@/context/RewardAnimationContext';
import { emitAudioEvent, playAscendingPopSound } from '@/lib/audio/audioEvents';
import { playHaptic } from '@/lib/haptics';

function SingleFlyingParticle({ particle }: { particle: FlyingParticle }) {
  const { removeParticle } = useRewardAnimation();

  const originX = particle.startX - 18;
  const originY = particle.startY - 18;
  const pileX = originX + particle.burstX;
  const pileY = originY + particle.burstY;

  const targetX = particle.endX - 18;
  const targetY = particle.endY - 18;

  const overTargetY = Math.max(35, targetY - 45);

  const trailColor =
    particle.currency === 'COINS'
      ? '#FACC15'
      : particle.currency === 'XP'
      ? '#38BDF8'
      : '#F87171';

  return (
    <motion.div
      key={particle.id}
      initial={{
        x: originX,
        y: originY,
        scale: 0.1,
        opacity: 0,
        rotate: 0,
      }}
      animate={{
        x: [originX, pileX, pileX, targetX, targetX],
        y: [originY, pileY, pileY, overTargetY, targetY],
        scale: [0.1, 1.45, 1.3, 1.1, 0.85],
        opacity: [0, 1, 1, 1, 1],
        rotate: particle.currency === 'COINS' ? [0, 90, 180, 270, 360] : [0, -12, 12, -6, 0],
      }}
      transition={{
        duration: particle.durationMs / 1000,
        delay: particle.delayMs / 1000,
        times: [0, 0.25, 0.45, 0.82, 1],
        ease: ['easeOut', 'linear', 'easeInOut', 'easeOut'],
      }}
      onAnimationComplete={() => {
        // Feature 1: Ascending musical pitch feedback
        playAscendingPopSound(particle.particleIndexInSet);
        void emitAudioEvent('BUTTON_SECONDARY_CLICK');
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
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 36,
        height: 36,
        pointerEvents: 'none',
        zIndex: 99999,
        filter:
          particle.currency === 'COINS'
            ? 'drop-shadow(0 4px 12px rgba(234,179,8,0.6))'
            : 'drop-shadow(0 4px 12px rgba(1,114,253,0.5))',
      }}
    >
      {/* Feature 2: Sparkling Stardust Flight Trail */}
      <motion.div
        animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.2] }}
        transition={{ repeat: Infinity, duration: 0.35 }}
        style={{
          position: 'absolute',
          bottom: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: trailColor,
          boxShadow: `0 0 10px ${trailColor}`,
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
  const { particles, shockwaves, floatingTexts, levelUpData, dismissLevelUp } = useRewardAnimation();

  return (
    <>
      {/* Top Portal Overlay for Flying Icons & Shockwaves */}
      <div
        id="reward-animation-portal"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      >
        {/* Feature 3: Origin Explosion Radial Flash & Shockwave Rings */}
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
                scale: sw.type === 'flash' ? [0.2, 2.2, 0] : [0.1, 3.6],
                opacity: [1, 0.9, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: 90,
                height: 90,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 99998,
                background:
                  sw.type === 'flash'
                    ? `radial-gradient(circle, ${sw.color} 0%, rgba(255,255,255,0.9) 40%, transparent 75%)`
                    : 'transparent',
                border: sw.type === 'ring' ? `5px solid ${sw.color}` : 'none',
                boxShadow:
                  sw.type === 'ring'
                    ? `0 0 30px ${sw.color}, inset 0 0 20px ${sw.color}`
                    : `0 0 45px ${sw.color}`,
              }}
            />
          ))}
        </AnimatePresence>

        {/* Feature 4: Live Counter Floating Delta Text (+1 🪙) */}
        <AnimatePresence>
          {floatingTexts.map((ft) => (
            <motion.div
              key={ft.id}
              initial={{ x: ft.x - 12, y: ft.y, opacity: 0, scale: 0.6 }}
              animate={{ y: ft.y - 25, opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                color: ft.color,
                fontSize: 16,
                fontWeight: 900,
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                fontFamily: 'var(--font-jakarta), sans-serif',
                pointerEvents: 'none',
                zIndex: 100001,
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

      {/* Full-Screen Level Up Celebration Modal */}
      <AnimatePresence>
        {levelUpData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100000,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.6, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 24,
                padding: '36px 32px',
                maxWidth: 420,
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
                border: '3px solid #0172FD',
              }}
            >
              <div style={{ fontSize: 56, marginBottom: 8 }}>👑</div>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: '#0172FD',
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--font-jakarta), sans-serif',
                }}
              >
                LEVEL UP!
              </h2>
              <p style={{ color: '#64748B', fontSize: 16, margin: '0 0 24px 0', fontWeight: 600 }}>
                You reached <strong style={{ color: '#0F172A' }}>Level {levelUpData.newLevel}</strong>! Keep crushing your learning goals!
              </p>

              <button
                onClick={dismissLevelUp}
                style={{
                  backgroundColor: '#0172FD',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: 16,
                  padding: '14px 28px',
                  borderRadius: 14,
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  boxShadow: '0 4px 14px rgba(1, 114, 253, 0.4)',
                }}
              >
                CONTINUE LEARNING 🎉
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
