import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: the jar v3, on autopilot. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The jar v3: on autopilot',
  summary: 'Week 8. Two weeks of automatic saving, the GH₵160 rescued, every pot named. Tap through the jar and the system behind it.',
  minutes: 11,
  outcomes: [
    'Read a tracker that shows a system, not just numbers',
    'See every protection layer in one place',
    'Draw your own system on one page',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The jar v3 (week 8)',
      text: 'LAPTOP FOR MY DEGREE: GH₵1,260 of GH₵3,500. EMERGENCY (health, safety, can\'t study without it): GH₵300. SYSTEM: GH₵230 on the 1st, automatic. GH₵70 every Sunday, scheduled. RULES: savings not linked to any spending app. 24-hour wait and tell Efua before any laptop withdrawal. REMINDER: Sunday 8 p.m. LOST TO LEAKS: GH₵90 in weeks 5 and 6. Never again. BY WEEK 16 AT GH₵125 A WEEK: GH₵2,260. GAP: GH₵1,240.',
      hotspots: [
        { phrase: 'GH₵1,260 of GH₵3,500', note: 'GH₵850 at week 4, plus the GH₵160 rescued in week 7, plus two automatic weeks at GH₵125.' },
        { phrase: 'EMERGENCY (health, safety, can\'t study without it): GH₵300', note: 'Named by its job. Separate, reachable within a day, never locked.' },
        { phrase: 'GH₵230 on the 1st, automatic', note: 'Pay yourself first: budget savings plus the phone and laptop line, gone before spending starts.' },
        { phrase: 'GH₵70 every Sunday, scheduled', note: 'The leak money, moved right after the weekly check. No memory needed.' },
        { phrase: '24-hour wait and tell Efua', note: 'Commitment devices: friction for impulses, a gentle social check, no shared PIN.' },
        { phrase: 'LOST TO LEAKS: GH₵90', note: 'Written on purpose. A reminder of why the system exists.' },
        { phrase: 'GAP: GH₵1,240', note: '1,260 + 8 weeks × 125 = 2,260. The system protects the rate. Chapter 5 must close the rest.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good tracker shows the system too: when money moves, the rules, and the reminder. Then anyone could see how it works.',
    },
  ],
  apply: {
    scenario: 'The jar at week 8.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'GH₵850 + GH₵160 + 2 × GH₵125. What\'s in the jar?',
        answers: ['1260', '1,260', 'GH₵1,260', 'GH₵1260'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: '8 more weeks at GH₵125 a week. How much will he add?',
        answers: ['1000', '1,000', 'GH₵1,000', 'GH₵1000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'GH₵1,260 + GH₵1,000 = GH₵2,260. What\'s the gap to GH₵3,500?',
        options: [
          { text: 'GH₵1,150', why: 'That was the week-4 projection, before GH₵90 leaked.' },
          { text: 'GH₵240', why: '3,500 − 2,260 = 1,240.' },
          { text: 'GH₵1,240' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the system to its lesson.',
        pairs: [
          ['GH₵230 on the 1st', 'Pay yourself first'],
          ['Not linked to spending apps', 'Out of sight, out of reach'],
          ['"Laptop for my degree"', 'Name the money'],
          ['24-hour wait', 'Tie your own hands'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the system, or just a number?',
        groups: ['System', 'Number'],
        items: [
          { text: 'Sunday 8 p.m. reminder', group: 0 },
          { text: 'GH₵1,260 in the jar', group: 1 },
          { text: 'Scheduled weekly transfer', group: 0 },
          { text: 'Gap: GH₵1,240', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'The gap went UP from GH₵1,150 to GH₵1,240. That\'s depressing.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, give up.', why: 'He\'s at GH₵1,260 from GH₵490. That\'s progress.' },
          { text: 'GH₵90 leaked, and you caught it. Now the system stops that happening again. Keep the rate, and Chapter 5 is for the rest.' },
          { text: 'Use the emergency fund to close it.', why: 'That fund is for emergencies, and one is coming.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'What a good tracker shows.',
        template: 'The numbers, and the [[1]]: when money moves, the [[2]], and the reminder.',
        blanks: [['system'], ['rules']],
        distractors: ['loans', 'friends'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of the jar is wrong?',
        lines: [
          'In the jar: GH₵1,260.',
          'Emergency fund: GH₵300.',
          'By week 16: GH₵3,260.',
          'Gap: GH₵1,240.',
        ],
        bug: 2,
        fix: 'By week 16: GH₵2,260.',
        explanation: '1,260 + 1,000 = 2,260.',
      },
      {
        kind: 'mcq',
        prompt: 'What is the system protecting most?',
        options: [
          { text: 'The emergency fund\'s growth', why: 'The emergency fund stays at 300; the rate is what grows the jar.' },
          { text: 'His fun line', why: 'Fun is in the budget, not the jar.' },
          { text: 'The GH₵125 weekly rate' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the layers that protect Kofi\'s money.',
        lines: ['Money moves automatically', 'Into separate named pots', 'With no spending links', 'And a waiting rule for withdrawals'],
      },
    ],
  },
  reflect: {
    prompt: 'Draw your own system on one page: when money moves, where to, the rules, and the reminder. What\'s missing?',
    starters: ['Money moves on...', 'To...', 'Rules:...', 'Missing:...'],
  },
  deepen: {
    title: 'Systems survive bad weeks',
    summary: 'Kofi\'s week-8 system isn\'t about this week. It\'s about week 9, when something goes wrong and he isn\'t thinking about the laptop at all. That\'s when a system earns its keep.',
  },
  notes: 'Jar v3 per updated running numbers in save-money.ts: week 8 jar 1,260; projection 2,260; gap 1,240.',
};

export default lesson;
