/**
 * Teyro's small full-colour emblems: the lesson player's chips, pills, tiles
 * and outro stats. Same look as the Art illustrations (flat, chunky, a darker
 * underside and a soft highlight, brand palette from art.module.css), drawn
 * on a 24-unit grid so they stay crisp at 16–28px where a 64-unit drawing
 * turns to mud. Plain UI controls (close, chevrons) stay Glyphs.
 *
 * Decorative by default; pass `label` when the emblem stands alone.
 */

import type { ReactNode } from 'react';
import css from './art.module.css';

const f = (k: string) => css[`f-${k}`];
const s = (k: string) => css[`s-${k}`];

const face = (mouth: ReactNode, tone = 'y', toneDark = 'yd') => (
  <>
    <circle cx="12" cy="12.6" r="9.6" className={f(toneDark)} />
    <circle cx="12" cy="11.6" r="9.6" className={f(tone)} />
    <ellipse cx="8.2" cy="6.8" rx="2.4" ry="1.3" className={f('hi')} transform="rotate(-30 8.2 6.8)" />
    {mouth}
  </>
);
const eyes = (
  <>
    <ellipse cx="8.8" cy="10" rx="1.3" ry="1.7" className={f('k')} />
    <ellipse cx="15.2" cy="10" rx="1.3" ry="1.7" className={f('k')} />
  </>
);

