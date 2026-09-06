#!/usr/bin/env node
/**
 * scripts/check-provider-boundary.mjs
 *
 * Guards the (app) route group boundary.
 *
 * The student-runtime providers (Gamification, Celebration, Herald, Streak,
 * ShopEngine, RewardAnimation, Audio) are mounted in app/(app)/layout.tsx, not
 * in the root layout — that is what keeps the marketing, blog, auth and legal
 * pages from booting the whole gamification stack.
 *
 * Every one of those hooks THROWS when called outside its provider. So a
 * component that calls one, imported (however indirectly) by a page outside
 * app/(app)/, is not a slow page — it is a hard crash on a public route.
 *
 * This walks each hook's call sites transitively up the import graph to the
 * terminal page/layout files and fails if any of them lives outside the group.
 * Run it in CI; the boundary is currently clean and cheap to keep that way.
 *
 * Usage: node scripts/check-provider-boundary.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

/** Hooks that throw outside their provider AND whose provider lives in (app). */
const GUARDED_HOOKS = [
  'useGamification',
  'useCelebration',
  'useShopEngine',
  'useHerald',
  'useStreakModal',
  'useRewardAnimation',
  'useRewardAnimationVisuals',
  'useAudio',
  'useTeyroLoader',
];

/** Where those providers are mounted. Terminal routes must live under this. */
const GROUP_PREFIX = 'app/(app)/';

const files = [];
function walk(d) {
  if (!fs.existsSync(d)) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.next') continue;
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (/\.(tsx|ts|jsx|js)$/.test(e.name)) files.push(f);
  }
}
for (const d of ['app', 'components', 'context', 'lib', 'hooks', 'utils']) {
  walk(path.join(ROOT, d));
}

const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');

function resolveSpec(spec, fromFile) {
  let base;
  if (spec.startsWith('@/')) base = path.join(ROOT, spec.slice(2));
  else if (spec.startsWith('.')) base = path.resolve(path.dirname(fromFile), spec);
  else return null;
  for (const ext of ['.tsx', '.ts', '.jsx', '.js']) {
    if (fs.existsSync(base + ext)) return base + ext;
  }
  for (const ext of ['/index.tsx', '/index.ts']) {
    if (fs.existsSync(base + ext)) return base + ext;
  }
  if (fs.existsSync(base) && fs.statSync(base).isFile()) return base;
  return null;
}

const importers = new Map();
const src = new Map();
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  src.set(f, text);
  const re = /(?:from|import\()\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const target = resolveSpec(m[1], f);
    if (!target) continue;
    if (!importers.has(target)) importers.set(target, new Set());
    importers.get(target).add(f);
  }
}

const isRoute = (f) => /^app\/.*(page|layout|template)\.(tsx|ts|jsx|js)$/.test(rel(f));

let failed = false;
const report = [];

for (const hook of GUARDED_HOOKS) {
  const callSite = new RegExp('[^A-Za-z0-9_]' + hook + '\\s*\\(');
  const consumers = files.filter((f) => {
    // the file that DEFINES the hook is not a consumer of it
    if (new RegExp('export function ' + hook + '\\b').test(src.get(f))) return false;
    return callSite.test(src.get(f));
  });

  const routes = new Set();
  const seen = new Set();
  const stack = [...consumers];
  while (stack.length) {
    const f = stack.pop();
    if (seen.has(f)) continue;
    seen.add(f);
    if (isRoute(f)) {
      routes.add(rel(f));
      continue;
    }
    for (const imp of importers.get(f) || []) stack.push(imp);
  }

  const outside = [...routes].filter((r) => !r.startsWith(GROUP_PREFIX)).sort();
  if (outside.length) {
    failed = true;
    report.push(`  ✗ ${hook} reaches ${outside.length} route(s) outside ${GROUP_PREFIX}:`);
    for (const r of outside) report.push(`      ${r}`);
  } else {
    report.push(`  ✓ ${hook} — ${routes.size} route(s), all inside the group`);
  }
}

console.log('\nProvider boundary check\n');
console.log(report.join('\n'));

if (failed) {
  console.error(
    '\nFAIL: a guarded hook is reachable from a route outside ' +
      GROUP_PREFIX +
      '.\n' +
      'These hooks throw without their provider, so this crashes that route at runtime.\n' +
      'Either move the route into the group, or stop the component from calling the hook.\n',
  );
  process.exit(1);
}

console.log('\nOK: boundary is clean.\n');
