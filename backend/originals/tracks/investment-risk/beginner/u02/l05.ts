import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the lawyer\'s call',
  summary: 'The lawyer calls back: the plot\'s title is disputed between three brothers. The "two other buyers" never existed. Check what you know about concentration, market, inflation and liquidity risk.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Name the kinds of risk in a real decision', 'Explain the risk of doing nothing'],
  learn: [
    {
      kind: 'story',
      title: 'The call',
      beats: [
        { speaker: 'narrator', text: 'The lawyer: "Three brothers claim this land. Anyone who bought it would be in court for years."' },
        { speaker: 'arjun', text: 'A ₹50,000 token would have bought me a lawsuit.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: kinds of risk.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each risk to its meaning.',
        pairs: [
          ['Market risk', 'Everything falls together'],
          ['Inflation risk', 'Money buys less over time'],
          ['Liquidity risk', 'Can\'t get cash out when needed'],
          ['Concentration risk', 'Too much in one place'],
          ['Fraud risk', 'It isn\'t what it claims to be'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which risk did the lawyer\'s call reveal?',
        options: [
          { text: 'Fraud or title risk' },
          { text: 'Inflation risk', why: 'It was about ownership.' },
          { text: 'Market risk', why: 'It was about this plot\'s papers.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Can spreading out reduce it?',
        groups: ['Yes, a lot', 'Not really'],
        items: [
          { text: 'One company failing', group: 0 },
          { text: 'The whole market falling', group: 1 },
          { text: 'Too much in one plot', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Savings 4%, inflation 7%. Real return, roughly, in percent?',
        answers: ['-3', '−3', '-3%', '−3%'],
        placeholder: 'A percent',
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'So the safest thing is to keep everything in cash forever.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, forever.', why: 'Inflation risk grows with time.' },
          { text: 'Cash is the riskiest thing.', why: 'Not for short-term money.' },
          { text: 'Safe from falls, not from inflation. Cash is right for short-term money, not for 30 years.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Forced sales.',
        template: 'Forced sales are usually [[1]] sales.',
        blanks: [['cheap']],
        distractors: ['fast', 'fair'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Good companies can fall in a bad year.',
          'Land can be hard to sell quickly.',
          'Doing nothing with money has no risk.',
        ],
        bug: 2,
        fix: 'Doing nothing has inflation risk.',
        explanation: 'Buying power shrinks when prices rise faster than interest.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: up 20%, then down 20%. Where are you?',
        options: [
          { text: 'Even', why: '1.2 × 0.8 = 0.96.' },
          { text: 'Down 4%' },
          { text: 'Up 4%', why: 'Down, not up.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what does "guaranteed high return" usually mean?',
        options: [
          { text: 'Hidden risk, or a scam' },
          { text: 'A great deal', why: 'High return requires risk.' },
          { text: 'A government scheme', why: 'Not by itself.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Review, Chapter 1: order the three questions.',
        lines: ['How far could it fall?', 'Could it go to zero?', 'How fast can I get my money out?'],
      },
    ],
  },
  reflect: {
    prompt: 'Which kind of risk had you never thought about before this chapter?',
    starters: ['I\'d never thought about...', 'Now I...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1–4 with Chapter 1 review. 1.2 × 0.8 = 0.96.',
};

export default lesson;
