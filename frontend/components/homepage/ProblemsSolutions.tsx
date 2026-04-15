'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './ProblemsSolutions.module.css';

const problems = [
  {
    title: 'Analysis Paralysis',
    issues: [
      'Overwhelming options — thousands of low-effort courses to choice from',
      'The "Dumb Translation": Avg completion rate of MOOCs is just 4%',
      'Structural Failure: Lack of accountability and real interaction',
      'The "Ghosting" Pattern: sign up with hope, then ghost because it doesn\'t stick',
    ],
    solutionTitle: 'Skill Gap Analyzer — Your Personalized Path',
    solutions: [
      <span key="s1"><span className={styles.solutionHighlight}>Upload your CV</span>, paste a job description, or answer 5 quick questions</span>,
      <span key="s2">AI instantly creates <span className={styles.solutionHighlight}>YOUR</span> personalized learning path</span>,
      <span key="s3">&ldquo;You are 42% ready for this role — here&apos;s exactly what to learn next&rdquo;</span>,
      <span key="s4">Clear timeline: <span className={styles.solutionHighlight}>&ldquo;6 weeks to job-ready&rdquo;</span></span>,
    ],
  },
  {
    title: 'Learning in the Dark',
    issues: [
      'Fatal Flaw: "100 talks, zero examples — more talking than showing"',
      'Scale-first design that treats students as numbers, not people',
      'Dull lectures with narrators just reading slides (Edtech 1.0)',
      'Structural Failure: zero live coaching or active practice in STEM',
    ],
    solutionTitle: 'AI Tutor (24/7) — Never Get Stuck Again',
    solutions: [
      <span key="s1"><span className={styles.solutionHighlight}>&ldquo;Explain this to me like I&apos;m 10&rdquo;</span> — AI adapts to your level</span>,
      <span key="s2"><span className={styles.solutionHighlight}>&ldquo;Give me a real-world example&rdquo;</span> — instant context</span>,
      <span key="s3">AI knows exactly where <span className={styles.solutionHighlight}>you&apos;re stuck</span> in YOUR course</span>,
      <span key="s4">No frustration → no drop-off. Available at 3am, offline.</span>,
    ],
  },
  {
    title: 'Offline = Out of Luck',
    issues: [
      'Expensive data plans make video learning unaffordable',
      'Can\'t download lessons — forced to stream',
      'Low-quality video on slow connections',
      'Millions of learners worldwide get left behind by bad infrastructure',
    ],
    solutionTitle: 'Lite Mode — Built for the Real World',
    solutions: [
      <span key="s1"><span className={styles.solutionHighlight}>Ultra-compressed video, audio-only</span> & text summaries</span>,
      <span key="s2"><span className={styles.solutionHighlight}>Offline downloads</span> — learn anywhere, anytime</span>,
      <span key="s3"><span className={styles.solutionHighlight}>Audio-first learning</span> — commute without staring at a screen</span>,
      <span key="s4">Designed for <span className={styles.solutionHighlight}>2G networks</span> — works where others fail</span>,
    ],
  },
  {
    title: 'The Motivation Cliff',
    issues: [
      'No visible sense of progress day to day',
      'Learning feels like a chore, not an achievement',
      'Drop out because "it doesn\'t feel like I\'m getting anywhere"',
      'Zero accountability when learning alone',
    ],
    solutionTitle: 'Gamified Progression — Learning That Feels Alive',
    solutions: [
      <span key="s1"><span className={styles.solutionHighlight}>XP Points & Badges</span> — every lesson earns you real rewards</span>,
      <span key="s2"><span className={styles.solutionHighlight}>Streaks</span>: &ldquo;You&apos;ve been consistent for 15 days! 🔥&rdquo;</span>,
      <span key="s3"><span className={styles.solutionHighlight}>Public Profiles</span> — showcase skills, projects, achievements</span>,
      <span key="s4">Weekly Challenges & Level System — see progression visually</span>,
    ],
  },
  {
    title: 'Learning Doesn\'t Lead to Earning',
    issues: [
      'Low-effort cash grabs: Outdated by 2-4 years (labeled 2025)',
      'Broken labs and code examples that never get updated',
      'Subpar teaching quality & terrible production (IBM/Coursera rants)',
      'Edtech 1.0 prioritized monetization instead of real learning',
    ],
    solutionTitle: 'Teyro Marketplace — Learn, Build, Earn',
    solutions: [
      <span key="s1"><span className={styles.solutionHighlight}>Sell your skills</span> directly to clients from day one</span>,
      <span key="s2">Turn completed projects into <span className={styles.solutionHighlight}>service packages</span></span>,
      <span key="s3">Portfolio <span className={styles.solutionHighlight}>auto-generated</span> from your learning projects</span>,
      <span key="s4"><span className={styles.solutionHighlight}>Verified badges</span> — credentials clients actually trust</span>,
    ],
  },
];

export default function ProblemsSolutions({ onOpenModal }: { onOpenModal: () => void }) {
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
          <div className={styles.eyebrow}>The Problem We Solve</div>
          <h2 className={styles.heading}>
            Why people quit online courses.<br />
            Why platforms fail. Here&apos;s what&apos;s broken.
          </h2>
          <p className={styles.subheading}>
            We identified the 5 core reasons online learning fails — and built Teyro to fix every single one.
          </p>
        </motion.div>

        <div className={styles.cardGrid}>
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              className={styles.cardPair}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Problem Card */}
              <div className={styles.problemCard}>
                <div className={`${styles.cardLabel} ${styles.problemLabel}`}>
                  ✗ The Problem
                </div>
                <div className={styles.cardNumber}>0{i + 1}</div>
                <h3 className={styles.cardTitle}>{problem.title}</h3>
                <ul className={styles.cardList}>
                  {problem.issues.map((issue, j) => (
                    <li key={j}>
                      <span className={styles.problemBullet}>✗</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution Card */}
              <div className={styles.solutionCard}>
                <div className={`${styles.cardLabel} ${styles.solutionLabel}`}>
                  ✓ Teyro Solution
                </div>
                <div className={styles.cardNumber} style={{ color: '#EDE9FE' }}>0{i + 1}</div>
                <h3 className={styles.cardTitle}>{problem.solutionTitle}</h3>
                <ul className={styles.cardList}>
                  {problem.solutions.map((sol, j) => (
                    <li key={j}>
                      <span className={styles.solutionBullet}>✓</span>
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}