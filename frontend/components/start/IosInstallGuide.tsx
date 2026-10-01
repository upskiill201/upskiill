'use client';

/**
 * The iOS Add-to-Home-Screen guide.
 *
 * ── Why real screenshots ───────────────────────────────────────────────────
 * An earlier version of this guide drew abstract mock UI instead of using
 * screenshots, on the theory that a screenshot of one iOS version goes stale
 * once Apple changes Safari's chrome. In practice the drawings were vaguer
 * than the real thing and learners still got lost — so this trades that
 * staleness risk for clarity today. Each screenshot below is the actual
 * screen with an arrow drawn on it pointing at the exact control to tap; if
 * Apple or Google reshuffle these menus, the fix is re-shooting the affected
 * step's screenshot, not touching this file's logic.
 *
 * ── Safari vs Chrome ───────────────────────────────────────────────────────
 * Both are WebKit under the hood on iOS and can Add to Home Screen, but the
 * menu path differs: Chrome puts a Share icon directly in the address bar
 * (one tap to the share sheet), while this version of Safari tucks Share
 * behind its own "•••" menu first — so Safari's walkthrough has one extra
 * step. `browser` picks which screenshot set and copy to show; nothing else
 * about the flow (progress dots, focus handling, analytics, skip hatch)
 * differs between the two.
 *
 * The instruction line is always present as real text below each screenshot
 * — the image illustrates, the sentence is the accessible source of truth.
 *
 * Rendered behind next/dynamic from StartExperience: an Android or desktop
 * visitor never downloads any of this.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Check, ChevronRight, CircleEllipsis, Share, SquarePlus } from 'lucide-react';
import Image from 'next/image';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { trackInstallEvent } from '@/lib/pwa/analytics';
import { saveInstallFlowState } from '@/lib/pwa/installFlow';
import {
  StartButton,
  StartCard,
  StartGhostButton,
  StartHeadline,
  StepProgress,
  TeySays,
  startStyles,
} from './StartUi';

export type IosGuideBrowser = 'safari' | 'chrome';

interface GuideStep {
  /** Short label for the progress dots / screen reader. */
  name: string;
  headline: string;
  accent: string;
  /** Tey's line. Playful, but never at the cost of the instruction. */
  teyLine: string;
  /** The literal action, stated plainly. This is the accessible fallback for
   *  every screenshot, and is always present as text. */
  instruction: React.ReactNode;
  cta: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

function safariSteps(): GuideStep[] {
  return [
    {
      name: 'Open the menu',
      headline: 'First, tap the',
      accent: '••• button',
      teyLine: "It's the three dots right next to the address bar.",
      instruction: (
        <>
          Tap the <strong>•••</strong> button next to Safari&apos;s address bar.
        </>
      ),
      cta: 'I tapped it',
      image: {
        src: '/install-guide/ios/safari-1-tap-menu.jpeg',
        alt: "Safari's address bar with the ••• button circled by an arrow",
        width: 1170,
        height: 537,
      },
    },
    {
      name: 'Tap Share',
      headline: 'Now tap',
      accent: 'Share',
      teyLine: "It's the first option at the top of the menu.",
      instruction: (
        <>
          Tap <strong>Share</strong> at the top of the menu that opens.
        </>
      ),
      cta: 'I tapped it',
      image: {
        src: '/install-guide/ios/safari-2-tap-share.jpeg',
        alt: 'Safari menu with the Share option pointed to by an arrow',
        width: 1170,
        height: 1017,
      },
    },
    {
      name: 'Tap More',
      headline: 'Then tap',
      accent: 'More',
      teyLine: "It's the last circle in that row of icons.",
      instruction: (
        <>
          Tap <strong>More</strong> in the row of icons.
        </>
      ),
      cta: 'I tapped it',
      image: {
        src: '/install-guide/ios/safari-3-tap-more.jpeg',
        alt: 'Share sheet with the More button pointed to by an arrow',
        width: 1170,
        height: 807,
      },
    },
    {
      name: 'Add to Home Screen',
      headline: 'Now find',
      accent: 'Add to Home Screen',
      teyLine: "That's the install button, even though it doesn't say \"install.\" It's in the list that pops up — scroll a little if you need to.",
      instruction: (
        <>
          Tap <strong>Add to Home Screen</strong> — this is what installs Teyro as an app on your
          phone.
        </>
      ),
      cta: 'Found it',
      image: {
        src: '/install-guide/ios/safari-4-add-to-home-screen.jpeg',
        alt: 'Menu with Add to Home Screen pointed to by an arrow',
        width: 971,
        height: 773,
      },
    },
    {
      name: 'Tap Add',
      headline: 'Last one —',
      accent: 'tap Add to install',
      teyLine: "That's it — Teyro is now installed as an app on your phone. No App Store needed.",
      instruction: (
        <>
          Tap <strong>Add</strong> in the top-right corner. Teyro installs and appears as an app
          icon on your Home Screen.
        </>
      ),
      cta: "Done — it's installed",
      image: {
        src: '/install-guide/ios/safari-5-tap-add.jpeg',
        alt: 'Add to Home Screen confirmation with the Add button pointed to by an arrow',
        width: 1170,
        height: 792,
      },
    },
  ];
}

