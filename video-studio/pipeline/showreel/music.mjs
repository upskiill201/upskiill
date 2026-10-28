// Soundtrack for the Git showreel (45 s, 120 BPM), synthesized from scratch: music + every SFX in one mix.
// Every hit is placed on a time from src/showreel/cues.json, the same file the visuals animate on,
// so picture and sound can't drift.
//   node pipeline/showreel/music.mjs   → public/showreel/audio.wav + src/showreel/kicks.json
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const Q = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/showreel/cues.json'), 'utf8'));

const SR = 48000, BPM = Q.bpm, BEAT = 60 / BPM, BAR = BEAT * 4, S16 = BEAT / 4;
const LEN = Q.length;
const N = Math.ceil(SR * LEN);

const mk = () => [new Float32Array(N), new Float32Array(N)];
const drums = mk(), music = mk(), fx = mk(), sfx = mk(), send = mk(), dly = mk();

let seed = 4242;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const noise = () => rnd() * 2 - 1;
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function add(bus, i, l, r) { if (i >= 0 && i < N) { bus[0][i] += l; bus[1][i] += r; } }

class Biquad {
  constructor() { this.x1 = this.x2 = this.y1 = this.y2 = 0; }
  set(type, f, q) {
    const w = 2 * Math.PI * clamp(f, 20, SR * 0.45) / SR, c = Math.cos(w), s = Math.sin(w), a = s / (2 * q);
    let b0, b1, b2; const a0 = 1 + a, a1 = -2 * c, a2 = 1 - a;
    if (type === 'lp') { b0 = (1 - c) / 2; b1 = 1 - c; b2 = b0; }
    else if (type === 'hp') { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = b0; }
    else { b0 = a; b1 = 0; b2 = -a; }
    this.b0 = b0 / a0; this.b1 = b1 / a0; this.b2 = b2 / a0; this.a1 = a1 / a0; this.a2 = a2 / a0;
    return this;
  }
  p(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1; this.x1 = x; this.y2 = this.y1; this.y1 = y; return y;
  }
}
function blep(t, dt) {
  if (t < dt) { t /= dt; return t + t - t * t - 1; }
  if (t > 1 - dt) { t = (t - 1) / dt; return t * t + t + t + 1; }
  return 0;
}

// ── drums ────────────────────────────────────────────────────────────────────
const kicks = [];
function kick(t0, vel = 1) {
  kicks.push(t0);
  const i0 = Math.round(t0 * SR), len = Math.round(0.42 * SR);
  let ph = 0; const hp = new Biquad().set('hp', 2500, 0.7);
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    const f = 47 + 150 * Math.exp(-t * 30) + 30 * Math.exp(-t * 300);
    ph += 2 * Math.PI * f / SR;
    let s = Math.sin(ph) * Math.exp(-t * 5.0) * Math.min(1, t * 2000);
    s = Math.tanh(s * 2.0) * 0.9;
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
    const v = hp2.p(hp.p(noise())) * Math.exp(-t * (open ? 16 : 70)) * vel * 0.28;
    add(drums, i0 + k, v * (1 - pan), v * (1 + pan));
  }
}
function crash(t0, vel = 1) {
  const i0 = Math.round(t0 * SR), len = Math.round(2.6 * SR);
  const hp = new Biquad().set('hp', 4200, 0.6);
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    const v = hp.p(noise()) * Math.exp(-t * 2.4) * vel * 0.085;
    add(drums, i0 + k, v, v);
    add(send, i0 + k, v * 0.3, v * 0.3);
  }
}
function subDrop(t0, vel = 1) {
  const i0 = Math.round(t0 * SR), len = Math.round(2.2 * SR);
  let ph = 0; const lp = new Biquad().set('lp', 1800, 0.7);
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    ph += 2 * Math.PI * (32 + 70 * Math.exp(-t * 6)) / SR;
    const s = Math.tanh(Math.sin(ph) * 2) * Math.exp(-t * 1.9) * 0.6;
    const n = lp.p(noise()) * Math.exp(-t * 9) * 0.2;
    add(fx, i0 + k, (s + n) * vel, (s + n) * vel);
    add(send, i0 + k, n * 0.3 * vel, n * 0.3 * vel);
  }
}
function riser(t0, dur, vel = 1) {
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
  let t = t0;
  while (t < t0 + dur - 0.01) {
    const x = (t - t0) / dur;
    clap(t, (0.25 + 0.75 * x) * vel);
    t += x < 0.5 ? S16 * 2 : x < 0.8 ? S16 : S16 / 2;
  }
}

