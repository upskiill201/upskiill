'use client';
import { playHaptic } from '@/lib/haptics';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { StepSkeleton } from '@/components/onboarding/StepSkeleton';

const SKILLS = [
  { id: 'coding',      label: 'Coding',       image: '/User%20onbarding%20Assets/Step%202%20icons/Coding_3d_icon.png',       bg: '#EBF3FF' },
  { id: 'photography', label: 'Photography',   image: '/User%20onbarding%20Assets/Step%202%20icons/Photography_3d_icon.PNG',  bg: '#EDE8FF' },
  { id: 'cooking',     label: 'Cooking',       image: '/User%20onbarding%20Assets/Step%202%20icons/Cooking_3d_icon.PNG',      bg: '#FFF4E0' },
  { id: 'design',      label: 'Design',        image: '/User%20onbarding%20Assets/Step%202%20icons/Design_3d_icon.PNG',       bg: '#E8FBF0' },
  { id: 'marketing',   label: 'Marketing',     image: '/User%20onbarding%20Assets/Step%202%20icons/Marketing_3d_icon.PNG',    bg: '#FFE8F0' },
  { id: 'fitness',     label: 'Fitness',       image: '/User%20onbarding%20Assets/Step%202%20icons/Fitness_3d_icon.png',      bg: '#FFF8E0' },
  { id: 'writing',     label: 'Writing',       image: '/User%20onbarding%20Assets/Step%202%20icons/Writing_3d_icon.png',      bg: '#EEF0FF' },
  { id: 'business',    label: 'Business',      image: '/User%20onbarding%20Assets/Step%202%20icons/Business_3d_icon.PNG',     bg: '#E0F4FF' },
  { id: 'music',       label: 'Music',         image: '/User%20onbarding%20Assets/Step%202%20icons/music_3d_icon.PNG',        bg: '#FDE8FF' },
  { id: 'other',       label: 'Other',         image: '/User%20onbarding%20Assets/Step%202%20icons/Other_3d_icon.PNG',        bg: '#F0F0F5' },
];

// ─── Animation variants ──────────────────────────────────────────────────────
// Headline — word stagger
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
  show:   { y: 0,  opacity: 1, scale: 1,    transition: { type: 'spring', stiffness: 500, damping: 20 } }
};

// Cards — dealt stagger. NOTE: these go on WRAPPER divs, NOT on the buttons themselves,
// so the button can separately handle selection/tap state without conflicting.
const deckContainer: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } }
};
const deckCard: any = {
  hidden: { scale: 0.82, y: 16, opacity: 0 },
  show:   { scale: 1,    y: 0,  opacity: 1, transition: { type: 'spring', stiffness: 420, damping: 26 } }
};
// ────────────────────────────────────────────────────────────────────────────

