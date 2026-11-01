import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 10 — Checkpoint 2. Pros and cons, companies, learning fast, gaps. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: weigh, profile, learn, challenge',
  summary: 'Honest pros and cons, company research, learning fast and finding gaps. Show you can think with AI, not let it think for you.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can weigh options honestly', 'Show you can use AI to learn and to challenge your plan'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 2. Wednesday of Ada\'s research sprint.', replies: ['Ready'] },
        { tey: 'Warm-up: seven pros and two cons. Good option?', replies: ['Depends on the weight'] },
        { tey: 'Weigh, don\'t count. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Wednesday of the research sprint.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gives the most honest analysis?',
        options: [
          { text: 'Pros and cons of Ghana?', why: 'Generic and evenly balanced.' },
          { text: 'Given our situation, give the strongest case for and against Ghana, and the single factor that matters most.' },
          { text: 'Why is Ghana amazing?', why: 'One-sided.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or generic point?',
        groups: ['Specific', 'Generic'],
        items: [
          { text: '"Licence 6-12 months vs 9-month runway"', group: 0 },
          { text: '"Big market"', group: 1 },
          { text: '"Partner bank already in Accra"', group: 0 },
          { text: '"Some competition"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the company-research steps.',
        lines: ['Collect their own pages', 'Paste them in', 'Ask for a profile from only those', 'Ask for meeting questions', 'Verify names and titles'],
      },
      {
        kind: 'findBug',
        prompt: 'Which profile line needs checking before the meeting?',
        lines: ['Offers SME accounts (website)', 'Branches in Accra and Kumasi (website)', 'Head of partnerships: Mr Mensah (AI memory)', 'New loan product (press release)'],
        bug: 2,
        fix: 'Check the leadership page or LinkedIn.',
        explanation: 'From AI memory; roles change.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the learn-it-fast steps.',
        lines: ['Get the map', 'One idea at a time', 'Explain it back', 'Let it quiz you', 'Check key facts'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does being quizzed help you learn?',
        options: [
          { text: 'It tests the AI', why: 'It tests you.' },
          { text: 'Recalling answers makes knowledge stick' },
          { text: 'It doesn\'t', why: 'Retrieval practice works.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the critic role to what it finds.',
        pairs: [
          ['Sceptical investor', 'Weak business assumptions'],
          ['Worried regulator', 'Compliance gaps'],
          ['Busy shop owner', 'Reasons not to switch'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Five pros, five cons. It\'s 50/50, right?',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, a coin toss.', why: 'Counting isn\'t weighing.' },
          { text: 'Let\'s find more pros.', why: 'Count doesn\'t matter.' },
          { text: 'Not until we weigh them. The licence timeline alone could decide it.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: '[[1]], don\'t count. [[2]] comes from the tutor; rules from official sources.',
        blanks: [['Weigh'], ['Understanding']],
        distractors: ['Guess', 'Gossip'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the critic question.',
        tiles: ['What', 'are', 'the', 'three', 'biggest', 'holes?'],
        distractors: ['best'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Tutor is fine, or official source?',
        groups: ['Tutor', 'Official source'],
        items: [
          { text: 'What e-money means', group: 0 },
          { text: 'Ghana\'s licence categories', group: 1 },
          { text: 'Why regulators protect customer funds', group: 0 },
          { text: 'Current capital requirement', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Weigh, don\'t ... (one word)',
        answers: ['count'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Which hole matters least?',
        lines: ['Why would shops switch?', 'No licence timeline', 'Two fonts in the brief', 'Local-language support not costed'],
        bug: 2,
        fix: 'Fix later; focus on the big ones.',
        explanation: 'Fonts don\'t change the decision.',
      },
      {
        kind: 'mcq',
        prompt: 'Why are good questions safer than facts in a first meeting?',
        options: [
          { text: 'They show homework and can\'t be factually wrong' },
          { text: 'Facts are rude', why: 'Questions just can\'t be wrong.' },
          { text: 'They aren\'t safer', why: 'They are.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI critic says nobody will switch apps. Is the plan dead?',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, cancel it.', why: 'Research the gap first.' },
          { text: 'Ignore the critic.', why: 'It found the key question.' },
          { text: 'Not yet. It\'s the right question. I\'ll find out what shops dislike about their current apps, and we\'ll see if we solve it.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these four skills would most improve your next big decision?',
    starters: ['The skill:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 5 lessons 6-9.',
};

export default lesson;
