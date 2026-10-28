import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import * as vm from 'vm';
import type {
  AuthoredCodeCheck,
  OriginalTrackDef,
} from './originals-authoring.types';
import type { LintIssue } from './originals-lint';

/**
 * Type-checks and runs every piece of TypeScript in a Track before it can be
 * loaded, the same way the learner's browser does
 * (frontend/public/typescript/runner.worker.js): TypeScript 5.9.3 with
 * `strict`, the ES2022 library plus a tiny environment (console, timers),
 * then the emitted JavaScript runs with console output captured.
 *
 *   error    a Write and run solution fails its own checks (learners could
 *            never pass it), has type errors it isn't meant to have, or crashes
 *   warning  a Try it live card has type errors or crashes (fine if the
 *            lesson is about errors, but worth a look), or a starter already
 *            passes every check
 *
 * Keep this, the worker and frontend/lib/code/checks.ts (gradeChecks) in step.
 */

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument -- the TypeScript compiler API and values from inside a vm context */

const MAIN = 'main.ts';
const ENV = 'teyro-env.d.ts';
const ROOT_LIB = 'lib.es2022.d.ts';
const TIMEOUT_MS = 5000;

const ENV_SOURCE = [
  'interface Console {',
  '  log(...data: any[]): void;',
  '  error(...data: any[]): void;',
  '  warn(...data: any[]): void;',
  '  info(...data: any[]): void;',
  '}',
  'declare var console: Console;',
  'declare function setTimeout(handler: () => void, timeout?: number): number;',
  'declare function clearTimeout(id?: number): void;',
].join('\n');

export interface TsDiagnostic {
  code: number;
  line: number | null;
  message: string;
}

export interface TsRunOut {
  stdout: string;
  error: { type: string; message: string; line: number | null } | null;
  checks: boolean[];
  typeErrors: TsDiagnostic[];
}

// The compiler is a dev dependency (an authoring tool), loaded only when a
// track has TypeScript to check.
let tsLib: any = null;
function ts(): any {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  tsLib ??= require('typescript');
  return tsLib;
}

const libFiles = new Map<string, any>();
let lastProgram: any;

function options() {
  const t = ts();
  return {
    strict: true,
    target: t.ScriptTarget.ES2022,
    module: t.ModuleKind.ES2022,
    moduleDetection: t.ModuleDetectionKind.Force,
    lib: [ROOT_LIB],
    types: [],
    noEmit: true,
    skipLibCheck: true,
    noFallthroughCasesInSwitch: true,
  };
}

function typeCheck(code: string): (TsDiagnostic & { syntax: boolean })[] {
  const t = ts();
  const opts = options();
  const base = t.createCompilerHost(opts);
  const libDir = t.getDirectoryPath(t.getDefaultLibFilePath(opts));
  const main = t.createSourceFile(MAIN, code, t.ScriptTarget.ES2022, true);
  const host = {
    ...base,
    getSourceFile(name: string) {
      if (name === MAIN) return main;
      if (name === ENV) {
        if (!libFiles.has(ENV))
          libFiles.set(
            ENV,
            t.createSourceFile(ENV, ENV_SOURCE, t.ScriptTarget.ES2022, true),
          );
        return libFiles.get(ENV);
      }
      const base = name.split(/[\\/]/).pop()!;
      if (!libFiles.has(base)) {
        const text = t.sys.readFile(t.combinePaths(libDir, base));
        if (text === undefined) return undefined;
        libFiles.set(
          base,
          t.createSourceFile(base, text, t.ScriptTarget.ES2022, true),
        );
      }
      return libFiles.get(base);
    },
    getDefaultLibFileName: () => ROOT_LIB,
    getDefaultLibLocation: () => '',
    fileExists: (name: string) =>
      name === MAIN ||
      name === ENV ||
      existsSync(join(libDir, name.split(/[\\/]/).pop()!)),
    readFile: (name: string) =>
      name === MAIN
        ? code
        : t.sys.readFile(join(libDir, name.split(/[\\/]/).pop()!)),
    writeFile: () => {},
    getCurrentDirectory: () => '/',
  };
  const program = t.createProgram([MAIN, ENV], opts, host, lastProgram);
  lastProgram = program;
  const file = program.getSourceFile(MAIN);
  const syntactic = program.getSyntacticDiagnostics(file);
  const diags = syntactic.length
    ? syntactic
    : program.getSemanticDiagnostics(file);
  return diags.map((d: any) => {
    const pos =
      d.file && d.start !== undefined
        ? d.file.getLineAndCharacterOfPosition(d.start)
        : null;
    return {
      syntax: syntactic.length > 0,
      code: d.code,
      line: pos ? pos.line + 1 : null,
      message: t.flattenDiagnosticMessageText(d.messageText, '\n'),
    };
  });
}

