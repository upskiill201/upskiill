import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or Fact: time and risk myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Time myths',
  summary: '"Young people should take maximum risk." "Long-term means no risk." "I can invest my wedding money aggressively to grow it faster." Five beliefs about time and risk, tested.',
  minutes: 10,
  outcomes: [
    'Correct common beliefs about age, time and risk',
    'Avoid taking extra risk with short-term money',
    'Know what time can and can\'t do',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Long-term investments have no risk.',
          isFact: false,
          explain: 'Myth. Time makes losses less likely to last, but long-term investments can still end lower. Time reduces risk; it doesn\'t remove it.',
        },
        {
          text: 'Being young automatically means you should take maximum risk.',
          isFact: false,
          explain: 'Myth. Age is one factor. A young person with no emergency fund, uneven income or a near-term goal may have low capacity for risk.',
        },
        {
          text: 'Taking more risk with short-term money to "grow it faster" is dangerous.',
          isFact: true,
          explain: 'Fact. With a short deadline, there\'s no time to recover from a fall. Short-term money needs safety more than growth.',
        },
        {
          text: 'You always know exactly when you\'ll need money.',
          isFact: false,
          explain: 'Myth. Appa\'s operation and Mr Rao\'s late payment weren\'t planned. That\'s exactly why an emergency fund exists.',
        },
        {
          text: 'The right risk for each pot can change as life changes.',
          isFact: true,
          explain: 'Fact. A new baby, a new job, a big debt or a goal getting closer can all change how much risk a pot should carry.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Vikram\'s advice',
      beats: [
        { speaker: 'narrator', text: 'Vikram: "You\'re 29, bro. Max risk. You\'ve got time." Arjun: "I also had an operation to pay for with two months\' notice."' },
        { speaker: 'arjun', text: 'Time is one factor. Not the only one.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Time reduces risk; it doesn\'t remove it. Young isn\'t the same as high capacity. Short-term money needs safety. Review risk when life changes.',
    },
  ],
  apply: {
    scenario: 'Time myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Long-term means no risk', group: 0 },
          { text: 'Extra risk with short-term money is dangerous', group: 1 },
          { text: 'Young means maximum risk, always', group: 0 },
          { text: 'Right risk changes as life changes', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does time do to investment risk?',
        options: [
          { text: 'Reduces it, but doesn\'t remove it' },
          { text: 'Removes it completely', why: 'Long-term money can still end lower.' },
          { text: 'Increases it', why: 'It gives time to recover.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'I\'m 23. I should take maximum risk, right?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, maximum.', why: 'Age isn\'t the only factor.' },
          { text: 'Age helps, but with no savings and uneven pay your capacity is low. Build the fund first.' },
          { text: 'No risk ever.', why: 'Some long-term risk can make sense later.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Short-term money.',
        template: 'Short-term money needs [[1]] more than [[2]].',
        blanks: [['safety'], ['growth']],
        distractors: ['risk', 'tips'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each life change to its effect on risk.',
        pairs: [
          ['A goal gets closer', 'Pot should get safer'],
          ['A new baby', 'More people depend on you'],
          ['A big new debt', 'Lower capacity'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Vikram\'s advice is wrong?',
        lines: [
          'Long-term money can ride out falls.',
          'Time helps recovery.',
          'So put your wedding money in options too.',
        ],
        bug: 2,
        fix: 'Wedding money is short-term: keep it safe.',
        explanation: 'Time only helps money you won\'t need soon.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t you always know when you\'ll need money?',
        options: [
          { text: 'You always can', why: 'Arjun\'s didn\'t warn him.' },
          { text: 'Banks hide dates', why: 'Life is unpredictable.' },
          { text: 'Emergencies like health and late payments are unplanned' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Arjun is 29. How many years until age 60?',
        answers: ['31', 'thirty-one'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the factors to check besides age.',
        lines: ['Emergency fund', 'Income stability', 'Dependants', 'Each goal\'s date'],
      },
      {
        kind: 'mcq',
        prompt: 'When should you review the risk of your pots?',
        options: [
          { text: 'Never', why: 'Life changes risk.' },
          { text: 'When life changes, and at a regular review' },
          { text: 'Every hour', why: 'That leads to panic.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which life change in the next few years might change how much risk you can take?',
    starters: ['The change is...', 'It would mean...'],
  },
  deepen: {
    title: 'Human capital',
    summary: 'Your future earnings are sometimes called "human capital". A young person with a steady, secure career has a lot of it, which can support more investment risk. Uneven or insecure income supports less.',
  },
  notes: 'Vikram narrated. 60 − 29 = 31. Human capital: standard finance concept.',
};

export default lesson;