// ── synths ───────────────────────────────────────────────────────────────────
const DET = [-0.19, -0.11, -0.05, 0, 0.05, 0.11, 0.19];
function supersaw(t0, dur, midis, opt = {}) {
  const { vel = 1, cut = 3000, cutEnd = cut, attack = 0.005, release = 0.12, wob = 0, bus = music, sendAmt = 0.25, res = 0.9 } = opt;
  const i0 = Math.round(t0 * SR), len = Math.round((dur + release) * SR);
  const voices = [];
  for (const m of midis) for (let v = 0; v < DET.length; v++) voices.push({ f: mtof(m + DET[v]), ph: rnd(), pan: (v / (DET.length - 1)) * 2 - 1 });
  const lpL = new Biquad(), lpR = new Biquad();
  const g = 0.11 / Math.sqrt(midis.length * DET.length) * vel;
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    if (k % 32 === 0) { const c = cut + (cutEnd - cut) * Math.min(1, t / Math.max(dur, 0.001)); lpL.set('lp', c, res); lpR.set('lp', c * 1.02, res); }
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
    add(bus, i0 + k, L, R); add(send, i0 + k, L * sendAmt, R * sendAmt);
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
    const s = Math.tanh((lp.p(saw) * 0.5 + Math.sin(ph2) * 0.7) * env * vel * 0.42 * 1.4);
    add(music, i0 + k, s, s);
  }
}
function pluck(t0, m, vel = 1, opt = {}) {
  const { decay = 0.22, pan = 0, dsend = 0.35, sendAmt = 0.2, bright = 1, bus = music } = opt;
  const i0 = Math.round(t0 * SR), len = Math.round((decay * 3.2) * SR);
  const f = mtof(m); let p1 = rnd(), p2 = rnd(); const lp = new Biquad();
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    if (k % 16 === 0) lp.set('lp', 500 + 7000 * bright * Math.exp(-t * 22), 1.1);
    p1 += f / SR; if (p1 >= 1) p1 -= 1; p2 += f * 1.006 / SR; if (p2 >= 1) p2 -= 1;
    const s = (2 * p1 - 1 - blep(p1, f / SR)) + (p2 < 0.5 ? 0.6 : -0.6);
    const v = lp.p(s) * Math.min(1, t / 0.002) * Math.exp(-t / decay) * vel * 0.13;
    const L = v * (1 - pan), R = v * (1 + pan);
    add(bus, i0 + k, L, R); add(dly, i0 + k, L * dsend, R * dsend); add(send, i0 + k, L * sendAmt, R * sendAmt);
  }
}
function bell(t0, m, vel = 1, pan = 0, bus = music) {
  const i0 = Math.round(t0 * SR), len = Math.round(0.9 * SR);
  const f = mtof(m); let pc = 0, pm = 0;
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    pm += 2 * Math.PI * f * 4 / SR;
    pc += 2 * Math.PI * f / SR;
    const s = Math.sin(pc + 2.2 * Math.exp(-t * 18) * Math.sin(pm)) * Math.exp(-t * 6.5) * Math.min(1, t / 0.001);
    const v = s * vel * 0.16;
    add(bus, i0 + k, v * (1 - pan), v * (1 + pan));
    add(send, i0 + k, v * 0.3, v * 0.3); add(dly, i0 + k, v * 0.25, v * 0.25);
  }
}

