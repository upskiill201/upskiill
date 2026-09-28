'use client';

/**
 * The creator studio's frame: a Duolingo-style menu (grouped Build / Grow /
 * Earn, chunky rows, red dots where something waits), a header that names the
 * page you're on with the bell and your account, and on phones a bottom tab
 * bar with a More sheet. Pages render inside; full-screen tools (wizard,
 * lesson builder, auth, onboarding) opt out in app/creator/layout.tsx.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import useSWR from 'swr';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  BarChart3,
  BookMarked,
  Bell,
  BookOpen,
  ChevronDown,
  ExternalLink,
  Home,
  LifeBuoy,
  LogOut,
  MessagesSquare,
  MoreHorizontal,
  Plus,
  Settings,
  TicketPercent,
  UserRound,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { TeyMark } from '@/components/brand/TeyMark';
import { NavTile, NAV_TONES, type NavTone } from '@/components/nav/NavTile';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
import { playSound } from '@/lib/audio/lessonSounds';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { studioFetch, studioKeys, type Badges } from '@/lib/creator/studio';
import { PersonAvatar, Sheet } from '../StudioParts';
import { useHydrated } from '../useHydrated';
import { NotificationBell } from './StudioNotifications';
import sh from './shell.module.css';

type BadgeKey = keyof Badges | 'support';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  tone: NavTone;
  badge?: BadgeKey;
  /** One line under the page title in the header. */
  blurb: string;
}

const GROUPS: { label: string | null; items: NavItem[] }[] = [
  {
    label: null,
    items: [
      { id: 'home', label: 'Home', href: '/creator', icon: Home, tone: 'blue', blurb: 'What’s happening across your courses' },
    ],
  },
  {
    label: 'Build',
    items: [
      { id: 'courses', label: 'Courses', href: '/creator/courses', icon: BookOpen, tone: 'green', blurb: 'Build, review and publish' },
    ],
  },
  {
    label: 'Grow',
    items: [
      { id: 'students', label: 'Learners', href: '/creator/students', icon: Users, tone: 'purple', badge: 'learners', blurb: 'Who’s learning, who needs a nudge' },
      { id: 'community', label: 'Community', href: '/creator/community', icon: MessagesSquare, tone: 'amber', badge: 'community', blurb: 'Answer questions, post updates' },
      { id: 'analytics', label: 'Analytics', href: '/creator/analytics', icon: BarChart3, tone: 'indigo', blurb: 'How learners move through your courses' },
    ],
  },
  {
    label: 'Earn',
    items: [
      { id: 'earnings', label: 'Earnings', href: '/creator/earnings', icon: Wallet, tone: 'teal', blurb: 'Sales, balance and payouts' },
      { id: 'coupons', label: 'Coupons', href: '/creator/coupons', icon: TicketPercent, tone: 'pink', blurb: 'Discounts that bring learners in' },
    ],
  },
];

const ACCOUNT: NavItem[] = [
  { id: 'profile', label: 'Profile', href: '/creator/profile', icon: UserRound, tone: 'orange', blurb: 'How learners see you' },
  { id: 'settings', label: 'Settings', href: '/creator/settings', icon: Settings, tone: 'slate', blurb: 'Account, sounds and notifications' },
  { id: 'guide', label: 'Guide', href: '/creator/guide', icon: BookMarked, tone: 'green', blurb: 'Learn the Studio, step by step' },
  { id: 'help', label: 'Help', href: '/creator/help', icon: LifeBuoy, tone: 'blue', badge: 'support', blurb: 'Questions, feedback and ideas' },
];

const ALL = [...GROUPS.flatMap((g) => g.items), ...ACCOUNT];
const MOBILE_TABS = ['home', 'courses', 'students', 'community'];

const EXTRA_TITLES: { prefix: string; title: string; blurb: string; icon: LucideIcon; tone: NavTone }[] = [
  { prefix: '/creator/notifications', title: 'Notifications', blurb: 'Everything that happened in your studio', icon: Bell, tone: 'amber' },
];

