import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or Fact: compounding and investing myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Fees, timing and other myths',
  summary: '"Fees are tiny, ignore them." "Wait for the perfect moment to start." "You need millions to invest." Five beliefs about growing money, tested.',
  minutes: 10,
  outcomes: [
    'See why fees matter over decades',
    'Understand why timing the market rarely works',
    'Know you can start small',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A 1% or 2% yearly fee is too small to matter.',
          isFact: false,
          explain: 'Myth. Fees compound too, against you. Over 30 years, an extra 2% a year in fees can take a large share of what your money would have grown to.',
        },
        {
          text: 'You need a lot of money to start long-term investing.',
          isFact: false,
          explain: 'Myth. Many pension schemes and funds accept small regular amounts. Starting small and early often beats starting big and late.',
        },
        {
          text: 'Trying to time the market (buy at the bottom, sell at the top) rarely works for most people.',
          isFact: true,
          explain: 'Fact. Studies of investor behaviour often find people who jump in and out earn less than the investments they hold, because they buy after rises and sell after falls.',
        },
        {
          text: 'Regular monthly investing smooths out the ups and downs.',
          isFact: true,
          explain: 'Fact. Investing the same amount every month means buying more when prices are low and less when they\'re high, without having to guess.',
        },
        {
          text: 'A good investment never goes down.',
          isFact: false,
          explain: 'Myth. Even good long-term investments have bad years. Anything promising it never goes down deserves suspicion.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Waiting',
      beats: [
        { speaker: 'chidi', text: 'I\'m waiting for the perfect moment to start investing.' },
        { speaker: 'folake', text: 'I waited for the perfect moment once. In 2004. It\'s still not here.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Watch fees, start small, invest regularly instead of timing, and expect bad years. Anything that "never goes down" is a red flag.',
    },
  ],
  apply: {
    scenario: 'Myths about growing money.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Small fees don\'t matter', group: 0 },
          { text: 'Timing the market rarely works', group: 1 },
          { text: 'You need millions to start', group: 0 },
          { text: 'Regular investing smooths ups and downs', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do fees matter so much over decades?',
        options: [
          { text: 'They compound against you, year after year' },
          { text: 'They don\'t', why: 'They compound too.' },
          { text: 'They\'re paid once', why: 'Most are yearly.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I\'ll wait until prices are at the bottom, then invest.',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'Nobody reliably knows where the bottom is. Investing a set amount monthly means you don\'t have to.' },
          { text: 'Smart, wait.', why: 'Waiting can last forever.' },
          { text: 'Put everything in today.', why: 'Regular amounts reduce the timing worry.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Regular investing.',
        template: 'The same amount every month buys more when prices are [[1]] and less when they\'re [[2]].',
        blanks: [['low'], ['high']],
        distractors: ['fixed', 'secret'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Fees are tiny"', 'They compound over decades'],
          ['"Wait for the perfect moment"', 'Start, then invest regularly'],
          ['"Never goes down"', 'A red flag'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which offer should worry Miracle?',
        lines: [
          'A fund that clearly lists a 0.5% yearly fee.',
          'A pension that accepts small monthly amounts.',
          'A scheme that "never goes down, 5% guaranteed every month".',
        ],
        bug: 2,
        fix: 'Walk away and check the regulator.',
        explanation: 'Real investments go up and down. Guaranteed high monthly returns are a classic scam sign.',
      },
      {
        kind: 'mcq',
        prompt: 'What do studies of investors who jump in and out often find?',
        options: [
          { text: 'They earn less than the investments they hold' },
          { text: 'They earn more', why: 'Usually less, due to timing mistakes.' },
          { text: 'No difference', why: 'Timing usually costs them.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Folake says she waited for the perfect moment in 2004. If it\'s now 2026, how many years ago was that?',
        answers: ['22', 'twenty-two'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order healthy long-term habits.',
        lines: ['Start small, now', 'Invest the same amount monthly', 'Keep fees low', 'Expect bad years and stay calm'],
      },
      {
        kind: 'mcq',
        prompt: 'A good long-term investment has a bad year. What does that mean?',
        options: [
          { text: 'It\'s normal; long-term investments go up and down' },
          { text: 'It\'s a scam', why: 'Bad years are normal.' },
          { text: 'Sell everything', why: 'Panic selling locks in losses.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Do you know the fees on any savings or pension you have? Where could you find them?',
    starters: ['My fees are...', 'I could find them...'],
  },
  deepen: {
    title: 'The behaviour gap',
    summary: 'Research firms that study investor behaviour have repeatedly found that the average investor earns less than the funds they invest in, largely because of buying after rises and selling after falls. The fix is boring: a steady monthly amount, left alone.',
  },
  notes: 'Fee drag: e.g. 2% extra over 30 years reduces terminal value substantially (≈ 45% at 7% gross); stated qualitatively. Behaviour gap: e.g. DALBAR QAIB, Morningstar "Mind the Gap"; stated qualitatively. Chidi per CAST. Year 2026 per current date.',
};

export default lesson;
