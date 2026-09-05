/**
 * Celebration Audio — synthesized (WebAudio) sound bank for the Celebration Engine.
 *
 * Every sound is composed from oscillators + noise at play time (no audio files),
 * and routes through the central SoundManager's sfx gain node so the existing
 * mute / sfx-toggle / volume settings apply automatically. When audio is muted
 * or unavailable every function is a silent no-op.
 *
 * Sound design language (Duolingo-style):
 *  - Mallet/marimba tones: sine + triangle blend, fast attack, exponential decay
 *  - Major pentatonic pitch sets so any random combination still sounds consonant
 *  - Rising sequences for reward/claim moments, descending minor for loss moments
 */

import soundManager from './soundManager';

type OscType = OscillatorType;

interface ToneOptions {
  freq: number;
  /** Start offset in seconds from now */
  at?: number;
  /** Duration in seconds */
  dur?: number;
  type?: OscType;
  /** 0..1 peak gain */
  gain?: number;
  /** Glide target frequency (portamento) */
  slideTo?: number;
  /** Detune in cents */
  detune?: number;
}

const PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51]; // C5 D5 E5 G5 A5 C6 D6 E6

function isCelebrationAudioEnabled(): boolean {
  return soundManager.getSynthBus() !== null;
}

function scheduleTone(bus: { ctx: AudioContext; output: GainNode }, opts: ToneOptions) {
  const { ctx, output } = bus;
  const {
    freq,
    at = 0,
    dur = 0.18,
    type = 'sine',
    gain = 0.2,
    slideTo,
    detune = 0,
  } = opts;

  const t0 = ctx.currentTime + at;

  // Layer 1: fundamental (sine — soft body)
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (detune) osc.detune.setValueAtTime(detune, t0);
  if (slideTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), t0 + dur);
  }

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  osc.connect(env);
  env.connect(output);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

function scheduleNoise(
  bus: { ctx: AudioContext; output: GainNode },
  opts: { at?: number; dur?: number; gain?: number; filterFrom?: number; filterTo?: number; q?: number }
) {
  const { ctx, output } = bus;
  const {
    at = 0,
    dur = 0.25,
    gain = 0.15,
    filterFrom = 4000,
    filterTo,
    q = 0.8,
  } = opts;

  const t0 = ctx.currentTime + at;

  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(filterFrom, t0);
  if (filterTo !== undefined) {
    filter.frequency.exponentialRampToValueAtTime(Math.max(40, filterTo), t0 + dur);
  }
  filter.Q.value = q;

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  src.connect(filter);
  filter.connect(env);
  env.connect(output);
  src.start(t0);
  src.stop(t0 + dur + 0.05);
}

// ─── Reward / claim moments ─────────────────────────────────────────────────

/** Rising major arpeggio — the "CLAIM" moment. */
export function playClaimArpeggio() {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  // C5 E5 G5 C6 E6 — bright, ascending, mallet-like
  [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((freq, i) => {
    scheduleTone(bus, { freq, at: i * 0.07, dur: 0.22, type: 'triangle', gain: 0.16 });
    scheduleTone(bus, { freq: freq * 2, at: i * 0.07, dur: 0.12, type: 'sine', gain: 0.05 });
  });
}

/** Rising pentatonic pop for the Nth reward particle landing. */
export function playRewardTick(index: number) {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  const freq = PENTATONIC[Math.min(index, PENTATONIC.length - 1)];
  scheduleTone(bus, { freq, dur: 0.14, type: 'triangle', gain: 0.14 });
  scheduleTone(bus, { freq: freq * 1.5, at: 0.015, dur: 0.08, type: 'sine', gain: 0.05 });
}

/** Soft mallet pop — stat pills / UI elements popping into the scene. */
export function playScenePop(index = 0) {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  const freq = PENTATONIC[index % PENTATONIC.length];
  scheduleTone(bus, { freq, dur: 0.12, type: 'sine', gain: 0.12 });
}

/** Quick high gliss — sparkle/shine moments. */
export function playSparkle() {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  scheduleTone(bus, { freq: 1567.98, dur: 0.18, type: 'sine', gain: 0.08, slideTo: 3135.96 });
  scheduleTone(bus, { freq: 2093, at: 0.06, dur: 0.14, type: 'sine', gain: 0.06 });
}

/** Airy sweep — scene transitions / mascot movements. */
export function playWhoosh(direction: 'up' | 'down' = 'up') {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  scheduleNoise(bus, {
    dur: 0.32,
    gain: 0.08,
    filterFrom: direction === 'up' ? 500 : 3500,
    filterTo: direction === 'up' ? 3500 : 500,
    q: 1.4,
  });
}

/** Short soft tick — typewriter speech bubbles. */
export function playTypingTick() {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  scheduleTone(bus, { freq: 890, dur: 0.035, type: 'square', gain: 0.025 });
}

// ─── Chest ──────────────────────────────────────────────────────────────────

/** Wooden creak — chest shake before opening. */
export function playChestCreak() {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  scheduleTone(bus, { freq: 130, dur: 0.42, type: 'sawtooth', gain: 0.05, slideTo: 96 });
  scheduleTone(bus, { freq: 196, at: 0.1, dur: 0.3, type: 'sawtooth', gain: 0.035, slideTo: 150 });
  scheduleNoise(bus, { dur: 0.35, gain: 0.035, filterFrom: 300, filterTo: 900, q: 2.2 });
}

/** Golden burst — chest lid flying open with the light beam. */
export function playChestBurst() {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  scheduleNoise(bus, { dur: 0.4, gain: 0.14, filterFrom: 1200, filterTo: 6000, q: 0.7 });
  // Bright major chord bloom
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    scheduleTone(bus, { freq, at: 0.03 + i * 0.025, dur: 0.5, type: 'triangle', gain: 0.1 });
  });
}

