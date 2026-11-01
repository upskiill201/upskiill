import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type { AuthoredCodeCheck, OriginalTrackDef } from './originals-authoring.types';
import type { LintIssue } from './originals-lint';

/**
 * Runs every piece of JavaScript in a JavaScript Track before it can be
 * loaded, with the browser runner's own in-page runtime
 * (frontend/public/javascript/runner.js + practice-api.js) inside jsdom
 * (pinned in package.json), on the same practice page and starting
 * localStorage the lesson gives the learner.
 *
 *   error    a Write and run solution fails its own checks or stops with an
 *            error (learners could never pass it)
 *   warning  a Try it live card stops with an error (fine if the lesson is
 *            about that error), or a starter already passes every check
 *
 * jsdom is not a browser: no layout, no innerText, no real network (only the
 * practice API answers). Lesson code that passes here also works in the
 * browser; keep solutions to what both support. Grading mirrors
 * frontend/lib/code/checks.ts gradeChecks.
 */

interface JsRunOut {
  stdout: string;
  error: { type: string; message: string; line: number | null } | null;
  exprResults: boolean[];
  exprProblems: (string | null)[];
}

/* eslint-disable @typescript-eslint/no-explicit-any -- the bits of jsdom's API used here */
interface JsdomLike {
  window: any;
}
type JsdomCtor = new (html: string, options: Record<string, unknown>) => JsdomLike;
/* eslint-enable @typescript-eslint/no-explicit-any */

let jsdom: { JSDOM: JsdomCtor; VirtualConsole: new () => unknown } | null = null;
function getJsdom() {
  // A dev-only dependency (authoring tool), typed locally.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  jsdom ??= require('jsdom') as { JSDOM: JsdomCtor; VirtualConsole: new () => unknown };
  return jsdom;
}

/** The browser runtime's files, found from wherever the checker runs: the repo root or backend/. */
function readRuntimeFile(name: string): string {
  const candidates = [
    join(process.cwd(), '..', 'frontend', 'public', 'javascript', name),
    join(process.cwd(), 'frontend', 'public', 'javascript', name),
    join(__dirname, '..', '..', '..', 'frontend', 'public', 'javascript', name),
  ];
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error(`Can't find frontend/public/javascript/${name}.`);
  return readFileSync(found, 'utf8');
}

let runtime: string | null = null;
function getRuntime(): string {
  runtime ??= ['practice-api.js', 'runner.js'].map(readRuntimeFile).join('\n;\n').replace(/<\/script/gi, '<\\/script');
  return runtime;
}

/** Phones love curly quotes; JavaScript doesn't. Mirrors straightenQuotes in the frontend. */
const straighten = (code: string) => code.replace(/[“”„‟″]/g, '"').replace(/[‘’‚‛′]/g, "'");

const RUN_LIMIT_MS = 20_000;

