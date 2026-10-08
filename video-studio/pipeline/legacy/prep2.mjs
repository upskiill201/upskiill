// Build the VO stem + per-frame lip-sync data + word timings from timeline.json.
import fs from 'fs'; import { execFileSync } from 'child_process';
const T = JSON.parse(fs.readFileSync(process.argv[2] || 'timeline.json','utf8'));
const FPS = T.fps, NF = T.duration * FPS, SR = 48000;
const stem = new Float32Array(SR * T.duration);
const amp = new Float32Array(NF), vis = new Array(NF).fill('X');
const words = [];
const VIS = c => /[aäi]/.test(c) ? 'A' : /[ou]/.test(c) ? 'O' : /[ey]/.test(c) ? 'E' : /[mbp]/.test(c) ? 'M' : /[fv]/.test(c) ? 'F' : /[w]/.test(c) ? 'O' : /[a-z]/.test(c) ? 'C' : 'X';
for (const l of T.vo) {
  const raw = execFileSync('ffmpeg', ['-v','error','-i',`audio/${l.file}`,'-ac','1','-ar',String(SR),'-f','f32le','-'], { maxBuffer: 1<<28 });
  const pcm = new Float32Array(raw.buffer, raw.byteOffset, raw.length / 4);
  const off = Math.round(l.at * SR);
  for (let i = 0; i < pcm.length && off + i < stem.length; i++) stem[off + i] += pcm[i];
  l.dur = pcm.length / SR;
  const a = JSON.parse(fs.readFileSync(`audio/${l.file.replace('.mp3','.json')}`,'utf8'));
  const ch = a.characters, st = a.character_start_times_seconds, en = a.character_end_times_seconds;
  // strip [tags]
  let inTag = false, w = null;
  for (let i = 0; i < ch.length; i++) {
    const c = ch[i];
    if (c === '[') { inTag = true; continue; } if (c === ']') { inTag = false; continue; } if (inTag) continue;
    const g0 = l.at + st[i], g1 = l.at + en[i];
    if (/[\w'’.,!?…-]/.test(c) && c !== ' ') {
      if (!w) w = { line: l.id, text: '', start: g0, end: g1 };
      w.text += c; w.end = g1;
    } else if (w) { words.push(w); w = null; }
    const v = VIS(c.toLowerCase());
    for (let f = Math.floor(g0 * FPS); f < Math.ceil(g1 * FPS) && f < NF; f++) if (v !== 'X') vis[f] = v;
  }
  if (w) words.push(w);
}
// RMS per frame (window 2 frames), normalised
for (let f = 0; f < NF; f++) {
  const c = Math.round((f + 0.5) / FPS * SR), h = Math.round(SR / FPS);
  let e = 0; for (let i = c - h; i < c + h; i++) if (i >= 0 && i < stem.length) e += stem[i] * stem[i];
  amp[f] = Math.sqrt(e / (2 * h));
}
let mx = 0; for (const v of amp) mx = Math.max(mx, v);
const ampN = Array.from(amp, v => +Math.min(1, Math.pow(v / (mx * 0.6), 0.8)).toFixed(3));
// silence -> rest mouth
for (let f = 0; f < NF; f++) if (ampN[f] < 0.06) vis[f] = 'X';
// write stem wav
const N = stem.length, buf = Buffer.alloc(44 + N * 2);
buf.write('RIFF',0); buf.writeUInt32LE(36+N*2,4); buf.write('WAVEfmt ',8); buf.writeUInt32LE(16,16); buf.writeUInt16LE(1,20); buf.writeUInt16LE(1,22);
buf.writeUInt32LE(SR,24); buf.writeUInt32LE(SR*2,28); buf.writeUInt16LE(2,32); buf.writeUInt16LE(16,34); buf.write('data',36); buf.writeUInt32LE(N*2,40);
for (let i = 0; i < N; i++) buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, stem[i])) * 32767), 44 + i * 2);
fs.writeFileSync((process.argv[4] || 'audio/vo_stem.wav'), buf);
fs.mkdirSync('reel/src/data', { recursive: true });
fs.writeFileSync((process.argv[3] || 'reel/src/data') + '/lipsync.json', JSON.stringify({ amp: ampN, vis: vis.join('') }));
fs.writeFileSync((process.argv[3] || 'reel/src/data') + '/words.json', JSON.stringify(words.map(w => ({ ...w, start: +w.start.toFixed(3), end: +w.end.toFixed(3) }))));
fs.writeFileSync((process.argv[3] || 'reel/src/data') + '/timeline.json', JSON.stringify({ ...T, kicks: JSON.parse(fs.readFileSync((process.argv[5] || 'audio/kicks.json'),'utf8')) }));
console.log('words', words.length); for (const l of T.vo) console.log(l.id, l.at, '→', (l.at + l.dur).toFixed(2));
