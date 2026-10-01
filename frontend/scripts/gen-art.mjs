/**
 * Generates Teyro's Duolingo-style illustration set into public/art/.
 *
 *   node scripts/gen-art.mjs
 *
 * One recipe for everything, so the set reads as one family:
 *   - flat colour shapes, no outlines
 *   - a darker "lip" copy 6px below every main shape (the chunky 3D look)
 *   - one soft white shine top-left
 * Shop items → public/art/items/<art>.svg (keys match shop.registry `art`).
 * Achievement badges → public/art/badges/<badgeId>.svg.
 * They are image assets (used through <img>/next/image), not inline icons.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'art');

// Duolingo-ish palette: bright main, deep lip, light tint.
const C = {
  red: ['#FF4B4B', '#D33131', '#FFB2B2'],
  orange: ['#FF9600', '#D97E00', '#FFD28A'],
  gold: ['#FFC800', '#E5A400', '#FFE98A'],
  green: ['#58CC02', '#46A302', '#B6EE7F'],
  blue: ['#1CB0F6', '#1899D6', '#A7E4FF'],
  ice: ['#84D8FF', '#49B8F0', '#DDF4FF'],
  purple: ['#CE82FF', '#A560E8', '#EED3FF'],
  navy: ['#4B4B96', '#35357A', '#B7B7EE'],
  grey: ['#AFAFAF', '#8A8A8A', '#E5E5E5'],
  bronze: ['#D98C4A', '#B06A2E', '#F4C79D'],
  silver: ['#C3CFD9', '#95A5B3', '#EEF3F7'],
  wood: ['#B5652B', '#8E4A1A', '#D98E55'],
  white: '#FFFFFF',
};

const svg = (body, vb = '0 0 96 96') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="none">${body}</svg>\n`;

/** A shape drawn twice: lip (6px down, deep) then face (main). */
const chunky = (shape, [main, deep], dy = 6) =>
  `<g transform="translate(0 ${dy})" fill="${deep}">${shape}</g><g fill="${main}">${shape}</g>`;

const shine = (cx, cy, rx, ry, rot = -30, o = 0.45) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="#fff" opacity="${o}"/>`;

// ─── Shapes ──────────────────────────────────────────────────────────────────
const HEART = '<path d="M48 82C22 64 11 50 11 34C11 21 20 12 31 12C39 12 44.5 16.5 48 22C51.5 16.5 57 12 65 12C76 12 85 21 85 34C85 50 74 64 48 82Z"/>';
const FLAME = (s = 1, x = 0, y = 0) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M48 86C31 86 20 74 20 58C20 44 28 36 34 27C36 34 40 38 44 39C42 28 47 17 56 10C57 22 66 30 72 40C76 46 78 52 78 58C78 74 66 86 48 86Z"/>`;
const FLAME_CORE = (s = 1, x = 0, y = 0) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M48 80C39 80 33 73 33 64C33 56 38 51 42 46C43 51 46 53 49 53C48 47 51 41 56 37C57 45 63 50 63 60C63 72 57 80 48 80Z"/>`;
const CIRCLE = (r = 38, cx = 48, cy = 46) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
const ROUNDRECT = (x, y, w, h, r) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
const BOLT = '<path d="M53 12L26 52H45L40 84L70 40H51L53 12Z"/>';
const FLASK = '<path d="M38 10H58V16H55V34L76 68C80 75 75 84 67 84H29C21 84 16 75 20 68L41 34V16H38V10Z"/>';
const FLASK_LIQUID = '<path d="M31 58H65L73 71C75 75 72 79 67 79H29C24 79 21 75 23 71L31 58Z"/>';
const SHIELD = '<path d="M48 8L80 20V44C80 64 66 78 48 86C30 78 16 64 16 44V20L48 8Z"/>';
const HEX = (r, cx = 50, cy = 52) => {
  const pts = [-90, -30, 30, 90, 150, 210].map((a) => {
    const t = (a * Math.PI) / 180;
    return `${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`;
  });
  return `<polygon points="${pts.join(' ')}" stroke-linejoin="round"/>`;
};

