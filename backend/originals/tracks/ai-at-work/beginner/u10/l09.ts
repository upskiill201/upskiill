import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 9 — being honest about AI use. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Being honest about AI use',
  summary: 'Lucía\'s legal team now asks every supplier: "Did you use AI on our work?" Ada answers honestly, and finds honesty is easier than she thought.',
  minutes: 12,
  outcomes: [
    'Know when you must say AI was used',
    'Answer AI-use questions plainly',
    'Keep a simple record of where AI helped',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Lucía\'s legal team asks: "Did you use AI on our work?" What\'s the honest answer?', replies: ['Yes, for drafts and summaries.'] },
        { tey: 'Then say exactly that, plus what you checked: "Yes, for first drafts and summaries. All facts and figures were checked by me against sources."', replies: ['Will they be upset?'] },
        { tey: 'Usually not, if you\'re clear and careful. What upsets clients is finding out later that you hid it, or that their confidential data went into a tool they didn\'t agree to.', replies: ['How do I remember what I used AI for?'] },
        { tey: 'Keep a simple note per project: "AI used for: summary of report, first draft of email 3. No client data entered. Checked by Ada." Thirty seconds, and you\'ll never be caught out.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When asked, say plainly what AI was used for and what you checked. Never pretend you didn\'t. Keep a 30-second note per project.',
    },
  ],
  apply: {
    scenario: 'Lucía\'s legal team asks about AI use.',
    items: [
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Our legal team asks: did you use AI on our campaign work?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, for first drafts and summaries, in our approved tool. No confidential data was entered, and I checked every fact and figure.' },
          { text: 'No.', why: 'Never pretend.' },
          { text: 'Why do you ask?', why: 'Answer plainly.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What upsets clients most about AI use?',
        options: [
          { text: 'Finding out later that it was hidden, or that their data went into an unapproved tool' },
          { text: 'Any AI use at all', why: 'Mostly hiding and data misuse.' },
          { text: 'Nothing', why: 'Hidden use and data leaks do.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Must Ada mention AI use, or optional?',
        groups: ['Must mention', 'Optional'],
        items: [
          { text: 'The client asks directly', group: 0 },
          { text: 'The contract requires disclosure', group: 0 },
          { text: 'AI fixed a typo in an internal note', group: 1 },
          { text: 'A report the board will rely on', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Say what AI was used [[1]] and what you [[2]].',
        blanks: [['for'], ['checked']],
        distractors: ['against', 'hid'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s project AI note.',
        lines: ['What AI was used for', 'Which tool', 'Whether client data was entered', 'Who checked it'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s AI note is a problem?',
        lines: [
          'AI used for: summary of the research report',
          'Tool: company-approved assistant',
          'Client data entered: not sure, maybe',
          'Checked by: Ada',
        ],
        bug: 2,
        fix: 'Client data entered: none',
        explanation: 'She should know, and record it clearly.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which disclosure line is best?',
        options: [
          { text: 'AI did it.', why: 'Vague and sounds careless.' },
          { text: 'AI helped with first drafts; I checked every figure against our pilot data.' },
          { text: 'No AI was used.', why: 'Untrue.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the honest answer.',
        pairs: [
          ['Did you use AI?', 'Yes, for drafts and summaries'],
          ['Was our data entered?', 'No, none'],
          ['Who checked it?', 'I did, against the sources'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s note line.',
        tiles: ['No', 'client', 'data', 'entered'],
        distractors: ['maybe'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds does the project AI note take?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest, or not?',
        groups: ['Honest', 'Not honest'],
        items: [
          { text: '"Yes, for drafts; I checked it all"', group: 0 },
          { text: '"No" when she did', group: 1 },
          { text: '"Some summaries, in our approved tool"', group: 0 },
          { text: 'Deleting the AI note before the audit', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep a note per project?',
        options: [
          { text: 'You can answer accurately later, even months on' },
          { text: 'It\'s a legal requirement everywhere', why: 'It\'s good practice.' },
          { text: 'No reason', why: 'Memory fades.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'For your current project, write the 30-second AI note: what for, which tool, any client data, who checked.',
    starters: ['AI used for:', 'Checked by:'],
  },
  deepen: { title: 'Try it today', summary: 'Start an "AI note" line in your current project folder.' },
  notes: 'Disclosure expectations vary by employer, client and sector.',
};

export default lesson;
