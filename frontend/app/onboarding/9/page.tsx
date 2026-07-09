'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, Gem, Trophy, Flame, Hand, Check, AlertCircle } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';
import { SpeechBubble } from '@/components/onboarding/SpeechBubble';

// Modular imports
import { useMessagePool } from '@/hooks/onboarding/useMessagePool';
import { ConfettiBurst } from '@/components/onboarding/ConfettiBurst';
import { StreakCounter } from '@/components/onboarding/StreakCounter';
import { MatchCard } from '@/components/onboarding/MatchCard';
import { DropSlot } from '@/components/onboarding/DropSlot';

type ShapeId = 'cube' | 'pyramid' | 'cylinder';

interface DraggableShape {
  id: ShapeId;
  img: string;
  label: string;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

const SHAPES: Record<ShapeId, string> = {
  cube: '/User onbarding Assets/step 9 shapes/step_9_square.PNG',
  pyramid: '/User onbarding Assets/step 9 shapes/step_9_triangle.PNG',
  cylinder: '/User onbarding Assets/step 9 shapes/step_9_cylinder.PNG',
};

const DRAGGABLES: DraggableShape[] = [
  { id: 'cylinder', img: SHAPES.cylinder, label: 'Cylinder' },
  { id: 'cube', img: SHAPES.cube, label: 'Cube' },
  { id: 'pyramid', img: SHAPES.pyramid, label: 'Pyramid' },
];

const TARGETS: { id: ShapeId; label: string }[] = [
  { id: 'cube', label: 'Cube' },
  { id: 'pyramid', label: 'Pyramid' },
  { id: 'cylinder', label: 'Cylinder' },
];

export default function OnboardingStep9() {
  const router = useRouter();
  const { isLoading, currentAnswer, saveAnswer, advance } = useOnboardingSession(9);
  
  // Custom message rotation pool
  const { getRandomMessage } = useMessagePool();

  // Animation controller for Tey mascot vertical bounce
  const mascotBounceControls = useAnimation();

  // Load state tracking for staggering sequences
  const [isLoaded, setIsLoaded] = useState(false);

  // Match / game status
  const [matched, setMatched] = useState<Record<ShapeId, boolean>>({
    cube: false,
    pyramid: false,
    cylinder: false,
  });

  const [finished, setFinished] = useState(false);
  const [streakDays, setStreakDays] = useState(9);
  const [gemsCount, setGemsCount] = useState(240);
  const [comboCount, setComboCount] = useState(0);

  // Sparkles/bursts particles state
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Incorrect shake states
  const [isShaking, setIsShaking] = useState<Record<ShapeId, boolean>>({
    cube: false,
    pyramid: false,
    cylinder: false,
  });

  // Magnetic proximity state
  const [isNear, setIsNear] = useState<Record<ShapeId, boolean>>({
    cube: false,
    pyramid: false,
    cylinder: false,
  });

  // Feedback Toast Notification
  const [feedbackToast, setFeedbackToast] = useState<{ message: string; type: 'correct' | 'combo' | 'incorrect' | 'complete' } | null>(null);

  // References to drop zones
  const targetRefs = {
    cube: useRef<HTMLDivElement>(null),
    pyramid: useRef<HTMLDivElement>(null),
    cylinder: useRef<HTMLDivElement>(null),
  };

  // Restore matched states from session answer state on load
  useEffect(() => {
    if (currentAnswer && currentAnswer.completed) {
      setMatched({ cube: true, pyramid: true, cylinder: true });
      setFinished(true);
      setGemsCount(250);
    }
  }, [currentAnswer]);

  // Start load stagger sequence
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleBack = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    router.push('/onboarding/8');
  };

