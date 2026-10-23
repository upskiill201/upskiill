'use client';

/**
 * The emotional beats of onboarding v3: what the course gives them (real
 * facts), the projection (a personal result before any ask), the
 * hold-to-commit pledge, and "building your plan" right before the paywall.
 */

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Art, type ArtName } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import { playOnboardingCue, resetCommitTicks } from '@/lib/audio/onboardingAudio';
import { duckOnboardingMusic } from '@/lib/audio/onboardingMusic';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import { chapterOneFinish, type CatalogCourse } from '@/lib/onboarding/v3/catalog';
import { kitCss as css } from './ui/Kit';

function day(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

/** "Here's what you'll get": only things the course really has. */
export function OutcomeStep(props: { course: CatalogCourse; minutes: number }) {
  const reduce = useReducedMotion();
  const c = props.course;
  const facts: { art: ArtName; title: string; sub: string }[] = [
    {
      art: 'cards',
      title: `${c.totalLessons} bite-size lessons`,
      sub: `${c.chapters} ${c.chapters === 1 ? 'chapter' : 'chapters'}, about ${c.firstLesson.durationMinutes} minutes each`,
    },
    { art: 'target', title: 'Learn by doing', sub: 'Real questions and practice in every lesson' },
    { art: 'calendar', title: 'A habit that sticks', sub: `${props.minutes} minutes a day, reminders at your time, a streak to keep` },
    { art: 'certificate', title: 'A certificate when you finish', sub: 'With your name on it, ready to share' },
  ];
  return (
    <ul className={css.facts}>
      {facts.map((f, i) => (
        <motion.li
          key={f.title}
          className={css.fact}
          initial={reduce ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.12, duration: 0.3 }}
        >
          <Art name={f.art} size={52} />
          <span>
            <span className={`${css.factTitle} block`}>{f.title}</span>
            <span className={`${css.factSub} block`}>{f.sub}</span>
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

/** "At 10 min a day you finish Chapter 1 by Fri, Nov 6", drawn as a rising curve. */
export function ProjectionStep(props: { course: CatalogCourse; minutes: number }) {
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
    <div className="flex flex-col gap-4">
      <div className="w-full rounded-[20px] border-2 border-[var(--border)] bg-[var(--bg-page)] p-4" style={{ boxShadow: '0 4px 0 var(--border)' }}>
        <svg viewBox="0 0 320 160" className="w-full h-auto" role="img" aria-label={`Chapter 1 done in ${days} days`}>
          <defs>
            <linearGradient id="ob-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--color-brand)" stopOpacity="0.22" />
              <stop offset="1" stopColor="var(--color-brand)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 75, 110].map((y) => (
            <line key={y} x1="16" y1={y} x2="304" y2={y} stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 6" />
          ))}
          <line x1="16" y1="136" x2="304" y2="136" stroke="var(--border)" strokeWidth="2" />
          <motion.path
            d="M16 134 C 90 130, 150 106, 200 78 S 280 28, 300 24 L300 136 L16 136 Z"
            fill="url(#ob-area)"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: drawn ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            d="M16 134 C 90 130, 150 106, 200 78 S 280 28, 300 24"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="7"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
          <circle cx="16" cy="134" r="7" fill="var(--color-brand)" />
          <motion.g
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 12 }}
            style={{ transformOrigin: '300px 24px' }}
          >
            <circle cx="300" cy="24" r="13" fill="var(--success-green)" />
            <path d="M294 24l4 4 8-9" stroke="var(--bg-page)" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
          <text x="16" y="154" fontSize="12" fontWeight="800" fill="var(--text-secondary)">
            Today
          </text>
          <text x="304" y="154" fontSize="12" fontWeight="800" fill="var(--text-secondary)" textAnchor="end">
            {day(date)}
          </text>
        </svg>
      </div>
      <motion.p
        className="text-center text-[19px] leading-snug font-extrabold text-[var(--color-ink)]"
        style={{ fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif' }}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: drawn ? 1 : 0, y: drawn ? 0 : 8 }}
      >
        At {props.minutes} min a day, you finish Chapter 1 by {day(date)}
      </motion.p>
      <p className="text-center text-[14px] font-semibold text-[var(--text-secondary)]">
        {props.course.chapterOneLessons} lessons, about {props.course.chapterOneMinutes} minutes in all. That&apos;s {days}{' '}
        {days === 1 ? 'day' : 'days'} from now.
      </p>
    </div>
  );
}

/** Hold to commit: 1.5s of pressure turns a tap into a promise. */
export function CommitStep(props: { minutes: number; goalPhrase?: string; topic?: string; committed?: boolean; onCommitted: () => void }) {
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

  const lines: { art: ArtName; text: string }[] = [
    { art: 'pace10', text: `I'll learn ${props.minutes} minutes a day` },
    { art: 'target', text: props.goalPhrase ? `to ${props.goalPhrase}` : props.topic ? `to learn ${props.topic}` : 'one lesson at a time' },
    { art: 'calendar', text: 'and keep my streak alive' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 pt-1">
      <motion.div
        className="w-full rounded-[22px] border-2 p-4"
        style={{
          borderColor: done ? 'color-mix(in srgb, var(--success-green) 60%, white)' : 'var(--border)',
          background: done ? 'color-mix(in srgb, var(--success-green) 8%, white)' : 'var(--bg-page)',
          boxShadow: `0 4px 0 ${done ? 'color-mix(in srgb, var(--success-green) 60%, white)' : 'var(--border)'}`,
        }}
        animate={done && !reduce ? { scale: [1, 1.03, 1] } : undefined}
        transition={{ duration: 0.4 }}
      >
        <p className="mb-3 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">My promise</p>
        <ul className="flex flex-col gap-3">
          {lines.map((l) => (
            <li key={l.text} className="flex items-center gap-3 text-[17px] font-extrabold text-[var(--color-ink)]">
              <Art name={l.art} size={40} />
              {l.text}
            </li>
          ))}
        </ul>
      </motion.div>
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
        className="relative w-full h-[64px] overflow-hidden rounded-[18px] select-none touch-none font-extrabold uppercase tracking-wider text-[16px]"
        style={{
          background: done ? 'var(--success-green)' : 'var(--color-brand)',
          color: 'var(--bg-page)',
          boxShadow: `0 5px 0 ${done ? 'color-mix(in srgb, var(--success-green) 68%, black)' : 'var(--color-brand-deep)'}`,
        }}
      >
        <motion.span aria-hidden="true" className="absolute inset-y-0 left-0" style={{ width, background: 'var(--success-green)' }} />
        <span className="relative z-10 inline-flex items-center gap-2">
          {done ? (
            <>
              <Glyph name="check" size={22} strokeWidth={3.6} /> I&apos;m in!
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
export function PlanStep(props: { name?: string; goalPhrase?: string; courseTitle?: string; minutes: number; when?: string; onDone: () => void }) {
  const reduce = useReducedMotion();
  const lines = [
    props.courseTitle ? `Course: ${props.courseTitle}` : 'Your course',
    props.goalPhrase ? `Goal: ${props.goalPhrase}` : 'Your goal',
    `Pace: ${props.minutes} min a day`,
    props.when ? `Reminders: ${props.when}` : 'Your reminders and streak',
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
    }, total + 400);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 text-center bg-[var(--bg-page)]">
      <motion.div
        initial={reduce ? false : { scale: 0.7, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14 }}
      >
        <Art name="clipboard" size={120} />
      </motion.div>
      <motion.p className="mt-2 text-[44px] font-extrabold text-[var(--color-brand)] tabular-nums" aria-live="polite">
        {pctText}
      </motion.p>
      <h1 className="text-[24px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif' }}>
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
            <motion.span
              className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center"
              style={{ background: i < shown ? 'var(--success-green)' : 'var(--border)', color: 'var(--bg-page)' }}
              animate={i < shown && !reduce ? { scale: [1, 1.25, 1] } : undefined}
              transition={{ duration: 0.3 }}
            >
              {i < shown && <Glyph name="check" size={16} strokeWidth={3.6} />}
            </motion.span>
            {l}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
