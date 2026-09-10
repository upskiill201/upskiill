#!/usr/bin/env node
/**
 * scripts/measure-bundle.mjs
 *
 * Prints the bundle numbers used for the performance before/after report.
 *
 * Why this exists rather than reading `next build` output: Next 16 under
 * Turbopack does not print the "First Load JS" / "shared by all" columns that
 * the webpack builder used to emit, and @next/bundle-analyzer does not attach
 * cleanly to Turbopack either. The manifests are still written, so we read
 * those directly.
 *
 * The headline metric is `rootMainFiles` — the chunk set every single route
 * loads, marketing pages included. That is the number the route-group split is
 * meant to move.
 *
 * Usage:  node scripts/measure-bundle.mjs [--json] [--save <label>]
 * Compare: node scripts/measure-bundle.mjs --diff baseline.json
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';

const NEXT_DIR = path.resolve(process.cwd(), '.next');
const STATIC_DIR = path.join(NEXT_DIR, 'static');

if (!existsSync(NEXT_DIR)) {
  console.error('No .next/ found — run `npx next build` first.');
  process.exit(1);
}

/** Recursively collect files under dir matching an extension. */
function walk(dir, ext, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, ext, out);
    else if (entry.name.endsWith(ext)) out.push(full);
  }
  return out;
}

const sizeOf = (f) => statSync(f).size;
const gzipOf = (f) => gzipSync(readFileSync(f)).length;
const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const mb = (n) => `${(n / 1048576).toFixed(2)} MB`;

// ── The chunk set loaded by EVERY route ────────────────────────────────────
const manifest = JSON.parse(readFileSync(path.join(NEXT_DIR, 'build-manifest.json'), 'utf8'));
const rootFiles = (manifest.rootMainFiles || [])
  .map((f) => path.join(STATIC_DIR, '..', f))
  .filter(existsSync);

let rootRaw = 0;
let rootGz = 0;
const rootDetail = rootFiles.map((f) => {
  const raw = sizeOf(f);
  const gz = gzipOf(f);
  rootRaw += raw;
  rootGz += gz;
  return { file: path.relative(NEXT_DIR, f), raw, gz };
});

// ── All emitted client JS ──────────────────────────────────────────────────
const allJs = walk(STATIC_DIR, '.js');
const totalRaw = allJs.reduce((s, f) => s + sizeOf(f), 0);
const totalGz = allJs.reduce((s, f) => s + gzipOf(f), 0);

// ── All emitted CSS ────────────────────────────────────────────────────────
const allCss = walk(STATIC_DIR, '.css');
const cssRaw = allCss.reduce((s, f) => s + sizeOf(f), 0);
const cssGz = allCss.reduce((s, f) => s + gzipOf(f), 0);

const chunks = allJs
  .map((f) => ({ file: path.relative(STATIC_DIR, f), raw: sizeOf(f), gz: gzipOf(f) }))
  .sort((a, b) => b.raw - a.raw);

// ── Which heavy vendors ended up in a given chunk set ──────────────────────
// A vendor appearing in a public route's set is shipped to visitors who can
// never use it — exactly what the audit flagged.
//
// NOTE ON MARKERS: these run against MINIFIED output, so the package name is
// usually gone. `framer-motion` as a literal string appears in zero chunks;
// `AnimatePresence` (an exported identifier that survives minification)
// appears in 37. Each marker below was calibrated against this build — do not
// swap one for the package name without re-checking that it still matches.
const VENDOR_MARKERS = {
  'framer-motion': /AnimatePresence/,
  'posthog-js': /posthog/i,
  gsap: /gsap|CustomEase/,
  firebase: /firebaseapp|initializeApp/i,
  'canvas-confetti': /canvas-confetti/,
  'react-quill': /quill/i,
  '@stripe': /stripe/i,
  'aws-sdk': /aws-sdk/i,
  swr: /revalidateOnFocus|dedupingInterval/,
};

/** Returns { name: {chunks, raw} } for every vendor found in `files`. */
function vendorsIn(files) {
  const found = {};
  const contents = files.map((f) => ({ f, text: readFileSync(f, 'utf8') }));
  for (const [name, re] of Object.entries(VENDOR_MARKERS)) {
    const hits = contents.filter(({ text }) => re.test(text));
    if (hits.length) {
      found[name] = { chunks: hits.length, raw: hits.reduce((s, { f }) => s + sizeOf(f), 0) };
    }
  }
  return found;
}

const vendorsInRoot = Object.keys(vendorsIn(rootFiles));

// ── Per-route payloads, read from the prerendered HTML ─────────────────────
// This is the number that actually matters: what a visitor to THIS url
// downloads. `rootMainFiles` alone understates it substantially (445 KB vs
// ~1.3 MB on the landing page), because App Router adds the layout and page
// client chunks on top.
const ROUTES_OF_INTEREST = [
  ['/', 'index.html'],
  ['/login', 'login.html'],
  ['/signup', 'signup.html'],
  ['/terms', 'terms.html'],
  ['/blog', 'blog.html'],
  ['/teach', 'teach.html'],
  ['/join', 'join.html'],
];