// ─── Shop items (keys = shop.registry `art`) ─────────────────────────────────
const items = {
  heart: svg(chunky(HEART, C.red) + shine(30, 30, 9, 6) + shine(62, 26, 4, 3, -30, 0.3)),

  // Streak freeze: an ice block with a flame sleeping inside.
  freeze: svg(
    chunky(ROUNDRECT(12, 12, 72, 72, 18), C.ice) +
      `<g fill="${C.orange[0]}" opacity="0.9">${FLAME(0.62, 18, 16)}</g>` +
      `<g fill="${C.gold[0]}">${FLAME_CORE(0.62, 18, 16)}</g>` +
      `<rect x="12" y="12" width="72" height="72" rx="18" fill="${C.ice[2]}" opacity="0.35"/>` +
      shine(30, 26, 10, 5) +
      `<path d="M72 18L74 24L80 26L74 28L72 34L70 28L64 26L70 24Z" fill="#fff"/>`,
  ),

  // Lesson retry: a purple coin with a white "go again" arrow.
  retry: svg(
    chunky(CIRCLE(38), C.purple) +
      `<path d="M62 52A15 15 0 1 1 57 36" stroke="#fff" stroke-width="8" stroke-linecap="round"/>` +
      `<path d="M50 26L62 35L49 42Z" fill="#fff" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>` +
      shine(30, 26, 9, 5),
  ),

  // XP boost: a purple potion with a lightning bolt.
  'boost-xp': svg(
    chunky(FLASK, C.silver) +
      `<g fill="${C.purple[0]}">${FLASK_LIQUID}</g>` +
      `<rect x="36" y="6" width="24" height="10" rx="4" fill="${C.wood[0]}"/>` +
      `<g transform="translate(30 38) scale(0.38)" fill="${C.gold[0]}">${BOLT}</g>` +
      shine(38, 50, 3, 10, 20, 0.6),
  ),

  // 2× XP boost: a bigger, gold potion with a double bolt.
  'boost-xp2': svg(
    chunky(FLASK, C.silver) +
      `<g fill="${C.gold[0]}">${FLASK_LIQUID}</g>` +
      `<rect x="36" y="6" width="24" height="10" rx="4" fill="${C.wood[0]}"/>` +
      `<g transform="translate(22 40) scale(0.34)" fill="${C.purple[0]}">${BOLT}</g>` +
      `<g transform="translate(40 40) scale(0.34)" fill="${C.purple[0]}">${BOLT}</g>` +
      shine(38, 50, 3, 10, 20, 0.6),
  ),

  // Coin boost: a green potion with a coin inside.
  'boost-coin': svg(
    chunky(FLASK, C.silver) +
      `<g fill="${C.green[0]}">${FLASK_LIQUID}</g>` +
      `<rect x="36" y="6" width="24" height="10" rx="4" fill="${C.wood[0]}"/>` +
      `<circle cx="48" cy="66" r="9" fill="${C.gold[0]}"/><circle cx="48" cy="66" r="5.5" fill="${C.gold[1]}"/>` +
      shine(38, 50, 3, 10, 20, 0.6),
  ),

  // Streak repair: the streak flame with a bandage across it.
  repair: svg(
    `<g transform="translate(0 6)" fill="${C.orange[1]}">${FLAME()}</g>` +
      `<g fill="${C.orange[0]}">${FLAME()}</g>` +
      `<g fill="${C.gold[0]}">${FLAME_CORE()}</g>` +
      `<g transform="rotate(-30 48 58)"><rect x="18" y="50" width="60" height="18" rx="9" fill="#FFE0C2"/>` +
      `<rect x="40" y="50" width="16" height="18" fill="#F5C49A"/>` +
      `<circle cx="45" cy="56" r="1.6" fill="#D9A06C"/><circle cx="51" cy="62" r="1.6" fill="#D9A06C"/><circle cx="51" cy="56" r="1.6" fill="#D9A06C"/><circle cx="45" cy="62" r="1.6" fill="#D9A06C"/></g>` +
      shine(38, 40, 5, 9, 20),
  ),

  // Perfect lesson protection: a green shield with a check.
  shield: svg(
    chunky(SHIELD, C.green) +
      `<path d="M34 46L44 56L63 36" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>` +
      shine(32, 26, 8, 5),
  ),

  // Coin vault: a navy safe with a gold dial.
  vault: svg(
    chunky(ROUNDRECT(14, 14, 68, 64, 12), C.navy) +
      `<rect x="20" y="20" width="56" height="52" rx="8" fill="${C.navy[2]}" opacity="0.25"/>` +
      `<circle cx="48" cy="46" r="14" fill="${C.gold[1]}"/><circle cx="48" cy="44" r="14" fill="${C.gold[0]}"/>` +
      `<path d="M48 36V44L54 48" stroke="${C.gold[1]}" stroke-width="4" stroke-linecap="round"/>` +
      `<rect x="20" y="82" width="12" height="6" rx="3" fill="${C.navy[1]}"/><rect x="64" y="82" width="12" height="6" rx="3" fill="${C.navy[1]}"/>` +
      shine(28, 24, 8, 4),
  ),
};