const EMBLEMS = {
  // ── Lesson phases ──────────────────────────────────────────────────────
  book: (
    <>
      <path className={f('bd')} d="M1.8 6.6c3.8-1.8 7.2-1.5 10.2.8v13.8c-3-2.2-6.4-2.5-10.2-.8Z" />
      <path className={f('b')} d="M22.2 6.6c-3.8-1.8-7.2-1.5-10.2.8v13.8c3-2.2 6.4-2.5 10.2-.8Z" />
      <path className={f('w')} d="M3.8 7.6c2.8-1 5.2-.7 7.2.8v10.4c-2-1.3-4.4-1.6-7.2-.8Z" />
      <path className={f('w')} d="M20.2 7.6c-2.8-1-5.2-.7-7.2.8v10.4c2-1.3 4.4-1.6 7.2-.8Z" />
      <path className={s('bl')} strokeWidth="1.3" d="M5.6 10.4c1.4-.4 2.6-.3 3.6.3M5.6 13.2c1.4-.4 2.6-.3 3.6.3M18.4 10.4c-1.4-.4-2.6-.3-3.6.3M18.4 13.2c-1.4-.4-2.6-.3-3.6.3" />
    </>
  ),
  dumbbell: (
    <>
      <rect x="7" y="10.6" width="10" height="2.8" rx="1.2" className={f('std')} />
      <rect x="2" y="8.6" width="3.4" height="6.8" rx="1.4" className={f('gd')} />
      <rect x="4.4" y="5.4" width="4" height="13.2" rx="1.8" className={f('g')} />
      <rect x="18.6" y="8.6" width="3.4" height="6.8" rx="1.4" className={f('gd')} />
      <rect x="15.6" y="5.4" width="4" height="13.2" rx="1.8" className={f('g')} />
      <rect x="5.2" y="6.6" width="1.2" height="5" rx="0.6" className={f('hi')} />
      <rect x="16.4" y="6.6" width="1.2" height="5" rx="0.6" className={f('hi')} />
    </>
  ),
  pencil: (
    <>
      <path className={f('yd')} d="M16.4 2.8l4.8 4.8L9 19.8 4.2 15Z" />
      <path className={f('y')} d="M16.4 2.8l2.4 2.4L6.6 17.4 4.2 15Z" />
      <path className={f('p')} d="M16.4 2.8l1.6-1.6a1.7 1.7 0 0 1 2.4 0l2.4 2.4a1.7 1.7 0 0 1 0 2.4l-1.6 1.6Z" />
      <path className={f('st')} d="M15 4.2l1.4-1.4 4.8 4.8-1.4 1.4Z" />
      <path className={f('yl')} d="M4.2 15L9 19.8l-6.4 1.6Z" />
      <path className={f('k')} d="M2.9 19.1l2 2-2.3.6Z" />
    </>
  ),
  bulb: (
    <>
      <path className={f('yd')} d="M12 2.2a7.4 7.4 0 0 0-4.6 13.2c.9.7 1.3 1.5 1.3 2.4h6.6c0-.9.4-1.7 1.3-2.4A7.4 7.4 0 0 0 12 2.2Z" />
      <path className={f('y')} d="M12 2.2a7.4 7.4 0 0 0-4.6 13.2c.9.7 1.3 1.5 1.3 2.4h4.6c0-.9.4-1.7 1.3-2.4A7.4 7.4 0 0 0 12 2.2Z" />
      <ellipse cx="9.2" cy="6.8" rx="1.6" ry="2.4" className={f('hi')} transform="rotate(30 9.2 6.8)" />
      <rect x="8.6" y="17.6" width="6.8" height="2.4" rx="1.1" className={f('std')} />
      <rect x="9.4" y="19.6" width="5.2" height="2.4" rx="1.1" className={f('st')} />
    </>
  ),

  // ── Chips and stats ────────────────────────────────────────────────────
  clock: (
    <>
      <circle cx="12" cy="13" r="10" className={f('bd')} />
      <circle cx="12" cy="12" r="10" className={f('b')} />
      <circle cx="12" cy="12" r="7.2" className={f('w')} />
      <path className={s('k')} strokeWidth="2" d="M12 7.6V12l3 1.8" />
      <circle cx="12" cy="12" r="1.3" className={f('r')} />
      <ellipse cx="7.2" cy="5.8" rx="1.8" ry="1" className={f('hi')} transform="rotate(-35 7.2 5.8)" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="13" r="10" className={f('rd')} />
      <circle cx="12" cy="12" r="10" className={f('r')} />
      <circle cx="12" cy="12" r="7" className={f('w')} />
      <circle cx="12" cy="12" r="4.2" className={f('r')} />
      <circle cx="12" cy="12" r="1.6" className={f('w')} />
      <path className={s('k')} strokeWidth="1.8" d="M12 12l7.6-7.6" />
      <path className={f('b')} d="M19.2 1.6l.4 3 3 .4-2.6 2.6-3.4-.4-.4-3.4Z" />
    </>
  ),
  sparkle: (
    <>
      <path className={f('vd')} d="M10 3.6c.8 5.2 2.6 7 7.8 7.8-5.2.8-7 2.6-7.8 7.8-.8-5.2-2.6-7-7.8-7.8 5.2-.8 7-2.6 7.8-7.8Z" transform="translate(0 1)" />
      <path className={f('v')} d="M10 3.6c.8 5.2 2.6 7 7.8 7.8-5.2.8-7 2.6-7.8 7.8-.8-5.2-2.6-7-7.8-7.8 5.2-.8 7-2.6 7.8-7.8Z" />
      <path className={f('y')} d="M18.6 1.6c.4 2.2 1.2 3 3.4 3.4-2.2.4-3 1.2-3.4 3.4-.4-2.2-1.2-3-3.4-3.4 2.2-.4 3-1.2 3.4-3.4Z" />
      <path className={f('y')} d="M18.8 15.6c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" />
    </>
  ),
  flag: (
    <>
      <rect x="4" y="2.6" width="2.6" height="19.4" rx="1.3" className={f('std')} />
      <path className={f('rd')} d="M6.4 4h12.4l-3 4.6 3 4.6H6.4Z" transform="translate(0 1)" />
      <path className={f('r')} d="M6.4 4h12.4l-3 4.6 3 4.6H6.4Z" />
      <rect x="8" y="5.4" width="5" height="1.4" rx="0.7" className={f('hi')} />
    </>
  ),
  trophy: (
    <>
      <path className={s('yd')} strokeWidth="2.2" d="M6.6 5.6H3.6c0 3 1.6 4.8 3.8 5.2M17.4 5.6h3c0 3-1.6 4.8-3.8 5.2" />
      <path className={f('yd')} d="M6.4 3h11.2v6.4a5.6 5.6 0 0 1-11.2 0Z" />
      <path className={f('y')} d="M6.4 3h8.4v6.4a5.6 5.6 0 0 1-8.4 4.8Z" />
      <rect x="10.6" y="14.4" width="2.8" height="3.6" className={f('yd')} />
      <rect x="7" y="17.8" width="10" height="3.6" rx="1.4" className={f('od')} />
      <rect x="8" y="4.4" width="1.6" height="5" rx="0.8" className={f('hi')} />
    </>
  ),
  bolt: (
    <>
      <path className={f('od')} d="M13.8 1.6L4 13.4h6.8l-1.6 9 10-12.2h-6.8Z" transform="translate(.6 .6)" />
      <path className={f('y')} d="M13.8 1.6L4 13.4h6.8l-1.6 9 10-12.2h-6.8Z" />
      <path className={f('yl')} d="M13.8 1.6L4 13.4h3.4l6-7.6Z" />
    </>
  ),
  flame: (
    <>
      <path className={f('od')} d="M12.6 1.4c.6 4.4-2.4 6.4-4.4 8.6C6.2 12.2 4.4 14.6 4.4 17a7.6 7.6 0 0 0 15.2 0c0-3.4-1.6-6-3.4-7.8-.2 2.4-1.2 3.6-2.6 4.2 1-4.8-.4-9-1-12Z" />
      <path className={f('o')} d="M12.6 1.4c.6 4.4-2.4 6.4-4.4 8.6C6.2 12.2 4.4 14.6 4.4 17a7.4 7.4 0 0 0 7.6 5.4c-3.2-1.4-4.4-3.6-4.4-6 0-3.6 4-5.4 5-15Z" />
      <path className={f('y')} d="M12.2 12.4c2 2.4 3.8 3.8 3.8 6a4 4 0 0 1-8 0c0-1.8 1.4-3.2 2.6-4.4.4 1 .8 1.4 1.6-1.6Z" />
    </>
  ),
  lock: (
    <>
      <path className={s('std')} strokeWidth="2.6" d="M7.6 10.4V7.8a4.4 4.4 0 0 1 8.8 0v2.6" />
      <rect x="4" y="10.4" width="16" height="11.6" rx="3" className={f('yd')} />
      <rect x="4" y="9.6" width="16" height="11.6" rx="3" className={f('y')} />
      <circle cx="12" cy="14.4" r="1.8" className={f('yd')} />
      <rect x="11.1" y="15" width="1.8" height="3.4" rx="0.9" className={f('yd')} />
      <rect x="5.6" y="11" width="1.4" height="5" rx="0.7" className={f('hi')} />
    </>
  ),
  unlock: (
    <>
      <path className={s('std')} strokeWidth="2.6" d="M7.6 10.4V7.8a4.4 4.4 0 0 1 8.4-1.8" />
      <rect x="4" y="10.4" width="16" height="11.6" rx="3" className={f('gd')} />
      <rect x="4" y="9.6" width="16" height="11.6" rx="3" className={f('g')} />
      <circle cx="12" cy="14.4" r="1.8" className={f('gd')} />
      <rect x="11.1" y="15" width="1.8" height="3.4" rx="0.9" className={f('gd')} />
      <rect x="5.6" y="11" width="1.4" height="5" rx="0.7" className={f('hi')} />
    </>
  ),
  shield: (
    <>
      <path className={f('bd')} d="M12 1.8l8.6 3.2v6.4c0 5.2-3.6 9-8.6 10.8-5-1.8-8.6-5.6-8.6-10.8V5Z" />
      <path className={f('b')} d="M12 1.8v20.4c-5-1.8-8.6-5.6-8.6-10.8V5Z" />
      <path className={s('w')} strokeWidth="2.4" d="M8.2 11.8l2.6 2.6 5-5.2" />
    </>
  ),
  snowflake: (
    <>
      <circle cx="12" cy="12.8" r="10" className={f('bl')} />
      <circle cx="12" cy="12" r="10" className={f('sky')} />
      <path className={s('b')} strokeWidth="2" d="M12 4.6v14.8M5.6 8.3l12.8 7.4M5.6 15.7l12.8-7.4M9.8 5.6L12 7.4l2.2-1.8M9.8 18.4l2.2-1.8 2.2 1.8" />
    </>
  ),
  mountain: (
    <>
      <path className={f('std')} d="M1.6 21.6L9.4 7.4l4 6.4 2.4-3.4 6.6 11.2Z" />
      <path className={f('st')} d="M1.6 21.6L9.4 7.4l2 3.2-5 11Z" />
      <path className={f('w')} d="M7.2 11.4l2.2-4 2.2 3.6-1.2.9-1-1-1 1Z" />
      <rect x="9" y="1.8" width="1.2" height="6" rx="0.6" className={f('k')} />
      <path className={f('r')} d="M10.2 2h4.4l-1.2 1.6 1.2 1.6h-4.4Z" />
    </>
  ),
  climb: (
    <>
      <circle cx="12" cy="12.8" r="10" className={f('gd')} />
      <circle cx="12" cy="12" r="10" className={f('g')} />
      <path className={s('w')} strokeWidth="2.6" d="M7.4 12.6L12 8l4.6 4.6M7.4 17.4L12 12.8l4.6 4.6" />
    </>
  ),
  users: (
    <>
      <path className={f('bd')} d="M13.4 21.6a6 6 0 0 1 9.6-4.8V21.6Z" />
      <circle cx="17.6" cy="9.6" r="3.6" className={f('bl')} />
      <path className={f('g')} d="M1.4 21.6a7.2 7.2 0 0 1 14.4 0Z" />
      <circle cx="8.6" cy="8.6" r="4.4" className={f('gl')} />
      <ellipse cx="7.2" cy="6.6" rx="1.4" ry="0.8" className={f('hi')} transform="rotate(-30 7.2 6.6)" />
    </>
  ),

  layers: (
    <>
      <path className={f('bd')} d="M12 13.6l9.4 4.6L12 22.8l-9.4-4.6Z" />
      <path className={f('g')} d="M12 9.2l9.4 4.6L12 18.4l-9.4-4.6Z" />
      <path className={f('y')} d="M12 4.8l9.4 4.6L12 14l-9.4-4.6Z" />
      <path className={f('yl')} d="M12 4.8l9.4 4.6-3 1.5L9 6.2Z" />
    </>
  ),

  // ── Learn cards ────────────────────────────────────────────────────────
  headphones: (
    <>
      <path className={s('vd')} strokeWidth="2.6" d="M4.4 15v-3a7.6 7.6 0 0 1 15.2 0v3" />
      <rect x="2.4" y="12.8" width="5.6" height="8.6" rx="2.4" className={f('v')} />
      <rect x="16" y="12.8" width="5.6" height="8.6" rx="2.4" className={f('v')} />
      <rect x="3.6" y="14" width="1.4" height="4.4" rx="0.7" className={f('hi')} />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12.8" r="10" className={f('bd')} />
      <circle cx="12" cy="12" r="10" className={f('b')} />
      <rect x="10.6" y="10" width="2.8" height="8" rx="1.4" className={f('w')} />
      <circle cx="12" cy="6.8" r="1.7" className={f('w')} />
    </>
  ),
  warning: (
    <>
      <path className={f('od')} d="M10.4 3.6a1.9 1.9 0 0 1 3.2 0l8.6 15.4a1.9 1.9 0 0 1-1.6 2.8H3.4a1.9 1.9 0 0 1-1.6-2.8Z" transform="translate(0 .8)" />
      <path className={f('y')} d="M10.4 3.6a1.9 1.9 0 0 1 3.2 0l8.6 15.4a1.9 1.9 0 0 1-1.6 2.8H3.4a1.9 1.9 0 0 1-1.6-2.8Z" />
      <rect x="10.7" y="8.4" width="2.6" height="6.6" rx="1.3" className={f('k')} />
      <circle cx="12" cy="17.8" r="1.5" className={f('k')} />
    </>
  ),
  pin: (
    <>
      <path className={s('std')} strokeWidth="2.2" d="M12 14.6v7.4" />
      <path className={f('rd')} d="M7.6 2.4h8.8l-1.4 5.4 3.6 3.4v2.4H5.4v-2.4L9 7.8Z" />
      <path className={f('r')} d="M7.6 2.4h6.6L12.8 7.8l3.6 3.4v2.4H5.4v-2.4L9 7.8Z" />
      <rect x="9" y="3.6" width="1.4" height="3.4" rx="0.7" className={f('hi')} />
    </>
  ),
  notebook: (
    <>
      <rect x="4.6" y="2.6" width="15.4" height="19.4" rx="2.6" className={f('vd')} />
      <rect x="4" y="2" width="15.4" height="19.4" rx="2.6" className={f('v')} />
      <rect x="8.6" y="6" width="7.6" height="1.8" rx="0.9" className={f('vl')} />
      <rect x="8.6" y="10" width="7.6" height="1.8" rx="0.9" className={f('vl')} />
      <rect x="8.6" y="14" width="5" height="1.8" rx="0.9" className={f('vl')} />
      <circle cx="4" cy="6.4" r="1.4" className={f('st')} />
      <circle cx="4" cy="11.6" r="1.4" className={f('st')} />
      <circle cx="4" cy="16.8" r="1.4" className={f('st')} />
    </>
  ),
  flask: (
    <>
      <path className={f('sky')} d="M9.2 2.4h5.6v6.4l5.6 9.8a2.2 2.2 0 0 1-1.9 3.4H5.5a2.2 2.2 0 0 1-1.9-3.4l5.6-9.8Z" />
      <path className={f('g')} d="M6.4 14.2h11.2l2.8 4.4a2.2 2.2 0 0 1-1.9 3.4H5.5a2.2 2.2 0 0 1-1.9-3.4Z" />
      <rect x="8.4" y="1.6" width="7.2" height="2.4" rx="1.2" className={f('std')} />
      <circle cx="10.4" cy="17.6" r="1.2" className={f('gl')} />
      <circle cx="13.8" cy="19" r="0.9" className={f('gl')} />
    </>
  ),
  bot: (
    <>
      <rect x="11.2" y="1.4" width="1.6" height="4" rx="0.8" className={f('std')} />
      <circle cx="12" cy="2.2" r="1.6" className={f('y')} />
      <rect x="3.4" y="6.4" width="17.2" height="15" rx="5" className={f('bd')} />
      <rect x="3.4" y="5.6" width="17.2" height="15" rx="5" className={f('b')} />
      <rect x="6" y="9" width="12" height="7.8" rx="3.4" className={f('n')} />
      <ellipse cx="9.4" cy="12.8" rx="1.4" ry="1.8" className={f('sky')} />
      <ellipse cx="14.6" cy="12.8" rx="1.4" ry="1.8" className={f('sky')} />
    </>
  ),
  bubble: (
    <>
      <path className={f('bd')} d="M3 6.4A3.4 3.4 0 0 1 6.4 3h11.2A3.4 3.4 0 0 1 21 6.4v7.8a3.4 3.4 0 0 1-3.4 3.4h-6.2l-5.4 4.2v-4.2A3.4 3.4 0 0 1 3 14.2Z" transform="translate(0 .8)" />
      <path className={f('b')} d="M3 6.4A3.4 3.4 0 0 1 6.4 3h11.2A3.4 3.4 0 0 1 21 6.4v7.8a3.4 3.4 0 0 1-3.4 3.4h-6.2l-5.4 4.2v-4.2A3.4 3.4 0 0 1 3 14.2Z" />
      <circle cx="8" cy="10.4" r="1.5" className={f('w')} />
      <circle cx="12" cy="10.4" r="1.5" className={f('w')} />
      <circle cx="16" cy="10.4" r="1.5" className={f('w')} />
    </>
  ),
  thumbUp: (
    <>
      <rect x="2" y="10" width="4.6" height="11.6" rx="1.6" className={f('bd')} />
      <path className={f('b')} d="M8.2 10l3.6-7.4a2.6 2.6 0 0 1 2.8 2.8l-.6 3.8h5.4a2.4 2.4 0 0 1 2.3 3l-1.6 6.8a2.4 2.4 0 0 1-2.3 1.8H8.2Z" />
      <rect x="10" y="11" width="1.4" height="6" rx="0.7" className={f('hi')} />
    </>
  ),
  thumbDown: (
    <g transform="rotate(180 12 12)">
      <rect x="2" y="10" width="4.6" height="11.6" rx="1.6" className={f('rd')} />
      <path className={f('r')} d="M8.2 10l3.6-7.4a2.6 2.6 0 0 1 2.8 2.8l-.6 3.8h5.4a2.4 2.4 0 0 1 2.3 3l-1.6 6.8a2.4 2.4 0 0 1-2.3 1.8H8.2Z" />
    </g>
  ),
  faceSmile: face(
    <>
      {eyes}
      <path className={f('k')} d="M7.6 13.6h8.8a4.4 4.4 0 0 1-8.8 0Z" />
      <path className={f('r')} d="M9.6 16.4a2.6 2.6 0 0 1 4.8 0 4.4 4.4 0 0 1-4.8 0Z" />
    </>,
  ),
  faceMeh: face(
    <>
      {eyes}
      <rect x="8.4" y="14.4" width="7.2" height="2" rx="1" className={f('k')} />
    </>,
  ),
  faceUnsure: face(
    <>
      <ellipse cx="8.8" cy="10" rx="1.3" ry="1.7" className={f('k')} />
      <ellipse cx="15.2" cy="10" rx="1.3" ry="1.7" className={f('k')} />
      <path className={s('k')} strokeWidth="1.8" d="M8.4 16c1.2-1 2.4-1 3.6 0s2.4 1 3.6 0" />
    </>,
    'vl',
    'v',
  ),

  // ── Deepen resources ───────────────────────────────────────────────────
  doc: (
    <>
      <path className={f('std')} d="M5.4 2.8h9l5 5v13a1.6 1.6 0 0 1-1.6 1.6H5.4A1.6 1.6 0 0 1 3.8 20.8V4.4a1.6 1.6 0 0 1 1.6-1.6Z" transform="translate(.8 .4)" />
      <path className={f('w')} d="M5.4 2.8h9l5 5v13a1.6 1.6 0 0 1-1.6 1.6H5.4A1.6 1.6 0 0 1 3.8 20.8V4.4a1.6 1.6 0 0 1 1.6-1.6Z" />
      <path className={f('stl')} d="M14.4 2.8v3.4a1.6 1.6 0 0 0 1.6 1.6h3.4Z" />
      <rect x="6.6" y="10.8" width="9.6" height="1.8" rx="0.9" className={f('b')} />
      <rect x="6.6" y="14.4" width="9.6" height="1.8" rx="0.9" className={f('bl')} />
      <rect x="6.6" y="18" width="6" height="1.8" rx="0.9" className={f('bl')} />
    </>
  ),
  folder: (
    <>
      <path className={f('yd')} d="M2 6a2.2 2.2 0 0 1 2.2-2.2h5l2.2 2.4h8.4A2.2 2.2 0 0 1 22 8.4v10.4a2.2 2.2 0 0 1-2.2 2.2H4.2A2.2 2.2 0 0 1 2 18.8Z" />
      <path className={f('y')} d="M2 10a2.2 2.2 0 0 1 2.2-2.2h15.6A2.2 2.2 0 0 1 22 10v8.8a2.2 2.2 0 0 1-2.2 2.2H4.2A2.2 2.2 0 0 1 2 18.8Z" />
      <rect x="4" y="9.6" width="7" height="1.4" rx="0.7" className={f('hi')} />
    </>
  ),
  link: (
    <>
      <path className={s('bd')} strokeWidth="3.4" d="M10.2 13.8a4 4 0 0 0 5.8.2l3-3a4 4 0 0 0-5.7-5.7l-1.2 1.2" />
      <path className={s('b')} strokeWidth="3.4" d="M13.8 10.2a4 4 0 0 0-5.8-.2l-3 3a4 4 0 0 0 5.7 5.7l1.2-1.2" />
    </>
  ),
  video: (
    <>
      <rect x="2" y="5" width="20" height="15" rx="4" className={f('rd')} />
      <rect x="2" y="4" width="20" height="15" rx="4" className={f('r')} />
      <path className={f('w')} d="M10 8.4v7.2l6-3.6Z" />
      <rect x="4" y="6" width="5" height="1.4" rx="0.7" className={f('hi')} />
    </>
  ),
  sheet: (
    <>
      <rect x="3" y="3.6" width="18" height="18" rx="3" className={f('gd')} />
      <rect x="3" y="2.8" width="18" height="18" rx="3" className={f('g')} />
      <rect x="5.4" y="7.6" width="13.2" height="10.8" rx="1.2" className={f('w')} />
      <path className={s('gl')} strokeWidth="1.4" d="M5.4 11.2h13.2M5.4 14.8h13.2M10 7.6v10.8" />
    </>
  ),
  slides: (
    <>
      <path className={s('std')} strokeWidth="2" d="M12 16.4v3.4M8.4 22l3.6-2.2 3.6 2.2" />
      <rect x="2.4" y="3" width="19.2" height="14" rx="2.4" className={f('od')} />
      <rect x="2.4" y="2.2" width="19.2" height="14" rx="2.4" className={f('o')} />
      <rect x="6" y="9.6" width="2.4" height="4" rx="0.8" className={f('w')} />
      <rect x="10.8" y="7" width="2.4" height="6.6" rx="0.8" className={f('w')} />
      <rect x="15.6" y="5.2" width="2.4" height="8.4" rx="0.8" className={f('w')} />
    </>
  ),
  template: (
    <>
      <rect x="2.6" y="3.4" width="18.8" height="18.8" rx="3" className={f('vd')} />
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="3" className={f('v')} />
      <rect x="5" y="5" width="14" height="3.6" rx="1" className={f('w')} />
      <rect x="5" y="10.6" width="5" height="8.4" rx="1" className={f('vl')} />
      <rect x="12" y="10.6" width="7" height="8.4" rx="1" className={f('w')} />
    </>
  ),

  // ── Answers ────────────────────────────────────────────────────────────
  right: (
    <>
      <circle cx="12" cy="12.8" r="10" className={f('gd')} />
      <circle cx="12" cy="12" r="10" className={f('g')} />
      <path className={s('w')} strokeWidth="3" d="M7.2 12.4l3.2 3.2 6.4-6.6" />
    </>
  ),
  wrong: (
    <>
      <circle cx="12" cy="12.8" r="10" className={f('rd')} />
      <circle cx="12" cy="12" r="10" className={f('r')} />
      <path className={s('w')} strokeWidth="3" d="M8.4 8.4l7.2 7.2M15.6 8.4l-7.2 7.2" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12.8" r="10" className={f('gd')} />
      <circle cx="12" cy="12" r="10" className={f('g')} />
      <path className={f('w')} d="M9.6 7.4v9.2l7.2-4.6Z" />
      <ellipse cx="7.4" cy="6" rx="1.8" ry="1" className={f('hi')} transform="rotate(-35 7.4 6)" />
    </>
  ),
  plus: (
    <>
      <circle cx="12" cy="12.8" r="10" className={f('gd')} />
      <circle cx="12" cy="12" r="10" className={f('g')} />
      <path className={s('w')} strokeWidth="3" d="M12 7v10M7 12h10" />
    </>
  ),
  music: (
    <>
      <path className={s('vd')} strokeWidth="2.4" d="M9.4 17.4V5.2l10-2.2v11.6" />
      <path className={f('vd')} d="M9.4 5.2l10-2.2v3.6l-10 2.2Z" />
      <circle cx="6.6" cy="17.6" r="3.4" className={f('v')} />
      <circle cx="16.6" cy="15" r="3.4" className={f('v')} />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type EmblemName = keyof typeof EMBLEMS;

/** Every emblem's name, for the dev bench. */
export const EMBLEM_NAMES = Object.keys(EMBLEMS) as EmblemName[];

export function Emblem({
  name,
  size = 22,
  label,
  className,
}: {
  name: EmblemName;
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      focusable="false"
      className={[css.art, className ?? ''].join(' ')}
      style={{ flexShrink: 0 }}
    >
      {EMBLEMS[name]}
    </svg>
  );
}
