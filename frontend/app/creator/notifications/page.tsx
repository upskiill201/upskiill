'use client';

import { NotificationList } from '@/components/studio/shell/StudioNotifications';
import { PageHead, studio as s } from '@/components/studio/StudioParts';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';

export default function CreatorNotificationsPage() {
  useStandaloneSound();
  return (
    <div className={s.page} style={{ maxWidth: 720 }}>
      <PageHead title="Notifications" sub="New learners, sales, questions and course reviews." />
      <div className={s.card} style={{ padding: 12 }}>
        <NotificationList pageSize={50} />
      </div>
    </div>
  );
}
