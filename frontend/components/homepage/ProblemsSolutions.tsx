'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Network, Bot, Zap, Trophy, Briefcase } from 'lucide-react';
import styles from './ProblemsSolutions.module.css';

const unifiedProblems = [
  {
    title: 'Analysis Paralysis',
    problemText: 'Thousands of redundant courses. Students don\'t know where to start or what to learn.',
    solutionTitle: 'Skill Gap Analyzer',
    solutionText: 'Upload a CV or job description. AI instantly generates your personalized path.',
    icon: <Network className={styles.lucideIcon} />
  },
  {
    title: 'Learning in the Dark',
    problemText: 'No live coaching. Students get stuck on complex STEM concepts and ghost the course.',
    solutionTitle: '24/7 AI Tutor',
    solutionText: 'Live context-aware AI coaching. Get un-stuck instantly at 3am.',
    icon: <Bot className={styles.lucideIcon} />
  },
  {
    title: 'Offline = Out of Luck',
    problemText: 'Huge video files require fast internet, leaving billions of global learners behind.',
    solutionTitle: 'Lite Mode Architecture',
    solutionText: '2G-optimized audio-first downloads. Learn anywhere, anytime.',
    icon: <Zap className={styles.lucideIcon} />
  },
  {
    title: 'The Motivation Cliff',
    problemText: 'Learning feels like a chore with no visible day-to-day progression.',
    solutionTitle: 'Gamified Progression',
    solutionText: 'Earn XP, track sub-streaks, and build visible public momentum.',
    icon: <Trophy className={styles.lucideIcon} />
  },
  {
    title: 'Learning ≠ Earning',
    problemText: 'Certificates hold no real-world weight. Students graduate with no portfolio.',
    solutionTitle: 'Teyro Marketplace',
    solutionText: 'Convert lab projects directly into paid freelance gigs starting day one.',
    icon: <Briefcase className={styles.lucideIcon} />
  }
];

