'use client';

/**
 * Teyro's C pad: an editor, a row of quick keys (the symbols C needs that are
 * slow to find on a phone), Run, and the output. The program is compiled and
 * run in the learner's browser every time (lib/code/cRunner, xcc in a
 * worker). Used by Try it live and Write and run in C tracks.
 *
 * Same editor approach as PythonPad: a transparent textarea over a
 * highlighted copy of the code. Tab indents 4 spaces, Enter keeps the indent
 * (and adds one after a {), typing } on an empty line steps back out,
 * Ctrl/Cmd+Enter runs, curly quotes are straightened as you type.
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Glyph } from '@/components/art/Glyph';
import { highlightCode } from '@/lib/lesson/highlight';
import type { CodeCheck } from '@/lib/lesson/blocks';
import { straightenQuotes, type CheckResult } from '@/lib/code/checks';
import { getCStatus, onCStatus, retryC, warmC, type CStatus } from '@/lib/code/cRunner';
import { C_TIMEOUT_MESSAGE, explainCError, runCAndCheck, usesCInput, type GradedCRun } from '@/lib/code/cChecks';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './PythonPad.module.css';

const INDENT = '    ';
const QUICK_KEYS: { label: string; insert: string; aria?: string }[] = [
  { label: 'Tab', insert: INDENT, aria: 'Indent' },
  { label: ';', insert: ';' },
  { label: '{', insert: '{' },
  { label: '}', insert: '}' },
  { label: '(', insert: '(' },
  { label: ')', insert: ')' },
  { label: '"', insert: '"' },
  { label: "'", insert: "'" },
  { label: '%', insert: '%' },
  { label: '\\n', insert: '\\n', aria: 'Insert a new-line escape' },
  { label: '&', insert: '&' },
  { label: '*', insert: '*' },
  { label: '=', insert: ' = ' },
  { label: '<', insert: '<' },
  { label: '>', insert: '>' },
  { label: '[', insert: '[' },
  { label: ']', insert: ']' },
  { label: '#', insert: '#' },
  { label: 'printf', insert: 'printf("' },
];

/** Keep the C compiler's status in React state. */
export function useCStatus(): CStatus {
  const [status, setStatus] = useState<CStatus>(() => getCStatus());
  useEffect(() => onCStatus(setStatus), []);
  return status;
}

// ─── Editor ──────────────────────────────────────────────────────────────

function CEditor({
  value,
  onChange,
  readOnly,
  errorLine,
  minLines = 4,
  maxLines = 18,
  onRun,
  label,
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
  onReset?: () => void;
}) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const hl = useRef<HTMLPreElement>(null);
  const gutter = useRef<HTMLDivElement>(null);
  const lineCount = value.split('\n').length;
  const shown = Math.min(Math.max(lineCount, minLines), maxLines);
  // A trailing newline needs something after it, or the last line collapses.
  const html = useMemo(() => highlightCode(value.endsWith('\n') ? `${value} ` : value || ' ', 'c'), [value]);

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
    const before = t.value.slice(0, t.selectionStart);
    const currentLine = before.slice(before.lastIndexOf('\n') + 1);
    if (e.key === 'Tab' && !e.shiftKey && t.selectionStart === t.selectionEnd) {
      e.preventDefault();
      insert(INDENT);
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const indent = /^[ \t]*/.exec(currentLine)?.[0] ?? '';
      const opens = /\{\s*(\/\/.*)?$/.test(currentLine);
      insert(`\n${indent}${opens ? INDENT : ''}`);
    } else if (e.key === '}' && t.selectionStart === t.selectionEnd && /^ {4,}$/.test(currentLine)) {
      // A closing brace on an empty, indented line steps back one level.
      e.preventDefault();
      insert('}', 4);
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorBar}>
        <span className={styles.fileName}>main.c</span>
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

function COutput({ run }: { run: GradedCRun }) {
  if (run.timedOut) {
    return (
      <div className={styles.output} role="status">
        <div className={styles.outputBar}>Output</div>
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <Glyph name="alert" size={18} /> Stopped: it ran too long
          </div>
          <p className={styles.errorExplain}>{C_TIMEOUT_MESSAGE}</p>
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
        <pre className={styles.stdout}>
          {run.stdout}
          {run.truncated ? '\n[...the rest was cut off: that is a lot of output]' : ''}
        </pre>
      ) : !run.error ? (
        <p className={styles.empty}>Your program ran, but didn&apos;t print anything. Use printf() to show something.</p>
      ) : null}
      {run.error && (
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <Glyph name="alert" size={18} /> {run.error.type}
            {run.error.line ? ` on line ${run.error.line}` : ''}
          </div>
          <p className={styles.errorExplain}>{explainCError(run.error)}</p>
          <p className={styles.errorRaw}>{run.error.message}</p>
        </div>
      )}
      {!run.error && run.exitCode !== null && run.exitCode !== 0 && (
        <p className={styles.empty}>The program ended with exit code {run.exitCode}. 0 means everything went fine; anything else usually means something went wrong.</p>
      )}
    </div>
  );
}