  const handleContinue = () => {
    if (!finished) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12);
    saveAnswer({ skipped: false, completed: true });
    void advance();
  };

  const handleSkip = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    saveAnswer({ skipped: true });
    void advance();
  };

  // Check game status for complete celebration
  const allMatched = matched.cube && matched.pyramid && matched.cylinder;

  useEffect(() => {
    if (allMatched && !finished) {
      // 1.0s delay to allow user to visually settle the final block snap
      const timer = setTimeout(() => {
        setFinished(true);
        setGemsCount(250);

        // Trigger celebration message
        const completeMessage = getRandomMessage('onExerciseComplete');
        setFeedbackToast({ message: completeMessage, type: 'complete' });

        // Play completion vibration chord pattern
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([30, 80, 40, 100, 50]);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [allMatched, finished, getRandomMessage]);

  // Sparkles particle helper
  const triggerSparkles = (x: number, y: number) => {
    const newSparkles = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 40 - 20)
    }));
    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 450);
  };

  // Drag tracking to compute distance / proximity to target drop zone
  const handleDrag = (id: ShapeId, event: any, info: any) => {
    const targetElement = targetRefs[id].current;
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const distance = Math.hypot(
      info.point.x - (rect.left + rect.width / 2),
      info.point.y - (rect.top + rect.height / 2)
    );

    // Magnetic proximity threshold ~40px
    setIsNear(prev => ({ ...prev, [id]: distance < 45 }));
  };

  // Drag end drop validation
  const handleDragEnd = (id: ShapeId, event: any, info: any) => {
    const targetElement = targetRefs[id].current;
    setIsNear(prev => ({ ...prev, [id]: false }));
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const isInside =
      info.point.x >= rect.left &&
      info.point.x <= rect.right &&
      info.point.y >= rect.top &&
      info.point.y <= rect.bottom;

    if (isInside) {
      setMatched(prev => ({ ...prev, [id]: true }));
      
      // Calculate correct sequence streak / combo (2-3 correct without miss)
      const nextCombo = comboCount + 1;
      setComboCount(nextCombo);

      // Perform correct feedback toast
      if (nextCombo >= 2) {
        const comboMsg = getRandomMessage('onStreakOfThree');
        setFeedbackToast({ message: comboMsg, type: 'combo' });
      } else {
        const correctMsg = getRandomMessage('onCorrectMatch');
        setFeedbackToast({ message: correctMsg, type: 'correct' });
      }

      // Hide toast after 3s
      setTimeout(() => setFeedbackToast(null), 3000);

      // Haptic correct pulse (light tap)
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(8);
      }

      // Sparkles
      triggerSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);

      // Mascot vertical bounce
      void mascotBounceControls.start({
        y: [0, -15, 0],
        transition: { duration: 0.35, ease: "easeOut" }
      });

    } else {
      // Mistake resets combo
      setComboCount(0);

      // Trigger feedback toast (soft encouraging tone)
      const incorrectMsg = getRandomMessage('onIncorrect');
      setFeedbackToast({ message: incorrectMsg, type: 'incorrect' });
      setTimeout(() => setFeedbackToast(null), 3000);

      // Shake match card
      setIsShaking(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setIsShaking(prev => ({ ...prev, [id]: false }));
      }, 350);

      // Near-silent haptics (no vibration for mistakes, as requested)
    }
  };

  if (isLoading) return <StepSkeleton />;

  const textShadowGlow = '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9), 0 0 35px rgba(255,255,255,0.7)';

  return (
    <div className={`h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] flex flex-col relative select-none transition-all duration-500 ${
      comboCount >= 2 ? 'shadow-[inset_0_0_40px_rgba(1,114,253,0.06)]' : ''
    }`}>
      
      {/* Celebration Confetti Burst Overlay */}
      <ConfettiBurst active={finished} />

      {/* Full-Screen Victory Celebration Modal (Applies to both Mobile & Desktop for premium congrats feedback) */}
      <AnimatePresence>
        {finished && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-md px-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white rounded-[2.5rem] p-6 md:p-8 max-w-[420px] w-full border border-slate-100/80 shadow-[0_30px_70px_rgba(7,18,51,0.18)] relative flex flex-col items-center text-center gap-6 overflow-hidden"
            >
              {/* Sparkles background underlay inside the modal */}
              <MascotBackground />

              {/* Celebration Title header */}
              <div className="flex flex-col items-center gap-1.5">
                <Trophy className="w-8 h-8 text-yellow-500 fill-yellow-500 animate-bounce" />
                <h2 className="text-[#071233] font-[900] text-2xl md:text-3xl tracking-tight mt-1" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  Challenge Complete!
                </h2>
                <p className="text-slate-500 font-extrabold text-sm mt-1">
                  {feedbackToast?.message || "Amazing work!"}
                </p>
              </div>

              {/* Cheering Mascot victory animation */}
              <div className="relative w-36 h-36 md:w-40 md:h-40">
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, -3, 3, 0]
                  }}
                  transition={{ repeat: Infinity, repeatDelay: 1.2, duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src="/User onbarding Assets/Tey_step_9_img.PNG" 
                    alt="Tey Celebrating" 
                    fill 
                    className="object-contain" 
                  />
                </motion.div>
              </div>

              {/* Streak and gems counter charge-up widget */}
              <div className="w-full flex justify-center scale-95 md:scale-100">
                <StreakCounter
                  currentStreak={streakDays}
                  triggerCharge={finished}
                  gemsCount={gemsCount}
                  showGems={true}
                />
              </div>

              {/* Large premium 3D Continue button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                onClick={handleContinue}
                className="w-full h-[56px] bg-[#0172FD] border-b-4 border-[#0050B3] text-white hover:bg-[#0060D9] active:border-b-0 active:translate-y-1 rounded-[1.2rem] font-[900] text-base tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                <span>Continue Onboarding</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Correct match particle stars */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 1, scale: 0.2, x: s.x, y: s.y }}
              animate={{ opacity: 0, scale: 1.4, y: s.y - 45, rotate: 120 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute w-4 h-4 text-[#3372EE] fill-[#3372EE] text-sm"
            >
              ✦
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating toast notification */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none w-max max-w-[90vw]">
        <AnimatePresence>
          {feedbackToast && feedbackToast.type !== 'complete' && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-sm tracking-wide shadow-[0_15px_35px_rgba(7,18,51,0.08)] bg-white border-l-4 ${
                feedbackToast.type === 'incorrect'
                  ? 'border-orange-400 text-slate-700'
                  : feedbackToast.type === 'combo'
                    ? 'border-amber-500 text-slate-800 animate-[pulse_2s_infinite]'
                    : 'border-[#58CC02] text-slate-800'
              }`}
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              {feedbackToast.type === 'incorrect' ? (
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
              ) : feedbackToast.type === 'combo' ? (
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse shrink-0" />
              ) : (
                <Check className="w-5 h-5 text-[#58CC02] stroke-[3.5] shrink-0" />
              )}
              <span>{feedbackToast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Outer wrapper to space layout components properly in 100vh */}
      <div className="flex-1 w-full flex flex-col relative z-10 max-w-[1200px] mx-auto h-full px-5 md:px-10 pt-4 md:pt-8 pb-4 justify-between">
        
        {/* Header Progress Bar & Accomplishments */}
        <div className="relative flex items-center justify-center w-full mb-3 md:mb-6 mt-4 md:mt-[2vh]">
          
          {/* Brand Logo - Desktop Only */}
          <div 
            className="hidden md:flex items-center gap-2 text-xl font-[900] text-[#071233] absolute left-0"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0172FD] to-[#3A96FF] flex items-center justify-center shadow-sm">
              <span className="text-white text-base font-[900]">T</span>
            </div>
            <span>Teyro!</span>
          </div>

          {/* Centered Progress Indicator with liquid light shimmer */}
          <div className="w-[60%] max-w-[280px] md:max-w-[400px] h-3 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
            <motion.div
              initial={{ width: `${(8 / 15) * 100}%` }}
              animate={{ width: `${(9 / 15) * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
              className="h-full rounded-full relative overflow-hidden"
              style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.1), inset 0px 4px 0px rgba(255,255,255,0.3)' }}
            >
              {/* Shimmer sweep overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                  width: '50%',
                  animation: 'shimmer-sweep 2.2s infinite ease-in-out'
                }}
              />
            </motion.div>
          </div>

          {/* Desktop Right Side Streak / accomplishments / step indicator */}
          <div className="absolute right-0 flex items-center gap-3 z-20">
            {/* Desktop Only stats */}
            <div className="hidden md:flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 shadow-sm">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span className="text-orange-600 font-extrabold text-sm">12</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 shadow-sm">
                <Gem className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                <span className="text-blue-600 font-extrabold text-sm">240</span>
              </div>
              {/* Dummy Avatar */}
              <div className="w-8 h-8 rounded-full border border-slate-200 overflow-hidden relative shadow-sm">
                <Image 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                  alt="Profile" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
            {/* Step Label */}
            <span className="text-sm font-[800] text-[#0172FD]" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>9/15</span>
          </div>
        </div>

        {/* Main Body Splits */}
        <div className="flex-1 flex flex-col md:grid md:grid-cols-[1.1fr_0.9fr] items-center justify-between w-full min-h-0 relative gap-4 md:gap-12">
          
          {/* Left Column: Heading + Game Area */}
          <div className="w-full h-full flex flex-col justify-center gap-4 sm:gap-6 relative">
            
            {/* Title Load animation sequence */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full flex items-center justify-between md:block md:text-left text-left"
            >
              <div className="flex-1 pr-4">
                <h1 
                  className="text-[9vw] sm:text-[8vw] md:text-[3.2vw] font-[900] tracking-tight text-[#071233] leading-none"
                  style={{ fontFamily: 'var(--font-jakarta)', textShadow: textShadowGlow }}
                >
                  Match <span className="text-[#0172FD]">the blocks</span>
                </h1>
                <p 
                  className="text-[4.2vw] sm:text-[3.6vw] md:text-[1.1vw] font-semibold text-slate-500 mt-1 md:mt-2"
                  style={{ fontFamily: 'var(--font-jakarta)', textShadow: textShadowGlow }}
                >
                  Drag each shape to match its pair.
                </p>
              </div>

              {/* Mobile mascot image with container scale pulse */}
              <div className="md:hidden w-[50vw] h-[50vw] max-w-[220px] max-h-[220px] relative overflow-visible pointer-events-none shrink-0 z-0 -mb-[20vw] translate-y-[10vw]">
                <MascotBackground />
                <motion.div
                  animate={mascotBounceControls}
                  className="absolute inset-0"
                >
                  <Image 
                    src="/User onbarding Assets/Tey_step_9_img.PNG" 
                    alt="Tey Mascot" 
                    fill 
                    className="object-contain" 
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Game Board Container - Staggered load cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
              className="bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_30px_60px_rgba(61,90,254,0.06),_inset_0_1px_2px_rgba(255,255,255,0.7)] rounded-[2rem] p-5 md:p-6 w-full flex flex-col gap-4 md:gap-6 relative z-10"
            >
              <div className="flex justify-between px-6 text-slate-400 font-extrabold text-xs tracking-wider">
                <span>Left</span>
                <span>Right</span>
              </div>

              {/* Targets / slots list - staggered animation entry */}
              <div className="flex flex-col gap-3.5 md:gap-5 relative">
                {TARGETS.map((target, idx) => (
                  <motion.div 
                    key={target.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, ease: "easeOut", delay: 0.18 + idx * 0.08 }}
                  >
                    <DropSlot
                      id={target.id}
                      img={SHAPES[target.id]}
                      label={target.label}
                      isMatched={matched[target.id]}
                      isNear={isNear[target.id]}
                      targetRef={targetRefs[target.id]}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Draggables tray - staggered animation after left cards */}
            <div className="flex justify-around items-center gap-2 w-full pt-1">
              {DRAGGABLES.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, ease: "easeOut", delay: 0.42 + idx * 0.08 }}
                >
                  <MatchCard
                    id={item.id}
                    img={item.img}
                    label={item.label}
                    isMatched={matched[item.id]}
                    onDrag={(e, info) => handleDrag(item.id, e, info)}
                    onDragEnd={(e, info) => handleDragEnd(item.id, e, info)}
                    shake={isShaking[item.id]}
                  />
                </motion.div>
              ))}
            </div>

          </div>

          {/* Right Column: Desktop Victory Mascot & Bubble Cheering Panel */}
          <div className="hidden md:flex flex-col items-center justify-center relative w-full h-full">
            
            <MascotBackground />
            
            <div className="mb-6 relative z-10">
              <SpeechBubble 
                lines={[`You're doing <span style="color:#0172FD;font-weight:900">great!</span> Keep it up!`]}
              />
            </div>

            {/* victory mascot image - scaled up 1.5x relative to container */}
            <div className="relative w-full max-w-[480px] aspect-square scale-[1.5] origin-bottom">
              <motion.div
                animate={mascotBounceControls}
                className="absolute inset-0 z-10"
              >
                <Image 
                  src="/User onbarding Assets/Tey_step_9_img.PNG" 
                  alt="Tey Victorious Mascot" 
                  fill 
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                  priority 
                />
              </motion.div>
            </div>

          </div>
        </div>

        {/* Footer controls row */}
        <div className="w-full z-30 pt-3 border-t border-slate-100/50">
          
          {/* Mobile Footer */}
          <div className="md:hidden flex flex-col items-center gap-3 w-full pb-1">
            <div className="flex items-center justify-between w-full">
              <button 
                onClick={handleBack}
                className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <span 
                className="text-[#0172FD] font-black text-base tracking-wide flex items-center gap-1.5"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                <Star className="w-5 h-5 fill-[#0172FD] stroke-none animate-pulse" />
                Great! Keep going!
              </span>

              <button 
                onClick={handleContinue}
                disabled={!finished}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all shadow-md ${
                  finished 
                    ? 'bg-[#0172FD] border-b-4 border-[#0050B3] active:border-b-0 active:translate-y-1 hover:bg-[#0060D9]' 
                    : 'bg-slate-300 border-b-4 border-slate-400 opacity-60 cursor-not-allowed'
                }`}
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Skip Button */}
            <button 
              onClick={handleSkip}
              className="text-xs font-black text-slate-400 hover:text-slate-500 tracking-wider py-1.5 transition-colors uppercase"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Skip Step
            </button>
          </div>

          {/* Desktop Footer */}
          <div className="hidden md:flex items-center justify-between w-full">
            
            {/* Skip Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={handleSkip}
              className="h-[52px] px-8 bg-white border-[1.5px] border-slate-200 text-slate-500 rounded-[1.2rem] font-bold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer shadow-sm flex items-center justify-center"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Skip
            </motion.button>

            {/* Streak Counter Widget with HexEmblem charge animation */}
            <StreakCounter
              currentStreak={streakDays}
              triggerCharge={finished}
              gemsCount={gemsCount}
              showGems={true}
            />

            {/* Check Answer Button */}
            <motion.button
              whileHover={finished ? { scale: 1.03 } : {}}
              whileTap={finished ? { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } } : {}}
              onClick={handleContinue}
              disabled={!finished}
              className={`h-[56px] px-10 rounded-[1.2rem] font-[900] text-base tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(1,114,253,0.15)] ${
                finished 
                  ? 'bg-[#0172FD] border-b-4 border-[#0050B3] text-white hover:bg-[#0060D9] active:border-b-0 active:translate-y-1 cursor-pointer' 
                  : 'bg-slate-200 border-b-4 border-slate-300 text-slate-400 cursor-not-allowed opacity-60'
              }`}
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              <span>Check Answer</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

        </div>

      </div>

      {/* Shimmer sweep animation keyframes */}
      <style>{`
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
