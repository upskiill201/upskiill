import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 8 — a gap plan against the criteria. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The gap plan',
  summary: 'Clinton has the criteria, his evidence and a date: 1 March. Now he needs a plan to close the two gaps in three months, alongside his normal work. Here\'s how he and Ngozi build it.',
  minutes: 12,
  outcomes: ['Pick the gaps that matter most', 'Choose real projects that close them', 'Track progress monthly'],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to a gap plan',
      steps: [
        { title: '1. Pick two gaps, not five', body: 'Leading work with others, and writing design docs. Focus beats a long list.' },
        { title: '2. Find a real project for each', body: 'The retry service needs rebuilding: Clinton will lead it with Kemi (gap 1) and write its design doc (gap 2). One project closes both.' },
        { title: '3. Agree what "done" looks like', body: 'Design doc reviewed by Paul. Project shipped. Kemi says she learned from it.' },
        { title: '4. Check in monthly', body: 'In the 1:1 on the first Tuesday of each month: progress on each gap, evidence collected, anything blocking.' },
        { title: '5. Collect evidence as you go', body: 'Design doc link, Paul\'s review comments, the shipped result, a message from Kemi. Straight into the impact record.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Two gaps. Real projects. Agreed "done". Monthly check-ins. Evidence as you go.',
    },
  ],
  apply: {
    scenario: 'Clinton builds his gap plan.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Pick two gaps', 'Find a real project for each', 'Agree what "done" looks like', 'Check in monthly', 'Collect evidence as you go'],
      },
      {
        kind: 'mcq',
        prompt: 'Why pick two gaps, not five?',
        options: [
          { text: 'Focus closes gaps; a long list spreads too thin' },
          { text: 'Five is unlucky', why: 'Focus beats a long list.' },
          { text: 'The ladder only has two', why: 'It has five lines; focus on two gaps.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good gap-closing project, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Lead the retry-service rebuild with Kemi', group: 0 },
          { text: 'Read about leadership but never lead', group: 1 },
          { text: 'Write the retry-service design doc', group: 0 },
          { text: 'A side project nobody needs', group: 1 },
          { text: 'Present the design to the team', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak "done" definition.',
        lines: ['Design doc reviewed by Paul.', 'Feel more like a leader.', 'Project shipped.'],
        bug: 1,
        explanation: 'Too vague to check. Make "done" observable.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Can one project close both gaps?',
        options: [
          { text: 'Yes: leading the retry rebuild with Kemi and writing its design doc covers both.' },
          { text: 'No, I need ten projects.', why: 'One well-chosen project can do both.' },
          { text: 'Only if Paul does it.', why: 'Clinton has to lead it.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each gap to the action.',
        pairs: [
          ['Leading work with others', 'Lead the retry rebuild with Kemi'],
          ['Design docs and trade-offs', 'Write the retry-service design doc'],
          ['Evidence', 'Paul\'s review comments saved'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When are the monthly check-ins?',
        options: [
          { text: 'The first Tuesday of each month, in the 1:1' },
          { text: 'Never', why: 'Monthly, first Tuesday.' },
          { text: 'Every hour', why: 'Monthly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Two [[1]]. Real [[2]]. Evidence as you go.',
        blanks: [['gaps'], ['projects']],
        distractors: ['wishes', 'excuses', 'hours'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many gaps does Clinton focus on? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Observable "done", or vague?',
        groups: ['Observable', 'Vague'],
        items: [
          { text: 'Project shipped', group: 0 },
          { text: 'Be more senior', group: 1 },
          { text: 'Kemi says she learned from it', group: 0 },
          { text: 'Feel confident', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What two gaps stand between you and your next step? What real project could close both?',
    starters: ['Gap 1:', 'A project:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a one-page gap plan: two gaps, a real project, observable "done", monthly check-ins.',
  },
  notes: 'Gap plans against career frameworks are common practice.',
};

export default lesson;