// ── SFX (own bus: not pumped by the sidechain) ──────────────────────────────
function key(t0, vel = 1) { // mechanical key: bright click + low thock
  const i0 = Math.round(t0 * SR), len = Math.round(0.07 * SR);
  const bp = new Biquad().set('bp', 3200 + rnd() * 900, 2.5); let ph = 0;
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    ph += 2 * Math.PI * (180 + 120 * Math.exp(-t * 80)) / SR;
    const v = (bp.p(noise()) * Math.exp(-t * 160) * 1.6 + Math.sin(ph) * Math.exp(-t * 70) * 0.5) * vel * 0.32;
    add(sfx, i0 + k, v * 0.9, v);
  }
}
function pop(t0, m = 79, vel = 1, pan = 0) { // bubbly pop: fast pitch drop sine
  const i0 = Math.round(t0 * SR), len = Math.round(0.12 * SR);
  const f = mtof(m); let ph = 0;
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    ph += 2 * Math.PI * f * (1 + 1.4 * Math.exp(-t * 60)) / SR;
    const v = Math.sin(ph) * Math.exp(-t * 34) * Math.min(1, t / 0.0015) * vel * 0.28;
    add(sfx, i0 + k, v * (1 - pan), v * (1 + pan)); add(send, i0 + k, v * 0.15, v * 0.15);
  }
}
function whoosh(tHit, dur = 0.45, vel = 1, up = true) { // filtered noise sweep peaking at tHit
  const t0 = tHit - dur * 0.8, i0 = Math.round(t0 * SR), len = Math.round(dur * SR);
  const bp = new Biquad(), bp2 = new Biquad();
  for (let k = 0; k < len; k++) {
    const x = k / len;
    if (k % 32 === 0) { const f = up ? 400 * Math.pow(14, x) : 6000 / Math.pow(10, x); bp.set('bp', f, 0.9); bp2.set('bp', f * 1.15, 0.9); }
    const env = x < 0.8 ? Math.pow(x / 0.8, 2.4) : Math.exp(-(x - 0.8) * 22);
    const pan = (x - 0.5) * 1.2;
    const v = env * vel * 0.38;
    add(sfx, i0 + k, bp.p(noise()) * v * (1 - pan * 0.6), bp2.p(noise()) * v * (1 + pan * 0.6));
  }
}
function coin(t0, vel = 1, pan = 0) { // two-step square chime (B5 → E6)
  const i0 = Math.round(t0 * SR), len = Math.round(0.42 * SR);
  let ph = 0;
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    const f = t < 0.07 ? mtof(83) : mtof(88);
    ph += f / SR; if (ph >= 1) ph -= 1;
    const v = (ph < 0.5 ? 1 : -1) * Math.exp(-t * (t < 0.07 ? 4 : 9)) * vel * 0.055;
    add(sfx, i0 + k, v * (1 - pan), v * (1 + pan)); add(send, i0 + k, v * 0.2, v * 0.2);
  }
}
function stamp(t0, vel = 1) { // heavy UI stamp: body thump + paper slap
  const i0 = Math.round(t0 * SR), len = Math.round(0.35 * SR);
  let ph = 0; const bp = new Biquad().set('bp', 900, 0.8);
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    ph += 2 * Math.PI * (70 + 160 * Math.exp(-t * 40)) / SR;
    const v = (Math.tanh(Math.sin(ph) * 3) * Math.exp(-t * 11) * 0.6 + bp.p(noise()) * Math.exp(-t * 45) * 0.9) * vel * 0.6;
    add(sfx, i0 + k, v, v); add(send, i0 + k, v * 0.2, v * 0.2);
  }
}
function click(t0, vel = 1) { // button press
  const i0 = Math.round(t0 * SR), len = Math.round(0.05 * SR);
  const hp = new Biquad().set('hp', 1500, 0.7); let ph = 0;
  for (let k = 0; k < len; k++) {
    const t = k / SR;
    ph += 2 * Math.PI * 1100 / SR;
    const v = (hp.p(noise()) * Math.exp(-t * 300) + Math.sin(ph) * Math.exp(-t * 120) * 0.5) * vel * 0.35;
    add(sfx, i0 + k, v, v);
  }
}
const ding = (t, m, vel = 1, pan = 0) => { bell(t, m, vel * 1.4, pan, sfx); bell(t + 0.004, m + 7, vel * 0.5, -pan, sfx); };
const correct = (t) => { ding(t, 84, 1); ding(t + 0.09, 91, 1.1); };
const shimmer = (t, vel = 1) => [96, 100, 103, 108, 103, 100].forEach((m, i) => bell(t + i * 0.035, m, vel * (0.5 - i * 0.05), i % 2 ? 0.5 : -0.5, sfx));

