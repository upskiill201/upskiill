// Review sheets: N evenly spaced stills per composition, one bundle for all.
//   node pipeline/review.mjs <CompId> [<CompId> …]   → out/review-<CompId>.png (8 columns × 2 rows)
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'child_process';
import fs from 'fs'; import path from 'path';

const ids = process.argv.slice(2);
const N = +(process.env.N || 16), COLS = 8;
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
fs.mkdirSync('out/st', { recursive: true });
for (const id of ids) {
  const comp = await selectComposition({ serveUrl, id });
  const files = [];
  for (let i = 0; i < N; i++) {
    const frame = Math.round(((i + 0.5) / N) * (comp.durationInFrames - 1));
    const f = `out/st/${id}-${i}.png`;
    await renderStill({ serveUrl, composition: comp, frame, output: f, scale: 0.25, chromiumOptions: { gl: 'angle' } });
    files.push([f, (frame / comp.fps).toFixed(1)]);
  }
  const rows = Math.ceil(N / COLS);
  execFileSync('ffmpeg', ['-y', '-v', 'error', ...files.flatMap(([f]) => ['-i', f]), '-filter_complex',
    files.map(([, s], i) => `[${i}]drawtext=text='${s}s':x=6:y=6:fontsize=20:fontcolor=white:box=1:boxcolor=black@0.6[v${i}]`).join(';') + ';' +
    files.map((_, i) => `[v${i}]`).join('') + `xstack=inputs=${N}:layout=` + files.map((_, i) => `${(i % COLS) ? Array.from({ length: i % COLS }, () => 'w0').join('+') : '0'}_${Math.floor(i / COLS) ? Array.from({ length: Math.floor(i / COLS) }, () => 'h0').join('+') : '0'}`).join('|'),
    `out/review-${id}.png`]);
  console.log('wrote', `out/review-${id}.png`, rows, 'rows');
}
