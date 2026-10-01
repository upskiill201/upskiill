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
import LeaderboardSceneShell from '../LeaderboardSceneShell';
import AnimatedRankList from '../leaderboard/AnimatedRankList';
import CelebrationMascot from '../CelebrationMascot';
import LeagueBadge from '@/components/leaderboard/LeagueBadge';
import styles from '../Leaderboard.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { getLeagueMeta } from '@/lib/leagues';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';

type LeaderboardSceneInput = Extract<CelebrationScene, { kind: 'LEADERBOARD' }>;

interface LeaderboardSceneProps {
  scene: LeaderboardSceneInput;
  onAdvance: () => void;
}

/** Sound + haptic for the scene's intro beat, per variant. Rival-crossing
 * variants play their sound on the rank-list swap instead (handleSwapStart),
 * since that's the moment they're actually watching. */
function playIntroSound(variant: LeaderboardSceneInput['variant']) {
  switch (variant) {
    case 'REACHED_FIRST':
    case 'ENTERED_PROMOTION_ZONE':
      playHaptic('teyroCelebration', false);
      playSound('leagueTop');
      break;
    case 'JOINED':
    case 'CLOSE_TO_PROMOTION':
      playHaptic('light', false);
      playSound('leagueJoin');
      break;
    case 'ESCAPED_DEMOTION_ZONE':
    case 'BIG_JUMP_UP':
      playHaptic('medium', false);
      playSound('leagueUp', 2);
      break;
    case 'ENTERED_DEMOTION_ZONE':
    case 'BIG_JUMP_DOWN':
    case 'EXITED_PROMOTION_ZONE':
      playHaptic('medium', false);
      playSound('noticeWarn');
      break;
    default:
      playHaptic('medium', false);
  }
}

const MASCOT_SAD_VARIANTS = new Set<LeaderboardSceneInput['variant']>([
  'PASSED_BY_RIVAL',
  'ENTERED_DEMOTION_ZONE',
  'EXITED_PROMOTION_ZONE',
  'BIG_JUMP_DOWN',
]);

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
    if (scene.variant !== 'PASSED_RIVAL' && scene.variant !== 'PASSED_BY_RIVAL') {
      playIntroSound(scene.variant);
    } else {
      playHaptic('medium');
    }
  }, [scene.variant]);

  const handleSwapStart = () => {
    if (scene.variant === 'PASSED_RIVAL') playSound('leagueUp', 1);
    else if (scene.variant === 'PASSED_BY_RIVAL') playSound('noticeWarn');
  };

  const fallbackHeadline =
    scene.variant === 'JOINED' ? (
      <>You&apos;re on the leaderboard!</>
    ) : scene.variant === 'PASSED_RIVAL' ? (
      <>
        You passed <span className={styles.headlineAccent}>{scene.rivalName}</span>!
      </>
    ) : scene.variant === 'PASSED_BY_RIVAL' ? (
      <>
        <span className={styles.headlineAccent}>{scene.rivalName}</span> just passed you!
      </>
    ) : (
      <>You&apos;re #{scene.myRank}!</>
    );

  // The headline states the fact; Tey's line reacts in the subhead.
  const headline = fallbackHeadline;

  const fallbackSubhead =
    scene.variant === 'JOINED'
      ? `Climb the ${leagueMeta.name} this week`
      : scene.variant === 'PASSED_RIVAL'
        ? `You're now #${scene.myRank} in ${leagueMeta.name}`
        : scene.variant === 'PASSED_BY_RIVAL'
          ? `Complete a lesson to take back your spot in ${leagueMeta.name}`
          : scene.variant === 'REACHED_FIRST'
            ? `You're leading the ${leagueMeta.name} this week`
            : scene.variant === 'ENTERED_PROMOTION_ZONE'
              ? `#${scene.myRank} in ${leagueMeta.name} — hold that spot!`
              : scene.variant === 'ESCAPED_DEMOTION_ZONE'
                ? `Back to #${scene.myRank} in ${leagueMeta.name}`
                : scene.variant === 'ENTERED_DEMOTION_ZONE'
                  ? `#${scene.myRank} in ${leagueMeta.name} — time to climb`
                  : scene.variant === 'EXITED_PROMOTION_ZONE'
                    ? `Now #${scene.myRank} in ${leagueMeta.name}`
                    : scene.variant === 'CLOSE_TO_PROMOTION'
                      ? `#${scene.myRank} in ${leagueMeta.name}`
                      : scene.variant === 'BIG_JUMP_UP'
                        ? `Up to #${scene.myRank} in ${leagueMeta.name}`
                        : `Down to #${scene.myRank} in ${leagueMeta.name}`;

  const subhead = scene.teyLine ?? scene.teySubhead ?? fallbackSubhead;

  const ctaText =
    scene.variant === 'JOINED'
      ? "LET'S GO"
      : scene.variant === 'PASSED_RIVAL' || scene.variant === 'BIG_JUMP_UP'
        ? 'KEEP CLIMBING'
        : scene.variant === 'PASSED_BY_RIVAL'
          ? 'TAKE THE LEAD BACK'
          : scene.variant === 'REACHED_FIRST'
            ? 'STAY ON TOP'
            : scene.variant === 'ENTERED_PROMOTION_ZONE' || scene.variant === 'CLOSE_TO_PROMOTION'
              ? 'KEEP GOING'
              : scene.variant === 'ESCAPED_DEMOTION_ZONE'
                ? 'KEEP CLIMBING'
                : scene.variant === 'ENTERED_DEMOTION_ZONE' || scene.variant === 'BIG_JUMP_DOWN'
                  ? "LET'S FIX THIS"
                  : 'KEEP GOING';

  const mascotPose = MASCOT_SAD_VARIANTS.has(scene.variant) ? 'idle' : 'cheer';

  return (
    <LeaderboardSceneShell cta={settled ? { text: ctaText, onClick: onAdvance } : null} onSkip={settled ? undefined : onAdvance}>
      <motion.div
        initial={reducedMotion ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <LeagueBadge tier={scene.league} size="lg" priority />
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