function chromeSteps(): GuideStep[] {
  return [
    {
      name: 'Tap Share',
      headline: 'First, tap the',
      accent: 'Share icon',
      teyLine: "It's the arrow coming out of a box, top-right of the address bar.",
      instruction: (
        <>
          Tap the <strong>Share</strong> icon at the top of Chrome, next to the address bar.
        </>
      ),
      cta: 'I tapped it',
      image: {
        src: '/install-guide/ios/chrome-1-tap-share.jpeg',
        alt: "Chrome's address bar with the Share icon pointed to by an arrow",
        width: 1170,
        height: 569,
      },
    },
    {
      name: 'Tap More',
      headline: 'Now tap',
      accent: 'More',
      teyLine: "It's the last circle in that row — three dots.",
      instruction: (
        <>
          Tap <strong>More</strong> in the row of icons.
        </>
      ),
      cta: 'I tapped it',
      image: {
        src: '/install-guide/ios/chrome-2-tap-more.jpeg',
        alt: 'Share sheet with the More button pointed to by an arrow',
        width: 846,
        height: 540,
      },
    },
    {
      name: 'Add to Home Screen',
      headline: 'Now find',
      accent: 'Add to Home Screen',
      teyLine: "That's the install button, even though it doesn't say \"install.\" Scroll down a little if you don't see it right away.",
      instruction: (
        <>
          Tap <strong>Add to Home Screen</strong> — this is what installs Teyro as an app on your
          phone.
        </>
      ),
      cta: 'Found it',
      image: {
        src: '/install-guide/ios/chrome-3-add-to-home-screen.jpeg',
        alt: 'Menu with Add to Home Screen pointed to by an arrow',
        width: 894,
        height: 619,
      },
    },
    {
      name: 'Tap Add',
      headline: 'Last one —',
      accent: 'tap Add to install',
      teyLine: "That's it — Teyro is now installed as an app on your phone. No App Store needed.",
      instruction: (
        <>
          Tap <strong>Add</strong> in the top-right corner. Teyro installs and appears as an app
          icon on your Home Screen.
        </>
      ),
      cta: "Done — it's installed",
      image: {
        src: '/install-guide/ios/chrome-4-tap-add.jpeg',
        alt: 'Add to Home Screen confirmation with the Add button pointed to by an arrow',
        width: 1170,
        height: 806,
      },
    },
  ];
}

function steps(browser: IosGuideBrowser): GuideStep[] {
  return browser === 'chrome' ? chromeSteps() : safariSteps();
}

/** Every control the learner taps, as a trail of chips. */
const TRAIL: Record<string, { label: string; icon?: React.ReactNode }> = {
  'Open the menu': { label: '•••' },
  'Tap Share': { label: 'Share', icon: <Share size={14} strokeWidth={3} aria-hidden="true" /> },
  'Tap More': { label: 'More', icon: <CircleEllipsis size={14} strokeWidth={3} aria-hidden="true" /> },
  'Add to Home Screen': { label: 'Add to Home Screen', icon: <SquarePlus size={14} strokeWidth={3} aria-hidden="true" /> },
  'Tap Add': { label: 'Add' },
};

/* ─── Guide ──────────────────────────────────────────────────────────────── */

