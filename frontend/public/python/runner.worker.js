/*
 * Teyro's Python runner (lib/code/pythonRunner.ts starts it).
 *
 * A classic Web Worker that loads Pyodide (CPython compiled to WebAssembly)
 * from its CDN and runs learners' code entirely in their browser: nothing
 * runs on Teyro's servers (docs/ORIGINALS_PLAYBOOK.md §7). The page owns the
 * time limit: a program that runs too long is stopped by terminating this
 * worker, so an infinite loop can never freeze the lesson.
 *
 *   in   { id, code, stdin: string[], exprs: string[] }
 *   out  { type: 'ready' } once Python has loaded
 *        { type: 'loadError', message }
 *        { type: 'result', id, stdout, error: { type, message, line } | null, checks: boolean[] }
 */

const PYODIDE_VERSION = '0.26.4';
const INDEX_URL = 'https://cdn.jsdelivr.net/pyodide/v' + PYODIDE_VERSION + '/full/';

// Runs the learner's file as __main__ with its output captured, input()
// answered from the given lines (and echoed, like a terminal), then
// evaluates each check expression in the program's own namespace.
const HARNESS = `
import builtins, io, sys

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

    text = out.getvalue()
    if len(text) > 20000:
        text = text[:20000] + '\\n... (output cut off: that was a lot of printing)'
    return {'stdout': text, 'error': error, 'checks': checks}
`;

let pyodide = null;

const ready = (async () => {
  try {
    importScripts(INDEX_URL + 'pyodide.js');
    // eslint-disable-next-line no-undef
    pyodide = await loadPyodide({ indexURL: INDEX_URL });
    pyodide.runPython(HARNESS);
    self.postMessage({ type: 'ready' });
  } catch (err) {
    self.postMessage({ type: 'loadError', message: String((err && err.message) || err) });
    throw err;
  }
})();

self.onmessage = async (event) => {
  const { id, code, stdin, exprs } = event.data || {};
  try {
    await ready;
  } catch {
    return;
  }
  const run = pyodide.globals.get('__teyro_run');
  let result = null;
  try {
    result = run(String(code || ''), pyodide.toPy(stdin || []), pyodide.toPy(exprs || []));
    const js = result.toJs({ dict_converter: Object.fromEntries });
    self.postMessage({
      type: 'result',
      id,
      stdout: js.stdout || '',
      error: js.error ? { type: js.error.type, message: js.error.message, line: js.error.line ?? null } : null,
      checks: Array.from(js.checks || []),
    });
  } catch (err) {
    self.postMessage({
      type: 'result',
      id,
      stdout: '',
      error: { type: 'RunnerError', message: String((err && err.message) || err), line: null },
      checks: [],
    });
  } finally {
    if (result && result.destroy) result.destroy();
    run.destroy();
  }
};
