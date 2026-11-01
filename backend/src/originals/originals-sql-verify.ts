import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type {
  AuthoredCodeCheck,
  OriginalTrackDef,
} from './originals-authoring.types';
import type { LintIssue } from './originals-lint';

/**
 * Runs every piece of SQL in a SQL Track before it can be loaded, with the
 * same SQLite the learner's browser uses (sql.js 1.14.1, pinned in
 * package.json and in frontend/public/sql/runner.worker.js), starting from
 * the same practice databases (frontend/public/sql/db/<name>.sql).
 *
 *   error    a Write and run solution fails its own checks or stops with an
 *            error, or a card names a practice database that doesn't exist
 *   warning  a Try it live card stops with an error (fine if the lesson is
 *            about that error), or a starter already passes every check
 *
 * The statement loop, result text and grading mirror the browser
 * (runner.worker.js, frontend/lib/code/sqlChecks.ts); keep them in step.
 */

interface SqlJsStatement {
  getSQL(): string;
  getColumnNames(): string[];
  step(): boolean;
  get(): any[];
  free(): void;
}
interface SqlJsDatabase {
  run(sql: string): void;
  exec(sql: string): { columns: string[]; values: any[][] }[];
  iterateStatements(
    sql: string,
  ): Iterable<SqlJsStatement> & { getRemainingSQL(): string };
  getRowsModified(): number;
  close(): void;
}
interface SqlJsStatic {
  Database: new () => SqlJsDatabase;
}

type SqlResult =
  | { kind: 'rows'; columns: string[]; rows: unknown[][]; rowCount: number }
  | { kind: 'done'; message: string };

interface SqlRun {
  results: SqlResult[];
  error: { type: string; message: string; line: number } | null;
  checks: boolean[];
}

const MAX_ROWS = 200;

let sqlPromise: Promise<SqlJsStatic> | null = null;
function getSql(): Promise<SqlJsStatic> {
  // A dev-only dependency (authoring tool), typed locally.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  sqlPromise ??= (require('sql.js') as () => Promise<SqlJsStatic>)();
  return sqlPromise;
}

const seeds = new Map<string, string | null>();
/** A practice database's SQL, found from wherever the checker runs: the repo root or backend/. */
export function readPracticeDatabase(name: string): string | null {
  if (!seeds.has(name)) {
    const candidates = [
      join(
        process.cwd(),
        '..',
        'frontend',
        'public',
        'sql',
        'db',
        `${name}.sql`,
      ),
      join(process.cwd(), 'frontend', 'public', 'sql', 'db', `${name}.sql`),
      join(
        __dirname,
        '..',
        '..',
        '..',
        'frontend',
        'public',
        'sql',
        'db',
        `${name}.sql`,
      ),
    ];
    const found = /^[a-z0-9-]+$/.test(name)
      ? candidates.find((p) => existsSync(p))
      : undefined;
    seeds.set(name, found ? readFileSync(found, 'utf8') : null);
  }
  return seeds.get(name) ?? null;
}

