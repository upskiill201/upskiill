import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or fact: presence. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Myth or fact: presence',
  summary: 'Diego quotes the famous rule: "Only 7% of communication is words." Four beliefs about presence. Which hold up?',
  minutes: 11,
  outcomes: [
    'Know where the 7-38-55 figure comes from',
    'Separate presence myths from facts',
    'Focus on what actually helps',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Only 7% of communication is words; 93% is tone and body language.',
          isFact: false,
          explain: 'Myth, as usually quoted. Mehrabian\'s 1967 studies used single words about feelings with mixed signals. He has said the figures don\'t apply to communication in general.',
        },
        {
          text: 'Reframing nerves as excitement can improve how a speech comes across.',
          isFact: true,
          explain: 'Fact. In Brooks (2014), speakers who said "I am excited" were rated more persuasive and confident.',
        },
        {
          text: 'Two minutes of power posing reliably changes your hormones.',
          isFact: false,
          explain: 'Myth. Ranehill et al. (2015) found no hormone effects in a larger replication.',
        },
        {
          text: 'Watching a recording of yourself is a useful way to improve.',
          isFact: true,
          explain: 'Fact, as practice. It shows you pace, fillers and eye contact as the audience experiences them.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Words matter a lot. Voice and body support them. Prepare, reframe nerves, record yourself.',
    },
  ],
  apply: {
    scenario: 'Presence myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Only 7% of communication is words', group: 0 },
          { text: '"I am excited" can help', group: 1 },
          { text: 'Power poses change hormones', group: 0 },
          { text: 'Recordings help you improve', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Mehrabian\'s studies actually test?',
        options: [
          { text: 'Full business presentations', why: 'Single words about feelings.' },
          { text: 'Job interviews', why: 'Single words about feelings.' },
          { text: 'Single words about feelings, with mixed signals' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year were Mehrabian\'s studies published?',
        answers: ['1967'],
        placeholder: 'A year',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the claim to the research.',
        pairs: [
          ['7-38-55 rule', 'Mehrabian, misquoted'],
          ['"I am excited"', 'Brooks (2014)'],
          ['Power-pose hormones', 'Not replicated (Ranehill, 2015)'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'So words only count for 7%? Then why did you spend a week on the message?',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'You\'re right, I wasted a week.', why: 'Words matter a lot.' },
          { text: 'That figure comes from studies of single words about feelings. In a talk, the words carry the message. Voice and body help them land.' },
          { text: 'Words are 100%, body language is nothing.', why: 'Both matter.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The callout.',
        template: 'Words matter a [[1]]. Voice and body [[2]] them.',
        blanks: [['lot'], ['support']],
        distractors: ['little', 'replace'],
      },
      {
        kind: 'mcq',
        prompt: 'What has Mehrabian said about the 7-38-55 figures?',
        options: [
          { text: 'They apply to every talk', why: 'He has said they don\'t.' },
          { text: 'Nothing', why: 'He has corrected the misuse.' },
          { text: 'They don\'t apply to communication in general' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Diego\'s advice is a myth?',
        lines: [
          'Record yourself and watch it back.',
          'Say "I am excited" before you start.',
          'Words barely matter; it\'s 93% body language.',
          'Slow down and pause.',
        ],
        bug: 2,
        fix: 'Words carry the message; voice and body support it.',
        explanation: 'That\'s the misquoted Mehrabian figure.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what actually helps, from preparation to delivery.',
        lines: ['A clear message', 'Practise and record', 'Reframe nerves', 'Slow pace and eye contact'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'According to the myth, what percentage of communication is words?',
        answers: ['7', '7%'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Have you heard the 7% rule before? Where? How would you explain it now?',
    starters: ['I heard it...', 'Now I\'d say...'],
  },
  deepen: {
    title: 'Executive presence',
    summary: '"Presence" isn\'t a mystery quality. Most of what people notice is learnable: a clear message, a calm pace, eye contact, and answers that come first.',
  },
  notes: 'Mehrabian & Wiener (1967) and Mehrabian & Ferris (1967): single-word, inconsistent-cue studies on feelings/attitudes; Mehrabian has said the 7-38-55 ratios don\'t generalise. Brooks (2014). Ranehill et al. (2015).',
};

export default lesson;
