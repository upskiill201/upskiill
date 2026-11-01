/* eslint-disable @next/next/no-img-element -- satori renders plain <img> */
import type { ReactNode } from 'react';
import {
  type PublicShareCard,
  type ShareFormat,
  SHARE_FORMATS,
  leagueName,
  ordinal,
} from '@/lib/share/types';
import type { ShareAssets } from './assets';

/**
 * The share-card templates the founder approved on 2026-10-16, rebuilt for
 * satori: flex layout, inline styles, inline SVG
 * for rays/confetti. Hex values live here on purpose — a rendered PNG can't
 * read CSS variables, same exception as app/opengraph-image.tsx.
 *
 * Every number shown comes from the server snapshot in `card.data`.
 */

// ─── Themes ──────────────────────────────────────────────────────────────────

interface Theme {
  c1: string;
  c2: string;
  deep: string;
  ink: string;
  light: boolean;
  rays: string;
  glow: string;
  glowY: number;
  confetti: string[];
  /** Light themes only: the accent behind the eyebrow pill. */
  eyebrowBg?: string;
  eyebrowInk?: string;
}

const W55 = 'rgba(255,255,255,0.55)';

function rgba(hex: string, a: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

const THEMES = {
  streak: {
    c1: '#FFFFFF', c2: '#FFF1DC', deep: '#E8650A', ink: '#071233', light: true,
    rays: '#FF9600', glow: 'rgba(255,200,0,0.3)', glowY: 640,
    confetti: ['#FF9600', '#FFC800', '#0172FD', '#FF4B4B'], eyebrowBg: '#FFEDD5', eyebrowInk: '#C2410C',
  },
  legendary: {
    c1: '#2A1052', c2: '#0B0620', deep: '#000000', ink: '#FFFFFF', light: false,
    rays: '#FFB13B', glow: 'rgba(255,120,30,0.5)', glowY: 560, confetti: ['#FDE68A', '#FFB13B', '#FF6A1F'],
  },
  blue: {
    c1: '#2B8CFF', c2: '#0050B3', deep: '#003478', ink: '#FFFFFF', light: false,
    rays: '#FFFFFF', glow: 'rgba(255,255,255,0.38)', glowY: 640, confetti: [W55, '#BFDBFE', '#FDE68A'],
  },
  green: {
    c1: '#34D46E', c2: '#15A34A', deep: '#0E6B32', ink: '#FFFFFF', light: false,
    rays: '#FFFFFF', glow: 'rgba(255,255,255,0.38)', glowY: 520, confetti: [W55, '#FDE68A', '#BBF7D0', '#FFFFFF'],
  },
  night: {
    c1: '#163A8C', c2: '#071233', deep: '#020617', ink: '#FFFFFF', light: false,
    rays: '#6CA8FF', glow: 'rgba(1,114,253,0.5)', glowY: 520, confetti: ['#6CA8FF', '#FDE68A', 'rgba(255,255,255,0.4)'],
  },
  spotlight: {
    c1: '#151A4A', c2: '#04050F', deep: '#000000', ink: '#FFFFFF', light: false,
    rays: '#7DD3FC', glow: 'rgba(125,211,252,0.55)', glowY: 640, confetti: ['#7DD3FC', '#FDE68A', 'rgba(255,255,255,0.6)'],
  },
  gold: {
    c1: '#0E1F52', c2: '#050B24', deep: '#000000', ink: '#FFFFFF', light: false,
    rays: '#FBBF24', glow: 'rgba(251,191,36,0.38)', glowY: 560, confetti: ['#FDE68A', '#FBBF24', 'rgba(255,255,255,0.5)'],
  },
} satisfies Record<string, Theme>;

function achievementTheme(accent: string): Theme {
  return {
    c1: '#FFFFFF', c2: '#EEF2F8', deep: '#CBD5E1', ink: '#071233', light: true,
    rays: accent, glow: rgba(accent, 0.22), glowY: 640,
    confetti: [accent, '#FFD28A', '#0172FD', '#FF4B4B'], eyebrowBg: rgba(accent, 0.14), eyebrowInk: accent,
  };
}

// ─── Decoration ──────────────────────────────────────────────────────────────

function Rays({ color, cy, count = 22, opacity = 0.13 }: { color: string; cy: number; count?: number; opacity?: number }) {
  let d = '';
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const b = a + Math.PI / count;
    d += `M2000 2000 L${(2000 + 2800 * Math.cos(a)).toFixed(1)} ${(2000 + 2800 * Math.sin(a)).toFixed(1)} L${(2000 + 2800 * Math.cos(b)).toFixed(1)} ${(2000 + 2800 * Math.sin(b)).toFixed(1)} Z `;
  }
  return (
    <svg width={4000} height={4000} viewBox="0 0 4000 4000" style={{ position: 'absolute', left: -1460, top: cy - 2000, opacity }}>
      <path d={d} fill={color} />
    </svg>
  );
}