/** Bell chime for the Nth gem dropping into the pile. */
export function playGemChime(index: number) {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  const base = PENTATONIC[Math.min(index, PENTATONIC.length - 1)];
  scheduleTone(bus, { freq: base * 2, dur: 0.3, type: 'sine', gain: 0.12 });
  scheduleTone(bus, { freq: base * 3.01, at: 0.01, dur: 0.18, type: 'sine', gain: 0.05 });
}

// ─── Streak ─────────────────────────────────────────────────────────────────

/** Warm rising fanfare — streak extended. */
export function playStreakFanfare() {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  // G4 C5 E5 G5 → C6 (warm, triumphant)
  [392, 523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    scheduleTone(bus, { freq, at: i * 0.09, dur: 0.3, type: 'triangle', gain: 0.15 });
    scheduleTone(bus, { freq: freq / 2, at: i * 0.09, dur: 0.26, type: 'sine', gain: 0.07 });
  });
  scheduleSparkleDust(bus, 0.45);
}

/** Crackly shimmer — streak saved by a freeze. */
export function playIceCrackle() {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  for (let i = 0; i < 7; i++) {
    scheduleNoise(bus, {
      at: i * 0.055,
      dur: 0.05,
      gain: 0.06,
      filterFrom: 2400 + Math.random() * 2600,
      q: 3,
    });
  }
  scheduleTone(bus, { freq: 1046.5, at: 0.4, dur: 0.35, type: 'sine', gain: 0.08, slideTo: 1318.51 });
}

/** Gentle descending minor motif — streak lost. Sad but kind, never harsh. */
export function playLossMotif() {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  [523.25, 466.16, 392, 311.13].forEach((freq, i) => {
    scheduleTone(bus, { freq, at: i * 0.17, dur: 0.34, type: 'triangle', gain: 0.11 });
  });
}

// ─── Leaderboard (mid-week rank moments — deliberately lighter than the
// end-of-week league fanfares above, which stay reserved for a real
// promotion/demotion) ─────────────────────────────────────────────────────

/** Bright short sweep + flourish — passed a rival mid-week. */
export function playRankUp() {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  scheduleNoise(bus, { dur: 0.22, gain: 0.09, filterFrom: 500, filterTo: 2500, q: 1.6 });
  scheduleTone(bus, { freq: 783.99, at: 0.08, dur: 0.16, type: 'triangle', gain: 0.13 });
  scheduleTone(bus, { freq: 1174.66, at: 0.15, dur: 0.16, type: 'sine', gain: 0.1 });
}

/** Warm single confirming tone + soft sparkle — joined this week's board. */
export function playRankJoin() {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  scheduleTone(bus, { freq: PENTATONIC[2], dur: 0.16, type: 'sine', gain: 0.14 });
  scheduleTone(bus, { freq: 1567.98, at: 0.09, dur: 0.16, type: 'sine', gain: 0.07, slideTo: 3135.96 });
}

/** Gentle downward sweep only, no minor motif — passed by a rival mid-week.
 * A nudge to try again, not a punishment (that's what playLossMotif is for). */
export function playRankDown() {
  playWhoosh('down');
}

// ─── Level up ───────────────────────────────────────────────────────────────

/** The big one — full fanfare for level-ups (rare moment, biggest treatment). */
export function playLevelUpFanfare() {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  // I – IV – V – octave hit in C major, brass-ish sawtooth over soft sine bed
  const chords: { freqs: number[]; at: number; dur: number }[] = [
    { freqs: [523.25, 659.25, 783.99], at: 0, dur: 0.16 },      // C major
    { freqs: [523.25, 698.46, 880], at: 0.14, dur: 0.16 },      // F major (2nd inv)
    { freqs: [587.33, 739.99, 880], at: 0.28, dur: 0.16 },      // G major
    { freqs: [1046.5, 1318.51, 1567.98], at: 0.42, dur: 0.7 },  // C octave bloom
  ];
  chords.forEach(({ freqs, at, dur }) => {
    freqs.forEach((freq, j) => {
      scheduleTone(bus, { freq, at, dur, type: 'sawtooth', gain: 0.055, detune: j * 4 });
      scheduleTone(bus, { freq: freq / 2, at, dur, type: 'triangle', gain: 0.06 });
    });
  });
  scheduleSparkleDust(bus, 0.5);
  // Timpani-ish thump under the final hit
  scheduleTone(bus, { freq: 130.81, at: 0.42, dur: 0.4, type: 'sine', gain: 0.16, slideTo: 65 });
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function scheduleSparkleDust(bus: { ctx: AudioContext; output: GainNode }, startAt: number) {
  for (let i = 0; i < 5; i++) {
    scheduleTone(bus, {
      freq: 1567.98 + Math.random() * 1046.5,
      at: startAt + i * 0.06,
      dur: 0.1,
      type: 'sine',
      gain: 0.045,
    });
  }
}

/** Convenience guard for callers that want to know before doing work. */
export const celebrationAudioEnabled = isCelebrationAudioEnabled;
