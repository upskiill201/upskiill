'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, TrendingUp, Laptop, Smile } from 'lucide-react';
import Image from 'next/image';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { playHaptic } from '@/lib/haptics';

const GOALS = [
  {
    id: 'career_growth',
    label: 'Career growth',
    description: 'Develop in-demand skills\nand advance your career.',
    image: '/User onbarding Assets/Step 3 icons/career_growth_icon_v2.png',
    Icon: TrendingUp,
    mobileColor: '#0172FD',
    mobileBg: '#EBF3FF',
  },
  {
    id: 'personal_project',
    label: 'Personal project',
    description: 'Bring your ideas to life\nand build something meaningful.',
    image: '/User onbarding Assets/Step 3 icons/personal_project_icon_v2.png',
    Icon: Laptop,
    mobileColor: '#7B61FF',
    mobileBg: '#F3EFFF',
  },
  {
    id: 'just_for_fun',
    label: 'Just for fun',
    description: 'Explore, discover, and\nenjoy learning at your own pace.',
    image: '/User onbarding Assets/Step 3 icons/just_for_fun_icon_v2.png',
    Icon: Smile,
    mobileColor: '#00C896',
    mobileBg: '#E6FAF4',
  },
];

const headlineContainer: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
};
const wordVariant: any = {
  hidden: { y: 20, opacity: 0 },
  show:   { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 28 } },
};
const accentVariant: any = {
  hidden: { y: 20, opacity: 0, scale: 0.75 },
  show:   { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 20 } },
};
const deckContainer: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};
const deckCard: any = {
  hidden: { scale: 0.85, y: 16, opacity: 0 },
  show:   { scale: 1, y: 0, opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 26 } },
};

interface Step3ContentProps {
  onNext: () => void;
}

