import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 18 — Ada's safety checklist. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your safety checklist',
  summary: 'Everything from Unit 10 in one checklist Ada now shares with the team, short enough to run before every paste.',
  minutes: 12,
  outcomes: [
    'Use a six-step AI safety checklist',
    'Link each step to a lesson in this unit',
    'Share it so the whole team stays safe',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Ada\'s AI safety checklist',
      steps: [
        { title: '1. Whose data is it?', body: 'Personal, client or confidential? Was it collected for this use?' },
        { title: '2. Never-paste scan', body: 'Passwords and keys, ID and account numbers, personal details, health info, confidential documents, private promises.' },
        { title: '3. Approved tool and settings', body: 'Company-approved for this data? Training and memory settings checked?' },
        { title: '4. Replace or generalise', body: 'Placeholders like [CUSTOMER] or [REDACTED], or ask a general question instead.' },
        { title: '5. Regulated or high stakes?', body: 'A qualified person reviews before anything goes to customers.' },
        { title: '6. Something went wrong?', body: 'Report it at once to your manager and data protection contact. No blame.' },
        { title: 'And always', body: 'Urgent money or data requests: verify on a second channel. Be honest when asked about AI use.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Whose data, never-paste scan, approved tool, replace or generalise, review if regulated, report mistakes fast.',
    },
  ],
  apply: {
    scenario: 'Ada shares her checklist with the team.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the six steps.',
        lines: ['Whose data is it?', 'Never-paste scan', 'Approved tool and settings', 'Replace or generalise', 'Regulated or high stakes?', 'Report if something went wrong'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the lesson.',
        pairs: [
          ['Never-paste scan', 'Never paste these'],
          ['Approved tool', 'Company rules on AI'],
          ['Report fast', 'When something goes wrong'],
          ['Second channel', 'Scams that use AI'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes the checklist, or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'Log pasted with keys replaced by [REDACTED]', group: 0 },
          { text: 'Client contract in a free tool', group: 1 },
          { text: 'General question, no data', group: 0 },
          { text: 'Fee notice sent without compliance', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can my team use your safety checklist?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It only works for fintech.', why: 'It works anywhere.' },
          { text: 'Please do. Swap in your own approved tools and data contact, and keep it next to wherever people use AI.' },
          { text: 'You don\'t need one.', why: 'Every team does.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the checklist.',
        template: 'Replace with placeholders or ask a [[1]] question. Report mistakes [[2]].',
        blanks: [['general'], ['fast', 'quickly', 'at once']],
        distractors: ['secret', 'never'],
      },
      {
        kind: 'findBug',
        prompt: 'Which item in Tolu\'s version is wrong?',
        lines: [
          'Check whose data it is',
          'Scan for never-paste items',
          'Any AI tool is fine if I\'m quick',
          'Report mistakes at once',
        ],
        bug: 2,
        fix: 'Use an approved tool, with settings checked.',
        explanation: 'Speed doesn\'t make an unapproved tool safe.',
      },
      {
        kind: 'mcq',
        prompt: 'What should happen with an urgent request for money that seems to come from Tobi?',
        options: [
          { text: 'Pay if it sounds like him', why: 'Voices can be faked.' },
          { text: 'Reply to the message', why: 'Use a known channel.' },
          { text: 'Verify on a second channel you already know' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the checklist\'s first question.',
        tiles: ['Whose', 'data', 'is', 'it?'],
        distractors: ['Who', 'cares?'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many main steps are in the checklist?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step catches this?',
        groups: ['Never-paste scan', 'Regulated review'],
        items: [
          { text: 'An account number in an email', group: 0 },
          { text: 'A fee notice to customers', group: 1 },
          { text: 'An API key in a log', group: 0 },
          { text: 'A credit decision letter', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why share the checklist with the whole team?',
        options: [
          { text: 'One person\'s paste can expose everyone\'s customers' },
          { text: 'To look clever', why: 'It protects everyone.' },
          { text: 'No need', why: 'Mistakes are team risks.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the simplest step to start with today?',
        options: [
          { text: 'Reading every law', why: 'Start with one habit.' },
          { text: 'Never using AI', why: 'Use it safely.' },
          { text: 'Asking "whose data is it?" before every paste' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own safety checklist with your company\'s approved tools and data contact.',
    starters: ['Approved tools:', 'Data contact:'],
  },
  deepen: { title: 'Try it today', summary: 'Pin the six steps somewhere you\'ll see them before using AI.' },
  notes: 'Summary of Unit 10.',
};

export default lesson;
