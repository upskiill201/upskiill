// Soundtrack for the 80 s Teyro intro (120 BPM), synthesized from scratch with synth.mjs: music + every SFX.
// Act 1 sits in D minor (the problem), the drop at 20 s flips to F major (Teyro) and stays there.
// Every hit uses a time from src/intro/cues.json, the same file the visuals animate on.
//   node pipeline/showreel/music-intro.mjs   → work/intro/raw.wav + src/intro/kicks.json
import fs from 'fs';
import path from 'path';
import { createSynth } from './synth.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const Q = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/intro/cues.json'), 'utf8'));
const S = createSynth(Q.length, Q.bpm, 909);
const { BEAT, BAR, S16 } = S;
const bt = (b) => b * BAR;

// ── harmony ──────────────────────────────────────────────────────────────────
const F = { pad: [57, 60, 65, 69], root: 41 }, Cc = { pad: [55, 60, 64, 67], root: 36 };
const Dm = { pad: [57, 62, 65, 69], root: 38 }, Bb = { pad: [58, 62, 65, 70], root: 34 };
const MINOR = [Dm, Bb, F, Cc]; // the problem
const MAJOR = [F, Cc, Dm, Bb]; // Teyro
const at = (prog, b) => prog[((b % 4) + 4) % 4];
const HOOK = [
  [[0, 77], [2, 81], [3, 84], [6, 81], [8, 79], [10, 77], [12, 81], [14, 79]],
  [[0, 79], [2, 76], [4, 72], [7, 76], [8, 79], [10, 84], [12, 81], [14, 79]],
  [[0, 77], [2, 81], [4, 86], [6, 84], [8, 81], [10, 79], [12, 77], [14, 74]],
  [[0, 74], [3, 77], [6, 82], [8, 81], [10, 79], [11, 77], [12, 77], [14, 72]],
];
const STAB = [0, 3, 6, 10, 12];

function chorus(b, { final = false, hook = true, stabs = true, cut = 7000 } = {}) {
  const t = bt(b), c = at(MAJOR, b);
  for (let q = 0; q < 4; q++) S.kick(t + q * BEAT, q === 0 ? 1 : 0.92);
  S.clap(t + BEAT); S.clap(t + 3 * BEAT);
  for (let e = 0; e < 8; e++) S.hat(t + e * BEAT / 2 + BEAT / 4, e % 2 ? 0.75 : 0.95, e % 2 === 1, e % 2 ? 0.3 : -0.2);
  for (let s = 0; s < 16; s += 2) S.hat(t + s * S16, 0.32, false, 0.4);
  for (let e = 0; e < 8; e++) S.bass(t + e * BEAT / 2 + S16 * (e % 2 ? 0 : 1), S16 * (e % 2 ? 1.6 : 0.9), c.root + (e === 3 || e === 7 ? 12 : 0), e % 2 ? 1 : 0.8, 1.1);
  if (stabs) for (const s of STAB) S.supersaw(t + s * S16, S16 * (s === 12 ? 3 : 1.6), c.pad.map((x) => x + 12).concat([c.pad[0]]), { vel: 1.0, cut, release: 0.09, wob: -1.2, sendAmt: 0.3 });
  S.keys(t, c.pad.map((x) => x + 12), BAR * 0.9, 0.45, { sendAmt: 0.3 });
  if (hook) for (const [s, m] of HOOK[b % 4]) { S.pluck(t + s * S16, m, 0.9, { decay: 0.2, bright: 1.1, dsend: 0.4 }); S.bell(t + s * S16, m + 12, 0.42, 0.2); }
  if (b % 2 === 1) for (let k = 0; k < 4; k++) S.supersaw(t + 14 * S16 + k * S16 / 2, S16 / 2.4, c.pad.map((x) => x + 12), { vel: 0.6, cut: 5000 - k * 900, release: 0.02 });
  if (final) for (const [s, m] of HOOK[b % 4]) S.pluck(t + s * S16, m - 12, 0.5, { decay: 0.25, pan: -0.4 });
}
function soft(b) { // community: warm, filtered, no stabs
  const t = bt(b), c = at(MAJOR, b);
  for (let q = 0; q < 4; q++) S.kick(t + q * BEAT, 0.8);
  S.clap(t + BEAT, 0.6); S.clap(t + 3 * BEAT, 0.6);
  for (let e = 0; e < 8; e++) S.hat(t + e * BEAT / 2 + BEAT / 4, 0.6, false, e % 2 ? 0.3 : -0.2);
  for (let e = 0; e < 8; e++) S.bass(t + e * BEAT / 2 + S16, S16 * 1.4, c.root + (e % 4 === 3 ? 12 : 0), 0.75, 0.6);
  for (let q = 0; q < 4; q++) S.keys(t + q * BEAT + (q % 2 ? S16 * 2 : 0), c.pad.map((x) => x + 12), BEAT * 0.4, 0.55, { sendAmt: 0.4 });
  for (const [s, m] of HOOK[b % 4]) S.pluck(t + s * S16, m, 0.55, { decay: 0.16, bright: 0.6, dsend: 0.5 });
}

