import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Before/After: fixed vs flexible costs. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Fixed or flexible?',
  summary: 'Kofi\'s categories are done, but they\'re one long list. Efua shows him the split that changes everything: costs he can\'t change this month, and costs he decides every day.',
  minutes: 11,
  outcomes: [
    'Tell fixed costs from flexible costs',
    'Spot one-off costs that won\'t come back every month',
    'Know which costs to work on first',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'One list vs two',
      before: {
        label: 'Kofi\'s list',
        text: 'Food GH₵660\nLent to Yaw GH₵200\nCourse pack and printing GH₵180\nWelcome party GH₵150\nData GH₵120\nSmall things GH₵100\nTransport GH₵80\nFees GH₵27',
      },
      after: {
        label: 'Efua\'s split',
        text: 'FIXED (set amount, hard to change this month)\nData plan, toiletries, church dues\n\nFLEXIBLE (you decide, day by day)\nFood bought out, transport, small things, fun\n\nONE-OFF (not every month)\nCourse pack, welcome party, lending',
      },
      notes: [
        'Fixed costs are the same, or nearly, every month. You change them by changing the plan, not day by day.',
        'Flexible costs are decided every time you pay. Most leaks live here.',
        'One-off costs aren\'t a habit, but they still need planning. Next month there\'ll be different ones.',
        'Kofi\'s data is flexible right now, because he buys daily bundles. Moving it to a monthly plan would make it fixed and cheaper.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Look at flexible costs first. They\'re where small daily choices add up, and where a change shows results this week.',
    },
  ],
  apply: {
    scenario: 'Splitting Kofi\'s list.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Fixed, flexible or one-off?',
        groups: ['Fixed', 'Flexible', 'One-off'],
        items: [
          { text: 'Monthly church dues', group: 0 },
          { text: 'Lunch from the canteen', group: 1 },
          { text: 'Course pack for the semester', group: 2 },
          { text: 'Taxi to Adum on a Saturday', group: 1 },
          { text: 'Welcome party ticket', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which kind of cost does Kofi decide every single day?',
        options: [
          { text: 'Fixed', why: 'Fixed costs are set: same amount, same time.' },
          { text: 'Flexible' },
          { text: 'One-off', why: 'One-offs happen once or twice a term.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Food GH₵660 + transport GH₵80 + small things GH₵100. Total flexible so far?',
        answers: ['840', 'GH₵840', '840 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each cost to its type.',
        pairs: [
          ['Rent or hostel fee', 'Fixed'],
          ['Snacks', 'Flexible'],
          ['A new laptop charger', 'One-off'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'So where do you think you can change things fastest?',
        prompt: 'Kofi\'s best answer?',
        options: [
          { text: 'The church dues.', why: 'Small and fixed: hard to change and not where the money went.' },
          { text: 'The course pack.', why: 'It\'s already paid, and he needs it. One-offs are planned for, not cut.' },
          { text: 'The flexible ones, especially food bought out.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kofi\'s split is in the wrong place?',
        lines: [
          'Fixed: church dues.',
          'Flexible: kelewele after class.',
          'Fixed: welcome party.',
          'One-off: course pack.',
        ],
        bug: 2,
        fix: 'One-off: welcome party.',
        explanation: 'A party once a term is a one-off, not a cost that comes every month.',
      },
      {
        kind: 'mcq',
        prompt: 'Kofi buys a GH₵10 data bundle every day. A monthly plan with the same data costs about GH₵70. What does switching do?',
        options: [
          { text: 'Nothing; data is data', why: 'The same data for less money is a real saving.' },
          { text: 'Turns a flexible cost into a fixed one, and makes it cheaper' },
          { text: 'Makes it a one-off', why: 'It still comes every month, so it\'s fixed.' },
        ],
        answer: 1,
        explanation: 'About GH₵300 a month on daily bundles vs about GH₵70 on a plan. Prices vary: always compare what you actually get.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Where leaks live.',
        template: 'Most leaks live in [[1]] costs, because you decide them every [[2]].',
        blanks: [['flexible'], ['day', 'time']],
        distractors: ['fixed', 'year'],
      },
      {
        kind: 'sortGroups',
        prompt: 'A working person\'s costs. Fixed or flexible?',
        groups: ['Fixed', 'Flexible'],
        items: [
          { text: 'Monthly rent', group: 0 },
          { text: 'Lunch out at work', group: 1 },
          { text: 'Phone contract', group: 0 },
          { text: 'Weekend outings', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why plan for one-off costs if they don\'t come every month?',
        options: [
          { text: 'Because some different one-off almost always turns up' },
          { text: 'You don\'t need to; they\'re rare', why: 'Each one is rare. Having none in a month is rarer.' },
          { text: 'Because they become fixed costs', why: 'They stay one-offs. But there\'s nearly always one.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Split your own seven-day list into fixed, flexible and one-off. Which group is biggest?',
    starters: ['My biggest group is...', 'One flexible cost I could change this week is...'],
  },
  deepen: {
    title: 'Per day vs per month',
    summary: 'Small daily purchases are easy to underestimate. Multiply by 30 to see a daily habit as a monthly bill: GH₵10 a day is GH₵300 a month. The same trick works on any recurring cost.',
  },
  notes: 'Kofi\'s case breakdown (fictional, adds to GH₵1,517): food bought out 660, lent Yaw 200, course pack & printing 180, welcome party 150, data 120 (12 days of GH₵10 daily bundles), small things 100, transport 80, fees 27. Monthly data plan ~GH₵70 is illustrative; prices vary by provider and change often, stated as "about".',
};

export default lesson;
