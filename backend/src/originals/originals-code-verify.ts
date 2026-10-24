import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type {
  AuthoredCodeCheck,
  OriginalTrackDef,
} from './originals-authoring.types';
import type { LintIssue } from './originals-lint';
import { verifySqlTrack } from './originals-sql-verify';
import { verifyCTrack } from './originals-c-verify';
import { verifyJsTrack } from './originals-js-verify';
import { verifyTypeScriptTrack } from './originals-ts-verify';
import { verifyHtmlTrack } from './originals-html-verify';
import { verifyRnTrack } from './originals-rn-verify';

/**
 * Runs every piece of Python in a Track before it can be loaded, with the
 * same Python the learner's browser uses (Pyodide 0.26.4, pinned in
 * package.json and in frontend/public/python/runner.worker.js).
 *
 *   error    a Write and run solution fails its own checks (learners could
 *            never pass it), or its code crashes
 *   warning  a Try it live card crashes (fine if the lesson is about errors,
 *            but worth a look), or a starter already passes every check
 *
 * The harness and grading mirror the browser runner (runner.worker.js and
 * frontend/lib/code/checks.ts); keep them in step.
 */

const HARNESS = `
import builtins, io, sys

def __teyro_install(name, src):
    # A built-in practice module (teyro_ai.py), importable from any program.
    import os
    folder = os.getcwd()
    with open(os.path.join(folder, name + '.py'), 'w') as f:
        f.write(src)
    if folder not in sys.path:
        sys.path.insert(0, folder)

def __teyro_describe(e):
    name = type(e).__name__
    line = None
    if isinstance(e, SyntaxError):
        msg = e.msg or str(e)
        line = e.lineno
    else:
        msg = str(e)
        tb = e.__traceback__
        while tb is not None:
            if tb.tb_frame.f_code.co_filename == 'main.py':
                line = tb.tb_lineno
            tb = tb.tb_next
    return {'type': name, 'message': msg, 'line': line}

def __teyro_run(src, stdin_lines, exprs):
    out = io.StringIO()
    pending = [str(x) for x in stdin_lines]

    def _input(prompt=''):
        out.write(str(prompt))
        if not pending:
            raise EOFError('input() was called, but there is no more input')
        value = pending.pop(0)
        out.write(value + '\\n')
        return value

    # import this prints the Zen only on first import: forget it so every run shows it.
    sys.modules.pop('this', None)
    # Fresh copies of the practice datasets (teyro_datasets.py) for any program that reads a CSV or .md file.
    _write = globals().get('__teyro_write_datasets')
    if _write is not None and ('.csv' in src or '.md' in src):
        _write()
    ns = {'__name__': '__main__', '__builtins__': builtins}
    saved = (sys.stdout, sys.stderr, builtins.input)
    sys.stdout = out
    sys.stderr = out
    builtins.input = _input
    error = None
    try:
        exec(compile(src, 'main.py', 'exec'), ns)
    except SystemExit:
        pass
    except BaseException as e:
        error = __teyro_describe(e)
    finally:
        sys.stdout, sys.stderr, builtins.input = saved

    checks = []
    if error is None:
        for expr in exprs:
            try:
                checks.append(bool(eval(expr, ns)))
            except BaseException:
                checks.append(False)
    return {'stdout': out.getvalue(), 'error': error, 'checks': checks}
`;

interface RunOut {
  stdout: string;
  error: { type: string; message: string; line: number | null } | null;
  checks: boolean[];
}

type Runner = (code: string, stdin: string[], exprs: string[]) => RunOut;

