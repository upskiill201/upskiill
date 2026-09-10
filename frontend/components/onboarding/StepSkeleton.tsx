'use client';

import React from 'react';
import TeyroBrandedLoader from '@/components/ui/TeyroBrandedLoader';

/**
 * StepSkeleton
 *
 * Renders Teyro's Branded Loader while useOnboardingSession restores state.
 */
export function StepSkeleton() {
  return <TeyroBrandedLoader isVisible={true} fullScreen={true} />;
}
