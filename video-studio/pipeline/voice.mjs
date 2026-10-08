// Voice pipeline for the explainer format (docs/SOCIAL_VIDEO_REFERENCE_ANALYSIS.md §3).
//
//   node pipeline/voice.mjs <slug>                 generate / reuse every line, build the VO stem + timing data
//   node pipeline/voice.mjs <slug> --redo h1,c7    force a new take of those lines (e.g. "Teyro" misheard)
//   node pipeline/voice.mjs <slug> --stt           also transcribe every line that says "Teyro" (pronunciation check)
//
// Input:  src/videos/<slug>/script.json  { voice, model, lines: [{ id, text }] }
//         In text, *word* marks an accent word (red serif on screen) and " | " forces a caption break.
//         Both are stripped before TTS.
// Output: public/videos/<slug>/vo.wav               (48 kHz mono, pauses tightened, lightly compressed)
//         src/videos/<slug>/vo.json                 (word timings, line timings, per-frame lip-sync, pace)
// Cache:  work/<slug>/<id>.mp3 + .json              (only re-generated when the text/voice/model changes)
//
// The ElevenLabs key is NEVER stored: pass it for this command only, e.g.  XI_KEY=sk_... node pipeline/voice.mjs <slug>
// (the founder provides a fresh key each session; it is never written to disk, code, docs or logs).

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execFileSync, spawnSync } from 'child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const slug = process.argv[2];
if (!slug) { console.error('usage: node pipeline/voice.mjs <slug> [--redo id,id] [--stt]'); process.exit(1); }
const redo = new Set((process.argv.find((a, i) => process.argv[i - 1] === '--redo') ?? '').split(',').filter(Boolean));
const doStt = process.argv.includes('--stt');

const K = (process.env.XI_KEY ?? '').trim();
if (!K) { console.error('No ElevenLabs key: run with XI_KEY=<key> for this command (ask the founder for this session key).'); process.exit(1); }
const srcDir = path.join(ROOT, 'src/videos', slug);
const pubDir = path.join(ROOT, 'public/videos', slug);
const workDir = path.join(ROOT, 'work', slug);
for (const d of [pubDir, workDir]) fs.mkdirSync(d, { recursive: true });
const S = JSON.parse(fs.readFileSync(path.join(srcDir, 'script.json'), 'utf8'));
const FPS = S.fps ?? 30, SR = 48000;
const GAP = S.gap ?? 0.1;          // silence between lines (spec: 80–120 ms)
const MAX_PAUSE = 0.2;             // longer pauses inside a line get squeezed…
const KEEP_PAUSE = 0.14;           // …down to this (reference: no gap ≥ 250 ms anywhere)

const clean = (t) => t.replace(/\*/g, '').replace(/\s*\|\s*/g, ' ').replace(/\s+/g, ' ').trim();
// eleven_v3 ignores speed and adds long dramatic pauses (tested 2026-10-08), so this format uses multilingual_v2 at speed 1.15.
const settings = { stability: 0.45, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true, speed: S.speed ?? 1.15 };

async function tts(line, prev, next) {
  const text = clean(line.text);
  const ctx = S.model === 'eleven_v3' ? {} : { previous_text: prev ? clean(prev.text) : undefined, next_text: next ? clean(next.text) : undefined };
  const hash = crypto.createHash('sha1').update(JSON.stringify([text, S.voice, S.model, settings])).digest('hex').slice(0, 12);
  const mp3 = path.join(workDir, `${line.id}.mp3`), meta = path.join(workDir, `${line.id}.json`);
  if (!redo.has(line.id) && fs.existsSync(meta) && JSON.parse(fs.readFileSync(meta, 'utf8')).hash === hash) return { mp3, ...JSON.parse(fs.readFileSync(meta, 'utf8')) };
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${S.voice}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': K, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: S.model, voice_settings: settings, ...ctx }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`TTS ${line.id} failed: ${r.status} ${JSON.stringify(j.detail ?? j).slice(0, 300)}`);
  fs.writeFileSync(mp3, Buffer.from(j.audio_base64, 'base64'));
  const out = { hash, text, alignment: j.alignment };
  fs.writeFileSync(meta, JSON.stringify(out));
  console.log(`  tts ${line.id}: ${text.length} chars`);
  return { mp3, ...out };
}

