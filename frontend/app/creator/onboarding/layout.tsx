'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import OnboardingProgressBar from '@/components/features/CreatorOnboarding/OnboardingProgressBar';

export default function CreatorOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const stepMatch = pathname?.match(/\/onboarding\/(\d+)/);
  const step = stepMatch ? stepMatch[1] : null;
  const isPurpleBg = step === '9' || step === '10';
  const bgColor = isPurpleBg ? '#F1EDFC' : '#FFFFFF';

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: bgColor,
        fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
        transition: 'background-color 0.3s ease',
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
