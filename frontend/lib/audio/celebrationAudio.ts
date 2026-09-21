/**
 * Celebration Audio — synthesized (WebAudio) sound bank for the Celebration Engine.
 *
 * Every sound is composed from oscillators + noise at play time (no audio files),
 * and routes through the central SoundManager's sfx gain node so the existing
 * mute / sfx-toggle / volume settings apply automatically. When audio is muted
 * or unavailable every function is a silent no-op.
 *
 * The scheduling primitives and the shared sound-design language live in
 * `./synth` — `lessonAudio.ts` builds on the same base so the celebration
 * scenes and the in-lesson feedback stay in one sonic world.
 */

import soundManager from './soundManager';
import {
  PENTATONIC,
  scheduleNoise,
  scheduleSparkleDust,
  scheduleTone,
  shouldPlay,
} from './synth';

function isCelebrationAudioEnabled(): boolean {
  return soundManager.getSynthBus() !== null;
}

// ─── Reward / claim moments ─────────────────────────────────────────────────

/** Rising major arpeggio — the "CLAIM" moment. */
export function playClaimArpeggio() {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay('playClaimArpeggio')) return;
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
  if (!bus || !shouldPlay('playSparkle')) return;
  scheduleTone(bus, { freq: 1567.98, dur: 0.18, type: 'sine', gain: 0.08, slideTo: 3135.96 });
  scheduleTone(bus, { freq: 2093, at: 0.06, dur: 0.14, type: 'sine', gain: 0.06 });
}

/** Airy sweep — scene transitions / mascot movements. */
export function playWhoosh(direction: 'up' | 'down' = 'up') {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay(`playWhoosh:${direction}`)) return;
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
  if (!bus || !shouldPlay('playChestCreak')) return;
  scheduleTone(bus, { freq: 130, dur: 0.42, type: 'sawtooth', gain: 0.05, slideTo: 96 });
  scheduleTone(bus, { freq: 196, at: 0.1, dur: 0.3, type: 'sawtooth', gain: 0.035, slideTo: 150 });
  scheduleNoise(bus, { dur: 0.35, gain: 0.035, filterFrom: 300, filterTo: 900, q: 2.2 });
}

/** Escalating rattle for each tap while the chest is being pried open —
 * `tapIndex` is 1-based; pitch/energy/volume climb with each successive
 * tap (capped ~4 taps in) to build anticipation toward the burst. Indexed
 * cooldown so rapid taps each get their own sound instead of being
 * swallowed by the shared `playChestCreak` cooldown. */
export function playChestShake(tapIndex: number) {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay(`playChestShake:${tapIndex}`, 80)) return;
  const intensity = Math.min(1, tapIndex / 4);
  const baseFreq = 130 + intensity * 90;
  scheduleTone(bus, {
    freq: baseFreq,
    dur: 0.14 + intensity * 0.08,
    type: 'sawtooth',
    gain: 0.05 + intensity * 0.06,
    slideTo: baseFreq * 0.72,
  });
  scheduleNoise(bus, {
    dur: 0.12 + intensity * 0.1,
    gain: 0.03 + intensity * 0.07,
    filterFrom: 400 + intensity * 900,
    filterTo: 900 + intensity * 1800,
    q: 2,
  });
}

/** Golden burst — chest lid flying open with the light beam. */
export function playChestBurst() {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay('playChestBurst')) return;
  scheduleNoise(bus, { dur: 0.4, gain: 0.14, filterFrom: 1200, filterTo: 6000, q: 0.7 });
  // Bright major chord bloom
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    scheduleTone(bus, { freq, at: 0.03 + i * 0.025, dur: 0.5, type: 'triangle', gain: 0.1 });
  });
}

/** The Treasure Chest reveal moment — same "you earned this" weight as
 * playLevelUpFanfare (rising chord progression + sparkle dust + a warm
 * settling bass thump), not a quick pop. Longer (~1.2s) and more layered
 * than playChestBurst, which stays as-is for the other scenes that use it. */
