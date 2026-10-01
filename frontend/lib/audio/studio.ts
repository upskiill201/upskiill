/**
 * The studio — instruments and a mixing chain for Teyro's game sounds.
 *
 * The old sounds were bare oscillators straight into the speaker: no body,
 * no space, no punch, which is why they read as "beeps". Game sounds that
 * feel expensive (Duolingo's are the reference) are made of three things this
 * file adds:
 *
 *   1. Real timbres — FM bells, a marimba with a mallet click, a bubble pop,
 *      a wooden thud, swooshes, soft brass, a coin chime. Each is a small
 *      recipe of oscillators, noise and envelopes (see the voices below).
 *   2. A room — a short, bright synthetic reverb, sent to in small amounts,
 *      so a note rings into space instead of stopping dead.
 *   3. Glue — a compressor that evens every sound out to the same punch, and
 *      a limiter after it so no stack of sounds can ever clip.
 *
 *     voices ─┬─────────────▶ glue ─▶ limiter ─▶ output (SFX bus)
 *             └─▶ reverb ─▶ ┘
 *
 * Built once per AudioContext (live or offline — tests render through the
 * same chain). Mute is honoured upstream: `getStudio()` returns null when the
 * SFX bus does.
 */

import { getBus } from './synth';

export interface Studio {
  ctx: BaseAudioContext;
  /** Dry input — voices connect here. */
  dry: AudioNode;
  /** Reverb send — voices connect a scaled copy here. */
  room: AudioNode;
  /** Seconds, on this context's clock. */
  now: number;
}

const built = new WeakMap<BaseAudioContext, { dry: GainNode; room: GainNode }>();

/** A short, bright room: decaying stereo noise, gently darkened over time. */
function roomImpulse(ctx: BaseAudioContext, seconds = 1.1): AudioBuffer {
  const rate = ctx.sampleRate;
  const len = Math.floor(rate * seconds);
  const ir = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = ir.getChannelData(ch);
    let lp = 0;
    for (let i = 0; i < len; i++) {
      const t = i / len;
      // Darken as it decays: a one-pole lowpass whose cutoff falls over time.
      const k = 0.55 + 0.4 * t;
      lp = lp * k + (Math.random() * 2 - 1) * (1 - k);
      data[i] = lp * Math.pow(1 - t, 2.6) * 2.2;
    }
  }
  return ir;
}

/** Build (or reuse) the chain on a context, ending at `destination`. */
export function createStudio(ctx: BaseAudioContext, destination: AudioNode): Studio {
  let chain = built.get(ctx);
  if (!chain) {
    const glue = ctx.createDynamicsCompressor();
    glue.threshold.value = -20;
    glue.knee.value = 12;
    glue.ratio.value = 3;
    glue.attack.value = 0.004;
    glue.release.value = 0.14;

    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -3;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.001;
    limiter.release.value = 0.08;

    const makeup = ctx.createGain();
    makeup.gain.value = 1.25;

    const dry = ctx.createGain();
    const room = ctx.createGain();
    room.gain.value = 1;
    const reverb = ctx.createConvolver();
    reverb.buffer = roomImpulse(ctx);
    const wet = ctx.createGain();
    wet.gain.value = 0.32;

    dry.connect(glue);
    room.connect(reverb);
    reverb.connect(wet);
    wet.connect(glue);
    glue.connect(makeup);
    makeup.connect(limiter);
    limiter.connect(destination);

    chain = { dry, room };
    built.set(ctx, chain);
  }
  return { ctx, dry: chain.dry, room: chain.room, now: ctx.currentTime };
}

/** The live studio, or null when sound is muted / SFX off / unavailable. */
export function getStudio(): Studio | null {
  const bus = getBus();
  if (!bus) return null;
  return createStudio(bus.ctx, bus.output);
}

// ─── Plumbing ────────────────────────────────────────────────────────────────

interface Out {
  /** 0..1 peak level. */
  gain?: number;
  /** -1 (left) .. 1 (right). */
  pan?: number;
  /** 0..1 — how much of it rings in the room. */
  send?: number;
}

