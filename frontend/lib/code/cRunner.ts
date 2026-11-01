/**
 * The page side of Teyro's C runner. One shared worker
 * (public/c/runner.worker.js) for the whole tab: the compiler (xcc, about
 * 230 KB with its library) loads once, on first use (warm it early with
 * `warmC()`), and the browser caches it after that.
 *
 * Every run compiles the program from scratch and runs it with a time limit.
 * A program that runs past it is stopped by terminating the worker, and the
 * next run starts a fresh one. Runs queue one at a time.
 */

import type { RawRunResult } from './pythonRunner';

export type CStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface CError {
  /** A short name: Compile error, Division by zero, Memory error... */
  type: string;
  /** The compiler's (or WebAssembly's) own words. */
  message: string;
  /** The line in the learner's code, when known. */
  line: number | null;
}

/** Shaped like a Python run, so grading (checks.ts gradeChecks) is shared. */
export interface RawCRun extends RawRunResult {
  error: CError | null;
  /** False when it never ran (it didn't compile). */
  compiled: boolean;
  /** What main returned, or exit() was given. */
  exitCode: number | null;
  /** The output was cut off (a runaway print loop). */
  truncated: boolean;
}

export interface CRunOptions {
  /** Lines typed into the program (scanf, fgets...), in order. */
  stdin?: string[];
  timeoutMs?: number;
}

const WORKER_URL = '/c/runner.worker.js';
const DEFAULT_TIMEOUT_MS = 5000;
/** First load downloads the compiler; give a slow phone connection time. */
const LOAD_TIMEOUT_MS = 60_000;

let worker: Worker | null = null;
let status: CStatus = 'idle';
let readyPromise: Promise<void> | null = null;
let nextId = 1;
let queue: Promise<unknown> = Promise.resolve();
const listeners = new Set<(s: CStatus) => void>();

function setStatus(s: CStatus) {
  status = s;
  listeners.forEach((fn) => fn(s));
}

export function getCStatus(): CStatus {
  return status;
}

/** Subscribe to loading / ready / error. Returns an unsubscribe function. */
export function onCStatus(fn: (s: CStatus) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function startWorker(): Promise<void> {
  if (worker && readyPromise) return readyPromise;
  setStatus('loading');
  const w = new Worker(WORKER_URL);
  worker = w;
  readyPromise = new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => fail(), LOAD_TIMEOUT_MS);
    const fail = () => {
      window.clearTimeout(timer);
      w.removeEventListener('message', onMessage);
      if (worker === w) {
        w.terminate();
        worker = null;
        readyPromise = null;
      }
      setStatus('error');
      reject(new Error("C couldn't load. Check your connection and try again."));
    };
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ready') {
        window.clearTimeout(timer);
        w.removeEventListener('message', onMessage);
        setStatus('ready');
        resolve();
      } else if (e.data?.type === 'loadError') {
        fail();
      }
    };
    w.addEventListener('message', onMessage);
    w.addEventListener('error', () => fail());
  });
  return readyPromise;
}

/** Start loading the compiler in the background. Safe to call many times. */
export function warmC(): void {
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

async function runNow(code: string, opts: CRunOptions): Promise<RawCRun> {
  await startWorker();
  const w = worker!;
  const id = nextId++;
  const started = performance.now();
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  // Each line is typed and then Enter.
  const stdin = opts.stdin && opts.stdin.length ? `${opts.stdin.join('\n')}\n` : '';

  return new Promise<RawCRun>((resolve) => {
    const timer = window.setTimeout(() => {
      w.removeEventListener('message', onMessage);
      // The only way to stop a running program: throw the worker away.
      resetWorker();
      resolve({ stdout: '', error: null, exprResults: [], compiled: true, exitCode: null, truncated: false, timedOut: true, ms: timeoutMs });
    }, timeoutMs);
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type !== 'result' || e.data.id !== id) return;
      window.clearTimeout(timer);
      w.removeEventListener('message', onMessage);
      resolve({
        stdout: typeof e.data.stdout === 'string' ? e.data.stdout : '',
        error: e.data.error ?? null,
        exprResults: [],
        compiled: e.data.compiled !== false,
        exitCode: typeof e.data.exitCode === 'number' ? e.data.exitCode : null,
        truncated: Boolean(e.data.truncated),
        timedOut: false,
        ms: Math.round(performance.now() - started),
      });
    };
    w.addEventListener('message', onMessage);
    w.postMessage({ id, code, stdin });
  });
}

/**
 * Compile and run a C program. Never rejects for a mistake in the learner's
 * code (that comes back as `error`); rejects only if the compiler can't load.
 */
export function runC(code: string, opts: CRunOptions = {}): Promise<RawCRun> {
  const job = queue.then(() => runNow(code, opts));
  queue = job.catch(() => undefined);
  return job;
}

/** After a load failure: forget the broken worker so the next run tries again. */
export function retryC(): void {
  resetWorker();
  warmC();
}
