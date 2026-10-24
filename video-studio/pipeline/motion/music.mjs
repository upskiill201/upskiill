// Ambient music bed for one Motion Explainer (§4: a soft bed under the voice the whole time, never silent).
//   XI_KEY=<key> node pipeline/motion/music.mjs <slug> [--redo]
// 1. Composes an original instrumental with the ElevenLabs Music API (paid plan) at the voice length + 3 s,
//    using script.json "music" (a prompt) or the default for the video's look.   → work/motion/<slug>/music.mp3
// 2. Builds the bed: fades, then ducks it under the voice (sidechain) so it sits ~20–24 dB below speech.
//                                                                                  → public/motion/videos/<slug>/bed.wav
// Run after pipeline/motion/voice.mjs (it needs vo.wav). The ElevenLabs key is NEVER stored.
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const K = (process.env.XI_KEY ?? '').trim();
const slug = process.argv[2];
if (!slug) { console.error('usage: node pipeline/motion/music.mjs <slug> [--redo]'); process.exit(1); }
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const srcDir = path.join(ROOT, 'src/motion/videos', slug), pubDir = path.join(ROOT, 'public/motion/videos', slug), workDir = path.join(ROOT, 'work/motion', slug);
fs.mkdirSync(workDir, { recursive: true });
const S = JSON.parse(fs.readFileSync(path.join(srcDir, 'script.json'), 'utf8'));
const vo = JSON.parse(fs.readFileSync(path.join(srcDir, 'vo.json'), 'utf8'));
const voWav = path.join(pubDir, 'vo.wav');
if (!fs.existsSync(voWav)) { console.error('vo.wav missing: run pipeline/motion/voice.mjs first'); process.exit(1); }

const DEFAULT = {
  night: 'calm ambient electronic bed, warm analog pads, soft sub bass, very light slow pulse, no drums, no melody hooks, no vocals, background music for a narrated explainer',
  neon: 'soft synthwave ambient bed, warm retro pads, gentle arpeggio far in the background, no drums, no vocals, background music for a narrated tech explainer',
  lab: 'light lo-fi ambient bed around 100 bpm, soft muted keys, gentle brushed beat very low in the mix, no vocals, calm and curious, background for a narrated science explainer',
  blueprint: 'minimal ambient tech bed, soft pads and light plucks, subtle low pulse, no drums, no vocals, focused and calm, background for a narrated engineering explainer',
};
const prompt = S.music ?? DEFAULT[S.look ?? 'blueprint'];
const lenMs = Math.min(300000, Math.max(10000, Math.ceil((vo.duration + 3) * 1000)));
const mp3 = path.join(workDir, 'music.mp3');

if (!fs.existsSync(mp3) || process.argv.includes('--redo')) {
  if (!K) { console.error('No ElevenLabs key: run with XI_KEY=<key> for this command.'); process.exit(1); }
  const call = (body) => fetch('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128', { method: 'POST', headers: { 'xi-api-key': K, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  let r = await call({ prompt, music_length_ms: lenMs, model_id: 'music_v1', force_instrumental: true });
  if (r.status === 422 || r.status === 400) r = await call({ prompt, music_length_ms: lenMs, model_id: 'music_v1' });  // older API without force_instrumental
  if (!r.ok) {
    const msg = (await r.text()).slice(0, 300);
    console.error(`Music API failed: ${r.status} ${msg}`);
    if (/paid|plan|subscription/i.test(msg)) console.error('→ The Music API needs a paid ElevenLabs plan. Tell the person running the session; do not work around it.');
    process.exit(1);
  }
  fs.writeFileSync(mp3, Buffer.from(await r.arrayBuffer()));
  console.log(`  composed ${(lenMs / 1000).toFixed(0)} s bed: "${prompt.slice(0, 70)}…"`);
}

// bed = music trimmed to the video, faded, lowered, then ducked under the voice
const dur = vo.duration + 0.6;
execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', mp3, '-i', voWav, '-filter_complex',
  `[0:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:${dur},asetpts=N/SR/TB,afade=t=in:d=0.4,afade=t=out:st=${(dur - 1.2).toFixed(2)}:d=1.2,volume=-17dB[m];` +
  `[1:a]aresample=48000,aformat=channel_layouts=stereo,asplit=2[sc][v];[v]anullsink;` +
  `[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=15:release=350:makeup=1[bed]`,
  '-map', '[bed]', '-c:a', 'pcm_s16le', path.join(pubDir, 'bed.wav')]);
console.log(`${slug}: bed.wav ready (${dur.toFixed(1)} s, ducked under the voice)`);
