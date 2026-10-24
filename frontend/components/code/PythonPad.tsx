'use client';

/**
 * Teyro's Python pad: an editor, a row of quick keys, Run, and the output,
 * all running in the learner's browser (lib/code/pythonRunner). Used by
 * Try it live (Learn), Write and run (Apply) and the Code playground.
 *
 * The editor is a transparent textarea over a highlighted copy of the code:
 * native typing, selection, undo and mobile keyboards, with colour. Python
 * conveniences: Tab indents 4 spaces, Enter keeps the indent (and adds one
 * after a colon), Backspace removes a whole indent, Ctrl/Cmd+Enter runs, and
 * curly quotes from phone keyboards are straightened as you type.
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Glyph } from '@/components/art/Glyph';
import { highlightCode } from '@/lib/lesson/highlight';
import type { CodeCheck } from '@/lib/lesson/blocks';
import {
  allowMlToolsDownload,
  getPythonStatus,
  needsMlToolsDownload,
  onMlToolsAllowed,
  onPythonStatus,
  packagesFor,
  retryPython,
  warmPython,
  type PythonStatus,
} from '@/lib/code/pythonRunner';
import {
  explainError,
  runAndCheck,
  straightenQuotes,
  TIMEOUT_MESSAGE,
  usesInput,
  type CheckResult,
  type GradedRun,
} from '@/lib/code/checks';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './PythonPad.module.css';

const INDENT = '    ';
const QUICK_KEYS: { label: string; insert: string; aria?: string }[] = [
  { label: 'Tab', insert: INDENT, aria: 'Indent' },
  { label: '(', insert: '(' },
  { label: ')', insert: ')' },
  { label: '"', insert: '"' },
  { label: "'", insert: "'" },
  { label: ':', insert: ':' },
  { label: '=', insert: '=' },
  { label: '[', insert: '[' },
  { label: ']', insert: ']' },
  { label: '{', insert: '{' },
  { label: '}', insert: '}' },
  { label: '#', insert: '#' },
  { label: '+', insert: '+' },
  { label: '_', insert: '_' },
  { label: ',', insert: ',' },
];

/** True when the browser says it's on mobile data or saving data (Chrome/Android only). */
function onMobileData(): boolean {
  const c = (navigator as Navigator & { connection?: { type?: string; saveData?: boolean } }).connection;
  return Boolean(c && (c.saveData || c.type === 'cellular'));
}

/**
 * Before the first scikit-learn program: ask, once per device, before a
 * ~70 MB download. Shown in place of the Run row.
 */
function MlToolsGate({ code }: { code: string }) {
  // Only ever rendered after mount (the gate is decided in an effect), so navigator exists.
  const [mobile] = useState(() => typeof navigator !== 'undefined' && onMobileData());
  return (
    <div className={styles.mlGate} role="region" aria-label="Download the machine learning tools">
      <div className={styles.mlGateIcon} aria-hidden="true">
        <Glyph name="download" size={22} />
      </div>
      <div className={styles.mlGateBody}>
        <p className={styles.mlGateTitle}>Get the machine learning tools</p>
        <p className={styles.mlGateText}>
          This code uses scikit-learn, the toolkit real data scientists use. It&apos;s a one-time download of about
          70 MB, and your browser usually keeps it, so it&apos;s much quicker next time.
        </p>
        <p className={`${styles.mlGateText} ${mobile ? styles.mlGateWarn : ''}`}>
          <Glyph name="wifi" size={14} /> {mobile ? 'You look to be on mobile data. Wi-Fi is best for this.' : 'Wi-Fi is best for this.'}
        </p>
        <button type="button" className={styles.run} onClick={() => allowMlToolsDownload(code)}>
          <Glyph name="download" size={18} />
          Download (70 MB)
        </button>
      </div>
    </div>
  );
}

/** Keep Python's status in React state. */
export function usePythonStatus(): PythonStatus {
  const [status, setStatus] = useState<PythonStatus>(() => getPythonStatus());
  useEffect(() => onPythonStatus(setStatus), []);
  return status;
}

// ─── Editor ──────────────────────────────────────────────────────────────

interface EditorProps {
  value: string;
  onChange: (code: string) => void;
  readOnly?: boolean;
  errorLine?: number | null;
  minLines?: number;
  maxLines?: number;
  onRun?: () => void;
  label: string;
  fileName?: string;
  onReset?: () => void;
}

