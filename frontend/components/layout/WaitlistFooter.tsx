import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram, FaTiktok } from 'react-icons/fa6';
import styles from './WaitlistFooter.module.css';

export default function WaitlistFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* TOP SECTION */}
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            {/* Stylistic Text Logo */}
            <Link href="/" className={styles.logoText}>
              Teyro<span>.</span>
            </Link>
            <p className={styles.tagline}>
              Personalised AI-Powered Learning That Actually Works.
            </p>
          </div>

          <div className={styles.linksWrapper}>
            <div className={styles.linkCol}>
              <h4>Product</h4>
              <ul>
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#faq">FAQs</Link></li>
              </ul>
            </div>

            <div className={styles.linkCol}>
              <h4>Legal</h4>
              <ul>
                <li><Link href="/terms">Terms of Use</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION - SOCIAL BLOCKS */}
        <div className={styles.socialSection}>
          <Link href="https://linkedin.com/company/teyro" className={styles.socialBox} aria-label="LinkedIn">
            <FaLinkedin size={20} />
            <span className={styles.socialName}>LinkedIn</span>
          </Link>
          
          <Link href="https://tiktok.com/@teyroapp" className={styles.socialBox} aria-label="TikTok">
            <FaTiktok size={20} />
            <span className={styles.socialName}>TikTok</span>
          </Link>

          <Link href="https://instagram.com/teyroapp" className={styles.socialBox} aria-label="Instagram">
            <FaInstagram size={20} />
            <span className={styles.socialName}>Instagram</span>
          </Link>

          <Link href="https://facebook.com/teyroapp" className={styles.socialBox} aria-label="Facebook">
            <FaFacebook size={20} />
            <span className={styles.socialName}>Facebook</span>
          </Link>

          <Link href="https://x.com/teyroapp" className={styles.socialBox} aria-label="X (Twitter)">
            <FaXTwitter size={20} />
            <span className={styles.socialName}>X (Twitter)</span>
          </Link>
        </div>

        {/* BOTTOM SECTION */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>&copy; 2026 Teyro. All rights reserved.</p>
          <a href="mailto:support@teyro.app" className={styles.contactEmail}>support@teyro.app</a>
        </div>
        
      </div>
    </footer>
  );
}
