'use client';

/**
 * ChestScene — the Duolingo treasure-chest reveal, now driven by the Rive
 * treasure chest (`components/gamification/TreasureChest.tsx`): rarity label
 * → idle sparkles → "Tap to open!" → server-first open/claim (never
 * celebrate an un-persisted roll) → Rive owns the tap-to-open animation and
 * fires `rewardReveal` → burst sound/haptic/confetti → reward pile drops and
 * bounces onto the shadow ellipse → corner balance ticks up → CONTINUE.
 *
 * Two reward sources, one experience:
 *  - Daily Chest (`scene.chestId` or omitted): self-fetches /chest/today and
 *    POSTs /chest/:id/open on the first tap, same as before.
 *  - Any other chest-worthy reward (`scene.claim`): calls the caller's claim
 *    function on the first tap (mirrors CLAIM scene's `claim` pattern) —
 *    e.g. a Monthly Quest milestone. No chest-specific backend involved.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import SceneShell from '../SceneShell';
import ChestArt from '../ChestArt';
import { CountUpNumber, RarityLabel, RewardPile, TypewriterBubble } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationCurrency, CelebrationScene } from '@/context/CelebrationContext';
import {
  CURRENCY_ICONS,
  CURRENCY_LABELS,
  toCelebrationCurrency,
  toTreasureChestRewardType,
  type TeyroRewardType,
} from '../currency';
import {
  playChestAppear,
  playChestCreak,
  playChestError,
  playChestRevealFanfare,
  playChestShake,
  playGemChime,
  playIceCrackle,
  playRarityStamp,
  playRewardRush,
  playRewardTick,
  playSparkle,
  playWhoosh,
} from '@/lib/audio/celebrationAudio';
import { playHaptic } from '@/lib/haptics';
import { useGamification } from '@/context/GamificationContext';
import { pickChestReadyHeadline, pickChestRevealLine, pickChestTapHint } from '@/lib/tey/chestVoice';

/** Escalating instruction copy once the learner starts tapping — replaces
 * the static "ready" hint so the chest visibly reacts to each tap instead
 * of showing the same static line the whole time. */
const TAP_PROGRESS_HINTS = ['Keep tapping!', 'Almost there…', 'One more!'];
function tapProgressHint(tapCount: number): string {
  return TAP_PROGRESS_HINTS[Math.min(tapCount - 1, TAP_PROGRESS_HINTS.length - 1)] ?? TAP_PROGRESS_HINTS[0];
}
/** How many pips the bottom progress row shows — Rive's own internal tap
 * threshold isn't exposed to the app, so this is a visual "you're building
 * momentum" cue, not a literal countdown. */
const TAP_PROGRESS_PIPS = 4;

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

type Phase = 'loading' | 'ready' | 'opening' | 'revealed' | 'error';

const CONFETTI_COLORS = ['#FFD54D', '#FFC800', '#FFFFFF', '#F59E0B'];

/** Hard cap on chest API calls — a hung request must never trap the scene
 *  on "Opening your chest…" with no way out (cold backend, dropped connection). */
function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}

/** Reward-specific sonic layer on top of the shared chest burst — reuses the
 * existing synth bank rather than inventing new audio assets. */
function playRewardTypeFlourish(currency: CelebrationCurrency) {
  switch (currency) {
    case 'XP':
      playSparkle();
      return;
    case 'FREEZE':
      playIceCrackle();
      return;
    case 'BOOST':
      playWhoosh('up');
      return;
    case 'COINS':
    case 'HEARTS':
    default:
      playGemChime(0);
  }
}

