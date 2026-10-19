'use client';

/**
 * Teyro's code pad: an editor, a row of quick keys, Run, and the output,
 * all running in the learner's browser (lib/code/pythonRunner, or
 * lib/code/tsRunner for `language="typescript"`). Used by Try it live
 * (Learn), Write and run (Apply) and the Code playground.
 *
 * The editor is a transparent textarea over a highlighted copy of the code:
 * native typing, selection, undo and mobile keyboards, with colour. Python
 * conveniences: Tab indents 4 spaces, Enter keeps the indent (and adds one
 * after a colon), Backspace removes a whole indent, Ctrl/Cmd+Enter runs, and
 * curly quotes from phone keyboards are straightened as you type.
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { AlertTriangle, Check, Loader2, Play, RotateCcw, X } from 'lucide-react';
import { highlightCode } from '@/lib/lesson/highlight';
import type { CodeCheck, RunLanguage } from '@/lib/lesson/blocks';
import { getPythonStatus, onPythonStatus, retryPython, warmPython, type PythonStatus } from '@/lib/code/pythonRunner';
import { getTypeScriptStatus, onTypeScriptStatus, retryTypeScript, warmTypeScript } from '@/lib/code/tsRunner';
import {
  explainError,
  explainJsError,
  explainTypeError,
  runAndCheck,
  straightenQuotes,
  TIMEOUT_MESSAGE,
  TIMEOUT_MESSAGE_TS,
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

const TS_INDENT = '  ';
const TS_QUICK_KEYS: { label: string; insert: string; aria?: string }[] = [
  { label: 'Tab', insert: TS_INDENT, aria: 'Indent' },
  { label: '(', insert: '(' },
  { label: ')', insert: ')' },
  { label: '"', insert: '"' },
  { label: '`', insert: '`', aria: 'Insert backtick' },
  { label: ':', insert: ':' },
  { label: ';', insert: ';' },
  { label: '=', insert: '=' },
  { label: '{', insert: '{' },
  { label: '}', insert: '}' },
  { label: '[', insert: '[' },
  { label: ']', insert: ']' },
  { label: '.', insert: '.' },
  { label: '=>', insert: ' => ', aria: 'Insert arrow' },
  { label: '|', insert: ' | ', aria: 'Insert union bar' },
  { label: '<', insert: '<' },
  { label: '>', insert: '>' },
  { label: '+', insert: '+' },
  { label: ',', insert: ',' },
];

/** What each runner is called in the UI. */
const RUNNER_NAME: Record<RunLanguage, string> = { python: 'Python', typescript: 'TypeScript' };

/** Keep a runner's status (loading, ready...) in React state. */
export function useRunnerStatus(language: RunLanguage = 'python'): PythonStatus {
  const [status, setStatus] = useState<PythonStatus>(() => (language === 'typescript' ? getTypeScriptStatus() : getPythonStatus()));
  useEffect(() => (language === 'typescript' ? onTypeScriptStatus(setStatus) : onPythonStatus(setStatus)), [language]);
  return status;
}

