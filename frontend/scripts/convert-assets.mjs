#!/usr/bin/env node
/**
 * scripts/convert-assets.mjs
 *
 * Converts oversized raster assets under public/ to WebP (and AVIF) at sensible
 * display resolutions.
 *
 * This supersedes scripts/optimize-existing.js, which did the right thing but
 * was hardcoded to the top level of one folder and NOT recursive — which is
 * exactly why it converted 33 files in "User onbarding Assets" and never
 * touched its "Step 2 icons" / "Step 3 icons" subfolders, where the ten largest
 * files in the repo live (2.5-4.2 MB each, rendered at 72px).
 *
 * Why convert at all when next/image exists: next/image protects the *client*,
 * not the *optimizer*. Vercel's image pipeline still has to fetch, decode and
 * resample the multi-megabyte source once per size/format/DPR on a cache miss —
 * that is multi-second cold latency on the onboarding category grid, ten tiles
 * at a time, plus transformation quota. It is also 169 MB inside every
 * deployment bundle.
 *
 * Guarantee of no visual change: nothing is upscaled, every target width is at
 * least 2x the largest CSS size the asset is rendered at, and the script
 * reports the dimensions before/after so the diff is reviewable. Alpha is
 * preserved (both WebP and AVIF support it), so transparent mascots are safe.
 *
 * Usage:
 *   node scripts/convert-assets.mjs --dry-run     # report only, write nothing
 *   node scripts/convert-assets.mjs               # convert
 *   node scripts/convert-assets.mjs --avif        # also emit .avif
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const WITH_AVIF = args.includes('--avif');

/** Only files above this are worth touching. */
const MIN_BYTES = 150 * 1024;

/**
 * Max width per folder, chosen from the largest size each asset is actually
 * rendered at, doubled for 2x displays.
 *
 * The onboarding category icons render in a 72px tile (Step2Content sets
 * sizes="(min-width: 768px) 72px, 56px"), so 256 is already generous. The
 * mascots and step art are full-bleed panels, hence 1280.
 */
const WIDTH_RULES = [
  [/User onbarding Assets[\\/]Step [23] icons/i, 256],
  [/Icons[\\/]/i, 512],
  [/lesson-assets[\\/]/i, 512],
  [/homepage[\\/]cat-/i, 640],
  [/Tey Expressions[\\/]/i, 1024],
  [/lesson Player[\\/]/i, 1024],
  [/creator-onboarding[\\/]/i, 1280],
  [/Teyro Creator Onbarding flow[\\/]/i, 1280],
  [/User onbarding Assets[\\/]/i, 1280],
  [/homepage[\\/]/i, 1600],
];
const DEFAULT_WIDTH = 1280;

function targetWidth(relPath) {
  for (const [re, w] of WIDTH_RULES) {
    if (re.test(relPath)) return w;
  }
  return DEFAULT_WIDTH;
}

const SOURCE_EXT = /\.(png|jpe?g)$/i;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (SOURCE_EXT.test(entry.name)) out.push(full);
  }
  return out;
}

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
const rel = (f) => path.relative(PUBLIC_DIR, f).split(path.sep).join('/');

async function convert(file) {
  const relPath = rel(file);
  const srcBytes = fs.statSync(file).size;
  if (srcBytes < MIN_BYTES) return null;

  const image = sharp(file);
  const meta = await image.metadata();
  const width = targetWidth(relPath);
  const outWidth = Math.min(width, meta.width || width);

  const webpPath = file.replace(SOURCE_EXT, '.webp');
  const avifPath = file.replace(SOURCE_EXT, '.avif');

  // Skip when an up-to-date sibling already exists, so the script is
  // re-runnable and incremental.
  const upToDate =
    fs.existsSync(webpPath) && fs.statSync(webpPath).mtimeMs >= fs.statSync(file).mtimeMs;

  let webpBytes = fs.existsSync(webpPath) ? fs.statSync(webpPath).size : 0;
  let avifBytes = fs.existsSync(avifPath) ? fs.statSync(avifPath).size : 0;

  if (!DRY_RUN && !upToDate) {
    await sharp(file)
      .resize({ width: outWidth, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath);
    webpBytes = fs.statSync(webpPath).size;

    if (WITH_AVIF) {
      await sharp(file)
        .resize({ width: outWidth, withoutEnlargement: true })
        .avif({ quality: 55, effort: 5 })
        .toFile(avifPath);
      avifBytes = fs.statSync(avifPath).size;
    }
  }

  return {
    relPath,
    srcBytes,
    webpBytes,
    avifBytes,
    srcWidth: meta.width,
    outWidth,
    skipped: upToDate,
  };
}

const files = walk(PUBLIC_DIR);
const candidates = files.filter((f) => fs.statSync(f).size >= MIN_BYTES);

console.log(
  `\n${files.length} raster source(s) under public/, ${candidates.length} over ${kb(MIN_BYTES)}.` +
    (DRY_RUN ? '  [DRY RUN — nothing written]' : '') +
    '\n',
);

let totalSrc = 0;
let totalWebp = 0;
let converted = 0;
const rows = [];

for (const file of candidates) {
  try {
    const r = await convert(file);
    if (!r) continue;
    totalSrc += r.srcBytes;
    totalWebp += r.webpBytes || 0;
    if (!r.skipped) converted++;
    rows.push(r);
  } catch (err) {
    console.error(`  FAILED ${rel(file)} — ${err.message}`);
  }
}

rows.sort((a, b) => b.srcBytes - a.srcBytes);
for (const r of rows.slice(0, 25)) {
  const pct = r.webpBytes ? (100 - (r.webpBytes / r.srcBytes) * 100).toFixed(0) : '—';
  console.log(
    `  ${kb(r.srcBytes).padStart(10)} -> ${kb(r.webpBytes).padStart(9)}  (-${pct}%)  ` +
      `${r.srcWidth}px->${r.outWidth}px  ${r.relPath}`,
  );
}
if (rows.length > 25) console.log(`  ... and ${rows.length - 25} more`);

console.log(
  `\n  Sources: ${kb(totalSrc)}   WebP: ${kb(totalWebp)}   ` +
    `saved ${kb(totalSrc - totalWebp)} (${(100 - (totalWebp / totalSrc) * 100).toFixed(1)}%)`,
);
console.log(`  Converted this run: ${converted}\n`);