// ── harmony ──────────────────────────────────────────────────────────────────
const DARK = [ // Am F C G
  { pad: [57, 60, 64, 69], root: 33 }, { pad: [53, 57, 60, 65], root: 29 },
  { pad: [55, 60, 64, 67], root: 36 }, { pad: [55, 59, 62, 67], root: 31 },
];
const CH = [ // C G Am F
  { pad: [60, 64, 67, 72], root: 36 }, { pad: [59, 62, 67, 71], root: 31 },
  { pad: [57, 60, 64, 69], root: 33 }, { pad: [57, 60, 65, 69], root: 29 },
];
const darkAt = (b) => DARK[((b % 4) + 4) % 4];
const chordAt = (b) => CH[((b % 4) + 4) % 4];
const HOOK = [
  [[0, 76], [2, 79], [4, 84], [7, 83], [8, 79], [10, 76], [12, 79], [14, 81]],
  [[0, 79], [3, 74], [6, 79], [8, 83], [10, 81], [12, 79], [14, 74]],
  [[0, 76], [2, 79], [4, 84], [7, 83], [8, 81], [10, 79], [12, 76], [14, 79]],
  [[0, 77], [3, 81], [6, 84], [8, 81], [10, 79], [11, 77], [12, 76], [14, 72]],
];
const STAB = [0, 3, 6, 10, 12];
const bt = (b) => b * BAR;

function groove(b, { cut, hook = false, openHats = false, kick4 = true, bassVel = 0.8 }) {
  const t = bt(b), c = darkAt(b);
  if (kick4) for (let q = 0; q < 4; q++) kick(t + q * BEAT, q === 0 ? 1 : 0.9);
  clap(t + BEAT, 0.8); clap(t + 3 * BEAT, 0.8);
  for (let e = 0; e < 8; e++) hat(t + e * BEAT / 2 + BEAT / 4, e % 2 ? 0.7 : 0.9, openHats && e % 2 === 1, e % 2 ? 0.3 : -0.2);
  for (let s = 0; s < 16; s += 2) hat(t + s * S16, 0.28, false, 0.4);
  for (let e = 0; e < 8; e++) bass(t + e * BEAT / 2 + S16 * (e % 2 ? 0 : 1), S16 * (e % 2 ? 1.6 : 0.9), c.root + (e === 3 || e === 7 ? 12 : 0), bassVel * (e % 2 ? 1 : 0.8), 0.8);
  for (const s of STAB) supersaw(t + s * S16, S16 * (s === 12 ? 3 : 1.6), c.pad, { vel: 0.75, cut, release: 0.09, sendAmt: 0.3 });
  if (hook) for (const [s, m] of HOOK[b % 4]) pluck(t + s * S16, m, 0.6, { decay: 0.16, bright: cut / 6000, dsend: 0.45 });
}
function chorus(b, final = false) {
  const t = bt(b), c = chordAt(b);
  for (let q = 0; q < 4; q++) kick(t + q * BEAT, q === 0 ? 1 : 0.92);
  clap(t + BEAT); clap(t + 3 * BEAT);
  for (let e = 0; e < 8; e++) hat(t + e * BEAT / 2 + BEAT / 4, e % 2 ? 0.75 : 0.95, e % 2 === 1, e % 2 ? 0.3 : -0.2);
  for (let s = 0; s < 16; s += 2) hat(t + s * S16, 0.32, false, 0.4);
  for (let e = 0; e < 8; e++) bass(t + e * BEAT / 2 + S16 * (e % 2 ? 0 : 1), S16 * (e % 2 ? 1.6 : 0.9), c.root + (e === 3 || e === 7 ? 12 : 0), e % 2 ? 1 : 0.8, 1.1);
  for (const s of STAB) supersaw(t + s * S16, S16 * (s === 12 ? 3 : 1.6), c.pad.map((x) => x + 12).concat([c.pad[0]]), { vel: 1.05, cut: 7000, release: 0.09, wob: -1.2, sendAmt: 0.3 });
  for (const [s, m] of HOOK[b % 4]) { pluck(t + s * S16, m, 0.95, { decay: 0.2, bright: 1.1, dsend: 0.4 }); bell(t + s * S16, m + 12, 0.5, 0.2); }
  if (b % 2 === 1) for (let k = 0; k < 4; k++) supersaw(t + 14 * S16 + k * S16 / 2, S16 / 2.4, c.pad.map((x) => x + 12), { vel: 0.7, cut: 5000 - k * 900, release: 0.02 });
  if (final) for (const [s, m] of HOOK[b % 4]) pluck(t + s * S16, m - 12, 0.55, { decay: 0.25, pan: -0.4 });
}