export function playChestRevealFanfare() {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay('playChestRevealFanfare')) return;
  // Initial burst — lid flying open
  scheduleNoise(bus, { dur: 0.45, gain: 0.16, filterFrom: 1200, filterTo: 6500, q: 0.7 });
  // Rising triumphant chord progression, bigger than playChestBurst's single bloom
  const chords: { freqs: number[]; at: number; dur: number }[] = [
    { freqs: [523.25, 659.25, 783.99], at: 0.02, dur: 0.22 }, // C major
    { freqs: [587.33, 739.99, 880], at: 0.16, dur: 0.22 }, // D minor
    { freqs: [659.25, 830.61, 987.77], at: 0.3, dur: 0.24 }, // E minor
    { freqs: [1046.5, 1318.51, 1567.98], at: 0.46, dur: 0.75 }, // octave bloom
  ];
  chords.forEach(({ freqs, at, dur }) => {
    freqs.forEach((freq, j) => {
      scheduleTone(bus, { freq, at, dur, type: 'triangle', gain: 0.09, detune: j * 3 });
      scheduleTone(bus, { freq: freq / 2, at, dur, type: 'sine', gain: 0.06 });
    });
  });
  scheduleSparkleDust(bus, 0.55);
  // Warm settling thump underneath the final bloom
  scheduleTone(bus, { freq: 130.81, at: 0.46, dur: 0.45, type: 'sine', gain: 0.15, slideTo: 65 });
}

/** Bell chime for the Nth gem dropping into the pile. */
export function playGemChime(index: number) {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  const base = PENTATONIC[Math.min(index, PENTATONIC.length - 1)];
  scheduleTone(bus, { freq: base * 2, dur: 0.3, type: 'sine', gain: 0.12 });
  scheduleTone(bus, { freq: base * 3.01, at: 0.01, dur: 0.18, type: 'sine', gain: 0.05 });
}

/**
 * One coin hitting the heap. Metallic rather than melodic: a tight noise
 * transient for the strike, plus two deliberately inharmonic partials (the
 * 2.76 / 5.4 ratios are what stop it ringing like a tuned bell and start it
 * sounding like struck metal).
 *
 * `progress` (0 → 1 through the pour) detunes downward and shortens the tail,
 * so the cascade starts bright and thins out as the pile deadens — a pour of
 * identical clinks reads as a machine gun, not as coins.
 */
export function playCoinImpact(index: number, progress = 0) {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  // Pseudo-random per index so neighbouring coins never land on the same
  // pitch, but a given coin always sounds the same.
  const jitter = ((Math.sin(index * 12.9898) * 43758.5453) % 1 + 1) % 1;
  const fall = 1 - progress * 0.34;
  const base = (1180 + jitter * 520) * fall;
  const level = (0.085 - progress * 0.03) * (0.75 + jitter * 0.45);

  scheduleNoise(bus, {
    dur: 0.035,
    gain: level * 0.5,
    filterFrom: 5200 * fall,
    filterTo: 2200 * fall,
    q: 1.4,
  });
  scheduleTone(bus, { freq: base, dur: 0.1 - progress * 0.035, type: 'triangle', gain: level });
  scheduleTone(bus, { freq: base * 2.76, at: 0.004, dur: 0.07, type: 'sine', gain: level * 0.4 });
  scheduleTone(bus, { freq: base * 5.4, at: 0.004, dur: 0.04, type: 'sine', gain: level * 0.16 });
}

/** Low body thump under the pour — the mass of the heap landing, layered
 *  beneath the individual clinks so the cascade has weight and not just
 *  sparkle. Pitched down as more of the pile settles. */
export function playPileThud(progress = 0) {
  const bus = soundManager.getSynthBus();
  if (!bus) return;
  const f = 128 - progress * 42;
  scheduleTone(bus, { freq: f, dur: 0.26, type: 'sine', gain: 0.13, slideTo: f * 0.62 });
  scheduleNoise(bus, { dur: 0.12, gain: 0.05, filterFrom: 420, filterTo: 150, q: 0.9 });
}

/**
 * Cash register "cha-ching" — the reward being banked when the learner
 * commits on CONTINUE.
 *
 * Two bright bell hits a major third apart over a drawer thunk: the first
 * short and percussive ("cha"), the second higher and left ringing ("ching").
 * That two-hit asymmetry is the whole character of the sound; a single chord
 * reads as a notification instead of a till.
 */
export function playCashIn() {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay('playCashIn')) return;

  // "cha" — struck, damped fast
  scheduleNoise(bus, { dur: 0.05, gain: 0.09, filterFrom: 6500, filterTo: 3000, q: 1.2 });
  [1318.51, 1661.22, 2637.02].forEach((freq, i) => {
    scheduleTone(bus, { freq, dur: 0.11, type: 'triangle', gain: 0.13 - i * 0.035 });
  });

  // "ching" — higher, left to ring
  const ching = 0.085;
  scheduleNoise(bus, { at: ching, dur: 0.04, gain: 0.07, filterFrom: 8000, filterTo: 4200, q: 1.3 });
  [1760.0, 2217.46, 3520.0, 5274.04].forEach((freq, i) => {
    scheduleTone(bus, {
      freq,
      at: ching,
      dur: 0.72 - i * 0.13,
      type: 'sine',
      gain: 0.145 - i * 0.032,
    });
  });

  // Drawer sliding shut underneath
  scheduleTone(bus, { freq: 165, at: 0.02, dur: 0.3, type: 'sine', gain: 0.11, slideTo: 92 });
  scheduleSparkleDust(bus, 0.26);
}

