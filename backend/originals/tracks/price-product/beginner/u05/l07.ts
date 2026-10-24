import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Myth or Fact: reviewing prices regularly. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Review your prices regularly',
  summary: 'In December the moto-taxis go up to 350 a ride. Suddenly the hill fee barely covers the run. Clinton thought prices were "done". Fact or myth: is a price ever finished?',
  minutes: 11,
  outcomes: [
    'Know why prices need regular reviews',
    'Spot when a cost change eats a margin',
    'Set a simple review routine',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Once you set a good price, you never need to change it.',
          isFact: false,
          explain: 'Myth. Costs move. When rides went from 300 to 350, the hill run went from 1,200 to 1,400: about 467 a bag on a shared run. The 500 hill fee now leaves only about 33.',
        },
        {
          text: 'A small cost rise can wipe out most of a fee\'s margin.',
          isFact: true,
          explain: 'Fact. A 50 FCFA rise per ride, four rides a run, cut the hill margin from about 100 a bag to about 33.',
        },
        {
          text: 'Prices should only ever go up.',
          isFact: false,
          explain: 'Myth. In the dry season fewer students need help. Clinton could try a lower Saver, but at 1,200 it would earn only 75 a bag. Reviews can lower prices too, if the numbers still work.',
        },
        {
          text: 'A fixed review date stops you changing prices in a panic.',
          isFact: true,
          explain: 'Fact. Clinton now reviews every three months, with the numbers, instead of reacting to one angry message.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Put a price review in your calendar every three months. Check costs, margins and customers, then decide calmly.',
    },
  ],
  apply: {
    scenario: 'The moto-taxi rise.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'A good price never needs changing', group: 0 },
          { text: 'A small cost rise can eat a margin', group: 1 },
          { text: 'Prices should only go up', group: 0 },
          { text: 'A fixed review date prevents panic', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A hill run is four rides. At 350 a ride, what does a run cost, in FCFA?',
        answers: ['1400', '1,400'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'A run of 1,400 shared by 3 bags. About how much is that per bag?',
        options: [
          { text: 'About 400 FCFA', why: 'That was at 1,200 a run.' },
          { text: 'About 467 FCFA' },
          { text: 'About 700 FCFA', why: 'That would be 2 bags.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The hill fee is 500. The run now costs about 467 a bag. About how much is left per bag, in FCFA?',
        answers: ['33', '34'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I just raised prices in November. I can\'t raise the hill fee again already.',
        prompt: "David's best reply?",
        options: [
          { text: 'Don\'t rush it. Write it down for the February review, with the numbers. If rides stay at 350, explain it then.' },
          { text: 'Raise it tonight, without notice.', why: 'Rises need notice and a reason.' },
          { text: 'Never change it.', why: 'Then the hill run slowly loses money.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the review finding to a sensible action.',
        pairs: [
          ['Ride costs rose', 'Check the hill fee at the review'],
          ['Dry season is slow', 'Test a lower Saver only if it still earns'],
          ['A regular left over price', 'Ask why, and offer what fits'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A 1,200 dry-season Saver would earn 75 a bag. Why is that risky?',
        options: [
          { text: 'It earns too much', why: '75 is very thin.' },
          { text: 'It barely covers costs, so one bad week turns it into a loss' },
          { text: 'It isn\'t risky', why: 'A thin margin has no room for surprises.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The review routine.',
        template: 'Every three [[1]], check costs, [[2]] and customers.',
        blanks: [['months'], ['margins']],
        distractors: ['days', 'logos'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s review plan is a problem?',
        lines: [
          'Review every three months: February, May, August.',
          'Check ride costs, washer rates and fees.',
          'Change prices whenever someone complains.',
          'Give customers two weeks\' notice of any rise.',
        ],
        bug: 2,
        fix: 'Note complaints and look at them at the review.',
        explanation: 'Reacting to every message means prices change in a panic.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a price review.',
        lines: ['Update every cost', 'Recalculate margins', 'Look at customers and complaints', 'Decide what to change', 'Give notice before changing'],
      },
    ],
  },
  reflect: {
    prompt: 'When did you last check your costs? Which one could rise without you noticing?',
    starters: ['I last checked...', 'A cost that could creep up is...'],
  },
  deepen: {
    title: 'Inflation and small prices',
    summary: 'When everyday costs rise across the economy, small businesses that never review their prices slowly earn less each month without changing anything. A regular review catches it early.',
  },
  notes: 'Fictional: rides 300 → 350; hill run 1,200 → 1,400 (4 rides); ~467 a bag on a 3-bag shared run; 500 fee leaves ~33. Dry-season Saver 1,200 would earn 75 (cost 1,125). Reviews every three months.',
};

export default lesson;
