import { continueRender, delayRender, staticFile } from 'remotion';

const fonts: [string, string][] = [['Plus Jakarta Sans', 'jakarta.woff2'], ['Inter', 'inter.woff2'], ['JetBrains Mono', 'mono.woff2']];
if (typeof document !== 'undefined') {
  const h = delayRender('fonts');
  Promise.all(fonts.map(([fam, file]) => new FontFace(fam, `url(${staticFile('fonts/' + file)}) format('woff2')`, { weight: '100 900' }).load().then((ff) => document.fonts.add(ff))))
    .then(() => continueRender(h)).catch((e) => { console.error(e); continueRender(h); });
}
export const display = "'Plus Jakarta Sans', sans-serif";
export const body = "'Inter', sans-serif";
export const mono = "'JetBrains Mono', monospace";

// Teyro brand palette (docs/08-color-system.md) + game-art accents from /art
export const C = {
  blue: '#3D5AFE',
  blueDeep: '#2A3FD6',
  blueSoft: '#6C8CFF',
  blueTint: '#EEF2FF',
  violet: '#7B61FF',
  navy: '#1F2A44',
  ink: '#121933',
  slate: '#64748B',
  white: '#FFFFFF',
  page: '#F5F7FB',
  yellow: '#FFC800',
  yellowDeep: '#E5A400',
  green: '#22C55E',
  greenDeep: '#16A34A',
  coral: '#FF6B5B',
  pink: '#FF8FC8',
  orange: '#FF9F1C',
  sky: '#5CD3FF',
};

export const FPS = 60;
export const W = 1920;
export const H = 1080;
