'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Lock, Star, BookOpen, BookText, X, Swords } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import DashboardLayout, { useComingSoon } from '@/app/dashboard/layout';
import Skeleton from '@/components/ui/Skeleton';
import { StatPill } from '@/components/ui/StatPill';
import styles from './SectionView.module.css';

const cleanHtml = (rawStr: string) => {
  if (!rawStr) return '';
  const div = document.createElement('div');
  div.innerHTML = rawStr;
  return div.textContent || div.innerText || '';
};

const parsePoint = (pointStr: string, index: number) => {
  const clean = cleanHtml(pointStr);
  
  // Regex to extract emoji at the start of the string
  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji})/u;
  const match = clean.match(emojiRegex);
  
  let emoji = '';
  let rest = clean;
  
  if (match) {
    emoji = match[1];
    rest = clean.slice(emoji.length).trim();
  }
  
  let title = rest;
  let desc = '';
  
  const separators = [' - ', ' : ', ': ', ' -'];
  for (const sep of separators) {
    if (rest.includes(sep)) {
      const parts = rest.split(sep);
      title = parts[0].trim();
      desc = parts.slice(1).join(sep).trim();
      break;
    }
  }
  
  const defaultEmojis = ['🎯', '💎', '⭐', '🔥', '🚀'];
  if (!emoji) {
    emoji = defaultEmojis[index % defaultEmojis.length];
  }
  
  const bgColors: { [key: string]: string } = {
    '🎯': '#F3E8FF',
    '💎': '#DCFCE7',
    '⭐': '#FEF9C3',
    '🔥': '#FFEDD5',
    '🚀': '#DBEAFE',
  };
  const bg = bgColors[emoji] || '#F1F5F9';
  
  return { emoji, title, desc, bg };
};

const SPRING_BOUNCE = { type: 'spring', stiffness: 400, damping: 22 } as const;
const SPRING_GENTLE = { type: 'spring', stiffness: 280, damping: 28 } as const;

const pageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ...SPRING_GENTLE, staggerChildren: 0.05 } },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 16 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { ...SPRING_BOUNCE, delay: i * 0.05 },
  }),
};

// Sinusoidal offsets for serpentine zig-zag
const getSerpentineMultiplier = (index: number) => {
  const cycle = index % 8;
  switch (cycle) {
    case 0: return 0;      // Center
    case 1: return 2.2;    // Right
    case 2: return 3.6;    // Extreme Right
    case 3: return 1.8;    // Right-Center
    case 4: return -1.8;   // Left-Center
    case 5: return -3.6;   // Extreme Left
    case 6: return -2.2;   // Left
    case 7: return 0;      // Center
    default: return 0;
  }
};

const getLessonColorTheme = (index: number) => {
  const themes = [
    { main: '#58cc02', shadow: '#46a302' }, // Green
    { main: '#1cb0f6', shadow: '#1899d6' }, // Blue
    { main: '#ff9600', shadow: '#e67e00' }, // Orange
    { main: '#ff4b4b', shadow: '#ea2b2b' }, // Red
    { main: '#a346ff', shadow: '#7e22ce' }, // Purple
  ];
  return themes[index % themes.length];
};

/* ─── SIDEBAR PROGRESS COMPONENT ─────────────────────────────────── */
interface SectionSidebarProps {
  completedCount: number;
  totalLessons: number;
  progressPercent: number;
  xpPoints: number;
  triggerComingSoon: (title: string) => void;
}

