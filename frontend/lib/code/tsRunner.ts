/**
 * The page side of Teyro's TypeScript runner: one shared worker
 * (public/typescript/runner.worker.js) for the tab, built like pythonRunner.ts.
 * The compiler (a few MB) loads once, on first use — warm it early with
 * `warmTypeScript()` — and the browser caches it.
 *
 * Every run type-checks first, then runs. A program that runs past the time
 * limit is stopped by terminating the worker; the next run starts a fresh one.
 */

import type { RawRunResult, RunOptions, PythonStatus as RunnerStatus } from './pythonRunner';

export type { RunnerStatus };

/** One type error, as TypeScript reports it. */
export interface TypeDiagnostic {
  /** TypeScript's error code, e.g. 2322. */
  code: number;
  line: number | null;
  column: number | null;
  message: string;
}

const WORKER_URL = '/typescript/runner.worker.js';
const DEFAULT_TIMEOUT_MS = 5000;
const LOAD_TIMEOUT_MS = 90_000;

let worker: Worker | null = null;
let status: RunnerStatus = 'idle';
let readyPromise: Promise<void> | null = null;
let nextId = 1;
let queue: Promise<unknown> = Promise.resolve();
const listeners = new Set<(s: RunnerStatus) => void>();

function setStatus(s: RunnerStatus) {
  status = s;
  listeners.forEach((fn) => fn(s));
}

export function getTypeScriptStatus(): RunnerStatus {
  return status;
}

export function onTypeScriptStatus(fn: (s: RunnerStatus) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

const LOAD_FAILED = "TypeScript couldn't load. Check your connection and try again.";

function startWorker(): Promise<void> {
  if (worker && readyPromise) return readyPromise;
  setStatus('loading');
  const w = new Worker(WORKER_URL);
  worker = w;
  readyPromise = new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => fail(new Error('TypeScript took too long to load. Check your connection and try again.')), LOAD_TIMEOUT_MS);
    const fail = (err: Error) => {
      window.clearTimeout(timer);
      w.removeEventListener('message', onMessage);
      if (worker === w) {
        w.terminate();
        worker = null;
        readyPromise = null;
      }
      setStatus('error');
      reject(err);
    };
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ready') {
        window.clearTimeout(timer);
        w.removeEventListener('message', onMessage);
        setStatus('ready');
        resolve();
      } else if (e.data?.type === 'loadError') {
        fail(new Error(LOAD_FAILED));
      }
    };
    w.addEventListener('message', onMessage);
    w.addEventListener('error', () => fail(new Error(LOAD_FAILED)));
  });
  return readyPromise;
}

/** Start loading TypeScript in the background. Safe to call many times. */
export function warmTypeScript(): void {
  if (typeof window === 'undefined' || typeof Worker === 'undefined') return;
  startWorker().catch(() => {
    /* reported through the status, and again on the next run */
  });
}

function resetWorker() {
  worker?.terminate();
  worker = null;
  readyPromise = null;
  setStatus('idle');
}

async function runNow(code: string, opts: RunOptions): Promise<RawRunResult> {
  await startWorker();
  const w = worker!;
  const id = nextId++;
  const started = performance.now();
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  return new Promise<RawRunResult>((resolve) => {
    const timer = window.setTimeout(() => {
      w.removeEventListener('message', onMessage);
      resetWorker();
      resolve({ stdout: '', error: null, exprResults: [], timedOut: true, ms: timeoutMs, typeErrors: [] });
    }, timeoutMs);
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type !== 'result' || e.data.id !== id) return;
      window.clearTimeout(timer);
      w.removeEventListener('message', onMessage);
      resolve({
        stdout: String(e.data.stdout ?? ''),
        error: e.data.error ?? null,
        exprResults: Array.isArray(e.data.checks) ? e.data.checks.map(Boolean) : [],
        timedOut: false,
        ms: Math.round(performance.now() - started),
        typeErrors: Array.isArray(e.data.typeErrors)
          ? (e.data.typeErrors as (TypeDiagnostic & { syntax?: boolean })[])
              .filter((d) => !d.syntax)
              .map(({ code, line, column, message }) => ({ code, line, column, message }))
          : [],
      });
    };
    w.addEventListener('message', onMessage);
    w.postMessage({ id, code, exprs: opts.exprs ?? [] });
  });
}

/**
 * Type-check and run a TypeScript program. Never rejects for a bug in the
 * learner's code (that comes back as `error` / `typeErrors`); rejects only if
 * TypeScript itself can't load.
 */
export function runTypeScript(code: string, opts: RunOptions = {}): Promise<RawRunResult> {
  const job = queue.then(() => runNow(code, opts));
  queue = job.catch(() => undefined);
  return job;
}

/** TSX → JavaScript for the React Native runner, or the first syntax error. */
export interface TranspiledTsx {
  js: string | null;
  error: { message: string; line: number | null } | null;
}

async function transpileNow(code: string): Promise<TranspiledTsx> {
  await startWorker();
  const w = worker!;
  const id = nextId++;
  return new Promise<TranspiledTsx>((resolve) => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type !== 'result' || e.data.id !== id) return;
      w.removeEventListener('message', onMessage);
      resolve({ js: typeof e.data.js === 'string' ? e.data.js : null, error: e.data.error ?? null });
    };
    w.addEventListener('message', onMessage);
    w.postMessage({ id, code, kind: 'transpileTsx' });
  });
}

/**
 * Turn a React Native lesson's TSX into JavaScript with the same compiler
 * (public/react-native/transpile.js). Rejects only if TypeScript can't load.
 */
export function transpileTsx(code: string): Promise<TranspiledTsx> {
  const job = queue.then(() => transpileNow(code));
  queue = job.catch(() => undefined);
  return job;
}

export function retryTypeScript(): void {
  resetWorker();
  warmTypeScript();
}
