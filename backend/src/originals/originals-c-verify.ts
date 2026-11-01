import { existsSync } from 'fs';
import { join } from 'path';
import { cpus } from 'os';
import { Worker } from 'worker_threads';
import type {
  AuthoredCodeCheck,
  OriginalTrackDef,
} from './originals-authoring.types';
import type { LintIssue } from './originals-lint';

/**
 * Runs every piece of C in a C Track before it can be loaded, with the same
 * compiler, C library and host the learner's browser uses: the files in
 * frontend/public/c (cc.wasm, libs.json, c-host.js), read straight from
 * disk, so the two can never drift apart.
 *
 *   error    a Write and run solution doesn't compile, crashes, runs past
 *            the time limit or fails its own checks; a check uses `expr`
 *            (C programs have no expressions to evaluate afterwards)
 *   warning  a Try it live card doesn't compile or crashes (fine if the
 *            lesson is about that error), or a starter already passes
 *
 * Grading mirrors frontend/lib/code/cRunner.ts + checks.ts; keep them in step.
 */

interface CError {
  type: string;
  message: string;
  line: number | null;
}

interface CRun {
  stdout: string;
  error: CError | null;
  compiled: boolean;
  exitCode: number | null;
  timedOut: boolean;
}

/** Wall-clock limit per run here; generous, since the browser's is 5 s on a phone. */
const TIMEOUT_MS = 15_000;

/** frontend/public/c, found from wherever the checker runs: the repo root or backend/. */
function cDir(): string {
  const candidates = [
    join(process.cwd(), '..', 'frontend', 'public', 'c'),
    join(process.cwd(), 'frontend', 'public', 'c'),
    join(__dirname, '..', '..', '..', 'frontend', 'public', 'c'),
  ];
  const found = candidates.find((p) => existsSync(join(p, 'c-host.js')));
  if (!found) throw new Error("Can't find frontend/public/c (the C runner).");
  return found;
}

// The host is synchronous, so it runs in a worker thread that can be
// stopped when a program never ends.
const WORKER_SOURCE = `
const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const path = require('path');
const host = require(path.join(workerData.dir, 'c-host.js'));
const c = host.create(
  fs.readFileSync(path.join(workerData.dir, 'cc.wasm')),
  JSON.parse(fs.readFileSync(path.join(workerData.dir, 'libs.json'), 'utf8')),
);
parentPort.on('message', (job) => {
  let out;
  try {
    out = c.run(job.code, job.stdin);
  } catch (e) {
    out = { stdout: '', error: { type: 'Runner error', message: String((e && e.message) || e), line: null }, compiled: false, exitCode: null };
  }
  parentPort.postMessage(out);
});
`;

class CRunner {
  private worker: Worker | null = null;
  constructor(private readonly dir: string) {}

  private start(): Worker {
    this.worker ??= new Worker(WORKER_SOURCE, {
      eval: true,
      workerData: { dir: this.dir },
    });
    return this.worker;
  }

  run(code: string, stdin: string[] = []): Promise<CRun> {
    const w = this.start();
    // Each line is typed and then Enter, as the browser feeds them.
    const text = stdin.length ? stdin.join('\n') + '\n' : '';
    return new Promise<CRun>((resolve) => {
      const timer = setTimeout(() => {
        w.removeAllListeners('message');
        void w.terminate();
        this.worker = null;
        resolve({
          stdout: '',
          error: null,
          compiled: true,
          exitCode: null,
          timedOut: true,
        });
      }, TIMEOUT_MS);
      w.once('message', (out: Omit<CRun, 'timedOut'>) => {
        clearTimeout(timer);
        resolve({ ...out, timedOut: false });
      });
      w.postMessage({ code, stdin: text });
    });
  }

  async close(): Promise<void> {
    if (this.worker) await this.worker.terminate();
    this.worker = null;
  }
}

/** Several compilers at once: each run compiles the C library too (~0.5 s). */
class CPool {
  private readonly runners: CRunner[];
  private readonly free: CRunner[];
  private readonly waiting: ((r: CRunner) => void)[] = [];
  constructor(dir: string, size: number) {
    this.runners = Array.from({ length: size }, () => new CRunner(dir));
    this.free = [...this.runners];
  }

  async run(code: string, stdin?: string[]): Promise<CRun> {
    const runner =
      this.free.pop() ??
      (await new Promise<CRunner>((resolve) => this.waiting.push(resolve)));
    try {
      return await runner.run(code, stdin);
    } finally {
      const next = this.waiting.shift();
      if (next) next(runner);
      else this.free.push(runner);
    }
  }

  async close(): Promise<void> {
    await Promise.all(this.runners.map((r) => r.close()));
  }
}

