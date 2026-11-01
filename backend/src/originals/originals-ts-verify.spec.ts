import {
  formatValue,
  gradeTypeScript,
  runTypeScriptProgram,
} from './originals-ts-verify';

describe('TypeScript runner (loader side)', () => {
  it('runs a program and prints like console.log', async () => {
    const out = await runTypeScriptProgram(
      'const sessions: number = 3;\nconsole.log("Sessions today:", sessions);\nconsole.log(["Room 1", "Room 2"], { room: 1 });',
    );
    expect(out.error).toBeNull();
    expect(out.typeErrors).toEqual([]);
    expect(out.stdout).toBe(
      "Sessions today: 3\n[ 'Room 1', 'Room 2' ] { room: 1 }\n",
    );
  });

  it('reports a type error with its line and still runs the code', async () => {
    const out = await runTypeScriptProgram(
      'let count: number = 1;\ncount = "three";\nconsole.log(count);',
    );
    expect(out.typeErrors).toHaveLength(1);
    expect(out.typeErrors[0]).toMatchObject({ code: 2322, line: 2 });
    expect(out.typeErrors[0].message).toContain(
      "not assignable to type 'number'",
    );
    expect(out.stdout).toBe('three\n');
  });

  it('stops at a syntax error without running', async () => {
    const out = await runTypeScriptProgram('console.log("Hello, Kinwell!);');
    expect(out.error?.type).toBe('SyntaxError');
    expect(out.stdout).toBe('');
  });

  it('knows strict mode: implicit any and null checks', async () => {
    const out = await runTypeScriptProgram(
      'function greet(name) { return name; }\nconst phone: string | undefined = undefined;\nphone.length;',
    );
    expect(out.typeErrors.map((d) => d.code).sort()).toEqual(
      [18048, 7006].sort(),
    );
  });

  it('grades like the browser: type errors block a pass unless the exercise is about one', async () => {
    const checks = [{ message: 'Print 45', outputIncludes: '45' }];
    expect(
      (
        await gradeTypeScript(
          'const mins: number = 45;\nconsole.log(mins);',
          checks,
        )
      ).passed,
    ).toEqual([true]);
    expect(
      (
        await gradeTypeScript(
          'const mins: string = 45;\nconsole.log(mins);',
          checks,
        )
      ).passed,
    ).toEqual([false]);

    const deliberate = [
      {
        message: 'TypeScript catches the mistake',
        typeErrorIncludes: "not assignable to type 'number'",
      },
      { message: 'It still prints', outputIncludes: 'oops' },
    ];
    expect(
      (
        await gradeTypeScript(
          'const n: number = "oops";\nconsole.log(n);',
          deliberate,
        )
      ).passed,
    ).toEqual([true, true]);
  });

  it('evaluates check expressions in the program scope', async () => {
    const r = await gradeTypeScript(
      'const slots = 8 * 60 / 60;\nconsole.log(slots);',
      [
        { message: 'slots is 8', expr: 'slots === 8' },
        { message: 'No type errors', noTypeErrors: true },
      ],
    );
    expect(r.passed).toEqual([true, true]);
  });

  it('formats nested values', () => {
    expect(formatValue({ a: [1, { b: 'x' }], 'c-d': null })).toBe(
      "{ a: [ 1, { b: 'x' } ], 'c-d': null }",
    );
    expect(formatValue(new Map([['k', 1]]))).toBe("Map(1) { 'k' => 1 }");
  });
});