function Glow({ color, cy }: { color: string; cy: number }) {
  // An SVG gradient, not a CSS one: satori sizes a CSS radial-gradient to its
  // own box math and the box edge shows as a faint rectangle.
  const m = /rgba?\(([^)]+)\)/.exec(color);
  const [r, g, b, a = '1'] = m ? m[1].split(',').map((p) => p.trim()) : ['255', '255', '255', '0.3'];
  const rgb = `rgb(${r},${g},${b})`;
  return (
    <svg width={1500} height={1500} viewBox="0 0 1500 1500" style={{ position: 'absolute', left: -210, top: cy - 750 }}>
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={rgb} stopOpacity={Number(a)} />
          <stop offset="0.6" stopColor={rgb} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={750} cy={750} r={750} fill="url(#glow)" />
    </svg>
  );
}

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Confetti kept to the edges below the hero, so it never lands on the copy. */
function Confetti({ seed, colors, height, count = 34 }: { seed: number; colors: string[]; height: number; count?: number }) {
  const r = seeded(seed);
  const pieces: ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    let x = r() * 1080;
    const y = 120 + r() * (height * 0.62);
    if (y > height * 0.34 && x > 110 && x < 970) x = x < 540 ? 30 + r() * 70 : 980 + r() * 70;
    const c = colors[Math.floor(r() * colors.length)];
    const t = r();
    const rot = r() * 360;
    const z = 0.6 + r() * 0.9;
    if (t < 0.4) {
      pieces.push(
        <rect key={i} x={x} y={y} width={26 * z} height={12 * z} rx={6 * z} fill={c} transform={`rotate(${rot.toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})`} />,
      );
    } else if (t < 0.7) {
      pieces.push(<circle key={i} cx={x} cy={y} r={8 * z} fill={c} />);
    } else {
      const k = 22 * z;
      pieces.push(
        <path
          key={i}
          d={`M${x} ${y - k} Q${x} ${y} ${x + k} ${y} Q${x} ${y} ${x} ${y + k} Q${x} ${y} ${x - k} ${y} Q${x} ${y} ${x} ${y - k}Z`}
          fill={c}
        />,
      );
    }
  }
  return (
    <svg width={1080} height={height} viewBox={`0 0 1080 ${height}`} style={{ position: 'absolute', left: 0, top: 0 }}>
      {pieces}
    </svg>
  );
}

// ─── Shared pieces ───────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

function TopBar({ theme, name, date }: { theme: Theme; name: string; date: string }) {
  const initial = (name.trim()[0] || 'T').toUpperCase();
  return (
    <div style={{ position: 'absolute', top: 84, left: 72, right: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 999,
          padding: '12px 36px 12px 12px',
          background: theme.light ? '#FFFFFF' : 'rgba(255,255,255,0.18)',
          boxShadow: theme.light ? '0 6px 0 #E2E8F0' : 'none',
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 38,
            fontWeight: 800,
            background: theme.light ? '#0172FD' : '#FFFFFF',
            color: theme.light ? '#FFFFFF' : theme.deep === '#000000' ? '#071233' : theme.deep,
          }}
        >
          {initial}
        </div>
        <div style={{ display: 'flex', marginLeft: 22, fontSize: 38, fontWeight: 700, color: theme.ink, maxWidth: 560 }}>
          {name.length > 22 ? `${name.slice(0, 21)}…` : name}
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: theme.ink, opacity: 0.8 }}>{date}</div>
    </div>
  );
}

