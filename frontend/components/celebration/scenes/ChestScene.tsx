'use client';

/**
 * ChestScene — the Duolingo treasure-chest reveal:
 * rarity label → idle sparkles → "Tap to open!" → server-first POST (never
 * celebrate an un-persisted roll) → creak/shake → golden light beam + burst
 * → chest dissolves → reward pile drops and bounces onto the shadow ellipse
 * → corner balance ticks up → CONTINUE.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import SceneShell from '../SceneShell';
import ChestArt, { ChestVisualState } from '../ChestArt';
import { CountUpNumber, RarityLabel, RewardPile } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationCurrency, CelebrationScene } from '@/context/CelebrationContext';
import { CURRENCY_ICONS, CURRENCY_LABELS, toCelebrationCurrency } from '../currency';
import { playChestBurst, playChestCreak, playGemChime } from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';
import { useGamification } from '@/context/GamificationContext';

type ChestSceneInput = Extract<CelebrationScene, { kind: 'CHEST' }>;

interface ChestSceneProps {
  scene: ChestSceneInput;
  onAdvance: () => void;
}

interface OpenResult {
  currency: CelebrationCurrency;
  amount: number;
  rarityTier: string;
}

type Phase = 'loading' | 'ready' | 'opening-server' | 'shaking' | 'bursting' | 'revealed' | 'error';

const CONFETTI_COLORS = ['#FFD54D', '#FFC800', '#FFFFFF', '#F59E0B'];

/** Hard cap on chest API calls — a hung request must never trap the scene
 *  on "Opening your chest…" with no way out (cold backend, dropped connection). */
function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}

