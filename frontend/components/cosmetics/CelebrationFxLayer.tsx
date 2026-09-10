'use client';

/**
 * The equipped Celebration Effect, played over a full-page scene.
 *
 * This is what a Celebration Effect purchase actually buys. Without it the
 * item would be a card in a shop that changes nothing — the fastest way to
 * teach learners that cosmetics here are decorative lies.
 *
 * Particles are generated from the effect's own gradient stops, so a new
 * effect needs only an entry in the art registry, never a new component.
 * Renders nothing when nothing is equipped, and nothing under reduced motion.
 */

import React, { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cosmeticArt } from '@/lib/shop/cosmetics';
import { useLoadout } from '@/lib/shop/useLoadout';
import styles from './CelebrationFxLayer.module.css';

/** Pull the colour stops out of a gradient string to seed the particles. */
function extractColors(gradient: string): string[] {
  const matches = gradient.match(/#[0-9a-fA-F]{3,8}/g);
  return matches && matches.length > 0 ? matches : ['#FFFFFF'];
}

const PARTICLE_COUNT = 18;

export default function CelebrationFxLayer() {
  const reducedMotion = useReducedMotion();
  const { art } = useLoadout();
  const token = art?.CELEBRATION_FX ?? null;

  const particles = useMemo(() => {
    if (!token) return [];
    const colors = extractColors(cosmeticArt(token).gradient);
    // Deterministic per render pass, but spread across the viewport: the
    // layout only needs to look scattered, not be statistically random.
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: (i * 37) % 100,
      delay: (i % 7) * 0.28,
      duration: 2.6 + ((i * 13) % 18) / 10,
      size: 6 + ((i * 7) % 9),
      color: colors[i % colors.length],
      drift: ((i % 5) - 2) * 26,
    }));
  }, [token]);

  if (!token || reducedMotion || particles.length === 0) return null;

  const motion = cosmeticArt(token).motion ?? 'pulse';

  return (
    <div className={styles.layer} aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className={`${styles.particle} ${styles[`shape_${motion}`] ?? ''}`}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
