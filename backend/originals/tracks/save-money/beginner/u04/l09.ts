import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: the jar v4, tested. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The jar v4: tested',
  summary: 'Week 12. Malaria, a refill, a friend in trouble, and the laptop jar never went backwards. Tap through the jar after its first real test.',
  minutes: 11,
  outcomes: [
    'Read a tracker after an emergency',
    'See how two pots protected each other',
    'Spot what the test taught',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The jar v4 (week 12)',
      text: 'LAPTOP FOR MY DEGREE: GH₵1,480 of GH₵3,500. EMERGENCY: GH₵300, refilled (used GH₵280 for malaria in week 9). WEEKS 9 TO 12: GH₵70 a week to the emergency fund, GH₵55 a week to the laptop. FROM WEEK 13: back to GH₵125 a week. LOANS: 0. LENT TO YAW: GH₵0 from savings (GH₵40 gift from fun money). BY WEEK 16 AT GH₵125: GH₵1,980. GAP: GH₵1,520. NEXT TARGET FOR THE FUND: GH₵400, after the laptop.',
      hotspots: [
        { phrase: 'GH₵1,480 of GH₵3,500', note: 'GH₵1,260 at week 8, plus four weeks at GH₵55. Slower, but it never went backwards.' },
        { phrase: 'EMERGENCY: GH₵300, refilled', note: 'GH₵20 after the clinic, back to GH₵300 in four weeks.' },
        { phrase: 'WEEKS 9 TO 12', note: 'The refill plan: a set amount, a set end date, then switch back.' },
        { phrase: 'LOANS: 0', note: 'A real emergency, paid in cash, from the right pot.' },
        { phrase: 'LENT TO YAW: GH₵0 from savings', note: 'Goal savings and the fund aren\'t spare money. A small gift came from flexible money instead.' },
        { phrase: 'GAP: GH₵1,520', note: '3,500 − 1,980. The emergency cost the laptop about GH₵280 of progress, and that\'s the honest truth. Chapter 5 has four weeks to close it.' },
        { phrase: 'NEXT TARGET FOR THE FUND: GH₵400', note: 'GH₵300 barely covered GH₵280. The lesson, written down for later.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'After any test, write what it taught you on the tracker. Next time, the plan is better.',
    },
  ],
  apply: {
    scenario: 'The jar at week 12.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'GH₵1,260 + 4 × GH₵55. What\'s in the laptop jar?',
        answers: ['1480', '1,480', 'GH₵1,480', 'GH₵1480'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: '4 more weeks at GH₵125. Jar by week 16?',
        answers: ['1980', '1,980', 'GH₵1,980', 'GH₵1980'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'GH₵3,500 − GH₵1,980. What\'s the gap?',
        options: [
          { text: 'GH₵1,240', why: 'That was week 8\'s gap, before the refill slowed the jar.' },
          { text: 'GH₵520', why: '3,500 − 1,980 = 1,520.' },
          { text: 'GH₵1,520' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tracker line to the lesson behind it.',
        pairs: [
          ['Used GH₵280 for malaria', 'Fever: paying from the right pot'],
          ['GH₵70 to the fund for 4 weeks', 'Refilling the fund'],
          ['GH₵0 lent from savings', 'Yaw needs GH₵400'],
          ['Next target GH₵400', 'How big should it be?'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Did it protect the laptop, or cost the laptop?',
        groups: ['Protected', 'Cost some progress'],
        items: [
          { text: 'Having the emergency fund', group: 0 },
          { text: 'Refilling for four weeks', group: 1 },
          { text: 'Saying no to lending GH₵400', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'The gap is bigger than at week 8. Did the system fail?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, start again.', why: 'The system did exactly its job.' },
          { text: 'No. Without it, malaria would have cost the jar GH₵280 AND left you with no fund. You lost a little progress, not the plan.' },
          { text: 'Take a loan to catch up.', why: 'The whole point is avoiding that.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'After any test.',
        template: 'Write what it [[1]] you on the [[2]].',
        blanks: [['taught'], ['tracker', 'jar']],
        distractors: ['cost', 'phone'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v4 is wrong?',
        lines: [
          'Laptop jar: GH₵1,480.',
          'Emergency fund: GH₵20.',
          'Loans: 0.',
          'Gap: GH₵1,520.',
        ],
        bug: 1,
        fix: 'Emergency fund: GH₵300, refilled.',
        explanation: 'It was GH₵20 in week 9. By week 12 it\'s back to GH₵300.',
      },
      {
        kind: 'mcq',
        prompt: 'Four weeks left and a GH₵1,520 gap. Which ideas could help?',
        options: [
          { text: 'Emptying the emergency fund', why: 'That undoes the lesson of week 9.' },
          { text: 'The GH₵480-a-month deal', why: 'Still GH₵5,760 in total.' },
          { text: 'Earning a little more, using windfalls well, and finding the laptop cheaper' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the semester\'s tests.',
        lines: ['Laptop dies', 'Two missed Sundays', 'Malaria in week 9', 'Yaw asks for GH₵400'],
      },
    ],
  },
  reflect: {
    prompt: 'What has your saving been tested by so far? What did it teach you?',
    starters: ['My test was...', 'It taught me...'],
  },
  deepen: {
    title: 'Honest trackers',
    summary: 'Kofi\'s gap went from GH₵1,240 to GH₵1,520. He wrote it down anyway. A tracker that only shows good news stops being useful. Honest numbers are what let you change the plan in time.',
  },
  notes: 'Jar v4 per running numbers: week 12 jar 1,480; EF 300; projection 1,980; gap 1,520.',
};

export default lesson;
