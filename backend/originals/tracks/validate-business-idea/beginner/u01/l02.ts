import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Myth or Fact: why most new businesses fail. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Why most new businesses fail',
  summary: 'David sends Clinton a link: the reasons failed startups gave for failing. Clinton expected "ran out of money" at the top. It\'s something else. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Know the most common reason new businesses fail',
    'Separate the real causes from the myths',
    'See why testing demand comes first',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Most failed startups say the main reason was a bad product.',
          isFact: false,
          explain: 'Myth. In CB Insights\' study of startup post-mortems, the most common reason was "no market need": they built something people didn\'t need enough to pay for.',
        },
        {
          text: 'Running out of cash is one of the most common reasons too.',
          isFact: true,
          explain: 'Fact. And often it\'s the same story: no one bought enough, so the money ran out. Course 3 of this set is about cash.',
        },
        {
          text: 'A great idea will find customers on its own.',
          isFact: false,
          explain: 'Myth. Ideas don\'t sell themselves. Even good ones need someone with the problem, the money and a way to hear about you.',
        },
        {
          text: 'Checking demand before building is cheaper than finding out after.',
          isFact: true,
          explain: 'Fact. A week of conversations and a small test costs a little time. Building something nobody wants can cost everything.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The most common way to fail: build something nobody needs enough to pay for. This course is about not doing that.',
    },
  ],
  apply: {
    scenario: 'What really goes wrong.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was the most common reason in the study of failed startups?',
        options: [
          { text: 'No market need: not enough people wanted it' },
          { text: 'The logo was bad', why: 'Branding came far lower.' },
          { text: 'The founders were too young', why: 'Age wasn\'t a top reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which risk does it check?',
        groups: ['Do people need it?', 'Can I build it?'],
        items: [
          { text: 'Asking students how they get food now', group: 0 },
          { text: 'Finding a developer', group: 1 },
          { text: 'Seeing if anyone pays in advance', group: 0 },
          { text: 'Choosing an app framework', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'My idea is good, so it\'ll find customers. Right?',
        prompt: "David's best reply?",
        options: [
          { text: 'The study says the most common failure is building something people didn\'t need. Let\'s check they need it first.' },
          { text: 'Yes, good ideas always win.', why: 'Plenty of good ideas fail without customers.' },
          { text: 'No idea is ever good.', why: 'Some are; you find out by testing.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the fact.',
        pairs: [
          ['"Bad products kill startups"', 'No market need is the top reason'],
          ['"Great ideas sell themselves"', 'Customers need to hear and care'],
          ['"Test later"', 'Testing first is cheaper'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The top reason.',
        template: 'No [[1]] need: they built something people didn\'t want enough to [[2]] for.',
        blanks: [['market'], ['pay']],
        distractors: ['money', 'wait'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is running out of cash often the same story as "no market need"?',
        options: [
          { text: 'When too few people buy, the money runs out' },
          { text: 'Banks close new businesses on purpose', why: 'The usual cause is too few sales.' },
          { text: 'They aren\'t related at all', why: 'Low sales drain cash.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the cheapest way to find out, from cheapest to most expensive.',
        lines: ['Talk to ten possible customers', 'Run a small paid test', 'Build a simple version', 'Build the full app'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Complete the top reason: "no market ..."',
        answers: ['need'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s thinking is the myth?',
        lines: [
          'Most failures come from building what nobody needs.',
          'So I should check demand first.',
          'But my idea is great, so it\'s safe.',
          'A week of conversations costs almost nothing.',
        ],
        bug: 2,
        fix: 'Even great-sounding ideas need evidence of demand.',
        explanation: 'Everyone thinks their idea is great; that\'s why so many build without checking.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Cheap to find out, or expensive?',
        groups: ['Cheap', 'Expensive'],
        items: [
          { text: 'Ten conversations', group: 0 },
          { text: 'Hiring a developer for three months', group: 1 },
          { text: 'A WhatsApp pre-order post', group: 0 },
          { text: 'Renting a shop', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What would it cost you to build your idea? What would it cost to find out first if anyone wants it?',
    starters: ['Building would cost...', 'Finding out would cost...'],
  },
  deepen: {
    title: 'Where the numbers come from',
    summary: 'CB Insights read hundreds of founders\' own accounts of why their startups failed. Self-reported reasons aren\'t perfect, but "no market need" has topped or nearly topped the list in each version.',
  },
  notes: 'CB Insights, "The Top Reasons Startups Fail": 2014 analysis of 101 post-mortems, 42% cited "no market need" (top reason); "ran out of cash" 29%. Later updates (e.g. 2021, 111 post-mortems) put "ran out of cash/failed to raise" first (38%) and "no market need" second (35%). Lesson wording "most common / at or near the top" covers both; check the latest before quoting a single figure.',
};

export default lesson;
