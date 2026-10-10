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
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bell, Flame, Sparkles, WifiOff, Zap } from 'lucide-react';

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
  TeySays,
  panelVariants,
  startStyles,
} from './StartUi';
import { HomeScreenMock } from './HomeScreenMock';

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
      <div className="h-4 w-full rounded-full bg-[var(--bg-section)] animate-pulse" />
      <div className="h-8 w-2/3 mx-auto rounded-xl bg-[var(--bg-section)] animate-pulse" />
      <div className="h-56 w-full rounded-[22px] bg-[var(--bg-section)] animate-pulse" />
      <div className="h-14 w-full rounded-2xl bg-[var(--bg-section)] animate-pulse" />
    </div>
  );
}

export default function StartExperience({ hasSession = false }: { hasSession?: boolean }) {
  const router = useRouter();
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
    setEntry(resolveAppEntry({ hasSession }));
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
    router.replace(resolveAppEntry({ hasSession }).href);
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
    const target = resolveAppEntry({ hasSession });
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
  return (
    // A <div>, not a <main>: the root layout already wraps every route in one.
    <div className={startStyles.screen}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={phase}
          ref={panelRef}
          tabIndex={-1}
          variants={panelVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className={startStyles.panel}
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

          {phase === 'android' && <DismissedPanel busy={busy} onRetry={retryPrompt} onSkip={enterApp} />}

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

          {phase === 'installed' && <InstalledPanel verified={installVerified} onContinue={enterApp} />}
        </motion.div>
      </AnimatePresence>
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
    <div className={startStyles.stack}>
      <div className={startStyles.grow} />
      <HomeScreenMock />
      <StartHeadline lead={returning ? 'Back for' : 'Put Teyro'} accent={returning ? 'more?' : 'in your pocket.'} />
      <StartSubtitle>
        {returning
          ? 'Your streak missed you. Pick up exactly where you stopped.'
          : 'One tap and Teyro lives on your Home Screen, like any other app.'}
      </StartSubtitle>
      <ul className={startStyles.chips} aria-label="What you get">
        <li className={startStyles.chipBenefit}>
          <Flame size={15} strokeWidth={2.75} aria-hidden="true" /> Streak reminders
        </li>
        <li className={startStyles.chipBenefit}>
          <Zap size={15} strokeWidth={2.75} aria-hidden="true" /> Opens instantly
        </li>
        <li className={startStyles.chipBenefit}>
          <WifiOff size={15} strokeWidth={2.75} aria-hidden="true" /> Works offline
        </li>
      </ul>
      <div className={startStyles.grow} />

      <div className={startStyles.actions}>
        <StartButton
          onClick={onStart}
          busy={busy}
          ariaLabel={returning ? 'Continue learning with Teyro' : 'Start learning with Teyro'}
        >
          {returning ? 'Continue learning' : 'Start learning'}
        </StartButton>
        {nagged && <StartGhostButton onClick={onInstallAnyway}>Put Teyro on my Home Screen</StartGhostButton>}
      </div>
    </div>
  );
}

function DismissedPanel({ busy, onRetry, onSkip }: { busy: boolean; onRetry: () => void; onSkip: () => void }) {
  return (
    <div className={startStyles.stack}>
      <div className={startStyles.grow} />
      <StartHeadline lead="Playing" accent="hard to get?" size="md" />
      <TeySays>
        On your Home Screen I open instantly, work offline, and can actually nudge you. In a browser tab I&apos;m
        just a tab.
      </TeySays>
      <StartCard>
        <ul className={startStyles.benefits}>
          <StartBenefit icon={<Flame size={20} strokeWidth={2.5} />}>Keep your streak alive</StartBenefit>
          <StartBenefit icon={<Bell size={20} strokeWidth={2.5} />}>Reminders that reach you</StartBenefit>
          <StartBenefit icon={<Sparkles size={20} strokeWidth={2.5} />}>Opens in a tap, no address bar</StartBenefit>
        </ul>
      </StartCard>
      <div className={startStyles.grow} />
      <div className={startStyles.actions}>
        <StartButton onClick={onRetry} busy={busy} ariaLabel="Install Teyro">
          Alright, install it
        </StartButton>
        <StartGhostButton onClick={onSkip}>No thanks, keep going here</StartGhostButton>
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
    <div className={startStyles.stack}>
      <div className={startStyles.grow} />
      <StartHeadline lead="Straight in" accent="it is." size="md" />
      <TeySays pose="welcome">
        {isInAppBrowser ? (
          <>
            You opened me inside another app, and {browser} won&apos;t let me onto your Home Screen from here. Not
            your fault, not mine.
          </>
        ) : (
          <>{browser} can&apos;t add me to your Home Screen, so let&apos;s not waste your time.</>
        )}
      </TeySays>
      <StartCard>
        <p className={startStyles.cardText}>
          {isInAppBrowser
            ? 'Open teyro.app in Safari or Chrome any time and I’ll offer again. Everything works right here meanwhile.'
            : 'Everything works right here. Open teyro.app on your phone later and I’ll offer the Home Screen version.'}
        </p>
      </StartCard>
      <div className={startStyles.grow} />
      <div className={startStyles.actions}>
        <StartButton onClick={onContinue} ariaLabel="Continue to Teyro in this browser">
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
    <div className={`${startStyles.stack} ${startStyles.center}`}>
      {/* Decorative only — never the carrier of anything the copy doesn't say. */}
      {!reduce && <ConfettiBurst active />}
      <div className={startStyles.grow} />
      <HomeScreenMock landed />
      <StartHeadline
        lead={verified ? 'Look at us,' : 'Now check'}
        accent={verified ? 'roommates!' : 'your Home Screen.'}
        size="md"
      />
      <StartSubtitle>
        {verified
          ? 'Teyro is on your Home Screen. Open me from there from now on: that’s where your reminders land.'
          : 'Look for this icon. Open Teyro from there from now on. Didn’t work? Start here and we’ll sort it out later.'}
      </StartSubtitle>
      <div className={startStyles.grow} />
      {/* Not a dead end: the Home Screen icon is the better door, but this one still opens. */}
      <div className={startStyles.actions}>
        <StartButton onClick={onContinue} tone="green" ariaLabel="Continue in this browser instead">
          Or start here
        </StartButton>
      </div>
    </div>
  );
}
