import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 12 — making the transition well. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Making the move well',
  summary: 'Clinton has said yes to APM. He starts in a month. Miracle says how he leaves engineering and how he enters product will shape both teams\' view of him for years.',
  minutes: 11,
  outcomes: ['Hand over work responsibly', 'Keep relationships with your old team', 'Start the new role with a 90-day plan'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. A real handover.</strong> Document what you own: how the sync service works, open issues, decisions and why. Pair with whoever takes over. Clinton\'s handover goes to Kemi.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. Finish or pass on cleanly.</strong> Don\'t leave half-done work in limbo. Either finish it or hand it over with notes and a clear owner.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. Thank your old team, specifically.</strong> Paul for the hard reviews. Ngozi for the "not yet" that became a plan. Kemi for taking on the sync service.</p>',
    },
    {
      kind: 'check',
      question: 'Clinton has three days left on the engineering team. One feature is half-built. What should he do?',
      options: ['Leave it for someone to find', 'Finish it or hand it over with notes and an owner', 'Delete it'],
      answer: 1,
      explanation: 'Clean handovers protect the team and your reputation.',
    },
    {
      kind: 'text',
      html: '<p><strong>4. Stay connected.</strong> His old team are now his closest partners: product decisions land on their desks. Keep the lunches with Paul.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>5. Start again on purpose.</strong> New role, same first-90-days kit: ask Aïcha what success looks like at 30, 60 and 90 days. Glossary. People map. A small early win.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Hand over properly, finish or pass on cleanly, thank people specifically, stay connected, and start the new role with a 90-day plan.',
    },
  ],
  apply: {
    scenario: 'Clinton moves from engineering to product.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good transition habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Documenting the sync service for Kemi', group: 0 },
          { text: 'Leaving half-built work without notes', group: 1 },
          { text: 'Thanking Paul for hard reviews', group: 0 },
          { text: 'Never talking to engineering again', group: 1 },
          { text: 'A 30-60-90 plan with Aïcha', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why stay connected to the old team?',
        options: [
          { text: 'They\'re now his closest partners in product' },
          { text: 'To spy on them', why: 'They\'re his partners now.' },
          { text: 'No reason', why: 'Product decisions land on their desks.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to Clinton\'s thanks.',
        pairs: [
          ['Paul', 'The hard reviews'],
          ['Ngozi', 'Turning "not yet" into a plan'],
          ['Kemi', 'Taking on the sync service'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s handover message to Kemi.',
        from: 'clinton',
        message: 'What do I send Kemi about the handover?',
        options: [
          { text: '"Here\'s the sync-service doc: how it works, open issues, key decisions and why. Can we pair for an hour each day this week?"' },
          { text: '"Good luck!"', why: 'Give a real handover.' },
          { text: 'Nothing; she\'ll figure it out.', why: 'Hand over properly.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the transition mistake.',
        lines: ['Writes a handover doc.', 'Stops caring about engineering work in his last month.', 'Thanks the team.'],
        bug: 1,
        explanation: 'How you leave shapes your reputation. Finish well.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the transition in order.',
        lines: ['Write the handover doc', 'Pair with Kemi', 'Thank the team', 'Start a new 30-60-90 plan with Aïcha'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does Clinton reuse in the new role?',
        options: [
          { text: 'His first-90-days kit' },
          { text: 'Nothing', why: 'The same kit works.' },
          { text: 'Only his title', why: 'His first-90-days kit.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Hand over [[1]]. Start again on [[2]].',
        blanks: [['properly'], ['purpose']],
        distractors: ['quickly', 'holiday', 'autopilot'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who takes over the sync service? (one word)',
        answers: ['kemi'],
        placeholder: 'A name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Protects his reputation, or risks it?',
        groups: ['Protects', 'Risks'],
        items: [
          { text: 'A clean handover', group: 0 },
          { text: 'Half-done work in limbo', group: 1 },
          { text: 'Specific thanks', group: 0 },
          { text: 'Coasting in the last month', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last time you left a role, team or project. How did you hand over? What would you do better?',
    starters: ['When I left...', 'Next time...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a handover doc for one thing you own today, as if you were leaving tomorrow. It\'s useful even if you\'re not.',
  },
  notes: 'Reuses the first-90-days kit from Ch1.',
};

export default lesson;
