import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: Ada's line v1. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ada\'s line v1: where the raise went',
  summary: 'Ada draws her first line: every spending category placed from must-have to want, with the creep marked in red. Tap through it.',
  minutes: 11,
  outcomes: [
    'Read a need–want line',
    'See the basic version and the extra for each cost',
    'Draw your own line',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s line v1 (month 3 after the raise)',
      text: 'MUST-HAVE: Food (basic: cooking) ₦70,000. Transport (basic: bus and keke) ₦40,000. Utilities and data ₦35,000. Family support to Mum ₦40,000. SHOULD-HAVE: Phone (her old one worked). Weekend art class ₦15,000. NICE-TO-HAVE: Rides on top of the bus ₦35,000. WANT: Food delivery on top of cooking ₦25,000. New phone instalment ₦20,000. Gym, 2 visits ₦12,000. Extra subscriptions ₦8,000. SAVING: ₦20,000 (was ₦60,000). CREEP TOTAL: ₦100,000.',
      hotspots: [
        { phrase: 'Food (basic: cooking) ₦70,000', note: 'The need is eating. The basic version costs about ₦70,000. Everything above it is in the want column.' },
        { phrase: 'Family support to Mum ₦40,000', note: 'A must-have for Ada: it\'s part of who she is. Needs aren\'t only about survival; they\'re about your real life.' },
        { phrase: 'Weekend art class ₦15,000', note: 'Ada calls this a should-have: it\'s how she grows as a designer. Not every upgrade is creep.' },
        { phrase: 'Rides on top of the bus ₦35,000', note: 'Nice-to-have. Some rides (late nights, heavy rain) are worth it. Every day isn\'t.' },
        { phrase: 'New phone instalment ₦20,000', note: 'A want: her old phone worked. It runs for 12 months whether she likes the phone or not.' },
        { phrase: 'Gym, 2 visits ₦12,000', note: '₦6,000 a visit. Exercise matters; this version of it isn\'t working.' },
        { phrase: 'CREEP TOTAL: ₦100,000', note: '35 + 25 + 20 + 12 + 8 = 100. The whole raise, plus ₦40,000 of what she used to save.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Your line is yours. Family support might be a must-have for you; a gym might be a must-have for someone else. Be honest about your life, not someone else\'s list.',
    },
  ],
  apply: {
    scenario: 'Reading Ada\'s line.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Add Ada\'s want column: 25,000 + 20,000 + 12,000 + 8,000.',
        answers: ['65000', '65,000', '₦65,000', '₦65000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is the art class a should-have, not creep?',
        options: [
          { text: 'It\'s cheap', why: 'Price isn\'t the test; value to her is.' },
          { text: 'It\'s required by her job', why: 'It\'s her choice, and an important one.' },
          { text: 'It\'s how Ada grows as a designer; it matters to her' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Where is each on Ada\'s line?',
        groups: ['Must-have', 'Nice-to-have', 'Want'],
        items: [
          { text: 'Family support to Mum', group: 0 },
          { text: 'Rides on top of the bus', group: 1 },
          { text: 'New phone instalment', group: 2 },
          { text: 'Basic food', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its amount.',
        pairs: [
          ['Rides on top', '₦35,000'],
          ['Delivery on top', '₦25,000'],
          ['Phone instalment', '₦20,000'],
          ['Gym', '₦12,000'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Is it okay that family support is a must-have? It\'s not survival.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Yes. Needs are about your real life, not just survival. Supporting your mum matters to you. Put it where it belongs.' },
          { text: 'No, cut it.', why: 'It\'s one of her deepest values.' },
          { text: 'It\'s a want.', why: 'For Ada, it\'s a must-have.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The creep total.',
        template: 'Rides [[1]] + delivery 25 + phone 20 + gym 12 + subscriptions 8 = [[2]] thousand.',
        blanks: [['35'], ['100']],
        distractors: ['45', '60'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of Ada\'s line is misplaced?',
        lines: [
          'Must-have: basic food ₦70,000.',
          'Must-have: gym ₦12,000.',
          'Nice-to-have: rides on top ₦35,000.',
        ],
        bug: 1,
        fix: 'Want: gym ₦12,000 (2 visits).',
        explanation: 'A gym used twice a month isn\'t a must-have.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Ada cut every "want" line, how much would she save each month?',
        answers: ['65000', '65,000', '₦65,000', '₦65000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Should Ada cut every want?',
        options: [
          { text: 'Yes, all of them', why: 'Zero wants is how plans break.' },
          { text: 'No, keep them all', why: 'Some clearly aren\'t worth it to her.' },
          { text: 'Not necessarily: she\'ll choose which wants matter to her (Chapter 3)' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to draw your own line.',
        lines: ['List every spending category', 'Find the basic version of each need', 'Place the basic part', 'Place the extra on top', 'Add up the creep'],
      },
    ],
  },
  reflect: {
    prompt: 'Draw your own line: must-have, should-have, nice-to-have, want. Which column surprises you most?',
    starters: ['Must-have:...', 'Want:...', 'The surprise:...'],
  },
  deepen: {
    title: 'Revisit the line',
    summary: 'Ada\'s line v1 is a snapshot. Over the next four chapters it changes as she decides what she values and what she\'ll cut. Draw yours today, and redraw it after the course.',
  },
  notes: 'Ada\'s line v1 (fictional, monthly ₦). Family support ₦40,000 and art class ₦15,000 are new detail consistent with Ada\'s character; utilities/data ₦35,000.',
};

export default lesson;