export default function OnboardingStep2() {
  const router = useRouter();
  const { isLoading, currentAnswer, saveAnswer, advance } = useOnboardingSession(2);

  // Selected skill — pre-populated from localStorage/DB on return visits
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [idle, setIdle] = useState(false);

  // Sync selectedSkill from restored session answer
  useEffect(() => {
    if (currentAnswer?.skill) {
      setSelectedSkill(currentAnswer.skill as string);
    }
  }, [currentAnswer]);

  // Idle nudge timer
  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <StepSkeleton />;

  const handleSelect = (id: string) => {
    playHaptic(10);
    setSelectedSkill(id);
    // Save instantly to localStorage — the hook does it here
    saveAnswer({ skill: id });
    setIdle(false);
  };
  const handleNext = () => {
    if (!selectedSkill) return;
    playHaptic(12);
    void advance();
  };
  const handleBack = () => {
    playHaptic(10);
    router.push('/onboarding/1');
  };

  const headlineShadow = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(0,0,0,0.15), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';
  const accentShadow   = '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.4), 0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9), 0 0 45px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5)';

  // Renders one skill card. Entrance animation is on the WRAPPER; tap/select on the BUTTON.
  const renderCard = (skill: typeof SKILLS[number], isMobile: boolean) => {
    const isSelected = selectedSkill === skill.id;
    const anySelected = selectedSkill !== '';

    return (
      // ── WRAPPER: handles staggered entrance ──
      <motion.div
        key={skill.id}
        variants={deckCard}
        // Dim unselected cards once a choice is made (2-keyframe spring — valid)
        animate={{ opacity: anySelected && !isSelected ? 0.55 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="relative"
      >
        {/* ── BUTTON: handles tap physics & selection state ── */}
        <motion.button
          whileHover={!anySelected || isSelected ? { scale: 1.06, y: -3 } : {}}
          whileTap={{ scale: 0.91, transition: { type: 'spring', stiffness: 600, damping: 18 } }}
          onClick={() => handleSelect(skill.id)}
          className={`relative flex flex-col items-center justify-center ${isMobile ? 'p-1.5 rounded-[1rem]' : 'p-4 rounded-3xl'} border-2 transition-colors duration-150 w-full aspect-square bg-white ${
            isSelected ? 'border-[#0172FD] bg-blue-50/50' : 'border-transparent'
          }`}
          style={{
            boxShadow: isSelected
              ? '0 0 25px rgba(255,255,255,1), 0 8px 20px rgba(1,114,253,0.15)'
              : '0 0 15px rgba(255,255,255,0.8), 0 4px 15px rgba(0,0,0,0.03)'
          }}
        >
          {/* Checkmark — springs in on select, springs out on deselect */}
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

          {/* 3D icon image — bounces on select */}
          <div
            className={`${isMobile ? 'w-14 h-14 rounded-xl mb-1' : 'w-[4.5rem] h-[4.5rem] rounded-2xl mb-3'} flex items-center justify-center relative overflow-hidden flex-shrink-0`}
            style={{ background: skill.bg }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={isSelected ? { scale: [1, 0.85, 1.15, 1] } : { scale: 1 }}
              transition={isSelected
                ? { duration: 0.35, ease: 'easeOut', times: [0, 0.25, 0.65, 1] }
                : { type: 'spring', stiffness: 300, damping: 20 }
              }
            >
              <Image
                src={skill.image}
                alt={skill.label}
                fill
                className="object-contain p-1"
                sizes={isMobile ? '56px' : '72px'}
              />
            </motion.div>
          </div>
          <span
            className={`font-bold ${isMobile ? 'text-[11px]' : 'text-base'} tracking-tight ${isSelected ? 'text-[#0172FD]' : 'text-[#0b132b]'}`}
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            {skill.label}
          </span>
        </motion.button>
      </motion.div>
    );
  };

  return (
    <div className="h-screen h-[100dvh] md:h-auto md:min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden relative">
      
      <div className="flex flex-col h-screen h-[100dvh] w-full relative z-10 md:hidden overflow-hidden pb-6 pt-4 justify-between">
        <div className="w-full h-[40dvh] flex flex-col justify-start items-center relative pt-4 overflow-visible shrink-0">
          <div className="w-full px-6 flex items-center gap-4 mb-4 shrink-0 relative z-20">
            <div className="flex-1 h-2.5 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(2 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -2px 0px rgba(0,0,0,0.1), inset 0px 2px 0px rgba(255,255,255,0.3)' }}
              />
            </div>
            <span className="text-sm font-[800] text-[#0172FD] shrink-0" style={{ textShadow: '0 0 10px rgba(255,255,255,1)' }}>2/15</span>
          </div>

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
              <Image src="/User%20onbarding%20Assets/Tey_thinking%20_Mobile.PNG" alt="Tey Thinking Mobile" fill className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]" priority />
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full h-[60dvh] flex flex-col justify-start items-center relative z-20 pb-4 px-6 bg-white pt-2">
          <div className="absolute -top-14 left-0 right-0 h-14 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />

          <div className="w-full flex flex-col items-center text-center mt-1 mb-3 px-2 z-20 shrink-0">
            {/* Relative scaled heading - constrained to 80% width */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[10vw] xs:text-[11vw] sm:text-4xl font-[900] leading-[1.08] mb-1.5 tracking-tight text-[#071233] w-[80%] mx-auto"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>What</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>skill</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>do</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>you</motion.span>
              <br />
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>want</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>to</motion.span>
              <motion.span variants={accentVariant} style={{ display: 'inline-block', color: '#0172FD', textShadow: accentShadow }}>master?</motion.span>
            </motion.h1>

            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.42 }}
              className="text-[3.8vw] xs:text-[4vw] sm:text-base font-medium text-slate-500 leading-tight max-w-[90%]"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Choose a skill to create your personalized path.
            </motion.p>
          </div>

          <motion.div
            variants={deckContainer}
            initial="hidden"
            animate="show"
            className="w-full flex-1 overflow-y-auto min-h-0 mb-4 z-20"
          >
            <div className="grid grid-cols-3 gap-2 pb-2">
              {SKILLS.map(skill => renderCard(skill, true))}
            </div>
          </motion.div>

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
              animate={selectedSkill && idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={selectedSkill && idle
                ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] }
                : { type: 'spring', stiffness: 300, damping: 20 }
              }
              whileHover={selectedSkill ? { scale: 1.02 } : {}}
              whileTap={selectedSkill ? { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } } : {}}
              onClick={handleNext}
              disabled={!selectedSkill}
              className={`flex-1 relative flex items-center justify-center h-12 rounded-xl font-bold text-base transition-all ${
                selectedSkill ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
              }`}
              style={selectedSkill ? { boxShadow: '0 8px 16px -4px rgba(1,114,253,0.4), inset 0px -4px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' } : { boxShadow: '0 0 10px rgba(255,255,255,0.8)' }}
            >
              <span>Continue</span>
              <ArrowRight className={`absolute right-4 w-5 h-5 stroke-[3] ${!selectedSkill && 'opacity-50'}`} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 w-full max-w-[1440px] mx-auto flex-row relative min-h-0">
        <motion.div
          initial={{ scale: 0.65, y: -30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-1/2 lg:w-5/12 flex items-center justify-center relative"
        >
          {/* Desktop mascot container size reduced to 90% width of its column container, removing scale overrides */}
          <div className="relative w-[90%] aspect-square transition-transform z-10">
            <MascotBackground />
            <motion.div layoutId="tey-mascot" className="absolute inset-0 z-10">
              <Image src="/User%20onbarding%20Assets/Tey_thinking_desktop.PNG" alt="Tey Thinking Desktop" fill className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]" priority />
            </motion.div>
          </div>
        </motion.div>

        <div className="w-full flex flex-col md:justify-center relative px-6 md:px-10 lg:px-12 z-20 flex-1 pb-8 md:pb-10">
          <div className="flex items-center gap-5 mb-10 relative z-10 w-full">
            <div className="flex-1 h-4 bg-[#E5EAEF] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(2 / 15) * 100}%` }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.8, delay: 0.25 }}
                className="h-full rounded-full relative"
                style={{ background: 'linear-gradient(90deg, #0172FD 0%, #3A96FF 100%)', boxShadow: 'inset 0px -3px 0px rgba(0,0,0,0.1), inset 0px 3px 0px rgba(255,255,255,0.3)' }}
              />
            </div>
            <span className="text-lg font-bold" style={{ color: '#0172FD', textShadow: '0 0 10px rgba(255,255,255,1)' }}>2/15</span>
          </div>

          <div className="relative z-10 w-full max-w-2xl mx-auto md:mx-0 pt-6 md:pt-0">
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-[2.25rem] leading-[1.1] md:text-[3.5rem] lg:text-[4rem] font-[800] mb-4 tracking-tight text-[#071233] text-left"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: headlineShadow }}
            >
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>What</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>skill</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>do</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>you</motion.span>
              <br />
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>want</motion.span>
              <motion.span variants={wordVariant} style={{ display: 'inline-block', marginRight: '0.22em' }}>to</motion.span>
              <motion.span variants={accentVariant} style={{ display: 'inline-block', color: '#0172FD', textShadow: accentShadow }}>master?</motion.span>
            </motion.h1>

            <motion.p
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.42 }}
              className="text-base md:text-xl lg:text-[1.35rem] mb-10 font-medium text-left text-slate-600 leading-snug"
              style={{ fontFamily: 'var(--font-jakarta)', textShadow: '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9), 0 0 35px rgba(255,255,255,0.7)' }}
            >
              Choose a skill you&apos;re passionate about.<br />
              We&apos;ll create a personalized learning path just for you.
            </motion.p>

            <motion.div
              variants={deckContainer}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10"
            >
              {SKILLS.map(skill => renderCard(skill, false))}
            </motion.div>

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
                animate={selectedSkill && idle ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={selectedSkill && idle
                  ? { duration: 0.45, ease: 'easeInOut', times: [0, 0.5, 1] }
                  : { type: 'spring', stiffness: 300, damping: 20 }
                }
                whileHover={selectedSkill ? { scale: 1.02 } : {}}
                whileTap={selectedSkill ? { scale: 0.94, transition: { type: 'spring', stiffness: 500, damping: 15 } } : {}}
                onClick={handleNext}
                disabled={!selectedSkill}
                className={`relative w-[240px] flex items-center justify-center h-16 rounded-[2rem] font-bold text-xl transition-all ${
                  selectedSkill ? 'bg-[#0172FD] text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
                }`}
                style={selectedSkill ? { boxShadow: '0 0 25px rgba(255,255,255,1), 0 16px 32px -8px rgba(1,114,253,0.5), inset 0px -6px 0px rgba(0,0,0,0.15), inset 0px 2px 0px rgba(255,255,255,0.2)' } : { boxShadow: '0 0 15px rgba(255,255,255,0.8)' }}
              >
                <span>Continue</span>
                <ArrowRight className={`absolute right-8 w-6 h-6 stroke-[3] ${!selectedSkill && 'opacity-50'}`} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
