/**
 * The marketing site's footer (homepage, /teach, /blog, /terms, /privacy).
 * Coddy-style columns in Duolingo's colours: the Tey mark (alone), the
 * promise, a GET THE APP button, link columns, socials.
 */

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import { TeyMark } from '@/components/brand/TeyMark';
import styles from './WaitlistFooter.module.css';

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: 'Learn',
    links: [
      ['Coding track', '/#tracks'],
      ['AI track', '/#tracks'],
      ['How it works', '/#how-it-works'],
      ['Leagues', '/#leagues'],
      ['Get the app', '/start'],
    ],
  },
  {
    title: 'Creators',
    links: [
      ['Teach on Teyro', '/teach'],
      ['How teaching works', '/teach/how-it-works'],
      ['Teach coding online', '/teach/coding'],
      ['Teach AI online', '/teach/ai'],
      ['Become a creator', '/creator/onboarding'],
      ['Creator log in', '/creator/login'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Blog', '/blog'],
      ['Features', '/features'],
      ['Use cases', '/for'],
      ['Compare', '/alternatives'],
      ['FAQ', '/#faq'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Terms of Use', '/terms'],
      ['Privacy Policy', '/privacy'],
    ],
  },
];

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/teyro', icon: <FaLinkedin /> },
  { label: 'TikTok', href: 'https://tiktok.com/@teyroapp', icon: <FaTiktok /> },
  { label: 'Instagram', href: 'https://instagram.com/teyroapp', icon: <FaInstagram /> },
  { label: 'Facebook', href: 'https://facebook.com/teyroapp', icon: <FaFacebook /> },
  { label: 'X (Twitter)', href: 'https://x.com/teyroapp', icon: <FaXTwitter /> },
];

export default function WaitlistFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Teyro home" className={styles.mark}>
              <TeyMark size={56} />
            </Link>
            <p className={styles.promise}>
              The fun way to finish learning coding and AI: short daily lessons with streaks, leagues and friends.
            </p>
            <Link href="/start" className={styles.getApp}>
              Get the app
            </Link>
          </div>

          <nav className={styles.columns} aria-label="Footer">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className={styles.colTitle}>{col.title}</h2>
                <ul className={styles.list}>
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <div className={styles.socials}>
            {SOCIALS.map((sItem) => (
              <a
                key={sItem.label}
                href={sItem.href}
                className={styles.social}
                aria-label={sItem.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {sItem.icon}
              </a>
            ))}
          </div>
          <p className={styles.meta}>
            © {new Date().getFullYear()} Teyro ·{' '}
            <a href="mailto:support@teyro.app" className={styles.email}>
              support@teyro.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
