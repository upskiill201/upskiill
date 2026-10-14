import { explainError, gradeChecks, straightenQuotes, usesInput } from '../checks';
import type { RawRunResult } from '../pythonRunner';
import { gradeExercise, isResponseComplete, validateExercise, type WriteCodeExercise } from '@/lib/lesson/blocks';
import { sanitizeExercises, sanitizeLearnCards } from '@/lib/lesson/sanitize';

const ran = (stdout: string, extra: Partial<RawRunResult> = {}): RawRunResult => ({
  stdout,
  error: null,
  exprResults: [],
  timedOut: false,
  ms: 3,
  ...extra,
});

describe('gradeChecks', () => {
  it('matches output loosely for "includes" and strictly for "equals"', () => {
    const checks = [
      { message: 'says hello', outputIncludes: 'hello,   TEYRO' },
      { message: 'prints 1 to 3', outputEquals: '1\n2\n3' },
    ];
    expect(gradeChecks(checks, '', ran('Hello, Teyro!\n')).map((r) => r.passed)).toEqual([true, false]);
    expect(gradeChecks(checks, '', ran('1  \n2\n3\n\n')).map((r) => r.passed)).toEqual([false, true]);
  });

  it('reads expression results in order, skipping the other checks', () => {
    const checks = [
      { message: 'a', expr: 'pot == 1' },
      { message: 'b', outputIncludes: 'x' },
      { message: 'c', expr: 'total == 2' },
    ];
    const r = gradeChecks(checks, '', ran('x', { exprResults: [false, true] }));
    expect(r.map((c) => c.passed)).toEqual([false, true, true]);
  });

  it('checks the code itself, with phone quotes straightened', () => {
    const checks = [{ message: 'uses an f-string', codeIncludes: 'f"' }];
    expect(gradeChecks(checks, straightenQuotes('print(f“hi”)'), ran('hi'))[0].passed).toBe(true);
  });

  it('fails everything when the program crashed or timed out', () => {
    const checks = [{ message: 'prints', outputIncludes: 'a' }];
    expect(gradeChecks(checks, '', ran('a', { error: { type: 'NameError', message: 'x', line: 1 } }))[0].passed).toBe(false);
    expect(gradeChecks(checks, '', ran('a', { timedOut: true }))[0].passed).toBe(false);
  });
});

describe('explainError', () => {
  it('turns common Python errors into plain words', () => {
    expect(explainError({ type: 'NameError', message: "name 'Print' is not defined", line: 1 })).toMatch(/it's print, all lowercase/);
    expect(explainError({ type: 'TypeError', message: 'can only concatenate str (not "int") to str', line: 2 })).toMatch(/str\(\)/);
    expect(explainError({ type: 'SyntaxError', message: 'unterminated string literal (detected at line 1)', line: 1 })).toMatch(/quote/);
    expect(explainError({ type: 'IndentationError', message: 'expected an indented block', line: 3 })).toMatch(/4 spaces/);
    expect(explainError({ type: 'WeirdError', message: '?', line: null })).toMatch(/WeirdError/);
  });
});

describe('usesInput', () => {
  it('spots input() calls', () => {
    expect(usesInput('name = input("Name? ")')).toBe(true);
    expect(usesInput('print("input")')).toBe(false);
  });
});

describe('Write and run exercises', () => {
  const ex: WriteCodeExercise = {
    id: 'w',
    kind: 'writeCode',
    language: 'python',
    prompt: 'Make the pot',
    starter: '',
    solution: 'pot = 1',
    checks: [{ message: 'pot exists', expr: 'pot == 1' }],
  };

  it('is complete only when the current code passed', () => {
    const base = { kind: 'writeCode' as const, code: 'pot = 1', failedRuns: 0, usedSolution: false };
    expect(isResponseComplete(ex, { ...base, passedCode: null })).toBe(false);
    expect(isResponseComplete(ex, { ...base, passedCode: 'pot = 2' })).toBe(false);
    expect(isResponseComplete(ex, { ...base, passedCode: 'pot = 1' })).toBe(true);
    expect(gradeExercise(ex, { ...base, passedCode: 'pot = 1' })).toBe(true);
  });

  it('validates checks', () => {
    expect(validateExercise(ex)).toBeNull();
    expect(validateExercise({ ...ex, checks: [{ message: 'two tests', expr: 'a', outputIncludes: 'b' }] })).toMatch(/exactly one/);
    expect(validateExercise({ ...ex, solution: '' })).toMatch(/solution/);
  });

  it('survives the sanitizer, and drops broken ones', () => {
    const [kept] = sanitizeExercises([{ ...ex, checks: [{ message: 'pot exists', expr: 'pot == 1', junk: 5 }] }]);
    expect(kept).toMatchObject({ kind: 'writeCode', checks: [{ message: 'pot exists', expr: 'pot == 1' }] });
    expect(sanitizeExercises([{ ...ex, checks: [] }])).toEqual([]);
  });

  it('keeps Try it live cards with code, and drops empty ones', () => {
    const cards = sanitizeLearnCards([
      { id: 'a', kind: 'tryIt', code: 'print(1)', stdin: ['x'] },
      { id: 'b', kind: 'tryIt', code: '   ' },
    ]);
    expect(cards).toHaveLength(1);
    expect(cards[0]).toMatchObject({ kind: 'tryIt', code: 'print(1)', stdin: ['x'] });
  });
});