/** Phones love curly quotes; C doesn't. Mirrors straightenQuotes in frontend/lib/code/checks.ts. */
const straighten = (code: string) =>
  code.replace(/[“”„‟″]/g, '"').replace(/[‘’‚‛′]/g, "'");
const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const exact = (s: string) =>
  s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .trim();

/** Which checks pass. Mirrors gradeChecks in frontend/lib/code/checks.ts. */
async function grade(
  runner: CPool,
  code: string,
  checks: AuthoredCodeCheck[],
  stdin?: string[],
): Promise<{ passed: boolean[]; run: CRun }> {
  const clean = straighten(code);
  const run = await runner.run(clean, stdin);
  const passed = checks.map((c) => {
    if (run.error || run.timedOut) return false;
    if (c.outputIncludes !== undefined)
      return loose(run.stdout).includes(loose(c.outputIncludes));
    if (c.outputEquals !== undefined)
      return exact(run.stdout) === exact(c.outputEquals);
    if (c.codeIncludes !== undefined) return clean.includes(c.codeIncludes);
    return false;
  });
  return { passed, run };
}

const describe = (e: CError) =>
  `${e.type}${e.line ? ` on line ${e.line}` : ''}: ${e.message}`;

type Lesson = OriginalTrackDef['levels'][number]['units'][number]['lessons'][number];

/** One lesson's issues: its Try it live cards and Write and run solutions. */
async function checkLesson(
  runner: CPool,
  where: string,
  lesson: Lesson,
): Promise<LintIssue[]> {
  const issues: LintIssue[] = [];
  const push = (lvl: LintIssue['level'], message: string) =>
    issues.push({ level: lvl, where, message });

  for (const [i, card] of lesson.learn.entries()) {
    if (card.kind !== 'tryIt') continue;
    const out = await runner.run(straighten(card.code), card.stdin);
    if (out.timedOut) {
      push(
        'warning',
        `Try it live card ${i + 1} runs past the time limit. Fine only if the lesson is about endless loops.`,
      );
    } else if (card.expectError && !out.error) {
      push(
        'warning',
        `Try it live card ${i + 1} is marked expectError but runs without one.`,
      );
    } else if (out.error && !card.expectError) {
      push(
        'warning',
        `Try it live card ${i + 1}: ${describe(out.error)}. Fine only if the lesson is about that error.`,
      );
    }
  }

  for (const [i, ex] of lesson.apply.items.entries()) {
    if (ex.kind !== 'writeCode') continue;
    if (ex.checks.some((c) => c.expr !== undefined)) {
      push(
        'error',
        `Exercise ${i + 1}: C checks can't use expr. Check the output (outputIncludes / outputEquals) or the code (codeIncludes).`,
      );
      continue;
    }
    const sol = await grade(runner, ex.solution, ex.checks, ex.stdin);
    if (sol.run.timedOut) {
      push('error', `Exercise ${i + 1}: the solution runs past the time limit.`);
    } else if (sol.run.error) {
      push(
        'error',
        `Exercise ${i + 1}: the solution stops. ${describe(sol.run.error)}`,
      );
    } else {
      sol.passed.forEach((ok, j) => {
        if (!ok)
          push(
            'error',
            `Exercise ${i + 1}: the solution fails its own check "${ex.checks[j].message}". Its output was: ${JSON.stringify(sol.run.stdout.slice(0, 300))}`,
          );
      });
    }
    const starter = await grade(runner, ex.starter ?? '', ex.checks, ex.stdin);
    if (starter.passed.length > 0 && starter.passed.every(Boolean)) {
      push(
        'warning',
        `Exercise ${i + 1}: the starter already passes every check, so there's nothing to do.`,
      );
    }
  }
  return issues;
}

/** Run every Try it live card and Write and run solution in a C Track. */
export async function verifyCTrack(
  track: OriginalTrackDef,
): Promise<LintIssue[]> {
  const size = Math.max(
    1,
    Math.min(Number(process.env.C_CHECK_WORKERS) || cpus().length - 1, 6),
  );
  const runner = new CPool(cDir(), size);
  // Every lesson checks at once (the pool limits the real work); the issues
  // come back in lesson order.
  try {
    const jobs: Promise<LintIssue[]>[] = [];
    for (const level of track.levels)
      for (const unit of level.units)
        for (const lesson of unit.lessons)
          jobs.push(
            checkLesson(
              runner,
              `${track.slug} L${level.level} ${unit.key} ${lesson.key} "${lesson.title}"`,
              lesson,
            ),
          );
    return (await Promise.all(jobs)).flat();
  } finally {
    await runner.close();
  }
}
