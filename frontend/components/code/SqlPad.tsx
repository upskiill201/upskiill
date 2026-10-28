'use client';

/**
 * Teyro's SQL pad: an editor, a row of quick keys (symbols and the keywords
 * that are slow to type on a phone), Run, the results as real tables, and a
 * Tables panel that shows what's in the database. SQL runs in the learner's
 * browser on a fresh copy of a practice database every run
 * (lib/code/sqlRunner). Used by Try it live and Write and run in SQL tracks.
 *
 * Same editor approach as PythonPad: a transparent textarea over a
 * highlighted copy of the code. Tab indents 2 spaces, Enter keeps the indent,
 * Ctrl/Cmd+Enter runs, curly quotes are straightened as you type.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Glyph } from '@/components/art/Glyph';
import { highlightCode } from '@/lib/lesson/highlight';
import type { CodeCheck } from '@/lib/lesson/blocks';
import { straightenQuotes, type CheckResult } from '@/lib/code/checks';
import { getSqlStatus, onSqlStatus, retrySql, sqlSchema, warmSql, type SqlResult, type SqlStatus, type SqlTable } from '@/lib/code/sqlRunner';
import { explainSqlError, formatValue, runSqlAndCheck, SQL_TIMEOUT_MESSAGE, type GradedSqlRun } from '@/lib/code/sqlChecks';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './PythonPad.module.css';
import sql from './SqlPad.module.css';

const INDENT = '  ';
const QUICK_KEYS: { label: string; insert: string; aria?: string }[] = [
  { label: 'SELECT', insert: 'SELECT ' },
  { label: 'FROM', insert: 'FROM ' },
  { label: 'WHERE', insert: 'WHERE ' },
  { label: '*', insert: '*' },
  { label: ',', insert: ', ' },
  { label: "'", insert: "'" },
  { label: ';', insert: ';' },
  { label: '=', insert: ' = ' },
  { label: '(', insert: '(' },
  { label: ')', insert: ')' },
  { label: '<', insert: ' < ' },
  { label: '>', insert: ' > ' },
  { label: '%', insert: '%' },
  { label: 'AND', insert: 'AND ' },
  { label: 'ORDER BY', insert: 'ORDER BY ' },
  { label: 'JOIN', insert: 'JOIN ' },
  { label: 'ON', insert: 'ON ' },
  { label: 'GROUP BY', insert: 'GROUP BY ' },
  { label: 'Tab', insert: INDENT, aria: 'Indent' },
];

/** Keep SQLite's status in React state. */
export function useSqlStatus(): SqlStatus {
  const [status, setStatus] = useState<SqlStatus>(() => getSqlStatus());
  useEffect(() => onSqlStatus(setStatus), []);
  return status;
}

// ─── Editor ──────────────────────────────────────────────────────────────

function SqlEditor({
  value,
  onChange,
  readOnly,
  errorLine,
  minLines = 3,
  maxLines = 16,
  onRun,
  label,
  fileName,
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
  fileName: string;
  onReset?: () => void;
}) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const hl = useRef<HTMLPreElement>(null);
  const gutter = useRef<HTMLDivElement>(null);
  const lineCount = value.split('\n').length;
  const shown = Math.min(Math.max(lineCount, minLines), maxLines);
  const html = useMemo(() => highlightCode(value.endsWith('\n') ? `${value} ` : value || ' ', 'sql'), [value]);

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
      const indent = /^[ \t]*/.exec(before.slice(before.lastIndexOf('\n') + 1))?.[0] ?? '';
      insert(`\n${indent}`);
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorBar}>
        <span className={`${styles.fileName} ${sql.dbName}`}>
          <Glyph name="database" size={14} strokeWidth={2.5} />
          {fileName}
        </span>
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
        <div className={styles.keys} role="toolbar" aria-label="Insert SQL">
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

// ─── Results ─────────────────────────────────────────────────────────────

