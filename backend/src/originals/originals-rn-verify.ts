import { readFileSync } from 'fs';
import { join } from 'path';
import type { AuthoredCodeCheck, OriginalTrackDef } from './originals-authoring.types';
import type { LintIssue } from './originals-lint';
import type { ScreenTest } from './originals-screen-checks';

/**
 * Renders every React Native lesson the way the learner's phone preview does
 * (frontend/lib/code/rnRunner.ts), and checks it:
 *
 *   1. TSX → JavaScript with the same transpile file the browser uses
 *      (frontend/public/react-native/transpile.js), with this package's
 *      TypeScript (pinned to the browser's version, see originals-ts-verify).
 *   2. The same built runtime (frontend/public/react-native/runtime.js:
 *      React, react-native-web and the screen checks) runs in jsdom, so a
 *      solution graded here is graded by identical rules for learners.
 *
 *   error    a Build it solution fails its own checks, or a Try it live card
 *            doesn't render (unless it's meant to fail)
 *   warning  a starter already passes every check
 *
 * Rebuild the runtime (frontend: node scripts/build-rn-runtime.mjs) after
 * changing the screen checks, or this verifies against the old rules.
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports -- jsdom and the runtime are loaded lazily and untyped */

const FRONTEND_PUBLIC = join(__dirname, '..', '..', '..', 'frontend', 'public', 'react-native');

let transpileFn: ((ts: unknown, code: string) => { js: string | null; error: { message: string; line: number | null } | null }) | null = null;
let runtimeSource: string | null = null;

function transpile(code: string) {
  transpileFn ??= require(join(FRONTEND_PUBLIC, 'transpile.js'));
  return transpileFn!(require('typescript'), code);
}

interface ScreenResult {
  passed: boolean[];
  error: { message: string } | null;
  text: string;
}

const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

/** Render the code in a fresh jsdom phone and run its screen checks. Mirrors renderAndCheckRn. */
export async function gradeRn(code: string, checks: AuthoredCodeCheck[]): Promise<{ passed: boolean[]; error: string | null; text: string }> {
  const compiled = transpile(code);
  if (!compiled.js) return { passed: checks.map(() => false), error: `Syntax error${compiled.error?.line ? ` on line ${compiled.error.line}` : ''}: ${compiled.error?.message}`, text: '' };
  runtimeSource ??= readFileSync(join(FRONTEND_PUBLIC, 'runtime.js'), 'utf8');
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', { runScripts: 'outside-only', pretendToBeVisual: true });
  try {
    dom.window.eval(runtimeSource);
    const tests = checks.filter((c) => c.screen).map((c) => c.screen as ScreenTest);
    const result: ScreenResult = await dom.window.__TEYRO_RN__.check(compiled.js, tests);
    let s = 0;
    const passed = checks.map((c) => {
      if (c.screen) return result.passed[s++] === true;
      if (c.outputIncludes !== undefined) return !result.error && loose(result.text).includes(loose(c.outputIncludes));
      if (c.codeIncludes !== undefined) return code.includes(c.codeIncludes);
      return false;
    });
    return { passed, error: result.error?.message ?? null, text: result.text };
  } finally {
    dom.window.close();
  }
}

/** Check every Try it live card and Build it solution (and starter) in a React Native track. */
export async function verifyRnTrack(track: OriginalTrackDef): Promise<LintIssue[]> {
  const issues: LintIssue[] = [];
  for (const level of track.levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        const where = `${track.slug} L${level.level} ${unit.key} ${lesson.key} "${lesson.title}"`;
        for (const [i, card] of lesson.learn.entries()) {
          if (card.kind !== 'tryIt') continue;
          const r = await gradeRn(card.code, []);
          if (r.error && !card.expectError) issues.push({ level: 'error', where, message: `Try it live card ${i + 1} doesn't render: ${r.error}` });
          if (!r.error && card.expectError) issues.push({ level: 'error', where, message: `Try it live card ${i + 1} is meant to fail, but it renders without an error.` });
        }
        for (const [i, ex] of lesson.apply.items.entries()) {
          if (ex.kind !== 'writeCode') continue;
          for (const c of ex.checks) {
            if (c.expr !== undefined || c.noTypeErrors || c.typeErrorIncludes !== undefined || c.dom || c.outputEquals !== undefined) {
              issues.push({ level: 'error', where, message: `Exercise ${i + 1}: "${c.message}" isn't a screen check; React Native lessons use screen, outputIncludes or codeIncludes.` });
            }
          }
          const sol = await gradeRn(ex.solution, ex.checks);
          if (sol.error) issues.push({ level: 'error', where, message: `Exercise ${i + 1}: the solution doesn't render: ${sol.error}` });
          sol.passed.forEach((ok, j) => {
            if (!ok) issues.push({ level: 'error', where, message: `Exercise ${i + 1}: the solution fails its own check "${ex.checks[j].message}".` });
          });
          const starter = await gradeRn(ex.starter ?? '', ex.checks);
          if (starter.passed.length > 0 && starter.passed.every(Boolean)) {
            issues.push({ level: 'warning', where, message: `Exercise ${i + 1}: the starter code already passes every check, so there's nothing to do.` });
          }
        }
      }
    }
  }
  return issues;
}
