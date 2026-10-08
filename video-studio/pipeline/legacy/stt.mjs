import fs from 'fs';
const K = fs.readFileSync('.xi','utf8').trim();
for (const f of process.argv.slice(2)) {
  const fd = new FormData(); fd.append('model_id','scribe_v1'); fd.append('file', new Blob([fs.readFileSync(f)]), 'a.mp3');
  const r = await fetch('https://api.elevenlabs.io/v1/speech-to-text',{method:'POST',headers:{'xi-api-key':K},body:fd});
  const j = await r.json(); console.log(f, '=>', j.text ?? JSON.stringify(j));
}
