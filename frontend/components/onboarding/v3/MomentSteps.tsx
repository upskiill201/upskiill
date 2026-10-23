'use client';

/**
 * The emotional beats of onboarding v3: the projection (a personalised result
 * before any ask), the hold-to-commit pledge (commitment and consistency),
 * and "building your plan" (it names their answers right before the paywall).
 */

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { Check, Flame, Target, Timer } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { playOnboardingCue, resetCommitTicks } from '@/lib/audio/onboardingAudio';
import { duckOnboardingMusic } from '@/lib/audio/onboardingMusic';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { chapterOneFinish, type CatalogCourse } from '@/lib/onboarding/v3/catalog';

function day(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

/** "At 10 min a day you finish Chapter 1 by Fri, Nov 6", drawn as a rising curve. */
export function ProjectionStep(props: { course: CatalogCourse; minutes: number; name?: string }) {
  const reduce = useReducedMotion();
  const { days, date } = chapterOneFinish(props.course, props.minutes);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    playOnboardingCue('projection');
    const t = window.setTimeout(() => {
      setDrawn(true);
      playHaptic('success');
    }, reduce ? 0 : 1100);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <div className="w-full rounded-[20px] border-2 border-[var(--border)] bg-white p-4" style={{ boxShadow: '0 4px 0 var(--border)' }}>
      <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label={`Chapter 1 done in ${days} days`}>
        <line x1="16" y1="130" x2="304" y2="130" stroke="var(--border)" strokeWidth="2" />
        <motion.path
          d="M16 128 C 90 124, 150 100, 200 72 S 280 22, 300 18"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
        <motion.circle
          cx="300"
          cy="18"
          r="10"
          fill="var(--success-green)"
          initial={reduce ? false : { scale: 0 }}
          animate={{ scale: drawn ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        />
        <text x="16" y="146" fontSize="12" fontWeight="700" fill="var(--text-secondary)">Today</text>
        <text x="304" y="146" fontSize="12" fontWeight="700" fill="var(--text-secondary)" textAnchor="end">
          {day(date)}
        </text>
      </svg>
      <motion.p
        className="mt-3 text-center text-[17px] font-extrabold text-[var(--color-ink)]"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: drawn ? 1 : 0, y: drawn ? 0 : 8 }}
      >
        {props.minutes} min a day = Chapter 1 of {props.course.title} done by {day(date)}
      </motion.p>
      <p className="mt-1 text-center text-[13px] font-semibold text-[var(--text-secondary)]">
        {props.course.chapterOneLessons} lessons, about {props.course.chapterOneMinutes} minutes in all.
      </p>
    </div>
  );
}

