/**
 * The onboarding soundtrack (founder, 2026-10-22: "sounds AND music").
 *
 * Same engine idea as lessonMusic.ts: one synthesised loop on the Music bus,
 * layers mixed in and out, new layers joining on the bar line so it always
 * stays in time. What changes is the shape of the journey:
 *
 *   intro     warm pad, slow pluck              (splash → name)
 *   build     + kick/shaker, then bass, then    (the questions; layers join
 *               arpeggio as progress grows      as the bar fills: goal gradient)
 *   reward    bright, full, major lift          (after the lesson: XP, streak, chest)
 *   tension   held suspended chord, rising      (building the plan → paywall)
 *
 * The lesson itself hands over to lessonMusic (the player starts its own),
 * and big moments duck the loop so stingers land on top.
 * Never throws: audio is decoration. No audio files.
 */

import soundManager from './soundManager';

export type OnboardingMood = 'intro' | 'build' | 'reward' | 'tension';

const BPM = 96;
const STEP = 60 / BPM / 4;
const LOOKAHEAD = 0.12;
const TICK_MS = 30;
const hz = (semi: number) => 440 * Math.pow(2, semi / 12);

// C – G – Am – F (warm, hopeful). Tension swaps to Fsus2 – Gsus4 suspensions.
const CHORDS: number[][] = [
  [-21, -17, -14],
  [-26, -22, -19],
  [-24, -21, -17],
  [-28, -24, -21],
];
const TENSION: number[][] = [
  [-28, -26, -21], // F G C (sus)
  [-26, -21, -19], // G C D (sus4)
  [-28, -26, -21],
  [-26, -21, -19],
];
const ROOTS = [-33, -38, -36, -40];
const ARP = [0, 2, 1, 2, 0, 2, 1, 0];

interface Engine {
  ctx: AudioContext;
  out: GainNode;
  filter: BiquadFilterNode;
  timer: ReturnType<typeof setInterval>;
  nextAt: number;
  step: number;
  level: number;
  pendingLevel: number;
  mood: OnboardingMood;
}

let engine: Engine | null = null;
let noise: AudioBuffer | null = null;

function noiseBuf(ctx: AudioContext): AudioBuffer {
  if (noise && noise.sampleRate === ctx.sampleRate) return noise;
  noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = noise.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return noise;
}

function voice(e: Engine, type: OscillatorType, freq: number, t: number, dur: number, peak: number, attack = 0.01) {
  const o = e.ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  const g = e.ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(e.filter);
  o.start(t);
  o.stop(t + dur + 0.05);
}

function hit(e: Engine, t: number, dur: number, peak: number, freq: number, type: BiquadFilterType) {
  const src = e.ctx.createBufferSource();
  src.buffer = noiseBuf(e.ctx);
  const f = e.ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  const g = e.ctx.createGain();
  g.gain.setValueAtTime(peak, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f);
  f.connect(g);
  g.connect(e.filter);
  src.start(t, Math.random() * 0.5);
  src.stop(t + dur + 0.05);
}

