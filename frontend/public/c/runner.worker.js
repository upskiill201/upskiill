/*
 * Teyro's C runner (lib/code/cRunner.ts starts it).
 *
 * A classic Web Worker that compiles and runs learners' C entirely in their
 * browser with xcc, a small C compiler built to WebAssembly (cc.wasm, about
 * 140 KB, plus libs.json, the C headers and library): nothing runs on
 * Teyro's servers (docs/ORIGINALS_PLAYBOOK.md §7). The page owns the time
 * limit: a program that runs too long is stopped by terminating this worker.
 *
 *   in   { id, code, stdin: string }
 *   out  { type: 'ready' } once the compiler has loaded
 *        { type: 'loadError', message }
 *        { type: 'result', id, stdout, error: { type, message, line } | null, compiled, exitCode, truncated, ms }
 *
 * The compile-and-run itself is c-host.js, which `npm run originals` uses
 * too (backend/src/originals/originals-c-verify.ts), so they never drift.
 */

importScripts('/c/c-host.js');

let runner = null;

(async () => {
  try {
    const [wasm, libs] = await Promise.all([
      fetch('/c/cc.wasm').then((r) => {
        if (!r.ok) throw new Error('cc.wasm: ' + r.status);
        return r.arrayBuffer();
      }),
      fetch('/c/libs.json').then((r) => {
        if (!r.ok) throw new Error('libs.json: ' + r.status);
        return r.json();
      }),
    ]);
    runner = self.TeyroC.create(new Uint8Array(wasm), libs);
    self.postMessage({ type: 'ready' });
  } catch (e) {
    self.postMessage({ type: 'loadError', message: String((e && e.message) || e) });
  }
})();

self.onmessage = (e) => {
  const { id, code, stdin } = e.data || {};
  const started = performance.now();
  let out;
  try {
    out = runner.run(String(code || ''), String(stdin || ''));
  } catch (err) {
    out = { stdout: '', error: { type: 'Runner error', message: String((err && err.message) || err), line: null }, compiled: false, exitCode: null, truncated: false };
  }
  self.postMessage({ type: 'result', id, ...out, ms: Math.round(performance.now() - started) });
};