// ═════ ACT 1 — the problem (D minor) ════════════════════════════════════════
// 0–4: hook. A clock ticks; the bar is stuck.
S.keys(0, Dm.pad, 1.9, 0.7); S.keys(2, Bb.pad, 1.9, 0.6); S.bass(0, 1.9, 38, 0.35, 0.2); S.bass(2, 1.9, 34, 0.35, 0.2);
for (let s = 0; s < 8; s++) S.tock(s * BEAT, s % 2 ? 0.5 : 0.7, s % 2 === 1);
S.pop(Q.hook.l1, 72, 0.5); S.pop(Q.hook.l2, 69, 0.5);
S.stamp(Q.hook.stuck, 0.55); S.bell(Q.hook.stuck, 62, 0.5);
S.whoosh(Q.days[0], 0.5, 0.7);
// 4–10: Day 1 all in → life gets busy. Half-time beat.
for (let b = 2; b < 5; b++) {
  const t = bt(b), c = at(MINOR, b - 2), dense = b < 4;
  S.kick(t, 0.85); if (dense) S.kick(t + 2.5 * BEAT, 0.7);
  S.clap(t + 2 * BEAT, dense ? 0.7 : 0.4);
  for (let e = 0; e < 8; e++) S.hat(t + e * BEAT / 2, e % 2 ? 0.35 : 0.5, false, 0.3);
  S.keys(t, c.pad, BAR * 0.95, 0.6);
  S.bass(t, BAR * 0.45, c.root, 0.5, 0.4); S.bass(t + BAR / 2, BAR * 0.45, c.root, 0.45, 0.4);
  for (let s = 0; s < 16; s += 2) S.pluck(t + s * S16, c.pad[(s / 2) % 4] + 12, 0.35, { decay: 0.12, dsend: 0.5, bright: 0.7 });
}
Q.days.forEach((t, i) => S.ding(t, [79, 83, 86][i], 0.8, [-0.3, 0, 0.3][i]));
S.stamp(Q.busy, 0.5); S.bell(Q.busy, 62, 0.4);
Q.notifs.forEach((t, i) => S.notif(t, 0.75 + i * 0.05, i % 2 ? 0.5 : -0.5));
S.notif(Q.email, 0.9); S.subDrop(Q.familiar, 0.4);
S.keys(Q.familiar, [50, 57, 62, 65], 1.0, 0.6);
// 10–15: the stat. Heartbeat, ticking, 20 people appear, 17 fall away.
for (let b = 5; b < 8; b++) {
  const t = bt(b), c = at(MINOR, b - 5);
  S.supersaw(t, BAR, c.pad, { vel: 0.5, cut: 500 + (b - 5) * 250, cutEnd: 800 + (b - 5) * 300, attack: 0.3, release: 0.4, sendAmt: 0.6 });
  S.bass(t, BAR - 0.1, c.root, 0.4, 0.15);
  for (let s = 0; s < 16; s++) S.tock(t + s * S16, (s % 4 === 0 ? 0.45 : 0.18), s % 2 === 1);
}
for (const t of [10, 11, 12, 13, 14]) S.heartbeat(t, 0.8);
Q.people.forEach((t, i) => S.pop(t, 72 + (i % 8) * 2, 0.35, (i % 5 - 2) / 3));
S.subDrop(Q.stat, 1.0); S.stamp(Q.stat, 1.0); S.keys(Q.stat, [38, 50, 57, 62, 65], 2.4, 0.9); S.crash(Q.stat, 0.4);
Q.quit.forEach((t, i) => S.fall(t, 0.7, (i % 5 - 2) / 3));
// 15–20: the turn. Major chords creep in, then the build.
S.keys(Q.notYou, F.pad.map((x) => x + 12), 0.95, 0.75); S.bell(Q.notYou, 77, 0.5);
S.keys(Q.notYou + 0.5, Cc.pad.map((x) => x + 12), 0.45, 0.5);
S.keys(Q.hard, Dm.pad.map((x) => x + 12), 0.95, 0.7); S.keys(Q.hard + 0.5, Bb.pad.map((x) => x + 12), 0.45, 0.5);
for (let q = 0; q < 2; q++) S.kick(Q.hard + q * BEAT, 0.6);
for (let q = 0; q < 4; q++) S.kick(Q.game + q * BEAT / 2, 0.65 + q * 0.05);
for (let s = 0; s < 8; s++) S.supersaw(Q.game + s * BEAT / 2 + (s >= 4 ? 0 : 0), S16 * 1.5, Bb.pad.map((x) => x + 12), { vel: 0.4 + s * 0.06, cut: 1200 + s * 600, release: 0.05 });
for (let e = 0; e < 6; e++) S.kick(19 + e * S16, 0.75 + e * 0.04);
S.snareRoll(18.0, 1.75, 1.15); S.riser(16.6, 3.4, 1.3); S.whoosh(Q.drop, 0.6, 1.1);
S.pop(Q.game, 79, 0.6); S.pop(Q.game2, 84, 0.7);

