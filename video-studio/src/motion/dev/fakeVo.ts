import { VO } from '../kit';

/**
 * Synthetic voice-over timings for kit demos (no ElevenLabs call): 3.5 words/s, 0.2 s between lines,
 * fake lip data. Real videos always use pipeline/motion/voice.mjs output.
 */
export const fakeVO = (lines: { id: string; text: string }[], fps = 30): VO => {
  let t = 0.15; const words: VO['words'] = []; const out: VO['lines'] = [];
  for (const l of lines) {
    const start = t;
    const tokens = l.text.replace(/\s*\|\s*/g, ' | ').split(/\s+/).filter(Boolean);
    let brk = false;
    for (const tok of tokens) {
      if (tok === '|') { brk = true; continue; }
      const d = 0.2 + Math.min(0.25, tok.length * 0.018);
      words.push({ w: tok.replace(/\*/g, ''), s: +t.toFixed(3), e: +(t + d * 0.92).toFixed(3), line: l.id, accent: tok.includes('*'), brk });
      brk = false; t += d;
    }
    out.push({ id: l.id, start, end: t, text: l.text });
    t += 0.2;
  }
  const duration = t + 0.5; const n = Math.ceil(duration * fps);
  const amp: number[] = []; let vis = '';
  for (let f = 0; f < n; f++) {
    const s = f / fps; const w = words.find((x) => s >= x.s && s < x.e);
    amp.push(w ? 0.35 + 0.5 * Math.abs(Math.sin(f * 1.7)) : 0);
    vis += w ? 'AOECMA'[f % 6] : 'X';
  }
  return { fps, duration, pace: 3.5, words, lines: out, lip: { amp, vis } };
};
