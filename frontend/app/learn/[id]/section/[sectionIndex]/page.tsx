'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Lock, Star, BookOpen, BookText, X, Swords, Info, PanelRightOpen, FileText, Video, Link as LinkIcon, Folder, LayoutTemplate } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import DashboardLayout, { useComingSoon } from '@/app/dashboard/layout';
import Skeleton from '@/components/ui/Skeleton';
import { StatPill } from '@/components/ui/StatPill';
import styles from './SectionView.module.css';

const cleanHtml = (rawStr: string) => {
  if (!rawStr) return '';
  // Safely strip HTML tags using regex
  let cleaned = rawStr.replace(/<\/?[^>]+(>|$)/g, '');
  // Decode common HTML entities
  cleaned = cleaned.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  return cleaned;
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
  setCompletedLessons: React.Dispatch<React.SetStateAction<string[]>>;
  streakDays: number;
  xpPoints: number;
  livesCount: number;
}

function SectionViewContent({
  course,
  section,
  sectionIndex,
  completedLessons,
  setCompletedLessons,
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
  const [lessonPhase, setLessonPhase] = useState<'start' | 'learn' | 'apply' | 'reflect' | 'deepen' | 'celebrate'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  let applyData = null;
  if (activeLesson?.contentBlocks?.apply && Array.isArray(activeLesson.contentBlocks.apply)) {
    applyData = activeLesson.contentBlocks.apply.find((b: any) => b.type === 'mcqActivity')?.value;
  }

  const applyQuestions = applyData?.questions && Array.isArray(applyData.questions) && applyData.questions.length > 0 
    ? applyData.questions 
    : [
        {
          questionText: "Which of the following is the main purpose of personal branding?",
          options: [
            { id: "opt_1", text: "To become famous on social media" },
            { id: "opt_2", text: "To copy other people and fit in" },
            { id: "opt_3", text: "To communicate your unique value and build trust" },
            { id: "opt_4", text: "To get more followers as quickly as possible" }
          ],
          correctOptionId: "opt_3",
          explanation: "Personal branding helps people understand who you are, what you stand for, and why you're different."
        }
      ];

  const applyScenario = applyData?.scenario || '';
  const currentQuestion = applyQuestions[currentQuestionIndex] || applyQuestions[0];

  const handleCheckAnswer = () => {
    if (selectedOptionIndex === null) return;
    playHaptic('medium');
    setIsAnswerChecked(true);
    const selectedOption = currentQuestion.options[selectedOptionIndex];
    setIsAnswerCorrect(selectedOption.id === currentQuestion.correctOptionId);
  };

  const handleApplyContinue = () => {
    playHaptic('medium');
    if (currentQuestionIndex < applyQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerChecked(false);
      setIsAnswerCorrect(false);
    } else {
      setLessonPhase('reflect');
      setCurrentQuestionIndex(0);
      setSelectedOptionIndex(null);
      setIsAnswerChecked(false);
    }
  };

  // REFLECT STATE & LOGIC
  const [reflectionText, setReflectionText] = useState('');
  const [guidedAnswers, setGuidedAnswers] = useState<string[]>([]);

  let reflectData = null;
  if (activeLesson?.contentBlocks?.reflect && Array.isArray(activeLesson.contentBlocks.reflect)) {
    reflectData = activeLesson.contentBlocks.reflect.find((b: any) => b.type === 'reflectActivity')?.value;
  }
  
  const reflectPrompt = reflectData?.prompt || "What's one key takeaway from this lesson?";
  const reflectType = reflectData?.type || 'open';
  
  // Open config
  const reflectOpenConfig = reflectData?.openConfig || { useStarters: true, starters: [], minWordCount: 20 };
  const reflectMinWords = reflectOpenConfig.minWordCount;
  const reflectStarters = reflectOpenConfig.useStarters ? reflectOpenConfig.starters : [];
  
  // Guided config
  const reflectGuidedConfig = reflectData?.guidedConfig || { questions: [], minWordCountPerQuestion: 10 };
  
  useEffect(() => {
    if (reflectType === 'guided' && reflectGuidedConfig.questions.length > 0 && guidedAnswers.length === 0) {
      setGuidedAnswers(new Array(reflectGuidedConfig.questions.length).fill(''));
    }
  }, [reflectType, reflectGuidedConfig, guidedAnswers.length]);

  const handleGuidedAnswerChange = (index: number, text: string) => {
    setGuidedAnswers(prev => {
      const newArr = [...prev];
      newArr[index] = text;
      return newArr;
    });
  };

  const handleStarterClick = (starterText: string) => {
    setReflectionText(prev => {
      if (prev.includes(starterText)) return prev;
      return prev ? `${prev}\n${starterText} ` : `${starterText} `;
    });
  };

  let canSubmitReflect = false;
  if (reflectType === 'open') {
    const wordCount = reflectionText.trim().split(/\s+/).filter(w => w.length > 0).length;
    canSubmitReflect = wordCount >= reflectMinWords;
  } else if (reflectType === 'guided') {
    canSubmitReflect = guidedAnswers.length > 0 && guidedAnswers.every(ans => {
      const wc = ans.trim().split(/\s+/).filter(w => w.length > 0).length;
      return wc >= reflectGuidedConfig.minWordCountPerQuestion;
    });
  }

  const handleReflectSubmit = () => {
    if (canSubmitReflect) {
      playHaptic('success');
      setLessonPhase('deepen');
    }
  };

  const handleStepBack = () => {
    playHaptic('medium');
    if (lessonPhase === 'learn') {
      setLessonPhase('start');
    } else if (lessonPhase === 'apply') {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
        setSelectedOptionIndex(null);
        setIsAnswerChecked(false);
        setIsAnswerCorrect(false);
      } else {
        setLessonPhase('learn');
      }
    } else if (lessonPhase === 'reflect') {
      setLessonPhase('apply');
      // Go back to the last question of the apply step
      setCurrentQuestionIndex(applyQuestions.length - 1);
      setSelectedOptionIndex(null);
      setIsAnswerChecked(false);
      setIsAnswerCorrect(false);
    } else if (lessonPhase === 'deepen') {
      setLessonPhase('reflect');
    }
  };

  const [selectedResource, setSelectedResource] = useState<any>(null);

  const deepenData = React.useMemo(() => {
    if (!activeLesson) return null;
    let parsedBlocks = activeLesson.contentBlocks;
    if (typeof parsedBlocks === 'string') {
      try { parsedBlocks = JSON.parse(parsedBlocks); } catch (e) {}
    }
    const deepenBlocks = parsedBlocks?.deepen;
    if (Array.isArray(deepenBlocks)) {
      return deepenBlocks.find((b: any) => b.type === 'deepenActivity')?.value;
    }
    return deepenBlocks?.deepenActivity || null;
  }, [activeLesson]);

  const deepenTitle = deepenData?.collectionTitle || 'More Rabbit Holes! 🐰';
  const deepenDesc = deepenData?.collectionDescription || 'Explore these helpful resources to master the topic.';
  const nextStepConfig = deepenData?.recommendedNextStep || { type: 'practice' };

  const handleDeepenFinish = async () => {
    playHaptic('success');
    try {
      const res = await fetch(`/api/courses/${params.id}/complete-lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: activeLesson.id })
      });
      if (res.ok) {
        if (!completedLessons.includes(activeLesson.id)) {
          setCompletedLessons(prev => [...prev, activeLesson.id]);
        }
      }
    } catch (e) {
      console.error('Error completing lesson:', e);
    }
    setLessonPhase('celebrate');
  };

  const handleCelebrateFinish = () => {
    playHaptic('medium');
    setActiveLesson(null);
    setLessonPhase('start');
  };

  const getSerpentineRows = (items: any[]) => {
    const rows: any[][] = [];
    let currentRow: any[] = [];
    for (let i = 0; i < items.length; i++) {
      currentRow.push(items[i]);
      if (currentRow.length === 3 || i === items.length - 1) {
        const rowIndex = rows.length;
        if (rowIndex % 2 === 1) {
          rows.push([...currentRow].reverse());
        } else {
          rows.push(currentRow);
        }
        currentRow = [];
      }
    }
    return rows;
  };

  const getNextStepInfo = (type: string) => {
    switch (type) {
      case 'continue':
        return {
          title: 'Next Lesson!',
          desc: 'Keep moving forward to the next lesson.'
        };
      case 'practice':
        return {
          title: 'Practice what you\'ve learned!',
          desc: 'Reinforce your knowledge with a quick challenge.'
        };
      case 'project':
        return {
          title: 'Submit your project!',
          desc: 'Upload your work to apply what you\'ve learned.'
        };
      case 'explore':
      default:
        return {
          title: 'Explore more topics!',
          desc: 'Check out other courses or lessons.'
        };
    }
  };

  const confettiParticles = React.useMemo(() => {
    const colors = ['#FF4B4B', '#FFC800', '#58CC02', '#00C9A7', '#FF6B8B', '#0172FD', '#A259FF'];
    
    // 170 Quick Explosive Burst particles
    const burstList = Array.from({ length: 170 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 100 + Math.random() * 320;
      const destX = Math.cos(angle) * speed;
      const destY = Math.sin(angle) * speed - 60; // Bias upward
      return {
        id: `b-${i}`,
        color: colors[i % colors.length],
        shape: ['circle', 'square', 'streamer'][i % 3],
        size: 5 + Math.random() * 9,
        startX: 0,
        startY: 50,
        destX,
        destY,
        rotate: Math.random() * 1080,
        delay: Math.random() * 0.25,
        duration: 1.0 + Math.random() * 1.5,
        type: 'burst' as const
      };
    });

    // 80 Continuous cascading falling particles
    const fallingList = Array.from({ length: 80 }).map((_, i) => {
      const startX = -200 + Math.random() * 400;
      const startY = -300 - Math.random() * 150;
      const destX = startX + (-60 + Math.random() * 120);
      const destY = 500 + Math.random() * 150;
      return {
        id: `f-${i}`,
        color: colors[i % colors.length],
        shape: ['circle', 'square', 'streamer'][i % 3],
        size: 5 + Math.random() * 9,
        startX,
        startY,
        destX,
        destY,
        rotate: Math.random() * 1440,
        delay: Math.random() * 4,
        duration: 4.5 + Math.random() * 4.0,
        type: 'falling' as const
      };
    });

    return [...burstList, ...fallingList];
  }, []);

  const getResourceIconInfo = (type: string) => {
    const t = type?.toLowerCase() || 'link';
    if (t.includes('fig') || t.includes('design') || t.includes('template')) {
      return {
        bg: '#A259FF',
        shadow: '#883EFF',
        icon: <LayoutTemplate size={32} strokeWidth={2.5} color="white" />,
        badge: 'Template'
      };
    } else if (t.includes('pdf') || t.includes('doc') || t.includes('docx')) {
      return {
        bg: '#FF4B4B',
        shadow: '#EA2B2B',
        icon: <FileText size={32} strokeWidth={2.5} color="white" />,
        badge: 'PDF Guide'
      };
    } else if (t.includes('video') || t.includes('mp4') || t.includes('youtube')) {
      return {
        bg: '#7C5CFF',
        shadow: '#613EEA',
        icon: <Video size={32} strokeWidth={2.5} color="white" />,
        badge: 'Video Tutorial'
      };
    } else if (t.includes('xls') || t.includes('xlsx') || t.includes('csv') || t.includes('sheet') || t.includes('data')) {
      return {
        bg: '#1EBE5D',
        shadow: '#119D48',
        icon: <FileText size={32} strokeWidth={2.5} color="white" />,
        badge: 'Data Sheet'
      };
    } else if (t.includes('link') || t.includes('url') || t.includes('website')) {
      return {
        bg: '#FFC800',
        shadow: '#E6B000',
        icon: <LinkIcon size={32} strokeWidth={2.5} color="white" />,
        badge: 'Useful Link'
      };
    } else if (t.includes('zip') || t.includes('rar') || t.includes('folder') || t.includes('source') || t.includes('file')) {
      return {
        bg: '#1CB0F6',
        shadow: '#0F9BD8',
        icon: <Folder size={32} strokeWidth={2.5} color="white" />,
        badge: 'Source Files'
      };
    } else if (t.includes('ppt') || t.includes('pptx') || t.includes('slides') || t.includes('presentation')) {
      return {
        bg: '#00C9A7',
        shadow: '#009E83',
        icon: <BookText size={32} strokeWidth={2.5} color="white" />,
        badge: 'Slide Deck'
      };
    } else {
      return {
        bg: '#FF6B8B',
        shadow: '#E04B6B',
        icon: <BookOpen size={32} strokeWidth={2.5} color="white" />,
        badge: 'Quick Notes'
      };
    }
  };
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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

  // CAROUSEL AUTO-PLAY INTERACTION
  useEffect(() => {
    if (!wylList || wylList.length <= 1 || lessonPhase !== 'start') return;
    const slideCount = wylList.filter(Boolean).slice(0, 5).length;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slideCount);
    }, 4500);
    return () => clearInterval(timer);
  }, [wylList, lessonPhase]);

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const threshold = 50;
    const slideCount = wylList.filter(Boolean).slice(0, 5).length;
    if (offset < -threshold) {
      setCurrentSlide(prev => (prev + 1) % slideCount);
    } else if (offset > threshold) {
      setCurrentSlide(prev => (prev - 1 + slideCount) % slideCount);
    }
  };

  const videoUrl = React.useMemo(() => {
    if (!activeLesson || !activeLesson.contentBlocks) return null;
    let parsedBlocks = activeLesson.contentBlocks;
    if (typeof parsedBlocks === 'string') {
      try { parsedBlocks = JSON.parse(parsedBlocks); } catch (e) {}
    }
    const learnBlocks = parsedBlocks?.learn;
    if (Array.isArray(learnBlocks)) {
      const videoBlock = learnBlocks.find((b: any) => b.type === 'videoUrl');
      if (videoBlock && typeof videoBlock.value === 'string' && videoBlock.value.trim() !== '') {
        return videoBlock.value;
      }
    }
    return null;
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
        {activeLesson && lessonPhase !== 'start' ? (
          <button onClick={handleStepBack} className={styles.backLink} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        ) : (
          <Link href={`/learn/${params.id}`} className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to Course</span>
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        
        {/* Main Column */}
        <div className={styles.mainColumn}>
          {activeLesson && lessonPhase === 'start' ? (
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
                      {cleanHtml(activeLesson.shortDescription)}
                    </div>
                  )}

                  {/* Stats Cards */}
                  <div className={styles.statsCardsRow}>
                    <div className={styles.statsCard}>
                      <div className={`${styles.statsCardIconWrap} ${styles.iconXpWrap}`} style={{ background: 'transparent' }}>
                        <Image src="/gem-icon.png" width={28} height={28} alt="XP Gem" style={{ objectFit: 'contain' }} />
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

                  {/* What you'll learn Carousel Slider */}
                  {wylList && Array.isArray(wylList) && wylList.filter(Boolean).length > 0 && (
                    <div className={styles.carouselContainer}>
                      <h3 className={styles.pointsListHeader}>You&apos;ll learn to:</h3>
                      <div className={styles.carouselWrapper}>
                        <AnimatePresence mode="wait">
                          {wylList.filter(Boolean).slice(0, 5).map((point: string, idx: number) => {
                            if (idx !== currentSlide) return null;
                            const { emoji, title, desc, bg } = parsePoint(point, idx);

                            return (
                              <motion.div
                                key={idx}
                                className={styles.carouselCard}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                initial={{ opacity: 0, x: 80, scale: 0.92 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -80, scale: 0.92 }}
                                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                              >
                                <div className={styles.emojiCircle} style={{ backgroundColor: bg }}>
                                  <span style={{ fontSize: '18px' }}>{emoji}</span>
                                </div>
                                <div className={styles.carouselTextContainer}>
                                  <span className={styles.carouselTitle}>{title}</span>
                                  {desc && <span className={styles.carouselDesc}>{desc}</span>}
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>

                      {/* Dots indicators */}
                      <div className={styles.carouselDots}>
                        {wylList.filter(Boolean).slice(0, 5).map((_, idx: number) => (
                          <button
                            key={idx}
                            className={`${styles.carouselDot} ${idx === currentSlide ? styles.carouselDotActive : ''}`}
                            onClick={() => setCurrentSlide(idx)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Centered 3D Start Button */}
              <div className={styles.btnContainerCentred}>
                <button 
                  onClick={() => {
                    playHaptic('medium');
                    setLessonPhase('learn');
                  }}
                  className={styles.startLessonBtn3D}
                >
                  START LESSON
                </button>
              </div>
            </div>
          ) : activeLesson && lessonPhase !== 'start' ? (
            <div className={styles.lessonLearnContainer}>
              {/* Stepper Progress Indicator (reusing same logic) */}
              {lessonPhase !== 'celebrate' && (
                <div className={styles.stepperContainer}>
                  <div className={styles.stepperWrapper}>
                    <div className={styles.stepperLineBg}></div>
                    <div className={styles.stepperLineActive} style={{ width: lessonPhase === 'learn' ? '0%' : lessonPhase === 'apply' ? '33%' : lessonPhase === 'reflect' ? '66%' : '100%' }}></div>
                    <div className={styles.stepperItem}>
                      <div className={`${styles.stepperCircle} ${lessonPhase === 'learn' ? styles.circleActive : styles.circleCompleted}`}>1</div>
                      <span className={`${styles.circleText} ${lessonPhase === 'learn' ? styles.circleTextActive : ''}`}>Learn</span>
                    </div>
                    <div className={styles.stepperItem}>
                      <div className={`${styles.stepperCircle} ${lessonPhase === 'apply' ? styles.circleActive : (lessonPhase === 'learn' ? styles.circleUpcoming : styles.circleCompleted)}`}>2</div>
                      <span className={`${styles.circleText} ${lessonPhase === 'apply' ? styles.circleTextActive : ''}`}>Apply</span>
                    </div>
                    <div className={styles.stepperItem}>
                      <div className={`${styles.stepperCircle} ${lessonPhase === 'reflect' ? styles.circleActive : (['learn', 'apply'].includes(lessonPhase) ? styles.circleUpcoming : styles.circleCompleted)}`}>3</div>
                      <span className={`${styles.circleText} ${lessonPhase === 'reflect' ? styles.circleTextActive : ''}`}>Reflect</span>
                    </div>
                    <div className={styles.stepperItem}>
                      <div className={`${styles.stepperCircle} ${lessonPhase === 'deepen' ? styles.circleActive : styles.circleUpcoming}`}>4</div>
                      <span className={`${styles.circleText} ${lessonPhase === 'deepen' ? styles.circleTextActive : ''}`}>Deepen</span>
                    </div>
                  </div>
                  
                  {/* Close Button on Right side of Stepper */}
                  <button 
                    onClick={() => { playHaptic('medium'); setActiveLesson(null); setLessonPhase('start'); }}
                    className={styles.closeLearnBtn}
                  >
                    <X size={20} strokeWidth={2.5} color="#AFBFCF" />
                  </button>
                </div>
              )}

              {/* LEARN PHASE */}
              {lessonPhase === 'learn' && (
                <>
                  <div className={styles.learnContentScroll}>
                <div className={styles.learnHeader}>
                  <span className={styles.letsLearnText}>Let&apos;s learn!</span>
                  <h2 className={styles.learnTitle}>{activeLesson.title}</h2>
                </div>

                {videoUrl ? (
                  <div className={styles.videoPlayerWrap} style={{ background: '#000' }}>
                    <video 
                      src={videoUrl} 
                      controls 
                      controlsList="nodownload"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <div className={styles.videoPlayerWrap} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9', boxShadow: 'none', border: '2px dashed #E2E8F0' }}>
                    <div style={{ textAlign: 'center', color: '#64748B' }}>
                      <Info size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#071233' }}>No video uploaded</h3>
                      <p style={{ margin: '8px 0 0', fontSize: '14px' }}>The creator hasn&apos;t attached a video to this lesson yet.</p>
                    </div>
                  </div>
                )}

                {/* Resources Section */}
                <div className={styles.resourcesSection}>
                  <div className={styles.resourcesHeader}>
                    <div className={styles.resourcesTitleBox}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#64748B"><path d="M4 6h16v12H4z" /></svg>
                      <h4>Resources</h4>
                    </div>
                    {activeLesson?.resources && activeLesson.resources.length > 0 && (
                      <button className={styles.downloadAllBtn}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m7-5l5 5 5-5m-5 5V3"/></svg>
                        Download all
                      </button>
                    )}
                  </div>

                  {activeLesson?.resources && activeLesson.resources.length > 0 ? (
                    <div className={styles.resourcesGrid}>
                      {activeLesson.resources.map((resource: any) => {
                        const type = resource.type?.toLowerCase() || 'unknown';
                        let iconClass = styles.resourceIconImg;
                        if (type.includes('pdf')) iconClass = styles.resourceIconPdf;
                        else if (type.includes('doc')) iconClass = styles.resourceIconDoc;
                        else if (type.includes('png') || type.includes('jpg') || type.includes('jpeg')) iconClass = styles.resourceIconImg;

                        const sizeText = resource.sizeBytes 
                          ? (resource.sizeBytes > 1024 * 1024 
                              ? `${(resource.sizeBytes / (1024 * 1024)).toFixed(1)} MB` 
                              : `${Math.round(resource.sizeBytes / 1024)} KB`)
                          : 'Unknown size';

                        return (
                          <a 
                            key={resource.id}
                            href={resource.storageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.resourceCard}
                            style={{ textDecoration: 'none' }}
                          >
                            <div className={iconClass}>{type.substring(0, 4).toUpperCase()}</div>
                            <div className={styles.resourceInfo}>
                              <span className={styles.resourceName}>{resource.title || resource.originalName || 'Resource'}</span>
                              <span className={styles.resourceMeta}>{type.toUpperCase()} • {sizeText}</span>
                            </div>
                            <button className={styles.downloadIconBtn} type="button">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m7-5l5 5 5-5m-5 5V3"/></svg>
                            </button>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ padding: '24px', textAlign: 'center', backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px dashed #E2E8F0', color: '#64748B' }}>
                      <p style={{ margin: 0, fontSize: '14px' }}>No resources attached to this lesson.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.stickyBottomBanner}>
                <div className={styles.bannerLeft}>
                  <Image src="/lesson Player/Hi there tey.png" width={100} height={100} alt="Tey" className={styles.bannerMascot} />
                  <div className={styles.bannerTextGroup}>
                    <h5>Watch the full lesson to continue</h5>
                    <p>You&apos;ll unlock the next step once you finish.</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.reflectBottomBtnWrap}>
                <button 
                  className={styles.reflectSubmitBtn}
                  onClick={() => { playHaptic('medium'); setLessonPhase('apply'); }}
                >
                  CONTINUE
                </button>
              </div>
            </>
          )}

          {/* APPLY PHASE */}
          {lessonPhase === 'apply' && (
            <>
              <div className={styles.learnContentScroll}>
                <div className={styles.applyHeaderRow}>
                  <span className={styles.applyBadge}>QUESTION {currentQuestionIndex + 1} OF {applyQuestions.length}</span>
                </div>
                {applyScenario && (
                  <div className={styles.applyScenarioBox}>
                    <p className={styles.applyScenarioText}>{applyScenario}</p>
                  </div>
                )}
                <div className={styles.applyQuestionContainer}>
                  <h2 className={styles.applyQuestionTitle}>{currentQuestion?.questionText || 'Question unavailable'}</h2>
                  <div className={styles.applyMascotWrap}>
                    <Image src="/lesson Player/Hi there tey.png" width={160} height={160} alt="Tey Quiz" className={styles.applyMascotImg} />
                    <div className={styles.questionMarkBubble}>?</div>
                  </div>
                </div>
                <div className={styles.applyOptionsGrid}>
                  {(currentQuestion?.options || []).map((option: any, idx: number) => {
                    const isSelected = selectedOptionIndex === idx;
                    return (
                      <button 
                        key={idx}
                        className={`${styles.applyOptionCard} ${isSelected ? styles.optionSelected : ''}`}
                        onClick={() => {
                          if (!isAnswerChecked) {
                            playHaptic('light');
                            setSelectedOptionIndex(idx);
                          }
                        }}
                        disabled={isAnswerChecked}
                      >
                        <div className={`${styles.optionLetter} ${isSelected ? styles.optionLetterSelected : ''}`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className={styles.optionText}>{option.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CELEBRATION INLINE BANNER & BOTTOM AREA */}
              <div className={styles.applyBottomArea}>
                <div 
                  className={`${styles.applyBottomBtnWrap} ${isAnswerChecked && isAnswerCorrect ? styles.applyBottomBtnWrapCorrect : ''} ${isAnswerChecked && !isAnswerCorrect ? styles.applyBottomBtnWrapWrong : ''}`}
                >
                  <AnimatePresence>
                    {isAnswerChecked && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={styles.celebrationHeaderRow}
                      >
                        <div className={styles.celebrationHeaderLeft}>
                          <div className={isAnswerCorrect ? styles.celebrationIconCircleCorrect : styles.celebrationIconCircleWrong}>
                            {isAnswerCorrect ? <Check size={20} strokeWidth={4} /> : <X size={20} strokeWidth={4} />}
                          </div>
                          <div>
                            <h4 className={isAnswerCorrect ? styles.celebrationTitleCorrect : styles.celebrationTitleWrong}>
                              {isAnswerCorrect ? 'Awesome!' : 'Incorrect'}
                            </h4>
                            <p className={isAnswerCorrect ? styles.celebrationExplanation : styles.celebrationExplanationWrong}>
                              {isAnswerCorrect 
                                ? currentQuestion.explanation 
                                : (selectedOptionIndex !== null && currentQuestion.options[selectedOptionIndex]?.misconception 
                                    ? currentQuestion.options[selectedOptionIndex].misconception 
                                    : currentQuestion.explanation)
                              }
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {!isAnswerChecked ? (
                    <button 
                      className={`${styles.checkAnswerBtn} ${selectedOptionIndex === null ? styles.btnDisabled : ''}`}
                      onClick={handleCheckAnswer}
                      disabled={selectedOptionIndex === null}
                    >
                      CHECK ANSWER
                    </button>
                  ) : (
                    <button 
                      className={isAnswerCorrect ? styles.continueBtnCorrect : styles.continueBtnWrong}
                      onClick={isAnswerCorrect ? handleApplyContinue : () => { setIsAnswerChecked(false); setSelectedOptionIndex(null); }}
                    >
                      {isAnswerCorrect ? 'CONTINUE' : 'GOT IT'}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {lessonPhase === 'reflect' && (
            <>
              {/* TOP AND MIDDLE CONTAINERS */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflowY: 'auto' }}>
                <div className={styles.reflectTitleRow}>
                  <div>
                    <span className={styles.applyBadge}>REFLECTION</span>
                    <h2 className={styles.reflectTitle}>Take a moment to reflect ✨</h2>
                    <div className={styles.reflectPrompt} dangerouslySetInnerHTML={{ __html: cleanHtml(reflectPrompt) }} />
                  </div>
                  <Image src="/lesson Player/Hi there tey.png" width={180} height={180} alt="Reflect Mascot" className={styles.reflectMascotImg} />
                </div>

                {reflectType === 'open' ? (
                  <>
                    {reflectStarters.length > 0 && (
                      <div style={{ marginTop: '24px' }}>
                        <p className={styles.reflectStartersTitle}>Need a little inspiration? Try these starters</p>
                        <div className={styles.reflectStartersWrap}>
                          {reflectStarters.map((starter: any, idx: number) => (
                            <button key={idx} className={styles.reflectStarterPill} onClick={() => handleStarterClick(starter.text)}>
                              <span className={styles.reflectStarterIcon}>+</span>
                              <span>{starter.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={styles.reflectTextareaWrap}>
                      <textarea 
                        className={styles.reflectTextarea} 
                        placeholder="Write your reflection here..."
                        value={reflectionText}
                        onChange={(e) => setReflectionText(e.target.value)}
                      />
                      <div className={`${styles.reflectWordCount} ${reflectionText.trim().split(/\s+/).filter(w => w.length > 0).length >= reflectMinWords ? styles.reflectWordCountSuccess : ''}`}>
                        {reflectionText.trim().split(/\s+/).filter(w => w.length > 0).length} / {reflectMinWords} words
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={styles.guidedQuestionsContainer}>
                    {reflectGuidedConfig.questions.map((q: any, idx: number) => {
                      const text = guidedAnswers[idx] || '';
                      const wc = text.trim().split(/\s+/).filter(w => w.length > 0).length;
                      const hasMet = wc >= reflectGuidedConfig.minWordCountPerQuestion;
                      return (
                        <div key={idx} className={styles.guidedQuestionCard}>
                          <h4 className={styles.guidedQuestionTitle}>
                            <span className={styles.guidedQuestionNum}>{idx + 1}.</span> {q.text}
                          </h4>
                          <div className={styles.reflectTextareaWrap}>
                            <textarea 
                              className={styles.reflectTextarea} 
                              placeholder="Type your answer here..."
                              value={text}
                              onChange={(e) => handleGuidedAnswerChange(idx, e.target.value)}
                            />
                            <div className={`${styles.reflectWordCount} ${hasMet ? styles.reflectWordCountSuccess : ''}`}>
                              {wc} / {reflectGuidedConfig.minWordCountPerQuestion} words
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className={styles.reflectGrowthBanner}>
                  <img src="/lesson Player/Hi there tey.png" alt="Growth Mascot" className={styles.reflectGrowthMascot} />
                  <p className={styles.reflectGrowthText}>
                    Your reflection helps you turn knowledge into growth.<br/>
                    Be honest. Be thoughtful. Be you. 💙
                  </p>
                </div>
              </div>

              {/* BOTTOM CONTAINER (Submit Button) */}
              <div className={styles.reflectBottomBtnWrap}>
                <button 
                  className={`${styles.reflectSubmitBtn} ${!canSubmitReflect ? styles.reflectBtnDisabled : ''}`}
                  onClick={handleReflectSubmit}
                  disabled={!canSubmitReflect}
                >
                  {!canSubmitReflect && <Lock size={18} strokeWidth={2.5} />}
                  SUBMIT REFLECTION
                </button>
              </div>
            </>
          )}

          {/* DEEPEN PHASE */}
          {lessonPhase === 'deepen' && (
            <>
              {/* TOP AND MIDDLE CONTAINERS */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflowY: 'auto' }} className={styles.deepenContentScroll}>
                <div className={styles.deepenHeader}>
                  <span className={styles.applyBadge}>DEEPEN</span>
                  <h2 className={styles.deepenTitle}>{deepenTitle}</h2>
                  <div className={styles.deepenDescription} dangerouslySetInnerHTML={{ __html: cleanHtml(deepenDesc) }} />
                </div>

                {/* Serpentine Pathway Grid */}
                {activeLesson?.resources && activeLesson.resources.length > 0 ? (
                  <div className={styles.deepenPathContainer}>
                    {/* SVG Connector Path Behind Buttons */}
                    <svg className={styles.deepenPathSvg} viewBox="0 0 600 400" fill="none" preserveAspectRatio="none">
                      <path 
                        d="M 100 60 C 250 60, 350 60, 500 60 C 560 60, 560 180, 500 180 C 350 180, 250 180, 100 180 C 40 180, 40 300, 100 300 C 250 300, 350 300, 500 300"
                        stroke="#E2E8F0"
                        strokeWidth="4"
                        strokeDasharray="8 8"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className={styles.deepenGrid}>
                      {getSerpentineRows(activeLesson.resources.slice(0, 8)).map((rowItems, rowIndex) => (
                        <div key={rowIndex} className={styles.deepenGridRow}>
                          {rowItems.map((res: any) => {
                            const iconInfo = getResourceIconInfo(res.type);
                            return (
                              <div key={res.id} className={styles.deepenGridItem}>
                                <motion.button
                                  type="button"
                                  onClick={() => { playHaptic('medium'); setSelectedResource(res); }}
                                  className={styles.deepenNodeBtn}
                                  style={{
                                    backgroundColor: iconInfo.bg,
                                    boxShadow: `0 8px 0 ${iconInfo.shadow}`
                                  }}
                                  whileTap={{
                                    y: 8,
                                    boxShadow: '0 0px 0 transparent'
                                  }}
                                >
                                  {iconInfo.icon}
                                </motion.button>
                                <span className={styles.deepenNodeTitle}>{res.title || 'Resource'}</span>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '40px 24px', textAlign: 'center', backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px dashed #E2E8F0', color: '#64748B', margin: '24px 0' }}>
                    <p style={{ margin: 0, fontSize: '15px' }}>No additional resources uploaded by the creator.</p>
                  </div>
                )}
              </div>

              {/* RECOMMENDED NEXT STEP & FINISH LESSON BOTTOM AREA */}
              <div className={styles.deepenBottomArea}>
                {/* Image container carrying the mascot image */}
                <div className={styles.deepenMascotCol}>
                  <img 
                    src="/User onbarding Assets/Step_7_tey_verified_state.webp" 
                    alt="Tey Verified" 
                    className={styles.deepenMascotImg} 
                  />
                </div>

                {/* Text container carrying the recommended step banner and finish lesson button */}
                <div className={styles.deepenTextCol}>
                  {/* Recommended Next Step Banner */}
                  <div className={styles.nextStepBanner}>
                    <div className={styles.nextStepIconCircle}>
                      {nextStepConfig.type === 'practice' ? '🎯' : nextStepConfig.type === 'project' ? '🏆' : nextStepConfig.type === 'explore' ? '🔍' : '🚀'}
                    </div>
                    <div className={styles.nextStepTextGroup}>
                      <span className={styles.nextStepBadge}>RECOMMENDED NEXT STEP</span>
                      <h5 className={styles.nextStepTitle}>{getNextStepInfo(nextStepConfig.type).title}</h5>
                      <p className={styles.nextStepDesc}>{getNextStepInfo(nextStepConfig.type).desc}</p>
                    </div>
                    <button className={styles.nextStepArrowBtn} onClick={handleDeepenFinish}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>

                  {/* Finish Lesson Button */}
                  <button 
                    className={styles.finishLessonBtn3D}
                    onClick={handleDeepenFinish}
                  >
                    FINISH LESSON
                  </button>
                </div>
              </div>

              {/* Resource Details Pop-up Modal */}
              <AnimatePresence>
                {selectedResource && (
                  <motion.div 
                    className={styles.modalOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedResource(null)}
                  >
                    <motion.div 
                      className={styles.resourceModal}
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className={styles.modalCloseBtn} onClick={() => setSelectedResource(null)}>
                        <X size={20} strokeWidth={2.5} />
                      </button>

                      <div className={styles.modalHeaderIcon} style={{ backgroundColor: getResourceIconInfo(selectedResource.type).bg }}>
                        {getResourceIconInfo(selectedResource.type).icon}
                      </div>

                      <span className={styles.modalBadge}>
                        {getResourceIconInfo(selectedResource.type).badge}
                      </span>

                      <h3 className={styles.modalResourceTitle}>{selectedResource.title || selectedResource.originalName}</h3>
                      
                      {selectedResource.description && (
                        <p className={styles.modalResourceDesc}>{selectedResource.description}</p>
                      )}

                      <div className={styles.modalMetaInfo}>
                        {selectedResource.sizeBytes && (
                          <span>Size: {(selectedResource.sizeBytes / (1024 * 1024)).toFixed(2)} MB</span>
                        )}
                        <span>Format: {selectedResource.type?.toUpperCase()}</span>
                      </div>

                      <a 
                        href={selectedResource.storageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.modalDownloadBtn3D}
                        onClick={() => setSelectedResource(null)}
                      >
                        DOWNLOAD RESOURCE
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* CELEBRATION PHASE */}
          {lessonPhase === 'celebrate' && (
            <div className={styles.celebrateContent}>
              {/* Confetti Explosion Burst */}
              <div className={styles.confettiWrapper}>
                {confettiParticles.map((p) => (
                  <motion.div
                    key={p.id}
                    className={`${styles.confettiPiece} ${styles[p.shape]}`}
                    style={{
                      backgroundColor: p.shape !== 'streamer' ? p.color : undefined,
                      borderColor: p.shape === 'streamer' ? p.color : undefined,
                      width: p.size,
                      height: p.shape === 'streamer' ? p.size * 2 : p.size,
                      position: 'absolute',
                      top: p.type === 'burst' ? '55%' : '0%',
                      left: p.type === 'burst' ? '50%' : '50%',
                      zIndex: 3,
                    }}
                    initial={{ 
                      x: p.startX, 
                      y: p.startY, 
                      scale: p.type === 'burst' ? 0.1 : 1, 
                      opacity: p.type === 'burst' ? 0 : 0.8, 
                      rotate: 0 
                    }}
                    animate={{
                      x: p.destX,
                      y: p.destY,
                      scale: p.type === 'burst' ? [0.1, 1, 1, 0.8, 0] : 1,
                      opacity: p.type === 'burst' ? [0, 1, 1, 0.8, 0] : [0, 0.9, 0.9, 0],
                      rotate: p.rotate,
                    }}
                    transition={{
                      duration: p.duration,
                      delay: p.delay,
                      ease: p.type === 'burst' ? 'easeOut' : 'linear',
                      repeat: Infinity,
                      repeatDelay: p.type === 'burst' ? Math.random() * 1.5 : 0.5,
                    }}
                  />
                ))}
              </div>

              {/* TOP CONTAINER - Mascot & Curved Title */}
              <div className={styles.celebrateTop}>
                {/* Duolingo style 3D Multi-colored SVG Curved Title */}
                <svg viewBox="0 0 500 160" className={styles.celebrateTitleSvg}>
                  <defs>
                    <path id="curveLesson" d="M 60 70 Q 250 15, 440 70" fill="none" />
                    <path id="curveComplete" d="M 40 145 Q 250 85, 460 145" fill="none" />
                  </defs>
                  <text className={styles.svgTextLesson}>
                    <textPath href="#curveLesson" startOffset="50%" textAnchor="middle">
                      <tspan fill="#FF4B4B">L</tspan>
                      <tspan fill="#FFC800">E</tspan>
                      <tspan fill="#58CC02">S</tspan>
                      <tspan fill="#00C9A7">S</tspan>
                      <tspan fill="#FF6B8B">O</tspan>
                      <tspan fill="#0172FD">N</tspan>
                    </textPath>
                  </text>
                  <text className={styles.svgTextComplete}>
                    <textPath href="#curveComplete" startOffset="50%" textAnchor="middle">
                      <tspan fill="#0172FD">C</tspan>
                      <tspan fill="#FF6B8B">O</tspan>
                      <tspan fill="#FF4B4B">M</tspan>
                      <tspan fill="#1CB0F6">P</tspan>
                      <tspan fill="#58CC02">L</tspan>
                      <tspan fill="#FFC800">E</tspan>
                      <tspan fill="#A259FF">T</tspan>
                      <tspan fill="#00C9A7">E</tspan>
                      <tspan fill="#FF4B4B">!</tspan>
                    </textPath>
                  </text>
                </svg>

                {/* Big Celebration Mascot Image */}
                <div className={styles.celebrateMascotContainer}>
                  <img 
                    src="/User onbarding Assets/Step_10_image.webp" 
                    alt="Lesson Complete Mascot" 
                    className={styles.celebrateMascotImg}
                  />
                </div>
              </div>

              {/* BOTTOM CONTAINER - Stats, Progress & Let's Go Button */}
              <div className={styles.celebrateBottom}>
                {/* Stats row */}
                <div className={styles.celebrateStatsRow}>
                  {/* Card 1: XP */}
                  <div className={styles.celebrateStatCard} style={{ borderColor: '#84D8FF' }}>
                    <div className={styles.celebrateStatIconWrap}>
                      <Image src="/gem-icon.png" width={42} height={42} alt="Gem XP Icon" className={styles.statIconImg} />
                    </div>
                    <div className={styles.celebrateStatTextGroup}>
                      <span className={styles.celebrateStatValue} style={{ color: '#0172FD' }}>+{activeLesson?.xpReward || 20} XP</span>
                      <span className={styles.celebrateStatLabel}>Earned</span>
                    </div>
                  </div>

                  {/* Card 2: Streak */}
                  <div className={styles.celebrateStatCard} style={{ borderColor: '#FFC800' }}>
                    <div className={styles.celebrateStatIconWrap}>
                      <Image src="/flame-icon.png" width={42} height={42} alt="Flame Streak Icon" className={styles.statIconImg} />
                    </div>
                    <div className={styles.celebrateStatTextGroup}>
                      <span className={styles.celebrateStatValue} style={{ color: '#FF9600' }}>{streakDays || 1}-Day</span>
                      <span className={styles.celebrateStatLabel}>Streak Active</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar card */}
                <div className={styles.celebrateProgressCard}>
                  <div className={styles.celebrateProgressBarContainer}>
                    <div className={styles.celebrateProgressBarFill} style={{ width: '100%' }}>
                      <span className={styles.celebrateProgressPercentText}>100%</span>
                    </div>
                  </div>
                  <p className={styles.celebrateProgressSub}>
                    All <strong style={{ color: '#58CC02' }}>4 lesson phases</strong> completed!
                  </p>
                </div>

                {/* LET'S GO! 3D Button */}
                <button 
                  className={styles.letsGoBtn3D}
                  onClick={handleCelebrateFinish}
                >
                  LET&apos;S GO!
                </button>
              </div>
            </div>
          )}

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

        {/* Sidebar - Fixed (drawer on mobile) */}
        <div
          className={`${styles.rightColumn} ${mobileSidebarOpen ? styles.mobileSidebarOpen : ''}`}
        >
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className={styles.mobileSidebarClose}
            aria-label="Close panel"
          >
            <X size={20} />
          </button>

          <div className={styles.drawerStatsRow}>
            <StatPill type="streak" value={streakDays} />
            <StatPill type="gem" value={xpPoints} />
            <StatPill type="lives" value={livesCount} />
          </div>

          <SectionSidebar
            completedCount={completedInSection}
            totalLessons={totalLessons}
            progressPercent={progressPercent}
            xpPoints={xpPoints}
            triggerComingSoon={triggerComingSoon}
          />
        </div>
      </div>

      {/* Mobile gamified toggle for the progress/reward panel */}
      <button
        type="button"
        onClick={() => setMobileSidebarOpen(true)}
        className={styles.mobileSidebarFab}
        aria-label="Open progress panel"
      >
        <PanelRightOpen size={22} />
        {progressPercent > 0 && (
          <span className={styles.mobileSidebarFabBadge}>{progressPercent}%</span>
        )}
      </button>

      {/* Mobile drawer backdrop */}
      {mobileSidebarOpen && (
        <div
          className={styles.mobileSidebarBackdrop}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

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
    <DashboardLayout isWide hideMobileChrome>
      <SectionViewContent
        course={course}
        section={section}
        sectionIndex={sectionIndex}
        completedLessons={completedLessons}
        setCompletedLessons={setCompletedLessons}
        streakDays={streakDays}
        xpPoints={xpPoints}
        livesCount={livesCount}
      />
    </DashboardLayout>
  );
}
