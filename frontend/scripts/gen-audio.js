const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/assets/sounds/ui');
const outputFile = path.join(__dirname, '../lib/audio/soundData.ts');

const files = fs.readdirSync(dir);
let entries = [];

files.forEach(file => {
  if (file.endsWith('.mp3')) {
    const key = file.replace('.mp3', '');
    const buf = fs.readFileSync(path.join(dir, file));
    const base64 = buf.toString('base64');
    entries.push(`  '${key}': 'data:audio/mp3;base64,${base64}'`);
  }
});

const content = `/** Base64 Embedded Audio Data for Zero-Latency & Anti-Download Protection */\nexport const EMBEDDED_SOUND_DATA: Record<string, string> = {\n${entries.join(',\n')}\n};\n`;

fs.writeFileSync(outputFile, content);
console.log('Successfully generated soundData.ts with Base64 audio!');
