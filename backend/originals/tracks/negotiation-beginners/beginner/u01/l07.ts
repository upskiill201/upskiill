import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Myth or Fact: asking myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Asking myths',
  summary: 'Ada has heard it all: "good negotiators are aggressive", "asking makes you look weak", "nice people don\'t negotiate". Which of these are true? Fact or myth?',
  minutes: 11,
  outcomes: [
    'Separate common beliefs about asking from the evidence',
    'Know that asking for advice can raise how competent you look',
    'See that preparation matters more than toughness',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Good negotiators are loud and aggressive.',
          isFact: false,
          explain: 'Myth. Aggression often gets the other side to dig in. Preparation, clear asks and curiosity about the other side matter more.',
        },
        {
          text: 'People say yes to direct requests more often than we predict.',
          isFact: true,
          explain: 'Fact. In studies by Frank Flynn and Vanessa Lake, people asking strangers for help badly underestimated how many would agree.',
        },
        {
          text: 'Asking for advice makes you look less competent.',
          isFact: false,
          explain: 'Myth. Brooks, Gino and Schweitzer found people who asked for advice on hard tasks were seen as more competent, especially by the person they asked.',
        },
        {
          text: 'You can be kind and still negotiate.',
          isFact: true,
          explain: 'Fact. Be soft on the person and firm on the problem. That\'s the heart of principled negotiation.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Kind and firm go together: soft on the person, clear about what you need.',
    },
  ],
  apply: {
    scenario: 'Asking myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Good negotiators are aggressive', group: 0 },
          { text: 'People say yes more than we predict', group: 1 },
          { text: 'Asking for advice looks weak', group: 0 },
          { text: 'You can be kind and still negotiate', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Flynn and Lake find about people asking for help?',
        options: [
          { text: 'They underestimated how many people would say yes' },
          { text: 'They overestimated it', why: 'The opposite.' },
          { text: 'Nobody said yes', why: 'Many more agreed than predicted.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I ask Lucía how she negotiated her promotion? Won\'t she think I\'m clueless?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Ask. Asking someone experienced for advice on something hard tends to make you look more competent, not less.' },
          { text: 'Don\'t, she\'ll think less of you.', why: 'Research suggests the opposite.' },
          { text: 'Ask a stranger instead.', why: 'Asking the right person matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Be aggressive"', 'Be prepared and clear'],
          ['"Asking looks weak"', 'Advice-seekers can look more competent'],
          ['"Nice people can\'t negotiate"', 'Soft on people, firm on problems'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The principle.',
        template: 'Be soft on the [[1]] and firm on the [[2]].',
        blanks: [['person', 'people'], ['problem']],
        distractors: ['price', 'phone'],
      },
      {
        kind: 'mcq',
        prompt: 'When does asking for advice help how competent you look most?',
        options: [
          { text: 'On a hard task, when you ask someone who knows the area' },
          { text: 'On a very easy task', why: 'There it made little difference.' },
          { text: 'When you ask anyone at all', why: 'Asking someone who can\'t help can backfire.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Ada\'s new rules is a myth?',
        lines: [
          'Prepare before I ask.',
          'Be polite and clear.',
          'Shout a bit so they know I\'m serious.',
          'Ask experienced people for advice.',
        ],
        bug: 2,
        fix: 'Stay calm; be firm on what I need.',
        explanation: 'Aggression usually makes people dig in.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Soft on the person, or firm on the problem?',
        groups: ['Soft on the person', 'Firm on the problem'],
        items: [
          { text: '"Thank you for telling me early."', group: 0 },
          { text: '"₦1,500,000 is more than I can pay."', group: 1 },
          { text: '"I\'ve enjoyed living here."', group: 0 },
          { text: '"I need the rent to stay under ₦1,400,000."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Brooks, Gino and Schweitzer studied asking for what? (one word)',
        answers: ['advice'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a kind-but-firm message.',
        lines: ['Thank them', 'Say what you value', 'Say what you need', 'Ask to talk'],
      },
    ],
  },
  reflect: {
    prompt: 'Which myth have you believed? How has it stopped you asking?',
    starters: ['I believed...', 'It stopped me from...'],
  },
  deepen: {
    title: 'Soft on people, hard on problems',
    summary: 'Getting to Yes says to separate the people from the problem. You can respect and like someone while being clear that a number doesn\'t work for you.',
  },
  notes: 'Flynn & Lake (2008), "If you need help, just ask: Underestimating compliance with direct requests for help", JPSP 95(1). Brooks, Gino & Schweitzer (2015), "Smart People Ask for (My) Advice", Management Science 61(6). Fisher, Ury & Patton, Getting to Yes.',
};

export default lesson;
