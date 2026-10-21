import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: handling family money requests. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'When family asks',
  summary: 'The freezer won\'t be the last request. School fees, a cousin\'s rent, an uncle\'s hospital bill. Step by step, here\'s how Ada handles family money requests without guilt or chaos.',
  minutes: 11,
  outcomes: [
    'Respond to family requests with a clear process',
    'Decide your share without draining your goals',
    'Set up a family line so help is planned',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Ada\'s family request process',
      steps: [
        { title: '1. Listen first', body: 'Understand what happened and what\'s needed. Don\'t promise anything in the first five minutes.' },
        { title: '2. Check: must-have or nice-to-have?', body: 'A freezer for Mum\'s shop: must-have, her income depends on it. A cousin\'s new phone: probably not Ada\'s to fund.' },
        { title: '3. Check who else can help', body: 'Siblings, other relatives, savings groups, the person\'s own savings. One person rarely needs to carry it alone.' },
        { title: '4. Decide your share', body: 'Based on what you can give without breaking your own must-haves or emergency fund. Say a clear number.' },
        { title: '5. Give from a planned line', body: 'Ada now keeps a "family line" of ₦20,000 a month on top of her regular support, building up for exactly these moments.' },
        { title: '6. Say it kindly and clearly', body: '"I can do ₦70,000 now. I love you and I want to help, and this is what I can give without wrecking my own plans."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Listen, check the need, check who else can help, decide your share, give from a planned line, and say it kindly. Love with a plan lasts longer.',
    },
  ],
  apply: {
    scenario: 'Family requests.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s process.',
        lines: ['Listen first', 'Check: must-have or nice-to-have?', 'Check who else can help', 'Decide your share', 'Give from a planned line', 'Say it kindly and clearly'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Must-have request, or nice-to-have?',
        groups: ['Must-have', 'Nice-to-have'],
        items: [
          { text: 'Mum\'s shop freezer', group: 0 },
          { text: 'A cousin\'s new phone', group: 1 },
          { text: 'An uncle\'s hospital bill', group: 0 },
          { text: 'A nephew\'s birthday party venue', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A family line of ₦20,000 a month. How much after 6 months?',
        answers: ['120000', '120,000', '₦120,000', '₦120000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why not promise anything in the first five minutes?',
        options: [
          { text: 'You need to understand the need and your options before deciding' },
          { text: 'To be rude', why: 'It\'s about deciding well.' },
          { text: 'Family should wait', why: 'It\'s minutes, not days.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'My cousin wants ₦100,000 for a new phone. I feel bad saying no.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Is it a must-have? If his phone works, it\'s a want. You can say "I can\'t this time" kindly, or give a small gift from your family line.' },
          { text: 'Give it; family first.', why: 'Family first doesn\'t mean funding every want.' },
          { text: 'Block him.', why: 'Too much. A kind no works.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The kind and clear line.',
        template: '"I can do ₦[[1]] now. I love you, and this is what I can give without [[2]] my own plans."',
        blanks: [['70,000', '70000'], ['wrecking', 'breaking']],
        distractors: ['200,000', 'making'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to why it helps.',
        pairs: [
          ['Check who else can help', 'One person rarely carries it alone'],
          ['Decide your share', 'Protects your must-haves'],
          ['Planned family line', 'Help without chaos'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step puts Ada at risk?',
        lines: [
          'Listen to what happened.',
          'Ask siblings to share.',
          'Give from my emergency fund for a cousin\'s party.',
        ],
        bug: 2,
        fix: 'Emergency fund for my own emergencies; a small gift from the family line if I choose.',
        explanation: 'A party isn\'t an emergency, and her fund protects her.',
      },
      {
        kind: 'mcq',
        prompt: 'What does a family line do?',
        options: [
          { text: 'Builds up money for family requests, so help is planned' },
          { text: 'Pays family monthly no matter what', why: 'It\'s a fund for requests, on top of regular support.' },
          { text: 'Nothing', why: 'It turns surprises into plans.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If the freezer request came after 6 months of the family line (₦120,000), how much would Ada still need to find for her ₦70,000 share?',
        answers: ['0', 'zero', 'nothing', '₦0'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What family requests come up for you? How much could a monthly family line be?',
    starters: ['Requests that come up:...', 'My family line could be...'],
  },
  deepen: {
    title: 'Talk about it before the crisis',
    summary: 'A calm family conversation about who helps with what, when nobody is in crisis, makes the hard moments easier. Some families keep a shared emergency pot that everyone adds to monthly.',
  },
  notes: 'Family line ₦20,000/month added after Mexico (not in the 6-month numbers; story frames it as the new plan going forward).',
};

export default lesson;
