'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSection.module.css';

/* ─────────────────────────────────────────────
   CATEGORY SLIDER DATA — 12 cards / 4 groups of 3
───────────────────────────────────────────── */
const CATEGORIES = [
  { name: 'Generative AI',       img: '/homepage/cat-generative-ai.png',   href: '/courses?cat=generative-ai' },
  { name: 'IT Certifications',   img: '/homepage/cat-it-certs.png',         href: '/courses?cat=it-certs' },
  { name: 'Data Science',        img: '/homepage/cat-data-science.png',     href: '/courses?cat=data-science' },
  { name: 'ChatGPT',             img: '/homepage/cat-chatgpt.png',          href: '/courses?cat=chatgpt' },
  { name: 'Prompt Engineering',  img: '/homepage/cat-prompt-eng.png',       href: '/courses?cat=prompt-eng' },
  { name: 'Microsoft Excel',     img: '/homepage/cat-excel.png',            href: '/courses?cat=excel' },
  { name: 'Large Language Models', img: '/homepage/cat-llm.png',           href: '/courses?cat=llm' },
  { name: 'Machine Learning',    img: '/homepage/cat-machine-learning.png', href: '/courses?cat=machine-learning' },
  { name: 'AI Agents',           img: '/homepage/cat-ai-agents.png',        href: '/courses?cat=ai-agents' },
  { name: 'UI Design',           img: '/homepage/cat-ui-design.png',        href: '/courses?cat=ui-design' },
  { name: 'Guitar',              img: '/homepage/cat-guita.png',            href: '/courses?cat=guitar' },
  { name: 'Business Strategy',   img: '/homepage/cat-business.png',         href: '/courses?cat=business' },
];

const CARDS_PER_SLIDE = 3;
const TOTAL_GROUPS = Math.ceil(CATEGORIES.length / CARDS_PER_SLIDE); // 4

