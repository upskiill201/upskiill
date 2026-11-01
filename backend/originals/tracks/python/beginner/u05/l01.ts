import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1 — True and False: the bool type, the answer to every yes/no question. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'True and False',
  summary: 'Tunde messages Ada at 11 p.m.: "Have I paid?" The tracker can print names and receipts, but it can\'t answer a yes/no question. Every decision starts with two special values.',
  minutes: 10,
  outcomes: [
    'Know Python\'s two truth values, True and False',
    'See that comparisons give back True or False',
    'Store a yes/no answer in a variable',
  ],
  learn: [
    {
      kind: 'story',
      title: '11 p.m., a message from Tunde',
      beats: [
        { speaker: 'narrator', text: 'Tunde: "Have I paid for April? Yes or no." Ada opens the tracker. It shows his receipt, but she still has to read it and decide.' },
        { speaker: 'ada', text: 'I want the tracker to answer that itself.' },
        { speaker: 'arjun', text: '(next morning) Then it needs to work with yes and no. Python calls them True and False, with capitals, no quotes. Every comparison you\'ve written already gives one.' },
      ],
      choice: {
        prompt: 'What should "has Tunde paid?" be stored as?',
        options: [
          {
            text: 'True or False: tunde_paid = True.',
            outcome: 'A real yes/no value. Next lesson, the tracker works it out by itself from the amount.',
            best: true,
          },
          {
            text: 'The text "yes".',
            outcome: '"yes", "Yes", "YES", "y"... the three-Tundes problem all over again.',
          },
          {
            text: 'The number 1.',
            outcome: 'It sort of works, but nobody reading the code knows 1 means "paid".',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><code>True</code> and <code>False</code> are the two values of the <strong>bool</strong> type (named after the mathematician George Boole). They\'re written with a capital letter and no quotes.</p><p>You\'ve been making them already: <code>30000 == 30000</code> is <code>True</code>, and <code>"Tunde" == "tunde"</code> is <code>False</code>. A comparison is a question, and its answer is a bool.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Yes/no values',
      caption: 'A stored bool and a worked-out one.',
      code: 'tunde_paid = True\nprint(tunde_paid)\nprint(type(tunde_paid))\n\npaid = 30000\nprint(paid == 30000)\n',
      challenge: 'Try typing true with a small t. Read the error.',
    },
  ],
  apply: {
    scenario: 'Answering Tunde\'s question.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(30000 == 30000)',
        language: 'python',
        options: [
          { text: '30000', why: '== asks a question; the answer is True or False.' },
          { text: 'True' },
          { text: 'Yes', why: 'Python says True, not Yes.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Store True in a variable called tunde_paid and print it',
        starter: '',
        solution: 'tunde_paid = True\nprint(tunde_paid)\n',
        hint: 'tunde_paid = True (capital T, no quotes)',
        checks: [
          { message: 'Print True', outputEquals: 'True' },
          { message: 'Store a real bool', expr: 'tunde_paid is True' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A real bool, or not?',
        groups: ['bool', 'Not a bool'],
        items: [
          { text: 'True', group: 0 },
          { text: '"True"', group: 1 },
          { text: 'False', group: 0 },
          { text: 'true', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(type(False))',
        language: 'python',
        options: [
          { text: "<class 'str'>", why: 'No quotes: it\'s a bool.' },
          { text: 'False', why: 'type() shows the type.' },
          { text: "<class 'bool'>" },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print whether Bisi paid the full share: paid == SHARE',
        starter: 'SHARE = 30000\npaid = 30000\n',
        solution: 'SHARE = 30000\npaid = 30000\nprint(paid == SHARE)\n',
        hint: 'print(paid == SHARE)',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is a NameError?',
        language: 'python',
        lines: ['paid = True', 'late = False', 'done = true'],
        bug: 2,
        fix: 'done = True',
        explanation: 'Capitals matter: true (small t) isn\'t a Python word, so Python looks for a variable called true.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the comparison to its answer.',
        pairs: [
          ['30000 == 30000', 'True'],
          ['"Ada" == "ada"', 'False'],
          ['len("Ada") == 3', 'True, length 3'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why not store "yes" and "no" as text?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Text can be typed a hundred ways. True and False are exactly two values, and if can use them directly (lesson 3).' },
          { text: 'Text is slower.', why: 'It\'s about clarity and correctness, not speed.' },
          { text: 'Either is fine.', why: 'Remember the three Tundes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Python\'s two truth values are [[1]] and [[2]].',
        template: 'Python\'s two truth values are [[1]] and [[2]].',
        blanks: [['True'], ['False']],
        distractors: ['Yes', 'true'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(5 == 6) show?',
        answers: ['False'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Many everyday questions are really yes/no: paid? late? present? Which yes/no question do you answer most often at work or school?',
    starters: ['I keep answering...', 'It could be...'],
  },
  deepen: {
    title: 'George Boole',
    summary: 'In 1854 George Boole published The Laws of Thought, an algebra of true and false. Every computer decision today rests on it.',
  },
  notes: 'bool type with values True and False (Python docs, Built-in Types: Boolean). Named after George Boole, author of An Investigation of the Laws of Thought (1854). Comparisons return bool.',
};

export default lesson;
