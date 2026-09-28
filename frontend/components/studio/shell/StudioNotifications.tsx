'use client';

/**
 * The studio's notifications: the bell in the header (with its panel) and
 * the list the full /creator/notifications page reuses. Reads only studio
 * rows (scope=creator) — learner notices stay in the learner app's bell.
 */

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AtSign,
  BadgeCheck,
  Bell,
  CheckCheck,
  CircleDollarSign,
  FilePen,
  Heart,
  LifeBuoy,
  MessageCircle,
  MessageCircleQuestion,
  Send,
  Trophy,
  UserPlus,
  Wallet,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { playSound } from '@/lib/audio/lessonSounds';
import {
  ago,
  markStudioRead,
  studioFetch,
  studioKeys,
  type NotificationPage,
  type StudioNotification,
} from '@/lib/creator/studio';
import { EmptyCard, ErrorCard, PersonAvatar, Segmented, Skel } from '../StudioParts';
import { useHydrated } from '../useHydrated';
import sh from './shell.module.css';

/* ── what each kind looks like ────────────────────────────────────────── */

interface Kind {
  icon: LucideIcon;
  tone: string;
  /** Community rows keep the excerpt in `title` and the verb in `body`. */
  community?: boolean;
}

const KINDS: Record<string, Kind> = {
  STUDIO_NEW_LEARNERS: { icon: UserPlus, tone: 'var(--color-brand)' },
  STUDIO_SALE: { icon: CircleDollarSign, tone: 'var(--success-green)' },
  STUDIO_COURSE_FINISHED: { icon: Trophy, tone: 'var(--brand-purple)' },
  STUDIO_QUESTION: { icon: MessageCircleQuestion, tone: 'var(--warning)' },
  STUDIO_PAYOUT: { icon: Wallet, tone: 'var(--success-green)' },
  STUDIO_SUPPORT_REPLY: { icon: LifeBuoy, tone: 'var(--color-brand)' },
  STUDIO_COMMENT: { icon: MessageCircle, tone: 'var(--color-brand)', community: true },
  STUDIO_REPLY: { icon: MessageCircle, tone: 'var(--color-brand)', community: true },
  STUDIO_MENTION: { icon: AtSign, tone: 'var(--color-brand)', community: true },
  STUDIO_POST_LIKE: { icon: Heart, tone: 'var(--error-red)', community: true },
  STUDIO_COMMENT_LIKE: { icon: Heart, tone: 'var(--error-red)', community: true },
  COURSE_SUBMITTED_FOR_REVIEW: { icon: Send, tone: 'var(--brand-purple)' },
  COURSE_APPROVED: { icon: BadgeCheck, tone: 'var(--success-green)' },
  COURSE_CHANGES_REQUIRED: { icon: FilePen, tone: 'var(--warning)' },
  COURSE_REJECTED: { icon: XCircle, tone: 'var(--error-red)' },
};
const FALLBACK: Kind = { icon: Bell, tone: 'var(--color-brand)' };

function copyOf(n: StudioNotification) {
  const kind = KINDS[n.type] ?? FALLBACK;
  if (kind.community) {
    const who = n.actor?.fullName?.split(' ')[0] ?? 'Someone';
    return { kind, headline: `${who} ${n.body ?? 'interacted with your post'}`, detail: n.title ? `“${n.title}”` : null };
  }
  return { kind, headline: n.title ?? 'Update', detail: n.body };
}

function groupOf(iso: string): 'Today' | 'This week' | 'Earlier' {
  const d = new Date(iso);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return 'Today';
  if (now.getTime() - d.getTime() < 7 * 86_400_000) return 'This week';
  return 'Earlier';
}

/* ── one row ──────────────────────────────────────────────────────────── */

function Row({ n, onOpen }: { n: StudioNotification; onOpen: (n: StudioNotification) => void }) {
  const { kind, headline, detail } = copyOf(n);
  const Icon = kind.icon;
  const href = n.url ?? n.deepLink;
  return (
    <li>
      <button
        type="button"
        className={`${sh.nRow} ${n.isRead ? '' : sh.nUnread}`}
        onClick={() => onOpen(n)}
        disabled={!href && n.isRead}
        style={{ '--tone': kind.tone } as CSSProperties}
      >
        <span className={sh.nIconWrap}>
          {n.actor ? (
            <>
              <PersonAvatar face={n.actor} size={44} />
              <span className={sh.nIconBadge} aria-hidden="true">
                <Icon size={12} strokeWidth={2.6} />
              </span>
            </>
          ) : (
            <span className={sh.nIcon} aria-hidden="true">
              <Icon size={20} strokeWidth={2.4} />
            </span>
          )}
        </span>
        <span className={sh.nText}>
          <span className={sh.nHeadline}>{headline}</span>
          {detail && <span className={sh.nDetail}>{detail}</span>}
          <span className={sh.nTime}>{ago(n.createdAt)}</span>
        </span>
        {!n.isRead && <span className={sh.nDot} aria-label="Unread" />}
      </button>
    </li>
  );
}

/* ── the list (panel + page) ──────────────────────────────────────────── */

