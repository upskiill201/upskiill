'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import styles from './WaitlistHeader.module.css';

const NAV_LINKS = [
  { label: 'Features', anchor: '#features' },
  { label: 'Solutions', anchor: '#solutions' },
  { label: 'Marketplace', anchor: '#marketplace' },
  { label: 'FAQ', anchor: '#faq' },
];

export default function WaitlistHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll to toggle glassmorphism
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll(); // initial check
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /**
   * Handle nav link clicks.
   * If we're on the homepage ('/'), smooth-scroll to the anchor.
   * If we're on a legal page ('/terms', '/privacy'), navigate to homepage with anchor.
   */
  const handleNavClick = useCallback((anchor: string) => {
    setMobileOpen(false);
    
    if (pathname === '/') {
      // Smooth scroll to section on current page
      const el = document.querySelector(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to homepage with anchor
      router.push('/' + anchor);
    }
  }, [pathname, router]);

  const goToJoin = useCallback(() => {
    setMobileOpen(false);
    router.push('/join');
  }, [router]);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
      >
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/Teyro Logo.png"
              alt="Teyro Logo"
              width={220}
              height={66}
              priority
              style={{
                width: 'auto',
                height: '56px',
                objectFit: 'contain',
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {NAV_LINKS.map(({ label, anchor }) => (
              <button
                key={label}
                className={styles.navLink}
                onClick={() => handleNavClick(anchor)}
                type="button"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Desktop Right: Login + Get Started */}
          <div className={styles.rightSection}>
            <button
              className={styles.loginBtn}
              onClick={goToJoin}
              type="button"
            >
              Login
            </button>
            <button
              className={styles.getStartedBtn}
              onClick={goToJoin}
              type="button"
            >
              Get Started
              <ChevronRight size={16} className={styles.btnIcon} />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={styles.hamburgerBtn}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            type="button"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ── Mobile Navigation Panel ── */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className={styles.mobileOverlay}
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div className={styles.mobilePanel}>
            <div className={styles.mobileHeader}>
              <Link href="/" className={styles.logoLink} onClick={() => setMobileOpen(false)}>
                <Image
                  src="/Teyro Logo.png"
                  alt="Teyro Logo"
                  width={200}
                  height={60}
                  style={{
                    width: 'auto',
                    height: '46px',
                    objectFit: 'contain',
                  }}
                />
              </Link>
              <button
                className={styles.closeBtn}
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                type="button"
              >
                <X size={24} />
              </button>
            </div>

            <nav className={styles.mobileNavLinks}>
              {NAV_LINKS.map(({ label, anchor }) => (
                <button
                  key={label}
                  className={styles.mobileNavLink}
                  onClick={() => handleNavClick(anchor)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className={styles.mobileDivider} />

            <div className={styles.mobileAuthButtons}>
              <button
                className={styles.mobileLoginBtn}
                onClick={goToJoin}
                type="button"
              >
                Login
              </button>
              <button
                className={styles.mobileGetStartedBtn}
                onClick={goToJoin}
                type="button"
              >
                Get Started
              <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
