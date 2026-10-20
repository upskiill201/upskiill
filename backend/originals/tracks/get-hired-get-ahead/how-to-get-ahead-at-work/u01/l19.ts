import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 19 — the learner's first-90-days kit (kit piece 1). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your first-90-days kit',
  summary: 'Your turn. Everything Clinton used in his first 90 days, as a kit you can take into any new role: a plan, a glossary, a standards list, a people map and a 1:1 doc.',
  minutes: 12,
  outcomes: ['Assemble a first-90-days kit', 'Set it up before day one', 'Use it every week'],
  learn: [
    {
      kind: 'steps',
      title: 'Kit piece 1: your first 90 days',
      steps: [
        { title: '1. A 30-60-90 plan', body: 'Learn, contribute, own, with one or two people to learn from in each phase. Agreed with your manager.' },
        { title: '2. A glossary', body: 'Every unknown word, acronym and team name, with its meaning. Share it with the next new person.' },
        { title: '3. A standards list', body: 'Every rule you learn from feedback and reviews, so you never get the same comment twice.' },
        { title: '4. A people map', body: 'Who your work touches outside your team, one name each, and when you met them.' },
        { title: '5. A running 1:1 doc', body: 'Date, progress, stuck, one bigger topic, feedback. Plus your "I broke something" message template at the top.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Plan, glossary, standards, people, 1:1 doc. Set it up before day one; use it every week.',
    },
  ],
  apply: {
    scenario: 'You build your first-90-days kit.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the kit in order.',
        lines: ['A 30-60-90 plan', 'A glossary', 'A standards list', 'A people map', 'A running 1:1 doc'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each kit item to what it\'s for.',
        pairs: [
          ['Glossary', 'Unknown words and acronyms'],
          ['Standards list', 'Never the same comment twice'],
          ['People map', 'Who your work touches'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which kit item?',
        groups: ['Standards list', '1:1 doc'],
        items: [
          { text: 'Log errors with the request ID', group: 0 },
          { text: 'Tuesday: progress, stuck, feedback', group: 1 },
          { text: 'Name things by what they do', group: 0 },
          { text: 'One bigger topic per week', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When should you set up the kit?',
        options: [
          { text: 'Before day one, then use it every week' },
          { text: 'After a year', why: 'It\'s most useful from day one.' },
          { text: 'Only if things go wrong', why: 'Weekly, from the start.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A learner is starting a job in a shop, not tech. Does this kit still work?',
        options: [
          { text: 'Yes: every job has a plan, words to learn, standards, people and a manager to meet.' },
          { text: 'No, only for developers.', why: 'It works in any job.' },
          { text: 'Only the glossary.', why: 'All five parts work.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak kit item.',
        lines: ['A 30-60-90 plan agreed with my manager.', 'A plan I wrote and never showed anyone.', 'A people map with four names.'],
        bug: 1,
        explanation: 'Agree the plan with your manager, and use it weekly.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What goes at the top of the 1:1 doc?',
        options: [
          { text: 'The "I broke something" message template' },
          { text: 'A list of complaints', why: 'The incident template.' },
          { text: 'Salary figures', why: 'The incident template.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the kit.',
        template: 'Plan, [[1]], standards, people, [[2]] doc.',
        blanks: [['glossary'], ['1:1', 'one-to-one']],
        distractors: ['gossip', 'salary', 'party'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many items are in the kit? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the kit, or not?',
        groups: ['Part of it', 'Not'],
        items: [
          { text: 'A people map', group: 0 },
          { text: 'A list of rivals', group: 1 },
          { text: 'A glossary', group: 0 },
          { text: 'A secret complaints file', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which kit item would have helped you most in your last new role or course?',
    starters: ['It would have been...', 'Because...'],
  },
  deepen: {
    title: 'Your kit, piece 1',
    summary: 'Set up your first-90-days kit now, in one folder: plan, glossary, standards list, people map, 1:1 doc.',
  },
  notes: 'Kit piece 1 of How to Get Ahead at Work.',
};

export default lesson;
