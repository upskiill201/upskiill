import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final challenge: your own budget. Cliffhanger: the laptop. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: your own budget',
  summary: 'Day 30 of month 3. Mum sends a voice note Kofi will keep forever. Then it\'s your turn: build a complete budget, using everything from the course. And that night, Kofi\'s laptop won\'t switch on.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Build a complete monthly budget from scratch', 'Use every tool from the course together', 'Start your own first month'],
  learn: [
    {
      kind: 'story',
      title: 'Day 30',
      beats: [
        { speaker: 'narrator', text: 'Day 30 of month 3. Kofi sends Mum his month-end card: GH₵200 saved, bus fund full, zero loans, GH₵210 left over.' },
        { speaker: 'narrator', text: 'Her reply comes that evening, with the noise of the stall closing behind her.' },
        { speaker: 'narrator', text: '"Kofi. I showed your card to Auntie Esi at the next stall. She said, \'Your son is a Makola man now.\' I am very proud of you. Keep the sheet. Next time I go to the bank about the stall, you\'re coming with me."' },
        { speaker: 'kofi', text: '...' },
        { speaker: 'efua', text: 'Are you crying?' },
        { speaker: 'kofi', text: 'It\'s the pepper.' },
        { speaker: 'narrator', text: 'That night, 11 p.m. A programming assignment is due Friday. Kofi presses the power button on his five-year-old laptop. Nothing. He tries again. A click, a smell of burning plastic, and silence.' },
        { speaker: 'narrator', text: 'Next semester\'s programming module needs a laptop. The cheapest used one that meets the department\'s spec: about GH₵3,500. Next semester starts in 16 weeks.' },
        { speaker: 'tey', text: 'That\'s the course: find the leaks, needs first, give every cedi a job, bend don\'t break, and keep checking. You have a budget now. Next, in How to Save Money on a Low Income: GH₵3,500, 16 weeks, and Kofi\'s biggest money challenge yet. First, your final challenge.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge. Practise on Ama, then build your own. Ama is 23, works at a phone shop in Accra and takes home GH₵2,400 a month.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps to build Ama\'s budget.',
        lines: ['Read her history: find the leaks', 'Write her certain income', 'List fixed costs', 'Pay future-Ama: savings and surprises', 'Add sinking funds', 'Plan weekly and monthly lines', 'Check it equals zero'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Ama\'s costs: fixed, flexible or one-off?',
        groups: ['Fixed', 'Flexible', 'One-off'],
        items: [
          { text: 'Room rent GH₵600', group: 0 },
          { text: 'Lunch near the shop', group: 1 },
          { text: 'A cousin\'s wedding outfit', group: 2 },
          { text: 'Phone contract GH₵80', group: 0 },
          { text: 'Trotro to work', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ama\'s fixed costs: rent GH₵600 + phone GH₵80 + church GH₵40 + family support GH₵150. Total?',
        answers: ['870', 'GH₵870', '870 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Ama sells phone accessories on commission: GH₵0 to GH₵400 a month. How should her budget treat it?',
        options: [
          { text: 'Plan GH₵400: her best month', why: 'Budgeting on the best month breaks in a slow one.' },
          { text: 'Plan GH₵200: the middle', why: 'Still relies on money that might not come.' },
          { text: 'Plan GH₵0 and split commission by a rule when it arrives' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ama sets savings GH₵240 and surprises GH₵150. With fixed costs GH₵870, how much of GH₵2,400 is left for sinking funds, weekly and monthly lines?',
        answers: ['1140', '1,140', 'GH₵1,140', 'GH₵1140'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'The wedding is in 4 months; the outfit and gift will cost about GH₵400. What does Ama set aside each month?',
        options: [
          { text: 'GH₵100' },
          { text: 'GH₵400, all now', why: 'She can spread it: 400 ÷ 4 = 100.' },
          { text: 'Nothing; she\'ll use surprises', why: 'It isn\'t a surprise. It\'s on the calendar.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After the GH₵100 wedding fund, Ama has GH₵1,040 for weekly and monthly lines. She plans GH₵240 for monthly lines. What\'s her weekly money (4 weeks)?',
        answers: ['200', 'GH₵200', '200 cedis'],
        placeholder: 'A number',
        explanation: '1,040 − 240 = 800. 800 ÷ 4 = 200 a week.',
      },
      {
        kind: 'findBug',
        prompt: 'Ama\'s first draft. Which line will break the plan?',
        lines: [
          'Weekly: GH₵200 for food, transport and fun.',
          'Fun: GH₵0, I\'m serious this time.',
          'Weekly check: Sunday after church.',
          'Left without a job: GH₵0.',
        ],
        bug: 1,
        fix: 'Fun: GH₵25 a week, inside the GH₵200.',
        explanation: 'Zero fun is the too-tight plan. A small fun line protects the rest.',
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Ama\'s lunch line went over in week 2. What should she do?',
        prompt: 'Your best advice?',
        options: [
          { text: 'Quit and restart next month.', why: 'That turns a slip into weeks of no plan.' },
          { text: 'Move money from a line that\'s under, write it down, and resize lunch next month if it keeps happening.' },
          { text: 'Take it from savings.', why: 'Flexible lines first. Savings protect future-Ama.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the course tool.',
        pairs: [
          ['"Where did it go?"', 'Read your history'],
          ['Money is short this week', 'Needs first, swaps'],
          ['A big cost on the calendar', 'Sinking fund'],
          ['Extra money arrives', 'Split rule'],
          ['Budget fading in a good month', 'The weekly check'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which of these belong in a first budget?',
        groups: ['Belongs', 'Doesn\'t belong'],
        items: [
          { text: 'A savings amount decided first', group: 0 },
          { text: 'Commission planned at the best month', group: 1 },
          { text: 'A small fun line', group: 0 },
          { text: 'A surprises line', group: 0 },
          { text: 'Money left without a job', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ama\'s budget is finished. What matters most from here?',
        options: [
          { text: 'Never changing it', why: 'Budgets are drafts that improve each month.' },
          { text: 'A fixed weekly check, and adjusting the draft each month' },
          { text: 'Earning more', why: 'Helpful, but the habits are what make any income work.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course in one line.',
        template: 'Find the [[1]], needs [[2]], every cedi gets a [[3]], bend don\'t [[4]], and keep [[5]].',
        blanks: [['leaks'], ['first'], ['job'], ['break'], ['checking']],
        distractors: ['loans', 'last'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi needs about GH₵3,500 in 16 weeks. About how much is that per week? (Round to the nearest cedi.)',
        answers: ['219', 'GH₵219', '219 cedis', '218.75', '218'],
        placeholder: 'A number',
        explanation: '3,500 ÷ 16 = 218.75, so about GH₵219 a week. His budget saves about GH₵50 a week. That\'s the next course.',
      },
    ],
  },
  reflect: {
    prompt: 'Your project: build your own budget for next month on one page, with income, fixed costs, future you, sinking funds, weekly and monthly lines, and a zero at the bottom. Then put your first weekly check in your calendar. What\'s your first line?',
    starters: ['My income next month is...', 'My savings line is...', 'My weekly check is on...'],
  },
  deepen: {
    title: 'Your project, step by step',
    summary: 'Tonight: read the last 30 days of your history (Ch1). Mark needs and wants (Ch2). Build the five blocks so they equal zero (Ch3). Add a surprises line and one sinking fund (Ch4). Book your weekly check (Ch5). Then live it for one month, and improve the draft.',
  },
  notes: 'Final challenge. Ama (practice persona, Accra, GH₵2,400 take-home, fictional): fixed 870 (rent 600, phone 80, church 40, family 150); savings 240 (10%); surprises 150; wedding fund 100; monthly 240; weekly 200 × 4 = 800. Sum 870 + 240 + 150 + 100 + 240 + 800 = 2,400. Auntie Esi narrated only. Laptop dies: used laptop ~GH₵3,500, 16 weeks (Course 2 setup). 3,500/16 = 218.75. Kofi saves ~GH₵200/month ≈ GH₵50/week.',
};

export default lesson;
