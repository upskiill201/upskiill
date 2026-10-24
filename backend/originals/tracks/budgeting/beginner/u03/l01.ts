import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story with a choice: which plan goes to Mum? */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The plan for Mum',
  summary: 'Three days to the 1st. Kofi has three drafts of a plan: one so tight it squeaks, one vague, one realistic. Mum has run a cloth stall for 20 years. She\'ll spot a bad plan instantly. Which one does he send?',
  minutes: 12,
  outcomes: [
    'Tell a realistic plan from a wishful one',
    'See why a plan needs room for fun and surprises',
    'Know what a first budget must include',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Three drafts',
      beats: [
        { speaker: 'narrator', text: 'Day 28. Kofi has written three plans for month 2, each starting from Mum\'s GH₵1,500.' },
        { speaker: 'narrator', text: 'Draft A: "Food GH₵300. Data GH₵70. Everything else: nothing. Save GH₵1,000!"' },
        { speaker: 'narrator', text: 'Draft B: "I will spend less and be careful. Promise."' },
        { speaker: 'narrator', text: 'Draft C: twelve lines. Food in and out, data, dues, transport, school, a haircut, GH₵30 a week of fun, GH₵150 for surprises, GH₵200 saved. It adds up to exactly GH₵1,500.' },
        { speaker: 'kofi', text: 'A looks the most impressive. Saving GH₵1,000! Mum will be so proud.' },
        { speaker: 'efua', text: 'Mum sells cloth at Makola. She knows what a month costs. Will A survive one week?' },
        { speaker: 'tey', text: 'A plan isn\'t a promise to look good. It\'s a map you can actually follow. Pick the one Kofi can live by for 30 days.' },
      ],
      choice: {
        prompt: 'Which draft should Kofi send?',
        options: [
          { text: 'Draft A: save GH₵1,000.', outcome: 'GH₵300 for a month of food is GH₵10 a day, with nothing for transport, printing or a haircut. It breaks in week one, and then he quits the whole plan. Mum would spot it in seconds.' },
          { text: 'Draft B: "I\'ll be careful."', outcome: 'That\'s what he did in month 1. "Careful" isn\'t a number. There\'s nothing to check against.' },
          { text: 'Draft C: twelve lines, room for fun and surprises.', outcome: 'Yes. Every cedi has a job, the numbers are believable, and there\'s room for life. Mum replies with one word: "Good." Then: "Now live it."', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A good first budget is believable, adds up to exactly what comes in, and has room for fun and surprises.',
    },
  ],
  apply: {
    scenario: 'Three drafts.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with Draft A?',
        options: [
          { text: 'Saving is bad', why: 'Saving is great. Saving money you\'ll need for food isn\'t.' },
          { text: 'It\'s too tight to follow, so it\'ll break fast' },
          { text: 'It has too many lines', why: 'It has too few. Most real costs are missing.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Draft A gives GH₵300 for food for 30 days. How much per day?',
        answers: ['10', 'GH₵10', '10 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Wishful or realistic?',
        groups: ['Wishful', 'Realistic'],
        items: [
          { text: '"Fun: GH₵0 for the whole month"', group: 0 },
          { text: '"Surprises: GH₵150"', group: 1 },
          { text: '"I\'ll just be careful"', group: 0 },
          { text: '"Fun: GH₵30 a week"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Draft A saves GH₵1,000. Isn\'t that what Mum wants to see?',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'Mum wants a plan you\'ll actually live by. A broken one by day 7 is worse than a modest one that lasts.' },
          { text: 'Yes, send it. Impress her.', why: 'An impressive plan that breaks in a week loses her trust again.' },
          { text: 'Don\'t send anything.', why: 'She asked for a plan. Silence would be worse.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A good first budget.',
        template: 'Believable, adds up to exactly what comes [[1]], and has room for [[2]] and surprises.',
        blanks: [['in'], ['fun']],
        distractors: ['out', 'debt'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Draft C would worry Mum?',
        lines: [
          'Food staples, shared: GH₵240.',
          'Data plan: GH₵70.',
          'Fun: whatever is left.',
          'Surprises: GH₵150.',
        ],
        bug: 2,
        fix: 'Fun: GH₵30 a week (GH₵120).',
        explanation: '"Whatever is left" isn\'t a number, and usually turns into "all of it". Give fun a fixed amount.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each draft to its problem or strength.',
        pairs: [
          ['Draft A', 'Too tight to survive'],
          ['Draft B', 'No numbers to check'],
          ['Draft C', 'Believable and complete'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Draft C adds up to exactly GH₵1,500. Why does that matter?',
        options: [
          { text: 'It looks neater', why: 'Neat is nice. The real reason: no money is left without a job.' },
          { text: 'Every cedi has a job, so nothing drifts away unplanned' },
          { text: 'It means he can\'t save', why: 'Savings is one of the jobs: GH₵200 of it.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Kofi built Draft C.',
        lines: ['Start with GH₵1,500', 'List fixed costs', 'Plan flexible costs', 'Add surprises and savings', 'Check it adds to GH₵1,500'],
      },
      {
        kind: 'mcq',
        prompt: 'Mum replies "Good. Now live it." What is she telling him?',
        options: [
          { text: 'The plan is finished, so he can relax', why: 'Writing the plan is the start, not the end.' },
          { text: 'A plan only counts if he follows it' },
          { text: 'She\'ll send more money', why: 'She said nothing about more money.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever made a money plan that was too strict? What happened, and when did it break?',
    starters: ['I once tried...', 'It broke when...'],
  },
  deepen: {
    title: 'Start believable, then tighten',
    summary: 'A first budget that\'s a little generous but followed teaches you more than a perfect one you abandon. Once you\'ve lived it for a month, you can tighten the lines where you had money left over.',
  },
  notes: 'Draft C = Kofi\'s month-2 budget (money sheet v3), fictional, sums to 1,500: data 70, dues 20, toiletries & laundry 40; food staples 240 (60/wk), food out 400 (100/wk), transport 60 (15/wk), fun 120 (30/wk); school & printing 100, haircut & clothes 100; surprises 150; savings 200.',
};

export default lesson;