/* eslint-disable @typescript-eslint/no-explicit-any -- the bits of Pyodide's API used here */
interface PyodideLike {
  runPython(code: string): unknown;
  loadPackage(names: string[]): Promise<unknown>;
  toPy(value: unknown): any;
  globals: { get(name: string): any };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * The practice datasets the browser loads (frontend/public/python), found
 * from wherever the checker runs: the repo root or backend/.
 */
function readPythonFile(name: string): string | null {
  const candidates = [
    join(process.cwd(), '..', 'frontend', 'public', 'python', name),
    join(process.cwd(), 'frontend', 'public', 'python', name),
    join(__dirname, '..', '..', '..', 'frontend', 'public', 'python', name),
  ];
  const found = candidates.find((p) => existsSync(p));
  return found ? readFileSync(found, 'utf8') : null;
}

/** Packages a program imports. Mirrors packagesFor in frontend/lib/code/pythonRunner.ts. */
const PACKAGE_IMPORTS: Record<string, RegExp> = {
  pandas: /^\s*(import\s+pandas\b|from\s+pandas\b)/m,
  numpy: /^\s*(import\s+numpy\b|from\s+numpy\b)/m,
  'scikit-learn': /^\s*(import\s+sklearn\b|from\s+sklearn\b)/m,
};
/** The name you import when it differs from the package name. */
const IMPORT_NAMES: Record<string, string> = { 'scikit-learn': 'sklearn' };
export function packagesFor(code: string): string[] {
  return Object.keys(PACKAGE_IMPORTS).filter((p) => PACKAGE_IMPORTS[p].test(code));
}

let pyPromise: Promise<PyodideLike> | null = null;
let runnerPromise: Promise<Runner> | null = null;
const loadedPackages = new Set<string>();

async function getPython(): Promise<PyodideLike> {
  pyPromise ??= (async () => {
    // The CommonJS build: the ESM one can't find its own files under ts-node.
    // Typed locally because pyodide is a dev-only dependency (authoring tool),
    // and this file is compiled with the app.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { loadPyodide } = require('pyodide') as {
      loadPyodide: () => Promise<PyodideLike>;
    };
    const py = await loadPyodide();
    py.runPython(HARNESS);
    const datasets = readPythonFile('teyro_datasets.py');
    if (datasets) py.runPython(datasets);
    // The AI Stack's practice toolkit, installed the same way the browser worker does.
    const toolkit = readPythonFile('teyro_ai.py');
    if (toolkit) py.globals.get('__teyro_install')('teyro_ai', toolkit);
    // Working with AI Coding Agents' practice agent, installed the same way.
    const agent = readPythonFile('teyro_agent.py');
    if (agent) py.globals.get('__teyro_install')('teyro_agent', agent);
    return py;
  })();
  return pyPromise;
}

/** Load pandas/numpy/scikit-learn once, the same way the browser worker does (warnings off on first import). */
async function ensurePackages(packages: string[]): Promise<void> {
  const missing = packages.filter((p) => !loadedPackages.has(p));
  if (missing.length === 0) return;
  const py = await getPython();
  await py.loadPackage(missing);
  py.runPython(
    'import warnings\nwith warnings.catch_warnings():\n    warnings.simplefilter("ignore")\n' +
      missing.map((p) => '    import ' + (IMPORT_NAMES[p] ?? p)).join('\n') +
      // Copy-on-write, as in runner.worker.js: no SettingWithCopyWarning in the output.
      (missing.includes('pandas') ? '\nimport pandas\npandas.set_option("mode.copy_on_write", True)\n' : ''),
  );
  missing.forEach((p) => loadedPackages.add(p));
}

/**
 * Drop the shared Python so the next Track starts in a fresh one. Pyodide's
 * memory is fixed: thousands of runs across every Python Track in one process
 * filled it ("C error: out of memory" in pandas) before the last Tracks ran.
 */
function resetPython(): void {
  pyPromise = null;
  runnerPromise = null;
  loadedPackages.clear();
}

async function getRunner(): Promise<Runner> {
  runnerPromise ??= (async () => {
    const py = await getPython();
    const run = py.globals.get('__teyro_run');
    return (code: string, stdin: string[], exprs: string[]) => {
      const result = run(code, py.toPy(stdin), py.toPy(exprs));
      const js = result.toJs({ dict_converter: Object.fromEntries }) as RunOut;
      result.destroy();
      return {
        stdout: js.stdout ?? '',
        error: js.error ?? null,
        checks: Array.from(js.checks ?? []),
      };
    };
  })();
  return runnerPromise;
}

/** A Python warning (pandas' SettingWithCopyWarning, a DeprecationWarning...) that learners would see in the output. */
const PY_WARNING = /\b[A-Z]\w*Warning: /;

const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const exact = (s: string) =>
  s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .trim();

