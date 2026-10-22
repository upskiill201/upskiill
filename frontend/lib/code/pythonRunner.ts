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
/** Extra packages the current worker already has (a new worker starts empty). */
let loadedPackages = new Set<string>();
const packageLoads = new Map<string, Promise<void>>();

/** Packages Python can load on request, and the import that needs each one. */
const PACKAGE_IMPORTS: Record<string, RegExp> = {
  pandas: /^\s*(import\s+pandas\b|from\s+pandas\b)/m,
  numpy: /^\s*(import\s+numpy\b|from\s+numpy\b)/m,
  'scikit-learn': /^\s*(import\s+sklearn\b|from\s+sklearn\b)/m,
};

/** Which extra packages a program imports (pandas, numpy, scikit-learn). */
export function packagesFor(code: string): string[] {
  return Object.keys(PACKAGE_IMPORTS).filter((p) => PACKAGE_IMPORTS[p].test(code));
}

/**
 * scikit-learn pulls in scipy too: about 70 MB on top of pandas. It never
 * downloads without the learner saying yes (the "ML tools" screen in
 * PythonPad), and the yes is remembered on this device.
 */
const BIG_PACKAGE = 'scikit-learn';
const ML_TOOLS_KEY = 'teyro.mlTools.allowed';
/** A big download on a slow phone connection needs far longer than pandas. */
const BIG_LOAD_TIMEOUT_MS = 6 * 60_000;
const mlToolsListeners = new Set<() => void>();
/** Set by a yes in private mode, where localStorage can't remember it. */
let allowedThisSession = false;

function mlToolsAllowed(): boolean {
  try {
    return window.localStorage.getItem(ML_TOOLS_KEY) === '1';
  } catch {
    return false;
  }
}

/** Does this code need the learner's OK before it can run (the ~70 MB ML tools)? */
export function needsMlToolsDownload(code: string): boolean {
  if (typeof window === 'undefined') return false;
  if (!packagesFor(code).includes(BIG_PACKAGE)) return false;
  return !loadedPackages.has(BIG_PACKAGE) && !mlToolsAllowed() && !allowedThisSession;
}

/** The learner said yes: remember it, and start the download for this code. */
export function allowMlToolsDownload(code?: string): void {
  allowedThisSession = true;
  try {
    window.localStorage.setItem(ML_TOOLS_KEY, '1');
  } catch {
    /* private mode: the yes still holds for this session */
  }
  mlToolsListeners.forEach((fn) => fn());
  warmPython(code);
}

/** Re-render when the ML tools are allowed (another pad on the page may have said yes). */
export function onMlToolsAllowed(fn: () => void): () => void {
  mlToolsListeners.add(fn);
  return () => mlToolsListeners.delete(fn);
}
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
        loadedPackages = new Set();
        packageLoads.clear();
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

/**
 * Load extra packages into the current worker, once each. Shows as
 * "loading" while it downloads; runs only start their timer after this.
 */
async function ensurePackages(packages: string[]): Promise<void> {
  await startWorker();
  const w = worker!;
  const missing = packages.filter((p) => !loadedPackages.has(p));
  if (missing.length === 0) return;
  const key = missing.slice().sort().join(',');
  let pending = packageLoads.get(key);
  if (!pending) {
    setStatus('loading');
    const id = nextId++;
    pending = new Promise<void>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        w.removeEventListener('message', onMessage);
        packageLoads.delete(key);
        setStatus('error');
        reject(new Error('The data tools took too long to load. Check your connection and try again.'));
      }, missing.includes(BIG_PACKAGE) ? BIG_LOAD_TIMEOUT_MS : LOAD_TIMEOUT_MS);
      const onMessage = (e: MessageEvent) => {
        if (e.data?.id !== id) return;
        if (e.data.type !== 'packagesLoaded' && e.data.type !== 'packagesError') return;
        window.clearTimeout(timer);
        w.removeEventListener('message', onMessage);
        packageLoads.delete(key);
        if (e.data.type === 'packagesLoaded') {
          setStatus('ready');
          if (worker === w) missing.forEach((p) => loadedPackages.add(p));
          resolve();
        } else {
          setStatus('error');
          reject(new Error("The data tools couldn't load. Check your connection and try again."));
        }
      };
      w.addEventListener('message', onMessage);
      w.postMessage({ type: 'loadPackages', id, packages: missing });
    });
    packageLoads.set(key, pending);
  }
  return pending;
}

/**
 * Start loading Python in the background. Safe to call many times. Pass the
 * code on screen to also fetch the packages it imports (pandas takes a while).
 */
export function warmPython(code?: string): void {
  if (typeof window === 'undefined' || typeof Worker === 'undefined') return;
  // Never start the big ML download just because a screen opened.
  const packages = (code ? packagesFor(code) : []).filter(
    (p) => p !== BIG_PACKAGE || loadedPackages.has(p) || allowedThisSession || mlToolsAllowed(),
  );
  const warm = packages.length ? ensurePackages(packages) : startWorker();
  warm.catch(() => {
    /* reported through the status, and again on the next run */
  });
}

/** Stop and forget the current worker (after a timeout, or to retry a failed load). */
function resetWorker() {
  worker?.terminate();
  worker = null;
  readyPromise = null;
  loadedPackages = new Set();
  packageLoads.clear();
  setStatus('idle');
}

async function runNow(code: string, opts: RunOptions): Promise<RawRunResult> {
  await startWorker();
  const packages = packagesFor(code);
  if (packages.length) await ensurePackages(packages);
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
