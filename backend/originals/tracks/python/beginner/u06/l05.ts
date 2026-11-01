import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: making lists, indexing, len(), changing items. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: twelve in one',
  summary: 'All twelve members live in one list now. The pot counts itself, and Ngozi\'s new name took one line. Quick check before the list starts to grow and shrink.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Make, read and change lists without notes', 'Count a list with len()'],
  learn: [
    {
      kind: 'story',
      title: 'The new top of the file',
      beats: [
        { speaker: 'narrator', text: 'Ada deletes eleven member variables and the MEMBERS constant. In their place: one list, twelve names.' },
        { speaker: 'narrator', text: 'The pot line now reads len(members) * SHARE. It prints 360,000 without anyone typing 12.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: lists.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the number of members, then the last member, on two lines',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf"]\nprint(len(members))\nprint(members[-1])\n',
        hint: 'len(members), then members[-1].',
        checks: [{ message: 'Print 6 then Yusuf', outputEquals: '6\nYusuf' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]\nprint(members[2])',
        language: 'python',
        options: [
          { text: 'Bisi' },
          { text: 'Tunde', why: '[2] is the third item.' },
          { text: 'Kemi', why: 'That\'s [3] or [-1].' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'members has 5 items. Works, or IndexError?',
        groups: ['Works', 'IndexError'],
        items: [
          { text: 'members[4]', group: 0 },
          { text: 'members[5]', group: 1 },
          { text: 'members[-1]', group: 0 },
          { text: 'members[len(members)]', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Change Tunde (position 1) to "Tunde Bakare" and print the list',
        starter: 'members = ["Ada", "Tunde", "Bisi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\nmembers[1] = "Tunde Bakare"\nprint(members)\n',
        hint: 'members[1] = "Tunde Bakare"',
        checks: [{ message: "Print ['Ada', 'Tunde Bakare', 'Bisi']", outputEquals: "['Ada', 'Tunde Bakare', 'Bisi']" }],
      },
      {
        kind: 'matchPairs',
        prompt: 'members = ["Ada", "Tunde", "Bisi"]. Match the code to the result.',
        pairs: [
          ['len(members)', '3'],
          ['members[0]', 'Ada'],
          ['members[-1]', 'Bisi'],
          ['type(members)', "<class 'list'>"],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives an out-of-date pot after a member joins?',
        language: 'python',
        lines: ['SHARE = 30000', 'pot = 11 * SHARE', 'print(f"Pot: {pot}")'],
        bug: 1,
        fix: 'pot = len(members) * SHARE',
        explanation: 'A typed 11 never changes. Count the list.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the pot from the list: len(members) * SHARE, with commas',
        starter: 'SHARE = 30000\nmembers = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf",\n           "Ifeoma", "Segun", "Amaka", "Dayo", "Tobi", "Chika"]\n',
        solution: 'SHARE = 30000\nmembers = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf",\n           "Ifeoma", "Segun", "Amaka", "Dayo", "Tobi", "Chika"]\nprint(f"{len(members) * SHARE:,}")\n',
        hint: 'f"{len(members) * SHARE:,}"',
        checks: [{ message: 'Print 360,000', outputEquals: '360,000' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Who collects in month 2?',
        language: 'python',
        template: 'print(members[[[1]]])',
        blanks: [['1']],
        distractors: ['2', '-2'],
      },
      {
        kind: 'mcq',
        prompt: 'Which one can you change with x[0] = ...?',
        options: [
          { text: 'A string', why: 'Strings are immutable: TypeError.' },
          { text: 'Both', why: 'Only lists are mutable.' },
          { text: 'A list' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'You deleted eleven variables. Any regrets?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'I miss member7.', why: 'members[6] is still there.' },
          { text: 'None. One list, twelve names, and the pot counts itself. Next I need people to join and leave.' },
          { text: 'Lists are slower.', why: 'For twelve names it makes no difference at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines.',
        language: 'python',
        lines: ['members = ["Ada", "Tunde", "Bisi"]', 'members[2] = "Bisi A."', 'print(len(members))', 'print(members)'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'members = ["Ada", "Tunde"]. What does print(len(members)) show?',
        answers: ['2'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Replacing eleven variables with one list made the code shorter AND safer. Where have you seen "fewer moving parts" make something more reliable?',
    starters: ['Fewer parts...', 'It was more reliable because...'],
  },
  notes: 'Checkpoint for Chapter 6 lessons 1-4. 12 x 30000 = 360000.',
};

export default lesson;
