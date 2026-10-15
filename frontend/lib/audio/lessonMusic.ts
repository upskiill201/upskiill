/**
 * The lesson soundtrack: a soft, warm groove that gets bigger as the
 * learner does well — the "adaptive music" games use so that doing well
 * SOUNDS like doing well (vertical layering: one loop, layers mixed in and
 * out by a single intensity value).
 *
 *   level 0  pad + gentle pluck        (Learn, Reflect, the start of Apply)
 *   level 1  + soft kick and shaker    (3 in a row)
 *   level 2  + bass line               (5 in a row)
 *   level 3  + arpeggio lead           (7 in a row)
 *   level 4  + claps and sparkle       (10 in a row)
 *
 * A wrong answer drops straight back to level 0 with a filter dip, so a lost
 * run is HEARD — gently. New layers only join on the next bar line, so it
 * always stays in time.
 *
 * Music sits on its own bus (settings → Music) and is quiet by design: it's
 * a bed under the sound effects, never on top of them. Key of C major, like
 * every Teyro cue, so a "correct" chime always lands in tune with the loop.
 *
 * Never throws: audio is decoration.
 */

import soundManager from './soundManager';

const BPM = 100;
const STEP = 60 / BPM / 4; // a 16th note, seconds
const LOOKAHEAD = 0.12; // seconds scheduled ahead
const TICK_MS = 30;

/** A4-relative semitone → Hz. */
const hz = (semi: number) => 440 * Math.pow(2, semi / 12);
// I – vi – IV – V in C: one chord per bar.
const CHORDS: number[][] = [
  [-21, -17, -14], // C3 E3 G3
  [-24, -21, -17], // A2 C3 E3
  [-28, -24, -21], // F2 A2 C3
  [-26, -22, -19], // G2 B2 D3
];
const ROOTS = [-33, -36, -40, -38]; // C2 A1 F1 G1
/** The arpeggio walks the chord an octave and a bit up. */
const ARP = [0, 1, 2, 1, 0, 2, 1, 2];

export type MusicMood = 'learn' | 'apply' | 'reflect';

