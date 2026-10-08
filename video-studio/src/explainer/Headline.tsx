import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { chunksOf, type VO, type Word } from './vo';
import { FONT, L, P } from './tokens';
import { prog } from './anim';

const NUM: Record<string, string> = { seventy: '70', eighty: '80', twenty: '20' };
const bare = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
/**
 * What's shown vs what's spoken: "teyro dot app slash teach" → "teyro.app/teach", "seventy percent" → "70%",
 * "19 percent" → "19%". Merged words take the timing of their first spoken word.
 */
const displayWords = (ws: Word[]) => {
  const out: { w: Word; text: string }[] = [];
  for (let i = 0; i < ws.length; i++) {
    const w = ws[i];
    const raw = w.w.replace(/\*/g, '');
    if (bare(raw) === 'teyro' && bare(ws[i + 1]?.w ?? '') === 'dot' && bare(ws[i + 2]?.w ?? '').startsWith('app')) {
      let text = 'teyro.app', j = i + 2;
      if (bare(ws[j + 1]?.w ?? '') === 'slash' && ws[j + 2]) { text += '/' + bare(ws[j + 2].w); j += 2; }
      const tail = ws[j].w.replace(/\*/g, '').match(/[.,!?]$/)?.[0] ?? '';
      out.push({ w: { ...w, accent: w.accent || ws.slice(i, j + 1).some((x) => x.accent) }, text: text + tail });
      i = j; continue;
    }
    const next = ws[i + 1];
    if (next && bare(next.w) === 'percent') {
      const n = NUM[bare(raw)] ?? (/^\d+$/.test(bare(raw)) ? bare(raw) : null);
      if (n) {
        const tail = next.w.replace(/\*/g, '').match(/[.,!?]$/)?.[0] ?? '';
        out.push({ w: { ...w, accent: w.accent || next.accent }, text: n + '%' + tail });
        i++; continue;
      }
    }
    out.push({ w, text: raw });
  }
  return out;
};

/**
 * The reference headline (§5.2): the spoken sentence builds word by word at the top-left.
 * The next word shows ghosted just before it's spoken, then goes solid; *accent* words switch
 * to a red italic serif. Words keep their final positions, so lines never re-flow while building.
 * `accent` overrides the accent colour (Dark Tech uses blue); `dark` flips ink to white.
 */
export const Headline: React.FC<{ vo: VO; dark?: boolean; accent?: string; from?: number; to?: number }> = ({ vo, dark, accent, from = 0, to = Infinity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const chunks = useMemo(() => chunksOf(vo), [vo]);
  if (t < from || t >= to) return null;
  const c = [...chunks].reverse().find((x) => t >= x.start - 0.12);
  if (!c || t > c.end + 0.05) return null;
  const leave = 1 - prog(t, c.end - 0.1, c.end + 0.02);
  const ink = dark ? '#FFFFFF' : P.ink;
  const acc = accent ?? (dark ? P.blue : P.red);
  return (
    <div style={{
      position: 'absolute', left: L.margin, top: L.headlineY, right: 100, opacity: leave,
      fontFamily: FONT.sans, fontWeight: 500, fontSize: L.headlineSize, lineHeight: 1.13, color: ink, letterSpacing: -1,
    }}>
      {displayWords(c.words).map(({ w, text: shown }, i) => {
        const ghost = prog(t, w.s - 0.28, w.s - 0.12);           // 0 → ghost
        const solid = prog(t, w.s - 0.06, w.s + 0.1);            // ghost → solid
        const op = ghost * 0.28 + solid * 0.72;
        const y = (1 - solid) * 10;
        const text = shown;
        const style: React.CSSProperties = w.accent
          ? { fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 400, color: acc, fontSize: '1.14em', letterSpacing: 0 }
          : {};
        return (
          <span key={i} style={{ display: 'inline-block', opacity: op, transform: `translateY(${y}px)`, marginRight: '0.24em', ...style }}>
            {text}
          </span>
        );
      })}
    </div>
  );
};