/** A gain → pan → (dry + room send) strip; returns the strip's input. */
function strip(s: Studio, t: number, end: number, { gain = 0.3, pan = 0, send = 0.2 }: Out): GainNode {
  const { ctx } = s;
  const input = ctx.createGain();
  input.gain.value = gain;
  let node: AudioNode = input;
  if (pan && 'createStereoPanner' in ctx) {
    const p = ctx.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan));
    input.connect(p);
    node = p;
  }
  node.connect(s.dry);
  if (send > 0) {
    const sg = ctx.createGain();
    sg.gain.value = send;
    node.connect(sg);
    sg.connect(s.room);
  }
  void t;
  void end;
  return input;
}

function osc(s: Studio, type: OscillatorType, freq: number, t: number, end: number): OscillatorNode {
  const o = s.ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  o.start(t);
  o.stop(end + 0.05);
  return o;
}

function env(s: Studio, t: number, attack: number, decay: number, peak = 1): GainNode {
  const g = s.ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + Math.max(0.001, attack));
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  return g;
}

const noiseCache = new WeakMap<BaseAudioContext, AudioBuffer>();
function noiseBuffer(ctx: BaseAudioContext): AudioBuffer {
  let b = noiseCache.get(ctx);
  if (!b) {
    b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    noiseCache.set(ctx, b);
  }
  return b;
}

function noise(s: Studio, t: number, dur: number): AudioBufferSourceNode {
  const src = s.ctx.createBufferSource();
  src.buffer = noiseBuffer(s.ctx);
  src.start(t, Math.random() * 1.5);
  src.stop(t + dur + 0.05);
  return src;
}

// ─── Voices ──────────────────────────────────────────────────────────────────

/**
 * FM bell / glockenspiel. The modulator at 3.5× the pitch gives the glassy,
 * inharmonic shimmer of struck metal; its depth decays faster than the tone,
 * so the strike is bright and the tail is pure — the "ding" of a right answer.
 */
export function bell(s: Studio, freq: number, at = 0, o: Out & { dur?: number; bright?: number } = {}) {
  const t = s.now + at;
  const dur = o.dur ?? 0.9;
  const end = t + dur;
  const out = strip(s, t, end, { gain: 0.26, send: 0.28, ...o });
  const bright = o.bright ?? 1;

  const carrier = osc(s, 'sine', freq, t, end);
  const mod = osc(s, 'sine', freq * 3.5, t, end);
  const depth = s.ctx.createGain();
  depth.gain.setValueAtTime(freq * 2.4 * bright, t);
  depth.gain.exponentialRampToValueAtTime(freq * 0.05, t + dur * 0.5);
  mod.connect(depth);
  depth.connect(carrier.frequency);

  const amp = env(s, t, 0.002, dur);
  carrier.connect(amp);
  amp.connect(out);

  // An octave partial for sparkle at the strike.
  const hi = osc(s, 'sine', freq * 2, t, end);
  const hiAmp = env(s, t, 0.002, dur * 0.35, 0.3);
  hi.connect(hiAmp);
  hiAmp.connect(out);
}

/**
 * Marimba: a warm wooden bar. FM at 4× (the bar's strong 4th partial), a
 * short decay, and a tiny mallet click on top — the tactile "tock" of a tap.
 */
export function marimba(s: Studio, freq: number, at = 0, o: Out & { dur?: number } = {}) {
  const t = s.now + at;
  const dur = o.dur ?? 0.38;
  const end = t + dur;
  const out = strip(s, t, end, { gain: 0.34, send: 0.14, ...o });

  const carrier = osc(s, 'sine', freq, t, end);
  const mod = osc(s, 'sine', freq * 4, t, end);
  const depth = s.ctx.createGain();
  depth.gain.setValueAtTime(freq * 1.2, t);
  depth.gain.exponentialRampToValueAtTime(1, t + 0.06);
  mod.connect(depth);
  depth.connect(carrier.frequency);
  const amp = env(s, t, 0.002, dur);
  carrier.connect(amp);
  amp.connect(out);

  // Mallet click: a few ms of bright noise.
  const n = noise(s, t, 0.02);
  const hp = s.ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 3000;
  const nAmp = env(s, t, 0.001, 0.015, 0.18);
  n.connect(hp);
  hp.connect(nAmp);
  nAmp.connect(out);
}

