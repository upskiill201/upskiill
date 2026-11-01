// Builds the React Native runner's runtime (scripts/rn-runtime/entry.tsx) into
// one static file, public/react-native/runtime.js: React, react-dom and
// react-native-web, plus the screen checks. Run after changing the entry, the
// screen checks (lib/code/screenChecks.ts) or the pinned versions:
//
//   node scripts/build-rn-runtime.mjs
//
// The output is committed, so neither the app build nor the course loader
// needs esbuild.

import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

await build({
  entryPoints: [join(here, 'rn-runtime', 'entry.tsx')],
  outfile: join(here, '..', 'public', 'react-native', 'runtime.js'),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  minify: true,
  legalComments: 'none',
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  banner: { js: '/* Teyro React Native runner runtime. Built by frontend/scripts/build-rn-runtime.mjs; do not edit. */' },
  logLevel: 'info',
});
