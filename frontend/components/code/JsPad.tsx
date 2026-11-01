'use client';

/**
 * Teyro's JavaScript pad: an editor, a row of quick keys (the symbols that
 * are slow to type on a phone), Run, and the console. When the lesson gives
 * a practice page (`page`), the pad also shows that page live: the code runs
 * in it, the learner can click and type in it, and its console keeps
 * streaming. A "Saved data" panel shows what the page keeps in localStorage,
 * which survives Run (a reload) the way it would in a real browser.
 *
 * Code runs in a sandboxed frame in the learner's browser (lib/code/jsRunner).
 * Grading runs the code again in a hidden page with the hidden checks, so
 * clicking around in the preview never changes the result.
 *
 * Same editor approach as PythonPad: a transparent textarea over a
 * highlighted copy of the code. Tab indents 2 spaces, Enter keeps the indent,
 * Ctrl/Cmd+Enter runs, curly quotes are straightened as you type.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Glyph } from '@/components/art/Glyph';
import { Emblem } from '@/components/art/Emblem';
import { highlightCode } from '@/lib/lesson/highlight';
import type { CodeCheck } from '@/lib/lesson/blocks';
import { straightenQuotes, type CheckResult } from '@/lib/code/checks';
import { getJsStatus, mountJsPage, onJsStatus, retryJs, warmJs, type JsLog, type JsStatus, type LivePage } from '@/lib/code/jsRunner';
import { explainJsError, JS_TIMEOUT_MESSAGE, runJsAndCheck, type GradedJsRun } from '@/lib/code/jsChecks';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './PythonPad.module.css';
import js from './JsPad.module.css';

const INDENT = '  ';
type QuickKey = { label: string; insert: string; aria?: string };
const CONSOLE_KEYS: QuickKey[] = [
  { label: 'console.log', insert: 'console.log(' },
  { label: 'const', insert: 'const ' },
  { label: 'let', insert: 'let ' },
  { label: '(', insert: '(' },
  { label: ')', insert: ')' },
  { label: '{', insert: '{' },
  { label: '}', insert: '}' },
  { label: '"', insert: '"' },
  { label: '`', insert: '`', aria: 'Insert a backtick' },
  { label: '${', insert: '${', aria: 'Insert a template slot' },
  { label: ';', insert: ';' },
  { label: '=', insert: ' = ' },
  { label: '===', insert: ' === ' },
  { label: '=>', insert: ' => ' },
  { label: '[', insert: '[' },
  { label: ']', insert: ']' },
  { label: '.', insert: '.' },
  { label: '+', insert: ' + ' },
  { label: '<', insert: ' < ' },
  { label: '>', insert: ' > ' },
  { label: '!', insert: '!' },
  { label: '&&', insert: ' && ' },
  { label: '||', insert: ' || ' },
  { label: 'Tab', insert: INDENT, aria: 'Indent' },
];
const PAGE_KEYS: QuickKey[] = [
  { label: 'querySelector', insert: 'document.querySelector(' },
  { label: 'addEventListener', insert: '.addEventListener(' },
  { label: 'textContent', insert: '.textContent' },
  ...CONSOLE_KEYS,
];

/** Keep the runner's status in React state. */
export function useJsStatus(): JsStatus {
  const [status, setStatus] = useState<JsStatus>(() => getJsStatus());
  useEffect(() => onJsStatus(setStatus), []);
  return status;
}

// ─── Editor ──────────────────────────────────────────────────────────────