/**
 * Bubble pop: a sine that drops fast in pitch — the round, friendly "bloop"
 * of pressing a game button.
 */
export function pop(s: Studio, freq: number, at = 0, o: Out & { dur?: number; drop?: number } = {}) {
  const t = s.now + at;
  const dur = o.dur ?? 0.11;
  const end = t + dur;
  const out = strip(s, t, end, { gain: 0.42, send: 0.06, ...o });
  const v = osc(s, 'sine', freq * (o.drop ?? 1.9), t, end);
  v.frequency.exponentialRampToValueAtTime(freq, t + dur * 0.4);
  const amp = env(s, t, 0.003, dur);
  v.connect(amp);
  amp.connect(out);
  // A little triangle body underneath so it isn't thin on phone speakers.
  const b = osc(s, 'triangle', freq / 2, t, end);
  const bAmp = env(s, t, 0.003, dur * 0.7, 0.25);
  b.connect(bAmp);
  bAmp.connect(out);
}

/** Soft wooden thud — "not yet", never a buzzer. */
export function thud(s: Studio, freq = 150, at = 0, o: Out & { dur?: number } = {}) {
  const t = s.now + at;
  const dur = o.dur ?? 0.2;
  const end = t + dur;
  const out = strip(s, t, end, { gain: 0.5, send: 0.05, ...o });
  const v = osc(s, 'sine', freq * 1.6, t, end);
  v.frequency.exponentialRampToValueAtTime(freq * 0.8, t + dur);
  const amp = env(s, t, 0.002, dur);
  v.connect(amp);
  amp.connect(out);
  const n = noise(s, t, 0.05);
  const lp = s.ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 900;
  const nAmp = env(s, t, 0.001, 0.05, 0.35);
  n.connect(lp);
  lp.connect(nAmp);
  nAmp.connect(out);
}

/** Air moving: filtered noise sweeping, and panning across the stereo field. */
export function swoosh(
  s: Studio,
  at = 0,
  o: Out & { dur?: number; from?: number; to?: number; panFrom?: number; panTo?: number } = {},
) {
  const t = s.now + at;
  const dur = o.dur ?? 0.3;
  const end = t + dur;
  const out = strip(s, t, end, { gain: 0.3, send: 0.2, ...o, pan: 0 });
  const n = noise(s, t, dur);
  const bp = s.ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.Q.value = 1.1;
  bp.frequency.setValueAtTime(o.from ?? 400, t);
  bp.frequency.exponentialRampToValueAtTime(o.to ?? 3600, end);
  const amp = s.ctx.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(1, t + dur * 0.55);
  amp.gain.exponentialRampToValueAtTime(0.0001, end);
  n.connect(bp);
  bp.connect(amp);
  if ('createStereoPanner' in s.ctx) {
    const p = s.ctx.createStereoPanner();
    p.pan.setValueAtTime(o.panFrom ?? -0.5, t);
    p.pan.linearRampToValueAtTime(o.panTo ?? 0.5, end);
    amp.connect(p);
    p.connect(out);
  } else {
    amp.connect(out);
  }
}

/**
 * Soft brass: two detuned saws through a lowpass that opens on the attack —
 * the warm "ta-daa" of a fanfare, never a harsh synth lead.
 */
export function brass(s: Studio, freq: number, at = 0, o: Out & { dur?: number } = {}) {
  const t = s.now + at;
  const dur = o.dur ?? 0.45;
  const end = t + dur;
  const out = strip(s, t, end, { gain: 0.16, send: 0.3, ...o });
  const lp = s.ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.Q.value = 0.8;
  lp.frequency.setValueAtTime(freq * 1.5, t);
  lp.frequency.exponentialRampToValueAtTime(freq * 6, t + 0.05);
  lp.frequency.exponentialRampToValueAtTime(freq * 2.5, end);
  const amp = s.ctx.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(1, t + 0.02);
  amp.gain.setValueAtTime(1, Math.max(t + 0.02, end - 0.14));
  amp.gain.exponentialRampToValueAtTime(0.0001, end);
  for (const cents of [-7, 7]) {
    const v = osc(s, 'sawtooth', freq, t, end);
    v.detune.value = cents;
    v.connect(lp);
  }
  lp.connect(amp);
  amp.connect(out);
}

