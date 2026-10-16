import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 12 — Constants and capital names: PEP 8's convention for values that shouldn't change. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Constants and capital names',
  summary: 'Some values in the tracker change every month. Others, like the pay day and the group\'s name, never should. Python has a way of saying "don\'t touch this", in capital letters.',
  minutes: 11,
  outcomes: [
    'Name constants in CAPITAL_LETTERS',
    'Put them at the top of the program',
    'Know that Python doesn\'t enforce them: people do',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'A promise in capital letters',
      html: '<p>Some values are meant to stay the same while the program runs: the group\'s name, the pay day, the number of months in a year. Programmers call these <strong>constants</strong>.</p><p>Python\'s style guide, PEP 8, says to write constants in <strong>capital letters with underscores</strong>, at the top of the file:</p><p><code>GROUP_NAME = "OFFICE AJO"</code><br/><code>PAY_DAY = 25</code><br/><code>MONTHS_IN_YEAR = 12</code></p><p>Here is the surprise: <strong>Python doesn\'t stop you changing them.</strong> <code>PAY_DAY = 26</code> works fine. The capitals are a promise between people: "this is set once, on purpose; if you need to change it, change it here, not halfway down the program." Like a "do not move" sticker on office furniture, it works because everyone respects it.</p><p>Ordinary variables, the ones that change, stay in lowercase: <code>members</code>, <code>this_month</code>.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Settings at the top',
      caption: 'The capitals at the top are the settings. The lowercase variables are what changes.',
      code: 'GROUP_NAME = "OFFICE AJO"\nPAY_DAY = 25\n\nmembers = 11\nthis_month = "Tunde"\n\nprint(f"{GROUP_NAME}: pay day is the {PAY_DAY}th")\nprint(f"{members} members. This month: {this_month}")\n',
      challenge: 'Add a constant MONTHS_IN_YEAR = 12 and print how many shares one member pays in a year.',
    },
  ],
  apply: {
    scenario: "The tracker's settings.",
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Constant or ordinary variable?',
        groups: ['CONSTANT', 'variable'],
        items: [
          { text: 'PAY_DAY = 25', group: 0 },
          { text: 'this_month = "Tunde"', group: 1 },
          { text: 'GROUP_NAME = "OFFICE AJO"', group: 0 },
          { text: 'members = 11', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happens if you write PAY_DAY = 26 later in the program?',
        options: [
          { text: 'Python raises an error', why: 'Python doesn\'t protect constants. The capitals are a convention.' },
          { text: 'It works: capitals are a promise between people, not a rule Python enforces' },
          { text: 'PAY_DAY becomes 51', why: '= replaces the value.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a constant PAY_DAY = 25 and print Pay day: 25',
        starter: '# A constant at the top\n',
        solution: 'PAY_DAY = 25\nprint(f"Pay day: {PAY_DAY}")\n',
        hint: 'Capital letters: PAY_DAY = 25',
        checks: [
          { message: 'Print Pay day: 25', outputEquals: 'Pay day: 25' },
          { message: 'Name it PAY_DAY', expr: 'PAY_DAY == 25' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which name breaks the convention?',
        language: 'python',
        lines: ['GROUP_NAME = "OFFICE AJO"', 'Pay_Day = 25', 'MONTHS_IN_YEAR = 12'],
        bug: 1,
        fix: 'PAY_DAY = 25',
        explanation: 'Constants are all capitals with underscores. Pay_Day is neither style.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print a year of shares: SHARE times MONTHS_IN_YEAR',
        starter: 'SHARE = 25000\nMONTHS_IN_YEAR = 12\n',
        solution: 'SHARE = 25000\nMONTHS_IN_YEAR = 12\nprint(SHARE * MONTHS_IN_YEAR)\n',
        hint: 'print(SHARE * MONTHS_IN_YEAR)',
        checks: [
          { message: 'Print 300000', outputEquals: '300000' },
          { message: 'Use both constants', codeIncludes: 'MONTHS_IN_YEAR' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where do constants usually go?',
        options: [
          { text: 'At the bottom', why: 'Python runs top to bottom, so they\'d be defined too late.' },
          { text: 'Next to every line that uses them', why: 'That\'s the retyping problem all over again.' },
          { text: 'At the top of the file, so they\'re easy to find and change in one place' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the style to what it\'s for.',
        pairs: [
          ['PAY_DAY', 'A constant'],
          ['this_month', 'A variable that changes'],
          ['# note', 'A comment for humans'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'If Python lets me change PAY_DAY anyway, why bother with capitals?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Because the next person reading it, maybe you in six months, knows it\'s a setting, not something the program changes.' },
          { text: 'Capitals make it run faster.', why: 'No difference to speed.' },
          { text: 'You\'re right, don\'t bother.', why: 'It\'s one of the most useful habits in PEP 8.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a constant for the group\'s name.',
        language: 'python',
        tiles: ['GROUP_NAME', '=', '"OFFICE AJO"'],
        distractors: ['group_name', 'GroupName'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which Python style guide recommends capitals for constants? (PEP and a number)',
        answers: ['PEP 8', 'PEP8', 'pep 8', '8'],
        placeholder: 'PEP ...',
      },
    ],
  },
  reflect: {
    prompt: 'What in your work or home life is a "constant": set once, rarely changed, and annoying when someone changes it without telling you?',
    starters: ['A constant in my life is...', 'When it changes...'],
  },
  deepen: {
    title: 'Settings files',
    summary: 'Big programs put their constants in a separate settings file. Same idea, one place to look.',
  },
  notes: 'PEP 8, "Constants": "usually defined on a module level and written in all capital letters with underscores separating words". Python has no constant enforcement (typing.Final is a hint for type checkers only). 25000 * 12 = 300000.',
};

export default lesson;
