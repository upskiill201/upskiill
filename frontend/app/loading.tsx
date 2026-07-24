import React from 'react';
import TeyroBrandedLoader from '../components/ui/TeyroBrandedLoader';

/**
 * Next.js App Router Global Loading Fallback
 * Automatically displays Pattern A Full-Screen Branded Loader during page transitions.
 */
export default function GlobalLoading() {
  return <TeyroBrandedLoader isVisible={true} />;
}