// ═════ ACT 2 — meet Teyro (F major) ═════════════════════════════════════════
S.subDrop(Q.drop, 1.3); S.crash(Q.drop, 1.3); S.clap(Q.drop, 1, true); S.stamp(Q.drop, 0.9);
for (let b = 10; b < 14; b++) chorus(b);
S.whoosh(Q.meet, 0.4, 0.6); S.whoosh(Q.tagline, 0.4, 0.6);
Q.tracks.forEach((t) => S.whoosh(t, 0.3, 0.7));
Q.topics.forEach((t, i) => S.pop(t, 79 + i * 2, 0.7, i % 2 ? 0.4 : -0.4));
S.ding(Q.path2min, 88, 0.7);

// ═════ ACT 3 — seven reasons ════════════════════════════════════════════════
for (let b = 14; b < 22; b++) chorus(b, { cut: 6000 });
for (let b = 22; b < 28; b++) chorus(b, { final: true });
for (let b = 28; b < 31; b++) soft(b);
Q.reasons.forEach((t) => { S.crash(t, 0.45); S.stamp(t, 0.35); });
// R1 lessons you can finish
for (let s = 0; s < 4; s++) S.tock(Q.r1.clock + s * S16, 0.7, s % 2 === 1);
Q.r1.nodes.forEach((t, i) => S.ding(t, [79, 83, 86, 91][i], 0.7, i % 2 ? 0.3 : -0.3));
S.whoosh(Q.r1.bus + 0.5, 0.9, 0.7);
// R2 practise
Q.r2.opts.forEach((t, i) => S.pop(t, 79 + i * 4, 0.7));
S.click(Q.r2.select, 1); S.click(Q.r2.check, 1.2); S.correct(Q.r2.correct); S.coin(Q.r2.xp, 1.1);
Q.r2.phases.forEach((t, i) => S.pop(t, [72, 76, 79, 84][i], 0.7));
// R3 streak
Q.r3.days.forEach((t, i) => S.pop(t, 72 + i * 2, 0.8));
S.ice(Q.r3.freeze, 1);
Q.r3.days2.forEach((t, i) => S.pop(t, 81 + i * 2, 0.85));
S.shimmer(Q.r3.society, 1); S.notif(Q.r3.nudge, 1);
// R4 quests → chest → level
Q.r4.quests.forEach((t, i) => S.ding(t, [84, 88, 91][i], 0.8));
S.stamp(Q.r4.chest, 0.9); S.shimmer(Q.r4.chest + 0.05, 0.8);
Q.r4.coins.forEach((t, i) => S.coin(t + 0.35, 0.8, i % 2 ? 0.5 : -0.5));
S.correct(Q.r4.level); S.shimmer(Q.r4.level + 0.1, 0.8);
// R5 shop
Q.r5.items.forEach((t, i) => S.pop(t, 76 + i * 2, 0.7, (i % 3 - 1) / 2));
S.click(Q.r5.tap, 1.1); S.kaching(Q.r5.bought, 1); S.whoosh(Q.r5.mystery, 0.3, 0.5); S.pop(Q.r5.mystery, 88, 0.7);
// R6 leagues
Q.r6.badges.forEach((t, i) => S.pop(t, 72 + i * 2, 0.6, (i - 4) / 5));
Q.r6.climb.forEach((t) => S.whoosh(t, 0.25, 0.55));
S.shimmer(Q.r6.top, 1); S.ding(Q.r6.top, 91, 0.6);
// R7 friends + community + monthly challenge
Q.r7.friends.forEach((t, i) => S.notif(t, 0.8, [-0.4, 0, 0.4][i]));
S.pop(Q.r7.post, 79, 0.9);
for (let i = 0; i < 8; i++) S.pop(Q.r7.likes + i * 0.11, 84 + (i % 3) * 3, 0.45, (i % 3 - 1) / 2);
S.ding(Q.r7.cheer, 88, 0.8);
S.riser(Q.r7.month, 1.0, 0.6); S.stamp(Q.r7.badge, 0.9); S.shimmer(Q.r7.badge + 0.04, 1);

