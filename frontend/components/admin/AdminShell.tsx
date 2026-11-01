'use client';

/**
 * Teyro HQ — the admin center's frame. A Duolingo-style menu grouped by what
 * the team is looking after (the learning side, the creator side, money,
 * care, automation), red counts where something is waiting, and a slim top
 * bar with the admin's account. On phones the menu becomes a drawer.
 *
 * Badges come from GET /admin/insights/badges (review queue, payouts to
 * review, open support, imports). The role gate lives in app/admin/layout.tsx
 * and, authoritatively, on every backend route.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type CSSProperties } from 'react';
import useSWR from 'swr';
import { Glyph, type GlyphName } from '@/components/art/Glyph';
import { TeyMark } from '@/components/brand/TeyMark';
import { adminFetcher } from './AdminUI';
import styles from './AdminShell.module.css';

import { AvatarFill } from '@/components/ui/Avatar';
interface Badges {
  review: number;
  payouts: number;
  support: number;
  importsFailed: number;
  importsRunning: number;
}

interface NavLink {
  href: string;
  label: string;
  icon: GlyphName;
  tone: string;
  badge?: (b: Badges) => number;
  /** A calmer dot (in progress, not waiting on anyone). */
  info?: (b: Badges) => number;
}

interface NavGroup {
  label: string | null;
  items: NavLink[];
}

const NAV: NavGroup[] = [
  { label: null, items: [{ href: '/admin', label: 'Overview', icon: 'gauge', tone: 'var(--color-brand)' }] },
  {
    label: 'Learning side',
    items: [
      { href: '/admin/learning', label: 'Learning', icon: 'cap', tone: 'var(--success-green)' },
      { href: '/admin/onboarding', label: 'Onboarding', icon: 'funnel', tone: 'var(--color-brand)' },
      { href: '/admin/users', label: 'Users', icon: 'users', tone: 'var(--brand-purple)' },
      { href: '/admin/reach', label: 'Reach', icon: 'bellRing', tone: 'var(--error-red)' },
      { href: '/admin/network', label: 'Network', icon: 'activity', tone: 'var(--success-green)' },
      { href: '/admin/ambassadors', label: 'Ambassadors', icon: 'userPlus', tone: 'var(--warning)' },
      { href: '/admin/photos', label: 'Photos', icon: 'camera', tone: 'var(--color-brand)' },
      { href: '/admin/subscribers', label: 'Subscribers', icon: 'card', tone: 'var(--warning)' },
    ],
  },
  {
    label: 'Creator side',
    items: [
      { href: '/admin/creators/insights', label: 'Creators at a glance', icon: 'chart', tone: 'var(--color-brand)' },
      { href: '/admin/creators', label: 'Creators', icon: 'userCheck', tone: 'var(--brand-purple)' },
      { href: '/admin/courses', label: 'Courses & review', icon: 'book', tone: 'var(--success-green)', badge: (b) => b.review },
      {
        href: '/admin/courses/import',
        label: 'Import a course',
        icon: 'folderIn',
        tone: 'var(--warning)',
        badge: (b) => b.importsFailed,
        info: (b) => b.importsRunning,
      },
    ],
  },
  {
    label: 'Money',
    items: [
      { href: '/admin/pro', label: 'Pro & payments', icon: 'crown', tone: 'var(--warning)' },
      { href: '/admin/payments', label: 'Payments', icon: 'card', tone: 'var(--success-green)' },
      { href: '/admin/payouts', label: 'Payouts', icon: 'wallet', tone: 'var(--warning)', badge: (b) => b.payouts },
      { href: '/admin/coupons', label: 'Coupons', icon: 'tag', tone: 'var(--error-red)' },
    ],
  },
  {
    label: 'Care',
    items: [{ href: '/admin/support', label: 'Support', icon: 'lifebuoy', tone: 'var(--color-brand)', badge: (b) => b.support }],
  },
  {
    label: 'Website',
    items: [{ href: '/admin/site', label: 'Homepage video', icon: 'video', tone: 'var(--brand-purple)' }],
  },
  {
    label: 'Automation',
    items: [
      { href: '/admin/rules', label: 'Tey rules', icon: 'sparkle', tone: 'var(--brand-purple)' },
      { href: '/admin/ai', label: 'AI providers', icon: 'bot', tone: 'var(--color-brand)' },
      { href: '/admin/deliveries', label: 'Deliveries', icon: 'send', tone: 'var(--success-green)' },
      { href: '/admin/queue', label: 'Queue', icon: 'clock', tone: 'var(--warning)' },
      { href: '/admin/health', label: 'Health', icon: 'activity', tone: 'var(--error-red)' },
      { href: '/admin/whatsapp', label: 'WhatsApp', icon: 'phone', tone: 'var(--success-green)' },
    ],
  },
];

