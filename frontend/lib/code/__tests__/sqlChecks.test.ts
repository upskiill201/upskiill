import { explainSqlError, gradeSqlChecks, resultText } from '../sqlChecks';
import type { RawSqlRun, SqlResult } from '../sqlRunner';
import { sanitizeExercises, sanitizeLearnCards } from '@/lib/lesson/sanitize';

const rows: SqlResult = { kind: 'rows', sql: 'SELECT', columns: ['seat', 'n'], rows: [['G7', 2], ['G8', null]], rowCount: 2 };
const done: SqlResult = { kind: 'done', sql: 'UPDATE', message: 'UPDATE: 1 row changed' };

const ran = (results: SqlResult[], extra: Partial<RawSqlRun> = {}): RawSqlRun => ({
  results,
  error: null,
  exprResults: [],
  schema: [],
  timedOut: false,
  ms: 3,
  ...extra,
});

describe('resultText', () => {
  it('prints rows like a console, with NULL and the row count', () => {
    expect(resultText([done, rows])).toBe('UPDATE: 1 row changed\n\nseat | n\nG7 | 2\nG8 | NULL\n(2 rows)');
  });
});

describe('gradeSqlChecks', () => {
  it('reads the results text, check queries in order, and the SQL loosely', () => {
    const checks = [
      { message: 'a', outputIncludes: 'g7  | 2' },
      { message: 'b', expr: 'SELECT 1' },
      { message: 'c', codeIncludes: 'group by seat' },
      { message: 'd', expr: 'SELECT 0' },
    ];
    const graded = gradeSqlChecks(checks, 'SELECT seat\nGROUP   BY seat', ran([rows], { exprResults: [true, false] }));
    expect(graded.map((r) => r.passed)).toEqual([true, true, true, false]);
  });

  it('fails every check when the SQL stopped with an error', () => {
    const run = ran([rows], { error: { type: 'Syntax error', message: 'near "FORM": syntax error', line: 2 } });
    expect(gradeSqlChecks([{ message: 'a', outputIncludes: 'G7' }], '', run)[0].passed).toBe(false);
  });
});

describe('explainSqlError', () => {
  it('explains the common SQLite errors in plain words', () => {
    expect(explainSqlError({ type: 'Syntax error', message: 'near "FORM": syntax error', line: 2 })).toMatch(/typo on line 2/);
    expect(explainSqlError({ type: 'No such table', message: 'no such table: film', line: 1 })).toMatch(/no table called film/);
    expect(explainSqlError({ type: 'Constraint failed', message: 'UNIQUE constraint failed: tickets.screening_id, tickets.seat', line: 3 })).toMatch(/already taken/);
  });
});

describe('sanitize keeps the SQL fields', () => {
  it('keeps language and database on Try it live and Write and run', () => {
    const [card] = sanitizeLearnCards([{ id: 'c', kind: 'tryIt', language: 'sql', database: 'starlight', code: 'SELECT 1;' }]);
    expect(card).toMatchObject({ kind: 'tryIt', language: 'sql', database: 'starlight' });
    const [ex] = sanitizeExercises([
      { id: 'e', kind: 'writeCode', language: 'sql', database: 'shoebox', prompt: 'p', solution: 'SELECT 1;', checks: [{ message: 'm', outputIncludes: '1' }] },
    ]);
    expect(ex).toMatchObject({ kind: 'writeCode', language: 'sql', database: 'shoebox' });
  });
});
