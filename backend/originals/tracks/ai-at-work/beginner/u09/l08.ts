import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 8 — asking for help or more time. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Asking for help or more time',
  summary: 'The outage week is chaos. Ada needs help from the bank and two more days on the week 8 review. Most people put off asking. Myths and facts first.',
  minutes: 12,
  outcomes: [
    'Know why asking for help is easier than it feels',
    'Ask for more time early, with a new date',
    'Use AI to make a request clear and short',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'People usually say no when you ask for help.',
          isFact: false,
          explain: 'Research by Flynn and Lake (2008) found people underestimated how likely others were to help, by about half.',
        },
        {
          text: 'Asking for more time early is better than missing a deadline quietly.',
          isFact: true,
          explain: 'An early, clear request with a new date lets others plan. A surprise miss damages trust.',
        },
        {
          text: 'A good request is long and explains every reason.',
          isFact: false,
          explain: 'Short is better: what you need, why in one line, by when, and what you\'re offering.',
        },
        {
          text: 'AI can turn a rambling request into a clear, short one.',
          isFact: true,
          explain: 'Paste your draft and ask: "Make this a clear, short request: what, why in one line, by when."',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask early. What you need, why in one line, by when, and the new date if it\'s a delay. People help more often than you think.',
    },
  ],
  apply: {
    scenario: 'Ada asks for help and more time.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Flynn and Lake (2008) find?',
        options: [
          { text: 'People rarely help', why: 'The opposite.' },
          { text: 'People underestimated how likely others were to help' },
          { text: 'Asking is always rude', why: 'Not the finding.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good request, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: '"Could you share the bank\'s incident report by Wednesday?"', group: 0 },
          { text: '"Sorry to bother you, I know you\'re busy, but maybe..."', group: 1 },
          { text: '"Can I move the review to Friday? Outage work took two days."', group: 0 },
          { text: 'Saying nothing and missing the deadline', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best tightens Ada\'s draft?',
        options: [
          { text: 'Make it longer and more apologetic.', why: 'Shorter is better.' },
          { text: 'Make this a clear, short request: what I need, why in one line, by when. Keep it friendly.' },
          { text: 'Make it demanding.', why: 'Clear isn\'t demanding.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Is the week 8 review still on for Wednesday?',
        prompt: 'Ada needs two more days. Best reply?',
        options: [
          { text: 'Yes!', why: 'She knows it won\'t be ready.' },
          { text: 'Probably not, sorry.', why: 'Give a new date.' },
          { text: 'Can we move it to Friday? The outage took two days of my week. You\'ll have it by Friday 3pm.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Ask [[1]]. Give a new [[2]] if it\'s a delay.',
        blanks: [['early'], ['date']],
        distractors: ['late', 'excuse'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line should Ada cut from her request?',
        lines: [
          'Could you share the bank\'s incident report by Wednesday?',
          'I\'m so, so sorry to ask, I hate bothering people, I know everyone is busy and stressed...',
          'It\'s for the client\'s update on Thursday.',
          'Thanks so much.',
        ],
        bug: 1,
        fix: 'Delete it.',
        explanation: 'Over-apologising buries the request.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of a request to an example.',
        pairs: [
          ['What', 'The bank\'s incident report'],
          ['Why (one line)', 'For Thursday\'s client update'],
          ['By when', 'Wednesday'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many more days does Ada need for the review?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s time request.',
        tiles: ['Can', 'we', 'move', 'it', 'to', 'Friday?'],
        distractors: ['never'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'People usually say no', group: 0 },
          { text: 'Asking early builds trust', group: 1 },
          { text: 'Long requests work better', group: 0 },
          { text: 'AI can tighten a request', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good request.',
        lines: ['What you need', 'Why, in one line', 'By when', 'Thanks'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a quiet missed deadline worse than asking?',
        options: [
          { text: 'Others can\'t plan, and it damages trust' },
          { text: 'It isn\'t worse', why: 'Surprises cost trust.' },
          { text: 'Deadlines don\'t matter', why: 'They do to others.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What help or extra time do you need right now but haven\'t asked for? Write the short request.',
    starters: ['I need...', 'By...'],
  },
  deepen: { title: 'Try it today', summary: 'Send one short, clear request for help today: what, why in one line, by when.' },
  notes: 'Flynn & Lake (2008), Journal of Personality and Social Psychology: help-seekers underestimated compliance by about 50%.',
};

export default lesson;
