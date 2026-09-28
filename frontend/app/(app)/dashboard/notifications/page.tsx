'use client';

/**
 * The notifications inbox. Shares the bell's SWR cache (same keys), so it
 * opens instantly with what the bell already knows, then refreshes. Grouped
 * Today / This week / Earlier like the bell; every tap has a sound.
 */

import React from 'react';
import Image from 'next/image';
import useSWR, { mutate as globalMutate } from 'swr';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCheck } from 'lucide-react';
import Button from '@/components/ui/Button';
import { NotificationRow } from '@/components/community/NotificationBell';
import { getNotifications, markNotificationsRead, type AppNotification } from '@/lib/communityApi';
import { groupFor, type NotificationGroup } from '@/lib/notificationCopy';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import shared from '@/components/community/community.module.css';
import styles from './NotificationsPage.module.css';

const GROUPS: NotificationGroup[] = ['Today', 'This week', 'Earlier'];
const listKey = (unreadOnly: boolean) => `/api/notifications?scope=learner&page=1${unreadOnly ? '&unreadOnly=true' : ''}`;

export default function NotificationsPage() {
  const router = useRouter();
  const [filter, setFilter] = React.useState<'all' | 'unread'>('all');
  const list = useSWR<{ total: number; items: AppNotification[] }>(listKey(filter === 'unread'), fetcher, {
    revalidateOnFocus: true,
  });
  const unread = useSWR<{ unreadCount: number }>('/api/notifications/unread-count?scope=learner', fetcher);
  const [more, setMore] = React.useState<{ filter: string; items: AppNotification[]; page: number }>({ filter: 'all', items: [], page: 1 });
  const [loadingMore, setLoadingMore] = React.useState(false);

  const extra = more.filter === filter ? more.items : [];
  const items = [...(list.data?.items ?? []), ...extra];
  const total = list.data?.total ?? 0;
  const unreadCount = unread.data?.unreadCount ?? 0;

  const grouped = new Map<NotificationGroup, AppNotification[]>();
  for (const n of items) {
    const g = groupFor(n.createdAt);
    grouped.set(g, [...(grouped.get(g) ?? []), n]);
  }

  const pick = (f: 'all' | 'unread') => {
    if (f === filter) return;
    playSound('navTap', f === 'all' ? 1 : 2);
    playHaptic('selection', false);
    setFilter(f);
  };

  const markAllRead = async () => {
    playSound('toggleOn');
    playHaptic('light', false);
    void list.mutate((cur) => (cur ? { ...cur, items: filter === 'unread' ? [] : cur.items.map((n) => ({ ...n, isRead: true })) } : cur), {
      revalidate: false,
    });
    void unread.mutate({ unreadCount: 0 }, { revalidate: false });
    try {
      await markNotificationsRead();
    } finally {
      void globalMutate((k) => typeof k === 'string' && k.startsWith('/api/notifications'));
    }
  };

  const open = (n: AppNotification) => {
    playSound('navTap', 3);
    if (!n.isRead) {
      void list.mutate((cur) => (cur ? { ...cur, items: cur.items.map((i) => (i.id === n.id ? { ...i, isRead: true } : i)) } : cur), {
        revalidate: false,
      });
      void unread.mutate({ unreadCount: Math.max(0, unreadCount - 1) }, { revalidate: false });
      markNotificationsRead([n.id]).catch(() => undefined);
    }
    // Destination is resolved server-side; a row whose target was deleted has
    // no url and simply stays put rather than bouncing to a dead link.
    if (n.url ?? n.deepLink) router.push((n.url ?? n.deepLink) as string);
  };

  const loadMore = async () => {
    setLoadingMore(true);
    playSound('navTap', 4);
    try {
      const next = (more.filter === filter ? more.page : 1) + 1;
      const res = await getNotifications(next, filter === 'unread');
      setMore((m) => ({ filter, items: [...(m.filter === filter ? m.items : []), ...res.items], page: next }));
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Notifications</h1>
          <p className={styles.subtitle}>Replies, mentions, likes, friends and announcements.</p>
        </div>
        <button className={styles.markAllBtn} onClick={() => void markAllRead()} disabled={unreadCount === 0} type="button">
          <CheckCheck size={16} strokeWidth={2.75} /> Mark all read
        </button>
      </header>

      <div className={styles.tabs} role="tablist">
        <button type="button" role="tab" aria-selected={filter === 'all'} className={`${styles.tab} ${filter === 'all' ? styles.tabActive : ''}`} onClick={() => pick('all')}>
          All
        </button>
        <button type="button" role="tab" aria-selected={filter === 'unread'} className={`${styles.tab} ${filter === 'unread' ? styles.tabActive : ''}`} onClick={() => pick('unread')}>
          Unread{unreadCount > 0 ? ` · ${unreadCount}` : ''}
        </button>
      </div>

      {list.error && !list.data ? (
        <div className={shared.errorBanner}>
          <AlertCircle size={26} />
          <span>Could not load notifications.</span>
          <Button variant="outline" onClick={() => void list.mutate()}>
            Try again
          </Button>
        </div>
      ) : !list.data ? (
        <div className={styles.listCard} aria-busy="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.skeletonRow}>
              <div className={shared.skeletonAvatar} style={{ width: 40, height: 40 }} />
              <div style={{ flex: 1 }}>
                <div className={shared.skeletonLine} style={{ width: '75%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className={styles.empty}>
          <Image src="/art/ui/community.svg" alt="" width={96} height={96} />
          <h2 className={styles.emptyTitle}>{filter === 'unread' ? "You're all caught up" : 'Nothing yet'}</h2>
          <p className={styles.emptySub}>
            {filter === 'unread'
              ? 'No unread notifications.'
              : 'When someone likes, replies to or mentions you, or a friend joins with your invite, it shows up here.'}
          </p>
        </div>
      ) : (
        <>
          {GROUPS.map((g) => {
            const rows = grouped.get(g);
            if (!rows?.length) return null;
            return (
              <section key={g} className={styles.group}>
                <h2 className={styles.groupLabel}>{g}</h2>
                <div className={styles.listCard}>
                  {rows.map((n) => (
                    <NotificationRow key={n.id} n={n} onClick={() => open(n)} />
                  ))}
                </div>
              </section>
            );
          })}
          {items.length < total && (
            <button className={styles.loadMoreBtn} onClick={() => void loadMore()} disabled={loadingMore}>
              {loadingMore ? 'Loading…' : 'Show older'}
            </button>
          )}
        </>
      )}
    </div>
  );
}
