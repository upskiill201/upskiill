'use client';

import React, { createContext, useContext, useState } from 'react';
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
  Rocket
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

  const triggerComingSoon = (feature: string) => {
    setComingSoonFeature(feature);
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
        <aside className={styles.sidebarWrapper}>
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logoLink}>
              <Image 
                src="/logo.png" 
                alt="Upskiill" 
                width={100} 
                height={28} 
                priority 
                className={styles.sidebarLogo}
              />
            </Link>
          </div>
          
          <nav className={styles.nav}>
            {dashboardLinks.map((link) => (
              <Link 
                key={link.id} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link)}
                className={`${styles.navItem} ${link.id === 'dashboard' ? styles.active : ''}`}
              >
                <span className={styles.icon}>{link.icon}</span>
                <span className={styles.label}>{link.label}</span>
                {link.isComingSoon && <span className={styles.comingSoonBadge}>Soon</span>}
              </Link>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <Link href="/dashboard" onClick={(e) => { e.preventDefault(); triggerComingSoon('Settings'); }} className={styles.navItem}>
              <span className={styles.icon}><Settings size={20} /></span>
              <span className={styles.label}>Settings</span>
            </Link>
            <Link href="/login" className={`${styles.navItem} ${styles.logoutBtn}`}>
              <span className={styles.icon}><LogOut size={20} /></span>
              <span className={styles.label}>Logout</span>
            </Link>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className={styles.main}>
          {/* DASHBOARD HEADER */}
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <h1 className={styles.pageTitle}>Dashboard</h1>
              
              {/* Gamification Bar */}
              <div className={styles.gamificationBar}>
                <div className={styles.gamiItem}>
                  <div className={styles.levelBadge}>12</div>
                  <div className={styles.gamiText}>
                    <span className={styles.gamiLabel}>Pro Learner</span>
                    <span className={styles.gamiSub}>Level 12</span>
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
                     <span className={styles.gamiSub}>Next Badge</span>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.headerRight}>
              <div className={styles.searchWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input type="text" placeholder="Search courses..." className={styles.searchInput} />
              </div>
              
              <button className={styles.notifBtn} onClick={() => triggerComingSoon('Notifications')}>
                <Bell size={20} />
                <span className={styles.notifDot} />
              </button>

              <div className={styles.userProfile}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Alex Carter</span>
                  <span className={styles.userRole}>Pro Member</span>
                </div>
                <Avatar src="https://images.unsplash.com/photo-1539109132332-629230573f6a?w=100&h=100&fit=crop" name="Alex Carter" size="md" />
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