/* ─────────────────────────────────────────────
   WHY LEARN DATA — 12 feature cards
───────────────────────────────────────────── */
const WHY_FEATURES = [
  { icon: '🎓', title: '500+ courses across every skill',  body: 'Tech, business, design, music, health, language — if you want to learn it, we have it. Taught by real-world experts.', soon: false },
  { icon: '⏱',  title: 'Learn at your own pace',           body: 'Lifetime access to every course you buy. Learn on your lunch break, late at night, or all weekend — no deadlines.',    soon: false },
  { icon: '🏆', title: 'Earn verified certificates',        body: 'Get a certificate when you complete a course. Download as PDF, share on LinkedIn, and verify with a unique ID.',       soon: false },
  { icon: '📊', title: 'Track your progress',               body: "Your dashboard shows every course you're in, visual progress bars, and a Resume Learning button so you never lose your place.", soon: false },
  { icon: '👨‍🏫', title: 'Vetted, expert instructors',      body: 'Every course is reviewed before it goes live. You learn from professionals with real experience — not just theory.',   soon: false },
  { icon: '💳', title: 'Pay your way',                      body: 'Card, PayPal, MTN Mobile Money, or Orange Money — we support the payment methods that work for you, wherever you are.', soon: false },
  { icon: '🤖', title: 'AI Tutor — available 24/7',         body: "Stuck on something? Ask your personal AI tutor. It reads your course content and answers your questions instantly, any time.", soon: true },
  { icon: '🗺️', title: 'Your personal learning path',      body: 'Set your career goal and our AI builds a custom course sequence for you, adjusting as you progress and improve.',     soon: true },
  { icon: '🔍', title: 'Skill Gap Analyzer',                body: "Upload your CV, pick your target job, and see exactly which skills you're missing. We map the gap and recommend the right courses.", soon: true },
  { icon: '🎮', title: 'Earn XP, badges & streaks',         body: 'Level up as you learn. Earn XP for every lesson, unlock achievement badges, keep your daily streak alive, and climb the leaderboard.', soon: true },
  { icon: '🔔', title: 'Smart learning reminders',          body: "Haven't studied in a few days? We'll nudge you via email or WhatsApp with a spaced-repetition reminder to get back on track.", soon: true },
  { icon: '📥', title: 'Learn offline, anywhere',           body: 'Download your lessons and watch them without internet. Your progress automatically syncs when you\'re back online.',    soon: true },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function HeroSection() {
  const [activeGroup, setActiveGroup] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToGroup = useCallback((index: number) => setActiveGroup(index), []);

  const nextGroup = useCallback(() =>
    setActiveGroup(prev => (prev + 1) % TOTAL_GROUPS), []);

  const prevGroup = useCallback(() =>
    setActiveGroup(prev => (prev - 1 + TOTAL_GROUPS) % TOTAL_GROUPS), []);

  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(nextGroup, 4000);
  }, [nextGroup]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  // Slide offset: each group moves track left by 100% of visible width + 1 gap
  const trackOffset = `calc(-${activeGroup * 100}% - ${activeGroup * 16}px)`;

  return (
    <>
      <div className={styles.heroContainer}>
      {/* ══════════════════════════════════════════
          PART 1 — BLUE BANNER (260px desktop)
      ══════════════════════════════════════════ */}
      <section className={styles.banner}>

        {/* Abstract SVG wave — right side, 40% opacity */}
        <div className={styles.bannerWave} aria-hidden="true">
          <svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" fill="#5C77FF">
            <ellipse cx="560" cy="60"  rx="300" ry="220" opacity="0.6" />
            <ellipse cx="650" cy="200" rx="200" ry="180" opacity="0.5" />
            <ellipse cx="440" cy="260" rx="180" ry="140" opacity="0.4" />
          </svg>
        </div>

        {/* Inner flex row */}
        <div className={styles.bannerInner}>

          {/* LEFT — White floating card */}
          <div className={styles.contentCard}>
            <h1 className={styles.cardTitle}>Master in-demand skills</h1>
            <p className={styles.cardDesc}>
              Get access to 500+ courses from real-world experts across every skill.
            </p>
            <div className={styles.btnRow}>
              <Link href="/courses" style={{ textDecoration: 'none' }}>
                <button className={styles.btnPrimary}>Explore Plans</button>
              </Link>
              <Link href="/courses" style={{ textDecoration: 'none' }}>
                <button className={styles.btnSecondary}>Browse Free</button>
              </Link>
            </div>
          </div>

          {/* RIGHT — Instructor + floating badges */}
          <div className={styles.visualArea}>

            {/* Badge 1 — Chart (top-right, 20% / right 10%) */}
            <div className={`${styles.badge} ${styles.badge1}`} aria-hidden="true">
              <i className={`fa-solid fa-chart-simple ${styles.iconChart}`}></i>
            </div>

            {/* Badge 2 — Shield (mid-left, 50% / left 5%) */}
            <div className={`${styles.badge} ${styles.badge2}`} aria-hidden="true">
              <i className={`fa-solid fa-shield-halved ${styles.iconShield}`}></i>
            </div>

            {/* Badge 3 — Sparkles (bottom-right, 15% / right 5%) */}
            <div className={`${styles.badge} ${styles.badge3}`} aria-hidden="true">
              <i className={`fa-solid fa-wand-magic-sparkles ${styles.iconSparkle}`}></i>
            </div>

            {/* Instructor photo — 110% of container height, breakouts top */}
            <div className={styles.instructorWrapper}>
              <Image
                src="/homepage/instructor.png"
                alt="Upskiill expert instructor"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 440px"
                className={styles.instructorImg}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PART 2 — CATEGORY SLIDER
      ══════════════════════════════════════════ */}
      <section className={styles.sliderSection}>
        <div className={styles.sliderInner}>

          {/* Static left text */}
          <div className={styles.sliderLeft}>
            <h2 className={styles.sliderHeadline}>
              Learn <em>essential</em><br />
              career<br />
              and life skills
            </h2>
            <p className={styles.sliderSubtext}>
              Upskiill helps you build in-demand skills fast and advance your career in a changing world.
            </p>
          </div>

          {/* Scrolling carousel */}
          <div
            className={styles.carouselWrap}
            onMouseEnter={stopAutoPlay}
            onMouseLeave={startAutoPlay}
          >
            <div
              className={styles.carouselTrack}
              style={{ transform: `translateX(${trackOffset})` }}
            >
              {CATEGORIES.map((cat) => (
                <Link
                  href={cat.href}
                  key={cat.name}
                  className={styles.categoryCard}
                >
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    width={400}
                    height={240}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardFooter}>
                    <span className={styles.cardName}>{cat.name}</span>
                    <span className={styles.cardArrow}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Dot + chevron navigation */}
        <div className={styles.sliderNav}>
          <button className={styles.navBtn} onClick={prevGroup} aria-label="Previous">‹</button>
          {Array.from({ length: TOTAL_GROUPS }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeGroup ? styles.dotActive : ''}`}
              onClick={() => goToGroup(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
          <button className={styles.navBtn} onClick={nextGroup} aria-label="Next">›</button>
        </div>
      </section>
    </div>

      {/* ══════════════════════════════════════════
          PART 3 — WHY LEARN WITH UPSKIILL
      ══════════════════════════════════════════ */}
      <section className={styles.whySection}>
        <div className={styles.whyInner}>
          <div className={styles.whyHeader}>
            <h2 className={styles.whyTitle}>Why learn with Upskiill?</h2>
            <p className={styles.whySubtitle}>
              Everything you need to learn, grow, and get ahead — all in one place.
            </p>
          </div>

          <div className={styles.whyGrid}>
            {WHY_FEATURES.map((feat) => (
              <div key={feat.title} className={styles.whyCard}>
                {feat.soon && (
                  <span className={styles.comingSoonBadge}>Coming Soon</span>
                )}
                <div className={styles.iconCircle}>{feat.icon}</div>
                <h3 className={styles.whyCardTitle}>{feat.title}</h3>
                <p className={styles.whyCardBody}>{feat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