function kick(e: Engine, t: number, peak: number) {
  const o = e.ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(115, t);
  o.frequency.exponentialRampToValueAtTime(40, t + 0.14);
  const g = e.ctx.createGain();
  g.gain.setValueAtTime(peak, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  o.connect(g);
  g.connect(e.filter);
  o.start(t);
  o.stop(t + 0.3);
}

function playStep(e: Engine, step: number, t: number) {
  const inBar = step % 16;
  const bar = Math.floor(step / 16) % 4;
  if (inBar === 0 && e.pendingLevel !== e.level) e.level = e.pendingLevel;

  const tension = e.mood === 'tension';
  const reward = e.mood === 'reward';
  const chord = (tension ? TENSION : CHORDS)[bar];
  // Reward plays everything; intro never more than the bed.
  const L = reward ? 4 : e.mood === 'intro' ? 0 : e.level;

  if (inBar === 0) {
    const barLen = STEP * 16;
    for (const n of chord) {
      voice(e, 'triangle', hz(n + 12), t, barLen * 1.05, tension ? 0.06 : 0.045, 0.45);
      voice(e, 'sine', hz(n + 12) * 1.004, t, barLen * 1.05, 0.03, 0.55);
    }
  }

  // Tension: a slow rising pulse instead of a groove, so the plan builder
  // feels like something is about to happen.
  if (tension) {
    if (inBar % 4 === 0) voice(e, 'sine', hz(chord[2] + 24 + (inBar / 4) * 2), t, STEP * 3, 0.03);
    if (inBar === 12) hit(e, t, 0.4, 0.03, 3000, 'bandpass');
    return;
  }

  if (inBar === 0 || inBar === 8) voice(e, 'triangle', hz(chord[0] + 24), t, 0.5, 0.045);
  if (inBar === 6 || inBar === 14) voice(e, 'triangle', hz(chord[2] + 24), t, 0.35, 0.028);

  if (L >= 1) {
    if (inBar === 0 || inBar === 8) kick(e, t, 0.2);
    if (inBar % 2 === 1) hit(e, t, 0.05, inBar % 4 === 3 ? 0.045 : 0.025, 7000, 'highpass');
  }
  if (L >= 2 && inBar % 2 === 0) {
    const root = ROOTS[bar];
    voice(e, 'sine', hz((inBar % 8 === 6 ? root + 12 : root) + 12), t, STEP * 1.8, 0.11);
  }
  if (L >= 3) {
    const tone = chord[ARP[inBar % ARP.length]] + 36;
    voice(e, 'sine', hz(tone), t, STEP * 0.8, 0.022);
  }
  if (L >= 4) {
    if (inBar === 4 || inBar === 12) hit(e, t, 0.12, 0.08, 1500, 'bandpass');
    if (inBar === 15) voice(e, 'sine', hz(chord[1] + 48), t, 0.4, 0.022);
  }
}

function tick() {
  const e = engine;
  if (!e) return;
  try {
    while (e.nextAt < e.ctx.currentTime + LOOKAHEAD) {
      playStep(e, e.step, e.nextAt);
      e.step++;
      e.nextAt += STEP;
    }
  } catch {
    stopOnboardingMusic(0);
  }
}

/**
 * Start (or retune) the loop. Call it from a tap: browsers only let audio
 * start after a gesture. A no-op when music is off or muted.
 */
export function startOnboardingMusic(mood: OnboardingMood = 'intro'): void {
  try {
    if (engine) {
      setOnboardingMood(mood);
      return;
    }
    const bus = soundManager.getMusicBus();
    if (!bus) return;
    const { ctx } = bus;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, ctx.currentTime);
    out.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 2);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 5000;
    filter.Q.value = 0.4;
    filter.connect(out);
    out.connect(bus.output);
    engine = { ctx, out, filter, timer: setInterval(tick, TICK_MS), nextAt: ctx.currentTime + 0.08, step: 0, level: 0, pendingLevel: 0, mood };
  } catch {
    engine = null;
  }
}

export function stopOnboardingMusic(fadeSeconds = 0.8): void {
  const e = engine;
  engine = null;
  if (!e) return;
  clearInterval(e.timer);
  try {
    const t = e.ctx.currentTime;
    e.out.gain.cancelScheduledValues(t);
    e.out.gain.setValueAtTime(Math.max(0.0001, e.out.gain.value), t);
    e.out.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(0.02, fadeSeconds));
    setTimeout(() => {
      try {
        e.out.disconnect();
      } catch {
        // already gone
      }
    }, (fadeSeconds + 0.2) * 1000);
  } catch {
    // decoration
  }
}

export function setOnboardingMood(mood: OnboardingMood): void {
  if (!engine) return;
  engine.mood = mood;
  if (mood === 'reward') engine.pendingLevel = 4;
}

/** Progress 0..1 → layers: the music fills out as the bar fills (goal gradient). */
export function setOnboardingProgress(fraction: number): void {
  if (!engine) return;
  const f = Math.max(0, Math.min(1, fraction));
  engine.pendingLevel = f >= 0.6 ? 3 : f >= 0.4 ? 2 : f >= 0.15 ? 1 : 0;
}

/** Dip under a stinger, then come back. */
export function duckOnboardingMusic(seconds = 1.4): void {
  const e = engine;
  if (!e) return;
  try {
    const t = e.ctx.currentTime;
    e.out.gain.cancelScheduledValues(t);
    e.out.gain.setValueAtTime(Math.max(0.0001, e.out.gain.value), t);
    e.out.gain.exponentialRampToValueAtTime(0.12, t + 0.08);
    e.out.gain.exponentialRampToValueAtTime(0.5, t + seconds);
  } catch {
    // decoration
  }
}

export function isOnboardingMusicPlaying(): boolean {
  return engine !== null;
}