// Chests: wood body, a lid, metal bands in the tier's metal, a lock.
const chest = (metal) =>
  svg(
    chunky(ROUNDRECT(12, 40, 72, 40, 8), C.wood) +
      chunky('<path d="M12 44C12 28 24 18 48 18C72 18 84 28 84 44Z"/>', [C.wood[2], C.wood[0]], 4) +
      `<rect x="12" y="40" width="72" height="8" fill="${metal[1]}"/>` +
      `<rect x="20" y="18" width="10" height="66" rx="3" fill="${metal[0]}"/>` +
      `<rect x="66" y="18" width="10" height="66" rx="3" fill="${metal[0]}"/>` +
      `<rect x="39" y="36" width="18" height="22" rx="5" fill="${metal[1]}"/>` +
      `<rect x="39" y="34" width="18" height="22" rx="5" fill="${metal[0]}"/>` +
      `<circle cx="48" cy="44" r="3" fill="${metal[1]}"/><rect x="46.5" y="44" width="3" height="6" rx="1.5" fill="${metal[1]}"/>` +
      shine(30, 26, 8, 4),
  );
items['chest-bronze'] = chest(C.bronze);
items['chest-silver'] = chest(C.silver);
items['chest-gold'] = chest(C.gold);

// ─── Achievement badges ──────────────────────────────────────────────────────
// A rounded hexagon in the family colour, a lighter inner hex, the emblem.
const badge = (col, emblem) =>
  svg(
    `<g transform="translate(0 7)" fill="${col[1]}" stroke="${col[1]}" stroke-width="10">${HEX(42)}</g>` +
      `<g fill="${col[0]}" stroke="${col[0]}" stroke-width="10">${HEX(42)}</g>` +
      `<g fill="${col[2]}" opacity="0.55">${HEX(31)}</g>` +
      emblem +
      shine(30, 28, 10, 5),
    '0 0 100 110',
  );

const badges = {
  novice: badge(C.gold, `<path d="M50 30L56.5 43.5L71 45.5L60.5 55.5L63 70L50 63L37 70L39.5 55.5L29 45.5L43.5 43.5Z" fill="#fff" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>`),
  wildfire: badge(C.orange, `<g fill="${C.red[0]}">${FLAME(0.55, 23.6, 22)}</g><g fill="${C.gold[0]}">${FLAME_CORE(0.55, 23.6, 22)}</g>`),
  sage: badge(
    C.purple,
    `<path d="M28 40C36 36 44 37 50 42C56 37 64 36 72 40V70C64 66 56 67 50 72C44 67 36 66 28 70Z" fill="#fff"/><path d="M50 42V72" stroke="${C.purple[1]}" stroke-width="3"/>` +
      `<path d="M70 26L72 31L77 33L72 35L70 40L68 35L63 33L68 31Z" fill="${C.gold[0]}"/>`,
  ),
  champion: badge(
    C.blue,
    `<path d="M36 32H64V44C64 53 58 59 50 59C42 59 36 53 36 44Z" fill="${C.gold[0]}"/>` +
      `<path d="M36 36H28C28 45 32 49 37 49M64 36H72C72 45 68 49 63 49" stroke="${C.gold[0]}" stroke-width="4" fill="none"/>` +
      `<rect x="46" y="58" width="8" height="8" fill="${C.gold[1]}"/><rect x="38" y="66" width="24" height="8" rx="3" fill="${C.gold[0]}"/>`,
  ),
  sharpshooter: badge(
    C.red,
    `<circle cx="50" cy="52" r="20" fill="#fff"/><circle cx="50" cy="52" r="13" fill="${C.red[0]}"/><circle cx="50" cy="52" r="6" fill="#fff"/>` +
      `<path d="M50 52L70 32" stroke="${C.navy[0]}" stroke-width="4" stroke-linecap="round"/><path d="M66 30L74 28L72 36Z" fill="${C.navy[0]}"/>`,
  ),
  explorer: badge(
    C.green,
    `<circle cx="50" cy="52" r="20" fill="#fff"/><path d="M50 36L56 52L50 68L44 52Z" fill="${C.red[0]}"/><path d="M50 52L56 52L50 68L44 52Z" fill="${C.grey[0]}"/><circle cx="50" cy="52" r="3" fill="${C.navy[0]}"/>`,
  ),
  marathon: badge(
    C.navy,
    `<path d="M40 28L50 44L60 28" stroke="${C.red[0]}" stroke-width="7" fill="none" stroke-linejoin="round"/>` +
      `<circle cx="50" cy="58" r="15" fill="${C.gold[1]}"/><circle cx="50" cy="56" r="15" fill="${C.gold[0]}"/>` +
      `<path d="M50 48L52.5 53.5L58.5 54L54 58L55.5 64L50 61L44.5 64L46 58L41.5 54L47.5 53.5Z" fill="#fff"/>`,
  ),
};

