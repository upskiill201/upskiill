'use client';

import { usePathname } from 'next/navigation';

export default function CreatorOnboardingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const stepMatch = pathname.match(/\/creator\/onboarding\/(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1], 10) : 0;

  // Steps managed by the persistent CreatorOnboardingShell SPA
  // We use a shared key so template does not remount / wipe the shell during step transitions
  const templateKey = currentStep >= 1 && currentStep <= 14 ? 'creator-onboarding-shell-complete' : pathname;

  return (
    <div key={templateKey} className="relative w-full h-[100dvh] max-h-[100dvh] overflow-hidden">
      {children}
    </div>
  );
}
