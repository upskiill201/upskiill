'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, BellOff } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import {
  AppNotification,
  markNotificationsRead,
  timeAgo,
} from '@/lib/communityApi';
import {
  groupFor,
  isActorPhrased,
  phraseFor,
  secondaryLine,
  typeChipKey,
  typeIcon,
  type NotificationGroup,
} from '@/lib/notificationCopy';
import { fetcher } from '@/lib/swr';
import shared from './community.module.css';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import styles from './NotificationBell.module.css';

const POLL_INTERVAL_MS = 30_000;
const listKey = (unreadOnly: boolean) => `/api/notifications?scope=learner&page=1${unreadOnly ? '&unreadOnly=true' : ''}`;
const GROUP_ORDER: NotificationGroup[] = ['Today', 'This week', 'Earlier'];

interface NotificationBellProps {
  /** Which edge of the trigger the panel aligns to — "left" keeps it inside the left sidebar. */
  panelAlign?: 'left' | 'right';
}

export default function NotificationBell({ panelAlign = 'right' }: NotificationBellProps) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const reducedMotion = useReducedMotion();
  const bell = useAnimationControls();

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
    '/api/notifications/unread-count?scope=learner',
    fetcher,
    { refreshInterval: POLL_INTERVAL_MS, revalidateOnFocus: true },
  );
  const unreadCount = mounted ? (data?.unreadCount ?? 0) : 0;

  // The list is cached too, so the panel opens instantly on what's already
  // known and refreshes underneath — it used to show a skeleton every time.
  const list = useSWR<{ total: number; items: AppNotification[] }>(listKey(filter === 'unread'), fetcher, {
    revalidateOnFocus: false,
  });
  const items = useMemo(() => list.data?.items ?? [], [list.data]);
  const loading = !list.data && !list.error;
  const error = list.error && !list.data ? 'Could not load notifications.' : null;
  const setItems = (update: (prev: AppNotification[]) => AppNotification[]) =>
    void list.mutate((cur) => (cur ? { ...cur, items: update(cur.items) } : cur), { revalidate: false });

  // Something new arrived: the bell rings (a shake and a chime) and the list
  // quietly refreshes, so opening it shows the new row straight away.
  const lastCount = useRef<number | null>(null);
  useEffect(() => {
    if (!mounted || data?.unreadCount === undefined) return;
    const prev = lastCount.current;
    lastCount.current = data.unreadCount;
    if (prev === null || data.unreadCount <= prev) return;
    playSound('noticeGood');
    playHaptic('light', false);
    void list.mutate();
    if (!reducedMotion) void bell.start({ rotate: [0, -16, 14, -10, 8, -4, 0], transition: { duration: 0.7 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- react to the count only
  }, [mounted, data?.unreadCount]);
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

  const openPanel = () => {
    playSound('menuOpen');
    playHaptic('light', false);
    setIsOpen(true);
    void list.mutate();
  };

  const closePanel = () => {
    playSound('menuClose');
    setIsOpen(false);
  };

  const switchFilter = (next: 'all' | 'unread') => {
    if (next === filter) return;
    playSound('navTap', next === 'all' ? 1 : 2);
    setFilter(next);
  };

  const markAllRead = async () => {
    playSound('toggleOn');
    playHaptic('light', false);
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
    playSound('navTap', 3);
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
        onClick={() => (isOpen ? closePanel() : openPanel())}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        aria-expanded={isOpen}
        type="button"
      >
        <motion.span animate={bell} style={{ display: 'inline-flex', transformOrigin: '50% 10%' }}>
          <Bell size={20} strokeWidth={2.5} />
        </motion.span>
        {unreadCount > 0 && (
          <motion.span
            key={unreadCount}
            className={styles.badgeCount}
            initial={reducedMotion ? false : { scale: 0.4 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 700, damping: 14 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
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
            onClick={() => {
              playSound('navTap', 4);
              setIsOpen(false);
            }}
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
        {secondaryLine(n) && <span className={styles.itemText}>{secondaryLine(n)}</span>}
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
