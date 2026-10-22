import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Kavya\'s Tuesday',
  summary: 'The day after her ten coins fell together, Kavya asks Arjun to explain "real" diversification. Check what you know about bets, layers, correlation and fees.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain diversification and correlation', 'Weigh fees over time'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday',
      beats: [
        { speaker: 'kavya', text: 'Ten coins, one Tuesday, all red. Okay. Teach me the real thing.' },
        { speaker: 'arjun', text: 'Different things that move differently. And cheap.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: spreading risk.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Really spread, or not?',
        groups: ['Really spread', 'Not really'],
        items: [
          { text: 'Hundreds of companies across industries, plus bonds', group: 0 },
          { text: 'Ten coins', group: 1 },
          { text: 'Five tech stocks', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Diversification', 'Spreading so no single failure sinks you'],
          ['Correlation', 'How much things move together'],
          ['Expense ratio', 'Yearly cost of running a fund'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What risk remains even with a perfect spread?',
        options: [
          { text: 'One-company risk', why: 'Spreading removes most of that.' },
          { text: 'None', why: 'Market risk remains.' },
          { text: 'Market risk' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: '₹2,00,000 with a 1.5% yearly fee. First year\'s fee?',
        answers: ['3000', '3,000', '₹3,000', '₹3000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'So should I sell all my crypto?',
        prompt: 'Arjun\'s honest, non-advice reply?',
        options: [
          { text: 'That\'s your call. But anything that swings that much should be a small slice you could lose, not your whole plan.' },
          { text: 'Yes, today.', why: 'He doesn\'t give specific advice.' },
          { text: 'Buy more coins.', why: 'More concentration.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea.',
        template: 'Different things that move [[1]], at a low [[2]].',
        blanks: [['differently'], ['cost', 'fee']],
        distractors: ['together', 'speed'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Fees come out in good years and bad.',
          'Correlations can rise in a crisis.',
          'Owning ten coins is as diversified as owning hundreds of companies.',
        ],
        bug: 2,
        fix: 'Ten coins that move together are close to one basket.',
        explanation: 'Correlation matters more than count.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: which pot should never face big market risk?',
        options: [
          { text: 'The 30-year pot', why: 'That one can.' },
          { text: 'All of them should', why: 'Near-term pots stay safe.' },
          { text: 'The emergency fund' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: tolerance or capacity, which do you follow?',
        options: [
          { text: 'Always tolerance', why: 'Capacity may be lower.' },
          { text: 'Whichever is lower' },
          { text: 'Always capacity', why: 'Tolerance may be lower.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Review, Chapter 2: order the five kinds of risk as taught.',
        lines: ['Market', 'Inflation', 'Liquidity', 'Concentration', 'Fraud'],
      },
    ],
  },
  reflect: {
    prompt: 'Explain diversification in one sentence to a friend.',
    starters: ['Diversification is...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1–4 with Chapter 2 and 3 review.',
};

export default lesson;
