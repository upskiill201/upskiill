import { KokoroTTS } from 'kokoro-js';
import fs from 'fs';

const t0 = Date.now();
const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' });
console.log('model loaded in', ((Date.now() - t0) / 1000).toFixed(1), 's');
console.log('voices:', Object.keys(tts.voices).join(', '));
const t1 = Date.now();
const audio = await tts.generate('Teyro is the fun way to finish learning coding and AI.', { voice: 'am_michael' });
audio.save('smoke.wav');
console.log('generated', (fs.statSync('smoke.wav').size / 1024).toFixed(0), 'KB in', ((Date.now() - t1) / 1000).toFixed(1), 's');
