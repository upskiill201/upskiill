import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Myth or Fact: sunk costs. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Sunk costs',
  summary: 'Clinton confesses something: he spent 15,000 FCFA on CampusEats flyers and a logo back in week one, and part of him still wants to "make it worth it". Fact or myth: should past spending decide what you do next?',
  minutes: 11,
  outcomes: [
    'Recognise the sunk-cost trap',
    'Decide using future costs and benefits only',
    'See why stopping or pivoting isn\'t failure',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Clinton should keep CampusEats going so the 15,000 FCFA isn\'t wasted.',
          isFact: false,
          explain: 'Myth. That money is spent either way. The only question is what happens next: more money into an idea that failed its test, or into one that\'s passing.',
        },
        {
          text: 'It\'s normal to feel pulled to keep going after you\'ve invested.',
          isFact: true,
          explain: 'Fact. Psychologists call it the sunk-cost effect. In a classic study, people kept going with options they\'d paid for, even when a better one was available.',
        },
        {
          text: 'Stopping an idea means you failed.',
          isFact: false,
          explain: 'Myth. Stopping CampusEats after one cheap test saved Clinton\'s savings and led him to WashDay. Failing would have been spending 350,000 FCFA on the wrong app.',
        },
        {
          text: 'Good decisions only look at what\'s ahead: future costs and future benefits.',
          isFact: true,
          explain: 'Fact. Ask: "Knowing what I know now, would I start this today?" If not, past spending isn\'t a reason to continue.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask: "Knowing what I know now, would I start this today?" Past spending can\'t change the answer.',
    },
  ],
  apply: {
    scenario: 'What\'s already spent.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a sunk cost?',
        options: [
          { text: 'A cost you can still avoid', why: 'That\'s a future cost.' },
          { text: 'Money or time already spent that you can\'t get back' },
          { text: 'A discount', why: 'It\'s spending that\'s gone.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Sunk cost or future cost?',
        groups: ['Sunk', 'Future'],
        items: [
          { text: '15,000 FCFA already spent on flyers', group: 0 },
          { text: 'The 350,000 FCFA app, if he orders it', group: 1 },
          { text: 'Hours already spent on interviews', group: 0 },
          { text: 'Paying a second washer next month', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I spent so much on the CampusEats logo. Maybe I should run both businesses?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'The logo money is gone either way. Would you start CampusEats today, knowing 1 in 10 paid? If not, put your time into WashDay.' },
          { text: 'Yes, don\'t waste the logo.', why: 'That\'s the sunk-cost trap.' },
          { text: 'Sell the logo first.', why: 'The decision doesn\'t depend on the logo.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the thought to what it is.',
        pairs: [
          ['"I\'ve spent too much to stop"', 'Sunk-cost trap'],
          ['"Would I start this today?"', 'Future-focused question'],
          ['"One cheap test saved my savings"', 'Stopping well'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The question.',
        template: 'Knowing what I know [[1]], would I [[2]] this today?',
        blanks: [['now'], ['start']],
        distractors: ['before', 'sell'],
      },
      {
        kind: 'mcq',
        prompt: 'Which choice saved Clinton the most money?',
        options: [
          { text: 'Buying CampusEats flyers', why: 'That was spent and gone.' },
          { text: 'Testing by hand instead of paying 350,000 FCFA for an app first' },
          { text: 'Running both ideas', why: 'He didn\'t; that would have split his time.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Clinton had paid for the app (350,000 FCFA) instead of the flyers (15,000 FCFA), how much more would he have spent, in FCFA?',
        answers: ['335000', '335,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s reasoning is the sunk-cost trap?',
        lines: [
          'CampusEats: 1 of 10 paid.',
          'WashDay: 54 paid bags, two-thirds return.',
          'Keep CampusEats because I spent 15,000 FCFA on it.',
          'Put next month\'s time into WashDay.',
        ],
        bug: 2,
        fix: 'Drop CampusEats: the evidence says it doesn\'t work.',
        explanation: 'Past spending isn\'t a reason to continue.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a sunk-cost-free decision.',
        lines: ['List what you\'ve already spent', 'Set it aside: it\'s gone either way', 'Look only at future costs and benefits', 'Ask "would I start this today?"'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Sound reason to continue, or sunk-cost thinking?',
        groups: ['Sound reason', 'Sunk-cost thinking'],
        items: [
          { text: 'Customers keep coming back', group: 0 },
          { text: 'I\'ve already printed the flyers', group: 1 },
          { text: 'Tests keep passing', group: 0 },
          { text: 'I told everyone I\'d do it', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there something you keep doing mainly because of what you\'ve already put in? Ask: would you start it today?',
    starters: ['I keep doing...', 'Would I start it today?...'],
  },
  deepen: {
    title: 'The classic study',
    summary: 'In Arkes and Blumer\'s experiments, people who\'d paid more for a ticket were more likely to use it, even when they preferred another option. Money spent pulls on future choices.',
  },
  notes: 'Sunk-cost effect: Arkes & Blumer (1985), Organizational Behavior and Human Decision Processes 35. Fictional: 15,000 FCFA CampusEats flyers and logo; 350,000 FCFA app quote not paid.',
};

export default lesson;
