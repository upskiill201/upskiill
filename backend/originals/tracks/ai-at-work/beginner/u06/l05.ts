import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 5 — Checkpoint 1. Mess to plan, to-dos, weekly plan, breakdown. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: from mess to tasks',
  summary: 'Turning notes into a plan, writing real to-dos, planning a week and breaking a phase down. Show you can get organised with AI.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can turn a mess into a plan', 'Show you can write tasks and plan a realistic week'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 6, first Checkpoint. Tolu\'s first week, getting organised.', replies: ['Ready'] },
        { tey: 'Warm-up: "Marketing" on a to-do list. Task or wish?', replies: ['Wish'] },
        { tey: 'Right. Verb first, one sitting. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Tolu\'s first week.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request turns Tolu\'s notes into the best first plan?',
        options: [
          { text: 'Make a plan.', why: 'No shape.' },
          { text: 'From these notes, plan a 3-month pilot: phases, tasks, owner roles, rough dates. Then list questions the notes don\'t answer.' },
          { text: 'Make the final plan.', why: 'AI drafts; people agree.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear action or wish?',
        groups: ['Action', 'Wish'],
        items: [
          { text: 'Email Tobi the budget table (30 min)', group: 0 },
          { text: 'Budget', group: 1 },
          { text: 'Draft the flyer (45 min)', group: 0 },
          { text: 'Shops?', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the Monday plan.',
        lines: ['Fixed things', 'Tasks with estimates', 'Paste into AI', 'Check it fits', 'Share what matters'],
      },
      {
        kind: 'typeAnswer',
        prompt: '25 hours of tasks, 20 free hours. How many hours to cut or move?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which task can\'t start yet?',
        lines: ['Get the shop list', 'Write the flyer', 'Visit shops with printed flyers', 'Book the bank call'],
        bug: 2,
        fix: 'After the flyer is printed.',
        explanation: 'Depends on the flyer being written, approved and printed.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to the lesson.',
        pairs: [
          ['Questions the notes don\'t answer', 'From mess to plan'],
          ['Verb first, one sitting', 'To-do lists that work'],
          ['Leave 25% free', 'Planning your week'],
          ['Clear "done" point', 'Breaking a project into tasks'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The plan says the bank\'s "Kwame" owns settlement. Who\'s Kwame?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'No idea, the AI knows.', why: 'The AI made him up.' },
          { text: 'Good catch: the AI invented that name. We\'re confirming the real owner with the bank this week.' },
          { text: 'Probably someone at the bank.', why: 'Confirm, don\'t guess.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: '[[1]] first, one sitting. Cut on Monday, not [[2]].',
        blanks: [['Verb'], ['Thursday']],
        distractors: ['Noun', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Turn "Bank?" into an action.',
        tiles: ['Book', 'a', 'call', 'with', 'the', 'bank'],
        distractors: ['Bank?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Phase or task?',
        groups: ['Phase', 'Task'],
        items: [
          { text: 'Recruit 50 shops', group: 0 },
          { text: 'Print 60 flyers', group: 1 },
          { text: 'Review the pilot', group: 0 },
          { text: 'Email Ada the draft', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask the AI for owner roles rather than names?',
        options: [
          { text: 'Roles are shorter', why: 'It\'s about invented names.' },
          { text: 'Names aren\'t allowed', why: 'They are, from people, not the AI.' },
          { text: 'It doesn\'t know your team and may invent names' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of the week is unrealistic?',
        lines: ['Mon: 4 hrs tasks', 'Tue: 5 hrs tasks', 'Wed: 12 hrs tasks', 'Thu: 4 hrs tasks + buffer'],
        bug: 2,
        fix: 'Spread or cut Wednesday\'s tasks.',
        explanation: '12 focused hours in one day isn\'t realistic.',
      },
      {
        kind: 'mcq',
        prompt: 'What makes "signed up with a test payment" a good done point?',
        options: [
          { text: 'Anyone can check whether it happened' },
          { text: 'It sounds technical', why: 'It\'s checkable.' },
          { text: 'It\'s easy', why: 'It\'s clear, not necessarily easy.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pilot\'s phases.',
        lines: ['Prepare', 'Recruit shops', 'Run', 'Review'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of these four habits would most help your own week?',
    starters: ['The habit:', 'I\'ll start by...'],
  },
  notes: 'Checkpoint for Unit 6 lessons 1-4.',
};

export default lesson;
