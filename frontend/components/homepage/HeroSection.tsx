'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Zap, BookOpen, Brain, TrendingUp, Award } from 'lucide-react';
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

const previewCards = [
  { icon: Brain,      title: 'AI Tutor',   sub: 'Always available when stuck' },
  { icon: BookOpen,   title: 'Your Path',  sub: 'Personalized in minutes'     },
  { icon: TrendingUp, title: 'Earn Fast',  sub: 'Marketplace from day 1'      },
  { icon: Award,      title: 'Verified',   sub: 'Credentials that matter'     },
];

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    /* TubesBackground fills 100vh; all hero content is passed as children
       and rendered in the z-10 overlay div inside TubesBackground */
    <TubesBackground className={styles.heroWrapper}>
      {/* Vignette + masked glass + glow overlays */}
      <div className={styles.vignetteDark}  aria-hidden="true" />
      <div className={styles.vignetteGlass} aria-hidden="true" />
      <div className={styles.glowOverlay} aria-hidden="true" />
      {/* Bottom fade to next section */}
      <div className={styles.bottomFade}  aria-hidden="true" />

      {/* ── Centred content ── */}
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
            Now building — join before launch for exclusive perks
          </motion.div>

          {/* Headline */}
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            See the learning you have.{' '}
            <span className={styles.highlight}>Build the future you want.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            Introducing <strong className={styles.brandUnderline}>Teyro</strong>:{' '}
            <strong className={styles.strongVisible}>EdTech 2.0</strong>. Because traditional
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
                23,543 joined
              </span>
            </button>

            <div className={styles.scrollHint}>
              <span>See what you&apos;re waiting for</span>
              <ChevronDown size={16} className={styles.scrollArrow} />
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className={styles.socialProof}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.avatars}>
              {['A', 'M', 'Z', 'K', 'F'].map((char, i) => (
                <span key={i} className={styles.avatar}>{char}</span>
              ))}
            </div>
            <span className={styles.proofText}>
              <strong>23,543</strong> students &amp; instructors already waiting
            </span>
          </motion.div>
        </motion.div>

        {/* Floating product cards */}
        <motion.div
          className={styles.previewStrip}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {previewCards.map(({ icon: Icon, title, sub }, i) => (
            <motion.div
              key={title}
              className={styles.previewCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.previewCardIcon}><Icon size={18} /></div>
              <div className={styles.previewCardTitle}>{title}</div>
              <div className={styles.previewCardSub}>{sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </TubesBackground>
  );
}