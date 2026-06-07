import React from 'react';
import OnboardingProgressBar from '@/components/features/CreatorOnboarding/OnboardingProgressBar';

export default function CreatorOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F1EDFC',
        fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
      }}
    >
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
    </div>
  );
}
