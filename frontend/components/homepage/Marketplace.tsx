'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Marketplace.module.css';

const flowSteps = [
  { num: '1', label: 'Learn a Skill' },
  { num: '2', label: 'Build Projects' },
  { num: '3', label: 'Sell on Marketplace' },
  { num: '4', label: 'Get Paid' },
];

const features = [
  { title: 'Service Packages', desc: 'Basic, Standard, Premium pricing tiers for every skill' },
  { title: 'Verified Skill Badges', desc: 'AI + instructor validated credentials clients trust' },
  { title: 'Client Rating System', desc: 'Build your reputation with every completed project' },
  { title: 'Secure Escrow Payments', desc: 'Get paid safely — Teyro holds funds until delivery' },
  { title: 'Transparent Commission', desc: 'Only 15–20% platform fee, clearly displayed upfront' },
  { title: 'Seller Levels', desc: 'Rookie → Rising Star → Expert — gamified seller growth' },
];

export default function Marketplace({ onOpenModal }: { onOpenModal: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.eyebrow}>Teyro Marketplace</div>
          <h2 className={styles.heading}>
            Beyond Courses. Services.{' '}
            <em>Real Income. From Day One.</em>
          </h2>
          <p className={styles.subheading}>
            After learning, students immediately sell their skills to real clients.
            Learn → Build → Earn. Not someday — now.
          </p>
        </motion.div>

        {/* Flow steps */}
        <motion.div
          className={styles.flowRow}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {flowSteps.map(({ num, label }, i) => (
            <div key={num} style={{ display: 'contents' }}>
              <div className={styles.flowStep}>
                <span className={styles.flowNum}>{num}</span>
                <span className={styles.flowLabel}>{label}</span>
              </div>
              {i < flowSteps.length - 1 && (
                <span className={styles.flowArrow}>→</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className={styles.featureGrid}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {features.map(({ title, desc }, i) => (
            <motion.div
              key={title}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
            >
              <div className={styles.featureCardTitle}>{title}</div>
              <div className={styles.featureCardDesc}>{desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className={styles.testimonial}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <div className={styles.testimonialAvatar}>Z</div>
          <div>
            <p className={styles.testimonialText}>
              &ldquo;Zainab learned UI Design on Teyro → Sold <em>47 design projects</em> →
              Earned <em>$3,200 in 3 months</em> → Now a full-time designer.
              And she started with zero experience.&rdquo;
            </p>
            <p className={styles.testimonialName}>— Zainab A., UI Designer · Marketplace Top Seller</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          <button className={styles.ctaBtn} onClick={onOpenModal} id="marketplace-join-btn">
            Start Earning on the Marketplace <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
