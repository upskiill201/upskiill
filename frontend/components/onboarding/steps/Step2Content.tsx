'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { playHaptic } from '@/lib/haptics';

const SKILLS = [
  { id: 'coding',      label: 'Coding',       image: '/User onbarding Assets/Step 2 icons/Coding_3d_icon.webp',       bg: '#EBF3FF' },
  { id: 'photography', label: 'Photography',  image: '/User onbarding Assets/Step 2 icons/Photography_3d_icon.webp',  bg: '#EDE8FF' },
  { id: 'cooking',     label: 'Cooking',      image: '/User onbarding Assets/Step 2 icons/Cooking_3d_icon.webp',      bg: '#FFF4E0' },
  { id: 'design',      label: 'Design',       image: '/User onbarding Assets/Step 2 icons/Design_3d_icon.webp',       bg: '#E8FBF0' },
  { id: 'marketing',  label: 'Marketing',    image: '/User onbarding Assets/Step 2 icons/Marketing_3d_icon.webp',   bg: '#FFE8F0' },
  { id: 'fitness',     label: 'Fitness',      image: '/User onbarding Assets/Step 2 icons/Fitness_3d_icon.webp',     bg: '#FFF8E0' },
  { id: 'writing',     label: 'Writing',      image: '/User onbarding Assets/Step 2 icons/Writing_3d_icon.webp',     bg: '#EEF0FF' },
  { id: 'business',   label: 'Business',     image: '/User onbarding Assets/Step 2 icons/Business_3d_icon.webp',    bg: '#E0F4FF' },
  { id: 'music',       label: 'Music',        image: '/User onbarding Assets/Step 2 icons/music_3d_icon.webp',       bg: '#FDE8FF' },
  { id: 'other',       label: 'Other',        image: '/User onbarding Assets/Step 2 icons/Other_3d_icon.webp',       bg: '#F0F0F5' },
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
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } },
};
const deckCard: any = {
  hidden: { scale: 0.85, y: 14, opacity: 0 },
  show:   { scale: 1, y: 0, opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 26 } },
};

interface Step2ContentProps {
  onNext: () => void;
}

