import React from 'react';
import OnboardingProgressBar from '@/components/features/CreatorOnboarding/OnboardingProgressBar';
import OnboardingBackgroundProvider from '@/components/features/CreatorOnboarding/OnboardingBackgroundProvider';

export default function CreatorOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingBackgroundProvider>
      <OnboardingProgressBar />
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        {children}
      </main>
    </OnboardingBackgroundProvider>
  );
}
