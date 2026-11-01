import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 3 — an activity log vs. an impact record. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'From activity to impact',
  summary: 'Clinton\'s weekly notes say things like "Worked on sync status." Miracle shows him how to write the same week so that, in six months, it\'s evidence for a promotion.',
  minutes: 11,
  outcomes: ['Write an impact entry instead of an activity entry', 'Include who it helped and a number', 'Keep it weekly'],
  learn: [
    {
      kind: 'compare',
      title: 'Two weekly entries',
      before: { label: 'Activity log', text: '"Worked on sync status. Reviewed PRs. Meetings with support."\n\nTrue, but in six months nobody, including Clinton, will know what any of it achieved.' },
      after: { label: 'Impact record', text: '"Shipped sync status for support: agents can now see when a driver\'s phone last synced. In week one, \'where is my confirmation?\' calls dropped from about 40 to about 25. Support lead: \'This saves us hours.\'"\n\nWhat he did, who it helped, a number, and a quote. Evidence.' },
      notes: [
        'Say what you did, and who it helped.',
        'Add a number if you can, even an approximate one.',
        'Save quotes and thank-you messages.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'What I did, who it helped, a number, a quote. Write it weekly, while you still remember.',
    },
  ],
  apply: {
    scenario: 'Clinton upgrades his notes.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put an impact entry in order.',
        lines: ['What I did', 'Who it helped', 'A number', 'A quote, if there is one'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Activity or impact?',
        groups: ['Activity', 'Impact'],
        items: [
          { text: 'Worked on sync status', group: 0 },
          { text: 'Calls dropped from about 40 to 25', group: 1 },
          { text: 'Meetings with support', group: 0 },
          { text: 'Agents can see last sync time', group: 1 },
          { text: 'Reviewed PRs', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add an approximate number?',
        options: [
          { text: 'To look clever', why: 'To make impact real.' },
          { text: 'Even a rough number makes the impact real and comparable' },
          { text: 'Numbers must be exact or nothing', why: 'Approximate is fine; say "about".' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak entry.',
        lines: ['Sync status shipped; calls down from about 40 to 25.', 'Did stuff on sync.', 'Support lead: "This saves us hours."'],
        bug: 1,
        explanation: 'Vague activity. Say what, who, and a number.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I don\'t have an exact number for the calls. Should I leave it out?',
        options: [
          { text: 'Make up an exact number.', why: 'Never invent numbers.' },
          { text: 'Leave out the impact entirely.', why: 'Use an honest approximation.' },
          { text: 'I\'ll use "about 40 to about 25" and say where it came from. Approximate and honest is fine.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to Clinton\'s entry.',
        pairs: [
          ['What he did', 'Shipped sync status'],
          ['Who it helped', 'Support agents'],
          ['A quote', '"This saves us hours."'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When should Clinton write impact entries?',
        options: [
          { text: 'Every week' },
          { text: 'Once a year', why: 'You\'ll forget. Weekly.' },
          { text: 'Only before reviews', why: 'Weekly, while you remember.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'What I did, who it [[1]], a [[2]], a quote.',
        blanks: [['helped'], ['number']],
        distractors: ['hurt', 'joke', 'excuse'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Roughly how many calls a week were there before sync status? (a number)',
        answers: ['40', 'forty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth saving, or not?',
        groups: ['Save it', 'Don\'t bother'],
        items: [
          { text: 'A thank-you from support', group: 0 },
          { text: 'A meeting invite', group: 1 },
          { text: 'A before-and-after number', group: 0 },
          { text: 'The lunch menu', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite one thing you did last week as an impact entry: what, who, a number, a quote.',
    starters: ['I...', 'It helped...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Start an impact record today with one entry. Save any thank-you message you receive in the same place.',
  },
  notes: 'Call numbers are story details. Encourages honest approximations ("about"), never invented figures.',
};

export default lesson;
