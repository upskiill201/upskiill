'use client';

import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './WelcomeScreen';

interface UserData {
  name: string;
  email: string;
  role: string;
}

interface CreatorOnboardingFlowProps {
  isTestMode?: boolean;
}

const FAKE_USER: UserData = {
  name: 'Joel',
  email: 'creator@test.com',
  role: 'creator',
};

export const CreatorOnboardingFlow: React.FC<CreatorOnboardingFlowProps> = ({ isTestMode = false }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (isTestMode) {
      const savedStep = localStorage.getItem('creatorOnboardingStep');
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    }
    setIsLoaded(true);
  }, [isTestMode]);

  // Save to localStorage when step changes
  useEffect(() => {
    if (isTestMode && isLoaded) {
      localStorage.setItem('creatorOnboardingStep', currentStep.toString());
    }
  }, [currentStep, isTestMode, isLoaded]);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleReset = () => {
    setCurrentStep(1);
    if (isTestMode) {
      localStorage.removeItem('creatorOnboardingStep');
    }
  };

  if (!isLoaded) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isTestMode && (
        <div className="bg-yellow-100 p-2 text-center text-sm font-medium text-yellow-800 flex justify-center items-center gap-4">
          <span>Test Mode Active (Fake User: {FAKE_USER.name})</span>
          <button
            onClick={handleReset}
            className="text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-900 px-2 py-1 rounded"
          >
            Reset Onboarding
          </button>
        </div>
      )}

      <div className="flex-grow flex flex-col">
        {currentStep === 1 && (
          <WelcomeScreen
            userName={isTestMode ? FAKE_USER.name : 'Creator'}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <div className="flex-grow flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-[10px] shadow-sm max-w-md w-full text-center">
              <h2 className="text-2xl font-bold mb-4">Step 2 (Placeholder)</h2>
              <p className="text-gray-600 mb-8">This is where the next step of onboarding will go.</p>
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 rounded-[10px] text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 rounded-[10px] text-white hover:bg-blue-700 font-medium"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex-grow flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-[10px] shadow-sm max-w-md w-full text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h2 className="text-2xl font-bold mb-4">Onboarding Completed</h2>
              <p className="text-gray-600 mb-8">You are ready to start building your store.</p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-blue-600 rounded-[10px] text-white hover:bg-blue-700 font-medium w-full"
              >
                Restart Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