export default function ProblemsSolutions({ onOpenModal }: { onOpenModal?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track mobile state to provide a readable vertical sequential view instead of overlap
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Increased to 600vh (in CSS) to give lots of scrolling/reading time
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  const mockupScale = useTransform(progress, [0, 0.15], [0.8, 1]);
  const mockupOpacity = useTransform(progress, [0, 0.1], [0, 1]);
  const mockupMobileY = useTransform(progress, [0, 1], [0, -200]);

  // Card Positions mapping
  const getCardTransforms = (index: number) => {
    // ---- DESKTOP (ORBITAL EXPLOSION) ----
    // We lowered explosion distance so cards don't clip off the top/bottom edges
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    const explosionDistX = screenWidth > 1400 ? 500 : 380;
    const explosionDistY = screenHeight > 900 ? 400 : 280;
    
    // Spread angles beautifully horizontally (less vertical displacement)
    const angles = [-140, -70, 0, 70, 140];
    const angleDeg = angles[index];
    const angleRad = (angleDeg * Math.PI) / 180;

    const expandX = Math.sin(angleRad) * explosionDistX;
    // Compress the Y axis specifically so top cards (angle 0) don't go off-screen
    const expandY = -Math.cos(angleRad) * explosionDistY * 0.7; 

    // Final locked arrangement (tighter orbit)
    const settleX = Math.sin(angleRad) * 260;
    const settleY = -Math.cos(angleRad) * 220 * 0.7;

    const midRotate = angleDeg * 0.3; 

    // Timings: [Spawn, Explode, HOLD FOR READING, Lock In]
    const deskX = useTransform(progress, [0, 0.15, 0.4, 0.8, 1], [0, 0, expandX, expandX, settleX]);
    const deskY = useTransform(progress, [0, 0.15, 0.4, 0.8, 1], [0, 0, expandY, expandY, settleY]);
    const deskRotate = useTransform(progress, [0, 0.15, 0.4, 0.8, 1], [0, 0, midRotate, midRotate, 0]);
    const deskScale = useTransform(progress, [0, 0.05, 0.15, 0.4, 0.8, 1], [0, 0, 0.6, 1.15, 1.15, 1]);
    const deskOpacity = useTransform(progress, [0, 0.05, 0.15, 0.9, 1], [0, 0, 1, 1, 1]);

    // ---- MOBILE (SEQUENTIAL CAROUSEL) ----
    // On mobile, users read one card at a time as it floats up and obscures the core.
    const startTrigger = index * 0.18; // 0, 0.18, 0.36, 0.54, 0.72
    const peakTrigger = startTrigger + 0.08;
    const endTrigger = startTrigger + 0.20;
    const fadeOutTrigger = endTrigger + 0.05;

    // Last card stays active at the end
    const slideY = useTransform(
      progress, 
      [0, startTrigger, peakTrigger, endTrigger, index === 4 ? 1 : fadeOutTrigger], 
      [100, 100, 20, 0, index === 4 ? 0 : -50]
    );
    const slideOpacity = useTransform(
      progress, 
      [0, startTrigger, peakTrigger, endTrigger, index === 4 ? 1 : fadeOutTrigger], 
      [0, 0, 1, 1, index === 4 ? 1 : 0]
    );
    const slideScale = useTransform(
      progress, 
      [0, startTrigger, peakTrigger, 1], 
      [0.8, 0.8, 1.05, 1]
    );

    return isMobile 
      ? { x: 0, y: slideY, rotate: 0, scale: slideScale, opacity: slideOpacity }
      : { x: deskX, y: deskY, rotate: deskRotate, scale: deskScale, opacity: deskOpacity };
  };

  const cardTransforms = unifiedProblems.map((_, i) => getCardTransforms(i));

  // The Header text also fades out slightly and scales down when we enter the intense machine focus
  const headerOpacity = useTransform(progress, [0, 0.1, 0.7, 1], [1, 1, 1, 0.1]);
  const headerY = useTransform(progress, [0, 0.2, 1], [0, -30, -100]);

  return (
    <div className={styles.scrollContainer} ref={containerRef}>
      <div className={styles.stickyCanvas}>
        
        {/* Header Content */}
        <motion.div 
          className={styles.header}
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <div className={styles.eyebrow}>The Problem We Solve</div>
          <h2 className={styles.heading}>
            Why platforms fail.<br />
            Here&apos;s how Teyro fixes it.
          </h2>
          <p className={styles.subheading}>
            Scroll to dismantle the legacy system and assemble the future.
          </p>
        </motion.div>

        {/* The Machine Stage */}
        <div className={styles.machineStage}>
          
          {/* Central Mockup */}
          <motion.div 
            className={styles.coreMockup}
            style={{ 
              scale: mockupScale, 
              opacity: mockupOpacity,
              y: isMobile ? mockupMobileY : 0 // Push up on mobile to make room for cards
            }}
          >
            <div className={styles.mockupInner}>
              <div className={styles.mockupPulse} />
              <h3>TEYRO ENGINE</h3>
              <p>v2.0 Orchestrator</p>
            </div>
          </motion.div>

          {/* Exploding / Sequential Cards */}
          {unifiedProblems.map((item, i) => {
            const { x, y, rotate, scale, opacity } = cardTransforms[i];
            
            return (
              <motion.div
                key={i}
                className={styles.explodedCard}
                style={{ 
                  x: cardTransforms[i].x, 
                  y: cardTransforms[i].y, 
                  rotate: cardTransforms[i].rotate, 
                  scale: cardTransforms[i].scale, 
                  opacity: cardTransforms[i].opacity 
                }}
              >
                <div className={styles.cardIcon}>{item.icon}</div>
                
                <div className={styles.problemSide}>
                  <span className={styles.labelCross}>✗ Problem</span>
                  <h4>{item.title}</h4>
                  <p>{item.problemText}</p>
                </div>
                
                <div className={styles.solutionSide}>
                  <span className={styles.labelCheck}>✓ Teyro Solution</span>
                  <h4>{item.solutionTitle}</h4>
                  <p>{item.solutionText}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}