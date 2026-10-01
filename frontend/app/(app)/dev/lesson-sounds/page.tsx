'use client';

/**
 * Dev-only sound board for the lesson experience (lib/audio/lessonSounds.ts).
 * Every cue gets a button, in journey order, so the sounds can be judged by
 * ear side by side — and "Play the journey" runs a whole lesson's worth in
 * sequence. Gated on NODE_ENV like /dev/tey-scenes, so it never ships.
 *
 * Also exposes `window.__lessonSoundStats(cue, n)`, which renders a cue
 * offline through the real studio chain and reports its peak, loudness and
 * length — how the sounds are checked for clipping and level without ears.
 */

import { useEffect, useState } from 'react';
import { LESSON_SOUND_CUES, playSound, type LessonSound } from '@/lib/audio/lessonSounds';
import { createStudio } from '@/lib/audio/studio';

const GROUPS: { title: string; cues: { cue: LessonSound; n?: number; label: string }[] }[] = [
  {
    title: 'The path',
    cues: [
      { cue: 'arrive', label: 'Arrive on home' },
      { cue: 'nodeTap', label: 'Tap a lesson (card opens)' },
      { cue: 'start', label: 'Press START' },
      { cue: 'nodeReview', label: 'Tap a finished lesson' },
      { cue: 'nodeLocked', label: 'Tap a locked lesson' },
      { cue: 'jump', label: 'Back to my lesson' },
      { cue: 'switchCourse', label: 'Switch course' },
      { cue: 'pathCheck', label: 'Back home: lesson ticks off' },
      { cue: 'pathUnlock', label: 'Back home: next lesson unlocks' },
    ],
  },
  {
    title: 'Learn',
    cues: [
      { cue: 'cardNext', label: 'Next card' },
      { cue: 'cardBack', label: 'Previous card' },
      { cue: 'gateOpen', label: 'Video watched: CONTINUE unlocks' },
      { cue: 'teyPop', label: 'Tey speaks' },
    ],
  },
  {
    title: 'Apply',
    cues: [
      { cue: 'select', label: 'Pick an answer' },
      { cue: 'correct', n: 1, label: 'Correct' },
      { cue: 'correct', n: 3, label: 'Correct — 3 in a row' },
      { cue: 'correct', n: 5, label: 'Correct — 5 in a row' },
      { cue: 'wrong', label: 'Wrong' },
      { cue: 'heartLost', label: 'Heart lost' },
      { cue: 'next', label: 'Continue' },
      { cue: 'fixMistakes', label: "Let's fix your mistakes" },
      { cue: 'outOfHearts', label: 'Out of hearts' },
    ],
  },
  {
    title: 'Between steps',
    cues: [
      { cue: 'phaseSeal', label: 'Step closes' },
      { cue: 'phaseTravel', label: 'Bar travels' },
      { cue: 'phaseUnlock', n: 0, label: 'Into Apply' },
      { cue: 'phaseUnlock', n: 1, label: 'Into Reflect' },
      { cue: 'phaseUnlock', n: 2, label: 'Into Deepen' },
      { cue: 'phaseUnlock', n: 3, label: 'Finish lesson' },
      { cue: 'quitOpen', label: "Wait, don't go!" },
      { cue: 'keepGoing', label: 'Keep learning' },
    ],
  },
  {
    title: 'The finish',
    cues: [
      { cue: 'lessonComplete', label: 'Lesson complete!' },
      { cue: 'perfectComplete', label: 'Perfect lesson!' },
      { cue: 'statTick', n: 0, label: 'Stat card 1' },
      { cue: 'statTick', n: 1, label: 'Stat card 2' },
      { cue: 'statTick', n: 2, label: 'Stat card 3' },
      { cue: 'badge', label: 'Record badge' },
      { cue: 'streak', label: 'Streak' },
      { cue: 'weekDay', label: "Today's circle fills" },
      { cue: 'streakMilestone', label: 'One week streak!' },
      { cue: 'questFill', n: 0, label: 'Quest bar moves' },
      { cue: 'questComplete', label: 'Quest complete' },
      { cue: 'unitComplete', label: 'Unit complete!' },
      { cue: 'courseComplete', label: 'Course complete!' },
    ],
  },
  {
    title: 'Creator studio',
    cues: [
      { cue: 'studioOpen', label: 'Creator onboarding opens' },
      { cue: 'creatorPlan', label: 'Your creator plan' },
      { cue: 'profileSaved', label: 'Creator profile saved' },
      { cue: 'studioReady', label: 'Your studio is ready!' },
      { cue: 'nudgeSent', label: 'Nudge sent to a learner' },
      { cue: 'cheerSent', label: 'Cheer sent to a learner' },
      { cue: 'couponMade', label: 'Coupon created' },
      { cue: 'cashOut', label: 'Payout requested' },
    ],
  },
];

