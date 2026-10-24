import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Step-by-step: market risk. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'When everything falls at once',
  summary: 'Some risks belong to one company. Market risk belongs to everyone. Step by step, how a bad year spreads across a whole market, and what that means for anyone holding shares.',
  minutes: 11,
  outcomes: [
    'Explain market risk in plain words',
    'Tell market risk from risk in one company',
    'Know why spreading out reduces some risks but not all',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'How a bad year spreads',
      steps: [
        { title: '1. Something big happens', body: 'A global shock: a pandemic, a financial crisis, a war, a sudden jump in interest rates.' },
        { title: '2. Businesses expect less', body: 'People spend less. Companies expect lower profits. Many cut plans.' },
        { title: '3. Prices fall across the board', body: 'Shares in most companies fall together, good ones included. That\'s market risk: the risk you can\'t escape just by picking better companies.' },
        { title: '4. Fear makes it worse', body: 'People sell because others are selling. Prices can fall further than the news alone would justify.' },
        { title: '5. Usually, eventually, recovery', body: 'In the past, broad markets have usually recovered over time, sometimes in months, sometimes in years. That\'s history, not a promise.' },
        { title: '6. What this means', body: 'Spreading across many companies protects you from one company failing. It doesn\'t stop the whole market falling. That\'s why time horizon matters so much: money for next year shouldn\'t be exposed to market risk.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Market risk: everything falls together in a bad year. Spreading out can\'t remove it. Only time, and not needing the money soon, makes it bearable.',
    },
  ],
  apply: {
    scenario: 'A bad year.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order how a bad year spreads.',
        lines: ['A big shock', 'Businesses expect less', 'Prices fall across the board', 'Fear makes it worse', 'Usually, eventually, recovery'],
      },
      {
        kind: 'mcq',
        prompt: 'What is market risk?',
        options: [
          { text: 'The risk one company fails', why: 'That\'s company-specific risk.' },
          { text: 'The risk that most investments fall together in a bad period' },
          { text: 'The risk of a market stall closing', why: 'It\'s financial markets.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Market risk, or one-company risk?',
        groups: ['Market risk', 'One-company risk'],
        items: [
          { text: 'A global financial crisis', group: 0 },
          { text: 'One company\'s boss commits fraud', group: 1 },
          { text: 'Interest rates jump everywhere', group: 0 },
          { text: 'One company\'s product fails', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'I\'ll just pick the good companies so I don\'t get hit.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'In a bad year, good companies fall too. Picking well helps with company risk, not market risk.' },
          { text: 'Great plan, no risk.', why: 'Market risk hits good companies too.' },
          { text: 'Pick bad ones instead.', why: 'Not the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What spreading does.',
        template: 'Spreading out protects against one [[1]] failing, not the whole [[2]] falling.',
        blanks: [['company'], ['market']],
        distractors: ['bank', 'salary'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to what happens.',
        pairs: [
          ['Shock', 'A crisis or sudden change'],
          ['Fear', 'Selling because others sell'],
          ['Recovery', 'Usually, in time; not promised'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Market risk affects most shares at once.',
          'Broad markets have usually recovered over time.',
          'Recovery always happens within a year.',
        ],
        bug: 2,
        fix: 'Recovery can take months or years.',
        explanation: 'Some recoveries have taken many years.',
      },
      {
        kind: 'mcq',
        prompt: 'Why shouldn\'t money for next year be exposed to market risk?',
        options: [
          { text: 'Markets close next year', why: 'It\'s about time to recover.' },
          { text: 'A bad year could hit just when you need it, with no time to recover' },
          { text: 'It should be', why: 'Short-term money needs safety.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A spread of shares worth ₹5,00,000 falls 30% in a crisis. Value after the fall?',
        answers: ['350000', '3,50,000', '350,000', '₹3,50,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What makes market risk bearable?',
        options: [
          { text: 'Picking better companies', why: 'Good companies fall too.' },
          { text: 'Checking prices often', why: 'That adds stress, not protection.' },
          { text: 'Time, and not needing the money soon' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Do you remember a time when "everything" seemed to fall at once, like 2020? How did people around you react?',
    starters: ['I remember...', 'People...'],
  },
  deepen: {
    title: 'Systematic vs specific risk',
    summary: 'Economists call market risk "systematic" (it hits the whole system) and one-company risk "specific" or "unsystematic". Diversification reduces specific risk a lot, but systematic risk remains.',
  },
  notes: 'Standard systematic/unsystematic framing. Recovery statements hedged. 5,00,000 × 0.7 = 3,50,000.',
};

export default lesson;
