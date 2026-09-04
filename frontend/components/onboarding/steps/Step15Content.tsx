'use client';

import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ArrowRight, Bell, Check, Flame, Share, SquarePlus, Target, Trophy } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { playHaptic } from '@/lib/haptics';
import { ConfettiBurst } from '../ConfettiBurst';

interface Step15ContentProps {
  onNext: () => void;
}

type Phase = 'install' | 'notifications' | 'celebrate';

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
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
      onClick={onClick}
      aria-label={ariaLabel}
      className="group relative w-full flex items-center justify-center py-4 md:py-5 rounded-[1.75rem] md:rounded-[2rem] text-white font-bold text-[clamp(1.05rem,5vw,1.2rem)] cursor-pointer"
      style={{
        backgroundColor: '#0172FD',
        boxShadow:
          '0 12px 24px -8px rgba(1,114,253,0.4), inset 0px -6px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)',
      }}
    >
      <span>{children}</span>
      <ArrowRight className="absolute right-5 md:right-6 w-5 h-5 md:w-6 md:h-6 stroke-[3] transition-transform group-hover:translate-x-1.5" />
    </motion.button>
  );
}

function SecondaryLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-3 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
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
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#0172FD]">
        {icon}
      </div>
      <span className="text-[15px] font-semibold text-[#071233]">{label}</span>
    </div>
  );
}

