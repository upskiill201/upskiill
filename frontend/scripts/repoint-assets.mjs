#!/usr/bin/env node
/**
 * scripts/repoint-assets.mjs
 *
 * Rewrites code references from a raster source (.png/.PNG/.jpg) to its .webp
 * sibling, but ONLY where that sibling actually exists on disk.
 *
 * Run after scripts/convert-assets.mjs. Covers .ts/.tsx (next/image src, raw
 * <img> src, string constants) and .css/.module.css (url(...) backgrounds,
 * which bypass next/image entirely and so get no format negotiation at all).
 *
 * Deliberately conservative: it only touches paths that resolve to a real file
 * under public/, so a string that merely looks like an image path is left
 * alone. Reports every rewrite for review.
 *
 * Usage:
 *   node scripts/repoint-assets.mjs --dry-run
 *   node scripts/repoint-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const DRY_RUN = process.argv.includes('--dry-run');

const SEARCH_DIRS = ['app', 'components', 'lib', 'hooks', 'utils', 'content'];
const CODE_EXT = /\.(tsx?|jsx?|css)$/;

/**
 * Files whose image references must stay PNG, and why. These are consumed by
 * software outside the browser's <img> negotiation, where WebP support is
 * either absent or unreliable:
 *
 *  - app/manifest.ts   PWA install icons. Android home-screen and maskable
 *                      icons are expected to be PNG; a WebP here risks the
 *                      install prompt or a broken launcher icon.
 *  - app/layout.tsx    favicon, apple-touch-icon, and the Open Graph / Twitter
 *                      card images. Social scrapers (Facebook, LinkedIn, Slack)
 *                      have poor-to-no WebP support, so converting the OG image
 *                      silently breaks every shared link preview.
 */
const EXCLUDED_FILES = new Set(
  ['app/manifest.ts', 'app/layout.tsx'].map((f) => path.join(ROOT, ...f.split('/'))),
);

/** Reference paths that must stay PNG wherever they appear. */
const EXCLUDED_REFS = [/^\/teyro-og\./i, /^\/favicon\./i, /^\/apple-touch-icon\./i, /^\/Icons\/icon-/i];

const files = [];
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (CODE_EXT.test(entry.name)) files.push(full);
  }
}
for (const d of SEARCH_DIRS) walk(path.join(ROOT, d));

/** Matches a public-rooted image path inside quotes or url(). */
const REF = /(["'`(])(\/[^"'`)]+?\.(?:png|PNG|jpe?g|JPE?G))(["'`)])/g;

let rewrites = 0;
let filesChanged = 0;
const log = [];

for (const file of files) {
  if (EXCLUDED_FILES.has(file)) continue;
  const src = fs.readFileSync(file, 'utf8');
  let changed = false;

  const out = src.replace(REF, (match, open, refPath, close) => {
    // Decode %20 etc. so folder names with spaces resolve.
    let decoded;
    try {
      decoded = decodeURIComponent(refPath);
    } catch {
      decoded = refPath;
    }

    if (EXCLUDED_REFS.some((re) => re.test(refPath))) return match;

    const onDisk = path.join(PUBLIC_DIR, decoded);
    if (!fs.existsSync(onDisk)) return match;

    const webpRef = refPath.replace(/\.(png|PNG|jpe?g|JPE?G)$/, '.webp');
    let webpDecoded;
    try {
      webpDecoded = decodeURIComponent(webpRef);
    } catch {
      webpDecoded = webpRef;
    }
    const webpOnDisk = path.join(PUBLIC_DIR, webpDecoded);
    if (!fs.existsSync(webpOnDisk)) return match;

    rewrites++;
    changed = true;
    log.push(
      `  ${path.relative(ROOT, file).split(path.sep).join('/')}\n      ${refPath}\n   -> ${webpRef}`,
    );
    return open + webpRef + close;
  });

  if (changed) {
    filesChanged++;
    if (!DRY_RUN) fs.writeFileSync(file, out);
  }
}

console.log(
  `\n${rewrites} reference(s) across ${filesChanged} file(s)` +
    (DRY_RUN ? '  [DRY RUN — nothing written]' : '') +
    '\n',
);
for (const line of log) console.log(line);
console.log('');
