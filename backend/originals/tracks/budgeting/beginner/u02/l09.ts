import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: money sheet v2, the survival list. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Money sheet v2: the survival list',
  summary: 'Day 17, GH₵140, 13 days to go. Kofi\'s second money sheet isn\'t about the past any more. It\'s a plan for every cedi until the 1st. Tap through it.',
  minutes: 11,
  outcomes: [
    'Read a short-term survival plan',
    'See the priority order in a real plan',
    'Build a survival list for any short month',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Kofi\'s money sheet v2 (days 17 to 30)',
      text: 'HAVE: GH₵140. LEVEL 1, ALIVE AND SAFE: Food staples, my share, GH₵70. Don\'t-touch buffer GH₵10. LEVEL 2, STUDIES: Data plan GH₵20. Lab report printing GH₵12. LEVEL 3, PENALTIES: Hall dues GH₵20. LEVEL 4, EVERYTHING ELSE: One Friday kelewele GH₵8. Football bibs: next month. TOTAL PLANNED: GH₵140. LEFT TO PLAN: GH₵0.',
      hotspots: [
        { phrase: 'HAVE: GH₵140', note: 'GH₵63 on day 12, plus GH₵100 Yaw paid back, minus what he spent on days 13 to 17. Start every plan with what you actually have.' },
        { phrase: 'Food staples, my share, GH₵70', note: 'Rice, beans, gari, eggs, oil and tomatoes, bought together with Efua and Yaw at the market. About GH₵5.40 a day. Level 1 is paid first.' },
        { phrase: 'Don\'t-touch buffer GH₵10', note: 'Slack. Small, but it means one surprise won\'t wreck the plan.' },
        { phrase: 'Lab report printing GH₵12', note: 'The report he forgot in the tunnel. Studies are level 2: they keep his future going.' },
        { phrase: 'Hall dues GH₵20', note: 'Level 3: there\'s a fine if late. Paying now costs less than paying later.' },
        { phrase: 'One Friday kelewele GH₵8', note: 'One small, planned joy. It\'s on the sheet, so it isn\'t a slip; it\'s the plan.' },
        { phrase: 'Football bibs: next month', note: 'Not "no". "Not this month". It goes on next month\'s list.' },
        { phrase: 'LEFT TO PLAN: GH₵0', note: 'Every cedi has a job. You\'ll meet this idea properly in Chapter 3: zero-based budgeting.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A survival list is short: what you have, then the four levels in order, then "left to plan". When "left" reaches zero, stop adding.',
    },
  ],
  apply: {
    scenario: 'Reading the survival list.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Add up level 1: food GH₵70 + buffer GH₵10.',
        answers: ['80', 'GH₵80', '80 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is lab report printing on level 2?',
        options: [
          { text: 'It keeps his studies going' },
          { text: 'It\'s fun', why: 'Printing is many things. Fun isn\'t one of them.' },
          { text: 'There\'s a late fine', why: 'That would be level 3. It\'s about his studies.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which level is each line?',
        groups: ['Level 1', 'Level 2', 'Level 4'],
        items: [
          { text: 'Food staples', group: 0 },
          { text: 'Data plan', group: 1 },
          { text: 'Don\'t-touch buffer', group: 0 },
          { text: 'Friday kelewele', group: 2 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The end of the sheet.',
        template: 'Left to plan: GH₵[[1]]. Every cedi has a [[2]].',
        blanks: [['0'], ['job']],
        distractors: ['10', 'loan'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'You put kelewele in your plan? I thought you were broke.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'I am. That\'s why it\'s only one, and it\'s planned.' },
          { text: 'You\'re right, I\'ll delete it.', why: 'A plan with zero joy is the one that breaks.' },
          { text: 'I\'ll buy it every night then.', why: 'One planned joy, not a return to the old habit.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'A classmate\'s survival list. Which line is in the wrong order?',
        lines: [
          'Have: GH₵120.',
          'Concert ticket: GH₵50.',
          'Food staples: GH₵60.',
          'Transport to class: GH₵10.',
        ],
        bug: 1,
        fix: 'Move the concert to level 4, after food and transport.',
        explanation: 'Wants go last. With food first, the concert may still fit, or wait a month.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵70 for food over 13 days is about how much per day? (Round to one decimal.)',
        answers: ['5.4', '5.38', 'GH₵5.40', '5.40', 'GH₵5.4'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the sheet to its purpose.',
        pairs: [
          ['Have', 'What you really have'],
          ['Buffer', 'Room for one surprise'],
          ['"Next month"', 'A want put off, not cancelled'],
          ['Left to plan', 'Shows when to stop adding'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to build a survival list.',
        lines: ['Write what you have', 'Fill level 1', 'Fill level 2', 'Fill level 3', 'Add one small joy if there\'s room'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the biggest difference between money sheet v1 and v2?',
        options: [
          { text: 'v2 has more categories', why: 'Fewer, actually. The real difference is time.' },
          { text: 'v1 looked back at where money went; v2 plans where it will go' },
          { text: 'v2 has bigger numbers', why: 'Much smaller numbers. Different job.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'If you had only what\'s in your account right now until your next money arrives, what would your survival list say?',
    starters: ['I have...', 'Level 1:...', 'Next month:...'],
  },
  deepen: {
    title: 'Templates help',
    summary: 'Write your four levels once in your notes app. Next time money is short, you only fill in the numbers. Deciding the order on a calm day saves you from deciding it in the tunnel.',
  },
  notes: 'Survival list (fictional) sums to 140: 70 + 10 + 20 + 12 + 20 + 8. Have 140 = 63 + 100 (Yaw\'s partial repayment) − 23 spent days 13–17. 70/13 = 5.38.',
};

export default lesson;
