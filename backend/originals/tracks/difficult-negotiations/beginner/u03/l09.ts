import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: deal sheet v3. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Deal sheet v3',
  summary: 'The deal sheet now has scope, phases, payment terms and a change process. Fourteen features became a plan. Tap each line.',
  minutes: 11,
  outcomes: [
    'Read a deal sheet with scope and terms',
    'Link each line to a lesson from this chapter',
    'Add scope and change rules to your own deal sheet',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun\'s deal sheet v3',
      text: 'Phase one (12 weeks): app, points, scan in shop, welcome reward. Phase two (priced later): gift cards, referrals, staff dashboard and the rest. Payment: 40% at start, 30% at midpoint demo, 30% at launch; not 120 days. Changes: £450 a day, approved by email before work starts, shared log. Price for phase one: still open; their £32,000 vs our £40,000.',
      hotspots: [
        { phrase: 'Phase one (12 weeks)', note: 'Lesson 4: she chose the four that matter for spring.' },
        { phrase: 'Phase two (priced later)', note: 'Lesson 2: yes-if, "if it goes in phase two".' },
        { phrase: 'not 120 days', note: 'Lesson 3: the positive no. Yes to paying the team, no to 120 days, yes to 40/30/30.' },
        { phrase: 'Changes: £450 a day', note: 'Lesson 8: every yes priced, nothing starts before approval.' },
        { phrase: 'Price for phase one: still open', note: 'Chapter 4: power and alternatives will decide this.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v3 adds scope, phases, payment terms and a change process. The price is still open.',
    },
  ],
  apply: {
    scenario: 'Deal sheet v3.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the lesson.',
        pairs: [
          ['Phase two', 'Yes-if'],
          ['Not 120 days', 'The positive no'],
          ['Four features', 'Trade-offs'],
          ['£450 a day', 'Change requests'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At £40,000, how much is the midpoint payment (30%), in pounds?',
        answers: ['12000', '12,000', '£12,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What is still open on v3?',
        options: [
          { text: 'The scope', why: 'Phase one scope is agreed.' },
          { text: 'The price for phase one' },
          { text: 'Payment terms', why: '40/30/30 is on the sheet.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Phase one or phase two?',
        groups: ['Phase one', 'Phase two'],
        items: [
          { text: 'Scan in shop', group: 0 },
          { text: 'Staff dashboard', group: 1 },
          { text: 'Welcome reward', group: 0 },
          { text: 'Gift cards', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Scope and terms are agreed. Can we just split the price at £36,000?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Not yet. £36,000 was our walk-away for the full app. Let\'s work out what phase one really costs first.' },
          { text: 'Yes, split it.', why: 'Check phase one costs first.' },
          { text: 'Demand £48,000 again.', why: 'Phase one is smaller than the full app.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Payment terms.',
        template: '[[1]]% at start, 30% at the midpoint, 30% at [[2]].',
        blanks: [['40'], ['launch']],
        distractors: ['10', 'never'],
      },
      {
        kind: 'mcq',
        prompt: 'Why write "and the rest" in phase two?',
        options: [
          { text: 'To be vague', why: 'It\'s explicit: they\'re out of phase one.' },
          { text: 'So every remaining feature has a clear home, not an open door into phase one' },
          { text: 'No reason', why: 'It prevents creep.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this deal sheet copy is wrong?',
        lines: [
          'Phase one: app, points, scan, welcome reward.',
          'Payment: 40/30/30.',
          'Changes: done for free if small.',
          'Price: still open.',
        ],
        bug: 2,
        fix: 'Changes: £450 a day, approved first.',
        explanation: '"Free if small" is how creep starts.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many features are in phase one, including the app?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the deal sheet v3 sections.',
        lines: ['Phase one scope', 'Phase two', 'Payment', 'Changes', 'Price'],
      },
    ],
  },
  reflect: {
    prompt: 'Add a scope, payment terms and a change rule to your own deal sheet.',
    starters: ['Scope:...', 'Changes:...'],
  },
  notes: 'Deal sheet v3 (fictional): phase one 12 weeks; 40/30/30 payments; £450/day change rate; price open (£32,000 offered vs £40,000 asked).',
};

export default lesson;
