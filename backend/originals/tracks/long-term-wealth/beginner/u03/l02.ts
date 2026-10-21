import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Step-by-step: compounding. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Interest on interest',
  summary: 'Compounding is the reason starting early matters so much. Step by step, Folake shows Miracle how ₦100,000 grows when the growth itself starts growing.',
  minutes: 11,
  outcomes: [
    'Explain compounding in plain words',
    'Work out a few years of compound growth',
    'See why time matters more than the starting amount',
  ],
  learn: [
    {
      kind: 'steps',
      title: '₦100,000, growing at an example 10% a year',
      steps: [
        { title: 'Year 1', body: '₦100,000 grows by 10%: ₦10,000. Total: ₦110,000.' },
        { title: 'Year 2', body: 'Now 10% of ₦110,000: ₦11,000. Total: ₦121,000. The extra ₦1,000 is growth on last year\'s growth. That\'s compounding.' },
        { title: 'Year 3', body: '10% of ₦121,000: ₦12,100. Total: ₦133,100. The yearly growth keeps getting bigger.' },
        { title: 'Year 10', body: 'About ₦259,000. More than two and a half times the start, without adding anything.' },
        { title: 'Year 30', body: 'About ₦1,745,000. More than seventeen times. Most of that came in the later years, from growth on growth.' },
        { title: 'The lesson', body: 'Compounding is slow at first and powerful later. The longer money is left, the more of it comes from growth, not from what you put in. (10% is an example to show the idea, not a promise.)' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Compounding: growth on top of growth. Slow at first, powerful later. Time is its fuel, which is why starting early matters so much.',
    },
  ],
  apply: {
    scenario: 'Watching ₦100,000 grow.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₦100,000 grows 10% in year 1. What\'s the total?',
        answers: ['110000', '110,000', '₦110,000', '₦110000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: '₦110,000 grows 10% in year 2. What\'s the total?',
        answers: ['121000', '121,000', '₦121,000', '₦121000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'In year 2, why is the growth ₦11,000 and not ₦10,000?',
        options: [
          { text: 'It\'s 10% of ₦110,000: growth on last year\'s growth' },
          { text: 'The rate went up', why: 'Same 10%.' },
          { text: 'A bonus', why: 'It\'s compounding.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the totals from smallest to largest.',
        lines: ['Year 1: ₦110,000', 'Year 2: ₦121,000', 'Year 3: ₦133,100', 'Year 10: about ₦259,000', 'Year 30: about ₦1,745,000'],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'In year 1 it\'s only ₦10,000. That\'s nothing.',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'It looks like nothing at first. That\'s why most people give up early. The magic is in years 10 to 30.' },
          { text: 'You\'re right, don\'t bother.', why: 'The early years set up the later ones.' },
          { text: 'Take it out and spend it.', why: 'That stops the compounding.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Compounding.',
        template: 'Growth on top of [[1]]. Slow at first, [[2]] later.',
        blanks: [['growth'], ['powerful']],
        distractors: ['debt', 'weak'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps compounding, or stops it?',
        groups: ['Helps', 'Stops it'],
        items: [
          { text: 'Leaving money invested for decades', group: 0 },
          { text: 'Taking money out every few months', group: 1 },
          { text: 'Starting early', group: 0 },
          { text: 'Waiting until 45 to start', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement about the example is wrong?',
        lines: [
          'The 10% is an example to show the idea.',
          'Real returns go up and down.',
          '10% a year is guaranteed.',
        ],
        bug: 2,
        fix: 'No rate is guaranteed; the example shows how compounding works.',
        explanation: 'Investments can fall as well as rise.',
      },
      {
        kind: 'mcq',
        prompt: 'After 30 years, about how much of the ₦1,745,000 came from growth, not from the ₦100,000 put in?',
        options: [
          { text: 'About ₦1,645,000' },
          { text: 'About ₦100,000', why: 'That\'s what was put in.' },
          { text: 'About ₦745,000', why: '1,745,000 − 100,000 = 1,645,000.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each year to its approximate total.',
        pairs: [
          ['Year 3', '₦133,100'],
          ['Year 10', 'About ₦259,000'],
          ['Year 30', 'About ₦1,745,000'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you left a small amount growing for 30 years, how old would you be when it finished? What might it be for?',
    starters: ['I\'d be...', 'It could be for...'],
  },
  deepen: {
    title: 'The eighth wonder?',
    summary: 'A famous quote calling compound interest "the eighth wonder of the world" is often credited to Albert Einstein, but there\'s no good evidence he said it. The idea is real even if the quote isn\'t.',
  },
  notes: '100,000 × 1.1^n: n=10 → 259,374; n=30 → 1,744,940. Example rate only. Einstein misattribution: widely documented by quote investigators.',
};

export default lesson;
