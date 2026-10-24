import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 19 — the learner's promotion case (kit piece 3). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your promotion case',
  summary: 'Your turn. Whether you\'re asking for a promotion, a bigger role or more responsibility, the case works the same way. Build yours now, even if you won\'t use it for months.',
  minutes: 12,
  outcomes: ['Write your own promotion case', 'Plan the conversation around it', 'Know what to do after the answer'],
  learn: [
    {
      kind: 'steps',
      title: 'Kit piece 3: your promotion case',
      steps: [
        { title: '1. The criteria, in your words', body: 'From the ladder, your manager and people at the next level. Four or five lines.' },
        { title: '2. Evidence for each', body: 'From your impact record: what, who it helped, a number, a quote. Note any gaps honestly.' },
        { title: '3. The gap plan', body: 'Two gaps, real projects, a date, monthly check-ins. Agreed with your manager.' },
        { title: '4. The one-page case', body: 'Ask at the top, criteria with evidence, gaps closed, what others say, what\'s next.' },
        { title: '5. The conversation and after', body: 'Ask clearly in a 1:1. If yes: ask about pay and timing. If "not yet": ask what they\'d need to see, and set a date.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Criteria, evidence, gap plan, one-page case, a clear conversation. Ready for yes or "not yet".',
    },
  ],
  apply: {
    scenario: 'You build your promotion case.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the kit piece in order.',
        lines: ['Criteria in your words', 'Evidence for each', 'The gap plan', 'The one-page case', 'The conversation and after'],
      },
      {
        kind: 'sortGroups',
        prompt: 'If "yes", or if "not yet"?',
        groups: ['If yes', 'If not yet'],
        items: [
          { text: 'Ask about pay and timing', group: 0 },
          { text: 'Ask what they\'d need to see', group: 1 },
          { text: 'Thank them and plan the new role', group: 0 },
          { text: 'Agree a date to revisit', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where does the evidence come from?',
        options: [
          { text: 'Memory on the day', why: 'Your impact record.' },
          { text: 'Your impact record' },
          { text: 'Other people\'s work', why: 'Your own impact record.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A learner says their company has no ladder and no promotions. Is this useless?',
        options: [
          { text: 'Yes, skip it.', why: 'It works for many asks.' },
          { text: 'Invent a ladder.', why: 'Ask what the next step looks like.' },
          { text: 'No: the same case works for asking for more responsibility, a raise, or a role elsewhere.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak step.',
        lines: ['Evidence with numbers and quotes.', 'A gap plan with no date.', 'Ask clearly in a 1:1.'],
        bug: 1,
        explanation: 'Without a date, "later" drifts.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its source.',
        pairs: [
          ['Criteria', 'Ladder, manager, next-level people'],
          ['Evidence', 'Impact record'],
          ['Gap plan', 'Agreed with your manager'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When should you build your case?',
        options: [
          { text: 'Now, even if you won\'t use it for months' },
          { text: 'The night before', why: 'Start now.' },
          { text: 'Never', why: 'It shows what\'s missing.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the kit.',
        template: 'Criteria, evidence, gap [[1]], one-page [[2]].',
        blanks: [['plan'], ['case']],
        distractors: ['excuse', 'rant', 'wish'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many gaps should a gap plan focus on? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the kit, or not?',
        groups: ['In the kit', 'Not'],
        items: [
          { text: 'A one-page case', group: 0 },
          { text: 'An ultimatum letter', group: 1 },
          { text: 'A dated gap plan', group: 0 },
          { text: 'Complaints about peers', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write the ask line of your own case now. What are your two biggest gaps?',
    starters: ['My ask:', 'My gaps:'],
  },
  deepen: {
    title: 'Your kit, piece 3',
    summary: 'Build your promotion case with all five parts. Book a 1:1 to discuss the criteria, even if you\'re not asking yet.',
  },
  notes: 'Kit piece 3 of How to Get Ahead at Work.',
};

export default lesson;
