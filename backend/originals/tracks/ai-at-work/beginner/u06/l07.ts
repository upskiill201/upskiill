import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 7 — prioritising when everything is urgent. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Prioritising when everything is urgent',
  summary: 'Tolu has eleven "urgent" things. They can\'t all come first. Tey shows him how to sort them, and how AI can help without deciding for him.',
  minutes: 12,
  outcomes: [
    'Sort tasks by urgent and important',
    'Use AI to sort a long list quickly',
    'Agree priorities with your manager',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Eleven urgent things means none of them really is. Let\'s sort them on two questions: is it important, and is it urgent?', replies: ['What\'s the difference?'] },
        { tey: 'Important moves the pilot forward. Urgent has a deadline soon. Budget sign-off by Thursday: both. A colleague\'s "quick question": urgent, rarely important.', replies: ['And the rest?'] },
        { tey: 'Important but not urgent: plan time for it, or it never happens. Neither: drop it or say no. This is often called the Eisenhower matrix.', replies: ['Can AI sort my list?'] },
        { tey: 'It can make a first sort if you tell it the goal and the deadlines. But your manager decides what\'s most important. Check the top three with Tobi.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Important and urgent: do now. Important, not urgent: schedule. Urgent, not important: delegate or keep short. Neither: drop. Agree the top three with your manager.',
    },
  ],
  apply: {
    scenario: 'Tolu sorts his eleven urgent things.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Sort Tolu\'s tasks.',
        groups: ['Do now', 'Schedule', 'Keep short or drop'],
        items: [
          { text: 'Budget to Tobi by Thursday', group: 0 },
          { text: 'Write the pilot review template', group: 1 },
          { text: 'Reply to a "quick question" about the office printer', group: 2 },
          { text: 'Fix the shop sign-up form error before visits start', group: 0 },
          { text: 'Read a newsletter about fintech trends', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the box to what to do.',
        pairs: [
          ['Important and urgent', 'Do now'],
          ['Important, not urgent', 'Schedule it'],
          ['Urgent, not important', 'Delegate or keep it short'],
          ['Neither', 'Drop it'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a task "important"?',
        options: [
          { text: 'It moves the goal forward' },
          { text: 'Someone asked loudly', why: 'Loud is often urgent, not important.' },
          { text: 'It has a deadline', why: 'That\'s urgent.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gives the most useful first sort?',
        options: [
          { text: 'Prioritise my list.', why: 'No goal or deadlines.' },
          { text: 'Our goal is a pilot with 50 shops starting 1 September. Here are my tasks and deadlines. Sort them into do now, schedule, keep short, drop, with one line of reasoning each.' },
          { text: 'Tell me what to ignore.', why: 'Without the goal, it can\'t judge.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can Tolu redo the flyer colours today? It\'s urgent for me.',
        prompt: 'Tolu is finishing the budget for Thursday. Best reply from Ada?',
        options: [
          { text: 'He\'s on the budget sign-off today. Can the colours wait until Friday? If not, I\'ll do a quick version.' },
          { text: 'Sure, he\'ll drop the budget.', why: 'The budget is important and urgent.' },
          { text: 'No.', why: 'Explain and offer a time.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Important, not urgent: [[1]] it, or it never happens. Neither: [[2]] it.',
        blanks: [['schedule'], ['drop']],
        distractors: ['ignore', 'frame'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tolu\'s question to Tobi.',
        tiles: ['Are', 'these', 'the', 'right', 'top', 'three?'],
        distractors: ['eleven'],
      },
      {
        kind: 'findBug',
        prompt: 'Which item is in the wrong box?',
        lines: [
          'Do now: budget by Thursday',
          'Do now: fix the sign-up form before visits',
          'Do now: reorganise my desktop folders',
          'Schedule: write the review template',
        ],
        bug: 2,
        fix: 'Drop it, or do it in a spare five minutes.',
        explanation: 'Neither important nor urgent.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many "urgent" things did Tolu start with?',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Tolu\'s prioritising.',
        lines: ['List everything', 'Give AI the goal and deadlines', 'Get a first sort', 'Agree the top three with Tobi'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Who decides?',
        groups: ['AI can suggest', 'Tobi decides'],
        items: [
          { text: 'A first sort of the list', group: 0 },
          { text: 'Which of two big tasks wins', group: 1 },
          { text: 'One line of reasoning per task', group: 0 },
          { text: 'Whether a deadline can move', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do important-but-not-urgent tasks need scheduling?',
        options: [
          { text: 'Urgent things always push them out otherwise' },
          { text: 'They\'re not important', why: 'They are; they\'re just not urgent.' },
          { text: 'They don\'t', why: 'They get squeezed out.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Sort your current tasks into the four boxes. What\'s important but never gets done?',
    starters: ['Do now:', 'Important, never done:'],
  },
  deepen: { title: 'Try it today', summary: 'Give AI your goal, tasks and deadlines, get a first sort, then check the top three with your manager.' },
  notes: 'The urgent/important matrix is commonly attributed to Dwight D. Eisenhower and popularised by Stephen Covey. Dates fictional.',
};

export default lesson;
