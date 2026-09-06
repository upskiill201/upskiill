'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Users, MessageSquare, Crown } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import TeyMascot from '@/components/community/TeyMascot';
import shared from '@/components/community/community.module.css';
import styles from './CommunitiesPage.module.css';
import { getMyCommunities, type MyCommunity } from '@/lib/communityApi';

export default function CommunitiesPage() {
  const [communities, setCommunities] = React.useState<MyCommunity[]>([]);
  const [state, setState] = React.useState<'loading' | 'error' | 'ready'>('loading');

  React.useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        // One call — the backend returns every community I belong to with
        // counts baked in (the old per-course overview loop paid the DB
        // round trip 4× per community, sequentially).
        const res = await getMyCommunities();
        if (!alive) return;
        setCommunities(res.communities);
        setState('ready');
      } catch {
        if (alive) setState('error');
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (state === 'loading') {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>My Communities</h1>
        {[0, 1].map((i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={shared.skeletonAvatar} />
            <div className={shared.skeletonLine} style={{ flex: 1 }} />
          </div>
        ))}
      </div>
    );
  }

  if (state === 'error' || communities.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>My Communities</h1>
        <EmptyState
          icon={<TeyMascot size={96} />}
          title="No communities yet"
          description="Enroll in a course and its community shows up here automatically."
          action={
            <Button variant="primary" onClick={() => (window.location.href = '/dashboard/explore')}>
              Explore courses
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>My Communities</h1>
      <p className={styles.sub}>Every course you take has its own space to discuss, share and celebrate.</p>

      <div className={styles.grid}>
        {communities.map((c) => (
          <Link
            key={c.id}
            href={`/dashboard/community/${c.course?.id ?? ''}`}
            className={styles.card}
          >
            <span className={styles.cardCover} />
            {c.course?.thumbnailUrl ? (
              <Image
                src={c.course.thumbnailUrl}
                alt=""
                width={60}
                height={60}
                className={styles.thumb}
              />
            ) : (
              <div className={styles.thumbFallback}>{c.name.charAt(0)}</div>
            )}
            <div className={styles.cardBody}>
              <span className={styles.kicker}>Course community</span>
              <div className={styles.cardTitle}>{c.name}</div>
              <div className={styles.cardMeta}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Users size={13} /> {c.memberCount}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <MessageSquare size={13} /> {c.totalPosts}
                </span>
                {c.isModerator && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--brand-blue)' }}>
                    <Crown size={13} /> You teach this
                  </span>
                )}
              </div>
            </div>
            <ChevronRight size={18} className={styles.cardChevron} />
          </Link>
        ))}
      </div>
    </div>
  );
}
