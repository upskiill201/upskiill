/**
 * The page side of Teyro's JavaScript runner. Every run gets a fresh,
 * sandboxed frame (scripts and forms on; never allow-same-origin, so the
 * learner's code can't reach Teyro's cookies, storage or pages), with the
 * in-frame runtime (public/javascript/runner.js + practice-api.js) inlined.
 *
 *   runJs        a hidden frame: run, wait for it to settle, run the hidden
 *                checks, report, remove. Used for console lessons and grading.
 *   mountJsPage  a visible frame the learner can click and type in: the live
 *                page preview. Its console keeps streaming after the run.
 *
 * A fresh frame per run is a fresh page, like pressing reload. localStorage
 * is a stand-in that the pad carries from run to run, so "reload and it's
 * still there" works. The loader's checker (backend originals-js-verify.ts)
 * runs the same runtime in jsdom; keep them in step.
 */

export type JsStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface JsError {
  /** The error's name: SyntaxError, ReferenceError, TypeError... or LoopLimit. */
  type: string;
  message: string;
  /** The line in the learner's code, when the browser knows it. */
  line: number | null;
}

export interface JsLog {
  /** log | warn | error | alert | note (a message from Teyro, not the learner's code) */
  level: string;
  text: string;
}

export interface RawJsRun {
  /** The console, one line per entry (Teyro's own notes left out). */
  stdout: string;
  logs: JsLog[];
  error: JsError | null;
  /** One per check expression, in order: did it come out true? */
  exprResults: boolean[];
  /** localStorage after the run. */
  storage: Record<string, string>;
  timedOut: boolean;
  ms: number;
}

export interface JsRunOptions {
  /** The practice page's HTML (body markup, may include <style>). Empty page when absent. */
  page?: string;
  /** Hidden check expressions, run in the page after the code settles. */
  exprs?: string[];
  /** What localStorage starts with. */
  storage?: Record<string, string>;
  /** Answers for prompt(), in order. */
  prompts?: string[];
  timeoutMs?: number;
}

const RUNTIME_FILES = ['/javascript/practice-api.js', '/javascript/runner.js'];
const DEFAULT_TIMEOUT_MS = 10_000;
const LOAD_TIMEOUT_MS = 30_000;

let status: JsStatus = 'idle';
let runtime: Promise<string> | null = null;
let nextId = 1;
const listeners = new Set<(s: JsStatus) => void>();

function setStatus(s: JsStatus) {
  status = s;
  listeners.forEach((fn) => fn(s));
}

export function getJsStatus(): JsStatus {
  return status;
}