function JsEditor({
  value,
  onChange,
  readOnly,
  errorLine,
  minLines = 3,
  maxLines = 18,
  onRun,
  label,
  keys,
  onReset,
}: {
  value: string;
  onChange: (code: string) => void;
  readOnly: boolean;
  errorLine: number | null;
  minLines?: number;
  maxLines?: number;
  onRun: () => void;
  label: string;
  keys: QuickKey[];
  onReset?: () => void;
}) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const hl = useRef<HTMLPreElement>(null);
  const gutter = useRef<HTMLDivElement>(null);
  const lineCount = value.split('\n').length;
  const shown = Math.min(Math.max(lineCount, minLines), maxLines);
  const html = useMemo(() => highlightCode(value.endsWith('\n') ? `${value} ` : value || ' ', 'javascript'), [value]);

  const syncScroll = () => {
    const t = ta.current;
    if (!t) return;
    if (hl.current) {
      hl.current.scrollTop = t.scrollTop;
      hl.current.scrollLeft = t.scrollLeft;
    }
    if (gutter.current) gutter.current.scrollTop = t.scrollTop;
  };

  const insert = useCallback(
    (text: string) => {
      const t = ta.current;
      if (!t || readOnly) return;
      t.focus();
      // execCommand keeps Ctrl+Z working; fall back to a manual splice.
      const ok = typeof document.execCommand === 'function' && document.execCommand('insertText', false, text);
      if (!ok) {
        const { selectionStart: a, selectionEnd: b } = t;
        onChange(t.value.slice(0, a) + text + t.value.slice(b));
        requestAnimationFrame(() => t.setSelectionRange(a + text.length, a + text.length));
      }
    },
    [onChange, readOnly],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }
    if (readOnly) return;
    const t = e.currentTarget;
    if (e.key === 'Tab' && !e.shiftKey && t.selectionStart === t.selectionEnd) {
      e.preventDefault();
      insert(INDENT);
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const before = t.value.slice(0, t.selectionStart);
      const line = before.slice(before.lastIndexOf('\n') + 1);
      const indent = /^[ \t]*/.exec(line)?.[0] ?? '';
      // After an opening brace, indent one step further.
      insert(`\n${indent}${/[{([]\s*$/.test(line) ? INDENT : ''}`);
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorBar}>
        <span className={styles.fileName}>app.js</span>
        {onReset && !readOnly && (
          <button type="button" className={styles.barButton} onClick={onReset} aria-label="Reset the code">
            <Glyph name="refresh" size={14} strokeWidth={2.5} /> Reset
          </button>
        )}
      </div>
      <div className={styles.surface}>
        <div ref={gutter} className={styles.gutter} aria-hidden="true" style={{ height: `calc(${shown} * var(--code-line) + 2 * var(--code-pad))` }}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className={`${styles.lineNo} ${errorLine === i + 1 ? styles.lineNoError : ''}`}>
              {i + 1}
            </div>
          ))}
        </div>
        <div className={styles.area}>
          <pre ref={hl} className={styles.highlight} aria-hidden="true">
            <code dangerouslySetInnerHTML={{ __html: html }} />
          </pre>
          <textarea
            ref={ta}
            className={styles.input}
            value={value}
            readOnly={readOnly}
            onChange={(e) => onChange(straightenQuotes(e.target.value))}
            onKeyDown={onKeyDown}
            onScroll={syncScroll}
            aria-label={label}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            wrap="off"
            rows={shown}
            style={{ height: `calc(${shown} * var(--code-line) + 2 * var(--code-pad))` }}
          />
        </div>
      </div>
      {!readOnly && (
        <div className={styles.keys} role="toolbar" aria-label="Insert JavaScript">
          {keys.map((k) => (
            <button
              key={k.label}
              type="button"
              className={styles.key}
              aria-label={k.aria ?? `Insert ${k.label}`}
              // Keep the keyboard open: don't steal focus from the editor.
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => {
                playSound('select');
                insert(k.insert);
              }}
            >
              {k.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Console ─────────────────────────────────────────────────────────────

function ConsoleView({ logs, run, ms }: { logs: JsLog[]; run: GradedJsRun | null; ms: number | null }) {
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs.length]);

  if (run?.timedOut) {
    return (
      <div className={styles.output} role="status">
        <div className={styles.outputBar}>Console</div>
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <Emblem name="warning" size={20} /> Stopped: no answer from the page
          </div>
          <p className={styles.errorExplain}>{JS_TIMEOUT_MESSAGE}</p>
        </div>
      </div>
    );
  }
  const error = run?.error ?? null;
  // The error box explains the error; the console line saying the same is left out.
  const shown = logs.filter((l) => !(error && l.level === 'error' && l.text.startsWith(`Uncaught ${error.type}`)));
  return (
    <div className={styles.output} role="status" aria-live="polite">
      <div className={styles.outputBar}>
        <span>Console</span>
        {ms !== null && <span>{ms} ms</span>}
      </div>
      {shown.length > 0 ? (
        <div ref={scroller} className={js.console}>
          {shown.map((l, i) => (
            <div key={i} className={`${js.line} ${js[l.level] ?? ''}`}>
              {l.level === 'note' && <Glyph name="info" size={14} strokeWidth={2.5} className={js.noteIcon} />}
              <span>{l.text}</span>
            </div>
          ))}
        </div>
      ) : !error ? (
        <p className={styles.empty}>Nothing in the console yet. console.log(&quot;hi&quot;) prints here.</p>
      ) : null}
      {error && (
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <Emblem name="warning" size={20} /> {error.type === 'LoopLimit' ? 'Stopped: a loop that never ends' : error.type}
            {error.line ? ` on line ${error.line}` : ''}
          </div>
          <p className={styles.errorExplain}>{explainJsError(error)}</p>
          {error.type !== 'LoopLimit' && <p className={styles.errorRaw}>{error.message}</p>}
        </div>
      )}
    </div>
  );
}

function SavedData({ store, onClear }: { store: Record<string, string>; onClear: () => void }) {
  const keys = Object.keys(store);
  return (
    <div className={js.saved} aria-label="Saved data (localStorage)">
      <div className={js.savedBar}>
        <span>
          <Glyph name="database" size={14} strokeWidth={2.5} /> localStorage
        </span>
        {keys.length > 0 && (
          <button type="button" className={styles.barButton} onClick={onClear}>
            <Glyph name="trash" size={14} strokeWidth={2.5} /> Clear
          </button>
        )}
      </div>
      {keys.length === 0 ? (
        <p className={js.savedEmpty}>Nothing saved yet. localStorage.setItem(&quot;key&quot;, &quot;value&quot;) saves here.</p>
      ) : (
        keys.map((k) => (
          <div key={k} className={js.savedRow}>
            <span className={js.savedKey}>{k}</span>
            <span className={js.savedValue}>{store[k]}</span>
          </div>
        ))
      )}
    </div>
  );
}

function JsCheckList({ checks, results }: { checks: CodeCheck[]; results: CheckResult[] | null }) {
  return (
    <div className={styles.checks}>
      <p className={styles.checksTitle}>Your code should</p>
      {checks.map((c, i) => {
        const r = results?.[i];
        const cls = r ? (r.passed ? styles.checkPass : styles.checkFail) : '';
        return (
          <div key={i} className={`${styles.check} ${cls}`}>
            <span className={styles.checkDot} aria-hidden="true">
              {r?.passed ? <Glyph name="check" size={14} strokeWidth={4} /> : r ? <Glyph name="close" size={14} strokeWidth={4} /> : null}
            </span>
            <span>
              {c.message}
              <span className="sr-only">{r ? (r.passed ? ' (done)' : ' (not yet)') : ''}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── The pad ─────────────────────────────────────────────────────────────

export interface JsPadProps {
  value: string;
  onChange: (code: string) => void;
  resetTo?: string;
  readOnly?: boolean;
  /** The practice page the code runs on (HTML). Console only when absent. */
  page?: string;
  /** What localStorage holds before the first run. */
  storage?: Record<string, string>;
  /** Answers for prompt(), in order. */
  stdin?: string[];
  checks?: CodeCheck[];
  onRun?: (run: GradedJsRun) => void;
  runLabel?: string;
  minLines?: number;
  maxLines?: number;
  label?: string;
  /** Extra buttons next to Run (hint, solution). */
  actions?: React.ReactNode;
}

const usesStorage = (code: string) => /\blocalStorage\b/.test(code);

export function JsPad({
  value,
  onChange,
  resetTo,
  readOnly = false,
  page,
  storage,
  stdin,
  checks,
  onRun,
  runLabel = 'Run',
  minLines,
  maxLines,
  label = 'JavaScript',
  actions,
}: JsPadProps) {
  const status = useJsStatus();
  const [running, setRunning] = useState(false);
  const [run, setRun] = useState<GradedJsRun | null>(null);
  const [logs, setLogs] = useState<JsLog[]>([]);
  const [ms, setMs] = useState<number | null>(null);
  const [store, setStore] = useState<Record<string, string>>(() => ({ ...(storage ?? {}) }));
  const [ranOnce, setRanOnce] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const livePage = useRef<LivePage | null>(null);
  const storeRef = useRef(store);
  useEffect(() => {
    storeRef.current = store;
  }, [store]);
  const hasPage = page !== undefined;

  useEffect(() => warmJs(), []);

  // The page as the lesson wrote it, before any code runs: something to look at first.
  useEffect(() => {
    if (!hasPage || !preview.current) return;
    let cancelled = false;
    const box = preview.current;
    mountJsPage(box, '', { page, storage: storeRef.current }, {})
      .then((p) => {
        if (cancelled) p.dispose();
        else livePage.current = p;
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      livePage.current?.dispose();
      livePage.current = null;
    };
  }, [hasPage, page]);

  const execute = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setRanOnce(true);
    playSound('select');
    playHaptic('medium', false);
    try {
      const code = straightenQuotes(value);
      let result: GradedJsRun;
      if (hasPage && preview.current) {
        // The live page: a fresh copy, like pressing reload, with the saved data carried over.
        livePage.current?.dispose();
        setLogs([]);
        const collected: JsLog[] = [];
        const p = await mountJsPage(preview.current, code, { page, storage: storeRef.current, prompts: stdin }, {
          onLog: (l) => {
            collected.push(l);
            setLogs((prev) => [...prev, l]);
          },
          onStorage: (s) => setStore(s),
        });
        livePage.current = p;
        const shown = await p.result;
        if (!shown.timedOut) setStore(shown.storage);
        // Grade in a hidden page from the lesson's own starting data, so clicks in the preview don't count.
        const graded = checks?.length ? await runJsAndCheck(code, checks, { page, storage, prompts: stdin }) : null;
        result = graded
          ? { ...graded, logs: collected, error: shown.error ?? graded.error }
          : { ...shown, checks: [], allPassed: false };
        setMs(shown.ms);
      } else {
        result = await runJsAndCheck(code, checks ?? [], { storage: storeRef.current, prompts: stdin });
        if (!result.timedOut) setStore(result.storage);
        setLogs(result.logs);
        setMs(result.ms);
      }
      setRun(result);
      const good = checks?.length ? result.allPassed : !result.error && !result.timedOut;
      if (result.error || result.timedOut) {
        playSound('wrong');
        playHaptic('error', false);
      } else if (good) {
        playSound(checks?.length ? 'correct' : 'toggleOn');
        playHaptic('success', false);
      }
      onRun?.(result);
    } catch {
      setRun(null);
    } finally {
      setRunning(false);
    }
  }, [running, value, hasPage, page, storage, stdin, checks, onRun]);

  const loading = status === 'loading' || (running && status !== 'ready');
  const savedVisible = usesStorage(value) || Object.keys(store).length > 0;

  return (
    <div className={styles.pad}>
      <JsEditor
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        errorLine={run?.error?.line ?? null}
        minLines={minLines}
        maxLines={maxLines}
        onRun={() => void execute()}
        label={label}
        keys={hasPage ? PAGE_KEYS : CONSOLE_KEYS}
        onReset={resetTo !== undefined && value !== resetTo ? () => onChange(resetTo) : undefined}
      />

      {checks && checks.length > 0 && <JsCheckList checks={checks} results={run?.checks ?? null} />}

      {!readOnly && (
        <div className={styles.runRow}>
          <button type="button" className={styles.run} onClick={() => void execute()} disabled={running}>
            {running ? <Glyph name="spinner" size={18} className="animate-spin" /> : <Glyph name="play" size={18} />}
            {running ? (loading ? 'Starting' : 'Running') : runLabel}
          </button>
          {actions}
          {status === 'error' && (
            <span className={`${styles.status} ${styles.statusError}`}>
              The runner couldn&apos;t load.{' '}
              <button type="button" className={styles.ghost} onClick={() => retryJs()}>
                Try again
              </button>
            </span>
          )}
        </div>
      )}

      {hasPage && (
        <div className={js.page}>
          <div className={js.pageBar}>
            <span>
              <Glyph name="globe" size={14} strokeWidth={2.5} /> Your page
            </span>
            <span className={js.pageHint}>{ranOnce ? 'Live: tap and type in it' : 'Run to bring it to life'}</span>
          </div>
          <div ref={preview} className={js.frame} />
        </div>
      )}

      {ranOnce && <ConsoleView logs={logs} run={run} ms={ms} />}

      {savedVisible && (
        <SavedData
          store={store}
          onClear={() => {
            playSound('select');
            setStore({});
          }}
        />
      )}
    </div>
  );
}
