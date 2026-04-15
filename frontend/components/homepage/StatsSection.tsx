'use client';

import { motion, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import styles from './StatsSection.module.css';

const stats = [
  { value: '93', suffix: '%', label: 'Completion Rate', sub: 'vs 1%–13% industry range' },
  { value: '6', suffix: ' wks', label: 'To Proficiency', sub: 'vs 6–12 months elsewhere' },
  { value: '23k', suffix: '+', label: 'On the Waitlist', sub: 'and growing every day' },
  { value: '85', suffix: '%', label: 'Less Mobile Data', sub: 'with Lite Mode enabled' },
];

const comparison = [
  { feature: 'AI Tutor (24/7)', teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Personalized Learning Path', teyro: '✓', coursera: '~', udemy: '✗' },
  { feature: 'Offline + Low-Data Mode', teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Earn While You Learn', teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Skill Gap Analyzer', teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Works Anywhere (Low-Data Mode)', teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Gamified Progression', teyro: '✓', coursera: '~', udemy: '✗' },
];

function AnimatedNumber({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');
  const numericValue = parseInt(value.replace('k', '')) * (value.includes('k') ? 1000 : 1);
  const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 18 });

  useEffect(() => {
    const unsub = spring.on('change', (latest) => {
      const num = Math.round(latest);
      if (value.includes('k')) {
        setDisplay(num >= 1000 ? Math.floor(num / 1000) + 'k' : String(num));
      } else {
        setDisplay(String(num));
      }
    });
    return unsub;
  }, [spring, value]);

  useEffect(() => {
    if (isInView) spring.set(numericValue);
  }, [isInView, numericValue, spring]);

  return (
    <span ref={ref} className={styles.statValue}>
      {display}{suffix}
    </span>
  );
}

function getCellStyle(val: string) {
  if (val === '✓') return `${styles.btnCheck}`;
  if (val === '✗') return `${styles.btnX}`;
  return `${styles.btnPartial}`;
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.eyebrow}>Real Results, Really Fast</div>
          <h2 className={styles.heading}>People are already building better futures on Teyro</h2>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {stats.map(({ value, suffix, label, sub }, i) => (
            <motion.div
              key={label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            >
              <AnimatedNumber value={value} suffix={suffix} />
              <div className={styles.statLabel}>{label}</div>
              <div className={styles.statSub}>{sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Industry Problem Context */}
        <motion.div
          className={styles.industryContext}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className={styles.quoteGrid}>
            <div className={styles.quoteItem}>
              <p>&ldquo;The dirty little secret of edtech: the biggest names don’t actually care if you learn anything… video courses have a fatal flaw: they only work for the most motivated. 4-10% completion rates!&rdquo;</p>
              <span>— Gagan Biyani, <strong>Udemy Co-founder</strong></span>
            </div>
            <div className={styles.quoteItem}>
              <p>&ldquo;The pattern is clear — people sign up with hope, then ghost because the format doesn’t stick. MOOCs are a dumb translation, not a re-imagination.&rdquo;</p>
              <span>— Reddit User Analysis · Systemic Failure</span>
            </div>
          </div>
          <div className={styles.contextSub}>
            Traditional edtech sells <strong>hope and certificates</strong>. Teyro delivers <strong>actual achievement</strong>.
          </div>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          className={styles.comparisonWrap}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <table className={styles.comparison}>
            <thead>
              <tr>
                <th>Feature</th>
                <th className={styles.teyroCol}>✦ Teyro</th>
                <th>Coursera</th>
                <th>Udemy</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(({ feature, teyro, coursera, udemy }) => (
                <tr key={feature}>
                  <td>{feature}</td>
                  <td className={styles.teyroCell}>
                    <span className={getCellStyle(teyro)}>{teyro}</span>
                  </td>
                  <td className={styles.grayCell}>
                    <span className={getCellStyle(coursera)}>{coursera}</span>
                  </td>
                  <td className={styles.grayCell}>
                    <span className={getCellStyle(udemy)}>{udemy}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}