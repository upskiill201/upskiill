'use client';

/**
 * Step 15 — "Let Tey keep you on track": the notification permission step.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * WHERE THE NOTIFICATION REQUEST LIVES, AND WHY
 * ═══════════════════════════════════════════════════════════════════════════
 * Reviewed against the whole flow (screens 0–15) rather than dropped at the
 * end by default. Step 15 is the right home, for four reasons — one of them a
 * hard constraint:
 *
 *  1. HARD CONSTRAINT — it must come after step 12 (sign-up). A push
 *     subscription is registered against an authenticated user at
 *     POST /api/tey/push/subscriptions. Asking before step 12 would win the
 *     browser permission and then have nowhere to attach the subscription, so
 *     the learner would be told reminders are on while nothing could ever be
 *     delivered. That rules out steps 0–11 outright, including step 11 (the
 *     streak screen), which is otherwise the most thematically obvious spot.
 *  2. The value is established. By 15 the learner has picked a skill (2–4),
 *     set a pace (5), completed a real exercise (8–10), been shown that daily
 *     consistency is the mechanic (11) and earned their first badge (13).
 *     "I'll remind you" now refers to something concrete they have.
 *  3. It is the last screen before the app. Permission is asked when it is
 *     about to become useful, not banked pages in advance.
 *  4. Steps 13 and 14 are emotional peaks (first badge, learning with
 *     friends). Asking on the beat after a peak converts better than
 *     interrupting one.
 *
 * WHAT CHANGED: this step used to open with a PWA install phase. Installation
 * has moved ahead of onboarding entirely, to the /start gateway — learners now
 * install before they ever reach screen 0. The install UI here is reduced to a
 * single fallback, shown only in the one case where it is load-bearing: iOS
 * outside the installed app, where Safari exposes PushManager exclusively to a
 * home-screen PWA (16.4+), so the permission button would prompt nothing.
 *
 * HOW IT INTEGRATES WITH ONBOARDING STATE: it does not touch it. No step was
 * inserted, renumbered or removed; TOTAL_STEPS is still 15, the progress bar
 * still reads X/15, OnboardingShell still owns advance/back, and
 * `onNext` still routes through the same handleAdvance that every other step
 * uses. Notification permission is deliberately NOT persisted into onboarding
 * answers — the browser owns that state, and a cached copy would go stale the
 * moment the learner changed it in system settings.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Bell, BellOff, Check, Flame, Smartphone, Sparkles, Trophy } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { useTeyPush } from '@/hooks/useTeyPush';
import { playHaptic } from '@/lib/haptics';
import { emitAudioEvent } from '@/lib/audio/audioEvents';
import { playLevelUpFanfare, playSparkle } from '@/lib/audio/celebrationAudio';
import { trackInstallEvent } from '@/lib/pwa/analytics';
import { detectBrowser, detectPlatform } from '@/lib/pwa/platform';
import { ConfettiBurst } from '../ConfettiBurst';

interface Step15ContentProps {
  onNext: () => void;
}

type Phase =
  /** iOS in a browser tab: push is impossible until Teyro is installed. */
  | 'needs-install'
  /** The pre-permission screen. Nothing is requested until a tap here. */
  | 'ask'
  /** The answer, whatever it was. Never a punishment. */
  | 'result'
  | 'celebrate';

type Outcome = 'granted' | 'denied' | 'unsupported' | 'subscription-failed';

const cardVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 320, damping: 28 } },
  exit: { y: -16, opacity: 0, transition: { duration: 0.18 } },
};

const headlineShadow =
  '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

