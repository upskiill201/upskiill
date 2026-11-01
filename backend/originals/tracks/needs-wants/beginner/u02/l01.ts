import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story with a choice: the first cut. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The first cut',
  summary: 'Ada needs to find ₦130,000 a month. Her line has five creep items and one thing she loves. Where should the first cut come from? You choose.',
  minutes: 11,
  outcomes: [
    'Choose the easiest, least painful cuts first',
    'Protect what you value while cutting',
    'Build momentum with quick wins',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sunday night',
      beats: [
        { speaker: 'narrator', text: 'Sunday night. Ada\'s line is on the fridge, held up by a Nopal magnet Lucía sent her.' },
        { speaker: 'ada', text: 'Rides ₦35,000 on top. Delivery ₦25,000. Phone ₦20,000. Gym ₦12,000. Subscriptions ₦8,000. And my art class, ₦15,000.' },
        { speaker: 'narrator', text: 'Ngozi, eating jollof from the pot: "Cut the art class. It\'s the most expensive thing that isn\'t food."' },
        { speaker: 'ada', text: 'But it\'s the only thing on here I actually love.' },
        { speaker: 'tey', text: 'This is where most people cut the wrong thing first: the joy, instead of the stuff that gives nothing. Which one should Ada cut tonight?' },
      ],
      choice: {
        prompt: 'What should Ada cut first?',
        options: [
          { text: 'The art class: it\'s the biggest single "extra".', outcome: 'It\'s also the one she values most. Cutting joy first makes the whole plan feel like punishment, and plans that feel like punishment don\'t last.' },
          { text: 'The gym (2 visits) and the extra subscriptions: ₦20,000 for almost nothing.', outcome: 'Yes. Ten minutes to cancel, no loss she\'ll feel, ₦20,000 a month back. Quick wins first build momentum. The art class stays.', best: true },
          { text: 'Everything at once, starting tomorrow.', outcome: 'All five at once is a shock. She\'d last a week. Easy wins first, then the harder ones.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Cut in this order: things that give you nothing, then things you barely notice, then things you like a bit. Protect what you love.',
    },
  ],
  apply: {
    scenario: 'The first cut.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Gym ₦12,000 + subscriptions ₦8,000. How much does the first cut free up?',
        answers: ['20000', '20,000', '₦20,000', '₦20000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what to cut first.',
        lines: ['Things that give you nothing', 'Things you barely notice', 'Things you like a bit', 'Things you love (protect these)'],
      },
      {
        kind: 'sortGroups',
        prompt: 'For Ada: cut first, cut later, or protect?',
        groups: ['Cut first', 'Cut later', 'Protect'],
        items: [
          { text: 'Gym she visits twice', group: 0 },
          { text: 'Daily rides', group: 1 },
          { text: 'Weekend art class', group: 2 },
          { text: 'Extra subscriptions', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why not cut the art class first, even though it\'s ₦15,000?',
        options: [
          { text: 'It\'s free', why: 'It costs ₦15,000.' },
          { text: 'It\'s what she values most; cutting joy first makes the plan feel like punishment' },
          { text: 'Lucía said so', why: 'It\'s about Ada\'s values.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Ngozi says cut the art class. It\'s the biggest extra.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Ngozi\'s right.', why: 'Price alone doesn\'t decide what to cut.' },
          { text: 'Don\'t cut anything.', why: 'She needs ₦130,000 a month.' },
          { text: 'Biggest isn\'t the test. Value is. The gym and subscriptions give you almost nothing for ₦20,000. Start there.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The cutting rule.',
        template: 'Cut what gives you [[1]] first. [[2]] what you love.',
        blanks: [['nothing'], ['Protect']],
        distractors: ['joy', 'Sell'],
      },
      {
        kind: 'findBug',
        prompt: 'Which of Ada\'s plans will make the whole thing feel like punishment?',
        lines: [
          'Cancel the gym tonight.',
          'Drop the second streaming app.',
          'Quit the art class and stop seeing friends.',
        ],
        bug: 2,
        fix: 'Keep the art class and friends; cut what gives nothing first.',
        explanation: 'Losing what you love first makes people abandon the plan.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada needs ₦130,000 more a month. After the first ₦20,000 cut, how much more does she still need?',
        answers: ['110000', '110,000', '₦110,000', '₦110000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each cut to how it feels.',
        pairs: [
          ['Unused gym', 'Barely noticed'],
          ['Daily rides', 'Noticed for a week or two'],
          ['Art class', 'A real loss'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do quick wins matter?',
        options: [
          { text: 'They build momentum, so harder cuts feel possible' },
          { text: 'They\'re always the biggest', why: 'Often small, but easy.' },
          { text: 'They don\'t', why: 'Early wins keep people going.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one thing you pay for that gives you almost nothing? Could you cancel it tonight?',
    starters: ['I pay for...', 'It gives me...', 'Tonight I\'ll...'],
  },
  deepen: {
    title: 'Cutting with values',
    summary: 'Personal finance writer Ramit Sethi popularised "spend extravagantly on the things you love, and cut costs mercilessly on the things you don\'t." Chapter 3 is built on the same idea.',
  },
  notes: 'Ada Ch2 cuts (running numbers): gym 12,000 + subscriptions 8,000 = 20,000. Remaining gap 110,000. Sethi, I Will Teach You to Be Rich (2009) "conscious spending".',
};

export default lesson;