function isActive(item: NavItem, pathname: string) {
  return item.href === '/creator' ? pathname === '/creator' : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export interface ShellUser {
  name: string | null;
  avatarUrl: string | null;
  username: string | null;
  hasStudentAccess: boolean;
  hasCreatorAccess: boolean;
}

export function StudioShell({
  user,
  onLogout,
  children,
}: {
  user: ShellUser;
  onLogout: () => void;
  children: ReactNode;
}) {
  useStandaloneSound();
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const { data: badges } = useSWR<Badges>(studioKeys.badges, studioFetch, {
    refreshInterval: 120_000,
    revalidateOnFocus: true,
  });
  const { data: support } = useSWR<{ unread: number }>('/api/support/unread?audience=CREATOR', studioFetch, {
    refreshInterval: 120_000,
    revalidateOnFocus: true,
  });
  const hydrated = useHydrated();
  const badgeOf = (item: NavItem) =>
    !hydrated || !item.badge ? 0 : item.badge === 'support' ? (support?.unread ?? 0) : (badges?.[item.badge] ?? 0);

  const current = ALL.find((i) => isActive(i, pathname));
  const extra = EXTRA_TITLES.find((e) => pathname.startsWith(e.prefix));
  const title = current?.label ?? extra?.title ?? 'Studio';
  const blurb = current?.blurb ?? extra?.blurb ?? '';
  const TitleIcon = current?.icon ?? extra?.icon ?? Home;
  const titleTone: NavTone = current?.tone ?? extra?.tone ?? 'blue';


  const moreBadge = ALL.filter((i) => !MOBILE_TABS.includes(i.id)).reduce((n, i) => n + badgeOf(i), 0);

  return (
    <div className={sh.frame}>
      {/* ── Menu (desktop) ── */}
      <aside className={sh.side} aria-label="Studio menu">
        <Link href="/creator" className={sh.brand} aria-label="Teyro Studio home">
          <TeyMark size={38} priority />
          <span className={sh.brandWord}>Studio</span>
        </Link>

        <Link href="/creator/create" className={sh.newBtn} onClick={() => playSound('start')}>
          <Plus size={18} strokeWidth={3} aria-hidden="true" /> New course
        </Link>

        <nav className={sh.nav}>
          {GROUPS.map((g, gi) => (
            <div key={gi} className={sh.navGroup}>
              {g.label && <span className={sh.navGroupLabel}>{g.label}</span>}
              {g.items.map((item, i) => (
                <NavRow key={item.id} item={item} active={isActive(item, pathname)} badge={badgeOf(item)} n={gi * 3 + i} />
              ))}
            </div>
          ))}
          <div className={`${sh.navGroup} ${sh.navGroupAccount}`}>
            {ACCOUNT.map((item, i) => (
              <NavRow key={item.id} item={item} active={isActive(item, pathname)} badge={badgeOf(item)} n={8 + i} />
            ))}
          </div>
        </nav>

        <div className={sh.sideFoot}>
          <RoleSwitcher activeRole="INSTRUCTOR" hasStudentAccess={user.hasStudentAccess} hasCreatorAccess={user.hasCreatorAccess} />
        </div>
      </aside>

      <div className={sh.mainCol}>
        {/* ── Header ── */}
        <header className={sh.header}>
          <div className={sh.headerTitle}>
            <Link href="/creator" className={sh.headerMark} aria-label="Studio home">
              <TeyMark size={32} />
            </Link>
            <NavTile icon={TitleIcon} tone={titleTone} className={sh.titleTile} />
            <span className={sh.titleText}>
              <span className={sh.titleMain}>{title}</span>
              {blurb && <span className={sh.titleBlurb}>{blurb}</span>}
            </span>
          </div>
          <div className={sh.headerRight}>
            <Link href="/creator/create" className={sh.headerNew} onClick={() => playSound('start')} aria-label="New course">
              <Plus size={18} strokeWidth={3} aria-hidden="true" />
              <span>New course</span>
            </Link>
            <NotificationBell />
            <AccountMenu user={user} onLogout={onLogout} />
          </div>
        </header>

        <main className={sh.content}>{children}</main>
      </div>

      {/* ── Bottom tabs (phones) ── */}
      <nav className={sh.tabs} aria-label="Studio">
        {MOBILE_TABS.map((id, i) => {
          const item = ALL.find((x) => x.id === id)!;
          const active = isActive(item, pathname);
          const Icon = item.icon;
          const b = badgeOf(item);
          return (
            <Link
              key={id}
              href={item.href}
              className={`${sh.tab} ${active ? sh.tabOn : ''}`}
              style={{ '--tone': NAV_TONES[item.tone] } as CSSProperties}
              aria-current={active ? 'page' : undefined}
              onClick={() => !active && playSound('navTap', i)}
            >
              <span className={sh.tabIcon}>
                <NavTile icon={Icon} tone={item.tone} active={active} />
                {b > 0 && <span className={sh.tabDot}>{b > 9 ? '9+' : b}</span>}
              </span>
              <span className={sh.tabLabel}>{item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          className={`${sh.tab} ${moreOpen || (!!current && !MOBILE_TABS.includes(current.id)) ? sh.tabOn : ''}`}
          style={{ '--tone': 'var(--color-brand)' } as CSSProperties}
          onClick={() => setMoreOpen(true)}
          aria-haspopup="dialog"
        >
          <span className={sh.tabIcon}>
            <NavTile icon={MoreHorizontal} tone="slate" active={moreOpen} />
            {moreBadge > 0 && <span className={sh.tabDot}>{moreBadge > 9 ? '9+' : moreBadge}</span>}
          </span>
          <span className={sh.tabLabel}>More</span>
        </button>
      </nav>

      <Sheet open={moreOpen} title="Studio" onClose={() => setMoreOpen(false)} labelledBy="studio-more-title">
        <div className={sh.moreGrid}>
          {ALL.filter((i) => !MOBILE_TABS.includes(i.id)).map((item) => {
            const Icon = item.icon;
            const b = badgeOf(item);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`${sh.moreItem} ${isActive(item, pathname) ? sh.moreItemOn : ''}`}
                onClick={() => setMoreOpen(false)}
                style={{ '--tone': NAV_TONES[item.tone] } as CSSProperties}
              >
                <NavTile icon={Icon} tone={item.tone} active={isActive(item, pathname)} size="lg" />
                <span className={sh.moreLabel}>{item.label}</span>
                {b > 0 && <span className={sh.navDot}>{b > 99 ? '99+' : b}</span>}
              </Link>
            );
          })}
        </div>
        <Link href="/creator/create" className={sh.moreNew} onClick={() => setMoreOpen(false)}>
          <Plus size={18} strokeWidth={3} aria-hidden="true" /> New course
        </Link>
        <div className={sh.moreFoot}>
          <RoleSwitcher activeRole="INSTRUCTOR" hasStudentAccess={user.hasStudentAccess} hasCreatorAccess={user.hasCreatorAccess} />
          <button type="button" className={sh.logoutRow} onClick={onLogout}>
            <LogOut size={18} aria-hidden="true" /> Log out
          </button>
        </div>
      </Sheet>
    </div>
  );
}

function NavRow({ item, active, badge, n }: { item: NavItem; active: boolean; badge: number; n: number }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`${sh.navRow} ${active ? sh.navRowOn : ''}`}
      style={{ '--tone': NAV_TONES[item.tone] } as CSSProperties}
      aria-current={active ? 'page' : undefined}
      onClick={() => !active && playSound('navTap', n)}
    >
      <NavTile icon={Icon} tone={item.tone} active={active} />
      <span className={sh.navLabel}>{item.label}</span>
      {badge > 0 && (
        <span className={sh.navDot} aria-label={`${badge} waiting`}>
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  );
}

function AccountMenu({ user, onLogout }: { user: ShellUser; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const name = user.name ?? 'Creator';
  return (
    <div className={sh.acctWrap} ref={ref}>
      <button
        type="button"
        className={sh.acctBtn}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Your account"
        onClick={() => {
          playSound(open ? 'menuClose' : 'menuOpen');
          setOpen((o) => !o);
        }}
      >
        <PersonAvatar face={{ fullName: name, avatarUrl: user.avatarUrl }} size={36} />
        <span className={sh.acctName}>{name.split(' ')[0]}</span>
        <ChevronDown size={16} className={sh.acctChevron} style={{ transform: open ? 'rotate(180deg)' : undefined }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={sh.acctMenu}
            role="menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            <div className={sh.acctHead}>
              <PersonAvatar face={{ fullName: name, avatarUrl: user.avatarUrl }} size={44} />
              <span>
                <strong>{name}</strong>
                <span className={sh.acctRole}>Creator</span>
              </span>
            </div>
            <Link role="menuitem" href="/creator/profile" className={sh.acctItem} onClick={() => setOpen(false)}>
              <UserRound size={18} aria-hidden="true" /> Your profile
            </Link>
            {user.username && (
              <Link role="menuitem" href={`/creator-profile/${user.username}`} className={sh.acctItem} target="_blank">
                <ExternalLink size={18} aria-hidden="true" /> See your public page
              </Link>
            )}
            <Link role="menuitem" href="/creator/settings" className={sh.acctItem} onClick={() => setOpen(false)}>
              <Settings size={18} aria-hidden="true" /> Settings
            </Link>
            <button role="menuitem" type="button" className={`${sh.acctItem} ${sh.acctLogout}`} onClick={onLogout}>
              <LogOut size={18} aria-hidden="true" /> Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
