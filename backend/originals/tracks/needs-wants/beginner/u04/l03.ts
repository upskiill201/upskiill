import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Step-by-step: the 10/10/10 test. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The 10/10/10 test',
  summary: 'How will you feel about a decision in 10 minutes, 10 months and 10 years? Lucía uses this test for every big choice. Step by step, Ada runs it on the car.',
  minutes: 11,
  outcomes: [
    'Use the 10/10/10 test on a big decision',
    'Balance how you\'ll feel now against later',
    'Spot when a choice only feels good in the short term',
  ],
  learn: [
    {
      kind: 'steps',
      title: '10/10/10 on the car',
      steps: [
        { title: '1. Write the choice', body: '"Buy Emeka-Obi\'s car for ₦150,000 a month for 24 months."' },
        { title: '2. In 10 minutes?', body: 'Thrilled. Air conditioning, no bus, her teenage dream. Maybe a little nervous.' },
        { title: '3. In 10 months?', body: 'Mexico City missed. Savings at zero. Probably one big repair bill. Traffic is still traffic. The thrill has faded (the treadmill).' },
        { title: '4. In 10 years?', body: 'She won\'t remember this particular car. She would remember Mexico City, and the career it might have opened.' },
        { title: '5. Compare the three', body: 'Great now, worse in 10 months, neutral or worse in 10 years. That pattern usually means "not now".' },
        { title: '6. Run it on the other option', body: 'Saying no: a bit disappointed in 10 minutes. Glad in 10 months (Mexico). Grateful in 10 years. That pattern usually means "good choice".' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'How will I feel in 10 minutes, 10 months, 10 years? If it\'s only good now, it\'s probably not the choice. Run it on both options.',
    },
  ],
  apply: {
    scenario: 'The 10/10/10 test.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the 10/10/10 test.',
        lines: ['Write the choice', 'Imagine 10 minutes later', 'Imagine 10 months later', 'Imagine 10 years later', 'Compare, and run it on the other option'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Buying the car: match each time to how Ada would feel.',
        pairs: [
          ['10 minutes', 'Thrilled'],
          ['10 months', 'Missed Mexico, savings at zero'],
          ['10 years', 'Won\'t remember this car'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Great now, worse in 10 months, neutral in 10 years. What does that pattern suggest?',
        options: [
          { text: 'Definitely buy', why: 'Only the first feeling is good.' },
          { text: 'It doesn\'t tell you anything', why: 'It shows the short-term pull.' },
          { text: 'Probably "not now"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Saying no to the car: how does it feel at each point?',
        groups: ['A bit disappointed', 'Glad or grateful'],
        items: [
          { text: '10 minutes later', group: 0 },
          { text: '10 months later, in Mexico', group: 1 },
          { text: '10 years later', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'In 10 minutes I\'d be so happy with the car, though.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Then do it.', why: 'Only the shortest view says yes.' },
          { text: 'Ten minutes counts, but it\'s one of three. What about you in 10 months, sitting in traffic with no savings?' },
          { text: 'Feelings don\'t matter.', why: 'They matter, at all three times.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test.',
        template: '10 [[1]], 10 [[2]], 10 [[3]].',
        blanks: [['minutes'], ['months'], ['years']],
        distractors: ['days', 'weeks'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step did Ada skip in her first attempt?',
        lines: [
          'Car in 10 minutes: thrilled.',
          'Car in 10 months: fine, probably.',
          'Car in 10 years: whatever.',
        ],
        bug: 1,
        fix: 'Car in 10 months: Mexico missed, savings at zero, a repair bill.',
        explanation: '"Fine, probably" skips the actual thinking. Be specific.',
      },
      {
        kind: 'mcq',
        prompt: 'Why run the test on the other option too?',
        options: [
          { text: 'To feel worse', why: 'It\'s to compare fairly.' },
          { text: 'No need', why: 'Both options deserve the test.' },
          { text: 'To compare: saying no has its own feelings at each time' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many time points does the 10/10/10 test use? (A number.)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which decision is the 10/10/10 test best for?',
        options: [
          { text: 'Big choices: a car, a move, a trip, a job' },
          { text: 'Which bread to buy', why: 'Too small to need it.' },
          { text: 'Nothing; it\'s a gimmick', why: 'It\'s a useful way to balance short and long term.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Run 10/10/10 on a decision you\'re facing. What does each time say?',
    starters: ['In 10 minutes...', 'In 10 months...', 'In 10 years...'],
  },
  deepen: {
    title: 'Where it comes from',
    summary: 'The 10/10/10 test was popularised by writer Suzy Welch in her book 10-10-10 (2009). It\'s a simple way to balance present bias, the pull of "now" you met in How to Save Money on a Low Income.',
  },
  notes: 'Welch, S. (2009). 10-10-10: A Life-Transforming Idea. Connects to present bias (Laibson 1997).',
};

export default lesson;