const SERVER_APP = path.join(NEXT_DIR, 'server', 'app');
const routeReports = [];
for (const [route, htmlFile] of ROUTES_OF_INTEREST) {
  const htmlPath = path.join(SERVER_APP, htmlFile);
  if (!existsSync(htmlPath)) continue;
  const html = readFileSync(htmlPath, 'utf8');
  const refs = [...new Set(html.match(/static\/chunks\/[a-zA-Z0-9_~.\-]*\.js/g) || [])];
  const files = refs.map((r) => path.join(NEXT_DIR, r)).filter(existsSync);
  if (!files.length) continue;
  routeReports.push({
    route,
    files: files.length,
    raw: files.reduce((s, f) => s + sizeOf(f), 0),
    gz: files.reduce((s, f) => s + gzipOf(f), 0),
    vendors: vendorsIn(files),
  });
}

const report = {
  measuredAt: new Date().toISOString(),
  sharedByAllRoutes: { files: rootFiles.length, raw: rootRaw, gz: rootGz },
  totalClientJs: { files: allJs.length, raw: totalRaw, gz: totalGz },
  totalCss: { files: allCss.length, raw: cssRaw, gz: cssGz },
  largestChunk: chunks[0] ? { file: chunks[0].file, raw: chunks[0].raw, gz: chunks[0].gz } : null,
  vendorsInSharedChunks: vendorsInRoot,
  routes: routeReports,
};

const args = process.argv.slice(2);

if (args.includes('--json')) {
  console.log(JSON.stringify({ ...report, rootDetail, chunks: chunks.slice(0, 20) }, null, 2));
} else {
  console.log('\n─── Teyro bundle measurement ───────────────────────────────\n');
  console.log(`Shared by ALL routes   ${kb(rootRaw).padStart(10)} raw   ${kb(rootGz).padStart(10)} gz   (${rootFiles.length} files)`);
  for (const d of rootDetail) {
    console.log(`   · ${d.file.padEnd(46)} ${kb(d.raw).padStart(10)}  ${kb(d.gz).padStart(9)} gz`);
  }
  console.log();
  console.log(`Total client JS        ${mb(totalRaw).padStart(10)} raw   ${mb(totalGz).padStart(10)} gz   (${allJs.length} files)`);
  console.log(`Total CSS              ${kb(cssRaw).padStart(10)} raw   ${kb(cssGz).padStart(10)} gz   (${allCss.length} files)`);
  console.log();
  console.log('Largest chunks:');
  for (const c of chunks.slice(0, 10)) {
    console.log(`   ${kb(c.raw).padStart(10)} raw  ${kb(c.gz).padStart(9)} gz   ${c.file}`);
  }
  console.log();
  console.log(`Heavy vendors in the shared chunk set: ${vendorsInRoot.length ? vendorsInRoot.join(', ') : '(none)'}`);
  console.log();
  console.log('Per-route client JS (what a visitor to this url downloads):');
  for (const r of routeReports) {
    const vendorList = Object.entries(r.vendors)
      .map(([n, v]) => `${n}×${v.chunks}`)
      .join(' ');
    console.log(`   ${r.route.padEnd(10)} ${kb(r.raw).padStart(11)} raw  ${kb(r.gz).padStart(9)} gz  (${r.files} files)`);
    if (vendorList) console.log(`   ${''.padEnd(10)} ${vendorList}`);
  }
  console.log('\n────────────────────────────────────────────────────────────\n');
}

const saveIdx = args.indexOf('--save');
if (saveIdx !== -1 && args[saveIdx + 1]) {
  const out = path.resolve(process.cwd(), args[saveIdx + 1]);
  writeFileSync(out, JSON.stringify({ ...report, rootDetail, chunks: chunks.slice(0, 20) }, null, 2));
  console.log(`Saved → ${out}`);
}

const diffIdx = args.indexOf('--diff');
if (diffIdx !== -1 && args[diffIdx + 1]) {
  const prev = JSON.parse(readFileSync(path.resolve(process.cwd(), args[diffIdx + 1]), 'utf8'));
  const row = (label, before, after) => {
    const delta = after - before;
    const pct = before ? ((delta / before) * 100).toFixed(1) : '0.0';
    const sign = delta <= 0 ? '' : '+';
    console.log(
      `${label.padEnd(24)} ${kb(before).padStart(11)} → ${kb(after).padStart(11)}   ${sign}${kb(delta).trim()} (${sign}${pct}%)`,
    );
  };
  console.log('\n─── Before → After ─────────────────────────────────────────\n');
  row('Shared by all (raw)', prev.sharedByAllRoutes.raw, report.sharedByAllRoutes.raw);
  row('Shared by all (gz)', prev.sharedByAllRoutes.gz, report.sharedByAllRoutes.gz);
  row('Total client JS (raw)', prev.totalClientJs.raw, report.totalClientJs.raw);
  row('Total client JS (gz)', prev.totalClientJs.gz, report.totalClientJs.gz);
  if (prev.largestChunk && report.largestChunk) {
    row('Largest chunk (raw)', prev.largestChunk.raw, report.largestChunk.raw);
  }
  console.log(`\nVendors in shared chunks`);
  console.log(`   before: ${prev.vendorsInSharedChunks.join(', ') || '(none)'}`);
  console.log(`   after:  ${report.vendorsInSharedChunks.join(', ') || '(none)'}`);
  console.log('\n────────────────────────────────────────────────────────────\n');
}