// ═════ ACT 4 — the outcome ══════════════════════════════════════════════════
// 62–66: breakdown. Everyone lights up this time.
S.crash(Q.back, 0.6); S.whoosh(Q.back, 0.6, 0.8, false);
for (let b = 31; b < 33; b++) {
  const t = bt(b);
  for (let h = 0; h < 2; h++) {
    const c = at(MAJOR, (b - 31) * 2 + h), tt = t + h * BAR / 2;
    S.supersaw(tt, BAR / 2, c.pad.concat([c.pad[0] + 12]), { vel: 1.1, cut: 2200 + (b - 31) * 1600, cutEnd: 3200 + (b - 31) * 2200, attack: 0.06, release: 0.4, sendAmt: 0.7 });
    S.keys(tt, c.pad.map((x) => x + 12), BAR / 2 - 0.05, 0.7);
    S.bass(tt, BAR / 2 - 0.05, c.root, 0.7, 0.3);
  }
  for (const [s, m] of HOOK[((b - 31) * 2) % 4]) S.bell(t + s * S16 / 2, m + 12, 0.5, s % 2 ? 0.3 : -0.3);
  for (const [s, m] of HOOK[((b - 31) * 2 + 1) % 4]) S.bell(t + BAR / 2 + s * S16 / 2, m + 12, 0.5, s % 2 ? 0.3 : -0.3);
}
Q.lightUp.forEach((t, i) => S.pop(t, 72 + (i % 10) * 2, 0.5, (i % 5 - 2) / 3));
S.riser(64.0, 2.0, 1.1); S.snareRoll(65.0, 0.9, 0.9);
// 66: course complete. Full chorus.
S.subDrop(Q.complete, 1.2); S.crash(Q.complete, 1.2); S.clap(Q.complete, 1, true); S.correct(Q.complete); S.shimmer(Q.complete + 0.08, 1);
for (let b = 33; b < 35; b++) chorus(b, { final: true });
Q.outcomes.forEach((t, i) => S.pop(t, [84, 88, 91][i], 0.8));
// 70–72: build under the quote
for (let q = 0; q < 4; q++) S.kick(70 + q * BEAT / 2, 0.6 + q * 0.06);
for (let e = 0; e < 6; e++) S.kick(71 + e * S16, 0.75 + e * 0.04);
S.snareRoll(70.0, 1.85, 1.15); S.riser(69.4, 2.6, 1.25);
for (let s = 0; s < 8; s++) S.supersaw(70 + s * BEAT / 2, S16 * 1.5, Bb.pad.map((x) => x + 12), { vel: 0.4 + s * 0.06, cut: 1200 + s * 700, release: 0.05 });
S.keys(70, Bb.pad, 1.9, 0.5);
S.whoosh(Q.end, 0.6, 1.1);

