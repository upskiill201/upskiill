'use client';

import { motion, useSpring, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import styles from './StatsSection.module.css';

const comparison = [
  { feature: 'AI Tutor (24/7)', Teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Personalized Learning Path', Teyro: '✓', coursera: '~', udemy: '✗' },
  { feature: 'Offline + Low-Data Mode', Teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Earn While You Learn', Teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Skill Gap Analyzer', Teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Works Anywhere (Low-Data Mode)', Teyro: '✓', coursera: '✗', udemy: '✗' },
  { feature: 'Gamified Progression', Teyro: '✓', coursera: '~', udemy: '✗' },
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
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
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

  const stats = [
    { value: '75', suffix: '%', label: 'Target Completion Rate', sub: 'vs 1%–13% industry range' },
    { value: '8', suffix: ' wks', label: 'Time to Mastery', sub: 'vs 6–12 months elsewhere' },
    { value: waitlistCount === null ? '0' : String(waitlistCount), suffix: '', label: 'On the Waitlist', sub: 'and growing every day' },
    { value: '60', suffix: '%', label: 'Projected Bandwidth Savings', sub: 'with Lite Mode enabled' },
  ];

  // Use framer-motion scroll tracking inside the tall wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate slide-up animations for each card
  // Card 1 starts at 0, Card 2 slides over from below, Card 3 slides over Card 2
  const card1Y = useTransform(smoothProgress, [0, 1], ['0vh', '0vh']);
  const card2Y = useTransform(smoothProgress, [0, 0.3, 0.6], ['40vh', '40vh', '0vh']);
  const card3Y = useTransform(smoothProgress, [0, 0.6, 0.9], ['80vh', '80vh', '0vh']);
  
  const card2Opacity = useTransform(smoothProgress, [0.3, 0.45], [0, 1]);
  const card3Opacity = useTransform(smoothProgress, [0.6, 0.75], [0, 1]);

  return (
    <section className={styles.scrollWrapper} ref={containerRef}>
      {/* Sticky Stage locks to the viewport during the entire scroll duration */}
      <div className={styles.stickyStage}>
        <div className={styles.container}>
          
          {/* Header */}
          <motion.div
            className={styles.header}
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.eyebrow}>Real Results, Really Fast</div>
            <h2 className={styles.heading}>Built for Real Outcomes, Not Just Attendance</h2>
          </motion.div>

          {/* Absolute stacking deck area */}
          <div className={styles.cardDeck}>
            
            {/* CARD 1: Stats Grid */}
            <motion.div 
              className={`${styles.animatedCard} ${styles.card1}`}
              style={{ y: card1Y }}
            >
              <div className={styles.statsGrid}>
                {stats.map(({ value, suffix, label, sub }, i) => (
                  <div key={label} className={styles.statCard}>
                    <AnimatedNumber value={value} suffix={suffix} />
                    <div className={styles.statLabel}>{label}</div>
                    <div className={styles.statSub}>{sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 2: Industry Problem Context */}
            <motion.div 
              className={`${styles.animatedCard} ${styles.card2}`}
              style={{ y: card2Y, opacity: card2Opacity }}
            >
              <div className={styles.industryContext}>
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
              </div>
            </motion.div>

            {/* CARD 3: Comparison table */}
            <motion.div 
              className={`${styles.animatedCard} ${styles.card3}`}
              style={{ y: card3Y, opacity: card3Opacity }}
            >
              <div className={styles.comparisonWrap}>
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
                    {comparison.map(({ feature, Teyro, coursera, udemy }) => (
                      <tr key={feature}>
                        <td>{feature}</td>
                        <td className={styles.teyroCell}>
                          <span className={getCellStyle(Teyro)}>{Teyro}</span>
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
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}