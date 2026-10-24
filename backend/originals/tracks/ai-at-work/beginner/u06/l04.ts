import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 4 — breaking a project into tasks. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Breaking a project into tasks',
  summary: '"Recruit 50 shops" is a phase, not a task. Learn to break it down until every piece has a clear owner and a done point. Tap the breakdown.',
  minutes: 12,
  outcomes: [
    'Break a project phase into tasks',
    'Give each task a clear "done" point',
    'Spot dependencies between tasks',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Phase 2: Recruit 50 shops',
      text: 'Get the market association\'s shop list. Pick 60 shops to approach. Print the one-page flyer. Visit 15 shops a day for four days. Sign up 50 shops, each with a test payment done. Send weekly sign-up numbers to Ada.',
      hotspots: [
        { phrase: 'Get the market association\'s shop list', note: 'A dependency: you can\'t pick shops until you have the list.' },
        { phrase: 'Pick 60 shops', note: 'More than 50, because some will say no. Planning for drop-off is part of the task.' },
        { phrase: 'Print the one-page flyer', note: 'Depends on the flyer being written and approved first.' },
        { phrase: 'Visit 15 shops a day for four days', note: 'Big tasks broken into daily chunks you can track.' },
        { phrase: 'each with a test payment done', note: 'The "done" point. Not "talked to them": signed up and tested.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Break it down until every task has an owner and a clear "done". Ask AI: "Break this phase into tasks, show what depends on what, and say what \'done\' means for each."',
    },
  ],
  apply: {
    scenario: 'Tolu breaks down the recruiting phase.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the recruiting tasks.',
        lines: ['Get the shop list', 'Pick 60 shops', 'Print the flyer', 'Visit 15 shops a day', 'Sign up 50 with a test payment'],
      },
      {
        kind: 'mcq',
        prompt: 'Why approach 60 shops to sign up 50?',
        options: [
          { text: 'To be extra busy', why: 'It\'s planning for drop-off.' },
          { text: 'Some will say no; plan for drop-off' },
          { text: 'Typo', why: 'It\'s deliberate.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear "done" point, or unclear?',
        groups: ['Clear done', 'Unclear'],
        items: [
          { text: 'Shop signed up and test payment made', group: 0 },
          { text: 'Talked to some shops', group: 1 },
          { text: 'Flyer approved by Lucía', group: 0 },
          { text: 'Worked on marketing', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gives the best breakdown?',
        options: [
          { text: 'What do I need to do?', why: 'Too open.' },
          { text: 'Break "recruit 50 shops in Makola market" into tasks. Show which tasks depend on others, and what "done" means for each.' },
          { text: 'Make it simple.', why: 'No structure asked for.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which task can\'t start yet?',
        lines: [
          'Write the flyer text',
          'Print the flyer',
          'Get the market association list',
          'Book the bank call',
        ],
        bug: 1,
        fix: 'Do it after the flyer is written and approved.',
        explanation: 'Printing depends on the flyer being ready.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can Tolu start visiting shops tomorrow?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, why not.', why: 'Dependencies aren\'t ready.' },
          { text: 'Shops don\'t need flyers.', why: 'It\'s in the plan for a reason.' },
          { text: 'Not yet: he needs the shop list and the printed flyer first. Earliest is next Monday.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Every task needs an [[1]] and a clear "[[2]]".',
        blanks: [['owner'], ['done']],
        distractors: ['emoji', 'maybe'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many shops a day will Tolu visit?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the task to what it depends on.',
        pairs: [
          ['Pick 60 shops', 'Having the shop list'],
          ['Print the flyer', 'Flyer approved'],
          ['Visit shops', 'Printed flyers'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the "done" point for a shop.',
        tiles: ['Signed', 'up', 'and', 'test', 'payment', 'made'],
        distractors: ['visited'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Phase, or task?',
        groups: ['Phase', 'Task'],
        items: [
          { text: 'Recruit 50 shops', group: 0 },
          { text: 'Print 60 flyers', group: 1 },
          { text: 'Run the pilot', group: 0 },
          { text: 'Book the bank call', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a dependency?',
        options: [
          { text: 'A task that can\'t start until another is done' },
          { text: 'A task you like', why: 'It\'s about order.' },
          { text: 'A deadline', why: 'It\'s about one task needing another.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Pick a big item on your list. Break it into tasks with a clear "done" for each.',
    starters: ['The big item:', 'Task 1, done when...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to break one phase of your project into tasks with dependencies and "done" points.' },
  notes: 'Work breakdown and dependencies are standard project practice. Figures fictional.',
};

export default lesson;