// ═════ ACT 5 — end card ═════════════════════════════════════════════════════
S.subDrop(Q.end, 1.4); S.crash(Q.end, 1.3); S.kick(Q.end, 1.15); S.clap(Q.end, 1, true); S.stamp(Q.end, 1.0);
S.supersaw(Q.end, 1.9, [41, 53, 57, 60, 65, 69], { vel: 1.15, cut: 6500, cutEnd: 1600, release: 0.8, sendAmt: 0.7, wob: -1.5 });
S.bass(Q.end, 1.8, 41, 0.9, 0.6);
[89, 93, 96, 101, 96, 93, 89, 84].forEach((m, i) => S.bell(72.25 + i * S16 * 1.5, m, 0.5 - i * 0.04, i % 2 ? 0.4 : -0.4));
S.whoosh(Q.start, 0.3, 0.6);
Q.url.forEach((t, i) => { S.key(t, 0.8); S.pluck(t, [77, 81, 84, 89, 84, 89, 93, 96, 101][i], 0.35, { decay: 0.1, dsend: 0.3 }); });
Q.pills.forEach((t, i) => S.pop(t, 84 + i * 3, 0.8));
S.pop(Q.cta, 84, 1); S.ding(Q.cta, 89, 0.6);
for (let b = 37; b < 39; b++) {
  const t = bt(b), c = at(MAJOR, b);
  for (let q = 0; q < 4; q++) S.kick(t + q * BEAT, 0.7);
  for (let e = 0; e < 8; e++) S.hat(t + e * BEAT / 2 + BEAT / 4, 0.5);
  S.clap(t + BEAT, 0.6); S.clap(t + 3 * BEAT, 0.6);
  for (let e = 0; e < 8; e++) S.bass(t + e * BEAT / 2 + S16, S16 * 1.4, c.root + (e % 4 === 3 ? 12 : 0), 0.6, 0.7);
  S.keys(t, c.pad.map((x) => x + 12), BAR * 0.9, 0.5);
  if (b === 37) for (const [s, m] of HOOK[0]) S.pluck(t + s * S16, m, 0.55, { decay: 0.18 });
}
S.kick(Q.stinger, 1); S.crash(Q.stinger, 0.6); S.stamp(Q.stinger, 0.5);
S.supersaw(Q.stinger, 0.9, [53, 57, 60, 65, 72], { vel: 0.9, cut: 5000, cutEnd: 1200, release: 1.2, sendAmt: 0.8 });
S.keys(Q.stinger, [53, 60, 65, 69, 72], 1.6, 0.8);
S.pluck(Q.stinger, 89, 0.8, { decay: 0.35 }); S.bell(Q.stinger, 101, 0.6); S.shimmer(Q.stinger + 0.05, 0.7);

for (const t of Q.whoosh) S.whoosh(t + 0.05, 0.42, 0.65);

fs.mkdirSync(path.join(ROOT, 'work/intro'), { recursive: true });
const { kicks, peak } = S.render(path.join(ROOT, 'work/intro/raw.wav'), { fadeFrom: 79.2 });
fs.writeFileSync(path.join(ROOT, 'src/intro/kicks.json'), JSON.stringify(kicks));
console.log(`raw.wav written: ${kicks.length} kicks, peak pre-clip ${peak.toFixed(2)}`);
