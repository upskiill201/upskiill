'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, BellOff } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import {
  AppNotification,
  getNotifications,
  markNotificationsRead,
  timeAgo,
} from '@/lib/communityApi';
import {
  groupFor,
  isActorPhrased,
  phraseFor,
  typeChipKey,
  typeIcon,
  type NotificationGroup,
} from '@/lib/notificationCopy';
import { fetcher } from '@/lib/swr';
import shared from './community.module.css';
import styles from './NotificationBell.module.css';

const POLL_INTERVAL_MS = 60_000;
const GROUP_ORDER: NotificationGroup[] = ['Today', 'This week', 'Earlier'];

interface NotificationBellProps {
  /** Which edge of the trigger the panel aligns to — "left" keeps it inside the left sidebar. */
  panelAlign?: 'left' | 'right';
}

export default function NotificationBell({ panelAlign = 'right' }: NotificationBellProps) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<AppNotification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // SWR's localStorage-seeded cache (lib/swr.ts) can populate `data` with a
  // stale unread count on the very first client render, before hydration —
  // while the server always renders with none. Gating the count-dependent
  // markup behind `mounted` keeps the first client render identical to SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Shared SWR key: the sidebar bell and the mobile HUD bell both mount this
  // component simultaneously (one is only CSS-hidden, not unmounted) — SWR
  // dedupes them into a single request + a single poll interval.
  const { data, mutate: refreshUnread } = useSWR<{ unreadCount: number }>(
    '/api/notifications/unread-count',
    fetcher,
    { refreshInterval: POLL_INTERVAL_MS },
  );
  const unreadCount = mounted ? (data?.unreadCount ?? 0) : 0;
  const setUnreadCount = (updater: number | ((c: number) => number)) => {
    refreshUnread(
      (current) => {
        const base = current?.unreadCount ?? 0;
        const next = typeof updater === 'function' ? updater(base) : updater;
        return { unreadCount: next };
      },
      { revalidate: false },
    );
  };

  // Close on outside click / Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const load = async (unreadOnly: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getNotifications(1, unreadOnly);
      setItems(res.items);
    } catch {
      setError('Could not load notifications.');
    } finally {
      setLoading(false);
    }
  };

  const openPanel = () => {
    setIsOpen(true);
    void load(filter === 'unread');
  };

  const switchFilter = (next: 'all' | 'unread') => {
    if (next === filter) return;
    setFilter(next);
    void load(next === 'unread');
  };

  const markAllRead = async () => {
    // Optimistic — panel stays open, count drops immediately.
    setItems((prev) =>
      filter === 'unread' ? [] : prev.map((n) => ({ ...n, isRead: true })),
    );
    setUnreadCount(0);
    try {
      await markNotificationsRead();
    } catch {
      void refreshUnread();
    }
  };

  const onItemClick = (n: AppNotification) => {
    if (!n.isRead) {
      setItems((prev) => prev.map((i) => (i.id === n.id ? { ...i, isRead: true } : i)));
      setUnreadCount((c) => Math.max(0, c - 1));
      markNotificationsRead([n.id]).catch(() => refreshUnread());
    }
    setIsOpen(false);
    // The server resolves the destination when the list is built, so a tap is
    // a navigation rather than two more API calls followed by a navigation.
    router.push(n.url ?? n.deepLink ?? '/dashboard/notifications');
  };

  const grouped = useMemo(() => groupNotifications(items), [items]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        className={styles.bellBtn}
        onClick={() => (isOpen ? setIsOpen(false) : openPanel())}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        aria-expanded={isOpen}
        type="button"
      >
        <Bell size={19} />
        {unreadCount > 0 && (
          <span className={styles.badgeCount}>{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div
          className={`${styles.panel} ${panelAlign === 'left' ? styles.panelLeft : ''}`}
          role="dialog"
          aria-label="Notifications"
        >
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Notifications</span>
            {unreadCount > 0 && (
              <button className={styles.markAllBtn} onClick={markAllRead} type="button">
                Mark all read
              </button>
            )}
          </div>

          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${filter === 'all' ? styles.tabActive : ''}`}
              onClick={() => switchFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`${styles.tab} ${filter === 'unread' ? styles.tabActive : ''}`}
              onClick={() => switchFilter('unread')}
            >
              Unread{unreadCount > 0 ? ` · ${unreadCount}` : ''}
            </button>
          </div>

          <div className={styles.list}>
            {loading && (
              <>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={styles.skeletonRow}>
                    <div className={shared.skeletonAvatar} style={{ width: 36, height: 36 }} />
                    <div style={{ flex: 1 }}>
                      <div className={shared.skeletonLine} style={{ width: '80%' }} />
                    </div>
                  </div>
                ))}
              </>
            )}

            {!loading && error && <div className={styles.emptyPanel}>{error}</div>}

            {!loading && !error && items.length === 0 && (
              <div className={styles.emptyPanel}>
                <span className={styles.emptyIcon}>
                  <BellOff size={20} />
                </span>
                {filter === 'unread'
                  ? "Nothing unread. You're all caught up."
                  : 'Replies, mentions and likes on your posts will show up here.'}
              </div>
            )}

            {!loading &&
              !error &&
              GROUP_ORDER.map((label) => {
                const rows = grouped.get(label);
                if (!rows || rows.length === 0) return null;
                return (
                  <React.Fragment key={label}>
                    <div className={styles.groupLabel}>{label}</div>
                    {rows.map((n) => (
                      <NotificationRow key={n.id} n={n} onClick={() => onItemClick(n)} />
                    ))}
                  </React.Fragment>
                );
              })}
          </div>

          <Link
            href="/dashboard/notifications"
            className={styles.panelFooter}
            onClick={() => setIsOpen(false)}
          >
            See all notifications
          </Link>
        </div>
      )}
    </div>
  );
}

/** One inbox row — shared by the bell panel and the full inbox page. */
export function NotificationRow({
  n,
  onClick,
}: {
  n: AppNotification;
  onClick: () => void;
}) {
  const actorPhrased = isActorPhrased(n.type);
  return (
    <button
      className={`${styles.item} ${!n.isRead ? styles.itemUnread : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className={styles.avatarWrap}>
        <Avatar
          src={n.actor?.avatarUrl ?? undefined}
          name={n.actor?.fullName ?? 'Teyro'}
          size="sm"
        />
        <span className={`${styles.typeChip} ${styles[typeChipKey(n.type)]}`}>
          {typeIcon(n.type)}
        </span>
      </span>

      <span className={styles.itemBody}>
        <span className={styles.itemTitleLine}>
          {actorPhrased && (
            <span className={styles.itemActor}>{n.actor?.fullName || 'Someone'} </span>
          )}
          {phraseFor(n)}
        </span>
        {n.title && <span className={styles.itemText}>{n.title}</span>}
        <span className={styles.itemTime}>{timeAgo(n.createdAt)}</span>
      </span>

      {!n.isRead && <span className={styles.unreadDot} />}
    </button>
  );
}

function groupNotifications(items: AppNotification[]) {
  const map = new Map<NotificationGroup, AppNotification[]>();
  for (const n of items) {
    const key = groupFor(n.createdAt);
    const list = map.get(key);
    if (list) list.push(n);
    else map.set(key, [n]);
  }
  return map;
}
