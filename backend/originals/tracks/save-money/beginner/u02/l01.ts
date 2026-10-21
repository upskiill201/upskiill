import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: the leak hunt begins. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The leak hunt',
  summary: 'Kofi thought he\'d plugged every leak in Budgeting for Beginners. Miracle bets him GH₵50 he hasn\'t. One evening, three months of history, and a list that surprises them both.',
  minutes: 12,
  outcomes: [
    'Hunt for leaks in spending you thought was sorted',
    'Tell a leak (no value) from a choice (real value)',
    'Decide which leak to plug first',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The bet',
      beats: [
        { speaker: 'miracle', text: 'I bet you GH₵50 there\'s at least GH₵200 a month hiding in your spending.' },
        { speaker: 'kofi', text: 'Deal. I\'ve already fixed food, data, all of it.' },
        { speaker: 'narrator', text: 'Sunday evening. Kofi scrolls three months of history, line by line, with Efua reading over his shoulder.' },
        { speaker: 'efua', text: 'What\'s this GH₵25 every month?' },
        { speaker: 'kofi', text: '...A music app. I signed up for a free trial in first week. I haven\'t opened it since.' },
        { speaker: 'efua', text: 'And these cash-out fees? Twelve this month.' },
        { speaker: 'narrator', text: 'By 10 p.m. the list is nine lines long: the music app, night-data add-ons, cash-out fees, lab-day lunches, staples bought one day at a time at the hall shop, sachet water, phone credit for calls, toiletries, haircuts.' },
        { speaker: 'kofi', text: 'How much does it add up to?' },
        { speaker: 'tey', text: 'Hold on. Not everything on that list is a leak. Some of it is life. Let\'s sort it first, then add it up.' },
      ],
      choice: {
        prompt: 'Which item should Kofi cut first?',
        options: [
          { text: 'The music app he hasn\'t opened in three months.', outcome: 'Yes. Zero value, five minutes to cancel, and it saves GH₵25 every month forever. Easy wins first build momentum.', best: true },
          { text: 'Haircuts: he\'ll cut his own hair.', outcome: 'Possible, but a haircut has real value for Kofi, and a bad one has a cost too. Stretching the time between cuts is a gentler fix.' },
          { text: 'Lab-day lunches: he\'ll skip lunch on lab days.', outcome: 'Skipping meals on long lab days hurts studying. Packing lunch saves the money without the hunger.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A leak is money that buys you nothing you value. A choice is money that buys something you do. Plug leaks first; trim choices second.',
    },
  ],
  apply: {
    scenario: 'The list.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Leak (no value) or choice (real value)?',
        groups: ['Leak', 'Choice'],
        items: [
          { text: 'A music app he never opens', group: 0 },
          { text: 'Fees from twelve small cash-outs', group: 0 },
          { text: 'One haircut a month', group: 1 },
          { text: 'Friday kelewele with friends', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with the music app?',
        options: [
          { text: 'Zero value, quick to cancel, and it saves every month' },
          { text: 'Because it\'s the biggest', why: 'It\'s GH₵25. Small, but the easiest.' },
          { text: 'Because music is bad', why: 'Music is great. Paying for an app he never uses isn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵25 a month for 16 weeks (about 4 months). How much does cancelling save?',
        answers: ['100', 'GH₵100', '100 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I\'ll just cut everything on the list. All nine.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Sort it first. Leaks go completely; choices get trimmed, not deleted. Cutting your joys too is how plans break.' },
          { text: 'Great, cut it all!', why: 'Some items are real choices with real value.' },
          { text: 'Don\'t cut anything.', why: 'Some items buy nothing at all. Those go.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Plug [[1]] first; trim [[2]] second.',
        blanks: [['leaks'], ['choices']],
        distractors: ['friends', 'savings'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each item to a gentler fix.',
        pairs: [
          ['Lab-day lunches', 'Pack lunch two days a week'],
          ['Haircut every 2 weeks', 'Every 3 weeks'],
          ['Sachet water', 'A filter bottle from the hall'],
          ['Staples from the hall shop daily', 'Market trip once a week, shared'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which "fix" will backfire?',
        lines: [
          'Cancel the unused music app.',
          'Pay sellers directly instead of cashing out.',
          'Never see friends so I can\'t spend.',
          'Pack lunch on two lab days.',
        ],
        bug: 2,
        fix: 'See friends in free or cheap ways.',
        explanation: 'Cutting people out to save money costs more than it saves. Swap the activity, keep the friends.',
      },
      {
        kind: 'mcq',
        prompt: 'Miracle bet there was GH₵200 a month hiding. Why was she so sure?',
        options: [
          { text: 'Because almost everyone has forgotten subscriptions, fees and habits that crept back' },
          { text: 'Because she checked his account', why: 'She hasn\'t seen it. She knows how leaks work.' },
          { text: 'Lucky guess', why: 'Experience, not luck.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the leak hunt.',
        lines: ['Scroll three months of history', 'List every repeat cost', 'Sort into leaks and choices', 'Plug leaks', 'Trim choices gently'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Twelve cash-outs at about GH₵3.50 each. Roughly how much in fees? (Round to the nearest cedi.)',
        answers: ['42', 'GH₵42', '42 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Scroll your last three months of history. What repeats? Which are leaks, and which are choices?',
    starters: ['Repeating costs:...', 'Leaks:...', 'Choices:...'],
  },
  deepen: {
    title: 'Free trials',
    summary: 'Free trials often turn into paid subscriptions automatically. When you start one, set a phone reminder for the day before it ends, and decide then whether it\'s worth paying for.',
  },
  notes: 'Fictional leak list (Course 2 Ch2): music app 25, night-data add-ons 30, cash-out fees ~40 (save 30), lab lunches (save 60), staples daily vs weekly shared (save 50), haircut (save 25), toiletries bulk (save 15), sachet water/drinks (save 40), call credit → data calls (save 25). Total ≈ 300/month ≈ 70/week. No app or provider named. Fee per cash-out illustrative.',
};

export default lesson;
