import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Before/After: slow and steady vs all or nothing. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Slow and steady vs all or nothing',
  summary: 'Two savers, same goal, same income. One saves everything for three weeks, then crashes. The other saves the same amount every week for sixteen. Side by side, after four months.',
  minutes: 11,
  outcomes: [
    'Compare steady saving with bursts of saving',
    'Choose a weekly amount you can keep',
    'Recover from a crash without quitting',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Yaw\'s way vs Kofi\'s way',
      before: {
        label: 'All or nothing (Yaw, last year)',
        text: 'Weeks 1–3: saves GH₵300 a week. No fun, no food out. "New man!"\nWeek 4: exhausted, spends GH₵500 in one weekend.\nWeeks 5–10: nothing saved. "I\'m just bad at this."\nWeek 11: tries again, GH₵300 a week.\nWeek 13: crashes again.\nAfter 16 weeks: GH₵300.',
      },
      after: {
        label: 'Slow and steady (Kofi, this semester)',
        text: 'Every week: GH₵125, automatically. Fun line kept.\nWeeks 5–6: missed, fixed the system.\nWeek 9: emergency, paid from the fund; laptop slowed for 4 weeks, never stopped.\nAfter 16 weeks: about GH₵2,880, with windfalls and beats.',
      },
      notes: [
        'Bursts of extreme saving feel heroic and usually end in a crash and a spending binge.',
        'A steady amount you can keep beats a big amount you can\'t.',
        'Steady savers still have bad weeks. They fix the system and carry on; they don\'t start over from zero.',
        'Kofi saved less per week than Yaw\'s best weeks, and nearly ten times as much in total.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Choose a weekly amount you could keep for a year, not one you could keep for a week.',
    },
  ],
  apply: {
    scenario: 'Two ways to save.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'GH₵125 a week for 16 weeks (before windfalls). Total?',
        answers: ['2000', '2,000', 'GH₵2,000', 'GH₵2000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Yaw end up with only GH₵300?',
        options: [
          { text: 'Each extreme burst ended in a crash and a binge' },
          { text: 'He earns less', why: 'He earns more than Kofi.' },
          { text: 'Bad luck', why: 'The pattern, not luck.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Steady or all-or-nothing?',
        groups: ['Steady', 'All or nothing'],
        items: [
          { text: 'Same amount every week, automatically', group: 0 },
          { text: 'No fun at all for three weeks', group: 1 },
          { text: 'Fixing the system after a missed week', group: 0 },
          { text: '"I\'ve failed, so I\'ll start over next month"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'This time I\'ll save GH₵400 a week! Starting Monday!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'What could you keep for a whole year? GH₵100 every week beats GH₵400 for three weeks.' },
          { text: 'Go for it!', why: 'He\'s crashed twice from this exact plan.' },
          { text: 'You\'ll never do it.', why: 'Unkind, and not true with a steady plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'A steady amount you can [[1]] beats a big amount you [[2]].',
        blanks: [['keep'], ['can\'t', 'cannot']],
        distractors: ['spend', 'borrow'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the event to the steady saver\'s response.',
        pairs: [
          ['Missed two weeks', 'Fix the system, carry on'],
          ['An emergency', 'Use the fund, refill, keep going'],
          ['A bored, tired week', 'Planned reward, fresh start'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is the all-or-nothing trap?',
        lines: [
          'Save GH₵100 every week.',
          'Keep a small fun line.',
          'If I miss a week, the whole plan is ruined.',
        ],
        bug: 2,
        fix: 'If I miss a week, I carry on the next.',
        explanation: 'One missed week is a slip. Treating it as the end turns it into a crash.',
      },
      {
        kind: 'mcq',
        prompt: 'Yaw\'s best weeks saved GH₵300; Kofi\'s saved GH₵125. Who saved more in total?',
        options: [
          { text: 'Kofi, by far' },
          { text: 'Yaw', why: 'His bursts kept crashing. He ended with GH₵300.' },
          { text: 'Same', why: 'About GH₵2,000 vs GH₵300.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Yaw saves a steady GH₵100 a week for a year (52 weeks), how much is that?',
        answers: ['5200', '5,200', 'GH₵5,200', 'GH₵5200'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to pick a steady amount.',
        lines: ['Look at your real budget', 'Pick an amount you could keep for a year', 'Automate it', 'Raise it only when it feels easy'],
      },
    ],
  },
  reflect: {
    prompt: 'What amount could you save every week for a whole year, even in a bad month?',
    starters: ['I could keep...', 'Even in a bad month, because...'],
  },
  deepen: {
    title: 'Raise it slowly',
    summary: 'Once a steady amount feels easy for a couple of months, raise it a little, by 10 or 20%. The Save More Tomorrow idea (Thaler and Benartzi, 2004) used this: people agreed in advance to save more when their pay went up, and savings rates rose steadily without anyone feeling a pinch.',
  },
  notes: 'Yaw last year (fictional) ends at GH₵300. Kofi 16 × 125 = 2,000 (actual path lower due to refill; with windfalls & beats ≈ 2,880). Save More Tomorrow: Thaler & Benartzi (2004), JPE.',
};

export default lesson;
