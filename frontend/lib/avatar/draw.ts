/**
 * Draws a Teyro character (lib/avatar/avatar.ts) as an SVG string — the same
 * markup inline in the app (components/ui/Avatar) and as a standalone file
 * (app/avatars/v1/[file]/route.ts) for <img> tags, share cards and emails.
 *
 * Teyro's art style (components/art): bold flat shapes, each sitting on a
 * darker copy of itself a step lower — the chunky underside — plus a lighter
 * highlight. Drawn on a 100-unit grid.
 *
 * The palette is literal colour on purpose: this SVG has to render outside
 * the app too (an <img>, an email), where the brand's CSS variables don't
 * exist. It is art data, kept in this one file, like a drawing's own inks.
 *
 * Every value drawn comes from the fixed tables below, indexed by a
 * validated config — no user text ever reaches the markup.
 */

import { encodeAvatar, type AvatarConfig } from './avatar';

export const AVATAR_BG = ['#CFE3FF', '#CDEFD9', '#FFE0C7', '#E4D9FF', '#FFF0B8', '#FFD6DE', '#C9EEEA', '#EFE6DA'];
export const AVATAR_SKIN = ['#FFE3D1', '#F9CFAE', '#EDB98A', '#D99E6C', '#C1834F', '#A0663A', '#7D4A2A', '#5A3420'];
export const AVATAR_HAIR = ['#2A2420', '#43291A', '#73452A', '#A8552C', '#E8B85A', '#BDB8B2', '#4A63F5', '#E2609E', '#8A5CD0'];
export const AVATAR_SHIRT = ['#3D5AFE', '#22B07D', '#FF8A3D', '#7E57C2', '#E5484D', '#14A6A0', '#F5B82E', '#2F3650', '#EEF1F6'];

const INK = '#1F2433';
const IRIS = '#2B2F45';
const MOUTH = '#7A2335';
const TONGUE = '#FF7E8E';
const BLUSH = '#FF8FA3';
const WHITE = '#FFFFFF';
const GOLD = '#F5B82E';

/** Mix a hex colour toward black (amt > 0) or white (amt < 0). */
function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(amt >= 0 ? c * (1 - amt) : c + (255 - c) * -amt),
  );
  return `#${ch.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

/** A shape on its own darker copy, `drop` units lower: Teyro's chunky edge. */
function chunky(d: string, fill: string, drop = 2.2, dark = 0.2): string {
  return `<path d="${d}" fill="${shade(fill, dark)}" transform="translate(0 ${drop})"/><path d="${d}" fill="${fill}"/>`;
}

const p = (d: string, fill: string, extra = '') => `<path d="${d}" fill="${fill}"${extra}/>`;
const line = (d: string, stroke: string, w: number, extra = '') =>
  `<path d="${d}" stroke="${stroke}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"${extra}/>`;

/** Face shapes, centred on (50, 43), and how far out the ears sit. */
const HEADS = [
  { d: 'M50 21c12 0 20.5 9.4 20.5 21.6S62 65 50 65 29.5 54.8 29.5 42.6 38 21 50 21z', half: 20.5 },
  { d: 'M50 20c11 0 19 9.8 19 22.8S61 66 50 66s-19-10.2-19-23.2S39 20 50 20z', half: 19 },
  { d: 'M44 21h12c8.8 0 15 6.2 15 15v8c0 12-9.4 21-21 21s-21-9-21-21v-8c0-8.8 6.2-15 15-15z', half: 21 },
];

// ── Hair ─────────────────────────────────────────────────────────────────
// Each style: what sits BEHIND the head (length, volume) and what sits ON it
// (the cap and fringe). Both get the chunky underside and a highlight.

function hairBack(style: number, hair: string, wrap: string): string {
  const d = shade(hair, 0.2);
  switch (style) {
    case 4: // afro
      return (
        `<circle cx="50" cy="38" r="31" fill="${d}"/><circle cx="50" cy="36" r="30" fill="${hair}"/>` +
        [[24, 22], [34, 11], [50, 7], [66, 11], [76, 22], [80, 38], [20, 38]]
          .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${hair}"/>`)
          .join('')
      );
    case 5: // bun
      return `<circle cx="50" cy="16" r="10.5" fill="${d}"/><circle cx="50" cy="14.4" r="10" fill="${hair}"/>` + line('M44.6 11.4q5-3.6 10.4-.4', shade(hair, -0.3), 2, ' opacity=".6"');
    case 6: // long
      return chunky('M27 46C25 24 36 13 50 13s25 11 23 33l3.6 38c-7 7-46 7-53 0z', hair, 2.4);
    case 7: // bob
      return chunky('M26 50c-2-25 10-36 24-36s26 11 24 36c0 8-2.6 13.6-6.4 16H32.4C28.6 63.6 26 58 26 50z', hair, 2.4);
    case 8: // locs
      return [21, 27.6, 72.4, 79]
        .map((x, i) => `<rect x="${x - 3.6}" y="${30 + (i % 2) * 3}" width="7.2" height="${48 - (i % 2) * 6}" rx="3.6" fill="${i % 2 ? d : hair}"/>`)
        .join('');
    case 11: // head wrap
      return chunky('M21 50c-2-26 12-38 29-38s31 12 29 38c0 13-6 21-14 24H35c-8-3-14-11-14-24z', wrap, 2.4);
    case 12: // two puffs
      return [27, 73]
        .map((x) => `<circle cx="${x}" cy="17" r="11.5" fill="${d}"/><circle cx="${x}" cy="15.4" r="11" fill="${hair}"/>`)
        .join('');
    case 13: // ponytail
      return chunky('M68 30c9 2 14 10 13 22-1 9-5 15-9 18 1-7 0-14-4-20-2-3-3-12 0-20z', hair, 2);
    default:
      return '';
  }
}

