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
          whileHover={!anySelected || isSelected ? { scale: 1.04, y: -4 } : {}}
          whileTap={{ scale: 0.96, transition: { type: 'spring', stiffness: 600, damping: 18 } }}
          onClick={() => handleSelect(goal.id)}
          className={`relative flex flex-col items-center p-6 lg:p-8 rounded-[2rem] border-[3px] transition-all duration-300 w-full h-full bg-white ${
            isSelected ? 'border-[#0172FD] bg-blue-50/20' : 'border-transparent'
          }`}
          style={{
            boxShadow: isSelected
              ? '0 0 30px rgba(255,255,255,1), 0 24px 48px -12px rgba(1,114,253,0.25)'
              : '0 0 20px rgba(255,255,255,0.9), 0 24px 48px -12px rgba(20,50,100,0.15)'
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
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            {goal.label}
          </span>
          <span className="text-sm lg:text-[0.95rem] text-slate-500 font-medium text-center w-full leading-snug whitespace-pre-line mb-6">
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
          className={`relative flex items-center p-3 rounded-2xl border-[1.5px] transition-colors duration-200 w-full bg-white ${
            isSelected ? 'border-[#0172FD] bg-blue-50/50' : 'border-transparent'
          }`}
          style={{
            boxShadow: isSelected
              ? '0 4px 15px rgba(1,114,253,0.1)'
              : '0 2px 10px rgba(0,0,0,0.03)'
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mr-4"
            style={{ backgroundColor: goal.mobileBg }}
          >
             <Icon className="w-6 h-6" style={{ color: goal.mobileColor }} strokeWidth={2.5} />
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
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] flex flex-col">
      <div className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row relative min-h-0">

        {/* MOBILE PROGRESS BAR */}
        <div className="md:hidden flex items-center gap-4 px-6 pt-8 pb-2 relative z-20 w-full">
          <div className="flex-1 h-3 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: `${(2 / 15) * 100}%` }}
              animate={{ width: `${(3 / 15) * 100}%` }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
              className="h-full rounded-full relative"
              style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -3px 0px rgba(0,0,0,0.1), inset 0px 3px 0px rgba(255,255,255,0.3)' }}
            />
          </div>
          <span className="text-sm font-bold" style={{ color: '#0172FD', textShadow: '0 0 10px rgba(255,255,255,1)' }}>3/15</span>
        </div>

        {/* LEFT COLUMN — Mascot (Desktop & Mobile positioning) */}
        <motion.div
          initial={{ scale: 0.65, y: -30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-full h-[32vh] md:h-screen md:w-[45%] lg:w-[40%] flex items-center justify-center order-1 relative pointer-events-none"
        >
          {/* Mobile Mascot */}
          <div className="md:hidden relative w-full h-full flex items-center justify-center mt-2">
             <div className="relative w-[320px] h-[320px] scale-[1.15]">
                <MascotBackground />
                <div className="absolute inset-0 z-10 scale-[0.85] translate-y-2">
                  <Image
                     src="/User%20onbarding%20Assets/Tey_step3_mobile.PNG"
                     alt="Teyro Mascot"
                     fill
                     className="object-contain"
                     priority
                  />
                </div>
             </div>
          </div>

          {/* Desktop Mascot */}
          <div className="hidden md:flex relative w-full h-full items-center justify-start -ml-[15%] lg:-ml-[10%] xl:ml-0 z-10">
             <div className="relative w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] xl:w-[1100px] xl:h-[1100px] translate-y-[-5%] lg:translate-y-0 scale-[1.15] lg:scale-[1.25]">
                <MascotBackground />
                <div className="absolute inset-0 z-10 scale-[1.1] lg:scale-[1.15]">
                  <Image
                     src="/User%20onbarding%20Assets/Tey_step3_desktop.PNG"
                     alt="Teyro Mascot Pointing"
                     fill
                     className="object-contain"
                     priority
                  />
                </div>
             </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — Content */}
        <div className="w-full h-[68vh] md:h-screen md:w-[55%] lg:w-[60%] flex flex-col order-2 relative z-20">
          
          {/* Desktop Progress Bar */}
          <div className="hidden md:flex items-center gap-5 px-10 lg:px-12 xl:px-16 pt-12 pb-4 w-full max-w-[850px]">
            <div className="flex-1 h-4 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner relative">
              <motion.div
                initial={{ width: `${(2 / 15) * 100}%` }}
                animate={{ width: `${(3 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full relative"
                style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -4px 0px rgba(0,0,0,0.1), inset 0px 4px 0px rgba(255,255,255,0.3)' }}
              />
            </div>
            <span className="text-base font-bold" style={{ color: '#0172FD', textShadow: '0 0 10px rgba(255,255,255,1)' }}>3/15</span>
          </div>

          {/* White content card overlay for mobile overlap */}
          <div className="flex-1 flex flex-col w-full px-6 md:px-10 lg:px-12 xl:px-16 pt-2 pb-6 md:py-6 relative z-10 min-h-0">
             <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none md:hidden" />
             
             {/* Title & Subtitle */}
             <div className="flex flex-col relative z-20 flex-shrink-0 md:mt-2 lg:mt-6">
                <motion.h1
                  variants={headlineContainer}
                  initial="hidden"
                  animate="show"
                  className="text-[2rem] leading-[1.15] md:text-[3rem] lg:text-[3.5rem] font-[800] mb-2 tracking-tight text-[#071233] text-center md:text-left"
                  style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
                >
                  <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>What</motion.span>
                  <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>is</motion.span>
                  <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>your</motion.span>
                  <br className="hidden md:block" />
                  <motion.span variants={accentVariant} style={{ display: 'inline-block', marginRight: '0.22em', color: '#0172FD', textShadow: accentShadow }}>primary</motion.span>
                  <motion.span variants={wordVariant} style={{ display: 'inline-block' }}>goal?</motion.span>
                </motion.h1>

                <motion.p
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
                  className="text-[0.95rem] md:text-lg lg:text-[1.15rem] mb-6 md:mb-10 font-medium text-center md:text-left text-slate-600 leading-snug"
                  style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)' }}
                >
                  <span className="md:hidden">This helps us personalize<br/>your learning experience.</span>
                  <span className="hidden md:inline">Choose what matters most to you right now.</span>
                </motion.p>
             </div>

             {/* Options Container (Scrollable internally if it overflows on tiny screens, but fits in 100vh) */}
             <div className="flex-1 min-h-0 relative z-20 flex flex-col justify-center md:justify-start">
               {/* Mobile List View */}
               <motion.div
                 variants={deckContainer}
                 initial="hidden"
                 animate="show"
                 className="flex flex-col gap-3 w-full max-w-[400px] mx-auto md:hidden"
               >
                 {GOALS.map((goal) => renderCardMobile(goal))}
               </motion.div>

               {/* Desktop Grid View */}
               <motion.div
                 variants={deckContainer}
                 initial="hidden"
                 animate="show"
                 className="hidden md:grid grid-cols-3 gap-4 lg:gap-6 w-full max-w-[850px]"
               >
                 {GOALS.map((goal) => renderCardDesktop(goal))}
               </motion.div>
             </div>

             {/* Action Buttons */}
             <motion.div
                initial={{ y: 22, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.58 }}
                className="flex items-center gap-4 mt-auto pt-4 relative z-20 w-full max-w-[400px] mx-auto md:mx-0 md:max-w-[850px]"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.91, transition: { type: 'spring', stiffness: 600, damping: 18 } }}
                  onClick={handleBack}
                  className="w-16 h-14 md:w-auto md:px-8 md:h-16 flex items-center justify-center rounded-2xl md:rounded-[2rem] bg-white border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50"
                  style={{ boxShadow: '0 0 15px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.05)' }}
                >
                  <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                  <span className="hidden md:block ml-2 font-bold text-lg">Back</span>
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
                  className={`flex-1 md:flex-none relative md:w-[240px] flex items-center justify-center h-14 md:h-16 rounded-2xl md:rounded-[2rem] font-bold text-lg md:text-xl transition-all ${
                    selectedGoal ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
                  }`}
                  style={selectedGoal ? { boxShadow: '0 0 25px rgba(255,255,255,1), 0 16px 32px -8px rgba(1,114,253,0.5), inset 0px -6px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' } : { boxShadow: '0 0 15px rgba(255,255,255,0.8)' }}
                >
                  <span>Continue</span>
                  <ArrowRight className={`absolute right-6 md:right-8 w-6 h-6 stroke-[3] ${!selectedGoal && 'opacity-50'}`} />
                </motion.button>
              </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
