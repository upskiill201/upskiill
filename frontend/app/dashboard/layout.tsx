'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DashboardLink } from '@/components/layout/Sidebar';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Rocket,
  Flame,
  Settings,
  Headphones,
  LogOut,
  Newspaper,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
import NotificationBell from '@/components/community/NotificationBell';
import PullToRefresh from '@/components/ui/PullToRefresh';
import LeagueResultWatcher from '@/components/leaderboard/LeagueResultWatcher';
import { getOnboardingState } from '@/lib/user-onboarding';
import { useGamification } from '@/context/GamificationContext';
import { useStreakModal } from '@/context/StreakContext';
import { emitAudioEvent } from '@/lib/audio/audioEvents';
import { getCachedUser, setCachedUser, clearCachedUser } from '@/lib/user-cache';
import styles from './Dashboard.module.css';

// ─── COMING SOON CONTEXT ───
interface ComingSoonContextType {
  triggerComingSoon: (feature: string) => void;
}

const ComingSoonContext = createContext<ComingSoonContextType | undefined>(undefined);

export const useComingSoon = () => {
  const context = useContext(ComingSoonContext);
  if (!context) throw new Error('useComingSoon must be used within DashboardLayout');
  return context;
};

// ─── MOBILE MENU CONTEXT ───
// Lets pages embedded in the layout (e.g. the headerless student homescreen)
// open the sidebar drawer from their own inline menu triggers.
interface MobileMenuContextType {
  openMobileMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) throw new Error('useMobileMenu must be used within DashboardLayout');
  return context;
};

interface EnhancedDashboardLink extends DashboardLink {
  isComingSoon?: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  isWide?: boolean;
  hideMobileChrome?: boolean;
}

