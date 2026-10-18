import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: bools, comparisons, if, indentation. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Tunde\'s answer',
  summary: 'Tunde asks again: "Have I paid?" This time the tracker answers by itself: "Paid in full". Quick check before it learns to say what to do otherwise.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write if statements with comparisons', 'Get the indentation right'],
  learn: [
    {
      kind: 'story',
      title: 'The answer',
      beats: [
        { speaker: 'narrator', text: 'Ada runs the tracker with Tunde\'s payment: 30000 on the 24th. It prints "Paid in full". She screenshots it to him.' },
        { speaker: 'narrator', text: 'Tunde: "And if I hadn\'t paid?" Ada: "Then it says nothing. Yet."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: decisions.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'If paid is at least SHARE, print Paid in full. Then, for everyone, print Checked',
        starter: 'SHARE = 30000\npaid = 30000\n',
        solution: 'SHARE = 30000\npaid = 30000\nif paid >= SHARE:\n    print("Paid in full")\nprint("Checked")\n',
        hint: 'An indented print inside the if, an unindented one after.',
        checks: [{ message: 'Print Paid in full then Checked', outputEquals: 'Paid in full\nChecked' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(25 >= 25)',
        language: 'python',
        options: [
          { text: 'False', why: '>= includes equal.' },
          { text: 'True' },
          { text: '25', why: 'Comparisons give True or False.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'day = 26, PAY_DAY = 25. True or False?',
        groups: ['True', 'False'],
        items: [
          { text: 'day > PAY_DAY', group: 0 },
          { text: 'day == PAY_DAY', group: 1 },
          { text: 'day != PAY_DAY', group: 0 },
          { text: 'day <= PAY_DAY', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a mistake?',
        language: 'python',
        lines: ['if paid = 30000:', '    print("Exact")', 'print("Done")'],
        bug: 0,
        fix: 'if paid == 30000:',
        explanation: 'In a condition, compare with ==. A single = there is a SyntaxError.',
      },
      {
        kind: 'writeCode',
        prompt: 'If paid is less than SHARE, print Short by and the difference',
        starter: 'SHARE = 30000\npaid = 25000\n',
        solution: 'SHARE = 30000\npaid = 25000\nif paid < SHARE:\n    print(f"Short by {SHARE - paid}")\n',
        hint: 'if paid < SHARE: then an f-string with SHARE - paid.',
        checks: [{ message: 'Print Short by 5000', outputEquals: 'Short by 5000' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the operator to its meaning.',
        pairs: [
          ['>', 'More than'],
          ['<=', 'At most'],
          ['!=', 'Different from'],
          ['==', 'The same as'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'paid = 0. What does this print?',
        code: 'if paid > 0:\n    print("Something paid")\n    print("Thanks")\nprint("Next")',
        language: 'python',
        options: [
          { text: 'Thanks then Next', why: 'Both indented lines are skipped.' },
          { text: 'Something paid, Thanks, Next', why: '0 > 0 is False.' },
          { text: 'Next' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Late if paid after the 25th.',
        language: 'python',
        template: 'if day [[1]] PAY_DAY[[2]]\n    print("Late")',
        blanks: [['>'], [':']],
        distractors: ['>=', ';'],
      },
      {
        kind: 'writeCode',
        prompt: 'Store whether the payment is late in a variable called late, then print it',
        starter: 'PAY_DAY = 25\nday = 24\n',
        solution: 'PAY_DAY = 25\nday = 24\nlate = day > PAY_DAY\nprint(late)\n',
        hint: 'late = day > PAY_DAY',
        checks: [
          { message: 'Print False', outputEquals: 'False' },
          { message: 'Store it in late', expr: 'late is False' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Your tracker says nothing when someone hasn\'t paid. Is that OK?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Not really: silence looks like a bug. Next lesson I\'ll add else, so it always says something.' },
          { text: 'Yes, silence is fine.', why: 'Tunde would ask why it said nothing.' },
          { text: 'I\'ll print an error.', why: 'Not paying yet isn\'t an error; it\'s an answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the late check.',
        language: 'python',
        lines: ['PAY_DAY = 25', 'day = 27', 'if day > PAY_DAY:', '    print("Late")', 'print("Checked")'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What type does 5 > 3 give? (four letters)',
        answers: ['bool', "<class 'bool'>"],
        placeholder: 'Type',
      },
    ],
  },
  reflect: {
    prompt: 'Tunde asked "and if I hadn\'t paid?". Why is it important that a program always says something, even "no"?',
    starters: ['If it says nothing...', 'People would...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4. 30000 - 25000 = 5000; 25 >= 25 is True; 24 > 25 is False.',
};

export default lesson;