function PrimaryButton({
  children,
  onClick,
  ariaLabel,
  busy = false,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
  busy?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      whileHover={busy ? undefined : { scale: 1.03 }}
      whileTap={busy ? undefined : { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
      onClick={busy ? undefined : onClick}
      aria-label={ariaLabel}
      aria-busy={busy}
      disabled={busy}
      className="group relative w-full flex items-center justify-center gap-2.5 py-4 md:py-5 rounded-2xl text-white font-bold text-[clamp(1.05rem,5vw,1.2rem)] cursor-pointer disabled:cursor-default disabled:opacity-75"
      style={{
        backgroundColor: '#0172FD',
        boxShadow:
          '0 12px 24px -8px rgba(1,114,253,0.4), inset 0px -6px 0px rgba(0,0,0,0.24), inset 0px 2px 0px rgba(255,255,255,0.2)',
      }}
    >
      {busy ? (
        <span className="w-5 h-5 rounded-full border-[3px] border-white/35 border-t-white animate-spin" aria-hidden="true" />
      ) : (
        icon
      )}
      <span>{children}</span>
      {!busy && !icon && (
        <ArrowRight className="absolute right-5 md:right-6 w-5 h-5 md:w-6 md:h-6 stroke-[3] transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
      )}
    </motion.button>
  );
}

function SecondaryLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 w-full text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0172FD]"
    >
      {children}
    </button>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="w-full max-w-[420px] rounded-[1.75rem] bg-white/90 backdrop-blur-sm border-2 border-[#E2E8F0] p-6 md:p-7 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.15)]"
    >
      {children}
    </motion.div>
  );
}

function Benefit({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#0172FD]" aria-hidden="true">
        {icon}
      </span>
      <span className="text-[15px] font-semibold text-[#071233]">{label}</span>
    </li>
  );
}

