// Review sheet for a motion explainer (or the kit demo): N evenly spaced stills, or explicit seconds.
//   node pipeline/motion/review.mjs <CompId> [sec,sec,…]   → out/review-<CompId>.png (6 columns)
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'child_process';
import fs from 'fs'; import path from 'path';

const [id, secsArg] = process.argv.slice(2);
if (!id) { console.error('usage: node pipeline/motion/review.mjs <CompId> [sec,sec,…]'); process.exit(1); }
const COLS = 6;
const serveUrl = await bundle({ entryPoint: path.resolve('src/motion/index.ts') });
const comp = await selectComposition({ serveUrl, id });
const total = comp.durationInFrames / comp.fps;
const secs = secsArg ? secsArg.split(',').map(Number) : Array.from({ length: +(process.env.N || 18) }, (_, i) => ((i + 0.5) / +(process.env.N || 18)) * total);
fs.mkdirSync('out/st', { recursive: true });
const files = [];
for (const [i, s] of secs.entries()) {
  const f = `out/st/${id}-${i}.png`;
  await renderStill({ serveUrl, composition: comp, frame: Math.min(comp.durationInFrames - 1, Math.round(s * comp.fps)), output: f, scale: 0.3, chromiumOptions: { gl: 'angle' } });
  files.push([f, s.toFixed(1)]);
}
const N = files.length;
execFileSync('ffmpeg', ['-y', '-v', 'error', ...files.flatMap(([f]) => ['-i', f]), '-filter_complex',
  files.map(([, s], i) => `[${i}]drawtext=text='${s}s':x=6:y=6:fontsize=22:fontcolor=white:box=1:boxcolor=black@0.6[v${i}]`).join(';') + ';' +
  files.map((_, i) => `[v${i}]`).join('') + `xstack=inputs=${N}:fill=black:layout=` + files.map((_, i) => `${(i % COLS) ? Array.from({ length: i % COLS }, () => 'w0').join('+') : '0'}_${Math.floor(i / COLS) ? Array.from({ length: Math.floor(i / COLS) }, () => 'h0').join('+') : '0'}`).join('|'),
  `out/review-${id}.png`]);
console.log(`wrote out/review-${id}.png (${N} stills over ${total.toFixed(1)} s)`);
