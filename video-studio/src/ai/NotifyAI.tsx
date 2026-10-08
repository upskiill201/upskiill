import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Bell, Lock, MousePointer2 } from 'lucide-react';
import { Ada } from '../components/Ada';
import { Bg } from '../components/Bg';
import { At, Burst, Card, Confetti, Ring, Sparkle, Word } from '../components/fx';
import { LogoTile } from '../scenes/Logo';
import { C, FPS, body, display } from '../theme';
import { easeInOut, kickPulse, pop, prog, spr, squash } from '../lib/anim';

const URL = 'teyro.app';
const BX = 1260, BY = 640;

// 49.85 – 54s  "Get notified at teyro dot app, and be first in!"
export const NotifyAI: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const kp = kickPulse(f);
  const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
  const typed = Math.floor(interpolate(t, [51.23, 52.1], [0, URL.length], clamp));

  // cursor glides in and clicks the button on "first"
  const cur = prog(f, 51.85, 52.75, easeInOut);
  const click = 52.85;
  const press = t > click && t < click + 0.18 ? Math.sin(((t - click) / 0.18) * Math.PI) : 0;
  const clicked = t >= click + 0.08;
  const ring = clicked ? Math.sin((t - click) * 40) * 18 * Math.exp(-(t - click) * 4) : 0;
  const [bsx, bsy] = squash(f, click + 0.1, 0.12);
  const toast = spr(f, 53.1, { damping: 12 });

  return (
    <AbsoluteFill>
      <Bg from="#FFFFFF" to="#D9E1FF" shape="rgba(61,90,254,0.07)" dots="rgba(61,90,254,0.14)" seed="nt" />
      <At x={460} y={880 + (1 - spr(f, 49.8, { damping: 12 })) * 700} s={1}>
        <Ada poses={[{ t: 0, p: 'pointR' }, { t: 51.75, p: 'pointR' }, { t: 52.95, p: 'cheer' }]} />
      </At>

      {/* browser bar */}
      <At x={BX} y={250} s={pop(f, 50.35)}>
        <Card w={900} h={120} r={60} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '0 40px', boxSizing: 'border-box' }}>
          <Lock size={42} color={C.green} strokeWidth={3} />
          <span style={{ fontFamily: display, fontWeight: 800, fontSize: 60, color: C.navy, letterSpacing: -1 }}>
            {URL.slice(0, typed)}
            <span style={{ display: 'inline-block', width: 6, height: 58, marginLeft: 4, background: C.blue, verticalAlign: -8, opacity: Math.floor(t * 4) % 2 ? 1 : 0.15 }} />
          </span>
        </Card>
      </At>

      {/* the button */}
      <At x={BX} y={BY} s={pop(f, 50.56, { damping: 8 }) * (1 - press * 0.08) * (1 + kp * 0.025)} sx={bsx} sy={bsy}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 30, padding: '44px 80px', borderRadius: 999, background: clicked ? C.green : C.yellow,
          boxShadow: `0 ${16 - press * 12}px 0 ${clicked ? C.greenDeep : C.yellowDeep}, 0 40px 70px rgba(20,30,90,0.25)`,
          transform: `translateY(${press * 12}px)`, fontFamily: display, fontWeight: 800, fontSize: 96, color: C.ink, whiteSpace: 'nowrap',
        }}>
          <Bell size={96} strokeWidth={3} style={{ transform: `rotate(${ring}deg)`, transformOrigin: '50% 10%' }} />
          {clicked ? "You're in!" : 'Get notified'}
        </div>
      </At>
      <Ring x={BX} y={BY} at={click + 0.08} r={700} color={C.green} w={30} />
      <Burst x={BX} y={BY} at={click + 0.08} n={18} r={460} len={110} w={14} color={C.green} />
      <Confetti x={BX} y={BY} at={click + 0.08} n={50} spread={1300} seed={41} />

      {/* cursor */}
      {t > 51.75 && t < 53.65 && (
        <At x={interpolate(cur, [0, 1], [1900, BX + 140])} y={interpolate(cur, [0, 1], [1100, BY + 60]) + press * 10} s={1 - press * 0.15} r={-10}>
          <MousePointer2 size={110} color={C.ink} fill={C.white} strokeWidth={2.2} />
        </At>
      )}

      {/* notification toast */}
      {t > 53.05 && (
        <At x={BX} y={interpolate(toast, [0, 1], [-150, 880])}>
          <Card w={840} h={140} r={36} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '0 26px', boxSizing: 'border-box' }}>
            <LogoTile size={92} />
            <div>
              <div style={{ fontFamily: display, fontWeight: 800, fontSize: 36, color: C.navy }}>Be first in.</div>
              <div style={{ fontFamily: body, fontWeight: 600, fontSize: 26, color: C.slate }}>One email the day the doors open.</div>
            </div>
          </Card>
        </At>
      )}
      <At x={BX} y={420} o={t < 52.95 ? 1 : 0}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={50.21} size={64} color={C.navy}>Get</Word><Word at={50.31} size={64} color={C.navy}>notified</Word><Word at={50.96} size={64} color={C.navy}>at</Word>
        </div>
      </At>
      <At x={BX} y={420} o={t >= 52.95 ? 1 : 0}>
        <div style={{ whiteSpace: 'nowrap' }}>
          <Word at={52.72} size={72} color={C.navy}>be</Word><Word at={52.91} size={72} color={C.blue}>first</Word><Word at={53.39} size={72} color={C.navy}>in!</Word>
        </div>
      </At>
      <Sparkle x={1700} y={520} at={53.05} size={40} color={C.yellow} />
    </AbsoluteFill>
  );
};
