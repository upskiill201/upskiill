'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

type Direction = 1 | -1 | 0;

interface OnboardingContextValue {
  currentStep: number;
  direction: Direction;
  isTransitioning: boolean;
  goToStep: (step: number) => void;
  advanceStep: () => void;
  goBack: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ 
  children, 
  initialStep = 0 
}: { 
  children: React.ReactNode;
  initialStep?: number;
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState<Direction>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync state with URL without triggering Next.js route change (so we keep AnimatePresence alive)
  const goToStep = useCallback((step: number) => {
    if (step === currentStep) return;
    
    setDirection(step > currentStep ? 1 : -1);
    setIsTransitioning(true);
    setCurrentStep(step);
    
    // Let Next.js handle the URL in useOnboardingSession
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentStep]);

  // Sync with Next.js router changes
  useEffect(() => {
    if (initialStep !== currentStep) {
      setDirection(initialStep > currentStep ? 1 : -1);
      setIsTransitioning(true);
      setCurrentStep(initialStep);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  }, [initialStep]);

  const advanceStep = useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const goBack = useCallback(() => {
    goToStep(Math.max(0, currentStep - 1));
  }, [currentStep, goToStep]);

  // (Native popstate listener removed as Next.js handles URL state via initialStep)

  return (
    <OnboardingContext.Provider value={{
      currentStep,
      direction,
      isTransitioning,
      goToStep,
      advanceStep,
      goBack
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }
  return context;
}
