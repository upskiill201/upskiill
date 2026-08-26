'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowRight, Star, Flame, Check, AlertCircle } from 'lucide-react';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { MascotBackground } from '@/components/onboarding/MascotBackground';
import { SpeechBubble } from '@/components/onboarding/SpeechBubble';
import { useMessagePool } from '@/hooks/onboarding/useMessagePool';
import { MatchCard } from '@/components/onboarding/MatchCard';
import { DropSlot } from '@/components/onboarding/DropSlot';
import { playHaptic } from '@/lib/haptics';
// Celebration Engine owns the entire challenge-complete moment (same
// choreography as lesson completion) — no local victory modal anymore.
import { useCelebration } from '@/context/CelebrationContext';
import { useGamification } from '@/context/GamificationContext';
import { CURRENCY_ICONS } from '@/components/celebration/currency';

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
  cube: '/User onbarding Assets/step 9 shapes/step_9_square.webp',
  pyramid: '/User onbarding Assets/step 9 shapes/step_9_triangle.webp',
  cylinder: '/User onbarding Assets/step 9 shapes/step_9_cylinder.webp',
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

/** One-time reward paid by POST /user-onboarding/challenge-complete. */
const CHALLENGE_XP = 25;
const CHALLENGE_COINS = 25;

interface Step9ContentProps {
  onNext: () => void;
}

