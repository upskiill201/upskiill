import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Before/After: concentration risk. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'One basket, ten baskets',
  summary: 'Kavya\'s plan: all ₹12 lakh (well, her own ₹2 lakh) in one coin. Arjun runs the same bad day two ways: everything in one thing, and the same money spread across ten.',
  minutes: 11,
  outcomes: [
    'Explain concentration risk',
    'Compare one big bet with a spread',
    'See why one bad result hurts so much more when concentrated',
  ],
  learn: [
    {
      kind: 'compare',
      title: '₹12 lakh, one bad result (example numbers)',
      before: {
        label: 'All in one thing',
        text: '₹12,00,000 in a single company, coin or plot\nIt halves in a bad month\nValue after: ₹6,00,000\nLoss: ₹6,00,000, half of everything\nTo recover: needs to double',
      },
      after: {
        label: 'Spread across ten different things',
        text: '₹1,20,000 in each of ten\nOne of them halves in the same bad month\nThat one is now ₹60,000\nValue after: ₹11,40,000\nLoss: ₹60,000, one-twentieth of everything',
      },
      notes: [
        'Same bad result, ten times smaller damage.',
        'The spread gives up the chance of one thing making you rich overnight. It also removes the chance of one thing ruining you.',
        'Spreading only helps if the ten things don\'t all fall for the same reason. Ten coins aren\'t really ten baskets.',
        'Concentration can be accidental: your job, your savings and your shares all in one company is one basket.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Concentration risk: too much in one place. Spreading across genuinely different things makes one bad result small instead of devastating.',
    },
  ],
  apply: {
    scenario: 'One basket or ten.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₹12,00,000 all in one thing halves. Value after?',
        answers: ['600000', '6,00,000', '600,000', '₹6,00,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Spread across ten: one ₹1,20,000 slice halves. Total value after?',
        answers: ['1140000', '11,40,000', '1,140,000', '₹11,40,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does spreading out give up?',
        options: [
          { text: 'All growth', why: 'A spread can still grow.' },
          { text: 'The chance of one thing making you rich overnight' },
          { text: 'Nothing at all', why: 'It gives up the overnight jackpot.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Genuinely spread, or concentrated in disguise?',
        groups: ['Genuinely spread', 'Concentrated in disguise'],
        items: [
          { text: 'Many companies in different industries', group: 0 },
          { text: 'Ten different crypto coins', group: 1 },
          { text: 'A mix of bonds and shares', group: 0 },
          { text: 'Job, savings and shares all in one employer', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'But if my one coin goes 10x, I\'m rich!',
        prompt: 'Arjun\'s honest reply?',
        options: [
          { text: 'It definitely will.', why: 'Nobody knows that.' },
          { text: 'It definitely won\'t.', why: 'Nobody knows that either.' },
          { text: 'It might. It might also go to zero. If you do it, use only money you could lose completely, not your safety net.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Concentration.',
        template: 'Spreading across [[1]] different things makes one bad result [[2]].',
        blanks: [['genuinely', 'truly'], ['small', 'smaller']],
        distractors: ['similar', 'bigger'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each setup to the damage from one halving.',
        pairs: [
          ['All in one', 'Lose half of everything'],
          ['Spread across ten', 'Lose a twentieth'],
          ['Ten things that fall together', 'Little protection'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which "spread" isn\'t really spread?',
        lines: [
          'Shares in many companies across industries.',
          'Some money in bonds, some in shares.',
          'Five different coins that all move with crypto prices.',
        ],
        bug: 2,
        fix: 'Spread across things that don\'t all fall together.',
        explanation: 'If they rise and fall together, they\'re one basket.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "job, savings and shares in one company" risky?',
        options: [
          { text: 'It isn\'t', why: 'It\'s one basket.' },
          { text: 'If the company struggles, you could lose your income and savings at once' },
          { text: 'Companies don\'t allow it', why: 'It\'s allowed; it\'s just concentrated.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Spread: loss of ₹60,000 out of ₹12,00,000. What fraction is that? (Write it like 1/20.)',
        answers: ['1/20', 'one twentieth', 'one-twentieth', '5%', '0.05'],
        placeholder: 'A fraction',
      },
    ],
  },
  reflect: {
    prompt: 'Is any part of your money life concentrated in one place without you meaning it to be?',
    starters: ['Concentrated in...', 'I could spread it by...'],
  },
  deepen: {
    title: 'Correlation',
    summary: 'Two investments are "correlated" if they tend to rise and fall together. Spreading works best across things with low correlation. Chapter 4 goes deeper.',
  },
  notes: 'Example numbers: 12L/2 = 6L; 9 × 1.2L + 0.6L = 11.4L. Kavya per CAST. No coins or companies named.',
};

export default lesson;