async function stt(file) {
  const fd = new FormData(); fd.append('model_id', 'scribe_v1'); fd.append('file', new Blob([fs.readFileSync(file)]), 'a.mp3');
  const r = await fetch('https://api.elevenlabs.io/v1/speech-to-text', { method: 'POST', headers: { 'xi-api-key': K }, body: fd });
  const j = await r.json(); return j.text ?? JSON.stringify(j);
}

const pcmOf = (file) => {
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 });
  return new Float32Array(raw.buffer, raw.byteOffset, raw.length / 4);
};

// words from the character alignment, keeping the *accent* / | markup from the script text
function wordsOf(line, a) {
  const ch = a.characters, st = a.character_start_times_seconds, en = a.character_end_times_seconds;
  const ws = []; let w = null;
  for (let i = 0; i < ch.length; i++) {
    if (/\s/.test(ch[i])) { if (w) { ws.push(w); w = null; } continue; }
    if (!w) w = { text: '', s: st[i], e: en[i], chars: [] };
    w.text += ch[i]; w.e = en[i]; w.chars.push([ch[i], st[i], en[i]]);
  }
  if (w) ws.push(w);
  // markup tokens from the script, in the same order as the spoken words
  const tokens = line.text.replace(/\s*\|\s*/g, ' | ').split(/\s+/).filter(Boolean);
  let k = 0, brk = false;
  for (const t of tokens) {
    if (t === '|') { brk = true; continue; }
    if (!ws[k]) break;
    ws[k].accent = t.includes('*'); ws[k].brk = brk; brk = false; k++;
  }
  return ws;
}

const VIS = (c) => /[aäi]/.test(c) ? 'A' : /[ou]/.test(c) ? 'O' : /[ey]/.test(c) ? 'E' : /[mbp]/.test(c) ? 'M' : /[fv]/.test(c) ? 'F' : /w/.test(c) ? 'O' : /[a-z]/.test(c) ? 'C' : 'X';

const pieces = []; const allWords = []; const lines = []; let cursor = 0.12; // tiny lead-in
let spokenTime = 0, wordCount = 0;
for (const [li, line] of S.lines.entries()) {
  const take = await tts(line, S.lines[li - 1], S.lines[li + 1]);
  const pcm = pcmOf(take.mp3);
  const ws = wordsOf(line, take.alignment);
  // real pauses, measured in the audio (alignment timings can hide them)
  const takeDur = pcm.length / SR;
  const log = spawnSync('ffmpeg', ['-hide_banner', '-i', take.mp3, '-af', `silencedetect=n=-38dB:d=${MAX_PAUSE}`, '-f', 'null', '-'], { encoding: 'utf8' }).stderr;
  const starts = [...log.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]);
  const ends = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  const sil = starts.map((a, i) => [a, ends[i] ?? takeDur]);
  // trim leading / trailing silence, then squeeze every inner pause down to KEEP_PAUSE
  let t0 = Math.max(0, ws[0].s - 0.03), t1 = Math.min(takeDur, ws.at(-1).e + 0.07);
  for (const [a, b] of sil) {
    if (a <= 0.02) t0 = Math.max(t0, b - 0.03);
    if (b >= takeDur - 0.02) t1 = Math.min(t1, a + 0.06);
  }
  const cuts = [];
  for (const [a, b] of sil) {
    if (a <= t0 || b >= t1) continue;
    const mid = (a + b) / 2, rm = (b - a) - KEEP_PAUSE;
    cuts.push([mid - rm / 2, mid + rm / 2]);
  }
  const removedBefore = (t) => cuts.reduce((acc, [a, b]) => acc + (t >= b ? b - a : t > a ? t - a : 0), 0);
  const map = (t) => cursor + (t - t0) - removedBefore(t);
  // assemble the kept audio
  const keep = []; let from = t0;
  for (const [a, b] of cuts) { keep.push([from, a]); from = b; }
  keep.push([from, t1]);
  for (const [a, b] of keep) pieces.push(pcm.subarray(Math.floor(a * SR), Math.min(pcm.length, Math.floor(b * SR))));
  const dur = keep.reduce((s, [a, b]) => s + (b - a), 0);
  for (const w of ws) allWords.push({ w: w.text, s: +map(w.s).toFixed(3), e: +map(w.e).toFixed(3), line: line.id, accent: !!w.accent, brk: !!w.brk, chars: w.chars.map(([c, s, e]) => [c, map(s), map(e)]) });
  lines.push({ id: line.id, start: +cursor.toFixed(3), end: +(cursor + dur).toFixed(3), text: clean(line.text) });
  spokenTime += dur; wordCount += ws.length;
  cursor += dur;
  pieces.push(new Float32Array(Math.round(GAP * SR))); cursor += GAP;
  if (doStt && /teyro/i.test(line.text)) console.log(`  stt ${line.id}: "${await stt(take.mp3)}"`);
}

