import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: variables, names, changing values, types. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: boxes with labels',
  summary: "The tracker has no more 20000s typed out: just members, share and pot. Bisi checks the maths on her phone and nods. Quick check before Ada's next feature.",
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Store, name and change variables without notes', 'Tell text from numbers'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, lunch',
      beats: [
        { speaker: 'narrator', text: 'Ada shows Bisi the new tracker. Three variables at the top: members, share, pot.' },
        { speaker: 'ada', text: 'If the share changes again, I change one line.' },
        { speaker: 'narrator', text: 'Bisi does the sum on her phone calculator. 11 times 25000. 275000. She nods.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: variables.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Store members = 11 and share = 25000, then print the pot',
        starter: '',
        solution: 'members = 11\nshare = 25000\nprint(members * share)\n',
        hint: 'Two variables, then print(members * share).',
        checks: [
          { message: 'Print 275000', outputEquals: '275000' },
          { message: 'Make members and share', expr: 'members == 11 and share == 25000' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'pot = 100\npot = pot + 50\nprint(pot)',
        language: 'python',
        options: [
          { text: '100', why: 'The second line changed pot.' },
          { text: '150' },
          { text: 'pot + 50', why: 'No quotes: Python works it out.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Allowed name, or not?',
        groups: ['Allowed', 'Not allowed'],
        items: [
          { text: 'next_member', group: 0 },
          { text: '1st_member', group: 1 },
          { text: 'pay-day', group: 1 },
          { text: 'share2', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line causes a NameError?',
        language: 'python',
        lines: ['members = 11', 'share = 25000', 'print(Members * share)'],
        bug: 2,
        fix: 'print(members * share)',
        explanation: 'Names are case-sensitive: Members is not members.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the value to its type.',
        pairs: [
          ['11', 'int'],
          ['2500.5', 'float'],
          ['"11"', 'str'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The share drops to 20000. Change share, then print the pot',
        starter: 'members = 11\nshare = 25000\n',
        solution: 'members = 11\nshare = 25000\nshare = 20000\nprint(members * share)\n',
        hint: 'share = 20000, then print(members * share).',
        checks: [
          { message: 'Print 220000', outputEquals: '220000' },
          { message: 'share is 20000 at the end', expr: 'share == 20000' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'share = "5"\nprint(share * 3)',
        language: 'python',
        options: [
          { text: '15', why: '"5" is text, so * repeats it.' },
          { text: 'An error', why: 'Text times a whole number repeats it.' },
          { text: '555' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Add one member to the current count.',
        language: 'python',
        template: 'members = members [[1]] 1',
        blanks: [['+']],
        distractors: ['=', '*'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines so the pot prints after Bisi joins.',
        language: 'python',
        lines: ['members = 10', 'share = 25000', 'members = members + 1', 'print(members * share)'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Quick quiz: is 25000 the same as "25000" to Python?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'No. 25000 is an int you can do maths with; "25000" is a str, just text.' },
          { text: 'Yes, it\'s the same number.', why: 'One is a number, one is text.' },
          { text: 'Only on Mondays.', why: 'Types never change by themselves.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that stores the group name as text.',
        language: 'python',
        tiles: ['group', '=', '"OFFICE AJO"'],
        distractors: ['OFFICE AJO', '=='],
      },
      {
        kind: 'typeAnswer',
        prompt: 'members = 10, then members = 12. What does print(members) show?',
        answers: ['12'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Which idea from this week clicked fastest, and which one still feels strange?',
    starters: ['It clicked when...', 'Still strange:'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4. 11 * 25000 = 275000; 11 * 20000 = 220000.',
};

export default lesson;