export default function IosInstallGuide({
  browser,
  onCompleted,
  onSkip,
}: {
  browser: IosGuideBrowser;
  /** The learner says they added it. Not proof — the caller re-derives. */
  onCompleted: () => void;
  /** Escape hatch. Always available; an install guide must never trap anyone. */
  onSkip: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const all = steps(browser);
  const [index, setIndex] = useState(0);
  const startedRef = useRef(false);
  const stepRef = useRef<HTMLDivElement | null>(null);
  const firstStepRef = useRef(true);

  // Each step replaces the card the learner just acted on; moving focus to it
  // is what makes the change perceivable to screen-reader and keyboard users.
  useEffect(() => {
    if (firstStepRef.current) {
      firstStepRef.current = false;
      return;
    }
    stepRef.current?.focus();
  }, [index]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackInstallEvent('ios_install_guide_started', {
      platform: 'ios',
      install_method: 'ios-share-sheet',
      browser,
    });
  }, [browser]);

  useEffect(() => {
    trackInstallEvent('ios_install_step_viewed', {
      platform: 'ios',
      install_method: 'ios-share-sheet',
      browser,
      step_index: index,
      step_name: all[index].name,
    });
    saveInstallFlowState({ stage: 'ios-guide', iosGuideStep: index });
    // `all` is recreated each render but its contents are static per browser.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, browser]);

  const advance = useCallback(() => {
    if (index < all.length - 1) {
      // Each step lands a note higher, so progress is audible as well as visible.
      playHaptic('light', false);
      playSound('pathCheck', index);
      setIndex((i) => i + 1);
      return;
    }

    celebrationHaptic('win');
    trackInstallEvent('ios_install_guide_completed', {
      platform: 'ios',
      install_method: 'ios-share-sheet',
      browser,
    });
    saveInstallFlowState({ stage: 'install-reported' });
    onCompleted();
  }, [index, all.length, onCompleted, browser]);

  const back = useCallback(() => {
    playHaptic('light', false);
    playSound('cardBack');
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const step = all[index];
  const last = index === all.length - 1;

  return (
    <div className={startStyles.stack}>
      <div className={startStyles.guideTop}>
        <button type="button" className={startStyles.back} onClick={back} disabled={index === 0} aria-label="Back a step">
          <ArrowLeft size={22} strokeWidth={3} />
        </button>
        <StepProgress total={all.length} current={index} label={`Step ${index + 1} of ${all.length}: ${step.name}`} />
      </div>

      <ol className={startStyles.trail} aria-label="What you'll tap">
        {all.map((s, i) => {
          const chip = TRAIL[s.name] ?? { label: s.name };
          const state = i < index ? startStyles.trailDone : i === index ? startStyles.trailNow : '';
          return (
            <React.Fragment key={s.name}>
              {i > 0 && (
                <ChevronRight size={14} strokeWidth={3} className={startStyles.trailArrow} aria-hidden="true" />
              )}
              <li className={`${startStyles.trailStep} ${state}`} aria-current={i === index ? 'step' : undefined}>
                {i < index ? <Check size={14} strokeWidth={4} aria-hidden="true" /> : chip.icon}
                {chip.label}
              </li>
            </React.Fragment>
          );
        })}
      </ol>

      <span className={startStyles.eyebrow}>
        Step {index + 1} of {all.length}
      </span>
      <StartHeadline lead={step.headline} accent={step.accent} size="md" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          ref={stepRef}
          tabIndex={-1}
          role="group"
          aria-label={`Step ${index + 1} of ${all.length}: ${step.name}`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 26 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: -26 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          className={startStyles.stack}
          style={{ outline: 'none' }}
        >
          <StartCard>
            {/* The real screenshot, arrow and all. The sentence under it is the
                accessible source of truth; the image only illustrates. */}
            <div className={startStyles.shot}>
              <Image
                src={step.image.src}
                alt={step.image.alt}
                width={step.image.width}
                height={step.image.height}
                sizes="(max-width: 440px) 92vw, 400px"
              />
            </div>
            <p className={startStyles.instruction}>{step.instruction}</p>
          </StartCard>
          <TeySays pose={last ? 'cheering' : 'pointing'}>{step.teyLine}</TeySays>
        </motion.div>
      </AnimatePresence>

      <div className={startStyles.actions}>
        <StartButton
          onClick={advance}
          tone={last ? 'green' : 'blue'}
          ariaLabel={last ? 'I have added Teyro to my Home Screen' : `Continue to step ${index + 2}`}
        >
          {step.cta}
        </StartButton>
        <StartGhostButton onClick={onSkip}>I&apos;ll do this later</StartGhostButton>
      </div>
    </div>
  );
}
