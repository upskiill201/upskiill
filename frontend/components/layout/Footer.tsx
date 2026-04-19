'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram, FaApple, FaGooglePlay, FaTiktok, FaCreditCard, FaBuildingColumns } from 'react-icons/fa6';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/instructor')) return null;
  return (
    <footer className={styles.footer}>
      <div className={styles.topContainer}>
        {/* Col 1: Brand */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            <Image 
              src="/logo.png" 
              alt="Upskiill Logo" 
              width={140} 
              height={40} 
              style={{ width: 'auto', height: '36px' }}
            />
          </Link>
          <p className={styles.description}>
            The premier learning platform empowering your career with world-class courses, AI-driven learning tools, and a dynamic freelance marketplace for skills.
          </p>
          <div className={styles.socials}>
            <Link href="https://facebook.com/teyroapp" aria-label="Facebook"><FaFacebook size={20} /></Link>
            <Link href="https://x.com/teyroapp" aria-label="X (Twitter)"><FaXTwitter size={20} /></Link>
            <Link href="https://instagram.com/teyroapp" aria-label="Instagram"><FaInstagram size={20} /></Link>
            <Link href="https://linkedin.com/company/teyro" aria-label="LinkedIn"><FaLinkedin size={20} /></Link>
            <Link href="https://tiktok.com/@teyroapp" aria-label="TikTok"><FaTiktok size={20} /></Link>
          </div>
        </div>

        {/* Col 2: Platform & Features */}
        <div className={styles.linkCol}>
          <h3>Platform & AI</h3>
          <ul>
            <li><Link href="/courses">Browse Courses</Link></li>
            <li><Link href="/ai-tutor">AI Tutor Hub</Link></li>
            <li><Link href="/skill-gap">Skill Gap Analyzer</Link></li>
            <li><Link href="/learning-path">Custom Learning Paths</Link></li>
            <li><Link href="/marketplace">Freelance Marketplace</Link></li>
          </ul>
        </div>

        {/* Col 3: Discover Upskiill */}
        <div className={styles.linkCol}>
          <h3>Discover Upskiill</h3>
          <ul>
            <li><Link href="/app">Get the app</Link></li>
            <li><Link href="/pricing">Plans and Pricing</Link></li>
            <li><Link href="/dashboard">Student Dashboard</Link></li>
            <li><Link href="/affiliate">Affiliate</Link></li>
            <li><Link href="/teach">Teach on Upskiill</Link></li>
          </ul>
        </div>

        {/* Col 4: About & Community */}
        <div className={styles.linkCol}>
          <h3>About & Community</h3>
          <ul>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/community">Community Forums</Link></li>
            <li><Link href="/blog">Blog & News</Link></li>
            <li><Link href="/investors">Investors</Link></li>
          </ul>
        </div>

        {/* Col 5: Support & Legal */}
        <div className={styles.linkCol}>
          <h3>Legal & Accessibility</h3>
          <ul>
            <li><Link href="/help">Help and Support</Link></li>
            <li><Link href="/contact">Contact us</Link></li>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/accessibility">Accessibility statement</Link></li>
            <li><Link href="/sitemap">Sitemap</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.bottomContainer}>
        <div className={styles.paymentMethods}>
          <span>Accepted Payments:</span>
          <div className={styles.paymentIconsRow}>
            <div className={styles.paymentBadge}>MTN MoMo</div>
            <div className={styles.paymentBadge}>Orange MoMo</div>
            <div className={styles.paymentBadge}>M-Pesa</div>
            <FaCreditCard size={26} title="Credit Card" />
            <FaBuildingColumns size={22} title="Bank Transfer" />
          </div>
        </div>

        <div className={styles.appLinks}>
          <button className={styles.appStoreBtn}>
            <FaApple size={22} />
            <div className={styles.appBtnText}>
              <span className={styles.appBtnSmall}>Download on the</span>
              <span className={styles.appBtnBig}>App Store</span>
            </div>
          </button>
          <button className={styles.appStoreBtn}>
            <FaGooglePlay size={20} />
            <div className={styles.appBtnText}>
              <span className={styles.appBtnSmall}>GET IT ON</span>
              <span className={styles.appBtnBig}>Google Play</span>
            </div>
          </button>
        </div>

        <div className={styles.languageSelector}>
          <select className={styles.languageSelect} aria-label="Select Language">
            <option value="en">English (US)</option>
            <option value="fr">Français (FR)</option>
            <option value="es">Español (ES)</option>
          </select>
        </div>
      </div>

      <div className={styles.copyrightRow}>
        <p>&copy; {new Date().getFullYear()} Upskiill Learning Engine. All rights reserved.</p>
      </div>
    </footer>
  );
}