function hairFront(style: number, hair: string, wrap: string): string {
  const hi = shade(hair, -0.32);
  const shine = (d: string) => line(d, hi, 2.2, ' opacity=".75"');
  switch (style) {
    case 1: // short crop
      return chunky('M29 45C26 26 36.6 15 50 15s24 11 21 30c-1.6-8-4.6-12.6-9.4-14.6C55 34 45 34.4 38.4 30.6 33.6 32.6 30.6 37 29 45z', hair) + shine('M40 20.4c4-1.8 9-2.2 13-1');
    case 2: // buzz
      return `<path d="M30.6 38c.6-11.4 9-18.6 19.4-18.6S68.8 26.6 69.4 38c-5-5.2-11.8-7.6-19.4-7.6S35.6 32.8 30.6 38z" fill="${hair}" opacity=".88"/>`;
    case 3: // quiff
      return chunky('M29 45C25.6 25 37 12 54 13c14 .8 22 12 18 31-1.4-7.6-4.6-12-9.6-13.4C54 36.6 40 35.4 29 45z', hair) + shine('M52 17.4c5.4.2 10 2.6 12.6 6.6');
    case 4: // afro (front edge)
      return chunky('M31 34c4-8 11-11.6 19-11.6S65 26 69 34c-6-3.6-12.4-5-19-5s-13 1.4-19 5z', hair, 1.6);
    case 5: // bun (pulled back)
    case 13: // ponytail (pulled back)
      return chunky('M29.6 42C28 27 37.6 17.6 50 17.6S72 27 70.4 42C67 32 59.6 26.6 50 26.6S33 32 29.6 42z', hair, 1.8) + shine('M41.6 21.4c4.4-1.6 9-1.6 13 0');
    case 6: // long, middle part
      return chunky('M29 47C27 27 37 15.6 50 15.6S73 27 71 47c-2-12.4-8.4-19-18.4-20L50 31.4 47.4 27C37.4 28 31 34.6 29 47z', hair, 1.8) + shine('M56 20c4.4 1.4 8 4.4 10 8.6');
    case 7: // bob, blunt fringe
      return chunky('M29.4 41C29 25 38.6 16.6 50 16.6S71 25 70.6 41c-6.6-4.8-35-4.8-41.2 0z', hair, 1.8) + shine('M42 21c4-1.4 9-1.4 13 .4');
    case 8: // locs (cap)
      return chunky('M29.6 40C29.4 26 38.6 17.6 50 17.6S70.6 26 70.4 40c-4-6.6-11.4-10-20.4-10s-16.4 3.4-20.4 10z', hair, 1.8) + line('M38 22.4l2.4 7M50 19v8.6M62 22.4l-2.4 7', shade(hair, 0.25), 1.6, ' opacity=".6"');
    case 9: // curly top
      return (
        `<g fill="${shade(hair, 0.2)}" transform="translate(0 2)">${CURLS}</g><g fill="${hair}">${CURLS}</g>` +
        `<g fill="${hi}" opacity=".5"><circle cx="40" cy="18.6" r="2.2"/><circle cx="56" cy="16.6" r="2.2"/><circle cx="66" cy="23" r="1.8"/></g>`
      );
    case 10: // spiky
      return chunky('M29.4 43V30l6 3.4 1.4-12.4 6.4 7.6L50 15.4l6.8 13.2 6.4-7.6 1.4 12.4 6-3.4v13c-4.4-9-11.8-12.6-20.6-12.6S33.8 34 29.4 43z', hair);
    case 11: // wrap: front band and knot
      return (
        chunky('M29.6 37c4.4-12.4 36.4-12.4 40.8 0-9.6-5.4-31.2-5.4-40.8 0z', shade(wrap, 0.08), 1.6) +
        chunky('M54 14c4-6 12-6 13 0 1 5-5 7-9 5-1.6 3-6 3.4-7.4.4-1.4-3 1.4-5.2 3.4-5.4z', shade(wrap, -0.08), 1.6)
      );
    case 14: // undercut: faded sides, a high swept-back quiff, forehead clear
      return (
        p('M29.8 44c-.6-7 .4-12.6 3.2-16.6 1.4 4 1.6 9.6.8 16.6zM70.2 44c.6-7-.4-12.6-3.2-16.6-1.4 4-1.6 9.6-.8 16.6z', hair, ' opacity=".55"') +
        chunky('M32.6 31.4C30 19.4 38.6 9.6 52 9.6c12.6 0 20 7.6 17.4 19.4-2.8-4.4-8-6.6-14-6.4C47.4 23 39.6 25.4 32.6 31.4z', hair, 2) +
        line('M41 18.4c4.6-4.4 12.6-5.6 19-3.2M45.6 22.6c4.4-2.6 10.4-3.4 15-2.2', hi, 2, ' opacity=".7"')
      );
    case 12: // two puffs (centre part)
      return chunky('M29.6 41C28.6 27 38 18 50 18s21.4 9 20.4 23c-3.4-8.4-10.8-13-20.4-13s-17 4.6-20.4 13z', hair, 1.8) + line('M50 18.4v8', shade(hair, 0.3), 1.6, ' opacity=".7"');
    default:
      return '';
  }
}

