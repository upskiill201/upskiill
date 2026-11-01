import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Myth or Fact: body-language myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Body-language myths',
  summary: '"93% of communication is body language." "Your handshake decides everything." Remi\'s seen the posters. Ada checks what\'s actually true.',
  minutes: 11,
  outcomes: [
    'Know where the "93% non-verbal" claim comes from',
    'Keep body language simple and natural',
    'Focus on what you say most of all',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Only 7% of communication is words; 93% is body language and tone.',
          isFact: false,
          explain: 'Myth. Albert Mehrabian\'s 1960s studies tested single words about feelings, when tone and words didn\'t match. He has said the numbers don\'t apply to ordinary communication. In interviews, what you say matters a lot.',
        },
        {
          text: 'Looking at people while you talk and listen helps you come across as engaged.',
          isFact: true,
          explain: 'Fact. Natural eye contact, not staring, signals attention. On video, look at the camera when you speak.',
        },
        {
          text: 'One weak handshake ruins your chances.',
          isFact: false,
          explain: 'Myth. First impressions matter, but structured interviews score your answers. A nervous handshake is quickly forgotten.',
        },
        {
          text: 'Sitting up and keeping your hands visible tends to look more open and engaged.',
          isFact: true,
          explain: 'Fact. Simple, natural posture helps. You don\'t need tricks, just comfortable openness.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Words matter most. Keep body language simple: natural eye contact, sitting up, hands visible.',
    },
  ],
  apply: {
    scenario: 'Body-language myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: '93% of communication is non-verbal', group: 0 },
          { text: 'Natural eye contact looks engaged', group: 1 },
          { text: 'A weak handshake ruins everything', group: 0 },
          { text: 'Open posture helps', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Mehrabian\'s studies actually test?',
        options: [
          { text: 'Single words about feelings when tone and words didn\'t match' },
          { text: 'Job interviews', why: 'Not at all.' },
          { text: 'All human communication', why: 'He says the numbers don\'t apply broadly.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'So if body language is 93%, my answers barely matter?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Right, focus on posing.', why: 'Answers matter most.' },
          { text: 'Words are 7%, so skip preparation.', why: 'Based on a myth.' },
          { text: 'That number is a misreading. Your answers are what they score. Body language just shouldn\'t get in the way.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"93% is body language"', 'Words matter a lot'],
          ['"Handshake decides it"', 'Answers are scored'],
          ['"Stare to show confidence"', 'Natural eye contact'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Simple body language.',
        template: 'Natural eye [[1]], sitting up, hands [[2]].',
        blanks: [['contact'], ['visible']],
        distractors: ['rolls', 'hidden'],
      },
      {
        kind: 'mcq',
        prompt: 'On a video interview, where should you look when speaking?',
        options: [
          { text: 'At your own picture', why: 'It looks like looking away.' },
          { text: 'At the camera' },
          { text: 'At your notes', why: 'Glance only.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s body-language plan is a myth?',
        lines: [
          'Sit up and keep my hands visible.',
          'Look at whoever is speaking.',
          'Practise a "power stare" so they\'re impressed.',
          'Smile when I greet them.',
        ],
        bug: 2,
        fix: 'Natural eye contact, not staring.',
        explanation: 'Staring feels uncomfortable, not impressive.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What percentage does the myth claim is "words"?',
        answers: ['7', '7%'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful or a distraction?',
        groups: ['Helpful', 'Distraction'],
        items: [
          { text: 'A relaxed, upright posture', group: 0 },
          { text: 'Clicking a pen', group: 1 },
          { text: 'Nodding while listening', group: 0 },
          { text: 'Checking your phone', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order what matters most in an interview, most to least.',
        lines: ['What you say', 'How clearly you say it', 'Natural body language'],
      },
    ],
  },
  reflect: {
    prompt: 'Record yourself answering one question. Watch with the sound off. Is anything distracting?',
    starters: ['With the sound off, I noticed...'],
  },
  deepen: {
    title: 'The Mehrabian myth',
    summary: 'The "7-38-55" rule is one of the most misquoted findings in communication. Mehrabian himself has said it only applies when someone talks about feelings and their tone contradicts their words.',
  },
  notes: 'Mehrabian & Wiener (1967) and Mehrabian & Ferris (1967): single-word, feeling-related, inconsistent messages; Mehrabian has stated the ratios do not apply to general communication.',
};

export default lesson;
