/** Timing data written by pipeline/voice.mjs (src/videos/<slug>/vo.json). */
export type Word = { w: string; s: number; e: number; line: string; accent: boolean; brk: boolean };
export type VO = {
  fps: number; duration: number; pace: number;
  words: Word[];
  lines: { id: string; start: number; end: number; text: string }[];
  lip: { amp: number[]; vis: string };
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9'-]/g, '');

/** Start time of the n-th (1-based) spoken occurrence of `word`. Throws on a typo so cues never silently drift. */
export const at = (vo: VO, word: string, n = 1, field: 's' | 'e' = 's'): number => {
  const target = norm(word);
  let k = 0;
  for (const w of vo.words) if (norm(w.w) === target && ++k === n) return w[field];
  throw new Error(`cue word "${word}" #${n} not found in the voice-over`);
};
export const lineOf = (vo: VO, id: string) => {
  const l = vo.lines.find((x) => x.id === id);
  if (!l) throw new Error(`line ${id} not found`);
  return l;
};

/**
 * Caption chunks for the headline: a new chunk starts at every line, every " | " break in the script,
 * or when a chunk would run past ~11 words. Each chunk shows from its first word until the next chunk.
 */
export type Chunk = { words: Word[]; start: number; end: number };
export const chunksOf = (vo: VO): Chunk[] => {
  const out: Chunk[] = [];
  let cur: Word[] = [];
  vo.words.forEach((w, i) => {
    const prev = vo.words[i - 1];
    const newLine = !prev || prev.line !== w.line;
    if (cur.length && (newLine || w.brk || cur.length >= 11)) { out.push({ words: cur, start: cur[0].s, end: 0 }); cur = []; }
    cur.push(w);
  });
  if (cur.length) out.push({ words: cur, start: cur[0].s, end: 0 });
  out.forEach((c, i) => { c.end = out[i + 1] ? out[i + 1].start : vo.duration; });
  return out;
};
