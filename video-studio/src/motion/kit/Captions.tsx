import React, { useMemo } from 'react';
import { FONT, W, Z } from './theme';
import { prog, useMotion, VO, Word } from './time';

/**
 * Captions (§3.2): one line, 2–5 words, centred at y ≈ 77 %, always progressive
 * (the viewer can see which word is being said right now). Style comes from the look.
 */
export type CapChunk = { words: Word[]; start: number; end: number };

const MAX = 5;
/** Split into 2–5-word phrases: break at new lines, " | " marks, and after punctuation once a chunk has ≥ 2 words. */
export const captionChunks = (vo: VO): CapChunk[] => {
  const out: CapChunk[] = []; let cur: Word[] = [];
  const flush = () => { if (cur.length) out.push({ words: cur, start: cur[0].s, end: 0 }); cur = []; };
  vo.words.forEach((w, i) => {
    const prev = vo.words[i - 1];
    if (cur.length && (!prev || prev.line !== w.line || w.brk || cur.length >= MAX)) flush();
    cur.push(w);
    if (/[.,!?;:]$/.test(w.w) && cur.length >= 2) flush();
  });
  flush();
  // merge a dangling single word into the previous chunk when that keeps it ≤ MAX and in the same line
  for (let i = out.length - 1; i > 0; i--) {
    const c = out[i], p = out[i - 1];
    if (c.words.length === 1 && p.words.length < MAX && p.words[0].line === c.words[0].line && !/[.!?]$/.test(p.words[p.words.length - 1].w)) {
      p.words.push(...c.words); out.splice(i, 1);
    }
  }
  out.forEach((c, i) => { c.end = out[i + 1] ? Math.min(out[i + 1].start, c.words[c.words.length - 1].e + 0.9) : c.words[c.words.length - 1].e + 0.6; });
  return out;
};

export const Captions: React.FC<{ y?: number; hideBetween?: [number, number][] }> = ({ y = Z.captionY, hideBetween = [] }) => {
  const { look, vo, t } = useMotion();
  const chunks = useMemo(() => captionChunks(vo), [vo]);
  const c = chunks.find((k) => t >= k.start - 0.04 && t < k.end);
  if (!c || hideBetween.some(([a, b]) => t >= a && t < b)) return null;
  const k = prog(t, c.start - 0.04, c.start + 0.1);
  const style = look.captionStyle;
  // shrink long phrases so one line always fits inside the gutters (≈0.56 em per character in Inter Bold)
  const chars = c.words.reduce((n, w) => n + w.w.length + 1, 0);
  const size = Math.min(62, Math.floor((W - 200) / (chars * 0.56)));
  const box: React.CSSProperties =
    style === 'pillDark' ? { background: 'rgba(34,36,41,0.94)', border: '1.5px solid rgba(255,255,255,0.06)', boxShadow: '0 10px 30px rgba(0,0,0,0.35)' } :
    style === 'pillNavy' ? { background: '#1C2232', boxShadow: '0 12px 30px rgba(20,30,60,0.25)' } :
    style === 'pillLight' ? { background: '#FFFFFF', border: `1.5px solid ${look.cardEdge}`, boxShadow: '0 12px 30px rgba(17,20,24,0.10)' } :
    {};
  return (
    <div style={{ position: 'absolute', left: 0, width: W, top: y, transform: `translateY(-50%) scale(${0.94 + 0.06 * k})`, opacity: k, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <div style={{ ...box, borderRadius: 22, padding: style === 'bare' ? '0 20px' : '14px 30px', display: 'flex', gap: style === 'pillLight' ? 16 : 14, maxWidth: W - 120, flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
        {c.words.map((w, i) => {
          const spoken = t >= w.s - 0.02;
          const current = spoken && (t < w.e + 0.05 || i === c.words.length - 1 && t < c.end) && !(c.words[i + 1] && t >= c.words[i + 1].s - 0.02);
          let color: string, weight = 700, bg = 'transparent';
          if (style === 'pillLight') { color = current ? '#111418' : '#4A5059'; weight = current ? 800 : 600; bg = current ? look.highlight : 'transparent'; }
          else if (style === 'pillNavy') { color = spoken ? '#FFFFFF' : 'rgba(255,255,255,0.55)'; weight = w.accent || current ? 800 : 650; }
          else { color = spoken ? '#FFFFFF' : (style === 'bare' ? 'rgba(255,255,255,0.42)' : '#8E939B'); weight = w.accent ? 800 : 700; }
          return (
            <span key={i} style={{
              fontFamily: FONT.sans, fontSize: size, fontWeight: weight, color, background: bg, letterSpacing: '-0.01em',
              borderRadius: 8, padding: style === 'pillLight' ? '0 6px' : 0, margin: style === 'pillLight' ? '0 -6px' : 0,
              textShadow: style === 'bare' ? '0 4px 18px rgba(0,0,0,0.8)' : 'none',
            }}>{w.w}</span>
          );
        })}
      </div>
    </div>
  );
};
