/*
 * Teyro's SQL runner (lib/code/sqlRunner.ts starts it).
 *
 * A classic Web Worker that loads SQLite compiled to WebAssembly (sql.js)
 * from its CDN and runs learners' SQL entirely in their browser: nothing runs
 * on Teyro's servers (docs/ORIGINALS_PLAYBOOK.md §7). Every run starts from a
 * fresh copy of a practice database (public/sql/db/<name>.sql), so a run can
 * never break the next one. The page owns the time limit: a query that runs
 * too long is stopped by terminating this worker.
 *
 *   in   { id, code, database: string | null, exprs: string[] }
 *        { type: 'schema', id, database: string | null }
 *   out  { type: 'ready' } once SQLite has loaded
 *        { type: 'loadError', message }
 *        { type: 'result', id, results, error: { type, message, line } | null, checks: boolean[], schema }
 *        { type: 'schema', id, schema } | { type: 'schemaError', id, message }
 *
 * The statement loop, the result text and the checks mirror
 * backend/src/originals/originals-sql-verify.ts; keep them in step.
 */

const SQLJS_VERSION = '1.14.1';
const CDN = 'https://cdn.jsdelivr.net/npm/sql.js@' + SQLJS_VERSION + '/dist/';
/** Rows sent back per result; the count is always the real one. */
const MAX_ROWS = 200;

let SQL = null;
const seeds = new Map();

async function seedFor(name) {
  if (!name) return '';
  if (!/^[a-z0-9-]+$/.test(name)) throw new Error('Unknown practice database: ' + name);
  if (!seeds.has(name)) {
    const res = await fetch('/sql/db/' + name + '.sql');
    if (!res.ok) throw new Error('Unknown practice database: ' + name);
    seeds.set(name, await res.text());
  }
  return seeds.get(name);
}

async function freshDatabase(name) {
  const db = new SQL.Database();
  // Foreign keys are on, the way every app that uses SQLite should connect.
  db.run('PRAGMA foreign_keys = ON;');
  const seed = await seedFor(name);
  if (seed) db.exec(seed);
  return db;
}

