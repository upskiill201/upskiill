'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  PlaySquare,
  Users,
  BarChart2,
  DollarSign,
  Star,
  Wallet,
  FolderOpen,
  Megaphone,
  Settings,
  Bell,
  ChevronDown,
  Plus,
  Sparkles,
  Rocket,
  LogOut,
  Menu,
  X as CloseIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import styles from './Creator.module.css';

// ─── COMING SOON CONTEXT ───
interface ComingSoonContextType {
  triggerComingSoon: (feature: string) => void;
}

const ComingSoonContext = createContext<ComingSoonContextType | undefined>(undefined);

export const useComingSoon = () => {
  const context = useContext(ComingSoonContext);
  if (!context) throw new Error('useComingSoon must be used within CreatorLayout');
  return context;
};

interface NavLink {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  isComingSoon?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/creator', icon: <Home size={18} /> },
  { id: 'courses', label: 'Courses', href: '/creator/courses', icon: <PlaySquare size={18} /> },
  { id: 'students', label: 'Students', href: '/creator/students', icon: <Users size={18} />, isComingSoon: true },
  { id: 'analytics', label: 'Analytics', href: '/creator/analytics', icon: <BarChart2 size={18} /> },
  { id: 'earnings', label: 'Earnings', href: '/creator/earnings', icon: <DollarSign size={18} />, isComingSoon: true },
  { id: 'reviews', label: 'Reviews', href: '/creator/reviews', icon: <Star size={18} />, isComingSoon: true },
  { id: 'payouts', label: 'Payouts', href: '/creator/payouts', icon: <Wallet size={18} />, isComingSoon: true },
  { id: 'resources', label: 'Resources', href: '/creator/resources', icon: <FolderOpen size={18} />, isComingSoon: true },
  { id: 'announcements', label: 'Announcements', href: '/creator/announcements', icon: <Megaphone size={18} />, isComingSoon: true },
  { id: 'settings', label: 'Settings', href: '/creator/settings', icon: <Settings size={18} /> },
];

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  const [creatorName, setCreatorName] = useState('Creator');
  const [creatorAvatar, setCreatorAvatar] = useState('https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&q=80');

  useEffect(() => {
    setIsMounted(true);
    
    // Fetch live user data for sidebar
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          if (data.fullName) setCreatorName(data.fullName);
          if (data.profile?.avatarUrl) setCreatorAvatar(data.profile.avatarUrl);
        }
      } catch (err) {
        console.warn('Failed to fetch user data for sidebar', err);
      }
    };
    fetchUser();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerComingSoon = (feature: string) => setComingSoonFeature(feature);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore network errors — still redirect
    }
    window.location.href = '/creator/login';
  };

  // Auth pages, the full-screen create wizard, and the curriculum builder do not need the sidebar layout
  // Note: /lesson-builder needs the sidebar, so we use exact startsWith for the curriculum builder
  const isAuthPage = pathname.includes('/login') || pathname.includes('/signup') || pathname.includes('/onboarding') || pathname.includes('/create') || pathname.startsWith('/creator/builder') || pathname.endsWith('/manage') || pathname.includes('/forgot-password') || pathname.includes('/reset-password');

  if (isAuthPage) {
    return (
      <ComingSoonContext.Provider value={{ triggerComingSoon }}>
        {children}
      </ComingSoonContext.Provider>
    );
  }

  return (
    <ComingSoonContext.Provider value={{ triggerComingSoon }}>
      <div className={styles.dashboardContainer}>
        {/* ─── SIDEBAR ─── */}
        <aside className={`${styles.sidebarWrapper} ${isMobileSidebarOpen ? styles.mobileSidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <Link href="/creator" className={styles.logoLink} onClick={() => setIsMobileSidebarOpen(false)}>
              <Image src="/teyro-logo-blue.png" alt="Teyro" width={110} height={32} priority className={styles.sidebarLogo} />
            </Link>
            <button className={styles.mobileCloseBtn} onClick={() => setIsMobileSidebarOpen(false)} aria-label="Close sidebar">
              <CloseIcon size={24} />
            </button>
          </div>

          <nav className={styles.nav}>
            <div className={styles.navItemsContainer}>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.id !== 'dashboard' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      setIsMobileSidebarOpen(false);
                      if (link.isComingSoon) {
                        e.preventDefault();
                        triggerComingSoon(link.label);
                      }
                    }}
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                  >
                    <span className={styles.icon}>{link.icon}</span>
                    <span className={styles.label}>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isMobileSidebarOpen && (
          <div className={styles.sidebarOverlay} onClick={() => setIsMobileSidebarOpen(false)} />
        )}

        {/* ─── MAIN AREA ─── */}
        <main className={styles.main}>
          {/* Header - Hidden in Curriculum Builder and Lesson Builder modes so they can provide their own edge-to-edge header */}
          {!pathname.includes('/builder') && !pathname.includes('/lesson-builder') && (
            <header className={styles.header}>
              <div className={styles.headerLeft}>
                <button className={styles.hamburgerBtn} onClick={() => setIsMobileSidebarOpen(true)} aria-label="Open navigation menu">
                  <Menu size={24} />
                </button>
                <div className={styles.pageTitleWrapper}>
                  <BarChart2 size={20} className={styles.titleIcon} />
                  <h1 className={styles.pageTitle}>Creator Studio</h1>
                </div>
              </div>

              <div className={styles.headerRight}>
                <button className={styles.headerCreateBtn} onClick={() => router.push('/creator/create')}>
                  <Plus size={16} />
                  <span>Create New Course</span>
                </button>

                <div className={styles.headerControls}>
                  <button className={styles.notifBtn} onClick={() => triggerComingSoon('Notifications')} aria-label="Notifications">
                    <Bell size={20} />
                    <span className={styles.notifBadge}>3</span>
                  </button>

                  {/* Profile Wrapper - using a div to handle outside click */}
                  <div className={styles.creatorProfileWrapper} ref={dropdownRef}>
                    <div 
                      className={styles.userProfile}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <Avatar src={creatorAvatar} name={creatorName} size="sm" />
                      <div className={styles.userInfo}>
                        <div className={styles.userNameRow}>
                          <span className={styles.userName}>{creatorName}</span>
                          <ChevronDown size={14} className={styles.userChevron} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                        </div>
                        <span className={styles.userRole}>Instructor</span>
                      </div>
                    </div>

                    {isMounted && isDropdownOpen && (
                      <div className={styles.profileDropdownMenu}>
                        <Link href="/creator/settings" className={styles.profileDropdownItem} onClick={() => setIsDropdownOpen(false)}>
                          <Settings size={16} /> Profile & Settings
                        </Link>
                        <button className={styles.profileDropdownLogout} onClick={handleLogout}>
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>
          )}

          <div className={styles.content} style={pathname.includes('/lesson-builder') ? { padding: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' } : undefined}>{children}</div>
        </main>
      </div>

      {/* ─── GLOBAL COMING SOON MODAL ─── */}
      <Modal isOpen={!!comingSoonFeature} onClose={() => setComingSoonFeature(null)} size="md">
        <div className={styles.modalBody}>
          <div className={styles.modalIconWrapper}>
            <Sparkles size={36} className={styles.sparkleIcon} />
          </div>
          <h2 className={styles.modalTitle}>{comingSoonFeature} is Coming Soon!</h2>
          <p className={styles.modalDescription}>
            We&apos;re precision-engineering the <strong>{comingSoonFeature}</strong> module
            for creators. It will be available in the next platform update — stay tuned!
          </p>
          <div className={styles.modalActions}>
            <Button variant="primary" onClick={() => setComingSoonFeature(null)} leftIcon={<Rocket size={16} />}>
              Got it!
            </Button>
          </div>
        </div>
      </Modal>
    </ComingSoonContext.Provider>
  );
}