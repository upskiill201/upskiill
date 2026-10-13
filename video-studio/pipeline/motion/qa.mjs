// QA gate for a finished Motion Explainer (docs/MOTION_EXPLAINER_REFERENCE_ANALYSIS.md §7), measured
// exactly like the references were (§2.6, §4):
//   node pipeline/motion/qa.mjs <final.mp4>
// Prints a pass/fail table and exits 1 if any hard gate fails.
import { spawnSync, execFileSync } from 'child_process';

const f = process.argv[2];
if (!f) { console.error('usage: node pipeline/motion/qa.mjs <final.mp4>'); process.exit(1); }
const ff = (args) => spawnSync('ffmpeg', ['-hide_banner', '-nostats', ...args], { encoding: 'utf8', maxBuffer: 1 << 28 }).stderr;
const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' });

// motion: per-frame scene score at 180 px wide (same method as the reference measurement)
const meta = spawnSync('ffmpeg', ['-v', 'error', '-i', f, '-vf', "scale=180:-1,select='gte(scene,0)',metadata=print:file=-", '-f', 'null', '-'], { encoding: 'utf8', maxBuffer: 1 << 28 }).stdout;
const scores = []; let tcur = 0;
for (const ln of meta.split('\n')) {
  const m = ln.match(/pts_time:([\d.]+)/); if (m) tcur = +m[1];
  const s = ln.match(/scene_score=([\d.]+)/); if (s) scores.push([tcur, +s[1]]);
}
let events = 0, on = false, run = 0, maxRun = 0, still = 0; const cuts = [];
for (const [t, s] of scores) {
  if (s > 0.004 && !on) { events++; on = true; maxRun = Math.max(maxRun, run); run = 0; } else if (s <= 0.002) { on = false; run++; }
  if (s < 0.002) still++;
  if (s > 0.25 && t > 0.2 && t < dur - 1.2) cuts.push(t.toFixed(2));
}
const fps = scores.length / dur;
const evRate = events / dur, longestStill = maxRun / fps;

// loudness + gaps (a video without an audio stream fails every audio gate)
const hasAudio = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0', f], { encoding: 'utf8' }).trim() !== '';
const r = ff(['-i', f, '-af', 'ebur128', '-f', 'null', '-']);
const I = +(r.match(/I:\s+(-?[\d.]+) LUFS/g) ?? ['I: 0']).pop().match(/-?[\d.]+/)[0];
const LRA = +((r.match(/LRA:\s+([\d.]+) LU/g) ?? ['LRA: 99']).pop().match(/[\d.]+/)[0]);
const sil = ff(['-i', f, '-af', 'silencedetect=n=-40dB:d=0.5', '-f', 'null', '-']);
const gaps = [...sil.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]).filter((s) => s < dur - 1);

const rows = [
  ['Length 2:00–2:58', dur >= 120 && dur <= 178, `${Math.floor(dur / 60)}:${String(Math.round(dur % 60)).padStart(2, '0')}`],
  ['Visual events ≥ 1.5 / s', evRate >= 1.5, `${evRate.toFixed(2)} / s (one every ${(1 / evRate).toFixed(2)} s) · refs 1.5–2.6`],
  ['Longest still ≤ 2.5 s', longestStill <= 2.5, `${longestStill.toFixed(1)} s · refs 1.2–2.4`],
  ['Near-still frames 55–80 %', still / scores.length >= 0.55 && still / scores.length <= 0.8, `${Math.round((still / scores.length) * 100)} % · refs 67–72 % (bursts, then holds)`],
  ['No hard cuts', cuts.length === 0, cuts.length ? `cuts at ${cuts.slice(0, 6).join(', ')}` : 'none'],
  ['Audio track present', hasAudio, hasAudio ? 'yes' : 'NO AUDIO STREAM'],
  ['Loudness −14 ±0.5 LUFS', hasAudio && Math.abs(I + 14) <= 0.5, `${I} LUFS`],
  ['LRA ≤ 3 LU', LRA <= 3, `${LRA} LU · refs 1.2–1.5`],
  ['No silence ≥ 0.5 s (bed always on)', hasAudio && gaps.length === 0, gaps.length ? `at ${gaps.slice(0, 5).map((g) => g.toFixed(1)).join(', ')} s` : 'none'],
];
console.log(`\nQA ${f}`);
for (const [name, ok, val] of rows) console.log(`  ${ok ? '✓' : '✗'} ${name.padEnd(36)} ${val}`);
const fail = rows.filter(([, ok]) => !ok).length;
console.log(fail ? `\n${fail} gate(s) failed: fix before delivering.` : '\nAll gates passed.');
process.exit(fail ? 1 : 0);
