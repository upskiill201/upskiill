'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './RoleSolutions.module.css';

const studentSolutions = [
  'AI Tutor available 24/7 — never get stuck',
  'Clear personalized path (no overwhelm)',
  'Low-data friendly — works anywhere, any connection speed',
  'Real portfolio built while you learn',
  'Earn money immediately after your first course',
  'Skill Gap Analyzer shows exactly what to learn',
  'Gamification keeps you motivated daily',
  'Community of peers at your exact level',
  'Monthly earnings potential on the marketplace',
];

const instructorSolutions = [
  'Reach a global audience (100+ countries)',
  'Built-in community management tools',
  'See exactly where students are struggling',
  'Easy 4-step course creation wizard',
  'Marketing support & organic traffic from blog',
  'Student engagement metrics that actually matter',
  'Direct access to marketplace clients',
];

const revenueStreams = [
  'Direct course sales',
  'Student service marketplace commissions',
  'Content partnerships (coming soon)',
];

export default function RoleSolutions({ onOpenModal }: { onOpenModal?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track vertical scroll over this specific 500vh section wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the progress for cinematic motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  /*
   * EPIC SCROLL ORCHESTRATION:
   * 0.00 -> 0.15: Student Card & Text Enter
   * 0.15 -> 0.40: Student Card & Text LOCKED (Reading Time)
   * 0.40 -> 0.49: Student Card & Text Exit (Fade Out)
   * 0.49 -> 0.51: DEAD ZONE (Clean gap)
   * 0.51 -> 0.60: Instructor Card & Text Enter
   * 0.60 -> 0.85: Instructor Card & Text LOCKED (Reading Time)
   * 0.85 -> 1.00: Instructor Card & Text Exit
   */

  // LEFT SIDE: TEXT OPACITIES & Y-SHIFTS
  const studentOpacity = useTransform(smoothProgress, [0, 0.1, 0.4, 0.49], [0, 1, 1, 0]);
  const studentY = useTransform(smoothProgress, [0, 0.1, 0.4, 0.49], [40, 0, 0, -40]);

  const instructorOpacity = useTransform(smoothProgress, [0.51, 0.6, 0.9, 1], [0, 1, 1, 0]);
  const instructorY = useTransform(smoothProgress, [0.51, 0.6, 0.9, 1], [40, 0, 0, -40]);

  // RIGHT SIDE: CARD Y-SHIFTS & OPACITIES
  // We use vh units string matching to guarantee mobile/desktop scaling. 
  // framer-motion handles string interpolation perfectly for Y.
  const cardStudentY = useTransform(smoothProgress, [0, 0.15, 0.4, 0.49], ["80vh", "0vh", "0vh", "-80vh"]);
  const cardStudentOpacity = useTransform(smoothProgress, [0, 0.1, 0.45, 0.49], [0, 1, 1, 0]);

  const cardInstructorY = useTransform(smoothProgress, [0.51, 0.6, 0.85, 1], ["80vh", "0vh", "0vh", "-80vh"]);
  const cardInstructorOpacity = useTransform(smoothProgress, [0.51, 0.58, 0.9, 1], [0, 1, 1, 0]);

  // Derive boolean visibility state from opacity values for aria-hidden
  const [studentVisible, setStudentVisible] = useState(true);
  const [instructorVisible, setInstructorVisible] = useState(false);
  useMotionValueEvent(cardStudentOpacity, 'change', (v) => setStudentVisible(v > 0.1));
  useMotionValueEvent(cardInstructorOpacity, 'change', (v) => setInstructorVisible(v > 0.1));

  return (
    <section id="solutions" className={styles.sectionWrapper} ref={containerRef}>
      
      {/* Universal top header */}
      <div className={styles.sectionTopHeader}>
        <div className={styles.eyebrowBadgeUniversal}>Solutions for Every Role</div>
      </div>

      {/* The 100vh Sticky Stage that locks into the viewport */}
      <div className={styles.stickyStage}>
        <div className={styles.splitContainer}>
          
          {/* ===== LEFT: Pinned Desktop Orchestrator ===== */}
          <div className={styles.leftPanel}>
            
            <div className={styles.dynamicHeaderContainer}>
              {/* Student Dynamic Text State */}
              <motion.div 
                className={styles.dynamicHeader}
                style={{ opacity: studentOpacity, y: studentY }}
              >
                <div className={styles.eyebrowBadge}>🎓 For Students</div>
                <h2 className={styles.heading}>
                  Learn smart.<br />
                  Earn fast.<br />
                  Build your future.
                </h2>
                <p className={styles.subheading}>
                  We built a learning system that respects your time and actively pulls you towards the finish line. Don&apos;t just watch lectures—verify your skills.
                </p>
              </motion.div>

              {/* Instructor Dynamic Text State */}
              <motion.div 
                className={styles.dynamicHeader}
                style={{ opacity: instructorOpacity, y: instructorY }}
              >
                <div className={styles.eyebrowBadge}>🎙️ For Instructors</div>
                <h2 className={styles.heading}>
                  Teach more.<br />
                  Earn more.<br />
                  Build your brand.
                </h2>
                <p className={styles.subheading}>
                  Leave behind the platforms that treat you like a commodity and cap your reach. Partner with a network that actually invests in your success.
                </p>
              </motion.div>
            </div>

          </div>

          {/* ===== RIGHT: Orchestrated Cards ===== */}
          <div className={styles.rightPanel}>
            
            {/* The right panel relies on a relative container to stack cards absolutely,
                then Framer-Motion shifts them perfectly into the viewport at the right time. */}
            <div className={styles.cardsContainer}>

              {/* Student Card — aria-hidden + pointer-events:none when not visible */}
              <motion.div 
                className={`${styles.card} ${styles.studentCard}`}
                style={{ 
                  y: cardStudentY, 
                  opacity: cardStudentOpacity,
                  pointerEvents: studentVisible ? 'auto' : 'none'
                }}
                aria-hidden={!studentVisible}
              >
                <p className={styles.cardProblem}>
                  &ldquo;I want to learn real skills without wasting time or money.&rdquo;
                </p>
                <ul className={styles.solutionList}>
                  {studentSolutions.map((s, i) => (
                    <li key={i} className={styles.solutionItem}>
                      <span className={`${styles.checkIcon} ${styles.studentCheck}`}>✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
                <button
                  className={`${styles.ctaBtn} ${styles.studentCtaBtn}`}
                  onClick={onOpenModal}
                >
                  I&apos;m a Student — Let Me In <ArrowRight size={18} />
                </button>
              </motion.div>

              {/* Instructor Card — aria-hidden + pointer-events:none when not visible */}
              <motion.div 
                className={`${styles.card} ${styles.instructorCard}`}
                style={{ 
                  y: cardInstructorY, 
                  opacity: cardInstructorOpacity,
                  pointerEvents: instructorVisible ? 'auto' : 'none'
                }}
                aria-hidden={!instructorVisible}
              >
                <p className={styles.cardProblem}>
                  &ldquo;I want to reach more students and actually make good money.&rdquo;
                </p>
                <ul className={styles.solutionList}>
                  {instructorSolutions.map((s, i) => (
                    <li key={i} className={styles.solutionItem}>
                      <span className={`${styles.checkIcon} ${styles.instructorCheck}`}>✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
                <div className={styles.revenueBox}>
                  <div className={styles.revenueTitle}>Multiple Revenue Streams</div>
                  {revenueStreams.map((r, i) => (
                    <div key={i} className={styles.revenueItem}>
                      <span className={styles.revenueDot} />
                      {r}
                    </div>
                  ))}
                </div>
                <button
                  className={`${styles.ctaBtn} ${styles.instructorCtaBtn}`}
                  onClick={onOpenModal}
                >
                  I&apos;m an Instructor — Let Me In <ArrowRight size={18} />
                </button>
              </motion.div>

            </div>

          </div>

        </div>
      </div>

      {/* ===== MOBILE FLOW: Renders purely natively below, killing the sticky complex view ===== */}
      <div className={styles.mobileFlow}>
        
        <div className={styles.mobileInlineHeader}>
            <div className={styles.eyebrowBadge}>🎓 For Students</div>
            <h2 className={styles.heading}>Learn smart. Make money.</h2>
            <p className={styles.subheading}>We actively pull you towards the finish line.</p>
        </div>

        <div className={`${styles.card} ${styles.studentCard} ${styles.mobileCardOverride}`}>
          <p className={styles.cardProblem}>
            &ldquo;I want to learn real skills without wasting time or money.&rdquo;
          </p>
          <ul className={styles.solutionList}>
            {studentSolutions.map((s, i) => (
              <li key={i} className={styles.solutionItem}>
                <span className={`${styles.checkIcon} ${styles.studentCheck}`}>✓</span>
                {s}
              </li>
            ))}
          </ul>
          <button
            className={`${styles.ctaBtn} ${styles.studentCtaBtn}`}
            onClick={onOpenModal}
          >
            I&apos;m a Student — Let Me In <ArrowRight size={18} />
          </button>
        </div>

        <div className={styles.mobileSpacer} />

        <div className={styles.mobileInlineHeader}>
            <div className={styles.eyebrowBadge}>🎙️ For Instructors</div>
            <h2 className={styles.heading}>Teach more. Earn more.</h2>
            <p className={styles.subheading}>Partner with a network that invests in your success.</p>
        </div>

        <div className={`${styles.card} ${styles.instructorCard} ${styles.mobileCardOverride}`}>
          <p className={styles.cardProblem}>
            &ldquo;I want to reach more students and actually make good money.&rdquo;
          </p>
          <ul className={styles.solutionList}>
            {instructorSolutions.map((s, i) => (
              <li key={i} className={styles.solutionItem}>
                <span className={`${styles.checkIcon} ${styles.instructorCheck}`}>✓</span>
                {s}
              </li>
            ))}
          </ul>

          <div className={styles.revenueBox}>
            <div className={styles.revenueTitle}>Multiple Revenue Streams</div>
            {revenueStreams.map((r, i) => (
              <div key={i} className={styles.revenueItem}>
                <span className={styles.revenueDot} />
                {r}
              </div>
            ))}
          </div>

          <button
            className={`${styles.ctaBtn} ${styles.instructorCtaBtn}`}
            onClick={onOpenModal}
          >
            I&apos;m an Instructor — Let Me In <ArrowRight size={18} />
          </button>
        </div>

      </div>

    </section>
  );
}