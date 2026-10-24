import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  Annotation, At, Backdrop, Badge, BigText, Captions, ChapterCard, Footnote, Host, HudJourney, LimitBars, LoopBack, MotionProvider,
  SfxCue, SoundLayer, Split, Tag, TeyroBridge, TeyroOutro, TitleCard, Ticker, VO, World, camAt, cue, line, loadMotionFonts,
  pop, prog, revealCues, rnd, ticks, useMotion, Z, FONT, LOOKS,
} from '../../kit';
import voJson from './vo.json';
import { HeaderCard, Jollof, LAYER_COL, LAYER_NAME, OsiStack, Packet, Phone, planeY, ROUTE, RouteMap } from './parts';

const vo = voJson as VO;
const SLUG = 'm1-osi';
const N = LOOKS.neon;
export const M1_DURATION = Math.ceil((vo.duration + 0.25) * 30);

/* ───────────── timing helpers ───────────── */
const L = (id: string) => line(vo, id);
const c = (w: string, after?: string | number, n = 1) => cue(vo, w, { n, after: typeof after === 'string' ? L(after).start : after });
const LAYER_LINE: Record<number, string> = { 7: 'l7a', 6: 'l6a', 5: 'l5a', 4: 'l4a', 3: 'l3a', 2: 'l2a', 1: 'l1a' };
const layerStart = (n: number) => L(LAYER_LINE[n]).start;
const SIDE_X = -(Z.sideCx - 540) / 0.62;  // camera x that puts the stack on the side stage at z 0.62

// route node times along the drawn path
const DRAW_AT = c('sea', 'l1b'), DRAW_DUR = c('London.', 'hop') - DRAW_AT;
const SEGS = ROUTE.slice(1).map((p, i) => Math.hypot(p.x - ROUTE[i].x, p.y - ROUTE[i].y));
const TOTAL = SEGS.reduce((a, b) => a + b, 0);
const HOPS = SEGS.map((_, i) => DRAW_AT + (SEGS.slice(0, i + 1).reduce((a, b) => a + b, 0) / TOTAL) * DRAW_DUR);

const CAM = camAt.bind(null, [
  { t: 0, x: SIDE_X, y: planeY(4) + 40, z: 0.62 },
  { t: c('ride', 'o4'), x: 0, y: planeY(7) + 160, z: 1, dur: 1.1 },
  ...[6, 5, 4, 3, 2, 1].map((n) => ({ t: layerStart(n) - 0.05, x: 0, y: planeY(n) + 160, z: 1, dur: 0.8 })),
  { t: L('rev').start - 0.2, x: 0, y: planeY(1) + 160, z: 1, dur: 0.05 },
  { t: c('Labels', 'rev'), x: 0, y: planeY(3) + 160, z: 1, dur: 0.8 },
  { t: c('pieces', 'rev'), x: 0, y: planeY(4) + 160, z: 1, dur: 0.6 },
  { t: c('photo', 'rev'), x: 0, y: planeY(6) + 160, z: 1, dur: 0.6 },
  { t: c('And', 'rev'), x: 0, y: planeY(7) + 160, z: 1, dur: 0.5 },
  { t: L('dx1').start, x: SIDE_X, y: planeY(4) + 40, z: 0.62, dur: 0.9 },
]);

/** which layer the photo is on (down trip 7→1, then up again in London) */
const activeAt = (t: number): number | undefined => {
  if (t < c('ride', 'o4')) return undefined;
  if (t < L('rev').start) { for (const n of [1, 2, 3, 4, 5, 6]) if (t >= layerStart(n)) return n; return 7; }
  if (t < L('dx1').start) {
    if (t >= c('And', 'rev')) return 7; if (t >= c('photo', 'rev')) return 6; if (t >= c('pieces', 'rev')) return 4; if (t >= c('Labels', 'rev')) return 3; return 1;
  }
  return undefined;
};