export default function Step9Content({ onNext }: Step9ContentProps) {
  const { currentAnswer, saveAnswer } = useOnboardingSession({ currentStep: 9, disableGuard: true });
  const { getRandomMessage } = useMessagePool();
  const mascotBounceControls = useAnimation();
  const { celebrate } = useCelebration();
  const gamification = useGamification();

  const [isLoaded, setIsLoaded] = useState(false);
  const [matched, setMatched] = useState<Record<ShapeId, boolean>>({
    cube: false,
    pyramid: false,
    cylinder: false,
  });

  /** True once this visit finished the game — footer Continue unlocks. */
  const [finished, setFinished] = useState(false);
  /**
   * True when step 9 was completed on an earlier visit — the reward was
   * already claimed then, so no celebration/re-claim plays; the user just
   * continues.
   */
  const [alreadyMastered, setAlreadyMastered] = useState(false);
  const [comboCount, setComboCount] = useState(0);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  /** Guards the victory celebration against double-queueing. */
  const celebrationQueuedRef = useRef(false);

  const [isShaking, setIsShaking] = useState<Record<ShapeId, boolean>>({
    cube: false,
    pyramid: false,
    cylinder: false,
  });

  const [isNear, setIsNear] = useState<Record<ShapeId, boolean>>({
    cube: false,
    pyramid: false,
    cylinder: false,
  });

  const [feedbackToast, setFeedbackToast] = useState<{
    message: string;
    type: 'correct' | 'combo' | 'incorrect' | 'complete';
  } | null>(null);

  const [mascotLine, setMascotLine] = useState<string | null>(null);

  const targetRefs = {
    cube: useRef<HTMLDivElement>(null),
    pyramid: useRef<HTMLDivElement>(null),
    cylinder: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (currentAnswer && currentAnswer.completed) {
      // Returning visitor — everything is already claimed and celebrated.
      setMatched({ cube: true, pyramid: true, cylinder: true });
      setFinished(true);
      setAlreadyMastered(true);
    }
  }, [currentAnswer]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleContinue = () => {
    if (!finished) return;
    playHaptic('medium');
    saveAnswer({ skipped: false, completed: true });
    onNext();
  };

  const handleSkip = () => {
    playHaptic('light');
    saveAnswer({ skipped: true });
    onNext();
  };

  const allMatched = matched.cube && matched.pyramid && matched.cylinder;

  // ── Victory → Celebration Engine ──────────────────────────────────────────
  // The CLAIM scene claims server-first: the POST lands while the deposit
  // beat plays, the count-up targets the exact balances the server returns,
  // and a crossed level boundary chains a LEVEL_UP scene behind this one.
  // A failed claim degrades inside the scene (headline + error + CONTINUE) —
  // completion still advances onboarding so nobody gets trapped here.
  useEffect(() => {
    if (!allMatched || finished || alreadyMastered) return;

    const timer = setTimeout(() => {
      setFinished(true);
      playHaptic('teyroCelebration');

      if (celebrationQueuedRef.current) return;
      celebrationQueuedRef.current = true;

      const subtitle = getRandomMessage('onExerciseComplete');
      setFeedbackToast({ message: subtitle, type: 'complete' });

      // Pre-claim snapshot drives the level-progress bar; the deposit beat
      // adds the earned XP on top, ending exactly at (current + 25).
      const preXpInLevel =
        typeof gamification.xpInCurrentLevel === 'number' ? gamification.xpInCurrentLevel : null;
      const preLevel = typeof gamification.userLevel === 'number' ? gamification.userLevel : null;

      celebrate({
        kind: 'CLAIM',
        title: 'Challenge complete!',
        subtitle,
        rewards: [
          { currency: 'XP', amount: CHALLENGE_XP },
          { currency: 'COINS', amount: CHALLENGE_COINS },
        ],
        claim: async () => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user-onboarding/challenge-complete`,
            {
              method: 'POST',
              credentials: 'include', // httpOnly JWT cookie
            }
          );
          if (!res.ok) {
            throw new Error('Could not save your reward. Check your connection and try again.');
          }
          const data = await res.json();

          // Instant global balance sync from server-confirmed totals…
          gamification.applyLessonReward(
            data.balances.xp,
            data.balances.streakDays ?? gamification.streakDays,
            data.balances.coins
          );
          // …then a server re-sync so a LEVEL_UP scene chains behind this one.
          void gamification.refresh();

          return { XP: data.balances.xp, COINS: data.balances.coins };
        },
        ...(preXpInLevel !== null &&
          preLevel !== null && {
            levelProgress: { current: preXpInLevel, target: 100, level: preLevel },
            progressCaption: `LEVEL ${preLevel} · ${preXpInLevel} / 100 XP`,
          }),
        dedupeKey: 'onboarding-challenge-step9',
        onComplete: () => {
          saveAnswer({ skipped: false, completed: true });
          onNext();
        },
      });
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMatched, finished, alreadyMastered]);

  const triggerSparkles = (x: number, y: number) => {
    const newSparkles = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() * 40 - 20),
      y: y + (Math.random() * 40 - 20),
    }));
    setSparkles((prev) => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id)));
    }, 450);
  };

  const handleDrag = (id: ShapeId, _event: any, info: any) => {
    const targetElement = targetRefs[id].current;
    if (!targetElement) return;
    const rect = targetElement.getBoundingClientRect();
    const distance = Math.hypot(
      info.point.x - (rect.left + rect.width / 2),
      info.point.y - (rect.top + rect.height / 2)
    );
    setIsNear((prev) => ({ ...prev, [id]: distance < 45 }));
  };

  const handleDragEnd = (id: ShapeId, _event: any, info: any) => {
    const targetElement = targetRefs[id].current;
    setIsNear((prev) => ({ ...prev, [id]: false }));
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const isInside =
      info.point.x >= rect.left &&
      info.point.x <= rect.right &&
      info.point.y >= rect.top &&
      info.point.y <= rect.bottom;

    if (isInside) {
      setMatched((prev) => ({ ...prev, [id]: true }));
      const nextCombo = comboCount + 1;
      setComboCount(nextCombo);

      if (nextCombo >= 2) {
        setFeedbackToast({ message: getRandomMessage('onStreakOfThree'), type: 'combo' });
      } else {
        setFeedbackToast({ message: getRandomMessage('onCorrectMatch'), type: 'correct' });
      }

      // Desktop mascot reacts to every successful match.
      setMascotLine(
        nextCombo >= 2
          ? getRandomMessage('onStreakOfThree')
          : getRandomMessage('onCorrectMatch')
      );

      setTimeout(() => setFeedbackToast(null), 3000);
      playHaptic('teyroSnap');
      triggerSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);

      void mascotBounceControls.start({
        y: [0, -15, 0],
        transition: { duration: 0.35, ease: 'easeOut' },
      });
    } else {
      setComboCount(0);
      setFeedbackToast({ message: getRandomMessage('onIncorrect'), type: 'incorrect' });
      setTimeout(() => setFeedbackToast(null), 3000);
      setIsShaking((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => setIsShaking((prev) => ({ ...prev, [id]: false })), 350);
      playHaptic('teyroIncorrect');
    }
  };

  const textShadowGlow = '0 0 15px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.9)';
  const canContinue = finished || alreadyMastered;

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-0 pb-2 md:pb-0 pt-1">
      {/* ── SPARKLES & TOAST ── */}
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

      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none w-max max-w-[90vw]">
        <AnimatePresence>
          {feedbackToast && feedbackToast.type !== 'complete' && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs md:text-sm tracking-wide shadow-md bg-white border-l-4 ${
                feedbackToast.type === 'incorrect'
                  ? 'border-orange-400 text-slate-700'
                  : feedbackToast.type === 'combo'
                    ? 'border-amber-500 text-slate-800'
                    : 'border-[#58CC02] text-slate-800'
              }`}
            >
              {feedbackToast.type === 'incorrect' ? (
                <AlertCircle className="w-4 h-4 text-orange-500 shrink-0" />
              ) : feedbackToast.type === 'combo' ? (
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse shrink-0" />
              ) : (
                <Check className="w-4 h-4 text-[#58CC02] stroke-[3.5] shrink-0" />
              )}
              <span>{feedbackToast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── GAME BOARD ── */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-[1.1fr_0.9fr] items-center justify-between w-full min-h-0 relative gap-3 md:gap-8">
        <div className="w-full h-full flex flex-col justify-center gap-2 sm:gap-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            className="w-full flex items-center justify-between text-left gap-3"
          >
            <div>
              <h1
                className="text-[clamp(1.5rem,7vw,1.85rem)] md:text-[2.5rem] font-[900] tracking-tight text-[#071233] leading-none"
                style={{ fontFamily: 'var(--font-jakarta)', textShadow: textShadowGlow }}
              >
                Match <span className="text-[#0172FD]">the blocks</span>
              </h1>
              <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">Drag each shape to match its pair.</p>
            </div>

            {/* Reward preview — Duolingo always shows what the challenge pays */}
            {!alreadyMastered && (
              <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-sm shrink-0">
                <span className="flex items-center gap-1">
                  <Image src={CURRENCY_ICONS.XP} alt="" width={16} height={16} />
                  <span className="text-[#6C8CFF] font-black text-xs">+{CHALLENGE_XP}</span>
                </span>
                <span className="w-px h-3.5 bg-slate-200" />
                <span className="flex items-center gap-1">
                  <Image src={CURRENCY_ICONS.COINS} alt="" width={16} height={16} />
                  <span className="text-yellow-600 font-black text-xs">+{CHALLENGE_COINS}</span>
                </span>
              </div>
            )}

            <button
              onClick={handleSkip}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm shrink-0"
            >
              Skip
            </button>
          </motion.div>

          {/* Slots */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[1.75rem] p-3 md:p-5 w-full flex flex-col gap-2 relative z-10 shadow-sm">
            <div className="flex justify-between px-4 text-slate-400 font-extrabold text-[10px] md:text-xs tracking-wider">
              <span>Target</span>
              <span>Drop</span>
            </div>
            <div className="flex flex-col gap-2 relative">
              {TARGETS.map((target) => (
                <DropSlot
                  key={target.id}
                  id={target.id}
                  img={SHAPES[target.id]}
                  label={target.label}
                  isMatched={matched[target.id]}
                  isNear={isNear[target.id]}
                  targetRef={targetRefs[target.id]}
                />
              ))}
            </div>
          </div>

          {/* Draggables tray */}
          <div className="flex justify-around items-center gap-2 w-full pt-1">
            {DRAGGABLES.map((item) => (
              <MatchCard
                key={item.id}
                id={item.id}
                img={item.img}
                label={item.label}
                isMatched={matched[item.id]}
                onDrag={(e, info) => handleDrag(item.id, e, info)}
                onDragEnd={(e, info) => handleDragEnd(item.id, e, info)}
                shake={isShaking[item.id]}
              />
            ))}
          </div>
        </div>

        {/* Desktop Mascot */}
        <div className="hidden md:flex flex-col items-center justify-center relative w-full h-full">
          <MascotBackground />
          <div className="mb-4 relative z-10">
            <SpeechBubble
              lines={[
                mascotLine ??
                  `You&apos;re doing <span style="color:#0172FD;font-weight:900">great!</span> Keep it up!`,
              ]}
            />
          </div>
          <div className="relative w-full max-w-[380px] aspect-square scale-[1.2] origin-bottom">
            <motion.div animate={mascotBounceControls} className="absolute inset-0 z-10">
              <Image src="/User onbarding Assets/Tey_step_9_img.webp" alt="Tey Mascot" fill className="object-contain" priority />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ROW ── */}
      <div className="w-full z-30 pt-2 shrink-0 flex items-center justify-between border-t border-slate-100/50">
        <span className="text-[#0172FD] font-black text-sm tracking-wide flex items-center gap-1.5" style={{ fontFamily: 'var(--font-jakarta)' }}>
          <Star className="w-4 h-4 fill-[#0172FD] stroke-none animate-pulse" />
          {canContinue ? 'Challenge complete!' : 'Match all 3 blocks!'}
        </span>

        <motion.button
          whileHover={canContinue ? { scale: 1.03 } : {}}
          whileTap={canContinue ? { scale: 0.94 } : {}}
          onClick={handleContinue}
          disabled={!canContinue}
          className={`h-11 md:h-12 px-6 rounded-xl font-[900] text-sm md:text-base tracking-wider flex items-center gap-2 ${
            canContinue
              ? 'bg-[#0172FD] text-white shadow-md cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
