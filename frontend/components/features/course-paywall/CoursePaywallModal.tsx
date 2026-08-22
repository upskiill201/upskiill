'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaXmark,
  FaBook,
  FaBullseye,
  FaPenToSquare,
  FaAward,
  FaCloud,
  FaStar,
  FaCrown,
  FaCircleCheck,
  FaShieldHalved,
  FaLock,
  FaBolt,
  FaRotateLeft,
  FaHeart,
  FaGamepad,
  FaPuzzlePiece,
  FaFire,
  FaBell,
  FaTrophy,
  FaBrain,
  FaRobot,
  FaRocket,
  FaChevronLeft,
  FaChevronRight,
  FaCcVisa,
  FaCcMastercard,
  FaCcApplePay,
  FaGooglePay,
  FaMobileScreenButton,
} from 'react-icons/fa6';
import { Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playWinSound } from '@/utils/audio';
import { playHaptic } from '@/lib/haptics';
import { calculateCoursePricingLadder, AccessPlanType } from '@/lib/pricing-engine';
import styles from './CoursePaywallModal.module.css';

interface CoursePaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle?: string;
  basePrice?: number;
  course?: any;
  completedLessons?: string[];
  onSuccess?: () => void;
}

const VALUE_PROP_SLIDES = [
  {
    id: 1,
    tag: 'LEARN + PLAY',
    icon: FaGamepad,
    iconColor: '#0172FD',
    iconBg: '#EFF6FF',
    headline: "Learning shouldn't feel boring",
    subheadline: 'Turn learning into an engaging game.',
    body: 'Most platforms give you endless video lectures and dry quizzes. Teyro turns learning into an interactive quest: XP, coins, streak fires, challenges, and achievements make every step feel rewarding.',
    takeaway: 'I can actually enjoy learning this.',
    highlights: ['XP, Coins & Gem Rewards', 'Interactive Duolingo-style Steps', 'Unlock Mystery Chests & Badges'],
  },
  {
    id: 2,
    tag: 'BITE-SIZED PROGRESS',
    icon: FaPuzzlePiece,
    iconColor: '#0284C7',
    iconBg: '#F0F9FF',
    headline: "Learning shouldn't feel overwhelming",
    subheadline: 'Big skills. Small achievable steps.',
    body: 'Starting a whole new skill can feel like looking up at a mountain. Teyro breaks courses into 5-minute bite-sized lessons so you never feel intimidated. One lesson. One challenge. One step forward.',
    takeaway: "I don't need hours to make progress.",
    highlights: ['5-Minute Focused Lessons', 'Clear Sequential Milestones', 'No Overwhelming Mountain of Videos'],
  },
  {
    id: 3,
    tag: 'HABIT BUILDING',
    icon: FaFire,
    iconColor: '#EA580C',
    iconBg: '#FFF7ED',
    headline: "Starting isn't the hard part. Staying is.",
    subheadline: 'Build a habit you actually come back to.',
    body: "Most people don't fail because they can't learn — they fail because they stop coming back. Teyro builds momentum through daily streaks, quick goals, and rewarding feedback that makes consistency effortless.",
    takeaway: 'Teyro helps me actually stick with this.',
    highlights: ['Daily Streak Protection', 'Momentum-Driven Rewards', 'Easy Daily Next Steps'],
  },
  {
    id: 4,
    tag: 'ACCOUNTABILITY COMPANION',
    icon: FaBell,
    iconColor: '#F59E0B',
    iconBg: '#FEFCE8',
    headline: "You shouldn't have to remember everything",
    subheadline: 'Tey remembers for you and keeps you moving.',
    body: 'Life gets busy and you miss a day. Tey notices. With witty, caring check-ins and personalized reminders, Teyro is an accountability companion that will not let your goals quietly fade away.',
    takeaway: 'Teyro actually cares whether I keep learning.',
    highlights: ['Smart Inactivity Nudges', 'Personalized Follow-ups', 'Tey Has Your Back'],
  },
  {
    id: 5,
    tag: 'SOCIAL & COMMUNITY',
    icon: FaTrophy,
    iconColor: '#D97706',
    iconBg: '#FEF9C3',
    headline: 'Learning alone is harder',
    subheadline: 'Learn alongside people who share your goals.',
    body: "Teyro turns learning into a shared journey. Live weekly leaderboards, peer challenges, and friendly competition give you the extra push: see who's ahead, compete, and climb the ranks together.",
    takeaway: "I'm part of something, not learning in isolation.",
    highlights: ['Weekly League Leaderboards', 'Peer Challenge Quests', 'Shared Milestone Wins'],
  },
  {
    id: 6,
    tag: 'ACTIVE RECALL & MASTERY',
    icon: FaBrain,
    iconColor: '#8B5CF6',
    iconBg: '#FAF5FF',
    headline: "Watching videos isn't learning",
    subheadline: "Don't just consume. Build the capability.",
    body: "A course shouldn't end with 'Congratulations, you watched everything.' Teyro uses the proven Learn → Apply → Reflect → Deepen cycle so you actually build, practice, and retain the skill for the real world.",
    takeaway: "I'm here to become truly capable.",
    highlights: ['Hands-On Interactive Tasks', 'Reflection & Recall Questions', 'Capstone Project Mastery'],
  },
  {
    id: 7,
    tag: 'ADAPTIVE AI GUIDANCE',
    icon: FaRobot,
    iconColor: '#0EA5E9',
    iconBg: '#F0F9FF',
    headline: "Your learning shouldn't be one-size-fits-all",
    subheadline: 'Teyro learns from how you learn.',
    body: 'As you progress, Teyro understands what you have mastered, where you struggle, and what you skip. Adaptive guidance gives you targeted practice when you need help, and pushes you when you are ready for more.',
    takeaway: 'Personalized to my pace and strengths.',
    highlights: ['Dynamic Weak-Spot Practice', 'Adaptive Difficulty Challenges', 'Guided Next-Step Direction'],
  },
  {
    id: 8,
    tag: 'THE TEYRO PROMISE',
    icon: FaRocket,
    iconColor: '#16A34A',
    iconBg: '#F0FDF4',
    headline: 'This is learning, the Teyro way 🚀',
    subheadline: 'Learn. Play. Practice. Compete. Keep going.',
    body: "Teyro isn't just where you watch courses. It's where you build the lifelong habit of learning and turn ambition into tangible skills.",
    takeaway: "I'm ready to keep going.",
    highlights: ['Complete All Course Modules', 'Verified Completion Certificate', 'Full Lifetime Progress Saved'],
  },
];

