/**
 * The React Native runner: a lesson's TSX on a phone screen, in the learner's
 * browser. Nothing runs on Teyro's servers.
 *
 *   1. The TypeScript worker turns TSX into JavaScript (tsRunner.transpileTsx,
 *      public/react-native/transpile.js).
 *   2. A sandboxed frame (scripts on, but no same-origin access to Teyro)
 *      loads public/react-native/runtime.js (React + react-native-web + the
 *      screen checks) and renders the App. The learner can tap and type in it.
 *   3. Grading renders in a separate hidden frame and runs the screen checks
 *      there (screenChecks.ts, bundled into the runtime). The course loader
 *      runs the same runtime under jsdom, so lessons are checked the same way.
 *
 * The frame and this page talk only through postMessage, and this side only
 * listens to messages from its own frame.
 */

import type { CodeCheck } from '@/lib/lesson/blocks';
import type { ScreenTest } from './screenChecks';
import type { RawRunResult } from './pythonRunner';
import { transpileTsx } from './tsRunner';

export const RN_RUNTIME_URL = '/react-native/runtime.js';
/** A phone screen in CSS pixels (an average modern phone). */
export const PHONE_WIDTH = 375;
export const PHONE_HEIGHT = 720;
const CHECK_TIMEOUT_MS = 8000;

/** The document inside a phone frame. Its own script only talks to the page that made it. */
export function phoneFrameHtml(origin: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;height:100%;background:#fff;-webkit-tap-highlight-color:transparent}#root{display:flex;flex-direction:column;height:100%;overflow:auto}*{box-sizing:border-box}</style>
<script src="${origin}${RN_RUNTIME_URL}"></script></head><body><div id="root"></div>
<script>
(function(){
  var rn = window.__TEYRO_RN__, current = null, root = document.getElementById('root');
  function send(msg){ parent.postMessage(Object.assign({ teyroRn: true }, msg), '*'); }
  function late(e){ send({ kind: 'error', error: { message: String(e && e.message ? e.message : e) } }); }
  window.addEventListener('error', function(e){ late(e.error || e.message); });
  window.addEventListener('unhandledrejection', function(e){ late(e.reason); });
  window.addEventListener('message', function(e){
    var d = e.data || {};
    if (!rn) { send({ id: d.id, kind: 'fatal', error: { message: "The phone preview couldn't load." } }); return; }
    if (d.type === 'mount') {
      if (current) current.unmount();
      document.querySelectorAll('[data-teyro-alert]').forEach(function(el){ el.remove(); });
      root.innerHTML = '';
      current = rn.mount(d.js, root, late);
      send({ id: d.id, kind: 'mounted', error: current.error });
    } else if (d.type === 'check') {
      rn.check(d.js, d.tests).then(function(r){ send(Object.assign({ id: d.id, kind: 'checked' }, r)); });
    }
  });
  send({ kind: 'ready', ok: !!rn });
})();
</script></body></html>`;
}

type FrameMessage = { teyroRn: true; id?: number; kind: string; error?: { message: string } | null; ok?: boolean; passed?: boolean[]; text?: string };

let nextId = 1;

/** Talk to one phone frame: wait until it's ready, then mount or check. */
export class PhoneFrame {
  private ready: Promise<boolean>;
  private onError: ((message: string) => void) | null = null;
  private pending = new Map<number, (m: FrameMessage) => void>();
  private listener = (e: MessageEvent) => {
    if (e.source !== this.frame.contentWindow) return;
    const m = e.data as FrameMessage;
    if (!m || m.teyroRn !== true) return;
    if (m.kind === 'ready') this.resolveReady(m.ok === true);
    else if (m.kind === 'error') this.onError?.(m.error?.message ?? 'Something went wrong.');
    else if (m.id !== undefined) {
      this.pending.get(m.id)?.(m);
      this.pending.delete(m.id);
    }
  };
  private resolveReady: (ok: boolean) => void = () => {};

  constructor(private frame: HTMLIFrameElement) {
    this.ready = new Promise((resolve) => (this.resolveReady = resolve));
    window.addEventListener('message', this.listener);
  }

  /** Errors after the first render: a tap that throws, an effect that fails. */
  setOnError(fn: ((message: string) => void) | null) {
    this.onError = fn;
  }

  private ask(msg: Record<string, unknown>, timeoutMs: number): Promise<FrameMessage | null> {
    return this.ready.then(
      (ok) =>
        new Promise<FrameMessage | null>((resolve) => {
          if (!ok) return resolve({ teyroRn: true, kind: 'fatal', error: { message: "The phone preview couldn't load. Check your connection and try again." } });
          const id = nextId++;
          const timer = window.setTimeout(() => {
            this.pending.delete(id);
            resolve(null);
          }, timeoutMs);
          this.pending.set(id, (m) => {
            window.clearTimeout(timer);
            resolve(m);
          });
          this.frame.contentWindow?.postMessage({ ...msg, id }, '*');
        }),
    );
  }

  /** Show this compiled App on the phone. Resolves with the error, if it couldn't render. */
  async mount(js: string): Promise<{ message: string } | null> {
    const m = await this.ask({ type: 'mount', js }, CHECK_TIMEOUT_MS);
    if (!m) return { message: 'Your screen took too long to appear. Is there a loop that never ends?' };
    return m.error ?? null;
  }

  async check(js: string, tests: ScreenTest[]): Promise<{ passed: boolean[]; error: { message: string } | null; text: string } | null> {
    const m = await this.ask({ type: 'check', js, tests }, CHECK_TIMEOUT_MS);
    if (!m) return null;
    return { passed: m.passed ?? [], error: m.error ?? null, text: m.text ?? '' };
  }

  dispose() {
    window.removeEventListener('message', this.listener);
    this.pending.clear();
  }
}

/** A friendlier version of the errors learners meet most. */
export function explainRnError(message: string): string {
  if (/Text strings must be rendered within a <Text> component/.test(message))
    return 'In React Native, every piece of text has to be inside <Text>...</Text>. A word sitting straight inside a <View> crashes the app.';
  if (/is not defined/.test(message)) {
    const name = /(\w+) is not defined/.exec(message)?.[1];
    return name ? `"${name}" isn't defined. Did you import it from 'react-native' at the top, and spell it exactly the same (capitals count)?` : message;
  }
  if (/Element type is invalid/.test(message)) return "React can't find one of your components. Check its name and that it's imported or written above.";
  if (/Export your screen as the default/.test(message)) return message;
  return message;
}

