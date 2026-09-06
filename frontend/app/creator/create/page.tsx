'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  FaGraduationCap,
  FaClipboardCheck,
  FaArrowRight,
  FaArrowLeft,
  FaWandMagicSparkles,
  FaCheck,
  FaXmark,
  FaCode,
  FaPalette,
  FaBrain,
  FaBriefcase,
  FaChartPie,
  FaBullhorn,
  FaMobileScreen,
  FaShieldHalved,
  FaLightbulb,
  FaMusic,
  FaDumbbell,
  FaQuestion,
  FaBolt,
  FaRocket,
  FaFire,
  FaBullseye,
  FaTriangleExclamation
} from 'react-icons/fa6';
import { useComingSoon } from '../layout';
import styles from './Wizard.module.css';

// ─── VISUAL TAXONOMY CATEGORIES ───
const CATEGORIES = [
  { id: 'Programming & Development', label: 'Development', icon: <FaCode /> },
  { id: 'UI/UX & Product Design', label: 'Design', icon: <FaPalette /> },
  { id: 'AI & Machine Learning', label: 'Artificial Intelligence', icon: <FaBrain /> },
  { id: 'Business & Entrepreneurship', label: 'Business & Startups', icon: <FaBriefcase /> },
  { id: 'Data Science & Analytics', label: 'Data Science', icon: <FaChartPie /> },
  { id: 'Growth Marketing & SEO', label: 'Marketing', icon: <FaBullhorn /> },
  { id: 'Mobile App Development', label: 'Mobile Apps', icon: <FaMobileScreen /> },
  { id: 'Cybersecurity & Cloud', label: 'Cybersecurity', icon: <FaShieldHalved /> },
  { id: 'Personal Development', label: 'Personal Growth', icon: <FaLightbulb /> },
  { id: 'Music & Audio Production', label: 'Music & Audio', icon: <FaMusic /> },
  { id: 'Health & Fitness', label: 'Health & Fitness', icon: <FaDumbbell /> },
  { id: "I don't know yet", label: "I'll decide later", icon: <FaQuestion /> },
];

// ─── WEEKLY TIME INVESTMENT OPTIONS ───
const TIME_OPTIONS = [
  {
    id: '0-2',
    label: "I'm very busy right now (0-2 hours)",
    sub: 'Quick bite-sized micro-modules over time',
    icon: <FaBolt />,
    badge: 'Flexible'
  },
  {
    id: '2-4',
    label: "I'll work on this on the side (2-4 hours)",
    sub: 'Steady progress alongside your day job',
    icon: <FaRocket />,
    badge: 'Popular'
  },
  {
    id: '5+',
    label: 'I have lots of flexibility (5+ hours)',
    sub: 'Fast-track to launch in just a few weeks',
    icon: <FaFire />,
    badge: 'Sprint'
  },
  {
    id: 'undecided',
    label: "I haven't yet decided if I have time",
    sub: 'Build at your own leisure with no pressure',
    icon: <FaBullseye />,
    badge: 'Casual'
  }
];

// ─── QUICK TITLE STARTERS ───
const TITLE_STARTERS = [
  'The Complete Guide to ',
  'Zero to Hero: ',
  'Mastering ',
  'Hands-On Bootcamp: ',
  'Modern ',
  'Deep Dive: '
];

// ─── MASCOT SPEECH BUBBLE CONTENT ───
const STEP_COACHING = [
  {
    title: "What kind of learning experience are we creating?",
    subtitle: "Choose the format that best delivers your unique teaching style."
  },
  {
    title: "Every great course starts with an inspiring title!",
    subtitle: "Don't worry, you can fine-tune and rename your course anytime later."
  },
  {
    title: "Where does your superpower belong in the catalog?",
    subtitle: "Categorizing your course helps motivated students discover your lessons."
  },
  {
    title: "Consistency is key! How many hours a week can you invest?",
    subtitle: "We'll adapt your milestones and guidance to fit your weekly schedule."
  }
];

