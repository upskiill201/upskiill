import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 8 — when "sounds right" isn't right. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'When "sounds right" isn\'t right',
  summary: 'Fluent, well-organised answers feel trustworthy. Learn the traps that make wrong answers feel right, and the habits that cut through them.',
  minutes: 12,
  outcomes: [
    'Name the reasons fluent answers feel true',
    'Separate how an answer reads from whether it is right',
    'Use a quick "would I bet on this?" check',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A well-written, well-structured answer is more likely to be correct.',
          isFact: false,
          explain: 'AI writes everything fluently. Good structure tells you about the writing, not the facts.',
        },
        {
          text: 'People tend to believe statements more when they are easy to read.',
          isFact: true,
          explain: 'Psychologists call it processing fluency: easy-to-process information often feels truer.',
        },
        {
          text: 'If an answer matches what you already believed, you can skip checking it.',
          isFact: false,
          explain: 'That\'s exactly when checking matters most. We question surprising answers and wave through agreeable ones.',
        },
        {
          text: 'Asking "would I bet money on this?" helps you notice weak claims.',
          isFact: true,
          explain: 'It forces you to separate "sounds right" from "I know it\'s right".',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Fluent is not the same as true. Be extra careful with answers that sound good and agree with you.',
    },
  ],
  apply: {
    scenario: 'Ada is reviewing an AI market summary that reads beautifully.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Tells you about the writing, or about the facts?',
        groups: ['Writing', 'Facts'],
        items: [
          { text: 'Clear headings', group: 0 },
          { text: 'A source you opened', group: 1 },
          { text: 'Confident tone', group: 0 },
          { text: 'A number you recalculated', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is processing fluency?',
        options: [
          { text: 'Easy-to-read information tends to feel truer' },
          { text: 'How fast the AI types', why: 'It\'s about how we judge information.' },
          { text: 'A way to check sources', why: 'It\'s a bias, not a check.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI summary says Ghana is "the obvious next market". That\'s what I thought too!',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'That\'s why we should check it extra carefully. Let\'s find the evidence for and against before we decide.' },
          { text: 'Great, we agree, so it must be right.', why: 'Agreement is when we check least.' },
          { text: 'The AI is always neutral.', why: 'It often echoes the framing of the question.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s quick check.',
        tiles: ['Would', 'I', 'bet', 'money', 'on', 'this?'],
        distractors: ['Nice!'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the trap to the habit that beats it.',
        pairs: [
          ['Fluent writing', 'Check the facts, not the style'],
          ['Agrees with me', 'Look for evidence against'],
          ['Sounds expert', 'Ask for sources'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: '[[1]] is not the same as [[2]].',
        blanks: [['Fluent'], ['true']],
        distractors: ['Short', 'long'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in the summary should Ada check most?',
        lines: [
          'This summary covers four markets.',
          'Ghana is clearly the best next market, as everyone agrees.',
          'Section 2 compares fees.',
          'Section 3 lists open questions.',
        ],
        bug: 1,
        fix: 'Ghana may be a strong option; here is the evidence for and against.',
        explanation: '"Clearly" and "everyone agrees" are style, not evidence.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which follow-up best tests an answer that agrees with you?',
        options: [
          { text: 'Great, tell me more about why I\'m right.', why: 'Only strengthens the bias.' },
          { text: 'Now argue the opposite: give the strongest reasons Ghana might be the wrong next market.' },
          { text: 'Make it shorter.', why: 'Doesn\'t test it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence or just persuasive words?',
        groups: ['Evidence', 'Persuasive words'],
        items: [
          { text: '"Clearly"', group: 1 },
          { text: '"According to the central bank report, p.12"', group: 0 },
          { text: '"Everyone agrees"', group: 1 },
          { text: '"In our pilot, 840 of 1,200 users were active"', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Easy-to-read information feels truer. This is called processing ... (one word)',
        answers: ['fluency'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s routine for a beautiful answer.',
        lines: ['Notice it sounds good', 'Ask "would I bet on this?"', 'Ask for the opposite view', 'Check the key facts'],
      },
      {
        kind: 'mcq',
        prompt: 'When should Ada be most careful?',
        options: [
          { text: 'When an answer is fluent and agrees with what she wanted' },
          { text: 'Only when the answer surprises her', why: 'Agreeable answers slip through more.' },
          { text: 'Never, if the tool is popular', why: 'Popular tools still make mistakes.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an AI answer you accepted because it agreed with you. Would you bet money on it now?',
    starters: ['The answer was...', 'Would I bet on it?'],
  },
  deepen: { title: 'Try it today', summary: 'After your next AI answer you like, ask "Now argue the opposite." See what you would have missed.' },
  notes: 'Processing fluency and truth judgements: e.g. Reber & Schwarz (1999), Consciousness and Cognition. Confirmation bias is well established. Market claims are fictional.',
};

export default lesson;
