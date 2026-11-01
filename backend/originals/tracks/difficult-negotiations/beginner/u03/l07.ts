import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Myth or Fact: unreasonable-request myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Unreasonable-request myths',
  summary: 'Joel believes good service means always saying yes. Kavya believes clients who ask for more are trying to cheat. Both are wrong in ways that cost money. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Drop beliefs that make you say yes to everything',
    'See most unreasonable requests as innocent',
    'Know that clear limits build trust',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Good service means always saying yes.',
          isFact: false,
          explain: 'Myth. Saying yes to everything leads to missed dates and burned-out teams. Good service means reliable delivery of what you promised.',
        },
        {
          text: 'Most unreasonable requests come from not knowing what things cost.',
          isFact: true,
          explain: 'Fact. Ms Okafor-Lane didn\'t know gift cards were two weeks of work. Showing the cost usually solves it.',
        },
        {
          text: 'Clients respect people who set clear limits.',
          isFact: true,
          explain: 'Fact. Clear scope, prices and payment terms make you look professional. Vague yeses make you look like you\'ll be late.',
        },
        {
          text: 'If you say no once, the client will leave.',
          isFact: false,
          explain: 'Myth. A calm, reasoned no with an alternative rarely loses a good client. Harlow & Finch accepted phase two without blinking.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Clear limits build trust. Most unreasonable requests just need the cost shown kindly.',
    },
  ],
  apply: {
    scenario: 'Request myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Good service means always yes', group: 0 },
          { text: 'Most big requests come from not knowing the cost', group: 1 },
          { text: 'Clients respect clear limits', group: 1 },
          { text: 'One no and they\'ll leave', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does good service really mean here?',
        options: [
          { text: 'Saying yes to everything', why: 'That breaks promises.' },
          { text: 'Reliably delivering what you promised' },
          { text: 'Never talking to the client', why: 'Communication matters.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'She asked for 14 features. She\'s trying to cheat us.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Yes, cut her off.', why: 'She responded well to seeing the cost.' },
          { text: 'Give her all 14 to be nice.', why: 'Show costs; let her choose.' },
          { text: 'More likely she didn\'t know what they cost. When you showed her, she chose four. That\'s not cheating.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Always say yes"', 'Deliver what you promised'],
          ['"They\'re cheating"', 'They don\'t know the cost'],
          ['"A no loses them"', 'A clear no with options builds trust'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The lesson.',
        template: 'Clear [[1]] build trust. Show the [[2]] kindly.',
        blanks: [['limits'], ['cost']],
        distractors: ['secrets', 'anger'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do vague yeses hurt trust?',
        options: [
          { text: 'They don\'t', why: 'Surprises damage trust.' },
          { text: 'They lead to missed dates and surprises later' },
          { text: 'Clients hate the word yes', why: 'They hate broken promises.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of the 14 features did Ms Okafor-Lane choose for phase one?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Joel\'s service rules is a myth?',
        lines: [
          'Deliver what we promise, on time.',
          'Show the cost of every extra.',
          'Never say no to a client.',
          'Offer options when we can\'t say yes.',
        ],
        bug: 2,
        fix: 'Say no kindly, with an option.',
        explanation: 'Never saying no breaks the first rule.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds trust, or erodes it?',
        groups: ['Builds trust', 'Erodes trust'],
        items: [
          { text: 'A written scope', group: 0 },
          { text: 'Agreeing, then missing the date', group: 1 },
          { text: 'Prices shown up front', group: 0 },
          { text: 'Surprise invoices', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a trust-building response to a big request.',
        lines: ['Thank them', 'Show what it costs', 'Offer options', 'Deliver what you agree'],
      },
    ],
  },
  reflect: {
    prompt: 'Which myth have you believed? How has it affected your work?',
    starters: ['I believed...', 'It meant...'],
  },
  deepen: {
    title: 'Reliability is the product',
    summary: 'For service businesses, being reliable is often what clients value most. A smaller promise kept beats a bigger promise broken.',
  },
  notes: 'Myth/fact synthesis from client-management practice and Ury, The Power of a Positive No. Fictional examples.',
};

export default lesson;
