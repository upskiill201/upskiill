/**
 * The page side of Teyro's Python runner. One shared worker
 * (public/python/runner.worker.js) for the whole tab: Pyodide is several MB,
 * so it loads once, on first use (warm it early with `warmPython()` when a
 * screen that needs it opens), and the browser caches it after that.
 *
 * Every run has a time limit. A program that runs past it (an infinite loop,
 * a huge range) is stopped by terminating the worker, and the next run starts
 * a fresh one. Runs queue one at a time.
 */

export type PythonStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface PythonError {
  /** Python's exception name: SyntaxError, NameError... */
  type: string;
  message: string;
  /** The line in the learner's code, when Python knows it. */
  line: number | null;
}

export interface RawRunResult {
  stdout: string;
  error: PythonError | null;
  /** One per check expression, in order: did it come out true? */
  exprResults: boolean[];
  timedOut: boolean;
  ms: number;
}

export interface RunOptions {
  /** Lines fed to input(), in order. */
  stdin?: string[];
  /** Python expressions evaluated in the program's namespace after it runs. */
  exprs?: string[];
  timeoutMs?: number;
}

const WORKER_URL = '/python/runner.worker.js';
const DEFAULT_TIMEOUT_MS = 5000;
/** First load downloads Python itself; give a slow phone connection time. */
const LOAD_TIMEOUT_MS = 90_000;

let worker: Worker | null = null;
let status: PythonStatus = 'idle';
let readyPromise: Promise<void> | null = null;
let nextId = 1;
let queue: Promise<unknown> = Promise.resolve();
const listeners = new Set<(s: PythonStatus) => void>();

function setStatus(s: PythonStatus) {
  status = s;
  listeners.forEach((fn) => fn(s));
}

export function getPythonStatus(): PythonStatus {
  return status;
}

/** Subscribe to loading / ready / error. Returns an unsubscribe function. */
export function onPythonStatus(fn: (s: PythonStatus) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function startWorker(): Promise<void> {
  if (worker && readyPromise) return readyPromise;
  setStatus('loading');
  const w = new Worker(WORKER_URL);
  worker = w;
  readyPromise = new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      fail(new Error('Python took too long to load. Check your connection and try again.'));
    }, LOAD_TIMEOUT_MS);
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
        fail(new Error("Python couldn't load. Check your connection and try again."));
      }
    };
    w.addEventListener('message', onMessage);
    w.addEventListener('error', () => fail(new Error("Python couldn't load. Check your connection and try again.")));
  });
  return readyPromise;
}

/** Start loading Python in the background. Safe to call many times. */
export function warmPython(): void {
  if (typeof window === 'undefined' || typeof Worker === 'undefined') return;
  startWorker().catch(() => {
    /* reported through the status */
  });
}

/** Stop and forget the current worker (after a timeout, or to retry a failed load). */
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
      // The only way to stop a running Python program: throw the worker away.
      resetWorker();
      resolve({ stdout: '', error: null, exprResults: [], timedOut: true, ms: timeoutMs });
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
      });
    };
    w.addEventListener('message', onMessage);
    w.postMessage({ id, code, stdin: opts.stdin ?? [], exprs: opts.exprs ?? [] });
  });
}

/**
 * Run a Python program. Never rejects for a bug in the learner's code (that
 * comes back as `error`); rejects only if Python itself can't load.
 */
export function runPython(code: string, opts: RunOptions = {}): Promise<RawRunResult> {
  const job = queue.then(() => runNow(code, opts));
  // Keep the queue alive after a failed load, so the next run can retry.
  queue = job.catch(() => undefined);
  return job;
}

/** After a load failure: forget the broken worker so the next run tries again. */
export function retryPython(): void {
  resetWorker();
  warmPython();
}
