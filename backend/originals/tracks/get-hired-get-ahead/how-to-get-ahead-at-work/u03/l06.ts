import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 6 — reading the Developer row of a career ladder. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The ladder, line by line',
  summary: 'The Developer row of Njangi Pay\'s career ladder is five lines long. Clinton has read it before, but never like this. Tap each line to see what it really asks for.',
  minutes: 11,
  outcomes: ['Read a career ladder line by line', 'Turn vague criteria into concrete actions', 'Spot what you\'ve done and what\'s missing'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of the Developer row',
      text: 'Delivers features end to end with little guidance.\nBreaks down ambiguous problems and proposes a plan.\nLeads small pieces of work involving two or more people.\nWrites clear design docs and explains trade-offs.\nRaises the team\'s standards through reviews and mentoring.',
      hotspots: [
        { phrase: 'with little guidance', note: 'Independence. Clinton delivered sync status, but Ngozi checked in daily. Next time: agree the goal, then report weekly.' },
        { phrase: 'Breaks down ambiguous problems and proposes a plan.', note: 'Not "does the tasks it\'s given". The payout fix is a good example; he can point to it.' },
        { phrase: 'involving two or more people', note: 'His clearest gap. He\'s led his own work, not a small group\'s.' },
        { phrase: 'explains trade-offs', note: '"We could do A or B; I chose A because..." He hasn\'t written a design doc yet. A concrete next step.' },
        { phrase: 'Raises the team\'s standards through reviews and mentoring.', note: 'Kemi\'s onboarding and the notes doc count here. Evidence he already has.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'For each ladder line: what does it mean here, what evidence do I have, what\'s missing?',
    },
  ],
  apply: {
    scenario: 'Clinton reads the Developer row.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Evidence he has, or a gap?',
        groups: ['Has evidence', 'Gap'],
        items: [
          { text: 'Mentoring (Kemi)', group: 0 },
          { text: 'Leading work with two or more people', group: 1 },
          { text: 'Breaking down an ambiguous problem (payout)', group: 0 },
          { text: 'Writing a design doc', group: 1 },
          { text: 'End-to-end delivery (sync status)', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "explains trade-offs" mean?',
        options: [
          { text: 'Saying "We could do A or B; I chose A because..."' },
          { text: 'Trading jobs with colleagues', why: 'Explaining choices between options.' },
          { text: 'Talking about salary', why: 'Explaining design choices.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each ladder line to a concrete action.',
        pairs: [
          ['With little guidance', 'Agree the goal, report weekly'],
          ['Leads work with two or more', 'Lead a small project with Kemi'],
          ['Writes design docs', 'Write one for the next feature'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'The ladder says "little guidance" but Ngozi checked my sync work daily. Does that count?',
        options: [
          { text: 'Partly. Next time I\'ll agree the goal up front, then report weekly, to show more independence.' },
          { text: 'Yes, fully.', why: 'Daily checks suggest more guidance than the ladder means.' },
          { text: 'No, I\'m hopeless.', why: 'It\'s a gap to close, not a verdict.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the misreading.',
        lines: ['Kemi\'s onboarding counts as mentoring.', '"Leads work" means being the loudest in meetings.', 'A design doc would show trade-offs.'],
        bug: 1,
        explanation: 'Leading work means coordinating a small piece of work with others.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s method for each line in order.',
        lines: ['What does it mean here?', 'What evidence do I have?', 'What\'s missing?', 'What\'s one concrete action?'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s Clinton\'s clearest gap?',
        options: [
          { text: 'Leading work involving two or more people' },
          { text: 'Mentoring', why: 'He has evidence there.' },
          { text: 'End-to-end delivery', why: 'He has evidence there.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the method.',
        template: 'What does it [[1]]? What [[2]] do I have? What\'s missing?',
        blanks: [['mean'], ['evidence']],
        distractors: ['cost', 'excuse', 'gossip'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines are in the Developer row? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Concrete action, or vague intention?',
        groups: ['Concrete', 'Vague'],
        items: [
          { text: 'Write a design doc for the retry service', group: 0 },
          { text: 'Be better', group: 1 },
          { text: 'Lead a two-person project in Q4', group: 0 },
          { text: 'Try harder', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Take one line describing the next level for you. What does it mean, what evidence do you have, what\'s missing?',
    starters: ['The line:', 'Missing:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'For each line of your next level, write: meaning, evidence, gap, one action. One table, one page.',
  },
  notes: 'The ladder text is invented but typical of software career frameworks.',
};

export default lesson;
