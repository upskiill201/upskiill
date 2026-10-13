import { continueRender, delayRender, staticFile } from 'remotion';

/**
 * Motion Explainer format (docs/MOTION_EXPLAINER_REFERENCE_ANALYSIS.md).
 * 1080×1920 @ 30 fps. One art direction ("look") per video, kept for the whole video (§3.5).
 */
export const W = 1080, H = 1920, FPS = 30;

/** Safe zones measured from the references (§3.1), in px at 1080×1920. */
export const Z = {
  gutter: 44,
  hudTop: 176,          // ≈ 9 %
  hudBottom: 360,       // ≈ 19 %
  stageTop: 380,
  stageBottom: 1380,    // ≈ 72 %
  captionY: 1478,       // ≈ 77 % (caption centre line)
  uiRightX: 920,        // keep the IG action column (x > 920, 45–85 % height) free of key content
  /** host zone (left third) and the side stage to its right, used while the host is on screen (§3.6) */
  hostX: 190, hostBottom: 1390, hostScale: 0.8,
  sideX0: 400, sideX1: 1036, sideCx: 718, sideW: 610,
};

export type Look = {
  name: 'night' | 'neon' | 'lab' | 'blueprint';
  dark: boolean;
  bg: string; bg2: string;       // world background + secondary plane
  grid: string;                  // grid / ground lines
  ink: string; inkSoft: string; inkFaint: string;
  card: string; cardEdge: string; cardShadow: string;
  /** semantic accents: keep the meaning for the whole video (§3.5) */
  accent: string;                // the "concept / fix" colour
  accent2: string;               // second concept (e.g. output vs input)
  problem: string;               // always red-ish: breaks, bottlenecks, errors
  good: string;                  // always green: success, healthy
  warm: string;                  // highlights, windows, glow
  highlight: string;             // caption current-word highlight
  ramp: string[];                // ordered ramp for stacks / layers / steps
  captionStyle: 'pillDark' | 'bare' | 'pillNavy' | 'pillLight';
};

export const LOOKS: Record<Look['name'], Look> = {
  // R1-style: dark isometric night world (roads, booths, towers)
  night: {
    name: 'night', dark: true,
    bg: '#16181B', bg2: '#202328', grid: '#2B2F35',
    ink: '#F4F2EC', inkSoft: '#A9ADB4', inkFaint: '#5D626B',
    card: '#24272D', cardEdge: '#3A3E46', cardShadow: 'rgba(0,0,0,0.45)',
    accent: '#6FA8FF', accent2: '#F07A5A', problem: '#F0614F', good: '#86C98A', warm: '#F2C76B', highlight: '#FFFFFF',
    ramp: ['#6FA8FF', '#F07A5A', '#86C98A', '#F2C76B', '#B79CFF', '#5FD0C8'],
    captionStyle: 'pillDark',
  },
  // R2-style: neon synthwave planes over a perspective grid
  neon: {
    name: 'neon', dark: true,
    bg: '#06070D', bg2: '#0D1020', grid: '#1D2244',
    ink: '#FFFFFF', inkSoft: '#9AA3C7', inkFaint: '#4A5278',
    card: '#0F1326', cardEdge: '#2A3160', cardShadow: 'rgba(0,0,0,0.6)',
    accent: '#9B5CFF', accent2: '#39C6D9', problem: '#FF4D6D', good: '#3BE39A', warm: '#FF9A3C', highlight: '#FFFFFF',
    ramp: ['#FF9A3C', '#FF5E7E', '#E040C8', '#9B5CFF', '#5B7CFF', '#3B9BFF', '#39C6D9'],
    captionStyle: 'bare',
  },
  // R3-style: light lab paper, faint grid, one blue
  lab: {
    name: 'lab', dark: false,
    bg: '#F2F5F7', bg2: '#E7ECF0', grid: '#E1E6EB',
    ink: '#14171D', inkSoft: '#5B6270', inkFaint: '#A7AFBB',
    card: '#FFFFFF', cardEdge: '#DCE2E8', cardShadow: 'rgba(20,30,50,0.10)',
    accent: '#2F5BEA', accent2: '#7FA0FF', problem: '#D9443A', good: '#1F9D55', warm: '#F5B544', highlight: '#FFFFFF',
    ramp: ['#2F5BEA', '#4C74F0', '#6A8CF4', '#8AA6F7', '#AFC2FA', '#D2DDFC'],
    captionStyle: 'pillNavy',
  },
  // R4-style: light blueprint dashboard, purple components, yellow highlighter captions
  blueprint: {
    name: 'blueprint', dark: false,
    bg: '#EDF1F3', bg2: '#E4E9EC', grid: '#DCE3E7',
    ink: '#111418', inkSoft: '#5E6670', inkFaint: '#AAB2BA',
    card: '#FFFFFF', cardEdge: '#D5DCE1', cardShadow: 'rgba(17,20,24,0.10)',
    accent: '#6D3FE0', accent2: '#3D5AFE', problem: '#D7374A', good: '#22A06B', warm: '#F5A524', highlight: '#FFE36E',
    ramp: ['#6D3FE0', '#3D5AFE', '#22A06B', '#F5A524', '#D7374A', '#0EA5B7'],
    captionStyle: 'pillLight',
  },
};

/** Teyro brand (docs/08-color-system.md). Used only for the Teyro tile, bridge and outro. */
export const BRAND = { blue: '#3D5AFE', purple: '#7B61FF', navy: '#1F2A44', white: '#FFFFFF' };

export const FONT = {
  display: "'Space Grotesk', sans-serif",   // titles, big statements (§3.4)
  sans: "'Inter', sans-serif",              // captions, card text
  mono: "'JetBrains Mono', monospace",      // HUD, labels, data, footnotes
  hand: "'Caveat', cursive",                // handwritten annotations
};

const FONTS: [string, string, string][] = [
  ['Space Grotesk', 'spacegrotesk-500.woff2', '500'],
  ['Space Grotesk', 'spacegrotesk-700.woff2', '700'],
  ['Inter', 'inter.woff2', '100 900'],
  ['Inter', 'inter-800.woff2', '800'],
  ['JetBrains Mono', 'mono.woff2', '100 900'],
  ['Caveat', 'caveat-600.woff2', '600'],
];
let loaded = false;
export const loadMotionFonts = () => {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;
  const h = delayRender('motion fonts');
  Promise.all(FONTS.map(([fam, file, weight]) =>
    new FontFace(fam, `url(${staticFile('fonts/' + file)}) format('woff2')`, { weight }).load().then((f) => document.fonts.add(f))))
    .then(() => continueRender(h))
    .catch((e) => { console.error(e); continueRender(h); });
};
