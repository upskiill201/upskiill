// Original 120 BPM future-pop track for the Teyro launch reel, synthesized from scratch.
// Every section boundary lands on a bar line so the visuals can lock to the same grid.
import fs from 'fs';

const SR = 48000, BPM = 120, BEAT = 60 / BPM, BAR = BEAT * 4, S16 = BEAT / 4;
const LEN = 61;
const N = Math.ceil(SR * LEN);

// Buses (stereo). Music bus gets sidechain-pumped by the kick.
const mk = () => [new Float32Array(N), new Float32Array(N)];
const drums = mk(), music = mk(), fx = mk(), send = mk(), dly = mk();

let seed = 1337;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const noise = () => rnd() * 2 - 1;
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

function add(bus, i, l, r) { if (i >= 0 && i < N) { bus[0][i] += l; bus[1][i] += r; } }

// --- filters ------------------------------------------------------------------
class Biquad {
  constructor() { this.x1 = this.x2 = this.y1 = this.y2 = 0; }
  set(type, f, q) {
    const w = 2 * Math.PI * clamp(f, 20, SR * 0.45) / SR, c = Math.cos(w), s = Math.sin(w), a = s / (2 * q);
    let b0, b1, b2, a0 = 1 + a, a1 = -2 * c, a2 = 1 - a;
    if (type === 'lp') { b0 = (1 - c) / 2; b1 = 1 - c; b2 = b0; }
    else if (type === 'hp') { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = b0; }
    else { b0 = a; b1 = 0; b2 = -a; } // bp
    this.b0 = b0 / a0; this.b1 = b1 / a0; this.b2 = b2 / a0; this.a1 = a1 / a0; this.a2 = a2 / a0;
    return this;
  }
  p(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1; this.x1 = x; this.y2 = this.y1; this.y1 = y; return y;
  }
}
// PolyBLEP saw for clean supersaws
function blep(t, dt) {
  if (t < dt) { t /= dt; return t + t - t * t - 1; }
  if (t > 1 - dt) { t = (t - 1) / dt; return t * t + t + t + 1; }
  return 0;
}