const CURLS = [
  [32, 31, 8],
  [36.6, 22, 8.6],
  [44.4, 16.4, 8.8],
  [55, 15.6, 8.8],
  [63.6, 21, 8.6],
  [68.4, 30.4, 8],
]
  .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`)
  .join('');

// ── Face ─────────────────────────────────────────────────────────────────

const EYE_L = 41.6;
const EYE_R = 58.4;
const EYE_Y = 45;

function eye(x: number, kind: 'bright' | 'arc' | 'dot' | 'sleepy' | 'lash' | 'side' | 'narrow', skinD: string): string {
  switch (kind) {
    case 'side':
      // Unimpressed: a flat heavy lid, the pupil slid to the corner.
      return (
        `<ellipse cx="${x}" cy="${EYE_Y + 0.4}" rx="4.2" ry="4.4" fill="${WHITE}"/><circle cx="${x + 1.9}" cy="${EYE_Y + 1.4}" r="2.5" fill="${IRIS}"/>` +
        `<path d="M${x - 4.8} ${EYE_Y - 0.6}a4.8 4.8 0 0 1 9.6 0z" fill="${skinD}"/>` +
        line(`M${x - 4.8} ${EYE_Y - 0.6}h9.6`, INK, 1.8)
      );
    case 'narrow':
      return (
        `<ellipse cx="${x}" cy="${EYE_Y + 0.6}" rx="4.2" ry="3.2" fill="${WHITE}"/><circle cx="${x}" cy="${EYE_Y + 0.8}" r="2.4" fill="${IRIS}"/>` +
        line(`M${x - 4.6} ${EYE_Y - 1.6 + (x < 50 ? -0.8 : 0.8)}L${x + 4.6} ${EYE_Y - 1.6 + (x < 50 ? 0.8 : -0.8)}`, INK, 2)
      );
    case 'arc':
      return line(`M${x - 4} ${EYE_Y + 1}q4-4.6 8 0`, INK, 2.8);
    case 'dot':
      return `<circle cx="${x}" cy="${EYE_Y}" r="3.4" fill="${INK}"/><circle cx="${x + 1.2}" cy="${EYE_Y - 1.2}" r="1.1" fill="${WHITE}"/>`;
    case 'sleepy':
      return (
        `<ellipse cx="${x}" cy="${EYE_Y + 0.4}" rx="4" ry="4.4" fill="${WHITE}"/><circle cx="${x}" cy="${EYE_Y + 1.6}" r="2.7" fill="${IRIS}"/>` +
        `<path d="M${x - 4.6} ${EYE_Y + 0.4}a4.6 4.6 0 0 1 9.2 0z" fill="${skinD}"/>` +
        line(`M${x - 4.6} ${EYE_Y + 0.4}h9.2`, INK, 1.6)
      );
    default: {
      const base =
        `<ellipse cx="${x}" cy="${EYE_Y}" rx="4" ry="4.7" fill="${WHITE}"/>` +
        `<circle cx="${x + 0.3}" cy="${EYE_Y + 0.6}" r="2.9" fill="${IRIS}"/>` +
        `<circle cx="${x + 1.4}" cy="${EYE_Y - 0.7}" r="1.15" fill="${WHITE}"/>`;
      if (kind !== 'lash') return base;
      const out = x < 50 ? -1 : 1;
      return base + line(`M${x + out * 3.2} ${EYE_Y - 3.4}l${out * 2.2} -1.8M${x + out * 4} ${EYE_Y - 1.4}l${out * 2.6} -.6`, INK, 1.4);
    }
  }
}

function eyes(style: number, skinD: string): string {
  switch (style) {
    case 1:
      return eye(EYE_L, 'arc', skinD) + eye(EYE_R, 'arc', skinD);
    case 2:
      return eye(EYE_L, 'dot', skinD) + eye(EYE_R, 'dot', skinD);
    case 3:
      return eye(EYE_L, 'sleepy', skinD) + eye(EYE_R, 'sleepy', skinD);
    case 4:
      return eye(EYE_L, 'bright', skinD) + eye(EYE_R, 'arc', skinD);
    case 5:
      return eye(EYE_L, 'lash', skinD) + eye(EYE_R, 'lash', skinD);
    case 6:
      return eye(EYE_L, 'side', skinD) + eye(EYE_R, 'side', skinD);
    case 7:
      return eye(EYE_L, 'narrow', skinD) + eye(EYE_R, 'narrow', skinD);
    default:
      return eye(EYE_L, 'bright', skinD) + eye(EYE_R, 'bright', skinD);
  }
}

/** Brows as filled shapes in the hair colour (darkened for light hair). */
function brows(style: number, hair: string): string {
  const c = shade(hair, 0.15);
  const pair = (l: string, r: string) => p(l, c) + p(r, c);
  switch (style) {
    case 1: // straight, bold
      return pair('M36.4 36.6h10.4a1.6 1.6 0 0 1 0 3.2H36.4a1.6 1.6 0 0 1 0-3.2z', 'M53.2 36.6h10.4a1.6 1.6 0 0 1 0 3.2H53.2a1.6 1.6 0 0 1 0-3.2z');
    case 2: // raised
      return pair('M36 37.6c3-4 8-4.6 11.4-2.4l-.8 2.4c-3-1.4-6.6-.8-8.8 1.6z', 'M64 37.6c-3-4-8-4.6-11.4-2.4l.8 2.4c3-1.4 6.6-.8 8.8 1.6z');
    case 3: // determined
      return pair('M36.4 35.4l11 3.2-.8 2.6-11-2.6z', 'M63.6 35.4l-11 3.2.8 2.6 11-2.6z');
    default: // soft arch
      return pair('M36 39c2.6-3.4 7.6-4 11.2-1.8l-.6 2.2c-3-1.4-6.8-1-8.8.9z', 'M64 39c-2.6-3.4-7.6-4-11.2-1.8l.6 2.2c3-1.4 6.8-1 8.8.9z');
  }
}

function mouth(style: number): string {
  switch (style) {
    case 1: // open grin
      return (
        p('M42.6 53.4h14.8c0 5.6-3.2 9.4-7.4 9.4s-7.4-3.8-7.4-9.4z', MOUTH) +
        p('M43.4 53.4h13.2c-.2 1.8-.8 2.8-1.6 3.2H45c-.8-.4-1.4-1.4-1.6-3.2z', WHITE) +
        p('M45.4 60.2c1.2-1.6 2.8-2.4 4.6-2.4s3.4.8 4.6 2.4c-1.2 1.6-2.8 2.6-4.6 2.6s-3.4-1-4.6-2.6z', TONGUE)
      );
    case 2: // calm
      return line('M46 56.4q4 2.6 8 0', INK, 2.4);
    case 3: // "o"
      return `<ellipse cx="50" cy="57" rx="3" ry="3.7" fill="${MOUTH}"/>`;
    case 4: // smirk
      return line('M44.6 56.6q6 2.6 11-2.6', INK, 2.6);
    case 5: // tongue out
      return p('M43.6 54h12.8c-.6 4-3.2 6.2-6.4 6.2s-5.8-2.2-6.4-6.2z', MOUTH) + p('M47 58.4c0 4 1.4 6 3 6s3-2 3-6c-1.8 1-4.2 1-6 0z', TONGUE);
    case 6: // unimpressed: short, flat, pulled to one side
      return line('M46.4 57.2h6.4q1.6 0 2.8-1.2', INK, 2.6);
    default: // smile
      return line('M43.6 54.4q6.4 6.6 12.8 0', INK, 2.6);
  }
}

function beard(style: number, hair: string): string {
  switch (style) {
    case 1: // stubble
      return p('M30 48c1.6 12.6 10 19 20 19s18.4-6.4 20-19c-3.2 8.4-10.6 12.6-20 12.6S33.2 56.4 30 48z', hair, ' opacity=".26"');
    case 2: // mustache
      return chunky('M42.6 52.6c2.6-3 5.4-3.4 7.4-1.4 2-2 4.8-1.6 7.4 1.4-2.8 1.2-5.4 1-7.4-.2-2 1.2-4.6 1.4-7.4.2z', hair, 1);
    case 3: // full beard (mouth is drawn on top)
      return (
        chunky('M29.4 45c.4 15.4 9 23 20.6 23s20.2-7.6 20.6-23c-2.4 8.4-6.6 12.6-11 13-3-2.4-6.2-3.4-9.6-3.4s-6.6 1-9.6 3.4c-4.4-.4-8.6-4.6-11-13z', hair, 1.6) +
        p('M42.6 52.4c2.6-2.8 5.4-3.2 7.4-1.4 2-1.8 4.8-1.4 7.4 1.4-2.8 1.2-5.4 1-7.4-.2-2 1.2-4.6 1.4-7.4.2z', hair)
      );
    case 4: // goatee
      return chunky('M45.6 61.4c1.2 3.8 2.6 5.8 4.4 5.8s3.2-2 4.4-5.8c-2.8 1.2-6 1.2-8.8 0z', hair, 1);
    default:
      return '';
  }
}

function glasses(style: number): string {
  switch (style) {
    case 1: // round
      return (
        `<g stroke="${INK}" stroke-width="2.4" fill="${WHITE}" fill-opacity=".2"><circle cx="${EYE_L}" cy="${EYE_Y}" r="6.6"/><circle cx="${EYE_R}" cy="${EYE_Y}" r="6.6"/></g>` +
        line(`M48.2 44.4q1.8-1.4 3.6 0M35 44l-5-1.6M65 44l5-1.6`, INK, 2.2)
      );
    case 2: // square
      return (
        `<g stroke="${INK}" stroke-width="2.6" fill="${WHITE}" fill-opacity=".2"><rect x="34" y="39.4" width="15" height="11.4" rx="3.4"/><rect x="51" y="39.4" width="15" height="11.4" rx="3.4"/></g>` +
        line('M49 43.6h2M34 42.6l-4.6-1.2M66 42.6l4.6-1.2', INK, 2.4)
      );
    case 3: // shades
      return (
        p('M33 40h16v5.2c0 4.2-2.8 6.8-7 6.8h-2c-4.2 0-7-2.6-7-6.8zM51 40h16v5.2c0 4.2-2.8 6.8-7 6.8h-2c-4.2 0-7-2.6-7-6.8z', INK) +
        line('M49 41.4h2M33 41.4l-4-1M67 41.4l4-1', INK, 2.4) +
        line('M36.4 42.6l3.4 3.8M54.4 42.6l3.4 3.8', WHITE, 1.6, ' opacity=".5"')
      );
    default:
      return '';
  }
}

function extra(style: number, earX: number, shirt: string): string {
  switch (style) {
    case 1: // gold hoops
      return [earX, 100 - earX].map((x) => `<circle cx="${x}" cy="54.4" r="2.8" fill="none" stroke="${GOLD}" stroke-width="1.8"/>`).join('');
    case 2: // headphones
      return (
        line('M25.6 46C25.6 19 74.4 19 74.4 46', INK, 4.4) +
        chunky('M20 38.6c0-2.2 1.8-4 4-4h2.4c2.2 0 4 1.8 4 4v12c0 2.2-1.8 4-4 4H24c-2.2 0-4-1.8-4-4z', shirt, 1.4) +
        chunky('M69.6 38.6c0-2.2 1.8-4 4-4H76c2.2 0 4 1.8 4 4v12c0 2.2-1.8 4-4 4h-2.4c-2.2 0-4-1.8-4-4z', shirt, 1.4)
      );
    case 3: // cap, brim to the side
      return chunky('M28.6 33c0-12 9.6-19.4 21.4-19.4S71.4 21 71.4 33z', shirt, 1.8) + chunky('M48 30.4h31c2.4 0 2.4 4.8 0 4.8H48z', shade(shirt, 0.18), 1.4) + `<circle cx="50" cy="14.2" r="2.2" fill="${shade(shirt, 0.25)}"/>`;
    case 4: // beanie
      return chunky('M28 35c0-14 9.6-21.4 22-21.4S72 21 72 35z', shirt, 1.8) + chunky('M26.6 31.4h46.8a3.6 3.6 0 0 1 0 7.2H26.6a3.6 3.6 0 0 1 0-7.2z', shade(shirt, 0.15), 1.4) + `<circle cx="50" cy="12" r="4.4" fill="${shade(shirt, -0.35)}"/>`;
    case 6: // pencil behind the ear
      return `<g transform="translate(${100 - earX - 2} 38) rotate(28)">${chunky('M-1.8 -9h3.6v14h-3.6z', GOLD, 0.8)}${p('M-1.8 5h3.6L0 9z', '#F2D3A8')}${p('M-.6 7.6h1.2L0 9z', INK)}${p('M-1.8 -11.4h3.6V-9h-3.6z', BLUSH)}</g>`;
    case 7: // sales headset with a boom mic
      return line(`M${earX - 1} 40C${earX - 1} 24 ${100 - earX + 1} 24 ${100 - earX + 1} 40`, INK, 2.6) +
        chunky(`M${earX - 4} 41.4h6.4v9h-6.4z`, INK, 1, 0) +
        line(`M${earX} 50.4q2 8 12 7.6`, INK, 2) + `<circle cx="${earX + 12.6}" cy="58" r="2.4" fill="${INK}"/>`;
    case 8: // stethoscope around the neck
      return line('M38.6 74q-2 10 4 14.6M61.4 74q2 10-4 14.6M42.6 88.6q7.4 4 14.8 0', '#5B6478', 2.6) +
        `<circle cx="50" cy="95" r="3.6" fill="#AEB6C6"/><circle cx="50" cy="95" r="1.8" fill="#5B6478"/>` + line('M50 91.4v-1.4', '#5B6478', 2.2);
    case 9: // beret
      return chunky('M26 30c0-9 11-15.6 25-15.6S75 20 74.4 28.4C72 33 62 34 50 34s-24-.6-24-4z', shirt, 1.8) + `<circle cx="52" cy="13" r="2" fill="${shade(shirt, 0.25)}"/>`;
    case 5: // flower
      return `<g transform="translate(67 22)">${[0, 72, 144, 216, 288]
        .map((r) => `<ellipse cx="0" cy="-4.4" rx="3.4" ry="4.2" fill="${BLUSH}" transform="rotate(${r})"/>`)
        .join('')}<circle r="2.8" fill="${GOLD}"/></g>`;
    default:
      return '';
  }
}

// ── Body ─────────────────────────────────────────────────────────────────

function body(outfit: number, shirt: string, skinD: string): string {
  const dark = shade(shirt, 0.16);
  const torso = chunky('M12 104c0-19 16.6-30 38-30s38 11 38 30z', shirt, 0, 0) + p('M12 104c0-6 1.6-11.4 4.6-15.6C22 96 34.6 100.6 50 100.6S78 96 83.4 88.4C86.4 92.6 88 98 88 104z', dark);
  switch (outfit) {
    case 1: // hoodie: hood behind the neck, two drawstrings
      return (
        torso +
        chunky('M31 77c2-8.6 10-12.6 19-12.6S67 68.4 69 77c-5 3.6-11.6 5.4-19 5.4S36 80.6 31 77z', dark, 1.6, 0.12) +
        line('M44.6 81v9.4M55.4 81v9.4', WHITE, 1.8) +
        `<circle cx="44.6" cy="91.4" r="1.4" fill="${WHITE}"/><circle cx="55.4" cy="91.4" r="1.4" fill="${WHITE}"/>`
      );
    case 2: // collared shirt
      return (
        torso +
        p('M39.4 74.4L50 84l-6.6 6-6.6-12.6zM60.6 74.4L50 84l6.6 6 6.6-12.6z', WHITE) +
        line('M50 85v15', dark, 1.6) +
        `<circle cx="50" cy="90" r="1.1" fill="${dark}"/><circle cx="50" cy="96" r="1.1" fill="${dark}"/>`
      );
    case 3: // open jacket over a white tee
      return torso + p('M41 75.4c2.6 1.6 5.6 2.4 9 2.4s6.4-.8 9-2.4L56 104H44z', WHITE) + line('M41 75.4L44 104M59 75.4L56 104', dark, 2);
    case 4: { // suit and tie
      const tie = shirt === '#E5484D' ? GOLD : '#E5484D';
      return (
        torso +
        p('M40.4 74.6L50 90l9.6-15.4c-2.8-.8-6-1.2-9.6-1.2s-6.8.4-9.6 1.2z', WHITE) +
        chunky('M47.6 79.4h4.8l-1 3.2 2.2 12-3.6 4-3.6-4 2.2-12z', tie, 1, 0.22) +
        p('M38 75.2L50 92 42 104H34l-2-24zM62 75.2L50 92l8 12h8l2-24z', dark)
      );
    }
    case 5: // blazer over an open-collar shirt
      return (
        torso +
        p('M41.4 75.2c2.4 1.4 5.2 2.2 8.6 2.2s6.2-.8 8.6-2.2L55 104H45z', WHITE) +
        p('M41.4 75.2L46 82l-5 4-2.6-9.6zM58.6 75.2L54 82l5 4 2.6-9.6z', '#DDE3EC') +
        p('M37.6 76L47 104h-9l-4-24zM62.4 76L53 104h9l4-24z', dark)
      );
    case 6: // scrubs: deep v-neck and a chest pocket
      return (
        torso +
        p('M42.4 75.6L50 87l7.6-11.4c-2.4-.8-5-1.2-7.6-1.2s-5.2.4-7.6 1.2z', skinD) +
        line('M42.4 75.6L50 87l7.6-11.4', dark, 2.4) +
        chunky('M58 90h10v8H58z', dark, 0, 0)
      );
    case 7: // turtleneck
      return (
        torso +
        chunky('M41 69h18a3 3 0 0 1 3 3v6.4c-3 2-7.4 3-12 3s-9-1-12-3V72a3 3 0 0 1 3-3z', dark, 1.4, 0.15) +
        line('M44 71.4v7.4M50 71.4v8.6M56 71.4v7.4', shade(dark, 0.18), 1.2, ' opacity=".7"')
      );
    default: // crew-neck tee
      return torso + p('M40.4 75.6c2.4 3 5.6 4.6 9.6 4.6s7.2-1.6 9.6-4.6', 'none', ` stroke="${dark}" stroke-width="2.6" stroke-linecap="round"`) + p('M42 75.4c2.2 2 4.8 3 8 3s5.8-1 8-3c-2.4-.8-5-1.2-8-1.2s-5.6.4-8 1.2z', skinD);
  }
}

/** The character as a complete <svg> string, square, clipped to a circle. */
export function avatarSvg(c: AvatarConfig, opts: { title?: string } = {}): string {
  const id = `tav${encodeAvatar(c)}`;
  const bg = AVATAR_BG[c.bg];
  const skin = AVATAR_SKIN[c.skin];
  const skinD = shade(skin, 0.14);
  const skinL = shade(skin, -0.22);
  const hair = AVATAR_HAIR[c.hairColor];
  const shirt = AVATAR_SHIRT[c.shirt];
  const head = HEADS[c.head];
  const wrapped = c.hair === 11;
  const earX = 50 - head.half - 0.6;

  const parts = [
    `<rect width="100" height="100" fill="${bg}"/>`,
    `<circle cx="50" cy="40" r="36" fill="${shade(bg, -0.35)}"/>`,
    hairBack(c.hair, hair, shirt),
    body(c.outfit, shirt, skinD),
    // Neck, with the chin's shadow across it.
    `<rect x="42" y="56" width="16" height="22" rx="7" fill="${skinD}"/>`,
    p('M42 62c2.6 3 5 4.4 8 4.4s5.4-1.4 8-4.4v5c-2.6 2.4-5 3.4-8 3.4s-5.4-1-8-3.4z', shade(skin, 0.24), ' opacity=".55"'),
    wrapped
      ? ''
      : [earX, 100 - earX]
          .map((x) => `<ellipse cx="${x}" cy="46" rx="4.6" ry="6" fill="${skin}"/><path d="M${x} 43.2q${x < 50 ? -2 : 2} 2.8 0 5.6" stroke="${skinD}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`)
          .join(''),
    // The head on its darker copy (the chunky underside), then a soft highlight.
    chunky(head.d, skin, 2.4, 0.16),
    `<ellipse cx="41" cy="31" rx="7" ry="4.4" fill="${skinL}" opacity=".55"/>`,
    c.blush ? `<ellipse cx="35.6" cy="53.4" rx="4.2" ry="2.5" fill="${BLUSH}" opacity=".45"/><ellipse cx="64.4" cy="53.4" rx="4.2" ry="2.5" fill="${BLUSH}" opacity=".45"/>` : '',
    beard(c.beard, hair),
    hairFront(c.hair, hair, shirt),
    brows(c.brows, hair),
    eyes(c.eyes, skinD),
    // Nose: a small rounded shape a shade darker than the skin.
    p('M47.6 51.2c.4-1.8 1.2-2.6 2.4-2.6s2 .8 2.4 2.6c-.8.8-1.6 1.2-2.4 1.2s-1.6-.4-2.4-1.2z', skinD),
    mouth(c.mouth),
    glasses(c.glasses),
    extra(c.extra, earX, shirt),
  ].join('');

  const title = opts.title ? `<title>${opts.title.replace(/[<>&"]/g, '')}</title>` : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" role="img">${title}` +
    `<defs><clipPath id="${id}"><circle cx="50" cy="50" r="50"/></clipPath></defs>` +
    `<g clip-path="url(#${id})">${parts}</g></svg>`
  );
}
