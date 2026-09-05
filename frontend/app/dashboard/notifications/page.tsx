'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, BellOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { NotificationRow } from '@/components/community/NotificationBell';
import {
  getNotifications,
  markNotificationsRead,
  type AppNotification,
} from '@/lib/communityApi';
import shared from '@/components/community/community.module.css';
import styles from './NotificationsPage.module.css';

/**
 * The full notification inbox. Rows are the exact component the bell panel
 * renders — the dropdown is a preview of this page, not a second design.
 */
export default function NotificationsPage() {
  const router = useRouter();
  const [items, setItems] = React.useState<AppNotification[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState<'all' | 'unread'>('all');
  const [state, setState] = React.useState<'loading' | 'error' | 'ready'>('loading');
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const load = React.useCallback(
    async (p: number, replace: boolean, unreadOnly: boolean) => {
      if (replace) setState('loading');
      else setLoadingMore(true);
      try {
        const res = await getNotifications(p, unreadOnly);
        setTotal(res.total);
        setPage(p);
        setItems((prev) => (replace ? res.items : [...prev, ...res.items]));
        setState('ready');
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'Could not load notifications.');
        if (replace) setState('error');
      } finally {
        setLoadingMore(false);
      }
    },
    [],
  );

  React.useEffect(() => {
    void load(1, true, filter === 'unread');
  }, [load, filter]);

  const unreadCount = items.filter((n) => !n.isRead).length;

  const markAllRead = async () => {
    setItems((prev) => (filter === 'unread' ? [] : prev.map((n) => ({ ...n, isRead: true }))));
    try {
      await markNotificationsRead();
    } catch {
      void load(1, true, filter === 'unread');
    }
  };

  const openRow = (n: AppNotification) => {
    if (!n.isRead) {
      setItems((prev) => prev.map((i) => (i.id === n.id ? { ...i, isRead: true } : i)));
      markNotificationsRead([n.id]).catch(() => undefined);
    }
    // Destination is resolved server-side; a row whose target was deleted has
    // no url and simply stays put rather than bouncing to a dead link.
    if (n.url ?? n.deepLink) router.push((n.url ?? n.deepLink) as string);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Notifications</h1>
          <p className={styles.subtitle}>
            Replies, mentions, likes and announcements from your communities.
          </p>
        </div>
        <button
          className={styles.markAllBtn}
          onClick={markAllRead}
          disabled={unreadCount === 0}
          type="button"
        >
          Mark all read
        </button>
      </header>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${filter === 'all' ? styles.tabActive : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className={`${styles.tab} ${filter === 'unread' ? styles.tabActive : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
      </div>

      {state === 'error' && (
        <div className={shared.errorBanner}>
          <AlertCircle size={26} />
          <span>{errorMsg}</span>
          <Button variant="outline" onClick={() => void load(1, true, filter === 'unread')}>
            Try again
          </Button>
        </div>
      )}

      {state === 'loading' && (
        <div className={styles.listCard}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={styles.skeletonRow}>
              <div className={shared.skeletonAvatar} style={{ width: 36, height: 36 }} />
              <div style={{ flex: 1 }}>
                <div className={shared.skeletonLine} style={{ width: '75%' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {state === 'ready' && items.length === 0 && (
        <EmptyState
          icon={<BellOff size={40} />}
          title={filter === 'unread' ? 'Nothing unread' : 'No notifications yet'}
          description={
            filter === 'unread'
              ? "You're all caught up."
              : 'Post something in a course community and the replies will land here.'
          }
        />
      )}

      {state === 'ready' && items.length > 0 && (
        <div className={styles.listCard}>
          {items.map((n) => (
            <NotificationRow key={n.id} n={n} onClick={() => openRow(n)} />
          ))}
          {items.length < total && (
            <button
              className={styles.loadMoreBtn}
              disabled={loadingMore}
              onClick={() => void load(page + 1, false, filter === 'unread')}
              type="button"
            >
              {loadingMore ? 'Loading…' : 'Load older notifications'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
