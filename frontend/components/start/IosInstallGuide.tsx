'use client';

/**
 * The iOS Add-to-Home-Screen guide.
 *
 * ── The honesty constraint ─────────────────────────────────────────────────
 * A web page cannot install itself on iOS, cannot open Safari's Share sheet,
 * and cannot draw on top of Safari's own chrome. Every mock below is therefore
 * explicitly labelled as a preview drawn by Teyro, and the instruction line
 * always names the real control in the real browser. Nothing here claims an
 * install is happening, and no mock is positioned to be mistaken for the
 * browser's own UI — they sit inside a bordered card with a "Preview" tag.
 *
 * The pointing arrow on step 1 gestures toward where Safari's toolbar actually
 * is (bottom on iPhone, top on iPad) without overlaying it, which is the only
 * honest way to say "down there" — the learner still has to find and tap the
 * real control themselves.
 *
 * Rendered behind next/dynamic from StartExperience: an Android or desktop
 * visitor never downloads any of this.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Copy, Plus, Share, SquarePlus } from 'lucide-react';
import Image from 'next/image';
import { playHaptic } from '@/lib/haptics';
import { playPentatonicTick } from '@/lib/audio/uiSounds';
import { trackInstallEvent } from '@/lib/pwa/analytics';
import { saveInstallFlowState } from '@/lib/pwa/installFlow';
import {
  StartButton,
  StartCard,
  StartGhostButton,
  StartHeadline,
  StepDots,
  TEYRO_BLUE,
} from './StartUi';

export type IosDevice = 'iphone' | 'ipad';

interface GuideStep {
  /** Short label for the progress dots / screen reader. */
  name: string;
  headline: string;
  accent: string;
  /** Tey's line. Playful, but never at the cost of the instruction. */
  teyLine: string;
  /** The literal action, stated plainly. This is the accessible fallback for
   *  every animated mock, and is always present as text. */
  instruction: React.ReactNode;
  cta: string;
}

function steps(device: IosDevice): GuideStep[] {
  const where = device === 'ipad' ? 'at the top of Safari' : "at the bottom of Safari's toolbar";

  return [
    {
      name: 'Tap Share',
      headline: 'Find the',
      accent: 'Share button',
      teyLine: "Yep, that little box with the arrow. 👀",
      instruction: (
        <>
          In Safari, tap the <strong>Share</strong> button {where}.
        </>
      ),
      cta: 'I tapped it',
    },
    {
      name: 'Add to Home Screen',
      headline: 'Now scroll to',
      accent: 'Add to Home Screen',
      teyLine: 'Scroll a bit. It hides down the list on purpose, I think.',
      instruction: (
        <>
          In the menu that appears, scroll down and tap <strong>Add to Home Screen</strong>.
        </>
      ),
      cta: 'Found it',
    },
    {
      name: 'Tap Add',
      headline: 'Last one —',
      accent: 'tap Add',
      teyLine: "And that's me, on your Home Screen. Officially roommates. 😏",
      instruction: (
        <>
          Tap <strong>Add</strong> in the top-right corner. Teyro appears on your Home Screen.
        </>
      ),
      cta: "Done — I added it",
    },
  ];
}

/* ─── Mocks ────────────────────────────────────────────────────────────────
 * Drawn, not screenshotted: a screenshot of one iOS version goes stale and
 * starts actively misleading people on the next one. These carry the shape
 * and the label of each control, which is what the learner is scanning for.
 * ────────────────────────────────────────────────────────────────────────── */

function MockChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full rounded-2xl bg-[#F7F8FA] border border-slate-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden">
      <span className="absolute top-2 right-2.5 z-10 text-[0.6rem] font-[800] uppercase tracking-[0.08em] text-slate-400 bg-white/85 rounded-full px-2 py-0.5 border border-slate-200">
        Preview
      </span>
      {children}
    </div>
  );
}

