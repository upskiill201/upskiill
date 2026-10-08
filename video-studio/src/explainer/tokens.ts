import { continueRender, delayRender, staticFile } from 'remotion';

/**
 * Design tokens for the "Editorial Paper" explainer format
 * (docs/SOCIAL_VIDEO_REFERENCE_ANALYSIS.md §5). Colours are sampled from the reference videos.
 */
export const W = 1080, H = 1920, FPS = 30;

export const P = {
  paper: '#F0EEEA',      // reference C background (sampled)
  paperDeep: '#E6E3DD',
  ink: '#16181D',
  inkSoft: '#6B6F7A',
  red: '#E0352B',        // accent: key words, stamps, ticks
  redSoft: '#F6D9D4',
  card: '#FFFFFF',
  line: '#DCD8D0',
  green: '#22A55B',
  yellowHi: '#FFE27A',   // highlighter
  navy: '#171928',       // Dark Tech background (reference B, sampled)
  navyCard: '#20243A',
  blue: '#4EA5FF',       // Dark Tech accent (sampled)
  pinkGlow: '#FE491A',
};

export const FONT = {
  sans: "'Space Grotesk', sans-serif",
  serif: "'Instrument Serif', serif",
  mono: "'JetBrains Mono', monospace",
  black: "'Inter', sans-serif",
};

/** Layout grid measured from the references (§5.1), in px at 1080×1920. */
export const L = {
  margin: 130,          // ≈12 % left margin
  topLabelY: 118,       // ≈7 %
  headlineY: 262,       // ≈14 %
  headlineSize: 74,
  stageTop: 560,        // hero graphics band
  stageBottom: 1420,
};

const FONTS: [string, string, string, string?][] = [
  ['Space Grotesk', 'spacegrotesk-500.woff2', '500'],
  ['Space Grotesk', 'spacegrotesk-700.woff2', '700'],
  ['Instrument Serif', 'instrumentserif-italic.woff2', '400', 'italic'],
  ['Inter', 'inter-800.woff2', '800'],
  ['JetBrains Mono', 'mono.woff2', '100 900'],
];
let loaded = false;
export const loadFonts = () => {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;
  const h = delayRender('explainer fonts');
  Promise.all(FONTS.map(([fam, file, weight, style]) =>
    new FontFace(fam, `url(${staticFile('fonts/' + file)}) format('woff2')`, { weight, style: style ?? 'normal' }).load().then((f) => document.fonts.add(f))))
    .then(() => continueRender(h))
    .catch((e) => { console.error(e); continueRender(h); });
};