function SectionSidebar({
  completedCount,
  totalLessons,
  progressPercent,
  xpPoints,
  triggerComingSoon,
}: SectionSidebarProps) {
  const isCompleted = progressPercent === 100;
  const xpEarned = completedCount * 20;

  const handleClaim = () => {
    playHaptic('medium');
    triggerComingSoon('Claim mystery chest!');
  };

  return (
    <div className={styles.sidebarColumn}>
      {/* SECTION PROGRESS CARD */}
      <div className={styles.sidebarCard}>
        <h4 className={styles.sidebarCardTitle}>Section Progress</h4>
        <div className={styles.progressHeaderRow}>
          <div className={styles.donutContainer}>
            <svg width="90" height="90" viewBox="0 0 100 100" className={styles.donutSvg}>
              {/* Background 3D Track Shadow */}
              <circle cx="50" cy="53" r="41" className={styles.donutBgShadow} strokeWidth="9" />
              {/* Background 3D Track Cap */}
              <circle cx="50" cy="50" r="41" className={styles.donutBg} strokeWidth="9" />
              
              {/* Progress 3D Fill Shadow */}
              <circle 
                cx="50" 
                cy="53" 
                r="41" 
                className={styles.donutFillShadow} 
                strokeWidth="9"
                strokeDasharray="257.61"
                strokeDashoffset={257.61 - (257.61 * progressPercent) / 100}
                transform="rotate(-90 50 51.5)"
              />
              {/* Progress 3D Fill Cap */}
              <circle 
                cx="50" 
                cy="50" 
                r="41" 
                className={styles.donutFill} 
                strokeWidth="9"
                strokeDasharray="257.61"
                strokeDashoffset={257.61 - (257.61 * progressPercent) / 100}
                transform="rotate(-90 50 50)"
              />
              {/* Glossy highlight arc for the candy 3D look */}
              <circle cx="50" cy="50" r="41" className={styles.donutGloss} strokeWidth="9" />
            </svg>
            <div className={styles.donutText}>
              <span className={styles.donutPct}>{progressPercent}%</span>
              <span className={styles.donutLabel}>COMPLETE</span>
            </div>
          </div>

          <div className={styles.progressStatsList}>
            <div className={styles.progressStatItem}>
              <span className={styles.progressStatVal}>
                <strong>{completedCount} / {totalLessons}</strong>
              </span>
              <span className={styles.progressStatLabel}>Lessons Completed</span>
            </div>
            
            <div className={styles.progressStatItem}>
              <span className={styles.progressStatVal}>
                💎 <strong>{xpEarned} XP</strong>
              </span>
              <span className={styles.progressStatLabel}>Earned</span>
            </div>

            <div className={styles.progressStatItem}>
              <span className={styles.progressStatSubText}>
                {isCompleted ? "Amazing! You've completed this section." : "Keep learning to complete the section!"}
              </span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => triggerComingSoon(isCompleted ? 'Review Section' : 'Continue Section')}
          className={styles.sidebarCardBtn3D}
        >
          {isCompleted ? 'Review Section' : 'Continue Section'}
        </button>
      </div>

      {/* TEY'S MESSAGE CARD */}
      <div className={styles.messageCard}>
        <div className={styles.messageCardContent}>
          <span className={styles.messageHeader}>TEY&apos;S MESSAGE</span>
          <p className={styles.messageText}>
            {isCompleted 
              ? `"Excellent work! You've completed this section. You're one step closer to becoming a pro! 🚀"`
              : `"Hey! You're doing great. Let's complete the next lesson and keep our momentum high!"`
            }
          </p>
          <button 
            onClick={() => triggerComingSoon("Let's Continue!")}
            className={styles.button3dWhite}
          >
            Let&apos;s Continue!
          </button>
        </div>
        <div className={styles.messageCardMascot}>
          <Image 
            src="/User onbarding Assets/Step_7_tey_verified_state.PNG" 
            alt="Tey Mascot" 
            width={76} 
            height={76}
            className={styles.sidebarMascotImg}
            priority
          />
        </div>
      </div>

      {/* UNLOCK BONUS REWARD CARD */}
      <div className={styles.rewardCard}>
        <div className={styles.rewardCardContent}>
          <h4 className={styles.rewardCardTitle}>Unlock Bonus Reward!</h4>
          <p className={styles.rewardCardDesc}>
            Complete all lessons in this section to unlock a mystery chest.
          </p>
          
          <div className={styles.bonusProgressContainer}>
            <div className={styles.bonusProgressBar}>
              <div className={styles.bonusProgressFill} style={{ width: `${progressPercent}%` }} />
            </div>
            <span className={styles.bonusProgressText}>
              <strong>{completedCount} / {totalLessons}</strong> lessons completed
            </span>
          </div>

          <button 
            disabled={!isCompleted}
            onClick={handleClaim}
            className={isCompleted ? styles.button3dPrimaryFull : styles.button3dDisabledFull}
          >
            Claim Reward
          </button>
        </div>

        <div className={styles.chestWrapper}>
          <Image 
            src="/Tressure box.png" 
            alt="Mystery Chest" 
            width={90} 
            height={80}
            className={styles.chestImage}
            priority
          />
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION VIEW CONTENT ───────────────────────────────────────── */
interface SectionViewContentProps {
  course: any;
  section: any;
  sectionIndex: number;
  completedLessons: string[];
  streakDays: number;
  xpPoints: number;
  livesCount: number;
}

function SectionViewContent({
  course,
  section,
  sectionIndex,
  completedLessons,
  streakDays,
  xpPoints,
  livesCount,
}: SectionViewContentProps) {
  const params = useParams();
  const { triggerComingSoon } = useComingSoon();
  const lessons = section.lessons || [];
  const mapRef = useRef<HTMLDivElement>(null);

  const completedInSection = lessons.filter((l: any) =>
    completedLessons.includes(l.id)
  ).length;
  const totalLessons = lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedInSection / totalLessons) * 100) : 0;

  const activeLessonIndex = lessons.findIndex(
    (l: any) => !completedLessons.includes(l.id)
  );
  const currentActiveLessonIndex = activeLessonIndex === -1 ? lessons.length - 1 : activeLessonIndex;

  const [activePopoverIndex, setActivePopoverIndex] = useState<number | null>(null);
  const [showGuidebook, setShowGuidebook] = useState(false);
  const [activeLesson, setActiveLesson] = useState<any>(null);

  // Close speech bubble when clicking outside the map area
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (mapRef.current && !mapRef.current.contains(e.target as Node)) {
        setActivePopoverIndex(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Assemble Duolingo mixed milestone track
  const mapItems = React.useMemo(() => {
    const items: any[] = [];
    let lessonCounter = 0;

    lessons.forEach((lesson: any, lIdx: number) => {
      items.push({
        type: 'lesson',
        id: lesson.id,
        title: lesson.title,
        shortDescription: lesson.shortDescription,
        xpReward: lesson.xpReward || 20,
        lessonIndex: lIdx,
      });
      lessonCounter++;

      // Every after two lessons, insert a challenge
      if (lessonCounter % 2 === 0 && lIdx < lessons.length - 1) {
        items.push({
          type: 'challenge',
          id: `challenge-${sectionIndex}-${lessonCounter}`,
          title: 'Unit Challenge',
          shortDescription: 'Test your skills in a rapid-fire review challenge!',
          xpReward: 30,
        });
      }
    });

    // Final Trophy checkpoint
    items.push({
      type: 'trophy',
      id: `trophy-${sectionIndex}`,
      title: 'Section Reward Chest',
      shortDescription: 'Complete all lessons in this unit to open the final reward chest!',
    });

    return items;
  }, [lessons, sectionIndex]);

  const wylList = React.useMemo(() => {
    if (!activeLesson || !activeLesson.contentBlocks) return [];
    let parsedBlocks = activeLesson.contentBlocks;
    if (typeof parsedBlocks === 'string') {
      try { parsedBlocks = JSON.parse(parsedBlocks); } catch (e) {}
    }
    const learnBlocks = parsedBlocks?.learn;
    if (Array.isArray(learnBlocks)) {
      const wylBlock = learnBlocks.find((b: any) => b.type === 'whatYouWillLearn');
      if (wylBlock && Array.isArray(wylBlock.value)) {
        return wylBlock.value;
      }
    }
    return [];
  }, [activeLesson]);

  const handleNodeClick = (idx: number, isLocked: boolean) => {
    playHaptic('medium');
    setActivePopoverIndex(activePopoverIndex === idx ? null : idx);
  };

  const handleStartAction = (item: any) => {
    playHaptic('medium');
    setActivePopoverIndex(null);
    if (item.type === 'lesson') {
      const fullLesson = lessons.find((l: any) => l.id === item.id);
      if (fullLesson) {
        setActiveLesson(fullLesson);
      } else {
        triggerComingSoon(`Lesson Player: ${item.title}`);
      }
    } else if (item.type === 'challenge') {
      triggerComingSoon(`Starting Challenge: ${item.title}`);
    } else if (item.type === 'chest') {
      triggerComingSoon('Claiming Chest Rewards (50 XP!)');
    } else if (item.type === 'book') {
      setShowGuidebook(true);
    } else {
      triggerComingSoon('Completing section and issuing Certificate!');
    }
  };

  return (
    <motion.div
      className={styles.container}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Stats bar */}
      <div className={styles.topRow}>
        <Link href={`/learn/${params.id}`} className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Course</span>
        </Link>

        <div className={styles.statsRow}>
          <StatPill type="streak" value={streakDays} />
          <StatPill type="gem" value={xpPoints} />
          <StatPill type="lives" value={livesCount} />
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        
        {/* Main Column */}
        <div className={styles.mainColumn}>
          {activeLesson ? (
            <div className={styles.lessonPlayerInnerContainer}>
              {/* Duolingo Green Header matching design */}
              <div className={styles.duolingoHeader}>
                <div className={styles.headerLeft}>
                  <button 
                    onClick={() => { playHaptic('medium'); setActiveLesson(null); }} 
                    className={styles.headerBackBtn}
                    style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <ArrowLeft size={18} strokeWidth={3} color="white" />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>
                        SECTION {sectionIndex + 1}, UNIT 1
                      </span>
                      <h1 className={styles.headerTitleText} style={{ color: 'white', margin: 0, padding: 0, fontSize: '20px', fontWeight: 800, lineHeight: 1.2 }}>
                        {section.title}
                      </h1>
                    </div>
                  </button>
                </div>
                
                <button 
                  onClick={() => setShowGuidebook(true)}
                  className={styles.guidebookBtn}
                >
                  <BookOpen size={18} />
                  <span>GUIDEBOOK</span>
                </button>
              </div>

              {/* Stepper Progress Indicator */}
              <div className={styles.stepperContainer}>
                <div className={styles.stepperWrapper}>
                  {/* Connecting background lines */}
                  <div className={styles.stepperLineBg}></div>
                  <div className={styles.stepperLineActive} style={{ width: '0%' }}></div>

                  {/* Step 1: Learn */}
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${styles.circleActive}`}>1</div>
                    <span className={`${styles.circleText} ${styles.circleTextActive}`}>Learn</span>
                  </div>
                  
                  {/* Step 2: Apply */}
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${styles.circleUpcoming}`}>2</div>
                    <span className={styles.circleText}>Apply</span>
                  </div>
                  
                  {/* Step 3: Reflect */}
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${styles.circleUpcoming}`}>3</div>
                    <span className={styles.circleText}>Reflect</span>
                  </div>
                  
                  {/* Step 4: Deepen */}
                  <div className={styles.stepperItem}>
                    <div className={`${styles.stepperCircle} ${styles.circleUpcoming}`}>4</div>
                    <span className={styles.circleText}>Deepen</span>
                  </div>
                </div>
              </div>

              {/* Start Screen Body */}
              <div className={styles.startScreenBody}>
                {/* Mascot on Left with Floating Glowing Star */}
                <div className={styles.mascotLeftCol}>
                  <div className={styles.mascotContainer}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.mascotStar}>
                      <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" fill="#58cc02" />
                    </svg>
                    <Image
                      src="/lesson Player/Start_lesson_Tey.png"
                      alt="Tey Start Lesson Mascot"
                      width={360}
                      height={360}
                      className={styles.mascotWavingImg}
                      priority
                    />
                  </div>
                </div>

                {/* Details on Right */}
                <div className={styles.infoRightCol}>
                  <span className={styles.lessonIndexBadge}>
                    LESSON {lessons.findIndex((l: any) => l.id === activeLesson.id) + 1}
                  </span>

                  <h2 className={styles.lessonPlayerTitle}>
                    {activeLesson.title}
                  </h2>

                  {activeLesson.shortDescription && (
                    <div className={styles.lessonPlayerDesc}>
                      {(() => {
                        const textarea = document.createElement('textarea');
                        textarea.innerHTML = activeLesson.shortDescription;
                        return textarea.value;
                      })()}
                    </div>
                  )}

                  {/* Stats Cards */}
                  <div className={styles.statsCardsRow}>
                    <div className={styles.statsCard}>
                      <div className={`${styles.statsCardIconWrap} ${styles.iconXpWrap}`}>
                        ⚡
                      </div>
                      <div className={styles.statsCardText}>
                        <span className={styles.statsCardVal}>+{activeLesson.xpReward || 40} XP</span>
                        <span className={styles.statsCardLabel}>Reward</span>
                      </div>
                    </div>

                    <div className={styles.statsCard}>
                      <div className={`${styles.statsCardIconWrap} ${styles.iconTimeWrap}`}>
                        ⏱️
                      </div>
                      <div className={styles.statsCardText}>
                        <span className={styles.statsCardVal}>
                          {activeLesson.duration || (activeLesson.durationMinutes ? `${activeLesson.durationMinutes} min` : '10-12 min')}
                        </span>
                        <span className={styles.statsCardLabel}>Estimated time</span>
                      </div>
                    </div>
                  </div>

                  {/* What you'll learn list */}
                  {wylList && Array.isArray(wylList) && wylList.filter(Boolean).length > 0 && (
                    <>
                      <h3 className={styles.pointsListHeader}>You&apos;ll learn to:</h3>
                      <div className={styles.pointsList}>
                        {wylList.filter(Boolean).slice(0, 5).map((point: string, idx: number) => {
                          const { emoji, title, desc, bg } = parsePoint(point, idx);

                          return (
                            <div key={idx} className={styles.pointsListItem}>
                              <div className={styles.emojiCircle} style={{ backgroundColor: bg }}>
                                <span style={{ fontSize: '15px' }}>{emoji}</span>
                              </div>
                              <div className={styles.pointTextContainer}>
                                <span className={styles.pointTitle} style={{ fontWeight: 800 }}>{title}</span>
                                {desc && <span className={styles.pointDesc} style={{ color: '#64748B', fontSize: '12px' }}>{desc}</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Centered 3D Start Button */}
              <div className={styles.btnContainerCentred}>
                <button 
                  onClick={() => {
                    playHaptic('medium');
                    triggerComingSoon('Lesson Player: Next steps coming soon!');
                  }}
                  className={styles.startLessonBtn3D}
                >
                  START LESSON
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Duolingo Green Header */}
              <motion.div className={styles.duolingoHeader} variants={nodeVariants} custom={0}>
                <div className={styles.headerLeft}>
                  <Link href={`/learn/${params.id}`} className={styles.headerBackBtn}>
                    <ArrowLeft size={18} strokeWidth={3} />
                    <span>SECTION {sectionIndex + 1}, UNIT 1</span>
                  </Link>
                  <h1 className={styles.headerTitleText}>
                    {section.title}
                  </h1>
                </div>
                
                <button 
                  type="button" 
                  className={styles.guidebookBtn}
                  onClick={() => { playHaptic('medium'); setShowGuidebook(true); }}
                >
                  <BookText size={18} strokeWidth={2.5} />
                  <span>GUIDEBOOK</span>
                </button>
              </motion.div>

              {/* Serpentine Map Container — scrolls independently */}
              <div className={styles.journeyPathContainer} ref={mapRef}>
                
                {/* Always Visible Big Mascots on Left/Right Backdrop */}
                <div className={styles.pathMascotLeft}>
                  <Image
                    src="/User onbarding Assets/Step_7_tey_verified_state.PNG"
                    alt="Tey Mascot Left"
                    width={130}
                    height={130}
                    className={styles.sideMascotImg}
                    priority
                  />
                </div>

                <div className={styles.pathMascotRight}>
                  <Image
                    src="/User onbarding Assets/Step_7_tey_verified_state.PNG"
                    alt="Tey Mascot Right"
                    width={130}
                    height={130}
                    className={styles.sideMascotImg}
                    priority
                  />
                </div>

                {mapItems.map((item: any, idx: number) => {
                  // Calculate status of the map item
                  let isCompleted = false;
                  let isActive = false;
                  let isLocked = false;

                  if (item.type === 'lesson') {
                    isCompleted = completedLessons.includes(item.id);
                    isActive = item.lessonIndex === currentActiveLessonIndex;
                    isLocked = item.lessonIndex > currentActiveLessonIndex;
                  } else if (item.type === 'challenge') {
                    // Challenge is unlocked if lesson before it is completed
                    // Find matching index of lesson in lessons array
                    const beforeLessonIdx = lessons.findIndex((l: any) => l.title === mapItems[idx - 1]?.title);
                    isCompleted = beforeLessonIdx !== -1 && completedLessons.includes(lessons[beforeLessonIdx]?.id) && completedLessons.includes(lessons[beforeLessonIdx - 1]?.id);
                    isActive = !isCompleted && beforeLessonIdx !== -1 && completedLessons.includes(lessons[beforeLessonIdx]?.id);
                    isLocked = !isCompleted && !isActive;
                  } else if (item.type === 'trophy') {
                    isCompleted = progressPercent === 100;
                    isActive = !isCompleted && completedInSection === totalLessons;
                    isLocked = !isCompleted && !isActive;
                  }

                  const multiplier = getSerpentineMultiplier(idx);
                  const isPopoverOpen = activePopoverIndex === idx;

                  // Alternating layout sides: if wave shifts left (< 0), place bubble on right. Otherwise on left.
                  const isLeftBubble = multiplier >= 0;
                  const theme = item.type === 'lesson' ? getLessonColorTheme(item.lessonIndex) : { main: '#58cc02', shadow: '#46a302' };

                  return (
                    <div 
                      key={item.id} 
                      className={styles.journeyNodeRow}
                      style={{ height: '150px' }}
                    >
                      
                      {/* Platform Anchor aligned in serpentine curve */}
                      <div 
                        className={styles.duoPlatformAnchor}
                        style={{ '--offset-multiplier': multiplier } as React.CSSProperties}
                      >
                        
                        {/* Floating Active "START" Indicator */}
                        {isActive && !isPopoverOpen && (
                          <div className={styles.startBadgeBubble} style={{ color: theme.main }}>
                            <span>START</span>
                            <div className={styles.badgeArrow} />
                          </div>
                        )}

                        {/* Outer backing target dish ring (Active nodes only) */}
                        {isActive && (
                          <div className={styles.activeTargetRing} />
                        )}

                        {/* 3D Platform representation according to milestone types */}
                        {item.type === 'lesson' ? (
                          <motion.button
                            type="button"
                            onClick={() => handleNodeClick(idx, isLocked)}
                            className={`
                              ${styles.duoPedestal} 
                              ${isCompleted ? styles.duoPedestalCompleted : isActive ? styles.duoPedestalActive : styles.duoPedestalLocked}
                            `}
                            style={(!isLocked) ? {
                              backgroundColor: theme.main,
                              boxShadow: `0 8px 0 ${theme.shadow}`,
                            } : undefined}
                            whileTap={{
                              y: 8,
                              boxShadow: '0 0px 0 transparent',
                            }}
                            transition={{ type: 'spring', stiffness: 600, damping: 25 }}
                          >
                              {isCompleted ? (
                                <Check size={32} strokeWidth={4} color="white" />
                              ) : isActive ? (
                                <Star size={32} strokeWidth={3} fill="white" color="white" />
                              ) : (
                                <Lock size={28} strokeWidth={2.5} color="#afafaf" />
                              )}
                          </motion.button>
                        ) : item.type === 'challenge' ? (
                          <motion.button
                            type="button"
                            onClick={() => handleNodeClick(idx, isLocked)}
                            className={styles.chestNodeButton}
                            whileTap={!isLocked ? { scale: 0.92, y: 4 } : {}}
                          >
                            <Image 
                              src="/Tressure box.png" 
                              alt="Mystery Chest" 
                              width={74} 
                              height={66}
                              className={`${styles.chestImage} ${isLocked ? styles.chestLockedImg : ''}`}
                            />
                          </motion.button>
                        ) : (
                          <motion.button
                            type="button"
                            onClick={() => handleNodeClick(idx, isLocked)}
                            className={styles.chestNodeButton}
                            whileTap={!isLocked ? { scale: 0.92, y: 4 } : {}}
                          >
                            <Image 
                              src="/Tressure box.png" 
                              alt="Mystery Chest" 
                              width={74} 
                              height={66}
                              className={`${styles.chestImage} ${isLocked ? styles.chestLockedImg : ''}`}
                            />
                          </motion.button>
                        )}

                        {/* Permanent Lesson Info Card on Side (Desktop Only) */}
                        {item.type === 'lesson' && !isPopoverOpen && (
                          <div className={`
                            ${styles.nodeSideBubble} 
                            ${isLeftBubble ? styles.bubbleLeft : styles.bubbleRight}
                            ${isLocked ? styles.bubbleLocked : ''}
                          `}>
                            <h4 className={styles.bubbleTitle}>
                              {`${item.lessonIndex + 1}. ${item.title}`}
                            </h4>
                            <span className={styles.bubbleXp} style={{ color: theme.main }}>
                              XP +{item.xpReward}
                            </span>
                          </div>
                        )}

                        {/* Speech Bubble Popover dialog when selected */}
                        <AnimatePresence>
                          {isPopoverOpen && (
                            <motion.div 
                              className={`
                                ${styles.nodePopoverBubble}
                                ${item.type === 'lesson' ? (isLocked ? styles.popoverLocked : styles.popoverThemed) : ''}
                              `}
                              style={item.type === 'lesson' && !isLocked ? {
                                backgroundColor: theme.main,
                                borderColor: theme.main,
                                color: 'white',
                              } : undefined}
                              initial={{ opacity: 0, scale: 0.8, y: 15 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.85, y: 10 }}
                              transition={SPRING_BOUNCE}
                            >
                              <div 
                                className={styles.popoverArrowDown}
                                style={item.type === 'lesson' && !isLocked ? {
                                  backgroundColor: theme.main,
                                  borderColor: theme.main,
                                } : undefined}
                              />
                              
                              {item.type === 'lesson' ? (
                                isLocked ? (
                                  <>
                                    <h4 className={styles.popoverLockedTitle}>{item.title}</h4>
                                    <p className={styles.popoverLockedDesc}>Complete preceding lessons to unlock this!</p>
                                    <button className={styles.popoverLockedBtn} disabled>
                                      LOCKED
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <h4 className={styles.popoverThemedTitle}>{item.title}</h4>
                                    {item.shortDescription && (
                                      <p className={styles.popoverThemedDesc}>{cleanHtml(item.shortDescription)}</p>
                                    )}
                                    <button 
                                      className={styles.popoverThemedBtn}
                                      onClick={() => handleStartAction(item)}
                                      style={{
                                        color: theme.main,
                                        borderBottom: `4px solid ${theme.shadow}`,
                                      }}
                                    >
                                      START +{item.xpReward || 10} XP
                                    </button>
                                  </>
                                )
                              ) : (
                                // Fallback default rendering for challenges, trophies, etc.
                                <>
                                  <h4 className={styles.bubbleLessonTitle}>{item.title}</h4>
                                  <p className={styles.bubbleLessonDesc}>{cleanHtml(item.shortDescription)}</p>
                                  
                                  <div className={styles.bubbleFooter}>
                                    <span className={styles.bubbleRewardLabel}>
                                      {item.type === 'challenge' ? '💎 +30 XP' : 'Milestone'}
                                    </span>
                                    <button 
                                      className={styles.bubbleStartBtn}
                                      onClick={() => handleStartAction(item)}
                                    >
                                      {item.type === 'challenge' ? 'FIGHT' : 'OPEN'}
                                    </button>
                                  </div>
                                </>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>

                    </div>
                  );
                })}

              </div>
            </>
          )}
        </div>

        {/* Sidebar - Fixed */}
        <div className={styles.rightColumn}>
          <SectionSidebar
            completedCount={completedInSection}
            totalLessons={totalLessons}
            progressPercent={progressPercent}
            xpPoints={xpPoints}
            triggerComingSoon={triggerComingSoon}
          />
        </div>

      </div>

      {/* Guidebook Modal */}
      <AnimatePresence>
        {showGuidebook && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={SPRING_BOUNCE}
            >
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Guidebook</h3>
                <button 
                  onClick={() => setShowGuidebook(false)} 
                  className={styles.modalCloseBtn}
                >
                  <X size={20} />
                </button>
              </div>
              <div className={styles.modalBody}>
                <h4 className={styles.guideSectionTitle}>Section Overview</h4>
                <p className={styles.guideSectionText}>
                  {section.goal || "Welcome to the guidebook! Review these concepts to build core competencies."}
                </p>
                
                <h4 className={styles.guideSectionTitle}>Key Concepts & Vocabulary</h4>
                <ul className={styles.guideConceptsList}>
                  <li>
                    <strong>Design Thinking</strong>: A user-centric design method prioritizing empathy and feedback.
                  </li>
                  <li>
                    <strong>Information Architecture</strong>: Structure details so users find content easily.
                  </li>
                  <li>
                    <strong>Figma Basics</strong>: Navigating frames, vector shapes, layers, and layout grids.
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── PAGE ENTRY ─────────────────────────────────────────────────── */
export default function SectionViewPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [streakDays, setStreakDays] = useState(0);
  const [xpPoints, setXpPoints] = useState(0);
  const [livesCount] = useState(5);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const sectionIndex = parseInt(params.sectionIndex as string, 10);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`/api/courses/${params.id}`, { headers: { 'Cache-Control': 'no-cache' } });
        if (!res.ok) throw new Error('Course not found');
        const data = await res.json();
        setCourse(data);

        const progRes = await fetch(`/api/courses/${params.id}/progress`, {
          credentials: 'include',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (progRes.ok) {
          const pd = await progRes.json();
          setCompletedLessons(pd.completedLessons || []);
        }

        const profileRes = await fetch('/api/auth/me', { credentials: 'include' });
        if (profileRes.ok) {
          const pf = await profileRes.json();
          if (pf?.studentProfile) {
            setStreakDays(pf.studentProfile.streakDays || 0);
            setXpPoints(pf.studentProfile.xp || 0);
          }
        }
      } catch (e) {
        console.error('Failed to load course:', e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [params.id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className={styles.skeletonShell}>
          <div className={styles.skeletonMain}>
            <Skeleton height={140} style={{ background: '#E2E8F0', borderRadius: 16 }} />
            <Skeleton height={300} style={{ background: '#E2E8F0', borderRadius: 16 }} />
            <Skeleton height={300} style={{ background: '#E2E8F0', borderRadius: 16 }} />
          </div>
          <div className={styles.skeletonSide}>
            <Skeleton height={260} style={{ background: '#E2E8F0', borderRadius: 16 }} />
            <Skeleton height={160} style={{ background: '#E2E8F0', borderRadius: 16 }} />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout>
        <div className={styles.errorShell}>
          <h2>Course Not Found</h2>
          <button onClick={() => router.push('/dashboard/my-learning')} className={styles.errorBtn}>
            Back to My Learning
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const sections = course.sections || course.curriculum || [];
  const section = sections[sectionIndex];

  if (!section) {
    return (
      <DashboardLayout>
        <div className={styles.errorShell}>
          <h2>Section Not Found</h2>
          <p>This section doesn&apos;t exist in the course.</p>
          <button onClick={() => router.push(`/learn/${params.id}`)} className={styles.errorBtn}>
            Back to Course
          </button>
        </div>
      </DashboardLayout>
    );
  }



  return (
    <DashboardLayout isWide>
      <SectionViewContent
        course={course}
        section={section}
        sectionIndex={sectionIndex}
        completedLessons={completedLessons}
        streakDays={streakDays}
        xpPoints={xpPoints}
        livesCount={livesCount}
      />
    </DashboardLayout>
  );
}