function toJavaScript(code: string): string {
  const t = ts();
  const out: string = t.transpileModule(code, {
    compilerOptions: {
      target: t.ScriptTarget.ES2022,
      module: t.ModuleKind.ES2022,
      moduleDetection: t.ModuleDetectionKind.Force,
    },
    reportDiagnostics: false,
  }).outputText;
  return out
    .replace(/^export \{\s*\};?\s*$/gm, '')
    .replace(
      /^export (default )?(?=(const|let|var|function|class|async)\b)/gm,
      '',
    );
}

// ─── console output, exactly as the worker formats it ─────────────────────

function formatInner(v: any, depth: number): string {
  if (typeof v === 'string') return "'" + v.replace(/'/g, "\\'") + "'";
  return formatValue(v, depth);
}

export function formatValue(v: any, depth = 0): string {
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';
  const t = typeof v;
  if (t === 'string') return v;
  if (t === 'number') return Object.is(v, -0) ? '-0' : String(v);
  if (t === 'boolean' || t === 'bigint')
    return t === 'bigint' ? `${v}n` : String(v);
  if (t === 'symbol') return v.toString();
  if (t === 'function') return '[Function: ' + (v.name || '(anonymous)') + ']';
  const tag = Object.prototype.toString.call(v);
  if (tag === '[object Error]') return v.name + ': ' + v.message;
  if (tag === '[object Date]')
    return isNaN(v.getTime()) ? 'Invalid Date' : v.toISOString();
  if (depth > 2) return Array.isArray(v) ? '[Array]' : '[Object]';
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    return (
      '[ ' + v.map((x: any) => formatInner(x, depth + 1)).join(', ') + ' ]'
    );
  }
  if (tag === '[object Map]')
    return (
      'Map(' +
      v.size +
      ') { ' +
      [...v]
        .map(
          ([k, x]: any) =>
            formatInner(k, depth + 1) + ' => ' + formatInner(x, depth + 1),
        )
        .join(', ') +
      ' }'
    );
  if (tag === '[object Set]')
    return (
      'Set(' +
      v.size +
      ') { ' +
      [...v].map((x: any) => formatInner(x, depth + 1)).join(', ') +
      ' }'
    );
  const keys = Object.keys(v);
  if (keys.length === 0) return '{}';
  const key = (k: string) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : "'" + k + "'");
  return (
    '{ ' +
    keys.map((k) => key(k) + ': ' + formatInner(v[k], depth + 1)).join(', ') +
    ' }'
  );
}

function describe(e: any): { type: string; message: string; line: null } {
  if (e && typeof e === 'object' && 'name' in e && 'message' in e)
    return { type: String(e.name), message: String(e.message), line: null };
  return { type: 'Error', message: String(e), line: null };
}

/** Type-check and run one program, like the worker's run(). */
export async function runTypeScriptProgram(
  code: string,
  exprs: string[] = [],
): Promise<TsRunOut> {
  const all = typeCheck(code);
  const typeErrors = all.map(({ code: c, line, message }) => ({
    code: c,
    line,
    message,
  }));
  const syntax = all.find((d) => d.syntax);
  if (syntax) {
    return {
      stdout: '',
      error: {
        type: 'SyntaxError',
        message: syntax.message,
        line: syntax.line,
      },
      checks: [],
      typeErrors: [],
    };
  }

  const lines: string[] = [];
  const print = (...args: unknown[]) =>
    lines.push(args.map((a) => formatValue(a, 0)).join(' '));
  const fakeConsole = { log: print, info: print, warn: print, error: print };
  const checkSuffix =
    '\nreturn [' +
    exprs
      .map(
        (e) =>
          `(() => { try { return !!(${e}); } catch (_) { return false; } })()`,
      )
      .join(',') +
    '];';

  let error: TsRunOut['error'] = null;
  let checks: boolean[] = [];
  try {
    const script = new vm.Script(
      `(async (console) => { "use strict";\n${toJavaScript(code)}${checkSuffix}\n})`,
    );
    const fn = script.runInNewContext(
      { setTimeout, clearTimeout },
      { timeout: TIMEOUT_MS },
    );
    checks = (await fn(fakeConsole)).map(Boolean);
  } catch (e) {
    error = describe(e);
  }
  return {
    stdout: lines.join('\n') + (lines.length ? '\n' : ''),
    error,
    checks: error ? [] : checks,
    typeErrors,
  };
}

const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const exact = (s: string) =>
  s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .trim();

