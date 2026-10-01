'use client';

/**
 * Step 14 — "Let Tey keep you on track": the notification permission step.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * WHERE THE NOTIFICATION REQUEST LIVES, AND WHY
 * ═══════════════════════════════════════════════════════════════════════════
 * Reviewed against the whole flow (screens 0–15) rather than dropped at the
 * end by default. The final step is the right home, for four reasons — one of them a
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
 * INSTALL FIRST (Duolingo standard): in any browser tab that can install
 * Teyro, this step asks for the install before it asks for notifications —
 * reminders belong to the installed app, and on iOS Safari exposes
 * PushManager only to a home-screen PWA (16.4+). Android/desktop Chrome get
 * the one-tap install and then the reminders ask; iPhone and browser-menu
 * installs get the /start guides inline, without leaving onboarding.
 *
 * This is ask #1 of the reminder budget (lib/push/askPolicy.ts); the app asks
 * at most twice more, after lessons, via ReminderAskWatcher.
 *
 * HOW IT INTEGRATES WITH ONBOARDING STATE: it does not touch it.
 * TOTAL_STEPS is derived from steps.ts, the progress bar still reads the
 * correct step/total ratio, OnboardingShell still owns advance/back, and
 * `onNext` still routes through the same handleAdvance that every other step
 * uses. Notification permission is deliberately NOT persisted into onboarding
 * answers — the browser owns that state, and a cached copy would go stale the
 * moment the learner changed it in system settings.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, Variants } from 'framer-motion';
import { ArrowRight, Bell, BellOff, Check, Flame, Smartphone, Sparkles, Trophy } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { useTeyPush } from '@/hooks/useTeyPush';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { recordAsk } from '@/lib/push/askPolicy';
import { NotificationPreview } from '@/components/push/NotificationPreview';
import { TeyMark } from '@/components/brand/TeyMark';
import dynamic from 'next/dynamic';
import { playHaptic } from '@/lib/haptics';
import { emitAudioEvent } from '@/lib/audio/audioEvents';
import { playLevelUpFanfare, playSparkle } from '@/lib/audio/celebrationAudio';
import { trackInstallEvent } from '@/lib/pwa/analytics';
import { detectBrowser, detectPlatform } from '@/lib/pwa/platform';
import { ConfettiBurst } from '../ConfettiBurst';

const IosInstallGuide = dynamic(() => import('@/components/start/IosInstallGuide'), { ssr: false });
const ManualInstallGuide = dynamic(() => import('@/components/start/ManualInstallGuide'), { ssr: false });

interface RemindersScreenProps {
  onNext: () => void;
}

type Phase =
  /** Reading the browser's install + push state; nothing is shown yet. */
  | 'resolving'
  /** A browser tab that can install: install comes before reminders. */
  | 'needs-install'
  /** The /start walkthrough, inline (iPhone share sheet, browser menus). */
  | 'install-guide'
  /** iPhone, installed by hand: reminders get asked in the installed app. */
  | 'open-app'
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
      whileTap={busy ? undefined : { y: 4, boxShadow: '0 0px 0 var(--color-brand-dark)' }}
      onClick={busy ? undefined : onClick}
      aria-label={ariaLabel}
      aria-busy={busy}
      disabled={busy}
      className="group relative w-full h-[54px] flex items-center justify-center gap-2.5 rounded-[14px] bg-brand text-white font-extrabold uppercase tracking-wide text-[16px] cursor-pointer disabled:cursor-default disabled:opacity-75"
      style={{ fontFamily: 'var(--font-jakarta)', boxShadow: '0 4px 0 var(--color-brand-dark)' }}
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
      className="w-full max-w-[460px] rounded-[20px] bg-white border-2 border-[var(--border)] p-5 md:p-7 shadow-[0_4px_0_var(--border)]"
    >
      {children}
    </motion.div>
  );
}

