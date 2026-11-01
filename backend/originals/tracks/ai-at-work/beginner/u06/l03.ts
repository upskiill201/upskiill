import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 3 — planning your week. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Planning your week',
  summary: 'A to-do list isn\'t a week. Ada shows Tolu a 15-minute Monday routine: AI helps fit the tasks around meetings, energy and deadlines.',
  minutes: 12,
  outcomes: [
    'Plan a realistic week in 15 minutes',
    'Give AI your fixed time and deadlines',
    'Leave room for the unexpected',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The 15-minute Monday plan',
      steps: [
        { title: '1. List the fixed things', body: 'Meetings, calls, deadlines. These don\'t move.' },
        { title: '2. List this week\'s tasks', body: 'Verb-first, with time estimates (from lesson 2).' },
        { title: '3. Paste both into the AI', body: '"Fit these tasks around my meetings. Put deep work in the mornings. Leave 25% of each day free."' },
        { title: '4. Check it\'s realistic', body: 'Add up the hours. If it\'s more than the time you have, drop or move tasks now, not on Thursday.' },
        { title: '5. Share what matters', body: 'Tell Tobi what will and won\'t get done this week. Surprises are worse than bad news.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Fixed things first, tasks with estimates, leave free time, and cut on Monday, not on Thursday.',
    },
  ],
  apply: {
    scenario: 'Monday morning. Tolu plans his week with Ada.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the Monday plan.',
        lines: ['List the fixed things', 'List the tasks', 'Paste both into the AI', 'Check it\'s realistic', 'Share what matters'],
      },
      {
        kind: 'mcq',
        prompt: 'Why leave about a quarter of each day free?',
        options: [
          { text: 'To take long breaks', why: 'It\'s buffer for surprises.' },
          { text: 'Unexpected work always turns up' },
          { text: 'It\'s required by law', why: 'It\'s just realistic.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request makes the best weekly plan?',
        options: [
          { text: 'Plan my week.', why: 'It doesn\'t know your meetings or tasks.' },
          { text: 'Here are my meetings and my tasks with time estimates. Fit the tasks around the meetings, put focused work in the mornings, and leave 25% of each day free. Flag if it doesn\'t fit.' },
          { text: 'Fill every hour.', why: 'No room for surprises.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tolu has 30 hours of tasks but only 22 free hours. How many hours must he cut or move?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Fixed, or a task to fit in?',
        groups: ['Fixed', 'Task to fit'],
        items: [
          { text: 'Bank call, Tuesday 10am', group: 0 },
          { text: 'Draft the shop flyer (45 min)', group: 1 },
          { text: 'Budget due to Tobi, Thursday', group: 0 },
          { text: 'List 60 shops (1 hr)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Will the shop list be ready this week?',
        prompt: 'Tolu cut it from this week. Best reply?',
        options: [
          { text: 'Yes, definitely.', why: 'He already knows it won\'t be.' },
          { text: 'Maybe.', why: 'Give a clear date.' },
          { text: 'Not this week. The budget sign-off comes first; you\'ll have the list next Tuesday.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Cut on [[1]], not on [[2]].',
        blanks: [['Monday'], ['Thursday']],
        distractors: ['Sunday', 'never'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Tolu\'s plan is unrealistic?',
        lines: [
          'Mon: bank prep (1 hr), flyer draft (45 min)',
          'Tue: bank call, shop list (1 hr)',
          'Wed: 11 hours of tasks, no breaks',
          'Thu: budget to Tobi, buffer time',
        ],
        bug: 2,
        fix: 'Spread Wednesday\'s tasks across the week, or drop some.',
        explanation: 'Nobody does 11 focused hours in a day.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the kind of work to the best time.',
        pairs: [
          ['Writing the plan', 'Morning focus time'],
          ['Quick emails', 'Between meetings'],
          ['Buffer', 'Left free each day'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line Tolu adds to his request.',
        tiles: ['Flag', 'it', 'if', 'it', 'doesn\'t', 'fit'],
        distractors: ['ignore'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good weekly-plan habit or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Adding up the hours', group: 0 },
          { text: 'Planning every minute', group: 1 },
          { text: 'Telling Tobi what won\'t get done', group: 0 },
          { text: 'Hoping it all fits', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why tell Tobi on Monday what won\'t get done?',
        options: [
          { text: 'Early warnings let him plan; late surprises cause problems' },
          { text: 'To avoid work', why: 'It\'s about no surprises.' },
          { text: 'He doesn\'t need to know', why: 'Managers prefer early warnings.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Add up the hours on your task list for this week. Does it fit? What will you cut?',
    starters: ['Total hours:', 'I\'ll cut...'],
  },
  deepen: { title: 'Try it today', summary: 'Give AI your meetings and tasks and ask it to flag if they don\'t fit. Decide the cuts today.' },
  notes: 'The 25% buffer is a practical rule of thumb, not a research figure.',
};

export default lesson;
