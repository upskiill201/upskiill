'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa6';
import styles from './FinalCTA.module.css';

const socialLinks = [
  { icon: FaTwitter, href: 'https://twitter.com/teyroapp', label: 'Twitter' },
  { icon: FaLinkedin, href: 'https://linkedin.com/company/teyro', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://instagram.com/teyroapp', label: 'Instagram' },
  { icon: FaDiscord, href: 'https://discord.gg/teyro', label: 'Discord' },
];

export default function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className={styles.section} ref={ref}>
      {/* Decorative background number */}
      <span className={styles.counterGlow}>23K</span>

      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.eyebrow}>
            <span className={styles.liveDot} style={{ display: 'inline-block', marginRight: 4 }} />
            Limited Early Access
          </div>

          <h2 className={styles.heading}>
            Join thousands{' '}
            <span className={styles.highlight}>waiting for Teyro</span>
          </h2>

          <p className={styles.subheading}>
            Limited spots for early founders. Free to join.
            Premium features, discounted courses, and a founder badge at launch.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              className={styles.primaryBtn}
              onClick={onOpenModal}
              id="final-cta-btn"
            >
              <Zap size={22} />
              Join 23,543 others — Get early access
              <span className={styles.btnLiveChip}>
                <span className={styles.liveDot} />
                Free
              </span>
            </button>
          </motion.div>

          <p className={styles.subText}>
            No credit card. No spam. Just your spot in line.
          </p>

          <motion.div
            className={styles.socialRow}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <span className={styles.socialLabel}>Follow for updates:</span>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}