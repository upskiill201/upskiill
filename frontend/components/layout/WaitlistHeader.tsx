'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import styles from './WaitlistHeader.module.css';

interface NavLink {
  label: string;
  /** In-page section anchor (homepage) */
  anchor?: string;
  /** Standalone route (navigates via <Link>) */
  href?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'How it works', anchor: '#how-it-works' },
  { label: 'Rewards', anchor: '#rewards' },
  { label: 'Leagues', anchor: '#leagues' },
  { label: 'Community', anchor: '#community' },
  { label: 'Teach', anchor: '#teach' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', anchor: '#faq' },
];

export default function WaitlistHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  // Track scroll to toggle glassmorphism
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll(); // initial check
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight whichever section is currently in view, so the
  // nav reflects where on the page you actually are, not just a static list.
  useEffect(() => {
    if (pathname !== '/') {
      setActiveAnchor(null);
      return;
    }
    const anchors = NAV_LINKS.filter((l) => l.anchor).map((l) => l.anchor!);
    const sections = anchors
      .map((a) => document.querySelector(a))
      .filter((el): el is Element => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Prefer the one closest to the top of the viewport, matching the
        // section the visitor is actually reading rather than one merely
        // peeking into view at the bottom edge.
        const top = visible.reduce((best, e) => (e.boundingClientRect.top < best.boundingClientRect.top ? e : best));
        setActiveAnchor('#' + top.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

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

  /**
   * "Login" is the application-entry CTA, not a waitlist-conversion one — it
   * goes to the install gateway, which hands a returning learner to
   * /onboarding/0 (sign-in) and a new one to install-then-onboard.
   *
   * "Get Started" goes to the same place. It used to point at the /join
   * waitlist, which was correct while Teyro was pre-launch; now that the
   * homepage sells the live product, sending the header CTA to a waitlist
   * form would contradict every button on the page.
   */
  const goToStart = useCallback(() => {
    setMobileOpen(false);
    router.push('/start');
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
              src="/teyro-logo-blue.png"
              alt="Teyro Logo"
              width={220}
              height={66}
              priority
              style={{
                width: 'auto', aspectRatio: '220 / 66',
                height: '56px',
                objectFit: 'contain',
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {NAV_LINKS.map((link) =>
              link.href ? (
                <Link key={link.label} href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  className={`${styles.navLink} ${activeAnchor === link.anchor ? styles.navLinkActive : ''}`}
                  onClick={() => handleNavClick(link.anchor ?? '')}
                  type="button"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          {/* Desktop Right: Login + Get Started */}
          <div className={styles.rightSection}>
            <button
              className={styles.loginBtn}
              onClick={goToStart}
              type="button"
            >
              Login
            </button>
            <button
              className={styles.getStartedBtn}
              onClick={goToStart}
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
            aria-expanded={mobileOpen}
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
                  src="/teyro-logo-blue.png"
                  alt="Teyro Logo"
                  width={200}
                  height={60}
                  style={{
                    width: 'auto', aspectRatio: '200 / 60',
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
              {NAV_LINKS.map((link) =>
                link.href ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    className={styles.mobileNavLink}
                    onClick={() => handleNavClick(link.anchor ?? '')}
                    type="button"
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>

            <div className={styles.mobileDivider} />

            <div className={styles.mobileAuthButtons}>
              <button
                className={styles.mobileLoginBtn}
                onClick={goToStart}
                type="button"
              >
                Login
              </button>
              <button
                className={styles.mobileGetStartedBtn}
                onClick={goToStart}
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