function describeChange(sql: string, changed: number): string {
  const s = sql.replace(/^(\s|--[^\n]*\n?|\/\*[\s\S]*?\*\/)+/, '');
  const word = (s.match(/^\w+/) ?? [''])[0].toUpperCase();
  const rows = (n: number, what: string) =>
    `${n}${n === 1 ? ' row ' : ' rows '}${what}`;
  const named = (re: RegExp) =>
    (s.match(re)?.[1] ?? '').replace(/["`[\]]/g, '');
  switch (word) {
    case 'INSERT':
    case 'REPLACE':
      return `INSERT: ${rows(changed, 'added')}`;
    case 'UPDATE':
      return `UPDATE: ${rows(changed, 'changed')}`;
    case 'DELETE':
      return `DELETE: ${rows(changed, 'deleted')}`;
    case 'CREATE': {
      const kind = s.match(
        /^CREATE\s+(?:UNIQUE\s+)?(?:TEMP\w*\s+)?(TABLE|INDEX|VIEW|TRIGGER)/i,
      )?.[1];
      const name = named(
        /^CREATE\s+(?:UNIQUE\s+)?(?:TEMP\w*\s+)?(?:TABLE|INDEX|VIEW|TRIGGER)\s+(?:IF\s+NOT\s+EXISTS\s+)?([\w."`[\]]+)/i,
      );
      return kind ? `Created ${kind.toLowerCase()} ${name}` : 'Done';
    }
    case 'DROP': {
      const kind = s.match(/^DROP\s+(TABLE|INDEX|VIEW|TRIGGER)/i)?.[1];
      return kind
        ? `Dropped ${kind.toLowerCase()} ${named(/^DROP\s+\w+\s+(?:IF\s+EXISTS\s+)?([\w."`[\]]+)/i)}`
        : 'Done';
    }
    case 'ALTER':
      return `Changed table ${named(/^ALTER\s+TABLE\s+([\w."`[\]]+)/i)}`;
    case 'BEGIN':
      return 'Transaction started';
    case 'COMMIT':
    case 'END':
      return 'Transaction committed';
    case 'ROLLBACK':
      return 'Transaction rolled back';
    default:
      return 'Done';
  }
}

function lineAt(code: string, offset: number): number {
  const lead = (code
    .slice(offset)
    .match(/^(\s|--[^\n]*\n?|\/\*[\s\S]*?\*\/)*/) ?? [''])[0].length;
  return code.slice(0, offset + lead).split('\n').length;
}

/** Run SQL on a fresh copy of a practice database, then the check queries. Mirrors runner.worker.js. */
export async function runSqlOnce(
  code: string,
  database: string | undefined,
  exprs: string[],
): Promise<SqlRun> {
  const SQL = await getSql();
  const db = new SQL.Database();
  try {
    db.run('PRAGMA foreign_keys = ON;');
    if (database) {
      const seed = readPracticeDatabase(database);
      if (seed === null)
        throw new Error(`Unknown practice database: ${database}`);
      db.exec(seed);
    }
    const results: SqlResult[] = [];
    let error: SqlRun['error'] = null;
    let offset = 0;
    const it = db.iterateStatements(code);
    try {
      for (const stmt of it) {
        const sql = stmt.getSQL();
        try {
          const columns = stmt.getColumnNames();
          if (columns.length > 0) {
            const rows: unknown[][] = [];
            let count = 0;
            while (stmt.step()) {
              if (count < MAX_ROWS) rows.push(stmt.get());
              count += 1;
            }
            results.push({ kind: 'rows', columns, rows, rowCount: count });
          } else {
            stmt.step();
            results.push({
              kind: 'done',
              message: describeChange(sql, db.getRowsModified()),
            });
          }
        } finally {
          stmt.free();
        }
        offset = code.length - it.getRemainingSQL().length;
      }
    } catch (e) {
      const message = String((e as Error)?.message ?? e).replace(
        /^Error:\s*/,
        '',
      );
      error = { type: 'SQL error', message, line: lineAt(code, offset) };
    }
    const checks = error
      ? []
      : exprs.map((q) => {
          try {
            const out = db.exec(q);
            const v: unknown =
              out.length && out[0].values.length ? out[0].values[0][0] : null;
            return v !== null && v !== 0 && v !== '' && v !== '0';
          } catch {
            return false;
          }
        });
    return { results, error, checks };
  } finally {
    db.close();
  }
}

/** The results as text, for outputIncludes / outputEquals. Mirrors resultText in frontend/lib/code/sqlChecks.ts. */
export function resultText(results: SqlResult[]): string {
  return results
    .map((r) => {
      if (r.kind === 'done') return r.message;
      const lines = [
        r.columns.join(' | '),
        ...r.rows.map((row) =>
          row
            .map((v) => (v === null ? 'NULL' : String(v as string | number)))
            .join(' | '),
        ),
      ];
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

/** Which checks pass. Mirrors gradeSqlChecks in frontend/lib/code/sqlChecks.ts. */
export async function gradeSql(
  code: string,
  checks: AuthoredCodeCheck[],
  database?: string,
): Promise<{ passed: boolean[]; run: SqlRun; text: string }> {
  const exprs = checks
    .filter((c) => c.expr !== undefined)
    .map((c) => c.expr as string);
  const run = await runSqlOnce(code, database, exprs);
  const text = resultText(run.results);
  let k = 0;
  const passed = checks.map((c) => {
    let ok = false;
    if (run.error) ok = false;
    else if (c.expr !== undefined) ok = run.checks[k] === true;
    else if (c.outputIncludes !== undefined)
      ok = loose(text).includes(loose(c.outputIncludes));
    else if (c.outputEquals !== undefined)
      ok = exact(text) === exact(c.outputEquals);
    else if (c.codeIncludes !== undefined)
      ok = loose(code).includes(loose(c.codeIncludes));
    if (c.expr !== undefined) k += 1;
    return ok;
  });
  return { passed, run, text };
}

/** Run every Try it live card and Write and run solution in a SQL Track. */
export async function verifySqlTrack(
  track: OriginalTrackDef,
): Promise<LintIssue[]> {
  const issues: LintIssue[] = [];
  const known = (name: string | undefined, where: string, what: string) => {
    if (name && readPracticeDatabase(name) === null) {
      issues.push({
        level: 'error',
        where,
        message: `${what} uses the practice database "${name}", which doesn't exist (frontend/public/sql/db).`,
      });
      return false;
    }
    return true;
  };
  for (const level of track.levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        const where = `${track.slug} L${level.level} ${unit.key} ${lesson.key} "${lesson.title}"`;
        for (const [i, card] of lesson.learn.entries()) {
          if (
            card.kind !== 'tryIt' ||
            !known(card.database, where, `Try it live card ${i + 1}`)
          )
            continue;
          const out = await runSqlOnce(card.code, card.database, []);
          if (card.expectError && !out.error) {
            issues.push({
              level: 'warning',
              where,
              message: `Try it live card ${i + 1} is marked expectError but runs without one.`,
            });
          }
          if (out.error && !card.expectError) {
            issues.push({
              level: 'warning',
              where,
              message: `Try it live card ${i + 1} stops on line ${out.error.line}: ${out.error.message}. Fine only if the lesson is about that error.`,
            });
          }
        }
        for (const [i, ex] of lesson.apply.items.entries()) {
          if (
            ex.kind !== 'writeCode' ||
            !known(ex.database, where, `Exercise ${i + 1}`)
          )
            continue;
          const sol = await gradeSql(ex.solution, ex.checks, ex.database);
          if (sol.run.error) {
            issues.push({
              level: 'error',
              where,
              message: `Exercise ${i + 1}: the solution stops on line ${sol.run.error.line}: ${sol.run.error.message}`,
            });
          } else {
            sol.passed.forEach((ok, j) => {
              if (!ok)
                issues.push({
                  level: 'error',
                  where,
                  message: `Exercise ${i + 1}: the solution fails its own check "${ex.checks[j].message}".`,
                });
            });
          }
          const starter = await gradeSql(
            ex.starter ?? '',
            ex.checks,
            ex.database,
          );
          if (starter.passed.length > 0 && starter.passed.every(Boolean)) {
            issues.push({
              level: 'warning',
              where,
              message: `Exercise ${i + 1}: the starter already passes every check, so there's nothing to do.`,
            });
          }
        }
      }
    }
  }
  return issues;
}
