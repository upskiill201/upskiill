'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { TOTAL_STEPS } from '@/lib/user-onboarding';

export default function OnboardingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const stepMatch = pathname.match(/\/onboarding\/(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1], 10) : 0;

  // Track direction: 1 = forward, -1 = backward
  const prevStepRef = useRef(currentStep);
  const directionRef = useRef(1);

  // Compute direction BEFORE the effect so it's correct on this render
  if (prevStepRef.current !== currentStep) {
    directionRef.current = currentStep > prevStepRef.current ? 1 : -1;
  }

  useEffect(() => {
    prevStepRef.current = currentStep;
  }, [currentStep]);

  const direction = directionRef.current;

  // Duolingo-style: pure horizontal slide with spring physics
  // Forward: new content slides in from right, old exits to left
  // Backward: new content slides in from left, old exits to right
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  // Every numbered step is managed by the persistent OnboardingShell SPA.
  // A shared key means template.tsx does not remount / wipe the shell during
  // step transitions. Derived from TOTAL_STEPS rather than hardcoded so this
  // never drifts when a step is added or removed.
  const templateKey =
    currentStep >= 1 && currentStep <= TOTAL_STEPS ? 'onboarding-shell-all' : pathname;

  return (
    // Outer container: overflow-hidden clips the sliding content
    <div className="relative w-full min-h-screen overflow-hidden">
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={templateKey}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 },
            opacity: { duration: 0.15, ease: 'easeOut' },
          }}
          className="w-full"
          style={{ willChange: 'transform' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
