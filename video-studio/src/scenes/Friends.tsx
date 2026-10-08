import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Heart, MessageCircle, PartyPopper } from 'lucide-react';
import { Ada } from '../components/Ada';
import { Bg } from '../components/Bg';
import { At, Art, Burst, Card, Pill, Sparkle, Word } from '../components/fx';
import { C, FPS, body, display } from '../theme';
import { kickPulse, pop, prog, spr } from '../lib/anim';

const FRIENDS = [
  { n: 'Kemi', c: C.coral, x: 360, y: 300, at: 34.92, msg: 'cheered you on!' },
  { n: 'Daniel', c: C.green, x: 1560, y: 260, at: 35.15, msg: 'is on a 7-lesson day' },
  { n: 'Priya', c: C.pink, x: 300, y: 760, at: 35.38, msg: 'joined your league' },
  { n: 'Tunde', c: C.sky, x: 1620, y: 740, at: 35.6, msg: 'sent a high five' },
];
const AX = 960, AY = 560;

// 34.6 – 38.45s  "With friends cheering you on, you're never learning alone."
export const Friends: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const likes = Math.round(interpolate(t, [36.0, 37.6], [0, 24], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const link = prog(f, 36.56, 37.1);

  return (
    <AbsoluteFill>
      <Bg from="#FFD84D" to={C.orange} shape="rgba(255,255,255,0.18)" dots="rgba(255,255,255,0.3)" seed="fr" />
      {/* connection web */}
      <svg style={{ position: 'absolute', inset: 0 }} width={1920} height={1080}>
        {FRIENDS.map((fr, i) => (
          <line key={i} x1={AX} y1={AY} x2={AX + (fr.x - AX) * link} y2={AY + (fr.y - AY) * link} stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeDasharray="2 22" opacity={0.9} />
        ))}
      </svg>

      <At x={AX} y={860 + (1 - spr(f, 34.55, { damping: 12 })) * 700} s={0.95}>
        <Ada poses={[{ t: 0, p: 'open' }, { t: 35.6, p: 'talk' }, { t: 36.56, p: 'open' }, { t: 37.66, p: 'cheer' }]} />
      </At>

      {FRIENDS.map((fr, i) => {
        const p = pop(f, fr.at);
        const bob = Math.sin(t * 3 + i * 1.7) * 10 - kp * 8;
        return (
          <React.Fragment key={i}>
            <At x={fr.x} y={fr.y + bob} s={p}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 150, height: 150, borderRadius: '50%', background: fr.c, border: '8px solid #fff', boxShadow: '0 10px 0 rgba(0,0,0,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: display, fontWeight: 800, fontSize: 70, color: '#fff' }}>{fr.n[0]}</div>
                <Pill size={30} bg={C.white} color={C.navy}><b>{fr.n}</b><span style={{ fontWeight: 600, color: C.slate }}>{fr.msg}</span></Pill>
              </div>
            </At>
            <Burst x={fr.x} y={fr.y} at={fr.at} n={10} r={170} color="#fff" />
          </React.Fragment>
        );
      })}

      {/* the win post */}
      <At x={1560} y={505 + Math.sin(t * 2) * 6} s={pop(f, 35.85)} r={4}>
        <Card w={430} r={34} style={{ padding: '24px 26px', boxSizing: 'border-box' }}>
          <div style={{ fontFamily: body, fontWeight: 600, fontSize: 22, color: C.slate }}>JavaScript Foundations community</div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 34, color: C.navy, margin: '10px 0 16px', lineHeight: 1.15 }}>Built my first to-do app today!</div>
          <div style={{ display: 'flex', gap: 26, fontFamily: body, fontWeight: 800, fontSize: 30, color: C.coral, alignItems: 'center' }}>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center', transform: `scale(${1 + kp * 0.15})` }}><Heart size={34} fill={C.coral} />{likes}</span>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center', color: C.slate }}><MessageCircle size={32} />{Math.min(8, Math.floor(likes / 3))}</span>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center', color: C.violet }}><PartyPopper size={32} /></span>
          </div>
        </Card>
      </At>
      {/* floating hearts */}
      {Array.from({ length: 10 }).map((_, i) => {
        const st = 36.0 + i * 0.16;
        const q = (t - st) / 1.4;
        if (q < 0 || q > 1) return null;
        return <At key={i} x={1480 + Math.sin(q * 6 + i) * 40 + (i % 3) * 60} y={470 - q * 380} s={Math.sin(q * Math.PI) * (0.8 + (i % 3) * 0.2)} r={(i % 2 ? 1 : -1) * 15}><Art src="art/heart.svg" size={70} /></At>;
      })}

      <At x={AX - 470} y={540} s={1}>
        <div style={{ whiteSpace: 'nowrap', textAlign: 'right' }} />
      </At>
      <At x={AX} y={120}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={36.56} size={96} color={C.ink}>never</Word><Word at={37.22} size={96} color={C.ink}>learning</Word>
          <Word at={37.66} size={96} color={C.white} style={{ textShadow: `0 8px 0 ${C.coral}` }}>alone.</Word>
        </div>
      </At>
      <At x={AX} y={120} o={interpolate(t, [36.4, 36.55], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={34.7} size={96} color={C.ink}>With</Word><Word at={34.92} size={96} color={C.white} style={{ textShadow: `0 8px 0 ${C.coral}` }}>friends</Word>
          <Word at={35.38} size={96} color={C.ink}>cheering</Word>
        </div>
      </At>
      <Sparkle x={1200} y={220} at={37.7} size={40} />
      <Sparkle x={700} y={200} at={37.8} size={30} />
    </AbsoluteFill>
  );
};
