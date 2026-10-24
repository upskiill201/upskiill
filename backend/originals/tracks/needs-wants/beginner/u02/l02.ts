import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Step-by-step: the four questions for any cost. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Four questions for any cost',
  summary: 'The need–want line helps. But for tricky costs like rides, Ada needs a sharper tool. Four questions, step by step, that tell you how much of a cost is really a need.',
  minutes: 11,
  outcomes: [
    'Use four questions to test any cost',
    'Find the "need part" of a mixed cost',
    'Turn the answer into a new amount',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Testing Ada\'s rides',
      steps: [
        { title: '1. How often do I truly need it?', body: 'Not "how often do I use it", but "how often would things go wrong without it?" Ada: late nights after 9 p.m. (about 6 a month) and heavy rain (about 4). Ten rides, not thirty.' },
        { title: '2. What\'s the basic alternative?', body: 'For the other 20 trips: the bus and keke. Slower and more crowded, but safe in daylight and dry weather.' },
        { title: '3. What happens if I use the alternative?', body: 'About 25 minutes longer each way. She can listen to design podcasts. Nothing breaks.' },
        { title: '4. How much joy does the upgrade bring?', body: 'Some, on bad days. On ordinary sunny mornings, honestly, not much: she\'s on her phone either way.' },
        { title: 'Put it together', body: 'Rides on 10 trips (late nights and rain), bus on the rest. Transport goes from ₦75,000 to about ₦55,000. The "need part" of the upgrade stays; the rest goes.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'How often do I truly need it? What\'s the basic alternative? What happens if I use it? How much joy does the upgrade bring? Keep the need part.',
    },
  ],
  apply: {
    scenario: 'Testing Ada\'s costs.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the four questions.',
        lines: ['How often do I truly need it?', 'What\'s the basic alternative?', 'What happens if I use it?', 'How much joy does the upgrade bring?'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Late nights 6 rides + heavy rain 4 rides. How many rides a month does Ada truly need?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Transport goes from ₦75,000 to about ₦55,000. How much is saved?',
        answers: ['20000', '20,000', '₦20,000', '₦20000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why keep rides for late nights?',
        options: [
          { text: 'Rides are cheaper at night', why: 'It\'s about safety, not price.' },
          { text: 'She shouldn\'t', why: 'Late-night safety matters.' },
          { text: 'Safety is a must-have; that part of the upgrade is a real need' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ada\'s trips: ride or bus?',
        groups: ['Ride', 'Bus'],
        items: [
          { text: 'Leaving work at 10 p.m.', group: 0 },
          { text: 'A sunny Tuesday morning', group: 1 },
          { text: 'Heavy rain and flooding', group: 0 },
          { text: 'Saturday art class at 11 a.m.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'The bus adds 25 minutes. That\'s 25 minutes of my life!',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Time doesn\'t matter.', why: 'Time matters. The question is what it\'s worth.' },
          { text: 'True. Is that worth ₦1,000 a trip to you on an ordinary morning? Podcasts on the bus might make the 25 minutes useful.' },
          { text: 'Then ride every day.', why: 'Then the ₦130,000 gap stays.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal of the four questions.',
        template: 'Keep the [[1]] part; let the rest [[2]].',
        blanks: [['need'], ['go']],
        distractors: ['want', 'grow'],
      },
      {
        kind: 'findBug',
        prompt: 'Which answer to the four questions is dishonest?',
        lines: [
          'I truly need rides on late nights and in heavy rain.',
          'The bus is fine in daylight.',
          'Every single ride gives me huge joy.',
        ],
        bug: 2,
        fix: 'Rides help on bad days; on ordinary mornings, not much.',
        explanation: 'Be honest about joy. On a sunny morning she\'s on her phone either way.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Apply the four questions to food. Match each answer.',
        pairs: [
          ['Truly need delivery', 'After 10 p.m. work nights'],
          ['Basic alternative', 'Cooking with Ngozi'],
          ['What happens', '30 minutes cooking'],
          ['Joy', 'High on Fridays, low on Mondays'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes the four questions better than "need or want?"',
        options: [
          { text: 'They find the part of a cost that\'s a need, instead of an all-or-nothing answer' },
          { text: 'They always say cut', why: 'They often keep part of it.' },
          { text: 'They\'re faster', why: 'They\'re more accurate.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Run the four questions on one of your mixed costs. What\'s the "need part", and how much could the rest save?',
    starters: ['Cost:...', 'Need part:...', 'Saving:...'],
  },
  deepen: {
    title: 'Safety is never a want',
    summary: 'If the basic alternative isn\'t safe, the upgrade is a need. Late-night travel, unsafe neighbourhoods, health conditions: these are good reasons to pay more. The four questions never ask you to trade safety for savings.',
  },
  notes: 'Ada transport (fictional): 10 needed rides; transport 75,000 → ~55,000 in Ch2 (further to 45,000 by Ch5 with trades). Ride vs bus difference ~₦1,000/trip.',
};

export default lesson;
