import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 17 — fixing a mistake that went out. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Fixing a mistake that went out',
  summary: 'A wrong number is already in a client\'s inbox. Five steps to fix it fast, honestly and without drama.',
  minutes: 12,
  outcomes: [
    'Fix a sent mistake in five steps',
    'Write a short, clear correction',
    'Stop the same mistake happening again',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps when a mistake has gone out',
      steps: [
        { title: '1. Confirm the right answer first', body: 'Don\'t send a correction you haven\'t checked. One wrong fix is worse than one wrong number.' },
        { title: '2. Tell the people affected, quickly', body: 'The same day, to everyone who got the wrong version. Quick corrections build trust; slow ones look like hiding.' },
        { title: '3. Keep it short and clear', body: '"Correction: the fee in yesterday\'s summary should be 1.5%, not 1%. Updated version attached." No long story.' },
        { title: '4. Say if anything depends on it', body: '"If you used the 1% in your budget, the monthly cost is about $300 higher."' },
        { title: '5. Change one habit', body: 'Add the step that would have caught it to your routine. Tell your manager what you changed.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Check the fix, correct it the same day, keep it short, flag the knock-on effects, change one habit.',
    },
  ],
  apply: {
    scenario: 'Ada\'s summary to Lucía had the wrong transfer fee.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Confirm the right answer', 'Tell the people affected', 'Keep it short', 'Flag what depends on it', 'Change one habit'],
      },
      {
        kind: 'mcq',
        prompt: 'Why confirm the right answer before correcting?',
        options: [
          { text: 'To delay', why: 'Check fast, then send.' },
          { text: 'A wrong correction is worse than the first mistake' },
          { text: 'It doesn\'t matter', why: 'Two wrong numbers lose much more trust.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the correction worse?',
        lines: [
          'Correction: the fee should be 1.5%, not 1%.',
          'Updated version attached.',
          'This happened because the AI tool was trained on old data and also I was very busy and...',
          'If you used 1% in the budget, the cost is about $300 higher a month.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Long explanations bury the fix. Keep it short.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the start of Ada\'s correction.',
        tiles: ['Correction:', 'the', 'fee', 'should', 'be', '1.5%'],
        distractors: ['maybe'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good correction habit or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Same-day correction', group: 0 },
          { text: 'Waiting to see if anyone notices', group: 1 },
          { text: 'Sending to everyone who got the original', group: 0 },
          { text: 'Quietly editing the shared file only', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Thanks for the correction. Does this change our budget?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Probably not.', why: 'She knows it does; say how much.' },
          { text: 'You\'d have to check yourself.', why: 'Flag the knock-on effects for her.' },
          { text: 'Yes, by about $300 a month if you used the 1% figure. I\'ve updated the budget sheet too.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s correction.',
        template: '[[1]]: the fee in yesterday\'s summary should be 1.5%, not 1%. Updated version [[2]].',
        blanks: [['Correction'], ['attached']],
        distractors: ['Sorry sorry', 'deleted'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Ada\'s action.',
        pairs: [
          ['Confirm', 'Checks the provider\'s fee page'],
          ['Tell', 'Emails everyone who got the summary'],
          ['Flag effects', 'Mentions the budget change'],
          ['Change a habit', 'Adds "check fees today" to her routine'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who should get the correction?',
        options: [
          { text: 'Everyone who got the wrong version' },
          { text: 'Only Lucía', why: 'Everyone who received it might rely on it.' },
          { text: 'Nobody; just update the file', why: 'People may already be using the old number.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'When should the correction go out? (two words: the same ...)',
        answers: ['day', 'same day', 'the same day'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which habit would have caught it?',
        groups: ['Would have caught it', 'Wouldn\'t help'],
        items: [
          { text: 'Checking fees on the provider\'s page that day', group: 0 },
          { text: 'Using a nicer email template', group: 1 },
          { text: 'Asking "when was this true?"', group: 0 },
          { text: 'Sending it faster', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should Ada tell Tobi afterwards?',
        options: [
          { text: 'Nothing, it\'s fixed', why: 'Managers prefer to hear it from you.' },
          { text: 'That the AI is to blame', why: 'Own it.' },
          { text: 'What happened, that it\'s fixed, and the habit she changed' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a mistake you once corrected late, or not at all. How would the five steps have changed it?',
    starters: ['The mistake was...', 'With the five steps...'],
  },
  deepen: { title: 'Try it today', summary: 'Write a two-line correction template you can reuse: "Correction: ... should be ..., not .... Updated version attached."' },
  notes: 'All figures are fictional.',
};

export default lesson;
