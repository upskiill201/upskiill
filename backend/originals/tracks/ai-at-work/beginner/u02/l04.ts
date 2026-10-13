import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 4 — plain-language craft: short, active, everyday words, and kind. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Shorter, clearer, kinder',
  summary: 'Five plain-language rules that make any message easier to read, and how to ask AI to apply them.',
  minutes: 14,
  outcomes: [
    'Apply five plain-language rules to any message',
    'Turn passive, wordy sentences into active, clear ones',
    'Make a hard message kinder without making it vague',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Longer, more formal writing sounds more professional.',
          isFact: false,
          explain: 'Busy readers trust clear writing. Long formal sentences mostly slow them down.',
        },
        {
          text: '"The report was reviewed by the team" is clearer than "The team reviewed the report".',
          isFact: false,
          explain: 'The second is active: who did what, in that order. Usually shorter and clearer.',
        },
        {
          text: 'You can be kind and direct at the same time.',
          isFact: true,
          explain: 'Kind is about tone and respect. Direct is about being clear. The best messages are both.',
        },
      ],
    },
    {
      kind: 'reading',
      title: 'Five plain-language rules',
      html:
        '<ol>' +
        '<li><strong>Short sentences.</strong> Aim for most sentences under about 20 words. One idea each.</li>' +
        '<li><strong>Active voice.</strong> "We moved testing to Friday", not "Testing has been moved to Friday".</li>' +
        '<li><strong>Everyday words.</strong> "Use" not "utilise", "help" not "facilitate", "about" not "with regard to".</li>' +
        '<li><strong>Cut the filler.</strong> "In order to" → "to". "At this point in time" → "now". "Just wanted to" → (delete).</li>' +
        '<li><strong>Kind and clear.</strong> Say the hard thing plainly, then add respect: thanks, a reason, a way forward.</li>' +
        '</ol>' +
        '<p>Plain language is not "dumbing down". It is respecting the reader\'s time. Experts read plain writing faster too.</p>' +
        '<p>You can hand these rules straight to the AI: <em>"Edit this into plain language: short sentences, active voice, everyday words, no filler. Keep it kind."</em></p>',
    },
    {
      kind: 'compare',
      title: 'Wordy and cold vs plain and kind',
      before: {
        label: 'Wordy and cold',
        text: 'With regard to the designs, it has been determined that they cannot be utilised in their current form and will need to be redone at this point in time.',
      },
      after: {
        label: 'Plain and kind',
        text: "Thanks for the designs. We can't use them as they are, because the buttons are too small on phones. Could you make them bigger by Thursday?",
      },
      notes: ['Short sentences.', 'Active: "We can\'t use them".', 'Everyday words: "use", not "utilise".', 'Kind: thanks, a reason, and a clear next step.'],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Plain language is respect for the reader\'s time.',
    },
    {
      kind: 'check',
      question: 'Which sentence is active voice?',
      options: ['Testing has been moved to Friday.', 'We moved testing to Friday.', 'It was decided to move testing.'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is making her messages plain and kind.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the wordy phrase to its plain version.',
        pairs: [
          ['In order to', 'To'],
          ['At this point in time', 'Now'],
          ['Utilise', 'Use'],
          ['With regard to', 'About'],
          ['Facilitate', 'Help'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Active or passive?',
        groups: ['Active', 'Passive'],
        items: [
          { text: 'We fixed the bug.', group: 0 },
          { text: 'The bug was fixed.', group: 1 },
          { text: 'Lucía approved the colours.', group: 0 },
          { text: 'The colours have been approved.', group: 1 },
          { text: 'I will send the files today.', group: 0 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Rewrite in active voice: "The files will be sent by me today."',
        tiles: ['I', 'will', 'send', 'the', 'files', 'today'],
        distractors: ['be', 'by'],
      },
      {
        kind: 'mcq',
        prompt: 'Is plain language "dumbing down"?',
        options: [
          { text: 'No. It respects the reader\'s time, and experts read it faster too' },
          { text: 'Yes, experts need complex writing', why: 'Experts are busy readers too.' },
          { text: 'Only for children', why: 'It works for every adult reader.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the sentence that breaks the plain-language rules.',
        lines: [
          'Thanks for sending the designs.',
          'It has been determined that utilisation of the current buttons is not feasible at this point in time.',
          'Could you make them bigger by Thursday?',
        ],
        bug: 1,
        fix: "We can't use the buttons as they are: they're too small on phones.",
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Our legal team wrote this for customers: "Users are advised that modifications to account settings may be effectuated via the profile section." Can your AI make it human?',
        prompt: 'Which version should Ada send back?',
        options: [
          { text: '"You can change your settings in your profile."' },
          { text: '"Users may effectuate modifications in the profile section."', why: 'Still passive and wordy.' },
          { text: '"Settings! Profile! Go!"', why: 'Short, but not clear or professional.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s plain-language request.',
        template: 'Edit this into plain language: [[1]] sentences, [[2]] voice, everyday words, no [[3]]. Keep it kind.',
        blanks: [['short'], ['active'], ['filler', 'jargon']],
        distractors: ['endless', 'passive', 'facts'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Plain-language rule: aim for most sentences under about how many words? (number)',
        answers: ['20', 'twenty'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada needs to tell a freelancer their work needs changes. Which request gets a kind AND clear draft?',
        options: [
          { text: 'Tell them the work is bad.', why: 'Clear, but not kind, and no way forward.' },
          {
            text: 'Write a short, kind message to our freelance illustrator: thank them, say the icons are too detailed to read on phones, and ask for simpler versions by Friday.',
          },
          { text: 'Write a very gentle message that does not mention any problems.', why: 'Kind, but so vague they will not know what to change.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a kind-and-clear hard message.',
        lines: ['Thanks or credit', 'The problem, said plainly', 'The reason', 'A clear next step'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Kind and clear, or not?',
        groups: ['Kind and clear', 'Too harsh or too vague'],
        items: [
          { text: "Thanks! The buttons are too small on phones. Could you enlarge them?", group: 0 },
          { text: 'These designs are wrong.', group: 1 },
          { text: "Maybe, if it's not too much trouble, some tiny things could possibly change?", group: 1 },
          { text: "Great start. We need bigger text for phones; can you update by Friday?", group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I need to tell our agency their campaign missed the deadline again. I want to be firm but not nasty.',
        prompt: 'Which request should Ada suggest for the AI?',
        options: [
          { text: 'Write a firm, respectful message: the deadline was missed twice, what it affected, and the new date you need, with a thank-you for the work so far.' },
          { text: 'Write an angry email.', why: 'Firm is not the same as angry.' },
          { text: "Write a message that doesn't mention the deadline.", why: 'Too vague. The problem must be clear.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"We moved testing" is active. "Testing was moved" is ... (one word)',
        answers: ['passive'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to the fix.',
        pairs: [
          ['Short sentences', 'One idea each'],
          ['Active voice', 'Who did what'],
          ['Cut the filler', 'Delete "just wanted to"'],
          ['Kind and clear', 'Plain problem, plus respect'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which sentence is best?',
        options: [
          { text: '"We need the colours approved by Wednesday so we can start building."' },
          { text: '"It would be appreciated if approval of the colours could be facilitated."', why: 'Passive, wordy, no date.' },
          { text: '"Colours?"', why: 'Short, but unclear.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Find one sentence you wrote recently that breaks a plain-language rule. Rewrite it here.',
    starters: ['Before:', 'After:'],
  },
  deepen: {
    title: 'Go deeper',
    summary: 'Many governments publish free plain-language guides (search "plain language guidelines"). Skim one and pick your favourite rule.',
  },
  notes:
    'Plain-language principles (short sentences, active voice, common words) follow widely published plain-language guidance; "under about 20 words" is presented as a rule of thumb, not a statistic.',
};

export default lesson;
