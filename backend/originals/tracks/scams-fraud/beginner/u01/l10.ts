import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: how scams work. Cliffhanger: Femi's crypto mentor. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: "Hi Nan"',
  summary: 'Sunday in Salford. Nan shows Grace a text: "Hi Nan, it\'s Jayden, new number". Use everything from Chapter 1 to help her. Then on Monday, Femi can\'t stop talking about his crypto "mentor".',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Help someone else spot and stop a scam', 'Use the recipe and the pause'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, then Monday',
      beats: [
        { speaker: 'narrator', text: 'Nan, holding out her phone: "Is this our Jayden? He says he\'s lost his phone and needs £350 for his laptop repair."' },
        { speaker: 'grace', text: 'Mum, he\'s sitting right there eating your roast potatoes.' },
        { speaker: 'jayden', text: '(mouth full) Not me, Nan.' },
        { speaker: 'narrator', text: 'Monday, Kinwell kitchen. Femi, phone out: "This guy on Instagram is teaching me crypto trading. I put in £500, it\'s already £1,900. He says I\'m a natural."' },
        { speaker: 'tey', text: 'That\'s Chapter 1: impersonation, the four ingredients, hot thinking, the pause, and the scam file. Next: scams that promise to make you rich. First, Nan.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: Nan, 72, Salford. Text from an unknown number: "Hi Nan it\'s Jayden, new number, my laptop broke and I need £350 today for college, don\'t tell Mum she\'ll go mad x".',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Find the recipe in Nan\'s text.',
        pairs: [
          ['Urgency', '"Today"'],
          ['Familiarity', '"Hi Nan it\'s Jayden"'],
          ['Emotion', 'Love for her grandson'],
          ['Secrecy', '"Don\'t tell Mum"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which line is the strongest single warning sign?',
        options: [
          { text: '"Hi Nan"', why: 'Familiar, but secrecy is stronger.' },
          { text: '"Don\'t tell Mum"' },
          { text: '"Laptop broke"', why: 'Ordinary; secrecy is the giveaway.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Nan should do.',
        lines: ['Stop: don\'t pay', 'Call Jayden on his saved number', 'Ask for the family safe word', 'Block and report the number'],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Mum, if anyone ever asks you for money by text, what do you do?',
        prompt: 'Nan\'s best answer, after today?',
        options: [
          { text: 'Pay if they sound nice.', why: 'Scammers can sound very nice.' },
          { text: 'Reply and ask who it is.', why: 'That\'s the scammer\'s channel.' },
          { text: 'Ring them on the number I\'ve already got, or ring you. And ask for the safe word.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps Nan, or doesn\'t?',
        groups: ['Helps', 'Doesn\'t help'],
        items: [
          { text: 'A sticky note by her phone: "Ring first"', group: 0 },
          { text: 'Telling her she\'s silly', group: 1 },
          { text: 'Agreeing the safe word with her offline', group: 0 },
          { text: 'Telling her to just never use her phone', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What Grace tells Nan.',
        template: 'Anyone who says "don\'t [[1]] Mum" is trying to stop someone [[2]] you.',
        blanks: [['tell'], ['warning', 'protecting']],
        distractors: ['call', 'paying'],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan for Nan is unkind and unhelpful?',
        lines: [
          'Show her the scam recipe on one page.',
          'Agree a safe word in person.',
          'Take her bank card away "so she can\'t get scammed".',
        ],
        bug: 2,
        fix: 'Give her tools and support, not take away her independence.',
        explanation: 'Respect and simple checks work better than control.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much did Nan\'s text ask for, in pounds?',
        answers: ['350', '£350'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Femi says his £500 is "already £1,900". What should make Grace uneasy?',
        options: [
          { text: 'Nothing; crypto goes up', why: 'Fast gains plus a "mentor" are classic signs.' },
          { text: 'Huge fast gains shown on a screen he doesn\'t control' },
          { text: 'That it\'s on Instagram, which is always safe', why: 'Social media is a common scam channel.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Femi\'s £500 really became £1,900, by how many pounds would it have grown?',
        answers: ['1400', '1,400', '£1,400', '£1400'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does "he says I\'m a natural" do?',
        options: [
          { text: 'Proves Femi is skilled', why: 'It\'s flattery.' },
          { text: 'Nothing', why: 'It\'s an emotional hook.' },
          { text: 'Uses flattery to build trust and excitement' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Who in your family would most benefit from a "ring first" note by their phone?',
    starters: ['I\'d make one for...'],
  },
  notes: 'Chapter 1 challenge. Nan narrated. Cliffhanger: Femi\'s Instagram crypto "mentor", £500 → £1,900 on screen → Ch2 investment scams.',
};

export default lesson;