export function CodeEditor({
  value,
  onChange,
  readOnly = false,
  errorLine = null,
  minLines = 4,
  maxLines = 16,
  onRun,
  label,
  fileName = 'main.py',
  onReset,
}: EditorProps) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const hl = useRef<HTMLPreElement>(null);
  const gutter = useRef<HTMLDivElement>(null);
  const lineCount = value.split('\n').length;
  const shown = Math.min(Math.max(lineCount, minLines), maxLines);
  // A trailing newline needs something after it, or the last line collapses.
  const html = useMemo(() => highlightCode(value.endsWith('\n') ? `${value} ` : value || ' ', 'python'), [value]);

  const syncScroll = () => {
    const t = ta.current;
    if (!t) return;
    if (hl.current) {
      hl.current.scrollTop = t.scrollTop;
      hl.current.scrollLeft = t.scrollLeft;
    }
    if (gutter.current) gutter.current.scrollTop = t.scrollTop;
  };

  /** Insert text at the cursor, keeping the browser's undo history when it can. */
  const insert = useCallback(
    (text: string, removeBefore = 0) => {
      const t = ta.current;
      if (!t || readOnly) return;
      t.focus();
      if (removeBefore > 0) t.setSelectionRange(t.selectionStart - removeBefore, t.selectionEnd);
      // execCommand keeps Ctrl+Z working; fall back to a manual splice.
      const ok = typeof document.execCommand === 'function' && document.execCommand('insertText', false, text);
      if (!ok) {
        const { selectionStart: a, selectionEnd: b } = t;
        const next = t.value.slice(0, a) + text + t.value.slice(b);
        onChange(next);
        requestAnimationFrame(() => t.setSelectionRange(a + text.length, a + text.length));
      }
    },
    [onChange, readOnly],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const t = e.currentTarget;
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun?.();
      return;
    }
    if (readOnly) return;
    const before = t.value.slice(0, t.selectionStart);
    const lineStart = before.lastIndexOf('\n') + 1;
    const currentLine = before.slice(lineStart);
    if (e.key === 'Tab' && !e.shiftKey && t.selectionStart === t.selectionEnd) {
      e.preventDefault();
      insert(INDENT);
    } else if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      const lead = /^ {1,4}/.exec(currentLine)?.[0].length ?? 0;
      if (lead) {
        t.setSelectionRange(lineStart, lineStart + lead);
        insert('');
      }
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const indent = /^[ \t]*/.exec(currentLine)?.[0] ?? '';
      const opens = /:\s*(#.*)?$/.test(currentLine);
      insert(`\n${indent}${opens ? INDENT : ''}`);
    } else if (e.key === 'Backspace' && t.selectionStart === t.selectionEnd && /^ +$/.test(currentLine) && currentLine.length >= 4) {
      e.preventDefault();
      const remove = currentLine.length % 4 === 0 ? 4 : currentLine.length % 4;
      insert('', remove);
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorBar}>
        <span className={styles.fileName}>{fileName}</span>
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
        <div className={styles.keys} role="toolbar" aria-label="Insert symbol">
          {QUICK_KEYS.map((k) => (
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

// ─── Output ──────────────────────────────────────────────────────────────

export function RunOutput({ run }: { run: GradedRun }) {
  if (run.timedOut) {
    return (
      <div className={styles.output} role="status">
        <div className={styles.outputBar}>Output</div>
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <Glyph name="warning" size={18} /> Stopped: it ran too long
          </div>
          <p className={styles.errorExplain}>{TIMEOUT_MESSAGE}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.output} role="status" aria-live="polite">
      <div className={styles.outputBar}>
        <span>Output</span>
        <span>{run.ms} ms</span>
      </div>
      {run.stdout ? (
        <pre className={styles.stdout}>{run.stdout}</pre>
      ) : !run.error ? (
        <p className={styles.empty}>Your program ran, but didn&apos;t print anything. Use print() to show something.</p>
      ) : null}
      {run.error && (
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <Glyph name="warning" size={18} /> {run.error.type}
            {run.error.line ? ` on line ${run.error.line}` : ''}
          </div>
          <p className={styles.errorExplain}>{explainError(run.error)}</p>
          <p className={styles.errorRaw}>
            {run.error.type}: {run.error.message}
          </p>
        </div>
      )}
    </div>
  );
}

export function CheckList({ checks, results }: { checks: CodeCheck[]; results: CheckResult[] | null }) {
  return (
    <div className={styles.checks}>
      <p className={styles.checksTitle}>Your program should</p>
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

export interface PythonPadProps {
  value: string;
  onChange: (code: string) => void;
  /** What Reset goes back to; no Reset button when absent. */
  resetTo?: string;
  readOnly?: boolean;
  /** Fixed input() lines (lessons). When absent and the code uses input(), an Input box appears. */
  stdin?: string[];
  /** Write and run: graded against these, with a checklist. */
  checks?: CodeCheck[];
  onRun?: (run: GradedRun) => void;
  runLabel?: string;
  minLines?: number;
  maxLines?: number;
  label?: string;
  fileName?: string;
  /** Extra buttons next to Run (hint, solution). */
  actions?: React.ReactNode;
}

export function PythonPad({
  value,
  onChange,
  resetTo,
  readOnly = false,
  stdin,
  checks,
  onRun,
  runLabel = 'Run',
  minLines,
  maxLines,
  label = 'Python code',
  fileName,
  actions,
}: PythonPadProps) {
  const status = usePythonStatus();
  const [running, setRunning] = useState(false);
  const [run, setRun] = useState<GradedRun | null>(null);
  const [typedInput, setTypedInput] = useState('');
  const inputId = useId();

  // Start loading Python as soon as a pad is on screen.
  // eslint-disable-next-line react-hooks/exhaustive-deps -- warm once, for the code first shown
  useEffect(() => warmPython(value), []);

  // Worked out after mount (it reads localStorage), and again once anyone says yes.
  const [mlGate, setMlGate] = useState(false);
  useEffect(() => {
    setMlGate(needsMlToolsDownload(value));
    return onMlToolsAllowed(() => setMlGate(needsMlToolsDownload(value)));
  }, [value]);
  const usesMlTools = useMemo(() => packagesFor(value).includes('scikit-learn'), [value]);

  const needsInputBox = !stdin && usesInput(value);

  const execute = useCallback(async () => {
    if (running) return;
    setRunning(true);
    playSound('select');
    playHaptic('medium', false);
    try {
      const lines = stdin ?? typedInput.split('\n').filter((l, i, all) => l !== '' || i < all.length - 1);
      const result = await runAndCheck(value, checks ?? [], lines);
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
  }, [running, stdin, typedInput, value, checks, onRun]);

  const loading = status === 'loading' || (running && status !== 'ready');

  return (
    <div className={styles.pad}>
      <CodeEditor
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        errorLine={run?.error?.line ?? null}
        minLines={minLines}
        maxLines={maxLines}
        onRun={() => void execute()}
        label={label}
        fileName={fileName}
        onReset={resetTo !== undefined && value !== resetTo ? () => onChange(resetTo) : undefined}
      />

      {stdin && stdin.length > 0 && (
        <div className={styles.fixedInput}>
          <span>Input your program gets:</span>
          {stdin.map((l, i) => (
            <span key={i} className={styles.inputChip}>
              {l}
            </span>
          ))}
        </div>
      )}
      {needsInputBox && !readOnly && (
        <div className={styles.inputBox}>
          <label htmlFor={inputId} className={styles.inputLabel}>
            Input
          </label>
          <span className={styles.inputHelp}>Your code uses input(). Type one answer per line, in order.</span>
          <textarea
            id={inputId}
            className={styles.stdin}
            value={typedInput}
            onChange={(e) => setTypedInput(e.target.value)}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            rows={2}
          />
        </div>
      )}

      {checks && checks.length > 0 && <CheckList checks={checks} results={run?.checks ?? null} />}

      {!readOnly && mlGate && <MlToolsGate code={value} />}

      {!readOnly && !mlGate && (
        <div className={styles.runRow}>
          <button type="button" className={styles.run} onClick={() => void execute()} disabled={running}>
            {running ? <Glyph name="spinner" size={18} className="animate-spin" /> : <Glyph name="play" size={18} />}
            {running ? (loading ? (usesMlTools ? 'Getting ML tools' : 'Starting Python') : 'Running') : runLabel}
          </button>
          {actions}
          {status === 'loading' && !running && (
            <span className={styles.status}>
              {usesMlTools ? 'Downloading the ML tools (about 70 MB)...' : 'Warming up Python...'}
            </span>
          )}
          {status === 'error' && (
            <span className={`${styles.status} ${styles.statusError}`}>
              Python couldn&apos;t load.{' '}
              <button type="button" className={styles.ghost} onClick={() => retryPython()}>
                Try again
              </button>
            </span>
          )}
        </div>
      )}

      {run && <RunOutput run={run} />}
    </div>
  );
}