export default function Step3Content({ onNext }: Step3ContentProps) {
  const { currentAnswer, saveAnswer } = useOnboardingSession({ currentStep: 3, disableGuard: true });

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (currentAnswer?.primaryGoal) {
      const saved = currentAnswer.primaryGoal;
      // Normalize legacy single-select strings to the multi-select array shape
      setSelectedGoals(Array.isArray(saved) ? (saved as string[]) : [saved as string]);
    }
  }, [currentAnswer]);

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (id: string) => {
    playHaptic('teyroBounce');
    const next = selectedGoals.includes(id)
      ? selectedGoals.filter((g) => g !== id)
      : [...selectedGoals, id];
    setSelectedGoals(next);
    saveAnswer({ primaryGoal: next });
    setIdle(false);
  };

  const hasSelection = selectedGoals.length > 0;

  const handleNext = () => {
    if (!hasSelection) return;
    playHaptic('medium');
    onNext();
  };

  const headlineShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)';
  const accentShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1)';

  // Mobile card: horizontal pill with icon + label
  const renderMobileCard = (goal: (typeof GOALS)[number]) => {
    const isSelected = selectedGoals.includes(goal.id);
    const { Icon } = goal;

    return (
      <motion.div
        key={`mobile-${goal.id}`}
        variants={deckCard}
        className="w-full"
      >
        <motion.button
          whileTap={{ scale: 0.96, transition: { type: 'spring', stiffness: 600, damping: 18 } }}
          onClick={() => handleSelect(goal.id)}
          className={`relative flex items-center p-3 rounded-[1.5rem] border-2 transition-colors duration-200 w-full bg-white ${
            isSelected ? 'border-[#0172FD]' : 'border-transparent'
          }`}
          style={{
            boxShadow: isSelected ? '0 4px 15px rgba(1,114,253,0.12)' : '0 2px 10px rgba(0,0,0,0.03)',
          }}
        >
          <div
            className="w-12 h-12 rounded-[0.9rem] flex items-center justify-center flex-shrink-0 mr-3.5"
            style={{ backgroundColor: goal.mobileBg }}
          >
            <Icon className="w-6 h-6" style={{ color: goal.mobileColor }} strokeWidth={2.5} />
          </div>
          <span
            className="font-bold text-[1.05rem] tracking-tight text-[#071233] text-left flex-1"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            {goal.label}
          </span>
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 600, damping: 18 }}
                className="w-6 h-6 bg-[#0172FD] rounded-full flex items-center justify-center flex-shrink-0 ml-2"
              >
                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    );
  };

  // Desktop card: vertical with 3D icon
  const renderDesktopCard = (goal: (typeof GOALS)[number]) => {
    const isSelected = selectedGoals.includes(goal.id);

    return (
      <motion.div
        key={`desktop-${goal.id}`}
        variants={deckCard}
        className="relative h-full"
      >
        <motion.button
          animate={isSelected ? { y: 6 } : { y: 0 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 6, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
          onClick={() => handleSelect(goal.id)}
          className={`relative flex flex-col items-center p-6 lg:p-8 rounded-[2rem] border-2 transition-colors duration-200 w-full h-full bg-white ${
            isSelected ? 'border-[#0172FD]' : 'border-slate-200'
          }`}
          style={{
            boxShadow: isSelected
              ? '0 0px 0 0 #0172FD, 0 4px 12px rgba(1,114,253,0.15)'
              : '0 6px 0 0 #E5EAEF, 0 15px 25px -5px rgba(0,0,0,0.08)',
          }}
        >
          <div className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] flex items-center justify-center relative flex-shrink-0 mb-6">
            <motion.div
              className="relative w-full h-full"
              animate={isSelected ? { scale: [1, 0.85, 1.15, 1] } : { scale: 1 }}
              transition={
                isSelected
                  ? { duration: 0.35, ease: 'easeOut', times: [0, 0.25, 0.65, 1] }
                  : { type: 'spring', stiffness: 300, damping: 20 }
              }
            >
              <Image src={goal.image} alt={goal.label} fill className="object-contain" sizes="(max-width: 1024px) 120px, 150px" />
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
              className="w-10 h-10 rounded-full flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </motion.div>
          </div>
        </motion.button>
      </motion.div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col pt-3 px-5 md:px-0 pb-0">
      {/* ── HEADLINE ── */}
      <div className="w-full shrink-0 mb-2 md:mb-8">
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="show"
          className="text-[clamp(1.75rem,8vw,2.25rem)] md:text-[3.5rem] lg:text-[4rem] font-[900] leading-[1.08] md:leading-[1.1] mb-1.5 md:mb-4 tracking-tight text-[#071233] text-center md:text-left"
          style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
        >
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>What</motion.span>
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>are</motion.span>
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>your</motion.span>
          <br />
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>learning</motion.span>
          <motion.span variants={accentVariant} style={{ display: 'inline-block', color: '#0172FD', textShadow: accentShadow }}>
            goals?
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.3 }}
          className="text-[clamp(1rem,4.8vw,1.2rem)] md:text-xl font-medium text-slate-500 leading-snug text-center md:text-left"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          <span className="md:hidden">
            This helps us personalize
            <br />
            your learning experience.
          </span>
          <span className="hidden md:inline">
            Choose what matters most to you right now.
            <br />
            We&apos;ll create a personalized learning path just for you.
          </span>
        </motion.p>
      </div>

      {/* ── SCROLLABLE GOAL LIST (mobile) / CARD GRID (desktop) ── */}
      <motion.div
        variants={deckContainer}
        initial="hidden"
        animate="show"
        className="w-full flex-1 overflow-y-auto min-h-0 mb-3 z-20"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-2.5 w-full max-w-[400px] mx-auto pt-1 pb-2">
          {GOALS.map((g) => renderMobileCard(g))}
        </div>
        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6 w-full max-w-[900px] pb-2">
          {GOALS.map((g) => (
            <div key={g.id} className="w-full">
              {renderDesktopCard(g)}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ y: 22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.58 }}
        className="w-full shrink-0 pb-2 md:pb-0"
      >
        <motion.button
          animate={hasSelection && idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={
            hasSelection && idle
              ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] }
              : { type: 'spring', stiffness: 300, damping: 20 }
          }
          whileHover={hasSelection ? { scale: 1.02 } : {}}
          whileTap={hasSelection ? { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } } : {}}
          onClick={handleNext}
          disabled={!hasSelection}
          className={`relative w-full md:w-[240px] flex items-center justify-center h-14 md:h-16 rounded-[1.75rem] md:rounded-[2rem] font-bold text-lg md:text-xl transition-all ${
            hasSelection ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
          }`}
          style={
            hasSelection
              ? { boxShadow: '0 8px 16px -4px rgba(1,114,253,0.4), inset 0px -4px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' }
              : {}
          }
        >
          <span>Continue</span>
          <ArrowRight className={`absolute right-4 md:right-8 w-6 h-6 md:w-6 md:h-6 stroke-[3] ${!hasSelection && 'opacity-50'}`} />
        </motion.button>
      </motion.div>
    </div>
  );
}
