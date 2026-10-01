'use client';

/**
 * ClaimScene — the Duolingo "lesson complete" payout grammar:
 * Tey grabs each reward → holds it overhead → tosses it into the balance row,
 * and the counter ticks up the moment it lands. The server claim executes on
 * scene entry; the animation only plays once it confirms (never celebrate an
 * un-persisted reward). A failed claim degrades to headline + CONTINUE.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SceneShell from '../SceneShell';
import CelebrationMascot, { MascotPose } from '../CelebrationMascot';
import { BalanceRow, FlyingReward, StatPillRow } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationCurrency, CelebrationScene } from '@/context/CelebrationContext';
import { CURRENCY_COLORS, CURRENCY_ICONS, CURRENCY_LABELS } from '../currency';
import { runSceneClaim } from '../sceneClaim';
import { playSound } from '@/lib/audio/lessonSounds';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { useGamification } from '@/context/GamificationContext';
import { pickClaimTitle } from '@/lib/tey/xpClaimVoice';

type ClaimSceneInput = Extract<CelebrationScene, { kind: 'CLAIM' }>;

interface ClaimSceneProps {
  scene: ClaimSceneInput;
  onAdvance: () => void;
}

type TimelineAct = 'grab' | 'hold' | 'toss' | 'deposit';
interface TimelineStep {
  act: TimelineAct;
  rewardIndex: number;
}

/** Beat lengths (ms) for each physical action. */
const BEAT_MS: Record<Exclude<TimelineAct, 'deposit'>, number> = {
  grab: 560,
  hold: 620,
  toss: 0, // advances when the flight lands, not on a timer
};
const INTRO_MS = 1000;
const DEPOSIT_PAUSE_MS = 560;
/**
 * The claim runs server-first — on a cold backend (Render free tier) it can
 * take a while, but it must never trap the learner on an unclosable screen.
 * Past this point the scene degrades to headline + error + CONTINUE.
 */
const CLAIM_TIMEOUT_MS = 15000;
/**
 * Safety net for the toss beat: if the flying reward never reports arrival
 * (backgrounded tab suspends rAF, GPU stall), advance anyway so the scene
 * can't dead-end between grab and deposit.
 */
const TOSS_FALLBACK_MS = 2600;

function liveBalanceOf(
  currency: CelebrationCurrency,
  g: ReturnType<typeof useGamification>
): number {
  switch (currency) {
    case 'COINS':
      return g.coins;
    case 'XP':
      return g.xp;
    case 'HEARTS':
      return g.lives;
    case 'STREAK':
      return g.streakDays;
    default:
      return 0;
  }
}

