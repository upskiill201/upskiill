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
 *        { type: 'loadPackages', id, packages: string[] }   (pandas, numpy, scikit-learn)
 *   out  { type: 'ready' } once Python has loaded
 *        { type: 'packagesLoaded', id } | { type: 'packagesError', id, message }
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

    # import this prints the Zen only on first import: forget it so every run shows it.
    sys.modules.pop('this', None)
    # Fresh copies of the practice datasets (teyro_datasets.py) for any program that reads a CSV.
    _write = globals().get('__teyro_write_datasets')
    if _write is not None and '.csv' in src:
        _write()
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

// Extra packages a lesson can use, loaded on request (the page asks before it
// starts a run's timer, because the first download takes a while). Importing
// once here, with warnings off, keeps pandas' pyarrow notice out of the
// learner's output.
const ALLOWED_PACKAGES = ['pandas', 'numpy', 'scikit-learn'];
// The name you import when it differs from the package name.
const IMPORT_NAMES = { 'scikit-learn': 'sklearn' };

// Copy-on-write (the pandas 3 default): cleaning a copy with
// df["col"] = ... never prints a SettingWithCopyWarning into the output.
// Mirrored in backend/src/originals/originals-code-verify.ts.
const PANDAS_SETUP = '\nimport pandas\npandas.set_option("mode.copy_on_write", True)\n';

let pyodide = null;

const ready = (async () => {
  try {
    importScripts(INDEX_URL + 'pyodide.js');
    // eslint-disable-next-line no-undef
    pyodide = await loadPyodide({ indexURL: INDEX_URL });
    pyodide.runPython(HARNESS);
    try {
      const res = await fetch('/python/teyro_datasets.py');
      if (res.ok) pyodide.runPython(await res.text());
    } catch {
      /* no practice datasets: programs that read them will say the file is missing */
    }
    self.postMessage({ type: 'ready' });
  } catch (err) {
    self.postMessage({ type: 'loadError', message: String((err && err.message) || err) });
    throw err;
  }
})();

async function loadPackages(id, packages) {
  const wanted = (packages || []).filter((p) => ALLOWED_PACKAGES.includes(p));
  try {
    await pyodide.loadPackage(wanted);
    pyodide.runPython(
      'import warnings\nwith warnings.catch_warnings():\n    warnings.simplefilter("ignore")\n' +
        wanted.map((p) => '    import ' + (IMPORT_NAMES[p] || p)).join('\n') +
        (wanted.includes('pandas') ? PANDAS_SETUP : ''),
    );
    self.postMessage({ type: 'packagesLoaded', id });
  } catch (err) {
    self.postMessage({ type: 'packagesError', id, message: String((err && err.message) || err) });
  }
}

self.onmessage = async (event) => {
  const { id, code, stdin, exprs, type, packages } = event.data || {};
  try {
    await ready;
  } catch {
    return;
  }
  if (type === 'loadPackages') {
    await loadPackages(id, packages);
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