/** Coin: the classic two-step chime, a fourth apart — reward landing. */
export function coin(s: Studio, freq = 987.77, at = 0, o: Out = {}) {
  const t = s.now + at;
  const end = t + 0.32;
  const out = strip(s, t, end, { gain: 0.15, send: 0.18, ...o });
  const bp = s.ctx.createBiquadFilter();
  bp.type = 'lowpass';
  bp.frequency.value = 5000;
  bp.connect(out);
  const a = osc(s, 'square', freq, t, t + 0.07);
  const aAmp = env(s, t, 0.002, 0.07);
  a.connect(aAmp);
  aAmp.connect(bp);
  const b = osc(s, 'square', freq * 1.335, t + 0.07, end);
  const bAmp = env(s, t + 0.07, 0.002, 0.25);
  b.connect(bAmp);
  bAmp.connect(bp);
}

/** A cloud of tiny high bells — the glitter on the biggest moments. */
export function sparkle(s: Studio, at = 0, o: Out & { count?: number; spread?: number } = {}) {
  const notes = [2093, 2349.3, 2637, 3136, 3520, 4186];
  const count = o.count ?? 7;
  for (let i = 0; i < count; i++) {
    const f = notes[Math.floor(Math.random() * notes.length)];
    bell(s, f, at + i * (o.spread ?? 0.045) + Math.random() * 0.02, {
      dur: 0.4,
      gain: (o.gain ?? 0.07) * (1 - i / (count * 1.6)),
      send: 0.5,
      pan: Math.random() * 1.2 - 0.6,
      bright: 0.6,
    });
  }
}

/** Musical helpers. */
export const note = (semitonesFromA4: number) => 440 * Math.pow(2, semitonesFromA4 / 12);
export const NOTE = {
  C4: note(-9), D4: note(-7), E4: note(-5), F4: note(-4), G4: note(-2), A4: note(0), B4: note(2),
  C5: note(3), D5: note(5), E5: note(7), F5: note(8), G5: note(10), A5: note(12), B5: note(14),
  C6: note(15), D6: note(17), E6: note(19), F6: note(20), G6: note(22), A6: note(24), B6: note(26), C7: note(27),
} as const;

/**
 * Muffled tone: a square wave behind a closed lowpass — the soft "bu-bum" of
 * a wrong answer. Rounded and quiet; it says "not that one", never "WRONG".
 */
export function muted(s: Studio, freq: number, at = 0, o: Out & { dur?: number; cutoff?: number } = {}) {
  const t = s.now + at;
  const dur = o.dur ?? 0.24;
  const end = t + dur;
  const out = strip(s, t, end, { gain: 0.3, send: 0.1, ...o });
  const lp = s.ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.Q.value = 0.7;
  lp.frequency.setValueAtTime(o.cutoff ?? freq * 3.2, t);
  lp.frequency.exponentialRampToValueAtTime(freq * 1.2, end);
  const v = osc(s, 'square', freq, t, end);
  const sub = osc(s, 'sine', freq / 2, t, end);
  const amp = env(s, t, 0.006, dur);
  v.connect(lp);
  sub.connect(lp);
  lp.connect(amp);
  amp.connect(out);
}

/** A long airy swell — the cymbal wash under a big finish. */
export function wash(s: Studio, at = 0, o: Out & { dur?: number } = {}) {
  const t = s.now + at;
  const dur = o.dur ?? 1.4;
  const end = t + dur;
  const out = strip(s, t, end, { gain: 0.12, send: 0.4, ...o });
  const n = noise(s, t, dur);
  const hp = s.ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 5000;
  const amp = s.ctx.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(1, t + 0.03);
  amp.gain.exponentialRampToValueAtTime(0.0001, end);
  n.connect(hp);
  hp.connect(amp);
  amp.connect(out);
}