export default function ChestScene({ scene, onAdvance }: ChestSceneProps) {
  const reducedMotion = useReducedMotion();
  const gamification = useGamification();
  const refreshGamification = gamification.refresh;

  const [phase, setPhase] = useState<Phase>('loading');
  const [error, setError] = useState<string | null>(null);
  const [chestId, setChestId] = useState<string | null>(scene.chestId ?? null);
  const [result, setResult] = useState<OpenResult | null>(null);
  const [rewardType, setRewardType] = useState<TeyroRewardType | undefined>(undefined);
  const [balanceShown, setBalanceShown] = useState<number>(gamification.coins);
  const [tapCount, setTapCount] = useState(0);
  const shakeControls = useAnimation();
  const openedRef = useRef(false);
  const riveFailedRef = useRef(false);
  // Mirrors `result` so async Rive callbacks always read the live value
  // instead of whatever their captured closure happened to hold.
  const resultRef = useRef<OpenResult | null>(null);
  const revealedRef = useRef(false);
  // Scheduled reveal sounds, cleared on unmount so nothing fires into a
  // scene the learner already left.
  const revealTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    const timers = revealTimersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);
  // Lazy initializers, not effects: picked once per scene instance so a
  // re-render never rerolls the line the learner is mid-reading.
  const [readyHeadline] = useState(() => pickChestReadyHeadline());
  const [tapHint] = useState(() => pickChestTapHint());
  const [revealLine, setRevealLine] = useState<string | null>(null);

  // ── Fetch today's chest when this is the Daily Chest path with no id ──────
  useEffect(() => {
    if (scene.claim || chestId) {
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
  }, [chestId, scene.claim]);

  // ── Server-first open/claim, then hand off to Rive for the tap-to-open ────
  const beginOpen = () => {
    if (openedRef.current) return;
    openedRef.current = true;
    setPhase('opening');
    playChestCreak();
    // playAudio:false — playHaptic fires its own separate audio event by
    // default (a different system from celebrationAudio.ts); we already
    // have a bespoke creak sound for this exact moment, so only take the
    // vibration channel here to avoid two competing sounds on one tap.
    playHaptic('medium', false);

    (async () => {
      try {
        let rawType: string;
        let amount: number;
        let rarityTier: string;

        if (scene.claim) {
          const data = await scene.claim();
          rawType = data.type;
          amount = data.amount;
          rarityTier = data.rarityTier || 'common';
        } else {
          const res = await fetchWithTimeout(`/api/chest/${chestId}/open`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'x-timezone-offset': new Date().getTimezoneOffset().toString() },
          });
          const data = await res.json().catch(() => ({}));

          if (!res.ok) {
            // Already opened earlier today — surface the recorded reward gracefully
            if (res.status === 409 || data?.rewardSnapshotType) {
              rawType = data.rewardSnapshotType || 'COINS';
              amount = Number(data.rewardSnapshotAmount) || 15;
              rarityTier = String(data.rarityTier || 'common');
            } else {
              throw new Error(data?.message || 'Failed to open the chest.');
            }
          } else {
            rawType = data.rewardType || 'COINS';
            amount = Number(data.rewardAmount) || 15;
            rarityTier = String(data.rarityTier || 'common');
          }
        }

        const r: OpenResult = { currency: toCelebrationCurrency(rawType), amount, rarityTier };
        resultRef.current = r;
        setResult(r);
        setRewardType(toTreasureChestRewardType(rawType));

        // Rive failed to load before the reward was known — nothing will ever
        // fire rewardReveal, so complete the beat ourselves right away.
        if (riveFailedRef.current) finishReveal(r);
      } catch (e: unknown) {
        console.error('ChestScene open failed:', e);
        const aborted = e instanceof DOMException && e.name === 'AbortError';
        setError(aborted ? 'The chest is taking too long to reach. Check your connection.' : e instanceof Error ? e.message : 'Failed to open the chest.');
        setPhase('error');
      }
    })();
  };

  /** Scene entry beat: the chest arriving should be heard, not just seen.
   * Fires once when the chest first becomes tappable (not on every render),
   * with the rarity stamp landing just after it. */
  const enterSoundPlayedRef = useRef(false);
  useEffect(() => {
    if (phase !== 'ready' || enterSoundPlayedRef.current) return;
    enterSoundPlayedRef.current = true;
    playChestAppear();
    playHaptic('soft', false); // gentle arrival tap, vibration only — playChestAppear is the sound
    const timer = setTimeout(() => {
      playRarityStamp(result?.rarityTier === 'rare');
      playHaptic(result?.rarityTier === 'rare' ? 'success' : 'selection', false);
    }, 260);
    return () => clearTimeout(timer);
  }, [phase, result?.rarityTier]);

  /** Error beat gets its own (gentle) sound so a failure isn't silent. */
  const errorSoundPlayedRef = useRef(false);
  useEffect(() => {
    if (phase !== 'error' || errorSoundPlayedRef.current) return;
    errorSoundPlayedRef.current = true;
    playChestError();
    playHaptic('warning', false); // vibration only — playChestError is the sound
  }, [phase]);

  /** Every tap actually forwarded to Rive (including the first) — escalating
   * shake sound + haptic + a quick CSS pulse so the chest visibly and
   * audibly reacts to each tap, not just the final reveal. */
  const handleTap = (tapIndex: number) => {
    setTapCount(tapIndex);
    playChestShake(tapIndex);
    playHaptic(tapIndex >= 3 ? 'medium' : 'light', false); // vibration only — playChestShake is the sound
    if (!reducedMotion) {
      void shakeControls.start({
        x: [0, -5, 5, -3, 3, 0],
        rotate: [0, -1.5, 1.5, -1, 0],
        transition: { duration: 0.26, ease: 'easeInOut' },
      });
    }
  };

  /** Rive's rewardReveal trigger fired — the visual chest has opened. */
  const handleRewardReveal = () => {
    // Read through the ref, not the render closure: Rive's trigger callback
    // may hold a closure from an earlier render, and a stale `null` here
    // would silently swallow the reveal and hang the scene on "opening"
    // with the reward already granted server-side.
    const r = resultRef.current;
    if (!r) return;
    // Layered reveal: fanfare (the moment) → rush (the reward physically
    // bursting out) → reward-type flourish (what it actually is). The
    // per-item chimes from RewardPile land on top of this as they drop.
    playChestRevealFanfare();
    playHaptic('teyroCelebration', false); // vibration only — the fanfare + rush + flourish are the sound layer
    revealTimersRef.current.push(
      setTimeout(() => playRewardRush(), 160),
      setTimeout(() => playRewardTypeFlourish(r.currency), 300)
    );
    if (!reducedMotion) {
      confetti({
        particleCount: r.rarityTier === 'rare' ? 130 : 80,
        spread: 85,
        startVelocity: 42,
        origin: { x: 0.5, y: 0.55 },
        colors: CONFETTI_COLORS,
        scalar: 0.95,
        disableForReducedMotion: true,
      });
    }
    finishReveal(r);
  };

  /** Rive failed to load/bind — fall back to an instant reveal so the
   * reward is never blocked on a broken animation. */
  const handleChestError = () => {
    riveFailedRef.current = true;
    if (!openedRef.current) beginOpen();
    else if (result) finishReveal(result);
  };

  const finishReveal = (r: OpenResult) => {
    if (revealedRef.current) return; // idempotent: Rive event + safety timeout must never double-fire
    revealedRef.current = true;
    setRevealLine(pickChestRevealLine(r.rarityTier));
    setPhase('revealed');
    setBalanceShown((b) => b + (r.currency === 'COINS' ? r.amount : 0));
    // Tick the headline count-up so the number climbing is audible, not
    // just animated. Synced to CountUpNumber's 0.55s duration.
    if (!reducedMotion) {
      for (let i = 0; i < 6; i++) {
        const t = setTimeout(() => playRewardTick(i), 340 + i * 80);
        revealTimersRef.current.push(t);
      }
    }
    // Sync the header pill with the server — the chest payout landed there
    // first, and nothing else in the scene triggers a gamification refresh.
    void refreshGamification();
  };

  /** Safety net: the reward is already persisted server-side by the time we
   * have a result, so if Rive never fires `rewardReveal` (stalled state
   * machine, dropped trigger, a .riv that changed shape), the learner must
   * still be shown what they earned rather than sitting on "opening"
   * forever with an unseen reward. */
  useEffect(() => {
    if (phase !== 'opening' || !result) return;
    const timer = setTimeout(() => {
      if (revealedRef.current) return;
      console.warn('ChestScene: rewardReveal never fired — completing reveal via safety timeout.');
      finishReveal(result);
    }, 8000);
    return () => clearTimeout(timer);
    // finishReveal is stable enough here — it only reads refs and setState.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, result]);

  /** Skipping mid-flow: if the reward was already claimed server-side (the
   * POST fires on first tap, before any reveal), the balance in the header
   * is now stale — refresh it on the way out so the learner's coins are
   * correct even though they skipped the animation. */
  const handleSkip = () => {
    // No bespoke sound for skip — leave playAudio on so playHaptic's own
    // BUTTON_SECONDARY_CLICK event is the only sound for this action.
    playHaptic('light');
    if (openedRef.current && !revealedRef.current) void refreshGamification();
    onAdvance();
  };

  /** CONTINUE press — confirm sound + haptic so the exit is as tactile as
   * the rest of the interaction. No bespoke sound here either, so this
   * stays on playHaptic's default BUTTON_PRIMARY_CLICK event. */
  const handleContinue = () => {
    playHaptic('medium');
    onAdvance();
  };

  const pileCount = result ? Math.max(3, Math.min(7, Math.ceil(result.amount / 8))) : 0;

  return (
    <SceneShell
      cornerBalance={{ currency: 'COINS', value: balanceShown }}
      cta={
        phase === 'revealed' || phase === 'error'
          ? { text: 'CONTINUE', onClick: handleContinue, variant: phase === 'error' ? 'ghost' : 'gold' }
          : null
      }
      // Loading / server-first open in flight — keep the skip hatch available.
      // handleSkip (not onAdvance) so a reward claimed but skipped before the
      // reveal still refreshes the header balance on the way out.
      onSkip={phase === 'revealed' || phase === 'error' ? undefined : handleSkip}
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
          readyHeadline
        )}
      </h1>

      {/* Stage: rarity label + chest + shadow + pile — grouped tightly so the
          chest reads as one unit, not a headline floating far above it. */}
      <div className={styles.chestStage}>
        {(phase === 'ready' || phase === 'opening') && (
          <RarityLabel tier={result?.rarityTier ?? 'common'} />
        )}

        {/* Idle sparkles while waiting for the tap */}
        {phase === 'ready' &&
          !reducedMotion &&
          [
            { top: '-4%', left: '12%', delay: 0 },
            { top: '18%', right: '10%', delay: 0.45 },
            { bottom: '26%', left: '4%', delay: 0.9 },
          ].map((pos, i) => (
            <span
              key={i}
              aria-hidden
              className={styles.chestIdleSparkle}
              style={{ ...pos, animationDelay: `${pos.delay}s` }}
            >
              ✦
            </span>
          ))}

        {/* The Rive chest — hidden once the reward pile has taken over.
            shakeControls (imperative, not key-remount) replays the pulse on
            every tap without ever unmounting the Rive canvas underneath —
            remounting here would reload the .riv file on every single tap. */}
        {phase !== 'revealed' && (
          <motion.div style={{ position: 'relative', zIndex: 2 }} animate={shakeControls}>
            <ChestArt
              rewardType={rewardType}
              active={phase === 'ready' || phase === 'opening'}
              onStart={beginOpen}
              onTap={handleTap}
              onRewardReveal={handleRewardReveal}
              onError={handleChestError}
            />
          </motion.div>
        )}

        {/* Reward pile drops after the chest reveals */}
        {phase === 'revealed' && result && (
          <RewardPile
            iconSrc={CURRENCY_ICONS[result.currency]}
            count={pileCount}
            startDelay={reducedMotion ? 0 : 220}
            onItemLand={(i) => {
              if (!reducedMotion) {
                playGemChime(i);
                playHaptic('selection', false); // subtle per-item tick, vibration only
              }
            }}
          />
        )}

        <div
          className={styles.chestShadow}
          style={{ opacity: phase === 'revealed' ? 0.75 : 1 }}
        />
      </div>

      {phase === 'loading' && <p className={styles.subhead}>Opening your chest…</p>}
      {phase === 'ready' && <p className={styles.tapHint}>{tapHint}</p>}
      {phase === 'opening' && (
        <p className={styles.tapHint} key={tapCount}>
          {tapProgressHint(tapCount)}
        </p>
      )}
      {phase === 'error' && <p className={styles.errorNote}>{error ?? 'Something went wrong.'}</p>}

      {/* Bottom progress indicator — Duolingo-style "you're building
          momentum" cue. Not a literal countdown (Rive's internal tap
          threshold isn't exposed to the app), just visible reaction to
          each tap so it never feels like nothing happened. */}
      {phase === 'opening' && (
        <div className={styles.tapProgressRow} aria-hidden>
          {Array.from({ length: TAP_PROGRESS_PIPS }).map((_, i) => (
            <span
              key={i}
              className={`${styles.tapProgressPip} ${tapCount > i ? styles.tapProgressPipFilled : ''}`}
            />
          ))}
        </div>
      )}

      {phase === 'revealed' && result && revealLine && (
        <TypewriterBubble text={revealLine} startDelay={300} />
      )}
    </SceneShell>
  );
}
