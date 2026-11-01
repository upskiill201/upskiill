import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: three surprises. Payoff: GH₵140 left. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: three surprises',
  summary: 'Month 2\'s review night. A trip, a screen, a lab manual and a beat sale, all in one month. Rebuild the month line by line. Then Kofi checks the final number, and for the first time in his life there\'s money left.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Rebalance a month after several surprises', 'Use sinking funds, the split rule and kind nos together'],
  learn: [
    {
      kind: 'story',
      title: 'Review night',
      beats: [
        { speaker: 'narrator', text: 'Day 30 of month 2. Kofi lays it out for Efua and Yaw in the hall kitchen.' },
        { speaker: 'kofi', text: 'Cape Coast: GH₵120, from fun and clothes. Screen: GH₵160, from surprises and rolled-over fun. Lab manual: GH₵60, from the school line. Beat sale: GH₵120, split by the rule.' },
        { speaker: 'efua', text: 'And savings?' },
        { speaker: 'kofi', text: 'GH₵200, untouched. Plus GH₵60 from the beat. GH₵260 saved.' },
        { speaker: 'narrator', text: 'He checks his spending money and his lines one last time. Then he checks again.' },
        { speaker: 'kofi', text: '...And GH₵140 left over. Not spent. Not planned. Just... left.' },
        { speaker: 'yaw', text: 'Chale. Show me the sheet. Actually show me. I\'m serious this time.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: bend, don\'t break. Cheaper versions, sinking funds, plan on the lowest month, move money on purpose. Chapter 5: the hardest part. Keeping it going when there\'s no panic to push you.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: rebuild month 2.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each surprise to where Kofi paid it from.',
        pairs: [
          ['Cape Coast GH₵120', 'Fun and clothes lines'],
          ['Screen GH₵160', 'Surprises plus rolled-over fun'],
          ['Lab manual GH₵60', 'School and printing line'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Beat sale GH₵120, split 50/25/25. How much went to savings?',
        answers: ['60', 'GH₵60', '60 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Savings GH₵200 + GH₵60 from the beat. Total saved?',
        answers: ['260', 'GH₵260', '260 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which surprise was really predictable, and belonged in a sinking fund?',
        options: [
          { text: 'The cracked screen', why: 'Accidents are true surprises.' },
          { text: 'The lab manual, a once-a-term school cost' },
          { text: 'The beat sale', why: 'That\'s irregular income, not a cost.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool handles each?',
        groups: ['Sinking fund', 'Surprises line', 'Split rule'],
        items: [
          { text: 'Bus home at mid-semester', group: 0 },
          { text: 'A phone slipping off a bench', group: 1 },
          { text: 'GH₵120 from a beat', group: 2 },
          { text: 'Exam stationery', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Next weekend: Kejetia, new sneakers. Just GH₵200. You\'ve got GH₵140 spare now, right?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Yes! Spare money!', why: 'Unplanned money needs a job, decided calmly, not at the market.' },
          { text: 'I\'d love to come along. The GH₵140 is getting a job tonight, not sneakers. I\'ll help you haggle, though.' },
          { text: 'Sneakers are a waste.', why: 'Judging Yaw won\'t help. A warm no plus an alternative will.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What should happen to the GH₵140 left over?',
        options: [
          { text: 'Give it a job: for example, part to savings and part to the bus-home fund' },
          { text: 'Spend it before the 1st', why: 'Nothing has to be spent because it\'s there.' },
          { text: 'Lend it to Yaw', why: 'He hasn\'t asked, and Kofi\'s funds still need filling.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Kofi\'s month-2 notes. Which conclusion is wrong?',
        lines: [
          'Food out went over twice: resize it next month.',
          'Surprises got used: refill it next month.',
          'I had three shocks, so budgeting doesn\'t work for me.',
          'Savings stayed safe all month.',
        ],
        bug: 2,
        fix: 'I had three shocks and the budget absorbed all three.',
        explanation: 'Three shocks, no loans, savings untouched, money left over. That\'s the budget working.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s review night.',
        lines: ['List every surprise', 'Note where each was paid from', 'Check savings', 'Find what\'s left', 'Plan next month\'s changes'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 in one line.',
        template: '[[1]], don\'t [[2]]: move money on [[3]].',
        blanks: [['Bend'], ['break'], ['purpose']],
        distractors: ['Spend', 'credit'],
      },
      {
        kind: 'mcq',
        prompt: 'Month 1: GH₵63 on day 12. Month 2: GH₵140 left on day 30, plus GH₵260 saved. What changed most?',
        options: [
          { text: 'Kofi\'s income', why: 'Same GH₵1,500, plus one beat sale.' },
          { text: 'Kofi\'s luck', why: 'Month 2 had more shocks than month 1.' },
          { text: 'Kofi had a plan, and he bent it instead of breaking it' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Kofi moves GH₵50 of the GH₵140 to the bus-home fund, how much is left to give a job?',
        answers: ['90', 'GH₵90', '90 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Imagine next month brings three surprises. Which tools from this chapter would you use for each?',
    starters: ['For a trip or invitation, I\'d...', 'For a breakage, I\'d...', 'For extra money, I\'d...'],
  },
  notes: 'Chapter 4 challenge (fictional month 2): Cape Coast 120 (fun 90 + clothes 30), screen 160 (surprises 150 + rolled-over fun 10), lab manual 60 (school line), beat 120 → 60 savings / 30 surprises refill / 30 enjoy. Savings 200 + 60 = 260. Left unspent 140 (weekly leftovers, school line remainder 40, etc.). Sets up Chapter 5 (keeping it going) and Yaw asking for the sheet.',
};

export default lesson;
