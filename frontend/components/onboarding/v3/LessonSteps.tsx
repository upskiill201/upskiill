'use client';

/**
 * The aha moment: the chosen course's REAL first lesson, played in the real
 * LessonPlayer before signup (simulate mode: graded on the device, nothing
 * saved, first-lesson hearts are free). Finishing it records a claim on the
 * server; signing up turns it into their actual lesson 1 with real XP and
 * streak day 1. Then the gift chest.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Coins, Snowflake } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import TeyroBrandedLoader from '@/components/ui/TeyroBrandedLoader';
import { playChestRevealFanfare } from '@/lib/audio/celebrationAudio';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { fireConfetti } from '@/lib/confetti';

const TreasureChest = dynamic(() => import('@/components/gamification/TreasureChest'), { ssr: false });
import type { TreasureChestHandle } from '@/components/gamification/TreasureChest';

interface FirstLesson {
  course: { id: string; title: string };
  lesson: Record<string, unknown> & { id: string; xpReward?: number };
}

export interface LessonClaim {
  claimToken: string;
  lessonXp: number;
  chest: { coins: number; streakFreezes: number };
}

export function LessonStep(props: {
  courseId: string;
  onDone: (claim: LessonClaim | null, lessonId: string) => void;
  onQuit: () => void;
  onStart: (lessonId: string) => void;
}) {
  const [data, setData] = useState<FirstLesson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const started = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/onboarding-flow/courses/${props.courseId}/first-lesson`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: FirstLesson) => {
        if (cancelled) return;
        let blocks = d.lesson.contentBlocks;
        if (typeof blocks === 'string') {
          try {
            blocks = JSON.parse(blocks);
          } catch {
            blocks = {};
          }
        }
        setData({ ...d, lesson: { ...d.lesson, contentBlocks: blocks || {} } });
        started.current = Date.now();
        props.onStart(d.lesson.id);
      })
      .catch(() => !cancelled && setError("I couldn't load your lesson. Check your connection and try again."));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.courseId, run]);

  if (error) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center bg-[var(--bg-page)]">
        <p className="text-[17px] font-extrabold text-[var(--color-ink)]">{error}</p>
        <button
          type="button"
          className="rounded-[14px] px-6 py-3 font-extrabold text-white bg-[var(--color-brand)]"
          onClick={() => {
            setError(null);
            setRun((r) => r + 1);
          }}
        >
          Try again
        </button>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-page)]" aria-busy="true" aria-label="Opening your lesson">
        <TeyroBrandedLoader suppressConnectionCheck />
      </div>
    );
  }

  const finish = async () => {
    const timeSpentSeconds = Math.round((Date.now() - started.current) / 1000);
    try {
      const res = await fetch('/api/onboarding-flow/lesson-claim', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: data.course.id,
          lessonId: data.lesson.id,
          stats: { timeSpentSeconds: Math.min(3600, timeSpentSeconds) },
        }),
      });
      props.onDone(res.ok ? ((await res.json()) as LessonClaim) : null, data.lesson.id);
    } catch {
      props.onDone(null, data.lesson.id);
    }
  };

  return (
    <LessonPlayer
      key={`${data.lesson.id}-${run}`}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lesson={data.lesson as any}
      courseId={data.course.id}
      isReview={false}
      simulate
      pathOverride={null}
      onExit={props.onQuit}
      onCompleted={() => undefined}
      onFinished={() => void finish()}
    />
  );
}

/** The gift: a real chest, tapped open, with real rewards held until signup. */
export function ChestStep(props: { coins: number; streakFreezes: number; onContinue: () => void }) {
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const chest = useRef<TreasureChestHandle | null>(null);
  const fallback = useRef<number | null>(null);

  // The button taps the chest itself, so it opens with its own animation;
  // if the animation never reports back, the reward still shows.
  const open = () => {
    if (revealed) return;
    chest.current?.click();
    if (!fallback.current) fallback.current = window.setTimeout(reveal, 2500);
  };

  const reveal = () => {
    if (fallback.current) window.clearTimeout(fallback.current);
    if (revealed) return;
    setRevealed(true);
    playChestRevealFanfare();
    celebrationHaptic('big');
    if (!reduce) fireConfetti({ particleCount: 90, spread: 80, origin: { y: 0.45 } });
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-between px-6 py-10 text-center bg-[var(--bg-page)]">
      <div className="pt-6">
        <h1
          className="text-[28px] font-extrabold text-[var(--color-ink)]"
          style={{ fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif' }}
        >
          {revealed ? 'Your first gift!' : 'You unlocked a gift!'}
        </h1>
        <p className="mt-2 text-[15px] font-semibold text-[var(--text-secondary)]">
          {revealed ? "It's waiting for you. Save your progress to keep it." : 'Tap the chest to open it.'}
        </p>
      </div>

      <div className="relative w-[min(78vw,320px)] h-[min(42dvh,320px)]">
        <TreasureChest
          ref={chest}
          rewardType="coins"
          active={!revealed}
          onTap={() => playHaptic('medium')}
          onRewardReveal={reveal}
          onError={() => reveal()}
          className="w-full h-full"
        />
      </div>

      <div className="w-full max-w-[420px] flex flex-col gap-4">
        {revealed && (
          <motion.ul
            className="flex justify-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <li className="flex items-center gap-2 rounded-full px-4 py-2 bg-[var(--bg-section)] font-extrabold text-[var(--color-ink)]">
              <Coins className="w-5 h-5 text-[var(--warning)]" aria-hidden="true" /> +{props.coins} Coins
            </li>
            <li className="flex items-center gap-2 rounded-full px-4 py-2 bg-[var(--bg-section)] font-extrabold text-[var(--color-ink)]">
              <Snowflake className="w-5 h-5 text-[var(--color-brand)]" aria-hidden="true" /> +{props.streakFreezes} streak freeze
            </li>
          </motion.ul>
        )}
        <button
          type="button"
          onClick={revealed ? props.onContinue : open}
          className="w-full min-h-[56px] rounded-[16px] font-extrabold uppercase tracking-wider text-[16px] text-white"
          style={{ background: 'var(--success-green)', boxShadow: '0 6px 0 color-mix(in srgb, var(--success-green) 72%, black)' }}
        >
          {revealed ? 'Continue' : 'Open it'}
        </button>
      </div>
    </div>
  );
}
