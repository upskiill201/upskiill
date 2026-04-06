'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DashboardLink } from '@/components/layout/Sidebar';
import { 
  LayoutGrid, 
  Book, 
  BarChart2, 
  Bot, 
  Route, 
  Users, 
  Award, 
  MessageSquare, 
  Settings, 
  Search, 
  Bell, 
  LogOut,
  Sparkles,
  Rocket,
  Menu,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
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
  const [userName, setUserName] = useState('Student');
  const [userAvatar, setUserAvatar] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100');

  const triggerComingSoon = (feature: string) => {
    setComingSoonFeature(feature);
  };

  // Ensure unauthenticated users are redirected to login & populate real user data
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) {
          window.location.href = '/login';
          return;
        }
        const data = await res.json();
        if (data?.fullName) setUserName(data.fullName);
        if (data?.avatarUrl) setUserAvatar(data.avatarUrl);
      } catch {
        window.location.href = '/login';
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

  const dashboardLinks: EnhancedDashboardLink[] = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <LayoutGrid size={20} /> },
    { id: 'courses', label: 'My Courses', href: '/dashboard', icon: <Book size={20} />, isComingSoon: true },
    { id: 'skill-gap', label: 'AI Skill Gap Analyzer', href: '/dashboard', icon: <BarChart2 size={20} />, isComingSoon: true },
    { id: 'ai-tutor', label: 'AI Tutor', href: '/dashboard', icon: <Bot size={20} />, isComingSoon: true },
    { id: 'learning-path', label: 'My Learning Path', href: '/dashboard', icon: <Route size={20} />, isComingSoon: true },
    { id: 'community', label: 'Community Hub', href: '/dashboard', icon: <Users size={20} />, isComingSoon: true },
    { id: 'certificates', label: 'Certificates & Rewards', href: '/dashboard', icon: <Award size={20} />, isComingSoon: true },
    { id: 'messages', label: 'Messages', href: '/dashboard', icon: <div className={styles.messageIconWrapper}><MessageSquare size={20} /><span className={styles.messageBadge}>3</span></div>, isComingSoon: true },
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
        {/* SIDEBAR */}
        <aside className={`${styles.sidebarWrapper} ${isSidebarCollapsed ? styles.collapsed : ''} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <div className={styles.logoContainer}>
              <Link href="/" className={styles.logoLink}>
                {!isSidebarCollapsed ? (
                  <Image 
                    src="/logo.png" 
                    alt="Upskiill" 
                    width={100} 
                    height={28} 
                    priority 
                    className={styles.sidebarLogo}
                  />
                ) : (
                  <div className={styles.compactLogo}>U</div>
                )}
              </Link>
            </div>
            
            <button 
              className={styles.sidebarToggle} 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label="Toggle Sidebar"
            >
              {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            <button 
              className={styles.mobileClose} 
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Mobile Menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className={styles.nav}>
            {dashboardLinks.map((link) => (
              <Link 
                key={link.id} 
                href={link.href} 
                onClick={(e) => {
                  handleLinkClick(e, link);
                  setIsMobileMenuOpen(false);
                }}
                className={`${styles.navItem} ${link.id === 'dashboard' ? styles.active : ''}`}
                title={isSidebarCollapsed ? link.label : ''}
              >
                <span className={styles.icon}>{link.icon}</span>
                {!isSidebarCollapsed && <span className={styles.label}>{link.label}</span>}
                {!isSidebarCollapsed && link.isComingSoon && <span className={styles.comingSoonBadge}>Soon</span>}
              </Link>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <Link 
              href="/dashboard" 
              onClick={(e) => { e.preventDefault(); triggerComingSoon('Settings'); setIsMobileMenuOpen(false); }} 
              className={styles.navItem}
              title={isSidebarCollapsed ? 'Settings' : ''}
            >
              <span className={styles.icon}><Settings size={20} /></span>
              {!isSidebarCollapsed && <span className={styles.label}>Settings</span>}
            </Link>
            <button 
              onClick={handleLogout} 
              className={`${styles.navItem} ${styles.logoutBtn}`}
              title={isSidebarCollapsed ? 'Logout' : ''}
              style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}
            >
              <span className={styles.icon}><LogOut size={20} /></span>
              {!isSidebarCollapsed && <span className={styles.label}>Logout</span>}
            </button>
          </div>
        </aside>

        {isMobileMenuOpen && <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} />}

        {/* MAIN CONTENT AREA */}
        <main className={`${styles.main} ${isSidebarCollapsed ? styles.expanded : ''}`}>
          {/* DASHBOARD HEADER */}
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <button 
                className={styles.mobileToggle} 
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Menu"
              >
                <Menu size={24} />
              </button>
              <h1 className={styles.pageTitle}>Dashboard</h1>
              
              {/* Gamification Bar (Desktop Only) */}
              <div className={styles.gamificationBar}>
                {/* ... existing gamification bar content ... */}
                <div className={styles.gamiItem}>
                  <div className={styles.levelBadge}>12</div>
                  <div className={styles.gamiText}>
                    <span className={styles.gamiLabel}>Pro Learner</span>
                    <span className={styles.gamiSub}>Lvl 12</span>
                  </div>
                </div>
                <div className={styles.gamiDivider} />
                <div className={styles.gamiItem}>
                  <div className={styles.streakIcon}>🔥</div>
                  <div className={styles.gamiText}>
                    <span className={styles.gamiLabel}>12-Day</span>
                    <span className={styles.gamiSub}>Streak</span>
                  </div>
                </div>
                <div className={styles.gamiDivider} />
                <div className={styles.gamiItem}>
                  <button className={styles.nextBadgeBtn} onClick={() => triggerComingSoon('Gamification Rewards')}>
                     <div className={styles.lockIcon}><Award size={14} /></div>
                     <span className={styles.gamiSub}>Badge</span>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.headerRight}>
              <div className={styles.searchWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input type="text" placeholder="Search..." className={styles.searchInput} />
              </div>
              
              <button className={styles.notifBtn} onClick={() => triggerComingSoon('Notifications')}>
                <Bell size={20} />
                <span className={styles.notifDot} />
              </button>

              <div className={styles.userProfile}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{userName.split(' ')[0]}</span>
                </div>
                <Avatar src={userAvatar} name={userName} size="sm" />
              </div>
            </div>
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
