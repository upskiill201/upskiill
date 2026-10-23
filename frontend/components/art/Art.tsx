/**
 * Teyro's onboarding illustrations: flat, chunky, a darker underside and a
 * soft highlight, drawn by hand on a 64-unit grid in the brand palette
 * (art.module.css). One component, one registry, so every screen draws from
 * the same set and the style stays consistent.
 *
 * Decorative only: every drawing is aria-hidden and the label beside it
 * carries the meaning.
 */

import type { ReactNode } from 'react';
import css from './art.module.css';

const f = (k: string) => css[`f-${k}`];
const s = (k: string) => css[`s-${k}`];

const Ground = ({ y = 58, rx = 18 }: { y?: number; rx?: number }) => (
  <ellipse cx="32" cy={y} rx={rx} ry="3.2" className={f('sh')} />
);

/** A 4-point sparkle centred on (x, y). */
const Sparkle = ({ x, y, r, k }: { x: number; y: number; r: number; k: string }) => (
  <path
    className={f(k)}
    d={`M${x} ${y - r}C${x + r * 0.12} ${y - r * 0.12} ${x + r * 0.12} ${y - r * 0.12} ${x + r} ${y}C${x + r * 0.12} ${y + r * 0.12} ${x + r * 0.12} ${y + r * 0.12} ${x} ${y + r}C${x - r * 0.12} ${y + r * 0.12} ${x - r * 0.12} ${y + r * 0.12} ${x - r} ${y}C${x - r * 0.12} ${y - r * 0.12} ${x - r * 0.12} ${y - r * 0.12} ${x} ${y - r}Z`}
  />
);

/** A scalloped rosette edge: n half-circle bumps round a circle of radius r. */
const scallop = (cx: number, cy: number, r: number, n = 12) => {
  const bump = (r * Math.sin(Math.PI / n)).toFixed(2);
  const at = (i: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  };
  let d = `M${at(0)}`;
  for (let i = 1; i <= n; i++) d += `A${bump} ${bump} 0 0 1 ${at(i)}`;
  return `${d}Z`;
};

/** A flame standing on (32, 56), scaled from its base. */
const Flame = ({ scale = 1, dx = 0 }: { scale?: number; dx?: number }) => (
  <g transform={`translate(${32 + dx} 56) scale(${scale}) translate(-32 -56)`}>
    <path className={f('o')} d="M32 8C40 20 49 26 49 40a17 17 0 0 1-34 0c0-9 5-15 8-21 2 6 5 8 9-11Z" />
    <path className={f('od')} d="M32 8C40 20 49 26 49 40a17 17 0 0 1-17 17c8-4 11-10 11-17C43 29 37 20 32 8Z" opacity="0.55" />
    <path className={f('y')} d="M32 27c4 6 9 9 9 16a9 9 0 0 1-18 0c0-5 3-8 5-12 1 3 2 4 4-4Z" />
    <path className={f('yl')} d="M32 39c2 3 4 4 4 7a4 4 0 0 1-8 0c0-2 1-4 4-7Z" />
  </g>
);