/** The Teyro app icon as it will look on the Home Screen. */
function AppIconRow() {
  return (
    <div className="flex items-center gap-3 mb-4" aria-hidden="true">
      <TeyMark size={56} className="rounded-[14px] shadow-[0_4px_0_var(--color-brand-deep)]" />
      <span className="flex flex-col">
        <span className="text-[16px] font-extrabold text-ink">Teyro</span>
        <span className="text-[13px] font-semibold text-[var(--text-muted)]">On your Home Screen</span>
      </span>
    </div>
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

export default function RemindersScreen({ onNext }: RemindersScreenProps) {
  const { saveAnswer } = useOnboardingSession({ currentStep: 15, disableGuard: true });
  const reduce = useReducedMotion() ?? false;

  const { ready, supported, permission, subscribed, needsInstall, busy, enable } = useTeyPush();
  const install = usePwaInstall();
  const [installing, setInstalling] = useState(false);
  const askRecordedRef = useRef<string | null>(null);
  /** The opening phase is picked once; after that only the learner's taps move it. */
  const resolvedRef = useRef(false);

  const [phase, setPhase] = useState<Phase>('resolving');
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
  // flag, so revisiting the reminders step (back navigation, a resumed session, a second
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
    if (!ready || !install.ready) return;
    // Once only: an accepted install still leaves the tab "installable" via
    // the browser menu, and re-resolving would bounce the learner from the
    // reminders ask back to "install first".
    if (resolvedRef.current) return;
    resolvedRef.current = true;

    // Install first — unless reminders are already settled on this device.
    if (!install.isStandalone && install.isInstallable && !(permission === 'granted' && subscribed)) {
      setPhase('needs-install');
      return;
    }
    if (needsInstall) {
      // An iPhone tab that can't install (not Safari/Chrome): nothing to ask.
      setOutcome('unsupported');
      setPhase('celebrate');
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
  }, [ready, install.ready, install.isStandalone, install.isInstallable, needsInstall, supported, permission, subscribed]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // The reminder budget (lib/push/askPolicy.ts): this is ask #1.
  useEffect(() => {
    const kind = phase === 'needs-install' ? 'install' : phase === 'ask' ? 'enable' : null;
    if (!kind || askRecordedRef.current === kind) return;
    askRecordedRef.current = kind;
    recordAsk(kind, 'onboarding');
  }, [phase]);

  const startInstall = useCallback(async () => {
    playHaptic('medium');
    if (install.installMethod === 'native-prompt') {
      setInstalling(true);
      const result = await install.promptInstall();
      setInstalling(false);
      if (result === 'accepted') {
        playSparkle();
        // Same origin: permission granted here reaches the installed app.
        setPhase('ask');
        return;
      }
      if (result === 'dismissed') return;
    }
    setPhase('install-guide');
  }, [install]);

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
      playOnboardingCue('notificationOptIn');
      playSparkle();
      saveAnswer('notifications', { enabled: true, permission: 'granted' });
      setOutcome('granted');
      setPhase('result');
      return;
    }

    if (grantedPermission) {
      // Yes from the human, no from the plumbing.
      trackInstallEvent('notification_permission_granted', context());
      trackInstallEvent('push_subscription_failed', { ...context(), reason: result });
      saveAnswer('notifications', { enabled: true, permission: 'granted' });
      setOutcome('subscription-failed');
      setPhase('result');
      return;
    }

    if (result === 'unsupported') {
      saveAnswer('notifications', { enabled: false, permission: 'unsupported' });
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
    saveAnswer('notifications', { enabled: false, permission: 'denied' });
    setOutcome('denied');
    setPhase('result');
  }, [enable, context, saveAnswer]);

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
    saveAnswer('notifications', { enabled: false });
    playHaptic('light');
    trackInstallEvent('notification_permission_denied', { ...context(), reason: 'skipped' });
    goCelebrate();
  }, [context, goCelebrate, saveAnswer]);

  const handleFinish = useCallback(() => {
    playHaptic('medium');
    onNext();
  }, [onNext]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        {phase === 'resolving' && (
          <motion.div
            key="resolving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[460px] flex flex-col gap-4"
            aria-busy="true"
            aria-label="Loading"
          >
            <div className="h-[76px] rounded-[20px] bg-[var(--bg-section)] animate-pulse" />
            <div className="h-[260px] rounded-[20px] bg-[var(--bg-section)] animate-pulse" />
          </motion.div>
        )}
        {/* ── Install first ─────────────────────────────────────────────── */}
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
              className="text-[26px] md:text-[32px] font-[900] leading-[1.1] text-center text-ink"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              First, put me on your <span className="text-brand">Home Screen</span>
            </h1>
            <Card>
              <AppIconRow />
              <p className="text-[15px] font-semibold text-ink leading-snug mb-2">
                {install.platform === 'ios'
                  ? 'On iPhone and iPad, reminders only work once I’m on your Home Screen. That’s Apple’s rule, not mine.'
                  : 'Reminders come from the Teyro app. Install me and I’ll open in a tap and nudge you before your streak runs out.'}
              </p>
              <p className="text-[14px] font-medium text-[var(--text-secondary)] leading-snug mb-6">
                {install.installMethod === 'native-prompt' ? 'One tap. No app store.' : 'Takes about ten seconds. I’ll walk you through it.'}
              </p>
              <PrimaryButton
                onClick={() => void startInstall()}
                busy={installing}
                icon={<Smartphone className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />}
                ariaLabel="Install Teyro on this device"
              >
                {install.installMethod === 'native-prompt' ? 'Install Teyro' : 'Show me how'}
              </PrimaryButton>
              <SecondaryLink onClick={handleSkip}>Not now</SecondaryLink>
            </Card>
          </motion.div>
        )}

        {phase === 'install-guide' && (
          <motion.div key="install-guide" variants={cardVariants} initial="hidden" animate="show" exit="exit" className="w-full max-w-[440px]">
            {install.installMethod === 'ios-share-sheet' ? (
              <IosInstallGuide
                browser={install.browser === 'chrome' ? 'chrome' : 'safari'}
                onCompleted={() => setPhase('open-app')}
                onSkip={handleSkip}
              />
            ) : (
              <ManualInstallGuide
                platform={install.platform}
                browser={install.browser}
                onDone={() => setPhase(needsInstall ? 'open-app' : 'ask')}
                onSkip={handleSkip}
              />
            )}
          </motion.div>
        )}

        {phase === 'open-app' && (
          <motion.div
            key="open-app"
            variants={cardVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full flex flex-col items-center gap-5"
          >
            <h1
              className="text-[26px] md:text-[32px] font-[900] leading-[1.1] text-center text-ink"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              Now open me from your <span className="text-brand">Home Screen</span>
            </h1>
            <Card>
              <AppIconRow />
              <p className="text-[15px] font-semibold text-ink leading-snug mb-6">
                That&apos;s the real Teyro. I&apos;ll ask about reminders there, after your first lesson.
              </p>
              <PrimaryButton onClick={goCelebrate}>Got it</PrimaryButton>
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
            <NotificationPreview
              title="Time for your daily lesson!"
              body="Three minutes today keeps your streak going. I saved your spot."
            />
            <Card>
              <p className="text-[15px] font-semibold text-[#071233] leading-snug mb-5">
                I&apos;ll remind you about your lessons, your streak and your rewards. Especially the
                ones you&apos;re trying to forget.
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
              className="text-[26px] md:text-[32px] font-[900] leading-[1.1] text-center text-ink"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              {outcome === 'granted' ? (
                <>
                  Good <span className="text-brand">choice.</span>
                </>
              ) : outcome === 'denied' ? (
                <>
                  Noted. <span className="text-brand">No hard feelings.</span>
                </>
              ) : (
                <>
                  Almost <span className="text-brand">there</span>
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
                      ? "I'd hate to watch that streak disappear."
                      : "Reminders are on. I'd hate to watch that streak disappear.")}
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
              className="text-[30px] md:text-[40px] font-[900] leading-[1.05] mb-2 text-ink"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              You&apos;re all set!
            </h1>
            <p className="text-[clamp(1.05rem,5vw,1.2rem)] font-medium text-slate-500 mb-8">
              Your plan is ready. Let&apos;s go learn something.
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
