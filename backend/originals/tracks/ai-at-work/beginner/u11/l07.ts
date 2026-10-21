import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 7 — chaining tasks together. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Chaining tasks together',
  summary: 'Ada\'s monthly report takes five separate prompts. Tey shows her how to chain them: each step\'s output feeds the next, with a check in between.',
  minutes: 12,
  outcomes: [
    'Break a big task into a chain of steps',
    'Check each step before the next',
    'Save the chain as a reusable recipe',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'One giant prompt for the whole monthly report often goes wrong somewhere in the middle. A chain works better.', replies: ['What\'s a chain?'] },
        { tey: 'Steps that feed each other. 1: summarise the data table. 2: you check it. 3: turn the checked summary into three key points. 4: draft the one-pager from those points. 5: run the pre-send check.', replies: ['Why check in the middle?'] },
        { tey: 'Because a mistake in step 1 flows into everything after. Catch it early and the rest stays right.', replies: ['Can I save the chain?'] },
        { tey: 'Yes: save it as a numbered recipe in your library, with the prompt for each step and what to check before moving on.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Big task? Chain it: small steps, each feeding the next, with a check in between. Save the chain as a recipe.',
    },
  ],
  apply: {
    scenario: 'Ada chains her monthly report.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s report chain.',
        lines: ['Summarise the data table', 'Check the summary', 'Pick three key points', 'Draft the one-pager', 'Run the pre-send check'],
      },
      {
        kind: 'mcq',
        prompt: 'Why check between steps?',
        options: [
          { text: 'A mistake early flows into everything after' },
          { text: 'To slow down', why: 'To catch errors early.' },
          { text: 'AI requires it', why: 'It\'s for accuracy.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why is one giant prompt for a big task risky?',
        options: [
          { text: 'It often goes wrong somewhere in the middle, and it\'s hard to see where' },
          { text: 'It\'s too short', why: 'It\'s too much at once.' },
          { text: 'It isn\'t risky', why: 'Errors hide in big outputs.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A chain step, or a check?',
        groups: ['Step', 'Check'],
        items: [
          { text: 'Summarise the table', group: 0 },
          { text: 'Compare summary numbers with the sheet', group: 1 },
          { text: 'Draft the one-pager', group: 0 },
          { text: 'Run the pre-send check', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your monthly reports used to take a day. Now it\'s two hours?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I chain it: five small AI steps with a quick check after each. Saved as a recipe, so I don\'t rethink it every month.' },
          { text: 'The AI does it all in one go.', why: 'It\'s a checked chain.' },
          { text: 'I skip the checks now.', why: 'The checks keep it right.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Each step feeds the [[1]], with a [[2]] in between.',
        blanks: [['next'], ['check']],
        distractors: ['last', 'break'],
      },
      {
        kind: 'findBug',
        prompt: 'Which link in the chain is risky?',
        lines: [
          '1. Summarise the table',
          '2. Skip checking; go straight on',
          '3. Pick three key points',
          '4. Draft the one-pager',
        ],
        bug: 1,
        fix: '2. Check the summary against the sheet',
        explanation: 'An unchecked error spreads through every later step.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is a good step 3 prompt?',
        options: [
          { text: 'Write the whole report now.', why: 'Skips steps.' },
          { text: 'From this checked summary, pick the three points that matter most to a busy client, each with one number.' },
          { text: 'Make it longer.', why: 'Not a step.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s chain rule.',
        tiles: ['Small', 'steps,', 'check', 'in', 'between'],
        distractors: ['skip'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps are in Ada\'s report chain?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to what it takes in.',
        pairs: [
          ['Summarise', 'The data table'],
          ['Pick key points', 'The checked summary'],
          ['Draft one-pager', 'The three key points'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where should the chain be saved?',
        options: [
          { text: 'In the prompt library, as a numbered recipe with checks' },
          { text: 'In Ada\'s head', why: 'Write it down.' },
          { text: 'Nowhere', why: 'Save it to reuse.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which big task of yours could become a chain? Write the steps and checks.',
    starters: ['The task:', 'Step 1:'],
  },
  deepen: { title: 'Try it today', summary: 'Split one big AI task into three steps with a check after each.' },
  notes: 'Prompt chaining is a widely recommended technique in AI providers\' guidance.',
};

export default lesson;