function CCheckList({ checks, results }: { checks: CodeCheck[]; results: CheckResult[] | null }) {
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

export interface CPadProps {
  value: string;
  onChange: (code: string) => void;
  /** What Reset goes back to; no Reset button when absent. */
  resetTo?: string;
  readOnly?: boolean;
  /** Fixed input lines (lessons). When absent and the code reads input, an Input box appears. */
  stdin?: string[];
  /** Write and run: graded against these, with a checklist. */
  checks?: CodeCheck[];
  onRun?: (run: GradedCRun) => void;
  runLabel?: string;
  minLines?: number;
  maxLines?: number;
  label?: string;
  /** Extra buttons next to Run (hint, solution). */
  actions?: React.ReactNode;
}

export function CPad({
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
  label = 'C code',
  actions,
}: CPadProps) {
  const status = useCStatus();
  const [running, setRunning] = useState(false);
  const [run, setRun] = useState<GradedCRun | null>(null);
  const [typedInput, setTypedInput] = useState('');
  const inputId = useId();

  // Start loading the compiler as soon as a pad is on screen.
  useEffect(() => warmC(), []);

  const needsInputBox = !stdin && usesCInput(value);

  const execute = useCallback(async () => {
    if (running) return;
    setRunning(true);
    playSound('select');
    playHaptic('medium', false);
    try {
      const lines = stdin ?? typedInput.split('\n').filter((l, i, all) => l !== '' || i < all.length - 1);
      const result = await runCAndCheck(value, checks ?? [], lines);
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
      <CEditor
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        errorLine={run?.error?.line ?? null}
        minLines={minLines}
        maxLines={maxLines}
        onRun={() => void execute()}
        label={label}
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
          <span className={styles.inputHelp}>Your code reads input. Type what you would type at the keyboard, one line per Enter.</span>
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

      {checks && checks.length > 0 && <CCheckList checks={checks} results={run?.checks ?? null} />}

      {!readOnly && (
        <div className={styles.runRow}>
          <button type="button" className={styles.run} onClick={() => void execute()} disabled={running}>
            {running ? <Glyph name="spinner" size={18} className="animate-spin" /> : <Glyph name="play" size={18} />}
            {running ? (loading ? 'Starting C' : 'Compiling and running') : runLabel}
          </button>
          {actions}
          {status === 'loading' && !running && <span className={styles.status}>Getting the C compiler ready...</span>}
          {status === 'error' && (
            <span className={`${styles.status} ${styles.statusError}`}>
              C couldn&apos;t load.{' '}
              <button type="button" className={styles.ghost} onClick={() => retryC()}>
                Try again
              </button>
            </span>
          )}
        </div>
      )}

      {run && <COutput run={run} />}
    </div>
  );
}
