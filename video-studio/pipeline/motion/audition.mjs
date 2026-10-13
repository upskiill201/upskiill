// One-time male narrator audition for the Motion Explainer series (§4: male narrator, founder 2026-10-09).
//   XI_KEY=<key> node pipeline/motion/audition.mjs            → deliverables/_audition/<name>.mp3 + all.mp3 (names announced)
//   XI_KEY=<key> node pipeline/motion/audition.mjs <voiceId>  → audition one extra voice id
// The founder listens and picks one; its id goes into every script.json ("voice") and into the skill doc.
// The ElevenLabs key is NEVER stored.
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const K = (process.env.XI_KEY ?? '').trim();
if (!K) { console.error('No ElevenLabs key: run with XI_KEY=<key> for this command.'); process.exit(1); }
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const out = path.join(ROOT, 'deliverables/_audition'); fs.mkdirSync(out, { recursive: true });

// ElevenLabs premade male voices (calm, precise, friendly narration candidates)
const CANDIDATES = process.argv[2] ? [['custom', process.argv[2]]] : [
  ['Brian', 'nPczCjzI2devNBz1zQrb'], ['Eric', 'cjVigY5qzO86Huf0OWal'], ['Chris', 'iP95p4xoKVk53GoZ742B'],
  ['Will', 'bIHbv24MWmeRgasZH58o'], ['Liam', 'TX3LPaxmHKxFdv7VOQHJ'], ['Daniel', 'onwK4e9ZLuTAKqWW03F9'],
];
// Written in the reference style (§5.2): a title, a concept-first-name-second beat, a rapid Q→A burst, a punchline.
const SAMPLE = 'Tokens, explained. Every time you talk to an AI, a meter is running. Your message gets cut into small pieces, and each one gets a number. That is a token. Long chat? You pay again. Same question? Cache it. Because with AI, you are not paying for answers. You are paying for tokens.';

const files = [];
for (const [name, id] of CANDIDATES) {
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': K, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: SAMPLE, model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true, speed: 1.08 } }),
  });
  if (!r.ok) { console.log(`  ✗ ${name} (${id}): ${r.status} ${(await r.text()).slice(0, 160)}`); continue; }
  const f = path.join(out, `${name}.mp3`); fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
  const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' });
  const words = SAMPLE.split(/\s+/).length;
  console.log(`  ✓ ${name.padEnd(7)} ${id}  ${dur.toFixed(1)} s  ${(words / dur).toFixed(2)} w/s`);
  files.push(f);
}
if (files.length > 1) {
  // one file to listen to: 0.8 s of silence between voices, in the order printed above
  const list = path.join(out, 'list.txt');
  const gap = path.join(out, 'gap.mp3');
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', '0.8', '-c:a', 'libmp3lame', '-b:a', '128k', gap]);
  fs.writeFileSync(list, files.flatMap((f) => [`file '${f.replace(/\\/g, '/')}'`, `file '${gap.replace(/\\/g, '/')}'`]).join('\n'));
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', path.join(out, 'all.mp3')]);
  console.log(`\nall voices in one file: ${path.join(out, 'all.mp3')}`);
}
