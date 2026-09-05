'use client';

/**
 * LeaderboardScene — mid-week leaderboard moments: joined this week's
 * cohort, passed a rival, or got passed. Deliberately NOT the dark
 * Celebration Engine theme (LeaderboardSceneShell instead of SceneShell) —
 * white, flat, Duolingo-card styling, no glow. A real end-of-week
 * promotion/demotion is still the 'LEAGUE' scene (LeagueScene.tsx).
 */

import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import LeaderboardSceneShell from '../LeaderboardSceneShell';
import AnimatedRankList from '../leaderboard/AnimatedRankList';
import CelebrationMascot from '../CelebrationMascot';
import styles from '../Leaderboard.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { getLeagueMeta } from '@/lib/leagues';
import { playRankUp, playRankJoin, playRankDown } from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';

type LeaderboardSceneInput = Extract<CelebrationScene, { kind: 'LEADERBOARD' }>;

interface LeaderboardSceneProps {
  scene: LeaderboardSceneInput;
  onAdvance: () => void;
}

export default function LeaderboardScene({ scene, onAdvance }: LeaderboardSceneProps) {
  const reducedMotion = useReducedMotion();
  // Lazy initializer, not an effect: with no standings to render,
  // AnimatedRankList never mounts to call onSettled — never leave the scene
  // stuck behind only the skip hatch. `scene` is fixed per scene instance,
  // so this only needs to be evaluated once, at mount.
  const [settled, setSettled] = React.useState(() => scene.afterStandings.length === 0);
  const introFiredRef = useRef(false);
  const leagueMeta = getLeagueMeta(scene.league);

  useEffect(() => {
    if (introFiredRef.current) return;
    introFiredRef.current = true;
    if (scene.variant === 'JOINED') {
      playHaptic('light');
      playRankJoin();
    } else {
      playHaptic('medium');
    }
  }, [scene.variant]);

  const handleSwapStart = () => {
    if (scene.variant === 'PASSED_RIVAL') playRankUp();
    else if (scene.variant === 'PASSED_BY_RIVAL') playRankDown();
  };

  const headline =
    scene.variant === 'JOINED' ? (
      <>You&apos;re on the leaderboard!</>
    ) : scene.variant === 'PASSED_RIVAL' ? (
      <>
        You passed <span className={styles.headlineAccent}>{scene.rivalName}</span>!
      </>
    ) : (
      <>
        <span className={styles.headlineAccent}>{scene.rivalName}</span> just passed you!
      </>
    );

  const subhead =
    scene.variant === 'JOINED'
      ? `Climb the ${leagueMeta.name} this week`
      : scene.variant === 'PASSED_RIVAL'
        ? `You're now #${scene.myRank} in ${leagueMeta.name}`
        : `Complete a lesson to take back your spot in ${leagueMeta.name}`;

  const ctaText =
    scene.variant === 'JOINED' ? "LET'S GO" : scene.variant === 'PASSED_RIVAL' ? 'KEEP CLIMBING' : 'TAKE THE LEAD BACK';

  const mascotPose = scene.variant === 'PASSED_BY_RIVAL' ? 'idle' : 'cheer';

  return (
    <LeaderboardSceneShell cta={settled ? { text: ctaText, onClick: onAdvance } : null} onSkip={settled ? undefined : onAdvance}>
      <motion.div
        className={styles.iconBadge}
        initial={reducedMotion ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Trophy />
      </motion.div>

      <motion.h1
        className={styles.headline}
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {headline}
      </motion.h1>

      <p className={styles.subhead}>{subhead}</p>

      {scene.afterStandings.length > 0 && (
        <AnimatedRankList
          beforeRows={scene.beforeStandings}
          afterRows={scene.afterStandings}
          meUserId={scene.afterStandings.find((r) => r.isMe)?.userId ?? ''}
          highlightUserId={scene.rivalUserId}
          onSwapStart={handleSwapStart}
          onSettled={() => setSettled(true)}
        />
      )}

      <CelebrationMascot pose={mascotPose} entrance="puff" />
    </LeaderboardSceneShell>
  );
}
