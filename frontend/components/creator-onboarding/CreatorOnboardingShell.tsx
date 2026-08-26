'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import posthog from 'posthog-js';

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
import Step16Content from './steps/Step16Content';
import DuolingoButton3D from './DuolingoButton3D';

import { getOnboardingData, saveOnboardingStep, clearOnboardingData } from '@/lib/onboarding';
import { getCachedUser, setCachedUser } from '@/lib/user-cache';

interface CreatorOnboardingShellProps {
  initialStep: number;
}

const TOTAL_STEPS = 16;
const BATCH_MAX_STEP = 16;

export function CreatorOnboardingShell({ initialStep }: CreatorOnboardingShellProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Step Data State (Optimistic In-Memory)
  const [step2Type, setStep2Type] = useState<string | null>(null);
  const [step3Category, setStep3Category] = useState<string | null>(null);
  const [step4Audience, setStep4Audience] = useState<string | null>(null);
  const [step5Platforms, setStep5Platforms] = useState<string[]>([]);
  const [step6Content, setStep6Content] = useState<string[]>([]);
  const [step7Challenges, setStep7Challenges] = useState<string[]>([]);
  const [step8Revenue, setStep8Revenue] = useState<string | null>(null);
  const [step12Format, setStep12Format] = useState<string | null>(null);
  const [step13Community, setStep13Community] = useState<string | null>(null);
  const [step15Data, setStep15Data] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  // Load existing onboarding data on mount
  useEffect(() => {
    const data = getOnboardingData();
    if (data.step2?.creatorType) setStep2Type(data.step2.creatorType);
    if (data.step3?.categories?.[0]) setStep3Category(data.step3.categories[0]);
    if (data.step4?.audienceSize) setStep4Audience(data.step4.audienceSize);
    if (data.step5?.platforms) setStep5Platforms(data.step5.platforms);
    if (data.step6?.existingContent) setStep6Content(data.step6.existingContent);
    if (data.step7?.biggestChallenge) setStep7Challenges(Array.isArray(data.step7.biggestChallenge) ? data.step7.biggestChallenge : [data.step7.biggestChallenge]);
    if (data.step8?.teachingStyle) setStep8Revenue(data.step8.teachingStyle);
    if (data.step12?.courseFormat) setStep12Format(data.step12.courseFormat);
    if (data.step13?.communityOption) setStep13Community(data.step13.communityOption);

    // Hydrate user info if available from cache or server
    const cached = getCachedUser();
    if (cached?.fullName) {
      setStep15Data((prev) => ({ ...prev, fullName: cached.fullName || prev.fullName, email: cached.email || prev.email }));
    } else {
      fetch('/api/auth/me', { credentials: 'include' })
        .then((res) => (res.ok ? res.json() : null))
        .then((user) => {
          if (user?.fullName) {
            setCachedUser(user);
            setStep15Data((prev) => ({ ...prev, fullName: user.fullName, email: user.email || prev.email }));
          }
        })
        .catch(() => {});
    }
  }, []);

  // Sync with browser URL back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.match(/\/creator\/onboarding\/(\d+)/);
      if (match) {
        const targetStep = parseInt(match[1], 10);
        if (targetStep !== currentStep) {
          setDirection(targetStep > currentStep ? 1 : -1);
          setCurrentStep(targetStep);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentStep]);

  // Navigate to target step (instant in-memory transition)
  const goToStep = useCallback((targetStep: number) => {
    if (targetStep < 1 || targetStep > TOTAL_STEPS) return;

    setDirection(targetStep > currentStep ? 1 : -1);
    setCurrentStep(targetStep);
    window.history.pushState(null, '', `/creator/onboarding/${targetStep}`);
    posthog.capture('onboarding_step_viewed', { step: targetStep });
  }, [currentStep]);

  // Step Select / Form Handlers
  const handleStep2Select = (id: string) => {
    setStep2Type(id);
    saveOnboardingStep(2, { creatorType: id });
  };

  const handleStep3Select = (id: string) => {
    setStep3Category(id);
    saveOnboardingStep(3, { categories: [id] });
  };

  const handleStep4Select = (id: string) => {
    setStep4Audience(id);
    saveOnboardingStep(4, { audienceSize: id });
  };

  const handleStep5Toggle = (id: string) => {
    setStep5Platforms((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      saveOnboardingStep(5, { platforms: next });
      return next;
    });
  };

  const handleStep6Toggle = (id: string) => {
    setStep6Content((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      saveOnboardingStep(6, { existingContent: next });
      return next;
    });
  };

  const handleStep7Toggle = (id: string) => {
    setStep7Challenges((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      saveOnboardingStep(7, { biggestChallenge: next });
      return next;
    });
  };

  const handleStep8Select = (id: string) => {
    setStep8Revenue(id);
    saveOnboardingStep(8, { teachingStyle: id });
  };

  const handleStep12Select = (id: string) => {
    setStep12Format(id);
    saveOnboardingStep(12, { courseFormat: id });
  };

  const handleStep13Select = (id: string) => {
    setStep13Community(id);
    saveOnboardingStep(13, { communityOption: id });
  };

  const handleStep15Change = (field: string, value: string) => {
    setAuthError('');
    setStep15Data((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoogleSuccess = (name: string, email: string) => {
    setAuthError('');
    setStep15Data((prev) => ({ ...prev, fullName: name, email }));
    goToStep(16);
  };

  // Next Step Advance Router
  const handleNext = async () => {
    if (currentStep === 1) {
      saveOnboardingStep(1, { started: true });
      posthog.capture('onboarding_started', { step: 1 });
      goToStep(2);
    } else if (currentStep === 2) {
      if (!step2Type) return;
      saveOnboardingStep(2, { creatorType: step2Type });
      posthog.capture('onboarding_step_completed', { step: 2, creatorType: step2Type });
      goToStep(3);
    } else if (currentStep === 3) {
      if (!step3Category) return;
      saveOnboardingStep(3, { categories: [step3Category] });
      posthog.capture('onboarding_step_completed', { step: 3, category: step3Category });
      goToStep(4);
    } else if (currentStep === 4) {
      if (!step4Audience) return;
      saveOnboardingStep(4, { audienceSize: step4Audience });
      posthog.capture('onboarding_step_completed', { step: 4, audienceSize: step4Audience });
      goToStep(5);
    } else if (currentStep === 5) {
      if (step5Platforms.length === 0) return;
      saveOnboardingStep(5, { platforms: step5Platforms });
      posthog.capture('onboarding_step_completed', { step: 5, platforms: step5Platforms });
      goToStep(6);
    } else if (currentStep === 6) {
      if (step6Content.length === 0) return;
      saveOnboardingStep(6, { existingContent: step6Content });
      posthog.capture('onboarding_step_completed', { step: 6, existingContent: step6Content });
      goToStep(7);
    } else if (currentStep === 7) {
      if (step7Challenges.length === 0) return;
      saveOnboardingStep(7, { biggestChallenge: step7Challenges });
      posthog.capture('onboarding_step_completed', { step: 7, challenges: step7Challenges });
      goToStep(8);
    } else if (currentStep === 8) {
      if (!step8Revenue) return;
      saveOnboardingStep(8, { teachingStyle: step8Revenue });
      posthog.capture('onboarding_step_completed', { step: 8, revenueGoal: step8Revenue });
      goToStep(9);
    } else if (currentStep === 9) {
      saveOnboardingStep(9, { viewed: true });
      posthog.capture('onboarding_step_completed', { step: 9 });
      goToStep(10);
    } else if (currentStep === 10) {
      saveOnboardingStep(10, { viewed: true });
      posthog.capture('onboarding_step_completed', { step: 10 });
      goToStep(11);
    } else if (currentStep === 11) {
      saveOnboardingStep(11, { viewed: true });
      posthog.capture('onboarding_step_completed', { step: 11 });
      goToStep(12);
    } else if (currentStep === 12) {
      if (!step12Format) return;
      saveOnboardingStep(12, { courseFormat: step12Format });
      posthog.capture('onboarding_step_completed', { step: 12, format: step12Format });
      goToStep(13);
    } else if (currentStep === 13) {
      if (!step13Community) return;
      saveOnboardingStep(13, { communityOption: step13Community });
      posthog.capture('onboarding_step_completed', { step: 13, community: step13Community });
      goToStep(14);
    } else if (currentStep === 14) {
      saveOnboardingStep(14, { reviewed: true });
      posthog.capture('onboarding_step_completed', { step: 14 });
      goToStep(15);
    } else if (currentStep === 15) {
      if (!step15Data.fullName.trim() || !step15Data.email.trim() || !step15Data.password) {
        setAuthError('Please fill in all fields to create your account.');
        return;
      }
      if (step15Data.password.length < 6) {
        setAuthError('Password must be at least 6 characters.');
        return;
      }

      setIsLoading(true);
      setAuthError('');

      try {
        const onboardingData = getOnboardingData();
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email: step15Data.email.toLowerCase().trim(),
            password: step15Data.password,
            fullName: step15Data.fullName.trim(),
            role: 'INSTRUCTOR',
            draftId: onboardingData.draftId,
            onboarding: onboardingData,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.requiresVerification) {
            saveOnboardingStep(15, { accountCreated: true, email: step15Data.email });
            window.location.href = `/creator/verify-pending?email=${encodeURIComponent(data.email || step15Data.email)}`;
            return;
          }
          const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
          throw new Error(errMsg || 'Account creation failed');
        }

        if (data.requiresVerification) {
          saveOnboardingStep(15, { accountCreated: true, email: step15Data.email });
          window.location.href = `/creator/verify-pending?email=${encodeURIComponent(step15Data.email)}`;
          return;
        }

        // Account is active and session token is issued
        saveOnboardingStep(15, { accountCreated: true });
        if (data.user || data) setCachedUser(data.user || data);
        posthog.capture('creator_account_created', { email: step15Data.email, method: 'email' });
        goToStep(16);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Registration failed';
        setAuthError(msg);
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep === 16) {
      setIsLoading(true);
      clearOnboardingData();
      posthog.capture('creator_studio_entered');
      setTimeout(() => {
        window.location.href = '/creator';
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    } else {
      router.push('/creator');
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 2 && !step2Type) return true;
    if (currentStep === 3 && !step3Category) return true;
    if (currentStep === 4 && !step4Audience) return true;
    if (currentStep === 5 && step5Platforms.length === 0) return true;
    if (currentStep === 6 && step6Content.length === 0) return true;
    if (currentStep === 7 && step7Challenges.length === 0) return true;
    if (currentStep === 8 && !step8Revenue) return true;
    if (currentStep === 12 && !step12Format) return true;
    if (currentStep === 13 && !step13Community) return true;
    if (currentStep === 15 && (!step15Data.fullName.trim() || !step15Data.email.trim() || !step15Data.password || step15Data.password.length < 6)) return true;
    return false;
  };

  const getStatusText = () => {
    if (currentStep === 2) return step2Type ? 'Ready to continue' : 'Select an option to proceed';
    if (currentStep === 3) return step3Category ? 'Category selected' : 'Choose your primary subject';
    if (currentStep === 4) return step4Audience ? 'Audience size selected' : 'Select your current audience tier';
    if (currentStep === 5) return step5Platforms.length > 0 ? `${step5Platforms.length} platform${step5Platforms.length > 1 ? 's' : ''} selected` : 'Select at least one platform';
    if (currentStep === 6) return step6Content.length > 0 ? `${step6Content.length} asset type${step6Content.length > 1 ? 's' : ''} selected` : 'Select your existing content types';
    if (currentStep === 7) return step7Challenges.length > 0 ? `${step7Challenges.length} challenge${step7Challenges.length > 1 ? 's' : ''} selected` : 'Select your main challenges';
    if (currentStep === 8) return step8Revenue ? 'Revenue goal selected' : 'Select your primary monthly target';
    if (currentStep === 9 || currentStep === 10 || currentStep === 11 || currentStep === 14) return 'Ready to continue';
    if (currentStep === 12) return step12Format ? 'Build goal selected' : 'Select what you want to create first';
    if (currentStep === 13) return step13Community ? 'Community preference selected' : 'Choose community preference';
    if (currentStep === 15) return step15Data.fullName && step15Data.email ? 'Details complete' : 'Fill in your creator details';
    if (currentStep === 16) return 'Your studio is ready!';
    return '';
  };

  const getButtonText = () => {
    if (currentStep === 15) return 'Create Account';
    if (currentStep === 16) return 'Enter Creator Studio 🚀';
    return 'Continue';
  };

  // Duolingo Horizontal Spring Slide Variants
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

  const progressPercentage = Math.round((currentStep / TOTAL_STEPS) * 100);

  return (
    <div className="relative w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col bg-white select-none">
      
      {/* ─── PERSISTENT DUOLINGO HEADER (Never Unmounts) ─── */}
      <header className="shrink-0 h-[60px] sm:h-[70px] px-4 sm:px-8 flex items-center justify-between border-b-2 border-gray-200 bg-white z-40">
        
        {/* Left: Back Button */}
        <button
          type="button"
          onClick={handleBack}
          aria-label="Previous step"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>

        {/* Center: 3D Segmented Animated Progress Bar */}
        <div className="flex-1 max-w-[340px] sm:max-w-[460px] mx-3 sm:mx-6 flex items-center gap-3">
          <div className="flex-1 h-3.5 sm:h-4 bg-gray-200 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-blue-600 rounded-full relative"
              initial={false}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Duolingo glossy reflection cap */}
              <div className="absolute top-0.5 left-1.5 right-1.5 h-1 bg-white/40 rounded-full" />
            </motion.div>
          </div>
          <span className="text-[12px] sm:text-[13px] font-bold text-gray-500 shrink-0">
            {currentStep}/{TOTAL_STEPS}
          </span>
        </div>

        {/* Right: Exit Link */}
        <Link
          href="/creator"
          className="px-3 py-1.5 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 text-[13px] font-bold flex items-center gap-1 active:scale-95 transition-all"
        >
          <X size={16} />
          <span className="hidden sm:inline">Exit</span>
        </Link>
      </header>

      {/* ─── SCROLLABLE CONTENT VIEWPORT (With Edge Fade Masks) ─── */}
      <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
        {/* Top Fade Edge */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-white to-transparent z-20" />

        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 },
              opacity: { duration: 0.15, ease: 'easeOut' },
            }}
            className="w-full h-full overflow-y-auto px-4 sm:px-8 lg:px-14 py-3 sm:py-6 flex flex-col"
            style={{ willChange: 'transform' }}
          >
            {currentStep === 1 && (
              <Step1Content onNext={handleNext} isLoading={isLoading} />
            )}

            {currentStep === 2 && (
              <Step2Content
                selected={step2Type}
                onSelect={handleStep2Select}
              />
            )}

            {currentStep === 3 && (
              <Step3Content
                selected={step3Category}
                onSelect={handleStep3Select}
              />
            )}

            {currentStep === 4 && (
              <Step4Content
                selected={step4Audience}
                onSelect={handleStep4Select}
              />
            )}

            {currentStep === 5 && (
              <Step5Content
                selected={step5Platforms}
                onToggle={handleStep5Toggle}
              />
            )}

            {currentStep === 6 && (
              <Step6Content
                selected={step6Content}
                onToggle={handleStep6Toggle}
              />
            )}

            {currentStep === 7 && (
              <Step7Content
                selected={step7Challenges}
                onToggle={handleStep7Toggle}
              />
            )}

            {currentStep === 8 && (
              <Step8Content
                selected={step8Revenue}
                onSelect={handleStep8Select}
              />
            )}

            {currentStep === 9 && (
              <Step9Content />
            )}

            {currentStep === 10 && (
              <Step10Content />
            )}

            {currentStep === 11 && (
              <Step11Content />
            )}

            {currentStep === 12 && (
              <Step12Content
                selected={step12Format}
                onSelect={handleStep12Select}
              />
            )}

            {currentStep === 13 && (
              <Step13Content
                selected={step13Community}
                onSelect={handleStep13Select}
              />
            )}

            {currentStep === 14 && (
              <Step14Content />
            )}

            {currentStep === 15 && (
              <Step15Content
                formData={step15Data}
                onChange={handleStep15Change}
                authError={authError}
                onGoogleSuccess={handleGoogleSuccess}
                onSubmit={handleNext}
              />
            )}

            {currentStep === 16 && (
              <Step16Content
                creatorName={step15Data.fullName || getCachedUser()?.fullName || ''}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Fade Edge */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-white to-transparent z-20" />
      </div>

      {/* ─── PERSISTENT GROUNDED DUOLINGO FOOTER (Never Overlaps Cards) ─── */}
      {currentStep > 1 && (
        <footer className="shrink-0 w-full border-t-2 border-gray-100 bg-white px-4 sm:px-8 lg:px-14 py-3 sm:py-4 z-40">
          <div className="w-full max-w-[1560px] mx-auto flex items-center justify-between gap-3">
            <div className="text-[11.5px] xs:text-[12.5px] sm:text-[14px] font-bold text-gray-500 leading-tight">
              {getStatusText()}
            </div>

            <DuolingoButton3D
              onClick={handleNext}
              disabled={isNextDisabled()}
              isLoading={isLoading}
              className="h-[48px] sm:h-[52px] px-7 sm:px-12 text-[14.5px] sm:text-[16.5px]"
            >
              {getButtonText()}
            </DuolingoButton3D>
          </div>
        </footer>
      )}

    </div>
  );
}
