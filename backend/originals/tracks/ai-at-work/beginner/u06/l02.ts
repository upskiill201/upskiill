import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 2 — to-do lists that work. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'To-do lists that work',
  summary: 'Most to-do lists are wishes. A working list has clear, small, doable tasks. AI is very good at rewriting one into the other.',
  minutes: 12,
  outcomes: [
    'Rewrite vague to-dos as clear next actions',
    'Keep each task small enough to start today',
    'Use AI to tidy and size a list',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Tolu\'s list, before and after',
      before: {
        label: 'Before',
        text: '- Pilot stuff\n- Shops\n- Bank?\n- Marketing\n- Sort out the budget',
      },
      after: {
        label: 'After',
        text: '- Email Ada the draft pilot plan (20 min)\n- List 60 Makola shops to approach, from the market association list (1 hr)\n- Book a call with the partner bank about settlement times (10 min)\n- Draft a one-page flyer for shop owners (45 min)\n- Send Tobi the budget table for sign-off by Thursday (30 min)',
      },
      notes: [
        'Each line starts with a verb: email, list, book, draft, send.',
        'Each is small enough to finish in one sitting.',
        'A time estimate helps you fit tasks into the day.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Verb first, one sitting, a time estimate. Ask AI: "Rewrite this list as clear next actions, each under an hour, with a time estimate."',
    },
  ],
  apply: {
    scenario: 'Tolu is fixing his to-do list.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Clear next action, or a vague wish?',
        groups: ['Clear action', 'Vague wish'],
        items: [
          { text: 'Book a call with the bank about settlement times', group: 0 },
          { text: 'Bank?', group: 1 },
          { text: 'Draft a one-page flyer for shop owners', group: 0 },
          { text: 'Marketing', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does every good task start with?',
        options: [
          { text: 'A verb' },
          { text: 'A deadline', why: 'Helpful, but a verb makes it doable.' },
          { text: 'The word "maybe"', why: 'A verb.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best fixes Tolu\'s list?',
        options: [
          { text: 'Make my list better.', why: 'Vague.' },
          { text: 'Rewrite this list as clear next actions, each starting with a verb and under an hour, with a time estimate. Ask me if a task is unclear.' },
          { text: 'Add more tasks.', why: 'Longer isn\'t better.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Turn "Bank?" into a clear action.',
        tiles: ['Book', 'a', 'call', 'with', 'the', 'bank'],
        distractors: ['Bank?'],
      },
      {
        kind: 'findBug',
        prompt: 'Which task is still too big for one sitting?',
        lines: [
          'Email Ada the draft plan (20 min)',
          'Book a call with the bank (10 min)',
          'Launch the pilot',
          'Draft the shop flyer (45 min)',
        ],
        bug: 2,
        fix: 'Break it into tasks, e.g. "List 60 shops to approach (1 hr)".',
        explanation: '"Launch the pilot" is a whole project.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] first, one [[2]], a time estimate.',
        blanks: [['Verb'], ['sitting']],
        distractors: ['Noun', 'month'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What does "sort out the budget" mean on Tolu\'s list?',
        prompt: 'Best rewrite?',
        options: [
          { text: 'Send Tobi the budget table for sign-off by Thursday (30 min).' },
          { text: 'Budget things.', why: 'Still vague.' },
          { text: 'Do the money.', why: 'Still vague.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague item to a clear action.',
        pairs: [
          ['"Shops"', 'List 60 Makola shops to approach'],
          ['"Marketing"', 'Draft a one-page flyer'],
          ['"Pilot stuff"', 'Email Ada the draft plan'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many Makola shops will Tolu list to approach?',
        answers: ['60', 'sixty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good list habit or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Adding a time estimate', group: 0 },
          { text: 'One-word tasks', group: 1 },
          { text: 'Breaking big tasks down', group: 0 },
          { text: 'Listing whole projects as tasks', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to fix a list with AI.',
        lines: ['Paste the list', 'Ask for verb-first actions under an hour', 'Answer its questions', 'Check the estimates feel right'],
      },
      {
        kind: 'mcq',
        prompt: 'Why add time estimates?',
        options: [
          { text: 'So you can fit tasks into the real day' },
          { text: 'To impress your manager', why: 'It\'s for planning your day.' },
          { text: 'They\'re always accurate', why: 'They\'re estimates; still useful.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your own to-do list. Which item is a wish, not an action? Rewrite it.',
    starters: ['The wish:', 'The action:'],
  },
  deepen: { title: 'Try it today', summary: 'Paste your to-do list into AI and ask for verb-first actions under an hour, with estimates.' },
  notes: '"Next action" thinking is from David Allen\'s Getting Things Done (2001). Content fictional.',
};

export default lesson;