// ─── UI stat icons (shop stats, level page) ──────────────────────────────────
const ui = {
  // Community cover: three friends and a speech bubble.
  community: svg(
    chunky('<circle cx="30" cy="40" r="11"/><path d="M12 76C12 62 20 54 30 54C40 54 48 62 48 76Z"/>', C.green) +
      chunky('<circle cx="66" cy="40" r="11"/><path d="M48 76C48 62 56 54 66 54C76 54 84 62 84 76Z"/>', C.purple) +
      chunky('<circle cx="48" cy="46" r="13"/><path d="M26 84C26 68 36 60 48 60C60 60 70 68 70 84Z"/>', C.blue) +
      chunky('<rect x="58" y="6" width="32" height="22" rx="8"/><path d="M66 26L62 34L74 27Z"/>', [C.gold[0], C.gold[1]], 3) +
      `<circle cx="67" cy="17" r="2.5" fill="#fff"/><circle cx="74" cy="17" r="2.5" fill="#fff"/><circle cx="81" cy="17" r="2.5" fill="#fff"/>` +
      shine(42, 40, 4, 3, -30, 0.5),
  ),
  // Invite friends: a green gift with a gold bow.
  gift: svg(
    chunky(ROUNDRECT(16, 40, 64, 44, 10), C.green) +
      chunky(ROUNDRECT(10, 28, 76, 18, 8), [C.green[2], C.green[0]], 4) +
      `<rect x="42" y="28" width="12" height="56" fill="${C.gold[0]}"/>` +
      `<path d="M48 28C40 14 26 14 26 22C26 30 40 30 48 28Z" fill="${C.gold[0]}"/>` +
      `<path d="M48 28C56 14 70 14 70 22C70 30 56 30 48 28Z" fill="${C.gold[1]}"/>` +
      shine(26, 50, 7, 4),
  ),
  'xp-bolt': svg(chunky(BOLT, C.gold) + shine(46, 24, 3, 7, 30, 0.5)),
  'level-hex': svg(`<g transform="translate(0 7)" fill="${C.blue[1]}" stroke="${C.blue[1]}" stroke-width="10">${HEX(38, 48, 44)}</g><g fill="${C.blue[0]}" stroke="${C.blue[0]}" stroke-width="10">${HEX(38, 48, 44)}</g>` + shine(30, 24, 9, 5), '0 0 96 100'),
  bag: svg(
    chunky(ROUNDRECT(18, 28, 60, 54, 16), C.purple) +
      `<path d="M34 30V24C34 16 40 12 48 12C56 12 62 16 62 24V30" stroke="${C.purple[1]}" stroke-width="7" fill="none" stroke-linecap="round"/>` +
      `<rect x="30" y="50" width="36" height="14" rx="6" fill="${C.purple[2]}" opacity="0.7"/>` +
      shine(32, 38, 8, 4),
  ),
};

// ─── Community reactions (post + comment actions) ────────────────────────────
const BUBBLE = '<path d="M20 14H76C83 14 88 19 88 26V58C88 65 83 70 76 70H46L28 84C26 85.5 23 84.5 23 82V70H20C13 70 8 65 8 58V26C8 19 13 14 20 14Z"/>';
Object.assign(ui, {
  // Liked: Duolingo's fat red heart with a shine.
  like: svg(chunky(HEART, C.red) + shine(28, 30, 8, 5)),
  // Not liked yet: the same heart, quiet grey.
  'like-off': svg(chunky(HEART, [C.grey[2], C.grey[0]]) + shine(28, 30, 8, 5, -30, 0.6)),
  comment: svg(
    chunky(BUBBLE, C.blue) +
      `<circle cx="30" cy="42" r="6" fill="#fff"/><circle cx="48" cy="42" r="6" fill="#fff"/><circle cx="66" cy="42" r="6" fill="#fff"/>` +
      shine(24, 24, 8, 4, -10, 0.45),
  ),
});

