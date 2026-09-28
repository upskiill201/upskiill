/**
 * Builds every app icon from the Tey mark in public/Tey Logo and icons/.
 *
 * The supplied set covers "any"-purpose icons (rounded tile, transparent
 * corners). Two things it doesn't have are made here:
 *  - apple-touch-icon: full-bleed, since iOS rounds it itself and anything
 *    that doesn't would show transparent (black) corners.
 *  - the maskable icon: the same full-bleed square. Tey's body is meant to
 *    run off the bottom edge, and the antenna already sits inside the 80%
 *    safe zone, so no shrinking (shrinking left a hard cut across his body).
 * The tile's own edge colour is the background, so the seams disappear.
 *
 * Run: node scripts/gen-app-icons.mjs
 */
import sharp from 'sharp';
import { copyFileSync } from 'node:fs';

const SRC = 'public/Tey Logo and icons';
const TILE_BLUE = { r: 8, g: 111, b: 252, alpha: 1 }; // sampled from the tile

const copy = (from, to) => copyFileSync(`${SRC}/${from}`, `public/${to}`);

copy('favicon.ico', 'favicon.ico');
copy('favicon-32.png', 'favicon-32.png');
copy('favicon-96.png', 'favicon-96.png');
copy('favicon-96.png', 'favicon.png');
copy('android-192.png', 'Icons/icon-192.png');
copy('png-512.png', 'Icons/icon-512.png');

const master = `${SRC}/png-1024.png`;

// Full-bleed square: the rounded tile flattened onto its own blue.
const bleed = await sharp(master).flatten({ background: TILE_BLUE }).png().toBuffer();

await sharp(bleed).resize(180, 180).png().toFile('public/apple-touch-icon.png');

async function maskable(size, out) {
  const img = sharp(bleed).resize(size, size);
  await (out.endsWith('.webp') ? img.webp({ quality: 90 }) : img.png()).toFile(out);
}
await maskable(512, 'public/Icons/icon-512-maskable.png');
await maskable(512, 'public/Icons/icon-512-maskable.webp');
await sharp(`${SRC}/png-512.png`).webp({ quality: 90 }).toFile('public/Icons/icon-512.webp');

console.log('App icons written.');

// ── iOS launch screens ──────────────────────────────────────────────────────
// iOS shows a blank white screen while an installed web app boots unless it
// gets an apple-touch-startup-image for that exact screen size. Each one is
// Tey's tile centred on the tile's own blue — the same picture Android builds
// from the manifest (background_color + icon), and what /launch then shows,
// so opening the app is one continuous blue moment.
// [css width, css height, pixel ratio] — portrait.
const IOS_SCREENS = [
  [440, 956, 3], [402, 874, 3], [430, 932, 3], [393, 852, 3], [428, 926, 3],
  [390, 844, 3], [360, 780, 3], [375, 812, 3], [414, 896, 3], [414, 896, 2],
  [414, 736, 3], [375, 667, 2], [320, 568, 2],
  [1024, 1366, 2], [834, 1194, 2], [820, 1180, 2], [810, 1080, 2], [768, 1024, 2],
];

const { mkdirSync, writeFileSync } = await import('node:fs');
const SPLASH_BLUE = { r: 0, g: 80, b: 179, alpha: 1 }; // --color-brand-deep #0050B3
mkdirSync('public/splash', { recursive: true });
const splashes = [];
for (const [cw, ch, dpr] of IOS_SCREENS) {
  const w = cw * dpr;
  const h = ch * dpr;
  const tile = Math.round(Math.min(w, h) * 0.34);
  const art = await sharp(master).resize(tile, tile).png().toBuffer();
  const file = `splash/ios-${w}x${h}.png`;
  await sharp({ create: { width: w, height: h, channels: 4, background: SPLASH_BLUE } })
    .composite([{ input: art, left: Math.round((w - tile) / 2), top: Math.round(h * 0.44 - tile / 2) }])
    .png({ compressionLevel: 9, palette: true })
    .toFile(`public/${file}`);
  splashes.push({
    url: `/${file}`,
    media: `(device-width: ${cw}px) and (device-height: ${ch}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)`,
  });
}
// Read by app/layout.tsx (appleWebApp.startupImage).
writeFileSync('lib/pwa/iosSplash.json', JSON.stringify(splashes, null, 2) + '\n');
console.log(`${splashes.length} iOS launch screens written.`);
