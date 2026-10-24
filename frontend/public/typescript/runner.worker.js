/* eslint-disable */
/**
 * Teyro's TypeScript runner (a Web Worker). Nothing runs on Teyro's servers.
 *
 *   1. Loads the official TypeScript compiler from jsDelivr, once. Pinned to
 *      the same version `npm run originals` checks lessons with
 *      (backend/package-lock.json → typescript). Keep them in step.
 *   2. Type-checks the learner's code with `strict` on (one in-memory file,
 *      the ES2022 library plus a tiny environment: console, timers).
 *   3. Turns it into JavaScript and runs it, capturing console output, then
 *      evaluates any check expressions in the program's scope.
 *
 * The page enforces the time limit by terminating this worker (an infinite
 * loop can't be interrupted from inside). Mirrors backend
 * src/originals/originals-ts-verify.ts; keep the two in step.
 */

const TS_VERSION = '5.9.3';
const CDN = 'https://cdn.jsdelivr.net/npm/typescript@' + TS_VERSION;
const ROOT_LIB = 'lib.es2022.d.ts';
const MAIN = 'main.ts';
const ENV = 'teyro-env.d.ts';

// What exists in the runner's world besides the ES2022 language itself.
const ENV_SOURCE = [
  'interface Console {',
  '  log(...data: any[]): void;',
  '  error(...data: any[]): void;',
  '  warn(...data: any[]): void;',
  '  info(...data: any[]): void;',
  '}',
  'declare var console: Console;',
  'declare function setTimeout(handler: () => void, timeout?: number): number;',
  'declare function clearTimeout(id?: number): void;',
].join('\n');

const libText = new Map(); // file name → source text
const libFiles = new Map(); // file name → parsed SourceFile (reused across runs)
let options = null;
let lastProgram = null;

async function loadLibs() {
  const queue = [ROOT_LIB];
  const seen = new Set(queue);
  while (queue.length) {
    const batch = queue.splice(0, queue.length);
    const texts = await Promise.all(
      batch.map((name) =>
        fetch(CDN + '/lib/' + name).then((r) => {
          if (!r.ok) throw new Error('lib ' + name);
          return r.text();
        }),
      ),
    );
    batch.forEach((name, i) => {
      libText.set(name, texts[i]);
      const refs = texts[i].matchAll(/\/\/\/\s*<reference\s+lib="([^"]+)"\s*\/>/g);
      for (const m of refs) {
        const file = 'lib.' + m[1].toLowerCase() + '.d.ts';
        if (!seen.has(file)) {
          seen.add(file);
          queue.push(file);
        }
      }
    });
  }
}

function compilerOptions() {
  return {
    strict: true,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
    moduleDetection: ts.ModuleDetectionKind.Force,
    lib: [ROOT_LIB],
    types: [],
    noEmit: true,
    skipLibCheck: true,
    noFallthroughCasesInSwitch: true,
  };
}

function hostFor(code) {
  const main = ts.createSourceFile(MAIN, code, ts.ScriptTarget.ES2022, true);
  return {
    getSourceFile(name) {
      if (name === MAIN) return main;
      if (name === ENV) {
        if (!libFiles.has(ENV)) libFiles.set(ENV, ts.createSourceFile(ENV, ENV_SOURCE, ts.ScriptTarget.ES2022, true));
        return libFiles.get(ENV);
      }
      if (!libText.has(name)) return undefined;
      if (!libFiles.has(name)) libFiles.set(name, ts.createSourceFile(name, libText.get(name), ts.ScriptTarget.ES2022, true));
      return libFiles.get(name);
    },
    getDefaultLibFileName: () => ROOT_LIB,
    writeFile: () => {},
    getCurrentDirectory: () => '/',
    getDirectories: () => [],
    fileExists: (name) => name === MAIN || name === ENV || libText.has(name),
    readFile: (name) => (name === MAIN ? code : libText.get(name)),
    getCanonicalFileName: (name) => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
  };
}

/** Type errors in the learner's file: line (1-based), TypeScript's error code, message. */
function typeCheck(code) {
  const program = ts.createProgram([MAIN, ENV], options, hostFor(code), lastProgram || undefined);
  lastProgram = program;
  const file = program.getSourceFile(MAIN);
  const syntactic = program.getSyntacticDiagnostics(file);
  // Semantic checking only means something once the code parses.
  const diags = syntactic.length ? syntactic : program.getSemanticDiagnostics(file);
  return diags.map((d) => {
    const pos = d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start) : null;
    return {
      syntax: syntactic.length > 0,
      code: d.code,
      line: pos ? pos.line + 1 : null,
      column: pos ? pos.character + 1 : null,
      message: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
    };
  });
}