// ─── Rank medals (leaderboards) — the number is drawn over it in the UI ──────
const medal = (metal, ribbon) =>
  svg(
    `<path d="M28 6H44L52 40H36Z" fill="${ribbon[1]}"/><path d="M68 6H52L44 40H60Z" fill="${ribbon[0]}"/>` +
      chunky('<circle cx="48" cy="58" r="30"/>', metal, 5) +
      `<circle cx="48" cy="58" r="22" fill="${metal[2]}" opacity="0.55"/>` +
      shine(36, 46, 7, 4),
  );
Object.assign(ui, {
  'medal-1': medal(C.gold, C.blue),
  'medal-2': medal(C.silver, C.blue),
  'medal-3': medal(C.bronze, C.blue),
});

// ─── Post types — the badge on every post (Skool's category, Duolingo's art) ─
const tile = (col, emblem) => svg(chunky(ROUNDRECT(8, 8, 80, 78, 24), col) + shine(26, 22, 10, 5, -20, 0.35) + emblem);
const W = '#fff';
const posts = {
  QUESTION: tile(C.blue, `<path d="M36 36C36 28 42 22 49 22C57 22 62 27 62 34C62 44 50 44 50 54" stroke="${W}" stroke-width="9" stroke-linecap="round" fill="none"/><circle cx="50" cy="68" r="5.5" fill="${W}"/>`),
  TIP: tile(C.green, `<path d="M48 18C36 18 28 27 28 38C28 46 33 51 37 55C39 57 40 59 40 62H56C56 59 57 57 59 55C63 51 68 46 68 38C68 27 60 18 48 18Z" fill="${C.gold[0]}"/><rect x="40" y="65" width="16" height="8" rx="3" fill="${W}"/><path d="M42 36C42 31 45 28 49 28" stroke="${W}" stroke-width="4" stroke-linecap="round" fill="none"/>`),
  WIN: tile(C.gold, `<path d="M30 20H66V36C66 47 58 54 48 54C38 54 30 47 30 36Z" fill="${W}"/><path d="M30 26H20V32C20 39 25 43 31 43M66 26H76V32C76 39 71 43 65 43" stroke="${W}" stroke-width="5" fill="none"/><rect x="44" y="53" width="8" height="10" fill="${W}"/><rect x="34" y="62" width="28" height="9" rx="3" fill="${W}"/>`),
  RESOURCE: tile(C.purple, `<path d="M22 26H42C45 26 48 28 48 32V72C48 68 45 66 42 66H22Z" fill="${W}"/><path d="M74 26H54C51 26 48 28 48 32V72C48 68 51 66 54 66H74Z" fill="${C.purple[2]}"/>`),
  DISCUSSION: tile(C.navy, `<rect x="18" y="20" width="40" height="28" rx="9" fill="${W}"/><path d="M26 46L22 56L34 48Z" fill="${W}"/><rect x="40" y="38" width="38" height="26" rx="9" fill="${C.navy[2]}"/><path d="M68 62L72 72L60 64Z" fill="${C.navy[2]}"/>`),
  POLL: tile(C.purple, `<rect x="22" y="44" width="12" height="26" rx="4" fill="${W}"/><rect x="42" y="24" width="12" height="46" rx="4" fill="${C.gold[0]}"/><rect x="62" y="36" width="12" height="34" rx="4" fill="${W}"/>`),
  ANNOUNCEMENT: tile(C.red, `<path d="M22 40H34L62 24V70L34 54H22C19 54 18 52 18 50V44C18 42 19 40 22 40Z" fill="${W}"/><rect x="28" y="54" width="10" height="16" rx="4" fill="${W}"/><path d="M70 38C74 41 74 53 70 56" stroke="${W}" stroke-width="5" stroke-linecap="round" fill="none"/>`),
  CHALLENGE: tile(C.orange, `<circle cx="48" cy="47" r="25" fill="${W}"/><circle cx="48" cy="47" r="16" fill="${C.orange[0]}"/><circle cx="48" cy="47" r="7" fill="${W}"/>`),
};

const write = (dir, map) => {
  mkdirSync(join(root, dir), { recursive: true });
  for (const [name, content] of Object.entries(map)) writeFileSync(join(root, dir, `${name}.svg`), content);
  console.log(`${dir}: ${Object.keys(map).length}`);
};
write('items', items);
write('badges', badges);
write('ui', ui);
write('posts', posts);