// ═════ ARRANGEMENT ═══════════════════════════════════════════════════════════
// 0–2: cold open. A filtered pad, and the terminal types "git init": each key is a note.
supersaw(0, 2.0, DARK[0].pad, { vel: 0.55, cut: 380, cutEnd: 1100, attack: 0.6, release: 0.3, sendAmt: 0.6 });
bass(0, 1.9, 33, 0.35, 0.2);
const TYPE_NOTES = [69, 72, 76, 79, 81, 84, 88, 91];
Q.type.forEach((t, i) => { key(t, 0.9); pluck(t, TYPE_NOTES[i], 0.55, { decay: 0.12, bright: 0.9, dsend: 0.5, pan: i % 2 ? 0.3 : -0.3 }); });
for (let s = 0; s < 4; s++) hat(s * BEAT, 0.25, false, 0.4); // the cursor blink
key(Q.enter, 1.2); whoosh(Q.init, 0.5, 0.9);
riser(1.0, 1.0, 0.8);

// 2–4: "Every project starts with one commit" — the first kick is the first commit.
subDrop(Q.init, 0.8); crash(Q.init, 0.7); kick(Q.init, 1.1); bell(Q.init, 81, 0.8); bell(Q.init, 88, 0.5, 0.3);
supersaw(2, 2.0, DARK[1].pad, { vel: 0.6, cut: 900, cutEnd: 1600, attack: 0.05, release: 0.3, sendAmt: 0.5 });
for (const t of Q.title) { if (t > Q.init) kick(t, 0.75); pop(t, 74 + Q.title.indexOf(t) * 3, 0.7); }
for (let s = 0; s < 16; s++) hat(2 + s * S16, s % 4 === 2 ? 0.6 : 0.3, false, 0.4);
for (let e = 0; e < 4; e++) bass(2 + e * BEAT, BEAT * 0.8, 29, 0.6, 0.4);

// 4–8: Commit / Branch / Merge — the groove arrives (dark, filtered).
groove(2, { cut: 1500 }); groove(3, { cut: 2000 });
Q.graph.side.forEach((t, i) => pop(t, [79, 83, 86][i], 0.65, i % 2 ? 0.4 : -0.4));
bell(Q.graph.mergeNode, 88, 0.7); crash(Q.graph.mergeNode, 0.4);

// 8–12: Push / pull request / merged — the hook comes in.
groove(4, { cut: 2600, hook: true, openHats: true }); groove(5, { cut: 3200, hook: true, openHats: true });
Q.files.forEach((t, i) => pop(t, 76 + i * 2, 0.55, i % 2 ? 0.3 : -0.3));
whoosh(Q.pr, 0.4, 0.8); ding(Q.approve, 79, 0.9); stamp(Q.merged, 0.9); shimmer(Q.merged + 0.05, 0.9);

