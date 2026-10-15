import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Step-by-step: make numbers people can feel (frequencies, per-day, familiar comparisons, rounding). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Make numbers people can feel',
  summary: 'Arjun\'s report says the crash cost "₹1.84 million in gross merchandise value". Mr Rao nods politely. Tey: "Producer, that number is in a language nobody speaks. Let\'s translate it, step by step."',
  minutes: 11,
  outcomes: [
    'Turn percentages into "1 in X" frequencies',
    'Shrink big numbers to a day, a person or an hour',
    'Compare numbers to something your listener already knows',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Translate a number in four steps',
      steps: [
        {
          title: '1. Round it',
          body: '"₹1.84 million" becomes "almost two million rupees". "23.7%" becomes "about a quarter". Keep the exact figure in the written details; say the round one out loud.',
        },
        {
          title: '2. Make it "1 in X"',
          body: 'Many people find "1 in 4 customers" easier to picture than "25%". Research on risk communication suggests natural frequencies like this are often easier to understand than percentages.',
        },
        {
          title: '3. Shrink it to something human',
          body: 'Big totals are hard to feel. Divide them down: per hour, per day, per customer. "The crash cost about ₹300,000 an hour, for six hours."',
        },
        {
          title: '4. Compare it to something they know',
          body: 'Use your listener\'s world. For Mr Rao: "That\'s more than your whole Diwali advertising budget." Now the number has a face.',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'The same number, translated',
      before: {
        label: 'Arjun\'s report',
        text: 'The outage resulted in an estimated ₹1.84M loss in gross merchandise value, with a 23.7% checkout failure rate during peak.',
      },
      after: {
        label: 'Arjun on the phone',
        text: 'About one in four customers couldn\'t pay. For six hours, we lost around three lakh rupees every hour. That\'s more than your whole Diwali ad budget.',
      },
      notes: [
        'Rounded: "about one in four", "around three lakh".',
        'Shrunk: per hour, not one giant total.',
        'Compared: to a budget Mr Rao already knows by heart.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Round it. Make it "1 in X". Shrink it to an hour or a person. Compare it to their world.',
    },
  ],
  apply: {
    scenario: 'Tey FM. Number translation desk.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which is usually easiest for listeners to picture?',
        options: [
          { text: '"About 1 in 4 customers couldn\'t pay"' },
          { text: '"A 23.7% failure rate"', why: 'Accurate, but harder to picture.' },
          { text: '"0.237 probability of failure"', why: 'That\'s the hardest version of all.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the four translation steps in order.',
        lines: ['Round it', 'Make it "1 in X"', 'Shrink it to an hour, a day or a person', 'Compare it to something they know'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the raw number to its translation.',
        pairs: [
          ['25%', 'One in four'],
          ['₹1.8 million over six hours', 'About ₹300,000 an hour'],
          ['10% of users', 'One in ten'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Rounding feels wrong. 23.7% is the real number!',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Round to 50% to make it scarier.', why: 'That\'s not rounding, it\'s exaggerating.' },
          { text: 'Say "about one in four" out loud, and keep 23.7% in the written details. Both are honest.' },
          { text: 'Never use numbers at all.', why: 'Numbers build trust. Translate them, don\'t delete them.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A percentage written as "1 in 4" is called a natural ___. (one word)',
        answers: ['frequency', 'frequencies'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Raw, or translated?',
        groups: ['Raw', 'Translated'],
        items: [
          { text: '₹1.84M in gross merchandise value', group: 0 },
          { text: 'More than your Diwali ad budget', group: 1 },
          { text: '23.7% checkout failure rate', group: 0 },
          { text: 'About one in four customers couldn\'t pay', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why compare the loss to Mr Rao\'s ad budget specifically?',
        options: [
          { text: 'Ad budgets are always big', why: 'It works because it\'s his, not because it\'s big.' },
          { text: 'To blame the marketing team', why: 'No blame here, just scale.' },
          { text: 'It\'s a number from HIS world, so he instantly feels the size of it' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s spoken update. Which line isn\'t translated?',
        lines: [
          'About one in four customers couldn\'t pay.',
          'Gross merchandise value variance was negative 1.84 million.',
          'That\'s more than your whole Diwali ad budget.',
        ],
        bug: 1,
        fix: 'We lost around three lakh rupees every hour for six hours.',
        explanation: 'Finance-speak in the middle of a plain update. Shrink it to an hour.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Story first', 'Then the number'],
          ['Three things', 'Not twelve'],
          ['"What is it LIKE?"', 'Finds a comparison'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s translation.',
        template: 'About one in [[1]] customers couldn\'t pay. We lost around three lakh rupees every [[2]]. That\'s more than your Diwali ad [[3]].',
        blanks: [['four'], ['hour'], ['budget']],
        distractors: ['percent', 'quarter'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a number people can feel.',
        tiles: ['One', 'in', 'four', 'customers', 'couldn\'t', 'pay.'],
        distractors: ['23.7%', 'variance'],
      },
    ],
  },
  reflect: {
    prompt: 'Find a number you\'ve used recently (a price, a score, a result). Translate it: round it, "1 in X" it, shrink it, or compare it.',
    starters: ['The raw number: ...', 'Translated: ...'],
  },
  deepen: {
    title: 'The per-day trick',
    summary: 'Next time you mention a big yearly number (a cost, a saving, a total), divide it by 365 too. "₹36,500 a year" becomes "about ₹100 a day". Notice which version gets a reaction.',
  },
  notes: 'Natural frequencies vs percentages: Gigerenzer & Hoffrage (1995) and later risk-communication work (stated with "suggests", "often"). Rounding, per-unit framing and familiar comparisons are standard data-storytelling advice. 1 lakh = 100,000 rupees; ₹1.84M / 6h ≈ ₹307,000/h ("around three lakh"). Figures are fictional.',
};

export default lesson;