const DRAWINGS = {
  // ── Goals: why they're learning ───────────────────────────────────────
  laptop: (
    <>
      <Ground />
      <rect x="10" y="10" width="44" height="33" rx="5" className={f('std')} />
      <rect x="13" y="13" width="38" height="27" rx="2.5" className={f('k')} />
      <rect x="17" y="18" width="10" height="3.4" rx="1.7" className={f('g')} />
      <rect x="29" y="18" width="8" height="3.4" rx="1.7" className={f('y')} />
      <rect x="21" y="24.5" width="16" height="3.4" rx="1.7" className={f('bl')} />
      <rect x="21" y="31" width="8" height="3.4" rx="1.7" className={f('p')} />
      <rect x="31" y="31" width="7" height="3.4" rx="1.7" className={f('g')} />
      <path className={f('st')} d="M5 44h54a1.6 1.6 0 0 1 1.3 2.6l-2.4 3.2a4.4 4.4 0 0 1-3.5 1.7H9.6a4.4 4.4 0 0 1-3.5-1.7l-2.4-3.2A1.6 1.6 0 0 1 5 44Z" />
      <rect x="25" y="44" width="14" height="2.6" rx="1.3" className={f('std')} />
    </>
  ),
  chart: (
    <>
      <Ground />
      <rect x="8" y="13" width="48" height="41" rx="8" className={f('stl')} />
      <rect x="8" y="9" width="48" height="41" rx="8" className={f('w')} />
      <rect x="9" y="10" width="46" height="39" rx="7" className={s('stl')} strokeWidth="2" />
      <rect x="15" y="33" width="8" height="12" rx="2.5" className={f('gl')} />
      <rect x="28" y="26" width="8" height="19" rx="2.5" className={f('g')} />
      <rect x="41" y="18" width="8" height="27" rx="2.5" className={f('gd')} />
      <path className={s('y')} strokeWidth="4" d="M14 28l11-8 7 4 12-11" />
      <path className={f('y')} d="M39 11.5l8.5-2 -1.6 8.4z" />
    </>
  ),
  rocket: (
    <>
      <Ground rx={12} />
      <g transform="rotate(38 32 30)">
        <path className={f('o')} d="M25 43c2 9 4.6 15 7 17 2.4-2 5-8 7-17Z" />
        <path className={f('y')} d="M28 43c1.2 6 2.6 10 4 11.4 1.4-1.4 2.8-5.4 4-11.4Z" />
        <path className={f('r')} d="M24 32l-8 11 9-1Zm16 0l8 11-9-1Z" />
        <path className={f('stl')} d="M32 4c10 8 12.6 22 8.4 40H23.6C19.4 26 22 12 32 4Z" />
        <path className={f('st')} d="M32 4c10 8 12.6 22 8.4 40H34c3-14 2.8-28-2-40Z" />
        <path className={f('r')} d="M32 4c3.6 2.9 6.2 6.3 7.8 10.2H24.2C25.8 10.3 28.4 6.9 32 4Z" />
        <circle cx="32" cy="24.5" r="6" className={f('bd')} />
        <circle cx="32" cy="24.5" r="4" className={f('sky')} />
        <circle cx="30.4" cy="23" r="1.3" className={f('w')} />
      </g>
    </>
  ),
  piggy: (
    <>
      <Ground />
      <circle cx="29" cy="11" r="7" className={f('yd')} />
      <circle cx="29" cy="10.2" r="6.6" className={f('y')} />
      <circle cx="29" cy="10.2" r="3.8" className={s('yl')} strokeWidth="1.6" />
      <path className={s('pd')} strokeWidth="2.4" d="M11.6 36c-4-1-4.4-5-1.4-6" />
      <rect x="17" y="44" width="7" height="10" rx="3" className={f('pd')} />
      <rect x="35" y="44" width="7" height="10" rx="3" className={f('pd')} />
      <ellipse cx="30" cy="37" rx="19.5" ry="14.5" className={f('pd')} />
      <ellipse cx="30" cy="35" rx="19" ry="13.5" className={f('p')} />
      <path className={f('pd')} d="M21 24l4.4-9 5 9Z" />
      <rect x="23" y="22.6" width="11" height="2.6" rx="1.3" className={f('pd')} />
      <ellipse cx="48.5" cy="36" rx="5.2" ry="6" className={f('pd')} />
      <circle cx="47.2" cy="35" r="1.1" className={f('k')} />
      <circle cx="50" cy="37" r="1.1" className={f('k')} />
      <circle cx="40" cy="30" r="2" className={f('k')} />
      <ellipse cx="23" cy="29" rx="4.6" ry="2.4" className={f('hi')} />
    </>
  ),
  team: (
    <>
      <Ground rx={22} />
      <path className={f('b')} d="M6 54a11 11 0 0 1 22 0Z" />
      <circle cx="17" cy="34" r="6.5" className={f('bl')} />
      <circle cx="15" cy="33.6" r="1.2" className={f('k')} />
      <circle cx="19" cy="33.6" r="1.2" className={f('k')} />
      <path className={f('g')} d="M36 54a11 11 0 0 1 22 0Z" />
      <circle cx="47" cy="34" r="6.5" className={f('gl')} />
      <circle cx="45" cy="33.6" r="1.2" className={f('k')} />
      <circle cx="49" cy="33.6" r="1.2" className={f('k')} />
      <path className={f('v')} d="M19 58a13 13 0 0 1 26 0Z" />
      <circle cx="32" cy="33" r="8.5" className={f('vl')} />
      <circle cx="29.2" cy="32.4" r="1.4" className={f('k')} />
      <circle cx="34.8" cy="32.4" r="1.4" className={f('k')} />
      <path className={s('k')} strokeWidth="1.4" d="M30 36.4q2 1.6 4 0" />
      <path className={f('y')} d="M24.5 24.5 26 16l4.4 4.6L32 13.5l1.6 7.1L38 16l1.5 8.5Z" />
      <circle cx="32" cy="13.5" r="1.6" className={f('r')} />
    </>
  ),
  mic: (
    <>
      <Ground rx={12} />
      <path className={s('bl')} strokeWidth="3" d="M14 21q-5 9 0 18M50 21q5 9 0 18" />
      <path className={s('sky')} strokeWidth="3" d="M8 16q-7 14 0 28M56 16q7 14 0 28" />
      <path className={s('std')} strokeWidth="3.2" d="M21 28v2a11 11 0 0 0 22 0v-2" />
      <rect x="30.4" y="41" width="3.2" height="9" className={f('std')} />
      <rect x="23" y="49" width="18" height="4.4" rx="2.2" className={f('std')} />
      <rect x="24" y="7" width="16" height="28" rx="8" className={f('vd')} />
      <rect x="24" y="6" width="16" height="27" rx="8" className={f('v')} />
      <path className={s('vd')} strokeWidth="2" d="M27.5 14h9M27.5 19h9M27.5 24h9" />
      <rect x="27" y="9.5" width="3" height="7" rx="1.5" className={f('hi')} />
    </>
  ),
  chip: (
    <>
      <Ground />
      {[22, 30, 38].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="7" width="4" height="9" rx="2" className={f('st')} />
          <rect x={x - 2} y="46" width="4" height="9" rx="2" className={f('st')} />
          <rect x="7" y={x - 2} width="9" height="4" rx="2" className={f('st')} />
          <rect x="48" y={x - 2} width="9" height="4" rx="2" className={f('st')} />
        </g>
      ))}
      <rect x="14" y="14" width="36" height="37" rx="9" className={f('td')} />
      <rect x="14" y="13" width="36" height="35" rx="9" className={f('t')} />
      <Sparkle x={32} y={30.5} r={10.5} k="y" />
      <Sparkle x={42.5} y={20.5} r={3.6} k="w" />
      <circle cx="21" cy="40" r="1.6" className={f('hi')} />
    </>
  ),
  brain: (
    <>
      <Ground />
      <g className={f('pd')} transform="translate(0 2.4)">
        <circle cx="23" cy="26" r="11" />
        <circle cx="36" cy="22" r="12" />
        <circle cx="45" cy="33" r="9.5" />
        <circle cx="32" cy="37" r="13" />
        <circle cx="19" cy="37" r="9.5" />
      </g>
      <g className={f('p')}>
        <circle cx="23" cy="26" r="11" />
        <circle cx="36" cy="22" r="12" />
        <circle cx="45" cy="33" r="9.5" />
        <circle cx="32" cy="37" r="13" />
        <circle cx="19" cy="37" r="9.5" />
      </g>
      <path className={s('pd')} strokeWidth="2.2" d="M24 21q4 4 0 8M36 17q-3 6 3 9M44 30q-5 2-4 7M27 39q4-3 8 0M17 34q4 1 5 5M31 29q2 3 0 6" />
      <ellipse cx="30" cy="17.5" rx="4.4" ry="2.2" className={f('hi')} />
    </>
  ),

  // ── Topics (category headers on "I want to learn…") ───────────────────
  code: (
    <>
      <Ground />
      <rect x="7" y="12" width="50" height="42" rx="8" className={f('bd')} />
      <rect x="7" y="9" width="50" height="42" rx="8" className={f('b')} />
      <circle cx="14" cy="15" r="2" className={f('w')} />
      <circle cx="20" cy="15" r="2" className={f('w')} opacity="0.7" />
      <circle cx="26" cy="15" r="2" className={f('w')} opacity="0.45" />
      <rect x="11" y="20" width="42" height="27" rx="4" className={f('k')} />
      <path className={s('g')} strokeWidth="3.6" d="M23 27l-6 6.5 6 6.5M41 27l6 6.5-6 6.5" />
      <path className={s('y')} strokeWidth="3.6" d="M35 25.5l-6 16" />
    </>
  ),
  spark: (
    <>
      <Ground rx={14} />
      <Sparkle x={30} y={32} r={21} k="vd" />
      <Sparkle x={30} y={30} r={20} k="v" />
      <Sparkle x={30} y={30} r={9} k="vl" />
      <Sparkle x={49} y={13} r={7} k="y" />
      <circle cx="13" cy="14" r="2.6" className={f('y')} />
      <circle cx="51" cy="44" r="2" className={f('bl')} />
    </>
  ),
  bubbles: (
    <>
      <Ground />
      <path className={f('gd')} d="M46 33l7 9-13-6Z" />
      <rect x="24" y="8" width="33" height="27" rx="11" className={f('g')} />
      <rect x="31" y="15" width="18" height="3.2" rx="1.6" className={f('w')} opacity="0.7" />
      <rect x="31" y="22" width="12" height="3.2" rx="1.6" className={f('w')} opacity="0.7" />
      <path className={f('bd')} d="M15 45l-5 10 13-8Z" />
      <rect x="7" y="22" width="35" height="27" rx="11" className={f('b')} />
      <circle cx="16.5" cy="35.5" r="2.8" className={f('w')} />
      <circle cx="24.5" cy="35.5" r="2.8" className={f('w')} />
      <circle cx="32.5" cy="35.5" r="2.8" className={f('w')} />
    </>
  ),
  mountain: (
    <>
      <Ground rx={24} />
      <path className={f('bd')} d="M30 54l15-29 15 29Z" />
      <path className={f('b')} d="M4 54l22-38 22 38Z" />
      <path className={f('w')} d="M26 16l7.2 12.4-3.6-2.4-3.6 3.2-3.6-3.2-3.6 2.4Z" />
      <path className={f('w')} d="M45 25l4.6 8.9-2.3-1.4-2.3 2-2.3-2-2.3 1.4Z" opacity="0.85" />
      <path className={s('k')} strokeWidth="2" d="M26 16V3" />
      <path className={f('r')} d="M26 3.6l11 3.4-11 3.6Z" />
    </>
  ),
  briefcase: (
    <>
      <Ground />
      <path className={s('yd')} strokeWidth="3.6" d="M24 18v-4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4" />
      <rect x="8" y="20" width="48" height="33" rx="7" className={f('yd')} />
      <rect x="8" y="18" width="48" height="32" rx="7" className={f('y')} />
      <rect x="8" y="31" width="48" height="4" className={f('yd')} />
      <rect x="27.5" y="28" width="9" height="11" rx="2.5" className={f('w')} />
      <rect x="12" y="21" width="12" height="3" rx="1.5" className={f('hi')} />
    </>
  ),
  coins: (
    <>
      <Ground rx={20} />
      {[47, 41, 35, 29].map((y) => (
        <g key={y}>
          <ellipse cx="25" cy={y + 5} rx="15" ry="5" className={f('yd')} />
          <rect x="10" y={y} width="30" height="5" className={f('yd')} />
          <ellipse cx="25" cy={y} rx="15" ry="5" className={f('y')} />
          <ellipse cx="25" cy={y} rx="9" ry="2.6" className={s('yl')} strokeWidth="1.4" />
        </g>
      ))}
      <circle cx="47" cy="33" r="11" className={f('yd')} />
      <circle cx="46" cy="32" r="10.6" className={f('y')} />
      <circle cx="46" cy="32" r="6.4" className={s('yl')} strokeWidth="2" />
    </>
  ),
  pie: (
    <>
      <Ground />
      <circle cx="30" cy="34" r="20" className={f('bd')} />
      <circle cx="30" cy="32" r="20" className={f('b')} />
      <path className={f('g')} d="M30 32l19.2-5.6A20 20 0 0 1 43.8 46.5Z" />
      <path className={f('y')} transform="translate(3 -3)" d="M30 32V12a20 20 0 0 1 19.2 14.4Z" />
      <circle cx="22" cy="22" r="3" className={f('hi')} />
    </>
  ),
  book: (
    <>
      <Ground rx={22} />
      <path className={f('bd')} d="M5 18v36c10-3 19-2 27 2 8-4 17-5 27-2V18Z" />
      <path className={f('w')} d="M32 17c-6-4-15-5-24-3v35c9-2 18-1 24 3Z" />
      <path className={s('stl')} strokeWidth="1.6" d="M32 17c-6-4-15-5-24-3v35c9-2 18-1 24 3" />
      <path className={f('stl')} d="M32 17c6-4 15-5 24-3v35c-9-2-18-1-24 3Z" />
      <path className={s('stl')} strokeWidth="2.2" d="M13 22q8-1 14 1.6M13 29q8-1 14 1.6M13 36q8-1 14 1.6M37 23.6q6-2.6 14-1.6M37 30.6q6-2.6 14-1.6" />
    </>
  ),

  // ── How much they know ────────────────────────────────────────────────
  seed: (
    <>
      <Ground rx={14} />
      <path className={s('gd')} strokeWidth="2.6" d="M32 38v-7" />
      <path className={f('g')} d="M32 33c-5-6-10-5-10-1 3 2 7 3 10 1Z" />
      <path className={f('gl')} d="M32 31c4-7 10-6 10-2-3 2-7 3.4-10 2Z" />
      <path className={f('od')} d="M19 38h26l-3 16a3 3 0 0 1-3 2.4H25a3 3 0 0 1-3-2.4Z" />
      <path className={f('o')} d="M19 38h26l-2.6 14a3 3 0 0 1-3 2.4H24.6a3 3 0 0 1-3-2.4Z" />
      <rect x="17" y="35" width="30" height="6" rx="3" className={f('od')} />
    </>
  ),
  sprout: (
    <>
      <Ground rx={14} />
      <path className={s('gd')} strokeWidth="2.8" d="M32 38V17" />
      <path className={f('g')} d="M32 31c-7-7-14-6-14-1 4 3 10 4 14 1Z" />
      <path className={f('gl')} d="M32 26c6-8 13-7 13-2-4 3-9 4.6-13 2Z" />
      <path className={f('g')} d="M32 20c-5-6-10-5-10-1 3 2 7 3 10 1Z" />
      <path className={f('gl')} d="M32 18c3-6 8-6 8-2-2 2-5 3-8 2Z" />
      <path className={f('od')} d="M19 38h26l-3 16a3 3 0 0 1-3 2.4H25a3 3 0 0 1-3-2.4Z" />
      <path className={f('o')} d="M19 38h26l-2.6 14a3 3 0 0 1-3 2.4H24.6a3 3 0 0 1-3-2.4Z" />
      <rect x="17" y="35" width="30" height="6" rx="3" className={f('od')} />
    </>
  ),
  tree: (
    <>
      <Ground rx={16} />
      <path className={s('gd')} strokeWidth="3" d="M32 38V22" />
      <circle cx="32" cy="18" r="13" className={f('gd')} />
      <circle cx="22" cy="23" r="9" className={f('g')} />
      <circle cx="42" cy="23" r="9" className={f('g')} />
      <circle cx="32" cy="15" r="11" className={f('g')} />
      <circle cx="26" cy="12" r="3.4" className={f('hi')} />
      <circle cx="24" cy="24" r="2.6" className={f('y')} />
      <circle cx="39" cy="14" r="2.6" className={f('y')} />
      <circle cx="41" cy="26" r="2.6" className={f('r')} />
      <path className={f('od')} d="M19 38h26l-3 16a3 3 0 0 1-3 2.4H25a3 3 0 0 1-3-2.4Z" />
      <path className={f('o')} d="M19 38h26l-2.6 14a3 3 0 0 1-3 2.4H24.6a3 3 0 0 1-3-2.4Z" />
      <rect x="17" y="35" width="30" height="6" rx="3" className={f('od')} />
    </>
  ),

  // ── Daily pace ────────────────────────────────────────────────────────
  pace5: (
    <>
      <Ground rx={10} />
      <Flame scale={0.5} />
    </>
  ),
  pace10: (
    <>
      <Ground rx={13} />
      <Flame scale={0.7} />
    </>
  ),
  pace20: (
    <>
      <Ground rx={16} />
      <Flame scale={0.9} />
    </>
  ),
  pace30: (
    <>
      <Ground rx={20} />
      <Flame scale={0.55} dx={-15} />
      <Flame scale={0.55} dx={15} />
      <Flame scale={0.95} />
      <path className={f('v')} d="M47 6l-7 12h6l-4 10 10-14h-6l4-8Z" />
    </>
  ),

  // ── When to remind ────────────────────────────────────────────────────
  sunrise: (
    <>
      <rect x="4" y="4" width="56" height="56" rx="16" className={f('yl')} />
      <path className={s('y')} strokeWidth="3" d="M32 13v5M17 20l3.4 3.4M47 20l-3.4 3.4M10 34h5M49 34h5" />
      <path className={f('y')} d="M17 40a15 15 0 0 1 30 0Z" />
      <path className={f('g')} d="M4 44c10-6 22-6 30-2s18 4 26 0V44A16 16 0 0 1 44 60H20A16 16 0 0 1 4 44Z" />
      <path className={f('gd')} d="M14 57.6c6-3 14-4 22-2s14 1.4 20-1A16 16 0 0 1 44 60H20a16 16 0 0 1-6-2.4Z" opacity="0.5" />
    </>
  ),
  sun: (
    <>
      <rect x="4" y="4" width="56" height="56" rx="16" className={f('sky')} />
      <circle cx="38" cy="24" r="11" className={f('y')} />
      <path className={s('y')} strokeWidth="3" d="M38 7v3M38 38v3M21 24h3M52 24h3M26 12l2 2M50 12l-2 2" />
      <path className={f('w')} d="M14 47a7 7 0 0 1 1.6-13.8A9 9 0 0 1 32.8 35 6 6 0 0 1 32 47Z" />
    </>
  ),
  moon: (
    <>
      <rect x="4" y="4" width="56" height="56" rx="16" className={f('n')} />
      <circle cx="30" cy="30" r="14" className={f('yl')} />
      <circle cx="37" cy="24" r="12" className={f('n')} />
      <Sparkle x={45} y={40} r={4} k="w" />
      <Sparkle x={47} y={14} r={2.6} k="yl" />
      <circle cx="16" cy="15" r="1.6" className={f('w')} />
      <circle cx="22" cy="48" r="1.4" className={f('w')} opacity="0.7" />
    </>
  ),
  clock: (
    <>
      <Ground rx={16} />
      <path className={s('std')} strokeWidth="3.2" d="M19 52l4-5M45 52l-4-5" />
      <circle cx="17" cy="13" r="7" className={f('y')} />
      <circle cx="47" cy="13" r="7" className={f('y')} />
      <circle cx="32" cy="32" r="20" className={f('bd')} />
      <circle cx="32" cy="31" r="19" className={f('b')} />
      <circle cx="32" cy="31" r="14.5" className={f('w')} />
      <path className={s('k')} strokeWidth="3" d="M32 22v9l6 4" />
      <circle cx="32" cy="31" r="2" className={f('k')} />
    </>
  ),

  // ── What's going on / how they heard ─────────────────────────────────
  search: (
    <>
      <Ground />
      <rect x="9" y="7" width="32" height="44" rx="5" className={f('stl')} />
      <rect x="9" y="5" width="32" height="44" rx="5" className={f('w')} />
      <rect x="10" y="6" width="30" height="42" rx="4" className={s('stl')} strokeWidth="2" />
      <circle cx="18" cy="15" r="4" className={f('bl')} />
      <rect x="25" y="12" width="11" height="3" rx="1.5" className={f('st')} />
      <rect x="25" y="17" width="7" height="3" rx="1.5" className={f('stl')} />
      <rect x="14" y="25" width="22" height="3" rx="1.5" className={f('stl')} />
      <rect x="14" y="31" width="18" height="3" rx="1.5" className={f('stl')} />
      <path className={s('k')} strokeWidth="5.4" d="M47 44l8 8" />
      <circle cx="40" cy="37" r="10.5" className={f('sky')} />
      <circle cx="40" cy="37" r="10.5" className={s('b')} strokeWidth="4" />
      <path className={s('w')} strokeWidth="2" d="M35 33.5a6 6 0 0 1 4-2.5" />
    </>
  ),
  badge: (
    <>
      <Ground rx={15} />
      <path className={s('r')} strokeWidth="3.4" d="M24 3l8 13 8-13" />
      <rect x="15" y="15" width="34" height="41" rx="7" className={f('bd')} />
      <rect x="15" y="13" width="34" height="41" rx="7" className={f('b')} />
      <rect x="27" y="15.4" width="10" height="3.4" rx="1.7" className={f('bd')} />
      <rect x="20" y="23" width="24" height="26" rx="4" className={f('w')} />
      <circle cx="32" cy="31" r="5" className={f('bl')} />
      <rect x="25" y="39" width="14" height="3" rx="1.5" className={f('st')} />
      <rect x="27.5" y="44" width="9" height="2.6" rx="1.3" className={f('stl')} />
      <Sparkle x={45} y={13} r={5.6} k="y" />
    </>
  ),
  signpost: (
    <>
      <Ground rx={14} />
      <rect x="29" y="9" width="6" height="47" rx="2.4" className={f('yd')} />
      <path className={f('bd')} d="M12 17h32l6 6.4-6 6.4H12Z" transform="translate(0 2)" />
      <path className={f('b')} d="M12 15h32l6 6.4-6 6.4H12Z" />
      <path className={f('gd')} d="M52 33H20l-6 6.4 6 6.4h32Z" transform="translate(0 2)" />
      <path className={f('g')} d="M52 31H20l-6 6.4 6 6.4h32Z" />
      <rect x="17" y="20" width="18" height="3" rx="1.5" className={f('hi')} />
      <rect x="27" y="36" width="18" height="3" rx="1.5" className={f('hi')} />
    </>
  ),
  bulb: (
    <>
      <Ground rx={11} />
      <path className={s('yl')} strokeWidth="3" d="M32 2v4M10 24h4M50 24h4M16 9l3 3M48 9l-3 3" />
      <circle cx="32" cy="25" r="16" className={f('yd')} />
      <circle cx="32" cy="24" r="15.5" className={f('y')} />
      <path className={s('yd')} strokeWidth="2.4" d="M27 31q5-8 10 0M32 28v11" />
      <path className={s('w')} strokeWidth="2.6" d="M23 19a10 10 0 0 1 6-6" opacity="0.8" />
      <rect x="24.5" y="38" width="15" height="5" rx="2.5" className={f('st')} />
      <rect x="25.5" y="43.5" width="13" height="4.6" rx="2.3" className={f('std')} />
      <rect x="28" y="48.6" width="8" height="4" rx="2" className={f('st')} />
    </>
  ),
  cap: (
    <>
      <Ground rx={20} />
      <rect x="11" y="41" width="42" height="12" rx="3.4" className={f('r')} />
      <rect x="13" y="43.4" width="38" height="4.6" rx="1.6" className={f('w')} />
      <path className={f('kl')} d="M18 27v9c9 6 19 6 28 0v-9L32 33Z" />
      <path className={f('k')} d="M32 13l27 11-27 11L5 24Z" />
      <path className={s('y')} strokeWidth="2.2" d="M32 24l16 5v9" />
      <circle cx="48" cy="39.6" r="2.8" className={f('y')} />
    </>
  ),
  /** Just the cap, to sit on Tey's head ("I already know some"). */
  mortarboard: (
    <>
      <path className={f('kl')} d="M17 30v10c9 6.6 21 6.6 30 0V30L32 37Z" />
      <path className={f('k')} d="M32 14l28 12-28 12L4 26Z" />
      <path className={f('kl')} d="M32 14l28 12-28 12Z" opacity="0.5" />
      <path className={s('y')} strokeWidth="2.4" d="M32 26l18 6v11" />
      <circle cx="50" cy="45" r="3.2" className={f('y')} />
      <circle cx="32" cy="26" r="2.2" className={f('y')} />
    </>
  ),
  compass: (
    <>
      <Ground />
      <circle cx="32" cy="33" r="23" className={f('yd')} />
      <circle cx="32" cy="31" r="22.4" className={f('y')} />
      <circle cx="32" cy="31" r="18" className={f('w')} />
      <path className={s('stl')} strokeWidth="2.4" d="M32 15v3.4M32 43.6V47M16 31h3.4M44.6 31H48" />
      <path className={f('r')} d="M32 15l5 16H27Z" />
      <path className={f('std')} d="M32 47l5-16H27Z" />
      <circle cx="32" cy="31" r="3" className={f('k')} />
    </>
  ),
  friends: (
    <>
      <Ground />
      <path className={f('pd')} d="M18 42l-6 11 14-8Z" />
      <rect x="6" y="9" width="52" height="36" rx="13" className={f('pd')} />
      <rect x="6" y="7" width="52" height="36" rx="13" className={f('p')} />
      <path className={f('w')} d="M32 37c-9-6-13-10-13-15a6.4 6.4 0 0 1 13-2 6.4 6.4 0 0 1 13 2c0 5-4 9-13 15Z" />
      <rect x="13" y="12" width="9" height="3" rx="1.5" className={f('hi')} />
    </>
  ),
  planet: (
    <>
      <Ground rx={14} />
      <g transform="rotate(-18 32 31)">
        <path className={s('yd')} strokeWidth="4" d="M5 31A27 8 0 0 1 59 31" />
      </g>
      <circle cx="32" cy="32" r="17" className={f('vd')} />
      <circle cx="32" cy="31" r="16.4" className={f('v')} />
      <circle cx="26" cy="25" r="3.4" className={f('vl')} />
      <circle cx="38" cy="37" r="2.4" className={f('vl')} />
      <g transform="rotate(-18 32 31)">
        <path className={s('y')} strokeWidth="4" d="M59 31A27 8 0 0 1 5 31" />
      </g>
      <Sparkle x={52} y={50} r={4} k="y" />
    </>
  ),
  xmark: (
    <>
      <rect x="6" y="6" width="52" height="52" rx="14" className={f('k')} />
      <path className={s('w')} strokeWidth="5" d="M21 20l22 24M43 20L21 44" />
    </>
  ),

  // ── What they'll get (real course facts) ─────────────────────────────
  cards: (
    <>
      <Ground />
      <rect x="10" y="12" width="34" height="42" rx="6" transform="rotate(-12 27 33)" className={f('bl')} />
      <rect x="16" y="10" width="34" height="42" rx="6" transform="rotate(-3 33 31)" className={f('b')} />
      <rect x="22" y="9" width="34" height="42" rx="6" transform="rotate(7 39 30)" className={f('w')} />
      <rect x="23" y="10" width="32" height="40" rx="5" transform="rotate(7 39 30)" className={s('stl')} strokeWidth="2" />
      <g transform="rotate(7 39 30)">
        <rect x="27" y="15" width="16" height="4" rx="2" className={f('g')} />
        <rect x="27" y="23" width="24" height="3" rx="1.5" className={f('stl')} />
        <rect x="27" y="29" width="20" height="3" rx="1.5" className={f('stl')} />
        <rect x="27" y="38" width="12" height="7" rx="3.5" className={f('y')} />
      </g>
    </>
  ),
  target: (
    <>
      <Ground />
      <circle cx="30" cy="34" r="21" className={f('rd')} />
      <circle cx="30" cy="32" r="21" className={f('r')} />
      <circle cx="30" cy="32" r="14.5" className={f('w')} />
      <circle cx="30" cy="32" r="8.5" className={f('r')} />
      <circle cx="30" cy="32" r="3.4" className={f('w')} />
      <path className={s('k')} strokeWidth="3.2" d="M31 31l21-19" />
      <path className={f('g')} d="M50 6l3 6.6L60 14l-5 5-6.6-3L46 9Z" />
    </>
  ),
  certificate: (
    <>
      <Ground rx={22} />
      <rect x="5" y="12" width="50" height="38" rx="5" className={f('stl')} />
      <rect x="5" y="10" width="50" height="38" rx="5" className={f('w')} />
      <rect x="6" y="11" width="48" height="36" rx="4" className={s('stl')} strokeWidth="2" />
      <rect x="9" y="14" width="42" height="30" rx="3" className={s('yl')} strokeWidth="1.8" />
      <rect x="14" y="20" width="22" height="3.6" rx="1.8" className={f('k')} opacity="0.8" />
      <rect x="14" y="27" width="18" height="3" rx="1.5" className={f('stl')} />
      <rect x="14" y="33" width="14" height="3" rx="1.5" className={f('stl')} />
      <path className={f('r')} d="M40 42l-4 15 6-3 3 5 2-14Z" />
      <path className={f('rd')} d="M50 42l4 15-6-3-3 5-2-14Z" />
      <circle cx="45" cy="38" r="10" className={f('yd')} />
      <circle cx="45" cy="37" r="9.6" className={f('y')} />
      <Sparkle x={45} y={37} r={5} k="w" />
    </>
  ),
  calendar: (
    <>
      <Ground />
      <rect x="9" y="12" width="46" height="43" rx="8" className={f('stl')} />
      <rect x="9" y="10" width="46" height="43" rx="8" className={f('w')} />
      <rect x="10" y="11" width="44" height="41" rx="7" className={s('stl')} strokeWidth="2" />
      <path className={f('r')} d="M17 10h30a8 8 0 0 1 8 8v4H9v-4a8 8 0 0 1 8-8Z" />
      <rect x="19" y="5" width="4.4" height="10" rx="2.2" className={f('std')} />
      <rect x="40.6" y="5" width="4.4" height="10" rx="2.2" className={f('std')} />
      <g transform="translate(0 -6)">
        <Flame scale={0.5} />
      </g>
    </>
  ),
  clipboard: (
    <>
      <Ground rx={20} />
      <rect x="10" y="9" width="44" height="49" rx="7" className={f('yd')} />
      <rect x="10" y="7" width="44" height="49" rx="7" className={f('y')} />
      <rect x="15" y="13" width="34" height="38" rx="4" className={f('w')} />
      <rect x="23" y="3" width="18" height="9" rx="3.4" className={f('std')} />
      {[20, 30, 40].map((y, i) => (
        <g key={y}>
          <circle cx="22" cy={y + 1.5} r="3.6" className={f(i < 2 ? 'g' : 'stl')} />
          {i < 2 && <path className={s('w')} strokeWidth="1.8" d={`M20.4 ${y + 1.6}l1.2 1.2 2.4-2.6`} />}
          <rect x="29" y={y} width={i === 1 ? 13 : 16} height="3.2" rx="1.6" className={f('stl')} />
        </g>
      ))}
    </>
  ),
  // ── Pro, billing and the last screens ─────────────────────────────────
  heart: (
    <>
      <Ground rx={16} />
      <path className={f('rd')} d="M32 56C14 44 6 34 6 23a13 13 0 0 1 26-5 13 13 0 0 1 26 5c0 11-8 21-26 33Z" />
      <path className={f('r')} d="M32 53C14 41 6 31 6 20a13 13 0 0 1 26-5 13 13 0 0 1 26 5c0 11-8 21-26 33Z" />
      <ellipse cx="18" cy="17" rx="5.4" ry="3.4" transform="rotate(-32 18 17)" className={f('hi')} />
    </>
  ),
  infinity: (
    <>
      <Ground rx={20} />
      <path className={s('vd')} strokeWidth="7.5" d="M32 35C26 24 6 22 6 35s20 11 26 0 26-11 26 0-20 11-26 0" />
      <path className={s('v')} strokeWidth="7.5" d="M32 32C26 21 6 19 6 32s20 11 26 0 26-11 26 0-20 11-26 0" />
      <path className={s('vl')} strokeWidth="2.6" d="M9 28c2-4 7-5 11-3" />
      <Sparkle x={53} y={12} r={5} k="y" />
    </>
  ),
  shield: (
    <>
      <Ground rx={16} />
      <path className={f('bd')} d="M32 8l21 7v16c0 14-9 22-21 28-12-6-21-14-21-28V15Z" />
      <path className={f('b')} d="M32 6l21 7v16c0 14-9 22-21 28-12-6-21-14-21-28V13Z" />
      <path className={f('bl')} d="M32 6l21 7v16c0 14-9 22-21 28Z" opacity="0.45" />
      <g transform="translate(0 -9)">
        <Flame scale={0.5} />
      </g>
    </>
  ),
  books: (
    <>
      <Ground rx={22} />
      <rect x="8" y="18" width="11" height="38" rx="2.5" className={f('b')} />
      <rect x="8" y="24" width="11" height="3" className={f('bd')} />
      <rect x="8" y="46" width="11" height="3" className={f('bd')} />
      <rect x="20" y="11" width="12" height="45" rx="2.5" className={f('g')} />
      <rect x="20" y="18" width="12" height="3" className={f('gd')} />
      <rect x="23" y="27" width="6" height="10" rx="2" className={f('w')} opacity="0.85" />
      <rect x="33" y="20" width="10" height="36" rx="2.5" className={f('y')} />
      <rect x="33" y="27" width="10" height="3" className={f('yd')} />
      <rect x="45" y="17" width="10" height="38" rx="2.5" transform="rotate(14 50 36)" className={f('r')} />
      <rect x="45" y="24" width="10" height="3" transform="rotate(14 50 36)" className={f('rd')} />
    </>
  ),
  bell: (
    <>
      <Ground rx={14} />
      <path className={s('yl')} strokeWidth="3" d="M10 18q-4 6-2 13M54 18q4 6 2 13" />
      <circle cx="32" cy="50" r="5" className={f('yd')} />
      <circle cx="32" cy="8" r="3.4" className={f('yd')} />
      <path className={f('yd')} d="M32 10c-10 0-16 8-16 18v10l-5 7h42l-5-7V28c0-10-6-18-16-18Z" />
      <path className={f('y')} d="M32 9c-10 0-16 8-16 18v9l-5 7h42l-5-7v-9c0-10-6-18-16-18Z" />
      <path className={s('w')} strokeWidth="2.6" d="M22 26a10 10 0 0 1 6-9" opacity="0.75" />
    </>
  ),
  card: (
    <>
      <Ground rx={22} />
      <rect x="6" y="16" width="52" height="36" rx="7" className={f('bd')} />
      <rect x="6" y="14" width="52" height="36" rx="7" className={f('b')} />
      <rect x="6" y="21" width="52" height="7" className={f('k')} />
      <rect x="12" y="34" width="11" height="9" rx="2.4" className={f('y')} />
      <rect x="28" y="36" width="12" height="3" rx="1.5" className={f('w')} opacity="0.8" />
      <rect x="43" y="36" width="9" height="3" rx="1.5" className={f('w')} opacity="0.8" />
    </>
  ),
  wallet: (
    <>
      <Ground rx={20} />
      <rect x="14" y="10" width="30" height="20" rx="3" transform="rotate(-10 29 20)" className={f('gl')} />
      <rect x="20" y="12" width="30" height="20" rx="3" transform="rotate(6 35 22)" className={f('g')} />
      <rect x="7" y="22" width="50" height="33" rx="8" className={f('vd')} />
      <rect x="7" y="20" width="50" height="33" rx="8" className={f('v')} />
      <path className={f('vd')} d="M38 30h19v14H38a7 7 0 0 1 0-14Z" />
      <circle cx="40" cy="37" r="3" className={f('y')} />
    </>
  ),
  question: (
    <>
      <Ground />
      <path className={f('td')} d="M18 46l-6 11 15-8Z" />
      <rect x="6" y="8" width="52" height="40" rx="14" className={f('t')} />
      <path className={s('w')} strokeWidth="5" d="M25 22a7 7 0 0 1 14 1c0 6-7 6-7 11" />
      <circle cx="32" cy="41" r="3" className={f('w')} />
    </>
  ),
  hourglass: (
    <>
      <Ground rx={14} />
      <path className={f('sky')} d="M18 10h28c0 14-9 16-9 22s9 8 9 22H18c0-14 9-16 9-22s-9-8-9-22Z" />
      <path className={f('y')} d="M22 16h20c-2 7-8 9-10 13-2-4-8-6-10-13Z" />
      <path className={f('y')} d="M21 52c2-8 6-10 11-10s9 2 11 10Z" />
      <rect x="13" y="5" width="38" height="7" rx="3.5" className={f('yd')} />
      <rect x="13" y="52" width="38" height="7" rx="3.5" className={f('yd')} />
    </>
  ),
  envelope: (
    <>
      <Ground rx={22} />
      <rect x="6" y="16" width="52" height="36" rx="6" className={f('yd')} />
      <rect x="6" y="14" width="52" height="36" rx="6" className={f('yl')} />
      <path className={f('y')} d="M6 20l26 17 26-17v-1a5 5 0 0 0-5-5H11a5 5 0 0 0-5 5Z" />
      <circle cx="32" cy="34" r="6" className={f('r')} />
      <path className={f('w')} d="M32 38c-3-2-4-3-4-5a2 2 0 0 1 4-1 2 2 0 0 1 4 1c0 2-1 3-4 5Z" />
    </>
  ),

  // ── Account: passwords and links ─────────────────────────────────────
  linkBroken: (
    <>
      <Ground rx={20} />
      <g transform="rotate(-32 32 32)">
        <path className={s('std')} strokeWidth="7.5" d="M25 25.4H16.5a8.6 8.6 0 0 0 0 17.2H25" />
        <path className={s('std')} strokeWidth="7.5" d="M39 25.4h8.5a8.6 8.6 0 0 1 0 17.2H39" />
        <path className={s('st')} strokeWidth="7.5" d="M25 23H16.5a8.6 8.6 0 0 0 0 17.2H25" />
        <path className={s('st')} strokeWidth="7.5" d="M39 23h8.5a8.6 8.6 0 0 1 0 17.2H39" />
        <path className={s('stl')} strokeWidth="2.4" d="M12 26.6a6 6 0 0 1 4.5-1.6h4" />
        <path className={s('stl')} strokeWidth="2.4" d="M43 25h4.5" />
        <path className={s('r')} strokeWidth="3" d="M32 15.5v5M32 43v5M26.5 17.5l2 3.4M37.5 45.5l-2-3.4" />
      </g>
    </>
  ),
  seal: (
    <>
      <Ground rx={18} />
      <path className={f('gd')} d={scallop(32, 32.4, 23)} />
      <path className={f('g')} d={scallop(32, 30, 23)} />
      <circle cx="32" cy="30" r="16" className={f('gl')} opacity="0.5" />
      <path className={s('w')} strokeWidth="5.2" d="M23.5 30.5l6 6L41 24.5" />
      <Sparkle x={52} y={10} r={5.4} k="y" />
    </>
  ),
  phone: (
    <>
      <Ground rx={14} />
      <rect x="16" y="5" width="32" height="54" rx="8" className={f('k')} />
      <rect x="19" y="10" width="26" height="44" rx="5" className={f('sky')} />
      <rect x="27" y="7" width="10" height="2.4" rx="1.2" className={f('kl')} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) =>
          r === 1 && c === 1 ? null : (
            <rect key={`${r}${c}`} x={22 + c * 7.4} y={15 + r * 9} width="5.4" height="5.4" rx="1.6" className={f(['bl', 'gl', 'yl', 'p', 'vl', 'gl', 'bl', 'yl'][r * 3 + c] ?? 'bl')} />
          ),
        ),
      )}
      <rect x="28.6" y="22.6" width="6.8" height="6.8" rx="2" className={f('b')} />
      <rect x="22" y="42" width="20" height="7" rx="3.5" className={f('w')} />
    </>
  ),
  // ── The app's menu and bottom bar ──────────────────────────────────────
  home: (
    <>
      <Ground rx={20} />
      <rect x="43" y="10" width="7" height="14" rx="1.6" className={f('rd')} />
      <rect x="12" y="28" width="40" height="28" rx="4" className={f('stl')} />
      <rect x="12" y="27" width="40" height="27" rx="4" className={f('w')} />
      <rect x="13" y="28" width="38" height="25" rx="3" className={s('stl')} strokeWidth="2" />
      <path className={f('bd')} d="M5 33L32 10l27 23a3 3 0 0 1-2 5.2H7A3 3 0 0 1 5 33Z" />
      <path className={f('b')} d="M5 31L32 8l27 23a3 3 0 0 1-2 5.2H7A3 3 0 0 1 5 31Z" />
      <path className={f('hi')} d="M14 28L32 13l4 3.4-20 16Z" opacity="0.35" />
      <rect x="26" y="38" width="12" height="16" rx="3" className={f('y')} />
      <circle cx="35" cy="46.5" r="1.4" className={f('yd')} />
      <rect x="17" y="40" width="6" height="6" rx="1.5" className={f('sky')} />
      <rect x="41" y="40" width="6" height="6" rx="1.5" className={f('sky')} />
    </>
  ),
  notebook: (
    <>
      <Ground rx={18} />
      <rect x="13" y="7" width="40" height="49" rx="6" className={f('gd')} />
      <rect x="16" y="7" width="37" height="46" rx="5" className={f('g')} />
      <rect x="13" y="7" width="8" height="49" rx="4" className={f('gd')} />
      <rect x="16" y="53" width="36" height="3" rx="1.5" className={f('w')} opacity="0.9" />
      <rect x="26" y="15" width="21" height="10" rx="3" className={f('w')} />
      <rect x="29" y="18.5" width="15" height="3" rx="1.5" className={f('gl')} />
      <path className={f('r')} d="M40 44v16l4.5-3.4L49 60V44Z" />
      <rect x="23" y="11" width="3" height="38" rx="1.5" className={f('hi')} />
    </>
  ),
  trophy: (
    <>
      <Ground rx={16} />
      <path className={s('yd')} strokeWidth="5" d="M18 15h-5.5a7 7 0 0 0 8 12M46 15h5.5a7 7 0 0 1-8 12" />
      <path className={f('yd')} d="M17 9h30v13a15 15 0 0 1-30 0Z" />
      <path className={f('y')} d="M17 7h30v13a15 15 0 0 1-30 0Z" />
      <rect x="28" y="34" width="8" height="11" className={f('yd')} />
      <rect x="18" y="43" width="28" height="11" rx="3.4" className={f('kl')} />
      <rect x="24" y="47" width="16" height="3" rx="1.5" className={f('y')} />
      <Sparkle x={32} y={18} r={6.5} k="w" />
      <rect x="20.5" y="10" width="3.4" height="12" rx="1.7" className={f('hi')} />
    </>
  ),
  shop: (
    <>
      <Ground rx={22} />
      <rect x="9" y="25" width="46" height="31" rx="4" className={f('stl')} />
      <rect x="9" y="24" width="46" height="30" rx="4" className={f('w')} />
      <rect x="10" y="25" width="44" height="28" rx="3" className={s('stl')} strokeWidth="2" />
      <rect x="14" y="33" width="16" height="13" rx="3" className={f('sky')} />
      <rect x="35" y="33" width="14" height="21" rx="3" className={f('b')} />
      <circle cx="45" cy="44" r="1.4" className={f('w')} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} className={f(i % 2 ? 'w' : 'r')}>
          <rect x={6 + i * 10.4} y="12" width="10.4" height="12" />
          <circle cx={11.2 + i * 10.4} cy="24" r="5.2" />
        </g>
      ))}
      <rect x="6" y="9" width="52" height="5" rx="2.5" className={f('rd')} />
      <circle cx="32" cy="7" r="5" className={f('y')} />
    </>
  ),
  avatar: (
    <>
      <Ground rx={18} />
      <circle cx="32" cy="32" r="24" className={f('vd')} />
      <circle cx="32" cy="30" r="24" className={f('v')} />
      <circle cx="32" cy="24" r="9" className={f('w')} />
      <path className={f('w')} d="M15 46c2-8 9-12 17-12s15 4 17 12a24 24 0 0 1-34 0Z" />
      <circle cx="28.6" cy="23.5" r="1.4" className={f('vd')} />
      <circle cx="35.4" cy="23.5" r="1.4" className={f('vd')} />
      <path className={s('vd')} strokeWidth="1.8" d="M29.5 27.5q2.5 2 5 0" />
    </>
  ),
  more: (
    <>
      <Ground rx={16} />
      <circle cx="32" cy="32" r="23" className={f('td')} />
      <circle cx="32" cy="30" r="23" className={f('t')} />
      <circle cx="21" cy="30" r="4.6" className={f('w')} />
      <circle cx="32" cy="30" r="4.6" className={f('w')} />
      <circle cx="43" cy="30" r="4.6" className={f('w')} />
    </>
  ),
  gear: (
    <>
      <Ground rx={16} />
      <g className={f('std')}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x="27" y="6" width="10" height="12" rx="2.6" transform={`rotate(${i * 45} 32 31)`} />
        ))}
      </g>
      <circle cx="32" cy="32" r="18" className={f('std')} />
      <circle cx="32" cy="31" r="17" className={f('st')} />
      <circle cx="32" cy="31" r="8.4" className={f('b')} />
      <circle cx="32" cy="31" r="3.6" className={f('w')} />
    </>
  ),
  lifebuoy: (
    <>
      <Ground rx={16} />
      <circle cx="32" cy="33" r="22" className={f('rd')} />
      <circle cx="32" cy="31" r="22" className={f('r')} />
      <circle cx="32" cy="31" r="16" className={s('w')} strokeWidth="12" strokeDasharray="12.57 12.57" transform="rotate(-22 32 31)" />
      <circle cx="32" cy="31" r="10" className={f('w')} />
      <circle cx="32" cy="31" r="10" className={s('rd')} strokeWidth="2" />
    </>
  ),
  map: (
    <>
      <Ground rx={22} />
      <path className={f('gl')} d="M6 15l17-5v40L6 55Z" />
      <path className={f('g')} d="M23 10l18 5v40l-18-5Z" />
      <path className={f('gl')} d="M41 15l17-5v40l-17 5Z" />
      <path className={s('w')} strokeWidth="2.8" strokeDasharray="1 5.5" d="M11 46c6-8 13-4 17-11s12-12 20-11" />
      <path className={f('r')} d="M48 32c-5-6-7-9-7-12a7 7 0 0 1 14 0c0 3-2 6-7 12Z" />
      <circle cx="48" cy="19.6" r="2.7" className={f('w')} />
    </>
  ),
  clapper: (
    <>
      <Ground rx={20} />
      <rect x="8" y="26" width="48" height="30" rx="5" className={f('k')} />
      <path className={f('w')} d="M12 26h7l-4 8H8v-3Zm14 0h7l-4 8h-7Zm14 0h7l-4 8h-7Z" opacity="0.9" />
      <g transform="rotate(-14 9 25)">
        <rect x="8" y="13" width="48" height="10" rx="3" className={f('kl')} />
        <path className={f('w')} d="M14 13h6l-5 10H9Zm14 0h6l-5 10h-6Zm14 0h6l-5 10h-6Z" opacity="0.9" />
      </g>
      <path className={f('y')} d="M27 38l13 7.5L27 53Z" />
    </>
  ),
  easel: (
    <>
      <Ground rx={18} />
      <path className={s('yd')} strokeWidth="4" d="M21 44l-6 14M43 44l6 14M32 44v13" />
      <rect x="7" y="9" width="50" height="36" rx="4" className={f('stl')} />
      <rect x="7" y="8" width="50" height="35" rx="4" className={f('w')} />
      <rect x="8" y="9" width="48" height="33" rx="3" className={s('stl')} strokeWidth="2" />
      <rect x="15" y="27" width="7" height="10" rx="1.6" className={f('g')} />
      <rect x="26" y="21" width="7" height="16" rx="1.6" className={f('b')} />
      <rect x="37" y="15" width="7" height="22" rx="1.6" className={f('v')} />
      <Sparkle x={50} y={16} r={4.4} k="y" />
      <rect x="27" y="4" width="10" height="6" rx="3" className={f('yd')} />
    </>
  ),
  door: (
    <>
      <Ground rx={18} />
      <rect x="9" y="6" width="32" height="51" rx="4" className={f('std')} />
      <rect x="12" y="9" width="26" height="46" rx="3" className={f('r')} />
      <rect x="15" y="13" width="20" height="16" rx="2" className={f('rd')} opacity="0.55" />
      <circle cx="33" cy="34" r="2.4" className={f('y')} />
      <path className={s('g')} strokeWidth="5.4" d="M36 33h20M49 25.5L56.5 33 49 40.5" />
    </>
  ),
  people: (
    <>
      <Ground rx={22} />
      <path className={f('b')} d="M7 55a13 13 0 0 1 26 0Z" />
      <circle cx="20" cy="30" r="8" className={f('bl')} />
      <circle cx="17.4" cy="29.4" r="1.3" className={f('k')} />
      <circle cx="22.6" cy="29.4" r="1.3" className={f('k')} />
      <path className={f('g')} d="M29 55a14 14 0 0 1 28 0Z" />
      <circle cx="43" cy="28" r="9" className={f('gl')} />
      <circle cx="40.2" cy="27.4" r="1.4" className={f('k')} />
      <circle cx="45.8" cy="27.4" r="1.4" className={f('k')} />
      <path className={f('r')} d="M32 17c-5-3-7-5.6-7-8.2a3.6 3.6 0 0 1 7-1.2 3.6 3.6 0 0 1 7 1.2c0 2.6-2 5.2-7 8.2Z" />
    </>
  ),
  ice: (
    <>
      <Ground rx={16} />
      <path className={f('b')} d="M32 5l19 11v22L32 58 13 38V16Z" />
      <path className={f('bl')} d="M32 5l19 11v22L32 58Z" opacity="0.9" />
      <path className={f('sky')} d="M32 5l19 11-19 11-19-11Z" />
      <path className={f('w')} d="M32 22c4 6 7 9 7 13a7 7 0 0 1-14 0c0-4 3-7 7-13Z" opacity="0.95" />
      <path className={f('b')} d="M32 30c2 3 3.5 4.6 3.5 6.5a3.5 3.5 0 0 1-7 0c0-1.9 1.5-3.5 3.5-6.5Z" opacity="0.7" />
      <rect x="17" y="18" width="3" height="10" rx="1.5" className={f('hi')} />
      <Sparkle x={52} y={8} r={4} k="sky" />
    </>
  ),
  gift: (
    <>
      <Ground />
      <rect x="10" y="27" width="44" height="28" rx="5" className={f('vd')} />
      <rect x="10" y="26" width="44" height="27" rx="5" className={f('v')} />
      <rect x="7" y="18" width="50" height="12" rx="4" className={f('vl')} />
      <rect x="28.5" y="18" width="7" height="35" className={f('y')} />
      <path className={f('y')} d="M32 18c-6-10-17-8-14-2 2 3 8 3 14 2Zm0 0c6-10 17-8 14-2-2 3-8 3-14 2Z" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type ArtName = keyof typeof DRAWINGS;

export function Art({
  name,
  size = 56,
  className,
  wiggle = false,
}: {
  name: ArtName;
  size?: number;
  className?: string;
  /** Replays the happy wiggle whenever the key changes (selection). */
  wiggle?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={[css.art, wiggle ? css.wiggle : '', className ?? ''].join(' ')}
    >
      {DRAWINGS[name]}
    </svg>
  );
}

/** The drawing for a learning topic, from the course's category name. */
export function topicArt(category: string): ArtName {
  const c = category.toLowerCase();
  if (/\bai\b|artificial|machine|intelligence|prompt/.test(c)) return 'spark';
  if (/cod|program|develop|web|software|python|javascript/.test(c)) return 'code';
  if (/data|analytic|statistic/.test(c)) return 'pie';
  if (/communicat|speak|writ|negotiat|conflict/.test(c)) return 'bubbles';
  if (/lead|manag/.test(c)) return 'mountain';
  if (/financ|money|invest|budget/.test(c)) return 'coins';
  if (/business|entrepreneur|startup|marketing|sales/.test(c)) return 'briefcase';
  if (/career|job|interview/.test(c)) return 'badge';
  return 'book';
}