// --- instruments --------------------------------------------------------------
function kick(t0, vel = 1) {
  const i0 = Math.round(t0 * SR), len = Math.round(0.42 * SR);
  let ph = 0; const hp = new Biquad().set('hp', 2500, 0.7);
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    const f = 48 + 140 * Math.exp(-t * 32) + 30 * Math.exp(-t * 300);
    ph += 2 * Math.PI * f / SR;
    let s = Math.sin(ph) * Math.exp(-t * 5.2) * Math.min(1, t * 2000);
    s = Math.tanh(s * 1.8) * 0.9;
    const click = t < 0.006 ? hp.p(noise()) * (1 - t / 0.006) * 0.35 : 0;
    const v = (s + click) * vel * 0.95;
    add(drums, i0 + k, v, v);
  }
}
function clap(t0, vel = 1, big = false) {
  const i0 = Math.round(t0 * SR), len = Math.round((big ? 0.5 : 0.28) * SR);
  const bp = new Biquad().set('bp', 1350, 0.9), hp = new Biquad().set('hp', 600, 0.7);
  let ph = 0;
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    let env = 0;
    for (const o of [0, 0.010, 0.021]) if (t >= o) env = Math.max(env, Math.exp(-(t - o) * 140));
    env = Math.max(env, t > 0.021 ? 0.55 * Math.exp(-(t - 0.021) * (big ? 9 : 17)) : 0);
    const n = hp.p(bp.p(noise())) * env * 1.6;
    ph += 2 * Math.PI * 185 / SR;
    const body = Math.sin(ph) * Math.exp(-t * 28) * 0.35;
    const v = (n + body) * vel * 0.55;
    add(drums, i0 + k, v * 0.95, v);
    add(send, i0 + k, v * 0.25, v * 0.25);
  }
}
function hat(t0, vel = 1, open = false, pan = 0.15) {
  const i0 = Math.round(t0 * SR), len = Math.round((open ? 0.22 : 0.05) * SR);
  const hp = new Biquad().set('hp', 7800, 0.8), hp2 = new Biquad().set('hp', 9000, 0.6);
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    const env = Math.exp(-t * (open ? 16 : 70));
    const v = hp2.p(hp.p(noise())) * env * vel * 0.28;
    add(drums, i0 + k, v * (1 - pan), v * (1 + pan));
  }
}
function crash(t0, vel = 1) {
  const i0 = Math.round(t0 * SR), len = Math.round(2.6 * SR);
  const hp = new Biquad().set('hp', 4200, 0.6);
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    const v = hp.p(noise()) * Math.exp(-t * 2.4) * vel * 0.085;
    add(drums, i0 + k, v * (0.9 + 0.1 * Math.sin(k * 0.001)), v);
    add(send, i0 + k, v * 0.3, v * 0.3);
  }
}
function subDrop(t0, vel = 1) { // cinematic impact: sub boom + noise burst into reverb
  const i0 = Math.round(t0 * SR), len = Math.round(2.2 * SR);
  let ph = 0; const lp = new Biquad().set('lp', 1800, 0.7);
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    ph += 2 * Math.PI * (32 + 70 * Math.exp(-t * 6)) / SR;
    const s = Math.tanh(Math.sin(ph) * 2) * Math.exp(-t * 1.9) * 0.6;
    const n = lp.p(noise()) * Math.exp(-t * 9) * 0.2;
    const v = (s + n) * vel;
    add(fx, i0 + k, v, v);
    add(send, i0 + k, n * 0.3 * vel, n * 0.3 * vel);
  }
}
function riser(t0, dur, vel = 1) { // filtered noise sweep + rising tone
  const i0 = Math.round(t0 * SR), len = Math.round(dur * SR);
  const bpL = new Biquad(), bpR = new Biquad(); let ph = 0;
  for (let k = 0; k < len; k++) {
    const t = k / SR, x = t / dur;
    if (k % 32 === 0) { const f = 300 * Math.pow(30, x * x); bpL.set('bp', f, 1.4); bpR.set('bp', f * 1.03, 1.4); }
    const env = Math.pow(x, 2.2) * vel;
    ph += 2 * Math.PI * (200 * Math.pow(6, x * x)) / SR;
    const tone = Math.sin(ph) * 0.08 * env;
    add(fx, i0 + k, bpL.p(noise()) * env * 0.5 + tone, bpR.p(noise()) * env * 0.5 + tone);
    add(send, i0 + k, tone * 2, tone * 2);
  }
}
function snareRoll(t0, dur, vel = 1) {
  // accelerating 8ths → 16ths → 32nds, crescendo
  let t = t0;
  while (t < t0 + dur - 0.01) {
    const x = (t - t0) / dur;
    clap(t, (0.25 + 0.75 * x) * vel);
    t += x < 0.5 ? S16 * 2 : x < 0.8 ? S16 : S16 / 2;
  }
}

