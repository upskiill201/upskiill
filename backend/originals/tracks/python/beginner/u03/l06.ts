import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6 — Powers with **: squares, doubling, precedence, and why chain schemes don't add up. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Powers **',
  summary: 'Someone forwards the group a "savings chain": each member recruits 2 more, every month. Ada uses Python\'s power operator to see where it goes. Within about a year and a half it would need more people than live in Lagos.',
  minutes: 11,
  outcomes: [
    'Raise a number to a power with **',
    'Know ** is worked out before * and /',
    'See how fast doubling grows',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><code>**</code> means "to the power of". <code>2 ** 3</code> is 2 × 2 × 2 = <code>8</code>. <code>10 ** 2</code> is <code>100</code>, and <code>10 ** 6</code> is a million.</p><p><strong>** goes before * and /.</strong> <code>2 * 3 ** 2</code> is 2 × 9 = <code>18</code>, not 36. When in doubt, use brackets: <code>(2 * 3) ** 2</code> is 36.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>The chain.</strong> If 11 members each recruit 2 new people, and everyone recruits 2 more the next month, the group is multiplied by 3 every month: <code>11 * 3 ** months</code>. After 10 months that\'s <code>11 * 3 ** 10</code> = 649,539 people. A few months later it\'s millions. That\'s why schemes that need endless new members always collapse, and the last people in lose their money.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Where the chain goes',
      caption: 'Change months and watch it explode.',
      code: 'members = 11\nmonths = 10\n\nprint(2 ** 3)\nprint(2 * 3 ** 2)\nprint(f"After {months} months: {members * 3 ** months} people")\n',
      challenge: 'Try months = 15. How many people would the chain need?',
    },
  ],
  apply: {
    scenario: 'Checking the savings chain.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(3 ** 2)',
        language: 'python',
        options: [
          { text: '6', why: 'That\'s 3 * 2. ** means power.' },
          { text: '9' },
          { text: '32', why: 'It\'s maths, not joining digits.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print 2 to the power of 10',
        starter: '',
        solution: 'print(2 ** 10)\n',
        hint: 'print(2 ** 10)',
        checks: [
          { message: 'Print 1024', outputEquals: '1024' },
          { message: 'Use **', codeIncludes: '**' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(2 * 3 ** 2)',
        language: 'python',
        options: [
          { text: '36', why: '** goes first: 3 ** 2 = 9, then * 2.' },
          { text: '18' },
          { text: '12', why: 'Power, not multiply: 3 ** 2 is 9.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its value.',
        pairs: [
          ['10 ** 2', '100'],
          ['10 ** 3', '1000'],
          ['5 ** 2', '25'],
          ['2 ** 5', '32'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many people the chain needs after 6 months: members * 3 ** months',
        starter: 'members = 11\nmonths = 6\n',
        solution: 'members = 11\nmonths = 6\nprint(members * 3 ** months)\n',
        hint: 'members * 3 ** months',
        checks: [
          { message: 'Print 8019', outputEquals: '8019' },
          { message: 'Use the variables', codeIncludes: '3 ** months' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which is bigger?',
        groups: ['Bigger', 'Smaller'],
        items: [
          { text: '2 ** 10', group: 0 },
          { text: '10 * 2', group: 1 },
          { text: '3 ** 4', group: 0 },
          { text: '4 * 3', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada wants (2 times 3) squared, 36. Which line gives 18?',
        language: 'python',
        lines: ['print((2 * 3) ** 2)', 'print(2 * 3 ** 2)', 'print(6 ** 2)'],
        bug: 1,
        fix: 'print((2 * 3) ** 2)',
        explanation: '** goes before *, so only the 3 is squared.',
      },
      {
        kind: 'fillBlank',
        prompt: 'One million, written as a power of 10.',
        language: 'python',
        template: 'million = 10 [[1]] 6',
        blanks: [['**']],
        distractors: ['*', '^'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'The chain message says "everyone wins". Python says it needs 649,539 people in 10 months.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Join early, then.', why: 'Early people are paid with the later people\'s losses.' },
          { text: 'Python must be wrong.', why: 'The maths is simple and right.' },
          { text: 'Exactly. Growth by powers runs out of people fast, and the last ones in lose. Don\'t join.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(10 ** 3) show?',
        answers: ['1000', '1,000'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Things that grow by powers surprise people. Where else have you seen something double again and again (a rumour, a debt, a video)?',
    starters: ['I saw...', 'It grew like...'],
  },
  deepen: {
    title: 'Python loves big numbers',
    summary: 'Python ints have no size limit. Try print(2 ** 100): every digit comes out exactly.',
  },
  notes: 'Power operator ** binds more tightly than unary minus and * / (Python Language Reference §6.5, §6.17). 11 * 3 ** 10 = 649539; 11 * 3 ** 6 = 8019; 2 ** 10 = 1024. Pyramid/chain schemes need exponential recruitment and collapse (e.g. US SEC investor alert "Pyramid Schemes"). Lagos population in the millions (over 15 million by most estimates), far above 649,539 but the chain passes it within a few more months (11 * 3**14 ≈ 52.6 million).',
};

export default lesson;
