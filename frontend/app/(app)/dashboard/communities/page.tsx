'use client';

/**
 * My communities — Skool's "your groups" grid. One cached request
 * (/api/community/my), so the grid paints instantly on return.
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { AlertCircle, Crown, MessagesSquare, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import TeyMascot from '@/components/community/TeyMascot';
import { formatCount } from '@/components/community/CommunityRail';
import shared from '@/components/community/community.module.css';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import type { MyCommunity } from '@/lib/communityApi';
import styles from './CommunitiesPage.module.css';

export default function CommunitiesPage() {
  const { data, error, mutate } = useSWR<{ communities: MyCommunity[] }>('/api/community/my', fetcher, { revalidateOnFocus: false });
  const communities = data?.communities ?? [];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>My communities</h1>
        <p className={styles.sub}>Every course you take has its own group to ask, share and celebrate in.</p>
      </header>

      {error && !data ? (
        <div className={shared.errorBanner}>
          <AlertCircle size={28} />
          <span>Could not load your communities.</span>
          <Button variant="outline" onClick={() => void mutate()}>
            Try again
          </Button>
        </div>
      ) : !data ? (
        <div className={styles.grid} aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`${styles.card} ${styles.skeleton}`} />
          ))}
        </div>
      ) : communities.length === 0 ? (
        <EmptyState
          icon={<TeyMascot size={96} />}
          title="No communities yet"
          description="Start a course and you'll join its community after your second lesson."
          action={
            <Button variant="primary" onClick={() => (window.location.href = '/dashboard/explore')}>
              Explore courses
            </Button>
          }
        />
      ) : (
        <div className={styles.grid}>
          {communities.map((c) => (
            <Link
              key={c.id}
              href={`/dashboard/community/${c.course?.id ?? ''}`}
              className={styles.card}
              onClick={() => playSound('navTap', 2)}
            >
              <div className={styles.cover}>
                {c.course?.thumbnailUrl ? (
                  <Image src={c.course.thumbnailUrl} alt="" fill sizes="360px" className={styles.coverImg} />
                ) : (
                  <Image src="/art/ui/community.svg" alt="" width={72} height={72} />
                )}
              </div>
              <div className={styles.body}>
                <h2 className={styles.name}>{c.name}</h2>
                <p className={styles.meta}>
                  <span>
                    <Users size={14} strokeWidth={2.5} /> {formatCount(c.memberCount)}
                  </span>
                  <span>
                    <MessagesSquare size={14} strokeWidth={2.5} /> {formatCount(c.totalPosts)} posts
                  </span>
                  {c.isModerator && (
                    <span className={styles.teach}>
                      <Crown size={14} strokeWidth={2.5} /> You teach
                    </span>
                  )}
                </p>
                <span className={styles.open}>Open</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