// Supersaw voice (future-bass chord stab / pad)
const DET = [-0.19, -0.11, -0.05, 0, 0.05, 0.11, 0.19]; // semitones
function supersaw(t0, dur, midis, opt = {}) {
  const { vel = 1, cut = 3000, cutEnd = cut, attack = 0.005, release = 0.12, wob = 0, bus = music, sendAmt = 0.25, res = 0.9 } = opt;
  const i0 = Math.round(t0 * SR), len = Math.round((dur + release) * SR);
  const voices = [];
  for (const m of midis) for (let v = 0; v < DET.length; v++)
    voices.push({ f: mtof(m + DET[v]), ph: rnd(), pan: DET.length > 1 ? (v / (DET.length - 1)) * 2 - 1 : 0 });
  const lpL = new Biquad(), lpR = new Biquad();
  const g = 0.11 / Math.sqrt(midis.length * DET.length) * vel;
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    if (k % 32 === 0) {
      const c = cut + (cutEnd - cut) * Math.min(1, t / Math.max(dur, 0.001));
      lpL.set('lp', c, res); lpR.set('lp', c * 1.02, res);
    }
    let env = Math.min(1, t / attack);
    if (t > dur) env *= Math.exp(-(t - dur) / (release / 3));
    const bend = wob ? Math.pow(2, (wob * Math.exp(-t * 18)) / 12) : 1;
    let l = 0, r = 0;
    for (const vo of voices) {
      const dt = vo.f * bend / SR;
      vo.ph += dt; if (vo.ph >= 1) vo.ph -= 1;
      const s = (2 * vo.ph - 1) - blep(vo.ph, dt);
      l += s * (1 - vo.pan * 0.8); r += s * (1 + vo.pan * 0.8);
    }
    const L = lpL.p(l) * g * env, R = lpR.p(r) * g * env;
    add(bus, i0 + k, L, R);
    add(send, i0 + k, L * sendAmt, R * sendAmt);
  }
}
function bass(t0, dur, m, vel = 1, bright = 1) {
  const i0 = Math.round(t0 * SR), len = Math.round((dur + 0.03) * SR);
  const f = mtof(m); let ph = 0, ph2 = 0; const lp = new Biquad();
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    if (k % 32 === 0) lp.set('lp', 180 + 1400 * bright * Math.exp(-t * 14), 1.2);
    ph += f / SR; if (ph >= 1) ph -= 1; ph2 += 2 * Math.PI * f / SR;
    const saw = 2 * ph - 1 - blep(ph, f / SR);
    let env = Math.min(1, t / 0.004); if (t > dur) env *= Math.exp(-(t - dur) * 120);
    const v = (lp.p(saw) * 0.5 + Math.sin(ph2) * 0.7) * env * vel * 0.42;
    const s = Math.tanh(v * 1.4);
    add(music, i0 + k, s, s);
  }
}
function pluck(t0, m, vel = 1, opt = {}) {
  const { decay = 0.22, pan = 0, dsend = 0.35, sendAmt = 0.2, bright = 1 } = opt;
  const i0 = Math.round(t0 * SR), len = Math.round((decay * 3.2) * SR);
  const f = mtof(m); let p1 = rnd(), p2 = rnd(); const lp = new Biquad();
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    if (k % 16 === 0) lp.set('lp', 500 + 7000 * bright * Math.exp(-t * 22), 1.1);
    p1 += f / SR; if (p1 >= 1) p1 -= 1; p2 += f * 1.006 / SR; if (p2 >= 1) p2 -= 1;
    const s = (2 * p1 - 1 - blep(p1, f / SR)) + (p2 < 0.5 ? 0.6 : -0.6);
    const env = Math.min(1, t / 0.002) * Math.exp(-t / decay);
    const v = lp.p(s) * env * vel * 0.13;
    const L = v * (1 - pan), R = v * (1 + pan);
    add(music, i0 + k, L, R); add(dly, i0 + k, L * dsend, R * dsend); add(send, i0 + k, L * sendAmt, R * sendAmt);
  }
}
function bell(t0, m, vel = 1, pan = 0) { // FM marimba/bell
  const i0 = Math.round(t0 * SR), len = Math.round(0.9 * SR);
  const f = mtof(m); let pc = 0, pm = 0;
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    pm += 2 * Math.PI * f * 4 / SR;
    const idx = 2.2 * Math.exp(-t * 18);
    pc += 2 * Math.PI * f / SR;
    const s = Math.sin(pc + idx * Math.sin(pm)) * Math.exp(-t * 6.5) * Math.min(1, t / 0.001);
    const v = s * vel * 0.16;
    add(music, i0 + k, v * (1 - pan), v * (1 + pan));
    add(send, i0 + k, v * 0.3, v * 0.3); add(dly, i0 + k, v * 0.25, v * 0.25);
  }
}

