import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: talk card v2. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Talk card v2',
  summary: 'Lucía adds five checks for senior meetings to her talk card. Tap each one.',
  minutes: 11,
  outcomes: [
    'Add senior-meeting checks to your talk card',
    'Link each check to a lesson',
    'Use them before your next big meeting',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s talk card v2',
      text: 'Checks 1 to 5, plus: 6. Is it a recommendation, not a report? 7. Can I answer the four questions: want, why, risk, what else? 8. One contribution ready, said in the first ten minutes? 9. Disagreeing: shared goal, one fact, an alternative, then commit? 10. Cut in? Answer first, then skip to what they want.',
      hotspots: [
        { phrase: 'a recommendation, not a report', note: 'Lessons 1 and 3: the leadership meeting.' },
        { phrase: 'the four questions', note: 'Lesson 2: Carmen\'s list.' },
        { phrase: 'One contribution ready', note: 'Lesson 6: speaking up when nobody asks.' },
        { phrase: 'shared goal, one fact', note: 'Lesson 4: disagreeing upward.' },
        { phrase: 'Cut in?', note: 'Lesson 7: when the CEO cuts in.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v2 adds: recommend, four questions, one contribution, disagree well, answer cut-ins first.',
    },
  ],
  apply: {
    scenario: 'Talk card v2.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the lesson.',
        pairs: [
          ['Recommendation, not report', 'The leadership meeting'],
          ['Four questions', 'Carmen\'s list'],
          ['Shared goal, one fact', 'Disagreeing upward'],
          ['Answer cut-ins first', 'When the CEO cuts in'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many checks are on talk card v2 in total?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new checks as written.',
        lines: ['Recommendation', 'Four questions', 'One contribution', 'Disagree well', 'Answer cut-ins'],
      },
      {
        kind: 'mcq',
        prompt: 'Which check is new on v2?',
        options: [
          { text: 'Can I answer the four questions?' },
          { text: 'Pause instead of um', why: 'That was v1.' },
          { text: 'Three points at most', why: 'That was v1.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes v2 or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: '"I recommend Monterrey from October."', group: 0 },
          { text: '"Here\'s what happened each week."', group: 1 },
          { text: 'A risk with a plan', group: 0 },
          { text: '"I\'ll get to that on slide 9."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'I\'m presenting to Carmen for the first time on Friday.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'Write one line for each of the four questions tonight. If one\'s blank, that\'s what to work on.' },
          { text: 'Make 30 slides to be safe.', why: 'Four lines first.' },
          { text: 'Just wing it.', why: 'Ten minutes of prep.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Check 6.',
        template: 'Is it a [[1]], not a [[2]]?',
        blanks: [['recommendation'], ['report']],
        distractors: ['joke', 'summary'],
      },
      {
        kind: 'findBug',
        prompt: 'Sofía\'s plan fails which check?',
        lines: [
          'Recommendation: hire a second designer.',
          'Why: we turned down 6 projects last quarter.',
          'Risk: cost; it\'s within budget.',
          'If Carmen disagrees, argue until she gives in.',
        ],
        bug: 3,
        fix: 'If Carmen disagrees, accept the call and commit.',
        explanation: 'Check 9: disagree, then commit.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which check number is about cut-ins?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'By when should Lucía make her one contribution?',
        options: [
          { text: 'In the first ten minutes' },
          { text: 'At the very end', why: 'Early is easier.' },
          { text: 'Only if asked', why: 'Speak up early.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Add checks 6 to 10 to your own talk card. Which will you use this week?',
    starters: ['This week I\'ll use...'],
  },
  deepen: {
    title: 'Ten checks, two minutes',
    summary: 'Ten checks sounds like a lot, but most are a glance. Before a big meeting, the card takes two minutes and catches the gaps senior people would find.',
  },
  notes: 'Talk card v2 (checks 6 to 10).',
};

export default lesson;
