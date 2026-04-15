'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { FaRobot, FaRoute, FaGlobe, FaUsers, FaLightbulb, FaAward } from 'react-icons/fa';
import styles from './WhyTeyro.module.css';

const features = [
  {
    icon: FaRobot,
    title: 'Your Personal AI Tutor',
    desc: 'Always there when you need it. Never get stuck again.',
    points: [
      'Explains in YOUR learning style',
      'Knows where you are struggling',
      'Voice mode: talk to AI like a mentor',
      'Works offline with cached knowledge',
    ],
    cta: 'See AI in action',
  },
  {
    icon: FaRoute,
    title: 'Netflix-Level Personalization',
    desc: 'Forget choosing from 10,000 courses. We build your path.',
    points: [
      'Algorithm builds YOUR learning path',
      'Adjusts by your speed & performance',
      'Daily plan: "2 videos + 1 quiz + practice"',
      'Never confused about what to learn next',
    ],
    cta: 'See your path',
  },
  {
    icon: FaGlobe,
    title: 'Works Anywhere in the World',
    desc: 'Slow internet? Limited time? Expensive data? Teyro works regardless.',
    points: [
      'Works on 2G connections — no excuses',
      'Audio-only & full offline download mode',
      'Mobile money + card + wallet payments',
      'English, French, Spanish & more (expanding)',
    ],
    cta: 'Learn how',
  },
  {
    icon: FaUsers,
    title: 'Learn Together, Grow Together',
    desc: 'Community is not a feature — it\'s the foundation.',
    points: [
      'Peer learning groups & accountability circles',
      'Course communities — ask, share, celebrate',
      'Public profiles to build your identity',
      'Support from instructors AND fellow students',
    ],
    cta: 'Join the community',
  },
  {
    icon: FaLightbulb,
    title: 'We Notice When You\'re Stuck',
    desc: 'Before you quit, Teyro steps in — just like a real teacher would.',
    points: [
      'Tracks repeated rewatches & quiz fails',
      'AI pops up: "This seems tricky, want help?"',
      'Suggests simpler explanations automatically',
      'Saves you right before the drop-off point',
    ],
    cta: 'See how it works',
  },
  {
    icon: FaAward,
    title: 'Certificates That Get You Hired',
    desc: 'Not just a PDF. Verifiable credentials with proof of real work.',
    points: [
      'Shows completion + skills + project portfolio',
      'Client reviews from the marketplace',
      'Verifiable online credential link',
      'Blockchain-ready (NFT credentials — future)',
    ],
    cta: 'See sample cert',
  },
];

export default function WhyTeyro({ onOpenModal }: { onOpenModal: () => void }) {
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
          <div className={styles.eyebrow}>Why Teyro is Different</div>
          <h2 className={styles.heading}>
            Teyro is **Edtech 2.0**.<br />
            <em>Real outcomes, not just video scrolls.</em>
          </h2>
          <p className={styles.subheading}>
            Six structural advantages that legacy platforms ignore. We don&apos;t just sell video access; we build a system for <strong>actual achievement</strong>.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {features.map(({ icon: Icon, title, desc, points, cta }, i) => (
            <motion.div
              key={title}
              className={styles.card}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={styles.iconBox}>
                <Icon size={24} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{desc}</p>
              <ul className={styles.cardFeatures}>
                {points.map((p, j) => (
                  <li key={j}>
                    <span className={styles.featureDot} />
                    {p}
                  </li>
                ))}
              </ul>
              <button className={styles.cardCta} onClick={onOpenModal}>
                {cta} <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}