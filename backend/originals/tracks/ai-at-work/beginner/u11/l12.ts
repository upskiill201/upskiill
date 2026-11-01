import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 12 — habits that waste time. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Habits that waste time',
  summary: 'Ada\'s measurement shows one surprise: some AI habits cost her time. Sort the myths from the facts about where AI wastes it.',
  minutes: 12,
  outcomes: [
    'Spot AI habits that waste time',
    'Know when doing it yourself is faster',
    'Drop or fix the worst habit',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Using AI is always faster than doing it yourself.',
          isFact: false,
          explain: 'A two-line reply to a colleague is faster to type than to prompt, read and fix.',
        },
        {
          text: 'Regenerating over and over hoping for a better answer often wastes time.',
          isFact: true,
          explain: 'Usually it\'s faster to improve the request: add the missing context, then ask once.',
        },
        {
          text: 'Polishing an AI draft endlessly is a common time sink.',
          isFact: true,
          explain: 'Set a "good enough" bar for the task. Internal notes don\'t need ten rounds.',
        },
        {
          text: 'You should use AI for every task to get the most value.',
          isFact: false,
          explain: 'Value comes from using it where it helps most, and skipping it where it doesn\'t.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Quick message? Just type it. Bad answer? Fix the request, don\'t regenerate. Set a "good enough" bar.',
    },
  ],
  apply: {
    scenario: 'Ada cuts her time-wasting AI habits.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Faster with AI, or faster yourself?',
        groups: ['With AI', 'Yourself'],
        items: [
          { text: 'Summarising a 40-page report', group: 0 },
          { text: '"Thanks, see you at 3"', group: 1 },
          { text: 'A first draft of a proposal', group: 0 },
          { text: 'Fixing one typo', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The answer is bad. What\'s usually faster?',
        options: [
          { text: 'Regenerate ten times', why: 'Usually slower.' },
          { text: 'Improve the request with missing context, then ask once' },
          { text: 'Switch tools immediately', why: 'Fix the request first.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I spent an hour regenerating an email until it felt perfect.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Keep going until perfect.', why: 'Time sink.' },
          { text: 'Never use AI for emails.', why: 'Use it better.' },
          { text: 'Try adding what was missing (who it\'s for, tone, the one ask) and ask once. And decide when it\'s good enough.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Bad answer? Fix the [[1]], don\'t [[2]].',
        blanks: [['request', 'prompt'], ['regenerate']],
        distractors: ['tool', 'celebrate'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the time-waster to the fix.',
        pairs: [
          ['Regenerating endlessly', 'Add missing context'],
          ['Polishing internal notes', 'Set a good-enough bar'],
          ['AI for tiny messages', 'Just type it'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which habit in Ada\'s week wastes the most time?',
        lines: [
          'AI drafts the weekly status update',
          'AI summarises long reports',
          'AI writes every one-line chat reply',
          'AI chains the monthly report',
        ],
        bug: 2,
        fix: 'Type quick replies yourself.',
        explanation: 'Prompting takes longer than typing a line.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which follow-up fixes a weak answer best?',
        options: [
          { text: 'Try again.', why: 'Same request, similar result.' },
          { text: 'This is for Carmen, who\'s busy and annoyed. Keep it to 4 lines, own the delay, and give a new date.' },
          { text: 'Make it better.', why: 'No guidance.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long did Lucía spend regenerating her email? (hours)',
        answers: ['1', 'one', 'an hour'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s time rule.',
        tiles: ['Quick', 'message?', 'Just', 'type', 'it'],
        distractors: ['prompt'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'AI is always faster', group: 0 },
          { text: 'Endless regenerating wastes time', group: 1 },
          { text: 'Use AI for every task', group: 0 },
          { text: 'A good-enough bar saves time', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s fix for a weak answer.',
        lines: ['Notice what\'s missing', 'Add that context', 'Ask once', 'Stop at good enough'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "good enough" depend on?',
        options: [
          { text: 'Who will read it and what\'s at stake' },
          { text: 'How many times you regenerated', why: 'It depends on the task.' },
          { text: 'Nothing; always perfect', why: 'Match effort to stakes.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which AI habit wastes your time most? What will you do instead?',
    starters: ['The habit:', 'Instead:'],
  },
  deepen: { title: 'Try it today', summary: 'Next time an answer is weak, add one missing piece of context instead of regenerating.' },
  notes: 'General productivity guidance.',
};

export default lesson;
