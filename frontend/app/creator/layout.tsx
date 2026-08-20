'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaHouse,
  FaGraduationCap,
  FaUsers,
  FaChartSimple,
  FaSackDollar,
  FaStar,
  FaWallet,
  FaFolderOpen,
  FaBullhorn,
  FaGear,
  FaBell,
  FaChevronDown,
  FaPlus,
  FaWandMagicSparkles,
  FaRocket,
  FaArrowRightFromBracket,
  FaBars,
  FaXmark,
  FaLayerGroup
} from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { getCachedUser, setCachedUser } from '@/lib/user-cache';
import styles from './Creator.module.css';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';

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
  { id: 'dashboard', label: 'Dashboard', href: '/creator', icon: <FaHouse size={17} /> },
  { id: 'courses', label: 'Courses', href: '/creator/courses', icon: <FaGraduationCap size={17} /> },
  { id: 'students', label: 'Students', href: '/creator/students', icon: <FaUsers size={17} />, isComingSoon: true },
  { id: 'analytics', label: 'Analytics', href: '/creator/analytics', icon: <FaChartSimple size={17} />, isComingSoon: true },
  { id: 'earnings', label: 'Earnings', href: '/creator/earnings', icon: <FaSackDollar size={17} />, isComingSoon: true },
  { id: 'reviews', label: 'Reviews', href: '/creator/reviews', icon: <FaStar size={17} />, isComingSoon: true },
  { id: 'payouts', label: 'Payouts', href: '/creator/payouts', icon: <FaWallet size={17} />, isComingSoon: true },
  { id: 'resources', label: 'Resources', href: '/creator/resources', icon: <FaFolderOpen size={17} />, isComingSoon: true },
  { id: 'announcements', label: 'Announcements', href: '/creator/announcements', icon: <FaBullhorn size={17} />, isComingSoon: true },
  { id: 'settings', label: 'Settings', href: '/creator/settings', icon: <FaGear size={17} /> },
];

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  const [creatorName, setCreatorName] = useState<string | null>(null);
  const [creatorAvatar, setCreatorAvatar] = useState<string | null>(null);
  const [hasStudentAccess, setHasStudentAccess] = useState<boolean>(false);
  const [hasCreatorAccess, setHasCreatorAccess] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    // Creator auth pages (/creator/login, /creator/signup, etc.) are inside the /creator/* route
    // tree so this layout wraps them. We MUST NOT run auth checks on those pages — doing so
    // causes a redirect loop: layout fires /api/auth/me → 401 → redirect to /creator/login
    // → layout fires again → infinite refresh.
    const CREATOR_AUTH_PATHS = [
      '/creator/login', '/creator/signup', '/creator/onboarding',
      '/creator/forgot-password', '/creator/reset-password',
      '/creator/verify-pending', '/creator/verify-failed',
    ];
    if (CREATOR_AUTH_PATHS.some((p) => pathname?.startsWith(p))) {
      return; // Auth pages manage their own session state
    }

    // Safely hydrate cached user on client mount to prevent SSR hydration mismatch
    const cached = getCachedUser();
    if (cached?.fullName) setCreatorName(cached.fullName);
    if (cached?.avatarUrl) setCreatorAvatar(cached.avatarUrl);
    if (cached?.hasStudentAccess !== undefined) setHasStudentAccess(cached.hasStudentAccess);
    if (cached?.hasCreatorAccess !== undefined) setHasCreatorAccess(cached.hasCreatorAccess);

    // Fetch live user data for sidebar
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.fullName) setCreatorName(data.fullName);
          if (data.profile?.avatarUrl || data.avatarUrl) setCreatorAvatar(data.profile?.avatarUrl || data.avatarUrl);
          if (data.hasStudentAccess !== undefined) setHasStudentAccess(data.hasStudentAccess);
          if (data.hasCreatorAccess !== undefined) setHasCreatorAccess(data.hasCreatorAccess);
          setCachedUser(data);

          // STRICT ROLE-BASED GATEKEEPING (PRD AUTH-03)
          // Pure students with no creator access should not be in the Creator Studio.
          // Use window.location.href (hard navigation) to prevent any router-level loop.
          if (!data.hasCreatorAccess) {
            window.location.href = '/dashboard';
            return;
          }
        } else if (res.status === 401) {
          // No valid session — send to creator login
          window.location.href = '/creator/login';
          return;
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
  }, [pathname]);

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
  const isAuthPage = pathname.includes('/login') || pathname.includes('/signup') || pathname.includes('/onboarding') || pathname.includes('/create') || pathname.startsWith('/creator/builder') || pathname.endsWith('/manage') || pathname.includes('/forgot-password') || pathname.includes('/reset-password') || pathname.includes('/verify-pending') || pathname.includes('/verify-failed');

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
              <Image src="/teyro-logo-blue.png" alt="Teyro" width={100} height={28} priority className={styles.sidebarLogo} style={{ width: 'auto', height: 'auto' }} />
              <span className={styles.creatorBadge}>Studio</span>
            </Link>
            <button className={styles.mobileCloseBtn} onClick={() => setIsMobileSidebarOpen(false)} aria-label="Close sidebar">
              <FaXmark size={20} />
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
                    <div className={styles.navItemLeft}>
                      <span className={styles.icon}>{link.icon}</span>
                      <span className={styles.label}>{link.label}</span>
                    </div>
                    {link.isComingSoon && (
                      <span className={styles.soonBadge}>Soon</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Role switcher — only visible to dual-role users */}
          <div style={{ padding: '0 14px 16px' }}>
            <RoleSwitcher
              activeRole="INSTRUCTOR"
              hasStudentAccess={hasStudentAccess}
              hasCreatorAccess={hasCreatorAccess}
            />
          </div>
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
                  <FaBars size={18} />
                </button>
                <div className={styles.pageTitleWrapper}>
                  <div className={styles.titleIconBox}>
                    <FaLayerGroup size={17} />
                  </div>
                  <h1 className={styles.pageTitle}>Creator Studio</h1>
                </div>
              </div>

              <div className={styles.headerRight}>
                <button className={styles.headerCreateBtn} onClick={() => router.push('/creator/create')}>
                  <FaPlus size={13} />
                  <span>Create Course</span>
                </button>

                <div className={styles.headerControls}>
                  <button className={styles.notifBtn} onClick={() => triggerComingSoon('Notifications')} aria-label="Notifications">
                    <FaBell size={17} />
                    <span className={styles.notifBadge}>3</span>
                  </button>

                  {/* Profile Wrapper - using a div to handle outside click */}
                  <div className={styles.creatorProfileWrapper} ref={dropdownRef}>
                    <div 
                      className={styles.userProfile}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <Avatar src={creatorAvatar || undefined} name={creatorName || 'Creator'} size="sm" />
                      <div className={styles.userInfo}>
                        <div className={styles.userNameRow}>
                          <span className={styles.userName}>{creatorName || 'Creator'}</span>
                          <FaChevronDown size={11} className={styles.userChevron} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                        </div>
                        <span className={styles.userRole}>Instructor</span>
                      </div>
                    </div>

                    {isMounted && isDropdownOpen && (
                      <div className={styles.profileDropdownMenu}>
                        <Link href="/creator/settings" className={styles.profileDropdownItem} onClick={() => setIsDropdownOpen(false)}>
                          <FaGear size={15} /> Profile & Settings
                        </Link>
                        <button className={styles.profileDropdownLogout} onClick={handleLogout}>
                          <FaArrowRightFromBracket size={15} /> Logout
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
            <FaWandMagicSparkles size={32} className={styles.sparkleIcon} />
          </div>
          <h2 className={styles.modalTitle}>{comingSoonFeature} is Coming Soon!</h2>
          <p className={styles.modalDescription}>
            We&apos;re precision-engineering the <strong>{comingSoonFeature}</strong> module
            for creators. It will be available in the next platform update — stay tuned!
          </p>
          <div className={styles.modalActions}>
            <Button variant="primary" onClick={() => setComingSoonFeature(null)} leftIcon={<FaRocket size={14} />}>
              Got it!
            </Button>
          </div>
        </div>
      </Modal>
    </ComingSoonContext.Provider>
  );
}