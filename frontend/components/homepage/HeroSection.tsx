'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Zap, BookOpen, Brain, TrendingUp, Award } from 'lucide-react';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onOpenModal: () => void;
}

const previewCards = [
  { icon: Brain, title: 'AI Tutor', sub: 'Always available when stuck' },
  { icon: BookOpen, title: 'Your Path', sub: 'Personalized in minutes' },
  { icon: TrendingUp, title: 'Earn Fast', sub: 'Marketplace from day 1' },
  { icon: Award, title: 'Verified', sub: 'Credentials that matter' },
];

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className={styles.hero}>
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
            Introducing Teyro: AI-powered learning that actually guides you.
            From confused to confident in weeks, not years.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <button className={styles.primaryBtn} onClick={onOpenModal} id="hero-join-waitlist-btn">
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
              <strong>23,543</strong> students & instructors already waiting
            </span>
          </motion.div>
        </motion.div>

        {/* Floating product cards - Scribe style */}
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
              <div className={styles.previewCardIcon}>
                <Icon size={18} />
              </div>
              <div className={styles.previewCardTitle}>{title}</div>
              <div className={styles.previewCardSub}>{sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}