export default function Step15Content({ onNext }: Step15ContentProps) {
  useOnboardingSession({ currentStep: 15, disableGuard: true });
  const router = useRouter();
  const reduce = useReducedMotion() ?? false;

  const { ready, supported, permission, subscribed, needsInstall, busy, enable } = useTeyPush();

  const [phase, setPhase] = useState<Phase>('ask');
  const [outcome, setOutcome] = useState<Outcome>('granted');
  /** One retry offered when permission was won but the subscription failed. */
  const [retriedSubscription, setRetriedSubscription] = useState(false);
  const viewTrackedRef = useRef(false);

  const context = useCallback(
    () => ({ platform: detectPlatform(), browser: detectBrowser(), step: 15 }),
    [],
  );

  const goCelebrate = useCallback(() => {
    playLevelUpFanfare();
    setPhase('celebrate');
  }, []);

  // ── Which screen does this learner actually need? ────────────────────────
  // Resolved from live browser state on every mount rather than from a stored
  // flag, so revisiting step 15 (back navigation, a resumed session, a second
  // device) always reflects the truth right now.
  /* eslint-disable react-hooks/set-state-in-effect --
   * Resolving the opening phase requires reading the browser's notification
   * permission and service-worker registration, neither of which exists during
   * render. This is the "synchronise with an external system" case: the phase
   * is genuinely stateful afterwards (it advances on taps), so it cannot be a
   * derived value. */
  useEffect(() => {
    // Hold on the ask screen until the push probe has actually run. Every
    // field below starts pessimistic, so branching early would send every
    // learner down the "your browser can't do this" path for a frame — and,
    // because that path skips straight to the celebration, permanently.
    if (!ready) return;

    if (needsInstall) {
      setPhase('needs-install');
      return;
    }

    if (!supported || permission === 'unsupported') {
      // Nothing to ask for. Never block onboarding over it — skip straight
      // past, silently. The learner loses reminders, not the product.
      setOutcome('unsupported');
      setPhase('celebrate');
      return;
    }

    if (permission === 'granted') {
      // Already answered yes, on this device, previously. Asking again is
      // impossible (the browser will not re-prompt) and pretending otherwise
      // would show a button that does nothing.
      setPhase('result');
      setOutcome('granted');
      return;
    }

    if (permission === 'denied') {
      // Also unaskable: a denied permission can only be undone in browser
      // settings. Say so once, kindly, and move on.
      setPhase('result');
      setOutcome('denied');
      return;
    }

    setPhase('ask');
  }, [ready, needsInstall, supported, permission]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Funnel: fires once, only for learners who actually see the ask.
  useEffect(() => {
    if (!ready || phase !== 'ask' || viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    trackInstallEvent('notification_screen_viewed', context());
  }, [ready, phase, context]);

  // ── The request. Only ever from inside this click handler ────────────────
  const handleEnable = useCallback(async () => {
    playHaptic('medium');
    trackInstallEvent('notification_enable_clicked', context());

    // enable() calls Notification.requestPermission() synchronously inside
    // this gesture. Browsers ignore a request that is not user-initiated, and
    // Safari treats a programmatic one as a denial the learner can only undo
    // through system settings — so nothing may be awaited before it.
    let result: Awaited<ReturnType<typeof enable>>;
    try {
      result = await enable();
    } catch {
      result = 'error';
    }

    // Permission and subscription are separate states: the browser can say yes
    // and the registration still fail (no VAPID key configured, offline, the
    // push service unreachable). Read the permission back rather than
    // inferring it from the single return value.
    const grantedPermission =
      typeof Notification !== 'undefined' && Notification.permission === 'granted';

    if (result === 'granted') {
      trackInstallEvent('notification_permission_granted', context());
      trackInstallEvent('push_subscription_success', context());
      emitAudioEvent('ACTION_SUCCESS');
      playSparkle();
      setOutcome('granted');
      setPhase('result');
      return;
    }

    if (grantedPermission) {
      // Yes from the human, no from the plumbing.
      trackInstallEvent('notification_permission_granted', context());
      trackInstallEvent('push_subscription_failed', { ...context(), reason: result });
      setOutcome('subscription-failed');
      setPhase('result');
      return;
    }

    if (result === 'unsupported') {
      setOutcome('unsupported');
      setPhase('celebrate');
      return;
    }

    if (result === 'needs-install') {
      setPhase('needs-install');
      return;
    }

    trackInstallEvent('notification_permission_denied', context());
    // Deliberately the neutral secondary tone, not the error sound. Declining
    // is a valid answer and must not be scored as a mistake.
    emitAudioEvent('BUTTON_SECONDARY_CLICK');
    setOutcome('denied');
    setPhase('result');
  }, [enable, context]);

  /** One quiet retry for a failed subscription, then we stop asking. */
  const handleRetrySubscription = useCallback(async () => {
    playHaptic('light');
    setRetriedSubscription(true);
    try {
      const result = await enable();
      if (result === 'granted') {
        trackInstallEvent('push_subscription_success', { ...context(), retry: true });
        emitAudioEvent('ACTION_SUCCESS');
        setOutcome('granted');
        return;
      }
      trackInstallEvent('push_subscription_failed', { ...context(), retry: true, reason: result });
    } catch {
      trackInstallEvent('push_subscription_failed', { ...context(), retry: true, reason: 'threw' });
    }
  }, [enable, context]);

  const handleSkip = useCallback(() => {
    playHaptic('light');
    trackInstallEvent('notification_permission_denied', { ...context(), reason: 'skipped' });
    goCelebrate();
  }, [context, goCelebrate]);

  const handleFinish = useCallback(() => {
    playHaptic('medium');
    onNext();
  }, [onNext]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end md:justify-center px-5 md:px-0 pb-6 md:pb-0 pt-2">
      <AnimatePresence mode="wait">
        {/* ── iOS, not installed: push is impossible until it is ─────────── */}
        {phase === 'needs-install' && (
          <motion.div
            key="needs-install"
            variants={cardVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full flex flex-col items-center gap-5"
          >
            <h1
              className="text-[clamp(1.8rem,9vw,2.5rem)] font-[900] leading-[1.1] text-center text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              I can&apos;t nudge you from <span className="text-[#0172FD]">a browser tab</span>
            </h1>
            <Card>
              <p className="text-[15px] font-semibold text-[#071233] leading-snug mb-2">
                On iPhone and iPad, reminders only work once I&apos;m on your Home Screen. That&apos;s
                Apple&apos;s rule, not mine — I&apos;d nag you from anywhere.
              </p>
              <p className="text-[14px] font-medium text-slate-500 leading-snug mb-6">
                Takes about ten seconds. I&apos;ll walk you through it.
              </p>
              <PrimaryButton
                onClick={() => {
                  playHaptic('medium');
                  // The gateway owns installation end to end; duplicating the
                  // guide here is how the two drift apart.
                  router.push('/start');
                }}
                icon={<Smartphone className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />}
                ariaLabel="Show me how to add Teyro to my Home Screen"
              >
                Show me how
              </PrimaryButton>
              <SecondaryLink onClick={handleSkip}>Skip — finish without reminders</SecondaryLink>
            </Card>
          </motion.div>
        )}

        {/* ── The pre-permission screen ──────────────────────────────────── */}
        {phase === 'ask' && (
          <motion.div
            key="ask"
            variants={cardVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full flex flex-col items-center gap-5"
          >
            <h1
              className="text-[clamp(1.9rem,9vw,2.6rem)] font-[900] leading-[1.1] text-center text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              Let me keep you <span className="text-[#0172FD]">on track</span>
            </h1>
            <Card>
              <p className="text-[15px] font-semibold text-[#071233] leading-snug mb-5">
                I&apos;ll remind you about lessons, streaks and rewards — and the things you&apos;re
                conveniently trying to forget. 😏
              </p>
              <ul className="flex flex-col gap-4 mb-6">
                <Benefit icon={<Flame className="w-4 h-4" aria-hidden="true" />} label="A nudge before your streak breaks" />
                <Benefit icon={<Trophy className="w-4 h-4" aria-hidden="true" />} label="When a reward is waiting for you" />
                <Benefit icon={<Bell className="w-4 h-4" aria-hidden="true" />} label="Nothing else. No spam, ever." />
              </ul>
              <PrimaryButton
                onClick={handleEnable}
                busy={busy}
                icon={<Bell className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />}
                ariaLabel="Enable reminder notifications"
              >
                Enable notifications
              </PrimaryButton>
              <SecondaryLink onClick={handleSkip}>Not now</SecondaryLink>
            </Card>
          </motion.div>
        )}

        {/* ── The answer ─────────────────────────────────────────────────── */}
        {phase === 'result' && (
          <motion.div
            key="result"
            variants={cardVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full flex flex-col items-center gap-5"
          >
            <h1
              className="text-[clamp(1.9rem,9vw,2.6rem)] font-[900] leading-[1.1] text-center text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              {outcome === 'granted' ? (
                <>
                  Good <span className="text-[#0172FD]">choice.</span>
                </>
              ) : outcome === 'denied' ? (
                <>
                  Noted. <span className="text-[#0172FD]">No hard feelings.</span>
                </>
              ) : (
                <>
                  Almost <span className="text-[#0172FD]">there</span>
                </>
              )}
            </h1>

            <Card>
              <div className="flex items-start gap-3 mb-6">
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#0172FD]"
                  aria-hidden="true"
                >
                  {outcome === 'granted' ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                  ) : outcome === 'denied' ? (
                    <BellOff className="w-5 h-5" />
                  ) : (
                    <Bell className="w-5 h-5" />
                  )}
                </span>
                <p className="text-[15px] font-semibold text-[#071233] leading-snug">
                  {outcome === 'granted' &&
                    (subscribed
                      ? "I'd hate to watch that streak disappear. 😏"
                      : "Reminders are on. I'd hate to watch that streak disappear. 😏")}
                  {outcome === 'denied' &&
                    'You can turn reminders on any time from Settings — I’ll be here either way.'}
                  {outcome === 'subscription-failed' &&
                    'You said yes, but I couldn’t finish setting reminders up just now. I’ll keep trying quietly in the background — nothing for you to do.'}
                </p>
              </div>

              {outcome === 'subscription-failed' && !retriedSubscription ? (
                <>
                  <PrimaryButton onClick={handleRetrySubscription} busy={busy} ariaLabel="Try setting up reminders again">
                    Try again
                  </PrimaryButton>
                  <SecondaryLink onClick={goCelebrate}>Skip it — I&apos;m done here</SecondaryLink>
                </>
              ) : (
                <PrimaryButton onClick={goCelebrate}>Continue</PrimaryButton>
              )}
            </Card>
          </motion.div>
        )}

        {/* ── Done ───────────────────────────────────────────────────────── */}
        {phase === 'celebrate' && (
          <motion.div
            key="celebrate"
            variants={cardVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full max-w-[420px] text-center relative"
          >
            {!reduce && <ConfettiBurst active />}
            <h1
              className="text-[clamp(2.2rem,12vw,3.2rem)] font-[900] leading-[1.05] mb-2 text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              You&apos;re all set!
            </h1>
            <p className="text-[clamp(1.05rem,5vw,1.2rem)] font-medium text-slate-500 mb-8">
              Your dashboard is ready. Let&apos;s achieve great things together.
            </p>
            <PrimaryButton
              onClick={handleFinish}
              icon={<Sparkles className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />}
            >
              Enter Teyro
            </PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
