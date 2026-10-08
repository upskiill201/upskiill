// usage: node stills.mjs out/name.png t1 t2 ...  (seconds) → contact sheet
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'child_process';
import fs from 'fs'; import path from 'path';
const [outFile, ...times] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const comp = await selectComposition({ serveUrl, id: process.env.COMP || 'Reel' });
fs.mkdirSync('out/st', { recursive: true });
const files = [];
for (const [i, s] of times.entries()) {
  const f = `out/st/${i}.png`;
  await renderStill({ serveUrl, composition: comp, frame: Math.round(+s * comp.fps), output: f, scale: +(process.env.SCALE || 0.4), chromiumOptions: { gl: 'angle' } });
  files.push(f);
}
const cols = Math.min(process.env.COLS ? +process.env.COLS : 4, files.length), rows = Math.ceil(files.length / cols);
execFileSync('ffmpeg', ['-y', '-v', 'error', ...files.flatMap(f => ['-i', f]), '-filter_complex',
  files.map((_, i) => `[${i}]drawtext=text='${times[i]}s':x=10:y=10:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.6[v${i}]`).join(';') + ';' +
  files.map((_, i) => `[v${i}]`).join('') + `xstack=inputs=${files.length}:layout=` + files.map((_, i) => `${(i % cols) ? Array.from({length: i % cols}, () => 'w0').join('+') : '0'}_${Math.floor(i / cols) ? Array.from({length: Math.floor(i / cols)}, () => 'h0').join('+') : '0'}`).join('|') + (files.length < cols * rows ? ':fill=black' : ''),
  outFile]);
console.log('wrote', outFile);
