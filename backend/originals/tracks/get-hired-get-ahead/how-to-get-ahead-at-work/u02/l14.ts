import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 14 — keeping an impact record that's ready for reviews. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'The impact record',
  summary: 'Clinton\'s weekly notes are getting long. Miracle shows him how to turn them into an impact record he can open in any review, promotion conversation or job interview, in minutes.',
  minutes: 12,
  outcomes: ['Organise an impact record by goal', 'Write a monthly summary', 'Keep evidence ready for reviews'],
  learn: [
    {
      kind: 'steps',
      title: 'Build your impact record',
      steps: [
        { title: '1. One doc, sections by goal', body: 'Sections: Goal 1 (failed confirmations), Goal 2 (support calls), Goal 3 (old phones), Making others better, Problems nobody owned.' },
        { title: '2. Weekly: one or two lines', body: 'What, who it helped, a number, a quote. Five minutes every Friday.' },
        { title: '3. Save the evidence', body: 'Links to pull requests, screenshots of numbers, thank-you messages. Paste them in, because chat history disappears.' },
        { title: '4. Monthly: a three-line summary', body: '"This month: payout report fix shipped with finance, crashes on 2 GB phones down about 90%, Kemi onboarded." Share it with Ngozi.' },
        { title: '5. Before any review: read it first', body: 'Ten minutes with the record and you\'ll walk in with facts, not memory.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Sections by goal. One or two lines a week. Save evidence. A three-line monthly summary. Read it before every review.',
    },
  ],
  apply: {
    scenario: 'Clinton builds his impact record.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['One doc, sections by goal', 'Weekly: one or two lines', 'Save the evidence', 'Monthly: a three-line summary', 'Read it before any review'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which section of the record?',
        groups: ['Making others better', 'Problems nobody owned'],
        items: [
          { text: 'Onboarded Kemi', group: 0 },
          { text: 'Fixed the Monday payout report', group: 1 },
          { text: 'Updated the onboarding doc', group: 0 },
          { text: 'A shared report that kept breaking', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why paste evidence into the record?',
        options: [
          { text: 'To make it longer', why: 'Evidence vanishes otherwise.' },
          { text: 'Chat history and memory disappear' },
          { text: 'It\'s required by HR', why: 'It\'s for you.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak record habit.',
        lines: ['Five minutes every Friday.', 'Write it all once a year from memory.', 'A three-line monthly summary.'],
        bug: 1,
        explanation: 'Memory fades. Weekly entries.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s monthly summary.',
        from: 'clinton',
        message: 'What should my three-line summary for Ngozi say?',
        options: [
          { text: '"Busy month, lots done."', why: 'Results with numbers.' },
          { text: 'A 10-page list.', why: 'Three lines.' },
          { text: '"Payout report fix shipped with finance. Crashes on 2 GB phones down about 90%. Kemi onboarded."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece of evidence to its type.',
        pairs: [
          ['Link to the merged fix', 'Pull request'],
          ['"This saves us hours"', 'Thank-you quote'],
          ['Chart of crashes falling', 'Screenshot of numbers'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton do ten minutes before any review?',
        options: [
          { text: 'Read his impact record' },
          { text: 'Panic', why: 'Read the record.' },
          { text: 'Rely on memory', why: 'Facts beat memory.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the habit.',
        template: 'Sections by [[1]]. Lines every [[2]].',
        blanks: [['goal'], ['week']],
        distractors: ['mood', 'year', 'colour'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines should the monthly summary be? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the impact record, or not?',
        groups: ['Belongs', 'Doesn\'t'],
        items: [
          { text: 'A before-and-after number', group: 0 },
          { text: 'Gossip about a colleague', group: 1 },
          { text: 'A thank-you message', group: 0 },
          { text: 'Every meeting invite', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you had a review tomorrow, what three facts would you want to have ready?',
    starters: ['1.', '2.'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Set up your impact record now: one doc, sections by goal, and this week\'s first line. Set a Friday reminder.',
  },
  notes: 'Numbers are story details.',
};

export default lesson;