/** Keep Python's status in React state. */
export function usePythonStatus(): PythonStatus {
  return useRunnerStatus('python');
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
  language?: RunLanguage;
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
  fileName,
  onReset,
  language = 'python',
}: EditorProps) {
  const ts = language === 'typescript';
  const indentUnit = ts ? TS_INDENT : INDENT;
  const keys = ts ? TS_QUICK_KEYS : QUICK_KEYS;
  const file = fileName ?? (ts ? 'main.ts' : 'main.py');
  const ta = useRef<HTMLTextAreaElement>(null);
  const hl = useRef<HTMLPreElement>(null);
  const gutter = useRef<HTMLDivElement>(null);
  const lineCount = value.split('\n').length;
  const shown = Math.min(Math.max(lineCount, minLines), maxLines);
  // A trailing newline needs something after it, or the last line collapses.
  const html = useMemo(() => highlightCode(value.endsWith('\n') ? `${value} ` : value || ' ', language), [value, language]);

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
      insert(indentUnit);
    } else if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      const lead = (ts ? /^ {1,2}/ : /^ {1,4}/).exec(currentLine)?.[0].length ?? 0;
      if (lead) {
        t.setSelectionRange(lineStart, lineStart + lead);
        insert('');
      }
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const indent = /^[ \t]*/.exec(currentLine)?.[0] ?? '';
      // Python indents after a colon; TypeScript after an opening bracket.
      const opens = ts ? /[{([]\s*(\/\/.*)?$/.test(currentLine) : /:\s*(#.*)?$/.test(currentLine);
      insert(`\n${indent}${opens ? indentUnit : ''}`);
    } else if (
      e.key === 'Backspace' &&
      t.selectionStart === t.selectionEnd &&
      /^ +$/.test(currentLine) &&
      currentLine.length >= indentUnit.length
    ) {
      e.preventDefault();
      const unit = indentUnit.length;
      const remove = currentLine.length % unit === 0 ? unit : currentLine.length % unit;
      insert('', remove);
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorBar}>
        <span className={styles.fileName}>{file}</span>
        {onReset && !readOnly && (
          <button type="button" className={styles.barButton} onClick={onReset} aria-label="Reset the code">
            <RotateCcw size={14} strokeWidth={2.5} aria-hidden="true" /> Reset
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

// ─── Output ──────────────────────────────────────────────────────────────

export function RunOutput({ run, language = 'python' }: { run: GradedRun; language?: RunLanguage }) {
  const ts = language === 'typescript';
  const typeErrors = run.typeErrors ?? [];
  if (run.timedOut) {
    return (
      <div className={styles.output} role="status">
        <div className={styles.outputBar}>Output</div>
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <AlertTriangle size={18} aria-hidden="true" /> Stopped: it ran too long
          </div>
          <p className={styles.errorExplain}>{ts ? TIMEOUT_MESSAGE_TS : TIMEOUT_MESSAGE}</p>
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
      {typeErrors.length > 0 && (
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <AlertTriangle size={18} aria-hidden="true" />
            {typeErrors.length === 1 ? '1 type error' : `${typeErrors.length} type errors`}
          </div>
          {typeErrors.slice(0, 3).map((d, i) => (
            <div key={i}>
              <p className={styles.errorExplain}>{explainTypeError(d)}</p>
              <p className={styles.errorRaw}>
                {d.line ? `Line ${d.line}: ` : ''}TS{d.code}: {d.message}
              </p>
            </div>
          ))}
        </div>
      )}
      {run.stdout ? (
        <pre className={styles.stdout}>{run.stdout}</pre>
      ) : !run.error ? (
        <p className={styles.empty}>
          Your program ran, but didn&apos;t print anything. Use {ts ? 'console.log()' : 'print()'} to show something.
        </p>
      ) : null}
      {run.error && (
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <AlertTriangle size={18} aria-hidden="true" /> {run.error.type}
            {run.error.line ? ` on line ${run.error.line}` : ''}
          </div>
          <p className={styles.errorExplain}>{ts ? explainJsError(run.error) : explainError(run.error)}</p>
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
              {r?.passed ? <Check size={14} strokeWidth={4} /> : r ? <X size={14} strokeWidth={4} /> : null}
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
  /** Which runner: Python (default) or TypeScript. */
  language?: RunLanguage;
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
  label,
  fileName,
  actions,
  language = 'python',
}: PythonPadProps) {
  const status = useRunnerStatus(language);
  const name = RUNNER_NAME[language];
  const [running, setRunning] = useState(false);
  const [run, setRun] = useState<GradedRun | null>(null);
  const [typedInput, setTypedInput] = useState('');
  const inputId = useId();

  // Start loading the runner as soon as a pad is on screen.
  // eslint-disable-next-line react-hooks/exhaustive-deps -- warm once, for the code first shown
  useEffect(() => (language === 'typescript' ? warmTypeScript() : warmPython(value)), [language]);

  const needsInputBox = !stdin && usesInput(value, language);

  const execute = useCallback(async () => {
    if (running) return;
    setRunning(true);
    playSound('select');
    playHaptic('medium', false);
    try {
      const lines = stdin ?? typedInput.split('\n').filter((l, i, all) => l !== '' || i < all.length - 1);
      const result = await runAndCheck(value, checks ?? [], lines, language);
      setRun(result);
      const clean = !result.error && !result.timedOut && (result.typeErrors?.length ?? 0) === 0;
      const good = checks?.length ? result.allPassed : clean;
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
  }, [running, stdin, typedInput, value, checks, onRun, language]);

  const loading = status === 'loading' || (running && status !== 'ready');

  return (
    <div className={styles.pad}>
      <CodeEditor
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        errorLine={run?.error?.line ?? run?.typeErrors?.[0]?.line ?? null}
        minLines={minLines}
        maxLines={maxLines}
        onRun={() => void execute()}
        label={label ?? `${name} code`}
        fileName={fileName}
        language={language}
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

      {!readOnly && (
        <div className={styles.runRow}>
          <button type="button" className={styles.run} onClick={() => void execute()} disabled={running}>
            {running ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Play size={18} fill="currentColor" aria-hidden="true" />}
            {running ? (loading ? `Starting ${name}` : 'Running') : runLabel}
          </button>
          {actions}
          {status === 'loading' && !running && <span className={styles.status}>Warming up {name}...</span>}
          {status === 'error' && (
            <span className={`${styles.status} ${styles.statusError}`}>
              {name} couldn&apos;t load.{' '}
              <button
                type="button"
                className={styles.ghost}
                onClick={() => (language === 'typescript' ? retryTypeScript() : retryPython())}
              >
                Try again
              </button>
            </span>
          )}
        </div>
      )}

      {run && <RunOutput run={run} language={language} />}
    </div>
  );
}
