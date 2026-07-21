'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
  LogOut,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
import { getOnboardingState } from '@/lib/user-onboarding';
import { useGamification } from '@/context/GamificationContext';
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
  const { streakDays, xp, lives } = useGamification();
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('Joel Ndakwe');
  const [userAvatar, setUserAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100');
  const [hasStudentAccess, setHasStudentAccess] = useState(false);
  const [hasCreatorAccess, setHasCreatorAccess] = useState(false);

  const userLevel = Math.floor(xp / 100) + 1;

  const triggerComingSoon = (feature: string) => {
    setComingSoonFeature(feature);
  };

  // Fetch user data on mount (middleware handles route protection)
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data?.fullName) setUserName(data.fullName);
          if (data?.avatarUrl) setUserAvatar(data.avatarUrl);
          if (data?.hasStudentAccess) setHasStudentAccess(data.hasStudentAccess);
          if (data?.hasCreatorAccess) setHasCreatorAccess(data.hasCreatorAccess);
        }
      } catch (err) {
        console.error('Failed to load user data', err);
      }
    };
    fetchMe();
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
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
      href: '/dashboard', 
      icon: <Image src="/Icons/explore.png" alt="Explore" width={28} height={28} className={styles.navIcon} />, 
      isComingSoon: true 
    },
    { 
      id: 'leaderboards', 
      label: 'Leaderboards', 
      href: '/dashboard', 
      icon: <Image src="/Icons/Leaderboard.png" alt="Leaderboards" width={28} height={28} className={styles.navIcon} />, 
      isComingSoon: true 
    },
    { 
      id: 'quests', 
      label: 'Quests', 
      href: '/dashboard', 
      icon: <Image src="/Icons/Quests.png" alt="Quests" width={28} height={28} className={styles.navIcon} />, 
      isComingSoon: true 
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      href: '/dashboard', 
      icon: <Image src="/Icons/user-profile.png" alt="Profile" width={28} height={28} className={styles.navIcon} />, 
      isComingSoon: true 
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
    if (link.isComingSoon) {
      e.preventDefault();
      triggerComingSoon(link.label);
    }
  };

  return (
    <ComingSoonContext.Provider value={{ triggerComingSoon }}>
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
            
            <button 
              className={styles.sidebarToggle} 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label="Toggle Sidebar"
            >
              {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <button 
              className={styles.mobileClose} 
              onClick={() => setIsMobileMenuOpen(false)}
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
                <div className={styles.sidebarCard} onClick={() => triggerComingSoon('Streaks')}>
                  <div className={`${styles.sidebarCardIconBg} ${styles.streakBg}`}>
                    <Flame size={18} className={styles.streakFlameIcon} />
                  </div>
                  <div className={styles.sidebarCardContent}>
                    <span className={styles.sidebarCardTitle}>{streakDays} Days Streak</span>
                    <span className={styles.sidebarCardSubtitle}>Keep it going!</span>
                  </div>
                  <ChevronRight size={14} className={styles.sidebarCardChevron} />
                </div>

                {/* XP Balance Card */}
                <div className={styles.sidebarCard} onClick={() => triggerComingSoon('XP Details')}>
                  <div className={styles.sidebarCardIconBg} style={{ backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src="/gem-icon.png" width={18} height={18} alt="XP Gem" style={{ objectFit: 'contain' }} />
                  </div>
                  <div className={styles.sidebarCardContent}>
                    <span className={styles.sidebarCardTitle}>{xp} XP</span>
                    <span className={styles.sidebarCardSubtitle}>Total Balance</span>
                  </div>
                  <ChevronRight size={14} className={styles.sidebarCardChevron} />
                </div>

                {/* Lives Card */}
                <div className={styles.sidebarCard} onClick={() => triggerComingSoon('Lives Details')}>
                  <div className={styles.sidebarCardIconBg} style={{ backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src="/heart-icon.png" width={18} height={18} alt="Lives" style={{ objectFit: 'contain' }} />
                  </div>
                  <div className={styles.sidebarCardContent}>
                    <span className={styles.sidebarCardTitle}>{lives} / 5 Lives</span>
                    <span className={styles.sidebarCardSubtitle}>Hearts remaining</span>
                  </div>
                  <ChevronRight size={14} className={styles.sidebarCardChevron} />
                </div>

                {/* Profile Card */}
                <div className={styles.sidebarCard} onClick={() => triggerComingSoon('Profile Settings')}>
                  <Avatar src={userAvatar} name={userName} size="sm" className={styles.profileAvatar} />
                  <div className={styles.sidebarCardContent}>
                    <span className={styles.sidebarCardTitle}>{userName}</span>
                    <span className={styles.sidebarCardSubtitle}>Level {userLevel} 👑</span>
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
                href="/dashboard" 
                onClick={(e) => { e.preventDefault(); triggerComingSoon('Settings'); setIsMobileMenuOpen(false); }} 
                className={styles.navItemCompact}
                title={isSidebarCollapsed ? 'Settings' : ''}
              >
                <span className={styles.icon}><Settings size={20} /></span>
                {!isSidebarCollapsed && <span className={styles.label}>Settings</span>}
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
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); triggerComingSoon('Leaderboards'); }} 
            className={styles.bottomNavItem}
          >
            <Image src="/Icons/Leaderboard.png" alt="Leaderboards" width={24} height={24} className={styles.bottomNavIcon} />
            <span className={styles.bottomNavLabel}>Leaderboards</span>
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); triggerComingSoon('Profile Settings'); }} 
            className={styles.bottomNavItem}
          >
            <Image src="/Icons/user-profile.png" alt="Profile" width={24} height={24} className={styles.bottomNavIcon} />
            <span className={styles.bottomNavLabel}>Profile</span>
          </a>
        </nav>
        )}

        {/* MAIN CONTENT AREA */}
        <main className={`${styles.main} ${isSidebarCollapsed ? styles.expanded : ''}`}>
          {/* MOBILE-ONLY STICKY HEADER */}
          {!hideMobileChrome && (
          <header className={styles.mobileHeader}>
            <button 
              className={styles.mobileToggle} 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
            <div className={styles.mobileLogoContainer}>
              <Image 
                src="/teyro-logo-blue.png" 
                alt="Teyro" 
                width={85} 
                height={24} 
                priority 
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <Avatar src={userAvatar} name={userName} size="sm" />
          </header>
          )}

          {/* PAGE CONTENT */}
          <div className={`${styles.content} ${isWide ? styles.wideContent : ''} ${hideMobileChrome ? styles.immersiveContent : ''}`}>
            {children}
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
    </ComingSoonContext.Provider>
  );
}