/** Safari's toolbar, with the Share control called out. */
function ShareToolbarMock({ device, reduce }: { device: IosDevice; reduce: boolean }) {
  return (
    <MockChrome>
      <div className="px-3 pt-7 pb-3">
        <div className="mb-3 mx-auto w-[78%] h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center">
          <span className="text-[0.68rem] font-[600] text-slate-400">teyro.app</span>
        </div>

        <div className="flex items-center justify-between px-2 py-2 rounded-xl bg-white border border-slate-200">
          <ChevronLeft className="w-4 h-4 text-slate-300" aria-hidden="true" />
          <ChevronRight className="w-4 h-4 text-slate-300" aria-hidden="true" />

          <span className="relative flex items-center justify-center">
            {/* Pulsing ring — the only motion, and it is decorative. */}
            {!reduce && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 -m-1.5 rounded-full"
                style={{ border: `2px solid ${TEYRO_BLUE}` }}
                animate={{ scale: [1, 1.35, 1], opacity: [0.85, 0, 0.85] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <span
              className="relative w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(1,114,253,0.12)' }}
            >
              <Share className="w-[18px] h-[18px]" style={{ color: TEYRO_BLUE }} aria-hidden="true" />
            </span>
          </span>

          <Plus className="w-4 h-4 text-slate-300" aria-hidden="true" />
          <Copy className="w-4 h-4 text-slate-300" aria-hidden="true" />
        </div>
      </div>

      {/* Gestures toward the real toolbar without covering it. */}
      <div className="pb-3 flex items-center justify-center gap-1.5 text-[0.72rem] font-[700]" style={{ color: TEYRO_BLUE }}>
        {device === 'ipad' ? (
          <>
            <motion.span
              aria-hidden="true"
              animate={reduce ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <ChevronUp className="w-4 h-4 stroke-[3]" />
            </motion.span>
            <span>yours is up at the top of Safari</span>
          </>
        ) : (
          <>
            <motion.span
              aria-hidden="true"
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <ChevronDown className="w-4 h-4 stroke-[3]" />
            </motion.span>
            <span>yours is down at the bottom of Safari</span>
          </>
        )}
      </div>
    </MockChrome>
  );
}

/** The Share sheet, with Add to Home Screen highlighted. */
function ShareSheetMock({ reduce }: { reduce: boolean }) {
  const rows = [
    { label: 'Add to Reading List', icon: <Plus className="w-4 h-4" /> },
    { label: 'Add Bookmark', icon: <Plus className="w-4 h-4" /> },
    { label: 'Add to Home Screen', icon: <SquarePlus className="w-4 h-4" />, highlight: true },
  ];

  return (
    <MockChrome>
      <div className="px-3 pt-7 pb-3">
        <div className="mx-auto mb-3 w-9 h-1 rounded-full bg-slate-300" aria-hidden="true" />
        <ul className="flex flex-col gap-1.5">
          {rows.map((row) => (
            <li
              key={row.label}
              className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 border ${
                row.highlight
                  ? 'bg-white border-[#0172FD]/45 shadow-[0_6px_16px_-8px_rgba(1,114,253,0.55)]'
                  : 'bg-white/70 border-slate-200'
              }`}
              style={
                row.highlight && !reduce
                  ? { animation: 'teyro-start-pulse 1.8s ease-in-out infinite' }
                  : undefined
              }
            >
              <span
                className={`text-[0.78rem] font-[700] ${
                  row.highlight ? 'text-[#071233]' : 'text-slate-400'
                }`}
              >
                {row.label}
              </span>
              <span
                className={row.highlight ? 'text-[#0172FD]' : 'text-slate-300'}
                aria-hidden="true"
              >
                {row.icon}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </MockChrome>
  );
}

/** The final confirm sheet, with Add highlighted. */
function AddConfirmMock({ reduce }: { reduce: boolean }) {
  return (
    <MockChrome>
      <div className="px-3 pt-7 pb-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[0.72rem] font-[700] text-slate-400">Cancel</span>
          <span className="text-[0.72rem] font-[800] text-[#071233]">Add to Home Screen</span>
          <motion.span
            className="text-[0.72rem] font-[800] rounded-lg px-2 py-1"
            style={{ color: '#FFFFFF', backgroundColor: TEYRO_BLUE }}
            animate={reduce ? undefined : { scale: [1, 1.09, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            Add
          </motion.span>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-white border border-slate-200 px-3 py-2.5">
          <span className="relative w-9 h-9 rounded-[0.6rem] overflow-hidden bg-white border border-slate-200 flex-shrink-0">
            <Image
              src="/Icons/icon-192.png"
              alt=""
              fill
              sizes="36px"
              className="object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[0.8rem] font-[800] text-[#071233]">Teyro</span>
            <span className="text-[0.68rem] font-[600] text-slate-400">teyro.app</span>
          </span>
        </div>
      </div>
    </MockChrome>
  );
}

/* ─── Guide ──────────────────────────────────────────────────────────────── */

export default function IosInstallGuide({
  device,
  onCompleted,
  onSkip,
}: {
  device: IosDevice;
  /** The learner says they added it. Not proof — the caller re-derives. */
  onCompleted: () => void;
  /** Escape hatch. Always available; an install guide must never trap anyone. */
  onSkip: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const all = steps(device);
  const [index, setIndex] = useState(0);
  const startedRef = useRef(false);
  const stepRef = useRef<HTMLDivElement | null>(null);
  const firstStepRef = useRef(true);

  // Each step replaces the card the learner just acted on, so without this a
  // screen-reader user hears nothing change and a keyboard user is dropped to
  // the top of the page. The instruction is the thing they need read out, so
  // focus lands on the card that carries it.
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
      device,
    });
  }, [device]);

  useEffect(() => {
    trackInstallEvent('ios_install_step_viewed', {
      platform: 'ios',
      install_method: 'ios-share-sheet',
      step_index: index,
      step_name: all[index].name,
    });
    saveInstallFlowState({ stage: 'ios-guide', iosGuideStep: index });
    // `all` is recreated each render but its contents are static per device.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, device]);

  const advance = useCallback(() => {
    if (index < all.length - 1) {
      // Ascending chime: each step lands a note higher, so progress is audible
      // as well as visible. playHaptic's own sound is suppressed to avoid
      // stacking two cues on one tap.
      playHaptic('light', false);
      playPentatonicTick(index + 2);
      setIndex((i) => i + 1);
      return;
    }

    playHaptic('teyroCelebration');
    trackInstallEvent('ios_install_guide_completed', {
      platform: 'ios',
      install_method: 'ios-share-sheet',
    });
    saveInstallFlowState({ stage: 'install-reported' });
    onCompleted();
  }, [index, all.length, onCompleted]);

  const back = useCallback(() => {
    playHaptic('light');
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const step = all[index];

  const mock =
    index === 0 ? (
      <ShareToolbarMock device={device} reduce={reduce} />
    ) : index === 1 ? (
      <ShareSheetMock reduce={reduce} />
    ) : (
      <AddConfirmMock reduce={reduce} />
    );

  return (
    <div className="w-full max-w-[440px] flex flex-col items-center gap-4">
      <style>{`
        @keyframes teyro-start-pulse {
          0%, 100% { transform: translateY(0); box-shadow: 0 6px 16px -8px rgba(1,114,253,0.55); }
          50% { transform: translateY(-2px); box-shadow: 0 10px 22px -8px rgba(1,114,253,0.7); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes teyro-start-pulse { 0%, 100% { transform: none; } }
        }
      `}</style>

      <StepDots
        total={all.length}
        current={index}
        label={`Step ${index + 1} of ${all.length}: ${step.name}`}
      />

      <div className="w-full text-center">
        <StartHeadline lead={step.headline} accent={step.accent} className="!text-[clamp(1.6rem,7.5vw,2.1rem)]" />
      </div>

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
          className="w-full outline-none"
        >
          <StartCard>
            {mock}

            {/* The real instruction. Always text, always present — the mock
                above it is illustration, not the source of truth. */}
            <p className="mt-4 text-[0.95rem] font-[600] text-[#071233] leading-snug text-center">
              {step.instruction}
            </p>
            <p className="mt-1.5 text-[0.85rem] font-[600] text-slate-500 text-center">
              {step.teyLine}
            </p>
          </StartCard>
        </motion.div>
      </AnimatePresence>

      <div className="w-full">
        <StartButton
          onClick={advance}
          ariaLabel={
            index === all.length - 1
              ? 'I have added Teyro to my Home Screen'
              : `Continue to step ${index + 2}`
          }
          icon={index === all.length - 1 ? <Check className="w-5 h-5 stroke-[3]" aria-hidden="true" /> : undefined}
        >
          {step.cta}
        </StartButton>

        {index > 0 ? (
          <StartGhostButton onClick={back}>Back a step</StartGhostButton>
        ) : (
          <StartGhostButton onClick={onSkip}>I&apos;ll do this later</StartGhostButton>
        )}
      </div>
    </div>
  );
}
