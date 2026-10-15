import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 with earlier material. Story beat: Tunde checks Ada's maths. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Tunde checks the maths',
  summary: "Tunde doesn't trust the notebook or the program. So Ada shows him the code. Calculations, readable code, where Python runs and predicting output, all mixed.",
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can calculate and predict output', 'Write readable code that does real sums'],
  learn: [
    {
      kind: 'story',
      title: 'Show your working',
      beats: [
        { speaker: 'narrator', text: 'Tunde reads the screen. Pot: 200000. Share: 20000.0.' },
        { speaker: 'narrator', text: '"How do I know your program isn\'t wrong too?" he asks.' },
        { speaker: 'ada', text: 'Read the code. It says 20000 * 10, with a comment saying why. You can check every sum.' },
        { speaker: 'tey', text: "That's the Zen in action: readable code people can trust. Now let's check yours." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(10 + 2 * 5)',
        language: 'python',
        options: [
          { text: '20' },
          { text: '60', why: '* first: 2 * 5 = 10, then 10 + 10.' },
          { text: '17', why: 'Check the sum again: 2 * 5 is 10.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the share for 8 members of a 160000 pot',
        starter: '# Each member\'s share: pot divided by members\n',
        solution: 'print("Share:", 160000 / 8)\n',
        hint: 'Divide with /. Python gives a decimal: 20000.0.',
        checks: [
          { message: 'Print 20000.0', outputIncludes: '20000.0' },
          { message: 'Divide with /', codeIncludes: '/' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(9 / 3) show?',
        answers: ['3.0'],
        placeholder: 'Output',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the spirit of the Zen, or not?',
        groups: ['Zen', 'Not Zen'],
        items: [
          { text: 'A label in the print and a comment saying why', group: 0 },
          { text: 'Hiding an error', group: 1 },
          { text: 'print(20000*10) with no label', group: 1 },
          { text: 'The simplest way that works', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print this banner exactly',
        starter: '# ==========\n# POT: 200000\n# ==========\n',
        solution: 'print("=" * 10)\nprint("POT:", 20000 * 10)\nprint("=" * 10)\n',
        hint: 'A line of 10 equals signs is "=" * 10.',
        checks: [
          { message: 'Print the three lines exactly', outputEquals: '==========\nPOT: 200000\n==========' },
          { message: 'Use * to make the lines', codeIncludes: '* 10' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ['Calculator', '* and / before + and -'],
          ['Zen of Python', 'Readability counts'],
          ['Where Python runs', 'Files, >>>, or the browser'],
          ['Reading code', 'Predict, then run'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives the wrong pot for 10 members paying 20000?',
        language: 'python',
        lines: ['print("Pot:", 20000 * 10)', 'print("Pot again:", 20000 + 10)'],
        bug: 1,
        fix: 'print("Pot again:", 20000 * 10)',
        explanation: 'A pot is everyone paying in: multiply, not add.',
      },
      {
        kind: 'mcq',
        prompt: 'What does import this show?',
        options: [
          { text: 'The Zen of Python' },
          { text: 'Your Python version', why: 'That is sys.version_info.' },
          { text: 'Nothing', why: 'It prints the Zen.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make it print 20: add brackets.',
        language: 'python',
        template: 'print([[1]]1 + 4[[2]] * 4)',
        blanks: [['('], [')']],
        distractors: ['[', '{'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Tunde says your program could be wrong too. What do you tell him?',
        prompt: "What is Ada's best answer?",
        options: [
          { text: 'He can read the code: every sum is written down with a comment, so he can check it himself.' },
          { text: 'Computers are never wrong.', why: 'Programs do exactly what they are told, which can be wrong. Readable code lets people check.' },
          { text: 'Just trust me.', why: 'The point of the program is that nobody has to just trust anyone.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the report so it prints the title, the pot, then the share.',
        language: 'python',
        lines: ['print("AJO REPORT")', 'print("Pot:", 200000)', 'print("Share:", 200000 / 10)'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that prints Pot: 240000 for 12 members paying 20000',
        language: 'python',
        tiles: ['print(', '"Pot:"', ',', '12 * 20000', ')'],
        distractors: ['12 + 20000', '"12 * 20000"'],
      },
    ],
  },
  reflect: {
    prompt: 'How would you convince someone your program\'s numbers are right?',
    starters: ['I would show them...'],
  },
  deepen: { title: 'Keep going', summary: 'Write a 4-line report for something you track (savings, steps, study hours) with a banner, a label and a sum.' },
  notes: 'Review only. 160000 / 8 = 20000.0; 12 * 20000 = 240000.',
};

export default lesson;
