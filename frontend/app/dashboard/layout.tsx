'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DashboardLink } from '@/components/layout/Sidebar';
import { 
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Rocket,
  BookOpen,
  Layers,
  Search,
  Trophy,
  Target,
  User,
  MoreHorizontal,
  Flame,
  Settings,
  LogOut
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('Joel Ndakwe');
  const [userAvatar, setUserAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100');
  const [hasStudentAccess, setHasStudentAccess] = useState(false);
  const [hasCreatorAccess, setHasCreatorAccess] = useState(false);

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

  // Gamified sidebar menu navigation links from the design mockup
  const dashboardLinks: EnhancedDashboardLink[] = [
    { id: 'learn', label: 'Learn', href: '/dashboard', icon: <BookOpen size={20} /> },
    { id: 'journeys', label: 'Journeys', href: '/dashboard', icon: <Layers size={20} />, isComingSoon: true },
    { id: 'explore', label: 'Explore', href: '/dashboard', icon: <Search size={20} />, isComingSoon: true },
    { id: 'leaderboards', label: 'Leaderboards', href: '/dashboard', icon: <Trophy size={20} />, isComingSoon: true },
    { id: 'quests', label: 'Quests', href: '/dashboard', icon: <Target size={20} />, isComingSoon: true },
    { id: 'profile', label: 'Profile', href: '/dashboard', icon: <User size={20} />, isComingSoon: true },
    { id: 'more', label: 'More', href: '/dashboard', icon: <MoreHorizontal size={20} />, isComingSoon: true },
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
                    src="/Teyro Logo.png" 
                    alt="Teyro" 
                    width={105} 
                    height={30} 
                    priority 
                    className={styles.sidebarLogo}
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
            {dashboardLinks.map((link) => (
              <Link 
                key={link.id} 
                href={link.href} 
                onClick={(e) => {
                  handleLinkClick(e, link);
                  setIsMobileMenuOpen(false);
                }}
                className={`${styles.navItem} ${link.id === 'learn' ? styles.active : ''}`}
                title={isSidebarCollapsed ? link.label : ''}
              >
                <span className={styles.icon}>{link.icon}</span>
                {!isSidebarCollapsed && <span className={styles.label}>{link.label}</span>}
              </Link>
            ))}
          </nav>

          {/* SIDEBAR FOOTER & CARDS */}
          <div className={styles.sidebarFooter}>
            {/* Streak & User Cards (shown when expanded) */}
            {!isSidebarCollapsed && (
              <div className={styles.footerCardsWrapper}>
                {/* 12 Days Streak Card */}
                <div className={styles.sidebarCard} onClick={() => triggerComingSoon('Streaks')}>
                  <div className={`${styles.sidebarCardIconBg} ${styles.streakBg}`}>
                    <Flame size={18} className={styles.streakFlameIcon} />
                  </div>
                  <div className={styles.sidebarCardContent}>
                    <span className={styles.sidebarCardTitle}>12 Days Streak</span>
                    <span className={styles.sidebarCardSubtitle}>Keep it going!</span>
                  </div>
                  <ChevronRight size={14} className={styles.sidebarCardChevron} />
                </div>

                {/* Profile Card */}
                <div className={styles.sidebarCard} onClick={() => triggerComingSoon('Profile Settings')}>
                  <Avatar src={userAvatar} name={userName} size="sm" className={styles.profileAvatar} />
                  <div className={styles.sidebarCardContent}>
                    <span className={styles.sidebarCardTitle}>{userName}</span>
                    <span className={styles.sidebarCardSubtitle}>Level 5 👑</span>
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

        {/* MAIN CONTENT AREA */}
        <main className={`${styles.main} ${isSidebarCollapsed ? styles.expanded : ''}`}>
          {/* MOBILE-ONLY STICKY HEADER */}
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
                src="/Teyro Logo.png" 
                alt="Teyro" 
                width={85} 
                height={24} 
                priority 
              />
            </div>
            <Avatar src={userAvatar} name={userName} size="sm" />
          </header>

          {/* PAGE CONTENT */}
          <div className={styles.content}>
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
