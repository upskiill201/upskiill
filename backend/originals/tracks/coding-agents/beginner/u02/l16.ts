import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 16 — The date-format guess: a post-mortem. */

const MED = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Only change board/rules.py. Done when all tests pass.';
const START = `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(MED)}, project)\n`;

const lesson: OriginalLesson = {
  key: 'l16',
  title: 'The date-format guess',
  summary: 'Felix runs a post-mortem on Monday\'s "nearly" brief. Why did the agent pick 06/03/2026? Was it silly, or a reasonable guess? Fact or myth?',
  minutes: 12,
  outcomes: [
    'Explain why the agent\'s guess was reasonable and still wrong',
    'Find the guessed format in its code',
    'Write the rule that prevents it next time',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Day-first dates like 06/03/2026 were a silly guess.',
          isFact: false,
          explain: 'Myth. Kenya, like much of the world, writes dates day first. For a Nairobi company it was a sensible guess. Sensible guesses are the dangerous ones: they look right.',
        },
        {
          text: 'The answer was in the project all along.',
          isFact: true,
          explain: 'Fact. Every test and every row of data/sample.csv says 2026-03-06 15:00. The agent read the tests and still guessed. Don\'t rely on it noticing.',
        },
        {
          text: 'The agent hid the problem.',
          isFact: false,
          explain: 'Myth. With a finish line and protected scope, it reported honestly: "1 of 7 tests pass." The brief made the failure visible.',
        },
        {
          text: 'One example in the brief would have prevented it.',
          isFact: true,
          explain: 'Fact. "Dates look like 2026-03-06 15:00." Five words.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Find the guess',
      caption: 'The line where the guess lives.',
      code: START + '\nfor line in project.read("board/rules.py").splitlines():\n    if "strptime" in line:\n        print(line.strip())\nprint(project.read("data/sample.csv").splitlines()[1])\n',
      challenge: 'Find the date in tests/test_rules.py too.',
    },
  ],
  apply: {
    scenario: 'Why it guessed.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print True if the agent\'s rules.py contains the guessed format "%d/%m/%Y"',
        starter: START,
        solution: START + 'print("%d/%m/%Y" in project.read("board/rules.py"))\n',
        hint: '"%d/%m/%Y" in project.read("board/rules.py")',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why are sensible guesses more dangerous than silly ones?',
        options: [
          { text: 'They look right, so nobody checks them' },
          { text: 'They take longer to write', why: 'It\'s about being noticed, not time.' },
          { text: 'They\'re always wrong', why: 'Often right; the danger is when they aren\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'In the post-mortem: cause or blame?',
        groups: ['Cause', 'Blame'],
        items: [
          { text: 'The brief had no example date', group: 0 },
          { text: 'The agent is dumb', group: 1 },
          { text: 'Day-first is common in Kenya', group: 0 },
          { text: 'Remi should have known', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the placed_at value of the first sample delivery, to see the real format',
        starter: 'from teyro_agent import Project\n\nproject = Project()\nrows = project.load("board.data").load_deliveries()\n',
        solution: 'from teyro_agent import Project\n\nproject = Project()\nrows = project.load("board.data").load_deliveries()\nprint(rows[0]["placed_at"])\n',
        hint: 'rows[0]["placed_at"]',
        checks: [{ message: 'Print 2026-03-02 09:15', outputEquals: '2026-03-02 09:15' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the format code to what it means.',
        pairs: [
          ['%Y', 'Four-digit year'],
          ['%m', 'Month number'],
          ['%d', 'Day of the month'],
          ['%H', 'Hour, 24-hour clock'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'It read the tests. They\'re full of real dates. Why didn\'t it notice?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Sometimes agents notice, sometimes they don\'t. You can\'t brief on "it might notice". Put the example in.' },
          { text: 'It noticed and ignored them on purpose.', why: 'It\'s not trying to trick you; it missed it.' },
          { text: 'Agents can\'t read dates.', why: 'They can; it just didn\'t connect them.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from datetime import datetime\nprint(datetime.strptime("06/03/2026 15:00", "%d/%m/%Y %H:%M").month)',
        language: 'python',
        options: [
          { text: '3' },
          { text: '6', why: '%d comes first, so 06 is the day and 03 the month.' },
          { text: 'An error', why: 'This text matches the day-first format.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The post-mortem rule.',
        template: 'Never rely on the agent [[1]]; put an [[2]] in the brief.',
        blanks: [['noticing'], ['example']],
        distractors: ['typing', 'apology'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the post-mortem is blame, not a cause?',
        lines: [
          'Asked: a brief with the rule but no example date.',
          'Got: code expecting 06/03/2026; 6 tests failed.',
          'Why: the agent is useless with dates.',
          'Rule: every brief includes a real example of each input.',
        ],
        bug: 2,
        fix: 'Why: with no example, it made a sensible but wrong guess.',
        explanation: 'Causes you can fix, not labels.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In "%d/%m/%Y", which comes first: day, month or year?',
        answers: ['day'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'When did you make a "sensible" assumption that turned out wrong? What one example would have saved you?',
    starters: ['I assumed...', 'An example would have shown...'],
  },
  deepen: {
    title: 'ISO 8601',
    summary: '2026-03-06 15:00 follows ISO 8601, the international standard for dates: year, month, day. It sorts correctly as text and can\'t be confused, which is why data files use it.',
  },
  notes: 'Practice agent without an example date: strptime(..., "%d/%m/%Y %H:%M"). Kenya commonly writes dates day-first. data/sample.csv first row placed_at 2026-03-02 09:15. ISO 8601 date format.',
};

export default lesson;