/* ───────────── the photo riding the stack ───────────── */
const PhotoTile: React.FC<{ y: number }> = ({ y }) => {
  const { t, frame, fps } = useMotion();
  const appear = pop(frame, fps, c('photo', 'o4'), { damping: 12 });
  if (appear <= 0 || t >= L('dx1').start) return null;
  const cut = c('cut', 'l4b'), snap = c('snap', 'rev');
  const spread = t < cut ? 0 : t < snap ? prog(t, cut, cut + 0.6) : 1 - prog(t, snap, snap + 0.5);
  const scramble = t < L('rev').start ? prog(t, c('encrypted', 'l6b'), c('encrypted', 'l6b') + 0.5) : 1 - prog(t, c('unlocks', 'rev'), c('unlocks', 'rev') + 0.4);
  const binary = t < L('rev').start ? prog(t, c('stops', 'l1a'), c('stops', 'l1a') + 0.5) : 1 - prog(t, c('becomes', 'rev'), c('becomes', 'rev') + 0.5);
  const ipTag = (t >= c('label', 'l3a') && t < c('off', 'rev')) ? pop(frame, fps, c('label', 'l3a')) * (t < L('rev').start ? 1 : 1 - prog(t, c('off', 'rev'), c('off', 'rev') + 0.3)) : 0;
  const macTag = (t >= c('MAC', 'l2b') && t < c('off', 'rev') + 0.3) ? pop(frame, fps, c('MAC', 'l2b')) * (t < L('rev').start ? 1 : 1 - prog(t, c('come', 'rev'), c('come', 'rev') + 0.3)) : 0;
  const S = 160, G = 5, cols = 5, rows = 4, cw = S / cols, ch = S / rows;
  const bob = Math.sin(t * 2.4) * 4;
  return (
    <div style={{ position: 'absolute', left: -S / 2, top: y - S / 2 - 70 + bob, width: S, height: S, transform: `scale(${appear})` }}>
      {spread < 0.02 && binary < 0.5 && <Jollof size={S} scramble={scramble} style={{ boxShadow: `0 0 40px ${N.warm}88, 0 0 0 3px #fff` }} />}
      {spread >= 0.02 && binary < 0.5 && Array.from({ length: cols * rows }, (_, i) => {
        const cx = i % cols, cy = Math.floor(i / cols);
        const dx = (cx - (cols - 1) / 2) * cw * 0.35 * spread, dy = (cy - (rows - 1) / 2) * ch * 0.35 * spread;
        return <div key={i} style={{ position: 'absolute', left: cx * cw, top: cy * ch, width: cw - G, height: ch - G, borderRadius: 6, background: `${LAYER_COL[4]}`, border: '2px solid #C9B6FF', boxShadow: `0 0 10px ${LAYER_COL[4]}`, transform: `translate(${dx}px, ${dy}px)`, opacity: 0.92 }} />;
      })}
      {binary >= 0.5 && (
        <div style={{ position: 'absolute', inset: -20, fontFamily: FONT.mono, fontSize: 21, lineHeight: 1.2, color: LAYER_COL[1], textShadow: `0 0 10px ${LAYER_COL[1]}`, wordBreak: 'break-all', opacity: (binary - 0.5) * 2 }}>
          {Array.from({ length: 96 }, (_, i) => (rnd(i + Math.floor(t * 12)) > 0.5 ? '1' : '0')).join('')}
        </div>
      )}
      {ipTag > 0 && <div style={{ position: 'absolute', left: S + 20, top: 10, transform: `scale(${ipTag})`, transformOrigin: 'left center', padding: '8px 14px', borderRadius: 10, background: LAYER_COL[3], color: '#fff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, whiteSpace: 'nowrap', boxShadow: `0 0 18px ${LAYER_COL[3]}` }}>IP → 203.0.113.7</div>}
      {macTag > 0 && <div style={{ position: 'absolute', left: S + 20, top: 66, transform: `scale(${macTag})`, transformOrigin: 'left center', padding: '8px 14px', borderRadius: 10, background: LAYER_COL[2], color: '#fff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, whiteSpace: 'nowrap', boxShadow: `0 0 18px ${LAYER_COL[2]}` }}>MAC → router</div>}
    </div>
  );
};

/* ───────────── title miniature: both stacks + the link (frame 0 = cover) ───────────── */
const Miniature: React.FC = () => {
  const { t } = useMotion();
  const u = (t * 0.6) % 1;
  const stack = (x: number) => [7, 6, 5, 4, 3, 2, 1].map((n) => (
    <polygon key={n} points={`${x},${40 + (7 - n) * 44} ${x + 120},${70 + (7 - n) * 44} ${x},${100 + (7 - n) * 44} ${x - 120},${70 + (7 - n) * 44}`} fill={`${LAYER_COL[n]}18`} stroke={LAYER_COL[n]} strokeWidth={3} style={{ filter: `drop-shadow(0 0 6px ${LAYER_COL[n]})` }} />
  ));
  const path = 'M210 360 C 380 470, 560 470, 730 360';
  return (
    <svg width={940} height={480} viewBox="0 0 940 480">
      {stack(210)}{stack(730)}
      <path d={path} fill="none" stroke="#39C6D9" strokeWidth={4} strokeDasharray="10 10" />
      <circle r={10} fill="#fff" style={{ filter: 'drop-shadow(0 0 10px #39C6D9)' }}>
        <animateMotion dur="1s" path={path} begin={`${-u}s`} />
      </circle>
      <text x={210} y={460} textAnchor="middle" fontFamily="JetBrains Mono" fontWeight={700} fontSize={26} fill="#9AA3C7" letterSpacing="0.1em">LAGOS</text>
      <text x={730} y={460} textAnchor="middle" fontFamily="JetBrains Mono" fontWeight={700} fontSize={26} fill="#9AA3C7" letterSpacing="0.1em">LONDON</text>
    </svg>
  );
};

/* ───────────── the three physical media (layer 1) ───────────── */
const Media: React.FC = () => {
  const { t, frame, fps } = useMotion();
  const items = [
    { at: c('radio', 'l1b'), label: 'RADIO · WI-FI', draw: (k: number) => <g>{[0, 1, 2].map((i) => <path key={i} d={`M${70 - 18 * i} ${110 - 22 * i} a${30 + 26 * i} ${30 + 26 * i} 0 0 1 ${60 + 36 * i} 0`} transform={`translate(${12 * i} ${0})`} fill="none" stroke={LAYER_COL[1]} strokeWidth={5} opacity={0.4 + 0.6 * ((Math.sin(t * 6 - i) + 1) / 2) * k} />)}<circle cx={100} cy={118} r={9} fill={LAYER_COL[1]} /></g> },
    { at: c('voltage', 'l1b'), label: 'VOLTAGE · COPPER', draw: () => <path d={Array.from({ length: 9 }, (_, i) => `${i ? 'L' : 'M'}${18 + i * 20} ${((i + Math.floor(t * 8)) % 3) ? 60 : 120} l20 0`).join(' ')} fill="none" stroke="#FF9A3C" strokeWidth={5} /> },
    { at: c('light', 'l1b'), label: 'LIGHT · FIBRE', draw: () => <g><rect x={10} y={84} width={180} height={12} rx={6} fill="#1D2244" />{Array.from({ length: 5 }, (_, i) => <rect key={i} x={((i * 44 + t * 260) % 200) - 10} y={84} width={20} height={12} rx={6} fill="#FFFFFF" style={{ filter: 'drop-shadow(0 0 8px #fff)' }} />)}</g> },
  ];
  return (
    <div style={{ display: 'flex', gap: 22 }}>
      {items.map((it) => {
        const k = pop(frame, fps, it.at);
        if (k <= 0) return <div key={it.label} style={{ width: 300 }} />;
        return (
          <div key={it.label} style={{ width: 300, height: 260, borderRadius: 20, background: 'rgba(15,19,38,0.95)', border: `1.5px solid ${N.cardEdge}`, transform: `scale(${0.85 + 0.15 * k})`, opacity: Math.min(1, k * 1.4), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <svg width={200} height={170} viewBox="0 0 200 170">{it.draw(k)}</svg>
            <div style={{ fontFamily: FONT.mono, fontSize: 19, fontWeight: 700, letterSpacing: '0.08em', color: N.inkSoft }}>{it.label}</div>
          </div>
        );
      })}
    </div>
  );
};

/* ───────────── encapsulation: parcel inside a parcel inside a parcel ───────────── */
const Nest: React.FC = () => {
  const { frame, fps } = useMotion();
  const layers = [
    { at: c('photo', 'enc'), label: 'PHOTO · LOCKED', col: N.warm, pad: 0 },
    { at: c('parcel,', 'enc', 1), label: 'TCP · PIECE #12', col: LAYER_COL[4], pad: 46 },
    { at: c('parcel,', 'enc', 2), label: 'IP → 203.0.113.7', col: LAYER_COL[3], pad: 92 },
    { at: c('parcel', 'enc', 3), label: 'MAC → ROUTER', col: LAYER_COL[2], pad: 138 },
  ];
  const core = 150;
  return (
    <div style={{ position: 'relative', width: core + 2 * 138 + 20, height: core + 2 * 138 + 80 }}>
      {[...layers].reverse().map((l) => {
        const k = pop(frame, fps, l.at, { damping: 12 });
        if (k <= 0) return null;
        const s = core + 2 * l.pad;
        return (
          <div key={l.label} style={{ position: 'absolute', left: 138 - l.pad + 10, top: 138 - l.pad + 40, width: s, height: s, borderRadius: 20, border: `3px solid ${l.col}`, background: `${l.col}14`, boxShadow: `0 0 22px ${l.col}66`, transform: `scale(${0.8 + 0.2 * k})`, opacity: Math.min(1, k * 1.5) }}>
            {l.pad > 0 && <div style={{ position: 'absolute', left: 12, top: -34, fontFamily: FONT.mono, fontWeight: 800, fontSize: 19, letterSpacing: '0.06em', color: l.col, whiteSpace: 'nowrap' }}>{l.label}</div>}
            {l.pad === 0 && <div style={{ position: 'absolute', inset: 10 }}><Jollof size={core - 26} scramble={1} /></div>}
          </div>
        );
      })}
    </div>
  );
};

/* ───────────── OSI vs TCP/IP mapping ───────────── */
const Models: React.FC = () => {
  const { t, frame, fps } = useMotion();
  const at = L('cav').start, tcpAt = c('four', 'cav'), osiAt = c('OSI', 'cav');
  const k = pop(frame, fps, at); const tk = pop(frame, fps, tcpAt);
  const groups: [string, number[]][] = [['Application', [7, 6, 5]], ['Transport', [4]], ['Internet', [3]], ['Link', [2, 1]]];
  const rowH = 58;
  return (
    <div style={{ display: 'flex', gap: 26, opacity: k, transform: `translateY(${(1 - k) * 30}px)` }}>
      <div>
        <div style={{ fontFamily: FONT.mono, fontSize: 19, fontWeight: 800, letterSpacing: '0.12em', color: t >= osiAt ? '#fff' : N.inkSoft, marginBottom: 10 }}>OSI · 7 LAYERS</div>
        {[7, 6, 5, 4, 3, 2, 1].map((n) => <div key={n} style={{ width: 270, height: rowH - 8, marginBottom: 8, borderRadius: 12, border: `2px solid ${LAYER_COL[n]}`, background: `${LAYER_COL[n]}${t >= osiAt ? '30' : '14'}`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 12, fontFamily: FONT.sans, fontWeight: 700, fontSize: 25, color: '#fff', boxShadow: t >= osiAt ? `0 0 16px ${LAYER_COL[n]}66` : 'none' }}><span style={{ color: LAYER_COL[n], fontFamily: FONT.mono }}>{n}</span>{LAYER_NAME[n]}</div>)}
      </div>
      {tk > 0 && (
        <div style={{ opacity: Math.min(1, tk * 1.4), transform: `translateX(${(1 - tk) * 30}px)` }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 19, fontWeight: 800, letterSpacing: '0.12em', color: N.inkSoft, marginBottom: 10 }}>TCP/IP · 4 LAYERS</div>
          {groups.map(([name, ns]) => <div key={name} style={{ width: 230, height: ns.length * rowH - 8, marginBottom: 8, borderRadius: 12, border: `2px solid ${N.cardEdge}`, background: 'rgba(15,19,38,0.95)', display: 'flex', alignItems: 'center', padding: '0 16px', fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: '#DCE1F5' }}>{name}</div>)}
        </div>
      )}
    </div>
  );
};

/* ───────────── a parcel with an address label (layer 3 analogy) ───────────── */
const Parcel: React.FC<{ at: number }> = ({ at }) => {
  const { frame, fps } = useMotion();
  const k = pop(frame, fps, at, { damping: 10 });
  if (k <= 0) return null;
  return (
    <svg width={230} height={190} viewBox="0 0 230 190" style={{ transform: `scale(${k}) rotate(${(1 - k) * -10}deg)` }}>
      <path d="M20 60 L115 20 L210 60 L210 160 L115 185 L20 160 Z" fill="#B9874F" stroke="#7A5328" strokeWidth={4} />
      <path d="M20 60 L115 95 L210 60 M115 95 L115 185" stroke="#7A5328" strokeWidth={4} fill="none" />
      <path d="M42 85 L100 106 L100 150 L42 130 Z" fill="#FFFFFF" />
      <path d="M50 100 l40 15 M50 112 l40 15 M50 124 l28 10" stroke={LAYER_COL[3]} strokeWidth={4} />
    </svg>
  );
};

/* ───────────── scene ───────────── */
const Scene: React.FC = () => {
  loadMotionFonts();
  const { t, frame, fps } = useMotion();
  const cam = CAM(t);
  const active = activeAt(t);
  const worldOn = Math.min(prog(t, c('seven', 'o3') - 0.1, c('seven', 'o3') + 0.2), 1 - prog(t, c('sea', 'l1b') - 0.2, c('sea', 'l1b') + 0.2))
    + Math.min(prog(t, L('rev').start - 0.1, L('rev').start + 0.3), 1 - prog(t, L('cav').start - 0.2, L('cav').start + 0.15));
  const dxTags: Record<number, { text: string; at: number; tone?: 'problem' | 'good' }> = {
    1: { text: 'NO SIGNAL', at: c('signal?', 'dx2') }, 2: { text: 'NO ROUTER', at: c('router?', 'dx2') }, 3: { text: 'NO ROUTE', at: c('it?', 'dx2') },
    4: { text: 'TIMEOUT', at: c('out?', 'dx2') }, 7: { text: 'APP ERROR', at: c('error?', 'dx2') },
  };
  const dxActive = t >= L('dx2').start ? ([[c('Layer', 'dx2', 1), 1], [c('Layer', 'dx2', 2), 2], [c('Layer', 'dx2', 3), 3], [c('Layer', 'dx2', 4), 4], [c('seven.', 'dx2'), 7]] as [number, number][]).filter(([a]) => t >= a).pop()?.[1] : undefined;
  const br = L('bridge');

  return (
    <AbsoluteFill>
      <Backdrop cam={cam} />

      {/* ── the world: one neon stack for the whole trip ── */}
      {worldOn > 0 && (
        <AbsoluteFill style={{ opacity: Math.min(1, worldOn) }}>
          <World cam={cam}>
            <OsiStack at={c('seven', 'o3') - 0.1} active={active ?? dxActive} tags={t >= L('dx1').start ? dxTags : {}} dim={t >= L('dx1').start && t < L('dx2').start ? 0 : 0} />
            <PhotoTile y={cam.y - 160} />
          </World>
        </AbsoluteFill>
      )}

      {/* ── HUD: journey bar LAGOS → LONDON ── */}
      <HudJourney from="LAGOS" to="LONDON" pulseTeyro={[br.start, L('cta').start]}
        progress={[{ t: 0, v: 0 }, { t: layerStart(7), v: 0.06 }, { t: layerStart(6), v: 0.12 }, { t: layerStart(5), v: 0.18 }, { t: layerStart(4), v: 0.24 }, { t: layerStart(3), v: 0.3 }, { t: layerStart(2), v: 0.36 }, { t: layerStart(1), v: 0.42 }, { t: DRAW_AT, v: 0.48 }, { t: c('London.', 'hop'), v: 0.86, dur: 0.6 }, { t: L('rev').start, v: 0.9 }, { t: c('jollof.', 'rev'), v: 1 }]}
        title={[
          { t: 0, text: 'OSI model explained' }, { t: L('o1').start, text: 'Follow the photo' },
          ...[7, 6, 5, 4, 3, 2, 1].map((n) => ({ t: layerStart(n), text: `Layer ${n} · ${LAYER_NAME[n]}`, color: LAYER_COL[n] })),
          { t: DRAW_AT, text: 'Crossing the planet', color: LAYER_COL[1] }, { t: L('hop').start, text: 'Routers read layer 3', color: LAYER_COL[3] },
          { t: L('enc').start, text: 'Encapsulation' }, { t: L('rev').start, text: 'London · in reverse', color: N.good },
          { t: L('dx1').start, text: 'If it never arrives', color: N.problem }, { t: L('cav').start, text: 'OSI vs TCP/IP' }, { t: L('punch').start, text: '7 layers · 1 second' },
        ]} />

      {/* ── title (frame 0 = cover) ── */}
      <TitleCard title={['OSI MODEL']} kicker="EXPLAINED" until={L('o1').start} titleSize={150} top={360}><Miniature /></TitleCard>

      {/* ── cold open: Tomi in Lagos ── */}
      {t >= L('o1').start - 0.2 && t < L('o2').start && (
        <At x={Z.sideCx} y={900}>
          <div style={{ transform: `scale(${pop(frame, fps, L('o1').start, { damping: 14 })})` }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}><Tag at={c('Lagos.', 'o1')} text="Tomi · Lagos" tone="accent" size={22} /></div>
            <Phone who="Sis" where="LONDON" w={330} photoAt={c('jollof,', 'o1')} sentAt={c('send.', 'o1')} glow={LAYER_COL[7]} />
          </div>
        </At>
      )}
      {t >= L('o2').start && t < c('seven', 'o3') && (() => {
        const out = 1 - prog(t, c('photo', 'o3') - 0.2, c('photo', 'o3') + 0.3);
        const tk = prog(t, c('one', 'o2'), c('later,', 'o2') + 0.3);
        return (
          <AbsoluteFill style={{ opacity: out }}>
            <At x={285} y={860}><div style={{ textAlign: 'center' }}><Tag at={L('o2').start} text="Lagos" size={20} /><div style={{ height: 14 }} /><Phone who="Sis" where="LONDON" w={290} glow={LAYER_COL[7]} sentAt={L('o2').start - 1} /></div></At>
            <At x={795} y={860}><div style={{ textAlign: 'center', transform: `translateX(${(1 - pop(frame, fps, L('o2').start, { damping: 14 })) * 300}px)` }}><Tag at={L('o2').start} text="London" size={20} tone="good" /><div style={{ height: 14 }} /><Phone who="Tomi" where="LAGOS" w={290} recvAt={c('sees', 'o2')} heartAt={c('London,', 'o2') + 0.2} glow={N.good} /></div></At>
            <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
              <path d="M300 470 C 430 360, 650 360, 780 470" fill="none" stroke="#39C6D9" strokeWidth={4} strokeDasharray="12 10" strokeDashoffset={-t * 60} opacity={prog(t, L('o2').start, L('o2').start + 0.4)} />
            </svg>
            <At x={540} y={380}><Tag at={c('kilometres', 'o2')} text="≈ 5,000 km" tone="accent" size={30} solid /></At>
            <At x={540} y={1330}>
              <div style={{ width: 760, opacity: prog(t, c('one', 'o2') - 0.1, c('one', 'o2') + 0.2) }}>
                <div style={{ height: 10, borderRadius: 5, background: N.cardEdge }}><div style={{ width: `${tk * 100}%`, height: '100%', borderRadius: 5, background: 'linear-gradient(90deg,#FF9A3C,#39C6D9)' }} /></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 22, color: N.inkSoft, marginTop: 8 }}><span>0 s</span><span>{(tk * 1).toFixed(1)} s</span><span>1 s</span></div>
              </div>
            </At>
            <At x={540} y={1410}><Footnote at={c('kilometres', 'o2') + 0.2} text="Lagos → London, straight line: 5,012 km" /></At>
          </AbsoluteFill>
        );
      })()}
      {t >= c('OSI', 'o3') - 0.1 && t < c('ride', 'o4') + 0.3 && (
        <At x={Z.sideCx} y={420}><div style={{ opacity: 1 - prog(t, c('ride', 'o4'), c('ride', 'o4') + 0.3) }}><BigText at={c('OSI', 'o3')} lines={['OSI MODEL']} size={78} align="center" /><div style={{ height: 8 }} /><Footnote at={c('model.', 'o3')} text="Open Systems Interconnection · ISO/IEC 7498-1" width={600} /></div></At>
      )}

      {/* ── chapter numerals 7 → 1 ── */}
      {[7, 6, 5, 4, 3, 2, 1].map((n) => <ChapterCard key={n} at={layerStart(n)} until={layerStart(n) + 3.6} n={String(n)} title={LAYER_NAME[n]} sub="LAYER" color={LAYER_COL[n]} />)}

      {/* ── layer 7: application ── */}
      <At x={540} y={1180}><HeaderCard at={c('deliver', 'l7b')} until={L('l7c').start + 0.6} title="WHAT THE APP ASKS FOR" color={LAYER_COL[7]} rows={[['SEND', 'photo.jpg (jollof)', c('photo,', 'l7b')], ['TO', 'Sis · London', c('person.', 'l7b')], ['TYPE', 'image/jpeg']]} /></At>
      {t >= L('l7c').start + 0.6 && t < layerStart(6) && (
        <At x={540} y={1200}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <div style={{ display: 'flex', gap: 14 }}><Tag at={c('HTTP', 'l7c')} text="HTTP · websites" size={26} /><Tag at={c('DNS', 'l7c')} text="DNS · addresses" size={26} /></div>
            <HeaderCard at={c('DNS', 'l7c') + 0.2} title="DNS · FINDING ADDRESSES" color={LAYER_COL[7]} w={560} rows={[['ASK', 'chat.example ?'], ['ANSWER', '203.0.113.7', c('addresses.', 'l7c')]]} />
          </div>
        </At>
      )}

      {/* ── layer 6: presentation ── */}
      {t >= c('compressed,', 'l6b') && t < layerStart(5) && (
        <At x={540} y={1200}>
          <div style={{ display: 'flex', gap: 22, alignItems: 'stretch' }}>
            <div style={{ width: 360, borderRadius: 20, border: `2px solid ${LAYER_COL[6]}`, background: 'rgba(15,19,38,0.95)', padding: 20, boxShadow: `0 0 20px ${LAYER_COL[6]}44`, transform: `scale(${pop(frame, fps, c('compressed,', 'l6b'))})` }}>
              <div style={{ fontFamily: FONT.mono, fontSize: 19, fontWeight: 800, letterSpacing: '0.12em', color: LAYER_COL[6] }}>1 · COMPRESS</div>
              <Ticker keys={[{ t: 0, v: 2400 }, { t: c('smaller.', 'l6b') - 0.3, v: 300, dur: 0.6 }]} format={(v) => `${Math.round(v).toLocaleString('en-US')} KB`} style={{ fontFamily: FONT.mono, fontSize: 54, fontWeight: 800, color: '#fff', marginTop: 8 }} />
            </div>
            {t >= c('encrypted,', 'l6b') && (
              <div style={{ width: 360, borderRadius: 20, border: `2px solid ${N.warm}`, background: 'rgba(15,19,38,0.95)', padding: 20, boxShadow: `0 0 20px ${N.warm}44`, transform: `scale(${pop(frame, fps, c('encrypted,', 'l6b'))})` }}>
                <div style={{ fontFamily: FONT.mono, fontSize: 19, fontWeight: 800, letterSpacing: '0.12em', color: N.warm }}>2 · ENCRYPT</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
                  <svg width={46} height={46} viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" fill={N.warm} /><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke={N.warm} strokeWidth={2.4} /></svg>
                  <span style={{ fontFamily: FONT.mono, fontSize: 30, fontWeight: 800, color: '#fff' }}>LOCKED</span>
                </div>
              </div>
            )}
          </div>
          <div style={{ position: 'absolute', left: 520, top: -330 }}><Annotation at={c('noise.', 'l6b') - 0.3} text="only noise" dx={-150} dy={-40} color="#FFFFFF" width={240} /></div>
          <div style={{ marginTop: 14, textAlign: 'center' }}><Footnote at={c('smaller.', 'l6b')} text="illustrative sizes" /></div>
        </At>
      )}

      {/* ── layer 5: session ── */}
      {t >= c('phone', 'l5a') && t < layerStart(4) && (
        <At x={540} y={1200}>
          <div style={{ position: 'relative', width: 880, height: 220 }}>
            <div style={{ position: 'absolute', left: 0, top: 50, transform: `scale(${pop(frame, fps, c('phone', 'l5a'))})` }}><Tag at={c('phone', 'l5a')} text="Tomi's phone" size={26} /></div>
            <div style={{ position: 'absolute', right: 0, top: 50, transform: `scale(${pop(frame, fps, c('server', 'l5a'))})` }}><Tag at={c('server', 'l5a')} text="Chat server" size={26} /></div>
            {t >= c('conversation,', 'l5a') && (
              <svg width={880} height={220} style={{ position: 'absolute', left: 0, top: 0 }}>
                <line x1={250} y1={60} x2={630} y2={60} stroke={LAYER_COL[5]} strokeWidth={4} />
                <line x1={250} y1={100} x2={630} y2={100} stroke={LAYER_COL[5]} strokeWidth={4} opacity={0.5} />
                {Array.from({ length: 4 }, (_, i) => <circle key={i} cx={250 + ((t * 260 + i * 95) % 380)} cy={60} r={8} fill="#fff" />)}
                {Array.from({ length: 3 }, (_, i) => <circle key={`b${i}`} cx={630 - ((t * 200 + i * 127) % 380)} cy={100} r={7} fill={LAYER_COL[5]} />)}
              </svg>
            )}
            <div style={{ position: 'absolute', left: 300, top: 140, display: 'flex', alignItems: 'center', gap: 14 }}>
              <Badge at={c('open', 'l5a')} text="SESSION OPEN" tone="good" />
              {t >= c('keep', 'l5a') && <Ticker keys={[{ t: 0, v: 0 }, { t: c('keep', 'l5a'), v: 5, dur: 1.6 }]} format={(v) => `00:0${Math.floor(v)}`} style={{ fontFamily: FONT.mono, fontSize: 30, fontWeight: 800, color: '#fff' }} />}
            </div>
          </div>
        </At>
      )}

      {/* ── layer 4: transport ── */}
      {t >= c('kilobytes.', 'l4a') && t < c('cut', 'l4b') + 0.2 && (
        <At x={540} y={1210}><LimitBars max={300} width={860} rows={[{ label: 'THE PHOTO', value: 300, at: c('kilobytes.', 'l4a'), tone: t >= c('big', 'l4a') ? 'problem' : 'accent', text: '≈ 300 KB' }, { label: 'ONE TRIP CARRIES', value: 3, at: c('one', 'l4a'), tone: 'good', text: '1,460 bytes' }]} /></At>
      )}
      {t >= c('pieces', 'l4b') && t < L('l4c').start + 1.2 && (
        <At x={540} y={1200}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {['#1', '#2', '#3', '#4', '…', '#206'].map((n, i) => {
                const k = pop(frame, fps, c('pieces', 'l4b') + i * 0.12);
                return <div key={n} style={{ transform: `scale(${k})` }}>{n === '…' ? <span style={{ fontFamily: FONT.mono, fontSize: 40, color: N.inkSoft }}>…</span> : <Packet n={t >= c('number.', 'l4b') ? n : ''} label={t >= c('number.', 'l4b') ? 'seq' : ' '} />}</div>;
              })}
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {t >= c('every', 'l4b') && <Ticker keys={[{ t: 0, v: 0 }, { t: c('every', 'l4b'), v: 206, dur: 0.9 }]} format={(v) => `≈ ${Math.round(v)} pieces`} style={{ fontFamily: FONT.mono, fontSize: 34, fontWeight: 800, color: '#fff' }} />}
              <Tag at={c('TCP.', 'l4c')} text="TCP" size={28} solid />
            </div>
            <Footnote at={c('bytes,', 'l4b')} text="1,460 = 1,500 (Ethernet) − 20 (IP) − 20 (TCP) · RFC 894 / 791 / 9293 · 300 KB photo shown as an example" width={920} />
          </div>
        </At>
      )}
      {t >= L('l4c').start + 1.2 && t < L('l4d').start && (
        <At x={540} y={1200}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
            <div style={{ display: 'flex', gap: 14 }}>
              {['#5', '#6', '#7', '#8'].map((n) => {
                const lost = n === '#7' && t >= c('missing,', 'l4c') && t < c('again.', 'l4c');
                const ok = n === '#7' && t >= c('again.', 'l4c');
                return <Packet key={n} n={n} tone={lost ? 'lost' : ok ? 'ok' : 'normal'} label={lost ? 'LOST' : ok ? 'RESENT' : 'seq'} />;
              })}
            </div>
            <div style={{ display: 'flex', gap: 12 }}><Badge at={c('missing,', 'l4c')} until={c('asks', 'l4c')} text="#7 LOST" /><Badge at={c('asks', 'l4c')} text="RESEND #7" tone="good" /></div>
          </div>
        </At>
      )}
      <At x={540} y={1170}><Split at={c('video', 'l4d')} rightAt={c('UDP', 'l4d')} until={L('l4e').start} w={920} h={250}
        left={{ title: 'Photo · TCP', tone: 'good', body: <div><div style={{ display: 'flex', gap: 8 }}>{['#5', '#6', '#7', '#8'].map((n) => <Packet key={n} n={n} tone="ok" />)}</div><div style={{ fontFamily: FONT.mono, fontSize: 21, color: N.inkSoft, marginTop: 14 }}>waits for #7</div></div> }}
        right={{ title: 'Video call · UDP', tone: 'problem', body: <div><div style={{ display: 'flex', gap: 8 }}>{['#5', '#6', '#7', '#8'].map((n) => <Packet key={n} n={n} tone={n === '#7' ? 'lost' : 'normal'} />)}</div><div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12 }}><span style={{ fontFamily: FONT.mono, fontSize: 21, color: N.inkSoft }}>skips #7</span><Tag at={c('Faster,', 'l4d')} text="faster" tone="good" size={18} /></div></div> }} /></At>
      {t >= L('l4e').start && t < br.start + 0.2 && (
        <At x={540} y={1200}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', gap: 14 }}>{['#1', '#2', '#3', '#4'].map((n) => <Packet key={n} n={n} tone="q" label={n} />)}</div>
            <Badge at={c('where', 'l4e')} text="WHERE TO?" tone="accent" />
          </div>
        </At>
      )}

      {/* ── Teyro mid bridge (after the cliffhanger) ── */}
      <TeyroBridge at={br.start} until={L('back').start + 0.2} line="Learn coding and AI, a few minutes a day" chips={['Coding', 'AI', 'A few minutes a day']} chipTimes={[c('tech', 'bridge'), c('this,', 'bridge'), c('minutes', 'bridge')]} beats={[c('That', 'bridge'), c('Teyro.', 'bridge')]} />

      {/* ── layer 3: network ── */}
      <At x={540} y={1190}><HeaderCard at={c('label', 'l3a')} until={c('parcel.', 'l3a') - 0.1} title="IP LABEL · LAYER 3" color={LAYER_COL[3]} rows={[['TO', '203.0.113.7', c('IP', 'l3a')], ['FROM', "Tomi's phone"], ['PIECE', '#12 of 206']]} /></At>
      {t >= c('parcel.', 'l3a') - 0.1 && t < layerStart(2) && (
        <At x={540} y={1200}><div style={{ display: 'flex', alignItems: 'center', gap: 30 }}><Parcel at={c('parcel.', 'l3a') - 0.1} /><div style={{ fontFamily: FONT.hand, fontSize: 52, color: '#fff' }}>the final address</div></div></At>
      )}

      {/* ── layer 2: data link ── */}
      {t >= c('router,', 'l2a') && t < layerStart(1) && (
        <At x={540} y={1200}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            {t < c('MAC', 'l2b') ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <Tag at={c('router,', 'l2a')} text="phone" size={26} />
                <svg width={260} height={40}><line x1={0} y1={20} x2={260} y2={20} stroke={LAYER_COL[2]} strokeWidth={4} strokeDasharray="10 8" strokeDashoffset={-t * 50} /></svg>
                <Tag at={c('router,', 'l2a') + 0.15} text="router" size={26} />
              </div>
            ) : (
              <HeaderCard at={c('MAC', 'l2b')} title="MAC LABEL · LAYER 2 · LOCAL" color={LAYER_COL[2]} rows={[['TO', 'router · 3c:5a:b4:…'], ['FROM', 'phone · a4:5e:60:…']]} />
            )}
            <Footnote at={c('metres', 'l2a')} text={t < c('MAC', 'l2b') ? 'a few metres away' : 'MAC = 48-bit hardware address · example values'} />
          </div>
          <div style={{ position: 'absolute', left: 300, top: -360 }}><Annotation at={c('post', 'l2b')} text="first stop: the router" dx={-120} dy={60} color="#FFFFFF" width={340} /></div>
        </At>
      )}

      {/* ── layer 1: physical → the map ── */}
      {t >= c('radio', 'l1b') && t < c('sea', 'l1b') + 0.3 && <At x={540} y={1200}><div style={{ opacity: 1 - prog(t, c('sea', 'l1b') - 0.1, c('sea', 'l1b') + 0.3) }}><Media /></div></At>}
      <RouteMap at={c('sea', 'l1b') - 0.1} until={L('enc').start + 0.1} drawAt={DRAW_AT} drawDur={DRAW_DUR} hops={HOPS} arriveAt={c('London.', 'hop')} />
      {t >= c('sea', 'l1b') && t < L('enc').start && (
        <>
          <At x={760} y={1250}><Footnote at={c('sea', 'l1b') + 0.4} text="illustrative route · not to scale" width={400} /></At>
          <At x={540} y={1340}>
            <div style={{ width: 960, overflow: 'hidden', whiteSpace: 'nowrap', fontFamily: FONT.mono, fontSize: 26, color: LAYER_COL[1], textShadow: `0 0 10px ${LAYER_COL[1]}`, opacity: prog(t, c('ones', 'l1c'), c('ones', 'l1c') + 0.3) * (1 - prog(t, L('hop').start, L('hop').start + 0.3)) }}>
              {Array.from({ length: 80 }, (_, i) => (rnd(i * 7 + Math.floor(t * 10)) > 0.5 ? '1' : '0')).join('')}
            </div>
          </At>
          <At x={720} y={1150}><HeaderCard at={c('label', 'hop')} until={L('enc').start} title="EVERY ROUTER READS LAYER 3" color={LAYER_COL[3]} w={520} rows={[['TO', '203.0.113.7', c('IP', 'hop')], ['NEXT HOP', 'the next router', c('next', 'hop')]]} /></At>
        </>
      )}

      {/* ── encapsulation ── */}
      {t >= L('enc').start && t < L('rev').start && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, L('rev').start - 0.25, L('rev').start) }}>
          <At x={Z.sideCx} y={420}><BigText at={c('encapsulation.', 'enc')} lines={['ENCAPSULATION']} size={64} align="center" /></At>
          <At x={Z.sideCx} y={930}><Nest /></At>
        </AbsoluteFill>
      )}

      {/* ── London, in reverse: the jollof arrives ── */}
      {t >= c('jollof.', 'rev') - 0.1 && t < L('dx1').start + 0.2 && (
        <At x={540} y={1160}><div style={{ transform: `scale(${pop(frame, fps, c('jollof.', 'rev'), { damping: 11 }) * 0.62})`, opacity: 1 - prog(t, L('dx1').start - 0.1, L('dx1').start + 0.2) }}><Phone who="Tomi" where="LAGOS" w={330} recvAt={c('jollof.', 'rev')} heartAt={c('jollof.', 'rev') + 0.35} glow={N.good} /></div></At>
      )}

      {/* ── OSI vs TCP/IP ── */}
      {t >= L('cav').start && t < L('punch').start && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, L('punch').start - 0.25, L('punch').start) }}>
          <At x={Z.sideCx} y={860}><Models /></At>
          <At x={Z.sideCx} y={1340}><Footnote at={c('TCP/IP.', 'cav')} text="RFC 1122 (TCP/IP) · ISO/IEC 7498-1 (OSI)" width={600} /></At>
        </AbsoluteFill>
      )}

      {/* ── punchline ── */}
      {t >= L('punch').start && t < L('cta').start && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, L('cta').start - 0.2, L('cta').start) }}>
          <At x={540} y={640}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              {[['7 LAYERS', c('Seven', 'punch', 1), LAYER_COL[7]], ['7 JOBS', c('Seven', 'punch', 2), LAYER_COL[4]], ['1 SECOND', c('One', 'punch'), LAYER_COL[1]]].map(([txt, at, col]) => {
                const k = pop(frame, fps, at as number, { damping: 10 });
                return <div key={txt as string} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 120, lineHeight: 1, letterSpacing: '-0.03em', color: '#fff', textShadow: `0 0 30px ${col}`, transform: `scale(${k})`, opacity: Math.min(1, k * 1.5) }}>{txt as string}</div>;
              })}
            </div>
          </At>
          <At x={540} y={1180}><div style={{ transform: `scale(${pop(frame, fps, c('jollof', 'punch'), { damping: 11 })})` }}><Jollof size={230} style={{ boxShadow: `0 0 50px ${N.warm}88, 0 0 0 4px #fff` }} /></div></At>
        </AbsoluteFill>
      )}

      {/* ── Teyro outro + loop back to the cover ── */}
      <TeyroOutro at={L('cta').start} until={vo.duration + 0.25 - 0.45} headline="The fun way to finish learning coding and AI." ask="Search Teyro" />
      <LoopBack from={vo.duration + 0.25 - 0.45} dur={0.4}>
        <AbsoluteFill style={{ background: N.bg }}>
          <Backdrop />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center' }}>
            <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 150, lineHeight: 0.95, letterSpacing: '-0.035em', color: '#fff' }}>OSI MODEL</div>
            <div style={{ marginTop: 22, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, letterSpacing: '0.42em', color: N.problem }}>EXPLAINED</div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 360 + 150 + 120, display: 'flex', justifyContent: 'center' }}><Miniature /></div>
        </AbsoluteFill>
      </LoopBack>

      {/* ── host + captions ── */}
      <Host on={[[L('o1').start, L('o2').start], [c('seven', 'o3') - 0.2, L('o4').end], [L('enc').start, L('rev').start], [L('dx1').start, L('punch').start]]}
        poses={[
          { t: 0, p: 'wave' }, { t: c('photo', 'o1'), p: 'point' }, { t: c('seven', 'o3') - 0.2, p: 'pointUp' }, { t: c('OSI', 'o3'), p: 'explain' },
          { t: L('enc').start, p: 'explain' }, { t: c('parcel,', 'enc'), p: 'point' }, { t: c('encapsulation.', 'enc'), p: 'wow' },
          { t: L('dx1').start, p: 'think' }, { t: L('dx2').start, p: 'point' }, { t: L('cav').start, p: 'explain' }, { t: c('OSI', 'cav'), p: 'pointUp' },
        ]} />
      <Captions hideBetween={[[br.start, L('back').start + 0.2]]} />
    </AbsoluteFill>
  );
};

