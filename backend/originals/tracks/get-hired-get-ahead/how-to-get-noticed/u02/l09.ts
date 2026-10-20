import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 9 — write-ups that work: weak vs strong. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Write-ups that work',
  summary: 'Clinton\'s first write-up starts: "This project uses React, Node.js and a PostgreSQL database with three tables." Miracle stops reading at "React". Here\'s why, and the version she\'d read to the end.',
  minutes: 11,
  outcomes: ['Lead a write-up with the problem, not the tools', 'Cut technical detail that doesn\'t help the reader', 'Make the result impossible to miss'],
  learn: [
    {
      kind: 'compare',
      title: 'Tools first vs. problem first',
      before: { label: 'Tools first', text: 'NJANGI TRACKER\nThis project uses React, Node.js and a PostgreSQL database with three tables. It has a login page, dark mode and animations. I worked on it for three weeks.\n\nThe reader learns what Clinton used, not why it matters. The result is missing. Miracle stopped reading at "React".' },
      after: { label: 'Problem first', text: 'NJANGI TRACKER: no more "I already paid"\nMy mum\'s savings group (12 members) argued every month about who had paid. I asked three members what confused them and built a one-page tracker: who\'s paid, whose turn it is to collect. At the first meeting with it: zero disputes, and the meeting finished 20 minutes early.\nBuilt with: React, a simple database.\n\nProblem, action and result in the first lines. Tools go at the bottom, short.' },
      notes: [
        'Lead with the problem and the result. That\'s what everyone cares about.',
        'Tools go at the end, in one line. Technical readers will find them; others skip them happily.',
        'Give it a title that says the benefit: "no more \'I already paid\'".',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Problem first, result early, tools last.',
    },
  ],
  apply: {
    scenario: 'Clinton rewrites his case study.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should the first lines of a write-up be about?',
        options: [
          { text: 'The tools you used', why: 'Tools go last. Lead with what matters to the reader.' },
          { text: 'The problem, and what changed' },
          { text: 'How long it took', why: 'Time isn\'t the point. The problem and result are.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that should move to the bottom.',
        lines: ['My mum\'s njangi argued every month about who had paid.', 'This uses React, Node.js and PostgreSQL with three tables.', 'At the first meeting with it, there were zero disputes.'],
        bug: 1,
        explanation: 'Tools are useful, but they belong in one short line at the end.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Top of the write-up, or bottom?',
        groups: ['Top', 'Bottom'],
        items: [
          { text: 'The problem', group: 0 },
          { text: 'Built with: React', group: 1 },
          { text: 'The result', group: 0 },
          { text: 'Database details', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which title is best?',
        options: [
          { text: '"Project 4"', why: 'Says nothing.' },
          { text: '"React App"', why: 'Names a tool, not a benefit.' },
          { text: '"Njangi Tracker: no more \'I already paid\'"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But Njangi Pay hires developers. Won\'t they want the tech first?',
        options: [
          { text: 'They\'ll find it at the bottom. But the first person to read it is often a recruiter like Brenda, who cares about the problem and result.' },
          { text: 'Yes, put tech first.', why: 'The first reader is often not technical. Lead with the problem.' },
          { text: 'Leave the tech out completely.', why: 'Keep it, one line at the end, for the technical readers.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each weak line to a stronger one.',
        pairs: [
          ['I worked on it for three weeks', 'At the first meeting: zero disputes'],
          ['It has a login and dark mode', 'It shows who paid and whose turn it is'],
          ['Project 4', 'Njangi Tracker: no more "I already paid"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Miracle stop reading at "React"?',
        options: [
          { text: 'The opening told her nothing about why the project mattered' },
          { text: 'She hates React', why: 'She doesn\'t mind React. She wanted the problem and the result first.' },
          { text: 'It was too short', why: 'It wasn\'t short. It just led with the wrong thing.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Problem [[1]], result early, tools [[2]].',
        blanks: [['first'], ['last']],
        distractors: ['never', 'only', 'hidden'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Where do the tools go in a write-up: top or bottom?',
        answers: ['bottom', 'end', 'last', 'the bottom', 'at the end'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s new write-up in order.',
        lines: ['Title: Njangi Tracker: no more "I already paid"', 'The problem: 12 members argued every month', 'What I did: asked users, built a one-page tracker', 'The result: zero disputes at the first meeting', 'Built with: React, a simple database'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at any project write-up, bio or post you\'ve made. Does it lead with the problem and the result, or with the tools and the effort?',
    starters: ['It leads with...', 'I\'d change the first line to...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a title for your portfolio idea that says the benefit, like "no more \'I already paid\'". Try three versions and pick the clearest.',
  },
  notes: 'Problem-first, outcome-led writing for portfolios and CVs (common recruiter advice; matches Ch1 "show, don\'t claim"). Non-technical first readers: recruiters often screen before hiring managers.',
};

export default lesson;
