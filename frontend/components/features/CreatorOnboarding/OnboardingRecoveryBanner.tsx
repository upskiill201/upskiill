'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { hasInProgressOnboarding, getResumeStep, clearOnboardingData, getOnboardingData } from '@/lib/onboarding';

/**
 * OnboardingRecoveryBanner
 *
 * Shown on Step 1 ONLY when the creator has in-progress onboarding data
 * from a previous session. Gives them the choice to:
 * - Resume from where they left off
 * - Start over (clears localStorage)
 *
 * Without this, the creator is confused why cards on Step 1 already have
 * pre-filled answers from a session they don't remember.
 */
export default function OnboardingRecoveryBanner() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [resumeStep, setResumeStep] = useState(2);
  const [stepName, setStepName] = useState('');

  // Step number → human-readable name map
  const STEP_NAMES: Record<number, string> = {
    2: 'your creator type',
    3: 'your teaching categories',
    4: 'your audience size',
    5: 'your platforms',
    6: 'your existing content',
    7: 'your biggest challenge',
    8: 'your teaching style',
    9: 'your available time',
    10: 'your pricing strategy',
    11: 'your course format',
    12: 'your launch goal',
    13: 'your creator bio',
    14: 'the final review',
  };

  useEffect(() => {
    // Only show if there is genuine in-progress data
    if (hasInProgressOnboarding()) {
      const step = getResumeStep();
      setResumeStep(step);
      setStepName(STEP_NAMES[step] || `Step ${step}`);
      setShow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = () => {
    setShow(false);
    router.push(`/creator/onboarding/${resumeStep}`);
  };

  const handleStartOver = () => {
    clearOnboardingData();
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full mb-6"
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #EEF2FF 0%, #F0FDF4 100%)',
              border: '1.5px solid #C7D2FE',
              borderRadius: '16px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Sparkles size={20} color="white" />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '15px', color: '#1e1b4b' }}>
                Welcome back! You left off at{' '}
                <span style={{ color: '#4F46E5' }}>{stepName}</span>.
              </p>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#6B7280' }}>
                Your progress is saved. Pick up exactly where you stopped.
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
              <button
                onClick={handleStartOver}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: '1.5px solid #D1D5DB',
                  background: 'white',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#6B7280',
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={14} />
                Start over
              </button>
              <button
                onClick={handleContinue}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#4F46E5',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Continue from Step {resumeStep}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
