'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  BookOpen,
  Users,
  DollarSign,
  Settings,
  Bell,
  Search,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Rocket,
  Plus,
} from 'lucide-react';
import {
  FaGraduationCap,
  FaVideo,
  FaComments,
  FaClipboardList,
  FaPencilAlt,
  FaStar,
  FaEnvelope,
  FaChartLine,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import styles from './Instructor.module.css';

// ─── COMING SOON CONTEXT ───
interface ComingSoonContextType {
  triggerComingSoon: (feature: string) => void;
}

const ComingSoonContext = createContext<ComingSoonContextType | undefined>(undefined);

export const useComingSoon = () => {
  const context = useContext(ComingSoonContext);
  if (!context) throw new Error('useComingSoon must be used within InstructorLayout');
  return context;
};

// ─── INSTRUCTOR DATA (from seeded DB — Alex Rivera) ───
const INSTRUCTOR = {
  name: 'Alex Rivera',
  email: 'alex@upskiill.com',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&q=80',
  role: 'INSTRUCTOR',
};

interface NavLink {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  isComingSoon?: boolean;
  badge?: number;
  section?: string;
}

const NAV_LINKS: NavLink[] = [
  // Main
  { id: 'overview', label: 'Overview', href: '/instructor', icon: <LayoutGrid size={18} />, section: 'main' },
  { id: 'analytics', label: 'Analytics', href: '/instructor/analytics', icon: <FaChartLine size={16} />, section: 'main' },

  // Content
  { id: 'courses', label: 'My Courses', href: '/instructor/courses', icon: <BookOpen size={18} />, isComingSoon: true, section: 'content' },
  { id: 'videos', label: 'Video Library', href: '/instructor/videos', icon: <FaVideo size={16} />, isComingSoon: true, section: 'content' },
  { id: 'quizzes', label: 'Quizzes', href: '/instructor/quizzes', icon: <FaPencilAlt size={16} />, isComingSoon: true, section: 'content' },
  { id: 'assignments', label: 'Assignments', href: '/instructor/assignments', icon: <FaClipboardList size={16} />, isComingSoon: true, badge: 4, section: 'content' },

  // Community
  { id: 'students', label: 'Students', href: '/instructor/students', icon: <Users size={18} />, isComingSoon: true, section: 'community' },
  { id: 'discussions', label: 'Discussions', href: '/instructor/discussions', icon: <FaComments size={16} />, isComingSoon: true, badge: 7, section: 'community' },
  { id: 'reviews', label: 'Reviews', href: '/instructor/reviews', icon: <FaStar size={16} />, isComingSoon: true, section: 'community' },
  { id: 'messages', label: 'Messages', href: '/instructor/messages', icon: <FaEnvelope size={16} />, isComingSoon: true, badge: 2, section: 'community' },

  // Business
  { id: 'earnings', label: 'Earnings', href: '/instructor/earnings', icon: <DollarSign size={18} />, isComingSoon: true, section: 'business' },
  { id: 'students-progress', label: 'Student Progress', href: '/instructor/progress', icon: <FaGraduationCap size={16} />, isComingSoon: true, section: 'business' },
];

const SECTION_LABELS: Record<string, string> = {
  main: 'OVERVIEW',
  content: 'CONTENT',
  community: 'COMMUNITY',
  business: 'BUSINESS',
};

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [instructorName, setInstructorName] = useState(INSTRUCTOR.name);
  const [instructorAvatar, setInstructorAvatar] = useState(INSTRUCTOR.avatar);

  const triggerComingSoon = (feature: string) => setComingSoonFeature(feature);

  // Try to get real auth data and protect route
  useEffect(() => {
    const isAuthPageEnv = window.location.pathname.includes('/login') || window.location.pathname.includes('/signup');
    if (isAuthPageEnv) return; // Don't redirect if already on login/signup page

    const fetchMe = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) {
          window.location.href = '/instructor/login';
          return;
        }
        
        const data = await res.json();
        
        // Strict Role Check: Kick standard students trying to access Instructor Studio
        if (data.role && data.role !== 'INSTRUCTOR') {
          window.location.href = '/dashboard';
          return;
        }

        if (data?.fullName) setInstructorName(data.fullName);
        if (data?.avatarUrl) setInstructorAvatar(data.avatarUrl);
      } catch {
        window.location.href = '/instructor/login';
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
    window.location.href = '/instructor/login';
  };

  const handleLinkClick = (e: React.MouseEvent, link: NavLink) => {
    if (link.isComingSoon) {
      e.preventDefault();
      triggerComingSoon(link.label);
    }
  };

  const isActive = (link: NavLink) => {
    if (link.id === 'overview') return pathname === '/instructor';
    if (link.id === 'analytics') return pathname === '/instructor/analytics';
    return false;
  };

  // Group links by section
  const sections = ['main', 'content', 'community', 'business'];

  // Auth pages do not need the sidebar layout
  const isAuthPage = pathname.includes('/login') || pathname.includes('/signup');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <ComingSoonContext.Provider value={{ triggerComingSoon }}>
      <div className={styles.dashboardContainer}>

        {/* ─── SIDEBAR ─── */}
        <aside className={`${styles.sidebarWrapper} ${isSidebarCollapsed ? styles.collapsed : ''} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>

          {/* Header */}
          <div className={styles.sidebarHeader}>
            <div className={styles.logoContainer}>
              <Link href="/" className={styles.logoLink}>
                {!isSidebarCollapsed ? (
                  <Image src="/logo.png" alt="Upskiill" width={100} height={28} priority className={styles.sidebarLogo} />
                ) : (
                  <div className={styles.compactLogo}>U</div>
                )}
              </Link>
            </div>
            <button className={styles.sidebarToggle} onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} aria-label="Toggle Sidebar">
              {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
            <button className={styles.mobileClose} onClick={() => setIsMobileMenuOpen(false)} aria-label="Close">
              <X size={22} />
            </button>
          </div>

          {/* Role Badge */}
          {!isSidebarCollapsed && (
            <div className={styles.roleBadge}>
              <FaGraduationCap size={13} />
              <span>Instructor Studio</span>
            </div>
          )}

          {/* Nav — grouped by section */}
          <nav className={styles.nav}>
            {sections.map((section) => {
              const links = NAV_LINKS.filter((l) => l.section === section);
              return (
                <div key={section} className={styles.navSection}>
                  {!isSidebarCollapsed && (
                    <span className={styles.navSectionLabel}>{SECTION_LABELS[section]}</span>
                  )}
                  {links.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={(e) => { handleLinkClick(e, link); setIsMobileMenuOpen(false); }}
                      className={`${styles.navItem} ${isActive(link) ? styles.active : ''}`}
                      title={isSidebarCollapsed ? link.label : ''}
                    >
                      <span className={styles.icon}>{link.icon}</span>
                      {!isSidebarCollapsed && (
                        <>
                          <span className={styles.label}>{link.label}</span>
                          {link.badge ? (
                            <span className={styles.navBadge}>{link.badge}</span>
                          ) : link.isComingSoon ? (
                            <span className={styles.comingSoonBadge}>Soon</span>
                          ) : null}
                        </>
                      )}
                      {isSidebarCollapsed && link.badge && (
                        <span className={styles.navBadgeCollapsed}>{link.badge}</span>
                      )}
                    </Link>
                  ))}
                </div>
              );
            })}
          </nav>

          {/* Create Course CTA */}
          {!isSidebarCollapsed && (
            <div className={styles.createCTAWrapper}>
              <button
                className={styles.createCTABtn}
                onClick={() => triggerComingSoon('Course Creator')}
              >
                <Plus size={15} />
                <span>Create New Course</span>
              </button>
            </div>
          )}

          {/* Footer */}
          <div className={styles.sidebarFooter}>
            <Link
              href="/instructor"
              onClick={(e) => { e.preventDefault(); triggerComingSoon('Settings'); setIsMobileMenuOpen(false); }}
              className={styles.navItem}
              title={isSidebarCollapsed ? 'Settings' : ''}
            >
              <span className={styles.icon}><Settings size={18} /></span>
              {!isSidebarCollapsed && <span className={styles.label}>Settings</span>}
            </Link>
            <button
              onClick={handleLogout}
              className={`${styles.navItem} ${styles.logoutBtn}`}
              title={isSidebarCollapsed ? 'Logout' : ''}
            >
              <span className={styles.icon}><LogOut size={18} /></span>
              {!isSidebarCollapsed && <span className={styles.label}>Logout</span>}
            </button>
          </div>
        </aside>

        {isMobileMenuOpen && <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} />}

        {/* ─── MAIN AREA ─── */}
        <main className={`${styles.main} ${isSidebarCollapsed ? styles.expanded : ''}`}>

          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <button className={styles.mobileToggle} onClick={() => setIsMobileMenuOpen(true)} aria-label="Open Menu">
                <Menu size={22} />
              </button>
              <h1 className={styles.pageTitle}>Instructor Studio</h1>
            </div>

            <div className={styles.headerRight}>
              <div className={styles.searchWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input type="text" placeholder="Search courses, students..." className={styles.searchInput} />
              </div>

              <button className={styles.createBtn} onClick={() => triggerComingSoon('Course Creator')}>
                <Plus size={15} />
                <span>New Course</span>
              </button>

              <button className={styles.notifBtn} onClick={() => triggerComingSoon('Notifications')}>
                <Bell size={18} />
                <span className={styles.notifDot} />
              </button>

              <div className={styles.userProfile}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{instructorName.split(' ')[0]}</span>
                  <span className={styles.userRole}>Instructor</span>
                </div>
                <Avatar src={instructorAvatar} name={instructorName} size="sm" />
              </div>
            </div>
          </header>

          <div className={styles.content}>{children}</div>
        </main>

        {/* ─── COMING SOON MODAL ─── */}
        <Modal isOpen={!!comingSoonFeature} onClose={() => setComingSoonFeature(null)} size="md">
          <div className={styles.modalBody}>
            <div className={styles.modalIconWrapper}>
              <Sparkles size={36} className={styles.sparkleIcon} />
            </div>
            <h2 className={styles.modalTitle}>{comingSoonFeature} is Coming Soon!</h2>
            <p className={styles.modalDescription}>
              We&apos;re precision-engineering the <strong>{comingSoonFeature}</strong> module
              for instructors. It will be available in the next platform update — stay tuned!
            </p>
            <div className={styles.modalActions}>
              <Button variant="primary" onClick={() => setComingSoonFeature(null)} leftIcon={<Rocket size={16} />}>
                Got it!
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </ComingSoonContext.Provider>
  );
}
