// Motion Explainer SFX library (§4), generated ONCE per machine with ElevenLabs sound generation.
//   XI_KEY=<key> node pipeline/motion/sfx.mjs            → public/motion/sfx/<name>.mp3 (skips files that exist)
//   XI_KEY=<key> node pipeline/motion/sfx.mjs --redo boom,riser
// Names must match SFX_NAMES in src/motion/kit/Sound.tsx. The ElevenLabs key is NEVER stored.
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const K = (process.env.XI_KEY ?? '').trim();
if (!K) { console.error('No ElevenLabs key: run with XI_KEY=<key> for this command.'); process.exit(1); }
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const dir = path.join(ROOT, 'public/motion/sfx'); fs.mkdirSync(dir, { recursive: true });
const redo = new Set((process.argv.find((a, i) => process.argv[i - 1] === '--redo') ?? '').split(',').filter(Boolean));

// [name, seconds, prompt]: clean, dry, UI-style; nothing musical so it sits under any bed
const LIB = [
  ['tick', 0.5, 'single soft UI tick, crisp short click, clean interface sound, no reverb'],
  ['pop', 0.5, 'soft bubbly UI pop, element appearing on screen, short and clean'],
  ['whoosh', 1.0, 'smooth soft air whoosh, camera pan transition, gentle and clean'],
  ['riser', 1.0, 'short rising synth sweep riser building into a reveal, clean, ends abruptly'],
  ['boom', 1.5, 'deep cinematic sub boom impact hit, soft low thud, clean tail, no music'],
  ['error', 0.6, 'short muted digital error buzz, low two-tone UI warning, not harsh'],
  ['success', 0.8, 'bright gentle success chime, two rising soft bell notes, UI confirmation'],
  ['count', 0.5, 'fast soft digital counter ticking, numbers rolling up, short'],
  ['type', 1.0, 'quick soft keyboard typing burst, a few keystrokes, clean'],
  ['shatter', 0.9, 'digital block breaking into small pieces, soft glassy crumble, short, clean'],
  ['swoosh', 0.6, 'quick small swoosh, card sliding in, soft and clean'],
  ['glitch', 0.6, 'short soft digital glitch stutter, data scramble, clean'],
  ['chime', 1.0, 'soft warm notification chime, single pleasant ping, clean'],
];

for (const [name, dur, text] of LIB) {
  const f = path.join(dir, `${name}.mp3`);
  if (fs.existsSync(f) && !redo.has(name)) { console.log(`  · ${name} (exists)`); continue; }
  const r = await fetch('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128', {
    method: 'POST', headers: { 'xi-api-key': K, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, duration_seconds: dur, prompt_influence: 0.6 }),
  });
  if (!r.ok) { console.error(`  ✗ ${name}: ${r.status} ${(await r.text()).slice(0, 200)}`); process.exitCode = 1; continue; }
  const raw = path.join(dir, `${name}.raw.mp3`);
  fs.writeFileSync(raw, Buffer.from(await r.arrayBuffer()));
  // trim leading silence and normalise peaks so the per-sound levels in Sound.tsx stay meaningful
  const enc = (af) => execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', raw, '-af', af, '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '160k', f]);
  enc('silenceremove=start_periods=1:start_threshold=-60dB:start_silence=0.02,alimiter=limit=0.9,loudnorm=I=-16:TP=-1.5');
  // very short sounds (ticks) can get trimmed to nothing: fall back to the untrimmed take
  if (fs.statSync(f).size < 3000) enc('alimiter=limit=0.9,loudnorm=I=-16:TP=-1.5');
  fs.unlinkSync(raw);
  console.log(`  ✓ ${name}`);
}