/** Run code once in a fresh practice page, the way one press of Run does. */
export async function runJsOnce(
  code: string,
  opts: { page?: string; exprs?: string[]; storage?: Record<string, string>; prompts?: string[] } = {},
): Promise<JsRunOut> {
  const { JSDOM, VirtualConsole } = getJsdom();
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><script>${getRuntime()}</script></head><body>${opts.page ?? ''}</body></html>`;
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    url: 'https://practice.teyro.test/',
    pretendToBeVisual: true,
    // Silent: errors are collected by the runtime, the same way the browser shows them.
    virtualConsole: new VirtualConsole(),
  });
  const win = dom.window;
  let timer: NodeJS.Timeout | undefined;
  // jsdom has no unhandledrejection event: a rejected promise nobody handled reaches Node instead.
  const onRejection = (reason: unknown) => win.__teyroReport?.(reason);
  process.on('unhandledRejection', onRejection);
  try {
    const result = await Promise.race([
      win.__teyroRun({ code: straighten(code), exprs: opts.exprs ?? [], storage: opts.storage ?? {}, prompts: opts.prompts ?? [], latency: 5 }) as Promise<JsRunOut>,
      new Promise<JsRunOut>((resolve) => {
        timer = setTimeout(
          () => resolve({ stdout: '', error: { type: 'Timeout', message: `No answer after ${RUN_LIMIT_MS / 1000} s`, line: null }, exprResults: [], exprProblems: [] }),
          RUN_LIMIT_MS,
        );
      }),
    ]);
    return {
      stdout: String(result.stdout ?? ''),
      error: result.error ?? null,
      exprResults: Array.from(result.exprResults ?? []).map(Boolean),
      exprProblems: Array.from(result.exprProblems ?? []),
    };
  } finally {
    clearTimeout(timer);
    process.off('unhandledRejection', onRejection);
    win.close();
  }
}

const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const exact = (s: string) =>
  s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .trim();

/** Which checks pass, and why an expression check failed. Mirrors gradeChecks in frontend/lib/code/checks.ts. */
export async function gradeJs(
  code: string,
  checks: AuthoredCodeCheck[],
  opts: { page?: string; storage?: Record<string, string>; prompts?: string[] } = {},
): Promise<{ passed: boolean[]; why: (string | null)[]; out: JsRunOut }> {
  const exprs = checks.filter((c) => c.expr !== undefined).map((c) => c.expr as string);
  const out = await runJsOnce(code, { ...opts, exprs });
  const clean = straighten(code);
  let k = 0;
  const why: (string | null)[] = [];
  const passed = checks.map((c) => {
    let ok = false;
    let reason: string | null = null;
    if (out.error) ok = false;
    else if (c.expr !== undefined) {
      ok = out.exprResults[k] === true;
      reason = out.exprProblems[k] ?? null;
    } else if (c.outputIncludes !== undefined) ok = loose(out.stdout).includes(loose(c.outputIncludes));
    else if (c.outputEquals !== undefined) ok = exact(out.stdout) === exact(c.outputEquals);
    else if (c.codeIncludes !== undefined) ok = clean.includes(c.codeIncludes);
    if (c.expr !== undefined) k += 1;
    why.push(reason);
    return ok;
  });
  return { passed, why, out };
}

/** Run every Try it live card and Write and run solution in a JavaScript Track. */
export async function verifyJsTrack(track: OriginalTrackDef): Promise<LintIssue[]> {
  const issues: LintIssue[] = [];
  for (const level of track.levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        const where = `${track.slug} L${level.level} ${unit.key} ${lesson.key} "${lesson.title}"`;
        for (const [i, card] of lesson.learn.entries()) {
          if (card.kind !== 'tryIt') continue;
          const out = await runJsOnce(card.code, { page: card.page, storage: card.storage, prompts: card.stdin });
          if (card.expectError && !out.error) {
            issues.push({ level: 'warning', where, message: `Try it live card ${i + 1} is marked expectError but runs without one.` });
          }
          if (out.error && !card.expectError) {
            issues.push({
              level: 'warning',
              where,
              message: `Try it live card ${i + 1} stops with ${out.error.type}: ${out.error.message}. Fine only if the lesson is about that error.`,
            });
          }
        }
        for (const [i, ex] of lesson.apply.items.entries()) {
          if (ex.kind !== 'writeCode') continue;
          const opts = { page: ex.page, storage: ex.storage, prompts: ex.stdin };
          const sol = await gradeJs(ex.solution, ex.checks, opts);
          if (sol.out.error) {
            issues.push({
              level: 'error',
              where,
              message: `Exercise ${i + 1}: the solution stops with ${sol.out.error.type}: ${sol.out.error.message}`,
            });
          } else {
            sol.passed.forEach((ok, j) => {
              if (!ok)
                issues.push({
                  level: 'error',
                  where,
                  message: `Exercise ${i + 1}: the solution fails its own check "${ex.checks[j].message}"${sol.why[j] ? ` (${sol.why[j]})` : ''}.`,
                });
            });
          }
          const starter = await gradeJs(ex.starter ?? '', ex.checks, opts);
          if (starter.passed.length > 0 && starter.passed.every(Boolean)) {
            issues.push({ level: 'warning', where, message: `Exercise ${i + 1}: the starter code already passes every check, so there's nothing to do.` });
          }
        }
      }
    }
  }
  return issues;
}
