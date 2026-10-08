// Finish a rendered explainer for upload (docs §10):
//   node pipeline/finish.mjs <rendered.mp4> <deliverable-dir> <slug> [coverSeconds]
// → <dir>/<slug>.mp4  (video stream copied; audio 2-pass loudnorm to −14 LUFS / −1 dBTP, AAC 192k)
//   <dir>/cover.jpg   (frame at coverSeconds, default 0.6 s, i.e. the hook)
// and prints the QA numbers the checklist needs: duration, integrated loudness, longest silence.
import fs from 'fs';
import { execFileSync, spawnSync } from 'child_process';

const [src, dir, slug, coverAt = '0.6'] = process.argv.slice(2);
if (!src || !dir || !slug) { console.error('usage: node pipeline/finish.mjs <rendered.mp4> <dir> <slug> [coverSeconds]'); process.exit(1); }
fs.mkdirSync(dir, { recursive: true });
const out = `${dir}/${slug}.mp4`;

const ff = (args) => spawnSync('ffmpeg', ['-hide_banner', ...args], { encoding: 'utf8', maxBuffer: 1 << 26 }).stderr;
// pass 1: measure
const m = ff(['-i', src, '-af', 'loudnorm=I=-14:TP=-1:LRA=7:print_format=json', '-f', 'null', '-']);
const j = JSON.parse(m.slice(m.lastIndexOf('{'), m.lastIndexOf('}') + 1));
// pass 2: apply
execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', src, '-c:v', 'copy', '-af',
  `loudnorm=I=-14:TP=-1:LRA=7:measured_I=${j.input_i}:measured_TP=${j.input_tp}:measured_LRA=${j.input_lra}:measured_thresh=${j.input_thresh}:offset=${j.target_offset}:linear=true`,
  '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', out]);
execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', coverAt, '-i', out, '-frames:v', '1', '-q:v', '2', `${dir}/cover.jpg`]);

// QA
const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out], { encoding: 'utf8' }).trim();
const r = ff(['-i', out, '-af', 'ebur128', '-f', 'null', '-']);
const I = (r.match(/I:\s+(-?[\d.]+) LUFS/g) ?? []).pop();
const s = ff(['-i', out, '-af', 'silencedetect=n=-35dB:d=0.25', '-f', 'null', '-']);
const gaps = [...s.matchAll(/silence_start: ([\d.]+)[\s\S]*?silence_duration: ([\d.]+)/g)].map((g) => [+g[1], +g[2]]).filter(([st]) => st < dur - 0.8);
console.log(`${out}\n  duration ${dur.toFixed(2)} s · loudness ${I} · silences ≥250 ms before the tail: ${gaps.length ? gaps.map(([a, d]) => `${a.toFixed(2)}s (${d.toFixed(2)})`).join(', ') : 'none ✓'}`);
