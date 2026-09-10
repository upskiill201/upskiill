'use client';

/**
 * QuestScene — "+1 quest point" grammar: rows slide in one-by-one with
 * progress bars filling, the just-completed row takes a golden shine sweep,
 * and the CTA moves the learner on.
 */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import SceneShell from '../SceneShell';
import CelebrationMascot from '../CelebrationMascot';
import { TypewriterBubble } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { CURRENCY_ICONS } from '../currency';
import { playHaptic } from '@/lib/haptics';
import { playScenePop } from '@/lib/audio/celebrationAudio';
import { pickQuestSpeech } from '@/lib/tey/questVoice';

type QuestSceneInput = Extract<CelebrationScene, { kind: 'QUEST' }>;

interface QuestSceneProps {
  scene: QuestSceneInput;
  onAdvance: () => void;
}

export default function QuestScene({ scene, onAdvance }: QuestSceneProps) {
  const reducedMotion = useReducedMotion();

  const allDone = scene.rows.every((r) => r.current >= r.target);

  // Lazy initializer, not derived inline: picked once per scene instance so
  // a re-render never rerolls the line mid-reveal (matches ClaimScene's
  // pattern). This was the one Celebration Engine scene with no mascot and
  // no spoken line at all — the headline already carries the fact, this is
  // just Tey reacting next to it.
  const [speech] = useState(() => pickQuestSpeech(allDone));

  // Row entrance pops (mirrored in the stagger below)
  useEffect(() => {
    if (reducedMotion) return;
    const timers = scene.rows.map((_, i) => setTimeout(() => playScenePop(i), i * 170 + 150));
    return () => timers.forEach(clearTimeout);
  }, [scene.rows, reducedMotion]);

  return (
    <SceneShell
      cta={{
        text: allDone ? 'ALL DONE!' : (scene.ctaText ?? 'CONTINUE'),
        onClick: onAdvance,
        variant: allDone ? 'gold' : 'green',
      }}
    >
      <h1 className={styles.headline}>
        {scene.headline.includes('+') ? (
          <>
            {scene.headline.slice(0, scene.headline.indexOf('+'))}
            <span className={styles.headlineAccent}>
              +{scene.headline.slice(scene.headline.indexOf('+') + 1)}
            </span>
          </>
        ) : (
          scene.headline
        )}
      </h1>
      {scene.subhead && <p className={styles.subhead}>{scene.subhead}</p>}

      <div className={styles.questRows}>
        {scene.rows.map((row, i) => {
          const done = row.current >= row.target;
          const pct = Math.min(100, Math.round((row.current / Math.max(1, row.target)) * 100));
          return (
            <motion.div
              key={row.id ?? `${row.label}-${i}`}
              className={`${styles.questRow} ${row.highlight ? styles.questRowHighlight : ''}`}
              initial={
                reducedMotion
                  ? false
                  : { x: -46, opacity: 0, scale: 0.96 }
              }
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: reducedMotion ? 0 : i * 0.17,
                type: 'spring',
                stiffness: 380,
                damping: 24,
              }}
            >
              {row.highlight && !reducedMotion && <div className={styles.questShine} />}
              <div className={styles.questRowTop}>
                <span className={styles.questRowLabel} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {done && <Check size={16} strokeWidth={3.4} color="#4ade80" aria-hidden />}
                  {row.label}
                </span>
                <span className={styles.questRowEnd}>
                  {row.reward && row.reward.amount > 0 && (
                    <span
                      className={styles.questRewardChip}
                      title={`Reward: +${row.reward.amount}`}
                    >
                      <Image
                        src={CURRENCY_ICONS[row.reward.currency]}
                        alt={row.reward.currency}
                        width={15}
                        height={15}
                        style={{ objectFit: 'contain' }}
                      />
                      +{row.reward.amount}
                    </span>
                  )}
                  <span
                    className={`${styles.questRowCount} ${done ? styles.questRowCountDone : ''}`}
                  >
                    {Math.min(row.current, row.target)} / {row.target}
                  </span>
                </span>
              </div>
              <div className={styles.questBarTrack}>
                <motion.div
                  className={`${styles.questBarFill} ${row.highlight ? styles.questBarFillGold : ''}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    delay: reducedMotion ? 0 : i * 0.17 + 0.25,
                    duration: 0.55,
                    ease: 'easeOut',
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <CelebrationMascot pose={allDone ? 'cheer' : 'idle'} entrance="puff" />
      <TypewriterBubble text={speech} startDelay={scene.rows.length * 170 + 400} />
    </SceneShell>
  );
}
