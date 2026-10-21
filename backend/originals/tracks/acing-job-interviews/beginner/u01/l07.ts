import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Myth or Fact: interview myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Interview myths',
  summary: 'Remi\'s friends have opinions: "it\'s all luck", "memorise perfect answers", "they decide in ten seconds". Ada checks each one. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Drop common myths about interviews',
    'Prepare in ways that actually help',
    'Know that preparation changes results',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Interviews are mostly luck, so preparing doesn\'t help.',
          isFact: false,
          explain: 'Myth. Many interviews follow a set of planned questions. Prepared, structured answers score better against them.',
        },
        {
          text: 'You should memorise perfect answers word for word.',
          isFact: false,
          explain: 'Myth. Scripted answers sound robotic and fall apart with follow-up questions. Prepare the shape and the stories.',
        },
        {
          text: 'It\'s fine to pause and think before answering.',
          isFact: true,
          explain: 'Fact. "Good question, let me think" plus a few seconds of silence looks thoughtful, not lost.',
        },
        {
          text: 'You can ask the interviewer to repeat or clarify a question.',
          isFact: true,
          explain: 'Fact. "Do you mean in a team project or at work?" shows you want to answer the right question.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Prepare the shape and the stories, not a script. Pausing and asking for clarity are both fine.',
    },
  ],
  apply: {
    scenario: 'Interview myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Interviews are mostly luck', group: 0 },
          { text: 'Memorise every word', group: 0 },
          { text: 'It\'s fine to pause and think', group: 1 },
          { text: 'You can ask them to clarify', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do memorised answers often fail?',
        options: [
          { text: 'They sound robotic and break when the interviewer asks a follow-up' },
          { text: 'They\'re too short', why: 'It\'s about flexibility.' },
          { text: 'They don\'t fail', why: 'Follow-ups break scripts.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'If I pause, won\'t they think I don\'t know?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Say "Good question, let me think," and take a few seconds. It looks thoughtful.' },
          { text: 'Never pause.', why: 'Rushing leads to rambling.' },
          { text: 'Pause for a full minute.', why: 'A few seconds is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"It\'s luck"', 'Preparation helps'],
          ['"Memorise it"', 'Prepare the shape'],
          ['"Never pause"', 'Pausing looks thoughtful'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A pause line.',
        template: '"Good [[1]], let me [[2]]."',
        blanks: [['question'], ['think']],
        distractors: ['grief', 'leave'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a good way to clarify a vague question?',
        options: [
          { text: '"Do you mean in a team project or at work?"' },
          { text: '"That\'s a bad question."', why: 'Rude.' },
          { text: 'Guess and answer anything', why: 'You may answer the wrong question.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s friends\' advice is a myth?',
        lines: [
          'Prepare your stories.',
          'Practise out loud.',
          'Don\'t bother, it\'s all luck.',
          'Research the company.',
        ],
        bug: 2,
        fix: 'Preparation improves your answers.',
        explanation: 'Structured interviews reward preparation.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many seconds of pause is fine before answering? (a small number)',
        answers: ['3', 'three', '2', 'two', '5', 'five', 'a few'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful preparation or not?',
        groups: ['Helpful', 'Not'],
        items: [
          { text: 'Practising stories out loud', group: 0 },
          { text: 'Memorising a script word for word', group: 1 },
          { text: 'Knowing the shape of your answer', group: 0 },
          { text: 'Hoping you get lucky', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle a question you didn\'t expect.',
        lines: ['Pause', 'Clarify if needed', 'Think which of the five it tests', 'Answer briefly'],
      },
    ],
  },
  reflect: {
    prompt: 'Which interview myth have you believed? How has it affected how you prepare?',
    starters: ['I believed...', 'It made me...'],
  },
  deepen: {
    title: 'Practising out loud',
    summary: 'Saying answers out loud, to a friend, a mirror or a phone recording, shows you where you ramble. It\'s different from rehearsing in your head.',
  },
  notes: 'Myth/fact synthesis; structured interviews (Schmidt & Hunter 1998; Sackett et al. 2022) reward prepared, relevant answers.',
};

export default lesson;
