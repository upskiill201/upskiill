import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: GH₵250 a month. Cliffhanger: two missed Sundays. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: GH₵250 a month',
  summary: 'Efua\'s cousin Abena, now at KNUST, wants to save GH₵1,000 for a phone. She asks Kofi to find GH₵250 a month in her spending. Use everything from Chapter 2. Then week 5 arrives, and Kofi forgets to move the money. Twice.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Find savings in someone else\'s real spending', 'Use leaks, subscriptions, fees, big lines and haggling together'],
  learn: [
    {
      kind: 'story',
      title: 'Abena\'s list',
      beats: [
        { speaker: 'narrator', text: 'Abena, Efua\'s cousin, is in her first month at KNUST. GH₵1,200 a month from her mum. She wants a GH₵1,000 phone in four months.' },
        { speaker: 'efua', text: 'She needs GH₵250 a month. Can you find it, Mr Leak Hunter?' },
        { speaker: 'kofi', text: 'Show me three months of history.' },
        { speaker: 'narrator', text: 'Two weeks later. Kofi\'s own jar. Week 5: he forgot to move the GH₵125 on Sunday. Week 6: a match ran late, and he forgot again.' },
        { speaker: 'kofi', text: 'I was going to do it Monday. Then Tuesday. Then the money was just... spending money.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: leaks vs choices, subscriptions, fees, big lines first, buying smart, and the hours behind every price. But finding money only works if it reaches the jar. Chapter 3: make it automatic.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: Abena\'s GH₵250 a month.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Abena\'s repeats. Leak or choice?',
        groups: ['Leak', 'Choice'],
        items: [
          { text: 'Two streaming apps, one never opened', group: 0 },
          { text: 'Weekly call home to her mum', group: 1 },
          { text: 'Daily cash-outs of GH₵20', group: 0 },
          { text: 'Sunday church contribution', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Abena cancels a GH₵30 app she never opens. Saving per month?',
        answers: ['30', 'GH₵30', '30 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Abena cashes out 25 times a month at about GH₵3 each. If she cashes out weekly instead (4 times), what does she save?',
        options: [
          { text: 'About GH₵63' },
          { text: 'About GH₵12', why: 'That\'s what 4 cash-outs cost. The saving is 21 × 3.' },
          { text: 'About GH₵75', why: '25 × 3 = 75 is the old total, not the saving.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Abena\'s biggest line is food out: GH₵500. What\'s the smartest first move there?',
        options: [
          { text: 'Cut food out to zero', why: 'Too much, too fast. It breaks.' },
          { text: 'Leave it; cut sweets instead', why: 'Big lines first: a small cut there beats cutting every sweet.' },
          { text: 'A 15 to 20% cut: cook with her hall mates three nights a week' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 20% cut on her GH₵500 food line saves how much?',
        answers: ['100', 'GH₵100', '100 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'App GH₵30 + fees GH₵63 + food GH₵100. What more does she need to reach GH₵250? (250 − 193)',
        answers: ['57', 'GH₵57', '57 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the remaining GH₵57 ideas to their Chapter 2 tool.',
        pairs: [
          ['Shared market trips: GH₵35', 'Buying together'],
          ['Filter bottle instead of sachets: GH₵25', 'Big lines and leaks'],
          ['Haggling for her textbooks', 'Yaw\'s haggling school'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'Abena wants to cut her weekly call home to save data. Good idea?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Yes, every cedi counts.', why: 'Some cedis buy things that matter most.' },
          { text: 'No. That\'s a choice with real value, and it costs little over Wi-Fi. Keep it.' },
          { text: 'Only call once a month.', why: 'Why cut something so valuable and cheap?' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Abena\'s plan. Which step undoes all the work?',
        lines: [
          'Cancel the unused app.',
          'Cash out once a week.',
          'Leave the savings in my spending account and move them "when I remember".',
          'Cook with hall mates three nights a week.',
        ],
        bug: 2,
        fix: 'Move the savings to her phone fund the same day each week.',
        explanation: 'Found money that sits in a spending account gets spent. Kofi is about to learn this himself.',
      },
      {
        kind: 'mcq',
        prompt: 'GH₵1,000 phone at GH₵60 an hour for Abena\'s tutoring job. How many hours?',
        options: [
          { text: 'About 17 hours' },
          { text: 'About 60 hours', why: '1,000 ÷ 60 ≈ 16.7.' },
          { text: 'About 1.7 hours', why: 'Off by ten. 1,000 ÷ 60 ≈ 16.7.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the leak hunt you ran for Abena.',
        lines: ['Read three months of history', 'Sort leaks from choices', 'Cut subscriptions and fees', 'Trim the biggest line', 'Move the savings each week'],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi missed two Sundays. What\'s the real problem?',
        options: [
          { text: 'He\'s lazy', why: 'Everyone forgets. The system is the problem, not the person.' },
          { text: 'His saving depends on remembering, and remembering fails' },
          { text: 'The goal is too big', why: 'The goal is fine. The money just didn\'t move.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Do your savings rely on you remembering to move them? What happened the last time you forgot?',
    starters: ['My savings rely on...', 'Last time I forgot...'],
  },
  notes: 'Chapter 2 challenge. Abena (Efua\'s cousin, narrated, now at KNUST; introduced in Budgeting Ch3 L10). Her numbers fictional: app 30, fees 25 → 4 cash-outs (21 × 3 = 63), food 500 × 20% = 100; remaining 57 from shared trips 35 + filter 25 (= 60). Kofi misses weeks 5 and 6 transfers: jar still reaches ~1,350 by week 8 after he catches up (Ch3).',
};

export default lesson;