// 12–16: Actions build. YAML lines tick in, then the checks land on the snare roll.
for (let b = 6; b < 8; b++) {
  const t = bt(b), c = darkAt(b);
  const kEnd = b === 6 ? 4 : 2;
  for (let q = 0; q < kEnd; q++) kick(t + q * BEAT, 0.9);
  for (let s = 0; s < 16; s++) hat(t + s * S16, 0.22 + (b - 6) * 0.12 + s * 0.01, false, s % 2 ? 0.4 : -0.4);
  for (let e = 0; e < 16; e++) bass(t + e * S16, S16 * 0.7, c.root + (e % 2 ? 12 : 0), 0.45 + e * 0.02, 0.4 + (b - 6) * 0.3);
  supersaw(t, BAR, c.pad, { vel: 0.6, cut: 1200 + (b - 6) * 2000, cutEnd: 3200 + (b - 6) * 3500, attack: 0.02, release: 0.1, sendAmt: 0.4 });
}
Q.yaml.forEach((t, i) => { key(t, 0.7); pop(t, 72 + i, 0.25); });
snareRoll(14.0, 1.75, 1.1); riser(12.6, 3.3, 1.25);
Q.checks.forEach((t, i) => ding(t, [84, 88, 91][i], 1.0, [-0.4, 0, 0.4][i]));
shimmer(Q.allPassed, 1);
whoosh(Q.drop, 0.6, 1.1, true);

// 16: DROP — the Teyro icon lands. 16–28 full chorus.
subDrop(Q.drop, 1.3); crash(Q.drop, 1.3); clap(Q.drop, 1, true); stamp(Q.drop, 0.8);
for (let b = 8; b < 14; b++) chorus(b);
whoosh(Q.headline, 0.4, 0.6);
Q.chips.forEach((t, i) => pop(t, 79 + i * 3, 0.9, i % 2 ? 0.4 : -0.4));
stamp(Q.free, 1.1); shimmer(Q.free + 0.03, 0.8);
click(Q.press, 1.2);
Q.path.forEach((t, i) => ding(t + 0.02, [79, 83, 86, 91][i], 0.6, i % 2 ? 0.3 : -0.3));
Q.phases.forEach((t, i) => { whoosh(t, 0.25, 0.55); pop(t, [72, 76, 79, 84][i], 0.6); });
click(Q.select, 1); click(Q.check, 1.2); correct(Q.correct); coin(Q.xp, 1.1);
Q.stats.forEach((t, i) => pop(t, 84 + i * 3, 0.7));

// 28–34: the game layer. Final chorus with the octave doubling.
for (let b = 14; b < 17; b++) chorus(b, true);
whoosh(Q.streak, 0.5, 0.8);
Q.days.forEach((t, i) => pop(t, 72 + [0, 2, 4, 5, 7, 9, 11][i], 0.75, (i - 3) / 5));
whoosh(Q.statbar, 0.35, 0.6);
Q.quests.forEach((t, i) => ding(t, [84, 88, 91][i], 0.8));
stamp(Q.chest, 0.9); Q.coins.forEach((t, i) => coin(t, 0.9, i % 2 ? 0.5 : -0.5));
Q.league.forEach((t) => whoosh(t, 0.22, 0.5));
shimmer(Q.promoted, 1);

// 34–38: breakdown — the outcome. Kick out, open pads, the hook on bells.
whoosh(Q.outcome, 0.7, 0.9, false); crash(Q.outcome, 0.6); subDrop(Q.outcome, 0.5);
for (let b = 17; b < 19; b++) {
  const t = bt(b);
  for (let h = 0; h < 2; h++) {
    const c = chordAt(b * 2 + h - 34 + 0), tt = t + h * BAR / 2;
    supersaw(tt, BAR / 2, c.pad.concat([c.pad[0] + 12, c.pad[2] + 12]), { vel: 1.25, cut: 2400 + (b - 17) * 1500, cutEnd: 3400 + (b - 17) * 2000, attack: 0.06, release: 0.4, sendAmt: 0.7 });
    bass(tt, BAR / 2 - 0.05, c.root, 0.75, 0.35);
    for (let e = 1; e < 4; e++) hat(tt + e * BEAT / 2, 0.35, true, e % 2 ? 0.4 : -0.4);
  }
  for (const [s, m] of HOOK[(b - 17) * 2 % 4]) bell(t + s * S16 / 2, m + 12, 0.55, s % 2 ? 0.3 : -0.3);
  for (const [s, m] of HOOK[((b - 17) * 2 + 1) % 4]) bell(t + BAR / 2 + s * S16 / 2, m + 12, 0.55, s % 2 ? 0.3 : -0.3);
  if (b === 18) for (let s = 0; s < 16; s++) hat(t + s * S16, 0.2 + s * 0.02, false, 0.4);
}
bell(Q.outcome2, 84, 0.7);
Q.pillars.forEach((t, i) => { pop(t, [79, 84, 88][i], 0.9); kick(t, 0.6); });

