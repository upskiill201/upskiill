import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 2 — how promotions usually work. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'How promotions work',
  summary: 'Clinton thought promotions were a reward for working hard for long enough. Miracle, who promotes people, explains what actually happens behind the scenes in many companies.',
  minutes: 12,
  outcomes: ['Describe how promotion decisions are often made', 'Explain "already doing the next level"', 'Know what to check at your own company'],
  learn: [
    {
      kind: 'reading',
      title: 'Behind the scenes',
      html:
        '<p>Every company is different, but many follow a similar pattern.</p>' +
        '<p><strong>Levels and criteria.</strong> Roles are grouped into levels (Graduate Developer, Developer, Senior Developer...). Each level has written or unwritten expectations, often called a <strong>career ladder</strong> or framework. They usually describe <em>scope</em> (how big a problem you handle), <em>independence</em> (how much guidance you need) and <em>impact</em> (who your work affects).</p>' +
        '<p><strong>Already doing it.</strong> In many companies, people are promoted when they are <strong>already working at the next level</strong> most of the time, not as a bet that they will. That\'s why "What would you need to see?" is such a useful question.</p>' +
        '<p><strong>Timing.</strong> Promotions often happen in cycles (once or twice a year) and depend on budget. Your manager may need to argue for you in a meeting with other managers, so they need clear evidence.</p>' +
        '<p><strong>Your manager\'s role.</strong> Your manager is often your main advocate. The easier you make their case, with a clear record of impact against the criteria, the stronger it is.</p>' +
        '<p>Small companies may have no ladder at all. Then ask directly what the next role looks like and what would show you\'re ready.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Find the criteria. Work at the next level. Know the timing. Make your manager\'s case easy.',
    },
  ],
  apply: {
    scenario: 'Miracle explains promotions.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In many companies, when are people promoted?',
        options: [
          { text: 'After a fixed number of years', why: 'Time alone rarely decides it.' },
          { text: 'When they\'re already working at the next level most of the time' },
          { text: 'When they ask loudly enough', why: 'Evidence matters more.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each criterion to its meaning.',
        pairs: [
          ['Scope', 'How big a problem you handle'],
          ['Independence', 'How much guidance you need'],
          ['Impact', 'Who your work affects'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Usually affects promotion, or not?',
        groups: ['Affects it', 'Usually doesn\'t'],
        items: [
          { text: 'Evidence against the criteria', group: 0 },
          { text: 'The promotion cycle timing', group: 0 },
          { text: 'How many hours you sit at your desk', group: 1 },
          { text: 'Budget for the level', group: 0 },
          { text: 'Your favourite football team', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'So should I wait for Ngozi to promote me when she thinks I\'m ready?',
        options: [
          { text: 'Yes, just wait.', why: 'Make her case easy.' },
          { text: 'Ask every week.', why: 'Build evidence instead.' },
          { text: 'No: I\'ll learn the criteria, work at that level, and make her case easy with evidence.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the misunderstanding.',
        lines: ['Promotions often happen in cycles.', 'If I stay long enough, I\'ll be promoted automatically.', 'My manager may argue for me with others.'],
        bug: 1,
        explanation: 'Time alone rarely decides it. Evidence does.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does your manager need clear evidence?',
        options: [
          { text: 'They may have to argue for you with other managers' },
          { text: 'To fill a file', why: 'They argue for you.' },
          { text: 'They don\'t need any', why: 'They need it to make your case.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What if your company has no career ladder?',
        options: [
          { text: 'Give up', why: 'Ask directly.' },
          { text: 'Invent your own title', why: 'Ask directly.' },
          { text: 'Ask directly what the next role looks like and what would show you\'re ready' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Find the [[1]]. Work at the next [[2]].',
        blanks: [['criteria'], ['level']],
        distractors: ['gossip', 'desk', 'party'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the usual name for a document listing level expectations? A career ___. (one word)',
        answers: ['ladder', 'framework'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Scope or independence?',
        groups: ['Scope', 'Independence'],
        items: [
          { text: 'Owns a whole service', group: 0 },
          { text: 'Makes design decisions without checking every step', group: 1 },
          { text: 'Handles a cross-team problem', group: 0 },
          { text: 'Needs little guidance', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Do you know how promotions work where you are (or want to be)? What would you need to find out?',
    starters: ['I know...', 'I need to find out...'],
  },
  deepen: {
    title: 'Check locally',
    summary: 'Find out whether your workplace has a career ladder, and when promotion decisions are made. If you\'re not working yet, ask someone who is.',
  },
  notes: 'General description; promotion practices vary widely by company size, sector and country.',
};

export default lesson;
