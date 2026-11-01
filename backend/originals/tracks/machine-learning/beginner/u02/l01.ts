import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1 — Why Python for ML: Emmanuel's export arrives, and the spreadsheet gives up. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Why Python for ML',
  summary: 'Emmanuel sends the booking export: 2,412 rows. Halima opens it in a spreadsheet and starts scrolling. Miracle stops her: "We\'ll do this in Python. Every step written down, so we can run it again next month."',
  minutes: 10,
  outcomes: [
    'Explain why ML work is done in code, not by hand',
    'Know what pandas is for',
    'Run your first line of Python in this course',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The export',
      beats: [
        { speaker: 'emmanuel', text: 'Sent! Every booking from the 8 pilot clinics, 12 weeks. Some of it might be a bit... creative.' },
        { speaker: 'halima', text: '2,412 rows. I\'ll go through it with a highlighter.' },
        { speaker: 'miracle', text: 'And next month, when there are 2,400 more? Write the steps in Python once, and they run again in a second. Every ML tool we\'ll use is in Python too.' },
        { speaker: 'tey', text: 'The tool for tables in Python is called pandas. Think of it as a spreadsheet you control with short commands.' },
      ],
      choice: {
        prompt: 'How should Halima clean the export?',
        options: [
          { text: 'Write the steps in Python with pandas, so they can be checked and run again.', outcome: 'Repeatable, checkable, and ready for next month\'s data. This chapter teaches exactly those steps.', best: true },
          { text: 'Fix it by hand in a spreadsheet.', outcome: 'It works once. Next month she starts again, and nobody can see what she changed.' },
          { text: 'Skip cleaning: the model will figure it out.', outcome: 'A model learns from whatever it\'s given, mistakes included. Messy in, messy out.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Already know Python and pandas? Take the "Jump here" test on Chapter 3 and skip ahead.',
    },
  ],
  apply: {
    scenario: 'Why code?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does Miracle want the cleaning written in Python?',
        options: [
          { text: 'Python is the only way to open a file', why: 'Spreadsheets open files too. The win is repeatable steps.' },
          { text: 'Spreadsheets are illegal', why: 'They\'re fine for looking. Code is better for repeatable work.' },
          { text: 'The same steps can run again on next month\'s data, and anyone can check them' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print "2412 rows to check" using the variable',
        starter: 'rows = 2412\n',
        solution: 'rows = 2412\nprint(f"{rows} rows to check")\n',
        hint: 'print(f"{rows} rows to check")',
        checks: [{ message: 'Print 2412 rows to check', outputEquals: '2412 rows to check' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to its job.',
        pairs: [
          ['Python', 'The language we write'],
          ['pandas', 'Tables in Python'],
          ['scikit-learn', 'ML models (from Chapter 5)'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Better done in code, or fine by hand?',
        groups: ['Better in code', 'Fine by hand'],
        items: [
          { text: 'Cleaning 2,412 rows every month', group: 0 },
          { text: 'Glancing at the first few rows', group: 1 },
          { text: 'Counting no-shows per clinic, every week', group: 0 },
          { text: 'Reading one patient\'s booking', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Can\'t the model just learn from the messy file?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, models ignore mistakes.', why: 'Models learn from everything they\'re given, mistakes included.' },
          { text: 'It would learn the mess too: "YABA" and "Yaba" as two clinics, a 400-day wait as real. Clean first.' },
          { text: 'Models can\'t read files.', why: 'They can. The problem is what\'s in the file.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s description.',
        template: 'pandas is like a [[1]] you control with short [[2]].',
        blanks: [['spreadsheet'], ['commands']],
        distractors: ['robot', 'emails'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "messy in, messy out" mean?',
        options: [
          { text: 'A model trained on messy data makes messy predictions' },
          { text: 'Messy code runs slower', why: 'It\'s about data quality, not speed.' },
          { text: 'You should never use real data', why: 'Use real data, cleaned carefully.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Halima\'s first plan is the problem?',
        lines: [
          'Open the export in Python.',
          'Fix the mistakes by hand in a spreadsheet, without noting what changed.',
          'Count the no-shows.',
          'Save the clean table.',
        ],
        bug: 1,
        fix: 'Fix the mistakes with written steps in Python.',
        explanation: 'Unrecorded hand edits can\'t be checked or repeated next month.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The name of the Python tool for tables. (one word)',
        answers: ['pandas'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'How many rows did Emmanuel send?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'About a thousand.', why: 'It was 2,412.' },
          { text: '2,412. I\'ll check that number in Python too, so we know nothing went missing.' },
          { text: 'I didn\'t count; it doesn\'t matter.', why: 'Knowing the row count is the first check on any dataset.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What task do you repeat every week or month by hand? What would it mean to write the steps down once?',
    starters: ['Every month I...', 'If it were written down...'],
  },
  deepen: {
    title: 'Notebooks',
    summary: 'Data people often work in "notebooks": code, results and notes on one page. The lessons here work the same way: you run a few lines and see the result straight away.',
  },
  notes: 'appointments_raw.csv: 2,412 rows (2,400 + 12 duplicates), made-up practice data. pandas and scikit-learn are Python libraries.',
};

export default lesson;