export default function CourseCreationWizard() {
  const router = useRouter();
  const { triggerComingSoon } = useComingSoon();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [courseType, setCourseType] = useState<'course' | 'test' | null>('course');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [timeWeekly, setTimeWeekly] = useState('');

  // Keyboard Shortcuts (Duolingo Style: Enter to proceed, 1/2 on Step 1)
  const isSubmittingRef = useRef(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === '1' && step === 1) {
        setCourseType('course');
      } else if (e.key === '2' && step === 1) {
        setCourseType('test');
      } else if (e.key === 'Enter' && !isNextDisabled()) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, courseType, title, category, timeWeekly]);

  const handleNext = () => {
    if (step === 1 && courseType === 'test') {
      triggerComingSoon('Practice Test Builder Engine');
      return;
    }
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      submitCourse();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleApplyTitleStarter = (starter: string) => {
    if (!title.startsWith(starter)) {
      setTitle(starter);
    }
  };

  const submitCourse = async () => {
    if (!title.trim()) return;
    // Guard both the keyboard path and the button path against double-fires —
    // two rapid Enter presses used to create two identical courses.
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: title.trim() || 'Untitled Course',
          category: category || "I don't know yet",
          creatorTimeWeekly: timeWeekly || "2-4 hours",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/creator/builder/${data.id}`);
      } else {
        const err = await res.json().catch(() => ({}));
        console.error('Failed to create course:', res.status, err);
        setErrorMsg(
          err.message ||
          `There was an error creating your course (${res.status}). Please try again.`
        );
      }
    } catch (err) {
      console.error('Network error:', err);
      setErrorMsg('A network connection error occurred. Please try again.');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const isNextDisabled = () => {
    if (step === 1 && !courseType) return true;
    if (step === 2 && !title.trim()) return true;
    if (step === 3 && !category) return true;
    if (step === 4 && (!timeWeekly || isSubmitting)) return true;
    return false;
  };

  const currentCoach = STEP_COACHING[step - 1];

  return (
    <div className={styles.layout}>
      {/* ─── STICKY DUOLINGO HEADER ─── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/creator" className={styles.logoLink}>
            <Image
              src="/teyro-logo-blue.png"
              alt="Teyro Studio"
              width={100}
              height={28}
              priority
              style={{ width: 'auto', aspectRatio: '100 / 28', height: '24px' }}
            />
          </Link>
          <div className={`${styles.stepPill} ${styles.stepPillActive}`}>
            <span>Step {step} of 4</span>
          </div>
        </div>

        {/* Chunky 3D Segmented Progress Bar */}
        <div className={styles.progressCenter}>
          <div className={styles.progressTrack3D}>
            <div
              className={styles.progressFill3D}
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <Link href="/creator" className={styles.exitBtn}>
          <FaXmark size={13} />
          <span>Exit</span>
        </Link>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className={styles.contentWrapper}>
        
        {/* Mascot Coaching Speech Bubble Header */}
        <div className={styles.mascotHeaderRow}>
          <div className={styles.mascotImageWrapper}>
            <Image
              src="/dashboard tey.webp"
              alt="Tey Mascot"
              fill
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={styles.speechBubble}>
            <h1 className={styles.speechTitle}>{currentCoach.title}</h1>
            <p className={styles.speechSubtitle}>{currentCoach.subtitle}</p>
          </div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className={styles.errorBanner}>
            <FaTriangleExclamation size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Step Card Container */}
        <div className={styles.stepCard} key={step}>
          
          {/* ─── STEP 1: COURSE TYPE ─── */}
          {step === 1 && (
            <div className={styles.typeGrid}>
              <div
                className={`${styles.typeCard} ${courseType === 'course' ? styles.selected : ''}`}
                onClick={() => setCourseType('course')}
              >
                <div className={styles.typeTopRow}>
                  <div className={styles.typeIconBox}>
                    <FaGraduationCap />
                  </div>
                  <span className={styles.keyHintBadge}>1</span>
                </div>
                <div className={styles.typeLabel}>Interactive Course</div>
                <p className={styles.typeDesc}>
                  Deliver structured learning journeys with rich micro-modules, interactive practice cards, and deep-dive coding exercises.
                </p>
              </div>

              <div
                className={`${styles.typeCard} ${courseType === 'test' ? styles.selected : ''}`}
                onClick={() => setCourseType('test')}
              >
                <div className={styles.typeTopRow}>
                  <div className={styles.typeIconBox}>
                    <FaClipboardCheck />
                  </div>
                  <span className={styles.keyHintBadge}>2</span>
                </div>
                <div className={styles.typeLabel}>Practice Exam Engine</div>
                <p className={styles.typeDesc}>
                  Prepare students for industry certifications with timed mock tests, question banks, and detailed rationale breakdowns.
                </p>
              </div>
            </div>
          )}

          {/* ─── STEP 2: WORKING TITLE ─── */}
          {step === 2 && (
            <div>
              <div className={styles.titleInputWrapper}>
                <input
                  type="text"
                  className={styles.duoInput}
                  placeholder="e.g. Full-Stack Next.js 15 & AI Engineering"
                  maxLength={60}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && title.trim()) handleNext();
                  }}
                />
                <div className={styles.charCount}>
                  <span>{title.length} / 60 characters</span>
                </div>
              </div>

              {/* Title Starters */}
              <div className={styles.startersSection}>
                <div className={styles.startersTitle}>
                  <FaWandMagicSparkles size={12} color="#0172FD" />
                  <span>Need inspiration? Try a title starter:</span>
                </div>
                <div className={styles.startersGrid}>
                  {TITLE_STARTERS.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      className={styles.starterPill}
                      onClick={() => handleApplyTitleStarter(starter)}
                    >
                      <span>{starter}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 3: CATEGORY & DOMAIN ─── */}
          {step === 3 && (
            <div className={styles.categoryGrid}>
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <div
                    key={cat.id}
                    className={`${styles.categoryCard} ${isSelected ? styles.selected : ''}`}
                    onClick={() => setCategory(cat.id)}
                  >
                    <div className={styles.categoryIconBox}>
                      {cat.icon}
                    </div>
                    <span className={styles.categoryTitle}>{cat.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── STEP 4: WEEKLY TIME COMMITMENT ─── */}
          {step === 4 && (
            <div className={styles.timeList}>
              {TIME_OPTIONS.map((opt) => {
                const isSelected = timeWeekly === opt.label;
                return (
                  <div
                    key={opt.id}
                    className={`${styles.timeCard} ${isSelected ? styles.selected : ''}`}
                    onClick={() => setTimeWeekly(opt.label)}
                  >
                    <div className={styles.timeCardLeft}>
                      <div className={styles.timeIconBox}>
                        {opt.icon}
                      </div>
                      <div>
                        <div className={styles.timeTitle}>{opt.label}</div>
                        <div className={styles.timeSub}>{opt.sub}</div>
                      </div>
                    </div>

                    <div className={styles.radioCircle}>
                      {isSelected && <FaCheck size={11} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>

      {/* ─── STICKY FOOTER ACTION BAR ─── */}
      <footer className={styles.footer}>
        {step > 1 ? (
          <button
            type="button"
            className={styles.button3dSecondary}
            onClick={handlePrevious}
            disabled={isSubmitting}
          >
            <FaArrowLeft size={13} />
            <span>Previous</span>
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          className={styles.button3dPrimary}
          onClick={handleNext}
          disabled={isNextDisabled()}
        >
          <span>{step === 4 ? (isSubmitting ? 'Creating Course...' : 'Create Course ✨') : 'Continue'}</span>
          {step < 4 && <FaArrowRight size={13} />}
        </button>
      </footer>
    </div>
  );
}