function ResultBlock({ result }: { result: SqlResult }) {
  if (result.kind === 'done') {
    return (
      <p className={sql.done}>
        <Glyph name="check" size={16} strokeWidth={3.5} />
        {result.message}
      </p>
    );
  }
  const hidden = result.rowCount - result.rows.length;
  return (
    <div className={sql.result}>
      <div className={sql.tableScroll}>
        <table className={sql.table}>
          <thead>
            <tr>
              {result.columns.map((c, i) => (
                <th key={i} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr key={i}>
                {row.map((v, j) => (
                  <td key={j} className={v === null ? sql.null : typeof v === 'number' ? sql.num : undefined}>
                    {formatValue(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={sql.rowCount}>
        {result.rowCount === 1 ? '1 row' : `${result.rowCount} rows`}
        {hidden > 0 ? ` (showing the first ${result.rows.length})` : ''}
      </p>
    </div>
  );
}

function SqlOutput({ run }: { run: GradedSqlRun }) {
  if (run.timedOut) {
    return (
      <div className={styles.output} role="status">
        <div className={styles.outputBar}>Results</div>
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <Glyph name="alert" size={18} /> Stopped: it ran too long
          </div>
          <p className={styles.errorExplain}>{SQL_TIMEOUT_MESSAGE}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.output} role="status" aria-live="polite">
      <div className={styles.outputBar}>
        <span>Results</span>
        <span>{run.ms} ms</span>
      </div>
      {run.results.length > 0 ? (
        <div className={sql.results}>
          {run.results.map((r, i) => (
            <ResultBlock key={i} result={r} />
          ))}
        </div>
      ) : !run.error ? (
        <p className={styles.empty}>Nothing to run yet. Write a statement, like SELECT * FROM films;</p>
      ) : null}
      {run.error && (
        <div className={styles.errorBox}>
          <div className={styles.errorTitle}>
            <Glyph name="alert" size={18} /> {run.error.type}
            {run.error.line ? ` on line ${run.error.line}` : ''}
          </div>
          <p className={styles.errorExplain}>{explainSqlError(run.error)}</p>
          <p className={styles.errorRaw}>{run.error.message}</p>
        </div>
      )}
    </div>
  );
}

function TablesPanel({ tables }: { tables: SqlTable[] | null }) {
  if (!tables) return <p className={`${styles.status} ${sql.panel}`}>Opening the database...</p>;
  if (tables.length === 0) {
    return <p className={`${styles.status} ${sql.panel}`}>This database is empty: no tables yet. CREATE TABLE makes one.</p>;
  }
  return (
    <div className={sql.panel} aria-label="Tables in this database">
      {tables.map((t) => (
        <div key={t.name} className={sql.schemaTable}>
          <p className={sql.schemaName}>
            {t.name}
            <span className={sql.schemaMeta}>{t.view ? 'view' : t.rows === 1 ? '1 row' : `${t.rows} rows`}</span>
          </p>
          <p className={sql.schemaCols}>
            {t.columns.map((c) => (
              <span key={c.name} className={c.key ? sql.keyCol : undefined}>
                {c.name}
                {c.type ? <span className={sql.colType}> {c.type.toLowerCase()}</span> : null}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}

function SqlCheckList({ checks, results }: { checks: CodeCheck[]; results: CheckResult[] | null }) {
  return (
    <div className={styles.checks}>
      <p className={styles.checksTitle}>Your SQL should</p>
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

export interface SqlPadProps {
  value: string;
  onChange: (code: string) => void;
  resetTo?: string;
  readOnly?: boolean;
  /** The practice database every run starts from (public/sql/db); an empty one when absent. */
  database?: string;
  checks?: CodeCheck[];
  onRun?: (run: GradedSqlRun) => void;
  runLabel?: string;
  minLines?: number;
  maxLines?: number;
  label?: string;
  /** Extra buttons next to Run (hint, solution). */
  actions?: React.ReactNode;
}

export function SqlPad({
  value,
  onChange,
  resetTo,
  readOnly = false,
  database,
  checks,
  onRun,
  runLabel = 'Run',
  minLines,
  maxLines,
  label = 'SQL',
  actions,
}: SqlPadProps) {
  const status = useSqlStatus();
  const [running, setRunning] = useState(false);
  const [run, setRun] = useState<GradedSqlRun | null>(null);
  const [showTables, setShowTables] = useState(false);
  const [startTables, setStartTables] = useState<SqlTable[] | null>(null);

  useEffect(() => warmSql(), []);

  const openTables = () => {
    playSound('select');
    setShowTables((v) => !v);
    if (!startTables && !run) {
      sqlSchema(database)
        .then(setStartTables)
        .catch(() => setStartTables([]));
    }
  };

  const execute = useCallback(async () => {
    if (running) return;
    setRunning(true);
    playSound('select');
    playHaptic('medium', false);
    try {
      const result = await runSqlAndCheck(value, checks ?? [], database);
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
  }, [running, value, checks, database, onRun]);

  const loading = status === 'loading' || (running && status !== 'ready');
  // After a run, the panel shows the database as the run left it.
  const tables = run && !run.timedOut ? run.schema : startTables;

  return (
    <div className={styles.pad}>
      <SqlEditor
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        errorLine={run?.error?.line ?? null}
        minLines={minLines}
        maxLines={maxLines}
        onRun={() => void execute()}
        label={label}
        fileName={database ? `${database}.db` : 'new database'}
        onReset={resetTo !== undefined && value !== resetTo ? () => onChange(resetTo) : undefined}
      />

      {checks && checks.length > 0 && <SqlCheckList checks={checks} results={run?.checks ?? null} />}

      {!readOnly && (
        <div className={styles.runRow}>
          <button type="button" className={styles.run} onClick={() => void execute()} disabled={running}>
            {running ? <Glyph name="spinner" size={18} className="animate-spin" /> : <Glyph name="play" size={18} />}
            {running ? (loading ? 'Opening database' : 'Running') : runLabel}
          </button>
          <button type="button" className={styles.ghost} onClick={openTables} aria-expanded={showTables}>
            <Glyph name="database" size={16} strokeWidth={2.5} /> Tables
          </button>
          {actions}
          {status === 'loading' && !running && <span className={styles.status}>Opening the database...</span>}
          {status === 'error' && (
            <span className={`${styles.status} ${styles.statusError}`}>
              The database couldn&apos;t load.{' '}
              <button type="button" className={styles.ghost} onClick={() => retrySql()}>
                Try again
              </button>
            </span>
          )}
        </div>
      )}

      {showTables && <TablesPanel tables={tables} />}

      {run && <SqlOutput run={run} />}
    </div>
  );
}
