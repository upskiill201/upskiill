import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or Fact: phishing and security myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Padlocks and other myths',
  summary: '"The padlock means it\'s safe." "I\'d recognise a fake call." "Two-step codes make me untouchable." Five beliefs about online safety, tested.',
  minutes: 10,
  outcomes: [
    'Correct common online-safety myths',
    'Understand what the padlock does and doesn\'t mean',
    'See two-step checks as strong but not magic',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A padlock in the browser means the website is genuine.',
          isFact: false,
          explain: 'Myth. The padlock only means the connection is encrypted. Scam sites can have padlocks too. It says nothing about who runs the site.',
        },
        {
          text: 'The words in a link always show where it goes.',
          isFact: false,
          explain: 'Myth. A link can say "yourbank.co.uk" and lead somewhere else entirely. The real address underneath is what counts.',
        },
        {
          text: 'Two-step verification makes accounts much harder to break into.',
          isFact: true,
          explain: 'Fact. It\'s one of the best protections there is. But if you\'re tricked into sharing the code, it can\'t protect you. That\'s why scammers ask for codes.',
        },
        {
          text: 'You\'d always recognise a fake call because scammers sound unprofessional.',
          isFact: false,
          explain: 'Myth. Many are calm, polite and well trained, with background call-centre noise and scripts. Some sound more professional than real staff.',
        },
        {
          text: 'Hanging up on a genuine bank won\'t cause you any problems.',
          isFact: true,
          explain: 'Fact. Banks expect it and would rather you hung up and called back than trusted an unexpected call.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Femi\'s padlock',
      beats: [
        { speaker: 'femi', text: 'But the fake parcel site had the padlock. I checked!' },
        { speaker: 'grace', text: 'The padlock means nobody can listen in. It doesn\'t mean you\'re talking to the right person.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Padlocks mean encrypted, not genuine. Link text can lie. Two-step checks are strong unless you share the code. Scammers can sound professional. Hanging up is always fine.',
    },
  ],
  apply: {
    scenario: 'Online-safety myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Padlock means genuine', group: 0 },
          { text: 'Two-step checks are a strong protection', group: 1 },
          { text: 'Link text shows the real destination', group: 0 },
          { text: 'Hanging up on your bank is fine', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the padlock actually mean?',
        options: [
          { text: 'The site is genuine', why: 'Scam sites have padlocks too.' },
          { text: 'The connection is encrypted' },
          { text: 'The government approved it', why: 'It\'s just encryption.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'I\'ve got two-step on everything. Nobody can get in.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Two-step is useless.', why: 'It\'s very valuable.' },
          { text: 'Then you can share codes safely.', why: 'Sharing codes defeats it.' },
          { text: 'Brilliant, it really helps. Just never share a code, because that\'s how they get past it.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The padlock.',
        template: 'The padlock means nobody can [[1]] in; it doesn\'t mean you\'re talking to the right [[2]].',
        blanks: [['listen'], ['person', 'site']],
        distractors: ['log', 'bank'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"It has a padlock"', 'Encrypted, not genuine'],
          ['"The link says yourbank"', 'The address underneath counts'],
          ['"Scammers sound unprofessional"', 'Many are trained and calm'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is wrong?',
        lines: [
          'Two-step checks make accounts harder to break into.',
          'Scammers ask for codes to get past them.',
          'So it\'s fine to share a code with someone who sounds professional.',
        ],
        bug: 2,
        fix: 'Never share codes with anyone.',
        explanation: 'Sounding professional is part of the act.',
      },
      {
        kind: 'mcq',
        prompt: 'How can you see where a link really goes on a computer?',
        options: [
          { text: 'Click it to find out', why: 'Clicking can be risky.' },
          { text: 'Hover over it and read the address' },
          { text: 'Read the link text', why: 'The text can lie.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many myths and facts were tested in this lesson?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a quick website check.',
        lines: ['Ignore the padlock as proof', 'Read the exact address', 'Compare it to the real address you know', 'If unsure, type the real address yourself'],
      },
      {
        kind: 'mcq',
        prompt: 'What does a genuine bank think if you hang up to check?',
        options: [
          { text: 'They\'ll close your account', why: 'They won\'t.' },
          { text: 'They\'ll charge a fee', why: 'They won\'t.' },
          { text: 'They\'d rather you did' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths did you believe? Which accounts of yours don\'t have two-step checks yet?',
    starters: ['I believed...', 'I\'ll add two-step to...'],
  },
  deepen: {
    title: 'Authenticator apps and passkeys',
    summary: 'Codes from an authenticator app, or passkeys, are generally harder to steal than text-message codes. Any form of two-step check is far better than none.',
  },
  notes: 'NCSC guidance on 2SV, padlock/HTTPS meaning. Femi, Jayden per CAST.',
};

export default lesson;
