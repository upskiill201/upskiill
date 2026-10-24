/**
 * Grading a Write and run SQL exercise, and explaining SQLite errors in plain
 * words. Pure: the runner (sqlRunner.ts) does the running; this decides what
 * passed and what to tell the learner. Mirrors
 * backend/src/originals/originals-sql-verify.ts; keep them in step.
 *
 * How checks read for SQL:
 *   outputIncludes / outputEquals   the results as text (resultText)
 *   expr                            a query run after the learner's SQL; passes when its first value is true
 *   codeIncludes                    the SQL uses this (case and spacing don't matter)
 */

import type { CodeCheck } from '@/lib/lesson/blocks';
import { straightenQuotes, type CheckResult } from './checks';
import { runSql, type RawSqlRun, type SqlError, type SqlResult } from './sqlRunner';

export interface GradedSqlRun extends RawSqlRun {
  checks: CheckResult[];
  allPassed: boolean;
}

/** How a value prints: NULL for missing, numbers as they are. */
export function formatValue(v: string | number | null): string {
  return v === null ? 'NULL' : String(v);
}

/** One line per row, " | " between columns, then the row count, the way a database console prints. */
export function resultText(results: SqlResult[]): string {
  return results
    .map((r) => {
      if (r.kind === 'done') return r.message;
      const lines = [r.columns.join(' | '), ...r.rows.map((row) => row.map(formatValue).join(' | '))];
      lines.push(`(${r.rowCount} ${r.rowCount === 1 ? 'row' : 'rows'})`);
      return lines.join('\n');
    })
    .join('\n\n');
}

const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const exact = (s: string) =>
  s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .trim();

export function gradeSqlChecks(checks: CodeCheck[], code: string, run: RawSqlRun): CheckResult[] {
  const text = resultText(run.results);
  let exprIndex = 0;
  return checks.map((c) => {
    let passed = false;
    if (run.error || run.timedOut) passed = false;
    else if (c.expr !== undefined) passed = run.exprResults[exprIndex] === true;
    else if (c.outputIncludes !== undefined) passed = loose(text).includes(loose(c.outputIncludes));
    else if (c.outputEquals !== undefined) passed = exact(text) === exact(c.outputEquals);
    else if (c.codeIncludes !== undefined) passed = loose(code).includes(loose(c.codeIncludes));
    if (c.expr !== undefined) exprIndex += 1;
    return { message: c.message, passed };
  });
}

/** Run a learner's SQL on a fresh practice database and grade it against the exercise's checks. */
export async function runSqlAndCheck(code: string, checks: CodeCheck[], database?: string): Promise<GradedSqlRun> {
  const clean = straightenQuotes(code);
  const exprs = checks.filter((c) => c.expr !== undefined).map((c) => c.expr as string);
  const run = await runSql(clean, { database, exprs });
  const results = gradeSqlChecks(checks, clean, run);
  return { ...run, checks: results, allPassed: results.length > 0 && results.every((r) => r.passed) };
}

/**
 * Tey's plain-words reading of a SQLite error. The original message is still
 * shown underneath, because reading real error messages is part of the course.
 */
export function explainSqlError(err: SqlError): string {
  const m = err.message;
  const at = err.line ? ` on line ${err.line}` : '';
  const near = /near "([^"]*)"/.exec(m)?.[1];
  if (/incomplete input/i.test(m)) return `Your SQL stops halfway${at}. Look for a quote or bracket that was opened but never closed.`;
  if (/unrecognized token/i.test(m)) return `There's a character${at} SQL can't read. Text needs straight single quotes at both ends: 'like this'.`;
  if (/syntax error/i.test(m)) {
    if (near && /^(FROM|WHERE|ORDER|GROUP|HAVING|LIMIT|JOIN|ON|SET|VALUES)$/i.test(near))
      return `SQL got confused just before ${near.toUpperCase()}${at}. Check the line before it: a missing comma, or a comma too many?`;
    if (near && /^(FORM|SELCT|SELET|WHER|OREDR|GRUOP|UPDTE|DELTE|INSRET)$/i.test(near))
      return `"${near}" is a typo${at}. SQL only understands its keywords spelled exactly.`;
    if (near === ',') return `There's a comma${at} where SQL didn't expect one. Is there a comma before FROM, or two in a row?`;
    if (near) return `SQL couldn't read the part near "${near}"${at}. Check the spelling and the commas around it.`;
    return `SQL couldn't read your statement${at}. Check the spelling, the commas and the quotes.`;
  }
  const table = /no such table: ([\w.]+)/i.exec(m)?.[1];
  if (table) return `There's no table called ${table}. Open Tables to see the real names, and check the spelling.`;
  const column = /no such column: ([\w."]+)/i.exec(m)?.[1];
  if (column)
    return `There's no column called ${column}. Check the spelling in Tables. If it's a piece of text, it needs single quotes: '${column.replace(/^\w+\./, '')}'.`;
  if (/ambiguous column name/i.test(m)) return 'Two of your tables have a column with that name. Say which one you mean: films.title, not just title.';
  if (/UNIQUE constraint failed/i.test(m)) return 'That value is already taken: the table only allows one row with it. The database just stopped a duplicate.';
  if (/NOT NULL constraint failed: ([\w.]+)/i.test(m)) return `${/NOT NULL constraint failed: ([\w.]+)/i.exec(m)?.[1]} can't be empty. Give it a value.`;
  if (/CHECK constraint failed/i.test(m)) return "A value broke one of the table's rules (a CHECK). The database refused it.";
  if (/FOREIGN KEY constraint failed/i.test(m)) return 'That row points at something that doesn\'t exist, like a ticket for a screening that was never added.';
  if (/already exists/i.test(m)) return 'Something with that name already exists in this database. Pick another name, or use the one that is there.';
  if (/datatype mismatch/i.test(m)) return 'That value is the wrong kind for its column, like text in an INTEGER PRIMARY KEY.';
  if (/values for \d+ columns|has \d+ columns but \d+ values were supplied/i.test(m))
    return 'The number of values doesn\'t match the number of columns. Count both lists.';
  if (/cannot start a transaction within a transaction/i.test(m)) return 'A transaction is already open. COMMIT or ROLLBACK it before you BEGIN another.';
  if (/no transaction is active/i.test(m)) return 'There is no open transaction to finish. Start one with BEGIN first.';
  if (/misuse of aggregate/i.test(m)) return 'COUNT, SUM and AVG can\'t go in WHERE. To filter on a total, use HAVING after GROUP BY.';
  if (err.type === 'RunnerError') return 'Something went wrong running your SQL. Try running it again.';
  return `The database stopped with an error${at}. Read the message below: it says what went wrong.`;
}

/** What to tell a learner whose query ran past the time limit. */
export const SQL_TIMEOUT_MESSAGE = 'Your SQL ran for too long, so I stopped it. A join without ON can multiply rows into millions: check every JOIN has one.';
