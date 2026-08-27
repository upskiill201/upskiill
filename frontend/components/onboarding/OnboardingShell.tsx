'use client';

/**
 * OnboardingShell — Duolingo-style persistent SPA container for steps 1-15.
 *
 * Architecture:
 * ┌──────────────────────────────────────────────┐
 * │  ← Back  [████████░░░░░░░░░░░░]  X/15       │  ← NEVER SLIDES (persistent)
 * ├──────────────────────────────────────────────┤
 * │             [Tey mascot]                     │  ← SLIDES (direction-aware)
 * ├──────────────────────────────────────────────┤
 * │  [Step Question / Content / Interactive]     │  ← SLIDES (with 40ms delay)
 * │  [Continue →]                                │
 * └──────────────────────────────────────────────┘
 *
 * The progress bar's width is controlled by a single Framer Motion `animate`
 * prop — it never unmounts across all 15 steps. It fills smoothly from 1/15 to 15/15.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MascotBackground } from './MascotBackground';
import Step1Content from './steps/Step1Content';
import Step2Content from './steps/Step2Content';
import Step3Content from './steps/Step3Content';
import Step4Content from './steps/Step4Content';
import Step5Content from './steps/Step5Content';
import Step6Content from './steps/Step6Content';
import Step7Content from './steps/Step7Content';
import Step8Content from './steps/Step8Content';
import Step9Content from './steps/Step9Content';
import Step10Content from './steps/Step10Content';
import Step11Content from './steps/Step11Content';
import Step12Content from './steps/Step12Content';
import Step13Content from './steps/Step13Content';
import Step14Content from './steps/Step14Content';
import Step15Content from './steps/Step15Content';
import { markStepComplete, getOnboardingState, saveOnboardingState } from '@/lib/user-onboarding';
import { playHaptic } from '@/lib/haptics';

// ─── Step configuration for mascots & layout styles ─────────────────────────

interface StepMeta {
  mobile: string;
  desktop: string;
  mobileMascotHeight?: string;
  hideShellMascot?: boolean; // Step provides its own integrated mascot layout (e.g. step 7, 8, 9, 10, 12)
  fullBleed?: boolean; // Hero steps: mascot area flexes to absorb leftover space, content sits directly on the gradient (no white band)
  softBg?: boolean; // Calmer bubble field behind the mascot (hero/question steps where Tey is the focus)
}

const STEP_CONFIG: Record<number, StepMeta> = {
  1: {
    mobile: '/User onbarding Assets/Tey_welcome.webp',
    desktop: '/User onbarding Assets/Tey_welcome.webp',
    fullBleed: true,
  },
  2: {
    mobile: '/User onbarding Assets/Tey_thinking _Mobile.PNG',
    desktop: '/User onbarding Assets/Tey_thinking_desktop.PNG',
    mobileMascotHeight: '30dvh',
    softBg: true,
  },
  3: {
    mobile: '/User onbarding Assets/Tey_step3_mobile.webp',
    desktop: '/User onbarding Assets/Tey_step3_desktop.webp',
    fullBleed: true,
  },
  4: {
    mobile: '/User onbarding Assets/Tey_step4_mobile.webp',
    desktop: '/User onbarding Assets/Tey_step4_desktop.webp',
    fullBleed: true,
  },
  5: {
    mobile: '/User onbarding Assets/Step_5_mobile_mascot.webp',
    desktop: '/User onbarding Assets/step_5_desktop_mascot.webp',
    fullBleed: true,
  },
  6: {
    mobile: '/User onbarding Assets/Step_6_mascot.webp',
    desktop: '/User onbarding Assets/Step_6_mascot.webp',
    fullBleed: true,
  },
  7: {
    mobile: '/User onbarding Assets/Step_7_tey_verified_state.webp',
    desktop: '/User onbarding Assets/Step_7_tey_verified_state.webp',
    hideShellMascot: true,
  },
  8: {
    mobile: '/User onbarding Assets/Step_8_mascot_Mobile.webp',
    desktop: '/User onbarding Assets/Step_8_mascot_desktop.webp',
    hideShellMascot: true,
  },
  9: {
    mobile: '/User onbarding Assets/Tey_step_9_img.webp',
    desktop: '/User onbarding Assets/Tey_step_9_img.webp',
    hideShellMascot: true,
  },
  10: {
    mobile: '/User onbarding Assets/Step_10_image.webp',
    desktop: '/User onbarding Assets/Step_10_image.webp',
    hideShellMascot: true,
  },
  11: {
    mobile: '/User onbarding Assets/Step_11_image_mobile.webp',
    desktop: '/User onbarding Assets/Step_11_image_desktop.webp',
    fullBleed: true,
  },
  12: {
    mobile: '/User onbarding Assets/Step_12_image_mobile.webp',
    desktop: '/User onbarding Assets/Step_12_image_desktop.webp',
    hideShellMascot: true,
  },
  13: {
    mobile: '/User onbarding Assets/Step-13_img.webp',
    desktop: '/User onbarding Assets/Step-13_img.webp',
    fullBleed: true,
  },
  14: {
    mobile: '/User onbarding Assets/Step_14_image_mobile.webp',
    desktop: '/User onbarding Assets/Step_14_image_desktop.webp',
    fullBleed: true,
  },
  15: {
    mobile: '/User onbarding Assets/step_15_image_mobile.webp',
    desktop: '/User onbarding Assets/step_15_image_desktop.webp',
    fullBleed: true,
  },
};

// ─── Shared slide variants (direction-aware) ─────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const SLIDE_TRANSITION = {
  type: 'spring',
  stiffness: 320,
  damping: 32,
  mass: 0.9,
} as const;

// ─── Backend sync (non-blocking) ─────────────────────────────────────────────

async function syncToBackend(payload: {
  currentStep: number;
  completedSteps: number[];
  answers: Record<string, unknown>;
  onboardingComplete?: boolean;
}) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-onboarding`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-critical; localStorage is source of truth
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

interface OnboardingShellProps {
  initialStep: number;
}

export function OnboardingShell({ initialStep }: OnboardingShellProps) {
  const router = useRouter();
  const [step, setStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [busy, setBusy] = useState(false);

  // ── Sync initialStep prop if changed ───────────────────────────────────────
  useEffect(() => {
    if (initialStep !== step && initialStep >= 1 && initialStep <= 15) {
      setDirection(initialStep > step ? 1 : -1);
      setStep(initialStep);
    }
  }, [initialStep]);

  // ── Internal navigation (stays within the persistent SPA shell) ────────────
  const goToStep = useCallback(
    (newStep: number, dir: 1 | -1) => {
      if (busy || newStep === step) return;
      setBusy(true);
      setDirection(dir);
      setStep(newStep);
      // Update browser URL without triggering Next.js route teardown
      window.history.pushState(null, '', `/onboarding/${newStep}`);
      setTimeout(() => setBusy(false), 550);
    },
    [busy, step]
  );

  // ── Advance handler ────────────────────────────────────────────────────────
  const handleAdvance = useCallback(
    (fromStep: number) => {
      const nextStep = fromStep + 1;

      // Persist locally
      markStepComplete(fromStep);
      const state = getOnboardingState();
      const newCompleted = [...new Set([...state.completedSteps, fromStep])];
      const isLastStep = fromStep === 15;

      // Sync to backend (fire-and-forget)
      syncToBackend({
        currentStep: nextStep,
        completedSteps: newCompleted,
        answers: state.answers as Record<string, unknown>,
        ...(isLastStep && { onboardingComplete: true }),
      });

      if (isLastStep) {
        saveOnboardingState({ onboardingComplete: true, completedAt: new Date().toISOString() } as never);
        router.push('/dashboard');
      } else {
        goToStep(nextStep, 1);
      }
    },
    [goToStep, router]
  );

  // ── Back handler ──────────────────────────────────────────────────────────
  const handleBack = useCallback(
    (fromStep: number) => {
      const prevStep = fromStep - 1;
      playHaptic('light');
      if (prevStep < 1) {
        router.push('/onboarding/0');
      } else {
        goToStep(prevStep, -1);
      }
    },
    [goToStep, router]
  );

  // ── Browser back/forward button support ───────────────────────────────────
  useEffect(() => {
    const handlePop = () => {
      const match = window.location.pathname.match(/\/onboarding\/(\d+)/);
      if (match) {
        const urlStep = parseInt(match[1], 10);
        if (urlStep >= 1 && urlStep <= 15 && urlStep !== step) {
          setDirection(urlStep > step ? 1 : -1);
          setStep(urlStep);
        }
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [step]);

  // ─────────────────────────────────────────────────────────────────────────
  const config = STEP_CONFIG[step] || STEP_CONFIG[1];
  const progressPct = Math.min(100, Math.max(0, (step / 15) * 100));

  // Content switcher
  const contentForStep = (s: number) => {
    switch (s) {
      case 1:
        return <Step1Content onNext={() => handleAdvance(1)} />;
      case 2:
        return <Step2Content onNext={() => handleAdvance(2)} />;
      case 3:
        return <Step3Content onNext={() => handleAdvance(3)} />;
      case 4:
        return <Step4Content onNext={() => handleAdvance(4)} />;
      case 5:
        return <Step5Content onNext={() => handleAdvance(5)} />;
      case 6:
        return <Step6Content onNext={() => handleAdvance(6)} />;
      case 7:
        return <Step7Content onNext={() => handleAdvance(7)} />;
      case 8:
        return <Step8Content onNext={() => handleAdvance(8)} />;
      case 9:
        return <Step9Content onNext={() => handleAdvance(9)} />;
      case 10:
        return <Step10Content onNext={() => handleAdvance(10)} />;
      case 11:
        return <Step11Content onNext={() => handleAdvance(11)} />;
      case 12:
        return <Step12Content onNext={() => handleAdvance(12)} />;
      case 13:
        return <Step13Content onNext={() => handleAdvance(13)} />;
      case 14:
        return <Step14Content onNext={() => handleAdvance(14)} />;
      case 15:
        return <Step15Content onNext={() => handleAdvance(15)} />;
      default:
        return null;
    }
  };

  const isCustomMascot = config.hideShellMascot === true;

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          MOBILE LAYOUT
          ════════════════════════════════════════════════════════════════ */}
      <div className="h-[100dvh] w-full flex flex-col md:hidden bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden">
        {/* ── PERSISTENT TOP BAR (never slides, width animates) ─────── */}
        <div
          className="w-full px-5 flex items-center gap-3.5 shrink-0 z-40 bg-transparent"
          style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)', paddingBottom: '10px' }}
        >
          {/* Back button */}
          <button
            onClick={() => handleBack(step)}
            disabled={busy}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-full flex items-center justify-center shrink-0 shadow-sm hover:bg-slate-50 active:scale-95 transition-all cursor-pointer disabled:opacity-40"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Progress bar track */}
          <div className="flex-1 h-2 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
            {/* PERSISTENT FILL */}
            <motion.div
              animate={{ width: `${progressPct}%` }}
              transition={{ type: 'spring', stiffness: 240, damping: 22, mass: 1 }}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)',
                boxShadow: 'inset 0px -2px 0px rgba(0,0,0,0.1), inset 0px 2px 0px rgba(255,255,255,0.35)',
              }}
            />
          </div>

          {/* Step counter */}
          <motion.span
            key={step}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 20 }}
            className="text-sm font-[800] text-[#0172FD] shrink-0 tabular-nums"
            style={{ textShadow: '0 0 10px rgba(255,255,255,1)', minWidth: '2.5rem', textAlign: 'right' }}
          >
            {step}/15
          </motion.span>
        </div>

        {/* ── MASCOT AREA (only rendered when step doesn't provide integrated mascot layout) ── */}
        {!isCustomMascot && (
          <div
            className={`w-full relative overflow-hidden ${config.fullBleed ? 'flex-1 min-h-0' : 'shrink-0'}`}
            style={
              config.fullBleed
                ? undefined
                : {
                    height: config.mobileMascotHeight || '32dvh',
                    transition: 'height 420ms cubic-bezier(0.32, 0.72, 0, 1)',
                  }
            }
          >
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MascotBackground variant={config.fullBleed || config.softBg ? 'soft' : 'default'} />
            </div>

            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={`mascot-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SLIDE_TRANSITION}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className={`relative ${config.fullBleed ? 'w-full h-full' : 'h-full aspect-square max-w-[80vw] mx-auto'}`}>
                  <Image
                    src={config.mobile}
                    alt="Tey Mascot"
                    fill
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* ── CONTENT AREA (slides horizontally with 40ms stagger) ── */}
        <div
          className={`w-full relative min-h-0 ${
            config.fullBleed ? 'shrink-0' : `flex-1 ${isCustomMascot ? 'bg-transparent' : 'bg-white'}`
          }`}
        >
          {!isCustomMascot && !config.fullBleed && (
            <div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />
          )}

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={`content-${step}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ ...SLIDE_TRANSITION, delay: 0.04 }}
              className={config.fullBleed ? 'relative w-full' : 'absolute inset-0 w-full h-full'}
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}
            >
              {contentForStep(step)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT
          ════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex h-screen w-full bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden">
        {/* LEFT PANEL: Mascot (slides) - for standard dual-pane steps */}
        {!isCustomMascot && (
          <div className="w-1/2 lg:w-5/12 h-full relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 pointer-events-none">
              <MascotBackground />
            </div>

            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={`desktop-mascot-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SLIDE_TRANSITION}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="relative w-[85%] aspect-square">
                  <Image
                    src={config.desktop}
                    alt="Tey Mascot"
                    fill
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* RIGHT (OR FULL) PANEL: Persistent progress bar + sliding content */}
        <div
          className={`flex-1 flex flex-col ${
            isCustomMascot ? 'px-8 lg:px-16 max-w-[1300px] mx-auto w-full' : 'px-10 lg:px-14'
          } py-8 lg:py-10 overflow-hidden min-w-0 h-full`}
        >
          {/* ── PERSISTENT DESKTOP PROGRESS BAR ────────────────────── */}
          <div className="w-full flex items-center gap-5 mb-6 lg:mb-8 shrink-0">
            <button
              onClick={() => handleBack(step)}
              disabled={busy}
              className="w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer disabled:opacity-40"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="flex-1 h-4 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
              <motion.div
                animate={{ width: `${progressPct}%` }}
                transition={{ type: 'spring', stiffness: 240, damping: 22, mass: 1 }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)',
                  boxShadow: 'inset 0px -2.5px 0px rgba(0,0,0,0.1), inset 0px 2.5px 0px rgba(255,255,255,0.3)',
                }}
              />
            </div>

            <motion.span
              key={step}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 20 }}
              className="text-lg font-extrabold text-[#0172FD] shrink-0 tabular-nums"
            >
              {step}/15
            </motion.span>
          </div>

          {/* ── SLIDING CONTENT ─────────────────────────────────────── */}
          <div className="flex-1 relative overflow-hidden min-h-0">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={`desktop-content-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ ...SLIDE_TRANSITION, delay: 0.04 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                {contentForStep(step)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