export interface RnRunResult extends RawRunResult {
  checks: { message: string; passed: boolean }[];
}

const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

/** Render offscreen in a fresh sandboxed frame, run every screen check, then remove the frame. Never throws. */
export async function renderAndCheckRn(code: string, checks: CodeCheck[]): Promise<RnRunResult> {
  const started = performance.now();
  const base = { exprResults: [] as boolean[], typeErrors: [] };
  let compiled: Awaited<ReturnType<typeof transpileTsx>>;
  try {
    compiled = await transpileTsx(code);
  } catch {
    return {
      ...base,
      stdout: '',
      error: { type: 'RunnerError', message: "TypeScript couldn't load. Check your connection and try again.", line: null },
      timedOut: false,
      ms: 0,
      checks: checks.map((c) => ({ message: c.message, passed: false })),
    };
  }
  if (!compiled.js) {
    return {
      ...base,
      stdout: '',
      error: { type: 'SyntaxError', message: compiled.error?.message ?? 'This code has a syntax error.', line: compiled.error?.line ?? null },
      timedOut: false,
      ms: Math.round(performance.now() - started),
      checks: checks.map((c) => ({ message: c.message, passed: false })),
    };
  }

  const frame = document.createElement('iframe');
  frame.setAttribute('sandbox', 'allow-scripts');
  frame.setAttribute('aria-hidden', 'true');
  frame.tabIndex = -1;
  frame.style.cssText = `position:fixed;left:-10000px;top:0;width:${PHONE_WIDTH}px;height:${PHONE_HEIGHT}px;border:0;visibility:hidden;`;
  const phone = new PhoneFrame(frame);
  frame.srcdoc = phoneFrameHtml(window.location.origin);
  document.body.appendChild(frame);

  const tests = checks.filter((c) => c.screen).map((c) => c.screen as ScreenTest);
  const result = await phone.check(compiled.js, tests);
  phone.dispose();
  frame.remove();

  if (!result) {
    return {
      ...base,
      stdout: '',
      error: null,
      timedOut: true,
      ms: CHECK_TIMEOUT_MS,
      checks: checks.map((c) => ({ message: c.message, passed: false })),
    };
  }
  let s = 0;
  const graded = checks.map((c) => {
    let passed = false;
    if (c.screen) passed = result.passed[s++] === true;
    else if (c.outputIncludes !== undefined) passed = !result.error && loose(result.text).includes(loose(c.outputIncludes));
    else if (c.codeIncludes !== undefined) passed = code.includes(c.codeIncludes);
    return { message: c.message, passed };
  });
  return {
    ...base,
    stdout: result.text,
    error: result.error ? { type: 'Error', message: explainRnError(result.error.message), line: null } : null,
    timedOut: false,
    ms: Math.round(performance.now() - started),
    checks: graded,
  };
}