export default function ClaimScene({ scene, onAdvance }: ClaimSceneProps) {
  const reducedMotion = useReducedMotion();
  const gamification = useGamification();
  const rewards = scene.rewards.length > 0 ? scene.rewards : [{ currency: 'XP' as const, amount: 0 }];
  // Lazy initializer, not an effect: picked once per scene instance so a
  // re-render never rerolls the title mid-reveal.
  const [title] = useState(() => scene.title ?? pickClaimTitle(rewards));

  // ── Timeline: grab → hold → toss → deposit per reward ─────────────────────
  const timeline = useMemo<TimelineStep[]>(
    () =>
      rewards.flatMap((_, i) => [
        { act: 'grab' as const, rewardIndex: i },
        { act: 'hold' as const, rewardIndex: i },
        { act: 'toss' as const, rewardIndex: i },
        { act: 'deposit' as const, rewardIndex: i },
      ]),
    [rewards]
  );

  const [claimState, setClaimState] = useState<'pending' | 'confirmed' | 'failed'>(
    scene.claim ? 'pending' : 'confirmed'
  );
  const [claimError, setClaimError] = useState<string | null>(null);
  /** Post-claim balances returned by the claim itself (wins over scene.targetBalances). */
  const [resolvedBalances, setResolvedBalances] = useState<Partial<Record<CelebrationCurrency, number>> | null>(null);
  /** Caption revealed when the claim reports a deferred (settle-at-signup) payout. */
  const [deferredCaption, setDeferredCaption] = useState<string | null>(null);
  const [stepIdx, setStepIdx] = useState(-1); // -1 = intro hold before first grab
  const [depositedCount, setDepositedCount] = useState(0);
  const [flight, setFlight] = useState<{ currency: CelebrationCurrency; key: number } | null>(null);

  const mascotRef = useRef<HTMLDivElement | null>(null);
  const balanceColRef = useRef<HTMLDivElement | null>(null);
  const stepIdxRef = useRef(stepIdx);
  stepIdxRef.current = stepIdx;

  // ── Server-first claim (executed once per scene, with a hard timeout) ─────
  useEffect(() => {
    if (!scene.claim) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const withTimeout = () =>
      Promise.race([
        runSceneClaim(scene),
        new Promise<never>((_, reject) => {
          timer = setTimeout(
            () => reject(new Error('Saving your reward is taking longer than usual. Check your connection and try again.')),
            CLAIM_TIMEOUT_MS
          );
        }),
      ]);
    withTimeout()
      .then((balances) => {
        if (cancelled) return;
        // Exact post-claim balances from the API response (covers server-side
        // extras like the all-missions-claimed coin bonus) before confirming,
        // so startBalances is correct before the first deposit lands. A
        // deferred payout instead carries a pendingCaption — surface it.
        if (balances) {
          const { pendingCaption: caption, ...targets } = balances;
          if (caption) setDeferredCaption(caption);
          if (Object.keys(targets).length > 0) setResolvedBalances(targets);
        }
        setClaimState('confirmed');
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        console.error('CelebrationEngine claim failed:', e);
        setClaimState('failed');
        setClaimError(e instanceof Error ? e.message : 'Could not save your reward.');
      })
      .finally(() => {
        if (timer) clearTimeout(timer);
      });
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [scene]);

  // ── Intro sound + haptic ──────────────────────────────────────────────────
  useEffect(() => {
    playSound('rewardClaim');
    celebrationHaptic('win');
  }, []);

  // ── Timeline driver ───────────────────────────────────────────────────────
  useEffect(() => {
    if (claimState === 'failed') return;
    if (reducedMotion) {
      // Static reveal — but never deposit before the server confirmed.
      if (scene.claim && claimState !== 'confirmed') return;
      setDepositedCount(rewards.length);
      setStepIdx(timeline.length);
      return;
    }
    if (stepIdx < 0) {
      // Server-first: hold on the intro until the claim confirms
      if (claimState !== 'confirmed') return;
      const t = setTimeout(() => setStepIdx(0), INTRO_MS);
      return () => clearTimeout(t);
    }
    const step = timeline[stepIdx];
    if (!step || claimState !== 'confirmed') return;

    if (step.act === 'toss') {
      // Flight handles its own advance via handleFlightArrived; the fallback
      // timer guarantees progress if that animation is suspended/lost.
      setFlight({ currency: rewards[step.rewardIndex].currency, key: stepIdx });
      const t = setTimeout(() => {
        const current = timeline[stepIdxRef.current];
        if (current?.act === 'toss') {
          setFlight(null);
          setStepIdx((i) => i + 1);
        }
      }, TOSS_FALLBACK_MS);
      return () => clearTimeout(t);
    }
    if (step.act === 'deposit') {
      setDepositedCount((c) => Math.max(c, step.rewardIndex + 1));
      playSound('chestTick', step.rewardIndex);
      playHaptic('light', false);
      const t = setTimeout(() => setStepIdx((i) => i + 1), DEPOSIT_PAUSE_MS);
      return () => clearTimeout(t);
    }
    // grab / hold advance on their beat length
    const t = setTimeout(() => setStepIdx((i) => i + 1), BEAT_MS[step.act]);
    return () => clearTimeout(t);
  }, [stepIdx, claimState, timeline, reducedMotion, rewards]);

  const currentStep = stepIdx >= 0 ? timeline[stepIdx] : undefined;
  const finished = stepIdx >= timeline.length && claimState !== 'failed';

  const handleFlightArrived = () => {
    setFlight(null);
    // Only advance if this flight is still the active toss step
    const step = timeline[stepIdxRef.current];
    if (step?.act === 'toss') setStepIdx((i) => i + 1);
  };

  // ── Balances: start value per currency, then cumulative deposits ──────────
  // Live balances are snapshotted once at mount so a mid-scene context refresh
  // can't shift the count-up origin.
  const liveBalancesRef = useRef<Map<CelebrationCurrency, number> | null>(null);
  if (liveBalancesRef.current === null) {
    const snapshot = new Map<CelebrationCurrency, number>();
    (['COINS', 'XP', 'HEARTS', 'STREAK'] as const).forEach((c) => {
      snapshot.set(c, liveBalanceOf(c, gamification));
    });
    liveBalancesRef.current = snapshot;
  }

  const effectiveTargets = useMemo(
    () => ({ ...scene.targetBalances, ...(resolvedBalances ?? {}) }),
    [scene.targetBalances, resolvedBalances]
  );

  const startBalances = useMemo(() => {
    const map = new Map<CelebrationCurrency, number>();
    const currencies = Array.from(new Set(rewards.map((r) => r.currency)));
    const live = liveBalancesRef.current ?? new Map<CelebrationCurrency, number>();
    for (const c of currencies) {
      const target = effectiveTargets[c];
      if (typeof target === 'number') {
        const totalForC = rewards
          .filter((r) => r.currency === c)
          .reduce((s, r) => s + r.amount, 0);
        map.set(c, Math.max(0, target - totalForC));
      } else {
        map.set(c, live.get(c) ?? 0);
      }
    }
    return map;
  }, [rewards, effectiveTargets]);

  const shownBalance = (c: CelebrationCurrency) =>
    (startBalances.get(c) ?? 0) +
    rewards
      .slice(0, depositedCount)
      .filter((r) => r.currency === c)
      .reduce((s, r) => s + r.amount, 0);

  const distinctCurrencies = useMemo(
    () => Array.from(new Set(rewards.map((r) => r.currency))),
    [rewards]
  );

  // XP progress fill tracks cumulative XP deposited against levelProgress
  const xpDeposited = rewards
    .slice(0, depositedCount)
    .filter((r) => r.currency === 'XP')
    .reduce((s, r) => s + r.amount, 0);
  const startLevelXp = scene.levelProgress?.current ?? 0;
  const fillPercent =
    scene.levelProgress && scene.levelProgress.target > 0
      ? Math.min(
          100,
          Math.round(((startLevelXp + xpDeposited) / scene.levelProgress.target) * 100)
        )
      : null;

  // ── Mascot pose from current step ─────────────────────────────────────────
  const mascotPose: MascotPose = claimState === 'failed'
    ? 'sad'
    : finished
      ? 'cheer'
      : currentStep?.act === 'grab'
        ? 'grab'
        : currentStep?.act === 'hold'
          ? 'hold'
          : currentStep?.act === 'toss'
            ? 'toss'
            : 'idle';

  const statPills = useMemo(
    () =>
      rewards.map((r) => ({
        label: CURRENCY_LABELS[r.currency],
        value: `+${r.amount.toLocaleString()}`,
        iconSrc: CURRENCY_ICONS[r.currency],
        color: CURRENCY_COLORS[r.currency],
      })),
    [rewards]
  );

  const rectCenter = (el: HTMLElement | null) => {
    if (!el) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  const showCta = claimState === 'failed' || finished;

  return (
    <SceneShell
      cta={showCta ? { text: 'CONTINUE', onClick: onAdvance, variant: claimState === 'failed' ? 'ghost' : 'green' } : null}
      // No bottom CTA yet (server-first claim in flight, or the payout
      // choreography is playing) — keep the skip hatch available so the
      // scene can never trap the learner (mobile has no Escape key).
      onSkip={showCta ? undefined : onAdvance}
    >
      <motion.h1 className={styles.headline} initial={false} animate={{ scale: [0.8, 1.06, 1], opacity: [0, 1, 1] }} transition={{ duration: 0.4, ease: 'easeOut' }}>
        {title}
      </motion.h1>

      {statPills.length > 0 && (
        <StatPillRow items={statPills} />
      )}

      {/* Mascot stage */}
      <div ref={mascotRef} style={{ position: 'relative', zIndex: 2 }}>
        <CelebrationMascot pose={mascotPose} entrance={reducedMotion ? 'none' : 'puff'} />
        {/* Starburst flash on the grab beat */}
        {currentStep?.act === 'grab' && !reducedMotion && (
          <motion.div
            aria-hidden
            initial={{ scale: 0.3, opacity: 0.95 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '-6%',
              left: '50%',
              width: 90,
              height: 90,
              marginLeft: -45,
              borderRadius: '50%',
              background: 'radial-gradient(circle, color-mix(in srgb, var(--warning) 40%, transparent) 0%, color-mix(in srgb, var(--warning) 14%, transparent) 40%, transparent 70%)',
              pointerEvents: 'none',
            }}
            onAnimationStart={() => playSound('shine')}
          />
        )}
      </div>

      {/* Server-first claim in flight — keep the learner informed, never trapped */}
      {claimState === 'pending' && <p className={styles.subhead}>Saving your reward…</p>}

      {claimState === 'failed' ? (
        <p className={styles.errorNote}>{claimError ?? 'Could not save your reward.'}</p>
      ) : (
        <>
          {/* Deposit target — balance rows tick up per landing */}
          <div ref={balanceColRef} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            {distinctCurrencies.map((c) => (
              <BalanceRow key={c} currency={c} value={shownBalance(c)} />
            ))}
          </div>

          {/* Deferred payout — recorded now, credited at signup; never imply
              an account balance that doesn't exist yet */}
          {(scene.pendingCaption ?? deferredCaption) && claimState === 'confirmed' && (
            <p className={styles.subhead}>{scene.pendingCaption ?? deferredCaption}</p>
          )}

          {(fillPercent !== null || scene.progressCaption) && scene.levelProgress && (
            <div className={styles.progressWrap}>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${fillPercent ?? 0}%` }}
                />
              </div>
              <span className={styles.progressCaption}>
                {scene.progressCaption ??
                  `LEVEL ${scene.levelProgress.level} · ${Math.min(
                    scene.levelProgress.target,
                    startLevelXp + xpDeposited
                  )} / ${scene.levelProgress.target} XP`}
              </span>
            </div>
          )}

          {scene.subtitle && <p className={styles.subhead}>{scene.subtitle}</p>}
        </>
      )}

      {/* The tossed reward flying into the balance row */}
      {flight &&
        (() => {
          const from = rectCenter(mascotRef.current);
          const to = rectCenter(balanceColRef.current);
          return (
            <FlyingReward
              key={flight.key}
              currency={flight.currency}
              from={from}
              to={to}
              onArrive={handleFlightArrived}
            />
          );
        })()}
    </SceneShell>
  );
}
