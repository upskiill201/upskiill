'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Rocket,
  Settings,
  LifeBuoy,
  LogOut,
  UsersRound,
  House,
  BookOpen,
  Compass,
  Trophy,
  Target,
  Store,
  UserRound,
  Ellipsis,
  type LucideIcon,
  Clapperboard,
  Loader2,
  Presentation,
} from 'lucide-react';
import Link from 'next/link';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import NotificationBell from '@/components/community/NotificationBell';
import PullToRefresh from '@/components/ui/PullToRefresh';
import { StatsBar } from '@/components/ui/StatsBar';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { getCachedUser, setCachedUser, clearClientSession } from '@/lib/user-cache';
import { useMe } from '@/hooks/useMe';
import { NavBadge } from '@/components/awareness/NavBadge';
import { useNavBadges } from '@/hooks/useNavBadges';
import { TeyMark } from '@/components/brand/TeyMark';
import { NavTile, type NavTone } from '@/components/nav/NavTile';
import styles from './StudentShell.module.css';

// ─── COMING SOON CONTEXT ───
interface ComingSoonContextType {
  triggerComingSoon: (feature: string) => void;
}

const ComingSoonContext = createContext<ComingSoonContextType | undefined>(undefined);

export const useComingSoon = () => {
  const context = useContext(ComingSoonContext);
  if (!context) throw new Error('useComingSoon must be used within StudentShell');
  return context;
};

/**
 * Bare context provider for consumers that need `useComingSoon()` without the
 * rest of StudentShell's student nav/chrome (e.g. the admin course-review
 * lesson viewer, which reuses the learner lesson player read-only outside the
 * dashboard sidebar/bottom-nav). Purely additive — StudentShell itself still
 * provides its own instance of this context exactly as before.
 */
export function ComingSoonProvider({
  children,
  onTrigger,
}: {
  children: React.ReactNode;
  /** Defaults to a no-op — callers outside the student shell rarely want the
   *  "Coming Soon" modal, just a way to swallow the call safely. */
  onTrigger?: (feature: string) => void;
}) {
  return (
    <ComingSoonContext.Provider value={{ triggerComingSoon: onTrigger ?? (() => {}) }}>
      {children}
    </ComingSoonContext.Provider>
  );
}

// ─── MOBILE MENU CONTEXT ───
// Lets pages embedded in the layout (e.g. the headerless student homescreen)
// open the sidebar drawer from their own inline menu triggers.
interface MobileMenuContextType {
  openMobileMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) throw new Error('useMobileMenu must be used within StudentShell');
  return context;
};

interface NavTab {
  id: string;
  label: string;
  href: string;
  /** Drawn as a NavTile: the glyph on a tile of this colour. */
  icon: LucideIcon;
  tone: NavTone;
  /** The tab's own colour PNG from /Icons; drawn instead of the glyph. */
  image?: string;
}

/**
 * Duolingo's menu, in Teyro's order. The first five that also sit in the
 * phone's bottom bar are marked in BOTTOM_TABS below.
 */
const NAV_TABS: NavTab[] = [
  { id: 'home', label: 'Home', href: '/dashboard', icon: House, tone: 'blue', image: '/Icons/home-button.png' },
  { id: 'learning', label: 'My Learning', href: '/dashboard/my-learning', icon: BookOpen, tone: 'green', image: '/Icons/my-learning.png' },
  { id: 'explore', label: 'Explore', href: '/dashboard/explore', icon: Compass, tone: 'purple', image: '/Icons/explore.png' },
  { id: 'community', label: 'Community', href: '/dashboard/feed', icon: UsersRound, tone: 'teal' },
  { id: 'leaderboards', label: 'Leaderboards', href: '/dashboard/leaderboards', icon: Trophy, tone: 'amber', image: '/Icons/Leaderboard.png' },
  { id: 'quests', label: 'Quests', href: '/dashboard/quests', icon: Target, tone: 'orange', image: '/Icons/Quests.png' },
  { id: 'shop', label: 'Shop', href: '/dashboard/shop', icon: Store, tone: 'pink', image: '/Icons/store.png' },
  { id: 'profile', label: 'Profile', href: '/dashboard/profile', icon: UserRound, tone: 'indigo', image: '/Icons/user-profile.png' },
];

/** Phone bottom bar — the same five Duolingo keeps one thumb away. */
const BOTTOM_TABS = ['home', 'leaderboards', 'quests', 'shop', 'profile'];

/** Where the community tab counts as "active" besides its own href. */
const COMMUNITY_PATHS = ['/dashboard/feed', '/dashboard/communities', '/dashboard/community'];