export default function CoursePaywallModal({
  isOpen,
  onClose,
  courseId,
  courseTitle = 'Course',
  basePrice = 30,
  course,
  completedLessons = [],
  onSuccess,
}: CoursePaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<AccessPlanType>('MONTHLY');
  const [currentSlide, setCurrentSlide] = useState<number>(0); // 0 = Choose Access (Pricing), 1..8 = Value Prop Slides
  const [paymentProvider, setPaymentProvider] = useState<'STRIPE' | 'MESOMB'>('STRIPE');
  const [momoService, setMomoService] = useState<'MTN' | 'ORANGE'>('MTN');
  const [momoPhone, setMomoPhone] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Dynamic pricing ladder
  const ladder = useMemo(() => calculateCoursePricingLadder(basePrice), [basePrice]);

  const currentSelectedPlanData = useMemo(() => {
    if (selectedPlan === 'WEEKLY') return ladder.weekly;
    if (selectedPlan === 'YEARLY') return ladder.yearly;
    return ladder.monthly;
  }, [selectedPlan, ladder]);

  // Extract sections & lesson counts
  const sections = useMemo(() => {
    if (course?.sections && Array.isArray(course.sections)) return course.sections;
    if (course?.curriculum && Array.isArray(course.curriculum)) return course.curriculum;
    return [
      { title: 'Foundations', lessons: [{ id: '1' }, { id: '2' }] },
      { title: 'Core Skills', lessons: [{ id: '3' }, { id: '4' }, { id: '5' }] },
      { title: 'Advanced Mastery', lessons: [{ id: '6' }, { id: '7' }, { id: '8' }, { id: '9' }] },
    ];
  }, [course]);

  const totalLessonsCount = useMemo(() => {
    const count = sections.reduce((acc: number, s: any) => acc + (s.lessons?.length || 0), 0);
    return count > 0 ? count : 12;
  }, [sections]);

  const completedCount = useMemo(() => {
    if (completedLessons && completedLessons.length > 0) {
      return completedLessons.length;
    }
    return 2;
  }, [completedLessons]);

  const progressPercent = Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));

  const amountXAF = useMemo(() => {
    return Math.round(currentSelectedPlanData.price * 600).toLocaleString();
  }, [currentSelectedPlanData.price]);

  const handleSelectPlan = (plan: AccessPlanType) => {
    playHaptic('light');
    setSelectedPlan(plan);
    setErrorMsg(null);
  };

  const handleNextSlide = () => {
    playHaptic('light');
    setCurrentSlide((prev) => (prev < VALUE_PROP_SLIDES.length ? prev + 1 : 0));
  };

  const handlePrevSlide = () => {
    playHaptic('light');
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : VALUE_PROP_SLIDES.length));
  };

  const handleSubscribe = async () => {
    const activeCourseId = course?.id || courseId;
    if (!activeCourseId) return;

    if (paymentProvider === 'MESOMB' && !momoPhone.trim()) {
      setErrorMsg('Please enter your Mobile Money phone number to receive the payment prompt.');
      return;
    }

    setIsSubscribing(true);
    setErrorMsg(null);
    playHaptic('medium');

    try {
      const res = await fetch('/api/payment/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          courseId: activeCourseId,
          plan: selectedPlan,
          provider: paymentProvider,
          phone: paymentProvider === 'MESOMB' ? momoPhone.trim() : undefined,
          service: paymentProvider === 'MESOMB' ? momoService : undefined,
          pricePaid: currentSelectedPlanData.price,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || errData?.message || 'Failed to unlock course. Please try again.');
      }

      const data = await res.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      playWinSound();
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#58CC02', '#0172FD', '#FF9600', '#22C55E'],
      });
      playHaptic('success');

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err: any) {
      console.error('Subscription error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      playHaptic('warning');
    } finally {
      setIsSubscribing(false);
    }
  };

  if (!isOpen) return null;

  const currentPropData = currentSlide > 0 ? VALUE_PROP_SLIDES[currentSlide - 1] : null;

  return (
    <AnimatePresence>
      <div className={styles.fullscreenOverlay}>
        {/* Floating Confetti Shapes */}
        <div className={`${styles.confetti} ${styles.confetti1}`} />
        <div className={`${styles.confetti} ${styles.confetti2}`} />
        <div className={`${styles.confetti} ${styles.confetti3}`} />
        <div className={`${styles.confetti} ${styles.confetti4}`} />
        <div className={`${styles.confetti} ${styles.confetti5}`} />
        <div className={`${styles.confetti} ${styles.confetti6}`} />

        {/* TOP CLOSE BUTTON */}
        <button
          className={styles.closeBtn}
          onClick={() => {
            playHaptic('light');
            onClose();
          }}
          aria-label="Close paywall"
        >
          <FaXmark size={18} />
        </button>

        {/* 2-COLUMN IMMERSIVE CANVAS */}
        <div className={styles.mainCanvas}>

          {/* ── LEFT COLUMN (HERO, MASCOT & VALUE CARD) ── */}
          <div className={styles.leftColumn}>
            <div className={styles.heroTextGroup}>
              <h1 className={styles.heroTitle}>
                You’re doing <span className={styles.heroHighlight}>amazing!</span>
              </h1>
              <p className={styles.heroSubtitle}>
                You’ve completed {completedCount} free lessons. Unlock the rest of the course to keep learning and reach your goals.
              </p>

              {/* Progress Capsule */}
              <div className={styles.progressCard}>
                <div className={styles.progressHeaderRow}>
                  <span className={styles.progressText}>
                    <strong>{completedCount}</strong> / {totalLessonsCount} lessons completed
                  </span>
                  <span className={styles.progressPercent}>{progressPercent}%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${Math.max(12, progressPercent)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Central Celebration Mascot Image */}
            <div className={styles.mascotContainer}>
              <div className={styles.mascotGlow} />
              <Image
                src="/User onbarding Assets/Step_7_tey_verified_state.PNG"
                alt="Celebration Tey Mascot"
                width={240}
                height={240}
                className={styles.mascotImage}
                priority
              />
            </div>

            {/* Bottom Value Feature Card */}
            <div className={styles.unlockValueCard}>
              <h3 className={styles.valueCardTitle}>Unlock everything in this course</h3>
              <div className={styles.featurePillRow}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIconWrap}>
                    <FaBook size={16} color="#16A34A" />
                  </div>
                  <span className={styles.featureLabel}>{totalLessonsCount} practical lessons</span>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIconWrap}>
                    <FaBullseye size={16} color="#16A34A" />
                  </div>
                  <span className={styles.featureLabel}>{sections.length} learning modules</span>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIconWrap}>
                    <FaPenToSquare size={16} color="#16A34A" />
                  </div>
                  <span className={styles.featureLabel}>Exercises & activities</span>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIconWrap}>
                    <FaAward size={16} color="#16A34A" />
                  </div>
                  <span className={styles.featureLabel}>Certificate of completion</span>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIconWrap}>
                    <FaCloud size={16} color="#16A34A" />
                  </div>
                  <span className={styles.featureLabel}>Learn anytime, anywhere</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (SLIDER CONTAINER CARD WITH PERSISTENT CTA) ── */}
          <div className={styles.rightColumn}>
            <div className={styles.rightCard}>

              {/* SLIDER NAVIGATION HEADER */}
              <div className={styles.sliderTopBar}>
                <div className={styles.sliderPagingLeft}>
                  {currentSlide === 0 ? (
                    <span className={styles.slideHeaderTag}>1. Choose Your Access</span>
                  ) : (
                    <button
                      type="button"
                      className={styles.backToPlansQuickBtn}
                      onClick={() => {
                        playHaptic('light');
                        setCurrentSlide(0);
                      }}
                    >
                      <FaChevronLeft size={10} />
                      <span>Back to Plans</span>
                    </button>
                  )}
                </div>

                {/* Arrow Controls & Dots */}
                <div className={styles.sliderControlsRight}>
                  <button
                    type="button"
                    className={styles.sliderArrowBtn}
                    onClick={handlePrevSlide}
                    aria-label="Previous slide"
                  >
                    <FaChevronLeft size={11} />
                  </button>

                  <div className={styles.dotsRow}>
                    <span
                      className={`${styles.navDot} ${currentSlide === 0 ? styles.navDotActive : ''}`}
                      onClick={() => setCurrentSlide(0)}
                    />
                    {VALUE_PROP_SLIDES.map((s, idx) => (
                      <span
                        key={s.id}
                        className={`${styles.navDot} ${currentSlide === idx + 1 ? styles.navDotActive : ''}`}
                        onClick={() => setCurrentSlide(idx + 1)}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className={styles.sliderArrowBtn}
                    onClick={handleNextSlide}
                    aria-label="Next slide"
                  >
                    <FaChevronRight size={11} />
                  </button>
                </div>
              </div>

              {/* SLIDE 0: CHOOSE YOUR ACCESS (PRICING PLANS) */}
              {currentSlide === 0 && (
                <motion.div
                  key="slide-pricing"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.18 }}
                  className={styles.slideWrapper}
                >
                  <div className={styles.accessHeaderRow}>
                    <h2 className={styles.accessTitle}>Choose your access</h2>
                    <div className={styles.cancelAnytimePill}>
                      <FaCircleCheck size={12} color="#16A34A" />
                      <span>Cancel anytime</span>
                    </div>
                  </div>

                  {/* 3 Pricing Cards Grid */}
                  <div className={styles.plansGrid}>
                    {/* WEEKLY */}
                    <div
                      className={`${styles.planCard} ${styles.planCardWeekly} ${
                        selectedPlan === 'WEEKLY' ? styles.planActiveWeekly : ''
                      }`}
                      onClick={() => handleSelectPlan('WEEKLY')}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={styles.planCardTop}>
                        <span className={styles.planNameWeekly}>WEEKLY</span>
                        <div className={styles.radioCircle}>
                          {selectedPlan === 'WEEKLY' && <div className={styles.radioDotWeekly} />}
                        </div>
                      </div>

                      <div className={styles.priceRow}>
                        <span className={styles.priceAmount}>${ladder.weekly.price.toFixed(2)}</span>
                        <span className={styles.pricePeriod}>/ week</span>
                      </div>

                      <span className={styles.planSubLabel}>Flexible access</span>

                      <div className={styles.planBottomPillGray}>
                        Billed every week
                      </div>
                    </div>

                    {/* MONTHLY (MOST POPULAR) */}
                    <div
                      className={`${styles.planCard} ${styles.planCardMonthly} ${
                        selectedPlan === 'MONTHLY' ? styles.planActiveMonthly : ''
                      }`}
                      onClick={() => handleSelectPlan('MONTHLY')}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={styles.topRibbonGreen}>
                        <FaStar size={11} color="#FFFFFF" />
                        <span>MOST POPULAR</span>
                      </div>

                      <div className={styles.planCardTop}>
                        <span className={styles.planNameMonthly}>MONTHLY</span>
                        <div className={`${styles.radioCircle} ${styles.radioCircleGreen}`}>
                          {selectedPlan === 'MONTHLY' && <div className={styles.radioDotGreen} />}
                        </div>
                      </div>

                      <div className={styles.priceRow}>
                        <span className={styles.priceAmount}>${ladder.monthly.price.toFixed(2)}</span>
                        <span className={styles.pricePeriod}>/ month</span>
                      </div>

                      <span className={styles.planSubLabelGreen}>Save 30% vs weekly</span>

                      <div className={styles.planBottomPillGreen}>
                        Billed every month
                      </div>
                    </div>

                    {/* YEARLY (BEST VALUE) */}
                    <div
                      className={`${styles.planCard} ${styles.planCardYearly} ${
                        selectedPlan === 'YEARLY' ? styles.planActiveYearly : ''
                      }`}
                      onClick={() => handleSelectPlan('YEARLY')}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={styles.topRibbonPurple}>
                        <FaCrown size={11} color="#FFFFFF" />
                        <span>BEST VALUE</span>
                      </div>

                      <div className={styles.planCardTop}>
                        <span className={styles.planNameYearly}>YEARLY</span>
                        <div className={`${styles.radioCircle} ${styles.radioCirclePurple}`}>
                          {selectedPlan === 'YEARLY' && <div className={styles.radioDotPurple} />}
                        </div>
                      </div>

                      <div className={styles.priceRow}>
                        <span className={styles.priceAmount}>${ladder.yearly.price.toFixed(2)}</span>
                        <span className={styles.pricePeriod}>/ year</span>
                      </div>

                      <span className={styles.planSubLabelPurple}>Save 76% vs weekly</span>

                      <div className={styles.planBottomPillPurple}>
                        Billed every year
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Switcher */}
                  <div className={styles.paymentSwitcherRow}>
                    <button
                      type="button"
                      className={`${styles.switchBtn} ${paymentProvider === 'STRIPE' ? styles.switchBtnActive : ''}`}
                      onClick={() => setPaymentProvider('STRIPE')}
                    >
                      Card / Stripe (International)
                    </button>
                    <button
                      type="button"
                      className={`${styles.switchBtn} ${paymentProvider === 'MESOMB' ? styles.switchBtnActive : ''}`}
                      onClick={() => setPaymentProvider('MESOMB')}
                    >
                      <FaMobileScreenButton size={12} />
                      Mobile Money (MTN / Orange)
                    </button>
                  </div>

                  {paymentProvider === 'MESOMB' && (
                    <div className={styles.momoBox}>
                      <div className={styles.momoNetworkRow}>
                        <button
                          type="button"
                          className={`${styles.networkBtn} ${momoService === 'MTN' ? styles.networkBtnMtn : ''}`}
                          onClick={() => setMomoService('MTN')}
                        >
                          MTN Mobile Money
                        </button>
                        <button
                          type="button"
                          className={`${styles.networkBtn} ${momoService === 'ORANGE' ? styles.networkBtnOrange : ''}`}
                          onClick={() => setMomoService('ORANGE')}
                        >
                          Orange Money
                        </button>
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter phone (e.g. 670123456)"
                        value={momoPhone}
                        onChange={(e) => setMomoPhone(e.target.value)}
                        className={styles.momoInput}
                      />
                      <p className={styles.momoNotice}>
                        Amount: <strong>{amountXAF} XAF</strong> · You will receive a prompt on your phone to approve.
                      </p>
                    </div>
                  )}

                  {/* Button to explore the value proposition slides */}
                  <button
                    type="button"
                    className={styles.explorePropsBtn}
                    onClick={() => {
                      playHaptic('light');
                      setCurrentSlide(1);
                    }}
                  >
                    <span>See Why Teyro Works ({VALUE_PROP_SLIDES.length} Key Promises)</span>
                    <FaChevronRight size={11} />
                  </button>
                </motion.div>
              )}

              {/* SLIDES 1 to 8: INDIVIDUAL VALUE PROPOSITION SLIDES */}
              {currentSlide > 0 && currentPropData && (
                <motion.div
                  key={`slide-${currentPropData.id}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.18 }}
                  className={styles.slideWrapper}
                >
                  <div className={styles.individualPropCard}>
                    {/* Top Tag & Badge */}
                    <div className={styles.propTopHeaderRow}>
                      <div
                        className={styles.propIconCircle}
                        style={{ backgroundColor: currentPropData.iconBg, color: currentPropData.iconColor }}
                      >
                        <currentPropData.icon size={18} />
                      </div>
                      <span className={styles.propTagLabel}>{currentPropData.tag}</span>
                      <span className={styles.propStepBadge}>
                        {currentSlide} of {VALUE_PROP_SLIDES.length}
                      </span>
                    </div>

                    {/* Main Headline & Subheading */}
                    <h3 className={styles.propMainHeadline}>{currentPropData.headline}</h3>
                    <h4 className={styles.propSubheading}>{currentPropData.subheadline}</h4>

                    {/* Body Text */}
                    <p className={styles.propBodyText}>{currentPropData.body}</p>

                    {/* Bullet Highlights */}
                    <div className={styles.propHighlightsList}>
                      {currentPropData.highlights.map((h, i) => (
                        <div key={i} className={styles.highlightItem}>
                          <FaCircleCheck size={12} color="#16A34A" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Learner Takeaway Banner */}
                    <div className={styles.propTakeawayBanner}>
                      <strong>Key takeaway:</strong> &ldquo;{currentPropData.takeaway}&rdquo;
                    </div>

                    {/* Quick navigation row */}
                    <div className={styles.slideBottomNavRow}>
                      <button
                        type="button"
                        className={styles.backToPlansActionBtn}
                        onClick={() => {
                          playHaptic('light');
                          setCurrentSlide(0);
                        }}
                      >
                        <FaChevronLeft size={10} />
                        <span>Choose Access (${currentSelectedPlanData.price.toFixed(2)})</span>
                      </button>

                      <button
                        type="button"
                        className={styles.nextSlideActionBtn}
                        onClick={handleNextSlide}
                      >
                        <span>{currentSlide < VALUE_PROP_SLIDES.length ? 'Next Reason ➔' : 'Back to Start ↺'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error Message Display */}
              {errorMsg && (
                <div className={styles.errorMsgBox}>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* ── PERSISTENT ACTION CTA (VISIBLE ACROSS ALL SLIDES) ── */}
              <div className={styles.ctaWrapper}>
                <button
                  type="button"
                  className={styles.duoActionBtn3D}
                  onClick={handleSubscribe}
                  disabled={isSubscribing}
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 size={20} className={styles.spinner} />
                      <span>Unlocking Course...</span>
                    </>
                  ) : (
                    <>
                      <FaLock size={15} />
                      <span>
                        Unlock & Continue Learning (${currentSelectedPlanData.price.toFixed(2)})
                      </span>
                    </>
                  )}
                </button>

                <div className={styles.instantAccessNotice}>
                  <FaBolt size={12} color="#EAB308" />
                  <span>You’ll get instant access to all locked lessons</span>
                </div>
              </div>

              {/* ── PERSISTENT 3-PILL TRUST BAR ── */}
              <div className={styles.trustBarCard}>
                <div className={styles.trustBarItem}>
                  <div className={styles.trustIconBlue}>
                    <FaShieldHalved size={16} color="#0EA5E9" />
                  </div>
                  <div className={styles.trustItemText}>
                    <strong>Secure payments</strong>
                    <p>Your payment information is safe and encrypted.</p>
                  </div>
                </div>

                <div className={styles.trustBarItem}>
                  <div className={styles.trustIconPurple}>
                    <FaRotateLeft size={16} color="#8B5CF6" />
                  </div>
                  <div className={styles.trustItemText}>
                    <strong>Cancel anytime</strong>
                    <p>Keep access until the end of your billing period.</p>
                  </div>
                </div>

                <div className={styles.trustBarItem}>
                  <div className={styles.trustIconPink}>
                    <FaHeart size={16} color="#EC4899" />
                  </div>
                  <div className={styles.trustItemText}>
                    <strong>Progress saved</strong>
                    <p>Your progress is saved and always yours.</p>
                  </div>
                </div>
              </div>

              {/* ── PERSISTENT PAYMENT LOGOS ── */}
              <div className={styles.paymentLogosBar}>
                <span className={styles.weAcceptText}>We accept</span>
                <div className={styles.logosWrap}>
                  <span className={styles.logoBadge}><FaCcVisa size={22} color="#1A1F71" /></span>
                  <span className={styles.logoBadge}><FaCcMastercard size={22} color="#EB001B" /></span>
                  <span className={styles.logoBadge}><FaCcApplePay size={22} color="#000000" /></span>
                  <span className={styles.logoBadge}><FaGooglePay size={22} color="#5F6368" /></span>
                  <span className={styles.momoChip}>MoMo</span>
                  <span className={styles.omChip}>Orange</span>
                </div>
              </div>

              {/* ── PERSISTENT FOOTER MICROCOPY ── */}
              <footer className={styles.rightCardFooter}>
                <p>
                  <FaLock size={11} style={{ marginRight: 4 }} />
                  Recurring billing. You’ll be charged automatically until you cancel.
                </p>
                <Link href="/terms" target="_blank" className={styles.refundLink}>
                  View refund policy
                </Link>
              </footer>

            </div>
          </div>

        </div>
      </div>
    </AnimatePresence>
  );
}
