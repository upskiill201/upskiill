import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or Fact: story myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Story myths',
  summary: 'Remi has heard that only work experience counts, that failure stories are dangerous, and that longer stories show more effort. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Use school, club and volunteer stories with confidence',
    'Tell failure stories well',
    'Keep stories to about two minutes',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Only stories from paid jobs count.',
          isFact: false,
          explain: 'Myth. For students and graduates, projects, clubs, volunteering and family businesses are normal and useful evidence.',
        },
        {
          text: 'Failure stories make you look bad.',
          isFact: false,
          explain: 'Myth. Interviewers often ask for failures on purpose. A clear failure story with what you changed shows honesty and growth.',
        },
        {
          text: 'A good STAR answer usually takes around one to two minutes.',
          isFact: true,
          explain: 'Fact. Long enough for real detail, short enough to leave room for follow-up questions.',
        },
        {
          text: 'Interviewers often ask follow-up questions about your stories.',
          isFact: true,
          explain: 'Fact. "What did you do next?" and "What would you do differently?" are common. Know your stories well enough to go deeper.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Any real experience counts. Failures are welcome when they show growth. Aim for one to two minutes, and know the details.',
    },
  ],
  apply: {
    scenario: 'Story myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Only paid-job stories count', group: 0 },
          { text: 'Failure stories look bad', group: 0 },
          { text: 'Aim for one to two minutes', group: 1 },
          { text: 'Expect follow-up questions', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Remi has never had a paid tech job. Which stories can he use?',
        options: [
          { text: 'None', why: 'Real experience counts wherever it happened.' },
          { text: 'Invented job stories', why: 'Never invent.' },
          { text: 'Projects, clubs, volunteering and his uncle\'s shop' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'If they ask for a failure, can I pick a fake one, like "I work too hard"?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Interviewers see through that. Use the hackathon crash: real failure, clear actions, a real change.' },
          { text: 'Yes, that\'s the classic answer.', why: 'It sounds evasive.' },
          { text: 'Say you\'ve never failed.', why: 'Not believable.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Only paid jobs count"', 'Any real experience counts'],
          ['"Hide your failures"', 'Show what you changed'],
          ['"Longer is better"', 'One to two minutes'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Length.',
        template: 'Aim for one to [[1]] minutes, and know the [[2]].',
        blanks: [['two', '2'], ['details']],
        distractors: ['ten', 'weather'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is a common follow-up to a STAR story?',
        options: [
          { text: '"What\'s your star sign?"', why: 'Not that kind of STAR.' },
          { text: '"Can you repeat it?"', why: 'They usually go deeper.' },
          { text: '"What would you do differently?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which belief in Remi\'s notes is a myth?',
        lines: [
          'Club and project stories count.',
          'Failure stories show growth if I explain what I changed.',
          'A five-minute story shows real effort.',
          'They\'ll probably ask follow-ups.',
        ],
        bug: 2,
        fix: 'One to two minutes is the sweet spot.',
        explanation: 'Long stories crowd out other questions.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the upper end of a good STAR answer, in minutes?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good evidence for a student, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'A group project with a clear result', group: 0 },
          { text: '"I\'m a people person"', group: 1 },
          { text: 'Running a club event', group: 0 },
          { text: '"I just know I\'d be good"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a strong failure story.',
        lines: ['What went wrong', 'Your part in it', 'What you did next', 'What you changed for good'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your best failure story in STAR, ending with what you changed.',
    starters: ['What went wrong:...', 'What I changed:...'],
  },
  deepen: {
    title: 'The "fake weakness"',
    summary: 'Answers like "I\'m a perfectionist" are so common that many interviewers treat them as a dodge. Real, specific, improving answers do better. More in Chapter 4.',
  },
  notes: 'Myth/fact synthesis; answer-length guidance (1–2 minutes) is common careers advice, not a research figure.',
};

export default lesson;