/**
 * Pages that get the stats bar from the shell. Home draws its own HUD (it has
 * the course picker), and profile + the course page already place one.
 */
const SHELL_STATS_PATHS = [
  '/dashboard/my-learning',
  '/dashboard/explore',
  '/dashboard/feed',
  '/dashboard/communities',
  '/dashboard/community',
  '/dashboard/leaderboards',
  '/dashboard/quests',
  '/dashboard/shop',
  '/dashboard/notifications',
  '/dashboard/my-courses',
  '/dashboard/settings',
  '/dashboard/streak',
  '/dashboard/level',
];

function isTabActive(tab: NavTab, pathname: string) {
  if (tab.href === '/dashboard') return pathname === '/dashboard';
  if (tab.id === 'community') return COMMUNITY_PATHS.some((p) => pathname.startsWith(p));
  return pathname.startsWith(tab.href);
}

interface StudentShellProps {
  children: React.ReactNode;
  isWide?: boolean;
  hideMobileChrome?: boolean;
}

export default function StudentShell({
  children,
  isWide = false,
  hideMobileChrome = false,
}: StudentShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  // Student homescreen goes headerless on mobile (Duolingo-style) — the page
  // renders its own HUD with the course picker instead of the shell's.
  const isStudentHome = pathname === '/dashboard';
  const showShellStats = !hideMobileChrome && SHELL_STATS_PATHS.some((p) => pathname.startsWith(p));
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const triggerComingSoon = (feature: string) => {
    setComingSoonFeature(feature);
  };

  // Current user. Shared via SWR rather than fetched here with a raw fetch:
  // the dashboard page needs the same record, and because child effects run
  // before parent effects the two raw fetches went out in the same tick as two
  // identical authenticated round trips on every dashboard entry.
  const { me, avatarUrl: resolvedAvatarUrl, error: meError } = useMe();

  // Role flags: live from /me, falling back to the local cache so the More
  // menu is right before the network answers. (Only read on a tap, so the
  // cache can never cause a hydration mismatch.)
  const [cachedUser] = useState(() => getCachedUser());
  const hasStudentAccess = me?.hasStudentAccess ?? cachedUser?.hasStudentAccess ?? false;
  const hasCreatorAccess = me?.hasCreatorAccess ?? cachedUser?.hasCreatorAccess ?? false;

  useEffect(() => {
    if (meError?.status === 401) {
      router.push('/login');
    }
  }, [meError, router]);

  useEffect(() => {
    if (!me) return;

    // Cache the *resolved* photo (falls back through Profile/InstructorProfile —
    // see resolveAvatarUrl in useMe.ts), not the raw User.avatarUrl column, so
    // a Google-onboarded user's cached first-paint isn't null too.
    setCachedUser({ ...me, avatarUrl: resolvedAvatarUrl });

    // STRICT ROLE-BASED GATEKEEPING (PRD AUTH-01 & AUTH-02)
    // Pure creators without a verified student account should be in /creator, not /dashboard.
    // Use window.location.href (hard navigation) to break any localStorage-based infinite redirect
    // loops that router.push() cannot escape.
    if (!me.hasStudentAccess && !me.studentProfile) {
      if (!me.hasCreatorAccess) {
        // Neither role confirmed yet — onboarding never finished.
        // Sending this account to /creator would just bounce back
        // here forever, since creator/layout.tsx redirects
        // non-creators back to /dashboard.
        window.location.href = '/onboarding/0';
      } else {
        window.location.href = '/creator';
      }
    }
  }, [me, resolvedAvatarUrl]);

  // The More menu closes on any outside tap or Escape, like Duolingo's.
  useEffect(() => {
    if (!isMoreOpen) return;
    const onDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setIsMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMoreOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isMoreOpen]);

  // A route change always lands with the drawer and menu closed.
  const [routeSeen, setRouteSeen] = useState(pathname);
  if (routeSeen !== pathname) {
    setRouteSeen(pathname);
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
  }

  const handleLogout = async () => {
    clearClientSession();
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore network errors — still redirect
    }
    window.location.href = '/login';
  };

  // Same endpoint the old role pill used; a hard navigation so the creator
  // app boots with the new role cookie.
  const [switching, setSwitching] = useState(false);
  const switchToCreator = async () => {
    setSwitching(true);
    playSound('navTap', 5);
    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role: 'INSTRUCTOR' }),
      });
      if (res.ok) {
        window.location.href = '/creator';
        return;
      }
    } catch {
      // fall through — the button re-enables
    }
    setSwitching(false);
  };

  const openDrawer = () => {
    playHaptic('light', false);
    playSound('menuOpen');
    setIsMobileMenuOpen(true);
  };
  const closeDrawer = () => {
    playSound('menuClose');
    setIsMobileMenuOpen(false);
  };

  const toggleMore = () => {
    playHaptic('light', false);
    playSound(isMoreOpen ? 'menuClose' : 'menuOpen');
    setIsMoreOpen((v) => !v);
  };

  // Every tab tap: a light tick you can feel and a note you can hear. Tapping
  // the tab you're already on just scrolls back to the top, like Duolingo.
  const onTabTap = (e: React.MouseEvent, tab: NavTab, index: number) => {
    playHaptic('selection', false);
    playSound('navTap', index);
    if (isTabActive(tab, pathname) && pathname === tab.href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Red dots on the tabs — what's waiting where (hooks/useNavBadges.ts).
  const navBadges = useNavBadges();
  const badgeFor = (id: string) =>
    id === 'quests' ? (
      <NavBadge count={navBadges.quests} label={`${navBadges.quests} to claim in Quests`} />
    ) : id === 'leaderboards' ? (
      <NavBadge dot={navBadges.leaderboards} label="Your league rank changed" />
    ) : id === 'profile' ? (
      <NavBadge count={navBadges.profile} label={`${navBadges.profile} new badges`} />
    ) : null;

  const moreItems = (
    <>
      <Link href="/dashboard/settings" className={styles.moreItem} onClick={() => playSound('navTap', 5)}>
        <NavTile icon={Settings} tone="slate" size="sm" />
        <span>Settings</span>
      </Link>
      <Link href="/dashboard/help" className={styles.moreItem} onClick={() => playSound('navTap', 6)}>
        <NavTile icon={LifeBuoy} tone="blue" size="sm" />
        <span>Help & feedback</span>
      </Link>
      {hasStudentAccess && hasCreatorAccess && (
        <button type="button" className={styles.moreItem} onClick={() => void switchToCreator()} disabled={switching}>
          {switching ? (
            <NavTile icon={Loader2} tone="purple" size="sm" className="[&_svg]:animate-spin" />
          ) : (
            <NavTile icon={Clapperboard} tone="purple" size="sm" />
          )}
          <span>Switch to Creator</span>
        </button>
      )}
      {/* A learner with no creator profile: start creator onboarding. Waits
          for /me so a creator never sees it flash before their flags load. */}
      {me && !me.hasCreatorAccess && (
        <Link href="/creator/onboarding/1" className={styles.moreItem} onClick={() => playSound('navTap', 5)}>
          <NavTile icon={Presentation} tone="purple" size="sm" />
          <span>Become a creator</span>
        </Link>
      )}
      <button type="button" className={`${styles.moreItem} ${styles.moreDanger}`} onClick={() => void handleLogout()}>
        <NavTile icon={LogOut} tone="red" size="sm" />
        <span>Log out</span>
      </button>
    </>
  );

  return (
    <ComingSoonContext.Provider value={{ triggerComingSoon }}>
      <MobileMenuContext.Provider value={{ openMobileMenu: openDrawer }}>
      <div className={styles.dashboardContainer}>
        {/* ═══ LEFT MENU — Duolingo's rail on desktop, a drawer on phones ═══ */}
        <aside
          className={`${styles.sidebarWrapper} ${isSidebarCollapsed ? styles.collapsed : ''} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}
          aria-label="Main menu"
        >
          <div className={styles.sidebarHeader}>
            <Link href="/dashboard" className={styles.logoLink} aria-label="Teyro home">
              <TeyMark size={isSidebarCollapsed ? 40 : 48} priority />
            </Link>

            <button
              type="button"
              className={styles.mobileClose}
              onClick={closeDrawer}
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={2.5} />
            </button>
          </div>

          <nav className={styles.nav}>
            {NAV_TABS.map((tab, i) => {
              const active = isTabActive(tab, pathname);
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  onClick={(e) => onTabTap(e, tab, i)}
                  className={`${styles.navItem} ${active ? styles.active : ''}`}
                  aria-current={active ? 'page' : undefined}
                  title={isSidebarCollapsed ? tab.label : undefined}
                >
                  <span className={styles.icon}>
                    <NavTile icon={tab.icon} image={tab.image} tone={tab.tone} active={active} />
                    {badgeFor(tab.id)}
                  </span>
                  <span className={styles.label}>{tab.label}</span>
                </Link>
              );
            })}

          </nav>

          {/* Outside the scrolling nav, so its popover is never clipped. */}
          {/* MORE — Settings, role switch, log out */}
          <div className={styles.moreWrap} ref={moreRef}>
            <button
              type="button"
              className={`${styles.navItem} ${isMoreOpen ? styles.moreOpen : ''}`}
              onClick={toggleMore}
              aria-expanded={isMoreOpen}
              aria-haspopup="menu"
              title={isSidebarCollapsed ? 'More' : undefined}
            >
              <span className={styles.icon}>
                <NavTile icon={Ellipsis} image="/Icons/more.png" tone="slate" active={isMoreOpen} />
              </span>
              <span className={styles.label}>More</span>
            </button>
            <AnimatePresence>
              {isMoreOpen && (
                <motion.div
                  role="menu"
                  className={styles.moreMenu}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.95, x: -6 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, x: -4 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                >
                  {moreItems}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.sidebarFooter}>
            <div className={styles.sidebarBellSlot}>
              <NotificationBell panelAlign="left" />
            </div>
            <button
              type="button"
              className={styles.sidebarToggle}
              onClick={() => {
                playSound(isSidebarCollapsed ? 'menuOpen' : 'menuClose');
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }}
              aria-label={isSidebarCollapsed ? 'Expand menu' : 'Collapse menu'}
            >
              {isSidebarCollapsed ? <ChevronRight size={16} strokeWidth={2.5} /> : <ChevronLeft size={16} strokeWidth={2.5} />}
            </button>
          </div>
        </aside>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={styles.overlay}
              onClick={closeDrawer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* ═══ PHONE BOTTOM BAR ═══ */}
        {!hideMobileChrome && (
          <nav className={styles.mobileBottomNav} aria-label="Main tabs">
            {BOTTOM_TABS.map((id) => {
              const index = NAV_TABS.findIndex((t) => t.id === id);
              const tab = NAV_TABS[index];
              const active = isTabActive(tab, pathname);
              return (
                <Link
                  key={id}
                  href={tab.href}
                  aria-label={tab.label}
                  aria-current={active ? 'page' : undefined}
                  onClick={(e) => onTabTap(e, tab, index)}
                  className={`${styles.bottomNavItem} ${active ? styles.activeBottomItem : ''}`}
                >
                  <span className={styles.bottomNavIconWrap}>
                    <NavTile icon={tab.icon} image={tab.image} tone={tab.tone} active={active} size="lg" />
                    {badgeFor(id)}
                  </span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* ═══ MAIN CONTENT ═══ */}
        <main className={`${styles.main} ${isSidebarCollapsed ? styles.expanded : ''}`}>
          {/* Phone top bar — Duolingo's HUD on every main tab: menu, the
              four stats, the bell. Home draws its own (with the course
              picker); immersive screens have none. */}
          {!hideMobileChrome && !isStudentHome && (
            <header className={styles.mobileHeader}>
              <button type="button" className={styles.mobileToggle} onClick={openDrawer} aria-label="Open menu">
                <Menu size={24} strokeWidth={2.5} />
              </button>
              <StatsBar compact show={['streak', 'coin', 'gem', 'lives']} className={styles.mobileStats} />
              <div className={styles.mobileBell}>
                <NotificationBell panelAlign="right" />
              </div>
            </header>
          )}

          {/* PAGE CONTENT */}
          <div className={`${styles.content} ${isWide ? styles.wideContent : ''} ${hideMobileChrome ? styles.immersiveContent : ''}`}>
            {/* Desktop: the stats sit top-right of every main tab, where
                Duolingo keeps them. */}
            {showShellStats && (
              <div className={styles.desktopStats}>
                <StatsBar compact show={['streak', 'coin', 'gem', 'lives']} />
              </div>
            )}
            <PullToRefresh>{children}</PullToRefresh>
          </div>
        </main>

        {/* COMING SOON MODAL */}
        <Modal
          isOpen={!!comingSoonFeature}
          onClose={() => setComingSoonFeature(null)}
          size="md"
        >
          <div className={styles.modalBody}>
            <div className={styles.modalIconWrapper}>
              <Sparkles size={40} className={styles.sparkleIcon} />
            </div>
            <h2 className={styles.modalTitle}>{comingSoonFeature} is Coming Soon!</h2>
            <p className={styles.modalDescription}>
              We&apos;re currently precision-engineering the <strong>{comingSoonFeature}</strong> module to give you a world-class learning experience.
              Stay tuned for our upcoming Phase 1 update!
            </p>
            <div className={styles.modalActions}>
              <Button variant="primary" onClick={() => setComingSoonFeature(null)} leftIcon={<Rocket size={18} />}>
                Got it, I&apos;ll Wait!
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      </MobileMenuContext.Provider>
    </ComingSoonContext.Provider>
  );
}

