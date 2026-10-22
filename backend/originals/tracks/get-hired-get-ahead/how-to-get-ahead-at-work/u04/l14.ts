import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 14 — reviewing and updating your plan. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Keep the plan alive',
  summary: 'Plans die in drawers. Miracle reviews hers every three months, in 30 minutes, with tea. Here\'s her routine, so Clinton\'s plan stays useful instead of becoming a nice document he once wrote.',
  minutes: 12,
  outcomes: ['Review a career plan every quarter', 'Update it with new evidence', 'Turn the review into next steps'],
  learn: [
    {
      kind: 'steps',
      title: 'A 30-minute quarterly review',
      steps: [
        { title: '1. Put it in the calendar', body: 'If-then: "If it\'s the first Saturday of the quarter, then I review my plan." Clinton sets a repeating reminder.' },
        { title: '2. Look at the evidence', body: 'Energy audit notes, impact record, feedback. What did you learn about yourself this quarter?' },
        { title: '3. Check the direction', body: 'Still right? Clearer? Changed? Clinton\'s: "Closer to deciding what we build" is getting clearer, not weaker.' },
        { title: '4. Update skills and steps', body: 'User research: progressing. Specs: one written. Next quarter: lead a small product decision.' },
        { title: '5. Share the update', body: 'Two lines to Ngozi and Miracle. People who know your plan can spot chances for you.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Every quarter: calendar, evidence, direction, skills and steps, share. Thirty minutes.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s quarterly review.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the review in order.',
        lines: ['Put it in the calendar', 'Look at the evidence', 'Check the direction', 'Update skills and steps', 'Share the update'],
      },
      {
        kind: 'mcq',
        prompt: 'How often does Miracle review her plan?',
        options: [
          { text: 'Every ten years', why: 'Every three months.' },
          { text: 'Every three months' },
          { text: 'Daily', why: 'Every three months.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful evidence for the review, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'Energy audit notes', group: 0 },
          { text: 'Horoscopes', group: 1 },
          { text: 'Impact record', group: 0 },
          { text: 'Feedback from Aïcha', group: 0 },
          { text: 'Other people\'s LinkedIn posts', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the habit that kills plans.',
        lines: ['A repeating calendar reminder.', 'Writing the plan once and never opening it again.', 'Sharing a two-line update.'],
        bug: 1,
        explanation: 'Plans die in drawers. Review them.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best update to share.',
        from: 'clinton',
        message: 'What do I send Ngozi and Miracle after my review?',
        options: [
          { text: 'Nothing, it\'s private.', why: 'Sharing lets people spot chances.' },
          { text: 'The whole 10-page plan.', why: 'Two lines.' },
          { text: '"Direction getting clearer: product. Next quarter: lead one small product decision. Any chances you see, I\'m keen."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to Clinton\'s action.',
        pairs: [
          ['Calendar', 'First Saturday of the quarter'],
          ['Direction', 'Product, getting clearer'],
          ['Next step', 'Lead one small product decision'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why share your plan update?',
        options: [
          { text: 'People who know it can spot chances for you' },
          { text: 'To brag', why: 'So people can help.' },
          { text: 'It\'s required', why: 'So people can help.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Plans die in [[1]]. Review them every [[2]].',
        blanks: [['drawers'], ['quarter']],
        distractors: ['offices', 'decade', 'meetings'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does the review take? (a number)',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Direction getting clearer, or weaker?',
        groups: ['Clearer', 'Weaker'],
        items: [
          { text: 'More energy every time he talks to users', group: 0 },
          { text: 'Dread before every product meeting', group: 1 },
          { text: 'Good feedback on research', group: 0 },
          { text: 'Lost interest in drivers\' problems', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'When will your next plan review be? Put it in your calendar now.',
    starters: ['My review date:', 'I\'ll share it with...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Set a repeating reminder for a 30-minute plan review every three months.',
  },
  notes: 'Uses the if-then planning idea from l02.',
};

export default lesson;
