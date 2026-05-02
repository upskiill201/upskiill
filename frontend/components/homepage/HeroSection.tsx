'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import styles from './HeroSection.module.css';

// ── anim2 (active): Cursor-following neon tubes
const TubesBackground = dynamic(
  () => import('../ui/TubesBackground').then((m) => m.TubesBackground),
  { ssr: false }
);

// ── anim1 (parked): Hyperspeed warp-speed tunnel
// Uncomment + swap TubesBackground below to revert.
// import { teyroHyperspeedPreset } from '../ui/Hyperspeed';
// const Hyperspeed = dynamic(() => import('../ui/Hyperspeed').then((m) => m.Hyperspeed), { ssr: false });

interface HeroSectionProps {
  onOpenModal: () => void;
}

const journeySteps = [
  { num: '01', label: 'Learn a skill',   detail: 'Structured, AI-guided modules'    },
  { num: '02', label: 'Get verified',    detail: 'Credentials real clients trust'   },
  { num: '03', label: 'Start earning',   detail: 'Marketplace access from day one'  },
];

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/webhook/count');
        const data = await res.json();
        setWaitlistCount(data.count);
      } catch (err) {
        setWaitlistCount(0);
      }
    };
    fetchCount();
  }, []);

  return (
    /* 
     * SSR ARCHITECTURE:
     * TubesBackground is the animated canvas layer (client-only, ssr:false).
     * All hero text & CTAs are in a sibling div that is SSR'd immediately,
     * so search engines and initial HTML always contain the full content.
     */
    <div className={styles.heroWrapper}>

      {/* Animated canvas background — loads client-only, no SSR needed */}
      <TubesBackground className={styles.animBg} />

      {/* Vignette overlays — glowOverlay removed (AI slop: redundant purple glow blob) */}
      <div className={styles.vignetteDark}  aria-hidden="true" />
      <div className={styles.vignetteGlass} aria-hidden="true" />
      <div className={styles.bottomFade}    aria-hidden="true" />

      {/* ── SSR'd hero content overlay ── */}
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <span className={styles.badgeDot} />
            In active development · Founding spots are limited
          </motion.div>

          {/* Headline */}
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            Learn smarter, not harder. Build real skills with Teyro.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            Introducing <strong className={styles.brandUnderline}>Teyro</strong>:{' '}
            <strong className={styles.strongVisible}>The Future of Learning</strong>. Because traditional
            platforms are just video libraries that sell hope and certificates. We deliver actual
            achievement, accountability, and real results.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <button
              className={styles.primaryBtn}
              onClick={onOpenModal}
              id="hero-join-waitlist-btn"
            >
              <Zap size={20} className={styles.btnIcon} />
              Join the waitlist
              <span className={styles.liveChip}>
                <span className={styles.liveDot} />
                {waitlistCount === null ? 'Loading...' : waitlistCount === 0 ? 'Be the first to join' : `${waitlistCount.toLocaleString()} joined`}
              </span>
            </button>

            <div className={styles.scrollHint}>
              <span>See what you&apos;re waiting for</span>
              <ChevronDown size={16} className={styles.scrollArrow} />
            </div>
          </motion.div>

          {/* Social proof — real count only, no fake letter-initial avatars */}
          <motion.div
            className={styles.socialProof}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className={styles.proofText}>
              {waitlistCount === null ? (
                'Fetching live count...'
              ) : waitlistCount === 0 ? (
                'Be first — founding access is open now'
              ) : (
                <><strong>{waitlistCount.toLocaleString()}</strong> already on the founding waitlist</>
              )}
            </span>
          </motion.div>
        </motion.div>

        {/* Sequential journey strip — replaces generic icon/title/sub card grid */}
        <motion.div
          className={styles.journeyStrip}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {journeySteps.map(({ num, label, detail }, i) => (
            <div key={num} className={styles.journeyStep}>
              <div className={styles.journeyNum}>{num}</div>
              <div className={styles.journeyLabel}>{label}</div>
              <div className={styles.journeyDetail}>{detail}</div>
              {i < journeySteps.length - 1 && (
                <div className={styles.journeyArrow} aria-hidden="true" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}