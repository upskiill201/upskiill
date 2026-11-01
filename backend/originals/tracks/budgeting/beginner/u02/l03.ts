import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Reading: scarcity, tunnelling and bandwidth. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Your brain on GH₵63',
  summary: 'Kofi forgot a lab report, snapped at Yaw and nearly took a 1 a.m. loan, all in one day. It\'s not his character. Being short of money changes how everyone thinks, and knowing that helps.',
  minutes: 12,
  outcomes: [
    'Explain what "scarcity" does to thinking',
    'Recognise tunnelling in your own decisions',
    'Use simple tricks that free up mental space',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Scarcity takes up space',
      html: '<p>Day 14. Kofi has thought about money every hour since Tuesday. He forgot a lab report. He snapped at Yaw over a borrowed spoon. Is he falling apart?</p><p>No. He\'s experiencing <strong>scarcity</strong>. In their book <em>Scarcity</em> (2013), economist Sendhil Mullainathan and psychologist Eldar Shafir describe what happens to anyone who has too little of something, whether money, time or food:</p><ul><li><strong>Tunnelling.</strong> The urgent problem fills your view. You focus hard on getting through today, and everything outside the tunnel (next month, the lab report, being kind to Yaw) drops out of sight. It\'s why a 1 a.m. loan looks brilliant: it solves today, and tomorrow is outside the tunnel.</li><li><strong>Less bandwidth.</strong> Worry takes up mental space. In one study, sugarcane farmers in India scored noticeably lower on thinking tests before harvest, when money was tight, than after harvest, when they\'d been paid (Mani and colleagues, <em>Science</em>, 2013). Same people, same brains; different bank balance.</li></ul><p><strong>What helps:</strong></p><ol><li><strong>Decide once, not every day.</strong> A plan made on a calm afternoon saves you from 40 tired decisions at the waakye stand.</li><li><strong>Write it down.</strong> Paper holds the plan so your head doesn\'t have to.</li><li><strong>Build a little slack.</strong> Even a tiny buffer (GH₵20 marked "don\'t touch") makes the tunnel wider. You\'ll build a bigger one later in the course.</li><li><strong>No big decisions in the tunnel.</strong> No loans, no big purchases, no deals while you\'re panicking or tired.</li></ol>',
    },
    {
      kind: 'check',
      question: 'Why did the instant loan look so good to Kofi at 1 a.m.?',
      options: ['It solved today, and the cost next month was outside his "tunnel"', 'Because it was a good deal', 'Because he likes loans'],
      answer: 0,
      explanation: 'Tunnelling: the urgent problem fills the view, and later costs disappear from sight.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Being short of money makes everyone think worse. That\'s not an excuse; it\'s a reason to plan ahead, write things down, and avoid big decisions in the tunnel.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s tunnel.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to what it means.',
        pairs: [
          ['Scarcity', 'Having too little of something'],
          ['Tunnelling', 'Today\'s problem fills your view'],
          ['Bandwidth', 'Mental space for thinking'],
          ['Slack', 'A small buffer that gives you room'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In the sugarcane study, when did farmers do worse on thinking tests?',
        options: [
          { text: 'After harvest, when they\'d been paid', why: 'The other way round. After payday they did better.' },
          { text: 'There was no difference', why: 'There was a clear difference between before and after harvest.' },
          { text: 'Before harvest, when money was tight' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Inside the tunnel or outside it, for Kofi this week?',
        groups: ['Inside (urgent now)', 'Outside (dropped from view)'],
        items: [
          { text: 'Getting food today', group: 0 },
          { text: 'The lab report due Friday', group: 1 },
          { text: 'What the loan costs on the 1st', group: 1 },
          { text: 'Finding GH₵10 for data', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I forgot my lab report and shouted at Yaw. I think I\'m just a mess.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'You are a bit of a mess, honestly.', why: 'Tey never mocks. And it\'s not true: anyone under money stress thinks this way.' },
          { text: 'That\'s scarcity, not you. Money stress takes up space in anyone\'s head. Let\'s make a plan so it stops doing that.' },
          { text: 'Ignore it, it\'ll pass.', why: 'It passes faster with a plan. Ignoring it keeps the worry running.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The four helpers.',
        template: 'Decide [[1]]. Write it [[2]]. Build some [[3]]. No big decisions in the [[4]].',
        blanks: [['once'], ['down'], ['slack'], ['tunnel']],
        distractors: ['daily', 'debt'],
      },
      {
        kind: 'findBug',
        prompt: 'Which of Kofi\'s plans is a "big decision in the tunnel"?',
        lines: [
          'Make a food plan with Efua on Saturday afternoon.',
          'Write the plan in my notes app.',
          'Sign up for a phone on monthly payments tonight, since it\'s "on offer".',
        ],
        bug: 2,
        fix: 'Wait. No new commitments until the month is under control.',
        explanation: 'A new monthly payment made while stressed and short is exactly the kind of decision the tunnel gets wrong.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does a plan made once save mental space?',
        options: [
          { text: 'Because each purchase doesn\'t need a fresh, tired decision' },
          { text: 'Because plans make money appear', why: 'Plans don\'t create money; they stop it leaking, and save worry.' },
          { text: 'It doesn\'t; plans add stress', why: 'Making the plan takes effort once. Not having one costs effort every day.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s way out of the tunnel.',
        lines: ['Notice the tunnel', 'Pause any big decisions', 'Make one plan on a calm afternoon', 'Write it down', 'Follow it day by day'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the name for the effect where an urgent problem fills your whole view?',
        answers: ['tunnelling', 'tunneling', 'tunnel vision', 'the tunnel'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which small step gives Kofi the most "slack" this week?',
        options: [
          { text: 'Spending his last GH₵63 freely to feel normal', why: 'That removes all slack.' },
          { text: 'Putting GH₵20 aside as "don\'t touch" for a real emergency' },
          { text: 'Borrowing GH₵500 for breathing room', why: 'Borrowed slack comes back as next month\'s problem.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'When money is tight for you, what drops out of your "tunnel"? Studies, sleep, people, something else?',
    starters: ['When I\'m short, I stop thinking about...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Read more: Scarcity',
    summary: 'Mullainathan and Shafir\'s Scarcity: Why Having Too Little Means So Much (2013) is a readable book on how lack of money, and of time, changes decisions. Useful for anyone who has ever been broke and blamed themselves for it.',
  },
  notes: 'Mullainathan, S., & Shafir, E. (2013). Scarcity. Mani, A., Mullainathan, S., Shafir, E., & Zhao, J. (2013). Poverty impedes cognitive function. Science, 341(6149), 976–980 (Indian sugarcane farmers pre- vs post-harvest; lower cognitive scores pre-harvest). Claims kept qualitative ("noticeably lower"). Note: some follow-up work debates effect sizes; presented as one study, not a law.',
};

export default lesson;
