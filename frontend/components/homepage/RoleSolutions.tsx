'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
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

export default function RoleSolutions({ onOpenModal }: { onOpenModal: () => void }) {
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
          <div className={styles.eyebrow}>Solutions for Every Role</div>
          <h2 className={styles.heading}>
            We solve the real problems<br />
            of students and instructors
          </h2>
          <p className={styles.subheading}>
            Whether you want to learn and earn, or teach and scale — Teyro was built for you.
          </p>
        </motion.div>

        <div className={styles.columns}>
          {/* Student Card */}
          <motion.div
            className={`${styles.card} ${styles.studentCard}`}
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={`${styles.cardBadge} ${styles.studentBadge}`}>
              🎓 For Students
            </div>
            <p className={styles.cardProblem}>
              &ldquo;I want to learn real skills without wasting time or money.&rdquo;
            </p>
            <h3 className={styles.cardTitle}>Learn smart. Earn fast. Build your future.</h3>

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
              id="student-join-btn"
            >
              I&apos;m a Student — Let Me In <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Instructor Card */}
          <motion.div
            className={`${styles.card} ${styles.instructorCard}`}
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={`${styles.cardBadge} ${styles.instructorBadge}`}>
              🎙️ For Instructors
            </div>
            <p className={styles.cardProblem}>
              &ldquo;I want to reach more students and actually make good money.&rdquo;
            </p>
            <h3 className={styles.cardTitle}>Teach more. Earn more. Build your brand.</h3>

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
              id="instructor-join-btn"
            >
              I&apos;m an Instructor — Let Me In <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}