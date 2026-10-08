import fs from 'fs';
const K = fs.readFileSync('.xi','utf8').trim();
const list = {
  glitch: ['short digital glitch stutter, futuristic UI, clean', 0.6],
  blip: ['tiny futuristic data blip beep, sci-fi UI, very short', 0.3],
  scan: ['futuristic hologram scan sweep, sci-fi interface, short', 1.0],
  datawhoosh: ['fast digital whoosh with data sparkle, tech transition', 0.8],
  power: ['sci-fi power up charge, short bright', 1.2],
  heartbeat: ['deep tense heartbeat thump single', 0.6],
};
for (const [k, [text, d]] of Object.entries(list)) {
  if (fs.existsSync(`audio/sfx/${k}.mp3`)) continue;
  const r = await fetch('https://api.elevenlabs.io/v1/sound-generation', { method:'POST', headers:{'xi-api-key':K,'Content-Type':'application/json'}, body: JSON.stringify({ text, duration_seconds: Math.max(0.5, d), prompt_influence: 0.6 })});
  if (!r.ok) { console.log(k, r.status, await r.text()); continue; }
  fs.writeFileSync(`audio/sfx/${k}.mp3`, Buffer.from(await r.arrayBuffer())); console.log('ok', k);
}
