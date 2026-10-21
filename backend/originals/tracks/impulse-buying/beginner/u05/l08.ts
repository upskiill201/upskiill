import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Myth or Fact: "never buy anything fun". */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"Never buy anything fun"',
  summary: 'After everything, is the goal of this course to never buy anything just because you want it? No. Five myths about stopping impulse buying, tested.',
  minutes: 10,
  outcomes: [
    'Keep fun spending without the regret',
    'Tell spending on purpose from spending on impulse',
    'Know what "success" looks like',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The goal is to never buy anything on impulse again.',
          isFact: false,
          explain: 'Myth. Small, affordable treats, even unplanned ones, are fine. The goal is fewer regretted buys, not zero joy.',
        },
        {
          text: 'Planned fun spending is spending on purpose.',
          isFact: true,
          explain: 'Fact. Kofi\'s fun line pays for kelewele, match nights and the odd jersey. Planned, so there\'s no regret.',
        },
        {
          text: 'If you buy something you want, you\'ve failed the course.',
          isFact: false,
          explain: 'Myth. Kofi\'s Black Friday win was buying something he wanted. On purpose, at a fair price, from saved money.',
        },
        {
          text: 'Most people who change their spending still slip sometimes.',
          isFact: true,
          explain: 'Fact. Kofi still logs the occasional late-night buy. The difference is it\'s GH₵40, not GH₵480, and he knows why.',
        },
        {
          text: 'Stopping impulse buying means feeling deprived forever.',
          isFact: false,
          explain: 'Myth. Most people find they feel calmer, not deprived: less regret, less money stress, more for the things that matter.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Kelewele',
      beats: [
        { speaker: 'efua', text: 'You bought kelewele without it being on a list. Busted.' },
        { speaker: 'kofi', text: 'Fun line. Twelve cedis. Zero regret. Not busted.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Success isn\'t zero buying. It\'s buying on purpose: planned, affordable and worth it, with fewer regrets and more money for what matters.',
    },
  ],
  apply: {
    scenario: 'What success looks like.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'The goal is zero impulse buys forever', group: 0 },
          { text: 'Planned fun is spending on purpose', group: 1 },
          { text: 'People who change still slip sometimes', group: 1 },
          { text: 'Buying something you want means you failed', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does success look like for Kofi?',
        options: [
          { text: 'Fewer regretted buys, planned fun, and money for what matters' },
          { text: 'Never buying anything fun', why: 'That\'s deprivation, and it breaks.' },
          { text: 'Buying everything on sale', why: 'That\'s last year.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each purchase to how it fits.',
        pairs: [
          ['GH₵12 kelewele from the fun line', 'Fine, on purpose'],
          ['GH₵720 interface, planned and saved for', 'A win'],
          ['GH₵480 boots at 2 a.m.', 'The kind to avoid'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I bought a GH₵15 drink I didn\'t plan. Have I failed?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'GH₵15, affordable, enjoyed? That\'s fine. Failing would be another GH₵2,900. You\'re nowhere near that.' },
          { text: 'Yes, start again.', why: 'Small slips aren\'t failure.' },
          { text: 'Never buy drinks.', why: 'Too strict to last.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Success.',
        template: 'Not zero buying, but buying on [[1]].',
        blanks: [['purpose']],
        distractors: ['credit', 'sale'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s impulse spending: GH₵310 in week 1, about GH₵40 a week now. How much less per week?',
        answers: ['270', 'GH₵270', '270 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which belief will make Kofi feel deprived and quit?',
        lines: [
          'I keep a fun line every week.',
          'I pause unplanned buys.',
          'Every unplanned cedi is a failure.',
        ],
        bug: 2,
        fix: 'Small unplanned treats are fine; big ones get the pause.',
        explanation: 'Perfection turns every small treat into guilt, and guilt turns into giving up.',
      },
      {
        kind: 'mcq',
        prompt: 'How do most people feel after changing their spending?',
        options: [
          { text: 'Calmer: less regret and less money stress' },
          { text: 'Miserable', why: 'Usually not, if fun stays in the plan.' },
          { text: 'Exactly the same', why: 'Less regret is a real change.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what spending on purpose looks like.',
        lines: ['Planned or paused', 'Affordable from a line', 'Worth it to you', 'Enjoyed without regret'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is it okay that Kofi still slips sometimes?',
        options: [
          { text: 'Slips are small now, and he understands them' },
          { text: 'It isn\'t okay', why: 'Small, understood slips are normal.' },
          { text: 'Because slips are good', why: 'They\'re not good, just normal and manageable.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What does spending on purpose look like for you? What fun will you keep, and what will you pause?',
    starters: ['I\'ll keep...', 'I\'ll pause...'],
  },
  deepen: {
    title: 'Progress you can measure',
    summary: 'Compare your urge log from week 1 with now: how many urges, how many bought, how much spent, how many regretted. Progress in money habits is rarely a straight line, but over months the numbers tell the story.',
  },
  notes: 'Fictional progress numbers (310 → ~40/week).',
};

export default lesson;