function Footer({ theme, assets, tagline, join }: { theme: Theme; assets: ShareAssets; tagline: string; join: string }) {
  return (
    <div style={{ position: 'absolute', left: 72, right: 72, bottom: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            width: 108,
            height: 108,
            borderRadius: 30,
            overflow: 'hidden',
            boxShadow: theme.light ? '0 0 0 6px #FFFFFF, 0 10px 0 6px #E2E8F0' : `0 0 0 6px rgba(255,255,255,0.9), 0 10px 0 6px ${theme.deep}`,
          }}
        >
          <img src={assets.tile} width={108} height={108} alt="" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 26 }}>
          <div style={{ display: 'flex', fontSize: 50, fontWeight: 800, color: theme.ink }}>teyro.app</div>
          <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: theme.light ? '#64748B' : 'rgba(255,255,255,0.82)', marginTop: 2 }}>
            {tagline}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 34,
          fontWeight: 800,
          padding: '26px 42px',
          borderRadius: 999,
          background: theme.light ? '#0172FD' : '#FFFFFF',
          color: theme.light ? '#FFFFFF' : theme.deep === '#000000' ? '#071233' : theme.deep,
          boxShadow: theme.light ? '0 8px 0 #0050B3' : '0 8px 0 rgba(0,0,0,0.22)',
        }}
      >
        {join}
      </div>
    </div>
  );
}

function Eyebrow({ theme, text, bg, ink, small }: { theme: Theme; text: string; bg?: string; ink?: string; small?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        fontSize: small ? 26 : 36,
        fontWeight: 800,
        letterSpacing: small ? 3 : 5,
        padding: small ? '10px 24px' : '14px 34px',
        borderRadius: 999,
        background: bg ?? (theme.light ? theme.eyebrowBg : 'rgba(0,0,0,0.16)'),
        color: ink ?? (theme.light ? theme.eyebrowInk : '#FFFFFF'),
      }}
    >
      {text.toUpperCase()}
    </div>
  );
}

function Ribbon({ text, small }: { text: string; small?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        fontSize: small ? 28 : 38,
        fontWeight: 800,
        letterSpacing: small ? 4 : 6,
        padding: small ? '10px 30px' : '16px 46px',
        borderRadius: 20,
        color: '#7C2D12',
        backgroundImage: 'linear-gradient(180deg, #FDE68A, #F59E0B)',
        boxShadow: '0 8px 0 #92400E',
      }}
    >
      {text}
    </div>
  );
}

interface Stat {
  icon?: string;
  value: string;
  label: string;
}

