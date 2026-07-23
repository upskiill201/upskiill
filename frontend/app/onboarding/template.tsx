'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

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

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        initial={{ 
          x: `${40 * direction}%`, 
          opacity: 0, 
          scale: 0.96 
        }}
        animate={{ 
          x: 0, 
          opacity: 1, 
          scale: 1 
        }}
        exit={{ 
          x: `${-40 * direction}%`, 
          opacity: 0, 
          scale: 0.96 
        }}
        transition={{
          type: "spring",
          stiffness: direction === 1 ? 380 : 320,
          damping: 30,
          opacity: { duration: 0.18 },
          scale: { type: "spring", stiffness: 380, damping: 30 }
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
