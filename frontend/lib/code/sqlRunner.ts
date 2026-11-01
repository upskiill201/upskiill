/**
 * The page side of Teyro's SQL runner. One shared worker
 * (public/sql/runner.worker.js) for the whole tab: SQLite (sql.js, about
 * 1 MB) loads once, on first use (warm it early with `warmSql()`), and the
 * browser caches it after that.
 *
 * Every run starts from a fresh copy of a practice database
 * (public/sql/db/<name>.sql) and has a time limit. A query that runs past it
 * is stopped by terminating the worker, and the next run starts a fresh one.
 * Runs queue one at a time.
 */

export type SqlStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface SqlError {
  /** A short name for the problem: Syntax error, No such table... */
  type: string;
  /** SQLite's own message. */
  message: string;
  /** The line the failing statement starts on. */
  line: number | null;
}

/** One statement's result: rows (SELECT) or what it did (INSERT, CREATE...). */
export type SqlResult =
  | { kind: 'rows'; sql: string; columns: string[]; rows: (string | number | null)[][]; rowCount: number }
  | { kind: 'done'; sql: string; message: string };

export interface SqlTable {
  name: string;
  view: boolean;
  rows: number | null;
  columns: { name: string; type: string; key: boolean }[];
}

export interface RawSqlRun {
  results: SqlResult[];
  error: SqlError | null;
  /** One per check query, in order: did its first value come out true? */
  exprResults: boolean[];
  /** The database's tables after the run. */
  schema: SqlTable[];
  timedOut: boolean;
  ms: number;
}

export interface SqlRunOptions {
  /** The practice database to start from; an empty database when absent. */
  database?: string;
  /** Check queries run after the code, on the same database. */
  exprs?: string[];
  timeoutMs?: number;
}

const WORKER_URL = '/sql/runner.worker.js';
const DEFAULT_TIMEOUT_MS = 5000;
/** First load downloads SQLite itself; give a slow phone connection time. */
const LOAD_TIMEOUT_MS = 60_000;

let worker: Worker | null = null;
let status: SqlStatus = 'idle';
let readyPromise: Promise<void> | null = null;
let nextId = 1;
let queue: Promise<unknown> = Promise.resolve();
const listeners = new Set<(s: SqlStatus) => void>();

function setStatus(s: SqlStatus) {
  status = s;
  listeners.forEach((fn) => fn(s));
}

export function getSqlStatus(): SqlStatus {
  return status;
}

/** Subscribe to loading / ready / error. Returns an unsubscribe function. */
export function onSqlStatus(fn: (s: SqlStatus) => void): () => void {
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
      reject(new Error("The database couldn't load. Check your connection and try again."));
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

/** Start loading SQLite in the background. Safe to call many times. */
export function warmSql(): void {
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

async function runNow(code: string, opts: SqlRunOptions): Promise<RawSqlRun> {
  await startWorker();
  const w = worker!;
  const id = nextId++;
  const started = performance.now();
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  return new Promise<RawSqlRun>((resolve) => {
    const timer = window.setTimeout(() => {
      w.removeEventListener('message', onMessage);
      // The only way to stop a running query: throw the worker away.
      resetWorker();
      resolve({ results: [], error: null, exprResults: [], schema: [], timedOut: true, ms: timeoutMs });
    }, timeoutMs);
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type !== 'result' || e.data.id !== id) return;
      window.clearTimeout(timer);
      w.removeEventListener('message', onMessage);
      resolve({
        results: Array.isArray(e.data.results) ? e.data.results : [],
        error: e.data.error ?? null,
        exprResults: Array.isArray(e.data.checks) ? e.data.checks.map(Boolean) : [],
        schema: Array.isArray(e.data.schema) ? e.data.schema : [],
        timedOut: false,
        ms: Math.round(performance.now() - started),
      });
    };
    w.addEventListener('message', onMessage);
    w.postMessage({ id, code, database: opts.database ?? null, exprs: opts.exprs ?? [] });
  });
}

/**
 * Run SQL against a fresh practice database. Never rejects for a mistake in
 * the learner's SQL (that comes back as `error`); rejects only if SQLite
 * itself can't load.
 */
export function runSql(code: string, opts: SqlRunOptions = {}): Promise<RawSqlRun> {
  const job = queue.then(() => runNow(code, opts));
  queue = job.catch(() => undefined);
  return job;
}

/** The tables a practice database starts with (the Tables panel before any run). */
export function sqlSchema(database?: string): Promise<SqlTable[]> {
  const job = queue.then(async () => {
    await startWorker();
    const w = worker!;
    const id = nextId++;
    return new Promise<SqlTable[]>((resolve) => {
      const onMessage = (e: MessageEvent) => {
        if (e.data?.id !== id) return;
        w.removeEventListener('message', onMessage);
        resolve(e.data.type === 'schema' && Array.isArray(e.data.schema) ? e.data.schema : []);
      };
      w.addEventListener('message', onMessage);
      w.postMessage({ type: 'schema', id, database: database ?? null });
    });
  });
  queue = job.catch(() => undefined);
  return job;
}

/** After a load failure: forget the broken worker so the next run tries again. */
export function retrySql(): void {
  resetWorker();
  warmSql();
}
