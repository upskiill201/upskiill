'use client';

/**
 * LeagueScene — full-page weekly settlement verdict: promotion fanfare with
 * the new league's shield, demotion with the mascot in sympathy, or the
 * Diamond Tournament champion moment. Plays once per settled week via the
 * LeagueResultWatcher. Shares the light LeaderboardSceneShell/AnimatedRankList
 * with the mid-week LeaderboardScene so the whole leaderboard engine feels
 * like one consistent (white, flat, no-glow) experience — a real tier change
 * still gets its own badge-reveal beat first, since that's a different
 * metaphor from a same-cohort rank swap.
 */

import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import LeaderboardSceneShell from '../LeaderboardSceneShell';
import AnimatedRankList from '../leaderboard/AnimatedRankList';
import CelebrationMascot from '../CelebrationMascot';
import LeagueBadge from '@/components/leaderboard/LeagueBadge';
import styles from '../Leaderboard.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { getLeagueMeta } from '@/lib/leagues';
import { playLossMotif, playSparkle, playStreakFanfare, playWhoosh } from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';

type LeagueSceneInput = Extract<CelebrationScene, { kind: 'LEAGUE' }>;

interface LeagueSceneProps {
  scene: LeagueSceneInput;
  onAdvance: () => void;
}

const CONFETTI_COLORS = ['#3D5AFE', '#6C8CFF', '#FFD54D', '#22C55E', '#4EC3EA'];

export default function LeagueScene({ scene, onAdvance }: LeagueSceneProps) {
  const reducedMotion = useReducedMotion();
  const firedRef = useRef(false);
  // Lazy initializer, not an effect-driven setState: with no rank list to
  // reveal (e.g. INACTIVE_DEMOTED), there's nothing to wait on, so the badge
  // moment is already the first thing shown — `scene` is fixed per instance,
  // so this only needs evaluating once, at mount.
  const [showBadge, setShowBadge] = React.useState(() => scene.finalStandings.length === 0);
  const promoted = scene.outcome === 'PROMOTED' || scene.outcome === 'CHAMPION';
  const toMeta = getLeagueMeta(scene.toTier);
  const fromMeta = getLeagueMeta(scene.fromTier);

  const playBadgeSounds = () => {
    if (promoted) {
      playStreakFanfare();
      if (!reducedMotion && typeof window !== 'undefined') {
        confetti({
          particleCount: 150,
          spread: 110,
          startVelocity: 45,
          origin: { x: 0.5, y: 0.32 },
          colors: CONFETTI_COLORS,
          disableForReducedMotion: true,
        });
        setTimeout(() => {
          confetti({ particleCount: 70, angle: 60, spread: 60, origin: { x: 0, y: 0.4 }, colors: CONFETTI_COLORS, disableForReducedMotion: true });
          confetti({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1, y: 0.4 }, colors: CONFETTI_COLORS, disableForReducedMotion: true });
        }, 350);
      }
    } else {
      playLossMotif();
      playWhoosh('down');
    }
  };

  // Callback for AnimatedRankList's onSettled (an event, not an effect) —
  // reveals the badge and plays its sounds once the rank-list beat is done.
  const fireBadgeMoment = () => {
    setShowBadge(true);
    playBadgeSounds();
  };

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    playHaptic('teyroCelebration');
    // No rank list was rendered (badge already showing via the lazy
    // initializer above) — still need its sounds/confetti to actually play.
    if (scene.finalStandings.length === 0) playBadgeSounds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headline = scene.teyLine ?? (
    scene.outcome === 'PROMOTED' ? (
      <>
        You advanced to <span className={styles.headlineAccent}>{toMeta.name}!</span>
      </>
    ) : scene.outcome === 'CHAMPION' ? (
      <>
        Diamond Tournament <span className={styles.headlineAccent}>Champion!</span>
      </>
    ) : scene.outcome === 'INACTIVE_DEMOTED' ? (
      <>
        No XP last week — back to <span className={styles.headlineAccent}>{toMeta.name}</span>
      </>
    ) : (
      <>
        You finished #{scene.rank ?? '—'} — down to <span className={styles.headlineAccent}>{toMeta.name}</span>
      </>
    )
  );

  const subhead =
    scene.outcome === 'CHAMPION'
      ? `Top 3 of the tournament — with ${scene.totalXp.toLocaleString()} XP`
      : scene.outcome === 'INACTIVE_DEMOTED'
        ? 'Complete a lesson this week to climb back up'
        : `${scene.totalXp.toLocaleString()} XP earned${scene.rank ? ` · #${scene.rank} in ${fromMeta.name}` : ''}`;

  return (
    <LeaderboardSceneShell
      cta={showBadge ? { text: 'VIEW LEADERBOARD', onClick: onAdvance } : null}
      onSkip={showBadge ? undefined : onAdvance}
    >
      <motion.h1
        className={styles.headline}
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {headline}
      </motion.h1>

      {scene.finalStandings.length > 0 && (
        // No "before" state to animate from — this is a reveal of where the
        // learner landed, not a live crossing, so it settles immediately.
        <AnimatedRankList
          beforeRows={[]}
          afterRows={scene.finalStandings}
          meUserId={scene.finalStandings.find((r) => r.isMe)?.userId ?? ''}
          onSettled={fireBadgeMoment}
        />
      )}

      {showBadge && (
        <>
          <motion.div
            initial={reducedMotion ? false : { scale: 0.4, opacity: 0, y: promoted ? -30 : 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 17, delay: 0.05 }}
            onAnimationComplete={() => {
              if (!reducedMotion) playSparkle();
            }}
          >
            <LeagueBadge tier={promoted ? scene.toTier : scene.fromTier} size="xl" />
          </motion.div>

          <p className={styles.subhead}>{subhead}</p>

          <CelebrationMascot pose={promoted ? 'cheer' : 'sad'} entrance="puff" />
        </>
      )}
    </LeaderboardSceneShell>
  );
}
