import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: nesting, the fee rules, valid input, truthiness. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the whiteboard rules',
  summary: 'The tracker follows every rule on the whiteboard, refuses "thirty thousand" politely, and spots empty answers. Kemi tests all four rules and it passes. Quick check before Ada reads someone else\'s decisions.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Turn written rules into ordered conditions', 'Check input before using it'],
  learn: [
    {
      kind: 'story',
      title: 'Kemi\'s test',
      beats: [
        { speaker: 'narrator', text: 'Kemi tries a payment on the 25th, the 27th, the 30th and one on leave. No fee, ₦1,500, ₦3,000, no fee.' },
        { speaker: 'narrator', text: 'Then she types nothing at all. The tracker: "Please type the amount in numbers." Kemi nods slowly.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: rules and checks.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Apply the whiteboard rules for day = 26, not on leave, and print Fee: 1500',
        starter: 'SHARE = 30000\nday = 26\non_leave = False\n',
        solution: 'SHARE = 30000\nday = 26\non_leave = False\nif on_leave:\n    fee = 0\nelif day <= 25:\n    fee = 0\nelif day <= 28:\n    fee = SHARE * 5 // 100\nelse:\n    fee = SHARE * 10 // 100\nprint(f"Fee: {fee}")\n',
        hint: 'Leave first, then the days in order.',
        checks: [{ message: 'Print Fee: 1500', outputEquals: 'Fee: 1500' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'paid = 10000, day = 20. What does this print?',
        code: 'if paid >= 30000:\n    if day <= 25:\n        print("On time")\n    else:\n        print("Late")\nelse:\n    print("Short")',
        language: 'python',
        options: [
          { text: 'On time', why: 'The outer if is False, so the inner one never runs.' },
          { text: 'Late', why: 'The inner block is skipped.' },
          { text: 'Short' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Truthy or falsy?',
        groups: ['Truthy', 'Falsy'],
        items: [
          { text: '"0"', group: 0 },
          { text: '0', group: 1 },
          { text: '"".strip()', group: 1 },
          { text: '1500', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "Amount: ". If it\'s all digits, print Recorded and the number; otherwise print Numbers only',
        starter: '',
        solution: 'raw = input("Amount: ").strip()\nif raw.isdigit():\n    print(f"Recorded {int(raw)}")\nelse:\n    print("Numbers only")\n',
        hint: 'Check with .isdigit() before int().',
        stdin: ['30000'],
        checks: [{ message: 'Print Recorded 30000', outputIncludes: 'Recorded 30000' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line converts before checking?',
        language: 'python',
        lines: ['raw = input("Amount: ").strip()', 'amount = int(raw)', 'if raw.isdigit():', '    print(amount)'],
        bug: 1,
        fix: 'Move it inside the if',
        explanation: 'Bad input crashes int() before the check can help.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the whiteboard rule to its position in the chain.',
        pairs: [
          ['On leave: no fee', 'First: it overrides the rest'],
          ['By the 25th', 'Second'],
          ['26th to 28th', 'Third'],
          ['After the 28th', 'Last: the else'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("".isdigit())',
        language: 'python',
        options: [
          { text: 'True', why: 'The empty string needs at least one digit to be True.' },
          { text: 'False' },
          { text: 'An error', why: 'It\'s a normal string method.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Flatten the nested check: print Perfect if paid >= 30000 and day <= 25',
        starter: 'paid = 30000\nday = 22\n',
        solution: 'paid = 30000\nday = 22\nif paid >= 30000 and day <= 25:\n    print("Perfect")\n',
        hint: 'One if with and.',
        checks: [{ message: 'Print Perfect', outputEquals: 'Perfect' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Nobody typed anything.',
        language: 'python',
        template: 'if [[1]] raw:\n    print("Please type something")',
        blanks: [['not']],
        distractors: ['no', 'is'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Kemi tested four rules plus an empty answer. Was that enough?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Almost: I should also test the edges, the 25th, 28th and 29th exactly, where the rules change.' },
          { text: 'Yes, it passed.', why: 'Passing four cases doesn\'t mean the edges work.' },
          { text: 'Testing is Kemi\'s job.', why: 'It\'s everyone\'s job, especially the author\'s.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the safe check.',
        language: 'python',
        lines: ['raw = input("Amount: ").strip()', 'if not raw:', '    print("Please type something")', 'elif raw.isdigit():', '    print(int(raw))', 'else:', '    print("Numbers only")'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(bool("False")) show? (careful)',
        answers: ['True'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Kemi tested the tracker like an auditor. Who in your life checks your work that carefully, and what do they catch?',
    starters: ['The person who checks is...', 'They catch...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 11-14. bool("False") is True (non-empty string). "".isdigit() is False.',
};

export default lesson;
