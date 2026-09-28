'use client';

/**
 * The marketing site's header (homepage, /teach, /blog, /terms, /privacy).
 *
 * Duolingo/Coddy style: the Tey mark (alone — never locked up with a
 * wordmark), a short nav, LOG IN and GET STARTED. Sticky; gains a hairline
 * once the page scrolls. On the homepage the nav scroll-spies its sections.
 *
 * Anchors are section ids in components/homepage/v3/Sections.tsx.
 */

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { TeyMark } from '@/components/brand/TeyMark';
import styles from './WaitlistHeader.module.css';

interface NavLink {
  label: string;
  /** In-page section on the homepage. */
  anchor?: string;
  href?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Courses', anchor: '#tracks' },
  { label: 'How it works', anchor: '#how-it-works' },
  { label: 'Leagues', anchor: '#leagues' },
  { label: 'Community', anchor: '#community' },
  { label: 'For creators', href: '/teach' },
  { label: 'Blog', href: '/blog' },
];

const START_HREF = '/start';
const LOGIN_HREF = '/login?mode=signin';

export default function WaitlistHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy on the homepage: highlight the section being read.
  useEffect(() => {
    if (pathname !== '/') return;
    const sections = NAV_LINKS.filter((l) => l.anchor)
      .map((l) => document.querySelector(l.anchor!))
      .filter((el): el is Element => Boolean(el));
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) => (b.boundingClientRect.top < a.boundingClientRect.top ? b : a));
        setActiveAnchor('#' + top.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Close the phone menu on navigation; lock the page behind it while open.
  useEffect(() => {
    // Navigation is the external event this reacts to.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const goToAnchor = useCallback(
    (anchor: string) => {
      setMobileOpen(false);
      if (pathname === '/') {
        document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        router.push('/' + anchor);
      }
    },
    [pathname, router],
  );

  const renderLink = (link: NavLink, className: string, activeClass?: string) =>
    link.href ? (
      <Link key={link.label} href={link.href} className={className} onClick={() => setMobileOpen(false)}>
        {link.label}
      </Link>
    ) : (
      <button
        key={link.label}
        type="button"
        className={`${className} ${activeClass && activeAnchor === link.anchor ? activeClass : ''}`}
        onClick={() => goToAnchor(link.anchor!)}
      >
        {link.label}
      </button>
    );

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="Teyro home">
            <TeyMark size={44} priority />
          </Link>

          <nav className={styles.nav} aria-label="Main">
            {NAV_LINKS.map((l) => renderLink(l, styles.navLink, styles.navLinkActive))}
          </nav>

          <div className={styles.actions}>
            <Link href={LOGIN_HREF} className={styles.login}>
              Log in
            </Link>
            <Link href={START_HREF} className={styles.start}>
              Get started
            </Link>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={26} strokeWidth={2.75} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
          <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Menu">
            <div className={styles.panelHead}>
              <Link href="/" aria-label="Teyro home" onClick={() => setMobileOpen(false)}>
                <TeyMark size={40} />
              </Link>
              <button type="button" className={styles.menuBtn} onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={26} strokeWidth={2.75} />
              </button>
            </div>
            <nav className={styles.panelNav} aria-label="Main">
              {NAV_LINKS.map((l) => renderLink(l, styles.panelLink))}
            </nav>
            <div className={styles.panelActions}>
              <Link href={START_HREF} className={styles.startBig}>
                Get started
              </Link>
              <Link href={LOGIN_HREF} className={styles.loginBig}>
                I already have an account
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