export default function Step15Content({ onNext }: Step15ContentProps) {
  useOnboardingSession({ currentStep: 15, disableGuard: true });
  const { platform, isStandalone, canPromptInstall, promptInstall } = usePwaInstall();

  const [phase, setPhase] = useState<Phase>('install');
  const [iosStep, setIosStep] = useState(0);

  const goNotifications = useCallback(() => {
    playHaptic('light');
    setPhase('notifications');
  }, []);

  const goCelebrate = useCallback(() => {
    playHaptic('medium');
    setPhase('celebrate');
  }, []);

  const handleInstallClick = useCallback(async () => {
    playHaptic('medium');
    await promptInstall();
    goNotifications();
  }, [promptInstall, goNotifications]);

  const handleEnableNotifications = useCallback(async () => {
    playHaptic('medium');
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        await Notification.requestPermission();
      } catch {
        // Denied/blocked/unsupported — onboarding must still complete either way.
      }
    }
    goCelebrate();
  }, [goCelebrate]);

  const handleFinish = () => {
    playHaptic('medium');
    onNext();
  };

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end md:justify-center px-5 md:px-0 pb-6 md:pb-0 pt-2">
      <AnimatePresence mode="wait">
        {phase === 'install' && isStandalone && (
          <motion.div key="already-installed" variants={cardVariants} initial="hidden" animate="show" exit="exit" className="w-full max-w-[420px] text-center">
            <h1
              className="text-[clamp(1.9rem,10vw,2.6rem)] font-[900] leading-[1.1] mb-3 text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              You&apos;re already carrying Teyro with you! 🎉
            </h1>
            <p className="text-slate-500 font-medium mb-6">Teyro is installed and ready whenever you are.</p>
            <PrimaryButton onClick={goNotifications}>Continue</PrimaryButton>
          </motion.div>
        )}

        {phase === 'install' && !isStandalone && platform === 'android' && (
          <motion.div key="android-install" variants={cardVariants} initial="hidden" animate="show" exit="exit" className="w-full flex flex-col items-center gap-5">
            <h1
              className="text-[clamp(2rem,10vw,2.75rem)] font-[900] leading-[1.05] text-center text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              Take Teyro <span className="text-[#0172FD]">with you</span> 🚀
            </h1>
            <Card>
              <div className="flex flex-col gap-4 mb-6">
                <Benefit icon={<Flame className="w-4 h-4" />} label="Keep your streak going" />
                <Benefit icon={<Target className="w-4 h-4" />} label="Never miss your learning goal" />
                <Benefit icon={<Trophy className="w-4 h-4" />} label="Get important Teyro updates" />
              </div>
              <PrimaryButton onClick={handleInstallClick} ariaLabel="Install Teyro app">
                {canPromptInstall ? 'Install Teyro' : 'Continue'}
              </PrimaryButton>
            </Card>
          </motion.div>
        )}

        {phase === 'install' && !isStandalone && platform === 'ios' && (
          <motion.div key="ios-install" variants={cardVariants} initial="hidden" animate="show" exit="exit" className="w-full flex flex-col items-center gap-5">
            <h1
              className="text-[clamp(1.8rem,9vw,2.5rem)] font-[900] leading-[1.1] text-center text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              One last thing! 🚀
            </h1>
            <p className="text-slate-500 font-medium text-center -mt-2">Let&apos;s put Teyro right on your Home Screen.</p>
            <Card>
              <ol className="flex flex-col gap-4 mb-6" aria-label="Steps to add Teyro to your Home Screen">
                <li className={`flex items-center gap-3 transition-opacity ${iosStep >= 0 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#0172FD] font-bold">
                    <Share className="w-4 h-4" />
                  </div>
                  <span className="text-[15px] font-semibold text-[#071233]">
                    Tap <strong>Share</strong> in Safari&apos;s toolbar
                  </span>
                </li>
                <li className={`flex items-center gap-3 transition-opacity ${iosStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#0172FD] font-bold">
                    <SquarePlus className="w-4 h-4" />
                  </div>
                  <span className="text-[15px] font-semibold text-[#071233]">
                    Select <strong>Add to Home Screen</strong>
                  </span>
                </li>
                <li className={`flex items-center gap-3 transition-opacity ${iosStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#0172FD] font-bold">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[15px] font-semibold text-[#071233]">
                    Tap <strong>Add</strong>
                  </span>
                </li>
              </ol>
              {iosStep < 2 ? (
                <PrimaryButton onClick={() => setIosStep((s) => Math.min(s + 1, 2))} ariaLabel="Next step">
                  Next
                </PrimaryButton>
              ) : (
                <PrimaryButton onClick={goNotifications} ariaLabel="I've added Teyro to my Home Screen">
                  Got it
                </PrimaryButton>
              )}
            </Card>
          </motion.div>
        )}

        {phase === 'install' && !isStandalone && (platform === 'desktop' || platform === 'other') && (
          <motion.div key="desktop-install" variants={cardVariants} initial="hidden" animate="show" exit="exit" className="w-full flex flex-col items-center gap-5">
            <h1
              className="text-[clamp(1.9rem,9vw,2.6rem)] font-[900] leading-[1.1] text-center text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              You&apos;re all set!
            </h1>
            <Card>
              <p className="text-[15px] font-medium text-slate-500 mb-6">
                Teyro works great right here in your browser. Open teyro.app on your phone any time to install it
                there too.
              </p>
              <PrimaryButton onClick={goNotifications}>Continue</PrimaryButton>
            </Card>
          </motion.div>
        )}

        {phase === 'notifications' && (
          <motion.div key="notifications" variants={cardVariants} initial="hidden" animate="show" exit="exit" className="w-full flex flex-col items-center gap-5">
            <h1
              className="text-[clamp(1.9rem,9vw,2.6rem)] font-[900] leading-[1.1] text-center text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              Keep your streak alive <span className="text-[#0172FD]">🔥</span>
            </h1>
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#0172FD]">
                  <Bell className="w-4 h-4" />
                </div>
                <p className="text-[15px] font-semibold text-[#071233]">
                  Teyro can remind you when it&apos;s time to learn — no spam, just nudges that matter.
                </p>
              </div>
              <PrimaryButton onClick={handleEnableNotifications} ariaLabel="Turn on reminder notifications">
                Turn on reminders
              </PrimaryButton>
              <SecondaryLink onClick={goCelebrate}>Not now</SecondaryLink>
            </Card>
          </motion.div>
        )}

        {phase === 'celebrate' && (
          <motion.div key="celebrate" variants={cardVariants} initial="hidden" animate="show" exit="exit" className="w-full max-w-[420px] text-center relative">
            {!prefersReducedMotion && <ConfettiBurst active />}
            <h1
              className="text-[clamp(2.2rem,12vw,3.2rem)] font-[900] leading-[1.05] mb-2 text-[#071233]"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              You&apos;re all set! 🎉
            </h1>
            <p className="text-[clamp(1.05rem,5vw,1.2rem)] font-medium text-slate-500 mb-8">
              Your dashboard is ready. Let&apos;s achieve great things together.
            </p>
            <PrimaryButton onClick={handleFinish}>Enter Teyro</PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