// 38–40: second build into the end card.
for (let q = 0; q < 4; q++) kick(38 + q * BEAT / 2, 0.6 + q * 0.06);
for (let e = 0; e < 6; e++) kick(39 + e * S16, 0.75 + e * 0.04); // then a beat of silence before the hit
snareRoll(38.0, 1.85, 1.15); riser(37.2, 2.75, 1.25);
for (let s = 0; s < 8; s++) supersaw(38 + s * BEAT / 2, S16 * 1.5, chordAt(3).pad.map((x) => x + 12), { vel: 0.4 + s * 0.06, cut: 1200 + s * 700, release: 0.05 });
whoosh(Q.end, 0.6, 1.1);

// 40: the end card. FREE lands, then the icon and teyro.app; a light groove under the CTA.
subDrop(Q.end, 1.4); crash(Q.end, 1.3); kick(Q.end, 1.15); clap(Q.end, 1, true); stamp(Q.end, 1.0);
supersaw(Q.end, 1.9, [48, 60, 64, 67, 72, 76], { vel: 1.15, cut: 6500, cutEnd: 1600, release: 0.8, sendAmt: 0.7, wob: -1.5 });
bass(Q.end, 1.8, 36, 0.9, 0.6);
[84, 88, 91, 96, 91, 88, 84, 79].forEach((m, i) => bell(40.25 + i * S16 * 1.5, m, 0.5 - i * 0.04, i % 2 ? 0.4 : -0.4));
pop(Q.icon, 72, 1); bell(Q.icon, 84, 0.7); whoosh(Q.icon, 0.3, 0.6);
Q.url.forEach((t, i) => { key(t, 0.8); pluck(t, [72, 76, 79, 84, 79, 84, 88, 91, 96][i], 0.35, { decay: 0.1, dsend: 0.3 }); });
pop(Q.cta, 84, 1); ding(Q.cta, 88, 0.6);
for (let b = 21; b < 22; b++) {
  const t = bt(b);
  for (let q = 0; q < 4; q++) kick(t + q * BEAT, 0.7);
  for (let e = 0; e < 8; e++) hat(t + e * BEAT / 2 + BEAT / 4, 0.5);
  clap(t + BEAT, 0.6); clap(t + 3 * BEAT, 0.6);
  for (let e = 0; e < 8; e++) bass(t + e * BEAT / 2 + S16, S16 * 1.4, 36 + (e % 4 === 3 ? 12 : 0), 0.6, 0.7);
  supersaw(t, BAR, CH[0].pad.map((x) => x + 12), { vel: 0.55, cut: 2600, release: 0.3, sendAmt: 0.5 });
  for (const [s, m] of HOOK[0]) pluck(t + s * S16, m, 0.6, { decay: 0.18 });
}
// final stinger
kick(Q.stinger, 1); crash(Q.stinger, 0.6); stamp(Q.stinger, 0.5);
supersaw(Q.stinger, 0.9, [60, 64, 67, 72, 79], { vel: 0.9, cut: 5000, cutEnd: 1200, release: 0.9, sendAmt: 0.8 });
pluck(Q.stinger, 84, 0.8, { decay: 0.35 }); bell(Q.stinger, 96, 0.6); shimmer(Q.stinger + 0.05, 0.7);

