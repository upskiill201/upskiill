'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, TrendingUp, Laptop, Smile } from 'lucide-react';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';

const GOALS = [
  { 
    id: 'career_growth',
    label: 'Career growth',
    description: 'Develop in-demand skills\nand advance your career.',
    image: '/User%20onbarding%20Assets/Step%203%20icons/career_growth_icon_v2.png',
    mobileIcon: TrendingUp,
    mobileColor: '#0172FD',
    mobileBg: '#EBF3FF'
  },
  { 
    id: 'personal_project',
    label: 'Personal project',
    description: 'Bring your ideas to life\nand build something meaningful.',
    image: '/User%20onbarding%20Assets/Step%203%20icons/personal_project_icon_v2.png',
    mobileIcon: Laptop,
    mobileColor: '#7B61FF',
    mobileBg: '#F3EFFF'
  },
  { 
    id: 'just_for_fun',
    label: 'Just for fun',
    description: 'Explore, discover, and\nenjoy learning at your own pace.',
    image: '/User%20onbarding%20Assets/Step%203%20icons/just_for_fun_icon_v2.png',
    mobileIcon: Smile,
    mobileColor: '#00C896',
    mobileBg: '#E6FAF4'
  },
];

// ─── Animation variants ──────────────────────────────────────────────────────
const headlineContainer: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } }
};
const wordVariant: any = {
  hidden: { y: 20, opacity: 0 },
  show:   { y: 0,  opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 28 } }
};
const accentVariant: any = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show:   { y: 0,  opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } }
};

const deckContainer: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } }
};
const deckCard: any = {
  hidden: { scale: 0.82, y: 16, opacity: 0 },
  show:   { scale: 1,    y: 0,  opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 26 } }
};
// ────────────────────────────────────────────────────────────────────────────

