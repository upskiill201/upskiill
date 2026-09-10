'use client';

/**
 * Step13Content — "First Badge Unlocked!"
 *
 * This step is a REAL milestone, not a static slide: pressing the CTA claims
 * the Novice achievement server-side (metric-gated on the onboarding session
 * reaching step 13) and the Celebration Engine plays the ACHIEVEMENT scene as
 * a full-page takeover. The unlock lands in the user's permanent profile
 * collection. "Continue Your Journey" only appears after a successful claim —
 * the badge cannot be skipped. Idempotent: revisits and back-navigation see
 * the claimed state and go straight to Continue.
 */

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Check, Loader2, Medal, RotateCcw } from 'lucide-react';
import { useOnboardingSession, syncToBackend } from '@/hooks/useOnboardingSession';
import { useCelebration } from '@/context/CelebrationContext';
import { claimOnboardingBadge, fetchNoviceBadgeStatus } from '@/lib/achievements';
import { playHaptic } from '@/lib/haptics';

const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
};
const wordVariant: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 28 } },
};
const accentVariant: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } },
};

type ClaimState = 'checking' | 'claimable' | 'claiming' | 'claimed' | 'error';

interface Step13ContentProps {
  onNext: () => void;
}

export default function Step13Content({ onNext }: Step13ContentProps) {
  const { completedSteps, answers } = useOnboardingSession({ currentStep: 13, disableGuard: true });
  const { celebrate } = useCelebration();
  const [idle, setIdle] = useState(false);
  const [claimState, setClaimState] = useState<ClaimState>('checking');

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // ── Server truth on mount: already unlocked AND viewed → straight to Continue ──
  useEffect(() => {
    let cancelled = false;
    fetchNoviceBadgeStatus().then((status) => {
      if (cancelled) return;
      // null (offline / logged out) falls forward to claimable — the claim
      // request surfaces the real error where the user can retry it.
      setClaimState(status?.unlocked && status.seen ? 'claimed' : 'claimable');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClaim = async () => {
    if (claimState === 'claiming' || claimState === 'claimed' || claimState === 'checking') return;
    setClaimState('claiming');
    playHaptic('medium');

    // The step-12→13 advance syncs currentStep to the backend without
    // awaiting it (kept non-blocking so navigation feels instant). The claim
    // below is gated server-side on that session showing step 13 reached, so
    // on a slow connection the claim can race ahead of that write and fail
    // with a false "not earned yet". Re-sync (idempotent) and CONFIRM it
    // landed before claiming — syncToBackend can fail silently (dropped
    // packet, cold-starting backend, weak signal), and awaiting a call that
    // doesn't report its own outcome is not actually a guarantee of
    // anything. Retry a few times rather than firing the claim into a
    // session we never confirmed reached step 13.
    let synced = false;
    for (let attempt = 0; attempt < 3 && !synced; attempt++) {
      if (attempt > 0) await new Promise((r) => setTimeout(r, 800 * attempt));
      synced = await syncToBackend({ currentStep: 13, completedSteps, answers });
    }

    const result = await claimOnboardingBadge();
    if (!result.ok || !result.unlock) {
      playHaptic('error');
      setClaimState('error');
      return;
    }

    const u = result.unlock;
    celebrate({
      kind: 'ACHIEVEMENT',
      badgeId: u.badgeId,
      badgeTitle: u.badgeTitle,
      tier: u.tier,
      maxTier: u.maxTier,
      tierDescription: u.description,
      badgeBg: u.badgeBg,
      ctaText: 'AWESOME!',
      dedupeKey: 'onboarding-novice-claim',
      onComplete: () => setClaimState('claimed'),
    });

    // Safety hatch: if the scene never opens (engine suppressed by an edge
    // case), don't leave the step gated behind a stuck 'claiming' state.
    window.setTimeout(() => {
      setClaimState((s) => (s === 'claiming' ? 'claimed' : s));
    }, 1200);
  };

  const headlineShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  // ── CTA per claim state ─────────────────────────────────────────────────────
  const cta =
    claimState === 'claimed'
      ? {
          label: 'Continue Your Journey',
          icon: <ArrowRight className="absolute right-5 md:right-10 w-6 h-6 md:w-7 md:h-7 stroke-[3] transition-transform group-hover:translate-x-1.5" />,
          onClick: onNext,
          disabled: false,
        }
      : claimState === 'claiming'
        ? {
            label: 'Unlocking…',
            icon: <Loader2 className="absolute right-5 md:right-10 w-6 h-6 md:w-7 md:h-7 stroke-[3] animate-spin" />,
            onClick: undefined,
            disabled: true,
          }
        : claimState === 'checking'
          ? {
              label: 'Preparing your badge…',
              icon: <Loader2 className="absolute right-5 md:right-10 w-6 h-6 md:w-7 md:h-7 stroke-[3] animate-spin" />,
              onClick: undefined,
              disabled: true,
            }
          : {
              label: claimState === 'error' ? 'Try Again' : 'Claim Your Badge',
              icon: claimState === 'error'
                ? <RotateCcw className="absolute right-5 md:right-10 w-6 h-6 md:w-7 md:h-7 stroke-[3]" />
                : <Medal className="absolute right-5 md:right-10 w-6 h-6 md:w-7 md:h-7 stroke-[2.6] transition-transform group-hover:translate-x-1.5" />,
              onClick: handleClaim,
              disabled: false,
            };

  return (
    <div className="w-full h-full flex flex-col items-center md:items-start justify-end md:justify-center text-center md:text-left px-5 md:px-0 pb-6 md:pb-0 pt-2">
      {/* ── HEADLINE ── */}
      <motion.h1
        variants={headlineContainer}
        initial="hidden"
        animate="show"
        className="text-[clamp(2.5rem,14vw,3.5rem)] md:text-[3.5rem] lg:text-[4.5rem] font-[900] leading-[1.05] md:leading-[1.1] mb-2 md:mb-4 tracking-tight text-[#071233]"
        style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
      >
        <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>First</motion.span>
        <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>Badge</motion.span>
        <br />
        <motion.span variants={accentVariant} className="text-[#0172FD]" style={{ display: 'inline-block', textShadow: accentShadow }}>
          Unlocked!
        </motion.span>
      </motion.h1>

      {/* ── SUBTITLE ── */}
      <motion.p
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
        className="text-[clamp(1.05rem,5vw,1.25rem)] md:text-xl lg:text-[1.35rem] mb-6 md:mb-10 font-medium text-slate-500 md:text-slate-600 leading-snug max-w-[92%] md:max-w-none"
        style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 10px rgba(255,255,255,1)' }}
      >
        I&apos;m impressed already.
        <br />
        Keep going — you&apos;re doing amazing!
      </motion.p>

      {/* ── CTA (claim-gated) ── */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.45 }}
        className="w-full md:w-auto"
      >
        <motion.button
          animate={!cta.disabled && idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={idle ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] } : { type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={cta.disabled ? undefined : { scale: 1.03 }}
          whileTap={cta.disabled ? undefined : { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
          onClick={cta.onClick}
          disabled={cta.disabled}
          className="group relative w-full md:w-[340px] lg:w-[400px] flex items-center justify-center py-4 md:py-6 rounded-2xl text-white font-bold text-[clamp(1.05rem,5vw,1.3rem)] md:text-2xl cursor-pointer disabled:cursor-default disabled:opacity-70"
          style={{
            backgroundColor: '#0172FD',
            boxShadow:
              '0 12px 24px -8px rgba(1,114,253,0.4), inset 0px -6px 0px rgba(0,0,0,0.24), inset 0px 2px 0px rgba(255,255,255,0.2)',
          }}
        >
          <span>{cta.label}</span>
          {cta.icon}
        </motion.button>

        {/* Status caption — fixed height so state swaps never shift layout */}
        <div className="h-6 mt-3 flex items-center justify-center md:justify-start gap-1.5" aria-live="polite">
          {claimState === 'claimed' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 10px rgba(255,255,255,1)' }}
            >
              <Check className="w-4 h-4 stroke-[3]" />
              Got it — added to your collection
            </motion.p>
          )}
          {claimState === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-red-500"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 10px rgba(255,255,255,1)' }}
            >
              I couldn&apos;t reach the server — check your connection and try again.
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