const CH = [ // C  G  Am  F
  { pad: [60, 64, 67, 72], root: 36, tones: [60, 64, 67, 72] },
  { pad: [59, 62, 67, 71], root: 31, tones: [59, 62, 67, 71] },
  { pad: [57, 60, 64, 69], root: 33, tones: [57, 60, 64, 69] },
  { pad: [57, 60, 65, 69], root: 29, tones: [57, 60, 65, 69] },
];
const chordAt = bar => CH[((bar % 4) + 4) % 4];
const HOOK = [
  [[0, 76], [2, 79], [4, 84], [7, 83], [8, 79], [10, 76], [12, 79], [14, 81]],
  [[0, 79], [3, 74], [6, 79], [8, 83], [10, 81], [12, 79], [14, 74]],
  [[0, 76], [2, 79], [4, 84], [7, 83], [8, 81], [10, 79], [12, 76], [14, 79]],
  [[0, 77], [3, 81], [6, 84], [8, 81], [10, 79], [11, 77], [12, 76], [14, 72]],
];
const STAB = [0, 3, 6, 10, 12]; // syncopated future-bass stab steps (16ths)
const kicks = [];
const K = (t, v = 1) => { kicks.push(t); kick(t, v); };

const bt = b => b * BAR;
// ===== AI-track arrangement: tense A-minor opening → bright C-major drop on "Meet Teyro" =====
const DARK = [
  { pad: [57, 60, 64, 69], root: 33 }, // Am
  { pad: [53, 57, 60, 65], root: 29 }, // F
  { pad: [55, 59, 62, 67], root: 31 }, // G
  { pad: [52, 55, 59, 64], root: 28 }, // Em
];
const darkAt = b => DARK[((b % 4) + 4) % 4];
function arpBass(t0, bar, vel, bright) { // synthwave 16th octave bass
  const c = darkAt(bar);
  for (let s = 0; s < 16; s++) bass(t0 + s * S16, S16 * 0.7, c.root + (s % 2 ? 12 : 0), vel * (s % 4 === 0 ? 1 : 0.7), bright);
}
function tick(t0, vel) { hat(t0, vel, false, 0.5); }

function bars(from, to, mode) {
  for (let b = from; b < to; b++) {
    const t = bt(b), c = chordAt(b), full = mode !== 'groove';
    for (let q = 0; q < 4; q++) K(t + q * BEAT, (q === 0 ? 1 : 0.92) * (full ? 1 : 0.82));
    clap(t + BEAT, full ? 1 : 0.7); clap(t + 3 * BEAT, full ? 1 : 0.7);
    for (let e = 0; e < 8; e++) hat(t + e * BEAT / 2 + BEAT / 4, e % 2 ? 0.75 : 0.95, full && e % 2 === 1, e % 2 ? 0.3 : -0.2);
    for (let s = 0; s < 16; s += 2) hat(t + s * S16, 0.32, false, 0.4);
    for (let e = 0; e < 8; e++) {
      const m = c.root + (e === 3 || e === 7 ? 12 : 0);
      bass(t + e * BEAT / 2 + S16 * (e % 2 ? 0 : 1), S16 * (e % 2 ? 1.6 : 0.9), m, e % 2 ? 1 : 0.8, full ? 1.1 : 0.8);
    }
    for (const s of STAB) supersaw(t + s * S16, S16 * (s === 12 ? 3 : 1.6), c.pad.map(x => x + (full ? 12 : 0)).concat(full ? [c.pad[0]] : []), {
      vel: full ? 1.05 : 0.7, cut: full ? 7000 : 2600, release: 0.09, wob: full ? -1.2 : 0, sendAmt: 0.3,
    });
    if (full) {
      for (const [s, m] of HOOK[b % 4]) { pluck(t + s * S16, m, 0.95, { decay: 0.2, bright: 1.1, dsend: 0.4 }); bell(t + s * S16, m + 12, 0.5, 0.2); }
      // glitch stutter: retriggered 32nd chord chops at the end of every 2nd bar
      if (b % 2 === 1) for (let k = 0; k < 4; k++) supersaw(t + 14 * S16 + k * S16 / 2, S16 / 2.4, c.pad.map(x => x + 12), { vel: 0.7, cut: 5000 - k * 900, release: 0.02 });
      if (mode === 'final') for (const [s, m] of HOOK[b % 4]) pluck(t + s * S16, m - 12, 0.55, { decay: 0.25, pan: -0.4 });
    } else {
      const pat = [[2, 2], [5, 1], [8, 3], [11, 2], [14, 1]];
      for (const [s, ix] of pat) bell(t + s * S16, c.tones[ix] + 12, 0.55, s % 2 ? 0.3 : -0.3);
    }
  }
}

