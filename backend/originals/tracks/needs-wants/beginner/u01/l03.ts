import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Card deck: the need–want spectrum. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'It\'s not two boxes, it\'s a line',
  summary: '"Need" and "want" sound like two boxes. Real life is messier: a phone, a ride, a meal out can be any of the four places on a line. Four cards, and Ada places her spending on it.',
  minutes: 10,
  outcomes: [
    'Place spending on a four-point need–want line',
    'Find the "basic version" of each need',
    'See which part of a cost is the want on top',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>The line has four points:</strong></p><ol><li><strong>Must-have:</strong> without it, your health, safety, home or income is at risk. Food, rent, medicine, getting to work.</li><li><strong>Should-have:</strong> makes life work much better; going without is hard but possible. A working phone, internet for work, a reasonable commute.</li><li><strong>Nice-to-have:</strong> improves life, but you\'d manage fine without it. A ride instead of the bus on a dry day, a gym you use.</li><li><strong>Want:</strong> pure pleasure or comfort. Food delivery for fun, a second streaming app, the newest phone.</li></ol>',
    },
    {
      kind: 'text',
      html: '<p><strong>Most costs sit in more than one place.</strong> Ada\'s transport: getting to work is a <em>must-have</em>. The bus and keke cover it for about ₦40,000 a month. Rides every day cost ₦75,000. So ₦40,000 is a must-have; the other ₦35,000 is a nice-to-have on top.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>The basic version.</strong> For each must-have and should-have, ask: what\'s the simplest version that does the job? That\'s the part that really is a need. Everything above it is a choice. A good choice, maybe. But a choice.</p>',
    },
    {
      kind: 'check',
      question: 'Ada\'s ₦20,000-a-month phone instalment for a new phone, when her old one worked. Where on the line?',
      options: ['Must-have', 'Should-have', 'Want (her old phone already did the job)'],
      answer: 2,
      explanation: 'A working phone is a should-have. She already had one. The new one is a want.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Must-have, should-have, nice-to-have, want. Find the basic version of every need: anything above it is a choice.',
    },
  ],
  apply: {
    scenario: 'Placing Ada\'s spending on the line.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Where does each go?',
        groups: ['Must-have', 'Nice-to-have', 'Want'],
        items: [
          { text: 'Food for the month', group: 0 },
          { text: 'A ride on a rainy day', group: 1 },
          { text: 'A second streaming app', group: 2 },
          { text: 'Medicine', group: 0 },
          { text: 'Delivery when she could cook', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rides every day: ₦75,000. Bus and keke: ₦40,000. How much is the nice-to-have on top?',
        answers: ['35000', '35,000', '₦35,000', '₦35000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each need to its basic version.',
        pairs: [
          ['Getting to work', 'Bus and keke'],
          ['Eating', 'Cooking at home most days'],
          ['A phone for work', 'The phone she already had'],
          ['Exercise', 'Running with Ngozi on Saturdays'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "should-have" mean?',
        options: [
          { text: 'Life-or-death', why: 'That\'s must-have.' },
          { text: 'Makes life work much better; going without is hard but possible' },
          { text: 'Pure pleasure', why: 'That\'s want.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'But transport IS a need. I have to get to work.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Getting to work is a must-have. The bus does that for ₦40,000. Rides every day are the extra ₦35,000 on top: a choice.' },
          { text: 'Transport is a want.', why: 'Getting to work is a real need.' },
          { text: 'Then keep riding every day.', why: 'Only the basic version is the need.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The four points.',
        template: 'Must-have, [[1]]-have, [[2]]-to-have, want.',
        blanks: [['should'], ['nice']],
        distractors: ['could', 'never'],
      },
      {
        kind: 'findBug',
        prompt: 'Which item is placed wrongly?',
        lines: [
          'Must-have: rent.',
          'Should-have: internet for work.',
          'Must-have: the gym she visited twice this month.',
        ],
        bug: 2,
        fix: 'Nice-to-have (or want): the gym she rarely uses.',
        explanation: 'Exercise matters, but a gym she uses twice a month isn\'t a must-have.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do most costs sit in more than one place on the line?',
        options: [
          { text: 'Because prices change', why: 'It\'s about the version, not the price changing.' },
          { text: 'There\'s a basic version that\'s a need, and an upgrade on top that\'s a choice' },
          { text: 'They don\'t', why: 'Transport, food and phones all split.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s food: cooking at home would be about ₦70,000. She spends ₦95,000. How much is the "want on top"?',
        answers: ['25000', '25,000', '₦25,000', '₦25000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the line from most needed to least.',
        lines: ['Must-have', 'Should-have', 'Nice-to-have', 'Want'],
      },
    ],
  },
  reflect: {
    prompt: 'Take your three biggest costs. For each, what\'s the basic version, and how much is the part on top?',
    starters: ['Cost:...', 'Basic version:...', 'On top:...'],
  },
  deepen: {
    title: 'Your line is yours',
    summary: 'Where things go on the line depends on your life. A car is a must-have for someone in a town with no buses, and a want for someone next to a train line. Be honest about your situation, not someone else\'s list.',
  },
  notes: 'Four-point scale (must/should/nice/want) is a teaching device. Ada: transport basic 40,000 vs 75,000; food basic ~70,000 vs 95,000 (running numbers).',
};

export default lesson;