export default function DashboardLayout({
  children,
  isWide = false,
  hideMobileChrome = false,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  // Student homescreen goes headerless on mobile (Duolingo-style) — the page
  // renders its own inline menu trigger instead of a sticky top bar.
  const isStudentHome = pathname === '/dashboard';
  const { streakDays, xp, lives, coins, userLevel } = useGamification();
  const { openStreakModal } = useStreakModal();
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [hasStudentAccess, setHasStudentAccess] = useState<boolean>(false);
  const [hasCreatorAccess, setHasCreatorAccess] = useState<boolean>(false);

  const triggerComingSoon = (feature: string) => {
    setComingSoonFeature(feature);
  };

  // Fetch user data on mount (middleware handles route protection)
  useEffect(() => {
    // Safely hydrate cached user on client mount to prevent SSR hydration mismatch
    const cached = getCachedUser();
    if (cached?.fullName) setUserName(cached.fullName);
    if (cached?.avatarUrl) setUserAvatar(cached.avatarUrl);
    if (cached?.hasStudentAccess !== undefined) setHasStudentAccess(cached.hasStudentAccess);
    if (cached?.hasCreatorAccess !== undefined) setHasCreatorAccess(cached.hasCreatorAccess);

    const fetchMe = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data?.fullName) setUserName(data.fullName);
          if (data?.avatarUrl !== undefined) setUserAvatar(data.avatarUrl);
          if (data?.hasStudentAccess !== undefined) setHasStudentAccess(data.hasStudentAccess);
          if (data?.hasCreatorAccess !== undefined) setHasCreatorAccess(data.hasCreatorAccess);
          setCachedUser(data);

          // STRICT ROLE-BASED GATEKEEPING (PRD AUTH-01 & AUTH-02)
          // Pure creators without a verified student account should be in /creator, not /dashboard.
          // Use window.location.href (hard navigation) to break any localStorage-based infinite redirect
          // loops that router.push() cannot escape.
          if (!data.hasStudentAccess && !data.studentProfile) {
            if (!data.hasCreatorAccess) {
              // Neither role confirmed yet — onboarding never finished.
              // Sending this account to /creator would just bounce back
              // here forever, since creator/layout.tsx redirects
              // non-creators back to /dashboard.
              window.location.href = '/onboarding/0';
            } else {
              window.location.href = '/creator';
            }
            return;
          }
        } else if (res.status === 401) {
          router.push('/login');
          return;
        }
      } catch (err) {
        console.error('Failed to load user data', err);
      }
    };
    fetchMe();
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    clearCachedUser();
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore network errors — still redirect
    }
    window.location.href = '/login';
  };

  // Gamified sidebar menu navigation links with exact custom colored icons from design mockup
  const dashboardLinks: EnhancedDashboardLink[] = [
    { 
      id: 'learn', 
      label: 'Home', 
      href: '/dashboard', 
      icon: <Image src="/Icons/home-button.png" alt="Home" width={28} height={28} className={styles.navIcon} />
    },
    { 
      id: 'journeys', 
      label: 'My Learning', 
      href: '/dashboard/my-learning', 
      icon: <Image src="/Icons/my-learning.png" alt="My Learning" width={28} height={28} className={styles.navIcon} />, 
      isComingSoon: false 
    },
    {
      id: 'explore',
      label: 'Explore',
      href: '/dashboard/explore',
      icon: <Image src="/Icons/explore.png" alt="Explore" width={28} height={28} className={styles.navIcon} />,
      isComingSoon: false
    },
    {
      id: 'feed',
      label: 'Feed',
      href: '/dashboard/feed',
      icon: <Newspaper size={22} className={styles.navIcon} />,
      isComingSoon: false
    },
    {
      id: 'leaderboards',
      label: 'Leaderboards',
      href: '/dashboard/leaderboards',
      icon: <Image src="/Icons/Leaderboard.png" alt="Leaderboards" width={28} height={28} className={styles.navIcon} />,
      isComingSoon: false
    },
    {
      id: 'quests',
      label: 'Quests',
      href: '/dashboard/quests',
      icon: <Image src="/Icons/Quests.png" alt="Quests" width={28} height={28} className={styles.navIcon} />,
      isComingSoon: false
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      href: '/dashboard/profile', 
      icon: <Image src="/Icons/user-profile.png" alt="Profile" width={28} height={28} className={styles.navIcon} />, 
      isComingSoon: false 
    },
    { 
      id: 'shop', 
      label: 'Shop', 
      href: '/dashboard/shop', 
      icon: <Image src="/Icons/store.png" alt="Shop" width={28} height={28} className={styles.navIcon} />, 
      isComingSoon: false 
    },
    { 
      id: 'more', 
      label: 'More', 
      href: '/dashboard', 
      icon: <Image src="/Icons/more.png" alt="More" width={28} height={28} className={styles.navIcon} />, 
      isComingSoon: true 
    },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: EnhancedDashboardLink) => {
    void emitAudioEvent('TAB_SWITCH');
    if (link.isComingSoon) {
      e.preventDefault();
      triggerComingSoon(link.label);
    }
  };

  return (
    <ComingSoonContext.Provider value={{ triggerComingSoon }}>
      <MobileMenuContext.Provider value={{ openMobileMenu: () => { void emitAudioEvent('DRAWER_TOGGLE'); setIsMobileMenuOpen(true); } }}>
      <div className={styles.dashboardContainer}>
        {/* SIDEBAR CONTAINER */}
        <aside className={`${styles.sidebarWrapper} ${isSidebarCollapsed ? styles.collapsed : ''} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <div className={styles.logoContainer}>
              <Link href="/dashboard" className={styles.logoLink}>
                {!isSidebarCollapsed ? (
                  <Image
                    src="/teyro-logo-blue.png"
                    alt="Teyro"
                    width={105}
                    height={30}
                    priority
                    className={styles.sidebarLogo}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                ) : (
                  <div className={styles.compactLogo}>T</div>
                )}
              </Link>
            </div>

            {/* Bell lives in the sidebar header on DESKTOP only. On mobile it would be
                trapped inside the off-canvas drawer, so each always-visible surface
                mounts its own bell instead (sticky header / home HUD). */}
            <div className={styles.sidebarBellSlot}>
              <NotificationBell panelAlign="left" />
            </div>

            <button
              className={styles.sidebarToggle} 
              onClick={() => { void emitAudioEvent('DRAWER_TOGGLE'); setIsSidebarCollapsed(!isSidebarCollapsed); }}
              aria-label="Toggle Sidebar"
            >
              {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <button 
              className={styles.mobileClose} 
              onClick={() => { void emitAudioEvent('DRAWER_TOGGLE'); setIsMobileMenuOpen(false); }}
              aria-label="Close Mobile Menu"
            >
              <X size={22} />
            </button>
          </div>
          
          {/* NAVIGATION LINKS */}
          <nav className={styles.nav}>
            {dashboardLinks.map((link) => {
              const isActive = !link.isComingSoon && (
                link.href === '/dashboard' 
                  ? pathname === '/dashboard' 
                  : pathname.startsWith(link.href)
              );

              const renderedIcon = link.id === 'learn' ? (
                <div className={isActive ? styles.activeIconCircle : styles.icon}>
                  <Image src="/Icons/home-button.png" alt="Home" width={isActive ? 14 : 20} height={isActive ? 14 : 20} className={styles.navIcon} />
                </div>
              ) : (
                <span className={styles.icon}>{link.icon}</span>
              );

              return (
                <Link 
                  key={link.id} 
                  href={link.href} 
                  onClick={(e) => {
                    handleLinkClick(e, link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                  title={isSidebarCollapsed ? link.label : ''}
                >
                  {renderedIcon}
                  {!isSidebarCollapsed && <span className={styles.label}>{link.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* SIDEBAR FOOTER & CARDS */}
          <div className={styles.sidebarFooter}>
            {/* Streak & User Cards (shown when expanded) */}
            {!isSidebarCollapsed && (
              <div className={styles.footerCardsWrapper}>
                {/* Streak Card */}
                <div className={styles.sidebarCard} onClick={() => openStreakModal('PERSONAL')}>
                  <div className={styles.sidebarCardIconBg} style={{ backgroundColor: '#FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src="/Icons/burn.png" width={20} height={20} alt="Streak Burn Icon" style={{ objectFit: 'contain' }} />
                  </div>
                  <div className={styles.sidebarCardContent}>
                    <span className={styles.sidebarCardTitle} style={{ color: '#FF9600', fontWeight: 800 }}>{streakDays} Days Streak</span>
                    <span className={styles.sidebarCardSubtitle} style={{ color: 'rgba(255,150,0,0.85)', fontWeight: 600 }}>Keep it going!</span>
                  </div>
                  <ChevronRight size={14} className={styles.sidebarCardChevron} style={{ color: '#FF9600' }} />
                </div>

                {/* Coins Balance Card */}
                <Link href="/dashboard/shop" className={styles.sidebarCard} style={{ textDecoration: 'none' }}>
                  <div className={styles.sidebarCardIconBg} style={{ backgroundColor: '#FEF9C3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      src={coins > 0 ? '/Icons/Coin.png' : '/Icons/Coin_empty.png'}
                      width={20}
                      height={20}
                      alt="Coins"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className={styles.sidebarCardContent}>
                    <span className={styles.sidebarCardTitle} style={{ color: '#EAB308', fontWeight: 800 }}>{coins} Coins</span>
                    <span className={styles.sidebarCardSubtitle} style={{ color: 'rgba(234,179,8,0.85)', fontWeight: 600 }}>Shop Currency</span>
                  </div>
                  <ChevronRight size={14} className={styles.sidebarCardChevron} style={{ color: '#EAB308' }} />
                </Link>

                {/* XP Balance Card */}
                <div className={styles.sidebarCard} onClick={() => triggerComingSoon('XP Details')}>
                  <div className={styles.sidebarCardIconBg} style={{ backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src="/Icons/gem.png" width={20} height={20} alt="XP Gem" style={{ objectFit: 'contain' }} />
                  </div>
                  <div className={styles.sidebarCardContent}>
                    <span className={styles.sidebarCardTitle} style={{ color: '#0172FD', fontWeight: 800 }}>{xp} XP</span>
                    <span className={styles.sidebarCardSubtitle} style={{ color: 'rgba(1,114,253,0.85)', fontWeight: 600 }}>Total Balance</span>
                  </div>
                  <ChevronRight size={14} className={styles.sidebarCardChevron} style={{ color: '#0172FD' }} />
                </div>

                {/* Lives Card */}
                <div className={styles.sidebarCard} onClick={() => triggerComingSoon('Lives Details')}>
                  <div className={styles.sidebarCardIconBg} style={{ backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src="/Icons/heart.png" width={20} height={20} alt="Lives" style={{ objectFit: 'contain' }} />
                  </div>
                  <div className={styles.sidebarCardContent}>
                    <span className={styles.sidebarCardTitle} style={{ color: '#FF4B4B', fontWeight: 800 }}>{lives} / 5 Lives</span>
                    <span className={styles.sidebarCardSubtitle} style={{ color: 'rgba(255,75,75,0.85)', fontWeight: 600 }}>Hearts remaining</span>
                  </div>
                  <ChevronRight size={14} className={styles.sidebarCardChevron} style={{ color: '#FF4B4B' }} />
                </div>

                {/* Profile Card — opens the student profile & settings page */}
                <div
                  className={styles.sidebarCard}
                  onClick={() => { void emitAudioEvent('TAB_SWITCH'); router.push('/dashboard/profile'); }}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  aria-label="Open profile settings"
                >
                  <Avatar src={userAvatar || undefined} name={userName || 'User'} size="sm" className={styles.profileAvatar} />
                  <div className={styles.sidebarCardContent}>
                    <span className={styles.sidebarCardTitle}>{userName}</span>
                    <span className={styles.sidebarCardSubtitle}>Level {userLevel}</span>
                  </div>
                  <ChevronRight size={14} className={styles.sidebarCardChevron} />
                </div>
              </div>
            )}

            {/* Role switcher — only visible to dual-role users */}
            <div className={styles.switcherContainer}>
              <RoleSwitcher
                activeRole="STUDENT"
                hasStudentAccess={hasStudentAccess}
                hasCreatorAccess={hasCreatorAccess}
                collapsed={isSidebarCollapsed}
              />
            </div>

            <div className={styles.utilityActions}>
              <Link 
                href="/audio-settings" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={styles.navItemCompact}
                title={isSidebarCollapsed ? 'Audio Settings' : ''}
              >
                <span className={styles.icon}><Headphones size={20} className="text-[#0172FD]" /></span>
                {!isSidebarCollapsed && <span className={styles.label}>Audio Settings</span>}
              </Link>
              <button 
                onClick={handleLogout} 
                className={`${styles.navItemCompact} ${styles.logoutBtn}`}
                title={isSidebarCollapsed ? 'Logout' : ''}
                style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}
              >
                <span className={styles.icon}><LogOut size={20} /></span>
                {!isSidebarCollapsed && <span className={styles.label}>Logout</span>}
              </button>
            </div>
          </div>
        </aside>

        {isMobileMenuOpen && <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} />}

        {/* MOBILE BOTTOM NAVIGATION BAR */}
        {!hideMobileChrome && (
        <nav className={styles.mobileBottomNav}>
          <Link href="/dashboard" className={`${styles.bottomNavItem} ${pathname === '/dashboard' ? styles.activeBottomItem : ''}`}>
            <Image src="/Icons/home-button.png" alt="Home" width={24} height={24} className={styles.bottomNavIcon} />
            <span className={styles.bottomNavLabel}>Home</span>
          </Link>
          <Link href="/dashboard/my-learning" className={`${styles.bottomNavItem} ${pathname === '/dashboard/my-learning' ? styles.activeBottomItem : ''}`}>
            <Image src="/Icons/my-learning.png" alt="My Learning" width={24} height={24} className={styles.bottomNavIcon} />
            <span className={styles.bottomNavLabel}>My Learning</span>
          </Link>
          <Link
            href="/dashboard/leaderboards"
            className={`${styles.bottomNavItem} ${pathname.startsWith('/dashboard/leaderboards') ? styles.activeBottomItem : ''}`}
          >
            <Image src="/Icons/Leaderboard.png" alt="Leaderboards" width={24} height={24} className={styles.bottomNavIcon} />
            <span className={styles.bottomNavLabel}>Leaderboards</span>
          </Link>
          <Link 
            href="/dashboard/profile" 
            className={`${styles.bottomNavItem} ${pathname === '/dashboard/profile' ? styles.activeBottomItem : ''}`}
          >
            <Image src="/Icons/user-profile.png" alt="Profile" width={24} height={24} className={styles.bottomNavIcon} />
            <span className={styles.bottomNavLabel}>Profile</span>
          </Link>
        </nav>
        )}

        {/* MAIN CONTENT AREA */}
        <main className={`${styles.main} ${isSidebarCollapsed ? styles.expanded : ''}`}>
          {/* MOBILE-ONLY STICKY HEADER — app chrome only, no repeated wordmark (hidden on the student homescreen, which is headerless Duolingo-style) */}
          {!hideMobileChrome && !isStudentHome && (
          <header className={styles.mobileHeader}>
            <button
              className={styles.mobileToggle}
              onClick={() => { void emitAudioEvent('DRAWER_TOGGLE'); setIsMobileMenuOpen(true); }}
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <NotificationBell />
              <Avatar src={userAvatar || undefined} name={userName || 'User'} size="sm" />
            </div>
          </header>
          )}

          {/* PAGE CONTENT */}
          <div className={`${styles.content} ${isWide ? styles.wideContent : ''} ${hideMobileChrome ? styles.immersiveContent : ''}`}>
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

        {/* GAMIFIED STREAK SAVED / RESET moments are now handled by the
            Celebration Engine (teyro:streak-status → full-page scene) */}

        {/* Weekly league settlement — promotion/demotion scene plays once per
            settled week (server seenAt flag + session dedupe) */}
        <LeagueResultWatcher />
      </div>
      </MobileMenuContext.Provider>
    </ComingSoonContext.Provider>
  );
}
