import { Suspense } from 'react';
import { LearnersHub } from '@/components/studio/learners/LearnersHub';

export default function CreatorLearnersPage() {
  return (
    <Suspense>
      <LearnersHub />
    </Suspense>
  );
}
