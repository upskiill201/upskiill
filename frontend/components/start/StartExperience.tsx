'use client';

/**
 * The Teyro install gateway — everything behind /start.
 *
 * ── What this screen is for ────────────────────────────────────────────────
 * One decision, one button. The learner presses START LEARNING; Teyro works
 * out whether it is already installed, what platform this is, whether a native
 * prompt is available, and which of five very different installation stories
 * applies — and none of that reaches the copy. There is no "install our PWA",
 * no "add to home screen" in the primary CTA, no browser vocabulary anywhere
 * on the first screen.
 *
 * ── The invariant ──────────────────────────────────────────────────────────
 * Every phase below has a way forward that does not require installing.
 * An install gateway that can trap someone is worse than no gateway: the
 * learner who cannot install (in-app webview, locked-down browser, simply not
 * interested) still has to be able to reach onboarding. So every screen after
 * the intro carries a ghost button straight into the app.
 *
 * ── Phases ─────────────────────────────────────────────────────────────────
 *   intro       Start Learning. The only screen most learners see.
 *   android     Native prompt was dismissed — offer it again, once, kindly.
 *   ios         Add-to-Home-Screen guide (lazy-loaded).
 *   manual      Installable only through a browser menu we cannot open.
 *   unsupported This browser cannot install. Say so, and move on.
 *   installed   Install reported — hand off to the Home Screen icon.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bell, Compass, Flame, Rocket, Sparkles } from 'lucide-react';

import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { resolveAppEntry, type AppEntry } from '@/lib/pwa/entry';
import { trackInstallEvent } from '@/lib/pwa/analytics';
import { hasDismissedTooOften, saveInstallFlowState } from '@/lib/pwa/installFlow';
import { browserLabel } from '@/lib/pwa/platform';
import { playHaptic } from '@/lib/haptics';
import { emitAudioEvent } from '@/lib/audio/audioEvents';
import { playLevelUpFanfare, playSparkle } from '@/lib/audio/celebrationAudio';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';
import {
  StartBenefit,
  StartButton,
  StartCard,
  StartGhostButton,
  StartHeadline,
  StartSubtitle,
  panelVariants,
} from './StartUi';

/**
 * Both guides are lazy: an Android learner never downloads the iOS mocks and
 * vice versa, and the intro — the only screen most people see — ships without
 * either. `ssr: false` because both are pure client interaction with no SEO
 * value, and prerendering them would put the bytes back in the initial HTML.
 */
const IosInstallGuide = dynamic(() => import('./IosInstallGuide'), {
  ssr: false,
  loading: () => <PhaseSkeleton />,
});
const ManualInstallGuide = dynamic(() => import('./ManualInstallGuide'), {
  ssr: false,
  loading: () => <PhaseSkeleton />,
});

/**
 * The install-success burst. Lazy for the same reason as the guides — it can
 * only ever play on the last screen of the flow, so it has no business in the
 * bytes that render the first one. No loading fallback: it is pure decoration,
 * and a skeleton standing in for confetti would be worse than nothing.
 */
const ConfettiBurst = dynamic(
  () => import('@/components/onboarding/ConfettiBurst').then((m) => m.ConfettiBurst),
  { ssr: false },
);

type Phase = 'intro' | 'android' | 'ios' | 'manual' | 'unsupported' | 'installed';

function PhaseSkeleton() {
  return (
    <div className="w-full max-w-[440px] flex flex-col gap-4" aria-hidden="true">
      <div className="h-8 w-2/3 mx-auto rounded-xl bg-white/60 animate-pulse" />
      <div className="h-44 w-full rounded-[1.75rem] bg-white/60 animate-pulse" />
      <div className="h-14 w-full rounded-2xl bg-white/60 animate-pulse" />
    </div>
  );
}