// Transition whooshes into every scene cut.
for (const t of Q.whoosh) whoosh(t + 0.05, 0.42, 0.7);

// ── sidechain pump on the music bus ─────────────────────────────────────────
kicks.sort((a, b) => a - b);
{
  let ki = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    while (ki + 1 < kicks.length && kicks[ki + 1] <= t) ki++;
    const since = kicks.length && kicks[ki] <= t ? t - kicks[ki] : 9;
    const x = clamp(since / 0.24, 0, 1);
    const g = 1 - 0.7 * (1 - x * x * (3 - 2 * x));
    music[0][i] *= g; music[1][i] *= g;
  }
}
// ── ping-pong delay (dotted 8th) ────────────────────────────────────────────
{
  const D = Math.round(BEAT * 0.75 * SR), fb = 0.36;
  const bl = new Float32Array(N), br = new Float32Array(N);
  const lp = [new Biquad().set('lp', 4500, 0.7), new Biquad().set('lp', 4500, 0.7)];
  for (let i = 0; i < N; i++) {
    const dl = i >= D ? br[i - D] : 0, dr = i >= D ? bl[i - D] : 0;
    bl[i] = dly[0][i] + lp[0].p(dl) * fb; br[i] = dly[1][i] + lp[1].p(dr) * fb;
    music[0][i] += dl * 0.5; music[1][i] += dr * 0.5;
  }
}
// ── Freeverb on the send bus ────────────────────────────────────────────────
function freeverb(inL, inR, room = 0.84, damp = 0.3) {
  const sc = SR / 44100;
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617], aps = [556, 441, 341, 225];
  const out = [new Float32Array(N), new Float32Array(N)];
  for (let ch = 0; ch < 2; ch++) {
    const input = ch ? inR : inL, o = out[ch];
    const cs = combs.map((c) => ({ buf: new Float32Array(Math.round((c + ch * 23) * sc)), i: 0, f: 0 }));
    const as = aps.map((a) => ({ buf: new Float32Array(Math.round((a + ch * 23) * sc)), i: 0 }));
    for (let n = 0; n < N; n++) {
      const x = input[n] * 0.015; let y = 0;
      for (const c of cs) { const v = c.buf[c.i]; c.f = v * (1 - damp) + c.f * damp; c.buf[c.i] = x + c.f * room; c.i = (c.i + 1) % c.buf.length; y += v; }
      for (const a of as) { const v = a.buf[a.i]; a.buf[a.i] = y + v * 0.5; a.i = (a.i + 1) % a.buf.length; y = v - y; }
      o[n] = y;
    }
  }
  return out;
}
const rv = freeverb(send[0], send[1]);

// ── master ──────────────────────────────────────────────────────────────────
const outL = new Float32Array(N), outR = new Float32Array(N);
const hpL = new Biquad().set('hp', 28, 0.7), hpR = new Biquad().set('hp', 28, 0.7);
for (let i = 0; i < N; i++) {
  outL[i] = hpL.p(drums[0][i] * 0.9 + music[0][i] + fx[0][i] * 0.8 + sfx[0][i] * 1.1 + rv[0][i] * 1.4);
  outR[i] = hpR.p(drums[1][i] * 0.9 + music[1][i] + fx[1][i] * 0.8 + sfx[1][i] * 1.1 + rv[1][i] * 1.4);
}
for (let i = 0; i < N; i++) { const t = i / SR; if (t > 44.3) { const g = Math.max(0, 1 - (t - 44.3) / 0.7); outL[i] *= g; outR[i] *= g; } }
let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(outL[i]), Math.abs(outR[i]));
const pre = 1.6 / peak;
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
fs.mkdirSync(path.join(ROOT, 'work/showreel'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'work/showreel/raw.wav'), buf);
fs.writeFileSync(path.join(ROOT, 'src/showreel/kicks.json'), JSON.stringify([...new Set(kicks.map((k) => +k.toFixed(4)))]));
console.log(`raw.wav written: ${kicks.length} kicks, peak pre-clip ${peak.toFixed(2)}`);
