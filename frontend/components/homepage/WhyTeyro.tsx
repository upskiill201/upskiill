'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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

export default function WhyTeyro({ onOpenModal }: { onOpenModal?: () => void }) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // The container is very tall, so we scroll map its entire progression
    // Start tracking when the top of the container hits the top of the viewport
    offset: ["start start", "end end"]
  });

  // Smooth out the horizontal scrolling slightly
  const progress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  // On desktop, the track translates left based on scroll.
  // 6 cards of ~400px width + gaps = ~2600px width.
  // Translate from 0% to minus whatever percentage moves the track fully.
  // Using absolute ranges or percentages can be tricky. CSS handles it via vh/vw well,
  // but framer motion handles percentages of the element itself flawlessly using x: "percentage".
  
  // Actually x: "-80%" moves it 80% left. But since the track width is longer than the screen,
  const x = useTransform(progress, [0, 1], ["0%", "-75%"]); // Moves track 75% of its own length to the left

  // Header fades smoothly as you scroll deep into the cards
  const headerOpacity = useTransform(progress, [0, 0.15, 0.3], [1, 1, 0]);
  const headerY = useTransform(progress, [0, 0.2], [0, -30]);

  return (
    <section className={styles.scrollWrapper} ref={containerRef}>
      <div className={styles.stickyStage}>
        <div className={styles.container}>
          
          <motion.div
            className={styles.header}
            style={{ opacity: headerOpacity, y: headerY }}
          >
            <div className={styles.eyebrow}>Why Teyro is Different</div>
            <h2 className={styles.heading}>
              Teyro is <em>Edtech 2.0</em>.<br />
              Real outcomes, not just video scrolls.
            </h2>
            <p className={styles.subheading}>
              Six structural advantages that legacy platforms ignore. We don&apos;t just sell video access; we build a system for <strong>actual achievement</strong>.
            </p>
          </motion.div>

          <motion.div className={styles.horizontalTrack} style={{ x }}>
            {features.map(({ icon: Icon, title, desc, points, cta }, i) => (
              <div
                key={title}
                className={styles.card}
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
              </div>
            ))}
            
            {/* The prompt references visual inline elements acting like punctuation. We can add a simple end-card or divider */}
            <div className={styles.endCard}>
              <h3>That&apos;s Real Magic.</h3>
              <p>Ready to experience the difference?</p>
              <button className={styles.ctaSolid} onClick={onOpenModal}>Explore Courses</button>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}