/** What a statement that returns no rows did, in plain words. */
function describeChange(sql, changed) {
  const s = sql.replace(/^(\s|--[^\n]*\n?|\/\*[\s\S]*?\*\/)+/, '');
  const word = (s.match(/^\w+/) || [''])[0].toUpperCase();
  const rows = (n, what) => n + (n === 1 ? ' row ' : ' rows ') + what;
  const named = (re) => {
    const m = s.match(re);
    return m ? m[1].replace(/["`[\]]/g, '') : '';
  };
  switch (word) {
    case 'INSERT':
    case 'REPLACE':
      return 'INSERT: ' + rows(changed, 'added');
    case 'UPDATE':
      return 'UPDATE: ' + rows(changed, 'changed');
    case 'DELETE':
      return 'DELETE: ' + rows(changed, 'deleted');
    case 'CREATE': {
      const kind = (s.match(/^CREATE\s+(?:UNIQUE\s+)?(?:TEMP\w*\s+)?(TABLE|INDEX|VIEW|TRIGGER)/i) || [])[1];
      const name = named(/^CREATE\s+(?:UNIQUE\s+)?(?:TEMP\w*\s+)?(?:TABLE|INDEX|VIEW|TRIGGER)\s+(?:IF\s+NOT\s+EXISTS\s+)?([\w."`[\]]+)/i);
      return kind ? 'Created ' + kind.toLowerCase() + ' ' + name : 'Done';
    }
    case 'DROP': {
      const kind = (s.match(/^DROP\s+(TABLE|INDEX|VIEW|TRIGGER)/i) || [])[1];
      return kind ? 'Dropped ' + kind.toLowerCase() + ' ' + named(/^DROP\s+\w+\s+(?:IF\s+EXISTS\s+)?([\w."`[\]]+)/i) : 'Done';
    }
    case 'ALTER':
      return 'Changed table ' + named(/^ALTER\s+TABLE\s+([\w."`[\]]+)/i);
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

/** SQLite's message, and a short name for the kind of problem. */
function describeError(e, line) {
  const message = String((e && e.message) || e).replace(/^Error:\s*/, '');
  let type = 'SQL error';
  if (/syntax error|incomplete input|unrecognized token/i.test(message)) type = 'Syntax error';
  else if (/no such table/i.test(message)) type = 'No such table';
  else if (/no such column|ambiguous column/i.test(message)) type = 'Column problem';
  else if (/constraint failed/i.test(message)) type = 'Constraint failed';
  else if (/already exists/i.test(message)) type = 'Already exists';
  return { type, message, line };
}

function lineAt(code, offset) {
  // Skip the whitespace and comments before the statement that failed.
  const rest = code.slice(offset);
  const lead = (rest.match(/^(\s|--[^\n]*\n?|\/\*[\s\S]*?\*\/)*/) || [''])[0].length;
  return code.slice(0, offset + lead).split('\n').length;
}

function cell(v) {
  if (v === null || v === undefined) return null;
  if (v instanceof Uint8Array) return '[' + v.length + ' bytes]';
  return v;
}

/** Run every statement in order, the way a database console does. Stops at the first error. */
function runStatements(db, code) {
  const results = [];
  let error = null;
  let offset = 0;
  const it = db.iterateStatements(code);
  try {
    for (const stmt of it) {
      const sql = stmt.getSQL();
      try {
        const columns = stmt.getColumnNames();
        if (columns.length > 0) {
          const rows = [];
          let count = 0;
          while (stmt.step()) {
            if (count < MAX_ROWS) rows.push(stmt.get().map(cell));
            count += 1;
          }
          results.push({ kind: 'rows', sql, columns, rows, rowCount: count });
        } else {
          stmt.step();
          results.push({ kind: 'done', sql, message: describeChange(sql, db.getRowsModified()) });
        }
      } finally {
        stmt.free();
      }
      offset = code.length - it.getRemainingSQL().length;
    }
  } catch (e) {
    error = describeError(e, lineAt(code, offset));
  }
  return { results, error };
}

/** Is the first value of the first row true? (A check query.) */
function checkQuery(db, sql) {
  try {
    const out = db.exec(sql);
    const v = out.length && out[0].values.length ? out[0].values[0][0] : null;
    return v !== null && v !== 0 && v !== '' && v !== '0';
  } catch {
    return false;
  }
}

/** Tables (not SQLite's own) and their columns, for the Tables panel. */
function schemaOf(db) {
  const out = [];
  const tables = db.exec("SELECT name, type FROM sqlite_master WHERE type IN ('table', 'view') AND name NOT LIKE 'sqlite_%' ORDER BY type, name");
  if (!tables.length) return out;
  for (const [name, type] of tables[0].values) {
    const cols = db.exec('PRAGMA table_info(' + JSON.stringify(name) + ')');
    const count = type === 'table' ? db.exec('SELECT COUNT(*) FROM ' + JSON.stringify(name))[0].values[0][0] : null;
    out.push({
      name,
      view: type === 'view',
      rows: count,
      columns: cols.length ? cols[0].values.map((c) => ({ name: c[1], type: c[2], key: c[5] > 0 })) : [],
    });
  }
  return out;
}

async function boot() {
  try {
    importScripts(CDN + 'sql-wasm.js');
    SQL = await self.initSqlJs({ locateFile: (file) => CDN + file });
    self.postMessage({ type: 'ready' });
  } catch (e) {
    self.postMessage({ type: 'loadError', message: String((e && e.message) || e) });
  }
}

const booted = boot();

self.onmessage = async (event) => {
  await booted;
  const msg = event.data || {};
  if (!SQL) return;
  if (msg.type === 'schema') {
    let db = null;
    try {
      db = await freshDatabase(msg.database);
      self.postMessage({ type: 'schema', id: msg.id, schema: schemaOf(db) });
    } catch (e) {
      self.postMessage({ type: 'schemaError', id: msg.id, message: String((e && e.message) || e) });
    } finally {
      if (db) db.close();
    }
    return;
  }
  let db = null;
  try {
    db = await freshDatabase(msg.database);
    const { results, error } = runStatements(db, String(msg.code || ''));
    const checks = error ? [] : (msg.exprs || []).map((q) => checkQuery(db, q));
    self.postMessage({ type: 'result', id: msg.id, results, error, checks, schema: schemaOf(db) });
  } catch (e) {
    self.postMessage({
      type: 'result',
      id: msg.id,
      results: [],
      error: { type: 'RunnerError', message: String((e && e.message) || e), line: null },
      checks: [],
      schema: [],
    });
  } finally {
    if (db) db.close();
  }
};
