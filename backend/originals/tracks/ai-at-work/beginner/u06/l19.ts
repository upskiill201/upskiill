import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 19 — Ada and Tolu's planning routine. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your planning routine',
  summary: 'Everything from Unit 6 in one routine: a project start, a weekly rhythm, and a plan for when things change.',
  minutes: 12,
  outcomes: [
    'Use a three-part planning routine',
    'Link each part to a lesson in this unit',
    'Adapt the routine to your own work',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The planning routine',
      steps: [
        { title: 'At the start of a project', body: 'Mess to plan with AI. Break phases into tasks with "done" points. Estimate with ranges. Run a pre-mortem. One owner per task.' },
        { title: 'Every Monday', body: 'Fixed things first, tasks with estimates, 25% free. Sort by urgent and important. Cut now, not Thursday.' },
        { title: 'Every Friday', body: 'Five-line status update with honest colours. Ten-minute review: one change for next week.' },
        { title: 'For repeat work', body: 'A short checklist of the easy-to-miss steps.' },
        { title: 'When things change', body: 'What changed, what it affects, two or three options, your recommendation. Today.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Start: plan, break down, estimate, pre-mortem, owners. Weekly: Monday plan, Friday update and review. Always: checklists, and replan fast.',
    },
  ],
  apply: {
    scenario: 'Tolu writes his planning routine.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'When does Tolu do this?',
        groups: ['Project start', 'Every Monday', 'Every Friday'],
        items: [
          { text: 'Run a pre-mortem', group: 0 },
          { text: 'Fit tasks around meetings', group: 1 },
          { text: 'Send the five-line status', group: 2 },
          { text: 'Agree task owners', group: 0 },
          { text: 'Ten-minute review', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to the lesson.',
        pairs: [
          ['Ranges, not dates', 'Estimating how long things take'],
          ['Imagine it failed', 'Risks: what could go wrong?'],
          ['One owner per task', 'Planning with other people'],
          ['Options, today', 'When plans change'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the project-start steps.',
        lines: ['Mess to plan', 'Break into tasks', 'Estimate with ranges', 'Pre-mortem', 'Agree owners'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Tolu\'s pilot ran so smoothly. What\'s his secret?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Luck.', why: 'It was the routine.' },
          { text: 'A simple routine: Monday plan, Friday update and review, and replanning the same day when something changes.' },
          { text: 'The AI did everything.', why: 'AI helped; Tolu ran the routine.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the weekly rhythm.',
        template: 'Monday: [[1]] the week. Friday: update and [[2]].',
        blanks: [['plan'], ['review']],
        distractors: ['forget', 'party'],
      },
      {
        kind: 'mcq',
        prompt: 'Where does AI help most in the routine?',
        options: [
          { text: 'Deciding priorities', why: 'People decide.' },
          { text: 'Choosing owners', why: 'People agree owners.' },
          { text: 'First drafts: plans, breakdowns, risks, updates, options' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Tolu\'s routine is a mistake?',
        lines: [
          'Monday: plan the week, 25% free',
          'Friday: five-line update',
          'When things change: wait until Friday to mention it',
          'Repeat work: short checklist',
        ],
        bug: 2,
        fix: 'When things change: options to Tobi the same day.',
        explanation: 'Changes need replanning today, not Friday.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the routine\'s one-line summary.',
        tiles: ['Plan', 'Monday,', 'review', 'Friday,', 'replan', 'fast'],
        distractors: ['never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What percentage of each day should be left free? (number)',
        answers: ['25', '25%'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'AI drafts, or people decide?',
        groups: ['AI drafts', 'People decide'],
        items: [
          { text: 'A first task breakdown', group: 0 },
          { text: 'The final priorities', group: 1 },
          { text: 'A list of likely risks', group: 0 },
          { text: 'Which option to take after a change', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why have a routine at all?',
        options: [
          { text: 'You don\'t have to remember what to do; the habit does it' },
          { text: 'To impress people', why: 'It\'s about reliability.' },
          { text: 'Routines are boring', why: 'They free your attention for real problems.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the simplest part to start with this week?',
        options: [
          { text: 'A 30-page project plan', why: 'Start small.' },
          { text: 'Everything at once', why: 'One habit at a time.' },
          { text: 'The 10-minute Friday review' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which part of the routine will you start this week?',
    starters: ['I\'ll start with...', 'Every...'],
  },
  deepen: { title: 'Try it today', summary: 'Put two calendar reminders in: Monday "plan the week" and Friday "update and review".' },
  notes: 'Summary of Unit 6.',
};

export default lesson;
