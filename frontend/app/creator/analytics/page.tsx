import { Suspense } from 'react';
import { AnalyticsHub } from '@/components/studio/analytics/AnalyticsHub';

export default function CreatorAnalyticsPage() {
  return (
    <Suspense>
      <AnalyticsHub />
    </Suspense>
  );
}
