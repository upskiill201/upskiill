import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: the 1,800 test. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the 1,800 test',
  summary: 'Before November, David asks the scary question: how many customers could WashDay lose at 1,800 and still earn what it did at 1,500? Then the first weekend\'s results arrive. Everything from Chapter 4.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Work out how many customers a price rise can afford to lose', 'Use everything from Chapter 4 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Before and after',
      html: '<p><strong>Before (October, at 1,500):</strong> a typical weekend, 20 Standard bags, 375 margin each.</p><p><strong>David\'s question:</strong> at 1,800 (675 margin), how many bags earn the same?</p><p><strong>First weekend of November:</strong> 19 Standard bags. Two students left ("too much for me now"), one of them moved to Saver. One new student came through bring-a-friend. Clinton worked about 12 hours.</p>',
    },
    {
      kind: 'story',
      title: 'The numbers',
      beats: [
        { speaker: 'clinton', text: 'Two people left. I feel terrible.' },
        { speaker: 'david', text: 'Do the sums before you feel anything.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: discounts cost margin, deals need a reason, rises need notice and fairness, and tests beat guesses. Chapter 5: say it, defend it, and check it worked.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: the 1,800 test.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '20 bags at 375 margin. What was a typical October weekend\'s margin, in FCFA?',
        answers: ['7500', '7,500'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'At 675 margin, how many bags earn the same 7,500? (7,500 ÷ 675, rounded up)',
        options: [
          { text: '12 bags' },
          { text: '20 bags', why: 'Each bag earns more now.' },
          { text: '11 bags', why: '11 × 675 = 7,425, just short.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'So from 20 bags, how many could WashDay lose and still earn as much?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The first November weekend: 19 bags at 675. Margin, in FCFA?',
        answers: ['12825', '12,825'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '12,825 for about 12 hours. Roughly what does Clinton earn per hour now?',
        options: [
          { text: 'About 1,069 FCFA, above the library\'s 1,000' },
          { text: 'About 625 FCFA', why: 'That was at 1,500.' },
          { text: 'About 12,825 FCFA', why: 'Divide by 12 hours.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Two people left. Was the rise a mistake?',
        prompt: "David's best reply?",
        options: [
          { text: 'You could have lost eight and still earned the same. You lost two, one moved to Saver, and you\'re earning 71% more. It worked.' },
          { text: 'Yes, go back to 1,500.', why: 'The numbers say the opposite.' },
          { text: 'Raise it to 2,400 now.', why: 'Check and review first; don\'t overcorrect.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good sign or warning sign from the first weekend?',
        groups: ['Good sign', 'Warning sign'],
        items: [
          { text: 'Margin up from 7,500 to 12,825', group: 0 },
          { text: 'Two students said "too much for me now"', group: 1 },
          { text: 'One leaver moved to Saver', group: 0 },
          { text: 'A new student came via bring-a-friend', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 4 idea to what happened.',
        pairs: [
          ['Test first', 'Hostel A before everyone'],
          ['Look after regulars', '1,600 until month end'],
          ['Deals with a reason', 'Bring-a-friend brought one'],
          ['Options catch leavers', 'One moved to Saver'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The sum that takes the fear away.',
        template: 'Old margin [[1]] new margin per sale = sales you need to earn the [[2]].',
        blanks: [['divided by'], ['same']],
        distractors: ['plus', 'least'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s weekend report draws the wrong conclusion?',
        lines: [
          'October weekend: 20 bags, 7,500 margin.',
          'November weekend: 19 bags, 12,825 margin.',
          'Two left; one moved to Saver; one new via a friend.',
          'Conclusion: fewer bags, so the rise failed.',
        ],
        bug: 3,
        fix: 'Conclusion: margin up 71%; watch the two leavers\' feedback.',
        explanation: 'Judge by margin, not bag count.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much more margin did the November weekend earn than October\'s 7,500, in FCFA?',
        answers: ['5325', '5,325'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps of a safe price rise.',
        lines: ['Work out how many customers you can afford to lose', 'Test on a small group', 'Announce with notice and reasons', 'Look after regulars', 'Check margin after the switch'],
      },
    ],
  },
  reflect: {
    prompt: 'For your own price rise: how many customers could you lose and still earn the same? Is that more or fewer than you feared?',
    starters: ['I could lose...', 'I feared...'],
  },
  notes: 'Chapter 4 challenge (fictional): October 20 bags × 375 = 7,500; at 675 margin, 7,500 ÷ 675 ≈ 11.1 → 12 bags needed (can lose 8 of 20). November weekend 19 × 675 = 12,825 (+5,325, +71%); 12 hours → ~1,069 FCFA/hour.',
};

export default lesson;