/* ───────────── sound design ───────────── */
const SFX: SfxCue[] = [
  ...revealCues(0.05),
  { t: c('jollof,', 'o1'), s: 'pop' }, { t: c('send.', 'o1'), s: 'swoosh' },
  { t: L('o2').start, s: 'whoosh' }, { t: c('sees', 'o2'), s: 'pop' }, { t: c('London,', 'o2') + 0.2, s: 'chime', v: 0.7 }, { t: c('kilometres', 'o2'), s: 'tick' },
  ...ticks([0, 1, 2, 3, 4, 5, 6].map((i) => c('seven', 'o3') - 0.1 + i * 0.07)).map((x) => ({ ...x, v: 0.6 })),
  { t: c('OSI', 'o3'), s: 'boom', v: 0.7 },
  { t: c('ride', 'o4'), s: 'whoosh' },
  ...[7, 6, 5, 4, 3, 2, 1].flatMap((n) => [{ t: layerStart(n) - 0.05, s: 'whoosh' as const, v: 0.7 }, { t: layerStart(n), s: 'boom' as const, v: 0.55 }]),
  ...ticks([c('deliver', 'l7b'), c('photo,', 'l7b'), c('person.', 'l7b'), c('HTTP', 'l7c'), c('DNS', 'l7c'), c('addresses.', 'l7c')]),
  { t: c('compressed,', 'l6b'), s: 'pop' }, { t: c('smaller.', 'l6b') - 0.3, s: 'count' }, { t: c('encrypted,', 'l6b'), s: 'glitch' },
  { t: c('phone', 'l5a'), s: 'pop' }, { t: c('server', 'l5a'), s: 'pop' }, { t: c('open', 'l5a'), s: 'success', v: 0.7 },
  { t: c('kilobytes.', 'l4a'), s: 'tick' }, { t: c('big', 'l4a'), s: 'error', v: 0.7 }, { t: c('cut', 'l4b'), s: 'shatter' }, { t: c('every', 'l4b'), s: 'count' },
  { t: c('TCP.', 'l4c'), s: 'pop' }, { t: c('missing,', 'l4c'), s: 'error' }, { t: c('again.', 'l4c'), s: 'success' },
  { t: c('video', 'l4d'), s: 'swoosh' }, { t: c('UDP', 'l4d'), s: 'swoosh' }, { t: c('where', 'l4e'), s: 'tick' },
  { t: L('bridge').start, s: 'chime' }, { t: L('back').start, s: 'whoosh', v: 0.6 },
  { t: c('label', 'l3a'), s: 'pop' }, { t: c('parcel.', 'l3a'), s: 'pop' },
  { t: c('router,', 'l2a'), s: 'tick' }, { t: c('MAC', 'l2b'), s: 'pop' }, { t: c('post', 'l2b'), s: 'swoosh', v: 0.6 },
  { t: c('stops', 'l1a'), s: 'glitch' }, ...ticks([c('radio', 'l1b'), c('voltage', 'l1b'), c('light', 'l1b')], 'pop'),
  { t: c('sea', 'l1b'), s: 'whoosh' }, ...ticks(HOPS),
  { t: c('London.', 'hop'), s: 'success', v: 0.8 },
  ...ticks([c('photo', 'enc'), c('parcel', 'enc', 1), c('parcel', 'enc', 2), c('parcel', 'enc', 3)], 'pop'), ...revealCues(c('encapsulation.', 'enc')),
  { t: L('rev').start, s: 'whoosh' }, { t: c('off', 'rev'), s: 'swoosh' }, { t: c('snap', 'rev'), s: 'pop' }, { t: c('unlocks.', 'rev'), s: 'success' }, { t: c('jollof.', 'rev'), s: 'chime' },
  { t: L('dx1').start, s: 'whoosh', v: 0.6 },
  ...[c('signal?', 'dx2'), c('router?', 'dx2'), c('it?', 'dx2'), c('out?', 'dx2'), c('error?', 'dx2')].map((x) => ({ t: x, s: 'error' as const, v: 0.55 })),
  { t: c('four', 'cav'), s: 'swoosh' }, { t: c('OSI', 'cav'), s: 'pop' },
  { t: c('Seven', 'punch', 1), s: 'boom', v: 0.6 }, { t: c('Seven', 'punch', 2), s: 'boom', v: 0.6 }, { t: c('One', 'punch'), s: 'boom', v: 0.7 }, { t: c('jollof', 'punch'), s: 'pop' },
  { t: L('cta').start, s: 'whoosh' }, { t: L('cta').start + 0.6, s: 'pop' },
];

export const M1: React.FC = () => (
  <MotionProvider look="neon" vo={vo}>
    <Scene />
    <SoundLayer slug={SLUG} sfx={SFX} />
  </MotionProvider>
);
