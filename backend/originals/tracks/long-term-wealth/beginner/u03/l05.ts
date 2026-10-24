import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the whiteboard',
  summary: 'Miracle draws compounding on the office whiteboard for her team. Emmanuel finally gets it: "So my loan app doubles in four months?" Check what you know: plans vs tips, compounding, inflation and the rule of 72.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain compounding and real returns', 'Use the rule of 72'],
  learn: [
    {
      kind: 'story',
      title: 'Whiteboard',
      beats: [
        { speaker: 'emmanuel', text: 'Wait. So my loan app doubles in under four months?' },
        { speaker: 'miracle', text: 'And your savings, if you had any, would double in maybe fourteen years. Which one do you want working for you?' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: make time work.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₦200,000 at 10%. Total after one year?',
        answers: ['220000', '220,000', '₦220,000', '₦220000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Growth 6%, inflation 9%. Real return, roughly?',
        options: [
          { text: 'About −3%' },
          { text: 'About +6%', why: 'That\'s before inflation.' },
          { text: 'About +15%', why: 'Subtract, don\'t add.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At 12% a year, about how many years to double?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Plan or tip?',
        groups: ['Plan', 'Tip'],
        items: [
          { text: 'Spread out and long-term', group: 0 },
          { text: '"Sure thing, doubled in 3 months"', group: 1 },
          { text: 'Understand before investing', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Compounding', 'Growth on growth'],
          ['Inflation', 'Prices rising'],
          ['Real return', 'Growth after inflation'],
          ['Rule of 72', 'Quick doubling estimate'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Compounding is slow. I want fast money.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Then gamble.', why: 'Never good advice.' },
          { text: 'Slow at first, powerful later. "Fast money" usually means big risk or a scam. Time is the cheapest engine there is.' },
          { text: 'You\'re right, forget it.', why: 'Compounding is the point.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Where money goes.',
        template: 'Short-term money in [[1]]; long-term money needs [[2]] above inflation.',
        blanks: [['cash', 'savings'], ['growth']],
        distractors: ['debt', 'fees'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Compounding is slow at first.',
          'A 20%-a-month loan doubles in under 4 months.',
          'Inflation doesn\'t affect money in a bank.',
        ],
        bug: 2,
        fix: 'Inflation shrinks what money in a bank can buy.',
        explanation: 'If prices rise faster than the interest, buying power falls.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: why does the emergency fund come before investing?',
        options: [
          { text: 'It earns more', why: 'It\'s about protection.' },
          { text: 'It doesn\'t', why: 'Order matters.' },
          { text: 'So emergencies never force you to sell investments at a bad time' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: what share of each future raise does Miracle save?',
        options: [
          { text: 'All', why: 'Half, so the raise still feels like a raise.' },
          { text: 'Half' },
          { text: 'None', why: 'Half goes to long-term saving.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 1: start at 25 vs 35, saving the same. Roughly how many extra years of saving does the early starter get?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Explain compounding to someone in two sentences. Who will you explain it to?',
    starters: ['Compounding is...', 'I\'ll explain it to...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1–4 with Chapter 1 and 2 review.',
};

export default lesson;
