// Scans a rendered film for the GPU texture glitch that paints the app icon with pink noise.
// The real icon is blue, white and navy, so a crop with many magenta-ish pixels means a bad frame.
//   node pipeline/showreel/check-icon.mjs <video.mp4> <from>-<to>@x,y,w,h ...
// Prints each bad second; exits 1 if any frame fails.
import { execFileSync } from 'child_process';

const [video, ...wins] = process.argv.slice(2);
let bad = 0;
for (const w of wins) {
  const [range, box] = w.split('@');
  const [a, b] = range.split('-').map(Number);
  const [x, y, cw, ch] = box.split(',').map(Number);
  const W = 96, H = Math.round((ch / cw) * W), FPS = 10;
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-ss', String(a), '-to', String(b), '-i', video, '-vf', `fps=${FPS},crop=${cw}:${ch}:${x}:${y},scale=${W}:${H}`, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], { maxBuffer: 1 << 30 });
  const per = W * H * 3;
  for (let f = 0; f * per < raw.length; f++) {
    let pink = 0;
    for (let i = f * per; i < (f + 1) * per; i += 3) {
      const r = raw[i], g = raw[i + 1], bl = raw[i + 2];
      if (r > 190 && bl > 140 && g < r - 50) pink++;
    }
    const share = pink / (W * H);
    if (share > 0.012) { bad++; console.log(`  bad  ${(a + f / FPS).toFixed(1)}s  pink ${(share * 100).toFixed(1)}%`); }
  }
}
console.log(bad ? `${bad} bad frames` : 'clean');
process.exit(bad ? 1 : 0);
