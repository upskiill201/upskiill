'use client';

import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { AtSign, Bell, Heart, MessageCircle, Megaphone } from 'lucide-react';
import {
  AppNotification,
  getCommentLocation,
  getNotifications,
  getPost,
  markNotificationsRead,
  timeAgo,
} from '@/lib/communityApi';
import { fetcher } from '@/lib/swr';
import styles from './NotificationBell.module.css';

const POLL_INTERVAL_MS = 60_000;
const PAGE_SIZE = 20;

/** Action phrase per notification type (backend bodies mostly match these). */
const TYPE_PHRASES: Record<string, string> = {
  REPLY: 'replied to your comment',
  COMMENT: 'commented on your post',
  MENTION: 'mentioned you',
  POST_LIKE: 'liked your post',
  COMMENT_LIKE: 'liked your comment',
  ANNOUNCEMENT: 'posted an announcement',
};

function TypeIcon({ type }: { type: string }) {
  const size = 14;
  if (type === 'ANNOUNCEMENT') return <Megaphone size={size} />;
  if (type === 'MENTION') return <AtSign size={size} />;
  if (type === 'POST_LIKE' || type === 'COMMENT_LIKE') return <Heart size={size} />;
  if (type === 'REPLY' || type === 'COMMENT') return <MessageCircle size={size} />;
  return <Bell size={size} />;
}

/**
 * Resolves a notification to its in-app URL. POST entities deep-link straight
 * to the post; COMMENT entities resolve to their parent post first. Returns
 * null when the target no longer exists or the viewer lost access.
 */
async function resolveNotificationUrl(n: AppNotification): Promise<string | null> {
  if (!n.entityId) return null;
  try {
    let postId = n.entityId;
    if (n.entityType === 'COMMENT') {
      const loc = await getCommentLocation(n.entityId);
      postId = loc.postId;
    }
    if (n.entityType !== 'POST' && n.entityType !== 'COMMENT') return null;
    const post = await getPost(postId);
    const courseId = post.community?.courseId;
    return courseId ? `/dashboard/community/${courseId}/p/${post.id}` : null;
  } catch {
    return null;
  }
}

interface NotificationBellProps {
  /** Which edge of the trigger the panel aligns to — "left" keeps it inside the left sidebar. */
  panelAlign?: 'left' | 'right';
}

export default function NotificationBell({ panelAlign = 'right' }: NotificationBellProps) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // SWR's localStorage-seeded cache (lib/swr.ts) can populate `data` with a
  // stale unread count on the very first client render, before hydration —
  // while the server always renders with none. Gating the count-dependent
  // markup behind `mounted` keeps the first client render identical to SSR;
  // the real count then swaps in a tick later, same as any client-only value.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Shared SWR key: the sidebar bell and the mobile HUD bell both mount this
  // component simultaneously (one is only CSS-hidden, not unmounted) — SWR
  // dedupes them into a single request + a single poll interval instead of
  // each running its own setInterval against the same endpoint.
  const { data, mutate: refreshUnread } = useSWR<{ unreadCount: number }>(
    '/api/notifications/unread-count',
    fetcher,
    { refreshInterval: POLL_INTERVAL_MS }
  );
  const unreadCount = mounted ? data?.unreadCount ?? 0 : 0;
  const setUnreadCount = (updater: number | ((c: number) => number)) => {
    refreshUnread(
      (current) => {
        const base = current?.unreadCount ?? 0;
        const next = typeof updater === 'function' ? updater(base) : updater;
        return { unreadCount: next };
      },
      { revalidate: false }
    );
  };

  // Close on outside click / Escape / navigation
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

  const openPanel = async () => {
    setIsOpen(true);
    setLoading(true);
    setError(null);
    try {
      const res = await getNotifications(1);
      setItems(res.items);
    } catch {
      setError('Could not load notifications.');
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = async () => {
    // Optimistic — panel stays open, count drops immediately.
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
    try {
      await markNotificationsRead();
    } catch {
      refreshUnread();
    }
  };

  const onItemClick = async (n: AppNotification) => {
    if (!n.isRead) {
      setItems((prev) => prev.map((i) => (i.id === n.id ? { ...i, isRead: true } : i)));
      setUnreadCount((c) => Math.max(0, c - 1));
      markNotificationsRead([n.id]).catch(() => refreshUnread());
    }
    setIsOpen(false);
    const url = await resolveNotificationUrl(n);
    router.push(url ?? '/dashboard/feed');
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        className={styles.bellBtn}
        onClick={() => (isOpen ? setIsOpen(false) : void openPanel())}
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

          <div className={styles.list}>
            {loading && (
              <div className={styles.emptyPanel}>Loading…</div>
            )}
            {!loading && error && (
              <div className={styles.emptyPanel}>{error}</div>
            )}
            {!loading && !error && items.length === 0 && (
              <div className={styles.emptyPanel}>
                You&apos;re all caught up! Replies, mentions and likes will show up here.
              </div>
            )}
            {!loading &&
              !error &&
              items.map((n) => (
                <button
                  key={n.id}
                  className={`${styles.item} ${!n.isRead ? styles.itemUnread : ''}`}
                  onClick={() => void onItemClick(n)}
                  type="button"
                >
                  {!n.isRead && <span className={styles.unreadDot} />}
                  <span className={styles.itemBody}>
                    <span className={styles.itemTitleLine}>
                      {n.actor?.fullName || 'Someone'}{' '}
                      <span style={{ fontWeight: 600 }}>
                        {TYPE_PHRASES[n.type] ?? n.body ?? 'sent you a notification'}
                      </span>{' '}
                      <TypeIcon type={n.type} />
                    </span>
                    {n.title && <span className={styles.itemText}>{n.title}</span>}
                    <span className={styles.itemTime}>{timeAgo(n.createdAt)}</span>
                  </span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