/** Hold to commit: 1.5s of pressure turns a tap into a promise. */
export function CommitStep(props: { minutes: number; goalPhrase?: string; committed?: boolean; onCommitted: () => void }) {
  const reduce = useReducedMotion();
  const progress = useMotionValue(props.committed ? 1 : 0);
  const width = useTransform(progress, (p) => `${Math.round(p * 100)}%`);
  const [done, setDone] = useState(!!props.committed);
  const anim = useRef<ReturnType<typeof animate> | null>(null);
  const ticker = useRef<number | null>(null);

  const start = () => {
    if (done) return;
    resetCommitTicks();
    playHaptic('light');
    anim.current?.stop();
    anim.current = animate(progress, 1, {
      duration: reduce ? 0.4 : 1.5,
      ease: 'linear',
      onComplete: () => {
        setDone(true);
        if (ticker.current) window.clearInterval(ticker.current);
        playOnboardingCue('commitLocked');
        duckOnboardingMusic(1.2);
        celebrationHaptic('win');
        props.onCommitted();
      },
    });
    ticker.current = window.setInterval(() => {
      playOnboardingCue('commitTick');
      playHaptic('selection');
    }, 180);
  };
  const stop = () => {
    if (done) return;
    if (ticker.current) window.clearInterval(ticker.current);
    anim.current?.stop();
    animate(progress, 0, { duration: 0.25 });
  };

  useEffect(() => () => {
    if (ticker.current) window.clearInterval(ticker.current);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 pt-2">
      <ul className="w-full flex flex-col gap-2">
        {[
          { icon: Timer, text: `${props.minutes} minutes a day` },
          { icon: Target, text: props.goalPhrase ? `To ${props.goalPhrase}` : 'One small lesson at a time' },
          { icon: Flame, text: 'Keep my streak alive' },
        ].map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 rounded-[14px] bg-[var(--bg-section)] px-4 py-3 text-[16px] font-bold text-[var(--color-ink)]">
            <Icon className="w-5 h-5 text-[var(--color-brand)]" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onPointerDown={start}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && !e.repeat && start()}
        onKeyUp={(e) => (e.key === ' ' || e.key === 'Enter') && stop()}
        onContextMenu={(e) => e.preventDefault()}
        aria-label={done ? 'Committed' : 'Press and hold to commit'}
        className="relative w-full h-[64px] overflow-hidden rounded-[16px] select-none touch-none font-extrabold uppercase tracking-wider text-[16px]"
        style={{
          background: done ? 'var(--success-green)' : 'var(--color-brand)',
          color: 'var(--bg-page)',
          boxShadow: `0 6px 0 ${done ? 'color-mix(in srgb, var(--success-green) 72%, black)' : 'var(--color-brand-deep)'}`,
        }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 left-0"
          style={{ width, background: 'color-mix(in srgb, var(--success-green) 85%, white)' }}
        />
        <span className="relative z-10 inline-flex items-center gap-2">
          {done ? (
            <>
              <Check className="w-5 h-5" aria-hidden="true" /> I&apos;m in
            </>
          ) : (
            'Press and hold to commit'
          )}
        </span>
      </button>
    </div>
  );
}

/** "Building your plan": names their answers, one by one, then resolves. */
export function PlanStep(props: { name?: string; goalPhrase?: string; courseTitle?: string; minutes: number; onDone: () => void }) {
  const reduce = useReducedMotion();
  const lines = [
    props.goalPhrase ? `Your goal: ${props.goalPhrase}` : 'Your goal',
    props.courseTitle ? `Your course: ${props.courseTitle}` : 'Your course',
    `Your pace: ${props.minutes} min a day`,
    'Your reminders and streak',
  ];
  const [shown, setShown] = useState(0);
  const pct = useMotionValue(0);
  const pctText = useTransform(pct, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    const per = reduce ? 150 : 650;
    const timers = lines.map((_, i) =>
      window.setTimeout(() => {
        setShown(i + 1);
        playOnboardingCue('planTick');
        playHaptic('selection');
      }, per * (i + 1)),
    );
    const total = per * (lines.length + 1);
    animate(pct, 100, { duration: total / 1000, ease: 'easeInOut' });
    const end = window.setTimeout(() => {
      playOnboardingCue('planReady');
      celebrationHaptic('soft');
      props.onDone();
    }, total + 300);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 text-center bg-[var(--bg-page)]">
      <motion.p className="text-[56px] font-extrabold text-[var(--color-brand)] tabular-nums" aria-live="polite">
        {pctText}
      </motion.p>
      <h1 className="mt-2 text-[24px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif' }}>
        Building {props.name ? `${props.name}'s` : 'your'} plan…
      </h1>
      <ul className="mt-6 w-full max-w-[360px] flex flex-col gap-3 text-left">
        {lines.map((l, i) => (
          <motion.li
            key={l}
            initial={{ opacity: 0.35 }}
            animate={{ opacity: i < shown ? 1 : 0.35 }}
            className="flex items-center gap-3 text-[16px] font-bold text-[var(--color-ink)]"
          >
            <span
              className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center"
              style={{ background: i < shown ? 'var(--success-green)' : 'var(--border)', color: 'var(--bg-page)' }}
            >
              {i < shown && <Check className="w-4 h-4" strokeWidth={3} aria-hidden="true" />}
            </span>
            {l}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
