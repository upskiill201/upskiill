import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Myth or Fact: length myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Length myths',
  summary: 'Brian Otieno thinks long emails look thorough. Remi thinks short ones look rude. Zanele checks both against the research. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Drop myths about long and short messages',
    'Know how people really read on screens',
    'Write short without sounding rude',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Longer, more complex writing makes you look smarter.',
          isFact: false,
          explain: 'Myth. In Daniel Oppenheimer\'s 2006 experiments, needlessly complex writing made readers judge the author as less intelligent, not more.',
        },
        {
          text: 'Most people skim work messages instead of reading every word.',
          isFact: true,
          explain: 'Fact. Eye-tracking studies by the Nielsen Norman Group found people often scan web text in an F-shape: the first lines, then the left edge.',
        },
        {
          text: 'Short emails are rude.',
          isFact: false,
          explain: 'Myth. A greeting, a clear point and a thank-you is polite. Rudeness comes from tone, not length.',
        },
        {
          text: 'Putting the point first helps skimmers find it.',
          isFact: true,
          explain: 'Fact. If people read the start and skim the rest, the start is where the point belongs.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Complexity doesn\'t impress. People skim. Short can be polite. Put the point where they\'ll see it.',
    },
  ],
  apply: {
    scenario: 'Length myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Complex writing looks smarter', group: 0 },
          { text: 'Most people skim', group: 1 },
          { text: 'Short emails are rude', group: 0 },
          { text: 'Point first helps skimmers', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Oppenheimer find about needlessly complex writing?',
        options: [
          { text: 'Readers were impressed', why: 'The opposite.' },
          { text: 'It made no difference', why: 'Complexity hurt.' },
          { text: 'Readers judged the author as less intelligent' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What letter describes the shape people often scan web text in?',
        answers: ['F'],
        placeholder: 'A letter',
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'A long email shows you\'ve really deep-dived it.',
        prompt: "Zanele's best reply?",
        options: [
          { text: 'Research says the opposite: needless complexity makes writers seem less capable. The deep dive can go in the attachment.' },
          { text: 'You\'re right, I\'ll write more.', why: 'Long hides the point.' },
          { text: 'Long emails are banned.', why: 'Just share the evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Complex looks smart"', 'Complex looks less smart'],
          ['"People read every word"', 'People skim'],
          ['"Short is rude"', 'Tone, not length, is rude'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Rudeness comes from [[1]], not [[2]].',
        blanks: [['tone'], ['length']],
        distractors: ['fonts', 'kindness'],
      },
      {
        kind: 'mcq',
        prompt: 'If people scan in an F-shape, where should the point go?',
        options: [
          { text: 'At the bottom', why: 'Most won\'t get there.' },
          { text: 'In the middle', why: 'Put it first.' },
          { text: 'In the first line or two' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Brian\'s advice is a myth?',
        lines: [
          'Know your numbers.',
          'Use long words so people take you seriously.',
          'Give the result clearly.',
          'Attach the detail.',
        ],
        bug: 1,
        fix: 'Use short, common words.',
        explanation: 'Needless complexity makes readers rate you lower.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Oppenheimer publish his study on complex words?',
        answers: ['2006'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'Short and polite, or short and rude?',
        groups: ['Polite', 'Rude'],
        items: [
          { text: '"Thanks, Emeka. Could you send it by Thursday?"', group: 0 },
          { text: '"Send it. Now."', group: 1 },
          { text: '"Got it, thank you!"', group: 0 },
          { text: '"Whatever."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever written long to look thorough? What would the short version have been?',
    starters: ['I wrote...', 'The short version:...'],
  },
  deepen: {
    title: 'The Ig Nobel paper',
    summary: 'Oppenheimer\'s paper, titled "Consequences of Erudite Vernacular Utilized Irrespective of Necessity", won an Ig Nobel Prize, partly because its title proves its own point.',
  },
  notes: 'Oppenheimer (2006), "Consequences of erudite vernacular utilized irrespective of necessity: Problems with using long words needlessly", Applied Cognitive Psychology 20(2). Nielsen (2006), "F-shaped pattern for reading web content", Nielsen Norman Group eye-tracking research.',
};

export default lesson;