export default function OnboardingStep3() {
  const router = useRouter();
  const { isLoading, currentAnswer, saveAnswer, advance } = useOnboardingSession(3);

  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    // We'll save it under the generic 'primaryGoal' key or similar. Let's use 'primaryGoal'
    if (currentAnswer?.primaryGoal) {
      setSelectedGoal(currentAnswer.primaryGoal as string);
    }
  }, [currentAnswer]);

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <StepSkeleton />;

  const handleSelect = (id: string) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    setSelectedGoal(id);
    saveAnswer({ primaryGoal: id });
    setIdle(false);
  };

  const handleNext = () => {
    if (!selectedGoal) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(12);
    void advance();
  };

  const handleBack = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    router.push('/onboarding/2');
  };

  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow   = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  const renderCardDesktop = (goal: typeof GOALS[number]) => {
    const isSelected = selectedGoal === goal.id;
    const anySelected = selectedGoal !== '';

    return (
      <motion.div
        key={`desktop-${goal.id}`}
        variants={deckCard}
        animate={{ opacity: anySelected && !isSelected ? 0.55 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="relative h-full"
      >
        <motion.button
          initial={{ y: 0 }}
          animate={isSelected ? { y: 6 } : { y: 0 }}
          whileHover={!anySelected || isSelected ? { scale: 1.02, y: -2 } : {}}
          whileTap={{ scale: 0.98, y: 6, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
          onClick={() => handleSelect(goal.id)}
          className={`relative flex flex-col items-center p-6 lg:p-8 rounded-[2rem] border-2 transition-colors duration-200 w-full h-full bg-white ${
            isSelected ? 'border-[#0172FD]' : 'border-slate-200'
          }`}
          style={{
            // Duolingo-style 3D pushable shadow
            boxShadow: isSelected
              ? '0 0px 0 0 #0172FD, 0 4px 12px rgba(1,114,253,0.15)' // Pressed state: shadow goes flat
              : '0 6px 0 0 #E5EAEF, 0 15px 25px -5px rgba(0,0,0,0.08)' // Idle state: thick bottom lip
          }}
        >
          {/* 3D icon image */}
          <div className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] flex items-center justify-center relative flex-shrink-0 mb-6">
            <motion.div
              className="relative w-full h-full"
              animate={isSelected ? { scale: [1, 0.85, 1.15, 1] } : { scale: 1 }}
              transition={isSelected
                ? { duration: 0.35, ease: 'easeOut', times: [0, 0.25, 0.65, 1] }
                : { type: 'spring', stiffness: 300, damping: 20 }
              }
            >
              <Image
                src={goal.image}
                alt={goal.label}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 120px, 150px"
              />
            </motion.div>
          </div>

          <span
            className="font-extrabold text-[1.15rem] lg:text-[1.35rem] tracking-tight text-[#071233] mb-3 text-center w-full"
            style={{
              fontFamily: 'var(--font-jakarta)',
              display: 'inline',
              boxShadow: '0 0 15px 10px rgba(255,255,255,0.95)',
              WebkitBoxDecorationBreak: 'clone',
              boxDecorationBreak: 'clone',
              borderRadius: '4px',
              padding: '2px 4px',
            }}
          >
            {goal.label}
          </span>
          <span
            className="text-sm lg:text-[0.95rem] text-slate-500 font-medium text-center w-full leading-snug whitespace-pre-line mb-6"
            style={{
              display: 'inline',
              boxShadow: '0 0 12px 8px rgba(255,255,255,0.9)',
              WebkitBoxDecorationBreak: 'clone',
              boxDecorationBreak: 'clone',
              borderRadius: '4px',
              padding: '2px 4px',
            }}
          >
            {goal.description}
          </span>

          <div className="mt-auto">
             <motion.div
                animate={isSelected ? { backgroundColor: '#0172FD', color: '#fff' } : { backgroundColor: '#F1F5F9', color: '#64748B' }}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
             >
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
             </motion.div>
          </div>
        </motion.button>
      </motion.div>
    );
  };

  const renderCardMobile = (goal: typeof GOALS[number]) => {
    const isSelected = selectedGoal === goal.id;
    const anySelected = selectedGoal !== '';
    const Icon = goal.mobileIcon;

    return (
      <motion.div
        key={`mobile-${goal.id}`}
        variants={deckCard}
        animate={{ opacity: anySelected && !isSelected ? 0.65 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="w-full"
      >
        <motion.button
          whileTap={{ scale: 0.96, transition: { type: 'spring', stiffness: 600, damping: 18 } }}
          onClick={() => handleSelect(goal.id)}
          className={`relative flex items-center p-2.5 rounded-2xl border-[1.5px] transition-colors duration-200 w-full bg-white ${
            isSelected ? 'border-[#0172FD] bg-blue-50/50' : 'border-transparent'
          }`}
          style={{
            boxShadow: isSelected
              ? '0 4px 15px rgba(1,114,253,0.1)'
              : '0 2px 10px rgba(0,0,0,0.03)'
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mr-3.5"
            style={{ backgroundColor: goal.mobileBg }}
          >
             <Icon className="w-5 h-5" style={{ color: goal.mobileColor }} strokeWidth={2.5} />
          </div>

          <span
            className="font-bold text-[1rem] tracking-tight text-[#071233] text-left flex-1"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            {goal.label}
          </span>
        </motion.button>
      </motion.div>
    );
  };

  return (
    <div className="h-screen h-[100dvh] md:h-auto md:min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden relative">
      
      {/* MOBILE-ONLY LAYOUT: Strict 40/60 Split */}
      <div className="flex flex-col h-screen h-[100dvh] w-full relative z-10 md:hidden overflow-hidden pb-6 pt-4 justify-between">
        
        {/* Top 40% Image Container - 100% of device width */}
        <div className="w-full h-[40dvh] flex flex-col justify-start items-center relative pt-4 overflow-visible shrink-0">
          {/* Mobile Progress Bar - padded horizontally */}
          <div className="w-full px-6 flex items-center gap-4 mb-4 shrink-0 relative z-20">
            <div className="flex-1 h-2.5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: `${(2 / 15) * 100}%` }}
                animate={{ width: `${(3 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -2px 0px rgba(0,0,0,0.1), inset 0px 2px 0px rgba(255,255,255,0.3)' }}
              />
            </div>
            <span className="text-sm font-[800] text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>3/15</span>
          </div>

          {/* Mascot Section inside top container - stretches to 100% width of device */}
          <motion.div
            initial={{ scale: 0.6, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full flex-1 flex items-center justify-center relative select-none mt-2 px-0"
          >
            {/* Bubble background spans 100% of container width */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <MascotBackground />
            </div>
            {/* Mascot image is centered vertically and horizontally, taking 80% width with scale-[1.4] */}
            <motion.div layoutId="tey-mascot" className="absolute w-[80vw] h-[80vw] z-10 scale-[1.4] origin-center">
              <Image src="/User%20onbarding%20Assets/Tey_step3_mobile.webp" alt="Tey Mascot" fill className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]" priority />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom 60% Text & CTA Container - padded horizontally with white background and soft top fade */}
        <div className="w-full h-[60dvh] flex flex-col justify-start items-center relative z-20 pb-4 px-6 bg-white pt-2">
          
          {/* Soft white shadow fade overlay at the top boundary */}
          <div className="absolute -top-14 left-0 right-0 h-14 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />

          {/* Typography container - aligned top */}
          <div className="w-full flex flex-col items-center text-center mt-1 mb-3 px-2 z-20 shrink-0">
            {/* Relative scaled heading */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[10vw] xs:text-[11vw] sm:text-4xl font-[900] leading-[1.08] mb-1.5 tracking-tight text-[#071233] w-[80%] mx-auto"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>What</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>is</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>your</motion.span>
              <br />
              <motion.span variants={accentVariant} style={{ display: 'inline-block', marginRight: '0.22em', color: '#0172FD', textShadow: accentShadow }}>primary</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>goal?</motion.span>
            </motion.h1>

            {/* Relative scaled subtitle */}
            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
              className="text-[3.8vw] xs:text-[4vw] sm:text-base font-medium text-slate-500 leading-tight max-w-[90%]"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              This helps us personalize your learning experience.
            </motion.p>
          </div>

          {/* Options Container: Scrollable inside the remaining space */}
          <motion.div
            variants={deckContainer}
            initial="hidden"
            animate="show"
            className="w-full flex-1 overflow-y-auto min-h-0 mb-4 z-20"
          >
            <div className="flex flex-col gap-2 w-full max-w-[400px] mx-auto pt-1 pb-2">
              {GOALS.map((goal) => renderCardMobile(goal))}
            </div>
          </motion.div>

          {/* CTA Buttons: Bouncy and anchored at the bottom */}
          <motion.div
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.58 }}
            className="w-full flex items-center gap-3 justify-center relative z-30 mb-6 shrink-0"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
              onClick={handleBack}
              className="w-14 h-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 transition-colors"
              style={{ boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.06), inset 0px 2px 0px rgba(255,255,255,0.8)' }}
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </motion.button>

            <motion.button
              animate={selectedGoal && idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={selectedGoal && idle
                ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] }
                : { type: 'spring', stiffness: 300, damping: 20 }
              }
              whileHover={selectedGoal ? { scale: 1.02 } : {}}
              whileTap={selectedGoal ? { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } } : {}}
              onClick={handleNext}
              disabled={!selectedGoal}
              className={`flex-1 relative flex items-center justify-center h-12 rounded-xl font-bold text-base transition-all ${
                selectedGoal ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
              }`}
              style={selectedGoal ? { boxShadow: '0 8px 16px -4px rgba(1,114,253,0.4), inset 0px -4px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' } : { boxShadow: '0 0 10px rgba(255,255,255,0.8)' }}
            >
              <span>Continue</span>
              <ArrowRight className={`absolute right-4 w-5 h-5 stroke-[3] ${!selectedGoal && 'opacity-50'}`} />
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* DESKTOP-ONLY LAYOUT (hidden md:flex) */}
      <div className="hidden md:flex flex-1 w-full max-w-[1440px] mx-auto flex-row relative min-h-0">
        
        {/* LEFT COLUMN — Mascot */}
        <motion.div
          initial={{ scale: 0.65, y: -30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-1/2 lg:w-5/12 flex items-center justify-center relative pointer-events-none"
        >
          {/* Desktop mascot container size reduced to 90% width of its column container, removing scale overrides */}
          <div className="relative w-[90%] aspect-square transition-transform z-10">
            <MascotBackground />
            <motion.div layoutId="tey-mascot" className="absolute inset-0 z-10">
              <Image src="/User%20onbarding%20Assets/Tey_step3_desktop.webp" alt="Teyro Mascot Pointing" fill className="object-contain" priority />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <div className="w-full flex flex-col md:justify-center relative px-6 md:px-10 lg:px-12 z-20 flex-1 pb-8 md:pb-10">

          {/* DESKTOP PROGRESS BAR */}
          <div className="flex items-center gap-5 mb-10 relative z-10 w-full">
            <div className="flex-1 h-4 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: `${(2 / 15) * 100}%` }}
                animate={{ width: `${(3 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full relative"
                style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -3px 0px rgba(0,0,0,0.1), inset 0px 3px 0px rgba(255,255,255,0.3)' }}
              />
            </div>
            <span className="text-lg font-bold" style={{ color: '#0172FD', textShadow: '0 0 10px rgba(255,255,255,1)' }}>3/15</span>
          </div>

          {/* Content wrapper */}
          <div className="relative z-10 w-full max-w-2xl mx-auto md:mx-0 pt-6 md:pt-0">

            {/* ── HEADLINE ── */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[2.25rem] leading-[1.1] md:text-[3.5rem] lg:text-[4rem] font-[800] mb-4 tracking-tight text-[#071233] text-left"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>What</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>is</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>your</motion.span>
              <br />
              <motion.span variants={accentVariant} style={{ display: 'inline-block', marginRight: '0.22em', color: '#0172FD', textShadow: accentShadow }}>primary</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>goal?</motion.span>
            </motion.h1>

            {/* ── SUBTITLE ── */}
            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
              className="text-base md:text-xl lg:text-[1.35rem] mb-10 font-medium text-left text-slate-600 leading-snug"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9), 0 0 35px rgba(255,255,255,0.7)' }}
            >
              Choose what matters most to you right now.<br />
              We&apos;ll create a personalized learning path just for you.
            </motion.p>

            {/* ── CARDS: Desktop ── */}
            <motion.div
              variants={deckContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-3 gap-6 w-full max-w-[900px] mb-10"
            >
              {GOALS.map((goal) => (
                <div key={goal.id} className="w-full">
                  {renderCardDesktop(goal)}
                </div>
              ))}
            </motion.div>

            {/* ── ACTION BUTTONS: arrive last ── */}
            <motion.div
              initial={{ y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.58 }}
              className="flex items-center gap-4 justify-start pt-4 md:pt-0 relative z-30"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.91, transition: { type: 'spring', stiffness: 600, damping: 18 } }}
                onClick={handleBack}
                className="px-8 h-16 flex items-center justify-center rounded-[2rem] bg-white border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50"
                style={{ boxShadow: '0 0 15px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.05)' }}
              >
                <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                <span className="ml-2 font-bold text-lg">Back</span>
              </motion.button>

              <motion.button
                animate={selectedGoal && idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={selectedGoal && idle
                  ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] }
                  : { type: 'spring', stiffness: 300, damping: 20 }
                }
                whileHover={selectedGoal ? { scale: 1.02 } : {}}
                whileTap={selectedGoal ? { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } } : {}}
                onClick={handleNext}
                disabled={!selectedGoal}
                className={`relative w-[240px] flex items-center justify-center h-16 rounded-[2rem] font-bold text-xl transition-all ${
                  selectedGoal ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
                }`}
                style={selectedGoal ? { boxShadow: '0 0 25px rgba(255,255,255,1), 0 16px 32px -8px rgba(1,114,253,0.5), inset 0px -6px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' } : { boxShadow: '0 0 15px rgba(255,255,255,0.8)' }}
              >
                <span>Continue</span>
                <ArrowRight className={`absolute right-8 w-6 h-6 stroke-[3] ${!selectedGoal && 'opacity-50'}`} />
              </motion.button>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