const ALL = NAV.flatMap((g) => g.items);

/** The most specific link wins, so /admin/courses/import isn't also "Courses". */
function activeHref(pathname: string): string | null {
  let best: string | null = null;
  for (const item of ALL) {
    const hit = item.href === '/admin' ? pathname === '/admin' : pathname === item.href || pathname.startsWith(`${item.href}/`);
    if (hit && (!best || item.href.length > best.length)) best = item.href;
  }
  return best;
}

export function AdminShell({ children, userName }: { children: React.ReactNode; userName?: string }) {
  const pathname = usePathname() ?? '/admin';
  const [open, setOpen] = useState(false);
  const { data: badges } = useSWR<Badges>('/api/admin/insights/badges', adminFetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });
  const active = activeHref(pathname);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } finally {
      window.location.href = '/login';
    }
  };

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`} aria-label="Teyro HQ menu">
        <div className={styles.brandRow}>
          <Link href="/admin" className={styles.brand} onClick={() => setOpen(false)}>
            <TeyMark size={38} priority />
            <span className={styles.brandText}>
              <span className={styles.brandTitle}>Teyro HQ</span>
              <span className={styles.brandSub}>Run the platform</span>
            </span>
          </Link>
          <button type="button" className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close menu">
            <Glyph name="close" size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          {NAV.map((group, gi) => (
            <div key={gi} className={styles.navGroup}>
              {group.label && <span className={styles.navGroupLabel}>{group.label}</span>}
              {group.items.map((item) => {
                const count = badges && item.badge ? item.badge(badges) : 0;
                const info = badges && item.info ? item.info(badges) : 0;
                const on = active === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`${styles.navLink} ${on ? styles.navLinkActive : ''}`}
                    style={{ '--tone': item.tone } as CSSProperties}
                    aria-current={on ? 'page' : undefined}
                  >
                    <span className={styles.navIcon} aria-hidden="true">
                      <Glyph name={item.icon} size={18} strokeWidth={2.4} />
                    </span>
                    <span className={styles.navLabel}>{item.label}</span>
                    {count > 0 ? (
                      <span className={styles.navCount} aria-label={`${count} waiting`}>
                        {count > 99 ? '99+' : count}
                      </span>
                    ) : info > 0 ? (
                      <span className={styles.navInfo} aria-label={`${info} running`}>
                        {info}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {open && <div className={styles.scrim} onClick={() => setOpen(false)} aria-hidden="true" />}

      <div className={styles.mainCol}>
        <header className={styles.topbar}>
          <button type="button" className={styles.menuBtn} onClick={() => setOpen(true)} aria-label="Open menu">
            <Glyph name="menu" size={20} />
          </button>
          <Link href="/admin" className={styles.topBrand}>
            <TeyMark size={30} />
            <strong>Teyro HQ</strong>
          </Link>
          <div className={styles.topRight}>
            <Link href="/dashboard" className={styles.topLink} target="_blank">
              <Glyph name="external" size={15} strokeWidth={2.6} /> Learner app
            </Link>
            <Link href="/creator" className={styles.topLink} target="_blank">
              <Glyph name="external" size={15} strokeWidth={2.6} /> Creator studio
            </Link>
            <span className={styles.account}>
              <span className={styles.avatar} aria-hidden="true">
                <AvatarFill name={userName ?? 'Admin'} />
              </span>
              <span className={styles.accountName}>{userName ?? 'Admin'}</span>
            </span>
            <button type="button" className={styles.logout} onClick={() => void logout()} aria-label="Log out">
              <Glyph name="logout" size={17} strokeWidth={2.6} />
            </button>
          </div>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
