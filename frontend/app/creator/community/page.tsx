import { Suspense } from 'react';
import { CommunityAdmin } from '@/components/studio/community/CommunityAdmin';

export default function CreatorCommunityPage() {
  return (
    <Suspense>
      <CommunityAdmin />
    </Suspense>
  );
}