// ===== WEF film (45s): tense stats → hush on "will you be ready?" → drop on "Meet Teyro" (18s) → end hit (40s)
// 0–12: tense minor pulse, ticking, heartbeat kick from 4s
for (let b = 0; b < 6; b++) {
  const t = bt(b), c = darkAt(b);
  supersaw(t, BAR, c.pad, { vel: 0.7, cut: 500 + b * 220, cutEnd: 800 + b * 260, attack: 0.3, release: 0.3, sendAmt: 0.55 });
  for (let s = 0; s < 16; s++) tick(t + s * S16, (s % 4 === 0 ? 0.5 : 0.25) * (0.6 + b * 0.08));
  if (b >= 1) arpBass(t, b, 0.4 + b * 0.08, 0.25 + b * 0.08);
  if (b >= 2) { K(t, 0.8); K(t + 1.5 * BEAT, 0.6); clap(t + 2 * BEAT, 0.5); }
}
bell(0.3, 81, 0.5); subDrop(0.0, 0.6);
// 12–15: hush — "So… will you be ready?"
supersaw(12, 3.0, darkAt(6).pad, { vel: 0.6, cut: 700, cutEnd: 500, attack: 0.1, release: 0.8, sendAmt: 0.7 });
bell(13.6, 76, 0.5); bell(14.1, 72, 0.4, 0.3);
// 15–18: rise
for (let q = 0; q < 6; q++) K(15 + q * BEAT, 0.6 + q * 0.06);
for (let s = 0; s < 12; s += 2) supersaw(15 + s * S16 * 2, S16 * 1.5, chordAt(7).pad, { vel: 0.45 + s * 0.04, cut: 1000 + s * 450, release: 0.05 });
snareRoll(16.2, 1.75, 1.1); riser(15.0, 2.95, 1.2);
subDrop(18.0, 1.2); crash(18.0, 1.2);
bars(9, 15, 'chorus');                 // 18–30
bars(15, 20, 'final');                 // 30–40
// 40: end-card hit, sustained chord + sparkle tail, stinger at 44
subDrop(40.0, 1.3); crash(40.0, 1.2); K(40.0, 1.1); clap(40.0, 1, true);
supersaw(40.0, 2.4, [48, 60, 64, 67, 72, 76], { vel: 1.1, cut: 6000, cutEnd: 1500, release: 1.6, sendAmt: 0.7, wob: -1.5 });
bass(40.0, 2.0, 36, 0.9, 0.6);
[84, 88, 91, 96, 91, 88, 84, 79].forEach((m, i) => bell(40.25 + i * S16 * 1.5, m, 0.55 - i * 0.05, i % 2 ? 0.4 : -0.4));
for (let b = 21; b < 22; b++) { const t = bt(b); for (let q = 0; q < 4; q++) K(t + q * BEAT, 0.6); for (let e = 0; e < 8; e++) hat(t + e * BEAT / 2 + BEAT / 4, 0.5); supersaw(t, BAR, CH[0].pad, { vel: 0.5, cut: 2000, release: 0.3 }); }
pluck(44.0, 72, 0.8, { decay: 0.3 }); pluck(44.0, 79, 0.6, { decay: 0.3 }); bell(44.0, 84, 0.7); K(44.0, 0.8); crash(44.0, 0.5);