export default function ChestScene({ scene, onAdvance }: ChestSceneProps) {
  const reducedMotion = useReducedMotion();
  const gamification = useGamification();
  const refreshGamification = gamification.refresh;

  const [phase, setPhase] = useState<Phase>('loading');
  const [error, setError] = useState<string | null>(null);
  const [chestId, setChestId] = useState<string | null>(scene.chestId ?? null);
  const [result, setResult] = useState<OpenResult | null>(null);
  const [balanceShown, setBalanceShown] = useState<number>(gamification.coins);
  const chestWrapRef = useRef<HTMLDivElement | null>(null);
  const openedRef = useRef(false);

  // ── Fetch today's chest when no id was supplied ───────────────────────────
  useEffect(() => {
    if (chestId) {
      setPhase('ready');
      return;
    }
    let cancelled = false;
    fetchWithTimeout('/api/chest/today', {
      credentials: 'include',
      headers: { 'x-timezone-offset': new Date().getTimezoneOffset().toString() },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Could not load your chest.');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (!data?.id) throw new Error('No chest available right now.');
        setChestId(data.id);
        setPhase('ready');
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const aborted = e instanceof DOMException && e.name === 'AbortError';
        setError(aborted ? 'Could not reach your chest. Check your connection.' : e instanceof Error ? e.message : 'Could not load your chest.');
        setPhase('error');
      });
    return () => {
      cancelled = true;
    };
  }, [chestId]);

  // ── Server-first open, then the physical sequence ─────────────────────────
  const handleTap = async () => {
    if (openedRef.current || phase !== 'ready') return;
    openedRef.current = true;
    setPhase('opening-server');
    playHaptic('medium');

    try {
      const res = await fetchWithTimeout(`/api/chest/${chestId}/open`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'x-timezone-offset': new Date().getTimezoneOffset().toString() },
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Already opened earlier today — surface the recorded reward gracefully
        if (res.status === 409 || data?.rewardSnapshotType) {
          beginReveal({
            currency: toCelebrationCurrency(data.rewardSnapshotType || 'COINS'),
            amount: Number(data.rewardSnapshotAmount) || 15,
            rarityTier: String(data.rarityTier || 'common'),
          });
          return;
        }
        throw new Error(data?.message || 'Failed to open the chest.');
      }

      beginReveal({
        currency: toCelebrationCurrency(data.rewardType || 'COINS'),
        amount: Number(data.rewardAmount) || 15,
        rarityTier: String(data.rarityTier || 'common'),
      });
    } catch (e: unknown) {
      console.error('ChestScene open failed:', e);
      const aborted = e instanceof DOMException && e.name === 'AbortError';
      // No tap-retry in the error phase — CONTINUE is the way out, so the
      // copy must not promise otherwise.
      setError(aborted ? 'The chest is taking too long to reach. Check your connection.' : e instanceof Error ? e.message : 'Failed to open the chest.');
      setPhase('error');
    }
  };

  /** creak → shake → burst+beam → dissolve → pile */
  const beginReveal = (r: OpenResult) => {
    setResult(r);
    if (reducedMotion) {
      finishReveal(r);
      return;
    }
    playChestCreak();
    setPhase('shaking');
    // Shake beat, then the burst
    setTimeout(() => {
      playChestBurst();
      playHaptic('teyroCelebration');
      setPhase('bursting');
      confetti({
        particleCount: r.rarityTier === 'rare' ? 130 : 80,
        spread: 85,
        startVelocity: 42,
        origin: { x: 0.5, y: 0.55 },
        colors: CONFETTI_COLORS,
        scalar: 0.95,
        disableForReducedMotion: true,
      });
      setTimeout(() => finishReveal(r), 950);
    }, 850);
  };

  const finishReveal = (r: OpenResult) => {
    setResult(r);
    setPhase('revealed');
    setBalanceShown((b) => b + (r.currency === 'COINS' ? r.amount : 0));
    // Sync the header pill with the server — the chest payout landed there
    // first, and nothing else in the scene triggers a gamification refresh.
    void refreshGamification();
  };

  // ── Derived visuals ───────────────────────────────────────────────────────
  const visualState: ChestVisualState =
    phase === 'shaking'
      ? 'shaking'
      : phase === 'bursting'
        ? 'opening'
        : phase === 'revealed'
          ? 'open'
          : 'closed';

  const pileCount = result ? Math.max(3, Math.min(7, Math.ceil(result.amount / 8))) : 0;

  const shakeX =
    phase === 'shaking' && !reducedMotion ? [0, -7, 6, -5, 4, -2, 0] : 0;

  return (
    <SceneShell
      cornerBalance={{ currency: 'COINS', value: balanceShown }}
      cta={
        phase === 'revealed' || phase === 'error'
          ? { text: 'CONTINUE', onClick: onAdvance, variant: phase === 'error' ? 'ghost' : 'gold' }
          : null
      }
      // Loading / server-first open in flight — keep the skip hatch available
      onSkip={phase === 'revealed' || phase === 'error' ? undefined : onAdvance}
    >
      <h1 className={styles.headline}>
        {phase === 'revealed' && result ? (
          <>
            +<CountUpNumber value={result.amount} duration={0.55} />{' '}
            <span className={styles.headlineAccent}>{CURRENCY_LABELS[result.currency]}</span>
          </>
        ) : phase === 'error' ? (
          'Chest unavailable'
        ) : (
          'Your daily chest'
        )}
      </h1>

      {(phase === 'ready' || phase === 'shaking' || phase === 'bursting') && (
        <RarityLabel tier={result?.rarityTier ?? 'common'} />
      )}

      {/* Stage: chest + shadow + beam + pile */}
      <div className={styles.chestStage}>
        {/* Golden light beam on burst */}
        {phase === 'bursting' && !reducedMotion && (
          <motion.div
            className={styles.lightBeam}
            initial={{ opacity: 0, scaleY: 0.15 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ transformOrigin: 'bottom center' }}
          />
        )}

        {/* Idle sparkles while waiting for the tap */}
        {phase === 'ready' &&
          !reducedMotion &&
          [
            { top: '-4%', left: '12%', delay: 0 },
            { top: '18%', right: '10%', delay: 0.45 },
            { bottom: '26%', left: '4%', delay: 0.9 },
          ].map((pos, i) => (
            <motion.span
              key={i}
              aria-hidden
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.5] }}
              transition={{ duration: 1.7, repeat: Infinity, delay: pos.delay, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                ...pos,
                color: '#FFD54D',
                fontSize: 20,
                pointerEvents: 'none',
              }}
            >
              ✦
            </motion.span>
          ))}

        {/* The chest — dissolves away at reveal */}
        {!reducedMotion || phase !== 'revealed' ? (
          <motion.div
            ref={chestWrapRef}
            animate={{
              x: shakeX,
              scale: phase === 'bursting' ? [1, 1.14, 0.92] : 1,
              opacity: phase === 'revealed' ? 0 : 1,
              rotate: phase === 'revealed' ? -8 : 0,
            }}
            transition={
              phase === 'shaking'
                ? { duration: 0.7, ease: 'easeInOut' }
                : phase === 'bursting'
                  ? { duration: 0.5, ease: 'easeOut' }
                  : phase === 'revealed'
                    ? { duration: 0.35, ease: 'easeIn' }
                    : { type: 'spring', stiffness: 300, damping: 20 }
            }
            style={{ position: 'relative', zIndex: 2 }}
          >
            <ChestArt state={visualState} onClick={phase === 'ready' ? handleTap : undefined} />
          </motion.div>
        ) : null}

        {/* Reward pile drops after the chest dissolves */}
        {phase === 'revealed' && result && (
          <RewardPile
            iconSrc={CURRENCY_ICONS[result.currency]}
            count={pileCount}
            startDelay={reducedMotion ? 0 : 220}
            onItemLand={(i) => {
              if (!reducedMotion) playGemChime(i);
            }}
          />
        )}

        <motion.div
          className={styles.chestShadow}
          animate={{ opacity: phase === 'revealed' ? 0.75 : 1, scaleX: phase === 'bursting' ? 1.25 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {phase === 'loading' && <p className={styles.subhead}>Opening your chest…</p>}
      {phase === 'opening-server' && <p className={styles.subhead}>Unlocking…</p>}
      {phase === 'ready' && <p className={`${styles.tapHint}`}>Tap to open!</p>}
      {phase === 'error' && <p className={styles.errorNote}>{error ?? 'Something went wrong.'}</p>}
    </SceneShell>
  );
}
