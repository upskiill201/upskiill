'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function OnboardingBackgroundProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [bgColor, setBgColor] = useState('#FFFFFF');

  useEffect(() => {
    const stepMatch = pathname?.match(/\/onboarding\/(\d+)/);
    const step = stepMatch ? stepMatch[1] : null;
    if (step === '9' || step === '10') {
      setBgColor('#F1EDFC');
    } else {
      setBgColor('#FFFFFF');
    }
  }, [pathname]);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: bgColor,
        transition: 'background-color 0.3s ease',
      }}
    >
      {children}
    </div>
  );
}