/** A lesson's worth of sounds, in order, with real-ish gaps. */
const JOURNEY: [LessonSound, number, number][] = [
  ['nodeTap', 0, 0],
  ['start', 0, 900],
  ['cardNext', 0, 2200],
  ['phaseSeal', 0, 3200],
  ['phaseTravel', 0, 3420],
  ['phaseUnlock', 0, 3760],
  ['select', 0, 4800],
  ['correct', 1, 5400],
  ['next', 0, 6600],
  ['select', 0, 7300],
  ['wrong', 0, 7900],
  ['heartLost', 0, 8100],
  ['next', 0, 9400],
  ['fixMistakes', 0, 9700],
  ['select', 0, 10900],
  ['correct', 2, 11500],
  ['phaseUnlock', 1, 12800],
  ['phaseUnlock', 2, 14000],
  ['phaseUnlock', 3, 15200],
  ['lessonComplete', 0, 15600],
  ['statTick', 0, 16150],
  ['statTick', 1, 16430],
  ['statTick', 2, 16710],
  ['streak', 0, 18800],
  ['weekDay', 0, 19800],
  ['pathCheck', 0, 22000],
  ['pathUnlock', 0, 22800],
];

async function stats(cue: LessonSound, n = 0) {
  const rate = 44100;
  const ctx = new OfflineAudioContext(2, rate * 3.5, rate);
  const s = createStudio(ctx, ctx.destination);
  LESSON_SOUND_CUES[cue](s, n);
  const buf = await ctx.startRendering();
  let peak = 0;
  let sum = 0;
  let last = 0;
  const L = buf.getChannelData(0);
  const R = buf.getChannelData(1);
  for (let i = 0; i < L.length; i++) {
    const v = Math.max(Math.abs(L[i]), Math.abs(R[i]));
    if (v > peak) peak = v;
    sum += (L[i] * L[i] + R[i] * R[i]) / 2;
    if (v > 0.003) last = i;
  }
  // Loudness over the audible part only, so short sounds aren't penalised.
  const rms = Math.sqrt(sum / Math.max(1, last));
  return {
    cue,
    n,
    peakDb: +(20 * Math.log10(peak || 1e-9)).toFixed(1),
    rmsDb: +(20 * Math.log10(rms || 1e-9)).toFixed(1),
    lengthMs: Math.round((last / rate) * 1000),
  };
}

export default function LessonSoundsDevPage() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    (window as unknown as { __lessonSoundStats: typeof stats }).__lessonSoundStats = stats;
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return <div className="p-10">Not available.</div>;
  }

  const journey = () => {
    if (playing) return;
    setPlaying(true);
    JOURNEY.forEach(([cue, n, at]) => setTimeout(() => playSound(cue, n), at));
    setTimeout(() => setPlaying(false), 24000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-section)] px-4 py-8">
      <div className="mx-auto max-w-[760px]">
        <h1 className="text-[28px] font-extrabold text-ink">Lesson sounds</h1>
        <p className="mt-1 text-[15px] font-semibold text-[var(--text-secondary)]">
          Every sound of the lesson experience, in journey order. Use headphones and phone speakers both.
        </p>
        <button
          type="button"
          onClick={journey}
          disabled={playing}
          className="mt-5 w-full h-[52px] rounded-[16px] bg-brand text-white text-[16px] font-extrabold uppercase tracking-wide disabled:opacity-60 cursor-pointer"
          style={{ boxShadow: '0 4px 0 var(--color-brand-dark)' }}
        >
          {playing ? 'Playing the journey…' : 'Play the journey (a whole lesson, ~24s)'}
        </button>

        {GROUPS.map((g) => (
          <section key={g.title} className="mt-8">
            <h2 className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-secondary)]">{g.title}</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {g.cues.map(({ cue, n, label }) => (
                <button
                  key={`${cue}-${n ?? 0}`}
                  type="button"
                  onClick={() => playSound(cue, n ?? 0)}
                  className="text-left rounded-[14px] border-2 border-[var(--border)] bg-white px-4 py-3 cursor-pointer hover:border-[var(--color-brand)]"
                  style={{ boxShadow: '0 3px 0 var(--border)' }}
                >
                  <span className="block text-[15px] font-extrabold text-ink">{label}</span>
                  <span className="block text-[12px] font-bold text-[var(--text-muted)]">
                    {cue}
                    {n !== undefined ? ` · ${n}` : ''}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
