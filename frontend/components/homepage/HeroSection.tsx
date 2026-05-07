'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Zap, ChevronRight, Shield, BookOpen, Brain, Sparkles, GraduationCap } from 'lucide-react';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/webhook/count')
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? 0))
      .catch(() => setCount(0));
  }, []);

  const countLabel =
    count === null ? '...' : count === 0 ? 'Be first' : `${count.toLocaleString()} joined`;

  /* Reliable Unsplash face photo IDs */
  const studentPhotos = [
    '1507003211169-0a1dd7228f2d', // man (top-right)
    '1517841905240-472988babdf9', // woman (mid-left) - fixed
    '1544005313-94ddf0286df2',    // man (mid-right)
    '1534528741775-53994a69daeb', // woman (bot-left)
  ];

  const creatorPhotos = [
    '1472099645785-5658abf4ff4e', // man creator 1
    '1573496359142-b8d87734a5a2', // woman creator 2 (center big)
    '1534528741775-53994a69daeb', // woman creator 3
  ];

  return (
    <section className={styles.hero}>
      {/* ── Blueprint grid overlay ── */}
      <div className={styles.grid} aria-hidden="true" />

      {/* ── Connecting Background Structural Lines ── */}
      <div className={styles.bgStructuralLinesWrap}>
        <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMin slice" className={styles.bgStructuralLinesSvg}>
          {/* Top Left to Left Card */}
          <line x1="140" y1="0" x2="140" y2="180" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 4" />
          <circle cx="140" cy="180" r="3" fill="#3B82F6" />

          {/* Left Card down to Students Card */}
          <path d="M 140 280 L 140 450 Q 140 470 160 470 L 350 470" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
          
          {/* Center Header down to Center Hub */}
          <path d="M 720 0 L 720 130" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
          <circle cx="720" cy="130" r="3" fill="#3B82F6" />

          {/* Center Hub down to bottom */}
          <path d="M 720 660 L 720 800" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
          <polygon points="716,780 724,780 720,788" fill="#3B82F6" />

          {/* Top Right to Right Card */}
          <line x1="1300" y1="0" x2="1300" y2="170" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 4" />

          {/* Right Card down to Creators Card */}
          <path d="M 1300 280 L 1300 450 Q 1300 470 1280 470 L 1090 470" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
        </svg>
      </div>

      {/* Removed old decorative vertical connectors to use the SVG above */}

      {/* ── LEFT CARD — Completion rate comparison ── */}
      <motion.div
        className={styles.cardLeft}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className={styles.statRow}>
          <div className={styles.statNumBox}>
            <span className={styles.statNum}>8</span>
            <div className={styles.statSymbols}>
              <span>*</span><span>%</span>
            </div>
          </div>
          <span className={styles.statRowLabel}>Without Teyro</span>
          <div className={styles.toggleOff}>
            <div className={styles.toggleKnob} />
          </div>
        </div>
        <div className={styles.statRow}>
          <div className={styles.statNumBox}>
            <span className={`${styles.statNum} ${styles.statBlue}`}>75</span>
            <div className={`${styles.statSymbols} ${styles.statBlue}`}>
              <span>*</span><span>%</span>
            </div>
          </div>
          <span className={styles.statRowLabel}>With Teyro</span>
          <div className={styles.toggleOn}>
            <div className={styles.toggleKnob} />
          </div>
        </div>
      </motion.div>

      {/* ── RIGHT CARD — AI Shield ── */}
      <motion.div
        className={styles.cardRight}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className={styles.cardRightBadge}>
          <span className={styles.greenDot} />
          AI-Powered Learning
        </div>
        <div className={styles.shieldBox}>
          <div className={styles.shieldRipple} />
          <div className={styles.shieldRipple2} />
          <div className={styles.shieldBtn}>
            <Shield size={18} strokeWidth={2.5} />
          </div>
        </div>
      </motion.div>

      {/* ── HERO CONTENT — centered ── */}
      <div className={styles.content}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <h1 className={styles.headline}>
            The Learning Platform<br />That Actually Works.
          </h1>

          <p className={styles.sub}>
            Teyro automates your learning path, speeding up skill acquisition
            while keeping you accountable to real outcomes.
          </p>

          <div className={styles.ctas}>
            <button className={styles.btnPrimary} onClick={onOpenModal} id="hero-join-waitlist-btn">
              <Zap size={15} />
              Join the waitlist
              <span className={styles.chip}>
                <span className={styles.chipDot} />
                {countLabel}
              </span>
            </button>
            <button
              className={styles.btnGhost}
              onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See what&apos;s coming
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM PLATFORM DIAGRAM ── */}
      <motion.div
        className={styles.diagram}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {/* Students Card — Exact 3x3 Grid */}
        <div className={styles.diagramCard}>
          <p className={styles.diagramCardLabel}>Students</p>
          <div className={styles.studentsGrid3x3}>
            {/* Row 1 */}
            <div className={styles.cellEmpty} />
            <div className={styles.cellPhoto}>
              <Image src={`https://images.unsplash.com/photo-${studentPhotos[0]}?w=300&h=300&fit=crop&crop=face`} alt="Student" fill className={styles.studentPhoto} unoptimized />
            </div>
            <div className={styles.cellEmpty} />
            {/* Row 2 */}
            <div className={styles.cellPhoto}>
              <Image src={`https://images.unsplash.com/photo-${studentPhotos[1]}?w=300&h=300&fit=crop&crop=face`} alt="Student" fill className={styles.studentPhoto} unoptimized />
            </div>
            <div className={styles.cellEmpty} />
            <div className={styles.cellPhoto}>
              <Image src={`https://images.unsplash.com/photo-${studentPhotos[2]}?w=300&h=300&fit=crop&crop=face`} alt="Student" fill className={styles.studentPhoto} unoptimized />
            </div>
            {/* Row 3 */}
            <div className={styles.cellEmpty} />
            <div className={styles.cellPhoto}>
              <Image src={`https://images.unsplash.com/photo-${studentPhotos[3]}?w=300&h=300&fit=crop&crop=face`} alt="Student" fill className={styles.studentPhoto} unoptimized />
            </div>
            <div className={styles.cellEmpty} />
          </div>
        </div>

        {/* Center — Connection area */}
        <div className={styles.connectionArea}>
          <div className={styles.connLeftGroup}>
            <div className={`${styles.iconCircle} ${styles.iconRed}`}>
              <div className={styles.iconInnerCircle} />
            </div>
            <div className={`${styles.iconCircle} ${styles.iconBlueCircle}`}>
              <BookOpen size={12} strokeWidth={3} />
            </div>
            <div className={`${styles.iconCircle} ${styles.iconPurpleCircle}`}>
              <Sparkles size={12} />
            </div>
          </div>
          
          <div className={styles.connLinesToCenter}>
            <svg width="60" height="120" viewBox="0 0 60 120" fill="none" className={styles.svgLines}>
              <path d="M0 20 C 30 20, 30 60, 60 60" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
              <path d="M0 60 L 60 60" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
              <path d="M0 100 C 30 100, 30 60, 60 60" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          <div className={styles.hubPill}>
            <Zap size={14} fill="white" />
            Teyro
          </div>

          <div className={styles.connRightLine}>
            <div className={styles.lineDashed} />
            <div className={styles.yellowStar}>
              <Sparkles size={10} color="#F59E0B" fill="#F59E0B" />
            </div>
            <div className={styles.lineDashed} />
          </div>
        </div>

        {/* Creators — Hub and Spoke diagram */}
        <div className={styles.creatorsWrap}>
          <div className={styles.diagramCard} style={{ marginTop: '16px' }}>
            <div className={styles.cxBadgeFloat}>
              <GraduationCap size={13} color="#D97706" />
              Your Creators
            </div>
            <div className={styles.creatorsHub}>
              <div className={styles.hubCenter}>
                <div className={styles.hubCenterIcon}>
                  <Sparkles size={20} color="#F59E0B" fill="#F59E0B" />
                </div>
              </div>
              
              {/* Spoke Items */}
              <div className={`${styles.spokeItem} ${styles.spokeTL}`}>
                <div className={styles.creatorCircle}>
                  <Image src={`https://images.unsplash.com/photo-${creatorPhotos[0]}?w=300&h=300&fit=crop&crop=face`} alt="Creator" fill className={styles.creatorPhoto} unoptimized />
                </div>
                <span>Creator 1</span>
              </div>
              
              <div className={`${styles.spokeItem} ${styles.spokeTR}`}>
                <div className={styles.creatorCircle}>
                  <Image src={`https://images.unsplash.com/photo-${creatorPhotos[2]}?w=300&h=300&fit=crop&crop=face`} alt="Creator" fill className={styles.creatorPhoto} unoptimized />
                </div>
                <span>Creator 3</span>
              </div>
              
              <div className={`${styles.spokeItem} ${styles.spokeBL}`}>
                <div className={styles.creatorSquareIcon}>
                  <Brain size={16} color="#8B5CF6" />
                </div>
                <span>AI</span>
              </div>
              
              <div className={`${styles.spokeItem} ${styles.spokeBC}`}>
                <div className={styles.creatorCircle}>
                  <Image src={`https://images.unsplash.com/photo-${creatorPhotos[1]}?w=300&h=300&fit=crop&crop=face`} alt="Creator" fill className={styles.creatorPhoto} unoptimized />
                </div>
                <span>Creator 2</span>
              </div>
              
              <div className={`${styles.spokeItem} ${styles.spokeBR}`}>
                <div className={styles.creatorSquareIcon}>
                  <Sparkles size={16} color="#10B981" />
                </div>
                <span>Brain</span>
              </div>

              {/* Connecting SVG Lines */}
              <svg className={styles.hubSvg} viewBox="0 0 200 160">
                <line x1="100" y1="80" x2="40" y2="30" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 2" />
                <line x1="100" y1="80" x2="160" y2="30" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 2" />
                <line x1="100" y1="80" x2="40" y2="130" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 2" />
                <line x1="100" y1="80" x2="100" y2="130" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 2" />
                <line x1="100" y1="80" x2="160" y2="130" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 2" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Removed old decorative vertical connector — bottom to use SVG */}
    </section>
  );
}