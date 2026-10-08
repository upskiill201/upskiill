import fs from 'fs';
const K = fs.readFileSync('.xi','utf8').trim();
const [,, id, voice, model, text, prev='', next=''] = process.argv;
const body = { text, model_id: model, voice_settings: { stability: model==='eleven_v3'?0.5:0.35, similarity_boost: 0.8, style: 0.45, use_speaker_boost: true } };
if (model !== 'eleven_v3') { if (prev) body.previous_text = prev; if (next) body.next_text = next; }
const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`, { method:'POST', headers:{'xi-api-key':K,'Content-Type':'application/json'}, body: JSON.stringify(body)});
const j = await r.json();
if (!r.ok) { console.log(r.status, JSON.stringify(j)); process.exitCode=1; throw new Error("tts failed"); }
fs.writeFileSync(`audio/vo_${id}.mp3`, Buffer.from(j.audio_base64,'base64'));
fs.writeFileSync(`audio/vo_${id}.json`, JSON.stringify(j.alignment));
const a = j.alignment; console.log(id, 'dur', a.character_end_times_seconds.at(-1));
