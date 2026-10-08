import fs from 'fs';
const K = fs.readFileSync('.xi','utf8').trim();
const list = {
  whoosh: ['fast clean airy whoosh transition, modern motion graphics, short', 0.7],
  swish: ['quick light swish swipe, UI motion graphics, very short', 0.4],
  pop: ['bright cute bubbly pop, mobile game UI element appearing, short and clean', 0.3],
  pop2: ['soft playful plop pop, cartoon UI, high pitch, short', 0.3],
  coin: ['mobile game coin collect ding, bright sparkly, clean', 0.8],
  success: ['mobile learning app correct answer success chime, happy two-note ding', 1.0],
  typing: ['fast mechanical keyboard typing, crisp clicks, clean, no room noise', 1.6],
  chest: ['treasure chest opening with magical sparkle shimmer burst, mobile game reward', 1.6],
  notify: ['friendly notification bell ping, modern smartphone app, clean', 0.8],
  cheer: ['small group of friends cheering and clapping excitedly, short', 1.6],
  shimmer: ['magical sparkle shimmer glint, logo reveal, bright', 1.2],
  slam: ['punchy deep cinematic hit with short whoosh in, trailer logo slam, clean', 1.2],
  tick: ['tiny soft UI tick click, very short', 0.2],
  levelup: ['mobile game level up fanfare arpeggio, short, bright synth', 1.4],
};
for (const [k, [text, d]] of Object.entries(list)) {
  if (fs.existsSync(`audio/sfx/${k}.mp3`)) continue;
  const r = await fetch('https://api.elevenlabs.io/v1/sound-generation', { method:'POST', headers:{'xi-api-key':K,'Content-Type':'application/json'}, body: JSON.stringify({ text, duration_seconds: Math.max(0.5, d), prompt_influence: 0.6 })});
  if (!r.ok) { console.log(k, r.status, await r.text()); continue; }
  fs.writeFileSync(`audio/sfx/${k}.mp3`, Buffer.from(await r.arrayBuffer())); console.log('ok', k);
}