/** TypeScript → runnable JavaScript (module syntax stripped: one file, no imports). */
function toJavaScript(code) {
  const out = ts.transpileModule(code, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022, moduleDetection: ts.ModuleDetectionKind.Force },
    reportDiagnostics: false,
  }).outputText;
  return out
    .replace(/^export \{\s*\};?\s*$/gm, '')
    .replace(/^export (default )?(?=(const|let|var|function|class|async)\b)/gm, '');
}

// ─── console output, formatted like Node's console.log ────────────────────

function formatInner(v, depth) {
  if (typeof v === 'string') return "'" + v.replace(/'/g, "\\'") + "'";
  return formatValue(v, depth);
}

function formatValue(v, depth) {
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';
  const t = typeof v;
  if (t === 'string') return v;
  if (t === 'number') return Object.is(v, -0) ? '-0' : String(v);
  if (t === 'boolean' || t === 'bigint') return t === 'bigint' ? v + 'n' : String(v);
  if (t === 'symbol') return v.toString();
  if (t === 'function') return '[Function: ' + (v.name || '(anonymous)') + ']';
  // Tags, not instanceof: the loader runs code in another realm (Node's vm), where instanceof fails.
  const tag = Object.prototype.toString.call(v);
  if (tag === '[object Error]') return v.name + ': ' + v.message;
  if (tag === '[object Date]') return isNaN(v.getTime()) ? 'Invalid Date' : v.toISOString();
  if (depth > 2) return Array.isArray(v) ? '[Array]' : '[Object]';
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    return '[ ' + v.map((x) => formatInner(x, depth + 1)).join(', ') + ' ]';
  }
  if (tag === '[object Map]') return 'Map(' + v.size + ') { ' + [...v].map(([k, x]) => formatInner(k, depth + 1) + ' => ' + formatInner(x, depth + 1)).join(', ') + ' }';
  if (tag === '[object Set]') return 'Set(' + v.size + ') { ' + [...v].map((x) => formatInner(x, depth + 1)).join(', ') + ' }';
  const keys = Object.keys(v);
  if (keys.length === 0) return '{}';
  const key = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : "'" + k + "'");
  return '{ ' + keys.map((k) => key(k) + ': ' + formatInner(v[k], depth + 1)).join(', ') + ' }';
}

function describe(e) {
  if (e && typeof e === 'object' && 'name' in e && 'message' in e) return { type: String(e.name), message: String(e.message), line: null };
  return { type: 'Error', message: String(e), line: null };
}

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

async function run(code, exprs) {
  const typeErrors = typeCheck(code);
  // A syntax error means there's no program to run.
  const syntax = typeErrors.find((d) => d.syntax);
  if (syntax) {
    return { stdout: '', error: { type: 'SyntaxError', message: syntax.message, line: syntax.line }, checks: [], typeErrors };
  }

  const lines = [];
  const print = (...args) => lines.push(args.map((a) => formatValue(a, 0)).join(' '));
  const fakeConsole = { log: print, info: print, warn: print, error: print };
  const checkSuffix =
    '\nreturn [' +
    exprs.map((e) => '(() => { try { return !!(' + e + '); } catch (_) { return false; } })()').join(',') +
    '];';

  let error = null;
  let checks = [];
  try {
    const fn = new AsyncFunction('console', '"use strict";\n' + toJavaScript(code) + checkSuffix);
    checks = await fn(fakeConsole);
  } catch (e) {
    error = describe(e);
  }
  return { stdout: lines.join('\n') + (lines.length ? '\n' : ''), error, checks: error ? [] : checks, typeErrors };
}

(async () => {
  try {
    importScripts(CDN + '/lib/typescript.js');
    await loadLibs();
    options = compilerOptions();
    typeCheck('const ready: string = "ready";'); // parse the library once, before the first real run
    self.postMessage({ type: 'ready', version: TS_VERSION });
  } catch (e) {
    self.postMessage({ type: 'loadError', message: String(e && e.message ? e.message : e) });
    return;
  }

  self.onmessage = async (e) => {
    const { id, code, exprs, kind } = e.data || {};
    // The React Native runner borrows this compiler to turn TSX into JavaScript (public/react-native/transpile.js).
    if (kind === 'transpileTsx') {
      try {
        if (!self.teyroTranspileTsx) importScripts('/react-native/transpile.js');
        self.postMessage({ type: 'result', id, ...self.teyroTranspileTsx(ts, String(code || '')) });
      } catch (err) {
        self.postMessage({ type: 'result', id, js: null, error: { message: String(err && err.message ? err.message : err), line: null } });
      }
      return;
    }
    try {
      const result = await run(String(code || ''), Array.isArray(exprs) ? exprs : []);
      self.postMessage({ type: 'result', id, ...result });
    } catch (err) {
      self.postMessage({ type: 'result', id, stdout: '', error: { type: 'RunnerError', message: String(err), line: null }, checks: [], typeErrors: [] });
    }
  };
})();