interface Engine {
  ctx: AudioContext;
  out: GainNode;
  filter: BiquadFilterNode;
  timer: ReturnType<typeof setInterval>;
  nextAt: number;
  step: number;
  level: number;
  pendingLevel: number;
  mood: MusicMood;
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
  o.frequency.setValueAtTime(120, t);
  o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
  const g = e.ctx.createGain();
  g.gain.setValueAtTime(peak, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  o.connect(g);
  g.connect(e.filter);
  o.start(t);
  o.stop(t + 0.3);
}

/** Everything that plays on one 16th step. */
function playStep(e: Engine, step: number, t: number) {
  const inBar = step % 16;
  const bar = Math.floor(step / 16) % 4;
  // New layers join on the bar line.
  if (inBar === 0 && e.pendingLevel !== e.level) e.level = e.pendingLevel;
  const L = e.mood === 'apply' ? e.level : 0;
  const chord = CHORDS[bar];
  const soft = e.mood === 'reflect' ? 0.6 : 1;

  // Pad: the chord, held for the bar, two detuned voices for width.
  if (inBar === 0) {
    const barLen = STEP * 16;
    for (const n of chord) {
      voice(e, 'triangle', hz(n + 12), t, barLen * 1.05, 0.05 * soft, 0.4);
      voice(e, 'sine', hz(n + 12) * 1.004, t, barLen * 1.05, 0.035 * soft, 0.5);
    }
  }
  // Pluck: root and fifth on beats 1 and 3 — a heartbeat.
  if (inBar === 0 || inBar === 8) voice(e, 'triangle', hz(chord[0] + 24), t, 0.5, 0.05 * soft);
  if (inBar === 6 || inBar === 14) voice(e, 'triangle', hz(chord[2] + 24), t, 0.35, 0.03 * soft);

  if (L >= 1) {
    if (inBar === 0 || inBar === 8) kick(e, t, 0.22);
    if (inBar % 2 === 1) hit(e, t, 0.05, inBar % 4 === 3 ? 0.05 : 0.03, 7000, 'highpass');
  }
  if (L >= 2 && inBar % 2 === 0) {
    const root = ROOTS[bar];
    const n = inBar % 8 === 6 ? root + 12 : root;
    voice(e, 'sine', hz(n + 12), t, STEP * 1.8, 0.12);
    voice(e, 'triangle', hz(n + 12), t, STEP * 1.2, 0.04);
  }
  if (L >= 3) {
    const tone = chord[ARP[inBar % ARP.length]] + 36;
    voice(e, 'square', hz(tone), t, STEP * 0.9, 0.018);
    voice(e, 'sine', hz(tone + 12), t, STEP * 0.7, 0.02);
  }
  if (L >= 4) {
    if (inBar === 4 || inBar === 12) hit(e, t, 0.12, 0.09, 1500, 'bandpass');
    if (inBar === 15) voice(e, 'sine', hz(chord[1] + 48), t, 0.4, 0.025);
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
    stopLessonMusic(0);
  }
}

/** Start the loop (no-op when music is off, muted, or already playing). */
export function startLessonMusic(mood: MusicMood = 'learn'): void {
  try {
    if (engine) {
      setMusicMood(mood);
      return;
    }
    const bus = soundManager.getMusicBus();
    if (!bus) return;
    const { ctx } = bus;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, ctx.currentTime);
    out.gain.exponentialRampToValueAtTime(0.55, ctx.currentTime + 1.6);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 5200;
    filter.Q.value = 0.4;
    filter.connect(out);
    out.connect(bus.output);
    engine = {
      ctx,
      out,
      filter,
      timer: setInterval(tick, TICK_MS),
      nextAt: ctx.currentTime + 0.08,
      step: 0,
      level: 0,
      pendingLevel: 0,
      mood,
    };
  } catch {
    engine = null;
  }
}

/** Fade out and stop. */
export function stopLessonMusic(fadeSeconds = 0.8): void {
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

export function setMusicMood(mood: MusicMood): void {
  if (engine) engine.mood = mood;
}

/** The combo run → how many layers play (joins on the next bar). */
export function musicLevelForRun(run: number): number {
  if (run >= 10) return 4;
  if (run >= 7) return 3;
  if (run >= 5) return 2;
  if (run >= 3) return 1;
  return 0;
}

export function setMusicIntensity(level: number): void {
  if (!engine) return;
  engine.pendingLevel = Math.max(0, Math.min(4, Math.round(level)));
}

/** A wrong answer: everything above the bed drops out now, with a dip. */
export function musicStumble(): void {
  const e = engine;
  if (!e) return;
  e.level = 0;
  e.pendingLevel = 0;
  try {
    const t = e.ctx.currentTime;
    e.filter.frequency.cancelScheduledValues(t);
    e.filter.frequency.setValueAtTime(5200, t);
    e.filter.frequency.exponentialRampToValueAtTime(700, t + 0.12);
    e.filter.frequency.exponentialRampToValueAtTime(5200, t + 1.4);
  } catch {
    // decoration
  }
}

/** Duck under a big moment (a fanfare), then come back. */
export function duckMusic(seconds = 1.5): void {
  const e = engine;
  if (!e) return;
  try {
    const t = e.ctx.currentTime;
    e.out.gain.cancelScheduledValues(t);
    e.out.gain.setValueAtTime(Math.max(0.0001, e.out.gain.value), t);
    e.out.gain.exponentialRampToValueAtTime(0.15, t + 0.08);
    e.out.gain.exponentialRampToValueAtTime(0.55, t + seconds);
  } catch {
    // decoration
  }
}

export function isLessonMusicPlaying(): boolean {
  return engine !== null;
}