// stem
const total = pieces.reduce((s, p) => s + p.length, 0) + Math.round(0.5 * SR);
const stem = new Float32Array(total); let o = Math.round(0.12 * SR);
for (const p of pieces) { stem.set(p, o); o += p.length; }
const rawPath = path.join(workDir, 'vo_raw.f32');
fs.writeFileSync(rawPath, Buffer.from(stem.buffer));
execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'f32le', '-ar', String(SR), '-ac', '1', '-i', rawPath,
  '-af', 'highpass=f=80,equalizer=f=3200:t=q:w=1.2:g=2,acompressor=threshold=-22dB:ratio=3.5:attack=4:release=90:makeup=4dB,loudnorm=I=-15:TP=-1.5:LRA=4',
  '-ar', String(SR), '-c:a', 'pcm_s16le', path.join(pubDir, 'vo.wav')]);

// per-frame lip-sync from the processed stem
const fin = pcmOf(path.join(pubDir, 'vo.wav'));
const NF = Math.ceil((fin.length / SR) * FPS);
const amp = new Array(NF).fill(0); const vis = new Array(NF).fill('X');
for (let f = 0; f < NF; f++) {
  const a = Math.floor((f / FPS) * SR), b = Math.min(fin.length, Math.floor(((f + 1) / FPS) * SR));
  let s = 0; for (let i = a; i < b; i++) s += fin[i] * fin[i];
  amp[f] = Math.sqrt(s / Math.max(1, b - a));
}
const peak = Math.max(...amp) || 1;
for (let f = 0; f < NF; f++) amp[f] = +Math.min(1, (amp[f] / peak) * 1.6).toFixed(3);
for (const w of allWords) for (const [c, s, e] of w.chars) {
  const v = VIS(c.toLowerCase()); if (v === 'X') continue;
  for (let f = Math.floor(s * FPS); f < Math.ceil(e * FPS) && f < NF; f++) vis[f] = v;
}

const pace = wordCount / spokenTime;
const out = {
  fps: FPS, duration: +(fin.length / SR).toFixed(3), pace: +pace.toFixed(2), words: allWords.map(({ chars, ...w }) => w), lines,
  lip: { amp, vis: vis.join('') },
};
fs.writeFileSync(path.join(srcDir, 'vo.json'), JSON.stringify(out));
const ok = pace >= 3.3 && pace <= 4.1;
console.log(`\n${slug}: ${wordCount} words, ${out.duration}s total, pace ${pace.toFixed(2)} w/s ${ok ? '✓ inside 3.3–4.1' : '✗ OUTSIDE 3.3–4.1'}`);