export function NotificationList({
  pageSize = 20,
  onNavigate,
  compact = false,
}: {
  pageSize?: number;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const router = useRouter();
  const { mutate: globalMutate } = useSWRConfig();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const key = studioKeys.notifications(filter === 'unread', pageSize);
  const { data, error, isLoading, mutate } = useSWR<NotificationPage>(key, studioFetch, { refreshInterval: 60_000 });
  const unread = useSWR<{ unreadCount: number }>(studioKeys.unread, studioFetch);
  const hydrated = useHydrated();
  const unreadCount = hydrated ? (unread.data?.unreadCount ?? 0) : 0;

  const refresh = () => {
    void globalMutate((k) => typeof k === 'string' && k.startsWith('/api/notifications'));
  };

  const open = (n: StudioNotification) => {
    const href = n.url ?? n.deepLink;
    if (!n.isRead) {
      void mutate(
        (page) => page && { ...page, items: page.items.map((x) => (x.id === n.id ? { ...x, isRead: true } : x)) },
        { revalidate: false },
      );
      void unread.mutate((u) => u && { unreadCount: Math.max(0, u.unreadCount - 1) }, { revalidate: false });
      markStudioRead([n.id]).catch(refresh);
    }
    if (href) {
      playSound('navTap', 1);
      onNavigate?.();
      router.push(href);
    }
  };

  const markAll = async () => {
    playSound('toggleOn');
    void mutate((page) => page && { ...page, items: page.items.map((x) => ({ ...x, isRead: true })) }, { revalidate: false });
    void unread.mutate({ unreadCount: 0 }, { revalidate: false });
    try {
      await markStudioRead();
    } finally {
      refresh();
    }
  };

  const items = data?.items ?? [];
  const groups: { label: string; items: StudioNotification[] }[] = [];
  for (const n of items) {
    const label = groupOf(n.createdAt);
    const g = groups[groups.length - 1];
    if (g?.label === label) g.items.push(n);
    else groups.push({ label, items: [n] });
  }

  return (
    <div className={sh.nList}>
      <div className={sh.nTools}>
        <Segmented
          label="Show"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'All' },
            { value: 'unread', label: unreadCount > 0 ? `Unread · ${unreadCount > 99 ? '99+' : unreadCount}` : 'Unread' },
          ]}
        />
        {unreadCount > 0 && (
          <button type="button" className={sh.nMarkAll} onClick={markAll}>
            <CheckCheck size={16} aria-hidden="true" /> Mark all read
          </button>
        )}
      </div>

      {hydrated && error && !data ? (
        <ErrorCard message="Your notifications didn’t load." onRetry={() => void mutate()} />
      ) : !hydrated || (isLoading && !data) ? (
        <div className={sh.nSkels} aria-busy="true">
          {Array.from({ length: compact ? 4 : 6 }, (_, i) => (
            <div key={i} className={sh.nSkelRow}>
              <Skel h={44} w={44} r={999} />
              <div style={{ flex: 1, display: 'grid', gap: 6 }}>
                <Skel h={14} w="70%" r={6} />
                <Skel h={12} w="45%" r={6} />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyCard pose={filter === 'unread' ? 'cheering' : 'searching'} title={filter === 'unread' ? 'All caught up!' : 'Nothing yet'}>
          {filter === 'unread'
            ? 'You’ve seen everything. New learners, sales and questions show up here.'
            : 'When learners join, finish your course, buy it or ask a question, you’ll hear about it here.'}
        </EmptyCard>
      ) : (
        groups.map((g) => (
          <section key={g.label} className={sh.nGroup} aria-label={g.label}>
            <h3 className={sh.nGroupLabel}>{g.label}</h3>
            <ul className={sh.nUl}>
              {g.items.map((n) => (
                <Row key={n.id} n={n} onOpen={open} />
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

/* ── the bell ─────────────────────────────────────────────────────────── */

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { data } = useSWR<{ unreadCount: number }>(studioKeys.unread, studioFetch, {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
  });
  const hydrated = useHydrated();
  const count = hydrated ? (data?.unreadCount ?? 0) : 0;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={sh.bellWrap} ref={wrapRef}>
      <button
        type="button"
        className={`${sh.headerIconBtn} ${open ? sh.headerIconBtnOn : ''}`}
        aria-label={count > 0 ? `Notifications, ${count} unread` : 'Notifications'}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => {
          playSound(open ? 'menuClose' : 'menuOpen');
          setOpen((o) => !o);
        }}
      >
        <Bell size={20} strokeWidth={2.4} />
        {count > 0 && <span className={sh.bellCount}>{count > 99 ? '99+' : count}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={sh.panel}
            role="dialog"
            aria-label="Notifications"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            <div className={sh.panelHead}>
              <h2 className={sh.panelTitle}>Notifications</h2>
            </div>
            <div className={sh.panelBody}>
              <NotificationList compact pageSize={15} onNavigate={() => setOpen(false)} />
            </div>
            <Link href="/creator/notifications" className={sh.panelFoot} onClick={() => setOpen(false)}>
              See all notifications
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