/** The reward physically bursting up out of the chest — a fast rising
 * shimmer cascade, layered under the reveal fanfare. This is the "stuff is
 * flying out at me" moment; the per-item playGemChime calls that follow are
 * the individual pieces landing. */
export function playRewardRush() {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay('playRewardRush')) return;
  // Upward air rush carrying the payload out of the chest
  scheduleNoise(bus, { dur: 0.5, gain: 0.09, filterFrom: 600, filterTo: 7000, q: 1.1 });
  // Rapid ascending pentatonic cascade — the shimmer of coins spilling upward
  PENTATONIC.forEach((freq, i) => {
    scheduleTone(bus, {
      freq: freq * 2,
      at: 0.04 + i * 0.035,
      dur: 0.26,
      type: 'sine',
      gain: 0.085,
    });
    scheduleTone(bus, {
      freq: freq * 3,
      at: 0.04 + i * 0.035,
      dur: 0.14,
      type: 'sine',
      gain: 0.035,
    });
  });
  scheduleSparkleDust(bus, 0.3);
}

/** Airy swell as the chest drops into the scene — gives the entry a beat
 * instead of the chest just appearing silently. */
export function playChestAppear() {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay('playChestAppear')) return;
  scheduleNoise(bus, { dur: 0.42, gain: 0.07, filterFrom: 300, filterTo: 2600, q: 1.3 });
  scheduleTone(bus, { freq: 196, dur: 0.38, type: 'sine', gain: 0.09, slideTo: 392 });
  scheduleTone(bus, { freq: 392, at: 0.14, dur: 0.3, type: 'triangle', gain: 0.06 });
}

/** Rarity stamp landing above the chest. `rare` gets a brighter, longer
 * flourish so a good roll is audible before the chest is even opened. */
export function playRarityStamp(isRare: boolean) {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay('playRarityStamp')) return;
  scheduleTone(bus, { freq: isRare ? 880 : 659.25, dur: 0.18, type: 'triangle', gain: 0.1 });
  scheduleTone(bus, {
    freq: isRare ? 1318.51 : 987.77,
    at: 0.07,
    dur: 0.22,
    type: 'sine',
    gain: 0.07,
  });
  if (isRare) scheduleSparkleDust(bus, 0.12);
}

/** Soft descending pair — chest couldn't load/open. Deliberately gentle:
 * a failure the learner didn't cause should never sound like a buzzer. */
export function playChestError() {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay('playChestError')) return;
  scheduleTone(bus, { freq: 392, dur: 0.26, type: 'triangle', gain: 0.09 });
  scheduleTone(bus, { freq: 311.13, at: 0.16, dur: 0.32, type: 'triangle', gain: 0.08 });
}

// ─── Streak ─────────────────────────────────────────────────────────────────

/** Warm rising fanfare — streak extended. */
export function playStreakFanfare() {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay('playStreakFanfare')) return;
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
  if (!bus || !shouldPlay('playIceCrackle')) return;
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
  if (!bus || !shouldPlay('playLossMotif')) return;
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
  if (!bus || !shouldPlay('playRankUp')) return;
  scheduleNoise(bus, { dur: 0.22, gain: 0.09, filterFrom: 500, filterTo: 2500, q: 1.6 });
  scheduleTone(bus, { freq: 783.99, at: 0.08, dur: 0.16, type: 'triangle', gain: 0.13 });
  scheduleTone(bus, { freq: 1174.66, at: 0.15, dur: 0.16, type: 'sine', gain: 0.1 });
}

/** Warm single confirming tone + soft sparkle — joined this week's board. */
export function playRankJoin() {
  const bus = soundManager.getSynthBus();
  if (!bus || !shouldPlay('playRankJoin')) return;
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
  if (!bus || !shouldPlay('playLevelUpFanfare')) return;
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

/** Convenience guard for callers that want to know before doing work. */
export const celebrationAudioEnabled = isCelebrationAudioEnabled;
