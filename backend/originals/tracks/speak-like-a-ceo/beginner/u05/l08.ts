import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Myth or fact: questions and nerves. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Myth or fact: questions and nerves',
  summary: 'The night before, Marta texts Lucía her worries. Four beliefs about Q&A and nerves. Which hold up?',
  minutes: 11,
  outcomes: [
    'Separate Q&A and nerves myths from facts',
    'Answer the "must know everything" worry',
    'Go into the talk with realistic expectations',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A good speaker knows the answer to every question.',
          isFact: false,
          explain: 'Myth. Good speakers say "I don\'t know yet", share what they do know, and follow up. That often builds more trust than a bluff.',
        },
        {
          text: 'Audiences notice your nerves less than you think.',
          isFact: true,
          explain: 'Fact. Savitsky and Gilovich (2003) found speakers overestimate how visible their nervousness is.',
        },
        {
          text: 'If you\'re still nervous after all this practice, you\'re not ready.',
          isFact: false,
          explain: 'Myth. Many experienced speakers still feel nerves. Being ready means prepared, not calm.',
        },
        {
          text: 'People overestimate how much others notice about them.',
          isFact: true,
          explain: 'Fact. The spotlight effect (Gilovich, Medvec and Savitsky, 2000): about half expected to be noticed; about a quarter were.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ready means prepared, not calm. You don\'t need every answer, and they see less than you think.',
    },
  ],
  apply: {
    scenario: 'Q&A and nerves myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Good speakers know every answer', group: 0 },
          { text: 'Nerves are less visible than felt', group: 1 },
          { text: 'Nervous means not ready', group: 0 },
          { text: 'People overestimate being noticed', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "ready" mean?',
        options: [
          { text: 'Prepared, even if still nervous' },
          { text: 'Completely calm', why: 'Prepared, not calm.' },
          { text: 'Knowing every answer', why: 'Prepared.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'You\'re still nervous after five weeks of practice? Maybe you\'re not ready.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'You\'re right, I should cancel.', why: 'Prepared is ready.' },
          { text: 'Nerves don\'t mean not ready. I know my message, my first line and my ten questions. That\'s ready.' },
          { text: 'I\'m not nervous at all.', why: 'Nerves are normal.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Know every answer"', 'Say what you know, then follow up'],
          ['"Nervous means not ready"', 'Ready means prepared'],
          ['"Everyone will see my nerves"', 'They see much less than you feel'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The callout.',
        template: 'Ready means [[1]], not [[2]].',
        blanks: [['prepared'], ['calm']],
        distractors: ['perfect', 'tired'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks has Lucía been preparing?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What can build more trust than a bluff?',
        options: [
          { text: 'A confident made-up number', why: 'Bluffs can backfire.' },
          { text: 'Changing the subject', why: 'Honest uncertainty.' },
          { text: 'An honest "I don\'t know yet" with a follow-up' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Marta\'s worries is a myth?',
        lines: [
          'You should know your first line.',
          'You should check the microphone.',
          'If someone asks something you don\'t know, you\'ve failed.',
          'You should get some sleep.',
        ],
        bug: 2,
        fix: '"I don\'t know yet" with a follow-up is fine.',
        explanation: 'Nobody knows everything.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s night-before.',
        lines: ['One easy run-through', 'Check the clicker', 'Read the illusion of transparency study', 'Sleep'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many statements in this lesson were facts?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths have you believed? How would you answer it now?',
    starters: ['I believed...', 'Now I\'d say...'],
  },
  deepen: {
    title: 'Nerves and experience',
    summary: 'Experience doesn\'t always remove nerves. It changes what you do with them: you know they pass, you know the routine, and you start anyway.',
  },
  notes: 'Savitsky & Gilovich (2003); Gilovich, Medvec & Savitsky (2000).',
};

export default lesson;