// --- sidechain pump on music bus ----------------------------------------------
kicks.sort((a, b) => a - b);
{
  let ki = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    while (ki + 1 < kicks.length && kicks[ki + 1] <= t) ki++;
    const since = kicks.length && kicks[ki] <= t ? t - kicks[ki] : 9;
    const x = clamp(since / 0.24, 0, 1);
    const g = 1 - 0.72 * (1 - x * x * (3 - 2 * x));
    music[0][i] *= g; music[1][i] *= g;
  }
}

// --- ping-pong delay (dotted 8th) ---------------------------------------------
{
  const D = Math.round(BEAT * 0.75 * SR), fb = 0.38;
  const bl = new Float32Array(N), br = new Float32Array(N);
  const lp = [new Biquad().set('lp', 4500, 0.7), new Biquad().set('lp', 4500, 0.7)];
  for (let i = 0; i < N; i++) {
    const dl = i >= D ? br[i - D] : 0, dr = i >= D ? bl[i - D] : 0;
    bl[i] = dly[0][i] + lp[0].p(dl) * fb; br[i] = dly[1][i] + lp[1].p(dr) * fb;
    music[0][i] += dl * 0.5; music[1][i] += dr * 0.5;
  }
}

// --- Freeverb on the send bus ---------------------------------------------------
function freeverb(inL, inR, room = 0.84, damp = 0.3) {
  const sc = SR / 44100;
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617], aps = [556, 441, 341, 225];
  const out = [new Float32Array(N), new Float32Array(N)];
  for (let ch = 0; ch < 2; ch++) {
    const input = ch ? inR : inL, o = out[ch];
    const cs = combs.map(c => ({ buf: new Float32Array(Math.round((c + ch * 23) * sc)), i: 0, f: 0 }));
    const as = aps.map(a => ({ buf: new Float32Array(Math.round((a + ch * 23) * sc)), i: 0 }));
    for (let n = 0; n < N; n++) {
      const x = input[n] * 0.015; let y = 0;
      for (const c of cs) {
        const v = c.buf[c.i]; c.f = v * (1 - damp) + c.f * damp;
        c.buf[c.i] = x + c.f * room; c.i = (c.i + 1) % c.buf.length; y += v;
      }
      for (const a of as) { const v = a.buf[a.i]; a.buf[a.i] = y + v * 0.5; a.i = (a.i + 1) % a.buf.length; y = v - y; }
      o[n] = y;
    }
  }
  return out;
}
const rv = freeverb(send[0], send[1]);

// --- master -------------------------------------------------------------------
const outL = new Float32Array(N), outR = new Float32Array(N);
const hpL = new Biquad().set('hp', 28, 0.7), hpR = new Biquad().set('hp', 28, 0.7);
for (let i = 0; i < N; i++) {
  let l = drums[0][i] * 0.9 + music[0][i] + fx[0][i] * 0.8 + rv[0][i] * 1.4;
  let r = drums[1][i] * 0.9 + music[1][i] + fx[1][i] * 0.8 + rv[1][i] * 1.4;
  outL[i] = hpL.p(l); outR[i] = hpR.p(r);
}
// fade last 0.8s
for (let i = 0; i < N; i++) { const t = i / SR; if (t > 44.4) { const g = Math.max(0, 1 - (t - 44.4) / 0.6); outL[i] *= g; outR[i] *= g; } }
let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(outL[i]), Math.abs(outR[i]));
const pre = 1.6 / peak; // drive into the soft clipper for glue
let peak2 = 0;
for (let i = 0; i < N; i++) { outL[i] = Math.tanh(outL[i] * pre); outR[i] = Math.tanh(outR[i] * pre); peak2 = Math.max(peak2, Math.abs(outL[i]), Math.abs(outR[i])); }
const g = 0.93 / peak2;
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28);
buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(clamp(outL[i] * g, -1, 1) * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(clamp(outR[i] * g, -1, 1) * 32767), 46 + i * 4);
}
fs.writeFileSync('audio/music_wef.wav', buf);
fs.writeFileSync('audio/kicks_wef.json', JSON.stringify(kicks.map(k => +k.toFixed(4))));
console.log('music.wav written; kicks:', kicks.length, 'peak pre-clip', peak.toFixed(2));
