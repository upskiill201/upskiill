import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 19 — the learner's weekly networking rhythm. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your weekly rhythm',
  summary: 'Miracle says the people who find hidden jobs aren\'t the most confident. They\'re the most consistent. She gives Clinton a weekly rhythm that fits in about two hours, next to final-year exams.',
  minutes: 12,
  outcomes: ['Plan a realistic weekly networking routine', 'Track your conversations simply', 'Keep applying to adverts at the same time'],
  learn: [
    {
      kind: 'steps',
      title: 'Two hours a week',
      steps: [
        { title: 'Monday: five new messages (30 minutes)', body: 'Pick five names from your network map. Write five personal messages: a real reason, one line about you, one small ask.' },
        { title: 'Wednesday: follow up and report back (20 minutes)', body: 'Send kind follow-ups to anyone silent for a week. Send at least one report-back: "You suggested X, I did it, here\'s what happened."' },
        { title: 'One call or event (45 minutes)', body: 'One informational call, or one meet-up. Four questions ready. End with "Who else should I talk to?"' },
        { title: 'Friday: update your tracker (15 minutes)', body: 'A simple table: name, how you\'re connected, date contacted, what happened, next step. Clinton\'s has 23 rows after three weeks.' },
        { title: 'Plus: two good applications', body: 'Keep applying to adverts that really fit, with a tailored CV and cover letter. Hidden and visible markets, side by side.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Consistency beats confidence. Five messages, follow-ups, one conversation, one tracker update, two applications. Every week.',
    },
  ],
  apply: {
    scenario: 'Clinton plans his week.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the week in order.',
        lines: ['Monday: five new messages', 'Wednesday: follow up and report back', 'One call or event', 'Friday: update your tracker'],
      },
      {
        kind: 'mcq',
        prompt: 'According to Miracle, what do people who find hidden jobs have in common?',
        options: [
          { text: 'They\'re the most confident', why: 'She says consistent, not confident.' },
          { text: 'They\'re consistent' },
          { text: 'They know famous people', why: 'Consistency matters more.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Goes in the tracker, or not needed?',
        groups: ['In the tracker', 'Not needed'],
        items: [
          { text: 'Name', group: 0 },
          { text: 'Date contacted', group: 0 },
          { text: 'Their star sign', group: 1 },
          { text: 'Next step', group: 0 },
          { text: 'What they wore', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Exams start next week. Should I stop networking until they\'re over?',
        options: [
          { text: 'Yes, stop for two months.', why: 'Contacts go cold. Shrink it instead.' },
          { text: 'Skip the exams.', why: 'Never. Exams matter. Shrink networking.' },
          { text: 'I\'ll shrink it, not stop: two messages and the tracker. Then back to normal after exams.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that\'s missing from this plan.',
        lines: ['Monday: five new messages', 'One informational call', 'Stop all job applications'],
        bug: 2,
        explanation: 'Keep two good applications going. Both markets, side by side.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to its time.',
        pairs: [
          ['Five new messages', '30 minutes'],
          ['Follow-ups and report-backs', '20 minutes'],
          ['Tracker update', '15 minutes'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s the most useful tracker column?',
        options: [
          { text: 'Next step' },
          { text: 'Favourite colour', why: 'Not useful. "Next step" keeps you moving.' },
          { text: 'How famous they are', why: 'Track the next step.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: '[[1]] beats confidence. Five messages, every [[2]].',
        blanks: [['Consistency'], ['week']],
        distractors: ['Luck', 'year', 'Money'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many hours a week does Miracle\'s rhythm take? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the rhythm, or not?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'Two tailored applications', group: 0 },
          { text: '200 template messages', group: 1 },
          { text: 'One informational call', group: 0 },
          { text: 'Refreshing job sites all night', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at your real week. Where could two hours of networking actually fit?',
    starters: ['Monday I could...', 'My hardest step will be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make your tracker today: a table with name, connection, date, what happened, next step. Add the five names from your network map.',
  },
  notes: 'Weekly rhythm is a Teyro suggestion based on common careers guidance, not a research finding. Times are rough guides.',
};

export default lesson;