export function onJsStatus(fn: (s: JsStatus) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function loadRuntime(): Promise<string> {
  if (runtime) return runtime;
  setStatus('loading');
  const timeout = new Promise<never>((_, reject) =>
    window.setTimeout(() => reject(new Error('The JavaScript runner took too long to load.')), LOAD_TIMEOUT_MS),
  );
  runtime = Promise.race([
    Promise.all(
      RUNTIME_FILES.map((url) =>
        fetch(url).then((r) => {
          if (!r.ok) throw new Error(`${url}: ${r.status}`);
          return r.text();
        }),
      ),
    ),
    timeout,
  ]).then(
    (parts) => {
      setStatus('ready');
      // Inlined into a <script>: never let the code end that tag early.
      return parts.join('\n;\n').replace(/<\/script/gi, '<\\/script');
    },
    () => {
      runtime = null;
      setStatus('error');
      throw new Error("The JavaScript runner couldn't load. Check your connection and try again.");
    },
  );
  return runtime;
}

/** Start loading the runtime in the background. Safe to call many times. */
export function warmJs(): void {
  if (typeof window === 'undefined') return;
  loadRuntime().catch(() => {
    /* reported through the status, and again on the next run */
  });
}

export function retryJs(): void {
  runtime = null;
  warmJs();
}

/**
 * The app's theme, handed to the practice page as CSS variables so lesson
 * pages match Teyro in light and dark mode: --ink, --muted, --page, --card,
 * --soft, --line, --brand, --good, --bad, --warn, --accent.
 */
function themeVars(): string {
  const css = getComputedStyle(document.documentElement);
  const map: Record<string, string> = {
    ink: '--color-ink',
    muted: '--text-secondary',
    page: '--bg-page',
    card: '--bg-card',
    soft: '--bg-section',
    line: '--border',
    brand: '--color-brand',
    good: '--success-green',
    bad: '--error-red',
    warn: '--warning',
    accent: '--brand-purple',
  };
  return Object.entries(map)
    .map(([name, token]) => {
      const v = css.getPropertyValue(token).trim();
      return v ? `--${name}:${v};` : '';
    })
    .join('');
}

const BASE_CSS = `*{box-sizing:border-box}
body{margin:0;padding:16px;font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--ink);background:var(--page)}
h1,h2,h3{line-height:1.2;margin:0 0 8px}
p{margin:0 0 8px}
button{font:inherit;font-weight:700;padding:8px 14px;border-radius:10px;border:2px solid var(--line);background:var(--card);color:var(--ink);cursor:pointer}
input,select,textarea{font:inherit;padding:8px 10px;border-radius:10px;border:2px solid var(--line);background:var(--card);color:var(--ink);max-width:100%}
label{font-weight:700}
ul{padding-left:20px;margin:0 0 8px}`;

function srcdoc(rt: string, page: string): string {
  return (
    '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    `<style>:root{${themeVars()}}${BASE_CSS}</style>` +
    `<script>${rt}</script></head><body>${page}</body></html>`
  );
}

function makeFrame(rt: string, page: string, hidden: boolean): HTMLIFrameElement {
  const frame = document.createElement('iframe');
  frame.setAttribute('sandbox', 'allow-scripts allow-forms');
  frame.setAttribute('referrerpolicy', 'no-referrer');
  if (hidden) {
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    // Phone width, off screen, so the page lays out like the learner's preview.
    frame.style.cssText = 'position:fixed;left:-10000px;top:0;width:390px;height:700px;border:0;visibility:hidden;';
  }
  frame.srcdoc = srcdoc(rt, page);
  return frame;
}

interface Session {
  frame: HTMLIFrameElement;
  result: Promise<RawJsRun>;
  dispose: () => void;
}

/** Load a frame, send the run, collect the answer. */
function start(
  rt: string,
  code: string,
  opts: JsRunOptions,
  mountIn: HTMLElement | null,
  hooks: { onLog?: (log: JsLog) => void; onStorage?: (s: Record<string, string>) => void } = {},
): Session {
  const id = nextId++;
  const frame = makeFrame(rt, opts.page ?? '', !mountIn);
  const started = performance.now();
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  let onMessage: (e: MessageEvent) => void = () => {};
  let timer = 0;
  const result = new Promise<RawJsRun>((resolve) => {
    timer = window.setTimeout(() => {
      resolve({ stdout: '', logs: [], error: null, exprResults: [], storage: opts.storage ?? {}, timedOut: true, ms: timeoutMs });
    }, timeoutMs);
    onMessage = (e: MessageEvent) => {
      if (e.source !== frame.contentWindow) return;
      const d = e.data;
      if (d?.type === 'ready') {
        frame.contentWindow?.postMessage(
          { type: 'run', id, code, exprs: opts.exprs ?? [], storage: opts.storage ?? {}, prompts: opts.prompts ?? [], live: !!mountIn },
          '*',
        );
      } else if (d?.type === 'log' && d.id === id) {
        hooks.onLog?.(d.entry as JsLog);
      } else if (d?.type === 'storage' && d.id === id) {
        hooks.onStorage?.(d.storage);
      } else if (d?.type === 'result' && d.id === id) {
        window.clearTimeout(timer);
        resolve({
          stdout: String(d.stdout ?? ''),
          logs: Array.isArray(d.logs) ? d.logs : [],
          error: d.error ?? null,
          exprResults: Array.isArray(d.exprResults) ? d.exprResults.map(Boolean) : [],
          storage: d.storage && typeof d.storage === 'object' ? d.storage : {},
          timedOut: false,
          ms: Math.round(performance.now() - started),
        });
      }
    };
    window.addEventListener('message', onMessage);
  });
  (mountIn ?? document.body).appendChild(frame);
  const dispose = () => {
    window.clearTimeout(timer);
    window.removeEventListener('message', onMessage);
    frame.remove();
  };
  return { frame, result, dispose };
}

/**
 * Run JavaScript in a hidden practice page and report what happened. Never
 * rejects for a bug in the learner's code (that comes back as `error`);
 * rejects only if the runner itself can't load.
 */
export async function runJs(code: string, opts: JsRunOptions = {}): Promise<RawJsRun> {
  const rt = await loadRuntime();
  const s = start(rt, code, opts, null);
  try {
    return await s.result;
  } finally {
    s.dispose();
  }
}

export interface LivePage {
  frame: HTMLIFrameElement;
  /** The first run's result: the console and errors up to the moment it settled. */
  result: Promise<RawJsRun>;
  dispose: () => void;
}

/**
 * Show the practice page inside `container`, run the code in it, and keep it
 * alive so the learner can use it. Console lines arrive through `onLog`
 * (also after the run, as they click), saved data through `onStorage`.
 */
export async function mountJsPage(
  container: HTMLElement,
  code: string,
  opts: JsRunOptions,
  hooks: { onLog?: (log: JsLog) => void; onStorage?: (s: Record<string, string>) => void },
): Promise<LivePage> {
  const rt = await loadRuntime();
  return start(rt, code, { ...opts, exprs: [] }, container, hooks);
}