export default function StartExperience() {
  const router = useRouter();
  const reduce = useReducedMotion() ?? false;
  const install = usePwaInstall();

  const [phase, setPhase] = useState<Phase>('intro');
  const [busy, setBusy] = useState(false);
  /**
   * Did the BROWSER confirm the install, or did the learner just say so?
   *
   * `appinstalled` and an accepted prompt are proof. The iOS guide and the
   * browser-menu guide are not — the learner taps "I've added it" and we have
   * no way to check, because neither path emits an event we can observe. The
   * success copy has to reflect that difference rather than claim a fact it
   * does not have.
   */
  const [installVerified, setInstallVerified] = useState(false);
  // Server-safe default: localStorage is unreadable during SSR, so the first
  // render always assumes a brand-new learner and the mount effect corrects it.
  const [entry, setEntry] = useState<AppEntry>({ href: '/onboarding/0', reason: 'fresh' });
  const [nagged, setNagged] = useState(false);

  const viewTrackedRef = useRef(false);
  const redirectedRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstPhaseRef = useRef(true);

  // ── Mount ────────────────────────────────────────────────────────────────
  useEffect(() => {
    // The sound engine is a singleton that works without AudioProvider, but
    // /start sits outside the (app) group so nothing has loaded the learner's
    // saved mute/volume preferences yet. Without this, someone who muted Teyro
    // yesterday gets sound today on the loudest screen in the product.
    hydrateSoundPreferences();

    // Both read localStorage, which does not exist during render on the
    // server — so the SSR defaults above are corrected here on mount.
    setEntry(resolveAppEntry());
    setNagged(hasDismissedTooOften());
    saveInstallFlowState({ stage: 'browsing' });
  }, []);

  // Funnel entry. Held until `ready` so platform/browser are real values
  // rather than the SSR defaults, which would poison every split in the chart.
  useEffect(() => {
    if (!install.ready || viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    trackInstallEvent('start_page_viewed', {
      platform: install.platform,
      browser: install.browser,
      install_method: install.installMethod,
      standalone: install.isStandalone,
    });
  }, [install.ready, install.platform, install.browser, install.installMethod, install.isStandalone]);

  // ── Already inside the installed app ─────────────────────────────────────
  // /start is the browser-side gateway; reaching it from the installed app
  // means the learner is past it. Showing install instructions here is the
  // classic install loop, so hand straight off instead.
  useEffect(() => {
    if (!install.ready || !install.isStandalone || redirectedRef.current) return;
    redirectedRef.current = true;
    router.replace(resolveAppEntry().href);
  }, [install.ready, install.isStandalone, router]);

  // ── Install completed while this page is open ────────────────────────────
  // On Android the tab stays a browser tab after installing, so `appinstalled`
  // is the only signal that the Home Screen icon now exists.
  useEffect(() => {
    const onInstalled = () => {
      playLevelUpFanfare();
      playHaptic('teyroCelebration', false);
      setInstallVerified(true);
      setPhase('installed');
    };
    window.addEventListener('appinstalled', onInstalled);
    return () => window.removeEventListener('appinstalled', onInstalled);
  }, []);

  // ── Focus follows the phase ──────────────────────────────────────────────
  // Each phase unmounts the button that triggered it, which drops focus to
  // <body>: a keyboard user is returned to the top of the document and a
  // screen reader announces nothing at all, so the new screen is invisible to
  // both. Moving focus to the incoming panel is what makes the transition
  // perceivable without sight. Skipped on the first render, where stealing
  // focus would be an unprompted jump.
  useEffect(() => {
    if (firstPhaseRef.current) {
      firstPhaseRef.current = false;
      return;
    }
    panelRef.current?.focus();
  }, [phase]);

  // ── Navigation into the app ──────────────────────────────────────────────
  const enterApp = useCallback(() => {
    const target = resolveAppEntry();
    trackInstallEvent('onboarding_started', {
      // Required discriminator — the creator flow emits this name too.
      flow: 'learner',
      platform: install.platform,
      browser: install.browser,
      standalone: install.isStandalone,
      entry_reason: target.reason,
    });
    router.push(target.href);
  }, [router, install.platform, install.browser, install.isStandalone]);

  // ── The one button ───────────────────────────────────────────────────────
  const startLearning = useCallback(async () => {
    const context = {
      platform: install.platform,
      browser: install.browser,
      install_method: install.installMethod,
      standalone: install.isStandalone,
    };
    trackInstallEvent('start_learning_clicked', context);

    if (install.isStandalone) {
      enterApp();
      return;
    }

    // Someone who has already declined the prompt several times has told us
    // their answer. Lead with the app, keep install reachable underneath.
    if (nagged) {
      enterApp();
      return;
    }

    trackInstallEvent('install_flow_started', context);
    saveInstallFlowState({ stage: 'install-offered' });

    switch (install.installMethod) {
      case 'native-prompt': {
        setBusy(true);
        try {
          const outcome = await install.promptInstall();
          if (outcome === 'accepted') {
            // `appinstalled` usually lands too, and the phase set there is
            // idempotent — but Chrome does not guarantee it fires before
            // userChoice resolves, so the success screen is set here as well.
            playLevelUpFanfare();
            setInstallVerified(true);
            setPhase('installed');
          } else if (outcome === 'dismissed') {
            emitAudioEvent('BUTTON_SECONDARY_CLICK');
            setPhase('android');
          } else {
            // 'unavailable' or a thrown prompt() — the browser can still
            // install, just not by our asking. Show it the manual way.
            setPhase('manual');
          }
        } finally {
          setBusy(false);
        }
        return;
      }
      case 'ios-share-sheet':
        setPhase('ios');
        return;
      case 'browser-menu':
        setPhase('manual');
        return;
      case 'installed':
        enterApp();
        return;
      default:
        setPhase('unsupported');
    }
  }, [install, nagged, enterApp]);

  /** Second attempt after a dismissal. Falls back to the manual guide. */
  const retryPrompt = useCallback(async () => {
    setBusy(true);
    try {
      const outcome = await install.promptInstall();
      if (outcome === 'accepted') {
        playLevelUpFanfare();
        setInstallVerified(true);
        setPhase('installed');
      } else if (outcome !== 'dismissed') {
        setPhase('manual');
      }
    } finally {
      setBusy(false);
    }
  }, [install]);

  /**
   * The learner reports a manual install (iOS guide, browser menu).
   *
   * `installVerified` stays false: neither path emits anything observable, so
   * this is their word, and the success copy is worded accordingly.
   */
  const reportManualInstall = useCallback(() => {
    playSparkle();
    setPhase('installed');
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────
  // `ready` gates the branching UI only. The intro renders immediately with no
  // platform-dependent copy, so first paint never waits on detection.
  //
  // Tey stays full-size on the intro AND on the installed/success screen —
  // both are moments where Tey IS the content. Everywhere in between (the
  // guides, the dismissed/manual/unsupported panels) shrinks Tey to a small
  // chip up top, because a card full of instructions is what the learner
  // needs to look at there, and on a short phone a large mascot is what
  // pushes the CTA off the bottom.
  const bigMascot = phase === 'intro' || phase === 'installed';

  return (
    // A <div>, not a <main>: the root layout already wraps every route in one,
    // and nesting a second landmark hides this content from screen readers
    // navigating by landmark.
    <div
      className="relative w-full min-h-[100dvh] flex flex-col overflow-hidden bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF]"
      style={{
        paddingTop: 'max(env(safe-area-inset-top), 12px)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <MascotBackground variant="soft" />
      </div>

      {/* ── Mascot ── full-size on intro + installed, a small chip elsewhere ── */}
      <motion.div
        layout={!reduce}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className={`relative z-10 w-full flex items-center justify-center shrink-0 ${
          bigMascot ? 'flex-1 min-h-[30dvh]' : 'h-[13dvh] min-h-[86px]'
        }`}
      >
        <motion.div
          initial={reduce ? false : { scale: 0.88, opacity: 0, y: 14 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className={`relative ${bigMascot ? 'w-[88vw] max-w-[420px] md:max-w-[440px] aspect-square' : 'h-full aspect-square'}`}
        >
          <Image
            src="/User onbarding Assets/Tey_welcome.webp"
            alt="Tey, the Teyro mascot, waving hello"
            fill
            priority
            sizes="(max-width: 768px) 88vw, 440px"
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
          />
        </motion.div>
      </motion.div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-end md:justify-center px-5 pb-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={phase}
            ref={panelRef}
            tabIndex={-1}
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full flex flex-col items-center outline-none"
          >
            {phase === 'intro' && (
              <IntroPanel
                busy={busy}
                nagged={nagged}
                entryReason={entry.reason}
                onStart={startLearning}
                onInstallAnyway={() => {
                  setNagged(false);
                  trackInstallEvent('install_flow_started', {
                    platform: install.platform,
                    browser: install.browser,
                    install_method: install.installMethod,
                    reopened_after_dismissals: true,
                  });
                  if (install.installMethod === 'ios-share-sheet') setPhase('ios');
                  else if (install.installMethod === 'native-prompt') void retryPrompt();
                  else if (install.installMethod === 'browser-menu') setPhase('manual');
                  else setPhase('unsupported');
                }}
              />
            )}

            {phase === 'android' && (
              <DismissedPanel busy={busy} onRetry={retryPrompt} onSkip={enterApp} />
            )}

            {phase === 'ios' && (
              <IosInstallGuide
                browser={install.browser === 'chrome' ? 'chrome' : 'safari'}
                onCompleted={reportManualInstall}
                onSkip={enterApp}
              />
            )}

            {phase === 'manual' && (
              <ManualInstallGuide
                platform={install.platform}
                browser={install.browser}
                onDone={reportManualInstall}
                onSkip={enterApp}
              />
            )}

            {phase === 'unsupported' && (
              <UnsupportedPanel
                browser={browserLabel(install.browser)}
                isInAppBrowser={install.isInAppBrowser}
                onContinue={enterApp}
              />
            )}

            {phase === 'installed' && (
              <InstalledPanel verified={installVerified} onContinue={enterApp} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Panels ─────────────────────────────────────────────────────────────── */

function IntroPanel({
  busy,
  nagged,
  entryReason,
  onStart,
  onInstallAnyway,
}: {
  busy: boolean;
  nagged: boolean;
  entryReason: 'completed' | 'resume' | 'fresh';
  onStart: () => void;
  onInstallAnyway: () => void;
}) {
  const returning = entryReason !== 'fresh';

  return (
    <div className="w-full max-w-[440px] flex flex-col items-center text-center gap-3">
      <StartHeadline
        lead={returning ? 'Back for' : "Let's make this"}
        accent={returning ? 'more.' : 'a habit.'}
      />
      <StartSubtitle>
        {returning
          ? 'Your streak missed you. Pick up exactly where you stopped.'
          : "One tap and we're off. I'll handle the boring setup — you bring the curiosity."}
      </StartSubtitle>

      <div className="w-full mt-3">
        <StartButton
          onClick={onStart}
          busy={busy}
          ariaLabel={returning ? 'Continue learning with Teyro' : 'Start learning with Teyro'}
          icon={<Rocket className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />}
        >
          {returning ? 'Continue Learning' : 'Start Learning'}
        </StartButton>

        {nagged && (
          <StartGhostButton onClick={onInstallAnyway}>
            Actually, put Teyro on my Home Screen
          </StartGhostButton>
        )}
      </div>
    </div>
  );
}

function DismissedPanel({
  busy,
  onRetry,
  onSkip,
}: {
  busy: boolean;
  onRetry: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="w-full max-w-[440px] flex flex-col items-center gap-4">
      <div className="text-center">
        <StartHeadline lead="Playing" accent="hard to get?" className="!text-[clamp(1.7rem,8vw,2.2rem)]" />
      </div>

      <StartCard>
        <p className="text-[0.95rem] font-[600] text-[#071233] leading-snug mb-4">
          On your Home Screen I load instantly, work offline, and can actually nudge you. In a browser
          tab I&apos;m just… a tab.
        </p>
        <ul className="flex flex-col gap-3">
          <StartBenefit icon={<Flame className="w-4 h-4" aria-hidden="true" />}>
            Keep your streak alive
          </StartBenefit>
          <StartBenefit icon={<Bell className="w-4 h-4" aria-hidden="true" />}>
            Reminders that actually reach you
          </StartBenefit>
          <StartBenefit icon={<Sparkles className="w-4 h-4" aria-hidden="true" />}>
            Opens in a tap, no address bar
          </StartBenefit>
        </ul>
      </StartCard>

      <div className="w-full">
        <StartButton onClick={onRetry} busy={busy} ariaLabel="Install Teyro">
          Alright, install it
        </StartButton>
        <StartGhostButton onClick={onSkip}>No thanks — keep going in my browser</StartGhostButton>
      </div>
    </div>
  );
}

function UnsupportedPanel({
  browser,
  isInAppBrowser,
  onContinue,
}: {
  browser: string;
  isInAppBrowser: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="w-full max-w-[440px] flex flex-col items-center gap-4">
      <div className="text-center">
        <StartHeadline lead="Straight in" accent="it is." className="!text-[clamp(1.7rem,8vw,2.2rem)]" />
      </div>

      <StartCard>
        <p className="text-[0.95rem] font-[600] text-[#071233] leading-snug">
          {isInAppBrowser ? (
            <>
              You opened me from inside another app, and {browser} won&apos;t let me onto your Home
              Screen from here. Not your fault, not mine.
            </>
          ) : (
            <>{browser} can&apos;t add me to your Home Screen — so let&apos;s not waste your time.</>
          )}
        </p>
        <p className="mt-3 text-[0.87rem] font-[600] text-slate-500 leading-snug">
          {isInAppBrowser
            ? 'Open teyro.app in Safari or Chrome any time and I’ll offer again. Everything below works right here in the meantime.'
            : 'Everything works right here. Open teyro.app on your phone later and I’ll offer the Home Screen version.'}
        </p>
      </StartCard>

      <div className="w-full">
        <StartButton
          onClick={onContinue}
          icon={<Compass className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />}
          ariaLabel="Continue to Teyro in this browser"
        >
          Let&apos;s go anyway
        </StartButton>
      </div>
    </div>
  );
}

function InstalledPanel({
  verified,
  onContinue,
}: {
  /** The browser confirmed it, rather than the learner telling us. */
  verified: boolean;
  onContinue: () => void;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="relative w-full max-w-[440px] flex flex-col items-center gap-4 text-center">
      {/* Decorative only — suppressed under prefers-reduced-motion, and never
          the carrier of any information the copy does not also state. */}
      {!reduce && <ConfettiBurst active />}

      <StartHeadline
        lead={verified ? 'Look at us —' : 'Go on then —'}
        accent={verified ? 'roommates.' : 'check your Home Screen.'}
        className="!text-[clamp(1.7rem,8vw,2.2rem)]"
      />

      <StartCard>
        <div className="flex items-center gap-3.5">
          <motion.span
            className="relative w-14 h-14 rounded-[1rem] overflow-hidden bg-white border border-slate-200 flex-shrink-0 shadow-[0_8px_20px_-8px_rgba(1,114,253,0.55)]"
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image src="/Icons/icon-192.png" alt="" fill sizes="56px" className="object-contain" />
          </motion.span>
          <p className="text-left text-[0.95rem] font-[600] text-[#071233] leading-snug">
            {verified ? (
              <>
                I&apos;m installed — this icon is now an app on your Home Screen. Open me from
                there from now on, that&apos;s the real Teyro, and it&apos;s where your reminders
                will land.
              </>
            ) : (
              <>
                Look for this icon on your Home Screen — that means Teyro installed. Open me from
                there from now on, that&apos;s the real Teyro, and it&apos;s where your reminders
                will land. Didn&apos;t work? Start here and we&apos;ll sort it out later.
              </>
            )}
          </p>
        </div>
      </StartCard>

      {/* Not a dead end: the Home Screen icon is the better door, but this one
          still opens. A learner who taps here is not blocked from onboarding. */}
      <div className="w-full">
        <StartButton
          onClick={onContinue}
          icon={<ArrowRight className="w-5 h-5 stroke-[3]" aria-hidden="true" />}
          ariaLabel="Continue in this browser instead"
        >
          Or start here
        </StartButton>
      </div>
    </div>
  );
}
