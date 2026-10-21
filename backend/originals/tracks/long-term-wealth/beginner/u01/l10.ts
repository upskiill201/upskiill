import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: where do they stand? Cliffhanger: the pension statement. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: where do they stand?',
  summary: 'Halima asks Miracle to help her work out her net worth and long-term habits. Use everything from Chapter 1. Then Miracle downloads her full pension statement for the first time, and something is missing.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Work out someone else\'s net worth and habits', 'Use income vs wealth, net worth and starting early together'],
  learn: [
    {
      kind: 'story',
      title: 'The statement',
      beats: [
        { speaker: 'halima', text: 'You keep saying "net worth". I\'ve never done one. Will you help me?' },
        { speaker: 'miracle', text: 'Twenty minutes, and a cup of tea. Bring your banking apps.' },
        { speaker: 'narrator', text: 'That night, Miracle downloads her full pension statement: every month for three years.' },
        { speaker: 'narrator', text: 'She scrolls. Her own 8% every month. Afiya\'s 10% every month. Then, four months ago... only her 8%. Four months with no employer contribution at all.' },
        { speaker: 'miracle', text: 'Four months. That\'s money that should be growing. And I\'d never have known.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: income isn\'t wealth, net worth is the number, start early, the boring habits, and why "next year" happens. Chapter 2: pay future you first, starting with a missing pension payment. First, Halima.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: Halima, 27, Afiya Clinic Success. Savings ₦350,000. Pension ₦480,000. Owes ₦120,000 to her sister and ₦60,000 on pay-later. Saves "whatever is left".',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Halima\'s assets: savings ₦350,000 + pension ₦480,000. Total?',
        answers: ['830000', '830,000', '₦830,000', '₦830000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Her debts: ₦120,000 to her sister + ₦60,000 pay-later. What\'s the total?',
        options: [
          { text: '₦120,000', why: 'That leaves out the pay-later balance.' },
          { text: '₦180,000' },
          { text: '₦0: family loans don\'t count', why: 'Money owed to family is still a debt.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Net worth: ₦830,000 − ₦180,000?',
        answers: ['650000', '650,000', '₦650,000', '₦650000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Halima\'s items: asset or debt?',
        groups: ['Asset', 'Debt'],
        items: [
          { text: 'Pension ₦480,000', group: 0 },
          { text: 'Owed to her sister', group: 1 },
          { text: 'Savings ₦350,000', group: 0 },
          { text: 'Pay-later balance', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Halima saves "whatever is left". Which Chapter 1 idea is that?',
        options: [
          { text: 'A fragile habit with no system, like Dad\'s "next year"' },
          { text: 'Folake\'s method', why: 'Folake saved first, automatically.' },
          { text: 'A strong habit', why: '"Whatever\'s left" is usually little.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'My net worth is ₦650,000. Miracle\'s is way more. I\'m behind.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'It\'s a starting point, not a race. What matters is your direction from today. Let\'s automate your saving.' },
          { text: 'Yes, you\'re behind.', why: 'Comparing isn\'t helpful; direction is.' },
          { text: 'Stop tracking it.', why: 'Tracking is how it grows.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 1 idea to Halima\'s situation.',
        pairs: [
          ['Net worth', '₦650,000 today'],
          ['Fragile habit', 'Saving whatever is left'],
          ['Start early', 'She\'s 27: decades ahead'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What Miracle tells Halima.',
        template: 'Save [[1]], automatically, then [[2]] what\'s left.',
        blanks: [['first'], ['spend']],
        distractors: ['last', 'lend'],
      },
      {
        kind: 'findBug',
        prompt: 'Halima\'s first map. Which line isn\'t honest?',
        lines: [
          'Net worth: ₦650,000.',
          'Saving: whatever is left, usually little.',
          'Debts: none.',
        ],
        bug: 2,
        fix: 'Debts: ₦180,000 (sister and pay-later).',
        explanation: 'Family loans and pay-later are debts too.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does Halima\'s age matter so much?',
        options: [
          { text: 'At 27 she has over 30 years for money to grow' },
          { text: 'It doesn\'t', why: 'Time is the biggest lever.' },
          { text: 'She\'s too old to start', why: 'Not at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Miracle\'s pension: 8% from her and 10% from Afiya. What\'s the total percentage?',
        answers: ['18', '18%', '18 percent'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'Four months of employer contributions are missing. What does this show?',
        options: [
          { text: 'Checking your pension statement regularly matters' },
          { text: 'Pensions are scams', why: 'It\'s likely an error; checking catches it.' },
          { text: 'Nothing; ignore it', why: 'It\'s her money.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'When did you last check a pension or long-term savings statement? What would you look for?',
    starters: ['I last checked...', 'I\'d look for...'],
  },
  notes: 'Chapter 1 challenge. Halima per CAST (Afiya, ML lead). Halima numbers fictional. Pension: Nigeria\'s Contributory Pension Scheme minimum 8% employee + 10% employer (Pension Reform Act 2014). Cliffhanger: 4 months of missing employer contributions (payroll error, resolved in Ch2).',
};

export default lesson;
