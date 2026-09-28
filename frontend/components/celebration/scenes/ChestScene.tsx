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
 *
 * Duolingo pass (2026-09-24): a bright white stage (SceneShell),
 * every sound on the studio instruments (lib/audio/lessonSounds.ts chest*
 * cues — one sonic world with the lessons), and one haptic rhythm:
 *   land: soft · taps: selection → light → rigid → medium ·
 *   lid gives: heavy + rigid ("boom-ba") · pile: throttled ticks ·
 *   CONTINUE: medium (the cha-ching).
 */

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import SceneShell from '../SceneShell';
import ChestArt from '../ChestArt';
import { ChestAura, CountUpNumber, RarityLabel, RewardPile, TypewriterBubble } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationCurrency, CelebrationScene } from '@/context/CelebrationContext';
import {
  CURRENCY_ICONS,
  CURRENCY_LABELS,
  toCelebrationCurrency,
  toTreasureChestRewardType,
  type TeyroRewardType,
} from '../currency';
import { chestRewardVariant, playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { useGamification } from '@/context/GamificationContext';
import {
  chestOpeningLine,
  pickChestReadyHeadline,
  pickChestRevealLine,
  pickChestTapHint,
} from '@/lib/tey/chestVoice';

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

// canvas-confetti draws on a canvas and can't take var(...) — resolve the
// brand tokens from app/globals.css at fire time instead.
function confettiColors(): string[] {
  const css = getComputedStyle(document.documentElement);
  return ['--warning', '--color-brand', '--brand-purple', '--success-green']
    .map((t) => css.getPropertyValue(t).trim())
    .filter(Boolean);
}

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
  const [rewardType, setRewardType] = useState<TeyroRewardType | undefined>(undefined);
  const [balanceShown, setBalanceShown] = useState<number>(gamification.coins);
  const [tapCount, setTapCount] = useState(0);
  const shakeControls = useAnimation();
  /** Last time a pile-landing haptic fired, so the pour's thirty-odd impacts
   *  don't stomp each other into a single blur. */
  const lastPileHapticRef = useRef(0);
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
    // The first tap's knock comes from handleTap (Rive reports every tap,
    // the first included) — no second sound here.

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

        const riveReward = toTreasureChestRewardType(rawType);
        if (riveReward) {
          setRewardType(riveReward);
        } else {
          // The server granted something the chest asset has no animation for.
          // Showing the coin animation instead would misrepresent a reward the
          // learner has already been given, so skip the animation and present
          // the real reward straight away.
          console.warn(
            `ChestScene: no chest animation for reward type "${rawType}" — revealing without the chest sequence.`
          );
          riveFailedRef.current = true;
          finishReveal(r);
          return;
        }

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
    const rare = result?.rarityTier === 'rare' || result?.rarityTier === 'epic';
    playSound('chestAppear', rare ? 1 : 0);
    // The haptic lands with the thump (~200ms into the cue), not the whoosh.
    const timer = setTimeout(() => playHaptic('soft', false), 200);
    return () => clearTimeout(timer);
  }, [phase, result?.rarityTier]);

  /** Error beat gets its own (gentle) sound so a failure isn't silent. */
  const errorSoundPlayedRef = useRef(false);
  useEffect(() => {
    if (phase !== 'error' || errorSoundPlayedRef.current) return;
    errorSoundPlayedRef.current = true;
    playSound('chestError');
    playHaptic('warning', false); // vibration only — chestError is the sound
  }, [phase]);

  /** Every tap actually forwarded to Rive (including the first) — escalating
   * shake sound + haptic + a quick CSS pulse so the chest visibly and
   * audibly reacts to each tap, not just the final reveal. */
  const handleTap = (tapIndex: number) => {
    setTapCount(tapIndex);
    playSound('chestTap', tapIndex);
    // Escalates in four steps rather than flipping straight to 'medium',
    // which is a 130ms double-pulse — fired on every tap from the third
    // onward, at roughly three taps a second, it smears into a continuous
    // rumble. This ramp tracks the aura winding up: a light tick while the
    // chest resists, real weight only once it's about to give.
    playHaptic(
      tapIndex >= 7 ? 'medium' : tapIndex >= 5 ? 'rigid' : tapIndex >= 3 ? 'light' : 'selection',
      false // vibration only — chestTap is the sound
    );
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
    const rare = r.rarityTier === 'rare' || r.rarityTier === 'epic';
    playSound('chestBurst', rare ? 1 : 0);
    // 'heavy' — one solid 35ms thump — NOT 'teyroCelebration' and NOT
    // 'success'. Both alternatives were measured against the installed
    // web-haptics build rather than assumed:
    //   • 'teyroCelebration' renders [1000]: a full second of unbroken
    //     vibration, which reads as an alarm rather than a reward. It was
    //     also being cut off ~220ms in regardless, because navigator.vibrate
    //     REPLACES any in-flight pattern and the first coin landing fires one.
    //   • 'success' renders [10,10,5,65,40] — byte-identical to 'medium', the
    //     pattern the late taps and the CONTINUE press already use. The single
    //     biggest beat in the scene would have felt exactly like a button.
    // A lone thump is the one shape nothing else here uses, so the lid giving
    // way is the only moment that feels like that.
    playHaptic('heavy', false); // vibration only — chestBurst + chestReward are the sound layer
    revealTimersRef.current.push(
      // "boom-ba": a second, sharper knock right behind the thump.
      setTimeout(() => playHaptic('rigid', false), 170),
      setTimeout(() => playSound('chestReward', chestRewardVariant(r.currency)), 420)
    );
    if (!reducedMotion) {
      confetti({
        particleCount: r.rarityTier === 'rare' ? 130 : 80,
        spread: 85,
        startVelocity: 42,
        origin: { x: 0.5, y: 0.55 },
        colors: confettiColors(),
        scalar: 0.95,
        disableForReducedMotion: true,
      });
    }
    finishReveal(r);
  };

  /** Rive failed to load, or the .riv no longer matches the expected view
   * model contract. The chest falls back to static art that is still
   * tappable, so we do NOT open the chest here — claiming the reward with no
   * learner intent would be worse than a missing animation. We only complete
   * the beat if the learner has already tapped and the reward has landed,
   * since nothing will ever fire `rewardReveal` now. */
  const handleChestError = (err: Error) => {
    console.error('ChestScene: chest animation unavailable —', err.message);
    riveFailedRef.current = true;
    if (openedRef.current && resultRef.current) finishReveal(resultRef.current);
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
        const t = setTimeout(() => playSound('chestTick', i), 560 + i * 80);
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
   * still be shown what they earned rather than sitting on "opening" forever
   * with an unseen reward.
   *
   * Keyed on `tapCount` so every tap restarts it: this is an *inactivity*
   * net, not a wall-clock cap on the animation. The chest needs several taps
   * to reach its reveal and a deliberate tapper can easily take longer than
   * any fixed budget — a wall-clock timer would cut them off and show the
   * reward early, which is exactly what must never happen. */
  useEffect(() => {
    if (phase !== 'opening' || !result) return;
    const timer = setTimeout(() => {
      if (revealedRef.current) return;
      console.warn('ChestScene: no reveal and no taps for 10s — completing reveal via safety net.');
      finishReveal(result);
    }, 10000);
    return () => clearTimeout(timer);
    // finishReveal is stable enough here — it only reads refs and setState.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, result, tapCount]);

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

  /** CONTINUE press — the reward is banked here, so it gets a cash-register
   * cha-ching rather than a generic button click. This is the moment the
   * learner actually pockets the payout, and it's the last thing they hear
   * from the scene.
   *
   * playAudio:false on the haptic — playHaptic fires its own
   * BUTTON_PRIMARY_CLICK sound by default, which would collide with the
   * till. Take the vibration channel only.
   *
   * 'medium' is deliberate: it maps to a two-pulse pattern (30ms, gap, 40ms),
   * which lands as "cha-ching" under the finger and matches the sound's two
   * hits. A single thump here would feel out of step with what you hear. */
  const handleContinue = () => {
    playSound('chestCollect');
    playHaptic('medium', false);
    onAdvance();
  };

  /** How many sprites pour out. Scales with the payout so 50 coins actually
   *  looks like 50 coins, while a single heart stays a small handful rather
   *  than a misleading mountain — the headline carries the exact number. */
  /** Winds the aura up as the learner taps. Caps below 1 while merely `ready`
   *  so the pre-tap state still has somewhere to build to — the ramp is the
   *  anticipation, and starting at full brightness spends it for nothing. */
  const auraEnergy = phase === 'opening' ? Math.min(1, 0.3 + tapCount * 0.16) : 0.12;

  const pileCount = !result
    ? 0
    : result.amount <= 2
      ? 5
      : Math.max(8, Math.min(34, Math.round(result.amount * 0.6) + 4));

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
          'Chest opened!'
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

        {/* The Rive chest — hidden once the reward pile has taken over.
            shakeControls (imperative, not key-remount) replays the pulse on
            every tap without ever unmounting the Rive canvas underneath —
            remounting here would reload the .riv file on every single tap. */}
        {phase !== 'revealed' && (
          <motion.div style={{ position: 'relative', zIndex: 2 }} animate={shakeControls}>
            {/* Glow, god-rays, sparkle ring and motes, winding up with each
                tap. Sits behind the chest and never takes pointer events. */}
            <ChestAura energy={auraEnergy} tapIndex={tapCount} />
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
              if (reducedMotion) return;
              const progress = pileCount > 1 ? i / (pileCount - 1) : 0;
              // Metallic clink per coin, detuning down as the heap deadens.
              // Every landing is voiced — that density IS the cascade — but
              // each hit is short and quiet enough not to smear.
              // Every other landing clinks — the cascade stays dense
              // without thirty-odd voices smearing into noise.
              if (i % 2 === 0 || progress > 0.9) playSound('chestPile', i);
              // Throttled by TIME, not by index. Thirty-four landings inside
              // ~1.5s can't each have their own buzz: every
              // `navigator.vibrate` call cancels the previous one, so rapid
              // fire produces one stuttering blur instead of a cascade.
              // Spacing them out gives a handful of distinct taps that track
              // the pour. 140ms measured out at ~5 ticks across the cascade;
              // 220ms only managed 2, which felt like the pile barely landed.
              const now = performance.now();
              if (now - lastPileHapticRef.current > 140) {
                lastPileHapticRef.current = now;
                playHaptic('selection', false);
              }
            }}
          />
        )}

      </div>

      {phase === 'revealed' && result && (
        <motion.div
          className={styles.rewardChip}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0.2 } : { delay: 0.45, type: 'spring', stiffness: 520, damping: 15 }}
          aria-live="polite"
        >
          <Image src={CURRENCY_ICONS[result.currency]} alt="" width={34} height={34} unoptimized />
          <span>
            +<CountUpNumber value={result.amount} from={0} duration={0.9} />{' '}
            <span className={styles.headlineAccent}>{CURRENCY_LABELS[result.currency]}</span>
          </span>
        </motion.div>
      )}

      {phase === 'loading' && <p className={styles.subhead}>Opening your chest…</p>}
      {phase === 'ready' && <p className={styles.tapHint}>{tapHint}</p>}
      {phase === 'opening' && (
        <p className={styles.tapHint} key={tapCount}>
          {chestOpeningLine(tapCount)}
        </p>
      )}
      {phase === 'error' && <p className={styles.errorNote}>{error ?? 'Something went wrong.'}</p>}

      {/* No tap-progress meter here on purpose. Rive owns the opening
          sequence and never tells the app how far through it is — taps that
          land mid-animation are absorbed, so the count varies run to run. A
          filling bar would read as a countdown, complete, and then still
          demand taps. The chest's own shake, sound and escalating copy carry
          the momentum instead. */}

      {phase === 'revealed' && result && revealLine && (
        <TypewriterBubble text={revealLine} startDelay={900} />
      )}
    </SceneShell>
  );
}