/** Which checks pass. Mirrors gradeChecks in frontend/lib/code/checks.ts. */
function grade(
  run: Runner,
  code: string,
  checks: AuthoredCodeCheck[],
  stdin: string[] = [],
): { passed: boolean[]; out: RunOut } {
  const exprs = checks
    .filter((c) => c.expr !== undefined)
    .map((c) => c.expr as string);
  const out = run(code, stdin, exprs);
  let k = 0;
  const passed = checks.map((c) => {
    let ok = false;
    if (out.error) ok = false;
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

/** Does this Track contain any Python to run? */
export function hasCode(track: OriginalTrackDef): boolean {
  return track.levels.some((l) =>
    l.units.some((u) =>
      u.lessons.some(
        (lesson) =>
          lesson.learn.some((c) => c.kind === 'tryIt') ||
          lesson.apply.items.some((e) => e.kind === 'writeCode'),
      ),
    ),
  );
}

/**
 * Run every Try it live card and Write and run solution in the Track.
 * Loads Python only when there's code to run (a few seconds, fresh for each Track).
 */
export async function verifyTrackCode(
  track: OriginalTrackDef,
): Promise<LintIssue[]> {
  if (!hasCode(track)) return [];
  // SQL tracks run in SQLite (sql.js), the same build the browser uses.
  if (track.runner === 'sql') return verifySqlTrack(track);
  // C tracks compile and run in xcc, the same build the browser uses.
  if (track.runner === 'c') return verifyCTrack(track);
  // JavaScript tracks run in the browser runner's own runtime, inside jsdom.
  if (track.runner === 'javascript') return verifyJsTrack(track);
  // TypeScript tracks are type-checked and run by the TypeScript compiler, not Python.
  if (track.runner === 'typescript') return verifyTypeScriptTrack(track);
  // HTML & CSS tracks render each page in jsdom and run the page checks.
  if (track.runner === 'html') return verifyHtmlTrack(track);
  // React Native tracks render each screen in jsdom with the browser's own runtime.
  if (track.runner === 'react-native') return verifyRnTrack(track);
  const allCode: string[] = [];
  for (const level of track.levels)
    for (const unit of level.units)
      for (const lesson of unit.lessons) {
        lesson.learn.forEach((c) => c.kind === 'tryIt' && allCode.push(c.code));
        lesson.apply.items.forEach((e) => e.kind === 'writeCode' && allCode.push(e.solution, e.starter ?? ''));
      }
  resetPython();
  await ensurePackages([...new Set(allCode.flatMap(packagesFor))]);
  const run = await getRunner();
  const issues: LintIssue[] = [];
  for (const level of track.levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        const where = `${track.slug} L${level.level} ${unit.key} ${lesson.key} "${lesson.title}"`;
        lesson.learn.forEach((card, i) => {
          if (card.kind !== 'tryIt') return;
          const out = run(card.code, card.stdin ?? [], []);
          if (PY_WARNING.test(out.stdout)) {
            issues.push({ level: 'warning', where, message: `Try it live card ${i + 1} prints a Python warning: ${out.stdout.match(PY_WARNING)?.[0].trim()}` });
          }
          if (card.expectError && !out.error) {
            issues.push({ level: 'warning', where, message: `Try it live card ${i + 1} is marked expectError but runs without one.` });
          }
          if (out.error && !card.expectError) {
            issues.push({
              level: 'warning',
              where,
              message: `Try it live card ${i + 1} stops with ${out.error.type} (line ${out.error.line ?? '?'}): ${out.error.message}. Fine only if the lesson is about that error.`,
            });
          }
        });
        lesson.apply.items.forEach((ex, i) => {
          if (ex.kind !== 'writeCode') return;
          const sol = grade(run, ex.solution, ex.checks, ex.stdin);
          if (PY_WARNING.test(sol.out.stdout)) {
            issues.push({ level: 'warning', where, message: `Exercise ${i + 1}: the solution prints a Python warning: ${sol.out.stdout.match(PY_WARNING)?.[0].trim()}` });
          }
          if (sol.out.error) {
            issues.push({
              level: 'error',
              where,
              message: `Exercise ${i + 1}: the solution crashes with ${sol.out.error.type}: ${sol.out.error.message}`,
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
          const starter = grade(run, ex.starter ?? '', ex.checks, ex.stdin);
          if (starter.passed.length > 0 && starter.passed.every(Boolean)) {
            issues.push({
              level: 'warning',
              where,
              message: `Exercise ${i + 1}: the starter code already passes every check, so there's nothing to do.`,
            });
          }
        });
      }
    }
  }
  return issues;
}