function StatPanel({ theme, stats, width = 936 }: { theme: Theme; stats: Stat[]; width?: number }) {
  return (
    <div
      style={{
        display: 'flex',
        width,
        borderRadius: 48,
        background: '#FFFFFF',
        color: '#071233',
        boxShadow: theme.light ? '0 12px 0 #E2E8F0' : `0 14px 0 ${theme.deep === '#000000' ? 'rgba(0,0,0,0.6)' : theme.deep}`,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '34px 10px',
            borderLeft: i === 0 ? 'none' : '4px solid #EEF2F7',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 58, fontWeight: 800 }}>
            {s.icon && <img src={s.icon} width={58} height={58} alt="" style={{ marginRight: 14, objectFit: 'contain' }} />}
            {s.value}
          </div>
          <div style={{ display: 'flex', marginTop: 8, fontSize: 28, fontWeight: 700, color: '#64748B', letterSpacing: 2 }}>
            {s.label.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
}

function compact(n: number): string {
  if (n >= 100000) return `${Math.round(n / 1000)}k`;
  if (n >= 10000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return n.toLocaleString('en-US');
}

function titleSize(title: string, sizes: [number, number, number]): number {
  if (title.length <= 18) return sizes[0];
  if (title.length <= 30) return sizes[1];
  return sizes[2];
}

// ─── Per-milestone specs ─────────────────────────────────────────────────────

interface Spec {
  theme: Theme;
  seed: number;
  frame?: boolean;
  heroHeight: number;
  hero: ReactNode;
  squareArt: ReactNode;
  eyebrow?: (size: 'lg' | 'sm') => ReactNode;
  big?: { text: string; size: number; color?: string };
  headline: { text: string; size: number; color?: string; shadow?: string };
  sub?: { text: string; color?: string };
  below?: ReactNode;
  tagline?: string;
  join?: string;
}

const FILL = { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'flex' } as const;

function abs(style: Record<string, number | string>): Record<string, number | string> {
  return { position: 'absolute', ...style };
}

function WeekRow({ days, date, fire }: { days: number; date: string; fire: string }) {
  const letters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date(date).getUTCDay();
  const row = Array.from({ length: 7 }, (_, i) => ({ letter: letters[(today - 6 + i + 7) % 7], lit: 6 - i < days }));
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 936,
        padding: '34px 44px 38px',
        borderRadius: 48,
        background: '#FFFFFF',
        border: '4px solid #FCE3C4',
        boxShadow: '0 12px 0 #FCE3C4',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', fontSize: 30, fontWeight: 800, color: '#C2410C', letterSpacing: 3 }}>
        {days >= 7 ? 'PERFECT WEEK' : 'THIS WEEK'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
        {row.map((d, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                width: 96,
                height: 96,
                borderRadius: 48,
                alignItems: 'center',
                justifyContent: 'center',
                background: d.lit ? '#FFEDD5' : '#F1F5F9',
              }}
            >
              {d.lit ? <FireIcon src={fire} size={62} /> : null}
            </div>
            <div style={{ display: 'flex', marginTop: 10, fontSize: 28, fontWeight: 800, color: '#64748B' }}>{d.letter}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FireIcon({ src, size }: { src: string; size: number }) {
  return <img src={src} width={size} height={Math.round(size * 1.333)} alt="" style={{ marginTop: -6 }} />;
}

function spec(card: PublicShareCard, assets: ShareAssets, extra: { thumb: string | null }): Spec {
  const date = card.createdAt;
  switch (card.kind) {
    case 'STREAK': {
      const { days } = card.data;
      if (days >= 100) {
        const theme = THEMES.legendary;
        return {
          theme,
          seed: 19,
          heroHeight: 600,
          hero: (
            <div style={FILL}>
              <img src={assets.fire} width={500} height={667} alt="" style={abs({ left: 290, top: -40 })} />
              <img src={assets.tey.bell} width={270} height={388} alt="" style={abs({ left: 40, top: 220 })} />
            </div>
          ),
          squareArt: <img src={assets.fire} width={360} height={480} alt="" style={abs({ left: 40, top: 30 })} />,
          eyebrow: (sz) => <Ribbon text="LEGENDARY" small={sz === 'sm'} />,
          big: { text: String(days), size: days >= 1000 ? 300 : 380, color: '#FDE68A' },
          headline: { text: 'day streak!', size: 120 },
          sub: { text: `${days} days in a row. No days off.` },
          below: (
            <StatPanel
              theme={theme}
              stats={[
                { icon: assets.fire, value: String(days), label: 'Days' },
                { icon: assets.gem, value: compact(card.data.xp), label: 'XP' },
                { value: compact(card.data.lessons), label: 'Lessons' },
              ]}
            />
          ),
        };
      }
      return {
        theme: THEMES.streak,
        seed: 7,
        heroHeight: 560,
        hero: (
          <div style={FILL}>
            <img src={assets.fire} width={470} height={627} alt="" style={abs({ left: 80, top: -20 })} />
            <img src={assets.tey.cheering} width={400} height={465} alt="" style={abs({ left: 590, top: 110 })} />
          </div>
        ),
        squareArt: <img src={assets.fire} width={350} height={467} alt="" style={abs({ left: 30, top: 20 })} />,
        big: { text: String(days), size: 400, color: '#FF9600' },
        headline: { text: 'day streak!', size: 120, color: '#FF9600', shadow: '0 9px 0 #E8650A' },
        sub: { text: `I've learned on Teyro ${days} days in a row.`, color: '#334155' },
        below: <WeekRow days={days} date={date} fire={assets.fire} />,
      };
    }

    case 'LESSONS': {
      const theme = THEMES.green;
      return {
        theme,
        seed: 11,
        heroHeight: 640,
        hero: <img src={assets.tey.cheering} width={510} height={593} alt="" style={abs({ left: 285, top: 0 })} />,
        squareArt: <img src={assets.tey.cheering} width={400} height={465} alt="" style={abs({ left: 10, top: 40 })} />,
        big: { text: String(card.data.count), size: 360 },
        headline: { text: 'lessons done!', size: 120 },
        sub: { text: `in ${card.data.courseTitle}` },
        below: (
          <StatPanel
            theme={theme}
            stats={[
              { icon: assets.gem, value: compact(card.data.xp), label: 'XP' },
              { icon: assets.fire, value: String(card.data.streakDays), label: 'Day streak' },
              { icon: assets.coin, value: compact(card.data.coins), label: 'Coins' },
            ]}
          />
        ),
      };
    }

    case 'COURSE_STARTED': {
      const theme = THEMES.blue;
      const title = card.data.courseTitle;
      const cover = (w: number, h: number, style: Record<string, number | string>) =>
        extra.thumb ? (
          <img
            src={extra.thumb}
            width={w}
            height={h}
            alt=""
            style={{ ...style, objectFit: 'cover', borderRadius: 44, border: '14px solid #FFFFFF', boxShadow: '0 26px 0 #003478' }}
          />
        ) : (
          <div
            style={{
              ...style,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: w,
              height: h,
              padding: 40,
              borderRadius: 44,
              border: '14px solid #FFFFFF',
              boxShadow: '0 26px 0 #003478',
              backgroundImage: 'linear-gradient(135deg, #0172FD, #9333EA)',
              fontSize: Math.round(w * 0.09),
              fontWeight: 800,
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            {title}
          </div>
        );
      return {
        theme,
        seed: 3,
        heroHeight: 740,
        hero: (
          <div style={FILL}>
            {cover(700, 394, abs({ left: 110, top: 70, transform: 'rotate(-5deg)' }))}
            <img src={assets.tey.welcome} width={330} height={412} alt="" style={abs({ left: 700, top: 290 })} />
          </div>
        ),
        squareArt: (
          <div style={FILL}>
            {cover(420, 236, abs({ left: 20, top: 90, transform: 'rotate(-5deg)' }))}
            <img src={assets.tey.welcome} width={230} height={287} alt="" style={abs({ left: 220, top: 260 })} />
          </div>
        ),
        eyebrow: (sz) => <Eyebrow theme={theme} text="I just started" small={sz === 'sm'} />,
        headline: { text: title, size: titleSize(title, [132, 110, 92]) },
        sub: { text: 'Lesson 1 starts now. Learn it with me.' },
        below: (
          <div style={{ display: 'flex' }}>
            {[card.data.isOriginal ? 'Teyro Original' : null, card.data.category && card.data.category !== 'Uncategorized' ? card.data.category : null]
              .filter((t): t is string => Boolean(t))
              .map((t) => (
                <div
                  key={t}
                  style={{ display: 'flex', margin: '0 10px', padding: '16px 34px', borderRadius: 999, background: 'rgba(255,255,255,0.18)', fontSize: 34, fontWeight: 700 }}
                >
                  {t}
                </div>
              ))}
          </div>
        ),
        tagline: 'Start the same course free',
      };
    }

    case 'CHAPTER_COMPLETE': {
      const theme = THEMES.night;
      const { chapterNumber, chaptersDone, chaptersTotal, percent, sectionTitle } = card.data;
      const spots: [number, number][] = [[540, 790], [350, 680], [580, 570], [380, 460], [600, 350], [400, 240], [620, 140], [440, 40]];
      const n = Math.max(2, Math.min(8, chaptersTotal));
      const nodes = spots.slice(0, n);
      const doneCount = Math.min(n, chaptersDone);
      const current = Math.min(n, chapterNumber) - 1;
      const path = nodes.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
      return {
        theme,
        seed: 5,
        heroHeight: 930,
        hero: (
          <div style={FILL}>
            <svg width={1080} height={900} viewBox="0 0 1080 900" style={abs({ left: 0, top: 0 })}>
              <path d={path} stroke="rgba(255,255,255,0.18)" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 46" />
              {nodes.map(([x, y], i) => {
                const done = i < doneCount;
                const rad = i === current ? 74 : 56;
                return (
                  <g key={i}>
                    <circle cx={x} cy={y + 12} r={rad} fill={done ? '#B45309' : '#0B1A44'} />
                    <circle cx={x} cy={y} r={rad} fill={done ? '#FBBF24' : '#1E3A8A'} />
                    {done && <path d={`M${x - 22} ${y} l15 16 l30 -32`} stroke="#FFFFFF" strokeWidth={13} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
                  </g>
                );
              })}
            </svg>
            {nodes.map(([x, y], i) =>
              i < doneCount ? null : (
                <div key={i} style={abs({ left: x - 56, top: y - 32, width: 112, display: 'flex', justifyContent: 'center', fontSize: 44, fontWeight: 800, color: '#6CA8FF' })}>
                  {String(i + 1)}
                </div>
              ),
            )}
            <img src={assets.tey.pointing} width={330} height={431} alt="" style={abs({ left: 700, top: 420 })} />
          </div>
        ),
        squareArt: <img src={assets.tey.pointing} width={360} height={470} alt="" style={abs({ left: 40, top: 20 })} />,
        eyebrow: (sz) => <Eyebrow theme={theme} text={`Chapter ${chapterNumber} complete`} bg="#FBBF24" ink="#78350F" small={sz === 'sm'} />,
        headline: { text: sectionTitle, size: titleSize(sectionTitle, [132, 104, 84]) },
        sub: { text: card.data.courseTitle },
        below: (
          <div style={{ display: 'flex', flexDirection: 'column', width: 936 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 32, fontWeight: 800, marginBottom: 18 }}>
              <span>{`${chaptersDone} of ${chaptersTotal} chapters`}</span>
              <span style={{ color: '#FBBF24' }}>{`${percent}%`}</span>
            </div>
            <div style={{ display: 'flex', height: 44, borderRadius: 999, background: 'rgba(255,255,255,0.14)' }}>
              <div style={{ display: 'flex', width: `${Math.max(6, percent)}%`, height: 44, borderRadius: 999, backgroundImage: 'linear-gradient(180deg, #FDE68A, #F59E0B)' }} />
            </div>
          </div>
        ),
      };
    }

    case 'COURSE_COMPLETE': {
      const theme = THEMES.gold;
      const { courseTitle, lessons, minutes, xp } = card.data;
      const hours = minutes >= 60 ? `${Math.round(minutes / 60)}h` : `${Math.max(1, minutes)}m`;
      return {
        theme,
        seed: 31,
        frame: true,
        heroHeight: 540,
        hero: (
          <div style={FILL}>
            <div
              style={abs({
                left: 290,
                top: 30,
                width: 500,
                height: 500,
                borderRadius: 250,
                backgroundImage: 'linear-gradient(180deg, #FDE68A, #D97706)',
                boxShadow: '0 18px 0 #78350F, 0 0 0 18px rgba(253,230,138,0.25)',
              })}
            />
            <img src={assets.tey.cheering} width={410} height={477} alt="" style={abs({ left: 335, top: 20 })} />
          </div>
        ),
        squareArt: (
          <div style={FILL}>
            <div style={abs({ left: 30, top: 60, width: 400, height: 400, borderRadius: 200, backgroundImage: 'linear-gradient(180deg, #FDE68A, #D97706)', boxShadow: '0 14px 0 #78350F' })} />
            <img src={assets.tey.cheering} width={330} height={384} alt="" style={abs({ left: 65, top: 50 })} />
          </div>
        ),
        eyebrow: (sz) => <Eyebrow theme={theme} text="Course complete" bg="#FBBF24" ink="#78350F" small={sz === 'sm'} />,
        headline: { text: courseTitle, size: titleSize(courseTitle, [132, 108, 88]), color: '#FDE68A' },
        sub: { text: `${card.name.split(' ')[0]} finished every lesson.` },
        below: (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StatPanel
              theme={theme}
              stats={[
                { value: String(lessons), label: 'Lessons' },
                { value: hours, label: 'Learned' },
                { icon: assets.gem, value: compact(xp), label: 'XP' },
              ]}
            />
            <div style={{ display: 'flex', marginTop: 56, padding: '16px 40px', borderRadius: 999, border: '3px solid rgba(251,191,36,0.8)', color: '#FDE68A', fontSize: 32, fontWeight: 700 }}>
              {`Completed ${formatDate(card.data.completedAt)}`}
            </div>
          </div>
        ),
        join: 'Start free',
      };
    }

    case 'LEAGUE': {
      const theme = THEMES.spotlight;
      const { rank, league, weeklyXp, cohortSize, outcome } = card.data;
      const podium = rank >= 1 && rank <= 3;
      const medal = rank === 1 ? ['#FDE68A', '#F59E0B', '#92400E', '#7C2D12'] : rank === 2 ? ['#F1F5F9', '#94A3B8', '#475569', '#1E293B'] : ['#FED7AA', '#C2410C', '#7C2D12', '#FFFFFF'];
      const name = leagueName(league);
      const headline = podium ? `${ordinal(rank)} place!` : outcome === 'CHAMPION' ? 'Champion!' : 'Promoted!';
      const sub = podium
        ? rank === 1
          ? `Top of the ${name} League`
          : `Top 3 in the ${name} League`
        : `Moving up from the ${name} League`;
      const medalEl = (size: number, style: Record<string, number | string>) =>
        podium ? (
          <div
            style={{
              ...style,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundImage: `linear-gradient(180deg, ${medal[0]}, ${medal[1]})`,
              boxShadow: `0 12px 0 ${medal[2]}, 0 0 0 12px #FFFFFF`,
              fontSize: Math.round(size * 0.43),
              fontWeight: 800,
              color: medal[3],
            }}
          >
            {ordinal(rank)}
          </div>
        ) : null;
      return {
        theme,
        seed: 23,
        heroHeight: 800,
        hero: (
          <div style={FILL}>
            <div
              style={abs({
                left: 170,
                top: -40,
                width: 740,
                height: 740,
                borderRadius: 370,
                backgroundImage: 'radial-gradient(circle, rgba(224,242,254,0.95) 0%, rgba(125,211,252,0.45) 32%, rgba(125,211,252,0) 64%)',
              })}
            />
            <img src={assets.trophy} width={640} height={640} alt="" style={abs({ left: 250, top: 10 })} />
            {medalEl(180, abs({ left: 690, top: 470 }))}
            <img src={assets.tey.bell} width={290} height={417} alt="" style={abs({ left: 30, top: 420 })} />
          </div>
        ),
        squareArt: (
          <div style={FILL}>
            <img src={assets.trophy} width={420} height={420} alt="" style={abs({ left: 20, top: 40 })} />
            {medalEl(130, abs({ left: 300, top: 330 }))}
          </div>
        ),
        eyebrow: (sz) => <Eyebrow theme={theme} text="This week" small={sz === 'sm'} />,
        headline: { text: headline, size: 160 },
        sub: { text: sub },
        below: (
          <StatPanel
            theme={theme}
            stats={[
              { icon: assets.gem, value: compact(weeklyXp), label: 'XP this week' },
              { value: cohortSize ? `#${rank} of ${cohortSize}` : `#${rank}`, label: 'Rank' },
            ]}
          />
        ),
      };
    }

    case 'ACHIEVEMENT': {
      const accent = card.data.badgeBg && /^#[0-9a-fA-F]{6}$/.test(card.data.badgeBg) ? card.data.badgeBg : '#FF9600';
      const theme = achievementTheme(accent);
      const badge = assets.badge(card.data.badgeId) ?? assets.badge('novice');
      const { tier, maxTier, tierName, title, description } = card.data;
      return {
        theme,
        seed: 13,
        heroHeight: 860,
        hero: (
          <div style={FILL}>
            {badge && <img src={badge} width={640} height={704} alt="" style={abs({ left: 220, top: 40 })} />}
            <img src={assets.tey.welcome} width={320} height={399} alt="" style={abs({ left: 690, top: 400 })} />
          </div>
        ),
        squareArt: badge ? <img src={badge} width={400} height={440} alt="" style={abs({ left: 20, top: 40 })} /> : null,
        eyebrow: (sz) => <Eyebrow theme={theme} text="Achievement unlocked" small={sz === 'sm'} />,
        headline: { text: title, size: titleSize(title, [150, 120, 96]) },
        sub: { text: description, color: '#334155' },
        below:
          maxTier > 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex' }}>
                {Array.from({ length: maxTier }, (_, i) => (
                  <div key={i} style={{ display: 'flex', width: 64, height: 24, margin: '0 9px', borderRadius: 999, background: i < tier ? accent : '#E2E8F0' }} />
                ))}
              </div>
              <div style={{ display: 'flex', marginTop: 22, fontSize: 34, fontWeight: 700, color: '#64748B' }}>
                {`Tier ${tier} of ${maxTier} · ${tierName}`}
              </div>
            </div>
          ) : null,
      };
    }
  }
}

// ─── Layouts ─────────────────────────────────────────────────────────────────
//
// satori's flow layout drifts with absolutely positioned art in the same
// column, so the story layout places each block at a computed y instead —
// the same way the approved HTML mockups were built.

const HERO_TOP = 190;
const EYEBROW_GAP = 40;
const SUB_SIZE = 44;

/** Lines a text block wraps to across the 936px copy column (Jakarta ExtraBold ≈ 0.56em per glyph). */
function lines(text: string, size: number, width = 936): number {
  return Math.max(1, Math.ceil((text.length * size * 0.56) / width));
}

/** Height of the copy block, so whatever sits under it starts below it. */
function copyHeight(s: Spec): number {
  let h = 0;
  if (s.eyebrow) h += 80 + EYEBROW_GAP;
  if (s.big) h += Math.round(s.big.size * 0.86) + 6;
  h += lines(s.headline.text, s.headline.size) * s.headline.size;
  if (s.sub) h += 26 + lines(s.sub.text, SUB_SIZE * 0.92) * Math.round(SUB_SIZE * 1.3);
  return h;
}

export function ShareCardArt({
  card,
  format,
  assets,
  thumb,
}: {
  card: PublicShareCard;
  format: ShareFormat;
  assets: ShareAssets;
  thumb: string | null;
}) {
  const s = spec(card, assets, { thumb });
  const { width, height } = SHARE_FORMATS[format];
  const { theme } = s;
  const date = formatDate(card.createdAt);
  const tagline = s.tagline ?? 'Learn real skills, one lesson a day';
  const join = s.join ?? 'Join me';
  const square = format === 'square';
  const glowY = square ? 470 : theme.glowY;

  const headlineStyle = (size: number) => ({
    display: 'flex',
    justifyContent: square ? 'flex-start' : 'center',
    textAlign: (square ? 'left' : 'center') as 'left' | 'center',
    fontSize: size,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: -size * 0.025,
    color: s.headline.color ?? theme.ink,
    textShadow: s.headline.shadow ?? (theme.light ? 'none' : `0 9px 0 ${theme.deep}`),
  });

  const bigStyle = (size: number) => ({
    display: 'flex',
    fontSize: size,
    fontWeight: 800,
    lineHeight: 0.86,
    letterSpacing: -size * 0.04,
    color: s.big?.color ?? theme.ink,
    textShadow: `0 ${Math.round(size * 0.045)}px 0 ${theme.deep}`,
  });

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        fontFamily: 'Jakarta',
        color: theme.ink,
        backgroundImage: `linear-gradient(165deg, ${theme.c1} 0%, ${theme.c2} 100%)`,
      }}
    >
      <Rays color={theme.rays} cy={glowY} />
      <Glow color={theme.glow} cy={glowY} />
      <Confetti seed={s.seed} colors={theme.confetti} height={height} count={square ? 22 : 36} />

      {s.frame && (
        <div style={FILL}>
          <div style={abs({ left: 40, top: 40, right: 40, bottom: 40, border: '4px solid rgba(251,191,36,0.7)', borderRadius: 60 })} />
          <div style={abs({ left: 60, top: 60, right: 60, bottom: 60, border: '2px solid rgba(251,191,36,0.3)', borderRadius: 46 })} />
        </div>
      )}

      <TopBar theme={theme} name={card.name} date={date} />

      {square ? (
        <div style={FILL}>
          <div style={{ ...abs({ left: 40, top: 190, width: 460, height: 520 }), display: 'flex' }}>{s.squareArt}</div>
          <div style={{ ...abs({ left: 500, top: 200, width: 520 }), display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {s.eyebrow && <div style={{ display: 'flex', marginBottom: 18 }}>{s.eyebrow('sm')}</div>}
            {s.big && <div style={bigStyle(Math.min(300, Math.round(s.big.size * 0.82)))}>{s.big.text}</div>}
            <div style={{ ...headlineStyle(Math.min(s.big ? 92 : 80, Math.round(s.headline.size * 0.66))), marginTop: s.big ? 8 : 0 }}>
              {s.headline.text}
            </div>
            {s.sub && (
              <div style={{ display: 'flex', marginTop: 20, fontSize: 36, fontWeight: 700, lineHeight: 1.3, color: s.sub.color ?? theme.ink, opacity: 0.92 }}>
                {s.sub.text}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={FILL}>
          <div style={{ ...abs({ left: 0, top: HERO_TOP, width: 1080, height: s.heroHeight }), display: 'flex' }}>{s.hero}</div>
          <div style={{ ...abs({ left: 72, top: HERO_TOP + s.heroHeight, width: 936 }), display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {s.eyebrow && <div style={{ display: 'flex', marginBottom: EYEBROW_GAP }}>{s.eyebrow('lg')}</div>}
            {s.big && <div style={bigStyle(s.big.size)}>{s.big.text}</div>}
            <div style={{ ...headlineStyle(s.headline.size), marginTop: s.big ? 6 : 0 }}>{s.headline.text}</div>
            {s.sub && (
              <div style={{ display: 'flex', textAlign: 'center', marginTop: 26, fontSize: SUB_SIZE, fontWeight: 700, lineHeight: 1.3, color: s.sub.color ?? theme.ink, opacity: 0.92 }}>
                {s.sub.text}
              </div>
            )}
          </div>
          {s.below && (
            <div style={{ ...abs({ left: 0, top: HERO_TOP + s.heroHeight + copyHeight(s) + 70, width: 1080 }), display: 'flex', justifyContent: 'center' }}>
              {s.below}
            </div>
          )}
        </div>
      )}

      <Footer theme={theme} assets={assets} tagline={tagline} join={join} />
    </div>
  );
}