export default function Step2Content({ onNext }: Step2ContentProps) {
  const { currentAnswer, saveAnswer } = useOnboardingSession({ currentStep: 2, disableGuard: true });

  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (currentAnswer?.skill) setSelectedSkill(currentAnswer.skill as string);
  }, [currentAnswer]);

  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (id: string) => {
    playHaptic('teyroBounce');
    setSelectedSkill(id);
    saveAnswer({ skill: id });
    setIdle(false);
  };

  const handleNext = () => {
    if (!selectedSkill) return;
    playHaptic('medium');
    onNext();
  };

  const headlineShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)';
  const accentShadow =
    '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1)';

  const renderCard = (skill: (typeof SKILLS)[number]) => {
    const isSelected = selectedSkill === skill.id;
    return (
      <motion.div
        key={skill.id}
        variants={deckCard}
        className="relative"
      >
        <motion.button
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.91, transition: { type: 'spring', stiffness: 600, damping: 18 } }}
          onClick={() => handleSelect(skill.id)}
          className={`relative flex flex-col items-center justify-center p-1.5 md:p-4 rounded-[1rem] md:rounded-2xl border-2 transition-colors duration-150 w-full aspect-square bg-white ${
            isSelected ? 'border-[#0172FD] bg-blue-50/50' : 'border-transparent'
          }`}
          style={{
            boxShadow: isSelected
              ? '0 0 25px rgba(255,255,255,1), 0 8px 20px rgba(1,114,253,0.15)'
              : '0 0 15px rgba(255,255,255,0.8), 0 4px 15px rgba(0,0,0,0.03)',
          }}
        >
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 600, damping: 18 }}
                className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#0172FD] rounded-full flex items-center justify-center z-20"
              >
                <Check className="w-3 h-3 text-white stroke-[3]" />
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="w-[3.75rem] h-[3.75rem] md:w-[4.5rem] md:h-[4.5rem] rounded-xl md:rounded-2xl mb-1 md:mb-3 flex items-center justify-center relative overflow-hidden flex-shrink-0"
            style={{ background: skill.bg }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={isSelected ? { scale: [1, 0.85, 1.15, 1] } : { scale: 1 }}
              transition={
                isSelected
                  ? { duration: 0.35, ease: 'easeOut', times: [0, 0.25, 0.65, 1] }
                  : { type: 'spring', stiffness: 300, damping: 20 }
              }
            >
              <Image
                src={skill.image}
                alt={skill.label}
                fill
                className="object-contain p-1"
                sizes="(min-width: 768px) 72px, 56px"
              />
            </motion.div>
          </div>

          <span
            className={`font-bold text-xs md:text-sm tracking-tight ${isSelected ? 'text-[#0172FD]' : 'text-[#0b132b]'}`}
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            {skill.label}
          </span>
        </motion.button>
      </motion.div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col pt-3 px-5 md:px-0 pb-0">
      {/* ── HEADLINE ── */}
      <div className="w-full shrink-0 mb-2 md:mb-6">
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="show"
          className="text-[clamp(1.75rem,8vw,2.25rem)] md:text-[3.5rem] lg:text-[4rem] font-[900] leading-[1.08] md:leading-[1.1] mb-1.5 md:mb-4 tracking-tight text-[#071233] text-center md:text-left"
          style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
        >
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>What</motion.span>
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>skill</motion.span>
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>do</motion.span>
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>you</motion.span>
          <br className="md:hidden" />
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>want</motion.span>
          <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>to</motion.span>
          <motion.span variants={accentVariant} style={{ display: 'inline-block', color: '#0172FD', textShadow: accentShadow }}>
            master?
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.42 }}
          className="text-[clamp(1rem,4.8vw,1.2rem)] md:text-xl font-medium text-slate-500 leading-snug text-center md:text-left"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          <span className="md:hidden">
            Choose a skill to start
            <br />
            your learning adventure.
          </span>
          <span className="hidden md:inline">
            Choose a skill you&apos;re passionate about.
            <br />
            We&apos;ll create a personalized learning path just for you.
          </span>
        </motion.p>
      </div>

      {/* ── SCROLLABLE GRID ── */}
      <motion.div
        variants={deckContainer}
        initial="hidden"
        animate="show"
        className="w-full flex-1 overflow-y-auto min-h-0 mb-3 z-20"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 pb-2">
          {SKILLS.map((skill) => renderCard(skill))}
        </div>
      </motion.div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ y: 22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.55 }}
        className="w-full shrink-0 pb-2 md:pb-0"
      >
        <motion.button
          animate={selectedSkill && idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={
            selectedSkill && idle
              ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] }
              : { type: 'spring', stiffness: 300, damping: 20 }
          }
          whileHover={selectedSkill ? { scale: 1.02 } : {}}
          whileTap={selectedSkill ? { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } } : {}}
          onClick={handleNext}
          disabled={!selectedSkill}
          className={`relative w-full md:w-[240px] flex items-center justify-center h-14 md:h-16 rounded-[1.75rem] md:rounded-[2rem] font-bold text-lg md:text-xl transition-all ${
            selectedSkill ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
          }`}
          style={
            selectedSkill
              ? { boxShadow: '0 8px 16px -4px rgba(1,114,253,0.4), inset 0px -4px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' }
              : { boxShadow: '0 0 10px rgba(255,255,255,0.8)' }
          }
        >
          <span>Continue</span>
          <ArrowRight className={`absolute right-4 md:right-8 w-6 h-6 md:w-6 md:h-6 stroke-[3] ${!selectedSkill && 'opacity-50'}`} />
        </motion.button>
      </motion.div>
    </div>
  );
}