/** Which checks pass. Mirrors gradeChecks in frontend/lib/code/checks.ts (language 'typescript'). */
export async function gradeTypeScript(
  code: string,
  checks: AuthoredCodeCheck[],
): Promise<{ passed: boolean[]; out: TsRunOut }> {
  const exprs = checks
    .filter((c) => c.expr !== undefined)
    .map((c) => c.expr as string);
  const out = await runTypeScriptProgram(code, exprs);
  const deliberate = checks.some((c) => c.typeErrorIncludes !== undefined);
  const typeBlocked = out.typeErrors.length > 0 && !deliberate;
  let k = 0;
  const passed = checks.map((c) => {
    let ok = false;
    if (c.noTypeErrors)
      ok = out.error?.type !== 'SyntaxError' && out.typeErrors.length === 0;
    else if (c.typeErrorIncludes !== undefined)
      ok = out.typeErrors.some((d) =>
        loose(d.message).includes(loose(c.typeErrorIncludes!)),
      );
    else if (out.error || typeBlocked) ok = false;
    else if (c.expr !== undefined) ok = out.checks[k] === true;
    else if (c.outputIncludes !== undefined)
      ok = loose(out.stdout).includes(loose(c.outputIncludes));
    else if (c.outputEquals !== undefined)
      ok = exact(out.stdout) === exact(c.outputEquals);
    else if (c.codeIncludes !== undefined) ok = code.includes(c.codeIncludes);
    if (c.expr !== undefined) k += 1;
    return ok;
  });
  return { passed, out };
}

/** The TypeScript version the browser worker pins, read from the worker itself. */
function workerVersion(): string | null {
  const candidates = [
    join(
      process.cwd(),
      '..',
      'frontend',
      'public',
      'typescript',
      'runner.worker.js',
    ),
    join(process.cwd(), 'frontend', 'public', 'typescript', 'runner.worker.js'),
    join(
      __dirname,
      '..',
      '..',
      '..',
      'frontend',
      'public',
      'typescript',
      'runner.worker.js',
    ),
  ];
  const found = candidates.find((p) => existsSync(p));
  if (!found) return null;
  return (
    /TS_VERSION = '([^']+)'/.exec(readFileSync(found, 'utf8'))?.[1] ?? null
  );
}

/** Check every Try it live card and Write and run solution in a TypeScript track. */
export async function verifyTypeScriptTrack(
  track: OriginalTrackDef,
): Promise<LintIssue[]> {
  const issues: LintIssue[] = [];
  const pinned = workerVersion();
  const installed: string = ts().version;
  if (pinned && pinned !== installed) {
    issues.push({
      level: 'error',
      where: track.slug,
      message: `The browser runner pins TypeScript ${pinned}, but lessons are being checked with ${installed}. Make them match (frontend/public/typescript/runner.worker.js TS_VERSION).`,
    });
  }
  const show = (d: TsDiagnostic) =>
    `TS${d.code} (line ${d.line ?? '?'}): ${d.message.split('\n')[0]}`;

  for (const level of track.levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        const where = `${track.slug} L${level.level} ${unit.key} ${lesson.key} "${lesson.title}"`;
        for (const [i, card] of lesson.learn.entries()) {
          if (card.kind !== 'tryIt') continue;
          const out = await runTypeScriptProgram(card.code);
          const failed =
            out.error ??
            (out.typeErrors.length
              ? { type: 'a type error', message: show(out.typeErrors[0]) }
              : null);
          if (card.expectError && !failed) {
            issues.push({
              level: 'warning',
              where,
              message: `Try it live card ${i + 1} is marked expectError but has no type error and runs without one.`,
            });
          }
          if (failed && !card.expectError) {
            issues.push({
              level: 'warning',
              where,
              message: `Try it live card ${i + 1} stops with ${failed.type}: ${failed.message}. Fine only if the lesson is about that error.`,
            });
          }
        }
        for (const [i, ex] of lesson.apply.items.entries()) {
          if (ex.kind !== 'writeCode') continue;
          const sol = await gradeTypeScript(ex.solution, ex.checks);
          const deliberate = ex.checks.some(
            (c) => c.typeErrorIncludes !== undefined,
          );
          if (sol.out.error) {
            issues.push({
              level: 'error',
              where,
              message: `Exercise ${i + 1}: the solution crashes with ${sol.out.error.type}: ${sol.out.error.message}`,
            });
          } else if (sol.out.typeErrors.length && !deliberate) {
            issues.push({
              level: 'error',
              where,
              message: `Exercise ${i + 1}: the solution has a type error: ${show(sol.out.typeErrors[0])}`,
            });
          } else {
            sol.passed.forEach((ok, j) => {
              if (!ok)
                issues.push({
                  level: 'error',
                  where,
                  message: `Exercise ${i + 1}: the solution fails its own check "${ex.checks[j].message}".`,
                });
            });
          }
          const starter = await gradeTypeScript(ex.starter ?? '', ex.checks);
          if (starter.passed.length > 0 && starter.passed.every(Boolean)) {
            issues.push({
              level: 'warning',
              where,
              message: `Exercise ${i + 1}: the starter code already passes every check, so there's nothing to do.`,
            });
          }
        }
      }
    }
  }
  return issues;
}
