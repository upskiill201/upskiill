import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Card deck: Ponzi, pyramid and "money circle" schemes. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Recruit two friends',
  summary: 'Jayden\'s mate shows him a "gifting circle": put in £100, bring two friends, and you\'ll get £800 when you reach the middle. Three cards on the schemes that run on recruitment.',
  minutes: 10,
  outcomes: [
    'Tell Ponzi, pyramid and "circle" schemes apart',
    'See why recruitment schemes always fail most people',
    'Spot the maths that gives them away',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: Ponzi schemes.</strong> Someone promises high returns from "trading" or "investments". Old investors are paid with new investors\' money. You might never recruit anyone, but the scheme needs a constant flow of new money, and collapses when it slows.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: pyramid and "circle" schemes.</strong> Here, you get paid mainly for recruiting. "Gifting circles", "money boards" and similar schemes promise you\'ll receive eight times what you put in once enough people join below you. The maths: if each person must recruit two, the levels grow 2, 4, 8, 16, 32... After about 30 levels you\'d need more people than live on Earth.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: why most people lose.</strong> Only the people near the top get paid. Everyone who joins near the end, which is most people, loses their money. In the UK, pyramid schemes are illegal, and people who recruit friends can lose their friends as well as their money.</p>',
    },
    {
      kind: 'check',
      question: 'In a "gifting circle", where does your promised £800 come from?',
      options: ['New people\'s money', 'Investment profits', 'A charity'],
      answer: 0,
      explanation: 'There\'s nothing invested. Payouts only come from new recruits.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'If the money comes mainly from new people joining, it can\'t last. Most people, the later ones, always lose.',
    },
  ],
  apply: {
    scenario: 'The gifting circle.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each scheme to how it works.',
        pairs: [
          ['Ponzi scheme', 'Old investors paid with new investors\' money'],
          ['Pyramid scheme', 'Paid mainly for recruiting'],
          ['Gifting circle', 'Recruit friends to "move up" to a payout'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do recruitment schemes always collapse?',
        options: [
          { text: 'Police always catch them early', why: 'They collapse because of the maths.' },
          { text: 'They need ever more new people, and that can\'t go on' },
          { text: 'They don\'t', why: 'The maths makes collapse certain.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Each person recruits two. Level 1 has 1 person, level 2 has 2, level 3 has 4. How many on level 6?',
        answers: ['32', 'thirty-two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Recruitment scheme sign, or not?',
        groups: ['Recruitment scheme sign', 'Not a sign'],
        items: [
          { text: '"Bring two friends to move up"', group: 0 },
          { text: 'Selling a real product to real customers', group: 1 },
          { text: '"Put in £100, get £800"', group: 0 },
          { text: 'Payouts depend on new members joining', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Tyler says it\'s not a scam because it\'s "gifting", not investing.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Then it\'s fine.', why: 'The label doesn\'t matter.' },
          { text: 'Join but don\'t recruit.', why: 'You\'d still likely lose your £100.' },
          { text: 'A new name doesn\'t change the maths. If you get paid from new people joining, most people lose. And you\'d be recruiting your mates.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'If the money comes mainly from new people [[1]], most people [[2]].',
        blanks: [['joining'], ['lose']],
        distractors: ['buying', 'win'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the circle\'s pitch is the giveaway?',
        lines: [
          '"It\'s a community."',
          '"Everyone helps each other."',
          '"You get your £800 once 8 new people join under you."',
        ],
        bug: 2,
        fix: 'Payouts depending on new joiners = a pyramid.',
        explanation: 'Money only from new members means the latest always lose.',
      },
      {
        kind: 'mcq',
        prompt: 'Who loses most in a pyramid scheme?',
        options: [
          { text: 'The founders', why: 'They usually profit.' },
          { text: 'The people who join near the end, which is most people' },
          { text: 'Nobody', why: 'Most people lose.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What can Jayden lose besides £100?',
        options: [
          { text: 'Nothing', why: 'Relationships suffer.' },
          { text: 'His phone', why: 'Friendships, mainly.' },
          { text: 'Friends he recruits, when they lose their money' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how a gifting circle collapses.',
        lines: ['Early joiners get paid', 'Recruiting gets harder', 'New money slows', 'Payouts stop', 'Most members lose'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever been invited to "join and bring friends" to make money? How did it pitch itself?',
    starters: ['It was called...', 'It said...'],
  },
  deepen: {
    title: 'Multi-level marketing',
    summary: 'Some legal businesses sell through networks of sellers who recruit others. Studies have found most participants earn little or lose money. The question to ask: does the money come mainly from selling products to real customers, or from recruiting?',
  },
  notes: 'Pyramid schemes illegal in UK (Consumer Protection from Unfair Trading Regulations 2008). 2^5 = 32 on level 6. 2^33 ≈ 8.6bn. MLM earnings research: FTC 2011/2018 studies stated generally. Jayden per CAST; Tyler narrated.',
};

export default lesson;
